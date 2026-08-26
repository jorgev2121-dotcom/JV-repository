# TAX-JACKET ENHANCEMENT — NO-COST TEST-RUN INSTRUCTIONS (3 test jackets)
**Cloud → executing agent, 2026-08-25. Free tools only (ImageMagick + Tesseract + pdftoppm/poppler).**
**Zero cost. Originals untouched. Cleaned copy DROPS blank/junk pages (logged); no page reordered; no content fabricated. #tax-jacket #test-run**

## THE GOVERNING RULE
**Classify each page BEFORE enhancing it, and treat each type differently.** The hard black-and-white
threshold that rescues a faint form will DESTROY a photograph. One-size passes are why these jackets failed.

## GUARDRAILS (hard limits)
- Output ONLY to `...\Tray 6\enhanced\`. Originals untouched.
- **DROP confirmed-blank and junk pages from the cleaned copy** (that's the goal) — but ONLY the copy;
  the original is never altered. **Log every dropped page (original page # + reason)** so any can be restored.
- **A faint-marked page is NOT blank — keep it** (treat as handwriting). When unsure, keep and flag, don't drop.
- **Never reorder** the kept pages. **Never fabricate content** on a faint page — enhance it, don't invent.
- **Never binarize a photo.** That is the #1 mistake here.

## STEP 1 — SPLIT to 300-DPI page images (non-destructive)
`pdftoppm -r 300 -png "jacket.pdf" "jacket_p"`  → one PNG per page. (Or `magick -density 300 jacket.pdf p-%03d.png`.)

## STEP 2 — CLASSIFY each page: TEXT/FORM · HANDWRITING · PHOTO · BLANK
Heuristics (ImageMagick `identify -verbose` / `-format`):
- **BLANK / JUNK:** standard deviation very low AND ink coverage < ~0.5% (almost all one tone). → DROP from
  the cleaned copy, log it. (A faint stamp/mark means NOT blank — keep it.)
- **PHOTO:** continuous tone — high count of distinct gray levels, few pure-black/pure-white pixels (mid-tone heavy).
- **TEXT/FORM:** near-bimodal, moderate dark coverage, straight lines/tables.
- **HANDWRITING:** like text but sparser, softer strokes. If unsure between text and handwriting, treat as handwriting (gentler).

## STEP 3 — ORIENTATION + DESKEW (all non-blank pages)
- Detect 90/180/270 rotation: `tesseract page.png - --psm 0` (reads "Rotate: N"); rotate upright with `-rotate`.
- Then fine-straighten: `magick page.png -deskew 40% page_ds.png`.

## STEP 4 — ENHANCE BY TYPE (free ImageMagick)
- **TEXT / FORM / TABLE:**
  `magick in.png -colorspace Gray -normalize -lat 25x25+10% -despeckle out.png`
  (adaptive local threshold = the big win on microfilm; keeps table lines).
- **HANDWRITING (faint):**  do NOT hard-binarize — preserve faint strokes:
  `magick in.png -colorspace Gray -contrast-stretch 2%x1% -unsharp 0x1 out.png`
  (optionally a very light `-lat 40x40+8%` only if still unreadable).
- **PHOTO (overexposed historical):** recover highlights, NO threshold, NO despeckle:
  `magick in.png -colorspace Gray -level 0%,88% -sigmoidal-contrast 3x50% out.png`
  (pull detail out of blown highlights; keep continuous tone). If already dark, use `-gamma 1.2` instead.
- **BLANK / JUNK:** do NOT enhance; DROP from the cleaned PDF and record in the manifest (original page # + reason).

## STEP 5 — OCR the readable pages (searchable text layer)
Text + handwriting pages: `tesseract page_enh.png out_page pdf txt --oem 1 --psm 6` (`--psm 4` for columns).
Photos: no text layer (or OSD only). Never force OCR onto a photo.

## STEP 6 — REASSEMBLE + PROVE
- Recombine the KEPT enhanced pages into one PDF per jacket, original order, blanks/junk removed (report in vs out counts):
  `magick p-*.png -quality 90 jacket_ENHANCED.pdf` (or `img2pdf` for lossless).
- Build a **before/after montage** of 3–4 representative pages per jacket (one text, one handwriting,
  one photo): `magick before.png after.png +append page_compare.png`.
- Write `MANIFEST.csv`: page# · type · rotation-applied · treatment · OCR-confidence · blank-flag.

## WHAT TO SEND BACK (the $0 proof)
1. The three `*_ENHANCED.pdf` files. 2. The before/after montages. 3. `MANIFEST.csv`.
Jorge judges the montage with his own eyes — no payment on promises.

## ON THE "PARTIALLY-CLEANED REFERENCE" + INTENTIONAL BLANKS
I can't identify sight-unseen which specific pages are deliberate "what-not-to-reproduce" examples —
that's fine, because the guardrails cover it: **blanks/junk are DROPPED from the clean copy and LOGGED (never fabricated),**
and an already-clean page won't be harmed (the classifier sends it through the gentlest path). If a page
is already high-contrast/clean, skip Step 4 for it (detect: coverage normal + already near-bimodal).

---
*v1 2026-08-25 · cloud · free-tool test recipe for the 22p / 30p / 2p test jackets · #tax-jacket #test-run*
