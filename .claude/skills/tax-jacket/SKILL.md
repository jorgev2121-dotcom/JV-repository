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

**IMAGE-ENHANCEMENT RULES (Jorge's v2→v3 grade, 2026-08-29 — "all your tools applied = a perfect outcome"):**
- **Copier blackout → WHITE.** The solid black bands/frames a copier leaves are not data — crop them
  off (photos) or map them to white (documents). Never leave black borders.
- **Handwriting is NEVER dark enough — always deepen the ink to maximum black.** Faint pencil/pen is
  the recurring failure; push contrast so handwritten folios, dates, permit numbers, and remarks go
  as black as possible without touching the photo branch.
- **Low-contrast / gray-background pages: darken the whole page for contrast** (deepen writing AND
  typing). Some pages need a harder push than others — turn the dial per page until legible.
- **Straighten every card/handwritten page head-up** (90°/180° as needed).
- **Photos + their backs go on ONE sheet** (photo cropped on top, back cropped + ink-darkened below),
  and **add the folio + date as text for OCR** so the sheet is searchable.
- **The `PERMIT NO.` field is a template argument:** these forms have a TYPED "PERMIT NO." label. If
  the label is present and the handwritten entry is faint/illegible, that is NOT "no permit" — it is
  **"permitted, number not legible"**, which is arguable. Snip the labeled cell, paste it into the
  deliverable as a transcription, and cite the blank-template from the library to prove the field
  exists. Re-scan that exact cell at high DPI before calling it blank.

**COVER PAGE + AI CONCLUSION (Jorge, 2026-08-29):** the deliverable opens with a COVER PAGE and an
**AI CONCLUSION that synthesizes every page comment into the forensic storyline** (built → PA
outside-only guesses → documented changes → permitted or exposure → code-era red flags). State it as
analysis for the reader; **the final call on whether an addition was legally built belongs to the
Building Department's human judgment** (they may send an inspector to check consistency with code as
understood at the time — and code changes over time). Cross-reference the CODE-ERA red-flags
reference (defective materials by era, flood/sunroom, bathroom/shower sizing, HVAC, the
"legalize→bring to the code of the year of the infraction" rule) — all entries source-tagged and
VERIFIED, never asserted from memory. Keep the green top-of-page comments Jorge likes; they feed the
conclusion.

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

## PERMIT-CODE TRANSLATION + MICROFILM GAP (Jorge, 2026-09-13) — see DD-WRITEUP-TEMPLATE.md (TRK-2026-9781)
- **Permit cards are county CODES, not homeowner language. The legend is on the page BEHIND the permit
  application.** Cross-reference EVERY code into plain narrative, permit by permit: e.g. reroofing code "999" →
  "Reroofing permit [#], dated Jan 11 1964 — Final, in good standing." The result = "the house as permitted."
- **Then compare permits vs the tax jacket.** Year-dependent: a permit may or may not carry a number to
  substantiate it; flag any addition/sq-ft the PA shows that the permit record does not.
- **Microfilm gap rule:** County VERIFIED disclosure (microfilm appointment email): records retention is
  "10 anniversary years after issuance of certificate of occupancy … we cannot guarantee that the Department
  has all records available" (GS1-SL). Owner's operational timeline (NOT a county quote): 1961–73 fully
  missing; 73–78 partial; 78–~85/86 handwritten; ~85/86+ computerized. **Exact printed year ranges are on the
  microfilm application page — RAMBO must quote them (Cloud is egress-blocked from miamidade.gov).**
  For an addition the PA records in a gap period with no permit/microfilm to substantiate → say it is
  **UNDETERMINED** (not clean, not illegal): "gap in microfilm; PA shows an addition of ~X sq ft in that gap;
  unable to determine legal/compliant/unpermitted; subject to a county walk-through inspection to verify
  built-to-code." Never round a gap to "clean."

