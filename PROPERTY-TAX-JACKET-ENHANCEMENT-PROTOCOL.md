# PROPERTY TAX JACKET — SCAN ENHANCEMENT & OCR PROTOCOL
**Purpose: turn a dirty county microfilm/scan into a clean, searchable, readable jacket.**
**Written by cloud 2026-08-25 at Jorge's request. This is a how-to for FINISHING existing tax-jacket
work — no new agent/watcher/automation is created, so the freeze is respected.**
**#tax-jacket #enhancement #OCR #protocol #JorgeValdes**

---

## THE ONE PRINCIPLE (why jackets fail)
**The bottleneck is scan quality, not which AI reads it.** A chatbot — ChatGPT, Gemini, or me —
chokes on a skewed, faint microfilm scan. **Clean the image FIRST, then hand the clean page to a
reader.** Do not waste a subscription hoping an LLM will "see through" a bad scan. It can't.

## RULE 0 — NEVER touch the original (keeps this GREEN)
Work only on COPIES. Originals stay untouched in their capsule. Every step writes a NEW file.
That makes the whole pipeline reversible; only the final FILING step is RED and waits for Jorge.

## THE PIPELINE — 8 steps, per page
1. **COPY IN.** Copy the jacket pages into a working folder (e.g. a desktop test tray). Originals untouched.
2. **ASSESS.** Note per page: resolution (want ≥300 DPI), skew angle, contrast, bleed-through, black
   microfilm borders, stamps. This decides which steps a page actually needs.
3. **DESKEW + CROP.** Straighten the page and crop off the black borders.
   - Free: **ScanTailor Advanced** (auto-deskew + content selection), or ImageMagick `-deskew 40%`.
4. **GRAYSCALE + CONTRAST.** Convert to grayscale and stretch contrast so faint ink comes back.
   - ImageMagick: `-colorspace Gray -normalize` (add `-level 10%,90%` for very washed-out pages).
5. **BINARIZE (adaptive).** For text, convert to clean black-on-white using an ADAPTIVE threshold —
   NOT a global one (global loses faint microfilm text).
   - ImageMagick: `-lat 25x25+10%` (local adaptive threshold). This is the single biggest win on microfilm.
6. **DENOISE.** Remove salt-and-pepper specks: ImageMagick `-despeckle` (run once; twice blurs text).
7. **UPSCALE only if under ~300 DPI.** Upscaling does NOT add information — prefer a re-scan if you can.
   - Paid: Topaz Gigapixel / Photo AI. Free fallback: `-resize 200%` then `-unsharp 0x1`.
8. **OCR to a searchable PDF + a .txt.**
   - **Tesseract** (free, already used here): `tesseract clean.png out pdf txt --oem 1 --psm 6`
     (`--psm 4` for multi-column pages). Produces both a searchable PDF and a text layer.

## CONCRETE FREE ONE-LINER (batch a whole folder, ImageMagick + Tesseract)
```
# for each page: deskew, gray, contrast, adaptive-threshold, despeckle -> clean_*.png
magick input.tif -deskew 40% -colorspace Gray -normalize -lat 25x25+10% -despeckle clean_input.png
# then OCR to searchable PDF + text
tesseract clean_input.png out_input pdf txt --oem 1 --psm 6
```

## AFTER OCR — QC + identity (do not skip)
- **QC:** spot-check the OCR text against the image. Microfilm OCR is never 100%; flag low-confidence pages.
- **Stamp identity** per CLAUDE.md §9.2: footer `TRK-2026-#### · vN · pNNN · YYYY-MM-DD · CURRENT`, and
  write the `.SEARCH.txt` sidecar so the page stays findable after it's extracted.
- **FILE = RED, and it has a proper HOME — never a scratch folder.** The finished jacket belongs in its
  **capsule under the job's master TRK** (filed by address + volume number + TRK), named per §9.1
  (`DATE _ TRK _ TaxJacket _ Address ENHANCED _ vN.pdf`), footer-stamped, with `_VERSION-LOG.md` updated and
  the original kept. **If the job is unknown, it goes to the ORPHAN folder (`OPH-2026-NNNN`) — not loose,
  not a "Trey 6" test folder.** Because filing a client document is RED, cloud STAGES the correctly-named
  file and the move into the capsule is previewed + owner-approved (or desktop executes with a rollback
  manifest). Scratch folders like "Trey 6" are for a throwaway test ONLY, never the resting place.

## WHICH READER, once the page is clean (per AI-ROUTING-GUIDE)
- **Long multi-page jacket → Claude (me).** Raw single-page OCR accuracy → Tesseract/ChatGPT.
- The reader only matters AFTER cleaning. A clean page reads well in almost anything.

## TOOL STATUS TO CONFIRM (desktop reports what's actually installed)
Default = free stack (ScanTailor Advanced + ImageMagick + Tesseract). If the desktop finds **Topaz Photo
AI/Gigapixel** or **Adobe Acrobat** installed, use them for steps 6–8 (better denoise/upscale/OCR) — but
the subscription audit found no paid receipt for either, so assume free until proven otherwise.

---
*v1 2026-08-25 · cloud · #tax-jacket #enhancement-protocol · supersedes the one-line note in AI-ROUTING-GUIDE*
