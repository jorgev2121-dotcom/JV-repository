# Recursive Document Count — 6 Capsules

Method: breadth-first traversal from each capsule root, `parentId='ID'` queries
(excludeContentSnippets:true, pageSize:1000, paged via nextPageToken), counting
every non-folder file at every depth. folders_walked includes the capsule root.
max_depth = deepest folder level actually visited in that capsule's tree
(root = depth 1).

| capsule | TOTAL_DOCS | folders_walked | max_depth |
|---|---|---|---|
| TRK-2026-1536 10362 SW 180 St | 501 | 33 | 4 |
| 14953 SW 34 St TRK-2026-1280 | 2 | 11 | 2 |
| TRK-26-1042 15222 SW 108 Pl Daymara | 24 | 21 | 3 |
| TUS-26-1018 8621 Pasadena Blvd | 213 | 27 | 5 |
| TUS-25-1023 14598 SW 110 St | 127 | 24 | 3 |
| TRK-TBD 15601 SW 137 Ave | 7 | 11 | 3 |

**Grand total: 874 documents across 127 folders walked (6 capsules).**

## Notes per capsule

- **TRK-2026-1536 (10362 SW 180 St)**: bulk of volume is one deep branch —
  `07-Microfilm-Records/X2026148681/PERMIT-*` — 9 permit subfolders each holding
  a PDF plus `.TAGS.txt`/`.SEARCH.txt` sidecars; one permit folder
  (PERMIT-2023131093) alone has 277 files.
- **14953 SW 34 St (TRK-2026-1280)**: skeleton capsule — only `_INDEX.html` and
  `CAPSULE.md` at root; all 10 subfolders are empty placeholders.
- **TRK-26-1042 (15222 SW 108 Pl, Daymara)**: mid-size — 00-Intake carries the
  due-diligence doc set (11 files), 07-TAX-JACKET/ENHANCED+ORIGINAL carry the
  tax-jacket PDFs.
- **TUS-26-1018 (8621 Pasadena Blvd)**: largest non-permit-sidecar capsule —
  01_Emails alone has 21 .msg files; 02_Files-Attachments/Working-Papers and
  /Permits/FL-Approval-PDFs (with 3 further subfolders: _superseded,
  OFFICIAL-floridabuilding, CLOUDED) drive most of the depth-5 volume.
- **TUS-25-1023 (14598 SW 110 St)**: 01_Emails has 99 files (no subfolders);
  07-TAX-JACKET/ENHANCED+ORIGINAL adds tax-jacket PDFs.
- **TRK-TBD (15601 SW 137 Ave)**: newest/smallest — only CAPSULE.md at root and
  a populated 07-TAX-JACKET/ENHANCED+ORIGINAL pair; every other subfolder
  (00-Intake, 01-Emails, 02-Permit-Apps, 03-Research, 04-Money, 05-Deliverables,
  06-Photos) is empty. Flagged per CLAUDE.md Sec. 9: `TRK-TBD` in this capsule
  name is a defect — needs a real tracking number assigned against the registry.