- **THE GAP-COVERAGE RULE — most telling evidence (Jorge, 2026-09-16).** The single most telling thing in a
  jacket is a **permit number dated AFTER the original year built.** Because 1961–1978 microfilm is missing/partial,
  a later permit is often the only proof that gap-era work was legalized — so a post-build permit can be the
  **legally-permitted addition that COVERS the microfilm gap.** Every report must therefore:
  1. **Enumerate every permit number found after the year built**, newest context first.
  2. For each, ask **which gap-era change (if any) it could cover** — an "alter exterior" / "add-alt" scope can
     legalize an earlier enclosed lanai, CB wall, or addition; a reroof covers the roof only; etc.
  3. State the action: **pull that later permit's scope** to confirm it reaches the gap-era work → if it does, the
     gap exposure is **CURED**; if not, fall back to microfilm pull / county walk-through.
  Lead the CONCLUSION with this analysis. A gap-era item is only UNDETERMINED **after** ruling out that a
  later permit covers it — do not flag exposure while an un-read post-build permit could legalize it.
  **When the build year itself falls INSIDE the microfilm gap (e.g. built 1966, gap 1961–1978), the coverer must be
  dated AFTER the gap ends, not merely after the build year** — a permit issued within the gap is itself in the
  missing-records window and cannot be relied on. Say "permits found after the 1961–1978 gap," not "after 1966."

- **PRESUMPTION — unpermitted until shown otherwise (Jorge, 2026-09-16).** Any **added or enclosed space, or an
  attached/detached structure, not supported by a permit is PRESUMED unpermitted work (a violation)** — rebuttable
  only by evidence (most often a later permit whose scope covers it, per the gap-coverage rule). Write enclosures
  and additions this way in the conclusion, not as neutral facts.

- **LOT COVERAGE + VARIANCE (Jorge, 2026-09-16, expanded).** Where footprints can be determined, compare total
  footprint to the parcel's **maximum lot coverage**. State the max/setback from the **zoning code IN EFFECT THE YEAR
  THE ADDITION WAS ADDED** if that is readily findable; **otherwise fall back to the CURRENT setback + lot-coverage
  standard, and say which was used.** **Search all applicable zoning + variances/resolutions and STATE THE NUMBER** of
  any found; if a variance exists, **adjust the approved coverage to match it.** An excess with no variance/resolution
  is itself a violation. **Write it in plain, five-year-old-simple language and give a worked example** — the
  plate/food analogy: the lot is a dinner plate, the building is the food, "coverage" is how much of the plate the food
  covers, "setback" is the empty rim you must leave, a "variance" is a permission slip to cover more (cite its number).
  (Seats egress-blocked from the county hand the code/variance lookup to RAMBO.)

