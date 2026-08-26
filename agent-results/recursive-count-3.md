# Recursive Document Count — Capsule Batch 3

Method: breadth-first traversal via `parentId='ID'` queries (excludeContentSnippets:true, pageSize:1000), counting non-folder files at every level, until the folder queue was empty.

| Capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---|---|---|
| TRK-2026-1294 Edison Towers II | 3 | 10 | 1 |
| OPH-2026-0007 Bal Harbour + Plaza | 213 | 66 | 4 |
| TRK-TBD 10000 W Bay Harbor Dr Unit 425 | 5 | 18 | 2 |
| TRK-TBD Unit 404 Reyna Jovel | 5 | 18 | 2 |
| TRK-TBD Unit 302 | 5 | 18 | 2 |
| TRK-TBD Unit 301 | 5 | 18 | 2 |
| **Grand total** | **236** | **148** | — |

## Notes

- **TRK-2026-1294 Edison Towers II** (`1YGQs35u8X3iOdE6m7xITO_jg_w09LYxS`): root has `_INDEX.html` plus 9 subfolders (5-stage TRK skeleton + `01-Emails`/`02-Files`/`03-Status`/`_Superseded`). Only `01-Emails` had content (`_INDEX.html` + one intake-pointers `.md`); all other 8 folders were empty leaves.

- **OPH-2026-0007 Bal Harbour + Plaza** (`1EEs5OtizdbpziGzazmORBpwwKpGZMQTe`): by far the largest and deepest capsule — root-level indexes/portal files/backups (20 files) plus 9 `Plaza-###` unit subfolders (815, 721, 602, 423, 321, 307, 305, 1515, 1016), each carrying its own capsule report, contact sheet, scope-of-work versions, money zip, and a `01-Related-Docs` subtree that branches into `01-Permit-Records`, `02-Emails` (→ `Call-Transcripts`), `03-Invoices-and-Checks`, `04-CU-Analysis`. Unit 305 alone contributed 17 files inside its `02-Emails` folder (photo/attachment dump). Unit 602 is a stub (2 files total, no capsule report yet).

- **The four `TRK-TBD` unit capsules** (Bay Harbor 425, Reyna Jovel 404, 302, 301) are structurally identical empty-skeleton capsules: 13 root subfolders (5-stage TRK skeleton + `00-Intake` … `06-Photos`), with real content only in `00-Intake` (`_INDEX.html` + `_JOB-TREE_TRK-TBD.html`), `04-Money` (`_INDEX.html` + empty `Checks`/`Invoices` leaves), and `02-Permit-Apps` (`_INDEX.html` + empty `Signed`/`Submittal` leaves). 5 documents each — these are intake shells, not populated jobs.
