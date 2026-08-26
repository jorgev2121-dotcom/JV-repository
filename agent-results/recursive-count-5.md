# Recursive Document Count — 6 Drive Capsules

Method: breadth-first walk from each capsule's root folder ID. At every folder,
queried `parentId='ID'` (excludeContentSnippets:true, pageSize:1000), counted every
non-folder file toward that capsule's total, and pushed every child folder onto the
queue. Repeated until the queue was empty. No folder in any of these 6 capsules
returned more than 1000 children in a single page, so no pagination (nextPageToken)
was needed anywhere.

| Capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---:|---:|---:|
| 1) 20001 SW 110 CT Unit 143 — TRK-2026-1262 | 111 | 11 | 3 |
| 2) 1514 NW 73 St House Project | 106 | 8 | 2 |
| 3) TRK-2026-1310 10980 SW 202 Dr Cutler Bay | 27 | 21 | 3 |
| 4) TRK-2026-1588 4225 Rose Arbor Cir | 20 | 8 | 2 |
| 5) TRK-2026-1268 1500 Ocean Drive | 7 | 12 | 2 |
| 6) TRK-2026-1535 18020 SW 103 Ave | 502 | 34 | 4 |
| **Grand total** | **773** | **94** | **4** |

## Notes

- Capsule 6 is the outlier by a wide margin: its `02-PERMIT-APPS` tree
  (`07-Microfilm-Records/X2026148679/`) holds 13 `PERMIT-*` subfolders, one of
  which (`PERMIT-2022080674`) alone contains 325 files. That single folder is
  ~43% of the entire capsule's document count and ~42% of the six-capsule grand
  total.
- `folders_walked` counts every folder actually queried, including the capsule
  root itself and every empty folder encountered (e.g. `04-CORRESPONDENCE`,
  `03-INVOICES-PAYMENTS` were empty in most capsules).
- `max_depth` counts the capsule root as depth 1. E.g. capsule 6's depth-4 files
  sit at root → `07-Microfilm-Records` → `X2026148679` → `PERMIT-2023032084` → file.
- Every `.TAGS.txt` / `.SEARCH.txt` sidecar file and every `_INDEX.html` /
  `_JOB-TREE_*.html` index page is counted as a document — these are real files
  living in the capsule tree, not metadata excluded from the count.
