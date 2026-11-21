# DESKTOP WORK QUEUE: Unsafe Structures refresh

**FROM:** Cloud window (claude.ai/code), 2026-11-21 ET
**TO:** RAMBO / Desktop Claude Code
**TRK number: NOT YET ISSUED.** Issue the next unused number from the registry (10020 is already taken, see TO-CLOUD_MIRROR_2026-09-03.md)
**Priority:** Jorge asked for this on 2026-11-21. It is the Unsafe Structures solicitation program.

Read `UNSAFE-STRUCTURES_OWNER-BRIEF_REWRITE_2026-11-21.md` in the repo root first. Then Drive docs "Unsafe Structures Runbook V2" and "Unsafe Structures Soliciting Guidelines - Class A and B V2".

## Why this is on your desk

Cloud is blocked from miamidade.gov, miamidadepa.gov, sunbiz.org and the Clerk site (tested 2026-11-21, all refused). Only the desktop can run the live steps.

## What cloud already did

1. Built the report from the saved county pulls (2025-08-20, 2025-11-12, 2026-06-04, 2026-07-24): 3,863 cases, grouped by what the county log shows.
   Link: https://claude.ai/artifact/AE6jKXQec3n1kUm3fBkRwq
   Data source: Drive file CODE-9712_UNSAFE-STRUCTURES-FULL-COLUMNS-ALL-PULLS_2026-08-25.tsv
2. Counts today: 1,152 prospects, 813 stale, 119 owner-in-contact, 16 permit-on-file, 1,114 condo or association, 649 public owner.

## Items, top to bottom (batches of 25; write each result to a file as it completes)

1. **Pull a fresh county report.** Use the property-type drop-down (commercial, industrial; also single-family if the filter helps). Export Excel, convert to CSV, save as a new version in VTES-Outbox. Never overwrite.
2. **Open-case check, twice, minutes apart.** Save a snip of the citation image for each case. If the image shows closed administratively, mark closed and drop from prospects.
3. **Process-number check.** In the building department permitting history panel, search by process number and folio. Any process number starting with C dated after the violation date, or any permit number, means do not solicit. Record the date it was added. Keep these as the design-professional contact list.
4. **Land use / zoning** from the Property Appraiser. Keep commercial and industrial.
5. **Soft lien amount** from the case record. Internal only.
6. **County log capture.** Every owner or representative call or visit, one entry each, with timestamp, name, phone, email, concerns, county advice.
7. **Sunbiz chain** for every company owner, repeating through parent companies until a person is reached. Save every alternate mailing address.
8. **Images to PDF.** One continuous PDF per case with a viewable link.
9. **Question for Jorge, via the usual route:** lien interest rate, 12 percent or 12.5 percent?

## Rules

DONE needs verification output. Nothing is sent, mailed or filed without Jorge's typed YES. Lien information never goes in anything sent to an owner.

Did the first 25 cases finish, and where is the output file?
