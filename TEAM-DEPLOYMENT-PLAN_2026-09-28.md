# TEAM DEPLOYMENT PLAN — who does what, and how we notice when it stops

**Written 2026-09-28 by ☁️ Cloud (planning and quality-check window), under PASTE-X-008.**
**Sources read for this plan:** `CLAUDE.md`, `OWNER-GATES.md`, `AGENT-AUTONOMY-BOUNDARY.md`,
`NIGHT-PROTOCOL.md`, `OVERNIGHT-QUEUE.md`, `OPEN-ITEMS.md` (rows 9959–9963),
`MORNING-REPORT_2026-09-28.md`, and the live list of scheduled routines (15 enabled).
**No new systems.** Every role below uses something that already exists.

#JorgeValdes #team-deployment #night-protocol

---

## Section A — The answer in four lines

1. **Cloud (this window) plans and checks.** It never runs overnight and never touches the PC.
2. **Desktop runs the night queue** as a Windows scheduled task on DESKTOP-OTB90LR.
3. **Cowork handles email and the connected services** (Gmail, Outlook, Drive, Calendar, Plaud).
4. **The night engine is broken right now, and two words from Jorge fix it.** See Section E.

---

## Section B — The three roles

### Role 1 — ☁️ Cloud: planning and quality checks

- **May do alone:** read the repo and Drive, count, reconcile, write plans and reports,
  write work orders into `mailbox/to-desktop/` and the VTES-Inbox, spot-check other agents'
  DONE claims against the real file, keep `OPEN-ITEMS.md` current.
- **Must park for Jorge:** everything RED (see Section D). Cloud also never issues a real
  TRK number, because the registry lives on the PC.
- **Results written to:** this repo. That means `OPEN-ITEMS.md`, `MORNING-REPORT_<date>.md`,
  and the mailbox folders.
- **How we notice if it stops:** the existing routines "Hourly check" (daytime) and
  "Overnight hourly" (4–10 UTC) wake a cloud session every hour. If no morning report exists
  by 8 AM, Cloud has stopped.

### Role 2 — 🖥️ Desktop (RAMBO): runs the night queue

- **May do alone:** the GREEN list. That covers OCR where the TRK is known from the folder
  path, counting, enumeration, surveys, reports, drafts that are held, and any write to a
  brand-new file.
- **Must park for Jorge:** filing, moving, renaming or deleting a client document; anything
  outbound; spending; credentials. These go to the one daily yes/no list.
- **Results written to:** the VTES-Outbox in Drive, one file per item as each finishes.
  Cloud mirrors them into the repo because the Desktop cannot push (TRK-2026-9082).
- **How we notice if it stops:** `heartbeat.json` in the VTES-Outbox. It must change every
  20 minutes. The Cowork Watchdog already checks it every 4 hours and emails Jorge.
  **A night run counts as alive only if its output file is growing.** A running process
  alone does not count.

### Role 3 — 🤝 Cowork: email and the connected services

- **May do alone:** read and search every mailbox, sort, draft replies (held, never sent),
  build contact sheets, pull Plaud transcripts, run the watchdog, and continue the CDM build.
- **Must park for Jorge:** sending anything to anyone other than Jorge, moving or deleting
  mail, and signing up for or paying for anything.
- **Results written to:** MY-DESK and the VTES-Outbox in Drive (`WATCHDOG-LATEST.md`,
  `COWORK-CDM-PROGRESS.md`).
- **How we notice if it stops:** every Cowork routine records success or failure. Cloud
  reads those records each morning. **One is already failing:** the Plaza progress-report
  drafter failed on 9/23, and the next report is due **Wednesday 9/30**.

---

## Section C — Night rules (unchanged from `NIGHT-PROTOCOL.md`, restated)

1. **At least 12 hours of work queued** before the night starts.
2. **Each item writes its result the moment it finishes.** A run killed at item 40 leaves 39.
3. **Alive means the output file is growing.** No growth for three checks = hung. Kill it,
   log it, start the next item.
4. **Every night ends with a report that says "X of N".** A night with no report is a failed
   night.

**Tonight's queue, in priority order.** It uses no new systems.

1. **Wally pipeline:** the 1,912 unsafe-structure owners (TRK-2026-9224). Group them by
   property type and lien status. GREEN, because it only writes new files.
2. **Cash collection:** check each invoice number on the spine for a matching payment in
   mail. Read-only.
