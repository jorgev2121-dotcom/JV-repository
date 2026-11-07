# STANDING ORDER — every job encapsulated, every document attached to a job (2026-10-13)

**Owner words (Jorge, 2026-10-13):** "All jobs should be encapsulated in a format like the attached. Everything should be attached to a job in the same manner, period. Is there a reason why you have not already done so? This should be standard protocol and priority."

## Why it was not done (root cause)

1. **The portals are built on the PC, and the PC builder has stopped.**
   - The scheduled task CU-OrangeTree-RefreshAll should rebuild every 6 hours. It last ran Sun 10-11 at 6:45 PM; the "next run, Mon 12:45 AM" never happened.
   - The desktop helper (RAMBO) has done no work since 10-10.
   - No cloud job existed to cover for it.
2. **Only 1 of 58 is in the ENHANCED format** (#Majestic). The other hashtag reports and the 58 job portals are an older, plainer format. Their links are `file:///` PC paths, which open on the PC only, never on the phone or in the cloud.
3. **Duplicate trees.** The same jobs have portals in 4 places: 01-JOBS Drive, HQ 1-JOBS OneDrive, Jobs-Master OneDrive, and PERM-APP-PORTAL OneDrive. 4 jobs also carry 55-day-old "_EMBEDDED" copies.
4. **"Attach everything" includes filing, and filing is RED.** About 700 orphan documents plus 188 in PaperPort need a certain match to a job before anyone files them (CLAUDE.md §9 and NIGHT-PROTOCOL rule 4). This is the "scaffolding built, population never done" pattern from TRK-2026-9180.

## The order

**A. Encapsulate every job (GREEN: writes new files only). Cloud runner, starting now.**
- One helper per job (Rule 5).
- For each of the 40 live job folders, build `_CAPSULE-ENHANCED_<job>_<date>.html` into the job's Drive folder. It uses the Orange Tree format:
  - status at a glance, and what's missing;
  - folders → documents, with real **Drive links** that work on the phone;
  - people and contacts, and hashtags;
  - "View these together", "Copy for email", and print;
  - money locked behind 0000.
- The pilot is TUS-26-1018 Einar. Then 4 jobs per hourly runner run, plus the rest overnight. Target: all 40 within 24 hours.
- A master index page links every capsule.

**B. Attach every loose document to its job (RED: Jorge's morning yes per batch).**
- Nights: run the OPH match on Gmail, Outlook, PaperPort (188), Downloads and the ~700 orphans. Write a proposed-filing list: document → job, with the evidence.
- Mornings: Jorge says yes per batch, and the desktop files the documents (with a rollback script).
- Fuzzy matches are never filed.

**C. PC builder repair (desktop order):** restart CU-OrangeTree-RefreshAll, and switch its links from `file:///` to Drive links.

**D. One home:** 01-JOBS on Google Drive is the source of truth. The OneDrive portal copies get a "superseded" banner. Nothing is deleted.
