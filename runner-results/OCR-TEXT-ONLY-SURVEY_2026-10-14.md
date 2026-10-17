# OCR-text-only survey, 2026-10-14 (READ-ONLY, nothing changed)

## Counts first (denominators)
1. Drive-wide `.SEARCH.txt` query: 3 of up to 15 pages read (5 + 100 + 100 = about 205 sidecars seen; real total is larger, unknown). Google Docs whose title ends .pdf: **0 found** (query returned empty twice). So item (b) is empty.
2. Folders checked for a matching original: 9 folders (8 sidecar folders + the 1684 "Raw" folder). Sidecars checked individually: about 25. With original beside them: about 22 of 25. ORPHAN-TEXT: **3 probable** (all in 1684 "Raw" folder 1zZvB5RSkklSSLb8jGOaCSesasXp4xFxc), 0 confirmed lost.
3. NOT done: the 40 job folders in _JOBS.tsv were not walked one by one (0 of 40 in full); only the folders the Drive-wide query surfaced were checked. Coverage is a sample, not a census.

## Main finding
The `.SEARCH.txt`, `.TAGS.txt` and `.OCR.txt` files are **sidecars**. In every folder checked, the PDF or image they describe is sitting next to them. The owner's worry (documents surviving only as OCR text) is **not** true for the sampled sidecars. Search pages of 5 hid the PDFs until I filtered by `mimeType = 'application/pdf'`, which can make a folder look text-only when it is not.

The genuine text-only cases are standalone "Raw" OCR dumps in the TRK-2026-1684 folder (see the .tsv). Their page content does exist as PDFs elsewhere in 1684 (p1/p2 deed PDFs in folders 1HrugfOo0ywqTVZ5odZ4z8BwtzAbq4tC0 and 1dC6e69eG0wcaDSDxck3cKzL4NcmDGqRs), but the exact 300dpi/400dpi scan images were not found.

## Restore plan (proposal only, needs owner yes)
- (a) Originals found elsewhere in Drive: copy them back into the Raw folder as NEW files (Drive copy, GREEN-prep). Candidates: the 1684 p1/p2 deed PDFs.
- (b) Google Docs converted from PDF: none found. Nothing to export.
- (c) Truly missing (300dpi p01 scan, 400dpi both-pages scan, public-copies set): desktop search order. 1) PaperPort library, search "464916" and "2025R464916". 2) Downloads folder, same terms. 3) OneDrive `_FOLDED-FROM-ONEDRIVE_2026-09-04`. 4) Drive trash and file version history for the 1684 Raw folder (cannot be seen from here). I cannot see the PC.

## Next step (cheap)
Run the full census in a night run: one subagent per job folder (CLAUDE.md Rule 5), listing with `mimeType` filters, writing results per folder.

Anything else you want checked before I stop?
