export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    // Regular expression to match VINs
    const vinRegex = /\b[A-HJ-NPR-Z0-9]{17}\b/g;

    // Function to create a highlighted span for a VIN with a link
    function highlightVIN(vin: string): HTMLElement {
      const link = document.createElement("a");
      link.href = `https://console.spyne.ai/vin/add?vin=${vin}`; // Add VIN as a query parameter
      link.style.textDecoration = "none"; // Remove underline

      const span = document.createElement("span");
      span.style.backgroundColor = "yellow"; // Highlight color
      span.textContent = vin;

      link.appendChild(span);
      return link;
    }

    // Function to walk through the DOM and replace VINs with highlighted spans and links
    function walkAndHighlight(node: Node): void {
      let child: Node | null;
      let next: Node | null;

      switch (node.nodeType) {
        case 1: // Element node
        case 9: // Document node
        case 11: // Document fragment node
          child = node.firstChild;
          while (child) {
            next = child.nextSibling;
            walkAndHighlight(child);
            child = next;
          }
          break;

        case 3: // Text node
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

    // Start highlighting VINs in the document body
    walkAndHighlight(document.body);
  },
});
