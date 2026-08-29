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

## Never
- Never process only the first pages of an attachment.
- Never write into ORIGINAL, never supersede without `_Superseded\` + `.bak` per charter.
- Never mix the jacket count with the cabinet pass (Jan-2022→today) — different scopes.
- Never read a street number as a quantity (10980 is an address, not a count).
