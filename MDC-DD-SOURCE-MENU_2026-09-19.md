# Miami-Dade / Florida DD Source Menu — pick what to add to the standard workflow

This is a **menu, not a plan.** Each line is one data source. You read it, you circle the ones you want, and those get added to the standard Alec-DD site sweep. Nothing here is scraped or acted on yet.

For each source you get five things: **the name, the one-line DD value it adds, how you get in (public / login / paid), whether it is already one of our 17 sweep sources, and a confidence flag** (High = known official source, Medium = likely, Low = unsure — verify before relying on it).

We already sweep 17 sources. This menu marks each source **COVERED** (already one of the 17), **PARTIAL** (a piece of it is in the 17 but there is more to pull), or **NEW** (not yet on our list).

---

## Section A — Property Appraiser (the spine of every DD)

**1. MDC Property Appraiser — main property record.** Every core field on the property: folio number, owner of record, legal description, year built, adjusted/living/lot square footage, building features, exemptions, assessed vs. market value. This is the anchor every other source hangs off. · Public, no login. · **COVERED (source #1).** · Confidence: High. — apps.miamidadepa.gov

**2. PA sales history.** Prior sale dates, prices, deed book/page, and qualification codes — tells you the ownership chain and whether past sales were arm's-length. · Public. · **PARTIAL** (it is a tab inside #1, but pull it deliberately, not just the summary). · Confidence: High.

**3. PA Comparable Sales application.** A separate app that returns nearby qualified sales for value context on the subject. Distinct tool from the main record. · Public. · **NEW.** · Confidence: High. — apps.miamidadepa.gov/ComparableSales/index.html

**4. TRIM notice / Property Tax Estimator / Tax Comparison.** The proposed-tax notice plus estimator tools — shows the tax picture a buyer inherits and flags a value in dispute. · Public. · **PARTIAL** (tax roll is source #11; the TRIM notice itself and the estimators are extra). · Confidence: High. — miamidadepa.gov online services.

---

## Section B — Permits and construction

**5. City of Miami open building-permit layer (2014+).** Permit history for City of Miami parcels — open permits, finaled permits, permit type. Open/expired permits are a classic DD red flag. · Public. · **COVERED (source #2).** · Confidence: High.

**6. County EPS / ePlan permit history.** County (unincorporated + participating cities) permit records. · Login + reCAPTCHA. · **COVERED (source #13).** · Confidence: High.

**7. City iBuild code-compliance / permit portal.** City of Miami permitting and code portal. · Login-gated. · **COVERED (source #14).** · Confidence: High.

**8. County ArcGIS permit layer.** Map-based permit points. Note: our registry flags this as 404 / folder deleted — verify it still exists before promising it. · Public (if live). · **COVERED (source #15), but verify URL.** · Confidence: Low.

**9. Microfilm / building (tax) jacket.** The scanned historical building file — original permits, plans, certificates of occupancy going back decades. Highest-value construction-history source we have; jackets arrive by email from mdcpa.net. · Request-based / email. · **COVERED (source #16).** · Confidence: High.

**10. DBPR contractor / trade licenses.** Confirms the contractor on a permit was licensed — ties permit records to a real, insured builder. · Public. · **COVERED (source #4).** · Confidence: High. — myfloridalicense.com

---

## Section C — Septic vs. sewer and water

**11. WASD Water or Sewer Letter of Availability (LOA).** Official statement of whether county water and sewer are available to the parcel — the single cleanest way to answer "is this on sewer or on septic, and can it connect?" · Public request (may require a form/fee for a formal letter). · **NEW.** · Confidence: High. — miamidade.gov/water/letter-of-availability.asp

**12. DERM OSTDS / septic registration and permits.** County record of the onsite sewage (septic) system: registration (required since 2023), permits, and standards. Tells you if a septic system exists, is registered, and its condition history. · Public search. · **PARTIAL** (DERM environmental search is source #7; the OSTDS-specific records are worth pulling on their own). · Confidence: High. — miamidade.gov/global/economy/building/ostds.page

**13. Florida DOH Miami-Dade — septic tanks and wells (Environmental Health).** State health-department records for onsite sewage and private wells — the "former HRS" environmental-health file. Complements DERM; sometimes has older well/septic data DERM does not. · Public. · **NEW.** · Confidence: High. — miamidade.floridahealth.gov (Environmental Public Health)

**14. Open Data Hub — DOH Septic System layer.** A downloadable GIS point layer of septic systems countywide — good for confirming septic vs. sewer at map scale across a batch of parcels. · Public, free download. · **NEW.** · Confidence: High. — opendata.miamidade.gov/datasets/doh-septic-system

---

## Section D — Environmental and hazards

**15. DERM environmental records search.** County environmental file on the parcel: contamination, storage tanks, liens, complaints — over two million records. · Public search. · **COVERED (source #7).** · Confidence: High.

**16. DERM / County ArcGIS environmental map (Emaps).** Map view of environmental features and DERM sites around the parcel. · Public. · **COVERED (source #8).** · Confidence: High.

**17. Florida DEP Contamination Locator Map (CLM).** State map of sites under DEP cleanup oversight near an address — name, facility ID, cleanup status. Catches state-tracked contamination the county file may not surface. · Public. · **NEW.** · Confidence: High. — mapdirect-fdep.opendata.arcgis.com (Contamination Locator Map)

**18. Florida DEP OCULUS.** DEP's public document system — 2M+ storage-tank, hazardous-waste, solid-waste and cleanup documents. This is where you read the actual reports behind a flagged site. · Public. · **NEW.** · Confidence: High. — floridadep.gov (search "OCULUS"); verify exact URL.

**19. Florida DEP storage-tank / petroleum (UST/LUST) data.** Registered underground/aboveground tanks and leaking-tank cleanup status by facility — the classic gas-station / dry-cleaner contamination check. · Public, downloadable by county. · **NEW.** · Confidence: High. — floridadep.gov/waste/petroleum-restoration

**20. Florida DEP Brownfields.** Designated brownfield areas and sites — flags parcels with a known contamination/redevelopment history and possible cleanup obligations. · Public. · **NEW.** · Confidence: Medium. — floridadep.gov (search "brownfields"); verify URL.

**21. USFWS National Wetlands Inventory (NWI).** Federal wetlands mapper — flags wetland presence that can block or restrict development. · Public. · **NEW.** · Confidence: High. — fws.gov/wetlands (Wetlands Mapper).

**22. Florida DOH radon zone data.** County/zone radon-risk designation for Florida — a low-cost hazard note for a residential DD. · Public. · **NEW.** · Confidence: Medium. — floridahealth.gov (radon program); verify URL.

**23. Lead-paint / pre-1978 flag (year-built proxy).** Not a database — a rule: any structure built before 1978 carries a federal lead-paint disclosure obligation. Driven off the PA "year built" field (source #1). · Derived. · **NEW (as a workflow flag).** · Confidence: High.

---

## Section E — Health department (state)

**24. Florida DOH Miami-Dade Environmental Public Health — public records.** Beyond septic/wells: the county health office holds environmental-health records (onsite sewage, wells, and related). Single point to request the state-side health file on a parcel. · Public / records request. · **NEW.** (See #13 — same office; listed here so the Health category is not empty.) · Confidence: High.

---

## Section F — Code enforcement, unsafe structures, liens

**25. Regulation Support Web Viewer — code-enforcement cases.** Open and closed code-enforcement cases on the parcel. · Public. · **COVERED (source #5).** · Confidence: High.

**26. Bulk code-violation layer.** Countywide code-violation dataset — useful for batch checks. · Public. · **COVERED (source #6).** · Confidence: Medium.

**27. Unsafe Structures Unit records.** Records specific to the county's Unsafe Structures program (40-year recertification, demolition orders). A separate track from ordinary code cases and a serious DD flag. · Public / request. · **NEW.** · Confidence: Medium; verify access point.

**28. Clerk recorded liens and satisfactions.** Recorded liens (code, municipal, judgment) and their satisfactions in Official Records — the money owed against the property. · Login / Cloudflare-gated in our environment. · **COVERED (source #12).** · Confidence: High.

---

## Section G — Zoning and land use

**29. Zoning district / land-use record.** The parcel's zoning district and future-land-use designation — governs what can be built, setbacks, and coverage. · Public. · **COVERED (source #9).** · Confidence: High.

**30. CDMP future land use + variance / rezoning history.** The Comprehensive Development Master Plan land-use layer plus any variances, special exceptions, or rezonings on the parcel — tells you what the property is *entitled* to become, not just what it is. · Public. · **NEW (beyond the base zoning lookup).** · Confidence: Medium; verify URL.

---

## Section H — GIS / mapping (and why the filters matter)

The value of a GIS viewer in DD is **layering**: one address, and you toggle flood, zoning, aerial, elevation, and evacuation on the same map. Each filter answers a different DD question at a glance, and you screenshot the stack as evidence.

**31. Miami-Dade GIS / Open Data self-service portal.** The county's mapping hub. Useful filters: **folio search** (find the parcel), **zoning overlay** (what it is zoned), **flood zone** (insurance/risk), **aerials** (current footprint vs. permitted), **elevation** (flood exposure), **evacuation zone** (hurricane exposure), **comparable sales** (value). · Public. · **NEW as a named tool** (pieces of it overlap sources #8–#10). · Confidence: High. — gis-mdc.opendata.arcgis.com / opendata.miamidade.gov

**32. Historical aerial photography (UF / FDOT / county archive).** Aerials going back decades — shows when a structure or addition appeared, which cross-checks permit history and catches unpermitted work. · Public. · **NEW.** · Confidence: Medium; verify exact archive URL (University of Florida LABINS / geoplan).

**33. Sea-level-rise / storm-surge / evacuation-zone viewer.** Coastal-risk layers for the parcel — a real value-add for South Florida coastal DD. · Public. · **NEW.** · Confidence: Medium; verify URL.

---

## Section I — Flood, elevation, coastal

**34. County flood-zone layer.** The parcel's FEMA flood zone as served in the county GIS. · Public. · **COVERED (source #10).** · Confidence: High.

**35. FEMA Flood Map Service Center (MSC).** The authoritative FIRM — pull the official firmette and check for LOMAs (Letters of Map Amendment) that remove a parcel from the flood zone. Deeper and more official than the county layer. · Public. · **NEW.** · Confidence: High. — msc.fema.gov

**36. Elevation Certificates (FDEM / Florida Disaster).** Search whether a recorded elevation certificate exists for the property — drives flood-insurance cost and confirms finished-floor elevation. · Public. · **NEW.** · Confidence: Medium; verify search path. — floridadisaster.org/elevation-certificates

---

## Section J — Litigation, foreclosure, probate

**37. Clerk civil / family / probate online case search.** Lawsuits touching the parcel or owner: mortgage foreclosures, code liens litigated, quiet-title, probate of a deceased owner. Advanced search is free; official-records image copies cost ~$1/search unit. · Public search, paid images. · **COVERED (source #17), but the probate/foreclosure angle is worth pulling explicitly.** · Confidence: High. — www2.miamidadeclerk.gov/ocs

**38. Sunbiz corporate registry.** If the owner is an LLC/corp: registered agent, officers, and status — pierces "who really owns this" and whether the entity is active. · Public. · **COVERED (source #3).** · Confidence: High. — search.sunbiz.org

**39. Tax Collector — delinquent taxes, tax certificates and tax deeds.** Unpaid taxes, sold tax certificates, and pending tax-deed sales — a lien and a foreclosure risk that the tax *roll* alone does not show. · Public. · **NEW / PARTIAL** (tax roll is source #11; delinquency and tax-deed status are the new part). · Confidence: Medium; verify URL (miamidade.county-taxes.com).

---

## Top recommendations — highest-value NEW sources to add first

Ranked. If you only add a few, add them in this order:

1. **WASD Letter of Availability (#11)** — the definitive sewer-vs-septic answer. High DD value, low effort, public.
2. **FEMA Flood Map Service Center + Elevation Certificates (#35, #36)** — official flood risk and insurance drivers; the county layer alone under-answers this in South Florida.
3. **Florida DEP Contamination Locator Map + OCULUS + storage tanks (#17, #18, #19)** — state-side contamination the county file misses; critical near old gas stations and dry cleaners.
4. **PA Comparable Sales app + Tax Collector delinquency/tax-deed (#3, #39)** — value context and hidden tax-lien/foreclosure risk.
5. **Historical aerials + CDMP land-use/variance history (#32, #30)** — catch unpermitted structures and confirm entitlements.

**Count: 20 NEW sources, 14 already covered by the 17, and 5 partial** (a piece is in the 17 but there is more to pull). 39 sources total in the menu.

Before we wire any of these in, do you want me to start with the top-5 NEW sources above, or do you want to circle your own picks first?

`TRK-2026-9047 · 2026-09-19 · #mdc-dd-source-menu`
