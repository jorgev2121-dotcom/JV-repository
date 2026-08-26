# Recursive Document Count — Capsules 1-5

BFS traversal (parentId queries, excludeContentSnippets, pageSize 1000). Each non-folder file counted once toward its capsule total.

| Capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---|---|---|
| TRK-TBD 13920 SW 34 St Medina-Rodriguez | 11 | 11 | 2 |
| TRK-TBD 13328 SW 113 Ct Nick | 11 | 21 | 2 |
| TRK-TBD 2362-2364 NW 32 St | 12 | 21 | 2 |
| _ORPHANS | 48 | 14 | 2 |
| _CONVERGE-STAGING | 1046 | 57 | 4 |

## Notes

- Capsules 1-3 share an identical scaffold: `_INDEX.html`/`CAPSULE.md` at root, standard subfolders (00-Intake through 07-TAX-JACKET), with real documents only inside `07-TAX-JACKET*/ENHANCED` and `07-TAX-JACKET*/ORIGINAL` (tax-jacket scan PDFs) plus `00-Intake`, `02-Permit-Apps`, `04-Money` index files. All other subfolders (Checks, Invoices, Signed, Submittal, Photos, Deliverables, Research, Emails) are currently empty.
- `_ORPHANS` holds 4 numbered orphan records (OPH-2026-0001 through 0004), an OCR-intake mirror, a correspondence folder with 4 `.eml` files, and a `_MISFILED-FROM-PLAZA` holding area with 4 property subfolders (Plaza-1016/602/307/305) totaling 33 misfiled field-inspection/permit files.
- `_CONVERGE-STAGING` is by far the largest and deepest capsule. Most of its bulk (994 of 1046 docs) sits four levels deep under `5000 SW 75 AVE - Palmer Trust (TRK-TBD)/07-Microfilm-Records/X2026138390/`, which contains 35 `PERMIT-*` subfolders of scanned permit-history PDFs (ranging from 1 to 382 files each — `PERMIT-2004139035` alone holds 382 files). The remaining ~15 top-level job folders (BayHarbor, Pembroke-1018, TUS-25-1023, TRK-2026-1262, AlecValdes, RoseArbor, Medley, BalHarbour, MZ-Credentials, Groves-Karla, `_Permits-unsorted`, `_NOC-unsorted`) are flat (no subfolders) and contribute the other 51 root-level docs.
- No folder in any capsule exceeded 1000 children in a single `parentId` query, so no pagination (`nextPageToken`) was needed.
