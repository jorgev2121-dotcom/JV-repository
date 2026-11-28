# OneDrive duplicate check: "2023  PaperPort - NOT SORTED YET", 2026-10-14

**Status: PARTIAL (floor counts). Read-only. Nothing was moved, renamed, copied, uploaded or deleted.**
**Proposal only — deleting duplicates needs Jorge's yes per batch**

## Section A. Counts in plain words

1. **Files compared: 200 per side (floor).** Each folder listing stopped at exactly 200 entries, ending at `eTRAKiT (11).pdf`, with no next-page marker. Names after "eT" (alphabetically) could not be listed.
2. **Identical (same name and same byte size): 200 of 200.** Compared by eye, row by row, in the same alphabetical order.
3. **Same name but different size: 0** in the 200 listed.
4. **Only in A: 0.** **Only in B: 0.** (In the listed part only.)
5. **No sub-folders** appeared in either listing. Every entry was a file.
6. **The size gap is in the part I could not list.** Folder A is 570,277,042 bytes. Folder B is 556,828,194 bytes. The gap is 13,448,848 bytes (about 13.4 MB). The 200 listed files match exactly, so the gap sits in files after "eTRAKiT (11)" that are missing from B or differ in size.
7. **Likely size of the whole folder: about 480 files per side.** A name search returned 966 hits for this folder name across A and B together (hit count, not verified, may include other folders). So roughly 280 files per side were not compared.
8. **Dates:** the listing gives name and size only. The search tool gives dates but no sizes.

## Section B. Examples

- **Identical:** all 200 listed. Examples: `.ppinfocache` (119 bytes both), `- Regulation Cases.pdf` (634,912 both), `Activities - Regulation Cases (2).pdf` (16,959,664 both), `cu report_9055 sw 83 ct unit 1507 (2).pdf` (9,413,571 both).
- **Same name, different size:** none found.
- **Only in A:** none found.
- **Only in B:** none found.
- **Duplicates inside the same folder (same size, different names; proposal candidates only):** `Citizenserve Online Portal.pdf`, `(2)`, `(3)` (272,599 each); `Citizenserve Online Portal (4)` and `(5)` (667,941 each); `cu report_9055 sw 83 ct unit 1507 (2)` and `(3)` (9,413,571 each); `Application - F2024014526 - EPS.pdf` and `(2)` (379,005 each); `ePayment Services.pdf` and `(3)` (1,404,759 each); `CertificateOfUsePDFReport.pdf` and `_MDC_ CertificateOfUse_ Business License 2025.pdf` (1,797,745 each); `___ AS-Built Letter _14598_ -Impact WINDOWS DOORS.pdf` and `AS-Built Letter 14598_ -Impact window._ 14953_ pdf.pdf` (1,645,918 each); `73272248152__D27C1B00-...heic` and `Copy of 73272248152__...heic` (57,081 each).

## Section C. Method and limits

1. Tools: `read_resource` on the two folder ids, plus one `sharepoint_search` to estimate the total. About 8 tool calls used (cap 40). I stopped because the listing has no pagination and the search tool returns no sizes, so the tail cannot be compared by size.
2. A = item `01UJXG6QK5LQ2SGJDFBNDLWKVM3K4YG67R`. B = item `01UJXG6QOPLQOQGN3EXVD2YM2KRSR2UKG3`. Same drive id as the parent comparison file.
3. Match rule: exact name plus byte size. No hashes.
4. File names only. No file contents were read.

## Section D. Suggested next step (proposal only)

Compare the tail by name using `sharepoint_search` with the folder name and offset paging (about 20 calls), then check sizes of the differing names one by one. Any deletion is RED.

Shall I run that tail comparison next?
