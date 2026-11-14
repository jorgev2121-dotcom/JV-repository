# OneDrive duplicate-tree comparison, 2026-10-14

**Status: PARTIAL (floor numbers). Read-only. Nothing was moved, renamed, copied, uploaded or deleted.**
**Proposal only — Jorge's yes per batch.** Nothing here authorises deleting duplicates.

## Section A. Counts in plain words

1. **Both folders exist and are near-identical copies.** Every one of the 21 top-level sub-folders appears in both. 16 of the 21 have exactly the same byte size.
2. **5 of 21 top-level folders differ in size** (2023 PaperPort, AJ Valdes, INSPECTIONS - MASTER, Jorge Valdes, Scan folder started Jan 14 2013). So the copy is not a perfect mirror. The ~4,000-PDF figure is not confirmed or refuted: I only listed files at the top level and one sub-folder.
3. **Top level files: roughly 190 per side (hand estimate, not an exact count).** Names and sizes matched on every row I compared by eye, except `.ppinfocache` (16,338 bytes in A vs 127 in B). The listing stopped at "29225 SW 189 AVE..." on both sides with no next-page marker, so later names (3xxx to Z) may be cut off. **FLOOR: ~190 of unknown.**
4. **One sub-folder fully compared: "Scan folder started Jan 14 2013".** 140 files each side. **137 identical by name + size, 3 same name but different size, 0 only in A, 0 only in B.** The 3 different ones: `maxdesk.ini2`, `PP11Thumbs.ptn`, `PP11Thumbs.ptn2` (PaperPort cache files, not client documents). The folder still differs by about 22.8 MB (inside "Scan Folder started Feb 01 2013") that I did not open.
5. **Not compared:** the other 20 sub-folders and everything beneath them (where most PDFs live). That is roughly 1 of 21 folders done. Folder size matches for 16 of them are a hint of identical content, not proof.

## Section B. Where the folders are

Both are in Jorge's OneDrive for Business, drive id `b!oBUnmATQeEihq25kC0c_-j_4fRQPEB9ImQkM9wLKgxDhRHX-SyJiSa6PMvlZHLMr`.

1. **A** = `Documents/Documents/Field Inspections Scanned Copy`, item id `01UJXG6QPWVO3RW7ZRKBHZU4JXOCUJD6AD`.
2. **B** = `Documents/Documents/Field Inspections _ Inspection _ COU _ CU _ Team/Field Inspections Scanned Copy`, item id `01UJXG6QME3IZCTJ47CNGYLYVRI55B7RU3`.
3. Other look-alike folders found by name search (not compared): `Field Inspections`, `CU FIELD INSPECTIONS`, `Field Inspections _ ... _ Team/Field Inspections`, `Field Inspections _ ... _ Team/CU FIELD INSPECTIONS`, and `Field Inspections/FIELD INSPECTION 1` to `9`. The name search reports 2,745 to 2,821 matching folders in total.

## Section C. Examples (limits of what was found)

- **Identical (name + size):** all top-level files I compared except one; 137 of 140 in the Scan folder. Examples: `10031 SW 46 TER FIELD INSPECTION JV .pdf` (248,381 both), `12032611.pdf` (6,435,094 both), `16020917.pdf` (6,727,283 both), `1100 SW 93 Ave - Property appraiser .pdf` (1,457,457 both).
- **Same name, different size (4 found):** `.ppinfocache` (root), `maxdesk.ini2`, `PP11Thumbs.ptn`, `PP11Thumbs.ptn2`.
- **Only in A:** none found.
- **Only in B:** none found.
- Also noticed inside A alone: pairs that look like duplicates of each other, same size, different names, e.g. `15858 SW 66 CT (4).pdf` and `15858 SW 66 TER -unter CT & Terr with same folio (4).pdf` (1,506,345 both); `16020917.pdf` and `16020917 (2).pdf`; `18041003.pdf` and `18041003 (2).pdf`.

## Section D. Method and limits

1. Tools: `sharepoint_folder_search` to find folders, `read_resource` on the folder uri to list children. About 7 tool calls used (well under the 60 cap).
2. The listing returns **name and size only. No modified date**, so the date column asked for is not available from this connector.
3. Listings showed no pagination marker; the top-level list ended alphabetically at "29...". Treat counts as floors.
4. Match rule: exact name + byte size. A size match is strong evidence but not proof of identical content (no hashes available).
5. The TSV holds folder rows and every exception found; the 137 identical Scan-folder files are summarised in one row, not itemised.

## Section E. Suggested next step (proposal only)

Run the same comparison on the 5 folders whose sizes differ, starting with `2023 PaperPort` (13.4 MB gap) and `Scan folder`, one subagent per folder per Rule 5. Any deletion of duplicates is RED: **Proposal only — Jorge's yes per batch.**

Shall I queue the 5 differing folders as the next overnight item?

## Part 2 roll-up (08:55Z)
- 16 of 21 sub-folders: byte-identical.
- AJ Valdes: COMPLETE — 32 of 36 identical; the 4 differences are PaperPort cache files only (no client document differs).
- Jorge Valdes: 338+ identical, 1 PaperPort cache file only in B; 46 of 54 sub-folders matched by size, not opened.
- INSPECTIONS-MASTER: identical except one sub-folder only in A (1301 NE 191 ST #F419, 12 files) — A is the more complete copy.
- 2023 PaperPort: 200 of ~480 listed, all identical; connector caps listings at 200 — the tail needs the PC.
- Scan folder: 137 of 140 identical; 3 PaperPort cache files differ.
- **Reading so far: B is a near-exact duplicate of A; the differences found are PaperPort cache files plus one folder A has and B lacks.** Proposal (RED, Jorge's yes): after a full PC-side hash check, quarantine B. Never delete.
