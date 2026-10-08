# Panel v5.1 — colour key, greyed-out pages, hover explanations (round 11)
TRK-2026-9910-C · v5.1 · 2026-10-08 · CURRENT

**What Jorge asked (2026-10-08):** colours on buttons and labels were inconsistent with no key;
add every requested page even if empty, greyed out with "under development" and an expected date;
a hover explanation on every window, tab, button and abbreviation.

**What changed:** v5 is untouched except one added line at the end of the page that loads
`vtes5-guide.js`. The ten other v5 files are byte-identical to verified commit 14dcb09.

1. One colour scheme: green done, blue in progress, amber waiting on Jorge, red stalled/broken,
   grey dashed not built yet, tan old snapshot. Blue button = does it now; white = optional.
2. A colour key under the tab bar (folds away; remembers).
3. Eight greyed-out tabs and placeholder sections with expected dates (estimates, edited in the
   PLANNED list at the top of `vtes5-guide.js`): NEEDS MY APPROVAL, BILLING, BOOKS, PROJECTS,
   COUNTY MONITOR, ORANGE TREE, LLM LIBRARY, PROTOCOLS.
4. Hover (or tap) explanation on all 26 tabs, all 36 buttons, section headings, and every
   abbreviation or in-house word (TRK, OPH, RAMBO, LOCAL, MDC, EPS, DD, OCR, PII, AP-NNNN, OD-NN ...).
5. Status words in tables (OK, STALLED, NEEDS-YOU, OPEN, FIXED ...) become coloured pills.

**Test (Chromium, Playwright, 2026-10-08), v5 vs v5.1 at 1536x730 and 390x844:**
no page errors on either; no sideways scroll; search filters identically (26 of 28 hidden for
"ollama"); LOCAL packet last line identical; tabs without hover text 18 -> 0; buttons without
hover text 36 -> 0; 187 explained terms; after one 60-second live refresh: still 0 missing,
no doubled wrapping. Hover verified on a live tab, a tan tab, a grey tab and the main button.
Fixed during test: grey tabs sorted first on laptop width (now last); v5's hint line said
"18 tabs ... amber" (now counts live and says tan).

**Not tested here:** Edge on Jorge's PC, PowerShell VERIFY on Windows (RAMBO does both).
**MANIFEST.sha256 SHA-256:** `2ce0e082f387df240b2962f10d5551e98c2bf4c5d6e95c398353c3504d8fe8f7`
