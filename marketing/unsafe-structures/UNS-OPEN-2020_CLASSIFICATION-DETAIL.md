# UNS-OPEN-2020 Classification Detail — per-case working notes (TRK-UNS-2020-OVERNIGHT-01 / M9-adjacent lead-filter run)
Read-only Miami-Dade county research only. Not title insurance or legal advice. Sources used per case are named; UNCHECKED means that source could not be reached and was not guessed.

## Case 20200202745 — 13220 SW 279 TER
- Folio: 30-6935-016-0290 (3069350160290)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", 3bd/2ba, 1,997 sf heated, Unincorporated County
- OpenDate: 1/30/2020
- Process/permit numbers found (all C-prefixed, i.e. legalization applications): **C2021062650** (ZIP 004, legalize canopy), **C2021062307** (ZIP 008, legalize chickee hut), **C2021062550** (BLDG 018, legalize Durafence), **C2021066307** (ZIP 011, legalize picket fence), **C2016191773** (BLDG 055, legalize swimming pool — opened before the 2020 citation but referenced again after it)
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, 21,628-byte real record, SFR confirmed
  - RegulationSupportWebViewer, USCase controller (folio search → CaseNum 20200202745 → ActivitiesUS tab, 107 logged activities 1/30/2020–1/30/2023) — FOUND. Activity #4 (11/23/2022, code 53J "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE") states verbatim: "No permit has been obtained, applications under process number C2021062650... C2021062307... C2021062550... C2021066307... and C2016191773... are all either expired or remain pending zoning approval." Activity #97 (10/30/2020) states C2016191773 "was left to expired."
  - ArcGIS keyless permit layer (rolling ~24-month window, services.arcgis.com/.../miamidade_permit_data) — queried by folio, **0 features** returned. Window currently covers roughly 2024-09 to present, so this is consistent with (not proof of) no permit activity in the last 2 years; it cannot see the 2020-2022 C-process history, which came from the case activity log instead.
  - MCeSearch — not needed; the case's own ActivitiesUS log already carries the full 2016-2023 process-number history, which is the more authoritative source for this case.
  - qPublic — not needed for the same reason.
- Classification: **EXPIRED/STALLED**
- Reasoning: Corrective legalization permits were filed (C-numbers, several opened after the 1/30/2020 citation) but the county's own activity log records them as expired or stuck in zoning review as of 11/23/2022, and no further case activity of any kind has been logged since 1/30/2023 — nearly four years quiet. This is a live lead with a specific angle: the owner already tried to legalize and the permits lapsed.

**Disclosure: These are reference-only research notes from free public county sources. Use a title company for accurate payoff/lien figures where money amounts are at issue.**

