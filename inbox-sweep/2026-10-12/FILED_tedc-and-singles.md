# Filing run: TEDC and single items (2026-10-12)

**Result: 0 of 12 filed. All 12 are BLOCKED. Nothing was written to Drive.**

Run by a cloud subagent (Code, cloud, Opus 5.5) on 2026-10-12, under Jorge's approval of the same day ("yes, file the 35 attachments").

## Section A: Why nothing was filed

1. **The cloud session cannot get the original file bytes.**
   - Outlook: reading an attachment returns **extracted text only**, not the PDF. I tested this on the DERM letter `Edison Towers II.pdf`: it came back as plain text. Uploading that text would create a fake, not the client's document.
   - Gmail: only one of the 12 (the county Oct 2 screenshot) is in Gmail. The Gmail tools list attachment IDs, but no tool returns the attachment's bytes.
   - Zapier has no apps connected (`inspect_zapier_actions` returns none), so there is no server-to-server path either.
   - Even with the bytes in hand, the Drive upload tool takes the whole file inline as base64. Anything over about 50 KB is too large to send through this session. The smallest item here is 69 KB.
2. **Nothing was created on Drive.** I did not create empty `_RECEIVED-BY-EMAIL` folders, because a folder without its files adds clutter and proves nothing. No `_RECEIVED-BY-EMAIL` folder existed anywhere in Drive on 2026-10-12.
3. **Item count: the caller said 14, but the four sweep files list 12.** They are counted as 1296 = 1, 1294 = 3, 1310 = 3, 535 NW 7 ST = 1, 15601 SW 137 AVE = 1, 1262 = 1, 1293 = 1, 1256 = 1. All 12 are below. If 2 more were meant, they are not in these sources.

## Section B: Verified so far (each email and capsule matched exactly)

All 8 capsules resolve to **exactly one** folder each directly under "01-JOBS — ONE SOURCE OF TRUTH" (1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt):

1. `TRK-2026-1296 - TEDC Tacolcy EDC - Company Credentials 2026 (TEDC)`: 1hzTpWUMFsgqOC2WsjK05iIhi8ENJ4TEa
2. `TRK-2026-1294 - Edison Towers II - 661 NW 58 St Miami 33127 (TEDC)`: 1YGQs35u8X3iOdE6m7xITO_jg_w09LYxS
3. `TRK-2026-1310 _ FOLIO-TBD _ 10980 SW 202 Dr Cutler Bay (Concrete Restoration)`: 1nW4BWBBxU3SJEZtKWawkIm-GJQoIv3BM
4. `TRK-TBD _ FOLIO-TBD _ 535 NW 7 ST Homestead (Renzo Cahuana)`: 1u5VINVcGaGlU4hy3E0VqvgEsSaS1Em04
5. `TRK-TBD _ FOLIO-TBD _ 15601 SW 137 AVE`: 1C7IbxE_K81HqLmqdXwD0-cvF6N9bOdY-
6. `20001 SW 110 CT Unit 143 (TRK-2026-1262)`: 133VMph_ujXc_q4KyQjf7AB9OflnxSu2u. The upper-case duplicate (1FwWPyp3o3-T2_sIwbDuKFP52AXnfB7Op) is **not** directly under 01-JOBS.
7. `TRK-2026-1293 - MZ Solutions LLC - Company Credentials 2026 (MZ SOLUTIONS)`: 1b-TSeCFXfbNYskzZu1pwcEXxpd2S7MC-
8. `TRK-2026-1256 - Groves at Sunset (Karla)`: 1k82RhLdntKxlW-Uw8XRjLe-vpGSE-_Qt

On 2026-10-12, a Drive title search found **none of the 12 files** anywhere in Drive. The Ten Thousand Plaza certificates on Drive are the 2025-06-26 and 2025-11 versions, not the 9-4-2026 one.

## Section C: The 12 items

Format: original name | capsule | Drive file id | size | status. The planned Drive name and the email pointer follow on the next lines.

1. `6C_DeveloperExperience_TEDCDevelopmentChart.pdf` | TRK-2026-1296 | none | 7,325,123 B | **BLOCKED** (cloud cannot fetch the original bytes; Outlook gives text only)
   - Name: `2026-08-04 _ TRK-2026-1296 _ Received _ 6C_DeveloperExperience_TEDCDevelopmentChart.pdf`
   - Email: Outlook, 2026-08-04 18:14 UTC, miguel@mzsolutions.org, "Portfolio TEDc as of 2023". internetMessageId `<B8A4E814-086E-40D4-A96A-DC4E64F1AC12@mzsolutions.org>`
