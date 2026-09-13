# WORK ORDER — Alec DD: sweep all DD sources WITH SNIPS + log blockers → prepare the package
**2026-09-13 · Alec DD · TRK-2026-9047 · owner: hit the ~22–30 websites, see where the blockers are, bring back the SNIPS, then prepare the package. Rule 5: ONE worker per site + a status registry.**

**DON'T re-scrape from zero.** The DD Master v2 already pulled ~a dozen sources; the gap is **snips + the known
blockers.** Two jobs: (a) capture a SNIP for every source already pulled, (b) break/quote the blockers.

**SOURCE MATRIX (from DD Master Section E/Sources — worker enumerates the full checklist; ~22–30 rows):**
Property Appraiser · county Regulation Support (code cases, bulk violation layer) · DERM environmental · ArcGIS
Emaps/Environmental · City of Miami open building-permit layer · Sunbiz · DBPR licenses · zoning/land use · flood ·
tax roll/bills · recorded liens (Clerk) · county EPS permit history · City iBuild code · microfilm/tax-jacket · litigation.

**SPLIT:**
- **Cloud can hit (public, not egress-blocked):** Property Appraiser, City open-permit data, Sunbiz, DBPR — Cloud
  captures those + their snips on request.
- **RAMBO/browser (gated — Cloud blocked):** Clerk (Cloudflare Turnstile), county EPS (login+reCAPTCHA), City iBuild
  (login), county ArcGIS permits (404). These are the KNOWN blockers — owner-attended where a login is required.

**PER SITE (one worker each, write result the moment it finishes — Rule 11):**
1. Open the source for the property/folio. Capture a **SNIP** (screenshot) = the working paper.
2. Record: retrieved / blocked (and the exact blocker: Turnstile, login, 404, reCAPTCHA).
3. Extract the fact + tag it. **No claim without a snip.**
4. Write the row into `ALEC-DD_SITE-SWEEP-REGISTRY.md` (X of N sources: retrieved / blocked / snip-on-file).

**THEN prepare the package** per DD-WRITEUP-TEMPLATE: snip-backed working papers + plain client verdict
(clean / loose end / undetermined), the permit-code translation, jacket-vs-microfilm narrative. Filing = RED.

**CLOSING QUESTION:** Of the ~22–30 DD sources, how many are retrieved-with-snip vs blocked, and which blockers need an owner-attended login to clear?

#alec-dd #site-sweep #snips-working-papers #blockers #one-worker-per-site #TRK-2026-9047 #cloud-to-desktop