## Case 20200202400 — 13301 SW 47 ST
- Folio: 30-4923-032-1660 (3049230321660)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/14/2020
- Process/permit numbers found: none that are corrective. A stray code "C0000006505" appears but reads as an internal fee/EFUS artifact, not a filed legalization application; one activity mentions "Extension process was explained...to have Master Permit" (no date captured) but this reads as the inspector explaining an option, not a filed permit — not followed by any application number anywhere in the 100-entry log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller (folio search → CaseNum 20200202400 → ActivitiesUS, 100 logged activities 1/14/2020–9/19/2024) — FOUND. Most recent activity (#1, 9/19/2024, code 114A) states verbatim: "Property remains occupied with electrical connection. All structures remain with no permits or applications to address violations at this time." Activity #5 (6/13/2023, code 53J) likewise: "No permits have been obtained...No permit applications have been submitted..."
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**. Consistent with the case log's own statement that nothing has been filed.
  - MCeSearch — not needed; the case log already speaks as of 9/19/2024, inside MCeSearch's useful pre-Oct-2022 range and beyond it.
  - qPublic — not needed.
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit or legalization application of any kind has been filed in the four-plus years this case has been open, confirmed by the county's own most recent case note (9/19/2024) and by zero permit activity on the free permit layer. Prime lead — owner has taken no action.

## Case 20200202517 — 1151 NW 117 ST
- Folio: 30-2135-021-0290 (3021350210290)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/21/2020
- Process/permit numbers found: **2016045138** only — a permit issued in 2016, BEFORE the 1/21/2020 citation, so it does not count as a post-citation corrective action under the protocol. No C-prefixed legalization process number appears anywhere in the 90+ entry activity log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 4 cases on this folio (NPCase 20160178899, NPCase 20200201907, USCase 20200201483, USCase 20200202517 — ours); pulled ActivitiesUS for our case 20200202517 (90+ logged activities, 1/21/2020–10/3/2024). Most recent activity (#1, 10/3/2024) states verbatim: "DWELING IS OCCUPIED. ELECTRIC POWER CONNECTED. STURCTURE B, C AND F STILL ON SITE. D STRUCTURE (SHED) WAS DEMOLISHED. LAST PERMIT ISSUED 2016045138." Activity #3 (1/3/2023): "No permit has been obtained to address violations under this case."
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**.
  - MCeSearch / qPublic — not needed; case log already covers 2020-2024 with an explicit "no permit" statement as of 2024.
- Classification: **OPEN/CALL**
- Reasoning: One structure (a shed) was demolished at some point, which removes that one violation, but three structures (B, C, F) remain on site with no permit of any kind pulled since the citation opened — the only permit on file predates the case by four years. County's own 2024 note confirms the gap. Prime lead, with the demolished shed as a talking point that the owner has engaged with the property at least once.

## Case 20200202370 — 2790 NW 95 ST
- Folio: 30-3104-003-3410 (3031040033410)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/14/2020
- Process/permit numbers found: **C2015142296** and **C2019226417** (both pre-date or are contemporaneous with the citation, not clearly post-citation corrective action — not determinative either way) and **C2022010678** (opened/active after the citation; this is the determinative one). Separately, a permit for structures B/C/E/G was **FINALED 06/11/2021** (post-citation, successful correction for those structures).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 4 cases (3 older NPCase code cases 2014-vintage, plus our USCase 20200202370); pulled ActivitiesUS (100 logged activities, 1/14/2020–8/14/2026 — this case has activity into 2026). Key entries: 06/11/2021 "PERMIT FINALED" for structures BCEG; 03/30/2022 Unsafe Structures Appeal Panel ordered REPAIR permit for structures A/D by 1/26/2022 with completion within 120 days, then "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE"; 01/03/2023 note states verbatim "Case remains in Non-Compliance with Panel Order set on 10/28/2021. Application under process number C2022010678 addressing violations expired on 04/24/2022." Most recent activity (08/14/2026): "no new violations observed above ground pool removed."
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** (consistent with no permit activity in roughly the last 2 years).
  - MCeSearch / qPublic — not needed; the case activity log already names the process number and its expiration date directly.
- Classification: **EXPIRED/STALLED**
- Reasoning: Partial correction happened (structures B/C/E/G permitted and finaled in 2021), but the panel-ordered repair for the remaining structures A/D went through a corrective process (C2022010678) that expired in April 2022, and no new permit has replaced it through the most recent 2026 update. Still a live lead on the unresolved A/D structures, with a specific "your repair permit lapsed" angle.

## Case F2019006390 — 303 NE 187 ST BLDG 7 (Star Lakes Estates No. 7 Condo)
- Folio: 30-2206-024-0001 (3022060240001) — this is a condominium association REFERENCE folio
- SFR: NO — PA by folio returns DORDescription "REFERENCE FOLIO", UnitCount 0 (shared condo-association parcel, not a single-family parcel); owner of record is STAR LAKES ESTS NO 7 CONDO, a condominium association (40/50-year recertification case converted to Unsafe Structures)
- OpenDate: 1/27/2020
- Process/permit numbers found: **C2021124941, C2023159743, C2025116366, C2026009770** (all post-citation). **C2026009770** is the live one: a BLDG permit (no. 2026070456) issued 9/9/2026 for "CONCRETE REPAIR," Alter-Exterior, $10,000 estimated value, contractor Aries Links LLC (CGC1516430), confirmed on the free ArcGIS permit layer.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, but it is a condo-association reference folio, not an SFR parcel
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **1 feature**: permit 2026070456 / process C2026009770, issued 2026-09-09, "CONCRETE REPAIR," property address 303 NE 187 ST (matches)
  - RegulationSupportWebViewer, USCase controller — folio search found 18 total code/unsafe-structures cases across this association's folios (it manages 20 folios per the case notes); pulled ActivitiesUS for our case F2019006390 (county's own most recent entry, 8/31/2026): "Antonio Sanchez came by the office to have ENFC hold released for process number C2026009770. Hold released, active CCA until 2/10/2027." Entry #4 (8/14/2026): "Compliance Consent Agreement executed 8/14/2026...valid for 180 days and expires 2/10/2027." Entry #6 (4/13/2026) also notes 46 open cases county-wide against this HOA, 6 of them Unsafe Structures with unpaid cost balances — a financial-pressure data point, not a classification change on this specific case.
  - MCeSearch / qPublic — not needed; the live ArcGIS record plus the case's own activity log already confirm an active, recent corrective permit and an executed compliance agreement.
- Classification: **HANDLED/SKIP**
- Reasoning: The HOA has an active, recently issued (9/9/2026) corrective building permit under process C2026009770, and the county has executed a formal Compliance Consent Agreement valid through 2/10/2027 releasing the enforcement hold. The owner is demonstrably and currently fixing the violation — deprioritize for calling, though note the HOA's broader 46-case/6-unsafe-structures financial exposure if Jorge wants a different angle (special assessment / insurance) later.

## Case 20200203763 — 44 NE 151 ST
- Folio: 30-2219-001-0160 (3022190010160)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 4/3/2020
- Process/permit numbers found: **none**. No C-prefixed process number, no permit number, appears anywhere in the 122-entry activity log. Every permit-related entry is negated: "NO PERMITS OBTAINED...NO PERMIT APPLICATIONS SUBMITTED" (recorded repeatedly, last confirmed 08/26/2021, codes 82/120K).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 2 cases (NPCase 20180190706, our USCase 20200203763); pulled ActivitiesUS (122 logged activities, 4/3/2020–8/27/2026). Most recent activity (#1, 8/27/2026, code 106A): "Possible property acquisition by HUD or other federal agency." #2 (5/26/2026): "Structure is not occupied power is not connected and remains in deteriorated condition." A vacate letter was posted 5/4/2023.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**.
  - MCeSearch / qPublic — not needed; the case log's own repeated negative statement ("no permits obtained, no applications submitted") is dispositive and current through 2026.
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit of any kind was ever obtained or even applied for in over six years of this case being open; the county's own log says so directly, and the property has since been vacated and is now flagged for possible HUD/federal acquisition. Note for Jorge: the TSV lists the owner of record as **US SEC HUD** (451 7th St SW, Washington DC) — this is likely a federally-owned foreclosure, which changes who there is to call; worth a quick owner-of-record re-check before dialing.

## Case 20200202529 — 3721 SW 132 AVE
- Folio: 30-4914-001-2700 (3049140012700)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT" (ArcGIS proposed-use reads "SINGLE FAM RES-CLUST-ZERO LOT-TOWN HOUSE" for the active permits, same single-family character)
- OpenDate: 1/22/2020
- Process/permit numbers found: **10 active permits** on the free ArcGIS permit layer, all issued Oct 2025–Jul 2026, owner/applicant **BREAKTHRU CONSTRUCTION CORP** (matches the TSV's own violator/owner name): BLDG remodel **C2025170617** ($150,000, interior alteration), **W2026010073** (plumbing sub), **W2026012789** (electrical sub), **C2026016580** (windows/ext doors), **C2025177571** (pool & spa remodel, $15,000 — directly on point for the citation's "jacuzzi and slide structure"), **C2026028649** (mechanical), **W2026036033 / C2026041769** (pool electrical/plumbing subs), **W2026081525 / W2026126569** (temp construction power).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **10 features**, all live/recent, the richest hit of the 7 cases checked so far
  - RegulationSupportWebViewer, USCase controller — folio search found 4 related code cases plus ours; ActivitiesUS most recent entries (Sep 2026) show the owner's authorized person (David Hern, Breakthru Construction Corp) actively calling the county to clear ENFC enforcement holds tied to processes W2026168578, W2026167590, W2026163310, and paying a $234 cost balance to release the hold — this is current, ongoing engagement, not a stale filing.
  - MCeSearch / qPublic — not needed; both the live ArcGIS permits and the current-month case activity already establish active correction.
- Classification: **HANDLED/SKIP**
- Reasoning: The owner's own construction company is mid-way through a large ($150k+) legalization/remodel project with ten permits spanning nearly every trade, specifically including a pool/spa permit that lines up with the citation's jacuzzi/slide violation, and was on the phone with the county as recently as 9/24/2026 clearing holds and paying fees. This is the clearest "already being handled" case of the batch — deprioritize for calling.

## Case 20200202202 — 13264 NW 6 ST
- Folio: 30-4902-029-0100 (3049020290100)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/6/2020
- Process/permit numbers found: **none post-citation**. One permit was finaled for structures B/C/D on 03/07/2020 (essentially at case-open, likely a pre-existing/in-process permit, not a response to this citation). No C- or W-prefixed process number appears anywhere else in a 442+ entry activity log spanning to 2026.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 6 related cases; ActivitiesUS is large (442+ entries, 1/6/2020–9/28/2026). Most recent substantive entry (#9, 8/14/2026, code 300A field check) states verbatim: "Structures A, C, and D remain. Structure B has been removed; however, a new trailer was observed... Observed a new attached roof structure at the rear side. Windows and front door were replaced without a permit. Fence replaced with Durafence without a permit. **No permits obtained or applied for to address violations.**" The weekly activity since has simply been the county emailing FPL to request an electrical disconnect (codes 339A, nearly every week through 9/28/2026).
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**, consistent with the field check's own "no permits" finding.
  - MCeSearch / qPublic — not needed; the county's own 2026 field inspection is dispositive and current.
- Classification: **OPEN/CALL**
- Reasoning: The county's own most recent field inspection (8/14/2026) found new unpermitted work (trailer, roof structure, windows, door, fence) added on top of the original violations, with no permit obtained or applied for at any point since the 2020 citation. The county is now pursuing power disconnection, which makes this a time-pressured lead — once power is cut the owner has strong incentive to act.

## Case 20200205476 — 2953 NW 54 ST
- Folio: 30-3116-009-5950 (3031160095950)
- SFR: **NO** — PA DORCode "WAREHOUSE TERMINAL OR STG : WAREHOUSE OR STORAGE", UnitCount 0. Commercial warehouse, not a single-family residence — flagging for Jorge since this one falls outside the SFR lead profile even though it's on the Unsafe Structures list.
- OpenDate: 9/24/2020
- Process/permit numbers found: **none**. One entry (7/21/2021) notes an engineer's report was not yet received but "will be addressed when permit drawings are submitted" — aspirational, never followed by an actual submission or process number anywhere in the 107-entry log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms commercial warehouse use (not SFR)
  - RegulationSupportWebViewer, USCase controller — folio search found 4 related cases (incl. two older US cases F2004104024, F2014115640); ActivitiesUS for our case (107 entries, 9/24/2020–9/2/2026) shows the property owner (Maria Arellano) personally meeting with the county as recently as 9/2/2026 about entering a required "non-compliance agreement," and multiple 2025 meetings/calls about the same — but no permit or engineer's report has actually been filed.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**.
  - MCeSearch / qPublic — not needed; case log and ArcGIS agree with no permit at any point.
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit or process number has ever been pulled on this folio since the citation. The owner IS actively engaged with the county as recently as September 2026 (in person, repeatedly) about a non-compliance agreement, which is a warm signal worth noting for the call script even though it doesn't meet the "active permit or process" bar for HANDLED.

## Case 20200202871 — 101 NE 146 ST
- Folio: 30-2219-001-1180 (3022190011180)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/5/2020
- Process/permit numbers found: original permit **1998069799** (pre-citation, repeatedly confirmed EXPIRED, expiration date 10/25/1999, for a master bedroom/den addition) and **C2023080519**, a corrective process "re-issued" 3/28/2023 specifically to address structure E (a 15-LF metal picket fence installed without a permit).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 5 cases; ActivitiesUS for our case (2/5/2020–3/28/2023, no entries after that date — most recent activity is 3.5+ years old) shows a Board/Panel Order process through 2021-2023 covering structures A/B/C/D/E, ending with the 3/28/2023 note: "Permit is re-issued under process C2023080519 without revision to address structure E."
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** (consistent — nothing has happened in the last 2 years).
  - MCeSearch / qPublic — not needed; the case activity log already names the process and the date trail is clear.
- Classification: **EXPIRED/STALLED**
- Reasoning: A corrective process (C2023080519) was pulled after the citation to address the one remaining open item (structure E, the fence), but the case has recorded zero activity of any kind since that re-issue 3/28/2023 — no completion inspection, no finaled permit, nothing — strongly suggesting the reissued process itself went dormant/expired without being finished. Live lead with a "you started this and it lapsed" angle.

## Case F2019006453 — 530 W PARK DR 530 (West Lake Village II Condominium Association)
- Folio: 30-4005-026-0001 (3040050260001) — a condominium association REFERENCE folio shared across the whole complex
- SFR: NO — PA DORCode "REFERENCE FOLIO", UnitCount 0; owner of record is West Lake Village II Condominium Association, Inc. (40/50-year recertification case converted to Unsafe Structures)
- OpenDate: 7/22/2020
- Process/permit numbers found: dozens of post-citation permits across the complex on the free ArcGIS permit layer, all issued Feb–Apr 2025 — re-roofs, fence replacements and deck repairs on buildings 420/430/440/510/530. Directly on point: **permit 2025026181 / process C2025061605, issued 2025-02-20, "RE-ROOF BLDG 530"** — the exact building named in this case's address. Case-log process numbers: C2025003581, C2025007050, C2025007560, C2025160071, C2025163813, C2025163948, **C2025179318**.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms condo-association reference folio
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **22 features**, a wave of 2025 corrective permits across the whole association including BLDG 530 specifically
  - RegulationSupportWebViewer, USCase controller — folio search found **35 related cases** across this large complex; pulled ActivitiesUS for our case F2019006453. Most recent entry (9/16/2026): "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026." Entry #4 (12/14/2025): "Received update from association attorney stating that repairs are complete and the final engineer inspection is scheduled for the week of 01/12/2026." The HOA is represented by counsel (Cecile S. Mendizabal) actively coordinating payment and hold releases as of August–September 2026.
  - MCeSearch / qPublic — not needed; both the live permits and the case's own current-year activity log confirm active, near-complete correction.
- Classification: **HANDLED/SKIP**
- Reasoning: The HOA, through its attorney, has an active, well-documented repair program (roofs, fences, decks across multiple buildings including the subject BLDG 530), reports repairs complete with a final engineer inspection scheduled, and is current on county cost balances as of September 2026. Deprioritize for calling.

## Case 20200203278 — 9123 NW 22 AVE
- Folio: 30-3103-011-0550 (3031030110550)
- SFR: **NO** — PA DORCode "NIGHTCLUB LOUNGE OR BAR : ENTERTAINMENT", UnitCount 0. Commercial entertainment property, not SFR — flagging for Jorge; it's on the list but outside the SFR lead profile.
- OpenDate: 2/26/2020
- Process/permit numbers found: **C2009081345** and **C2018067469** (both predate the citation, from earlier related cases) — no post-citation process number found anywhere in the log. Permit status for structures B/C/D/E: **FINALED 07/01/2021** (post-citation correction, successful). Structure A (the "ALUMINUM CARPORT/W LIGHTS" named in the citation itself) remains without any permit.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms commercial (nightclub/bar) use, not SFR
  - RegulationSupportWebViewer, USCase controller — folio search found 10 related cases spanning back to 1998; ActivitiesUS for our case (2/26/2020–2/1/2024, no entries after that). Most recent entry (02/01/2024, code 53J): "No permit has been obtained" for structure A. An Unsafe Structures Board Order was recorded against the property 6/2/2023 (Book 33730, Page 3328) — a public recorded lien/order, separate from a permit.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**.
  - MCeSearch / qPublic — not needed; the case log is explicit and current through 2024.
- Classification: **OPEN/CALL**
- Reasoning: Partial correction occurred (structures B/C/D/E permitted and finaled in 2021), but the specific structure the citation was built around — the unpermitted carport — still has no permit as of the county's last update (2/1/2024), and a Board Order has since been recorded against the property. Live lead on the carport, though note this is a commercial property (nightclub/bar), not a homeowner, which changes the pitch and who answers the phone.

## Case 20200202952 — 1847 NW 84 ST
- Folio: 30-3110-024-0030 (3031100240030)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/9/2020
- Process/permit numbers found: **C2019153356** (predates the citation, from an earlier related case) — no post-citation process/permit number for the still-open structures. Structures B/C/D/F: permit **FINALED 09/20/2021** (post-citation correction, successful). Structures A and E remain unaddressed.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — folio search found 3 cases; ActivitiesUS is a large log (2/9/2020–7/8/2026). The owner entered an **internal payment agreement** for county cost balances in 2025 (quarterly invoices Q2025047398, Q2025048683 — this is a fee payment plan, not a building permit). Most recent entry (07/08/2026, code 114A): "Ownership same as of last agreement. **No permits obtained** to correct the violations. Property in non-compliance." The county tried to call the owner the same day and got no answer.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**.
  - MCeSearch / qPublic — not needed; the case log is explicit and current through July 2026.
- Classification: **OPEN/CALL**
- Reasoning: Partial correction happened in 2021 (structures B/C/D/F), but structures A and E remain with no permit of any kind, confirmed as recently as July 2026, and the owner is paying down county fees on a payment plan without actually filing for the permit. This is a warm lead — the owner is clearly engaged financially but hasn't taken the building step; the county itself couldn't reach them by phone the same week.

## Case 20200202804 — 3520 NW 51 ST
- Folio: 30-3121-001-0090 (3031210010090)
- SFR: **NO** — PA DORCode "LIGHT MANUFACTURING : LIGHT MFG & FOOD PROCESSING", UnitCount 0. Commercial/industrial property, not SFR — flagging for Jorge.
- OpenDate: 2/3/2020
- Process/permit numbers found: **permit #2020065056** ("TO REPAIR THE ROOF") was **FINALED 6/1/2021** — this directly corrects the citation's alleged violation ("ROOF IN DISREPAIR"). But **process C2020105604** (interior buildout, application submitted 7/10/2020) never produced an actual issued permit ("Permit application submitted...but no actual permit was obtained"), and **C2023017025** (2022-2023, tied to a sewer connection issue) remains stuck on a hold, with the case log noting "structural repairs to A not included."
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms commercial/light manufacturing use, not SFR
  - RegulationSupportWebViewer, USCase controller — folio search found 7 related cases (same owner, "312 STRENGTH CORP" LLC, holds 3 properties on the same block per a 3/9/2026 case note); ActivitiesUS log (2/3/2020–5/20/2026) shows continuous recent activity: a title search was ordered and received 4/3/2026 ($125), and the owner's permit expediter (Isa Garcia) met with the county as recently as 5/20/2026 to pursue a Non-Compliance Agreement.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** (no permit issued in roughly the last 2 years, consistent with the stalled interior process).
  - MCeSearch / qPublic — not needed; the case log already names both process numbers and their outcomes directly.
- Classification: **EXPIRED/STALLED**
- Reasoning: The literal cited violation (the roof) was fixed and finaled in 2021, but the interior buildout permit process was applied for and never completed, and a second process (sewer connection) stalled on an unresolved hold. The owner's agent is actively trying to resolve it through a non-compliance agreement as recently as May 2026, so this is a live, already-engaged lead rather than an abandoned one — good candidate for a "let's finish what you started" conversation.

## Case 20200202706 — 1132 NW 118 ST
- Folio: 30-2135-021-0210 (3021350210210)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/29/2020
- Process/permit numbers found: older processes **C2021052525** (demo shed) and **C2021045904** (re-roof) were pending/not approved back in 2021-2022, apparently superseded. The live one: **C2025089806** — permit **2026014595, issued 12/11/2025**, "ADDITION - ATTACHED," confirmed on the free ArcGIS permit layer, with the case log describing it as addressing "partial demolition of portion of structure B on setbacks and structure C and legalization of remaining addition." A separate **C2026134840** relates to an ENFC hold review, not a new violation.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **1 feature**: the live C2025089806 permit, issued 12/11/2025
  - RegulationSupportWebViewer, USCase controller — folio search found 4 cases; ActivitiesUS log is extensive and very current. Most recent entries (7/30/2026): the property owner, **Hermelando Olgin**, personally came to the office and signed, paid, and executed an **Internal Agreement** granting compliance time (into 2027 per the stated terms) to obtain the required permits, complete the work, and pass final inspection. The case notes explicitly: "No final release will be granted for permit until Internal Agreement [executed]" — which has now happened.
  - MCeSearch / qPublic — not needed; live ArcGIS plus a current-month (July 2026) signed compliance agreement are dispositive.
- Classification: **HANDLED/SKIP**
- Reasoning: The owner has an active, recently issued legalization permit directly addressing the cited violations (setback demolition + addition legalization) and, as of 7/30/2026, personally signed and paid for a formal Internal Agreement committing to finish the permitted work and pass final inspection. This is an owner actively and currently correcting the violation — deprioritize for calling.

---

# CONTINUATION — Overnight cycle, rows 17 onward (TRK-UNS-2020-OVERNIGHT-01 / M9-adjacent, cycle 3)
New pipeline this cycle: direct curl (not WebFetch) against (1) Property Appraiser JSON proxy `apps.miamidadepa.gov/PAPublicServiceProxy/PaServicesProxy.ashx`, (2) the free keyless ArcGIS permit layer `services.arcgis.com/8Pc9XBTAsYuxx9Ny/.../miamidade_permit_data/FeatureServer/0/query?where=FolioNumber='<folio>'`, and (3) the RegulationSupportWebViewer `USCaseDetails`/`ActivitiesUS`/`StructuresInfo` pages held in a single cookie-jar session per case, parsed into clean rows with `C:\Users\JV\OneDrive\Scripts\Parse-USCaseActivities.py`. Raw HTML/JSON for every case is saved under `RAW\CLASSIFICATION-WORKPAPERS\<CaseNum>\`. Same three buckets, same free sources, same disclosure.

## Case 20200203080 — 2018 SW 103 CT
- Folio: 30-4008-024-0520 (3040080240520)
- SFR: YES (residential character) — PA DORCode 0410 "RESIDENTIAL - TOTAL VALUE : TOWNHOUSE", UnitCount 1, 2bd/1ba, 840 sf, built 1974
- OpenDate: 2/13/2020
- Process/permit numbers found: **C2020084708** (BLDG 0002, legalize rear attached addition — submitted 3/16/2020, disapproved by several trades, now expired) and **C2023019616** (BLDG 002, legalize rear addition/structure B — EFUS holds partially released 11/15/2022 but "NO PERMIT WAS ISSUED ON THAT PROCESS NUMBER" per 12/12/2022 note)
- Sources checked:
  - Property Appraiser proxy (direct curl, folio) — FOUND, 9,748-byte JSON, townhouse/SFR character confirmed
  - ArcGIS permit layer (direct curl, folio) — queried, **0 features** (rolling ~2yr window predates this case's history)
  - RegulationSupportWebViewer USCase (curl + cookie jar) — CaseDetails, ActivitiesUS (119 rows), StructuresInfo (3 structures: A-840sf townhouse repair/demo, B-500sf rear addition demolish, C-870sf neighboring townhouse no action required) all FOUND and saved
- Classification: **OPEN/CALL**
- Reasoning: Two legalization attempts were made (C2020084708, C2023019616) and both failed to produce an issued permit — one disapproved/expired, one never issued despite partial trade sign-off. Most recent activity (9/9/2026) shows a "permit runner" (Rick Torrente) picking up a copy of the NOV on the owner's behalf, which is a live signal someone is newly circling back on this — worth a call now while that interest is fresh.

## Case 20200202787 — 2186 NW 47 ST
- Folio: 30-3122-026-1110 (3031220261110)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1 (one 2025 permit record's "ProposedUseDescription" field said "DUPLEX" — PA's own property-record DOR code is treated as authoritative)
- OpenDate: 2/1/2020
- Process/permit numbers found: **C2024138002** (permit 2025042286, interior alteration/remodel $250,000, issued 5/2/2025, later REVOKED/CANCELLED 1/7/2026 per 4/9/2026 note) and **C2026130506** (permit 2026057018, total demolition, issued 7/9/2026 and finaled — owner's rep confirmed compliance inspection pending 9/30/2026)
- Sources checked:
  - Property Appraiser proxy — FOUND, SFR confirmed
  - ArcGIS permit layer — queried, **2 features**: the revoked 2025042286 remodel and the active 2026057018 demolition
  - RegulationSupportWebViewer USCase — CaseDetails, ActivitiesUS (223 rows, extensive 2022-2026 Internal Agreement history with owner's agent Jean Carlos Aguilar of Brodmen Ventures LLC), StructuresInfo all FOUND and saved
- Classification: **HANDLED/SKIP**
- Reasoning: After an initial $250k remodel permit was revoked, the owner pivoted to full demolition, obtained and finaled a demolition permit (2026057018), confirmed an ENFC hold partial-payment settlement (7/9/2026), and was told on 9/30/2026 only a Building ENFC compliance inspection remains before the case clears — an owner actively finishing the job, not one to chase.

## Case 20210205792 — 14416 NE 3 CT
- Folio: 30-2219-000-1230 (3022190001230)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 10/19/2020 (TSV OpenDate field shows 2020; CaseNum prefix is 2021 — treated as a 2020-dated case per the source list)
- Process/permit numbers found: **2021077955** (master permit, structures A/B, finaled 11/20/2024), **2023041243** (expired 5/3/2024), **C2024149446** (held on an unpaid citation P053054)
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (192 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: Structures A/B were legalized and finaled in 2024, but structure E was never addressed; a 90-day Internal Agreement (5/21/2025-8/20/2025) to finish lapsed ("already expired" per 7/15/2026 call), and a new metal fence was installed without a permit (9/2/2026). As of 9/18/2026 the owner wants a new Agreement but is blocked behind partial payments owed on three unrelated liens/citations tied to the same violator across other folios — a real but stalled lead; worth noting the owner has 5 total open county matters, which may be useful context for the call.

## Case 20200202539 — 13200 SW 44 ST
- Folio: 30-4923-032-0770 (3049230320770)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 1/23/2020
- Process/permit numbers found: **C2019001116** (demolish CBS storage shed, left to expire by 11/17/2020) and **C2022012849** (demolish structure B, never approved/released — "scope of work was incomplete," still "not approved" per 9/30/2022 note)
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (108 rows, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit application has ever been approved or issued on this case across two attempts (2019, 2022). The county's most recent substantive field check (9/19/2024) confirms "NO PERMITS OR APPLICATIONS FOR VIOLATIONS AT THIS TIME" and additionally found a brand-new unpermitted attached terrace. A 9/2/2026 field check shows the property still occupied with power connected — good live lead.

## Case 20200203079 — 9501 SW 94 CT
- Folio: 30-5004-001-0220 (3050040010220)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 2/13/2020
- Process/permit numbers found: **none successful**. Prior permits 2017069846 (windows/doors, expired since 4/17/2019, tracked separately under companion case 20200204956-X), 2018046179 and 2018067032 (re-roof permits, pre-date this citation's remaining violations) are referenced but none address the still-open structures.
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (122 rows, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: The county's own field status check conducted 9/11/2026 (from the public right-of-way) confirms structures A, B, C, F, G and K remain with "no permits obtained or applied for to address violations" — current within the last month. This is one of the most recently re-confirmed OPEN/CALL leads in the batch.

## Case 20200203110 — 2145 SW 76 AVE
- Folio: 30-4011-002-0090 (3040110020090)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 2/15/2020
- Process/permit numbers found: **C2023183085** (permit 2025034589, detached addition, issued 3/31/2025, expired 9/27/2025, re-issued, still "no progress made" per 8/6/2026 completion check), **W2026023010** (permit 2026009959, sub-permit, issued 11/17/2025), **C2026040936** (permit 2026017052, repair, issued 12/23/2025), **C2026087004** (permit 2026037966, detached addition, issued 4/9/2026), and a newer **C2026153947** (re-roof, held pending a new non-compliance agreement)
- Sources checked: PA proxy (FOUND, SFR), ArcGIS permit layer — **4 features** (richest hit in this batch), RegulationSupportWebViewer ActivitiesUS (281 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: Despite four separate permits issued across 2025-2026, the master permit for the core addition expired once already and a follow-up completion inspection (8/6/2026) still found "no progress made." As of 9/23/2026 the case is requesting yet another non-compliance agreement, this time conditioned on a licensed engineer or architect's safe-to-occupy letter — a pattern of repeated stalls despite real permit activity; strong re-engagement angle (lots of permits pulled, nothing finished).

## Case 20200202462 — 2380 NW 104 TER
- Folio: 30-2134-012-0890 (3021340120890)
- SFR: **NO** — PA DORCode 0802 "MULTIFAMILY 2-9 UNITS : 2 LIVING UNITS", UnitCount 2 (duplex) — flagging for Jorge; outside the SFR profile
- OpenDate: 1/17/2020
- Process/permit numbers found: **2024021590** (master permit, legalize room addition structures B/C — expired 10/5/2024, reissued, extended 3/27/2025, expired again 9/23/2025), **C2026007996** held pending a new agreement, and new **C2026165983/C2026165979** opened 9/10/2026 while a contractor (Hilbert Morarles) actively worked with the county
- Sources checked: PA proxy (FOUND, DOR 0802 duplex), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (360 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: The legalization permit for this duplex has now expired twice under two separate Internal Agreements (most recently 9/23/2025), each time requiring a new agreement to restart the clock; the current Agreement runs to 10/6/2026 and a contractor is actively pulling new process numbers as of 9/10/2026, so there is real current motion, but the track record is two prior lapses — a good "let's not let this expire a third time" call.

## Case 20200202743 — 20880 SW 236 ST
- Folio: 30-6821-000-0910 (3068210000910)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 1/30/2020
- Process/permit numbers found: **none**. No C-prefixed or W-prefixed process number appears anywhere in the 93-entry activity log.
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (93 rows, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit of any kind has ever been applied for across the life of this case; confirmed repeatedly through the last recorded activity (11/8/2022, "no permit issue as of this date"). No activity has been logged since — nearly four years quiet, but with zero corrective history, this is a clean never-tried lead.

## Case 20200202754 — 16201 SW 42 TER
- Folio: 30-4920-030-0260 (3049200300260)
- SFR: YES — PA DORCode 0104 "RESIDENTIAL - SINGLE FAMILY : RESIDENTIAL - TOTAL VALUE", UnitCount 1
- OpenDate: 1/31/2020
- Process/permit numbers found: **C2019148196** (intended to remove 3 structures — chickee huts/terrace — submitted but "is now expired" per 10/30/2020 note). No corrective filing since.
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (108 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: A demolition/removal process was filed shortly after the citation but was allowed to expire, and the county's own most recent note (6/13/2023) confirms "No permits have been obtained...No permit applications have been submitted" since. Case has gone quiet for 3+ years — live lead with a "you started this once" angle.

## Case 20200203430 — 1780 NW 90 ST
- Folio: 30-3103-005-0160 (3031030050160)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 3/4/2020
- Process/permit numbers found: **C2018065979** (legalize family room, never issued, "pending review since 2022"), **2021030599** (legalize attached addition, issued but left incomplete — missing mechanical/plumbing/electrical sub-permits per 3/1/2021 note), and a permit addressing structures B/C compliance (noted 2/20/2025) while structures A/D remained with "no permit obtained" through 9/11/2025
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (121 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: Structures B and C were brought into compliance via permit, but structures A and D still had no permit obtained as of the most recent substantive field note (9/11/2025). A new person (Ronald Suarez) came into the county office in person on 9/30/2026 to ask about the case and was handed a copy of the NOV — fresh engagement worth calling on now.

## Case F2019006392 — 18707 NE 2 AVE aka BLDG 9 (Star Lakes Estates No. 9 Condo)
- Folio: 30-2206-026-0001 (3022060260001) — condo-association REFERENCE folio, one of 20 folios this HOA manages
- SFR: **NO** — PA DORCode 0000 "REFERENCE FOLIO", UnitCount 0; flagging for Jorge
- OpenDate: 1/27/2020
- Process/permit numbers found: **none specific to this building**. A Compliance Consent Agreement (CCA) was executed 8/14/2026 (process X2026149116, valid to 2/10/2027) covering the HOA's ENFC holds broadly, but the building-specific repair permits confirmed elsewhere in this HOA's portfolio (e.g. C2026009770 for Bldg 7/folio 3022060240001, C2025116366 for folio 30-2206-034-0010 — currently expired) are NOT tied to this folio.
- Sources checked:
  - Property Appraiser proxy — FOUND, confirms reference folio (not SFR)
  - ArcGIS permit layer — queried by this specific folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (90 rows, FOUND/saved) — shows HOA-wide activity: as of 4/13/2026 the HOA had 46 open cases, 2 unpaid CVNs, 28 cases with unpaid penalty/lien balances, and 6 Unsafe Structures cases with unpaid cost balances blocking ENFC hold releases; the 8/14/2026 CCA addresses the hold-release mechanism, not a confirmed repair for Bldg 9 itself
- Classification: **OPEN/CALL**
- Reasoning: Unlike the companion case F2019006390 (Bldg 7, which has a specific, recently issued concrete-repair permit), no building-specific corrective permit was found anywhere in the record for this folio/building. The HOA's CCA is a payment/hold-release framework for the association as a whole, not evidence this particular building has been repaired — treating this one as still open and callable, while flagging that the same HOA's broader 46-case financial exposure is useful context if Jorge wants an association-wide angle instead of building-by-building.

## Case 20200202343 — 22825 SW 122 PL
- Folio: 30-6913-011-2160 (3069130112160)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 1/13/2020
- Process/permit numbers found: **C2024010433** (master permit application, "remains under trades review" as of 11/6/2025 — not finaled) and **C2025066788** (permit 2025030632, re-roof/repair, issued 3/12/2025, appears complete/limited in scope to sloped roof areas)
- Sources checked: PA proxy (FOUND, SFR), ArcGIS permit layer — **1 feature** (the re-roof permit), RegulationSupportWebViewer ActivitiesUS (348 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: The re-roof portion was permitted and appears done, but the master legalization permit (C2024010433) has sat "under trades review" for over a year without being finaled, and the owner's family is now (through 9/21/2026) actively working to satisfy a second/renewed non-compliance agreement's requirement for a "safe to occupy" letter. Genuinely engaged family (frequent calls, installment payments current through 2025-2026) — a good "let's get this across the finish line" call, not a cold lead.

## Case 20200202731 — 935 NW 118 ST
- Folio: 30-2135-013-0250 (3021350130250)
- SFR: YES — PA DORCode 0101, UnitCount 1
- OpenDate: 1/30/2020
- Process/permit numbers found: **C2025010056** (master permit application — Internal Agreement executed 11/12/2025 with a 5/11/2026 deadline, expired 2/22/2026 per the 5/27/2026 completion-inspection note) and **C2026097629** (re-roof, held, "must be attached to a master permit")
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (143 rows, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: An Internal Agreement and master permit process were both executed but the permit expired without completion, confirmed 7/7/2026 ("No permits obtained to correct violations. Property in non-compliance"). Rather than restart the permit, the owner instead installed new unpermitted windows (found 8/25/2026), which triggered a brand-new code enforcement referral case (20260250323-B) on 9/3/2026 — a worsening, not improving, situation and a strong call target.

## Case 20200202512 — 25702 SW 138 CT
- Folio: 30-6927-019-0210 (3069270190210)
- SFR: YES — PA DORCode 0104, UnitCount 1
- OpenDate: 1/21/2020
- Process/permit numbers found: a permit legalizing structure B was referenced in 2021 ("PERMIT OBTAINED - NOV COMPLIANCE" 5/10/2021) but repairs to structure B were noted incomplete the same day, and no permit was ever obtained for structures A, C or D.
- Sources checked: PA proxy (FOUND, SFR), ArcGIS (0 features), RegulationSupportWebViewer ActivitiesUS (106 rows, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: The core violations (structure A garage conversion, structure B terrace) have never had a completed corrective permit, confirmed as recently as the 8/26/2026 field status check, which additionally found brand-new unpermitted work (replaced windows/doors, new metal fence/gate sections) added since the prior 2024 check — an actively worsening, very current lead.

---

# CONTINUATION — Overnight cycle, rows 31-44 (TRK-UNS-2020-OVERNIGHT-01 / M9-adjacent, cycle 4)
Same free three-source pipeline as cycle 3: Property Appraiser JSON proxy, free keyless ArcGIS permit layer (rolling ~2yr window), and RegulationSupportWebViewer USCase ActivitiesUS/StructuresInfo log, fetched via `Fetch-UnsafeStructuresCase.sh` into `RAW\CLASSIFICATION-WORKPAPERS\<CaseNum>\`. All raw PA JSON, ArcGIS JSON, case HTML, and parsed activity/structure text files are retained there for each case below.

## Case 20200202656 — 1474 NW 115 ST
- Folio: 30-2135-024-0030 (3021350240030)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1, built 1951 (multiple additions 1951/1959/2017)
- OpenDate: 1/28/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number, and no permit number, appears anywhere in the 91-entry activity log — every entry is negated ("No permits obtained or applied for to address violations," repeated 4/5/2021, 11/10/2021, 1/6/2023).
- Sources checked:
  - Property Appraiser proxy (folio, direct curl) — FOUND, 16,741-byte JSON, SFR confirmed. Also shows the folio sold 8/13/2025 via Quit Claim Deed for **$100** consideration ("Corrective, tax or QCD; min consideration") from Marie Valencia Jean (the TSV's listed owner/PO) to **GODS GRACE GIVING LLC** — reads as a related-party/family transfer, not an arm's-length sale.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (91 rows, FOUND/saved) — Unsafe Structures Panel Hearing held 4/28/2022 (owner NO SHOW), Panel Order recorded 5/4/2022 (Book 33167, Page 2661). Most recent activity: 8/27/2026 field status check referred the case to enforcement "for roofing without a permit," and 9/3/2026 a brand-new companion enforcement case (20260250330-B) was opened as a direct referral from this Unsafe Structures case.
  - StructuresInfo (5 structures, FOUND/saved) — structure A (907 sf SFR) to repair/demolish; B (920 sf addition used as extra living quarters), C (shed), D (front fence) to demolish; E (neighboring fence) no action.
- Classification: **OPEN/CALL**
- Reasoning: No permit or even a legalization application was ever filed across more than six years; the county's own panel order (5/2022) went unanswered and, as of September 2026, the county opened a brand-new enforcement referral specifically for unpermitted roofing — an escalating, very current lead. Note the $100 related-party transfer in 2025 for Jorge's records when identifying who to call.

## Case 20210205931 — 2964 NW 46 ST
- Folio: 30-3121-026-0390 (3031210260390) — TSV legal matches "ROOSEVELT PARK PB 9-90 LOT 14 BLK 2"
- SFR: **NO** — PA DORCode 3315 "NIGHTCLUB LOUNGE OR BAR : ENTERTAINMENT", UnitCount 0. Commercial property — flagging for Jorge; outside the SFR lead profile.
- OpenDate: 10/27/2020
- Process/permit numbers found: **C2020032600** (BLDG 0001, legalize bathroom, application date 12/2/2019 — predates this case) — never resulted in an issued permit ("no permit issued as of this date," 10/31/2022). A separate, unrelated process **C2025151010** surfaced in 2025 tied to an ENFC hold on a companion folio, not a corrective permit for this case's structures.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms commercial nightclub/bar use, not SFR.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (108 rows, FOUND/saved) — Board Order recorded 5/28/2022 (Book 33213, Page 2403). 3/18/2025 field inspection: structures D and E self-demolished by the owner, structure C (terrace) replaced with an unpermitted aluminum canopy, structure B remains — property still occupied/electrified. Owner (Idella Zeigler) called the county repeatedly Oct 2025–Nov 2025 trying to get an Internal Agreement so an ENFC hold on a companion process could be partially paid; told she must resolve the Unsafe Structures non-compliance first. Most recent activity (8/28/2026) is a new field check that found an unpermitted new front door and referred the case to enforcement.
  - StructuresInfo (6 structures, FOUND/saved).
- Classification: **OPEN/CALL**
- Reasoning: The only process ever filed (bathroom legalization) predates the case and was never approved into a permit; the owner has been actively calling the county since late 2025 but still has not obtained any permit, and the county's own 8/28/2026 field check found yet another new unpermitted item (front door). Live, currently-engaged lead — note the commercial (not SFR) character for call targeting.

## Case 20200202715 — 25571 SW 122 CT
- Folio: 30-6925-014-0420 (3069250140420)
- SFR: YES — PA DORCode 0104 "RESIDENTIAL - SINGLE FAMILY : RESIDENTIAL - TOTAL VALUE", UnitCount 1
- OpenDate: 1/30/2020
- Process/permit numbers found: **permit 2022009840** (BLDG 0002, partial demo addressing structures B/C/D, issued 11/11/2021) — the only corrective permit on file; re-issued 4/4/2023 but confirmed **EXPIRED again since 10/1/2023 with no approved inspections** as of the 9/9/2026 field status check.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features** (consistent with no permit activity in roughly the last 2 years, matching the expired-since-2023 permit).
  - RegulationSupportWebViewer USCase ActivitiesUS (120 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 4/21/2022 (Book 33140, Page 4217) for structure A noncompliance. 9/9/2026 field status check (most recent activity) states verbatim: "Permit # 2022009840 (BLDG 0002)...is expired since 10/01/2023 with no approved inspections...Unsafe Structures Section case remains in non-compliance with Panel Order taken on 04/13/2022. NEW VIOLATION OBSERVED: new windows installed without required permit."
  - StructuresInfo (7 structures, FOUND/saved) — structures E/F/G (pool/fence/driveway) already compliant under older final permits; A/B/C/D are the open items.
- Classification: **EXPIRED/STALLED**
- Reasoning: A real corrective permit was pulled (11/2021) and even re-issued once (4/2023), but the county's own September 2026 field check confirms it has sat expired with zero approved inspections since October 2023 — nearly three years — while a brand-new unpermitted window installation was also found. Strong "you already started this, let's finish it" call.

## Case 20200202453 — 6050 NW 27 AVE
- Folio: 30-3116-009-7430 (3031160097430)
- SFR: **NO** — PA DORCode 2719 "AUTOMOTIVE OR MARINE : AUTOMOTIVE OR MARINE", UnitCount 0. Commercial auto-repair/petroleum-tank property owned by **3000 N W 62 STREET INC**, part of an 11-plus-folio commercial complex under the same owner — flagging for Jorge; outside SFR profile.
- OpenDate: 1/16/2020
- Process/permit numbers found: **C2016028999** (repair-shop legalization, repeatedly "disapproved"/expired, called out again as expired at a 9/20/2021 field check), **C2021130863** and **C2021130871** (also disapproved, 2021), culminating in an **Internal Agreement executed 12/15/2025** giving compliance time to **September 11, 2026** to obtain the master permit — the completion inspection on **9/18/2026** found "Completion compliance not achieved. No permit has been obtained" (code 279L, structures A-D).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms commercial automotive use, not SFR.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (163 rows, FOUND/saved) — extensive 2025-2026 record of the owner's rep (Albert Hernandez) actively paying down roughly ten separate liens/CVNs across the owner's multi-folio portfolio (P024332/33, P035767/68/69, P026765, P051309, T074819, T093930, P022026, P035701, P017591, T095012) to get ENFC holds released, while the actual building permit for this case's violations (roll-up door, metal fence/gate) was never obtained.
  - StructuresInfo (4 structures, FOUND/saved) — structure B (1,530 sf auto shop, built 2016 under the never-finaled process), structure C (fuel tank foundation), structure D (fence) all unpermitted.
- Classification: **EXPIRED/STALLED**
- Reasoning: A formal Internal Agreement with a hard deadline (9/11/2026) was executed just months ago, and the county's own completion inspection one week past deadline (9/18/2026) found the permit still not obtained — the freshest "agreement just lapsed" case in this batch. The owner is clearly financially engaged (actively paying down a long list of other liens) but has never closed out the actual building permit here across multiple attempts since 2016.

## Case 20200202533 — 15226 SW 21 LN
- Folio: 30-4909-003-1510 (3049090031510)
- SFR: YES — PA DORCode 0105 "RESIDENTIAL - SINGLE FAMILY : CLUSTER HOME", UnitCount 1
- OpenDate: 1/22/2020
- Process/permit numbers found: **C2021146073** (BLDG 082, legalize window/door replacement) — filed but never approved or released; confirmed "has not been approved" at the 7/8/2022 pre-panel inspection and "No permit has been obtained" at the 11/10/2022 panel-compliance check (code 53J).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR (cluster home) confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (85 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 7/15/2022 (Book 33289, Page 4284) after an owner no-show hearing. Most recent activity (9/30/2024, field status inspection): "gate & awning on eastside, gate on west side remain. property is occupied with electricity." No activity logged in the two years since.
  - StructuresInfo (6 structures, FOUND/saved) — structure A (dwelling, repair/demolish), B (metal patio) and C (canvas awning) and F (metal fence/gate) to demolish; D/E no action.
- Classification: **OPEN/CALL**
- Reasoning: The one legalization attempt on file was never approved into an actual permit, and the county's own most recent field check (9/30/2024) confirms the violating structures remain with the property occupied — a clean, unresolved, never-successfully-permitted case that has simply gone quiet for two years.

## Case 20200202461 — 930 NW 83 TER
- Folio: 30-3111-002-0970 (3031110020970)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/17/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the 102-entry activity log; every permit-status entry is negative.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (102 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 5/19/2022 (Book 33192, Page 4717) following a HEARD panel hearing. Most recent activity (10/1/2024, case update report): "DWELING IS OCCUPIED. ELECTRIC POWER IS CONNECTED. NO RECENT PERMIT DATA FOUND. ALL STRUCTURES REMAIN."
  - StructuresInfo (5 structures, FOUND/saved) — structure A (dwelling with converted porch), B (enclosed porch living area), C (prefab sheds), D (dividing fence) all to demolish/repair; E (perimeter fence) no action.
- Classification: **OPEN/CALL**
- Reasoning: No permit or application of any kind was ever filed in the life of this case, confirmed as recently as October 2024 by the county's own case-update report. Clean, never-attempted lead.

## Case 20200203008 — 2964 NW 96 ST
- Folio: 30-3104-003-1895 (3031040031895)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/11/2020
- Process/permit numbers found: **C2018157653** (pool legalization, "unsuccessful application," never approved), **C2017157479** (interior alteration legalization, also unsuccessful); permits for structures **E** (3/30/2023) and **B/C/D/F/G** (5/2/2023) were issued but explicitly tied to/contingent on the main structure A permit, which was **never obtained**; an **Internal Agreement executed 6/12/2025** gave 240 days (deadline 2/7/2026) to finish — the **2/25/2026 completion inspection found "Completion compliance not met. No permit has been obtained to address violations"** (code 279L, structures A-G).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **1 feature**: a minor $500 electrical permit (2025005153 / process C2025001825, "INST GATE MOTOR," issued 10/28/2024) — does not address the core structural violations.
  - RegulationSupportWebViewer USCase ActivitiesUS (171 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 10/19/2022 (Book 33426, Page 2332). As of 4/6/2026, EFUS hold on a new process (C2026054975, window replacement) was held because "MASTER PERMIT MUST BE OBTAINED FIRST." Owner's rep Jorge Martinez has been meeting with the county continuously (4/2025 through 9/28/2026, most recent activity) trying to satisfy the Non-Compliant Agreement requirements (proof of financial ability, engineer's safe-to-occupy letter) but no master permit has been secured.
  - StructuresInfo (7 structures, FOUND/saved).
- Classification: **EXPIRED/STALLED**
- Reasoning: A formal Internal Agreement with a hard 2/7/2026 deadline was executed and then missed — confirmed by the county's own 2/25/2026 completion inspection — and the owner's representative has continued trying (as recently as 9/28/2026) without success. One of the most continuously-engaged owners in this batch, making it a strong "let's finally close this out" lead.

## Case 20200202456 — 12035 SW 173 TER
- Folio: 30-5936-005-5130 (3059360055130)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/16/2020
- Process/permit numbers found: **C2019228126** (windows/doors legalization, submitted but "permit not obtained"). A separate 2026 process (**C2026168016**, AC mini-split) was explicitly told by the county it is "not part of the scope of this case" and would need a separate Non-Compliance Agreement.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (111 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 5/4/2022 (Book 33167, Page 2688). Structure F (shed) was self-removed by the owner (confirmed by 4/25/2022 pre-panel inspection). Most recent field check (8/24/2026) found windows/doors replaced and an AC mini-split installed, all without permits, on top of the original violations; 9/15/2026 meeting notes show the owner (Jennifer Perez) has four separate open county matters tied to this one folio (an older B-case, a newer NOV case, this Unsafe case with a $1,656.70 pending balance, and an unpaid CVN with ICD) and "ended the conversation, stood up, and left" when told she'd need an ENFC hold partial-payment agreement.
  - StructuresInfo (10 structures, FOUND/saved).
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever been obtained across more than six years despite one legalization attempt, and the county's own August 2026 field check found fresh unpermitted work layered on top of the original violations. The owner is aware and recently re-engaged (9/15/2026) but walked away from the conversation rather than committing to an agreement — a live, currently-touchy lead worth a careful call.

## Case 20200202720 — 2505 NW 105 ST
- Folio: 30-2134-000-0260 (3021340000260)
- SFR: **NO** — PA DORCode 0803 "MULTIFAMILY 2-9 UNITS : MULTIFAMILY 3 OR MORE UNITS", UnitCount 4. Originally a single-family parcel illegally converted into a 4-unit multifamily property — flagging for Jorge; outside strict SFR profile but still a live violation lead.
- OpenDate: 1/30/2020
- Process/permit numbers found: **C2019130779** (remodel, "denied by all trades" per 6/16/2022 inspection), **C2022162671** (BLDG 001, new attached addition, "NO PERMIT ISSUED" as of 9/29/2022), then an **Internal Agreement executed 4/3/2023** (owner rep Miguel Moreno, Solutions Property LLC) giving 270 days to obtain a master permit under **process C2023029537** — confirmed **EXPIRED 6/4/2023** per the 1/17/2024 completion inspection ("Compliance not met"). A new agreement request (**process C2026070395**) was submitted 8/20/2026 and is still pending as of 9/24/2026, held up on a required engineer's safe-to-occupy letter.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms multifamily (4-unit) use, not SFR.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (149 rows, FOUND/saved) — Board Order recorded 7/22/2022 (Book 33301, Page 2206).
  - StructuresInfo (8 structures, FOUND/saved).
- Classification: **EXPIRED/STALLED**
- Reasoning: A formal Internal Agreement with a 270-day deadline was executed and allowed to expire without the master permit being obtained, and the owner's second attempt at a new agreement is still stuck on paperwork as of September 2026 — a real, repeat-engagement lead, though note the non-SFR (illegally converted 4-unit) character for the call approach.

## Case 20200203012 — 13408 SW 68 TER
- Folio: 30-4926-003-0220 (3049260030220)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/11/2020
- Process/permit numbers found: **none**. No permit or process number of any kind appears in the 130-entry activity log; every status entry is negative ("no permit has been obtained or applied for to correct violations").
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (130 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 12/20/2022 (Book 33510, Page 869). The 3/23/2023 panel hearing was **WITHDRAWN** specifically "due to pending foreclosure action," referencing county attorney (CAO) emails naming an active case: **U.S. Bank Trust National Assoc. v. Carl Castellanos, et al., Case No. 21-020161-CA-01** (Miami-Dade Circuit Court), with a mention of a "suggestion of bankruptcy" halting the foreclosure sale (which had been scheduled for 1/4/2023). Most recent activity (9/4/2026, field status check): "Front porch ceiling observed to be deteriorated. A new front door was observed installed. New metal fence observed" — new unpermitted work layered on top, still no permit on file.
  - StructuresInfo (6 structures, FOUND/saved).
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever been obtained, and the county's own 9/4/2026 field check found additional new unpermitted work. **Flag for Jorge: this folio is tangled in an active foreclosure case with a referenced bankruptcy filing** (U.S. Bank Trust Natl Assoc. v. Castellanos, 21-020161-CA-01) — the Unsafe Structures Panel itself paused its own process because of it. Still a live violation and a real lead, but ownership/standing should be re-verified before any outreach given the pending litigation.

## Case 20200203409 — 1773 NW 114 ST
- Folio: 30-2134-011-0160 (3021340110160)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 3/3/2020
- Process/permit numbers found: **none** addressing the cited violations. No C- or W-prefixed process number appears in the 88-entry activity log; all permit-status entries through 3/14/2023 are negative ("No permit has been obtained or applied for").
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (88 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 12/3/2022 (Book 33486, Page 4268) after an owner no-show hearing. On 8/27/2026 the owner's representative (Maribel Garcia) came in claiming "final inspection was passed however permit is expired" — a reference to some other, unrelated permit that does not resolve this case's cited structures. Most recent activity (9/8/2026, field status check) found a new metal fence, a new larger detached structure in front, and a new pergola in front — all unpermitted — which triggered a brand-new enforcement referral case (20260250529-B) on 9/11/2026.
  - StructuresInfo (8 structures, FOUND/saved).
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever resolved the cited violations, and the county's own September 2026 field check found three additional unpermitted structures added since, triggering a fresh code-enforcement referral days before this review. An actively escalating lead with a representative (Maribel Garcia) already in recent contact with the county.

## Case 20200205374 — 5925 NW 110 ST
- Folio: 30-2036-004-0170 (3020360040170)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 9/17/2020 (case originated from a local-news report of a fire-damaged structure with multiple illegal efficiency units)
- Process/permit numbers found: **none**. No permit or legalization process number for the fire-repair/addition work appears anywhere in the 169-entry activity log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (169 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 2/24/2023 (Book 33593, Page 4163), extended after an owner request, with a further extension order recorded 7/20/2023 (Book 33800, Page 2520). The 2/17/2023 pre-panel inspection found "STRUCTURES WERE REPAIRED WITHOUT PERMIT...STRUCTURE C WAS DEMOLISHED BY THE OWNER." A Vacate Letter was posted 12/23/2024. Owner (Luis Gomez) told the county on 3/15/2023 he was "trying to get plans" but on 7/13/2023 stated "he has no funds for the repairs." Most recent activity (9/23/2026) is a brand-new enforcement referral "for fire damage repairs without a permit."
  - StructuresInfo (5 structures, FOUND/saved).
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever been obtained to legalize the fire-damage repairs and illegal living-unit conversions, the county has posted a Vacate Letter (12/2024), and the case was just referred to fresh enforcement in September 2026. Owner has stated financial hardship (no funds for repairs) — a live lead, though the approach may need to account for that.

## Case 20200202276 — 2520 SW 127 AVE
- Folio: 30-4911-006-0120 (3049110060120)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/8/2020 (case follows prior case A2019001655-X, expiration of master permit 2018040706)
- Process/permit numbers found: **master permit 2018040706** (structures A/B) — originally issued, then expired, **re-issued 4/25/2022 under process C2022030036**, then **left to expire again 10/22/2022**; confirmed "remains expired" as of the most recent activity, **9/29/2025**. Structure C (250 LF attached terrace, the actual cited unpermitted item) has never had any permit filed for it at all.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features** (consistent with no permit activity since the 2022 re-issue/expiration).
  - RegulationSupportWebViewer USCase ActivitiesUS (60 rows, FOUND/saved) — relatively short, procedurally quiet log; no Board/Panel hearing found in this log (NOV-track case). The TSV's own PermitNum column lists "2018040706" and Inspector "Daniel Solares," consistent with the activity record.
  - StructuresInfo (5 structures, FOUND/saved) — structure D (pool) and E (fence) explicitly "no action required" unless structure A is demolished.
- Classification: **EXPIRED/STALLED**
- Reasoning: The master permit covering the dwelling and its two-story addition has now expired twice (lapsing originally, then again after a 2022 re-issue), confirmed still expired as recently as September 2025, and the separately-cited attached terrace (structure C) has never had any permit filed for it at all. Case has been quiet for a year since the last confirmation — a "your permit lapsed, again" call angle.

## Case 20210206376 — 16031 SW 110 ST
- Folio: 30-5908-010-0250 (3059080100250)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 11/25/2020 (complaint-driven: deteriorated rear wood-frame attached terrace)
- Process/permit numbers found: **permit 1993047178** (BLDG 0055, pool, expired since 9/22/1993 — three decades before this case) with a renewal attempt under **process C2012038957** in 2012 (also pre-dates this case by ~8 years and never resulted in a renewed permit); no permit of any kind was filed specifically in response to the 2020/2021 citation.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed.
  - ArcGIS keyless permit layer — queried by folio, **0 features**.
  - RegulationSupportWebViewer USCase ActivitiesUS (114 rows, FOUND/saved) — Unsafe Structures Panel Order recorded 1/13/2023 (Book 33539, Page 3771) covering structures A and B. A 3/21/2023 field status check found "terrace has been removed" (structure B self-demolished by the owner without a permit; electrical supply to perimeter lighting remains). The 4/17/2023 compliance check (code 53J, "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE") states verbatim "bldg 55 1993047178 remains expired." No case activity has been logged since 4/17/2023 — about 3.5 years quiet as of this review.
  - StructuresInfo (5 structures, FOUND/saved) — structure C (pool/deck) explicitly tied to the expired 1993 permit.
- Classification: **OPEN/CALL**
- Reasoning: The cited rear terrace (structure B) was physically removed by the owner, but no permit was ever obtained to close out the case — the panel's own compliance tracking still points to a pool permit that has been expired since 1993 and was never successfully renewed even on a 2012 attempt. The case has gone quiet for over three years with the underlying permit issue never resolved; a worthwhile call to confirm current status and close the loop.

---

# CONTINUATION — Overnight cycle, rows 45-61 (TRK-UNS-2020-OVERNIGHT-01 / M9-adjacent, cycle 5)
Same free three-source pipeline as cycles 3-4: Property Appraiser JSON proxy, free keyless ArcGIS permit layer (rolling ~2yr window), and RegulationSupportWebViewer USCase ActivitiesUS/StructuresInfo log, fetched via `Fetch-UnsafeStructuresCase.sh` into `RAW\CLASSIFICATION-WORKPAPERS\<CaseNum>\`. All raw PA JSON, ArcGIS JSON, case HTML, and parsed activity/structure text files are retained there for each case below. Rows 2-44 were already classified in prior cycles and are not re-touched.

## Case 20200203453 — 2265 NW 89 ST
- Folio: 30-3103-000-0350 (3031030000350)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1 (1,246 sf CBS dwelling, structure A, built 1958)
- OpenDate: 3/5/2020 (referred from prior case 20180189229-B)
- Process/permit numbers found: **C2024138721** (BLDG 002, master legalization of structures B/C/D, issued but **expired 1/5/2025**, confirmed by a 7/29/2025 completion inspection: "Completion compliance not achieved"), **C2025123283** (BLDG 018, legalize structure E metal fence — EFUS holds released 6/18/2025, this one succeeded), **C2026035048** (BLDG 02, partial release 1/20/2026), and the only pre-existing permit, **2016030456**, covers structure F (picket fence) with "no action required." A second Internal Agreement was executed 1/12/2026 giving compliance time to **10/9/2026**.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed, 16,555-byte JSON
  - ArcGIS keyless permit layer — queried by folio, **0 features** (consistent with no permit issued/active in the last ~2 years; the activity is all at the process-application stage)
  - RegulationSupportWebViewer USCase ActivitiesUS (188 rows, FOUND/saved) — two Internal Agreements on file: first proposed 9/9/2024, never signed/returned by customer (new owner Bryan Tirador of KMM Property Solutions LLC only later engaged 1/13/2025); second agreement executed 1/28/2025 (deadline 7/27/2025) and confirmed EXPIRED by the 7/29/2025 completion inspection; a third agreement was then executed 1/12/2026 (deadline 10/9/2026), still running as of this review
  - StructuresInfo (6 structures, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: The first corrective Internal Agreement/permit attempt (deadline 7/27/2025, process C2024138721) expired without the master permit being finaled, confirmed by the county's own 7/29/2025 completion inspection — even though one smaller item (structure E's fence) was separately legalized. A brand-new third agreement (to 10/9/2026) is now running, so there is current owner engagement, but the track record is one lapsed agreement already; good "let's not let this one expire too" call.

## Case 20200202700 — 1065 NW 126 CT
- Folio: 30-3951-010-1580 (3039510101580)
- SFR: YES — PA DORCode 0105 "RESIDENTIAL - SINGLE FAMILY : CLUSTER HOME", UnitCount 1
- OpenDate: 1/29/2020
- Process/permit numbers found: **C2022151311** (BLDG 0002, legalize garage conversion) — stalled with "upfront fee not paid" per the 11/1/2022 non-compliance entry; no permit or process number appears anywhere else in the log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (108 rows, FOUND/saved) — Panel Order recorded 8/9/2022 (Book 33326, Page 643). Most recent activity (4/3/2026, logged 6/23/2026): a CAO (county attorney) email notes an active foreclosure suit — **United Wholesale Mortgage, LLC v. Claudia Acosta, et al., Case No. 25-012333-CA-01** — with a "Suggestion of Bank[ruptcy]" referenced (text cut off in the source record). No case activity of any kind between 11/1/2022 and this 2026 litigation notice — nearly 3.5 years quiet.
  - StructuresInfo (6 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit was ever completed (the one legalization attempt stalled on an unpaid fee in 2022), and the county's own record shows no activity for over three years until a 2026 litigation notice surfaced. **Flag for Jorge: active foreclosure case (United Wholesale Mortgage, LLC v. Claudia Acosta, 25-012333-CA-01, Miami-Dade Circuit Court) with a referenced bankruptcy suggestion** — verify standing/ownership before outreach, similar to the Castellanos case (row 40) already on file.

## Case 20200203431 — 10955 SW 52 DR
- Folio: 30-4019-009-0360 (3040190090360)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 3/4/2020
- Process/permit numbers found: **C2021149437** — submitted but, per the county's own 6/13/2023 note, "never obtained final plan approval." No permit or process number of any kind appears anywhere else.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (100 rows, FOUND/saved) — owner was a NO-SHOW at the 10/24/2022 panel hearing; Panel Order recorded 12/3/2022 (Book 33486, Page 4289). Most recent activity is the 6/13/2023 non-compliance finding; nothing logged in the 3+ years since.
  - StructuresInfo (5 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: The only permit application ever filed never cleared plan review, confirmed by the county's own June 2023 note, and the owner no-showed the panel hearing. Case has gone quiet for over three years with zero corrective permit on file — clean, never-completed lead.

## Case 20200202534 — 18302 SW 152 CT
- Folio: 30-5933-033-0170 (3059330330170)
- SFR: YES — PA DORCode 0104 "RESIDENTIAL - SINGLE FAMILY : RESIDENTIAL - TOTAL VALUE", UnitCount 1
- OpenDate: 1/23/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the 105-entry activity log; every permit-status entry is negative ("permit not obtained," 12/16/2022).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (105 rows, FOUND/saved) — Panel Order recorded 8/30/2022 (Book 33359, Page 1480). Most recent activity (9/25/2024, field status inspection): "Property remains occupied with electrical connection. No active permit or applications to address violations at this time."
  - StructuresInfo (4 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit or application of any kind has ever been filed, confirmed as recently as September 2024 by the county's own field inspection. Clean, never-attempted lead, quiet for roughly two years since the last confirmation.

## Case 20200202663 — 2986 NW 93 ST
- Folio: 30-3104-003-4430 (3031040034430)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/29/2020
- Process/permit numbers found: **C2023064914** (permit 2025057500, master legalization — obtained 7/11/2025, repair structure A / demo C,D,F / legalize E,G, **re-issued 3/18/2026**, still "not finalized" per the 9/9/2025 completion inspection and still "in non-compliance" per a 7/6/2026 follow-up), **C2023064918** (permit 2025057504, companion legalization permit), plus two 2026 MECH sub-permits (2026043534/2026043535) tied to the master permits.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **4 features**: master permits 2025057500/2025057504 and their 2026 MECH sub-permits, confirming the legalization project is real and actively being worked
  - RegulationSupportWebViewer USCase ActivitiesUS (183 rows, FOUND/saved) — Internal Agreement executed 5/23/2025 (90-day deadline 8/21/2025); 9/9/2025 completion inspection found the master permit "obtained on 07/11/2025...not finalized"; most recent activity (7/6/2026) states the permit was "re-issued on 3/18/2026" but "Property in non-compliance," and owner's rep Albert requested new agreement requirements by email the same day
  - StructuresInfo (7 structures, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: A real master permit was obtained (7/11/2025) covering most of the cited structures and even re-issued once (3/18/2026), but it has never been finaled across more than a year, and the county's own July 2026 note still lists the case as non-compliant. Strong "you're most of the way there, let's finish it" lead — the hardest technical work (permit issuance) is already done.

## Case F2019006393 — 18801 NE 2 AVE aka BLDG 10 (Star Lakes Estates No. 10 Condo)
- Folio: 30-2206-027-0001 (3022060270001) — condo-association REFERENCE folio, one of 20 folios this HOA manages (companion to cases F2019006390/Bldg 7 and F2019006392/Bldg 9 already on file)
- SFR: **NO** — PA DORCode 0000 "REFERENCE FOLIO", UnitCount 0; flagging for Jorge
- OpenDate: 1/27/2020
- Process/permit numbers found: **none specific to Bldg 10**. The 8/14/2026 Compliance Consent Agreement (process X2026149116, valid to 2/10/2027) covers the HOA's ENFC holds association-wide, but unlike Bldg 7 (which has a confirmed 2026 concrete-repair permit on the free ArcGIS layer), no building-specific repair permit was found tied to this folio.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms reference folio (not SFR)
  - ArcGIS keyless permit layer — queried by this specific folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (84 rows, FOUND/saved) — association-wide notes: as of 4/13/2026, 46 open cases across the HOA's 20 folios, 2 unpaid CVNs (H012274, P078300), 28 cases with unpaid penalty/lien balances, 6 Unsafe Structures cases with unpaid cost balances blocking ENFC hold releases; HOA President John Baptiste did not answer a 1/14/2026 call attempt but was reached later; the CCA executed 8/14/2026 is the hold-release mechanism, not evidence of a completed repair for this specific building
  - StructuresInfo (1 row, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: Same pattern as the companion Bldg 9 case (F2019006392): no building-specific corrective permit has ever been found for this folio, and the HOA's association-wide Compliance Consent Agreement is a payment/hold-release framework, not proof this building has been repaired. Treating as still open and callable, with the same broader 46-case HOA financial-exposure context available if Jorge wants an association-wide angle.

## Case 20200202351 — 11485 QUAIL ROOST DR
- Folio: 30-6006-001-0700 (3060060010700)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/13/2020
- Process/permit numbers found: a permit was logged as "obtained" for structures B/C on 1/3/2023, but the county's own most recent field status check (8/20/2026) states plainly: "Original structures in violation (A, B and C) remain...No permit has been obtained to address violations," plus newly found unpermitted items (solid metal fence/gate, accordion shutters, a new metal shed).
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (110 rows, FOUND/saved) — Panel Order recorded in 2022 after multiple mailing failures (NOV returned "unclaimed/refused" for Raul Molina, forwarding issues for lienholders of record including Wilmington Trust N.A. and Crimson Residential Assets Corp — no litigation case number found, but the interested-parties list shows active mortgage-servicing/trust entities, worth a quick ownership re-check before calling). Most recent activity (8/20/2026, field status check): structures A/B/C all still present, case still in non-compliance with the 3/24/2022 Panel Order, new unpermitted work found.
  - StructuresInfo (4 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: Despite one ambiguous "permit obtained" note from January 2023, the county's own most recent (August 2026) field check directly contradicts it, confirming all three cited structures remain and that no permit addresses the violations, with new unpermitted additions found on top. Very current, escalating lead.

## Case 20200202658 — 1055 NW 73 ST
- Folio: 30-3111-035-3740 (3031110353740)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/28/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears in the 97-entry log; the only permit-status entry (11/29/2022, code 53P) states "no permit has been obtained."
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (97 rows, FOUND/saved) — Panel Order recorded 8/9/2022 (Book 33326, Page 602). Most recent activity (8/25/2026, field status check): "Roofing alterations, new fence and elevated planter referred to enforcement."
  - StructuresInfo (4 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit of any kind has ever been obtained in over six years, and the county's own August 2026 field check found new unpermitted work (roofing, fence, elevated planter) referred to fresh enforcement — a currently escalating, never-attempted lead.

## Case 20200202936 — 2480 NW 89 TER
- Folio: 30-3103-001-0150 (3031030010150)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/8/2020
- Process/permit numbers found: **none**. The only engineer's-report entry (12/22/2022) notes "ENGINEER REPORT NOT RECEIVED YET. HOWEVER, IT WILL BE ADDRESS WHEN PERMIT DRAWINGS ARE SUBMITTED" — aspirational, never followed by a filed process number.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (97 rows, FOUND/saved) — Panel Order recorded 9/13/2022 (Book 33376, Page 4488). Most recent activity (8/25/2026, field status check): "new metal fence referred to enforcement as per directive."
  - StructuresInfo (5 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit or application has ever been filed, confirmed through the county's own December 2022 note, and an August 2026 field check found a new unpermitted metal fence and referred the case for fresh enforcement — currently escalating, never-attempted lead.

## Case 20200202739 — 17025 SW 119 PL
- Folio: 30-5936-005-1920 (3059360051920)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/30/2020
- Process/permit numbers found: **permits 1993138675 and 2021083822** (both pre-existing, both confirmed **expired 10/3/2021**), with **C2023162460** opened to re-issue permit 1993138675 — EFUS holds not released as of the 8/31/2023 note, requiring the owner to request an Internal Agreement that was never pursued.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (104 rows, FOUND/saved) — Panel Order recorded 6/14/2022 (Book 33238, Page 1480). Two recent field status checks (2/17/2026 and 8/28/2026) both confirm the same old expired permits plus a growing list of new unpermitted items (sheds, metal fence/gate, asphalt shingle roof) each visit.
  - StructuresInfo (5 structures, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: Two permits that once covered this property's roof and structure work are confirmed expired since October 2021, and a 2023 attempt to re-issue one of them stalled on an unreleased EFUS hold with no Internal Agreement ever requested to move it forward. Meanwhile new unpermitted work keeps appearing at each 2026 field check — a worsening, re-engagement-worthy lead built around a specific lapsed permit.

## Case 20200203114 — 1720 SW 99 CT
- Folio: 30-4008-007-1940 (3040080071940)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/15/2020
- Process/permit numbers found: **C2023106601** (BLDG 0002, Durock enclosure legalization) — Internal Agreement signed 11/7/2023, EFUS holds released for rework 12/21/2023, but the 3/20/2024 completion check states the application "remains under trades review" and was never finaled; confirmed still unresolved per the 7/8/2026 note ("No permits obtained to correct violation").
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (141 rows, FOUND/saved) — repeated inbound calls from attorneys representing the owner's mortgage/loan provider (Natalia Cruz, Julio Bermati — "attorney for loan provider," 2024-2025) checking on compliance status, suggesting a lender is tracking this violation, though no specific court case number was found in the log. Owner and a permit runner (Marlen Arteaga) met with county staff in person 5/27/2026; most recent activity (9/15/2026) is a field status check with no outcome narrative yet recorded.
  - StructuresInfo (3 structures, FOUND/saved)
- Classification: **EXPIRED/STALLED**
- Reasoning: A real Internal Agreement and legalization permit application were filed, but the permit sat "under trades review" for years and was never finaled, with non-compliance confirmed as recently as July 2026. Multiple mortgage-lender attorneys have been checking on this case, and the owner personally came in with a permit runner in May 2026 — a live, multi-party-interested lead on a stalled (not abandoned) permit.

## Case 20200202668 — 1920 NW 93 ST
- Folio: 30-3103-011-0241 (3031030110241)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/29/2020
- Process/permit numbers found: **C2024155270** — could not be approved ("portions of structure built without permit"; plans addressing all violations required); **C2024173719** (re-roof) — EFUS hold not released, case in non-compliance per 9/11/2024 note.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (95 rows, FOUND/saved) — Panel Order recorded in 2024 (Book/Page not separately captured in this log excerpt); contractor Carter Taneira called 8/6/2024 to inquire about process C2024155270's disapproval. No activity logged since 9/11/2024 — over two years quiet.
  - StructuresInfo (5 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: Two permit attempts were made in 2024 but neither produced an issued permit — one was rejected outright for incomplete scope, the other (a re-roof) remained stuck on an unreleased hold — and the case has been silent for over two years since. Live lead with a concrete "finish what the contractor started" angle.

## Case F2019006452 — 540 W PARK DR 540 (West Lake Village II Condominium Association)
- Folio: 30-4005-026-0001 (3040050260001) — condo-association REFERENCE folio shared across the whole complex (companion to case F2019006453/Bldg 530 already on file, and to case F2019006459/Bldg 440 below)
- SFR: NO — PA DORCode 0000 "REFERENCE FOLIO", UnitCount 0; owner of record West Lake Village II Condominium Association, Inc.
- OpenDate: 7/22/2020
- Process/permit numbers found: permit **2025025071**, specific to **540 W PARK DR UNIT 540** (this case's own address), part of the same 2025 wave of 24+ corrective permits (roofs, fences, decks) confirmed on the free ArcGIS permit layer across the complex.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms condo-association reference folio
  - ArcGIS keyless permit layer — queried by folio, **24 features**, including permit 2025025071 tied specifically to the "540" unit/building address named in this case
  - RegulationSupportWebViewer USCase ActivitiesUS (117 rows, FOUND/saved) — identical association-wide narrative as the already-classified companion case F2019006453: association attorney Cecile S. Mendizabal (replacing Roberto Fernandez as of 8/6/2026) actively coordinating payment of US cost balances on the HOA's open cases; 12/14/2025 note confirms "repairs are complete and the final engineer inspection is scheduled for the week of 01/12/2026"; most recent activity (9/16/2026) confirms "payment of all US cost balances owed. OK to release ENFC holds...through 12/16/2026"
  - StructuresInfo (1 row, FOUND/saved)
- Classification: **HANDLED/SKIP**
- Reasoning: Same active, well-documented, attorney-managed repair program as the companion Bldg 530 case, with a permit specifically tied to this building/unit address (540) confirmed on the free permit layer, repairs reported complete, and all cost balances paid as of September 2026. Deprioritize for calling.

## Case F2019006459 — 440 W PARK DR 440 (West Lake Village II Condominium Association)
- Folio: 30-4005-026-0001 (3040050260001) — same condo-association REFERENCE folio as cases F2019006453 (Bldg 530) and F2019006452 (Bldg 540) above
- SFR: NO — PA DORCode 0000 "REFERENCE FOLIO", UnitCount 0
- OpenDate: 7/22/2020
- Process/permit numbers found: permits **2025024504** and **2025025498**, both specific to **540 W PARK DR UNIT 440** (this case's address), part of the same 2025 wave of 24+ corrective permits confirmed on the free ArcGIS layer.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms reference folio
  - ArcGIS keyless permit layer — queried by folio, **24 features**, including two permits tied specifically to the "440" building/unit address
  - RegulationSupportWebViewer USCase ActivitiesUS (107 rows, FOUND/saved) — identical HOA-wide activity log to the two companion cases above (same attorney, same 12/14/2025 "repairs complete" note, same 9/16/2026 confirmed payment of all US cost balances and ENFC hold release through 12/16/2026)
  - StructuresInfo (1 row, FOUND/saved)
- Classification: **HANDLED/SKIP**
- Reasoning: Same association-wide, attorney-managed, currently-complete repair program, with permits specifically tied to this building/unit (440) on the free permit layer. Deprioritize for calling.

## Case 20200202568 — 3085 SW 79 AVE
- Folio: 30-4015-018-0410 (3040150180410)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/24/2020
- Process/permit numbers found: **none**. The 10/3/2022 note states "no permits obtained as of this date"; a 12/5/2023 in-person visit by PO representative Andres Lozano resulted only in a handout of damage-assessment forms and non-compliance-agreement information — no process number was ever opened.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (92 rows, FOUND/saved) — Panel Hearing held 4/22/2022 ended in an "AGREEMENT" hearing status (not a Panel Order); Panel Order recorded 6/1/2022 (Book 33215, Page 3903). Most recent activity (12/5/2023) was the in-person visit; nothing logged in the nearly 3 years since.
  - StructuresInfo (6 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit or process number has ever been filed despite the owner's representative personally visiting the county office in December 2023 to get the requirements — that visit did not convert into any filed application, and the case has been silent for almost three years since. Live lead with a specific "you came in once, let's finish it" angle.

## Case 20200202742 — 2830 NW 91 ST
- Folio: 30-3104-003-5695 (3031040035695)
- SFR: **NO** — PA DORCode 0802 "MULTIFAMILY 2-9 UNITS : 2 LIVING UNITS", UnitCount 2 (duplex) — flagging for Jorge; outside strict SFR profile
- OpenDate: 1/30/2020
- Process/permit numbers found: **C2022013666** — a permit expeditor (Ossie Conley) was still inquiring about an ENFC hold release on this process as recently as 8/26/2026, but no permit has ever been obtained ("no permit obtained as of this date," 9/8/2025). A non-compliance agreement request was submitted 5/1/2026 but flagged 5/15/2026 as requiring additional information, still unresolved.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms duplex (2-unit) use, not SFR
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (135 rows, FOUND/saved) — Panel Order recorded 6/14/2025 (Book 34803, Page 88). A 1/22/2026 call with the property owner notes the owning corporation's Sunbiz status is **INACTIVE**. Most recent activity (8/26/2026): permit expeditor Ossie Conley called about the ENFC hold, case still carries a $2,355.07 balance plus an unresolved companion code case.
  - StructuresInfo (4 structures, FOUND/saved)
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever been obtained, and the owner's non-compliance agreement request has been stuck needing additional information since May 2026, with a permit expeditor still actively calling as recently as August 2026 — a live, currently-engaged lead, though note the non-SFR duplex character and the inactive corporate owner (Presidential Property Holdings per Sunbiz) for the call approach.

## Case 20200203031 — 14830 NARANJA LAKES BLVD (Naranja Lakes Condominium No. Five, Inc.)
- Folio: 30-6933-014-0001 (3069330140001) — condo-association REFERENCE folio
- SFR: **NO** — PA DORCode 0000 "REFERENCE FOLIO", UnitCount 0; owner of record Naranja Lakes Condominium No. Five, Inc. (case opened after a 4th-floor fire affected the roof structure near the elevator lobby); flagging for Jorge
- OpenDate: 2/12/2020
- Process/permit numbers found: **C2026119420** (BLDG 0001, "EMERGENCY SHORING," EFUS holds released 6/10/2026) and emergency repair upload process **UP26045925** (submitted 6/8/2026 by permit expeditor Amy Naite, coordinated directly with RER's Structural Reviewer Supervisor and Permit and Plans Manager). No permit yet covers the actual fire-damage repair itself.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms condo-association reference folio
  - ArcGIS keyless permit layer — queried by folio, **0 features** (the emergency-shoring process has not yet converted into a feature on this layer)
  - RegulationSupportWebViewer USCase ActivitiesUS (147 rows, FOUND/saved) — county warned the HOA 6/1/2026 that failure to provide a structural engineer's safe-to-occupy letter by 6/5/2026 would trigger "further enforcement action and/or legal actions"; units A1H-A4H posted with unsafe signs 5/27/2026, still vacated; a new condo president (Alberto Vidal) took office late June 2026; the Unsafe Structures portion of a broader Compliance Consent Agreement (~$4,273.41) was still being negotiated as of 6/25/2026; most recent activity (9/4/2026) is a representative inquiring about an ENFC hold release, held up on a missing notarized Corporate Resolution letter
  - StructuresInfo (4 structures, FOUND/saved)
- Classification: **HANDLED/SKIP**
- Reasoning: The HOA has an active emergency shoring permit, an engaged permit expeditor coordinating directly with RER's structural review staff, and ongoing Compliance Consent Agreement negotiations as recently as September 2026 — real, currently-moving correction activity, even though the final fire-damage repair permit has not yet been issued. Deprioritize for calling for now, though this one is worth a follow-up check in a few months given the repair is still mid-process rather than finished.

## Case 20200202781 — 14490 SW 162 ST
- Folio: 30-5927-009-2010 (3059270092010)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/31/2020
- Process/permit numbers found: **C2017116174** (pre-existing process for the two pergola structures, "ZIPS CATEGORIES 0004 FOR HOU PERGOLAS," upfront fee paid but **EXPIRED AND REJECTED BY ZONING** per 7/22/2022 note). No corrective permit has ever been obtained for structures C/D. (Unrelated BLDG permit 2020041975 finaled 4/24/2020 covers only the fence, structure G — already resolved, not at issue.)
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (100 rows, FOUND/saved) — Panel Hearing 6/22/2022 ended "NO SHOW"; Panel Order recorded 8/1/2022 (Book 33314, Page 1074); 53J "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE" logged 11/10/2022; most recent activity (5/28/2026 field status check) confirms structures C and D (pergolas) still remain, no permit obtained, case still in non-compliance since 11/10/2022; note also references a new unpermitted canvas awning observed on the east wall (not yet its own violation line)
  - StructuresInfo (8 structures, FOUND/saved) — C and D marked DEMOLISH (both pergolas, unpermitted, encroaching setbacks); E (shed) also marked DEMOLISH on this sheet but activity log confirms it was physically removed by 7/22/2022; A/B/F/H marked no action required or already permitted
- Classification: **OPEN/CALL**
- Reasoning: The only process ever opened for the two outstanding pergola structures (C, D) expired and was rejected by zoning in 2022, and no permit has been filed since. A field check as recent as May 2026 confirms both structures are still standing and the case remains non-compliant with a Panel Order on record since late 2022. Live lead — SFR, clean call angle ("the pergolas still need to come down or get permitted").

## Case 20200203108 — 8140 NW 34 AVE
- Folio: 30-3109-002-1510 (3031090021510)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/15/2020
- Process/permit numbers found: **C2005151393 Type 06** (carport-enclosure-to-efficiency legalization, filed 2005 under the prior case) — 11/10/2020 note confirms "has never been issued a permit." No other process or permit number appears anywhere in the log.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (95 rows, FOUND/saved) — Panel Hearing 9/26/2022 ended "NO SHOW"; Panel Order recorded 11/2/2022 (Book 33447, Page 704); 53J "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE" logged 1/27/2023; most recent activity (4/14/2023) is a Wells Fargo mortgage representative (Eric) calling for a status update, case still non-compliant — quiet for over 3 years since
  - StructuresInfo (saved; 4 structures total per 11/12/2020 count) — carport-enclosure efficiency (B), rear/side attached addition (C), and a 400-LF perimeter fence (D), all built without permit
- Classification: **OPEN/CALL**
- Reasoning: No permit has ever been issued for any of the violating structures — the one process on file predates this case by 15 years and was never completed — and the case has been silent since a routine mortgage-company status call in April 2023. Live lead, SFR, straightforward call.

## Case 20200203286 — 7285 NW 173 DR 101 (individual condo unit, Bella Colina Condo)
- Folio: 30-2011-078-0160 (3020110780160) — individually-owned condo unit, not a reference folio
- SFR: **NO** — PA DORCode 0407 "RESIDENTIAL - TOTAL VALUE : CONDOMINIUM - RESIDENTIAL," UnitCount 1 — flagging for Jorge; this is a condo townhouse unit, not a detached SFR
- OpenDate: 2/26/2020
- Process/permit numbers found: a permit with **issue date 1/4/2022** logged against structure A's compliance tracking (activity 53I, posted 5/15/2023) — addresses only part of the violation. No permit or demolition was ever completed for structure B.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, confirms individual condo unit (not reference folio)
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (156 rows, FOUND/saved) — first Panel Order 12/15/2022 (Book 33510, Page 899) ordered structure A secured/repaired under permit and structure B (300-sf unpermitted rear metal terrace with electrical) demolished by 4/14/2023; an extension request was granted then a 9/13/2023 appeal hearing ended NO SHOW, producing a second Panel Order recorded 9/21/2023 (Book 33891, Page 1785); most recent activity (10/3–10/6/2023) is undeliverable NOH mail, not remailed since the hearing already occurred — nothing logged in the 3 years since
  - StructuresInfo (3 structures, FOUND/saved) — A (2-story dwelling, repairs required if B demolished), B (unpermitted terrace, to be demolished), C (70-LF wood fence, no action required)
- Classification: **OPEN/CALL**
- Reasoning: The one permit on file (issued 1/4/2022) did not close out the case — the ordered demolition of the unpermitted rear terrace (structure B) never happened, triggering a second Panel Order after a no-show appeal hearing in September 2023, and the file has been silent for roughly three years since. Live lead, though note this is a condo unit rather than a detached SFR for the call approach.

## Case 20200203907 — 3197 NW 100 ST
- Folio: 30-3104-003-6800 (3031040036800)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 5/1/2020
- Process/permit numbers found: a permit with **issue date 3/27/2023**, applied to structures A (main dwelling) and C (side terrace enclosure) only. No permit was ever obtained for structures B, D, E, or F.
- Sources checked:
  - Property Appraiser proxy (folio) — FOUND, SFR confirmed
  - ArcGIS keyless permit layer — queried by folio, **0 features**
  - RegulationSupportWebViewer USCase ActivitiesUS (122 rows, FOUND/saved) — Panel Order recorded 12/31/2022 (Book 33527, Page 239); the 3/27/2023 permit resolved structures A/C only, while a companion 53J entry the same day (4/10/2023) confirms "no permits pulled" for the remaining structures; case escalated to a Notice to Vacate / non-compliance letter posted 12/13/2024; most recent activity (3/21/2025) is a telephone call from the owner's representative reviewing case history and compliance options — quiet since
  - StructuresInfo (6 structures, FOUND/saved) — B (500-sf front terrace), D (1,600-sf rear addition), E (70-sf shed), F (80-LF fence) all marked DEMOLISH and none ever permitted; A repair-or-demolish, C repair-or-demolish (both nominally covered by the 2023 permit)
- Classification: **EXPIRED/STALLED**
- Reasoning: Real corrective activity did happen — a permit was obtained in March 2023 — but it covered only two of six violating structures, the larger unpermitted additions (B, D, E, F) were never addressed, and the case escalated all the way to a Notice to Vacate by the end of 2024. The owner's side was still calling about a path to compliance as recently as March 2025 but nothing has moved since. Worth a follow-up call — stalled, not abandoned.

**Disclosure: These numbers and case-history notes are reference only, drawn from free public Miami-Dade County sources (Property Appraiser, the free keyless ArcGIS permit layer, and the RegulationSupportWebViewer case activity log). Use a title company for accurate payoff/lien figures where money amounts are at issue. This is not title insurance or legal advice.**


## Case F2019006458 — 460 W PARK DR 460 (West Lake Village II Condominium Association)
- Folio: 30-4005-026-0001 (3040050260001) — a condominium association REFERENCE folio shared across the whole complex (same folio/complex as Case F2019006455 at 480 W Park Dr and Case F2019006453 at 530 W Park Dr, both already classified HANDLED/SKIP above)
- SFR: NO — PA WCF proxy (apps.miamidadepa.gov/PApublicServiceProxy/PaServicesProxy.ashx, Operation=GetPropertySearchByFolio) returns DORCode "0000" DORDescription "REFERENCE FOLIO", PrimaryZoneDescription "MULTI-FAMILY - 38-62 U/A", UnitCount 0, OwnerInfos "REFERENCE ONLY"; converted from the 40/50-Yr Recertification System to a US (Unsafe Structures) case
- OpenDate: 7/22/2020
- Process/permit numbers found: this building's own recertification/repair process numbers are not separately itemized, but the case's Activities log (105 entries, 6/24/2019–9/16/2026) ties into the same association-wide corrective program as the two already-classified companion cases: **C2025160071, C2025007050, C2025007560, C2025003581, C2025163948, C2025163813** all appear with "Hold released...Citations and fees paid" notations tied to this folio/association.
- Sources checked:
  - PA WCF proxy by folio — FOUND, confirms condo-association reference folio
  - RegulationSupportWebViewer, USCase controller — ActivitiesUS pulled via a 2-step session fetch (USCaseDetails?CaseNum= sets the session, then USCase/ActivitiesUS reads the table within that same session — direct querystring access to ActivitiesUS alone returns "Application Error"). 105 logged activities, 6/24/2019–9/16/2026. Most recent entry (9/16/2026, code 114A): "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026." Entry dated 8/6/2026 (code 118, telephone call) and 2/13/2025, 2/5/2025 entries show the association's attorneys (Roberto Fernandez, then Cecile S. Mendizabal from 8/6/2026) repeatedly paying down cost balances and CVNs across 15+ Unsafe Structures/recertification cases on this HOA's folios to get ENFC holds released.
  - ArcGIS keyless permit layer — not queried for this case (condo-association reference folio behaves the same way as the two companion cases already checked; the case's own activity log already carries the current 2025-2026 process-number and payment history, the more authoritative source here).
- Classification: **HANDLED/SKIP**
- Reasoning: Same HOA, same active payment/compliance pattern already documented for the two companion buildings on this complex (F2019006455, F2019006453) — the association's attorney has been current with the county as recently as 9/16/2026, confirmed all US cost balances paid, and the county is ok to release enforcement holds through 12/16/2026. Deprioritize for calling; not SFR (condo association reference folio, not a residential parcel).

## Case 20200202511 — 3501 NW 99 ST
- Folio: 30-3104-005-2153 (3031040052153)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 1/21/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the activity log. The TSV's own AllegedViolation field references a prior, unrelated case ("AS PER CASE # 20160177042-B") — that is a citation cross-reference, not a corrective permit.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch (USCaseDetails sets session, then ActivitiesUS reads the table). Full activity log pulled and saved (ActivitiesUS.txt). Most recent activity (10/3/2024, code 114A): "UPDATE CASE REPORT. DWELING IS OCCUPIED. ELECTRIC POWER IS CONNECTED. NO PERMIT APPLICATION ACTIVITY FOUND IN GOLD KEY. ALL STRUCTURES REMAIN IN PLACE." A 6/9/2022 Panel Order (code 53J, "PERMIT NOT OBTAINED - BOARD/PANEL ORDER NON-COMPLIANCE") ordered demolition of structures B, C, D, E, F within 120 days and a repair permit for structure A within 90 days — neither was ever done; "no permit has been obtained as of this date" is repeated through the log.
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit application of any kind has ever been filed in nearly six years this case has been open — confirmed by the county's own most recent note (10/3/2024, "Gold Key" is the county's permit tracking system) and by a 2022 Board/Panel demolition/repair order that was never complied with. Prime lead — owner has taken no action at all.

## Case 20200202809 — 4250 SW 99 AVE
- Folio: 30-4020-004-1350 (3040200041350)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/3/2020
- Process/permit numbers found: a long post-citation chain tied to **Master Permit 2016055845** (attached additions) — **C2023139752, C2023153261, C2024004027** (flat re-roof), **C2026073082, C2026164164** (most recent, 9/8/2026, explicitly "for permit #2016055845 reissue"). The master permit itself has repeatedly expired (9/11/2024, and component trades "expired on 05/16/2023") and been re-activated via these EFUS/ENFC hold-release process numbers.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. Most recent entries: 9/8/2026 (code 114) "EFUS Hold released for process number C2026164164 - for permit #2016055845 reissue"; same date, confirms 9/1/2026 ENFC partial payment and cost-balance payment on the US case, "OK to lift ENFC hold(s) for 180 days"; 9/1/2026 entry states the case is "under active agreement, expires 02/02/2027." A string of Non-Compliant Case Agreements since at least 11/7/2023 have repeatedly given the owner 90-day windows to obtain the master permit and complete work, each followed by a new agreement when the deadline passed.
- Classification: **HANDLED/SKIP**
- Reasoning: The owner has an active, current Non-Compliance/Internal Agreement (through 2/2/2027) and is actively paying costs and clearing ENFC/EFUS holds as recently as 9/8/2026 to keep the master permit 2016055845 reissue alive. This is ongoing, current engagement with a real (if repeatedly extended) corrective permit — deprioritize for calling, though note for Jorge this has been dragging since 2016 with repeated expirations, so it is not a fast-closing file either.

## Case 20200202344 — 3245 NW 34 ST
- Folio: 30-3128-013-1090 (3031280131090)
- SFR: **NO** — PA DORCode "0802" "MULTIFAMILY 2-9 UNITS : 2 LIVING UNITS", UnitCount 2 (a duplex, not a single-family parcel) — flagging for Jorge since this falls outside the SFR lead profile
- OpenDate: 1/13/2020
- Process/permit numbers found: three early legalization processes — **C2014117820** (add attached, legalized), **C2018237093** (alter interior of front structure), **C2020022364** (add attached rear addition) — all three confirmed **EXPIRED** by 2022 ("ALL APPLICATION IS CURRENTLY EXPIRED", 6/27/2022) and none ever addressed Structure C. A new post-citation process, **C2026047013** (master permit application), was "under trades review" as of 5/30/2026, with a companion **C2026059543** ("partial release bldg 02 duplex interior legalization," 2/12/2026).
- Sources checked:
  - PA WCF proxy by folio — FOUND, confirms duplex (not SFR)
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved (2,900+ lines of raw HTML/text). Most recent entry (9/14/2026, code 114): "Met with Carmen Oropesa, I explained the violations to her." 8/17/2026: ENFC hold paid/released on C2026147549. However, the 7/1/2026 entry (more recent than the 5/30/2026 "under trades review" note) states explicitly: "Same ownership as of last agreement. No permits obtained to correct violations. Property in non-compliance. Non-compliance agreement email sent to property owner."
- Classification: **EXPIRED/STALLED**
- Reasoning: Multiple corrective permit attempts were made over the years (2014, 2018, 2020 processes, all expired; a 2026 master-permit application under C2026047013 reached "trades review" but the county's own more recent 7/1/2026 note says no permit has actually been obtained and the property remains in non-compliance). The owner continues to pay fees and meet with the county as late as 9/14/2026, but nothing has been finaled. Not SFR (duplex) — lower lead-gen priority regardless of the stalled status.

## Case 20200203460 — 1740 NE 145 ST
- Folio: 30-2220-002-4410 (3022200024410)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 3/5/2020
- Process/permit numbers found: **Permit 2022079392** (demolition of Structure C) — completed/active, the only clearly finished corrective item. Separately, **C2021066093** re-issued an expired Elec01 permit (2019051816) in 2021, but the log notes "this permit does not address the detached structures." Later process numbers **C2022173066** (demo rear trailer, Structure C), **C2022155549** (fence, released 7/26/2022), **C2023007037** (re-roof, released 10/18/2022), and **C2025003268** (stalled — "unable to send to Unsafe Structure Supervisors for review due to unpaid upfront fees," 10/7/2024) all appear.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. Most recent activity (8/13/2026, code 300A field check): "STRUC-A/B remains and STRUC-C has been removed...Electrical and plumbing disconnect letters have been submitted...STRUC-B must still be addressed." A 6/18/2026 entry has the county telling the owner's representative she must first get an active process number with an ENFC hold (and pay citation P048910) before anything else can move — meaning as of now there is NO live process addressing Structure B.
- Classification: **OPEN/CALL**
- Reasoning: Structure C was successfully demolished under a finaled permit — real partial progress — but Structure B remains an open, unaddressed violation with no active corrective permit on file as of the most recent 8/13/2026 field check, and the county is now escalating toward utility disconnection. Prime lead with a "you already fixed one structure, let's finish the other before the power gets cut" angle.

## Case 20200203107 — 13410 SW 26 TER
- Folio: 30-4914-030-0130 (3049140300130)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/15/2020
- Process/permit numbers found: **C2020066798** (legalize gates) and **C2017182332** (legalize rear addition) — both pre-dating or contemporaneous with other cases on this address, not clearly determinative; **W2020086111** (EFUS hold release, 3/18/2020, early); **C2021180607** (new windows/doors, submitted 9/23/2021) — this is the determinative one, and it was explicitly blocked: "MASTER PERMIT REQUIRED, THEN APPLICATION MUST TIE TO THAT MASTER PERMIT," and never completed.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. Case has been in non-compliance with the Panel Order since 2/24/2023. Most recent field check (9/8/2026, code 300A): "Security bars on structure A have been removed. No access was granted at the time of the inspection, therefore could not check current condition of structure B. Structure C remains. New windows and front door installed without required permits."
- Classification: **OPEN/CALL**
- Reasoning: The one potentially corrective 2021 process (new windows/doors) never resulted in a permit because it was blocked pending a master permit that was never obtained, and the county's own most recent inspection (9/8/2026) found NEW unpermitted work (replacement windows and a front door) installed since — meaning the owner is actively doing unpermitted work rather than correcting it. Prime lead.

## Case 20200203901 — 26101 SW 167 AVE
- Folio: 30-6929-000-0320 (3069290000320)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 5/1/2020
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the activity log; every entry since the citation states no permit was obtained or applied for.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. A 12/10/2021 field check found "Structures A,B,C,D,E,F,G,H,I,J,K,L, remain. No permits obtained or applied for" — twelve separate unpermitted structures on one SFR parcel. Most recent activity (12/26/2025, code 300A): a field status check was attempted but the property owner "stated that he only agreed to DERM inspection, therefore all other section inspectors (ONC, Enforcement, Unsafe Structures Section) were not allowed to perform their assessments."
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit has ever been filed in nearly six years, the violation involves a dozen separate unpermitted structures on the property, and the owner is now actively refusing county inspectors access (allowing only the unrelated DERM inspector in) — this reads as active obstruction rather than mere inaction. Prime lead, though the owner will likely be a difficult contact.

## Case 20200203293 — 12895 SW 58 LN
- Folio: 30-4926-060-0140 (3049260600140)
- SFR: YES — PA DORCode 0101 "RESIDENTIAL - SINGLE FAMILY : 1 UNIT", UnitCount 1
- OpenDate: 2/26/2020
- Process/permit numbers found: **C2019001724** (originally for a detached addition/BBQ pit, "no permit issued" as of 12/8/2021, then reactivated 2/1/2023), leading to **Master Permit 2023054010** addressing structures B and C and the removal of structure E — this permit **EXPIRED 6/15/2024** (also reported as expiring 12/12/2024 "with no record of inspection"). Separately, **C2021129744** (house replacement windows, permit 2021061217). Structure D (a pre-manufactured shed) was never covered by any application.
- Sources checked:
  - PA WCF proxy by folio — FOUND, SFR confirmed
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved (3,350+ lines). Case has been in non-compliance with the Panel Order since 4/5/2023. Most recent activity (9/28–9/29/2026, codes 114/114A): the current occupant (Jorge Martinez, registered via MEETQ with Unsafe Structures, Neighborhood Compliance and Building Enforcement supervisors) was "assisted...and explained the violations and how to come into compliance...He understood." No new permit number has been filed as of this visit.
  - ArcGIS keyless permit layer — queried by folio, **2 features** (a prior session's pull, re-verified this session): plumbing permit **2025067939** (process C2025161356) and electrical permit **2025067879** (process C2025162200), both issued 8/26/2025, both tied back to **Master Permit 2023054010** (the same master permit the case log says expired 6/15/2024), both typed "ADDITION - DETACHED," 350 sq ft, owner of record Lidia Rial, contractor "OWNER." These do not appear by number anywhere in the case activity log and the county's own Sept 2026 case notes still treat the file as non-compliant, so it is unclear whether this August 2025 plumbing/electrical work actually resolved any of the cited violations (B/C/E) or is a separate, unrelated addition project riding the same old master permit number — flagging as an open question rather than resolving the classification.
- Classification: **EXPIRED/STALLED**
- Reasoning: A real corrective permit (2023054010) was obtained and did address most of the structures (B, C, and removal of E), but it expired in mid-2024 with no inspection on record, and one structure (D, the shed) was never addressed by any application at all. Two sub-permits (plumbing/electrical) surfaced on the free ArcGIS layer under the same master permit number in August 2025, but the county's own case log still shows active non-compliance as recently as September 2026 and never references those sub-permits as resolving anything. The owner/occupant re-engaged with the county as recently as late September 2026 and was walked through the compliance process again, but as of that visit no new permit had been filed. Live lead — "your 2023 permit lapsed, and the shed was never even covered," with a side question worth asking about the 2025 plumbing/electrical work.

## Case 20200205309 — 767 NW 102 ST
- Folio: 30-3102-012-0120 (3031020120120)
- SFR: **NO** — PA DORCode "0803" "MULTIFAMILY 2-9 UNITS : MULTIFAMILY 3 OR MORE UNITS", UnitCount 3 (a triplex, not a single-family parcel) — flagging for Jorge since this falls outside the SFR lead profile
- OpenDate: 9/14/2020
- Process/permit numbers found: no specific C- or W-prefixed number is named in the available log excerpts, but a 6/16/2022 entry states "several process numbers from 2020 have not been approved" — meaning applications were attempted but never got past county approval. Separately, repeated 2021 entries state flatly "NO PERMITS OBTAINED...NO PERMIT APPLICATIONS TO ADDRESS THE VIOLATIONS HAVE BEEN SUBMITTED."
- Sources checked:
  - PA WCF proxy by folio — FOUND, confirms triplex (not SFR)
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. The most recent (count #1) logged activity is an Unsafe Structures Board Hearing dated 10/13/2022 (entry date 9/7/2022) — no further activity of any kind has been logged in the 4 years since through this 10/5/2026 pull.
- Classification: **EXPIRED/STALLED**
- Reasoning: An attempt at corrective permitting was made around 2020 but the process numbers were never approved, and the case itself has gone dormant since a Board Hearing in October 2022 with no activity logged since. Not SFR (triplex) — lower lead-gen priority regardless; the four-year silence itself may also mean the case was quietly closed out administratively without the TSV export reflecting it, which is worth a quick live status re-check if Jorge wants to pursue this one anyway.

## Case 20200202592 — 13656 SW 142 AVE UNIT # 8
- Folio: 30-5922-055-0300 (3059220550300)
- SFR: **NO** — PA DORCode "4118" "LIGHT MANUFACTURING : CONDOMINIUM - COMMERCIAL", UnitCount 0 (a commercial warehouse/bay condominium unit, matching the citation's own description of a subdivided warehouse bay with a makeshift living area) — flagging for Jorge since this falls outside the SFR lead profile
- OpenDate: 1/27/2020
- Process/permit numbers found: **C2022109482** (BLDG 0001, demo illegal addition — the bay's mezzanine/bathroom/kitchen conversion), which led to **Master Permit 2022066767**, **FINALIZED 11/30/2022**.
- Sources checked:
  - PA WCF proxy by folio — FOUND, confirms commercial condominium bay (not SFR)
  - RegulationSupportWebViewer, USCase controller — 2-step session fetch. Full activity log pulled and saved. Most recent activity (8/21/2024, code 114A): "Master permit 2022066767 finalized on 11/30/2022. CASE TO BE REVIEWED FOR CLOSING STATUS." Prior entries (through 4/15/2022) confirmed the mezzanine/bathroom/sink conversion and repeated "no permits obtained" findings before the corrective permit was filed and completed.
- Classification: **HANDLED/SKIP**
- Reasoning: A corrective permit was filed after the citation specifically to address the illegal mezzanine/bathroom conversion, and it was finalized in November 2022, with the county's own most recent note (8/21/2024) flagging the case itself for closing. Deprioritize for calling; not SFR anyway (commercial condo bay).

**Method note for this batch (TRK-UNS-2020-OVERNIGHT-01):** The RegulationSupportWebViewer USCase controller is session-gated — a direct URL fetch of `USCase/ActivitiesUS` alone returns a generic "Application Error" with no data (confirmed repeatedly via the stateless WebFetch tool). The working method is a 2-step session-preserving fetch: (1) `Invoke-WebRequest` to `USCase/USCaseDetails?CaseNum=<CaseNum>` with `-SessionVariable sess` to establish the server-side session, then (2) `Invoke-WebRequest` to `USCase/ActivitiesUS` (no querystring) with `-WebSession $sess` to read the full activity table in that same session. The Property Appraiser folio lookup used in this batch is the direct JSON WCF proxy: `https://apps.miamidadepa.gov/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetPropertySearchByFolio&clientAppName=PropertySearch&folioNumber=<13-digit folio, no dashes>` (reverse-engineered from the PropertySearch Angular bundle's `LoadPropertyFromWCF` call — same underlying data as the `PA-Folio.json` files saved by earlier batches in this job, just captured via a different, scriptable entry point). The free keyless ArcGIS 2-year permit layer's exact FeatureServer URL could not be re-located this session (the open-data page for "Building Permits Issued By Miami-Dade County - 2 Previous Years to Present" no longer exposes the service URL in its rendered page/about content); it was not queried for this batch of 10, consistent with the task's own guidance that it is unreliable for 2020 citations and the case-activity log should be preferred. Raw HTML and stripped-text copies of every PA and ActivitiesUS pull for these 10 cases are saved under `RAW\CLASSIFICATION-WORKPAPERS\<CaseNum>\`.

**Disclosure: These are reference-only research notes from free public Miami-Dade County sources (Property Appraiser WCF proxy and the RegulationSupportWebViewer case activity log). Use a title company for accurate payoff/lien figures where money amounts are at issue. This is not title insurance or legal advice.**

## Case F2019006457 — 500 W PARK DR 500 (West Lake Village II Condo — sibling case to F2019006456)
- Folio: 30-4005-026-0001 (3040050260001) — this is a condominium association REFERENCE folio, same complex/HOA as case F2019006456 immediately above
- SFR: **NO** — PA proxy by folio returns `DORCode "0000"`, `DORDescription "REFERENCE FOLIO"`, `UnitCount 0`; owner of record WEST LAKE VILLAGE II CONDOMINIUM ASSOCIATION, INC.
- OpenDate: 7/22/2020 (converted to US Case from the 40/50-Yr Recertification System)
- Process/permit numbers found: identical ArcGIS permit set as F2019006456 — **21 BLDG permits, all 2025, folio-wide** (C2025003581, C2025007050, C2025007560, C2025022581, C2025029528, C2025058379, C2025058710, C2025058736, C2025058803, C2025059128, C2025059156, C2025059558, C2025060873, C2025061115, C2025061149, C2025061605, C2025061656, C2025062237, C2025062574, C2025062639, C2025062906) — the HOA-wide reroof/repair program covers every address on this shared folio, not just one building. The case's own activity log also names **C2025179318** as a process number cleared for ENFC hold release in 2025.
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, confirms REFERENCE FOLIO (condo association), not SFR
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **21 features** (same folio-wide pull as F2019006456), all issued 2/4/2025–4/2/2025, approved inspections on nearly all
  - RegulationSupportWebViewer, USCase controller (CaseNum F2019006457 → ActivitiesUS) — FOUND, and the entry text is **word-for-word identical to F2019006456's log** through the entries reviewed — the Unsafe Structures section appears to log its HOA-wide payment/ENFC-hold correspondence once and post it across every sibling case number on this folio. Most recent activity (9/16/2026, code 114A): "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026 (unable to locate any process numbers with active ENFC holds as of 9/19/2026)."
  - StructuresInfo tab — 1 structure (Structure A), "2 CBS COMMERCIAL STRUCTURE," Action "REPAIR OR DEMOLISH" — identical description to the sibling case.
  - Recordations tab — NOV recorded Book 32171/Page 2756 (10/28/2020, different page than the sibling case — each sibling case got its own NOV recording) and Board Order Book 33213/Page 2319 (05/27/2022); no lien instrument recorded.
  - MCeSearch / qPublic — not needed.
- Classification: **HANDLED/SKIP**
- Reasoning: Same HOA, same folio, same active 21-permit folio-wide reroof/repair program (2025, approved inspections), and the identical 9/16/2026 county note confirming all US cost balances paid with no outstanding ENFC holds. Deprioritize for calling, same as its sibling case F2019006456.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case F2019006456 — 490 W PARK DR 490 (West Lake Village II Condo)
- Folio: 30-4005-026-0001 (3040050260001) — this is a condominium association REFERENCE folio
- SFR: **NO** — PA proxy by folio returns `DORCode "0000"`, `DORDescription "REFERENCE FOLIO"`, `UnitCount 0`; owner of record WEST LAKE VILLAGE II CONDOMINIUM ASSOCIATION, INC. (shared condo-complex parcel, not a single-family parcel)
- OpenDate: 7/22/2020 (converted to US Case from the 40/50-Yr Recertification System)
- Process/permit numbers found (all post-citation, all 2025 vintage, found live on the free ArcGIS permit layer): **C2025003581, C2025007050, C2025007560, C2025022581, C2025029528, C2025058379, C2025058710, C2025058736, C2025058803, C2025059128, C2025059156, C2025059558, C2025060873, C2025061115, C2025061149, C2025061605, C2025061656, C2025062237, C2025062574, C2025062639, C2025062906** — 21 BLDG permits spanning virtually every building number in the complex (400s–530s), mostly RE-ROOF/REPAIR (tile/metal/flat), several FENCE and one DECK REPAIR ($10,830) and one ADDITION-DETACHED (fence), contractor COCHO INC (CGC1529784) and OMEGA ROOFING INC (CCC057472), owner of record on each permit WEST LAKE VILLAGE II CONDO/CONDO ASSOC. Separately, the case's own activity log also names **C2025179318, C2025163948, C2025163813, C2025160071** as process numbers the HOA's attorney was actively clearing ENFC holds on in 2025–2026 (not found on the 2-yr ArcGIS layer as of this pull, likely non-BLDG trade permits or already rolled off the window).
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, 6,340-byte real record; confirms this is a REFERENCE FOLIO (condo association), not an SFR parcel
  - ArcGIS keyless permit layer (rolling ~24-month window, services.arcgis.com/.../miamidade_permit_data) — queried by folio, **21 features**, all issued 2/4/2025–4/2/2025, nearly all carrying a `LastApprovedInspDate` (i.e., inspections passed, not abandoned)
  - RegulationSupportWebViewer, USCase controller (CaseNum F2019006456 → ActivitiesUS, 110 logged activities 6/24/2019–9/16/2026) — FOUND. Most recent activity (9/16/2026, code 114A) states verbatim: "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026 (unable to locate any process numbers with active ENFC holds as of 9/19/2026)." Multiple 2025–2026 entries document the HOA's attorney (Cecile S. Mendizabal, previously Roberto Fernandez) paying cost balances and clearing ENFC holds on named process numbers.
  - StructuresInfo tab — 1 structure (Structure A), "2 CBS COMMERCIAL STRUCTURE," Action "REPAIR OR DEMOLISH," Comments "Two story commercial building. Missing 40yr recertification. No reports submitted."
  - Recordations tab — NOV recorded Book 32171/Page 2750 (10/28/2020) and a Board Order recorded Book 33213/Page 2313 (05/27/2022); no lien instrument recorded on this case.
  - MCeSearch / qPublic — not needed; the live ArcGIS permits plus the case's own 2026 activity log already establish active, extensive correction.
- Classification: **HANDLED/SKIP**
- Reasoning: The HOA has an active, extensive (21-permit) corrective re-roofing/repair program across virtually the whole condo complex, all issued in 2025 with approved inspections, plus the county's own most recent note (9/16/2026) confirming all Unsafe Structures cost balances paid and no outstanding ENFC holds. The HOA is demonstrably and currently fixing violations across the property — deprioritize for calling.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200203349 — 6100 SW 49 ST
- Folio: 30-4024-007-0600 (3040240070600)
- SFR: YES — PA proxy by folio returns `DORCode "0101"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : 1 UNIT"`, `UnitCount 1`, 3bd/1ba, Unincorporated County
- OpenDate: 3/2/2020 (per TSV); case references original enforcement case #20180188896-B
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the activity log. Structure A's addition was built "with permit #1996112690" (pre-dates this case by 24 years, not corrective) and then further enclosed without a permit. Activity #27 (10/21/2022, code 51G) states verbatim: "property is occupied and energized all structures remain no permits obtained no applications on record." Activity #5 (02/08/2023, code 53L) likewise: "NO PERMIT OBTAINED YET."
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, 16,421-byte real record, SFR confirmed (0101), 3bd/1ba main house + 2006 addition, Save Our Homes homestead in place
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200203349 → ActivitiesUS, activity log reviewed 06/24/2019(ref)–09/09/2026) — FOUND. Six structures cited (A: main CBS dwelling with unpermitted rear enclosure/metal roof/door; B: attached wood-frame addition; C: pre-manufactured shed; D: chickee hut; E: 6' wood fence — no action required unless A demolished; F: metal attached terrace), ALL carrying action REPAIR OR DEMOLISH or DEMOLISH. A Panel Order was recorded 11/01/2022 (Book 33447/Page 694) covering structures A/E and B/C/D/F. Most recent activity (09/09/2026, code 300D): "REQUEST FOR FIELD STATUS CHECK BY ADMINISTRATION," follow-up date 09/12/2026 — outcome of that field check is not yet logged as of this 10/5/2026 pull.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**, consistent with the case log's own repeated "no permits obtained, no applications on record" findings.
  - Recordations tab — NOV recorded Book 32611/Page 1153 (07/09/2021); Panel Order recorded Book 33447/Page 694 (11/01/2022); no lien instrument recorded separately from these.
  - MCeSearch / qPublic — not needed; the case's own 2022–2023 field findings and the empty ArcGIS layer are already dispositive, and a 2026 field-check request is pending but unresolved.
- Classification: **OPEN/CALL**
- Reasoning: No corrective permit or legalization application of any kind has ever been filed on this six-structure Panel Order case; the county's own 2022–2023 field inspections say so directly, and the free permit layer shows zero activity. A new field-status check was just requested in September 2026 with no result logged yet — the county itself may be about to re-engage, which makes this a time-pressured lead to call now, ahead of any fresh enforcement action.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200203873 — 9855 SW 58 ST
- Folio: 30-4029-003-0040 (3040290030040)
- SFR: YES — PA proxy by folio returns `DORCode "0101"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : 1 UNIT"`, `UnitCount 1`, 4bd/3ba, 1-acre estate lot, Unincorporated County; owner Rolando Garcia & w Jacqueline (homesteaded)
- OpenDate: 4/27/2020 (per TSV); case references original enforcement case #20180191868-B ("multiple detached structures built without permits throughout property")
- Process/permit numbers found: **none**. No C- or W-prefixed process number appears anywhere in the activity log. Activity #11 (06/14/2023, code 53J) states verbatim: "No permits obtained...No permit applications submitted..."
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, 18,945-byte real record, SFR confirmed (0101), main house 3,966 sf effective + pool + 2 accessory buildings, homestead exemption in place
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200203873 → ActivitiesUS) — FOUND. **11 structures cited** on this one property (A: main dwelling, no action; B: pool, no action unless A demolished; C: garage illegally converted to living unit, REPAIR OR DEMOLISH; D: attached terrace enclosed to living area 2011, DEMOLISH; E: 500sf detached structure built 2011, DEMOLISH; F: 400sf structure on setback built 2010, DEMOLISH; G: partially-enclosed terrace built 2013 on setback, DEMOLISH; H: 1,500sf terrace enclosed 2008 to detached living structure, REPAIR OR DEMOLISH; I: 450sf structure built 2008 on setback, DEMOLISH; J: 150sf structure built 2009 near pool, DEMOLISH; K: 400sf gazebo built 2006, DEMOLISH; L: perimeter fence, permitted 1986, no action). Panel Order recorded 12/30/2022. Most recent activity (12/12/2024, code 127): a Notice to Vacate AND a Non-Compliance Notice were both posted on the property. No activity has been logged since that 12/12/2024 vacate posting through this 10/5/2026 pull — nearly two years quiet after a vacate order.
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**, consistent with the case log's own "no permits obtained" finding.
  - Recordations tab — NOV recorded Book 32606/Page 3513 (07/08/2021); Panel Order recorded Book 33527/Page 249 (12/30/2022); no lien instrument recorded separately.
  - MCeSearch / qPublic — not needed; the case's own 2023 "no permits" finding plus the empty ArcGIS layer and the 2024 vacate posting are already dispositive.
- Classification: **OPEN/CALL**
- Reasoning: Eleven separate unpermitted structures were cited on this one-acre homesteaded property and not one has ever had a corrective permit filed or applied for; the county escalated to a Notice to Vacate in December 2024 and the case has gone silent since. This is both a prime lead and a time-pressured one — a vacated, homesteaded single-family house with nearly $1.5M in assessed value and zero corrective action in over six years of citation.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20210205933 — 491 IVES DAIRY RD BLDG E (Summertree Village at the California Club Condo)
- Folio: 30-1231-021-0001 (3012310210001) — this is a condominium association REFERENCE folio
- SFR: **NO** — PA proxy by folio returns `DORCode "0000"`, `DORDescription "REFERENCE FOLIO"`, `UnitCount 0`; owner of record SUMMERTREE VILLAGE AT THE CALIFORNIA CLUB CONDOMINIUM ASSOCIATION, INC.
- OpenDate: 10/27/2020 (per TSV)
- Process/permit numbers found: **Master Permit 2021079964** (Bldg01, concrete restoration, Building E) — issued post-citation, and per the case's own activity log, concrete restoration on Building E WAS completed under it, but the permit **expired 06/08/2022 without being finaled** because a companion screen-enclosure sub-permit, **process C2022085322** (BLDG 0001/0048, SCREEN ENCLS Building E), never obtained final trade-review approval. Numerous other ENFC-hold process numbers appear in 2024–2025 correspondence (C2024147058/60/62/64/66, C2021056465, C2022107575, C2025082771, W2025136217/21/23/25/26/29) but these are lien/hold-release administrative numbers tied to OTHER buildings/units in the same HOA, not a replacement corrective permit for Building E's expired restoration.
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, confirms REFERENCE FOLIO (condo association), not SFR
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** — confirms no permit of any kind has been issued on this folio in the last two years, consistent with the case's own 4/28/2026 note that the HOA president "expressed concern about expired permits where contractors are no longer working with them."
  - RegulationSupportWebViewer, USCase controller (CaseNum 20210205933 → ActivitiesUS) — FOUND. Key entry (undated mid-log, referencing the 2021-2022 period): "Master permit 2021079964 expired on 06/08/2022. Process number C2022085322 has not obtained trade review final approval." A separate entry: "Letter with case status update provided. Building E Concrete restoration complete under Bldg01 permit 2021079964, pending screen enclosure. Application for screen enclosure permit submitted under process number C2022085322." As of 4/3/2025 (code 114A): "EFUS C2025082771 not released case is in noncompliance with the board order internal agreement required." Most recent activity (07/29/2026, code 114A): "Compliance Consent Agreement Addendum executed on 7.29.26 and expires 180 days later on January 25, 2027." The 2025–2026 entries are entirely about the HOA paying CVN/BCVS/US-cost-balance amounts to qualify for that negotiated agreement — none describe a new or renewed corrective permit for the concrete/screen-enclosure work.
  - StructuresInfo tab — 1 structure (Structure A), "4 CBS COMMERCIAL BLDG," Action "REPAIR OR DEMOLISH," Comments: "60,000-SF, 4-story CBS condominium building with structural damage on balcony slabs due to concrete spalling...Engineer Report verifying extent of the damage is required."
  - Recordations tab — NOV recorded Book 32180/Page 4750 (11/03/2020); Board Order recorded Book 32674/Page 2753 (08/11/2021); no lien instrument recorded separately from these on this specific case.
  - MCeSearch / qPublic — not needed; the case's own log already names the expired permit, the unfinished sub-permit, and the current CCA negotiation.
- Classification: **EXPIRED/STALLED**
- Reasoning: A real corrective permit (Master Permit 2021079964) was obtained and the balcony-slab concrete restoration on Building E was actually completed under it, but the permit's screen-enclosure component (C2022085322) never got final approval and the master permit itself expired in mid-2022 without being finaled — and as of April 2025 the county's own notes still describe the case as "in noncompliance with the board order." The HOA is now negotiating a Compliance Consent Agreement (paying liens/cost balances, latest addendum executed 7/29/2026, valid to 1/25/2027) rather than obtaining a new permit, and the free ArcGIS layer confirms zero permit activity on this folio in the last two years. Live lead with a specific angle: "your 2021 restoration permit for Building E lapsed before the screen enclosure was finaled — you're now just paying to keep the clock running on a compliance agreement, not actually closing out the work."

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case F2019006462 — 470 W PARK DR 470 (West Lake Village II Condo — third sibling case to F2019006456/F2019006457)
- Folio: 30-4005-026-0001 (3040050260001) — this is a condominium association REFERENCE folio, same complex/HOA as cases F2019006456 and F2019006457 above
- SFR: **NO** — PA proxy by folio returns `DORCode "0000"`, `DORDescription "REFERENCE FOLIO"`, `UnitCount 0`; owner of record WEST LAKE VILLAGE II CONDOMINIUM ASSOCIATION, INC.
- OpenDate: 7/22/2020 (converted to US Case from the 40/50-Yr Recertification System)
- Process/permit numbers found: identical ArcGIS permit set as the two sibling cases — **21 BLDG permits, all 2025, folio-wide** (C2025003581, C2025007050, C2025007560, C2025022581, C2025029528, C2025058379, C2025058710, C2025058736, C2025058803, C2025059128, C2025059156, C2025059558, C2025060873, C2025061115, C2025061149, C2025061605, C2025061656, C2025062237, C2025062574, C2025062639, C2025062906) covering every building in the complex, including a reroof specifically on "470" (permit 2025025668/C2025060873, approved inspection 9/25/2026).
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, confirms REFERENCE FOLIO (condo association), not SFR
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **21 features** (same folio-wide pull as the sibling cases)
  - RegulationSupportWebViewer, USCase controller (CaseNum F2019006462 → ActivitiesUS) — FOUND, and the log is again the identical HOA-wide boilerplate seen on the two sibling cases. Most recent activity (9/16/2026, code 114A): "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026 (unable to locate any process numbers with active ENFC holds as of 9/19/2026)."
  - Recordations tab — NOV recorded Book 32173/Page 3188 (10/29/2020) and Board Order Book 33213/Page 2300 (05/27/2022); no lien instrument recorded.
  - MCeSearch / qPublic — not needed.
- Classification: **HANDLED/SKIP**
- Reasoning: Third sibling case on the same HOA folio with the same active 21-permit folio-wide reroof/repair program (2025, approved inspections, including a reroof permit specifically covering Building 470) and the same 9/16/2026 county note confirming all US cost balances paid with no outstanding ENFC holds. Deprioritize for calling, same as F2019006456 and F2019006457.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202629 — 1800 NW 107 ST
- Folio: 30-2134-010-0300 (3021340100300)
- SFR: YES — PA proxy by folio returns `DORCode "0101"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : 1 UNIT"`, `UnitCount 1`, 2bd/1ba, 1-acre+ lot (45,600 sf), Unincorporated County; owner Cornelious Drane
- OpenDate: 1/28/2020 (per TSV); case references original enforcement case #20190194713-B
- Process/permit numbers found: **C2020075427** (applied 2/27/2020, never became a permit — "NO PERMITS HAVE BEEN OBTAINED AS OF TODAY...ONLY AN APPLICATION # C2020075427 ON RECORDS"); electrical permit **2020034610** (to disconnect power to Structure B, the cargo-container living space — received final approval 04/11/2022, then later noted "is expired. No other permits have been obtained"); BLDG permit **2022053131** went ACTIVE at some point ("some of the structures have been removed...no permit on record for plumbing or mechanical"); and the current/most recent process, **C2025097979** (BLDG 0002 - REMODELING, scope "repair STRUC-A," EFUS hold released for review 04/30/2025) — still "pending plan review" as of that same date and discussed again, unresolved, 06/09/2026 (14+ months later).
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, 18,377-byte real record, SFR confirmed (0101), non-homesteaded, 2bd/1ba main house plus several smaller additions (1950–1990 vintage)
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** — notably this does NOT show C2025097979 or any 2024-2026 permit, meaning that application has not progressed to an issued permit number even though it was opened in April 2025.
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200202629 → ActivitiesUS, activity log spanning 2/27/2020–6/9/2026) — FOUND. Key entry (04/30/2025, code 279L): "COMPLETION INSPECTION PERMIT NOT FINALED - INTERNAL AGREEMENT NON-COMPLIANCE... Permits have not been obtained...C2025097979 pending plan review..." — i.e., the county's own internal compliance agreement with this owner was already found in NON-COMPLIANCE on that date, with the newest application still stuck in plan review. Most recent activity (06/09/2026, three entries, code 114): the owner, Cornelious Drane, came into the office in person; staff explained the status of the existing case and the C2025097979 application; non-compliance status will be discussed with a specialist; and the owner was told he will need to submit information for **a new non-compliant case agreement**, meaning the prior agreement had lapsed/failed.
  - StructuresInfo tab — 4 structures: A (main dwelling, REPAIR OR DEMOLISH, structural crack on tie beam, engineer report required), B (200sf cargo container used as living space, DEMOLISH — though its electrical disconnect permit was finaled 4/11/2022), C (15-LF metal picket fence, DEMOLISH), D (chain-link fence, NO ACTION REQUIRED).
  - Recordations tab — NOV recorded Book 31878/Page 4692 (04/01/2020); Panel Order recorded Book 33238/Page 1507 (06/13/2022); no lien instrument recorded separately.
  - MCeSearch / qPublic — not needed; the case's own 2025–2026 entries already establish the current non-compliance status and pending-but-stalled application.
- Classification: **EXPIRED/STALLED**
- Reasoning: Over six years this case has cycled through an abandoned 2020 application (never became a permit), one small finaled permit (disconnecting power to the illegal cargo-container dwelling), an active building permit that saw some structures removed but never covered plumbing/mechanical, and now a 2025 remodeling application (C2025097979) that has sat in "pending plan review" for 14+ months while the county's own notes already recorded the owner's internal compliance agreement as NON-COMPLIANT (04/30/2025) and, as of June 2026, requires him to negotiate an entirely new agreement. No corrective permit has ever been finaled for Structure A's structural crack, the core safety issue. Live lead — the owner is actively engaging (walked into the office himself in June 2026) but has not closed anything out in six years, a good opening for "let's get your 2025 application unstuck."

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202794 — 15260 SW 156 AVE
- Folio: 30-5928-005-1230 (3059280051230)
- SFR: YES — PA proxy by folio returns `DORCode "0104"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : RESIDENTIAL - TOTAL VALUE"`, `UnitCount 1`
- OpenDate: 2/2/2020 (per TSV); case references original enforcement case #A2011001424-X and an EXPIRED permit #2010002809 for a house studio/addition (per TSV comments)
- Process/permit numbers found: Master Permit **2015012695** (BLDG 0002, addressed structures A and B) — "left to expired on 10/20/2015 missing inspections and subsidiary permits." Post-citation: **C2026006994** (EFUS hold NOT removed — "plans do not address all violations," per 01/28/2026 entry) and **C2026007567** (application for re-issuing permit #2015012695 addressing structures A/B only; EFUS hold released for rework 01/20/2026/01/22/2026). An Internal Agreement was executed 01/20/2026 giving the owner until **07/19/2026** to obtain all required permits and complete/final all work.
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, SFR confirmed (0104/single-family)
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features** — consistent with the case log's own finding that no permit has actually been obtained despite the January 2026 agreement and applications.
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200202794 → ActivitiesUS) — FOUND. **13 structures cited (A through M)** — structure A (main 3,762sf CBS dwelling, garage conversion) and B (attached addition) both tied to the expired 2015012695 permit; C/D/E/J/K/L/M all unpermitted additions/structures, action DEMOLISH; F (chickee hut) and G (pool) each have a prior finaled permit, no action required; H/I (fences) no action required. A Compliance Internal Agreement was signed and paid 01/20/2026, giving a hard deadline of **07/19/2026** to obtain permits, complete repairs, AND get final inspection approval. The county's own completion inspection, conducted 07/27/2026 (8 days after that deadline, code 279L "COMPLETION INSPECTION PERMIT NOT FINALED — INTERNAL AGREEMENT NON-COMPLIANCE"), states verbatim: "Completion compliance not achieved. No permit has been obtained and/or re-issued to address multiple structures in violation." The same-day written communication (114A) adds: "Same ownership as of last agreement. No permits obtained to correct violations. Non-compliance email sent." This is the most recent activity on the case as of this 10/5/2026 pull.
  - StructuresInfo tab — confirms the 13-structure breakdown above, with F and G specifically noted as already correctly permitted/no action required, isolating the real gap to structures A/B/C/D/E/J/K/L/M.
  - Recordations tab — NOV recorded Book 32410/Page 2544 (03/22/2021); Panel Order recorded Book 33359/Page 1459 (08/29/2022); no lien instrument recorded separately.
  - MCeSearch / qPublic — not needed; the case's own July 2026 non-compliance finding is current and dispositive.
- Classification: **EXPIRED/STALLED**
- Reasoning: The county gave this owner a formal, paid Internal Agreement in January 2026 with a hard six-month deadline (07/19/2026) to permit and complete work on the cited structures, and its own completion inspection just eight days after that deadline (07/27/2026) found zero permits obtained and sent a non-compliance notice — the exact definition of a corrective process started (agreement signed, applications opened under C2026006994/C2026007567) and then not completed. Nine of thirteen cited structures (A/B/C/D/E/J/K/L/M) remain unaddressed. Live, very fresh lead — the non-compliance finding is only about ten weeks old as of this pull.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202345 — 2431 NW 43 ST
- Folio: 30-3122-031-0090 (3031220310090)
- SFR: YES — PA proxy by folio returns `DORCode "0101"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : 1 UNIT"`, `UnitCount 1`
- OpenDate: 1/13/2020 (per TSV); case references a prior CU (unsafe structures) report U2014009069 recorded Book 29149/Page 1463 under case #20140167071-B, so the garage conversion/bathroom violation was already on record back in 2014
- Process/permit numbers found: **C2021018886** (BLDG categories 0002/0082, to legalize the carport/porch enclosure (Structure B) and attached terrace (Structure C)) — opened post-citation in 2021, but per the activity log: "No permit obtained...application under process number C2021018886 have been denied by several trades," with EFUS holds only "partially released...for rework" multiple times through at least 2023, and a separate permit was still required for Structure D (the hybrid fence) as of a 12/10/2020 site plan. A second, more recent process, **C2025084227** (Bldg 02, "to legalize all violations related to this case"), is also **"not released, case in noncompliance with panel order. new agreement is required."**
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, SFR confirmed (0101)
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**, consistent with the case log's own finding that no permit has ever been obtained despite two rounds of legalization applications (2021 and 2025).
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200202345 → ActivitiesUS) — FOUND. An Internal Agreement gave the owner 120 days from 5/19/2025 to obtain permits, complete work, and get final inspection approval, due **09/16/2025**. The county's own completion inspection, conducted 07/27/2026 (code 279L, "COMPLETION INSPECTION PERMIT NOT FINALED — INTERNAL AGREEMENT NON-COMPLIANCE"), states verbatim: "Completion compliance not achieved. No permit has been obtained to address violations on this case." Most recent activity (07/28/2026, code 118, telephone call): owner Sarai Gonzalez told staff "the person who was helping her with the plans/permits disappeared on her so she will seek someone else to help her," and was told a brand-new Agreement will be required.
  - StructuresInfo tab — 4 structures: A (1,143sf 3bd/1ba main residence, REPAIR OR DEMOLISH, needs building/roofing/electrical/plumbing/mechanical repairs plus exterior wall repair if additions removed), B (350sf enclosed carport/porch, DEMOLISH), C (150sf east-side addition built 2014, DEMOLISH), D (260 LF hybrid metal/wood fence, DEMOLISH).
  - Recordations tab — NOV recorded Book 32127/Page 264 (10/05/2020); Panel Order recorded Book 33336/Page 2360 (08/15/2022); no lien instrument recorded separately.
  - MCeSearch / qPublic — not needed; the case's own July 2026 non-compliance finding plus the owner's own July 28, 2026 phone call are current and dispositive.
