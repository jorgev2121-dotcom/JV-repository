# Property Appraiser Sketch & Record-Card Legend

**Purpose:** A reference key for the markings, abbreviations, and codes on
Miami-Dade Property Appraiser hand-drawn building sketches and property record
cards (PRCs), for use as supporting documentation in CU Inspections
due-diligence reports.

**Compiled:** 2026-08-29 by Cloud executor (research-only task).
**Method:** WebSearch snippets only. `WebFetch` was **fully egress-blocked** in
this environment for every external domain (Miami-Dade PA, Lee County, DOR, even
Wikipedia), so no page could be read verbatim. Every entry below is corroborated
by search-result snippets attributed to the cited publisher, but the exact
wording on the source page has **not** been visually confirmed. See `SOURCES.md`.

---

## Section A — The one thing to know first (read this before using the codes)

**There is no single "official Miami-Dade" or "Florida DOR" published legend for
building-sketch sub-area codes.** This is the load-bearing finding.

1. **The Florida Department of Revenue (DOR) does NOT standardize or publish
   sketch/sub-area codes.** DOR's property-tax-oversight documents (DR-493, the
   Florida Real Property Appraisal Guidelines, the NAL/SDF/NAP data-file user
   guides) govern *valuation adjustments and data submission*, not the letter
   codes drawn on a sketch. Sub-area codes are **defined inside each county's
   CAMA system** (Computer-Assisted Mass Appraisal), county by county.

2. **The codes are, in practice, near-identical across Florida counties** because
   most run the same family of CAMA software. So a code list published by one
   county Property Appraiser is authoritative *for that county* and a strong,
   traceable proxy for Miami-Dade — but it is not literally Miami-Dade's own
   published list.

3. **The closest thing to an "official Florida list"** is a county PA's published
   **"SUB AREA CODE LIST."** Lee County's is even titled *"Lee County Property
   Appraiser — State of Florida — SUB AREA CODE LIST"* (leepa.org). Highlands,
   Hillsborough, and Clay counties publish equivalents.

4. **Miami-Dade PA's own glossary pages exist and are OFFICIAL** — but they were
   egress-blocked here, so their exact code list could not be captured. URLs are
   in `SOURCES.md` for Jorge to open directly.

**How to tag this in a DD report:** cite the code meaning to a named Florida
county PA "Sub Area Code List" (OFFICIAL for that county) and note it reflects the
standard statewide CAMA convention. Do **not** claim DOR publishes it.

---

## Section B — Building sub-area / sketch abbreviations (the F/U convention)

This is the convention used on Miami-Dade sketches and by Lee, Highlands,
Hillsborough, Clay, and Volusia counties. **Prefix rule:** `F` = Finished,
`U` = Unfinished. Areas are drawn as polygons on the sketch and labeled with
these codes plus the square footage.

**Tag key:** OFFICIAL = the code + meaning is published in a named FL county PA
code list/glossary. COMMON-PRACTICE = widely used and consistent across sources
but not tied to one specific published page. `?` = meaning uncertain, verify.

| Code | Meaning | Tag | Traceable to |
|---|---|---|---|
| **BAS** | Base Area — the primary heated/living area, in sq ft. The value anchor of the whole sketch. | OFFICIAL | Volusia CPA; Archuleta key; Lee sub-area list |
| **SFB** | Semi-Finished Base | OFFICIAL | Lee County sub-area list |
| **FUS** | Finished Upper Story | OFFICIAL | Lee County sub-area list; Mesa County abbrev. list |
| **UUS** | Unfinished Upper Story | COMMON-PRACTICE | FL sub-area lists |
| **FGR** | Finished Garage | OFFICIAL | Clay CPA; Lee list; AcronymFinder (building code) |
| **UGR** | Unfinished Garage | OFFICIAL | Lee/Highlands sub-area lists |
| **FCP** | Finished Carport | OFFICIAL | Clay CPA; Lee list |
| **UCP** | Unfinished Carport | COMMON-PRACTICE | FL sub-area lists |
| **FOP** | Finished Open Porch | OFFICIAL | Clay CPA; AcronymFinder (building code) |
| **UOP** | Unfinished Open Porch | COMMON-PRACTICE | FL sub-area lists |
| **FEP** | Finished Enclosed Porch | OFFICIAL | Clay CPA; Lee list |
| **UEP** | Unfinished Enclosed Porch | COMMON-PRACTICE | FL sub-area lists |
| **FSP** | Finished Screen(ed) Porch | COMMON-PRACTICE | FL sub-area lists |
| **USP** | Unfinished Screen(ed) Porch | COMMON-PRACTICE | FL sub-area lists |
| **UST** | Unfinished Storage / Utility | OFFICIAL | Clay CPA ("Storage, Unfin."); Lee list |
| **FST** | Finished Storage / Utility `?` | COMMON-PRACTICE `?` | inferred from F/U pairing — verify |
| **FAT** | Finished Attic | OFFICIAL | Mesa County abbrev. list; Cherokee Co NC list |
| **UAT** | Unfinished Attic `?` | COMMON-PRACTICE `?` | inferred pairing — verify |
| **FBM** | Finished Basement `?` | COMMON-PRACTICE `?` | rare in South FL (few basements) — verify |
| **UBM** | Unfinished Basement `?` | COMMON-PRACTICE `?` | verify |
| **APT** | Apartment | OFFICIAL | Archuleta key; Cherokee Co NC list |
| **CAN** | Canopy | COMMON-PRACTICE | FL sub-area lists |
| **PTO** | Patio (open, at-grade slab; often little/no value) | COMMON-PRACTICE | FL sub-area lists |
| **BAY** | Bay (projecting bay area) | COMMON-PRACTICE | Mesa County abbrev. list |
| **LBA** | Lobby | COMMON-PRACTICE | Mesa County abbrev. list |
| **FDC** | Finished Detached Carport/Garage `?` | COMMON-PRACTICE `?` | Mesa list shows "FDC Finished Det…" — exact noun unconfirmed |

