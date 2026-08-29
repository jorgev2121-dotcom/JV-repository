# Sources — PA Sketch & Record-Card Legend

**Research date:** 2026-08-29. **Executor:** Cloud.
**Environment constraint (critical):** `WebFetch` was **egress-blocked for every
external domain** tried (Miami-Dade PA, miamidade.gov, leepa.org, hcpao.org,
gis.hcpafl.org, floridarevenue.com, pcpao.gov, concordma.gov, mesacounty.us,
even en.wikipedia.org and web.archive.org). Bash `curl` to the proxy status
endpoint was also blocked by the command classifier. **Therefore no source page
was read verbatim.** All content came from `WebSearch` result snippets, which
summarize the target page through a small model and can occasionally conflate or
paraphrase. Treat every entry as "corroborated by snippet, pending verbatim
confirmation on the live page."

---

## A. OFFICIAL — Miami-Dade Property Appraiser (target authority; NOT fetchable here)

These are the correct official Miami-Dade sources. **URLs surfaced in search;
content could not be fetched — Jorge should open these directly to confirm the
exact code list and stamp the DD report against them.**

- Glossary of Terms — `https://www.miamidadepa.gov/pa/glossary.asp`
- Glossary / Abbreviations — `https://www.miamidadepa.gov/pa/glossary_abbreviations.asp`
- Property Value (cost approach, depreciation, EYB) — `https://www.miamidadepa.gov/pa/property_value.asp`
- Property Search Help — `https://www.miamidade.gov/pa/property-search-help.asp`
- Building Sketch online tool — `https://apps.miamidadepa.gov/paonlinetools/propertysketch/sketch.aspx`
- Property Record Card advanced search — `https://www8.miamidade.gov/Apps/PA/PAOnlineTools/PRC/PRCadvancedSearch.aspx`
- PA data-file library (raw CAMA code tables may live here) — `https://bbs.miamidadepa.gov/`

**Status: REACHABLE ONLY AS SEARCH SNIPPETS — direct fetch BLOCKED.** Grade
(X+…E-), CDU, AYB/EYB, and the cost/depreciation approach were attributed by
snippets to these pages.

---

## B. OFFICIAL — other Florida County Property Appraisers (statewide-standard proxy)

- **Lee County PA — "State of Florida — SUB AREA CODE LIST" (PDF)** —
  `https://www.leepa.org/Docs/Codes/Sub_Area_Code_List.pdf`
  *The single best "official Florida" sub-area code document. BLOCKED for fetch;
  code meanings (FCP, FEP, FGR, FOP, FUS, SFB, UGR, UST) came from snippets.*
- Lee County PA — Improvement / Extra Feature / Unit-of-Measure / Land-Use code
  lists — `https://www.leepa.org/systems/Codes.aspx`
- **Highlands County PA — Building Sub Area Codes** —
  `https://www.hcpao.org/Search/LookupTable/sar` (BLOCKED for fetch)
- **Hillsborough County PA — Code Types & Descriptions (SAR table)** —
  `https://gis.hcpafl.org/PropertySearch/TableReport.aspx?tableName=SAR` (BLOCKED)
- **Clay County PA — Glossary of Terms** —
  `https://www.ccpao.com/general-information/glossary-of-terms/`
  *Confirmed FGR, FOP, FEP, FCP, UST via snippet. BLOCKED for fetch.*
- **Pinellas County PA — Glossary (per-letter, suffix-convention codes)** —
  `https://www.pcpao.gov/learn-about/glossary-terms/g` (Garage: GRF/GRU),
  `.../glossary-terms/o` (Open porch: OPF/OPU),
  `.../glossary-terms/e` (Enclosed porch: EPF/EPU),
  `.../glossary-terms/b`, `.../glossary-terms/u`.
  *Best plain-English finished/unfinished definitions. BLOCKED for fetch; content
  from snippets.*
- Volusia County PA — Appraisal Information (BAS = base heated area) —
  `https://vcpa.vcgov.org/info/appraisal` (BLOCKED for fetch)
- Clay County Tax Collector glossary — `https://www.claycountytax.com/property_taxes/glossary.php`

---

## C. OFFICIAL — Florida Department of Revenue (valuation/oversight; NO sketch codes)

Confirms DOR governs valuation and data submission, **not** sketch/sub-area
codes. All BLOCKED for fetch; described via snippets.

- Florida Real Property Appraisal Guidelines (FRPAG) —
  `https://floridarevenue.com/opengovt/pdf/FRPAGclean11202024.pdf`
- DR-493 (adjustments to assessed value) — e.g.
  `https://floridarevenue.com/property/Documents/2019%20DR-493%20All-County.pdf`
- 2023 NAL/SDF/NAP Data-File User's Guide —
  `https://floridarevenue.com/property/dataportal/Documents/PTO%20Data%20Portal/User%20Guides/2023%20Users%20guide%20and%20quick%20reference/2023_NAL_SDF_NAP_Users_Guide.pdf`
- Production Guide / data record layouts (2018, 2019) — floridarevenue.com/property

---

## D. COMMON-PRACTICE — cross-reference code lists & "how to read" guides (out-of-FL CAMA)

Used to corroborate meanings and the ~100-point component method. Not Florida/
Miami-Dade authorities; the point *weights* differ by system.

- Mesa County CO — "Abbreviations - UA Compliant" (BAY, FAT, FDC, FUS, LBA) —
  `https://www.mesacounty.us/sites/default/files/2025-06/Abbreviations%20-UA%20Compliant.pdf`
- Archuleta County CO — "Key for Building Sketch Descriptions" (AOF, APT, BAS) —
  `https://archuletacounty.gov/wp-content/uploads/2024/11/Key-for-Building-Sketch-Descriptions.pdf`
- Cherokee County NC — "Building Abbreviations" (APT, LLS, FAT) —
  `https://www.cherokeecounty-nc.gov/DocumentCenter/View/1534/Building-Abbreviations`
- Iredell County NC — Property Record Card Help —
  `https://www.iredellcountync.gov/DocumentCenter/View/675`
- Granville County NC — Understanding your PRC (sketch formula) —
  `https://www.granvillecounty.org/DocumentCenter/View/276/Understanding-your-Property-Record-Card-PDF`
- Portsmouth NH — How to Read Your PRC —
  `https://files.portsmouthnh.gov/assessors/2017/HowToReadYourPropertyRecordCard.pdf`
- Avitar Associates — Understanding Your PRC & CAMA (% Good) —
  `https://avitarassociates.com/Portals/0/PDF/UnderstandingYourPropertyRecordCard.pdf`
- Yadkin County NC — Schedule of Values, Residential Quality Grade —
  `https://www.yadkincountync.gov/DocumentCenter/View/776/Section-5`
- AcronymFinder — FOP = Finished Open Porch (building code);
  FGR = Finished Garage (building code)

---

## E. Reached vs blocked — summary

- **Reached (as WebSearch snippets):** all of the above — enough to compile the
  legend with sourcing.
- **Reached in full text (verbatim):** NONE. Every `WebFetch` returned
  `EGRESS_BLOCKED`; `web.archive.org` returned "unable to fetch"; Bash `curl` to
  the proxy status endpoint was blocked by the command classifier.
- **Biggest gap:** Miami-Dade PA's own exact published sub-area code list and its
  exact CDU rung labels could not be captured verbatim. The compiled legend uses
  the statewide-standard convention (Lee/Highlands/Hillsborough/Clay) as the
  traceable proxy, plus Miami-Dade snippets for Grade/CDU/EYB. **Recommend Jorge
  open the four miamidadepa.gov glossary URLs in Section A to lock the last mile.**
