# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: Alec DD — fix the portal, verify jacket+microfilm on disk, build the two-set structure, finish to invoice
**2026-09-12 · Job: `_ALEC-VALDES-DD` · master TRK-2026-9047 · owner reviewed the portal and flagged it unformatted + missing jacket/microfilm.**

**WHAT CLOUD CONFIRMED FROM THE PORTAL (`_PORTAL_UNASSIGNED_ALEC-VALDES-DD.html`, 38 docs, stage 07-OWNER-REVIEW):**
- **Header is broken, NOT unnumbered.** Project name blank, address blank, TRK shows "TRACKING NUMBER NOT
  ASSIGNED" — but the matter-stage banner and both jacket order logs prove the TRK is **TRK-2026-9047**.
  The `Build-Job-Portal.ps1` generator wasn't fed title/TRK/address. **Do NOT mint a new TRK — repopulate 9047.**
- **Tax-jacket ORDERS are done; jacket DELIVERABLES are not filed here.** `_ORDERS_TAX-JACKETS_2026-08-16`
  and `_2026-08-18` hold only the online-request proof PNGs (before-submit / confirmed-submitted) for the
  folios ordered (1534, 1535, 1536, 1531, 1286, plus the 8/18 batch). There is **no ENHANCED/FINAL jacket
  deliverable and no microfilm folder anywhere in the capsule.**
- **Capsule is mostly empty shells.** `01-INTAKE`, `02-PERMITS`, `03-INVOICES-PAYMENTS`, `04-CORRESPONDENCE`,
  `05-REPORTS-DELIVERABLES` all read "SHELL — AWAITING RETRO-SWEEP." `_TAGS.txt` is 0 KB (empty).
- **Money defect:** delivered-not-billed, **invoice $100.25 pending**, 25 days in stage.

**EXACT NEXT ACTIONS — these are on-disk (OneDrive/local), which only you can see. GREEN except the last two.**

1. **Repopulate the portal header** (GREEN): TRK-2026-9047, the project/owner name (Alec Valdes DD), and the
   address(es). Regenerate with `Build-Job-Portal.ps1` fed the real fields. Fill `_TAGS.txt` with the job's
   `#p-`/`#c-`/`#j-` tags. Back up first (`.bak-YYYYMMDD`).
2. **Verify what actually came back from the county** (GREEN, report a denominator): for each ordered folio,
   is the returned tax jacket on disk yet (mail/email/microfilm)? Report "jackets in hand: X of Y ordered;
   microfilm plans located: yes/no, where." This answers the owner's "there ARE microfilm plans and tax
   jacket" — find them and say where they live.
3. **Answer the two-set question by building it** (GREEN — creating new files, no client original altered).
   The owner's "clean report + originals as supporting" IS the ratified tax-jacket structure — build all THREE
   tiers per the `tax-jacket` skill (ratified 2026-08-29, gold example TRK-2026-1310):
   - **ORIGINAL\** — the county files byte-for-byte, untouched (the supporting set).
   - **ENHANCED\** — every page deskewed, handwriting pushed to max black, photos in GRAYSCALE (never
     binarized, never shrunk), folio/date/permit transcribed, NOA excluded-but-flagged, `.SEARCH.txt`/`.TAGS.txt` sidecars.
   - **FINAL** — `DELIVERABLE_<addr>_FINAL_<date>.pdf`: cover + AI conclusion (the forensic storyline:
     built → PA outside-only guess → documented change → permitted or exposed), footer-stamped per §9.
   - **The first property is the owner's stop/go gate**; then batch the rest, reporting "X of Y complete" per item.
4. **Microfilm plans** (GREEN to file + enhance; do NOT pay any new county fee without owner click): locate
   them, file into the capsule under the property, run the same legibility pass, link them in the portal.
5. **If the returned jackets are NOT on disk** (GREEN): re-scrape/re-request per the owner's "go back and
   scrape and recreate," log what you re-pulled, and file it. Note anything blocked behind a county fee (RED).
6. **Then the money gate (RED — owner's one click):** once the FINAL set is assembled and portal is clean,
   surface "release to Alec + invoice $100.25" as a one-click owner card. Delivery/sending is owner-gated.

**Batch rule:** this is >5 items (10 folios + microfilm) — fan out one worker per property with a per-item
result file (charter Rule 5 / Rule 11), night-eligible GREEN. Never a single session grinding the list.

**CLOSING QUESTION:** How many of the ordered jackets are actually back on disk (X of Y), and are the
microfilm plans located — where do they live?

#alec-dd #TRK-2026-9047 #tax-jacket #microfilm #two-set-original-enhanced-final #money-defect-100.25 #cloud-to-desktop
