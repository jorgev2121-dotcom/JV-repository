# ATYPICAL DD ADDENDUM — 7823 NW 5 Ave: Demolish-and-Rebuild Duplex + ADU

**TRK-2026-1292** (same parcel also carried as TRK-2026-1531, "Alec microfilm batch")
**Client / builder:** Alec Valdes / Avis Builders. **Owner of record:** ASF HOMES LLC.
**Prepared:** 2026-09-19. **Classification:** READ-ONLY research (GREEN). No document moved, filed, or paid.

**Confidence is flagged on every number.** Miami-Dade County's own site (miamidade.gov)
returns 403 from this environment, so county fee schedules and the zoning map could not be
opened directly. Figures below come from web search, third-party sources, and knowledge, each
labeled High / Medium / Low. **Nothing here is invented.** Where a figure could not be
verified, it says "verify in [source]" and gives the typical value at Low confidence.

---

## Section A — What this report is, in one paragraph

This is **not** a normal "inspect the existing house" report. **The old house on this lot was
demolished and rebuilt as a new duplex with an accessory dwelling unit (ADU) included — so the
finished result is effectively three living units on a two-family build.** Per owner
instruction, permit history is kept light here (it was a demo/rebuild test and is covered
elsewhere). **The valuable work in this addendum is the "what would it take to reproduce this"
analysis: the septic-versus-sewer cost picture, and the minimum lot and setback math for a
duplex-plus-ADU in the correct jurisdiction.**

---

## Section B — Subject summary (the facts we hold)

**Address:** 7823 NW 5th Ave, Miami FL 33150.

**Folio (quoted exactly as recorded in the repo):** `01-3112-016-0030`.
In the standard Miami-Dade 13-digit form this is **`0131120160030`**. **Confidence: High** —
three independent proofs in the repo (`COUNTY-PROOF-RESULTS.md`) confirm this folio and that
TRK-2026-1292 and TRK-2026-1531 are the same parcel.

**Build outcome:** a new **duplex + ADU**. The current for-sale listing markets the finished
property as **8 bedrooms / 6 bathrooms, about 3,408 sq ft of living area** (Zillow / Redfin,
MLS A11960441). **Confidence: Medium** — listing data, not the county roll.

**Permits / completion:** the City of Miami shows **13 permits, all Final, with a Certificate
of Occupancy issued 2026-08-04**; a separate county system shows **one permit (2024012221)
opened and never inspected** — likely a county copy of a City permit, but not confirmed closed.
**Confidence: Medium** — from the repo permit-history writeup.

**County tax-roll lag (important):** the county still codes the parcel **VACANT RESIDENTIAL,
living area 0, year built 9999**, while the same record lists 6 bed / 4 bath. **That is a
tax-roll that has not caught up to the finished building, not evidence of an unpermitted
structure** — the CO dated 2026-08-04 explains it. **Confidence: Medium.**

**Prior sale:** **$320,000** against a county value of **$222,523** (pre-rebuild). **Confidence: Medium.**

**Lot size and recorded dimensions: NOT VERIFIED.** No lot area, width, or depth appears
anywhere in the repo, and the County site that would confirm it is blocked from here. **This is
the single biggest gap and the numbers in Sections E and F cannot be finished without it.** See
Section H.

---

## Section C — Jurisdiction determination (answer first)

**This is the City of Miami, not unincorporated Miami-Dade.** The folio prefix **`01` is the
City of Miami municipality code.** **Confidence: High.** The plan file once labeled 1292
"Miami-Dade" and 1531 "City of Miami"; that split is what made one parcel look like two jobs.
The prefix settles it: **one parcel, City of Miami jurisdiction.**

**Why it matters for this addendum:**