2. `Edison Towers II 661 NW 58th Street Ph I -1.pdf` (Phase I ESA) | TRK-2026-1294 | none | 19,260,394 B | **BLOCKED-TOO-LARGE** (over 10 MB, as the caller instructed)
   - Name: `2026-07-14 _ TRK-2026-1294 _ Received _ Edison Towers II 661 NW 58th Street Ph I -1.pdf`
   - Email: Outlook, 2026-07-14 14:57 UTC, mzaldivar@tedcbuilds.org, "Fwd: Phase I ESA Submittal for Review – 661 NW 58th Street ...". `<D44ED3FF-A758-44DE-8867-3BE1825446E9@tedcbuilds.org>`
3. `Edison Towers II.pdf` (DERM letter dated 2026-06-05) | TRK-2026-1294 | none | 148,484 B | **BLOCKED** (bytes unavailable; tested, text only)
   - Name: `2026-07-09 _ TRK-2026-1294 _ Received _ Edison Towers II.pdf`
   - Email: Outlook, 2026-07-09 19:40 UTC, mzaldivar@tedcbuilds.org, "Fwd: Edison Towers Phase I ESA Report (HWR-1624)- DERM Email #1". `<85D01807-BE76-4A28-B5F5-7FAA5F04BFB7@tedcbuilds.org>`
   - Content confirmed: DERM/RER letter of June 5, 2026 to Carol Gardner, HWR-1624, folio 01-3113-090-0015.
4. `X2026105906.pdf` | TRK-2026-1294 | none | 319,547 B | **BLOCKED** (bytes unavailable)
   - Name: `2026-07-14 _ TRK-2026-1294 _ Received _ X2026105906.pdf`
   - Email: Outlook, 2026-07-14 14:40 UTC, mzaldivar@tedcbuilds.org, "Fwd: HWR-1624 Phase I ESA Submittal for Review – 661 NW 58th Street ...". `<1349C8CE-C6F2-4A8C-AACA-19100CDA584C@tedcbuilds.org>`. Do not file this email's other attachment, `image001.png`.
5. `3225_001.pdf` | TRK-2026-1310 | none | 267,690 B | **BLOCKED** (bytes unavailable)
   - Name: `2026-09-14 _ TRK-2026-1310 _ Received _ 3225_001.pdf`
   - Email: Outlook, 2026-09-14 19:40 UTC, miguel@mzsolutions.org, "Fwd: FOR SIGNATURE - Permit Application and Notice of Commencement - 10980 SW 202nd Dr, Unit 29 - TRK-2026-1667". `<B30FBA5F-65AD-4B5A-BC90-88B1B08EEF4F@mzsolutions.org>`
   - **TRK note:** this email's subject says TRK-2026-1667. The 1667 folder (1rZBZDVN8NMVxYz7Y-5K9NtzqkXJ91bWY) sits **inside** the 1310 capsule, so the capsule is right. Existing Unit 29 files are named TRK-2026-1667. Whoever files this should choose 1310 or 1667 for the filename. Do not guess.
6. `image.png` (county screenshot, larger of two) | TRK-2026-1310 | none | about 261,222 B (per sweep) | **BLOCKED** (Gmail has no attachment-download tool)
   - Name: `2026-10-02 _ TRK-2026-1310 _ Received _ image.png`
   - Email: Gmail message 1a0fc6103429ed3d, 2026-10-02 11:30 UTC, e405304@miamidade.gov (Daniel Rodriguez, RER), "Re: Request for fee review / correction - Process C2026170181 ... - TRK-2026-1667". The same TRK note as item 5 applies. Skip the 770 B `image.png` (a signature logo).
7. `PLF Structural Engineers, Inc. Invoice #260518-001` (attached email, message/rfc822) | TRK-2026-1310 | none | 69,258 B | **BLOCKED** (bytes unavailable)
   - Name: `2026-07-07 _ TRK-2026-1310 _ Received _ PLF Structural Engineers, Inc. Invoice #260518-001.eml`
   - Email: Outlook, 2026-07-07 16:40 UTC, pfiallo@plfengineers.com, "RE: 10980 SW 202 Dr - Legalization permit docs for signature (red X = owner signs) - TRK-2026-1310". `<509df9c36f4e4d11b247fa3081b91d55@plfengineers.com>`
   - Note: the invoice PDF itself is already on Drive as `2026-06-26 _ TRK-2026-1667 _ Invoice _ PLF-Engineer-Invoice-260518-001-to-MZ-Solutions-2500 _ v1.pdf` (1Uj4gZ-2Fji0Ycry8JrZ3_oxq5aYuYZfK), so this item has low value.
8. `Survey.pdf` | 535 NW 7 ST Homestead (TRK-TBD capsule; the sweep says TRK-2026-1532) | none | 243,027 B | **BLOCKED** (bytes unavailable)
   - Name: `2026-08-05 _ TRK-TBD _ Received _ Survey.pdf`. TRK-TBD matches the folder title; 1532 is not confirmed on the folder.
   - Email: Outlook, 2026-08-05 15:02 UTC, jdearmas17@gmail.com (Jaddrey de Armas), "RE: Renzo 535 NW 7 ST Homestead 33030". `<CACNowxTB1G-s25z_7X5ErZHsrn6MzrOgaL+_tMgXO+weQyxJNg@mail.gmail.com>`. File only `Survey.pdf`; the other 5 attachments are already saved.