- **PHOTO-BACK SNIP PROCEDURE (Jorge, 2026-09-16) — RULE: when a picture is followed by a page carrying folio +
  date** (the photo's back with folio, date, agent signature): **snip that folio/date/signature block, paste it onto
  the picture's own page, and transcribe it (OCR).** One sheet = photo (top) + its back-snip + transcription. Apply
  to every photo/back pair — never leave the back as a separate loose page. **Then REFERENCE the dated photo evidence
  in the CONCLUSION** — a photo stamped with a folio + date (e.g. 11-20-67) is the visual baseline for the build year;
  cite it by page ("baseline photos, pp. 3–5") and read later changes against it. **Cross-index the whole conclusion
  with page numbers** (PA card p.X, permits p.Y) so the report is self-indexing.

- **ERA-HAZARD / DEFECTIVE-MATERIAL LIST (Jorge, 2026-09-16).** Every report includes the full era-triggered
  hazard/defective-material list from the **verified Build-Year Red-Flags reference (`reference/CODE-ERA-REDFLAGS.md`)**,
  with an **indicator per item flagged against the build year + every addition year** (and the SoFla location where the
  reference is regional): **APPLIES** (a year lands in the window), **POSSIBLE** (only via a later addition year),
  **CONDITION** (any era — check on site, e.g. FEMA below-BFE, bathroom clearances), **N/A** (out of range). Carry the
  reference's confidence tags and its "do not cite" fences verbatim. These are **inspection triggers, not findings** —
  the on-site inspection and building department make the call. (10980 worked example: aluminum wiring, lead, asbestos,
  cast-iron drain, galvanized, FPE/Zinsco all APPLY to a 1966 SoFla build; poly-B POSSIBLE via the 1989 work.)

- **APPLIANCE / SYSTEM CHANGE-OUT vs. GRANDFATHER — code-by-year (Jorge, 2026-09-16).** For fixtures/appliances like
  **washers & dryers** (and by extension AC, water heaters, panels): determine the code by year. In South Florida the
  jurisdiction code was the **South Florida Building Code (SFBC)** — first edition Ordinance 57-22 (Oct 29, 1957),
  editions through **1994** — until it was retired and replaced by the statewide **Florida Building Code (FBC),
  effective March 1, 2002** (VERIFIED: Miami-Dade/Broward Board of Rules & Appeals; FBC 3/1/2002). Rule: **before a
  requirement existed in the applicable SFBC edition, an untouched permitted install is grandfathered; after it became
  code, new/replaced installs meet the edition in force; at a CHANGE-OUT, a like-for-like appliance swap is maintenance,
  but touching the circuit / vent / drain / gas pulls THAT portion up to CURRENT FBC (permit + inspection), losing
  grandfather for it — building official's discretion.** State the exact edition provisions and current FBC/NEC clauses
  as **TO-VERIFY** against primary code text (RAMBO / permit-expert Miami-Dade module) — never assert clause numbers from
  memory. The four buckets for laundry: electrical (dedicated circuits + GFCI/AFCI), dryer venting (rigid metal to
  exterior, backdraft damper, length limits), plumbing (standpipe height/trap), gas (line + venting).

- **LISTING-HISTORY CROSS-CHECK (Jorge, 2026-09-16).** Search the public listing sites (**realtor.com, Zillow,
  Redfin, LoopNet, Compass**) for the address and compare what the property was **marketed as** to the county record.
  **Anything the listing claims BEYOND the record is a RED FLAG** — more beds/baths, more square feet, an extra unit,
  or marketing language like **"mother-in-law quarters / in-law suite / guest house / detached (or attached) quarters /
  bonus room / converted garage / enclosed patio-lanai / extra or income unit."** A listing describing space the permit
  record does not support → **presume unpermitted until shown otherwise** (ties to the presumption rule). Any listing
  claim that contradicts the record gets flagged. **Cloud is egress-blocked from realtor.com/Redfin/LoopNet/Compass** —
  it can read search snippets but the full listing text + description + listing history is a **RAMBO browser pull**.
  (10980 example: search snippets showed ~14,178 sq ft "finished" vs the PA's 11,146 adjusted — a ~27% gap to confirm
  is not unpermitted enclosed space — and a "2–4 units" aggregator tag vs the record's 16 units.)

- **FOOTER STAMP — time + supersession, not "CURRENT" (Jorge, 2026-09-16).** Every page footer reads
  `TRK-#### · v[N] · p[NN] · [YYYY-MM-DD] · [HH:MM TZ] · supersedes v[N-1]` — i.e. **replace the CLAUDE.md §9.2
  "CURRENT" status word with the actual time and which version this one supersedes.** A superseded page keeps its own
  old stamp; the new version names what it replaced. (Charter §9.2 to be updated to match.)

- **FAINT-PAGE LEGIBILITY PASS (Jorge, 2026-09-16 — ratified after 10980 pp. 11 & 13).** For a page whose text is
  faint / low-contrast (dot-matrix and screen-dump printouts especially): **grayscale → autocontrast → deepen the ink
  (stretch mid-grays toward black, keep the background white — never binarize a photo) → crop to the content bounding
  box → enlarge (~1.8×, LANCZOS) → center on a white page with a small margin.** Documents only (the photo branch
  stays grayscale-from-original). Always eyeball the result to confirm it is actually more legible before adopting it.

## Never
- Never process only the first pages of an attachment.
- Never write into ORIGINAL, never supersede without `_Superseded\` + `.bak` per charter.
- Never mix the jacket count with the cabinet pass (Jan-2022→today) — different scopes.
- Never read a street number as a quantity (10980 is an address, not a count).
- **Never binarize a photograph. Never shrink a photo to fit. Never present a PA date as the build
  date. Never number a blank form as content.**