3. **JOB-0079 pilot:** nothing new tonight. It waits on gate REG-0002.
4. **Filler, if the first three finish early:** Queue A OCR. That means PDFs already inside
   a `01-JOBS\TRK-2026-NNNN\` folder only, as `OVERNIGHT-QUEUE.md` §1 says.

---

## Section D — GREEN and RED

- **GREEN, do and report:** reading, searching, counting, drafting (held), reconciling,
  staging, new files, and reversible changes that are backed up.
- **RED, park in ONE daily yes/no list:** anything outbound, spending, applying for credit,
  credentials, signing, moving or deleting client documents, real TRK numbers, widening
  security, and anything touching tax filings or a company's state.
- **Never:** full card, account or SSN numbers in any file. Never DONE without a file path,
  a count, or output. If an action is refused, stop and say so.

---

## Section E — What failed last night, and why the night runs stopped

**Root cause: the PC's watchers are down. The PC itself is on.** Source:
`MORNING-REPORT_2026-09-28.md` and OPEN-ITEMS rows 9959 and 9962.

1. **The inbox poller (`VTES-LOCAL-POLLER`) no longer exists.** The scheduled task is gone,
   not paused. Nothing picks up new work, so work orders pile up unread.
   **Fix: Jorge says "yes, rebuild the inbox poller."**
2. **The heartbeat task came back on a temporary patch.** It will not survive a restart.
   **Fix: Jorge says "go ahead, make the heartbeat task permanent."**
3. **The job-watcher (`CU-Inbox-Job-Watcher`) is off on purpose.** It is waiting for a
   safety gate (PR #10, `APPROVED-JOBS.txt`). No action is needed tonight.

**Why earlier fixes failed:** each fix was applied by hand in a live session. None was
installed as a permanent scheduled task, so a restart wiped each one. That is the RI-015
pattern (a scheduled task that dies without anyone noticing). **The Tier 2 fix is to
rebuild the task properly once, and that needs Jorge's word.**

---

## Section F — Overlap found (quality check)

1. **Too many check-ins watch the same things.** Fifteen routines are enabled, and at least
   four one-off check-ins from different sessions each watch the heartbeat or PR state.
   **Recommendation:** after tonight, the Cowork Watchdog is the only thing that watches the
   heartbeat. The one-off check-ins lapse as their PRs close.
2. **Two sessions are working on invoice C2026170181 (10980 SW 202 DR, Unit 29).** One is
   the fee-review email; the other is the rework-upload work order Cloud wrote today.
   OPEN-ITEMS row 9963 already warns about sessions colliding on live documents.
   **Recommendation:** Desktop checks with Jorge before starting the upload order.
3. **The six Cloud work orders from 9/26 still reuse TRK numbers that were already taken.**
   See `mailbox/to-cloud/RECEIPT_CLOUD_…_2026-09-28.md`. They stay parked.

---

## Section G — The 17 owner gates, in the order they free work

**How to answer:** say the gate and one word: **approve**, **modify** or **defer**.
**Caution:** these recommendations were written 7/31. Anything touching money or
credentials deserves a fresh look before you act.

1. **REG-0001** — paste the OpenRouter API key into Claude Code. Frees **12** jobs.
2. **REG-0002** — give Cowork access to `01-JOBS`. Frees **8** jobs.
3. **REG-0004** — paste the Gemini API key into Bus-KeyVault. Frees **5** jobs.
4. **REG-0005** — set the pre-approved spending cap (PREAUTH-20260727-01). Frees **4** jobs.
5. **NEW-01** — REISkip skip trace, batch 1, **up to $34.95**. Frees **3** jobs. *Wally.*
6. **REG-0007** — iPhone: switch password AutoFill to 1Password. Frees **3** jobs.
7. **REG-0006** — send the COI refile email to RER Licensing. Frees **2**. *Cash.*
8. **NEW-02** — REISkip skip trace, batch 2, **up to $63.90**. Frees **2**. *Wally.*
9. **REG-0012** — decide whether to correct old mistakes in client reports. Frees **2**.
10. **NEW-03** — send the 5-report email to Wally and Alec, which sits in Drafts. Frees **1**. *Wally.*
11. **REG-0009** — confirm the Buttons 9/10/13 install. Frees **1**.
12. **REG-0010** — confirm the Dropbox auto-installer watcher. Frees **1**.
13. **REG-0008** — re-login list. Recommended **modify**: re-log in as each app asks.
14. **NEW-05** — confirm Zoho is dropped. Frees **0**; this only closes the line.
15. **REG-0003** — recommended **defer**. It has been superseded.
16. **NEW-04** — recommended **defer**. Nothing needs it.
17. **REG-0011** — recommended **defer**. Only two documents are involved.

**Two night-engine gates that are not in the seventeen**, but that decide whether tonight
runs at all:

- **N-1:** "yes, rebuild the inbox poller"
- **N-2:** "go ahead, make the heartbeat task permanent"

---

## Section H — Not covered in this plan, on purpose

Dropbox shutdown, iCloud, 1Password takeover, and the email clean-up were all raised today.
**PASTE-X-008 says to start no new systems,** so they are not scheduled here. Two are already
tracked: the Dropbox→OneDrive merge is TRK-2026-9147, and 1Password is gate REG-0007. The
Dropbox auto-renew date is the one item with a clock on it. It needs Jorge to read the
renewal date off his Dropbox billing page.

*TRK-2026-TBD — this plan needs a registry number from the PC. Cloud cannot issue one.*