**Detached-structure and lower-level variants** seen in FL sub-area lists (tag
COMMON-PRACTICE unless noted; verify against the specific county list before
citing):
UDC (Unfin. Detached Carport), UDG (Unfin. Detached Garage), UDS (Unfin.
Detached Screen Porch), UDU (Unfin. Detached Utility), UHS (Unfin. Half Story),
ULG (Unfin. Lower Garage), ULL (Unfin. Lower Level), ULP (Unfin. Loading
Platform), ULS (Unfin. Lower Screen Porch), ULU (Unfin. Lower Utility).

### B.1 — Lanai / Florida room note
Jorge's list mentions **lanai** and **utility**. In the FL CAMA convention a
lanai (screened/roofed patio) is typically captured as a **screen porch (FSP/USP)**
or **enclosed porch (FEP/UEP)** rather than a dedicated "LANAI" code; a **"Florida
Room"** is the classic example of an **enclosed porch, finished (FEP / EPF)**.
Utility rooms fall under **UST/FST**. `?` No dedicated `LANAI` code was confirmed
in any published list — verify on the specific card.

---

## Section C — The Pinellas-style variant (suffix convention)

**Important:** not every FL county uses the F/U-prefix codes. **Pinellas County
PA** publishes an official glossary using a **suffix** convention — the noun comes
first, the finish letter last. If Jorge ever pulls a Pinellas card the same
areas look different:

| Pinellas code | Meaning | F/U-prefix equivalent | Tag |
|---|---|---|---|
| **GRF** | Garage, Finished | FGR | OFFICIAL (Pinellas CPA glossary) |
| **GRU** | Garage, Unfinished | UGR | OFFICIAL (Pinellas CPA glossary) |
| **OPF** | Open Porch, Finished | FOP | OFFICIAL (Pinellas CPA glossary) |
| **OPU** | Open Porch, Unfinished | UOP | OFFICIAL (Pinellas CPA glossary) |
| **EPF** | Enclosed Porch, Finished (e.g. Florida Room) | FEP | OFFICIAL (Pinellas CPA glossary) |
| **EPU** | Enclosed Porch, Unfinished | UEP | OFFICIAL (Pinellas CPA glossary) |

The Pinellas glossary also gives useful **plain-English definitions** of what
"finished" vs "unfinished" means for each (roof type, ceiling finish, slab,
electrical, HVAC) — the best publicly readable descriptions found. See
`SOURCES.md` for the per-letter glossary URLs.

---

## Section D — Construction / quality / condition codes

These describe *how the building is rated*, separate from the area codes.
Meanings below are attributed by search snippets to the **Miami-Dade PA**
glossary / property-value pages (OFFICIAL) but could not be read verbatim.

1. **Grade (quality grade).** A quality-of-construction rating assigned by the
   appraiser. **Scale runs X+ (highest) down to E- (lowest)**, with `+`/`-`
   modifiers to fine-tune between grade classes. Driven by materials and
   workmanship. **Tag: OFFICIAL (Miami-Dade PA glossary).**

2. **CDU — Condition / Desirability / Utility.** A combined condition,
   functional, and locational rating of the improvement, ranging (typically)
   **Excellent → Very Good → Good → Average → Fair → Poor → Unsound**. Reflects
   physical condition, how desirable/functional the layout is, and the utility of
   the systems (HVAC, kitchen/bath updates). **Tag: OFFICIAL (Miami-Dade PA
   glossary).** `?` The exact worded rung labels Miami-Dade uses were not
   captured — verify on the card's legend.

