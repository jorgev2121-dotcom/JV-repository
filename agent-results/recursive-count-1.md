# Recursive Document Count — Drive Capsules

Breadth-first walk of each capsule's full folder tree (`parentId = 'ID'`, `excludeContentSnippets:true`, `pageSize:1000`). Every non-folder file at every depth counted toward DOCS; every folder child enqueued and walked until the queue emptied. No `nextPageToken` was returned on any query (all folders fit in a single page).

| Capsule | TOTAL_DOCS (all levels) | folders_walked | max_depth |
|---|---|---|---|
| TRK-2026-1612 331 Tamiami Canal Rd | 123 | 17 | 3 |
| TRK-2026-1534 1840 NW 63 St | 361 | 29 | 3 |
| TRK-2026-1292 7823 NW 5th Ave | 25 | 17 | 2 |
| TRK-2026-1289 City of Miami | 8 | 13 | 1 |
| TRK-2026-1286 1997 SW 218 St | 6 | 12 | 1 |
| _ALEC-VALDES-DD | 44 | 11 | 2 |

**Grand total: 567 documents across 99 folder-queries.**

## Per-depth breakdown (docs found at each level, before recursing further)

| Capsule | depth0 (root) | depth1 | depth2 | depth3 |
|---|---|---|---|---|
| TRK-2026-1612 | 4 | 24 | 33 | 62 |
| TRK-2026-1534 | 2 | 14 | 13 | 332 |
| TRK-2026-1292 | 2 | 14 | 9 | — |
| TRK-2026-1289 | 3 | 5 | — | — |
| TRK-2026-1286 | 2 | 4 | — | — |
| _ALEC-VALDES-DD | 19 | 4 | 21 | — |

Notes:
- TRK-2026-1534's depth-3 spike (332 docs) comes from five `PERMIT-20xxxxxxxx` subfolders inside `07-Microfilm-Records/X2026148675/`, each holding scanned permit packets plus `.TAGS.txt`/`.SEARCH.txt` sidecars (largest single folder: PERMIT-2025084268 with 238 files).
- TRK-2026-1612 and TRK-2026-1534 both bottom out in `07-TAX-JACKET.../ENHANCED|ORIGINAL` (multi-part tax-jacket PDFs) and `.../_RAW/<folio>/` (raw GIS/PA/DERM JSON+HTML pulls) at depth 3, with no further subfolders below.
- TRK-2026-1289 and TRK-2026-1286 are the shallowest — only one level of subfolders, all mostly empty except Research and Jacket-Order.
