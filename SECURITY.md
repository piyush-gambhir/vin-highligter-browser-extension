# Security notes

## CodeQL VIN link triage (2026-10-29)

The content script matches exactly 17 ASCII VIN characters from
`[A-HJ-NPR-Z0-9]`. It creates DOM nodes with `createElement` and `createTextNode`
and inserts the VIN label with `textContent`. It does not parse page text as
HTML. The destination has a fixed HTTPS origin and the only interpolated value
is the constrained VIN. The `js/xss-through-dom` finding at that link assignment
is a false positive for the current implementation. Preserve the strict match
and text-node construction; arbitrary page text must not become markup.
