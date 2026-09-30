# forms-library — one layer for the county, one per software family, one small file per city
**TRK-2026-9910-B · generated from tools/vtes-panel/municipalities-data.js · 2026-06-17 data · #forms-library #permits #municipalities**

**Layers.** (1) State and county: the Unincorporated Miami-Dade row (code 30) and the statutory forms: the big shared part. (2) Platform family: one field map per portal software (`families/`). (3) City overlay: only what differs (`city-overlays/`).

**Status, honestly.** 36 city files and 8 family files exist and hold the facts from Drive's Municipality-Software-Map.xlsx. **Zero actual city forms are collected.** The 80/20 split is Jorge's hypothesis until they are. Cloud cannot reach city sites (egress blocked), so collection is a dispatch job (`dispatch/`).

**Rules.** No business identity (license numbers, contractor names) is stored here. No file is marked verified unless a dated proof file sits beside it. Regenerate with `node tools/vtes-panel/build-forms-library.js` after the data file changes.

**Files.** `field-map.json` (19 universal fields) · `families/*.json` · `city-overlays/NN-City.json` (NN = folio prefix) · `INDEX.md`.

TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · Did the layers match how you think about it?
