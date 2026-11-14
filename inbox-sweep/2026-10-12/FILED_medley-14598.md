# Filed email attachments: Medley (TUS-26-1033) and 14598 SW 110 St (TUS-25-1023)

Run date: 2026-10-12. Owner approval: 2026-10-12, "yes, file the 35 attachments". This file covers 11 of them.
Source list: `inbox-sweep/2026-10-10/B_medley-einar-14598-15222.md`.

**Result: 1 of 11 filed as its own file. 2 more filed inside a zip copy, so 3 of 11 are now in the job folder. 8 of 11 are BLOCKED.**
**Why blocked:** the Outlook connector shows the attachment names and sizes but will not hand over the file bytes. For a PDF it returns only the extracted text. For a .dwg it says "Binary attachment, content cannot be returned inline."
Nothing was overwritten, moved or deleted. No email was sent or forwarded.

## Section A: Emails checked (all 4 match the sender, date and subject)

1. 2026-09-24 18:45 UTC, fabregat28@gmail.com, "MIAMI ART HOUSE - CAD FILES". Has 11 attachments; 7 are in scope.
2. 2026-08-24 15:22 UTC, mvaldes@synergyn-us.com, "Re: [TUS-26-1033] Miami Art House - Site Photo Report + 3 engineering questions (partition wall, HVAC tonnage, kitchen/bar scope)". Has 1 attachment.
3. 2026-07-02 01:15 UTC, tomtechengineer@gmail.com, "Certified as built letter". Has 1 attachment. This is 2026-07-01 at 9:15 pm Miami time; the filename date follows the task list (2026-07-02). The letter body names 14598 SW 110 Street, folio 30-5910-018-0210, and permit 2026-012823, which matches the capsule.
4. 2026-07-09 16:12 UTC, Gilberto.Martin@miamidade.gov, "RE: need "new" form ... process C2025-117736 for CAT 082". Has 3 attachments. The process number C2025-117736 matches the capsule. The subject line says master permit 2026-012826, but the capsule and Tomas's letter say 2026-012823. That is a typo in Jorge's original subject line, and the process number confirms the job.

## Section B: Capsules

- TUS-26-1033: `TUS-26-1033 _ 22-3011-052-0020 _ 7265 NW 74 St Bay 2 Medley`, id 1m2zOt4hRY1H6ncRZDtqdotdQQYxvj3DM, parent 01-JOBS (1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt). **No `_RECEIVED-BY-EMAIL` folder was created here**, because none of its files could be fetched. That avoids leaving an empty folder.
- TUS-25-1023: `TUS-25-1023 _ 30-5910-018-0210 _ 14598 SW 110 St Miami`, id 1O3pf_cqyUV34yuU3j5enBbKtXn-_PAt5, parent 01-JOBS. I created a new `_RECEIVED-BY-EMAIL` folder, id **1zi6Fx3pA82VRqLRHcY4-VaNYCVnp5lFM**. A Drive-wide search found no folder by that name beforehand.

## Section C: Results, one row per item

original name | capsule | Drive file id | size | status
---|---|---|---|---
A-1 - FLOOR PLAN.dwg | TUS-26-1033 | none | 262,177 bytes (Outlook) | BLOCKED: the Outlook connector returns no bytes for binary attachments, and no copy exists in Drive
E-1 - ELECTRICAL PLAN.dwg | TUS-26-1033 | none | 115,061 (Outlook) | BLOCKED: same reason
M-1 - MECHANICAL PLAN.dwg | TUS-26-1033 | none | 86,356 (Outlook) | BLOCKED: same reason (tested directly: "Binary attachment, content cannot be returned inline")
P-1 - SANITARY SERVICE PLAN.dwg | TUS-26-1033 | none | 201,767 (Outlook) | BLOCKED: same reason
LS-1 - FLOOR PLAN - LIFE SAFETY PLAN.dwg | TUS-26-1033 | none | 251,349 (Outlook) | BLOCKED: same reason
109-DANIWAREHOUSETHEATER_LEGALIZATIONPROJECT_Fabregat-AC-1-SCHEDULE-1464472.pdf | TUS-26-1033 | none | 247,912 (Outlook) | BLOCKED: the connector returns PDF text only, not the file, and no copy exists in Drive
P-1 - PLUMBING PLAN.pdf | TUS-26-1033 | none | 146,708 (Outlook) | BLOCKED: same reason
Synergyn LLC Mail - [TUS-26-1033] Miami Art House - Site Photo Report + 3 engineering questions (partition wall, HVAC tonnage, kitchen_bar scope).pdf | TUS-26-1033 | none | 273,854 (Outlook) | BLOCKED: same reason
Certified As-Built Letter 2026-012823.pdf | TUS-25-1023 | none | 274,794 (Outlook) | BLOCKED: the connector returned only the letter's text (confirmed as the right job), and no copy exists in Drive
1 - Concealed Work Process Design Professionals.pdf | TUS-25-1023 | 1Sh7_sJPMLn1nPw5pqXcXJRTgyy3w3pT3 (zip) | 103,460 inside the zip | FILED INSIDE A ZIP (note 2)
2 - Model Cover Letter Concealed Work.docx | TUS-25-1023 | 1Sh7_sJPMLn1nPw5pqXcXJRTgyy3w3pT3 (same zip) | 36,877 inside the zip | FILED INSIDE A ZIP (note 2)
3 - Standardized Concealed Inspection Report Form v1_1.pdf | TUS-25-1023 | 14HbmWf_j_7xyoxiWm_Qj3ycu6vMGowQ- | 294,661 bytes | FILED (note 1)

