# VIN Highlighter

A browser extension that scans every page for 17-character Vehicle Identification Numbers (VINs) and turns each match into a clickable link. Built with WXT, React, and TypeScript; supports Chrome and Firefox.

## What it does

The content script (`entrypoints/vinHighlighter.content.ts`) walks the DOM, matches VINs with the regex `\b[A-HJ-NPR-Z0-9]{17}\b`, and replaces each match with a yellow-highlighted anchor that points at `https://console.spyne.ai/vin/add?vin=<VIN>`. New nodes are caught as the page mutates.

## Quickstart

```bash
pnpm install
pnpm dev               # Chrome dev build
pnpm dev:firefox       # Firefox dev build
```

Build a distributable:

```bash
pnpm build             # Chrome
pnpm build:firefox     # Firefox
pnpm zip               # zipped artifact
```

WXT writes the unpacked extension to `.output/`. Load it in `chrome://extensions` (Developer mode → Load unpacked) or `about:debugging` for Firefox.

## Configuration

Edit the link target in `entrypoints/vinHighlighter.content.ts` to point the highlighted VINs at a different URL.

Manifest permissions (`wxt.config.ts`): `activeTab`, `scripting`. Manifest V3.

## License

MIT
