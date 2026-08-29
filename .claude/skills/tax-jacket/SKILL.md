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
- **Orient PHOTOS by real-world cues, not character count (Jorge, 2026-08-29): trees grow UP, sky is
  UP, the ground/lawn is DOWN, cars sit on wheels, buildings stand on foundations.** If the trees
  point down, flip it. On a scanned photo there's no text to score, so gravity in the image is the
  tell. (This is why an upside-down house slipped through — the cue was that the trees were growing
  downward.)
- **Orient DOCUMENTS by the text baseline / the printed label row** (the PA card's `DATE PERMIT …`
  header sits at the top when upright).

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

**FORM-TEMPLATE METHOD (Jorge, 2026-08-29) — this is how you recover a permit number from a blurred
card.** These are STANDARDIZED county forms: the printed LABELS are fixed and known, so the label
tells you what a blank means even when the handwriting is faint.
- **Build a template per known form once it's clear enough to OCR** (the PA card, the permit slip,
  the points/value card). Store the field map; reuse it on every jacket.
- **Anchor by label, then read the value beside it.** The PA card's top row is always:
  `DATE PERMIT · AMT. PERMIT · PERMIT NO. · DATE CK'D · DEPUTY`; then `FOLIO · LEGAL DESC ·
  ADDRESS · PB`; then the `BUILDINGS` points column and the `OPERATORS/FOLIO/PLATES/YR/LAND/IMPR/
  TOTAL/REMARKS` grid. Because the layout is fixed, **a typed "PERMIT NO." label means the 4–5
  digits sitting next to it ARE the permit number** — that positional certainty substantiates "it
  was permitted" even when the digits are marginal.
- **The points/value card totals ~100** across construction portions (exterior, roof, plumbing,
  electric, etc.), each a value or % of value. **Fill in every value you can read; put `?` where you
  can't** — never guess a digit, never leave the field unlabeled.
- **REMARKS is where the CHANGE hides** (e.g. "add CB wall / Lanai 4/23/70" = an enclosed lanai /
  addition). Pair every REMARKS change with: is there a PERMIT NO.? If yes → safe. If the permit
  field is blank → flag legalization exposure, and note the permit YEAR (here 1966) separately from
  the PA "date checked" (11-20-67) — the PA noticing lags the actual work.
- **Worked example (10980 PA card, verified by cloud 2026-08-29):** DATE PERMIT 1966 · PERMIT NO.
  BLANK · DATE CK'D 11-20-67 · FOLIO 30-6007-09-003 · REMARKS "add CB wall/Lanai 4/23/70" →
  documented alteration, permit-year present, permit-number MISSING → exposure flag.

## THE FORENSIC STORYLINE (Jorge, 2026-08-29) — what a jacket is actually FOR

A tax jacket is evidence for a **timeline**, and the timeline is the deliverable:
1. **Built** (original construction + its permit, or its absence).
2. **The Property Appraiser sent a human inspector** who eyeballed the property **from the OUTSIDE only**
   and recorded his BEST GUESS — periodically re-driving and hand-adjusting the card.
3. **A change appears on the card** (addition, enclosed lanai, CB wall, extra bath) on some later date.
4. **Was it permitted?** Permit number present → safe. Absent → legalization exposure.

**Critical consequence — the PA card is a GUESS, not ground truth, and guesses have errors.** Because
the inspector only saw the outside, he could record a "2BR/1BA addition" when the bathroom never
existed, miscount units, or attribute a feature wrongly. **A discrepancy between the PA card and
reality is often the OWNER'S DEFENSE:** if the PA recorded an addition that isn't there, or guessed a
feature that was never built, that undercuts the "unpermitted work" claim. **So flag every
PA-recorded feature that (a) has no permit AND (b) may not physically exist — those are both risks
AND potential defenses.** Never present a PA entry as fact; present it as "what the appraiser recorded
on [date], to be verified against the physical building and the permit record."

**The PA is a TAXING authority and does NOT talk to the Building Department.** It catches an illegal
addition years after the fact to raise taxes — so a PA date is "noticed/valued by," lagging the real
work by potentially 5–6 years, and it is never proof of when (or whether) something was permitted.

## Never
- Never process only the first pages of an attachment.
- Never write into ORIGINAL, never supersede without `_Superseded\` + `.bak` per charter.
- Never mix the jacket count with the cabinet pass (Jan-2022→today) — different scopes.
- Never read a street number as a quantity (10980 is an address, not a count).
- **Never binarize a photograph. Never shrink a photo to fit. Never present a PA date as the build
  date. Never number a blank form as content.**
