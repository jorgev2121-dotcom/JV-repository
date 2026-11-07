# What failed: documents arrive but never reach the placeholders, the capsule page, or a request list  ·  2026-10-15 ☁️

Page reviewed: Pasadena Job Capsule (TUS-26-1018), artifact Li1uk3Dvz716NVuzh7Us8Z, version 1, stamped 2026-10-13. Recurrence: same family as RI-020 (attachments sat unread), RI-015 and RI-002 (a pipe nobody watches).

## Section A: What I found (evidence)
1. **The page is a photograph, not a window.** It was written once on 10-13 with the data inside the page. No database, no runtime capability. Nothing can refresh it, so it cannot keep up with mail.
2. **The placeholder list is also a photograph.** `_PLACEHOLDERS.md` was written 10-10 by RAMBO from one inbox sweep. No job updates its Status column when a document arrives.
3. **The hourly watch records arrivals as text only.** inbox-sweep/ARRIVALS.md has 19 lines. It names the attachment; it never changes a placeholder, never creates a database row.
4. **The cloud cannot download attachment bytes.** Gmail and Outlook tools return text and file names only. Only the PC can save the actual files. Of 442+ PDF-bearing email threads, 3 were saved (10-12). The PC lane is capped (6 runs a day), so the byte step is the choke point.
5. **OCR does not feed placeholders at all.** 89% have some text, about 3% meet the latest protocol, none new since 10-05. And no step reads OCR text to tick a placeholder.
6. **The mini database was designed, never activated.** ARCHITECTURE_DOCUMENT-LIBRARY-AND-MINI-DATABASES_2026-10-07 and a diagram exist. One job (Medley) has a master-index pilot, built today: 1 of 40.
7. **The email circle, contact sheet and scope-of-work are not on the page.** Pasadena has only a 723-byte _CONTACTS-EXTRACTED.txt (10-05). The email circle exists for 1 of 40 jobs.
8. **"Read everything end to end" lists titles and links, not documents.** Artifacts cannot embed Drive files. Only Medley has a real page-image viewer.
9. **There is no upload box, no comment box, no request-to-send list.** The page has no way to store anything.

## Section B: Why earlier fixes failed
Each session wrote a new report instead of a feed. Every report was a new snapshot; none had a writer behind it. The one fix that worked (RI-020 hourly watch) only covers reading mail, not saving bytes or updating rows.

## Section C: Three options (RI rule: no patches for a repeat problem)
1. **Tier 2, replace: one living job page on a shared database.** Every capsule becomes a view of rows (documents, placeholders, requests, comments). Upload and comment boxes are built in. Failure mode: rows without bytes stay "arrived, not saved". Lifespan: permanent while a writer exists.
2. **Tier 3, enforce: arrival-to-placeholder step in the hourly watch.** Each attachment email writes a database row and flips the placeholder to "arrived, not saved", then queues the PC to save the file. Failure mode: the PC cap. Lifespan: weeks unless the byte path is fixed.
3. **Tier 2, remove the choke point: automatic attachment saving that does not need the PC or Claude.** Zapier is connected to Claude but its Outlook, Contacts and Drive actions have 0 linked accounts. One owner OAuth click per account would let every new attachment land in one Drive inbox folder, with no filing. Failure mode: Zapier plan limits or cost (spend needs approval). Lifespan: long.

**Recommendation: Option 1 with Option 2 as its feeder now, and Option 3 as the permanent fix for the bytes.**
