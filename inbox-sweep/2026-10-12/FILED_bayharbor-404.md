# FILED: 10000 W Bay Harbor Dr Unit 404 (Reyna Jovel) — email attachments to Drive

**Run:** 2026-10-12, cloud worker. Owner approval: 2026-10-12 ("yes, file the 35 attachments").
**Source list:** `inbox-sweep/2026-10-10/F_bayharbor-units-and-balharbour-plaza.md`, Section E, items marked NEW-NOT-SAVED (10).
**Target capsule:** `TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 404 (Reyna Jovel)`, Drive id `11BBc5FKWh7-kVV_nNeyLEcSu7oqCDxGG`, inside 01-JOBS (`1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt`).

## Result: 0 of 10 FILED. 10 of 10 BLOCKED.

**Reason (same for all 10):** the emails exist only in Outlook (Jorge@TEAMUSASALES.COM). They are not in Gmail jorgev2121@gmail.com (searched by sender, subject words, filenames, `in:anywhere`). The Outlook connector returns *extracted text* for PDF attachments, never the file bytes (tested on the attachment URI and on `/$value`; images do come back as bytes, PDFs do not). The Gmail connector lists attachment ids but has no tool that returns attachment bytes. OneDrive search found none of these files. Zapier has no Outlook connection. Uploading extracted text would not be the client document, so nothing was uploaded.

**Nothing was written to Drive.** The `_RECEIVED-BY-EMAIL` subfolder was **not** created (it does not exist yet in the capsule; creating an empty folder would add nothing). No files moved, renamed, overwritten or deleted. No email sent or forwarded.

## Identity check (done — safe to file once bytes are reachable)

Every source email names Unit 404 / Apt 404 at Ten Thousand West Bay Harbor Drive (10000 W Bay Harbor Dr, Bay Harbor Islands) and Reyna Jovel / Lucrecia Jovel. Not matched on unit number alone.

- **Msg A** — 2026-08-21 15:57 UTC, Lucrecia Jovel <lbjovel@gmail.com>, "Re: 404 -PERM APP & NOC -10000 Building Bay Harbor - Reyna Jovel - Out For Signature & Notarize". Body: "updated Condo Association compliance document that includes the owner's signature". Outlook id `AAMkAGRmNmE4NjI5LTI1ODYtNGUyNC05N2Q3LWU0NTBiNzcxNjY1OABGAAAAAABCTAwPdDHDRbfeF9nqHY2lBwB3zaXUvzi9SK47PNauXGmmAAAAtDGUAAA51wRVZmzQS62ItnbxU4CYAA_0VfjlAAA=`
- **Msg B** — 2026-08-21 14:40 UTC, Lucrecia Jovel, same subject. Body: "complete set of documents ... my mother's apartment at Ten Thousand West Bay Harbor Drive/ Apt 404". Outlook id `AAMkAGRmNmE4NjI5LTI1ODYtNGUyNC05N2Q3LWU0NTBiNzcxNjY1OABGAAAAAABCTAwPdDHDRbfeF9nqHY2lBwB3zaXUvzi9SK47PNauXGmmAAAAtDGUAAA51wRVZmzQS62ItnbxU4CYAA_0VfjXAAA=`
- **Msg C** — 2026-09-04 15:52 UTC, Miguel Zaldivar <miguel@mzsolutions.org>, "Re: ARC 10k 404 -PERM APP & NOC -10000 Building Bay Harbor - Reyna Jovel ...". Outlook id `AAMkAGRmNmE4NjI5LTI1ODYtNGUyNC05N2Q3LWU0NTBiNzcxNjY1OABGAAAAAABCTAwPdDHDRbfeF9nqHY2lBwB3zaXUvzi9SK47PNauXGmmAAAAtDGUAAA51wRVZmzQS62ItnbxU4CYAA-ZuBqRAAA=`

## Items

Format: original name | Drive file id | size | status. Target name is what it should be called when filed.

