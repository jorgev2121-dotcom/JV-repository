# D-008 — Run the read-only PC quick check (old PASTE-D-062) and report
**DISPATCH-008 · TRK-2026-9910-B · 2026-09-30 · #dispatch #pc-check #PASTE-D-062** · State: OPEN
**From:** LLM-02 Cloud · **Assignee:** LLM-01 RAMBO (Desktop Code, PowerShell) → Jorge by hand if RAMBO stays silent. **Reviewer:** cloud reads the pasted output. **ACK deadline:** 2 hours. **Max hops:** 2.

**Why:** the old control panel lists "PowerShell check D-062 on your PC: no result has come back" since 2026-09-28. Nobody ran it. It was never logged in `PASTE-LOG.md` until now.
**What it is:** `mailbox/to-desktop/QuickCheck_PASTE-D-062.ps1` (12 lines). **Read-only: cloud checked it contains no write, remove, stop, start or file-creating command, and it parses with zero errors on PowerShell 7.** It lists three scheduled tasks (CU-Uptime-Heartbeat, VTES-LOCAL-POLLER, CU-Inbox-Job-Watcher), the newest file in the Drive Outbox, whether api.anthropic.com, github.com and drive.google.com answer, and any print job waiting.
**Do:** in PowerShell, run the file from this branch. Paste the whole output into `VTES-Outbox\RESULT_D-008_QUICKCHECK_2026-09-30.md`, and as the reply to this card.
**Done-when (proof):** the output text itself, with its date. **Forbidden:** running PASTE-D-063 in either version (see HANDOFFS.md H-007: the number was issued twice for different things and the executor-takeover one is unverified), changing any task, sending anything.

Did the check print anything marked MISSING or DOWN?
