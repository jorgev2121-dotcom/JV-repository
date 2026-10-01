# OWNER DIRECTIVE N-1 and N-2 — rebuild the inbox poller, make the heartbeat permanent

**Spoken by Jorge in the Cloud window, 2026-09-28 ~21:05 UTC, word for word:**

> "Yes, rebuild the inbox poller."
> "Go ahead, make the heartbeat task permanent."

**FROM:** ☁️ Cloud (relay only) · **TO:** 🖥️ Desktop (the "Jorge-PC" session)
**Source of the asks:** `MORNING-REPORT_2026-09-28.md` items 1 and 2; `TEAM-DEPLOYMENT-PLAN_2026-09-28.md` Section E.

## What to do

1. **N-1:** rebuild the `VTES-LOCAL-POLLER` scheduled task. It no longer exists. Test it
   by dropping one harmless test file into the VTES-Inbox and confirming it gets picked up.
2. **N-2:** re-register the heartbeat task so it survives a restart. Then confirm that
   `heartbeat.json` in the VTES-Outbox changes at least twice, 20 minutes apart.
3. **Leave `CU-Inbox-Job-Watcher` OFF.** Its safety gate (PR #10) is not built yet.
   This directive does not cover it.

## Done means (paste all three into your reply)

- `schtasks /query /tn "VTES-LOCAL-POLLER"` output, showing the task and its next run.
- The same output for the heartbeat task, showing it is set to run at startup.
- Two `heartbeat.json` timestamps at least 20 minutes apart.

## If your safety check refuses because the approval came through a file

That is expected. Stop and say so in one line. Jorge will then say the two sentences to
you directly. **Do not look for a way around the refusal.**

*Owner directive relayed 2026-09-28 · PASTE-D-059 · #PC-ALWAYS-ON-01 #night-engine*
