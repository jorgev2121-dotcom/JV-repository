---
name: sunbiz-signer-check
description: For any owner that is not an individual (LLC, corporation, partnership, trust or similar), look the entity up on Florida Sunbiz, confirm it is ACTIVE on the most current record, list the officers/managers/authorized persons as possible signers, save the Sunbiz record as a working paper, and prepare the "who will sign?" email to the client. Run it before building the Certificate of Resolution or any onboarding package for an entity owner.
---

# Sunbiz signer check

**Tracking: TRK-2026-9961. Owner directive, 2026-09-23.**

## When to run it

**Whenever the owner on the deed or Property Appraiser record is not a plain individual.**
Run it before `owner-authorization-poa` or `onboarding-package`. Its result fills in
`signer_name` and `signer_title` on the Certificate of Resolution.

## Steps

1. **Look it up.** `python3 sunbiz_lookup.py "EXACT OWNER NAME" OUT_DIR --trk TRK-2026-NNNN`
   - It searches Sunbiz and takes **only an exact name match**. It never files against
     a fuzzy match (the 14598 SW 110 ST lesson). With no exact match it lists the closest
     names and stops. Ask Jorge.
   - It always pulls the live page, so the record is the most current one.
2. **Status must be ACTIVE.** Anything else (INACTIVE, ADMIN DISSOLVED, and so on)
   stops everything. **Tell Jorge before anything is signed.** An inactive company
   cannot validly sign a permit application or a resolution.
3. **Working paper.** The lookup saves:
   - `... _ WorkingPaper _ Sunbiz-<name> _ v1.pdf`: entity, document number, status,
     filing date, the people authorized to sign with their titles, annual reports,
     principal address, registered agent, source link and fetch time;
   - `sunbiz_detail.html`: the raw page;
   - `sunbiz.json`: the data.

   **Keep all three in the job's working papers.** Re-check if more than 30 days old.
4. **Ask the client only when there is a choice.**
   `python3 signer_request.py OUT_DIR/sunbiz.json job.json OUT_DIR`
   - **One authorized person:** no email. That person is written into `job.json` as
     the signer.
   - **Two or more:** it writes `signer_request_email.json`, with a check-box list of
     the names and titles plus "Someone else", and the working paper as an attachment.
5. **The email goes out as a Gmail DRAFT, and Jorge presses Send.** Create the draft with
   the Gmail tool, from `signer_request_email.json`, with the working-paper PDF attached.
   Then read the draft back and confirm the attachment is there and is not 0 KB
   (RI-048). **Auto-send is OFF** until Jorge switches it on here in writing, after he
   has seen it work correctly on real jobs.
6. When the client answers, put the chosen name and title in `job.json` and build the
   documents.

## Trusts and other non-Sunbiz owners

**Ordinary trusts are not registered on Sunbiz.** Ask the client for a **Certification of
Trust** (Fla. Stat. 736.1017), which names the trustee(s). Do not guess the trustee from
the deed alone.

## Network note (2026-09-23)

**The cloud sandbox is blocked from `search.sunbiz.org`** (exit code 4). Two fixes:

1. **Jorge adds `search.sunbiz.org` to the cloud environment's allowed domains**
   (environment settings, Network access). This is the recommended fix: one setting.
2. The desktop PC can reach Sunbiz directly and can run the same script.

`tests/fixture_detail.html` is a fictitious page in the Sunbiz layout, used to test the
parser offline. **The parser has not yet been run against the live Sunbiz site.** The
first live run must be checked by eye against the web page.
