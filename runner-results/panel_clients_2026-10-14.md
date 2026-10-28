# Panel pieces built — CLIENTS tab: Client list, Contact sheet per TRK, Last email per client

**Date:** 2026-10-14 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. New count: 84 of 116 (72%), up from 81 at git HEAD. CLIENTS tab: 3 of 3 (100%). clients-test, phone-width, menu-glossary and money-lock all pass. Not republished, not committed, no backup made in the repo (as instructed).**

## What was built

1. **Client list.** 36 clients: 26 people and 10 companies. Owners and customers only. Each one lists their jobs (job number and address, from the folder title) and links to the job folder in Drive (`https://drive.google.com/drive/folders/<id>`, with ids from `_JOBS.tsv`). It has a search box: type a name, job number, address or email. Clients the census marks as possible or unverified get a "not confirmed" tag. Those are Lily, Lynda Harris, Reyna Jovel, Cesar Garcia and 2362 Acquisition LLC.
2. **Contact sheet per job.** 41 fold-open cards, one per job folder. Each card lists every person and company in that job's census file, with their role and with emails where the repo has one (76 distinct emails). Clients are tagged. Each card has a Drive folder link.
3. **Last email per client.** A static snapshot, built because the repo does record dates. There are 8 lines, covering 8 of the 36 clients. The newest is Miguel Zaldivar / MZ Solutions, 2026-10-13, from `inbox-sweep/ARRIVALS.md`. The others are Victor Seijas and Synergy GC (2026-10-04), Kathryn Slack (2026-09-05), Daymara Yhanes Ureta (2026-06-26), TEDC (2026-06-19) and Frank Izquierdo (2026-07-01), all from `reports/CAPSULE-INDEX_2026-10-14.html`. The other 28 clients have no dated email on file, so the page says that instead of guessing. The capsule index gives dates without a year; they are read as 2026, the year of the index.

## Sources and safety

- Every row has a "source:" tooltip that names its census file, and evidence where the census gives it. The test checks that every name and email shown appears in a census file.
- The generator also checks the snapshot: each last-contact line is matched against the exact text in its source file.
- No job number was invented. Folders without one show "no TRK yet". Short and non-standard forms (TRK-26-1042, KAR-26-GROVES) are shown exactly as the folder has them.
- **Phones:** none are shown. The two phones in the census (Renzo Cahuana and Officer Chapelli) and one in a county role line were left out.
- **Money:** role text that mentions amounts, invoices, fees, mortgages or bonds was trimmed out. No $ amounts appear on CLIENTS, and the 0000 lock is untouched.
- **Sensitive details:** arrest, bankruptcy and fraud-judgment details were trimmed out of the role text. No SSN-pattern strings or 16-digit runs appear.
- Uses the page's own tokens (`--muted`, `--accent`, `--pill-bg`, `--warn`, `--line`). No external scripts. The tab's map color changed from off to ref, and its description is updated.

## Tests

### New: `tools/panel/test/clients-test.js`
```
PASS BUILD parsed :: 84 of 116 built (72%)
PASS BUILD count went up by 3 vs git HEAD :: 81 -> 84 of 116
PASS 3 pieces flipped to 1 :: Client list=1, Contact sheet per TRK=1, Last email per client=1
PASS client list renders (one row per client) :: 36 rows
PASS count line starts at all shown :: 36 of 36 shown
PASS every client has at least one job, every job is a Drive folder link
PASS every row and job line has a "source:" tooltip
PASS no city staff or vendors in the list (Jorge, county, city names absent) :: Miguel Zaldivar, Alec Valdes, Karla Morales, Philip A. Sigel, Barbara Rodriguez, Cesar Garcia, Cinde Velazquez, Daniel Felipe, Daymara Yhanes Ureta, Eduardo "Ed…
PASS typing "alec" narrows the list to Alec Valdes :: Alec Valdes, Avis Builders
PASS count line follows the search :: 2 of 36 shown
PASS searching a job number finds that job's clients :: Miguel Zaldivar, Quanny Marte, MZ Solutions LLC, The Plaza of Bal Harbour (Condo Association)
PASS no match shows a plain message :: Nothing matches. Clear the box to see all 36.
PASS clearing the box brings everyone back
PASS one contact card per job folder, all closed at start :: 41 cards, 0 open
PASS clicking a card opens it and shows people + companies :: 17 entries
PASS card rows carry source tooltips, emails and a Drive folder link :: https://drive.google.com/drive/folders/1D32Vs9joWehiGe0PutoecSckS-CyS171
PASS clicking again closes it
PASS every person/company name is in a census file :: 
PASS every email is in a census file :: 76 emails; missing 
PASS every client name traces to the census :: 
PASS every last-contact line names its source file, and that file exists :: Miguel Zaldivar, MZ Solutions LLC, Victor Seijas, Synergy General Contracting (Synergy GC), Kathryn Slack, TEDC (Tacolcy Economic Development Corporation), Daymara Yhanes Ureta, Frank Izquierdo
PASS last-contact snapshot renders, dated, newest first, sourced :: 8 lines
PASS no ###-##-#### strings on CLIENTS :: 
PASS no 16-digit runs (or 4-4-4-4 card groups) on CLIENTS :: 
PASS no phone numbers on CLIENTS :: 
PASS no dollar amounts on CLIENTS :: 0
PASS 375px no sideways scroll on CLIENTS (closed, all cards open, filtered) :: 375 / 375 / 375
PASS 0000 money lock intact (locked, no amounts visible) :: {"open":false,"mz":34,"shown":0,"leak":false}
PASS CLIENTS BUILD box shows 100% :: 100%
PASS no page errors :: []
  CLIENTS 3 of 3 (100%)
BUILD NOW 84 of 116 = 72%
RESULT ALL PASS
```
### Existing
- phone-width-test.js: RESULT ALL PASS
- menu-glossary-test.js: RESULT ALL PASS
- money-lock-test.js:
```
locked: visible dollar amounts across 26 tabs = 0  masks on page: 34
wrong: That is not the zone code.
open: visible amounts on USAGE = 4
relocked: visible amounts = 0
ERRS []
```

Generator (scratch, not in repo): `/tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/panel-clients/gen.py`

Should the runner republish the panel now?
