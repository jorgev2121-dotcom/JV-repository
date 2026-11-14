# ORDER — save email attachments into job folders, and sweep Downloads + PaperPort

From: ☁️ Cloud · To: 🖥️ RAMBO (desktop) · 2026-10-13 · GREEN (copies into the job's own folder only; TRK/TUS certain from the address)

The cloud can read attachment text but cannot download the files. Please do the following.

## A. Save these attachments (exact match: 8621 Pasadena Blvd = TUS-26-1018)

Destination: `G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH\TUS-26-1018 _ FOLIO-TBD _ 8621 Pasadena Blvd Pembroke Pines\04_Permits-and-Applications\`

1. Outlook, from tomtechengineer@gmail.com, 2026-10-12 3:55 PM ET, "Signed and seale4d plans and Certified As-built":
   - Save `A1.0_FLOOR-A1.0.pdf` as `2026-10-12 _ TUS-26-1018 _ Plans _ A1.0 Floor Signed-Sealed TomTech _ v1.pdf`.
   - Save `A2.0_ELEVATIONS-A2.0.pdf` as `2026-10-12 _ TUS-26-1018 _ Plans _ A2.0 Elevations Signed-Sealed TomTech _ v1.pdf`.
   - Save `Certified As-Built Letter 8621 Pasadena Boulevard.pdf` as `2026-10-12 _ TUS-26-1018 _ Engineering _ Certified As-Built Letter TomTech _ v1.pdf`.
2. Gmail, from jdrafters@gmail.com, 2026-10-12 1:35 PM ET, "Fwd: 8621 Pasadena Blvd". It carries the same two sheets, "digitally signed".
   - Compare them by SHA-256 with item 1.
   - If they are identical, do not save a duplicate.
   - If they differ, save them with `_ Julio-copy` added to the name.
3. Create a `.SEARCH.txt` sidecar for each saved file, and log every action in `_VERSION-LOG.md`.

## B. Sweep Downloads and PaperPort (RI-020; the cloud cannot see them)

1. List every file modified since 2026-10-01 in:
   - `C:\Users\JV\Downloads\`
   - both PaperPort folders
   - `C:\Users\JV\Desktop\`
2. Match each file against `inbox-sweep/WATCHLIST.md` (the copy on Drive is in Shared Folders for all LLMs).
3. Report the matches in `EXECUTED_RAMBO1_SAVE-EMAIL-ATTACHMENTS_2026-10-13.md` in the VTES-Outbox.
4. **Do not move anything from the sweep.** Report only.

Report: a count of files saved, the paths, the SHA-256 of each, and the sweep matches.

## C. Added by the 2026-10-13 13:18Z watch run

- TUS-26-1033 Medley: retrieve the PAID microfilm images for process X2027004874 (7265 NW 74 ST) from http://bldgappl.miamidade.gov/microfilm/AppointmentMaintenance.aspx before ~2026-11-11. Save them into the Medley job folder under `03_Research\Microfilm\`. No payment is needed; it is already paid.
- TRK-2026-1310 (Drive 1nW4BWBBxU3SJEZtKWawkIm-GJQoIv3BM): open the 2026-10-13 2:59 PM email from planstrack@miamidade.gov (tracking 3026170181), download the approved plan set from the county link, save into the job folder as a NEW file. Read-only on the county site; no payment.
- 2026-10-14 · TUS-26-1033 · Elio 18:00Z SharePoint link '2026013326-BatchPrint FIRE APPROVAL.pdf': open on the PC and save into the Medley folder 1m2zOt4hRY1H6ncRZDtqdotdQQYxvj3DM as a new file (link in inbox-sweep/ARRIVALS.md).
- 2026-10-21 · TUS-26-1018 (8621 Pasadena Blvd, Einar Suarez) · Julio Silva's 4:35 PM ET email "8621 Pasadena" (Outlook Jorge@TEAMUSASALES.COM, received 20:45Z) carries zip files of NOAs: open on the PC and save the attachments into Drive folder 1_ns65eLr8UwnboHsY92NmUTqsuBQ8YXI as NEW files (no overwrite, no unzip over existing). Confirm with Jorge which of the two TUS-26-1018 folders is active (other: 1CrEZ2WAjAzl7rWEMy_HK2tPE7FQG_Jt1).
- 2026-10-29 · UNSORTED (no TRK known; do not guess) · DCI Printing & Graphics email 'DCI' (Gmail thread 1a1888687e22259c, 16:31Z), 11 PDFs A to K: when the job is known, save them as NEW files into that job folder; until then hold them in the OPH holding area per orphan-onboarding.
- 2026-10-30 (cloud, 22:20Z): Unit 404 Bay Harbor (Reyna Jovel, 10000 W Bay Harbor Dr) email from Lucrecia Jovel, Outlook msg id AAMkAGRmNmE4NjI5...BDTJ83cAAA= (5:47 PM ET Fri), 10 PDF attachments (agreement + canceled check, compliance docs, plans, product approvals, GC license, business tax receipt, windloads, GL COI). Job/TRK not yet confirmed: please save the attachments as NEW files under the right job folder once Jorge confirms the job. Do not file against a fuzzy match.

- 2026-11-01T16:20Z · Plaza of Bal Harbour Unit 423 (window/door completion) · Outlook, Jorge@TeamUsaSales.com, from david@compumatik.com, sent 2026-11-01 10:19 AM EST, subject "PLAZA BAL HARBOUR #423" · 2 attachments: "423 - door.jpeg", "423 - .jpeg". Save into the Unit 423 job folder only after the TRK is confirmed from the folder path (no fuzzy match). Never overwrite.
- 2026-11-02 17:12Z · TRK-2026-1310 · save 'Inspection report DSS.pdf' from Frank Diaz Aleman's Outlook email of 11-02 11:40 AM ET (subject RE: C2026170181 – 10980 SW 202 Dr Unit 29 City comments response coordination) into the TRK-2026-1310 job folder. Copy only, rename nothing. Did it work?
- 2026-11-02 20:16Z · TRK-2026-1310 · REPLACES the 17:12Z item: save the NEWER 'report with photo Appendix' PDF from Frank Diaz Aleman's Outlook email of 11-02 2:37 PM ET (same thread) instead of the 11:40 AM one; copy only, rename nothing, keep both. Did it work?
- 2026-11-06T18:30Z · Plaza Unit 602 (permit BLC2025-0297) · Outlook, Jorge@TeamUsaSales.com, from miguel@mzsolutions.org, 17:27Z 11-06, subject 'Fwd: 602 PLAZA _ Permit APP & NOC_ out for signature' · 2 attachments: '602 PLAZA_PERM APP_ PLAZA 602 LLC.pdf', '602_NOC_Plaza _ GROSSMAN pdf.pdf'. Save into the Unit 602 job folder only after Jorge confirms the TRK from the folder path (no fuzzy match). Copy only, never overwrite. Did it work?
- 2026-11-07 Unit 307 Plaza (Albert Oiknine): Miguel Zaldivar email 11:27Z has a Mail Drop link to '307 - ALBERT OIKNINE TRS-1.pdf'. COPY ONLY once Jorge confirms the TRK; do not file against a fuzzy match.
- 2026-11-10T00:17Z · TRK-2026-1310 · save the fee-proposal PDF from Pedro Fiallo's Outlook email of 11-09 6:58 PM ET (same C2026170181 thread, to Miguel, Jorge copied) into the TRK-2026-1310 job folder. Copy only, rename nothing, do not sign. Did it work?
- 2026-11-10T23:17Z · TRK-2026-0708-JULIA LIKELY (confirm with Jorge first; do not file against a fuzzy match) · save the 2 PDFs from Jorge's self-sent Outlook message of 2026-11-10 22:50Z ('W9 Enrique Piwko - 2026-11-06.pdf; Authorization Letter - Piwko to Valdes.pdf') into the Julia job folder. Copy only, rename nothing, only after Jorge says the TRK is right. Did it work?
- 2026-11-13T16:36Z · TUS-26-1018 (8621 Pasadena, Einar) · save A1.0.pdf and A2.0.pdf from Julio Silva's Outlook email of 11-13 10:41 AM ET ('Re: 8621 Pasadena Blvd, Pembroke Pines: corrected page (FL29078)', Tomas cc'd) into the 'TUS-26-1018 _ FOLIO-TBD _ 8621 Pasadena Blvd Pembroke Pines' folder. Copy only, rename nothing, keep any older plan sheets. Did it work?
