---
name: county-status-capture
description: Retrieve a county or city portal status page (citation/case closed, permit status, fee due) for a property, save it as a PDF with the job's TRK and hashtags, pop it up for Jorge's review, and stage an Outlook draft. Use whenever Jorge asks to "pull", "retrieve", "capture" or "send" a county permit, citation, NOV or fee page for a client, contractor (MZ Solutions) or agency. Standing owner directive OD-CR-01 (2026-09-30).
---

# County status capture — standing owner directive OD-CR-01

**Answer first:** find the job's identifiers from its hashtags and master TRK folder, get the live portal page, save it as a dated PDF, make it pop up flashing on top of everything for Jorge, and stage an Outlook draft with the PDF attached. **Never send. Jorge approves and sends.**

## 1. Find the identifiers (do this before opening any portal)
1. Search the hashtags and the TRK in Drive, Gmail and the repo. Jorge's shorthand hashtags are numbers: `#20001`, `#10980`. A digit-only tag finds the job; a street name alone can match the wrong client.
2. Open the job's `_STAGE.md`, index, contact sheet or case card. Pull: **TRK**, **C process number**, **permit number** (no C), **code case number**, **folio**.
3. If a number is missing: convert the address to a folio at the Property Appraiser (Miami-Dade property search; unincorporated county folios start with 30). Then use the county's cross-reference by address (Electronic Permits option 10) for the process/permit pair. Never guess a digit.
4. Write the identifiers you used at the top of your report. **Do not file or quote anything against a fuzzy address match** (charter section 9).

## 2. Known jobs (as of 2026-09-30; re-check before use)
1. **#20001** = 20001 SW 110 CT Unit 143, TRK-2026-1262, permit **2026061642**, process C2026116502 (older C2026061642), code case **20260245510**, folio 30-6007-011-0020. Permit finaled 2026-08-07 per the county email. The county case still showed OPEN on 2026-09-28 (Drive screenshot "Case 20260245510 STILL OPEN"). **Expect a fresh capture to show permit FINAL and the case still OPEN, unless the county acted. Do not describe an open case as closed.**
2. **#10980** = 10980 SW 202 Dr Unit 29 (Jorge also said "19080": CONFIRMED by Jorge 2026-09-30 as the same job, digits transposed; use alias #19080 when searching), TRK-2026-1667 (also TRK-2026-1310: Jorge must pick), process **C2026170181**, folio 30-6007-009-0030. Upfront fee shown 2026-09-28: **$7,280.94**. Permit number 0 (not issued).

## 3. Portals (public pages work without a login; the county site blocks the cloud, so a PC or Cowork browser does this)
1. Permit Status / Electronic Permits menu: start at https://www.miamidade.gov/permits/ (Permit Status Inquiry, Permit History, Holds, Fees by process number).
2. Regulation Cases (citation / NOV): https://www.miamidade.gov/Apps/RER/RegulationSupportWebViewer/ (accepts case, address, folio, permit, owner). Code Compliance line 786-315-2424.
3. ePayment fee lookup: https://www.miamidade.gov/Apps/RER/ePayment/Payment/ProcessNumbers (type the C number, click ADD only, **never Pay**).
4. EPS e-permitting portal: https://www.miamidade.gov/Apps/RER/EPSPortal (login-gated for some searches).
5. Inspection routes: https://www.miamidade.gov/Apps/RER/Mobile3/Home/PermitRoutes and https://bldgadmin.miamidade.gov/mdfr/map_route.asp (permit number only).
6. Walls: reCAPTCHA or login means stop, record "WALL: <type>", and ask Jorge for the one click. Never bypass.

## 4. Capture
1. Capture **the page as a PDF** (browser print to PDF), not a cropped picture. The page must show the identifier searched, the status, and the date/time or URL. If it does not, add the URL and time in the file body or footer.
2. File name (grammar, charter 9.1): `YYYY-MM-DD _ TRK-2026-NNNN _ Portal-PDF _ <what it shows> _ v1.pdf`, for example `2026-10-01 _ TRK-2026-1262 _ Portal-PDF _ Permit 2026061642 Status _ v1.pdf`. Put the full TRK and hashtags in the body or a `.SEARCH.txt` sidecar. If the filename already exists, make `v2`; never overwrite.
3. Save into `G:\My Drive\MY-DESK\CAPTURE-INBOX\` (the watcher picks it up) and copy into the job capsule `02-PERMITS` or `04-CORRESPONDENCE` only when Jorge approves (filing is RED).
4. **Read what the page actually says** and state it in one line: for example "permit FINAL, case OPEN". If the page contradicts what Jorge wants to tell the client, say so first.

## 5. Owner review pop-up and Outlook draft (see skill `owner-review-popup`)
Run `VTES-CaptureReview.ps1 -Pdf "<file>" -Trk TRK-2026-NNNN -What "<one line>"`. It opens a flashing, always-on-top review window. Jorge clicks "Make email draft": Outlook opens a **new draft from Jorge@teamusasales.com with the PDF attached, To left blank**. **It is never sent by an agent.**

## 6. Report (three honest states)
DONE only with: the PDF path, what the page shows, the identifiers used, and proof the pop-up ran (log line or screenshot). Otherwise BLOCKED (what you tried, why, the one click) or IN PROGRESS.
