---
name: unsafe-structures-letters
description: Repeatable runbook for Jorge's Unsafe Structures marketing-letter campaign. Find the graded report, export it, filter to commercial and industrial properties, refresh each against public records, look up Sunbiz signers, pull liens and daily fines, then build the print list, letters PDF and labels. Use whenever Jorge asks for marketing letters, a mailing, or a refresh of the unsafe-structures leads.
---

# Unsafe Structures marketing letters: the runbook

Tracking: TRK-2026-10058. Owner directive: Jorge, 2026-10-25 5:11 PM ET. Written by ☁️ Cloud.

**Rule zero: send nothing.** Never send, mail, email or post anything. Jorge prints and mails the letters himself. Public records (names, addresses, Sunbiz) are fine to use. Client emails and contracts stay on the PC.

## What has actually been tested (2026-10-25)

- **TESTED and working:**
  - Step 1, finding the report.
  - Step 3, extracting it (3,863 cases read out of the artifact).
  - Steps 8 and 9, building the print list, letters, labels and the unknowns list, with `scripts/build_letters.py` on made-up data. Checks that passed: commercial and industrial kept, residential dropped, RESPONDED dropped, A sorted first, blanks print as ??, and it refuses to overwrite an existing version.
- **NOT tested yet:** steps 4 to 7 (the Property Appraiser, case status, Sunbiz, liens). The cloud session was blocked from those sites. **The first agent to run them must write down what worked, here, with the date.**

## Cheapest agent for each step

**The script does the thinking, so a small model only has to run it and copy files.** Use the big model only where judgment is needed.

1. **Steps 1 to 3 (find, copy, export): no AI needed, or the smallest model.**
   - Use Claude Haiku-class, Grok's fast model, or a local Ollama model on the PC.
   - It reads the artifact, runs the extraction and copies files. Cost: pennies.
2. **Step 4 (land use) and step 7 (liens and fines): a plain script first, then a small model for odd pages.**
   - Property Appraiser lookup by folio: `https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetPropertySearchByFolio&clientAppName=PropertySearch&folioNumber=<folio without dashes>`.
   - Read the land use (DOR) code. Under the Florida DOR scheme, codes **10 to 39** are commercial and **40 to 49** are industrial; 00 to 09 are residential. Confirm this against the PA's own code table on the first run.
   - Go slowly: at most 1 request every 2 seconds.
3. **Step 6 (Sunbiz): a small model with a browser.**
   - Use Haiku-class, or Grok with web access.
   - Search by entity name and open the detail page. Copy the officers or managers, the registered agent, the principal and mailing addresses, and the status.
   - **An exact name match only.** Near matches go on the unknowns list.
4. **Step 5 (did they already respond?): a small model with Gmail and Outlook search.**
   - Search for the folio, the case number and the property address in quotes.
   - Any hit means RESPONDED or ACTION TAKEN, with the date and the source.
5. **Judgment calls: a mid-size model (Sonnet-class).** Use it for:
   - an owner name that doesn't match Sunbiz;
   - an inactive company;
   - a lien amount that conflicts between sources.
6. **Final check: the top model (Opus-class), once per batch.** It reads 10 random letters against the print list before Jorge prints. That is a few cents, and it catches the expensive mistakes.

Desktop sessions were once silently pinned to the smallest model (RI-008). **Here, small is fine for steps 1 to 4, because the script holds the rules.** Steps 5 and 6 need the bigger models.

## The steps

1. **Find the report.**
   - Name: "VTES-SOLICIT Lists Panel V2", https://claude.ai/artifact/C2a1XucdJESigPfyqBXTFD (built 2026-10-19).
   - Grades, A is best: A means no reply, no permit and no new county activity.
   - If a newer version exists, use the newest and say so.
2. **Copy it, unchanged**, to Drive VTES-Outbox as `VTES-UNSAFE-STRUCTURES-REPORT-ORIGINAL-V1.html`.
   - Read the artifact with the Artifact tool, which saves the HTML.
   - Copy only; never move or rename the original.
