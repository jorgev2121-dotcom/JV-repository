# MSG-CLOUD-TO-CODE — USAGE GOVERNOR: CONFIRM, THEN BUILD (Rambo 1, Claude lane only)
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12 · TRK-2026-9949 (Token Monitor / FOREMAN)
Lane: CLAUDE ONLY. Codex: do not run this.
Run AFTER RAISE-CLAUDE-RUN-CAP.
Jorge, 2026-10-12: "Confirm token and LLM monitor agent is in place and working. Once confirmed working, he should regulate usage between all the LLMs and rotate the LLM between roles, so we don't run out on any given LLM."

## What the cloud found (read-only, 2026-10-12)
- The 2026-09-26 Cowork directive "LLM-SUBSCRIPTION-MONITOR-AGENT" got only an AUTO receipt (10-01). There is no EXECUTED file, no LLM_TOKEN_MONITOR dashboard, no routing matrix and no usage log in Drive.
- Pieces that exist: ClaudeMemory\Governor\GOVERNOR-STATUS.txt and CAPABILITY-MAP_2026-09.md (both from 09-21), the ccusage report (9952d), and Inbox-Codex-Failover.ps1.
- The only "regulator" running is the 12-a-day counter, which switched lanes on a made-up limit while the real plan sat at 18%.

## Part 1 — Confirm (read-only, report first)
1. List every scheduled task or script with Governor, Token, Usage, Monitor, Foreman or ccusage in its name or body. For each one give: path, last run, last output time, and whether its output file grew in the last 24 h.
2. Read GOVERNOR-STATUS.txt and say when it was last written.
3. Verdict, one line: RUNNING / EXISTS-BUT-DEAD / NOT BUILT.

## Part 2 — Build or repair, minimal (back up first as .bak-20261012)
1. **Switch on the real signal, not a counter.** Fail over from Claude only when `claude` itself returns its usage-limit or rate-limit message. Log the exact text and the reset time it gives. Keep the run counter as a runaway guard only (40 a day, per the cap order).
2. **One ledger:** C:\Users\JV\OneDrive\Documents\Reports\LLM_USAGE_LOG.csv, one row per run: time, lane (RAMBO1-Claude / RAMBO2-Codex), order name, minutes, ccusage tokens for Claude, and outcome. Copy it to VTES-Outbox\_LLM-USAGE-LOG.csv each hour.
3. **Rotation rules:**
   - Client or Drive work: Claude only. If Claude is truly limited, it WAITS (CODEX-PII rule).
   - Non-client work: Codex first. Use Claude only if Codex has hit its own real limit and Claude's 5-hour window is under 50% used.
   - Claude Code and Cowork share ONE Max allowance (Jorge's page shows 50/50), so moving work between those two windows does not save anything. Do not "rotate" between them.
4. **Alert:** one email to jorgev2121@gmail.com, and nothing else, when any lane gets a real limit message. Include the reset time.
5. **Heartbeat:** VTES-Outbox\_USAGE-GOVERNOR-HEARTBEAT.md, rewritten every 15 min. It should say "last real limit hit: <time or none>" and show today's runs per lane.

## Proof
EXECUTED_RAMBO1_USAGE-GOVERNOR_2026-10-12.md with:
- The Part 1 verdict.
- Each file changed, with its backup.
- One test run per lane, as rows in the log.
- The heartbeat's first two timestamps, 15 min apart.
Undo: restore the .bak-20261012 files and disable any new task.

Is the heartbeat file growing every 15 minutes?
