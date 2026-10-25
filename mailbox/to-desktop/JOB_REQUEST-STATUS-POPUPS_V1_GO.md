# JOB_REQUEST-STATUS-POPUPS_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10053 (admin band) · #Popups #RequestStatus
Paste pointer: PASTE-D-070 (one block, shared with the filing-engine job)
Return path: `REPLY-TO-CHAT_JOB_REQUEST-STATUS-POPUPS_V1.md` in VTES-Outbox, with proof.

## What Jorge asked for

Regular pop-ups, every 5 or 10 minutes, so he can see that each of his requests has been **logged**, **assigned**, **scheduled**, is **running**, or is **done**.

## Cloud's design choice: every 10 minutes, but only when something changed

**Objection to a fixed 5-minute pop-up, recorded per Rule 3:** a pop-up that appears whether or not anything happened trains the eye to dismiss it. It also interrupts Speechify while it reads. **Adopted:**

1. **Check every 10 minutes.** Show a pop-up **only when a request has changed stage** since the last check.
2. **A short "All quiet" pop-up every 30 minutes** when nothing changed, so Jorge knows the watcher itself is alive.
3. **A red pop-up straight away** for BLOCKED or anything that needs Jorge. It stays on screen until he clicks it.

## Where the stages come from (no new database; it reads what agents already write)

The watcher reads the Drive bridge folders `G:\My Drive\VTES-Inbox\` and `G:\My Drive\VTES-Outbox\`, and matches files to each job by its job name:

- **Logged:** a `JOB_*.md` or `VTES-JOB_*.md` is in VTES-Inbox.
- **Assigned:** an `ACK_*` or `*.ack.json` exists for it, naming the agent.
- **Scheduled:** the job file has an ETA or a time, or the ACK has one.
- **Running:** a check-in or `PARTIAL_*` file is newer than the ACK.
- **Done:** an `EXECUTED_*` or `REPLY-TO-CHAT_*` file with proof.
- **Blocked:** a `BLOCKER_*` or `RED-CARD_*` file.
- **Stuck** (shows as amber): Logged for more than 30 minutes with no ACK, or Running for more than 3 hours with nothing new.

## The pop-up itself

- A Windows notification (toast). It must not take focus, steal the clipboard or play a sound while Speechify is reading (SPEECHIFY-PRIORITY-01).
- **Plain words, at most 3 lines.** Example: "Speechify fix: ASSIGNED to Joey, 10:52 AM. Desktop sweep: RUNNING, 14 of 412 items."
- Clicking the pop-up opens **the book**, page 38, the Programming Requests Monitor: https://claude.ai/artifact/XE6QRfTbaKswTgFn62wnTz
- Also write each stage change as one line to `G:\My Drive\VTES-FILING-ENGINE\REQUEST-STATUS.jsonl`, so the cloud can show the same list in the book.
- **Phone:** send to the phone only the red "needs you" pop-ups and the "done" ones, not the 10-minute ones.

## Schedule

- A Windows scheduled task, "VTES-REQUEST-POPUPS", every 10 minutes while Jorge is logged in.
- **Persistence change:** Jorge types his own OK on the PC before it's created.
- Before that OK, run it once by hand and show the first pop-up as proof.

## Proof for DONE

1. A screenshot of one real pop-up with real job names.
2. The scheduled task's name and next run time.
3. The first 3 lines of REQUEST-STATUS.jsonl.

Close out in three states only.

RAMBO: when will the first pop-up show on Jorge's screen?
