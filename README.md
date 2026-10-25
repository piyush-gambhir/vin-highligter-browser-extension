# VIN Highlighter

A browser extension that scans every page for 17-character Vehicle Identification Numbers (VINs) and turns each match into a clickable link. Built with WXT, React, and TypeScript; supports Chrome and Firefox.

## What it does

The content script (`entrypoints/vinHighlighter.content.ts`) walks the DOM, matches VINs with the regex `\b[A-HJ-NPR-Z0-9]{17}\b`, and replaces each match with a yellow-highlighted anchor that points at `https://console.spyne.ai/vin/add?vin=<VIN>`. New nodes are caught as the page mutates.

## Quickstart

Use Node 26.12.1 and pnpm 12.15.0.

```bash
pnpm install --frozen-lockfile
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

## Upgrade verification (26 October 2026)

The Node 26 upgrade preserves the newer main security backport and bounded
dependency overrides. TypeScript 7.0.2 runs through an explicit compiler path.
The private package identity now matches VIN Highlighter rather than the WXT
boilerplate. Version 1.0.1 supplies both the artifact names and generated browser
manifest through WXT's package-version default.

Frozen install, peer checks, typecheck, formatting, all 36 existing security
regressions, Chrome/Firefox builds, and ZIP integrity checks pass. An isolated
Chrome 156 profile verifies the actual content script's two VIN highlights and
link targets, rejection of an invalid-letter VIN, popup interaction, and no page
errors. It uses local fixtures and does not navigate to Spyne or use a personal
browser profile. No new performance claim is made.

The production dependency audit is clear. The full audit retains one existing
development-only node-forge advisory by version despite the tested source
backport; see `scripts/security/README.md`. No audit exception is added.

GitHub packaging requires an existing version tag and passes its name to the
shell through an environment variable. Firefox builds and packages, but its
runtime was not tested. Firefox's store validator still requires a Gecko add-on
ID and data-collection metadata; no store identity is invented here. Browser-store
submission is separate from the GitHub ZIP release.
