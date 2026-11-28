# OneDrive duplicate compare: AJ Valdes, 2026-10-14

**Proposal only — deleting duplicates needs Jorge's yes per batch**

Read-only survey. Nothing was moved, renamed, copied, uploaded or deleted. File names and sizes only, no file contents.

## Counts in plain words (COMPLETE, not floor counts)

1. **The whole AJ Valdes tree was listed on both sides, every level.** 4 folders (the top plus AVIS BUILDERS, Law Suit- AL PINO, BOA, SEICO CONSTRUCTION). 36 files on each side.
2. **32 files are identical** (same path, same name, same byte size).
3. **4 files have the same name but a different size.**
4. **0 files only in A. 0 files only in B.**
5. **All 4 differences are PaperPort cache files, not client documents**, and all sit at the top level of AJ Valdes.
6. **The folder size gap is fully explained.** A is 9,939,627 bytes, B is 9,787,498, a gap of 152,129. The four size differences below add up to exactly 152,129. So no client document differs.
7. **A is the larger side**, only because of the PaperPort thumbnail cache `PP11Thumbs.ptn`.

## Section A. Same name, different size (4 of 4)

All at top level of AJ Valdes. Sizes in bytes, A then B.

1. `.ppinfocache`: 287 in A, 128 in B
2. `maxdesk.ini2`: 177 in A, 57 in B
3. `PP11Thumbs.ptn`: 202,484 in A, 50,681 in B
4. `PP11Thumbs.ptn2`: 96 in A, 49 in B

## Section B. Only in A

None.

## Section C. Only in B

None.

## Section D. Identical, by sub-folder

1. Top level: 5 identical (Alec Valdes Taxes .pdf, Avis Local Business Tax Payment Invoice.pdf, City of Tampa_ FMCRC.pdf, ENGINEERING CONDITION REPORT.pdf, MaxDesk.ini).
2. AVIS BUILDERS: 6 identical (includes Avis Builder's Sworn Statement of Accounts.pdf).
3. AVIS BUILDERS / Law Suit- AL PINO: 9 identical (includes Mail Letter Return - Lien 1 of 3.pdf, Mail Letter Return- Lien 2 of 3.pdf, Photograph (1).jpg, Photograph (2).jpg).
4. BOA: 6 identical (includes BOA CLAIM.jpg, Photograph (1).jpg).
5. SEICO CONSTRUCTION: 6 identical (includes SURETY BOND_Cancelled .pdf).

## Method and limits

1. Listed with `read_resource` on each folder id, in A and in B. 10 tool calls in total, under the cap of 20. No folder showed a pagination marker. The listing gives name and size only, no modified date.
2. Match rule: path + exact name + byte size. A size match is strong evidence, not proof of identical content (no hashes).
3. The only duplicates found are the 32 identical files that exist in both A and B. Within each copy, the useful part is that B is a mirror of A apart from PaperPort cache files.

## Suggested next step (proposal only)

Nothing in AJ Valdes needs action except that one of the two copies could later be retired. That is Jorge's decision, per batch.

Shall I move on to the next folder on the list?
