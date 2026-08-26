# Recursive Document Count — Batch 2

Method: breadth-first traversal via `parentId='ID'` queries (excludeContentSnippets:true,
pageSize:1000), counting non-folder files at every depth, queuing every child folder
found, until the queue was empty.

| Capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---|---|---|
| TRK-2026-1611 Pembroke Pines | 14 | 11 | 2 |
| TRK-2026-1265 Bal Harbour Permit | 25 | 16 | 3 |
| TRK-2026-1293 MZ Solutions Credentials | 3 | 10 | 2 |
| TRK-2026-1297 Tuscany Cove | 3 | 10 | 2 |
| TRK-2026-1296 TEDC Credentials | 3 | 10 | 2 |
| TRK-2026-1295 Principio 5401 NW 7 Ave | 3 | 10 | 2 |

## Notes

- All six capsules follow the same skeleton: `_INDEX.html` at root, plus the
  standard `01-INTAKE / 02-PERMITS / 03-INVOICES-PAYMENTS / 04-CORRESPONDENCE /
  05-REPORTS-DELIVERABLES / _Superseded` folders (all empty in every capsule
  checked) and an older `01-Emails / 02-Files / 03-Status` skeleton (also empty
  except where noted below).
- **TRK-2026-1611 Pembroke Pines**: content lives in `01-Related-Docs` (10 files:
  MZ Solutions license/insurance/workers-comp PDFs + their `.TAGS.txt`/`.SEARCH.txt`
  sidecars) and `02-Correspondence` (registration-approved `.msg` + `_INDEX.html`).
- **TRK-2026-1265 Bal Harbour Permit**: the largest capsule by far. Root carries 6
  files including two portal HTML snapshots and a `.bak` copy. `03-Doron-Evidence_
  2026-08-18` (depth 1) holds a ledger file plus three depth-2 subfolders —
  `PROVEN` (6 files: cleared-check images + support docs), `CONTRACTS` (3 unit
  contract images), `_PENDING-ADDITIONAL-SUPPORT` (5 unproven-check images) — the
  only place any of the six capsules goes to depth 3. `03-Status` and `01-Emails`
  each hold 2 files (an `_INDEX.html` plus one substantive doc).
- **TRK-2026-1293 / 1297 / 1296 / 1295** (MZ Solutions Credentials, Tuscany Cove,
  TEDC Credentials, Principio): structurally identical, near-empty capsules — only
  `01-Emails` has content (an `_INDEX.html` + one intake-pointers `.md`), everything
  else (INTAKE/PERMITS/INVOICES/CORRESPONDENCE/REPORTS/_Superseded/Status/Files) is
  empty.