1. **Zoning is Miami 21** (the City's form-based transect code), **not** the county's zoning
   code. Minimum lots, setbacks, and duplex/ADU rules all come from Miami 21, Article 5.
2. **The Certificate of Use and the permit file live with the City of Miami**, and never appear
   in either county engine — so "county shows nothing" is a jurisdiction mismatch, not a clean
   record.
3. **Water and sewer are still Miami-Dade WASD**, because WASD is the regional utility that
   serves the City of Miami. So the septic/sewer analysis below is county-utility-based even
   though zoning is City.

---

## Section D — Septic vs sewer for a new duplex + ADU

**Bottom line first: for a new duplex-plus-ADU on an urbanized City of Miami lot like this one,
sewer is almost certainly required and septic is effectively off the table.** Sewer is also the
cheaper compliant path. Here is why, with sources.

### D1. Can a new multi-unit even use septic here? Probably not.

1. **Conventional septic is no longer legal for new systems anywhere in Miami-Dade.** Under
   **Ordinance 22-83, adopted July 7, 2022**, conventional (Type 1) septic tanks are **no
   longer allowed for new or total-replacement OSTDS serving any development in Miami-Dade
   County.** New installs must be **performance-based, nitrogen-reducing** systems, and **DERM's
   Water & Wastewater Division must review and approve them.** **Confidence: High** (multiple
   sources, incl. RSP Engineers and the county OSTDS Guidance Manual references).
2. **Where public sewer is available and abutting, connection is generally required.** DERM
   issues a **Notice of Required Connection (NORC)** to owners abutting sanitary sewer, and WASD
   charges a connection fee. **7823 NW 5th Ave sits in the urbanized Little River grid of the
   City of Miami, where WASD sewer mains are very likely present in the right-of-way** — which
   would make sewer connection mandatory and septic not an available option for a new build.
   **Confidence: Medium** — sewer availability at this exact address is not yet confirmed; see
   Section H.
3. **Minimum lot size for a duplex on septic varies by potable-water source** (public water vs
   private well) under Miami-Dade Code Chapter 24 / the OSTDS Guidance Manual. On a small city
   infill lot, a **new performance-based OSTDS sized for a duplex + ADU (three units of sewage
   flow) would very likely fail the lot-area/loading test** even if it were otherwise allowed.
   **Confidence: Medium** — exact loading math needs the verified lot area and DERM's table.

### D2. Cost differential (realistic ranges, all flagged)

**Sewer connection (the likely path):**

- **WASD sewer connection charge:** roughly **$1,176 for a single-family unit** and about
  **$756 per unit for multi-family**, plus a **water connection charge around $292** (about
  210 gallons/day at ~$1.39/gal) for a single unit; effective ~Oct 1, 2025. **Confidence: Low–
  Medium** — these are the connection *charges* only, pulled from search summaries of the WASD
  fee schedule; **verify in the WASD "2025-26 Schedule of Fees."**
- **All-in sewer hookup** (connection charges **plus** the lateral to the main, meter,
  backflow, on-site plumbing, permits, and restoration) for a new duplex + ADU realistically
  runs **about $8,000 to $30,000+**, driven mostly by distance to the main and whether a usable
  lateral already exists. **Confidence: Low** — general Miami construction estimate, not a quote.

**Septic (only if permitted, which is doubtful):**

- A **new performance-based / nitrogen-reducing OSTDS** in Miami-Dade — design, DERM permit,
  the engineered system, and drainfield — typically runs **about $15,000 to $40,000+**, and
  conventional Type 1 is banned outright. **Confidence: Low** — market range, not a quote.

**The differential, stated plainly:** **sewer is both the cheaper option and, on this lot, the
only compliant one.** Septic would cost more, require an engineered system, need DERM approval,
and would very likely be rejected on lot-area/loading grounds for a three-unit flow. **So the
"reproduce this" cost line for utilities should assume sewer connection, budget on the order of
$10k–$30k all-in, and treat septic as a non-starter pending DERM confirmation.**

---

## Section E — Minimum lot, setbacks, and coverage (Miami 21)

**First, the zoning district must be confirmed — and it is not yet.** The interior 7800 block
of NW 5th Ave is residential; the nearby NW 79th St corridor carries much higher zoning (T5/T6),
but this parcel is set back from that corridor. **The two most likely transect zones are
`T3-O` (Sub-Urban Open) or `T4-R` (General Urban Restricted).** **The fact that a duplex + ADU
was actually built and received a CO tells us the parcel is in a zone that permits two-family
use** — which is consistent with either T3-O or T4-R, but **not** T3-R or T3-L (single-family).
**Confidence: Low on the exact zone** — the City zoning map is on the blocked county/City GIS;
**verify the transect on the City of Miami / Miami 21 zoning map before relying on any figure
below.**

### E1. If the zone is T3-O (Sub-Urban, duplex allowed by right)

- **Two-family / duplex is allowed by right in T3-O** (one Principal Building of two Dwelling
  Units per lot). **Confidence: High** (Miami 21 Article 5, T3-O).
- **Minimum lot area: 5,000 sq ft. Minimum lot width: 50 ft.** **Confidence: High.**
- **Maximum lot coverage: 50% of the lot on the first floor, 30% on the second.** **Confidence: Medium.**
- **Setbacks (typical T3 values — verify in Miami 21 Article 5, Illustration 5.3):** **front
  ~20 ft, side ~5 ft, rear ~20 ft** (rear may reduce where an alley abuts). **Confidence: Low —
  verify each figure in Illustration 5.3.** Miami 21 allows setbacks to be adjusted by **Waiver
  up to 10%.**
- **ADU:** the City moved to **expand ADUs from T3-L into T3-R and T3-O** (ordinance passed
  **first reading February 2025** — confirm final adoption with City Planning). Proposed size
  cap is roughly **500 sq ft or 10% of lot, up to 800 sq ft.** **Confidence: Low — confirm the
  ADU ordinance's adoption and its effective date, because a duplex-plus-ADU (three units) on a
  T3 lot depends on it.**

### E2. If the zone is T4-R (General Urban, two-family/multifamily)

- **Two-family and small multifamily are allowed**, at higher density than T3. **Minimum lot
  area is generally 5,000 sq ft**, with smaller setbacks and higher coverage than T3.
  **Confidence: Low — verify all T4-R figures in Miami 21 Article 5.**

### E3. Florida statewide law — note the effective dates

- **There is no Florida statewide mandate forcing cities to allow ADUs.** **Statute 163.31771
  is permissive** — it *encourages* local ADU ordinances, it does not require them. **Confidence: High.**
- **A 2026 statewide ADU mandate (SB 48) passed the Senate but died in the House in March 2026 —
  it did not become law.** So ADU authority here rests on the **City of Miami's own Miami 21
  ordinance**, not on a state override. **Confidence: Medium.** **Do not cite a statewide ADU
  right for this parcel.**

---

## Section F — Subject lot vs. the minimum required

**This comparison cannot be completed yet, and here is exactly why.** **The subject lot's
actual area, width, and depth are not in the repo and could not be pulled** (County site blocked
from here). So the honest statement is:

1. **Required minimum (if T3-O):** **5,000 sq ft area, 50 ft width**, 50%/30% coverage.
2. **Subject actual:** **UNKNOWN — must be verified from the County property card or the recorded plat.**
3. **Therefore the pass/fail comparison is pending one data point: the recorded lot dimensions.**

**What can be said now:** a standard interior City of Miami lot in this grid is commonly around
**50 ft × 100–135 ft (roughly 5,000–6,750 sq ft)**, which would *typically* meet or slightly
exceed the T3-O 5,000 sq ft / 50 ft minimums. **But "typically" is not verification** — a lot
one or two feet narrow, or a few hundred square feet short, changes the answer, which is exactly
what Section G is about. **Confidence: Low — do not treat the "typical" range as the subject's actual size.**

---

## Section G — SPECIAL NOTE: the 5% rule and administrative variance

**Owner directive — the 5% rule.** **If the verified subject lot comes in within 5% *below* any
applicable minimum — lot area, lot width, or an over-limit on lot coverage — flag it, because an
administrative variance (or a Miami 21 Waiver) may be required for that shortfall.**

Applied to the T3-O minimums (recompute once the zone is confirmed):

1. **Lot area:** minimum 5,000 sq ft. **The 5%-below band is 4,750–5,000 sq ft.** A lot in that
   band is deficient and **likely needs a variance for lot area.**
2. **Lot width:** minimum 50 ft. **The 5%-below band is 47.5–50 ft.** A lot in that band is a
   deficient width and **likely needs a variance.**
3. **Lot coverage:** maximum 50% first floor. **If the built footprint lands within 5% over —
   roughly 50%–52.5% — flag it as a coverage overage that likely needs a Waiver or variance.**

**Two Miami 21 mechanisms exist for this:** a **Waiver** can adjust *setbacks* by up to 10%
administratively; a true **lot-area, width, or coverage deficiency generally needs a Variance**
(a higher bar, heard by the City). **Since a duplex + ADU was already built and got a CO, any
such relief would have been obtained during permitting — so if the lot turns out to be within
the 5% band, the file should already contain the variance/waiver, and its absence would itself
be a red flag to chase.** **Confidence: Medium on the mechanism; the actual need is Low until
the lot is measured.**

---

## Section H — Data gaps to confirm (each with the one action that closes it)

1. **Lot area, width, and depth — the top gap.** Not in the repo; County site blocked here.
   **Closes with:** one look at the Miami-Dade property card or the recorded plat for folio
   `01-3112-016-0030` (desktop browser or a call to the Property Appraiser). **Everything in
   Sections F and G depends on this.**
2. **Exact zoning transect (T3-O vs T4-R vs other).** **Closes with:** the City of Miami /
   Miami 21 zoning map for the parcel (gis.miami.gov — blocked here). Confirms which minimums
   and setbacks apply.
3. **Miami 21 setback numbers.** Front/side/rear quoted here are typical T3 values.
   **Closes with:** Miami 21 Article 5, Illustration 5.3, for the confirmed zone.
4. **ADU authority and effective date.** The T3-R/T3-O ADU expansion passed first reading
   Feb 2025 — adoption not confirmed. **Closes with:** City of Miami Planning confirming the
   ordinance is adopted and its effective date, plus the size cap actually in force.
5. **WASD sewer availability at the address.** Assumed present; not confirmed. **Closes with:**
   a WASD availability check for the parcel; also confirms whether septic was ever even an option.
6. **WASD connection-charge figures.** The ~$1,176 sewer / ~$756 per multi-family unit / ~$292
   water numbers are from search summaries. **Closes with:** the WASD "2025-26 Schedule of Fees"
   (miamidade.gov — blocked here; pull from desktop).
7. **The open county permit 2024012221.** Opened, never inspected. **Closes with:** one free
   County lookup to confirm it is a duplicate of a Final City permit, not a live open permit.
8. **County tax-roll still coded vacant.** Expected to correct on the next roll after the
   2026-08-04 CO. **Closes with:** re-pull the property card next cycle to confirm the roll updated.

---

## Section I — One-line recommendations for the "reproduce this" section

1. **Utilities:** budget **sewer connection (~$10k–$30k all-in)** and treat septic as a
   non-starter for a new three-unit flow in this location — pending the WASD availability check.
2. **Land:** confirm the lot meets **5,000 sq ft / 50 ft (T3-O)** before assuming the duplex +
   ADU is reproducible by right; if it is within 5% below, expect a variance.
3. **ADU:** the third unit rests on the **City's ADU ordinance, not state law** — confirm it is
   adopted before promising a duplex-plus-ADU outcome on a similar lot.

---

*TRK-2026-1292 · 2026-09-19 · #alec-dd #infill-duplex-adu #septic-vs-sewer #variance-5pct*
