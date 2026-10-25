# JOB_DISPATCHER-NEXT-SLOT-RUN-TO-FINISH_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10056 (admin band) · #Dispatcher #RunToFinish #Popups
Directive: OWNER-DIRECTIVE_RUN-NEXT-SLOT-AND-FINISH-01 (charter §17). Read it first.
Paste pointer: PASTE-D-071
Return path: `REPLY-TO-CHAT_JOB_DISPATCHER-NEXT-SLOT-RUN-TO-FINISH_V1.md` in VTES-Outbox, with proof.

## What to build: "VTES Dispatcher"

**One small program that decides what runs next.** It replaces fixed start times.

1. **Queue:** it reads new `JOB_*.md` files in `G:\My Drive\VTES-Inbox\` (and the repo's `mailbox/to-desktop/`). It keeps `G:\My Drive\VTES-FILING-ENGINE\DISPATCH-QUEUE.json`, with one entry per job: lane, stage, current step, last saved item, and blocker.
2. **Every 2 minutes it checks for a free slot:**
   - the lane is idle (two GREEN read-only jobs may share one);
   - at least 25 percent of RAM is free, never counting Speechify's memory;
   - Speechify isn't mid-sentence when the job would grab the clipboard.

   When a slot is free, it starts the oldest waiting job straight away. A future start time is honoured only if the job file says `START-AT:` and also `APPROVED-BY: Jorge`.
3. **Run to finish:** each job lists its steps. The dispatcher moves to the next step by itself and records each step's result to disk the moment it ends. **A job is DONE only when its last step is DONE with proof.**
4. **Blockers:** if a step needs Jorge (a typed OK, a UAC click, a YES to a list, a RED step at night, the size brake, or a second hang), the dispatcher:
   - marks only that step BLOCKED and carries on with the steps that don't depend on it;
   - raises the **flashing pop-up** (below) and writes `BLOCKER_<job>_<step>.md` to VTES-Outbox;
   - checks every 2 minutes and resumes by itself once the blocker clears.
5. **Hangs** (charter Rule 8): if a job's output hasn't grown for 3 checks, kill it, restart it from its last saved item, and try once more. A second hang is a blocker.

## The flashing pop-up

- A red toast that stays until clicked (scenario "reminder" or "urgent"), plus a flashing taskbar icon (FlashWindowEx).
- Title "NEEDS YOU", with one line saying what's blocked and the one thing needed. Clicking it opens the book, page 38.
- No sound and no focus grab while Speechify is reading.
- Shares the code and the `REQUEST-STATUS.jsonl` log with JOB_REQUEST-STATUS-POPUPS_V1_GO (TRK-2026-10053). Build them as one program if that's simpler.

## Schedule

- A scheduled task, "VTES-DISPATCHER", every 2 minutes while Jorge is logged in.
- **Persistence change: Jorge types his own OK on the PC first.**
- Before that, run it by hand once over today's five queued jobs, as proof.

## Never

- Start a RED step without the approval that step needs.
- Close a program with unsaved work to free RAM.
- Mark a job DONE whose last step lacks proof.

## Proof for DONE

1. DISPATCH-QUEUE.json showing today's jobs with real stages.
2. A screenshot of one flashing "NEEDS YOU" pop-up (a staged test blocker is fine).
3. The scheduled task's name and next run time.
4. A log showing one job going through every step without a nudge.

Close out in three states only.

RAMBO: when will the first hand run over today's queue be done?
