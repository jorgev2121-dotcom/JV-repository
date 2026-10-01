# PASTE-D-063 — Executor takeover (owner order, final hand-off)

**Owner:** Jorge Valdes, 2026-09-28. **He is out of the middle from here.** Supersedes D-059, D-060 and D-062.

## Part 1 — Fix the engine (one script)

Run `mailbox/to-desktop/Executor-Takeover_PASTE-D-063.ps1` (branch `claude/vibrant-albattani-slgt2p`).
It is owner-authorized to:
- run the read-only check (the D-062 check);
- keep `CU-Inbox-Job-Watcher` Disabled;
- restart `CU-Uptime-Heartbeat` only if it is stale;
- **rebuild `VTES-LOCAL-POLLER` as a scheduled task that runs the existing
  `VTES-Bridge-Poller.ps1` every 5 minutes and at logon**, with an undo script written first;
- write `PASTE-D-062-RESULT.txt` and `EXECUTOR-STATUS.txt` to `G:\My Drive\VTES-Outbox`.

The script never sends anything, never spends and never touches client documents.

## Part 2 — Take over the night

Once Part 1 is done, work the GREEN night queue in `TEAM-DEPLOYMENT-PLAN_2026-09-28.md`
Section C, in this order: Wally lead list, then cash reconcile, then Queue A OCR.
- Write one result file per item to VTES-Outbox the moment that item finishes.
- Anything RED goes into `OWNER-DAILY-YESNO_<date>.md` in VTES-Outbox. Never act on it.
- End the night with `NIGHT-REPORT_<date>.md` that says "X of N".

## Rules

- A safety check that refuses a step: skip that step, write the refusal into
  EXECUTOR-STATUS.txt, carry on with the rest. Never work around a refusal.
- Never write card, account or SSN numbers.

*#PASTE-D-063 #executor-takeover #night-engine*
