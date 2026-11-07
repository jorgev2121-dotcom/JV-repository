# OneDrive duplicate compare: Jorge Valdes, 2026-10-14

**Proposal only — deleting duplicates needs Jorge's yes per batch**

Read-only survey. Nothing was moved, renamed, copied, uploaded or deleted. File names and sizes only, no file contents.

**Status: PARTIAL. The numbers below are FLOOR COUNTS** (the 20-call cap was reached). The folder is large: 53 sub-folders plus 6 loose files.

## Counts in plain words

1. **Folder total size: A is 227,514,095 bytes, B is 227,564,776.** B is bigger by exactly 50,681 bytes.
2. **That whole gap is explained by one file.** `PP11Thumbs.ptn` (50,681 bytes) sits in B and is missing from A, in the sub-folder `8335 SW 152 AVE B-109`. It is a PaperPort thumbnail cache, not a client document.
3. **Compared file by file, at least 338 files in A and 339 files in B.**
   - Identical (same name and size): **338**.
   - Same name but different size: **0**.
   - Only in A: **0**.
   - Only in B: **1** (the cache file above).
4. **Folders listed in full on both sides: 8 of 54** (the top level plus 7 sub-folders, named in Section C).
5. **The other 46 sub-folders were not opened.** Each one has exactly the same byte size in A and in B, and the total gap is already accounted for, so they are very likely identical. That is a size-based inference, not a file-by-file check.
6. **Not opened below those 8:** two inner folders (`TEAM USA SALES INC / GARDEN WALK` and `MIGUELEZ`, and `CU FIELD INSPECTIONS / 2021 New folder - Test`). Their sizes also match.

## Section A. Same name, different size

None found.

## Section B. Only in A / only in B

1. Only in A: none.
2. Only in B (1): `PP11Thumbs.ptn` (50,681 bytes), inside `8335 SW 152 AVE B-109`. In A that folder holds 5 files; in B it holds 6.

## Section C. Folders listed in full, identical file counts

1. Top level: 6 files, all identical (`.ppinfocache`, `MaxDesk.ini`, `maxdesk.ini2`, `Miguelez Ink Card Statement.pdf`, `PP11Thumbs.ptn`, `PP11Thumbs.ptn2`).
2. `1320 NE 118 ST`: 118 files each side, all identical.
3. `Tax Docs`: 175 files each side, all identical. (Compared by eye on name and size; no differences seen.)
4. `GARDEN WALK`: 16 files each side, all identical. Its inner folder `Type 2 plans` has 1 file each side, identical.
5. `15050 DUVAL STREET`: 5 files each side, all identical.
6. `TEAM USA SALES INC`: 2 files each side, identical.
7. `CU FIELD INSPECTIONS`: 10 files each side, all identical.
8. `8335 SW 152 AVE B-109`: 5 identical, 1 only in B (see Section B).

## Section D. Duplicates seen inside a single copy (same size, different names)

These are duplicates within `1320 NE 118 ST`, present in both A and B:
1. `1092 NW 25 ST.pdf`, `1092 NW 25 ST (2).pdf`, `1092 NW 25 ST (3).pdf` (977,835 bytes each).
2. `1092 NW 25 ST (2) (2).pdf` and `1092 NW 25 ST (2) (3).pdf` (1,591,477 bytes each).
3. `761513_MiscellaneousFinancialCharge_255569_20210415022921.pdf` and its `(2)` copy (192,340 bytes each).
4. `9efd73d0-dedc-43ed-824d-a5347b8ca8a7.pdf` and `e8a3e56b-c903-48b1-bab6-112c05928458.pdf` (722,077 bytes each).

Also noted: `NOC to be recorded - 14835 S. SPUR Drive ... color copy .pdf` in `Tax Docs` is 0 bytes in both copies.

## Method and limits

1. `read_resource` on each folder id, in A and in B. 20 tool calls (3 hit a mistyped id and were redone). No pagination marker appeared. No modified date is available from this connector.
2. Match rule: path + exact name + byte size. Not a content hash.
3. The `Tax Docs` and `1320 NE 118 ST` comparisons were done by reading the two lists side by side, not by script, so treat a few missed one-byte differences as possible. The folder byte totals agree, which supports the result.

## Suggested next step (proposal only)

Retiring either copy of Jorge Valdes would remove about 227 MB of repeat. First finish the 46 unopened sub-folders (one subagent per folder under Rule 5). Any deletion is RED and needs Jorge's yes per batch.

Shall I queue the 46 unopened sub-folders for tonight's run?
