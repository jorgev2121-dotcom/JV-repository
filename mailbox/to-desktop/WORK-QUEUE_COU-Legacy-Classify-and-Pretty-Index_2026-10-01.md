# WORK-QUEUE — Classify the legacy COU inspection reports (12–15,000 files, 2010–present) and make folder indexes pretty

**From:** ☁️ Code Cloud · **To:** 🖥️ Code Desktop · **Date:** 2026-10-01 · **Paste ID:** PASTE-D-067
**Owner request (Jorge):** make the ugly Chrome folder listing pretty; the bulk of the files in `Jobs-Master` (est. 4,000 at first, now 12–15,000 from 2010 to now) are old Certificate of Use inspection reports ("disclosure of findings") from CU Inspections of South Florida Inc. and COU of Miami Inc.; about 98% mention Hugh and/or Neil Aronson; that niche is over; keep for OCR in a few months for property history and solicitation; they were pre-sorted or renamed to a standard convention during an OCR pass, which helps identify them.

## WORKAROUND-CERT
- **Tried:** reach the files from cloud. They live on the PC (OneDrive `Jobs-Master`). **IMPOSSIBLE from cloud.**
- **Done instead:** two tested tools (see below) and a pattern read from what cloud can see.
- **Smallest owner action:** none. Two Y/N gates at the end are marked.

## What cloud verified (evidence, not guesses)
- Aronson Estates invoices (2012–2022) bill **COU of Miami, Inc.** and **CU Inspections of South Florida, Inc.** per certificate-of-use inspection ($150 each). Source: Drive `ARONSON-9534`, `SPINE-9733`.
- "Final CU report <address>" emails come from onlinecou.com, 2014–2020, to the same client.
- Filename convention seen in the screenshot: `ADDRESS _ field inspection _ T-USA.pdf` plus a `.pdf.SEARCH.txt` sidecar from the OCR pass.
- **Not verified:** the 98% figure, the "Hugh" spelling (evidence shows Neal/Neil and ARONSON ESTATES), and the 12–15,000 count. The tool measures all three with denominators.

## The tools (in repo, tested on sample files only)
1. `tools/cou_classify.py` — READ-ONLY. Scores every file by name and OCR sidecar text. Writes three NEW files: the manifest, `_SHAPES.csv` (which filename conventions exist and how common), `_BY-YEAR.csv`. Moves, renames, edits nothing.
2. `tools/pretty_index.py` — writes one new `_INDEX.html` per folder: searchable, sortable, light/dark, phone-safe, with COU badges from the manifest.

## Run (GREEN — new files only)
1. `python tools\cou_classify.py "C:\Users\JV\OneDrive\Documents\CU Inspections\Jobs-Master" "C:\Users\JV\OneDrive\Documents\Reports\COU-CLASSIFY-MANIFEST_2026-10-01.csv"`
2. Read `_SHAPES.csv` first. **The top shapes ARE the standardized convention.** If one shape covers most files, say its share and add it as a strong signal in `NAME_SIGNALS` (new version `v2`, keep v1).
3. Re-run, then `python tools\pretty_index.py "<one job folder>" --manifest "<manifest path>"`. Open it on screen. Compare with the ugly listing. Then run per folder.
4. Scale rule: 12–15,000 files is too many for one grinding pass. The script is deterministic and fast, so one run is fine. For any manual review of LOW/UNCLASSIFIED rows, shard by top-level folder, one subagent per shard, one result file per shard, written as each finishes.

## Report (denominators, never "good progress")
Write `EXECUTED_COU-LEGACY-CLASSIFY_2026-10-01.md` to `G:\My Drive\VTES-Outbox\` with: files scanned; proposed COU-legacy N of total; HIGH/MEDIUM/LOW counts; share with Aronson/Neil/Neal in OCR text **out of files that have OCR text** (and how many have none yet); top 5 shapes with shares; counts by year 2010–2026 and how many years came from filename vs file date; 5 sample HIGH and 5 sample LOW rows.

## RED — do NOT do, wait for Jorge
- Moving, renaming, re-foldering or deleting any file into a "COU Inspection Reports" folder. **Proposed category lives in the manifest only.** Jorge decides after seeing the report.
- Giving these files TRK numbers. They are one legacy CATEGORY. Hashtag in body: `#COU-Inspection-Reports #legacy`. Anything with no job known gets an OPH, not a TRK (CLAUDE.md §9).
- Mass OCR now. Jorge said OCR is for several months from now. Queue it as a future night item; do not start it.

## Gates for Jorge (one word each)
1. After the report: file the HIGH group into a COU category folder? Y/N
2. Add "Hugh/Neil Aronson" as a hashtag on those rows? Y/N

Did this job reach you through the poller, or does it need to be pasted?

*#COU-Inspection-Reports #legacy #Aronson #PASTE-D-067 · 2026-10-01*
