export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    const vinRegex = /\b[A-HJ-NPR-Z0-9]{17}\b/g;

    function highlightVIN(vin: string): HTMLElement {
      const link = document.createElement("a");
      link.href = `https://console.spyne.ai/vin/add?vin=${vin}`;
      link.style.textDecoration = "none";

      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      span.textContent = vin;

      link.appendChild(span);
      return link;
    }

    function walkAndHighlight(node: Node): void {
      let child: Node | null;
      let next: Node | null;

      switch (node.nodeType) {
        case 1:
        case 9:
        case 11:
          child = node.firstChild;
          while (child) {
            next = child.nextSibling;
            walkAndHighlight(child);
            child = next;
          }
          break;

        case 3:
          const matches = node.textContent?.match(vinRegex);
          if (matches) {
            const parent = node.parentNode;
            if (!parent) return;

            const frag = document.createDocumentFragment();
            let lastIndex = 0;

            matches.forEach((match) => {
              const matchIndex =
                node.textContent?.indexOf(match, lastIndex) ?? -1;
              if (matchIndex > lastIndex) {
                frag.appendChild(
                  document.createTextNode(
                    node.textContent!.substring(lastIndex, matchIndex),
                  ),
                );
              }
              frag.appendChild(highlightVIN(match));
              lastIndex = matchIndex + match.length;
            });

            if (lastIndex < node.textContent!.length) {
              frag.appendChild(
                document.createTextNode(node.textContent!.substring(lastIndex)),
              );
            }

            parent.replaceChild(frag, node);
          }
          break;
      }
    }

    walkAndHighlight(document.body);
  },
});