9. `Park_at_Sheffield_Feasibility_Study 4% LIHTC.pdf` | 15601 SW 137 AVE (TRK-TBD capsule; the sweep says TRK-2026-1650) | none | 123,228 B | **BLOCKED** (bytes unavailable)
   - Name: `2026-08-27 _ TRK-TBD _ Received _ Park_at_Sheffield_Feasibility_Study 4% LIHTC.pdf`
   - Email: Outlook, 2026-08-27 16:37 UTC, miguel@mzsolutions.org, "Check it out.". `<12855D73-E79E-409A-BCB0-3F2635C8AD16@mzsolutions.org>`
10. `20001-Unit143_Fire-Department-Letter_Executed_2026-07-01.pdf` | TRK-2026-1262 | none | 406,777 B | **BLOCKED** (bytes unavailable)
    - Name: `2026-07-15 _ TRK-2026-1262 _ Received _ 20001-Unit143_Fire-Department-Letter_Executed_2026-07-01.pdf`
    - Email: Outlook, 2026-07-15 19:41 UTC, miguel@mzsolutions.org (to Julian Quintela, cc Jorge), "Fwd: C2026116502 - 20001 SW 110 CT Unit 143 - Fire Review Rework Uploaded (Tracking 3026116502)". `<F5548429-0B42-4327-91EA-C105993E773A@mzsolutions.org>`
11. `Ten Thousand Plaza Condominium_MZ Solutions, LLC_MAIN CERTIFICATE 2026-202_9-4-2026_1551491641.pdf` | TRK-2026-1293 | none | 146,228 B | **BLOCKED** (bytes unavailable)
    - Name: `2026-09-04 _ TRK-2026-1293 _ Received _ Ten Thousand Plaza Condominium_MZ Solutions, LLC_MAIN CERTIFICATE 2026-202_9-4-2026_1551491641.pdf`
    - Email: Outlook, 2026-09-04 15:55 UTC, miguel@mzsolutions.org, "Re: ARC 10k 404 -PERM APP & NOC -10000 Building Bay Harbor - Reyna Jovel - Out For Signature & Notarize". `<FE55A53B-3B56-4A8C-B157-CB564C2230C6@mzsolutions.org>`
12. `PH-FEEDER-OPTIONS_13-60-01441_TRK-2026-1436.pdf` | TRK-2026-1256 | none | 90,681 B | **BLOCKED** (bytes unavailable)
    - Name: `2026-08-12 _ TRK-2026-1256 _ Received _ PH-FEEDER-OPTIONS_13-60-01441_TRK-2026-1436.pdf`
    - Email: Outlook, 2026-08-12 20:51 UTC, MDCHDEngineeringTeam@flhealth.gov (Claudia Milano), "FW: Permit 13-60-01441 - The Grove at Sunset - pH feeder options for pre-approval (item 454.1.6.5.16.3)". `<SA1PR09MB7997BFC1593362103F65A3DFEDDC2@SA1PR09MB7997.namprd09.prod.outlook.com>`

## Section D: Undo

**Nothing to undo.** No Drive files or folders were created, moved, renamed or trashed.

## Section E: WORKAROUND-CERT and the shortest path

1. **What I tried:**
   - Outlook attachment read: returns text, not the file.
   - Gmail message and attachment listing: no download tool.
   - Zapier: no apps connected.
   - Checking for an existing Drive copy to reuse: none exists.
2. **Shortest path: the DESKTOP executor**, which has Outlook and the `G:\My Drive` sync. It can save these 11 attachments straight into each capsule's `_RECEIVED-BY-EMAIL` folder, using the names and message IDs above. Item 2 is excluded as too large. This needs **no action from Jorge** beyond the desktop session picking up the queue item.
3. **Fallback, if the desktop is unavailable: one OAuth click.** Jorge connects Gmail and Google Drive in Zapier. A cloud session could then move the files server-side. That covers Gmail items only, so the Outlook items would still need the desktop.
4. **Two decisions are left for the filer:**
   - Items 5 and 6: choose TRK-2026-1310 or TRK-2026-1667 for the filename.
   - Items 8 and 9: keep TRK-TBD or use 1532 and 1650.

#TRK-2026-1296 #TRK-2026-1294 #TRK-2026-1310 #TRK-2026-1667 #TRK-2026-1262 #TRK-2026-1293 #TRK-2026-1256 #TRK-2026-1532 #TRK-2026-1650 #inbox-sweep

Should the desktop executor take this list as its next filing item?