3. **Export** the `const D=` data to `VTES-UNSAFE-STRUCTURES-EXPORT_V<n>.csv` and `.xlsx`.
   - Each case is a list. In order: case number, property address, folio, opened, owner, owner type (I or C), owner mailing address, grade, condo flag, last county activity, process numbers, permit numbers, permit status, referring cases, emails, phones, log dollar amounts (**not liens**), violation, tags, district, inspector, mailing ZIP, first pull, last pull, verify flag, a second flag, grade history.
4. **Filter** to commercial and industrial by the land use code. Do A first, then B1 and B2, then C. Skip grade E (condos, a separate campaign).
5. **Refresh** each property:
   - the case status now;
   - any permits pulled;
   - closed, demolished, or sold;
   - any reply, call note or payment in Gmail or Outlook.

   Mark each one NO ACTION, RESPONDED, ACTION TAKEN or CLOSED, with the date and the source. **Keep only NO ACTION.**
6. **Sunbiz** for every company owner.
   - The authorized signer at the company's mailing address becomes the letter recipient.
   - An inactive or dissolved company gets flagged, and its last officers are listed.
   - An individual owner gets the Property Appraiser mailing address.
7. **Liens and fines** from the case record, as of today.
   - The daily fine is usually $250 a day. If the record says otherwise, use the record's amount and flag it.
   - **Never guess. A blank stays blank.**
8. and 9. **Build.** Write the refreshed rows into a CSV with exactly these columns:
   `grade, property_address, folio, use, case_number, violation, lien_total, lien_asof, daily_fine, fine_since, owner, entity_status, signer_name, signer_title, mail_line1, mail_line2, mail_city_state_zip, last_outreach, status, sources`

   Then run:
   ```
   python scripts/build_letters.py REFRESHED.csv OUT_FOLDER --version 1 --trk TRK-2026-XXXX --office "<address · phone · email>" --contact "<phone · email>"
   ```
   It writes:
   - the print list (.csv and .xlsx);
   - the letters PDF, one per page, laid out for a #10 window envelope;
   - the labels PDF (Avery 5160/8160, 30 per sheet; only needed for envelopes without a window);
   - the unknowns list;
   - a counts file.

   It needs Chromium with Playwright, and openpyxl for the .xlsx.
10. **Save everything to VTES-Outbox.** Write `VTES-UNSAFE-STRUCTURES-CLOSEOUT_V<n>.md` with the counts (found, commercial and industrial, refreshed, filtered out, letters ready, blank fields) and the links.

## The letter (approved layout: format B, navy stripe; changes need Jorge)

- At the top: the letterhead, then the recipient block placed in the window area (0.875 in from the left, 2.05 in from the top).
- In the facts box:
  - property and folio;
  - case number;
  - the problem identified;
  - the current lien as of a date;
  - the daily fine and since when.
- The closing line, word for word: **"With 30 years of experience, we can help. Give us a call or write us."**
- Bottom left: "Re: Property matter · Miami-Dade County". Bottom right: the TRK and the version.

## Envelope rule (owner, 2026-10-25)

**Nothing on the outside of the envelope names the case number, the violation or the words "unsafe structure".** A sample that printed case details on the envelope was retired.

**Jorge's format (2026-10-26), E4:**
- Return address: **JORGE VALDES** (not Team USA Sales), 13633 SW 142ND TER, MIAMI FL 33186. The address is still to be confirmed by Jorge.
- **RE: <subject property address>** about 1/2 inch above the recipient's name.
- The recipient block.
- "Reference: Miami-Dade County property matter" at the bottom left.

E5 is the same, with "· Time sensitive" added. All formats are drawn at https://claude.ai/artifact/4XPCcdCndSwYbzmbLRUcXt. Use whichever one Jorge picks.

## Mailing facts (checked 2026-10-25)

- **Envelope:** #10 is 4-1/8 x 9-1/2 in, and fits a letter folded in three.
- **Postage:** a Forever stamp is $0.82 (since 2026-07-12), so $70 covers 85 letters. One sheet in a #10 envelope is under 1 oz.

## Never

- Invent a name, an amount or a date.
- File by fuzzy match.
- Overwrite a version.
- Send or mail anything.
- Put owner data in this repository: **it is public.** Lead data lives in Drive only.

Agent: which step are you starting at?
