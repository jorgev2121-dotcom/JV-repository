# PROTOCOL — Unsafe Structures lead list (Miami-Dade) · v1 · 2026-10-08
#UNSAFE-STRUCTURES #MDC #LEAD-FILTER #WALLY-PIPELINE · TRK-2026-1614 (Marketing — Wally, provisional) · report type RPT-LEADS

**Consolidated by Cloud from the pieces already in Jorge's files. Nothing new invented; additions are marked NEW.**

## Where the earlier versions live (found 2026-10-08)
1. `JOB-NEXT_UNSAFE-STRUCTURES-OPEN-CASES-2020-2026-OVERNIGHT-01_RAMBO.md` — Drive 1R7wctzYFlBa7UkY4vap18gBFiiF6ssub (Chat, 2026-10-04). By-year download, all fields, per-case classification. **Governing order until now.**
2. `TASK-C2D_UNSAFE-STRUCTURES-CORRECTIVE-ACTION-CHECK_2026-08-26.md` (Drive) — the HANDLED / EXPIRED / OPEN classification.
3. `METHODOLOGY_SCRAPE-TO-DELIVERY_END-TO-END_2026-10-06.md` (repo) — proof standard, one helper per site, cheapest method first.
4. `MIAMI-DADE-SITES.md` (repo) — SITE-11 Unsafe Structures, SITE-19 Sunbiz.
5. `PA-Library_UnsafeStructures-Top5_2026-06-20.html` — the 27-field Property Appraiser template.
6. `CODE-9712_CALL-SHEET-PRIVATE-RECERT-1287.tsv` + `CODE-9712_UNSAFE-STRUCTURES-FULL-COLUMNS-ALL-PULLS_2026-08-25.tsv` — earlier pulls and the full column list.
7. Results so far: Drive folder `UNS-OPEN-CASES-2020-2026` — **year 2020 done, 160 of 160 classified** (2026-10-05); 2021–2026 not started.

## Workflow
1. **Download by year.** RER Unsafe Structures report, OPEN cases, one year at a time (2020 → 2026), all 21 fields (CaseNum, CaseType, PropertyAddress, FolioNumber, CLegal, OpenDate, CloseDate, DeputyClerk, Inspector, PermitNum, FullName, OwnerAdress, BuildingCode, Comments, AllegedViolation, Violator, ActivityDate, Activity, DistrictNumber, Protected). Too-large error → split the year by half or quarter. Keep raw .xls/.html untouched. Merge later.
2. **Property facts** (Property Appraiser, by folio): DOR use code (0101 single family; 04xx condo), lot size, year built, heated area, units, owner and mailing address, last sale, homestead. NEW: lot size is also in the legal description ("LOT SIZE 5000 SQ FT") as a first-pass filter.
3. **Corrective-action check (after the citation date):** case activity log (RegulationSupportWebViewer → USCase → ActivitiesUS), ArcGIS permit layer (about 24 months only), MCeSearch (permits before Oct 2022), qPublic (in-app browser). Every process/permit number captured; C-prefixed = legalization application.
   - **OPEN/CALL** — nothing filed after the citation. Best lead.
   - **EXPIRED/STALLED** — filed after the citation, then expired or stuck. Good lead with a specific angle.
   - **HANDLED/SKIP** — active corrective permit after the citation. Less likely or unlikely to hire.
4. **Number trail (lineage), with stage dates:** code-enforcement / NOV case (e.g. `20170181867-B`) → Unsafe Structures case (`2020020xxxx`) → Board/Panel order recorded (Clerk OR Book/Page) → lien instrument → RER lien/CVN references (P/T numbers) with stated amounts. Amounts quoted exactly as the county shows them; payoff figures only from a title company.
5. **NEW — owner contact:** person → name + mailing address from the county (mail-ready). Company/trust → Sunbiz: officers, registered agent, principal address (SITE-19). Phone/email are NOT in county data; they need a skip-trace or the marketing vendor (see the Taj questions).
6. **Filters for Jorge** (page RPT-LEADS): status, single-family, condo in legal, owner type, minimum lot, year opened, ZIP/text. Starting rule from Jorge 2026-10-08: single-family, no association, older home, lot 5,000 sq ft or more; condo ASSOCIATIONS yes, individual condo units no.
7. **Guardrails:** read-only at the county; write each case the moment it's checked; a denominator every cycle; a hung run is detected by "file not growing"; an unreachable source = UNCHECKED, never guessed; nothing sent, filed or filed-against without Jorge.

## Delivery to the marketing vendor (only after Jorge approves the list)
CSV: owner name · owner type · mailing address · property address · folio · case number · status · violation (short) · lot size · year built · Sunbiz officer/agent (companies). No lien amounts or case history go to the vendor; those stay internal for our pitch.

## Compliance notes (planning, not legal advice)
- Email: CAN-SPAM (real address, unsubscribe, honest subject).
- Phone and text to homeowners: federal TCPA and Florida's telephone-solicitation law are strict; scrub against Do-Not-Call and get legal guidance before any calling or texting campaign.
- Mail: the safest channel for homeowners and the one the existing Wally plan was built on.

RPT-LEADS protocol · v1 · 2026-10-08 · CURRENT