3. **AYB — Actual Year Built.** The original construction year. **Tag: OFFICIAL.**

4. **EYB — Effective Year Built.** The year the structure "acts like" it was
   built, after renovation/updating; used to measure depreciation, not the same
   as AYB. **Tag: OFFICIAL (Miami-Dade PA glossary).**

5. **Depreciation / cost approach.** Miami-Dade values improvements partly by the
   **cost approach**: current replacement cost of the structure, **less
   depreciation** measured from the effective year built and condition. **Tag:
   OFFICIAL (Miami-Dade PA `property_value.asp`).**

6. **% Good / Overall % Good** (`?` for Miami-Dade). In many CAMA systems the
   depreciation multiplier applied to replacement cost is shown as "**% Good**"
   (Appraised = Replacement Cost × % Good). Confirmed in out-of-state CAMA guides
   (Patriot/Avitar/Vision); **not confirmed as the exact Miami-Dade label** —
   verify. **Tag: COMMON-PRACTICE `?`.**

---

## Section E — Property Record Card field legend & the points/value breakdown

### E.1 — What the labeled fields mean

A Florida PRC generally carries: **Folio / Parcel ID** (Miami-Dade = 13-digit
folio), **legal description**, **land line(s)** (dimensions, use, land value),
**building/improvement line(s)**, a **construction-detail block**, the
**sketch**, **sub-area table** (each area code × sq ft), **extra features** (pool,
dock, wall), and a **value summary** (Land + Building + Extra Features +
Outbuildings = Appraised/Just Value). **Tag: COMMON-PRACTICE**, corroborated by
multiple "How to read your PRC" guides; Miami-Dade's own field labels differ in
wording — read them off the actual card.

**DATE PERMIT / PERMIT NO.** — the PRC records the **building-permit number and
date** tied to the improvement or addition that changed the assessment. On older
Miami-Dade cards this is how an addition/renovation is dated for the
**effective-year-built** and depreciation calculation. **Tag: COMMON-PRACTICE**
(field is standard; exact Miami-Dade caption to be read off the card).

### E.2 — The "points totaling ~100" component method (the old cards)

The point/component table Jorge describes — **exterior walls, roof, interior,
plumbing, electric, heating, etc., each carrying a share of points that sum to
~100** — is the classic **component-breakdown grading method** used on
pre-computerized appraisal cards.

**How it is read:**
1. Each building **component** (exterior wall, roof structure, roof cover,
   interior finish, flooring, plumbing/# of fixtures, electrical, heat/AC) is
   assigned a **point value = the percentage that component historically
   contributes to total construction cost.** The points are engineered to **sum
   to ~100** for a complete standard building.
2. If a component is missing, cheaper, or of higher quality, its points are
   adjusted up/down. The **total points** then act as a percentage/quality
   multiplier against a **base price per square foot**.
3. That gives a **replacement cost**, which is then reduced by **depreciation**
   (from CDU / effective year built) and multiplied by the **grade** factor to
   reach the **building's assessed value**.
4. Net formula (component-card style):
   **Base rate × area × grade factor, adjusted by the component points, then ×
   depreciation (% good) = building value**; add land + extra features for the
   total.

**Tag: COMMON-PRACTICE.** The point-component method is documented in multiple
"how to read your property record card" guides (Portsmouth NH, Granville NC,
Avitar, Iredell NC, Yadkin NC schedule of values). **Caveat for Jorge:** those
guides are Patriot/Avitar/Vision CAMA systems, **not** Miami-Dade's. The *concept*
is transferable and standard, but the **exact point weights and component list
on a Miami-Dade card must be read off that card's own legend** — do not import
another county's point weights into a Miami-Dade DD report. `?`

---

## Section F — How to search / verify a code officially

- **Miami-Dade PA glossary (OFFICIAL, egress-blocked here):**
  - `https://www.miamidadepa.gov/pa/glossary.asp`
  - `https://www.miamidadepa.gov/pa/glossary_abbreviations.asp`
  - `https://www.miamidadepa.gov/pa/property_value.asp`
  - `https://www.miamidade.gov/pa/property-search-help.asp`
- **Best readable statewide proxy:** Lee County "Sub Area Code List" PDF
  (leepa.org) — titled "State of Florida."
- **Best plain-English definitions:** Pinellas County PA glossary (per-letter
  pages).
- **DOR (valuation/oversight, NOT sketch codes):** DR-493 and Florida Real
  Property Appraisal Guidelines at floridarevenue.com.

**Footer stamp for this file:**
`OPH-pending · PA-SKETCH-LEGEND · v1 · 2026-08-29 · CURRENT`
Category handles: `#PropertyRecordCard #BuildingSketch #SubAreaCodes #MDCPA
#DueDiligence #CU-Inspections`
