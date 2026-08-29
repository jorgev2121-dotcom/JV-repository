---
name: tax-jacket
description: Process a county tax jacket (building jacket) into Jorge's ratified ORIGINAL + ENHANCED + FINAL structure. Use whenever Property Appraiser / county jacket PDFs arrive for a job, or when enhancing, transcribing, or assembling a jacket deliverable. Owner-ratified 2026-08-29; any seat can follow this recipe cold.
---

# Tax-jacket protocol — Jorge's recipe (ratified 2026-08-29, TRK-2026-9725/9727)

**Why this skill exists:** Jorge's spoken protocols become written skills so any agent can jump in
and deliver without a briefing. This is the first. Gold-standard worked example:
`01-JOBS…\TRK-2026-1310…\07-TAX-JACKET_2026-08-24\` (10980 SW 202 DR).

## The recipe

1. **Count what arrived, honestly.** A jacket = ONE property's record set; a page is a page — never
   confuse them (they differ ~15×). Report "N files, M pages" before processing anything.
2. **ORIGINAL always stays, untouched.** Create `07-TAX-JACKET_<date>\ORIGINAL\` and put the exact
   county files there, byte-for-byte. If the client ever asks what the original looked like, this is
   it. Never edit, rotate, or re-save into ORIGINAL.
3. **ENHANCED sits right under it.** `\ENHANCED\` gets `ENHANCED_<addr>_partNN` for EVERY part —
   **all pages, never just the first pages of each attachment.** Include per-page
   `TRANSCRIBED_…_pNN` files, a `SEARCHABLE_` copy, and `.SEARCH.txt` / `.TAGS.txt` sidecars so the
   content is findable by hashtag.
4. **NOA / Florida Product Approval rule.** Identify NOA / FL product-approval sections; **EXCLUDE
   them from the ENHANCED deliverable** (huge, not needed for review) but **FLAG them on the
   cover/proof sheet with location and page count** (e.g. "NOA present: pp. 44–96, 53 pp, excluded —
   full copy in ORIGINAL"). ORIGINAL keeps everything.
5. **FINAL deliverable.** Assemble `DELIVERABLE_<addr>_FINAL_<date>.pdf`: cover, permit callout,
   transcriptions, photo album, proof sheet. Footer-stamp every page per CLAUDE.md §9
   (`TRK · vN · pNNN · date · CURRENT`).
6. **Verify with numbers, then gate.** Page-count ENHANCED against ORIGINAL and report the
   denominator ("22 of 22 pages"). The FIRST property of any batch goes to Jorge for review — his
   stop/go gate — before the rest of the batch runs. Batch runs report "X of Y complete", per item,
   as each finishes.
7. **Log the beat.** OPEN-ITEMS row + LAST-BUS-OUT beat with a proof path. No log line = it didn't
   happen.

## Assembly & enhancement rules — from Jorge's page-by-page review, 2026-08-29 (DO NOT REPEAT THESE)

**The whole point of a tax jacket is to find a PERMIT NUMBER.** Everything else is context.
- **The permit number is the key to legalization.** If the card/photo shows a change — keywords like
  **pool, enclosed patio, addition, alteration** — then something was built. **With a permit number
  (backed by a drawing and/or a year/date/language you can transcribe) the owner is SAFE. Without
  one, the owner is exposed to forced legalization.** Flag every permit number found, in bold, and
  flag every documented change that has NO permit number as a RISK.
- **The Property Appraiser date LAGS the actual work, often by 5–6 years.** The PA is a taxing
  authority; it catches an illegal addition years later to raise taxes, and **it does not talk to
  the Building Department.** So a PA date is "noticed by," not "built on" — say so, never present it
  as the construction date.

**Photos (never binarize):**
- **Render photo/album pages in GRAYSCALE from the ORIGINAL — never 1-bit/threshold them.** The
  binarized version turns a house photo into black blobs (the 2026-08-29 defect). Grayscale keeps
  the building, trees, and the edge DATE STAMP (e.g. "NOV 67") legible.
- **Never shrink a photo to make it fit** — that misrepresents what prints. Keep it full size.
- **Polaroid photos: the thick BLACK FRAME around them is a COPIER artifact — crop it off entirely.**
  Keep only the image (and, on the back, only the white note area with the folio/date). The black
  border is never part of the record.
- **A photo and its BACK belong on ONE sheet:** the picture upright on top, and its reverse (the
  side carrying the folio, the Miami-Dade "30-" indicator, a signature, and a date) flipped
  RIGHT-SIDE-UP beneath it — with the folio + date TRANSCRIBED.

**Orientation:** every page goes HEAD-FIRST / upright. Straighten 90°-sideways and small skews
(≈9°). A page that is fine except for rotation is "perfect once straightened" — fix it, don't reshoot.

**Two-up to save paper:** when a page has empty space, pair the next page onto the same sheet
(shrink slightly only to make two real pages share one sheet — this is fine; shrinking a single
photo to "fit" is not). Group related front/back and card/continuation pairs.

**Transcription:** on every card and stamped page, transcribe the **folio, the date(s), any permit
number, and any change-keywords** so the page is OCR-findable and the key facts are captured even if
the scan is faint. Low-value pages still get a short transcription so search can pick them up.

**Blank forms = no value:** a blank form template adds nothing — **label it "BLANK FORM" and drop it
from the deliverable** (do not number it as content). It stays in ORIGINAL only.

**Documents/cards enhance well as-is** (deskew, hole/streak removal, background clean, keep table
rules) — that branch of the recipe is good; leave it. The defect is photos only.

## Never
- Never process only the first pages of an attachment.
- Never write into ORIGINAL, never supersede without `_Superseded\` + `.bak` per charter.
- Never mix the jacket count with the cabinet pass (Jan-2022→today) — different scopes.
- Never read a street number as a quantity (10980 is an address, not a count).
- **Never binarize a photograph. Never shrink a photo to fit. Never present a PA date as the build
  date. Never number a blank form as content.**
