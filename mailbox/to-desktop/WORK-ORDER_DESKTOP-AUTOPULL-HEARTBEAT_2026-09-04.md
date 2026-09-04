# WORK ORDER — Desktop heartbeat: auto-pull the repo + auto-reply, so Jorge is out of the middle
**TRK-2026-9772 · issued by ☁️ CLOUD 2026-09-04 · for 🖥️ DESKTOP + 🐏 RAMBO**
**Owner goal (2026-09-04):** the two Code seats hand off to each other automatically; only RED
decisions reach Jorge. See `HANDOFF-PROTOCOL_TWO-SEAT-01.md`.

## The one thing that removes Jorge from the desktop side
Right now the repo only updates when Jorge opens the terminal. Build a **Windows Scheduled Task** that
gives the desktop its own heartbeat:

1. **Name:** `VTES-Repo-Heartbeat`. **Every 10 minutes.** Run-if-missed ON, restart-on-failure ON,
   **run whether logged on or not.** (This is the acceptance test — report the task name + next run
   time, per JOB-0096 style: if you can't name both, it isn't built.)
2. **Each run, a script does:**
   - `git fetch` + fast-forward `git pull` on `claude/slack-app-overview-3i0w4g` (read-only if the
     ordered-pull block file is still present — then log that it is blocked and stop, don't force).
   - Scan `mailbox/to-desktop/` for files newer than the last run. For each: action per its **RED/GREEN**
     line — **GREEN** (read/count/OCR/stage/tag) it just does; **RED** (pay/move/send/delete/credential)
     it stages to the approvals board and waits for Jorge's click. Never cross the line unattended.
   - Write replies/close-outs to `mailbox/to-cloud/` using the protocol filename grammar, then
     `git add/commit/push`.
   - Append a one-line pulse to `TO-CLOUD.md` (human log) with the run time and what it did/found.
3. **Guardrails:** the heartbeat is GREEN to *build* and GREEN to *run for read/stage* work; it must
   **never auto-execute a RED action**, never `git push --force`, never resolve the Caso-lane stand-off
   or the parked git-pull block on its own. Those stay owner/þexisting-directive gated.
4. **Health:** if a run fails or the working tree is dirty in a way it can't fast-forward, write a
   `FINDING_DESKTOP_heartbeat-stalled_<date>.md` to `mailbox/to-cloud/` so Cloud surfaces it to Jorge.
   A silent dead heartbeat is the failure mode to avoid (RI-002 pattern).

## Pairs with the Cloud heartbeat
Cloud will run its own scheduled check-in to read `mailbox/to-cloud/`, do the Gmail/Drive/Outlook work
the notes ask for, and push handoffs back to `mailbox/to-desktop/`. Between the two heartbeats, a
handoff round-trips in ~10 minutes with no paste from Jorge.

## Reporting
Report build + first run via `mailbox/to-cloud/` and TO-CLOUD.md, three-state. Proof = the scheduled
task name and its next run time.

#TRK-2026-9772 #desktop-heartbeat #auto-pull #two-seat-handoff #out-of-the-middle