1. `DOC082126.pdf` (Msg A) | none | 331,206 bytes | BLOCKED (no byte access). Target: `2026-08-21 _ UNIT404 _ Received _ DOC082126.pdf`
2. `Condo association compliance.DOCs signed by General contractor..pdf` (Msg B) | none | 953,752 | BLOCKED (no byte access). Target: `2026-08-21 _ UNIT404 _ Received _ Condo association compliance.DOCs signed by General contractor..pdf`
3. `REYNA JOVEL.pdf` (Msg B) | none | 940,194 | BLOCKED (no byte access). Target: `2026-08-21 _ UNIT404 _ Received _ REYNA JOVEL.pdf`
4. `REYNA JOVEL - WINDLOADS.pdf` (Msg B) | none | 342,743 | BLOCKED (no byte access)
5. `REYNA JOVEL - Series 1000WW Aluminum Single Hung Window - 23-0803.05.pdf` (Msg B) | none | 3,455,395 | BLOCKED (no byte access)
6. `REYNA JOVEL - Series EL-100 Aluminum Single Hung Window - 23-0913.06 copy.pdf` (Msg B) | none | 3,606,638 | BLOCKED (no byte access)
7. `REYNA JOVEL - Clipped, Extruded Aluminum Tube Mullion - 25-0825.02 copy.pdf` (Msg B) | none | 3,466,329 | BLOCKED (no byte access)
8. `REYNA JOVEL - Series EL400 Aluminum Sliding Glass Door  - 23-0714.13 copy 3.pdf` (Msg B; note two spaces before the dash) | none | 6,786,661 | BLOCKED (no byte access)
9. `MZ-Solutions_GC-License_CGC1528486_valid-to-2028-08-31.pdf` (Msg B) | none | 893,927 | BLOCKED (no byte access). Note: Drive's 2026-08-31 license copy is 893,535 bytes, so this is a different file (likely the renewal; content unverified).
10. `Ten Thousand Plaza Condominium_MZ Solutions, LLC_MAIN CERTIFICATE 2026-202_9-4-2026_1551491641.pdf` (Msg C) | none | 146,228 | BLOCKED (no byte access). Target date prefix: 2026-09-04.

All 10 are under 10 MB. Items 4–8 target names follow the same pattern with date 2026-08-21.

## Other findings

- **Duplicate capsule folder.** A second folder with the exact same title exists outside 01-JOBS: id `1tY4jNSbhFNcSpQf4GcFTIT_NIpQ2KliK`, parent `1UP1ff8dpv3i3YIH-3QW4bSrLCxwDZ4VO`, created 2026-10-10. A future upload by title search could land there by mistake. Use the id `11BBc5FKWh7-kVV_nNeyLEcSu7oqCDxGG` only.
- The same "PDF bytes not reachable from cloud" wall will block the other 25 attachments in this batch if they are also Outlook-only.

## Shortest path to finish (WORKAROUND-CERT)

- Tried: Gmail search (5 queries), Outlook attachment read (2 URI forms), OneDrive search (2), Drive search for existing copies to `copy_file`, Zapier (no Outlook connection).
- **Simplest route:** the Desktop executor has local Outlook access and can save these attachments from the three Outlook message ids above straight into the Drive capsule (desktop sync of `G:\My Drive\01-JOBS\...`), into a new `_RECEIVED-BY-EMAIL` subfolder, with the target names listed. No owner click needed beyond routing it to Desktop.
- Alternative needing one owner click: connect Microsoft Outlook in Zapier (OAuth consent), after which a cloud session could pull bytes.

## Undo

Nothing was created in Drive, so there is nothing to trash. If a later run files these, its log must list the new ids; undo = trash those ids.

Footer: `UNIT404 (TRK-TBD) / #10000BayHarbor / #ReynaJovel / filing run 2026-10-12 / BLOCKED 10 of 10`