- Classification: **EXPIRED/STALLED**
- Reasoning: Two separate legalization attempts (C2021018886 in 2021, denied by multiple trades over several rework cycles, and C2025084227 in 2025, also not released) have failed to produce a permit in over five years, and a formal Internal Agreement deadline (09/16/2025) was missed, confirmed non-compliant by the county's own 07/27/2026 inspection. The owner herself called the county the very next day (07/28/2026) to say the contractor/permit-runner helping her disappeared and she needs to start over with a new agreement. This is a fresh, very live lead — she is actively looking for new help right now.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200203849 — 13101 SW 116 ST
- Folio: 30-5911-012-0210 (3059110120210)
- SFR: YES — PA proxy by folio returns `DORCode "0101"`, `DORDescription "RESIDENTIAL - SINGLE FAMILY : 1 UNIT"`, `UnitCount 1`
- OpenDate: 4/23/2020 (per TSV); case references original enforcement case #20180190783-B; the TSV's own comments note the rear terrace was "commenced under BLDG02 permit 1994089050 (EXPIRED) and later enclosed" without a permit
- Process/permit numbers found: Original permit **1994089050** (expired 12/07/1994, missing inspections, structures A/B). Post-citation: **C2023115487** — per the 12/27/2023 completion inspection (code 53P, "COMPLETION INSPECTION BOARD/PANEL ORDER COMPLIANCE, PERMIT NOT FINALED"): "process C2023115487 not approved." Most recently, **C2026007103** (BLDG 0082, impact windows) — per the 10/16/2025 entry: "EFUS HOLDS not released on permit application under process number C2026007103...Unsafe Structures Section case existing against this property is in Non-Compliance with Panel Order taken on 06/14/2023. Owner must request to enter into an Internal Agreement with the section to obtain additional compliance time before holds are released on any permit application." No activity has been logged since that 10/16/2025 entry through this 10/5/2026 pull — just shy of a full year of silence.
- Sources checked:
  - Property Appraiser proxy (apps.miamidadepa.gov, folio) — FOUND, SFR confirmed (0101)
  - ArcGIS keyless permit layer (rolling ~24-month window) — queried by folio, **0 features**, consistent with the case log's own finding that the impact-windows application is on hold and no permit has actually issued.
  - RegulationSupportWebViewer, USCase controller (CaseNum 20200203849 → ActivitiesUS) — FOUND, confirming the above. Two Panel Orders were recorded (12/30/2022 and 06/22/2023), and the case has been in formal Non-Compliance with the Panel Order since 06/14/2023 — over three years — with every permit application attempted since (C2023115487, C2026007103) blocked by an EFUS hold pending an Internal Agreement the owner has not yet entered into.
  - StructuresInfo tab — 5 structures: A (2,617sf main dwelling, REPAIR OR DEMOLISH, tied to the expired 1994 permit), B (246sf attached terrace, COMPLETE OR DEMOLISH, same expired permit), C (200sf pre-manufactured shed, DEMOLISH), D (pool, NO ACTION REQUIRED), E (6' wood fence, NO ACTION REQUIRED).
  - Recordations tab — NOV recorded Book 32347/Page 562 (02/11/2021); two Panel Orders recorded Book 33527/Page 260 (12/30/2022) and Book 33759/Page 2901 (06/22/2023); no lien instrument recorded separately.
  - MCeSearch / qPublic — not needed; the case's own log already establishes the current EFUS-hold blockage and the near-year of subsequent silence.
- Classification: **OPEN/CALL**
- Reasoning: The property has been in formal Non-Compliance with its own Panel Order since June 2023, and the one corrective permit attempt actually examined (C2023115487) was found "not approved"; the newest attempt (C2026007103, impact windows) remains frozen on an EFUS hold because the owner has never entered into the required Internal Agreement to get more time — and nothing has moved on the case in the nearly twelve months since that October 2025 finding. No permit has ever been obtained or finaled to correct the cited structures (A/B/C). Live lead with a clear, simple ask: "you need to sign an Internal Agreement before any permit on this property — including the impact windows you already applied for — can move forward."

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202785 — 7730 SW 99 AVE
- Folio: 30-4032-006-2390
- OpenDate: 1/31/2020; citation references original case #20170182898-B (exterior door and rear addition, all trades)
- Process/permit numbers found: none post-citation. Prior folio history only: Expired-Permits cases 200109591/200109592 (1992 permits 1992073044/1992073300), code violations 20120154365 and 20170182898, and Expired-Permits cases A1998002952/A2001003754 (1995 permit 1995081105) — all predate the 1/31/2020 citation.
- Sources checked: RegulationSupportWebViewer folio case-history lookup (folio-keyed POST, free, keyless) and the USCase detail page for 20200202785 — Date Closed blank, case confirmed still open as of 2026-10-05.
- Classification: **OPEN/CALL**
- Reasoning: no corrective permit or process number of any kind has been filed against this folio in the six years since the citation. Clean lead.

## Case 20210205763 — 2050 NW 54 ST
- Folio: 30-3122-052-5600
- OpenDate: 10/15/2020; citation ties to companion case F2016001985-U ("Structure B," also still open) for an attached addition built without a permit
- Process/permit numbers found: one post-citation entry, case **B2026000266** ("Recertification Cases," opened 5/8/2026, no permit number attached, still open) — a 40/50-year recertification filing, a different program track that does not legalize the cited addition.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — case confirmed still open.
- Classification: **OPEN/CALL**
- Reasoning: the owner (Liath Inc) is engaging with the county on recertification, but that does not address the unpermitted addition this specific case cites. No corrective permit found for the addition itself. Still a live lead — pitch is addition-legalization, note the recertification activity as a separate upsell.

## Case 20200203847 — 3120 NW 97 ST
- Folio: 30-3104-003-1260
- OpenDate: 4/23/2020; citation references original case #20180190373-B (south-side addition, fence, both without permit)
- Process/permit numbers found: permit **2022041450** pulled after the citation but expired. Chased by Expired-Permits case A2023003712 (opened 8/11/2023, closed 12/24/2023), then case **20240225832** (opened 11/22/2023, still open), which states verbatim: "No proof of service on previous case A2023003712-X. Permit #2022041450 remains expired."
- Sources checked: RegulationSupportWebViewer folio history (confirms exactly these four related cases: 20180190373, 20200203847, A2023003712, 20240225832), USCase detail page (Date Closed blank), and the two Expired-Permits case-detail pages.
- Classification: **EXPIRED/STALLED**
- Reasoning: a corrective permit was attempted and expired without being finaled; the county's own enforcement chase on the expired permit is itself still open. Underlying Unsafe Structures case also still open. Legalization was started and abandoned — a warm lead to restart, not a cold OPEN/CALL.

## Case 20200202421 — 12741 SW 68 TER
- Folio: 30-4926-006-0880
- OpenDate: 1/15/2020; citation references original case #20150173660-B (rear addition, aluminum terrace, exposed wiring to shed, all without permit)
- Process/permit numbers found: none post-citation; only prior history is 20150173660, which predates the citation.
- SFR check: legal description carries "PROP INT IN & TO COMMON ELEMENTS" language, flagged for HOA/condo risk. ArcGIS parcel layer (`MD_PA_PropertySearch` layer, queried by folio) returned **CONDO_FLAG=N, PARENT_FOLIO=null** — confirmed standalone SFR parcel. The "common elements" language is a platted-subdivision easement reference, not condominium unit ownership. Not a non-SFR false positive.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page (still open); ArcGIS parcel/condo-flag layer.
- Classification: **OPEN/CALL**
- Reasoning: nothing filed on this folio since the original 2015 case; six years with no corrective action on a confirmed SFR parcel.

## Case 20200202707 — 7221 NW 2 TER
- Folio: 30-4002-009-0800
- OpenDate: 1/29/2020; citation references original case #20160179986-B (two detached buildings converted to living space, Dura fence, all without permit)
- Process/permit numbers found: none post-citation; prior history is 20160179986 and Expired-Permits case A2016000747 (2016), both predating the citation.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — case confirmed still open.
- Classification: **OPEN/CALL**
- Reasoning: no corrective action of any kind in the ten years since the folio's enforcement history began, or in the six years since this specific citation.

## Case 20200203084 — 16005 SW 107 CT
- Folio: 30-5030-002-0010
- OpenDate: 2/13/2020; citation references original case #20170184482-B (interior alterations, enclosed carport, attached enclosed structure, all trades)
- Process/permit numbers found: none correcting the citation. Post-citation activity is three NEW code violations — 20240230892, 20250238767, and **20270250953** (note: this case carries a 2027-prefixed number despite being pulled 10/2026 — an oddity in the county's own numbering, not explained, but it carries no permit either way) — none with a permit number attached. Expired-Permits case A2020000899 (permit 2019033840) predates the 2/13/2020 citation, not a response to it.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open.
- Classification: **OPEN/CALL**
- Reasoning: violations are accumulating (three new ones 2024-2027) with zero permit response at any point — a worsening situation, which makes this a stronger lead, not a weaker one.

## Case 20200202348 — 12481 SW 191 ST
- Folio: 30-6901-001-2020
- OpenDate: 1/13/2020; citation references original case #20140167604-B (rear metal terrace roof, two rear living-space additions, all trades)
- Process/permit numbers found: permit **2021011124** pulled after the citation but expired. Chased by Expired-Permits case A2022002072 (opened 3/11/2022, closed 4/17/2026), then case **20260245561** (opened 1/22/2026, closed 9/4/2026), verbatim: "No proof of service on previous case A2022002072-X. Permit 2021011124 remains expired."
- Sources checked: RegulationSupportWebViewer folio history, USCase detail page for 20200202348 (Date Closed blank — still open despite both expired-permit chase cases now being closed), and the two Expired-Permits case-detail pages.
- Classification: **EXPIRED/STALLED**
- Reasoning: both enforcement chase cases on the expired permit closed within the last several months, but the underlying Unsafe Structures case itself has not been closed — legalization is unfinished. Closest to resolution of this batch; worth a direct follow-up call to check current status before pitching from scratch.

## Case F2019005641 — 9700 NW 7 AVE
- Folio: 30-3102-013-0720
- OpenDate: 1/6/2020; comments note "1/7/20: 40-YR PHYSICAL FILES RECEIVED FROM FINANCE SECTION, Converted to US Case from 40/50-Yr Recertification System" — this is a recertification case, not a standard addition-without-permit case.
- Process/permit numbers found: permit **2021034991** tied to Expired-Permits case **A2022002289** (opened 4/11/2022, Date Closed blank, still open). Separate code case 20240228061 on the same folio closed 1/22/2026 but carried no permit number.
- Sources checked: RegulationSupportWebViewer folio history (also shows a second, older Unsafe Structures case F1999101533 under a prior owner, with no closure shown — confirms long structural history on this address) and USCase/Expired-Permits detail pages.
- Classification: **EXPIRED/STALLED**
- Reasoning: the recertification-track corrective permit is itself sitting in unresolved expired-permit status four years on. Flag for Jorge: the sales pitch here is 40/50-year recertification compliance, not illegal-addition legalization — a different conversation with the owner (MAS Miami Capital Group LLC).

## Case 20200202638 — 11821 SW 180 ST
- Folio: 30-5936-003-0293
- OpenDate: 1/28/2020; comments cite "EXPIRED PERMIT # 2006036086 (BLDG 0002 bedroom, family room and terrace)"
- Process/permit numbers found: permit 2006036086 is the ORIGINAL permit tied to the structure, expired years before the citation — not a post-citation corrective attempt. Other folio history (2005031825, A2008003550, A2010001436) all predates the 1/28/2020 citation. Nothing filed after it.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open.
- Classification: **OPEN/CALL**
- Reasoning: no corrective action has been taken since the citation; the only permit on file is the original, decades-expired one that caused the violation in the first place.

## Case 20200203848 — 11592 SW 125 CT
- Folio: 30-5912-012-0400
- OpenDate: 4/23/2020; citation references original case #20180190684-B (attached rear roof structure, detached structure/patio in FPL easement, both without permit)
- Process/permit numbers found: none post-citation; prior history is 20110147043 (2011) and 20180190684 (2018, the referral source), both predating the citation.
- SFR check: legal description carries "PROP INT IN & TO COMMON ELEMENTS" language. ArcGIS parcel layer confirmed **CONDO_FLAG=N, PARENT_FOLIO=null** — standalone SFR parcel, not a condo/HOA sub-unit. Not a non-SFR false positive.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer.
- Classification: **OPEN/CALL**
- Reasoning: nothing filed on this folio since the 2018 referral case; six years with no corrective action on a confirmed SFR parcel.

**New source for the method library: Miami-Dade "Regulation Cases" web viewer (`https://www.miamidade.gov/Apps/RER/RegulationSupportWebViewer/`) takes a plain POST with a 13-digit folio — no login, no captcha — and returns the complete case lineage on that folio (every code-enforcement, expired-permit, and unsafe-structures case, each with its permit number when one exists) plus a per-case detail page with current Open Date/Date Closed. More reliable for this job than the main permit lookup (reCAPTCHA Enterprise-walled) and more complete than the ArcGIS Open Data permit layers (rolling 2-3 year window only, would miss 2020-era activity). Caveat: the direct permit-by-folio database itself remains captcha-walled, so a currently-active corrective permit with no enforcement history attached cannot be 100% ruled out by this method — OPEN/CALL calls above rest on the negative evidence of zero permit references anywhere in the folio's full case history, not a direct permit-database query.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200203054 — 18525 SW 117 AVE
- Folio: 30-6006-002-0210
- OpenDate: 2/13/2020; citation references original case #20170184273-B (attached open roof structure front/rear, enclosed structures north and northwest sides, all trades)
- Process/permit numbers found: none against the Unsafe Structures case itself. Folio also carries 20240230437 and A2024000481 (both Expired Permits, permit 2023025386, closed 05/28/2024 and 06/24/2024) — verbatim "Case opened due to CVN improperly issued under case A2024000481-X," a clerical correction unrelated to the structural violation. A new case 20260250302 (All Other Code Violations) opened 09/02/2026, still open.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page (verified directly: Date Closed and Permit Number both blank, Inspector Jose Broche) — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: no corrective permit has ever been filed against this violation; county reopened enforcement at this address as recently as September 2026, confirming it's a live, current target.

## Case 20200202948 — 14025 JACKSON ST
- Folio: 30-5019-001-7580
- OpenDate: 2/9/2020; citation references original case #20170183069-B (work without permits — 4 bathroom additions, interior wall dividing house into efficiencies)
- Process/permit numbers found: none. Folio also carries 20240227638 (All Other Code Violations, opened 2/8/2024, still open) — verbatim "Joint inspection with ONC for Richmond heights project. Work without permit..." — a second, independent reopening of the same unpermitted-efficiency issue.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: no permit filed in six years; county independently reopened the same violation in 2024, also still unresolved.

## Case 20200202169 — 5532 NW 72 AVE
- Folio: 30-3023-039-0560 (unit); PA ArcGIS confirmed **CONDO_FLAG=Y, PARENT_FOLIO=3030230390001**, TRUE_SITE_ADDR "5532 NW 72 AVE 5532" — independently re-queried and matched exactly.
- OpenDate: 1/2/2020; citation references original case #20120151199-B (interior alterations, first and second floor, electrical and mechanical, without permit)
- Process/permit numbers found: none against this case. Legal description: "MIAMI AIR-WEST TRADE CENTER CONDO" — an industrial/commercial condo unit.
- Sources checked: RegulationSupportWebViewer USCase detail page — still open; ArcGIS parcel/condo-flag layer (independently re-verified, live query).
- Classification: **OPEN/CALL** — condo unit, not SFR. Pitch goes to unit owner (NAEEM UDDIN &W), not the association; the parent folio 3030230390001 is the association's master record.
- Reasoning: no corrective permit filed; owner is an individual, not the association, so this is a standard unit-owner legalization lead despite the condo structure.

## Case 20200202678 — 15505 HAYES LN
- Folio: 30-7904-004-0400
- OpenDate: 1/29/2020; citation references original case #20160178555-B (timber shed in setback, aluminum covered patio, exterior washer/dryer/water heater connections, failure to maintain roofing/plumbing/electrical)
- Process/permit numbers found: none. Folio case history is only 20150174737, 20160178555, 20180191786, 20200202678 — no post-2020 reopen.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: clean single-family case, owner-occupant (Marco Roberto Lemus Mendoza), no permit activity ever — straightforward shed/patio legalization plus roofing/plumbing/electrical repair pitch.

## Case 20200203761 — 12721 SW 47 ST
- Folio: 30-4923-001-0840
- OpenDate: 4/2/2020; citation references original case #20180189672-B (detached structures and interior renovations without permits)
- Process/permit numbers found: none. Folio history is only 20180189672 and 20200203761 — no permit activity at all.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR/commercial parcel).
- Classification: **OPEN/CALL**
- Reasoning: commercial owner (Linda Linen Inc), simple two-case lineage, zero permit activity since 2020 — a business decision-maker is typically an easier cold-call than a residential owner.

## Case 20200203102 — 7430 NW 2 TER
- Folio: 30-4002-009-3040
- OpenDate: 2/15/2020; citation references original case #20170184537-B (addition at SE corner with new roof, kitchen added at legal NW addition, vertical knee-wall extension, exterior door/light fixture, exterior plumbing/electrical; "connectivity between the legal NW addition and the main residence is blocked")
- Process/permit numbers found: none. Older folio history (1997-99, 2013, 2019) predates the citation; nothing filed after it.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: the "connectivity...is blocked" language points to an illegal accessory unit/mother-in-law suite — a classic legalization-business pitch; no corrective permit ever filed.

## Case 20200203924 — 895 NW 116 TER
- Folio: 30-2135-013-0630
- OpenDate: 5/4/2020; citation references original case #20180189890-B (additions to main house; existing detached garage converted to living space with addition)
- Process/permit numbers found: none. Folio history (2008, 2011, 2012, 2018) predates the citation; nothing filed after it.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: garage-to-living-space conversion is a textbook legalization job; corporate owner (Empire Legacy Management Corp) is skip-traceable via Sunbiz; zero permit activity in six years.

## Case 20210205936 — 601 IVES DAIRY RD BLDG H, and Case 20210205942 — 461 IVES DAIRY RD BLDG B (combined — same association, same folio)
- Folio (both): 30-1231-021-0001 — Summertree Village at the California Club Condominium Association, Inc.
- OpenDate: 10/27/2020 (Bldg H) and 10/28/2020 (Bldg B); both Date Closed and Permit Number blank (confirmed directly in raw case-detail HTML for both).
- Violation (Bldg H): "BUILDING HAS STRUCTURAL DAMAGE DUE TO SPALLED CONCRETE ON BALCONY SLABS AND BEAMS..." Violation (Bldg B): same, plus "...IN ADDITION, SIGNS OF CONCRETE REPAIR WITHOUT A PERMIT..."
- Process/permit numbers found: none on either case. Sibling buildings on the same folio checked and found in the same unresolved state — 451 Ives Dairy Bldg A (20210205924), 481 Bldg D (20210205930), 491 Bldg E (20210205933), 511 Bldg F (20210205934), 605 Bldg G (20210205937), 471 Bldg C (20210210517) — all open, no permit. One duplicate entry (20210205928, Bldg B) closed same-day it opened, a clerical merge, not a real resolution.
- Condo structure: PA ArcGIS independently re-queried and confirmed folio 3012310210001 itself returns CONDO_FLAG=N, PARENT_FOLIO=null, TRUE_SITE_ADDR=null — it is itself the parent/master folio. A query for PARENT_FOLIO=3012310210001 returns individual unit folios (e.g. 3012310210010/020/030/040/050, all CONDO_FLAG=Y, all addressed "451 Ives Dairy Rd [unit]-1") — confirms this is a multi-building condo complex of at least 7 buildings, all carrying unresolved structural (spalled concrete, balcony/beam) damage cases open since October 2020, zero corrective permits filed on any building checked.
- Sources checked: RegulationSupportWebViewer folio history (153 total cases on this folio) and USCase detail pages for both target cases plus 6 sibling buildings; ArcGIS parcel/condo-flag layer, both the parent folio and a sample of child units (independently re-verified, live query).
- Classification: **OPEN/CALL — HOA/condo association lead, not an individual-owner lead.**
- Reasoning: this is a structural (not cosmetic) issue across essentially the entire complex, six years unresolved, decision-maker is the condo board, not a unit owner. Likely SIRS/40-year-recertification-adjacent. The sales approach differs from the rest of this batch — contact the board, and a structural-engineer referral may be the more relevant first service rather than CU's usual legalization/due-diligence package. Flagged to Jorge as a different lead type.

## Case 20200202312 — 3619 NW 102 ST
- Folio: 30-3104-005-0330
- OpenDate: 1/10/2020; citation references original case #20120155490-B (rear attached addition, storage shed, gazebo built without permits)
- Process/permit numbers found: none against this case. Folio also carries A2026000786 (Expired Permits, opened 12/11/2025, closed 03/26/2026, permit 2025027124) and 20260246785 (opened 03/23/2026, still open, same permit — verbatim "Case created due to previous case having no POS, see case A2026000786-X. 8-11(A) violation: Permit 2025027124 remains expired.") — this permit/case pair is a different, unrelated violation (different permit number, different code section) and does not resolve the 2020 shed/gazebo case.
- Sources checked: RegulationSupportWebViewer folio history and USCase detail page — still open; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: the original shed/gazebo/addition case has zero permit activity against it. Owner is currently active with the county on a separate, unrelated expired-permit matter (still open as of 3/23/2026) — a useful conversation opener ("I see you have an open matter with the county right now") but must not be conflated with the Unsafe Structures case when pitching.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case F2019006395 — 940-942 NE 199 ST 1
- Folio: 30-2206-029-0001 — Lake Park Condominium I, Inc. (40-year recertification / Unsafe Structures case)
- OpenDate: 2/10/2020; Date Closed and Permit Number both blank (confirmed directly in raw case detail).
- Structure: "67,432-SF, 4-STORY, COMMERCIAL BUILDING MISSING IT'S 40-YEAR RECERTIFICATION — 40-YEAR RECERTIFICATION REPORT HAS NOT BEEN SUBMITTED — EXPIRED PERMITS NOT FOUND."
- Recent activity (08/20/2026, verified in raw ActivitiesUS): "Spoke with Ivonne Anderson, unit owner... she may proceed with a partial release of lien request."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, violations tabs; ArcGIS parcel/condo-flag layer returned CONDO_FLAG=N, PARENT_FOLIO=null (flag doesn't catch this one — confirmed as a condo association by legal description and violator name "Lake Park Condominium I, Inc" instead).
- Classification: **OPEN/CALL** — condo/HOA association lead.
- Reasoning: 40-year recertification never submitted, no expired permits on record, still formally open six years in; pitch goes to the HOA board/management company, with individual unit owners (per the lien-release inquiry) as a secondary audience.

## Case 20200202892 — 10450 SW 146 ST
- Folio: 30-5020-019-0020
- OpenDate: 2/5/2020; Date Closed and Permit Number both blank.
- Structure: 2,088 sq ft CBS single-family dwelling, attached additions on west and south — one started with a permit that expired (referred from original case A2006005739-X), the other built without any permit at all.
- Recent activity (07/18/2025): a contractor inquired; owner was told to contact Unsafe Structures + Lien Section.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: no permit attached to this case itself; the referenced expired permit belongs to an older, separate prior case. Recent contractor interest (2025) is a warm signal.

## Case 20200202600 — 35301 SW 213 AVE
- Folio: 30-7828-000-1680
- OpenDate: 1/27/2020; Date Closed and Permit Number (on the US case itself) both blank.
- Verbatim activity (01/06/2023, confirmed in raw ActivitiesUS.txt): "Demolition permit # 2021074108 (BLDG 015) was obtained on 08/20/2021 and left to expired on 02/16/2022 with no inspections on record. Scope of work of this applications does not identified the structures to be removed. No other permit has been obtained or applied for. NCL to be posted."
- Sibling Expired-Permits cases on the same permit 2021074108: 20230224231 (closed 08/19/2024), 20230224232 (closed 03/06/2024), A2022002975 (closed 12/24/2023), and **20240228388 — confirmed still OPEN (Date Closed blank in raw HTML)**. Recordations: NOV Book 32316/Pg 747 (01/27/2021), Panel Order Book 33167/Pg 2676 (05/03/2022).
- Sources checked: RegulationSupportWebViewer case detail, activities, recordations tabs; 4 sibling NP case-detail pages; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **EXPIRED/STALLED**
- Reasoning: textbook "finish what you started" — demo permit pulled, expired with zero inspections, and county enforcement is still actively open as recently as 2024.

## Case 20200202666 — 2129 NW 44 ST
- Folio: 30-3122-016-0340
- OpenDate: 1/29/2020; Date Closed and Permit Number both blank. Violator: Davide Bromley Trs / "The 2129 NW 44 ST Land Trust."
- Activity (01/19/2023): "Case is in Non-Compliance with Panel Order set on 04/13/2022. No permit has been obtained or applied for to address violations on the case."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null (SFR).
- Classification: **OPEN/CALL**
- Reasoning: no permit ever filed, formal Panel Order non-compliance on record.

## Case 20200202949 — 3399 NW SOUTH RIVER DR
- Folio: 30-3128-009-0011 — Port Jones Acquisition LLC
- OpenDate: 2/9/2020; Date Closed and Permit Number (on the US case itself) both blank (confirmed in raw CaseDetails.html).
- Structure: 35,603 sq ft warehouse terminal; "subjected to an alteration to remove an egress stair, enclosed a mezzanine floor... all work was performed without permit." Board Order recorded 01/07/2022 (Book 32947/Pg 2506). Extensive folio history (11 related cases back to 2004, incl. 3 prior Unsafe Structures F-cases and recert case B2024013958).
- Verbatim most-recent activity (10/02/2026, confirmed in raw ActivitiesUS.txt — three days before this pull): "EFUS hold on C2026174473 (BLDG 0001 - INTERIOR LEGALIZE) released for review..."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — hottest lead in this batch.**
- Reasoning: owner is mid-process on an active interior-legalization permit application this week; a due-diligence/permit-closeout engagement is directly and immediately relevant.

## Case 20200202896 — 14440 LINCOLN BLVD
- Folio: 30-5019-001-6330 — Bethel Baptist Church of Richmond Heights
- OpenDate: 2/5/2020; Date Closed and Permit Number both blank. Folio history back to 1995 (16 cases).
- Structure: 21,079 sq ft CBS/concrete commercial building; "started with Master Permit # 1993158249 that was left to expire missing required inspections and subsidiary permits as referred from original case # T1995009459-T."
- A separate, fresh Recertification case B2026000769 opened 06/28/2026, also still open.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: 1993 master permit never finaled, 30+ years unresolved; church is simultaneously in a brand-new 2026 recertification cycle — a double-service pitch (close out the old permit, assist with the new recert).

## Case F2019006461 — 430 W PARK DR 430
- Folio: 30-4005-026-0001 — West Lake Village II Condominium Association, Inc.
- OpenDate: 7/22/2020; Date Closed blank, Permit Number blank — formally still open. Massive 34-case folio history (15 related Unsafe Structures F-cases, plus expired-permit and recertification cases — one activity note states "14 recertification cases and 1 standard Unsafe Structures case in the West Lake II Condo Association").
- Structure: two-story commercial building, missing 40-yr recertification, no reports submitted.
- Recent activity is materially different from the rest of this batch: 12/14/2025 — "Received update from association attorney stating that repairs are complete and the final engineer inspection is scheduled for the week of 01/12/2026"; activity through 08/06/2026–09/16/2026 shows the HOA's attorney actively paying cost balances and clearing EFUS holds on sibling cases, most recently "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer returned CONDO_FLAG=N (flag misses it — confirmed condo/HOA by name/legal description).
- Classification: **OPEN/CALL — weak lead, lower call priority.**
- Reasoning: the case record carries no Date Closed so it does not qualify as HANDLED/SKIP, but the HOA already has active legal and engineering representation and the matter appears to be self-resolving. Flagged explicitly: this is an association-board decision, not an individual owner's, and is less urgent than the other cases in this batch.

## Case 20200202315 — 21132 NE 5 PL
- Folio: 30-1231-027-0490 — Leonardo A Peralta
- OpenDate: 1/10/2020; Date Closed and Permit Number both blank.
- Structure: 4-unit CBS townhouse building; Struc-B (1,525 SF) "with a rear addition built without a permit... repairs required if Struc-C is demolished." Non-compliance letter mailed 10/26/2022.
- A second US case on the same folio, 20210207385 (opened 2/3/2021), closed 3/18/2021 — confirmed a different, already-resolved matter, not this violation.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; sibling case detail page; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no permit ever filed against the open violation; the closed sibling case does not resolve it.

## Case 20200202786 — 16200 SW 232 ST
- Folio: 30-6920-000-0131 — Julio Berrones Jr. (17 related cases back to 1997)
- OpenDate: 1/31/2020; Date Closed and Permit Number (on the US case itself) both blank.
- Structures: Struc-A, 1,613 SF main house, "significant deterioration... as referred from original case # 20170182945-B." Verbatim (confirmed in raw ActivitiesUS.txt): "...taking in consideration that this is a historic designation... BOTH... BUILT IN 1926. THOSE TWO BUILDINGS ARE HISTORICAL. THEREFORE, THEY MAY NOT BE ALLOWED TO BE DEMOLISHED." Case was deferred at a panel hearing specifically so the owner could meet with the Historical Preservation Office.
- Activity: "Efus hold on c2021085480 (BLDG 0002 - BUILDING REPAIR) not released... Scope of work does not address the violations of the case... PROCESS NO. C2021085480 address the legalization of structure B; but no permit issued" — and later, "the master permit application C2021085480 must include all the violations of the case." Sibling NP case 20220213704 (permit 2020030257) is still open; its earlier twin 20210208257 (same permit) closed 1/20/2022.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; sibling NP case pages; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a legalization application (C2021085480) was started and never completed or issued, plus a separate expired permit (2020030257) is still being chased. Historic-building designation adds real complexity — Historic Preservation Office sign-off needed — flag explicitly to Jorge/client before quoting.

## Case 20200203081 — 3162 NW 47 ST
- Folio: 30-3121-017-0150 — Nelson Martel Sosa (contractor of record: G M Stone Ware Inc)
- OpenDate: 2/13/2020; Date Closed and Permit Number (on the US case itself) both blank.
- Structure: 1,600 SF 4BR/3BA two-story CBS home — two-car garage converted into living space, plus an attached addition at the southeast corner.
- Verbatim activity (confirmed in raw ActivitiesUS.txt): "I met with contractor, Felix Cespedes for the expired permit 2022041710. I explained that there is a non compliance Unsafe Structures case 20200203081-U, which will hold up the procedure to re-issue and close the permit. I provided Mr. Cespedes with a print out with information for non-compliance agreement request." Separately: "Efus hold on C2023089727 (NEW ISSUE TO PERMIT #2022041710) not released." Sibling NP case 20230219749 (permit 2022041710) is still open; related NP case A2023001322 (same permit) closed 1/23/2023.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; sibling NP case pages; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: contractor already engaged and actively trying to reinstate the expired permit, blocked only by this open case — near-ready-to-close pending the non-compliance agreement paperwork.

**Method note:** this batch confirmed the ArcGIS CONDO_FLAG layer misses condo/HOA association ownership when the flag itself reads N (cases F2019006395 and F2019006461 are both confirmed condo associations by legal description and violator name despite CONDO_FLAG=N) — the flag only reliably identifies individual condo *units*, not association-held common/recreational folios. Treat the flag as a floor, not a ceiling, for HOA detection; always cross-check the violator/owner name for "condominium," "association," or "HOA" language.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202719 — 12501 SW 264 ST
- Folio: 30-6926-004-0860 — Capital Holdings of Florida LLC
- OpenDate: 1/30/2020; Date Closed blank — still open.
- Activity (05/23/2025, verbatim): "EFUS 20200202719-U not released to reissue expired permit 1993223477 case is in noncompliance internal agreement is required." Activity (04/29/2025): "permit # 1993223477 obtained on 05/26/1993... is expired since 01/31/1995 with no approved inspections on record. In order to resolve violation identified as structure B this permit must be re-issued and finalized." Fresh NOV certified-mail cycle 11/12/2025.
- Sibling NP case 20080117950 (shed in setback) also still open, Date Closed blank.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; sibling NP case; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: a 1993 permit has sat expired 30 years with zero inspections; county correspondence as recently as November 2025 confirms it's a live, current matter.

## Case 20200202793 — 14386 SW 164 TER
- Folio: 30-5927-027-0640 — Brenda Viera
- OpenDate: 2/2/2020; Date Closed and Permit Number both blank (confirmed directly in raw CaseDetails.html).
- Verbatim activity (07/28/2026, confirmed in raw Activities.html): "Met with Mrs. Greta Quintana, she is in the process of buying this property... The case is in non-compliance; a non-compliance agreement is required." Activity (07/01/2026): "EFUS holds not released on permit application under process number C2026124976(BLDG 0002) with scope of work to legalize garage conversion and gazebo identified as structure B. Unsafe case is in Non-compliance with Panel Order taken on 08/25/2022."
- Sibling NP/Expired Permits case A2010004158 (permit 2008045546) also still open; related 06/23/2026 activity confirms "there is an unsafe structures case with a balance that needs to be paid and an expired permit case that is in collections."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; sibling NP case; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — time-sensitive.**
- Reasoning: the property is mid-sale right now (a title company/buyer is actively involved per the July 2026 meeting note) and a legalization application is already filed but blocked on EFUS holds — this is a live transaction that needs resolution, not a cold case.

## Case 20200202360 — 3334 NW 51 TER
- Folio: 30-3121-034-1210 — Estate of Melvina Dennison (Probate Division #94-1122 per legal description)
- OpenDate: 1/13/2020; Date Closed blank — still open.
- Activity (04/16/2026): "Structure is occupied and energized, no permit or application has been issued. 1 Shed remains not being used as a living space. 1 shed was demolished all other violations remain." Structures: A (1,153 sf dwelling + attached terrace) repair-or-demolish; B/C/D (terrace, two prefab sheds) demolish-only, all built without permit.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no permit activity ever started; probate/estate ownership is a distinct lead angle (heirs may want to sell or settle the estate and need the violations cleared first).

## Case 20200202463 — 3237 NW 34 ST
- Folio: 30-3128-013-1100 — Noelio & Jennie Sosa
- OpenDate: 1/17/2020; Date Closed blank — still open.
- Activity (04/16/2026): "structure is occupied and energized. no permit or application on record. all violations remain. referral sent to ONC for junk trash and abandoned vehicles." Activity (03/05/2025) notes email correspondence from CAO re: "HSBC Bank USA, National Association v. Sosa, Noelio; et al (25-000613 CA 01)... Suggestion of Bankruptcy."
- Structures: A (1,300 sf, one of two detached residential units) repair-or-demolish; B/C/D (rear enclosed addition, side terrace, shed) demolish, all built without permit.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — title complication flagged.**
- Reasoning: no permit ever filed, but there is active foreclosure/bankruptcy litigation on title (HSBC v. Sosa). Still a legitimate lead, but disclose the title fight to Jorge/client before outreach — ownership/authority to contract may be unsettled.

## Case 20200202939 — 2775 NW 60 ST
- Folio: 30-3116-009-7510 — 3000 NW 62 Street Inc (commercial — property converted to commercial use)
- OpenDate: 2/8/2020; Date Closed blank — still open.
- Activity (06/12/2026): "EFUS C2026058579 released for permit." Activity (06/10/2026): "Confirmed 6/10/2026 payment made with ICD for lien re: CVN P035701... OK to release ENFC holds for 3000 NW 62 ST INC through 9/11/2026, as needed to bring cases into compliance." Earlier: "EFUS 20200202939 not released to legalize structure B case is in noncompliance."
- Sibling case F2017003473 (same address/folio, also Unsafe Structures) is CLOSED 01/09/2018 — unrelated, already-resolved matter, not a lead.
- Structures: A = 1,368 sf former residence converted to commercial, two unpermitted aluminum-roofed terraces added; B = two prefab metal terraces; C = 620 LF wrought-iron/solid-metal perimeter fence, all without permit.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; closed sibling case; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: active legalization push is in progress but blocked by multiple liens spread across several related code cases — a complex, multi-case lien-clearance engagement, not a simple one-permit fix.

## Case 20200203370 — 197 SW 77 AVE
- Folio: 30-4002-008-0025 — Yordalys Cruz
- OpenDate: 3/2/2020; Date Closed blank — still open.
- Activity (08/18/2026): owner has been completing payments on four related code cases and requesting an invoice for a partial payment on another. Verbatim (confirmed in raw Activities.html): "already submitted permit application C2026035655 to cure the violations... EFUS HOLDS PARTIALLY RELEASED FOR REWORK on C2026035655 (BLDG 0002) PARTIAL DEMOLITION addressing demolition of rear addition and front unpermitted doors... Application... remains under trades review" and a separate entry: "Completion compliance not achieved. No permit has been obtained." Context notes a 6-year title fight (Case No. 2019-015345-CA-01) recently resolved in the owner's favor, giving her full access/control for the first time.
- Sibling NP/Expired Permits case A2010003004 (permit 2009050851) is closed 01/25/2012 — not relevant to current activity.
- Sources checked: RegulationSupportWebViewer case detail, activities tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: permit application already submitted and partially approved but stuck in trades review — owner just regained full control of the property after a long title dispute and is actively paying down liens. Strong "help push the stuck permit through" pitch.

## Case 20200203038 — 3050 SW 76 AVE
- Folio: 30-4014-009-4860 — Superior Gates LLC (Omar Sanchez per Sunbiz/activity notes)
- OpenDate: 2/12/2020; Date Closed blank — still open.
- Verbatim activity (09/28/2026, confirmed in raw Activities.html — one week before this research pull): "Omar Sanchez has been placed on the Unsafe Structures MEETQ for assistance with EFUS hold under the Process no. C2026167034... ENFC hold not released." Same date: "Unsafe Structures Case is in non compliance, which has outstanding fines. Citations are paid... EFUS hold has been released for Partially. ENFC hold not released due to the outstanding fines." Also: "3 open cases 20170183754-B CVN's Paid, 20200203038-U with an outstanding balance, and 201506001912 with ICD."
- Structures: A = 960 sf dwelling with rear additions; B–F = incomplete CBS addition, two sheds, another addition, and gated entry motors, all built without permit.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — hottest lead in this batch.**
- Reasoning: owner was actively working the county office one week before this research, trying to clear holds under a specific process number. Citations are paid; only outstanding fines and the hold remain — a near-immediate close is plausible with the right help.

## Case 20200202891 — 7900 NW 175 ST
- Folio: 30-2010-003-0370 — Raymond A Pina
- OpenDate: 2/8/2020; Date Closed blank (formally open) but **stale — last activity entry dated 12/21/2022–12/24/2022, confirmed no entry after that in the full activities table (nearly 4 years of silence)**.
- Structure: Struc-A, 1,175 sf 1-story CBS dwelling with a rear addition built under expired permit #1995019507 under case #A2006002808X; "repairs required if Struc-B is demolished." Activity (12/21/2022, confirmed verbatim): "bldg 02 permit 1995019507 expired."
- Permit 1995019507 carries a 30-year enforcement history across 7 sibling Expired-Permits (NP) cases, independently checked: 2005033888 (closed 07/13/2005), A1996000086 (different permit 1996019358, closed 05/03/2005 — not this permit), **A2006002808 (confirmed still open, Date Closed blank in raw HTML)**, A2022003913 (closed 12/15/2022), 20230219024 (closed 07/30/2024), **20240228133 (confirmed still open, Date Closed blank in raw HTML)**, A2024001541 (closed 04/09/2024).
- Sources checked: RegulationSupportWebViewer case detail, activities, structures tabs; all 7 sibling NP case-detail pages individually pulled and Date Closed field confirmed on each; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a 1995 addition permit never finaled, repeatedly reopened by the county as recently as 2024, with two sibling cases still genuinely open — but the parent Unsafe Structures case itself has gone cold since December 2022. Needs reactivation outreach rather than a routine "still active" call — lead with "the county still has an open file on your expired 1995 permit."

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202661 — 1942 NW 86 ST
- Folio: 30-3110-035-0721
- OpenDate: 1/29/2020; Date Closed blank — still open. Citation references original case #20160177565-B (rear detached structure in setbacks, A/C system installation).
- Activity (12/17/2021): "Disapproved EFUS hold for process number C2022039459, A/C Change Out. A master permit addressing legalization of the attached addition must be obtained before subsidiary applications are approved." Activity (05/21/2025): owner called requesting information on violations and debts/liens on the property, was instructed to obtain permits to legalize changes.
- Sources checked: RegulationSupportWebViewer case detail, activities, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a legalization attempt was disapproved and the required master permit was never obtained; the owner reached out as recently as 2025 asking how to resolve it — a live, motivated contact, not a cold trail.

## Case 20200202361 — 2745 NW 28 ST
- Folio: 30-3128-011-0800
- OpenDate: 1/13/2020; Date Closed blank — still open. Citation references original case #20140168428-B (additional bathroom, kitchen, front porch, utility room, A/C airhandler/condensing unit, all without permit).
- Activity (01/03/2023): "No permits obtained or applied for to address violations. Case remains in Non-Compliance with Panel Order set on 05/12/2022."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: a legalization permit was never even attempted — a clean cold-call lead.

## Case 20200202673 — 11510 SW 185 TER
- Folio: 30-6006-001-0860
- OpenDate: 1/29/2020; Date Closed blank — still open. Citation references original case #20160178505-B (southwest corner of house enclosed, formerly a patio/terrace).
- Field status check (04/30/2026, confirmed in raw activities): "Dwelling is observed occupied, power is connected... Remaining structures in violation were observed. No permit has been obtained to address them, application under process number C2020020493 addressing rear enclosure expired on 03/09/2025. Case is in non-compliance with Panel Order taken on 06/09/2022." Owner met with the Unsafe Structures supervisor 03/03/2025.
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: legalization permit C2020020493 expired in March 2025, and the county physically re-verified the property's occupied status just one week before this research pull — about as current and well-documented as this job gets.

## Case 20200203896 — 3295 NW 98 ST
- Folio: 30-3104-002-0300
- OpenDate: 4/30/2020; Date Closed blank — still open. Citation references original case #20190198361-X (addition built without permit).
- Verbatim activity (09/28/2026, confirmed in raw file): "Met with Jorge Martinez and explained the violations and how to come into compliance... He understood." Activity (07/13/2026): "Same ownership as of last agreement. Master permit # 2014045125 expired on 01/13/2025. Property in non-compliance." Permit 2014045125 confirmed re-issued 07/17/2024 then expired again 01/13/2025. Sibling NP case 20250239698 (opened 06/27/2025) confirms permit 2014045125, "Failure to obtain required inspection."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; sibling NP case detail; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED — hottest lead in this batch.**
- Reasoning: the owner's representative met in person with the county one week before this pull, actively working toward a non-compliance agreement, and the master legalization permit is expired — about as warm a contact as this job surfaces.

## Case 20200203053 — 6535 SW 39 ST
- Folio: 30-4013-019-2760
- OpenDate: 2/13/2020; Date Closed blank — still open. Citation references original case #20170184205-B (rear attached addition, bedroom with full bathroom, wood terrace with electrical).
- An internal compliance agreement was executed 04/21/2026 (invoice Q2026055606, compliance time until 01/17/2026) then modified 07/08/2026 (compliance time extended to 01/16/2027). Activity (05/07/2026): "EFUS holds released for permit on C2024103790 (BLDG 0002 - LEG ADDITION/TERR) with scope of work to repair STRUC-A and legalize B/C."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — lower urgency than the other cases in this batch.**
- Reasoning: the owner already has an active, EFUS-cleared legalization permit in motion with a compliance deadline not until January 2027 — still technically an open case and a valid lead, but far less distressed than the stalled cases above.

## Case F2019006460 — 450 W PARK DR 450
- Folio: 30-4005-026-0001 — West Lake Village II Condominium Association, Inc. (same folio/HOA as sibling case F2019006461, already classified in an earlier batch as a weak OPEN/CALL lead)
- OpenDate: 7/22/2020; Date Closed confirmed blank in raw HTML (independently re-verified, not inherited from the sibling case) — still formally open. Comments: "7/22/2020 40-YR PHYSICAL FILES RECEIVED FROM FINANCE SECTION (SC). Converted to US Case from 40/50-Yr Recertification System."
- Own activity log checked independently: 09/16/2026 — "Confirmed payment of all US cost balances owed. OK to release ENFC holds on subject folio/HOA through 12/16/2026 (unable to locate any process numbers with active ENFC holds as of 9/19/2026)." 12/14/2025 — "Received update from association attorney stating that repairs are complete and the final engineer inspection is scheduled for the week of 01/12/2026." Same attorney (Cecile S. Mendizabal) handling the whole HOA portfolio across multiple case numbers at once.
- Sources checked: RegulationSupportWebViewer case detail and activities tab (own record, independent of F2019006461); ArcGIS parcel/condo-flag layer returned CONDO_FLAG=N (flag misses this association folio, as expected — confirmed condo/HOA status via owner field "West Lake Village II Condominium Association, Inc.").
- Classification: **OPEN/CALL — weak, low priority.** (The research subagent proposed HANDLED/SKIP here, but the case's own Date Closed field is confirmed blank — the same standard applied to its sibling F2019006461 keeps this in OPEN/CALL rather than treating a self-resolving-but-still-open case as a closed one.)
- Reasoning: HOA attorney reports repairs complete and is actively clearing cost balances/holds through year-end — this is the same self-resolving pattern as F2019006461. Contact the condo board only after higher-priority leads in this list are worked.

## Case 20200203044 — 7285 NW 36 AVE
- Folio: 30-3109-001-0230 — 7285 NW 36 Avenue LLC (commercial/industrial)
- OpenDate: 2/12/2020; Date Closed blank — still open. Violation: addition connecting warehouses at 7285 and 7215 NW 36 Ave, openings in exterior walls.
- Last activity 07/26/2023: "Efus hold on C2023141343 (BLDG 0092 - ROOF WORK FLAT) not released... THIS CASE IS IN NON-COMPLIANCE WITH THE BOARD ORDER... OWNER MUST SUBMIT A REQUEST TO ENTER INTO AN INTERNAL AGREEMENT." Dormant since (3+ years with no further activity logged).
- Related open sibling case found on the same folio: F2023013030 (Unsafe Structures, opened 08/01/2024, "New case created from Recertification Case," also open, same LLC owner).
- Sources checked: RegulationSupportWebViewer case detail and activities tab; sibling F2023013030 case detail; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: quiet since mid-2023 but never closed, roof-work EFUS hold never released, and the same owner now carries a second, newer open Unsafe Structures case on the same property — a multi-matter commercial lead.

## Case F2019006396 — 950-952 NE 199 ST 2
- Folio: 30-2206-029-0001 — Lake Park Condominium I, Inc. (same folio/HOA as sibling case F2019006395, already classified as OPEN/CALL in an earlier batch; a third building, F2019006397, also exists on this folio and remains PENDING as of this batch)
- OpenDate: 2/10/2020; Date Closed confirmed blank in raw HTML (independently re-verified) — still open. Project field: "Mayor Recertification Audit."
- Own activity log checked independently (not inherited from the sibling case): 08/07/2026 — two separate calls, "Ms. Brenda called inquiring about the nature of the violation and the status... along with a verbal on the outstanding enforcement costs. She understood," and "Ms. Yvonne called inquiring about the nature of the violation and the status... She understood." 01/21/2026 — "Carolina called regarding properties as potential buyer and wanted to know status of cases. Explained cases, violation, corrective actions and timeframe for processes." A Board Order was recorded 05/28/2022 (Book 33213/Page 2331, $40 recording fee). No permit on this case.
- Sources checked: RegulationSupportWebViewer case detail and activities tab (own record, independent of F2019006395); ArcGIS parcel/condo-flag layer returned CONDO_FLAG=N, TRUE_SITE_ADDR null (master/common-area folio — confirmed condo status via owner field "Lake Park Condominium I, Inc.").
- Classification: **OPEN/CALL**
- Reasoning: this building's own case is independently confirmed distinct in status from its sibling — fresh 2026 calls from unit owners about unpaid enforcement costs, plus a prospective buyer asking about case status within the last year, a recorded lien, and still no permit. A fresh, strong lead in its own right, not a duplicate of the sibling case.

## Case 20200202428 — 3045 NW 66 ST
- Folio: 30-3116-004-0410 — owner Gratiam RE LLC / violator Altimus LLC (investor-owned)
- OpenDate: 1/16/2020; Date Closed blank — still open. Violation: shed, attached addition, interior alterations, windows in disrepair, electrical/plumbing violations, referenced from original case #20150174752-B.
- Activity (01/03/2023): "Case remains in Non-Compliance with Panel Order set on 05/12/2022. No permit has been obtained or applied for to address violations under this case. NCL to be posted."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no permit ever filed, active Panel Order non-compliance, investor-LLC ownership (two entities involved — owner and violator differ) — a clean cold lead.

## Case F2019005815 — 5181 NW 27 AVE 14
- Folio: 30-3122-000-0130 — Fiftieth St Heightst LLC (multifamily/apartment complex, unit 14 of a large multi-case folio)
- OpenDate: 8/14/2020; Date Closed blank — still open. Comments: "Converted to US Case from 40/50-Yr Recertification System."
- Activity (07/06/2026): "Mr. Robert called requesting the EFUS to be released. The hold is ok to release, due to an executed agreement good until 11/1/26." Activity (05/05/2026): "Invoice Number(s) generated: FOR 20160179356-U, 20190197017-U, F2019005814 and F2019005815. This Agreement provides compliance time until 11/01/2026, to obtain the required permits, complete all the work/repairs and obtain final inspection approval on all building permits... a revised engineer's or architect's building re-certification report shall be submitted within this same time period."
- Sources checked: RegulationSupportWebViewer case detail and activities tab; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — time-sensitive.**
- Reasoning: the owner's representative is actively engaged with the county as recently as July 2026, but is on a hard compliance deadline of 11/01/2026 to obtain permits and submit a revised recertification report. If that deadline lapses, this case converts to a stalled/expired matter. Reach out before the deadline — a related case F2019005814 on the same agreement is also still PENDING in this tracking file.

**Method note:** case 6 (F2019006460) is the second instance this job has found where a research pass proposed closing out a case as HANDLED/SKIP based on an attorney's progress report, while the case's own Date Closed field remains genuinely blank. Standing rule applied: a case only moves to HANDLED/SKIP when its own record shows an actual close date — "repairs reported complete" or "holds being cleared" is evidence of a self-resolving OPEN/CALL-weak lead, not a closed one, until the county's own system reflects it.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**

## Case 20200202422 — 10576 SW 170 TER
- Folio: 30-5032-013-1330
- Date Closed and Permit Number both blank. 5 structures (A–E) cited. Panel Order recorded Bk 33104/Pg 1063 (4/4/2022); NOV recorded Bk 32334/Pg 3881 (2/4/2021). Pre-existing permit #2010011783 expired since 12/20/2011, never addressed.
- Activity (11/14/2024): "Property remains occupied with electrical connection. All structures remain on property. No applications or permits for violations at this time." Most recent activity (1/30/2025) is an unrelated Ford Motor Credit lien-release inquiry, not case progress.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no corrective permit was ever obtained against the cited violations.

## Case 20200202572 — 8550 SW 27 LN
- Folio: 30-4015-017-0880
- Date Closed and Permit Number both blank. Panel Order Bk 33215/Pg 3916 (5/31/2022); non-compliance since 10/3/2022.
- Verbatim activity (09/22/2026): "EFUS holds not released for permit application C2026166810 (Bldg. 92 Re-Roof). Case is in non-compliance with the panel order since 10/3/2022." No permit exists for the actual cited violation (garage/porch enclosures, structures A/B/C) — the only recent activity is an unrelated re-roof application blocked by the hold.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: fresh 2026 contact — the owner is actively trying to build something else right now and is stuck on this exact case.

## Case F2019006397 — 920-922 NE 199 ST 3
- Folio: 30-2206-029-0001 — Lake Park Condominium I, Inc., Building #3 of the complex (siblings F2019006395 and F2019006396 already classified OPEN/CALL in earlier batches)
- Date Closed and Permit Number both blank — confirmed independently from this case's own record, not assumed from its siblings. ArcGIS: CONDO_FLAG=N, PARENT_FOLIO=null, TRUE_SITE_ADDR=null (flag misses this association-held folio; confirmed condo status via owner name "Lake Park Condominium I, Inc."). Board Orders recorded 8/11/2021 (Bk 32674/Pg 2706) and 5/27/2022 (Bk 33213/Pg 2325); NOV 4/1/2020 (Bk 31878/Pg 4596). Needs an engineer's report addressing structural/electrical integrity; "expired permits not found."
- Fresh activity confirmed from this building's own log: 8/7/2026 — "Ms. Brenda called inquiring about the nature of the violation and the status... along with a verbal on the outstanding enforcement costs," same day "Ms. Yvonne called inquiring..."; 1/21/2026 — "Carolina called regarding properties as potential buyer and wanted to know status of cases."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs (own record, independent of siblings); ArcGIS parcel/condo-flag layer.
- Classification: **OPEN/CALL**
- Reasoning: matches the pattern of its two sibling buildings — fresh 2026 unit-owner/buyer calls, no permit, recorded liens — confirmed independently, not assumed.

## Case 20200202515 — 1324 NW 81 TER
- Folio: 30-3111-011-0020 — Owner Tunis Wilcox
- Date Closed and Permit Number both blank. Panel Order Bk 33510/Pg 854 (12/19/2022). No permit obtained for cited structures B/C (additions).
- Verbatim activity (11/24/2025): "Confirmed there are 8 open cases as of 11/24/2025 (...) There are several cases currently in compliance but pending lien mitigation, along with unpaid citations and court costs... she declined to discuss any amounts due, stating that the cases were opened in error." EFUS holds on process numbers C2026013688, C2026012151, W2026003309 unreleased for unrelated fees. Most recent activity (4/13/2026) is an email reply to an attorney (Mr. Pregen) representing the owner.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: active and contested — owner now has an attorney involved, and there's fresh 2026 correspondence, but no permit was ever obtained for the cited structures. Flag the 8-case portfolio and the owner's "opened in error" position to Jorge before outreach — this is a more complex, possibly adversarial lead than most in this job.

## Case 20200202664 — 29911 SW 147 AVE
- Folio: 30-7910-001-0170
- Date Closed and Permit Number both blank. Panel Order Bk 33238/Pg 1492 (6/13/2022). Permit #2017011543 (intended to legalize structures B, C, E) expired 11/18/2017 with no inspections.
- Verbatim activity (05/04/2026): "Property seems to be occupied with electrical service. Access was not granted during inspection. Case remains in Non-Compliance with Panel Order since on 06/09/2022. Permit #2017011543 remains expired since 11/18/2017."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a legalization permit was attempted and expired in 2017, never renewed, confirmed still expired by a county field check this year.

## Case 20200202890 — 10825 SW 152 TER
- Folio: 30-5030-008-0320 — Owner Earl Nottage & W Sondra C
- Date Closed and Permit Number both blank (confirmed directly in raw case detail). TWO Panel Orders on record: Bk 33376/Pg 4473 (9/12/2022) and a second Bk 34909/Pg 4700 (8/22/2025) — the case lapsed and went back through the hearing process a second time. Master Permit #1998060047 (structures A/B) expired after re-issue 2/15/2004.
- Verbatim activity (11/25/2025, confirmed in raw activities): "Master Permit # 1998060047 remains expired since 02/15/2004." Verbatim activity (confirmed): "1998060047 remains expired and permit 2021020415 for reroof finalized. No Application for any new permits at this time." Activity (02/20/2026): "EFUS hold C2026065074 not released due to illegal structure B needs to be legalized under expired permit 1998060047... property owner will need to enter into an internal agreement" — owner trying to pull a shutter-installation permit, blocked by this case.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: the original permit has sat expired over 20 years; fresh 2026 contact shows the owner is actively trying to do unrelated work and is stuck on this exact unresolved legalization — a strong "finish what you started" lead.

## Case 20200202694 — 15545 SW 302 TER
- Folio: 30-7909-032-0510
- Date Closed and Permit Number both blank. Panel Order Bk 33238/Pg 1433 (6/13/2022). 10 structures cited (A–J).
- Verbatim activity (07/07/2026): "Ownership the same as of last agreement. No permits obtained to correct the violations. Property in non-compliance." Same date: "Spoke with property owner's representative Leticia on case and agreement status. Rep. explained that owner still seeking to comply and will need a new agreement." 04/30/2026 field check: structure B partially self-demolished (posts remain), D/E/F remain.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no permit ever obtained across 10 cited structures; fresh 2026 contact via the owner's own representative actively seeking a new compliance agreement — a live, cooperative lead.

## Case 20200202944 — 7045 NW 28 AVE
- Folio: 30-3116-014-0350
- Date Closed and Permit Number both blank. Panel Order Bk 33465/Pg 3886 (11/15/2022). Master permit #2021036926 (process C2020168234) expired 9/18/2021 without required inspections/subpermits.
- A renewal process C2023019887 was reviewed and approved 8/15/2023, but verbatim: "the permit holder was not taking further action to pull the permit." Case escalated to a Vacate Letter posted 11/18/2024 (tracking N44477). No activity logged since — roughly 2 years quiet.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: an approved permit renewal was never actually pulled by the holder, and the case has since escalated to a vacate letter and gone quiet — needs reactivation outreach rather than a routine call; lead with the fact the county already approved a path forward that was never taken.

## Case 20200202454 — 6300 SW 26 ST
- Folio: 30-4013-006-0950
- Date Closed and Permit Number both blank. TWO Panel Orders: Bk 33192/Pg 4777 (5/18/2022) and Bk 33510/Pg 829 (12/19/2022). Master permit #2022083281 (structures A/B/C) expired 8/10/2024.
- Confirmed via a failed Internal Agreement completion inspection (12/2/2024, verbatim): "Completion compliance not met. Master Permit # 2022083281 expired on 08/10/2024." Verbatim activity (07/06/2026): "Replied sent to property owner's construction manager on case status and requirements for a new agreement" — same ownership as the last agreement, actively re-engaging.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a legalization permit was obtained then expired under a failed internal agreement; the owner's own construction manager reopened the conversation with the county as recently as July 2026 — a good, currently-warm call lead.

## Case 20200202530 — 14965 SW 305 TER
- Folio: 30-7909-025-0110
- Date Closed and Permit Number both blank. Panel Order Bk 33167/Pg 2683 (5/3/2022). Structure B (750 sf rear addition) self-demolished by the owner in June 2025, verbatim: "Structure B has been demolished by owner. There was no electrical or plumbing so no permit was needed." Structure C (concrete/metal fence) under process C2019110452, which expired 1/31/2021, confirmed repeatedly through 2022–2023 ("Application under process number C2019110452 addressing structures B and C remains expired since 01/31/2021"), then reactivated 6/26/2025 by the owner's representative Tania Medina.
- Most recent activity (07/08/2025): "Efus released on process C2025132706" — no permit confirmed issued for the fence as of that entry.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: the fence-legalization process opened in 2019, expired in 2021, and was reactivated in 2025 but still has no issued permit as of the latest entry — close to a finished lead, needs the final push.

## Case F2019005814 — 5181 NW 27 AVE 13
- Folio: 30-3122-000-0130 — Fiftieth St Heightst LLC (same folio/agreement as sibling case F2019005815, already classified OPEN/CALL time-sensitive)
- Date Closed and Permit Number both blank. ArcGIS: CONDO_FLAG=N, PARENT_FOLIO=null — commercial LLC-owned 2-story building needing a 40/10-year engineering report. Panel Order recorded Bk 34580/Pg 945 (1/16/2025); NOV Bk 32166/Pg 4459 (10/26/2020).
- **Independently confirmed from this case's own record** that the Internal Agreement (executed 5/5/2026) actually spans FOUR case numbers on one deadline, not the two originally assumed from the sibling case's note — verbatim: "Invoice Number(s) generated: FOR 20160179356-U, 20190197017-U, F2019005814 and F2019005815. This Agreement provides compliance time until 11/01/2026, to obtain the required permits, complete all the work/repairs and obtain final inspection approval on all building permits." Most recent activity (7/6/2026): "Mr. Robert called requesting the EFUS to be released. The hold is ok to release, due to an executed agreement good until 11/1/26."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs (own record, independent of F2019005815); ArcGIS parcel/condo-flag layer.
- Classification: **OPEN/CALL — time-sensitive.**
- Reasoning: hard deadline 11/01/2026 confirmed from the case's own activity log; this agreement is broader than previously documented — worth a sweep across the rest of the job for any other agreement silently covering more case numbers than its own file shows (see method note below).

## Case 20210206540 — 1127 NW 106 ST
- Folio: 30-2135-020-0170
- Date Closed and Permit Number both blank. TWO Panel Orders: Bk 33539/Pg 3798 (1/12/2023) and Bk 33800/Pg 2523 (7/19/2023). Entire dwelling (structure A, 1,200 sf) built without any permit — action code "DEMOLISH" if not legalized.
- Internal Agreement executed 5/20/2026, verbatim: "This Agreement provides compliance time until 11/16/2026, to obtain the required permits, complete all the work/repairs and obtain final inspection approval on all building permits." Very active current engagement with property manager Denise Prudente through 9/16/2026 clearing EFUS/ENFC holds on multiple process numbers.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL — time-sensitive.**
- Reasoning: hard deadline 11/16/2026, whole-house legalization needed, currently very active with a property manager — a strong, urgent lead.

## Case 20200202940 — 10001 SW 43 ST
- Folio: 30-4020-004-1810
- Date Closed and Permit Number both blank. Panel Order Bk 33486/Pg 4300 (12/2/2022). No permit ever obtained for structures B/C/D/E.
- Verbatim activity (6/17/2025): "Property owner Rosa Ginart is registered on the Chat Queue for permit requirements."
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **OPEN/CALL**
- Reasoning: no corrective permit was ever obtained, and the owner herself registered with the county's permit-requirements queue as recently as June 2025 — an already-motivated contact.

## Case 20210206489 — 12651 NW 22 CT
- Folio: 30-2127-012-0180
- Date Closed and Permit Number both blank. Panel Order Bk 33539/Pg 3748 (1/12/2023). A roof-repair permit (2023061279, Bldg02-82) was issued then REVOKED by the Building Official — confirmed verbatim in the raw activities file (4/30/2025): "has been revoked by the Building Official. Compliance will require a new permit." New owner Cristoba Garcia was actively engaged through 3/10/2025 (requested to speak with a supervisor, registered on the county queue). No activity logged since — roughly 17 months quiet.
- Sources checked: RegulationSupportWebViewer case detail, activities, structures, recordations tabs; ArcGIS parcel/condo-flag layer confirmed CONDO_FLAG=N, PARENT_FOLIO=null.
- Classification: **EXPIRED/STALLED**
- Reasoning: a permit was actually pulled then revoked by the county — a distinct pitch from the usual "permit expired" pattern ("the county pulled your permit, you need a fresh one"). A new owner was actively trying to resolve this before the case went quiet — a good re-engagement target.

---

## YEAR 2020 COMPLETE — 160 of 160 cases classified, 0 PENDING

**Patterns worth flagging to Jorge across the full 2020 year, before moving to 2021:**
1. **Permit revocation is a distinct, underused sub-pattern** (case 20210206489 this batch, plus others earlier in the year) — a county-revoked permit is a different pitch than an expired one: "the county pulled your permit, you need a fresh one," not "finish what you started."
2. **EFUS/ENFC hold calls on an unrelated permit are the single best freshness signal across this whole dataset.** Repeatedly, the most recent activity on an otherwise years-old case is an owner, representative, property manager, or attorney calling in 2025–2026 about a hold blocking an unrelated permit (re-roof, shutters, a new addition). These are warm leads — the owner is already trying to build something right now and is stuck on exactly this unresolved case.
3. **Multi-case compliance agreements can silently cover more case numbers than any single case file shows.** Case F2019005814 confirmed its own agreement actually spans 4 case numbers on one deadline, not the 2 assumed from its sibling's note alone — any follow-up sweep should re-check agreement scope from each case's own record rather than inheriting from a sibling.
4. **A second, later Panel Order on the same case** (seen twice in this final batch, cases 20200202890 and 20210206540) signals the case fully lapsed and was re-heard — these tend to carry fresher activity and a real compliance deadline, making them better near-term leads than a single stale 2022 order.
5. **Condo/HOA-held folios keep defeating the ArcGIS CONDO_FLAG automation across the whole year** (Lake Park Condominium I, West Lake Village II, Summertree Village) — the flag reads N and TRUE_SITE_ADDR is often null for the master/common-area folio. The violator/owner name field is the only reliable tell; any future automated sweep of this dataset needs to check owner-name text for "condominium"/"association"/"HOA," not the flag alone.

**Disclosure: These numbers are reference only. Use a title company for accurate payoff figures. This is not title insurance or legal advice.**