Filed names, as they appear in Drive:
- `2026-07-09 _ TUS-25-1023 _ Received _ 3 - Standardized Concealed Inspection Report Form v1_1.pdf`
- `2026-07-09 _ TUS-25-1023 _ Received _ 1 - Concealed Work Process Design Professionals.pdf + 2 - Model Cover Letter Concealed Work.docx (zipped).zip`

**Check after filing:** I re-read the metadata of both files. Both are in folder 1zi6Fx3pA82VRqLRHcY4-VaNYCVnp5lFM, inside the TUS-25-1023 capsule. Sizes are 294,661 and 435,550 bytes, both non-zero.

### Notes

1. **Form 3 bytes.** The file came from Drive, not from Outlook. It is a Drive-to-Drive copy of the loose file in the My Drive root (id 1zLZCGjeb8BxNT_qOjw6DaU4NMtPh-CMw, created 2026-07-17, the day Jorge forwarded this thread to Tomas). Its SHA-256 is a639fc34...6dbc37. That is byte-identical to form 3 in the thread zip (see note 2). Outlook reports 295,147 bytes, 486 more than the file. Every other attachment in this thread shows the same 450 to 540 byte gap, which fits Outlook counting its own wrapper data in the size. The loose root original was left where it is.
2. **Forms 1 and 2.** The bytes came from `RE_ need _new_ form ... C2025-117736 for CAT 082.zip` (id 12Az1YAJD5Wa3MwvyCVdf0GtPdJc0_99S, in `01-JOBS/_CONVERGE-STAGING/_Permits-unsorted`). That zip holds exactly forms 1, 2 and 3 of this thread. I checked the docx text against what Outlook returns for the attachment, and they match. Uploading the two files separately would have meant writing about 190,000 characters of base64 by hand, with no safe way to fix a bad upload because deleting is not allowed. So I **copied the zip itself** into `_RECEIVED-BY-EMAIL`. The original zip stays where it was. Form 3 is also inside the zip, so it is held twice.
3. **WeTransfer link (approved set B2020-0177):** not touched, as instructed.
4. **Not attempted, because it is RED without a yes:** forwarding the 3 blocked emails from Outlook to jorgev2121@gmail.com. Gmail's connector can return full file bytes, so that would unblock all 8 files. Zapier has no Outlook connection, so it was not an option.

## Section D: Workaround certificate (EXHAUST-FIRST-01)

Tried:
1. Outlook `read_resource` on the attachment links. PDFs came back as text only, and the .dwg as "binary, cannot be returned inline".
2. Gmail search by sender and by attachment filename. None of these emails are in Gmail.
3. Drive search for each filename, the .dwg type, "Fabregat", "AC-1" and "Certified As-Built". Copies were found only for the 3 county forms.
4. Zapier. No actions are enabled and there is no Outlook connection.

**Smallest owner action that unblocks all 8:** one yes to "forward the Fabregat CAD email, the Synergyn 08-24 email and the Tomas as-built email from Outlook to jorgev2121@gmail.com". After that yes, a session can pull the bytes from Gmail and file them the same way.

## Section E: Undo

Trash these Drive ids:
- 14HbmWf_j_7xyoxiWm_Qj3ycu6vMGowQ-
- 1Sh7_sJPMLn1nPw5pqXcXJRTgyy3w3pT3
- 1zi6Fx3pA82VRqLRHcY4-VaNYCVnp5lFM (the new empty-after-undo `_RECEIVED-BY-EMAIL` folder in TUS-25-1023)

TRK-2026 inbox filing · TUS-26-1033 / TUS-25-1023 · v1 · 2026-10-12 · CURRENT
#TUS-26-1033 #TUS-25-1023 #inbox-sweep #received-by-email

Shall a session forward those three emails to Gmail so the 8 blocked files can be filed?
