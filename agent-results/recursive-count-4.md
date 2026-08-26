# Recursive Document Count — 6 Drive Capsules

Method: breadth-first traversal from each capsule root, `parentId='ID'` query per
folder (excludeContentSnippets:true, pageSize:1000), counting non-folder files at
every level and queuing child folders until the queue is empty.

| Capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---|---|---|
| TRK-TBD Unit 221 | 5 | 18 | 3 |
| TUS-26-1033 7265 NW 74 St Medley | 125 | 18 | 2 |
| TRK-2026-1256 Groves at Sunset | 164 | 12 | 2 |
| KAR-26-GROVES 8850 SW 72 St | 30 | 21 | 3 |
| TRK-2026-0708-JULIA Julia's Place | 5 | 8 | 2 |
| TRK-TBD 535 NW 7 St Homestead | 17 | 21 | 3 |

**Grand total: 346 documents across 6 capsules, 98 folders walked.**

## Per-capsule detail

### 1. TRK-TBD Unit 221 (15l6ISulILZG-NA4KVxU_lP9on-zaL2gX)
- Root: 1 file (`_INDEX.html`) + 13 subfolders (both the new 01-05 numbered
  structure and a legacy 00-06 structure coexist here).
- Depth 2: 4 files total — `04-Money` (1: `_INDEX.html`), `02-Permit-Apps`
  (1: `_INDEX.html`), `00-Intake` (2: `_INDEX.html`, `_JOB-TREE_TRK-TBD.html`).
  All other depth-2 folders empty.
- Depth 3: `Checks`, `Invoices` (under 04-Money), `Signed`, `Submittal` (under
  02-Permit-Apps) — all empty.
- TOTAL_DOCS = 1 + 4 + 0 = **5**.

### 2. TUS-26-1033 7265 NW 74 St Medley (1m2zOt4hRY1H6ncRZDtqdotdQQYxvj3DM)
- Root: 9 files (portal HTML + backups, index, pop-up, job-tree, tags, read-first).
- Depth 2: 116 files across 17 subfolders — largest contributors: `09_Financial`
  (33), `06_Plans-Photos-Sketches` (27), `OUT-FOR-SIGNATURE_2026-08-10` (23),
  `04_Permits-and-Applications` (13), `03_Research-and-Proposal` (15),
  `_SUPERSEDED` (2), `05-REPORTS-DELIVERABLES` (3). No subfolders found at
  depth 2, so traversal stopped there.
- TOTAL_DOCS = 9 + 116 = **125**.

### 3. TRK-2026-1256 Groves at Sunset (1k82RhLdntKxlW-Uw8XRjLe-vpGSE-_Qt)
- Root: 4 files (`_INDEX.html`, capsule index md, manifest csv, read-first).
- Depth 2: 160 files across 11 subfolders — largest: `02-Files` (97, includes
  a full permit/NOC/DOH document set plus many `.TAGS.txt`/`.SEARCH.txt`
  sidecars), `County-Pull_2026-07-27` (26, code-enforcement case scrape),
  `00-Intake` (18), `01-Emails` (15), `03-Research-and-Proposal` (4). No
  subfolders at depth 2, so traversal stopped there.
- TOTAL_DOCS = 4 + 160 = **164**.

### 4. KAR-26-GROVES 8850 SW 72 St (1b1fdKsVmgQ3x-TKmN9hPJTsRLFuMYPxD)
- Root: 5 files (`_INDEX.html`, DOH non-compliance package pdf + sidecars,
  read-first).
- Depth 2: 17 files across 16 subfolders — `03_Research-and-Proposal` (5),
  `02_Files-Attachments` (9 files + 4 subfolders), `01_Emails` (3). The other
  13 depth-2 folders (both numbered and legacy structures) are empty.
- Depth 3: under `02_Files-Attachments` — `_NOC-build` (3), `Permit-Revival-Research`
  (3), `Findings` (2), `Attachments-From-Emails` (0/empty) = 8 files, no
  further subfolders.
- TOTAL_DOCS = 5 + 17 + 8 = **30**.

### 5. TRK-2026-0708-JULIA Julia's Place (15KM95sd22UzsRroDNwshRryfr2PqoH-t)
- Root: 1 file (`_INDEX.html`).
- Depth 2: 4 files, all in `02-Deliverables` (W9 pdf + tags/search sidecars +
  index). Other 6 depth-2 folders empty, none had subfolders.
- TOTAL_DOCS = 1 + 4 = **5**.

### 6. TRK-TBD 535 NW 7 St Homestead (1u5VINVcGaGlU4hy3E0VqvgEsSaS1Em04)
- Root: 1 file (`_INDEX.html`).
- Depth 2: 9 files across 14 subfolders — `03-Research` (5: violation/notice/
  order/MDC pdfs), `04-Money` (1 + 2 subfolders), `02-Permit-Apps` (1 + 2
  subfolders), `00-Intake` (2), `07-TAX-JACKET_2026-08-24` (0 + 2 subfolders).
  Other 9 depth-2 folders empty.
- Depth 3: `ENHANCED` (5: album + enhanced tax-jacket pdfs + WHAT-WAS-DONE
  jsons) and `ORIGINAL` (2: tax-jacket pdfs) under 07-TAX-JACKET; `Checks`,
  `Invoices` (under 04-Money) and `Signed`, `Submittal` (under 02-Permit-Apps)
  all empty = 7 files.
- TOTAL_DOCS = 1 + 9 + 7 = **17**.
