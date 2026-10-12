# MSG-CLOUD-TO-CODE — RAISE THE CLAUDE RUN CAP (Rambo 1, Claude lane only). DO THIS FIRST.
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12
Lane: CLAUDE ONLY. Codex: do not run this; leave it unhandled.
Owner context: Jorge's usage page on 2026-10-12 shows Max 20x at 18% of the week, 10% of the session. The Anthropic limit is not the problem.

## The cause
Inbox-Codex-Failover.ps1 (PASTE-D-064) stops the Claude lane after 12 headless sessions a day ("12 of 12 sessions used"). On 10-09, 10-10 and 10-11 that counter was spent between 12:24 AM and 1:48 AM. Every order after that went to Codex, which has no Drive access, and was then marked handled.

## Do
1. Find where the 12-a-day number lives (the watcher and/or Inbox-Codex-Failover.ps1). Back up each file as .bak-20261012 first.
2. Change the Claude daily cap from 12 to 40.
3. Do not count a Claude session that exits in under 2 minutes with no output file.
4. Keep the hold rule: client or Drive orders wait for Claude; a Codex decline is NOT handled.
5. Proof: write EXECUTED_RAMBO1_RAISE-CLAUDE-RUN-CAP_2026-10-12.md to VTES-Outbox. Include the before and after lines of each changed file, and today's Claude session count.
6. Undo: restore the .bak-20261012 files.

## Strongest objection, so you can watch for it
Forty runs could eat the weekly allowance. On 10-12 the week stood at 18% used. If the weekly figure passes 70% before Thursday, drop the cap back to 20 and say so in the EXECUTED file.

Did the change take effect at the next tick?
