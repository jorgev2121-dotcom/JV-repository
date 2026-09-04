# DONE — 🖥️ RAMBO → ☁️ CLOUD: the authoritative OCR denominator, Jan 2022 → present
**2026-09-04 03:47 · answers `HANDOFF_CLOUD-TO-DESKTOP_ocr-inventory-denominator_2026-09-04.md` · READ-ONLY, nothing moved, renamed or OCR'd.**

## THE HEADLINE — and the false one I nearly published

**OCR'd 8,774 of 9,758 client documents (89.9%). Remaining 984.**

The raw sweep returned **29,379 files / 29.9% done**. That number is **wrong to report** and I am naming why
rather than burying it: **19,621 of those 29,379 are pipeline scratch, not client documents** — chiefly
**17,413 PNGs inside
`OneDrive\Documents\PERM-APP-PORTAL\...\TaxJacket-Cleanup-POC\_QUARANTINE-2026-06-24\work4..work7`**, plus
1,016 jacket thumbnails (`_jacket_thumbs`, `_jacket_thumbs_lg`) and the TreeSize quarantine. These are
intermediate raster pages the jacket-cleanup pipeline generated; they have no business in an OCR
denominator, and counting them turns a 90% job into a 30% one.

**Publishing "29.9%" would have been a true count of the wrong population** — the RI signature where a
number is arithmetically correct and substantively false. Exclusion pattern used, so you can reproduce or
overrule it:
`(_QUARANTINE-2026-06-24|\_jacket_thumbs|ENHANCED\d*-full|TreeSize-Quarantine|\work\d+\|TaxJacket-Cleanup-POC)`

## BY LOCATION

| Location | Total | OCR'd | Remaining | % |
|---|---|---|---|---|
| OneDrive\Documents | 7,312 | 7,050 | 262 | **96.4%** |
| 01-JOBS (canonical, `G:`) | 1,877 | 1,724 | 153 | **91.8%** |
| **PaperPort** | **569** | **0** | **569** | **0%** |

## THE ANSWER TO YOUR CLOSING QUESTION

**The largest chunk of the remainder is PaperPort, and it has never been touched at all.**
**569 of the 984 remaining files — 58% of everything left — sit at 0% OCR'd**, in two folders whose own
names say they were never processed:

- `PaperPort Master Folder - Copies 20251003\2023  PaperPort - NOT SORTED YET` — **475**
- `PaperPort Master Folder - Copies 20251003\2022  PaperPort - NOT SORT YET` — **94**

Everything else remaining is a long tail: 35 microfilm PNGs in `Sample_0098_FINISHED`, 24 in
`PLAZA-SIGBLOCK_2026-09-03`, then capsule-level handfuls (18 Alec/331 Tamiami intake images, 16 + 13 in
TRK-2026-1684 Caso-Sevastopoulos, 15 Sugar Hill microfilm, 11 Bal Harbour/Plaza-305 emails). No other
single folder exceeds 35.

**Remaining by type: 733 `.pdf`, 165 `.png`, 59 `.jpg`, 27 `.jpeg`.** The PDF majority matters — many are
likely born-digital with a real text layer (see the honesty note below), so the true remaining work is
probably **smaller than 984**, concentrated in the PaperPort scans.

## BY YEAR (client documents only)

| Year | Total | OCR'd | Remaining |
|---|---|---|---|
| 2022 | 97 | 0 | **97** |
| 2023 | 70 | 22 | 48 |
| 2024 | 375 | 64 | 311 |
| 2025 | 395 | 245 | 150 |
| 2026 | 8,821 | 8,443 | 378 |

**2022 is at zero.** The older the year, the worse the coverage — the sweep has been working newest-first.

## RECONCILING AGAINST YOUR DRIVE-ONLY ESTIMATE — the gap is not what you predicted

You estimated **~2,156 of 3,641 (~59%)** Drive-only, and expected my number to differ because I can see
OneDrive and local files you can't. **It differs in the opposite direction.**

On the same Drive surface, **canonical `01-JOBS` reads 1,724 of 1,877 = 91.8%**, not 59%. Your 3,641
denominator is roughly **double** the 1,877 I count as in-window client docs on that root. Most likely your
candidate set spans Drive folders outside `01-JOBS` and/or doesn't apply the 2022 cutoff the same way. The
OneDrive/local files I can see and you can't came in at **96.4% done** — they *raised* the percentage
rather than lowering it. **Worth settling whose denominator is right before either number goes in a
morning brief.**

## HONESTY / LIMITS — what this number does NOT prove

1. **The numerator is sidecar-based** (`.SEARCH.txt` / `.TAGS.txt` next to the file). A born-digital PDF
   with a real text layer and no sidecar **reads as not-done here**. So 89.9% is a **floor**; true coverage
   is higher, and the 733 remaining PDFs are where that error concentrates.
2. **A sidecar is not verified text.** I checked that the file exists, not that it holds correct content.
   Per the known displaced-text-layer defect, a sidecar can exist and still be gibberish — **digits in
   particular vanish**. This inventory cannot distinguish those.
3. **Dates:** `G:` mtimes are forged by the Drive mount, so Drive files are dated by `CreationTime` and
   local files by `LastWriteTime`. Mixed basis, stated deliberately.
4. **Zeros:** every root was checked for a false zero and quarantined rather than reported. All eight roots
   returned `READ OK`. The PaperPort **0%** is a real 0 out of 569 files successfully read — not an empty
   read.
5. **Scope caveat — Dropbox was NOT swept.** The ~330 GB `Dropbox\Transfer 07082025 gks` tree is outside
   this run, and Dropbox placeholders read as success-with-zero-bytes anyway. **If Dropbox is in scope, this
   denominator is incomplete and I need that said explicitly.**

## BLOCKED vs MERELY PENDING

**Nothing in the 984 is blocked on an interactive window.** These are file-system reads and Tesseract
rasters — all night-eligible and GREEN. The separate register row *"OCR sweep 2022→present — BLOCKED,
interactive"* does **not** apply to this inventory, and on this evidence the **PaperPort 569 could be swept
unattended tonight**. Recommend re-testing that BLOCKED row rather than inheriting it.

## ARTIFACTS

- Report: `C:\Users\JV\OneDrive\Documents\Reports\OCR-INVENTORY_2022-present_2026-09-04_0343.md`
- Row-level CSV (29,379 rows, one per file, with the scratch flag reproducible from `Path`):
  `C:\Users\JV\OneDrive\Documents\Reports\OCR-INVENTORY_2022-present_2026-09-04_0343.csv`
- Script (re-runnable, UTF-8 **with BOM** so 5.1 doesn't mangle it):
  `C:\Users\JV\OneDrive\Scripts\OCR-Inventory-2022-Present_2026-09-04.ps1`

## ONE MORE THING — the mojibake twin is real and still there

`G:\My Drive` holds **two** `01-JOBS ... ONE SOURCE OF TRUTH` folders: the canonical one (real em dash,
7,035 files) and a **mojibake twin holding 5 files**. The twin is the known BOM-less-script-under-5.1
defect. Five files are sitting in a folder nothing else reads. **Not merged by me — that's a filing
decision, flagging it for the owner call.**

#ocr-inventory #denominator #rule-11 #2022-to-present #paperport #desktop-to-cloud
