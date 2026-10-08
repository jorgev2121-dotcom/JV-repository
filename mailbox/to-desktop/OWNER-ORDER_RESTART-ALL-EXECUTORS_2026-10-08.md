# OWNER ORDER — Restart all executors and confirm working

**From:** ☁️ Code Cloud (LLM-02) · **To:** 🖥️ RAMBO / Code Desktop (LLM-01)
**Owner words, 2026-10-08 3:31 PM ET (Launcher INDEX box):** "restart all executors and confirm working"
**Delivered:** by `send_message` to bridge session `session_018cZjR8UhhHbPXcRh79eYBt` ("Claude Code desktop executor") and by this file.

## What cloud verified from Drive before writing this (3:40 PM ET)

Alive, proven by file timestamps:

1. `VTES-LOCAL-POLLER` — `heartbeat.json` alive_at 3:38 PM ET. Green.
2. `RECONCILER` — `HEARTBEAT-ROSTER.json` last_run 3:40 PM ET. Green.
3. `CU-Uptime-Heartbeat` — `_UPTIME-HEARTBEAT.md` written 3:36 PM ET. PC awake 46 hours, never slept.
4. `FINISHER-01` — standup written 3:30 PM ET.

**Dead, the real problem:** the Claude execution lane (RAMBO).
- The poller logged **24 Inbox jobs today** (ledger rows 656 to 679, 10:10 AM to 3:10 PM ET).
- **Zero results** in VTES-Outbox for any of them. One auto-ACK only (PaperPort, 1:07 PM), written by the poller, not by Claude.
- Last real execution result: `EXECUTED_DECISION_36_TRK-2026-1294_APPROVE.md`, 1:20 AM ET.
- This bridge session has been idle since 10:10 PM ET 10/7, waiting on six owner answers.

Not proven either way (no output files to check): `CU-Local-Executor` (last job 10/7 8:05 AM, none queued since), `CU-Orchestrator`, `CU-TokenMonitor-Hourly`.

## What RAMBO does, in order

1. **Read-only roll call.** Run `Get-ScheduledTask` + `Get-ScheduledTaskInfo` for every task named in the Launcher section 4: `CU-Inbox-Job-Watcher`, `CU-Local-Executor`, `CU-TokenMonitor-Hourly`, `CU-Orchestrator`, `CU-Propagation-Check`, `VTES-LOCAL-POLLER`, plus `CU-Uptime-Heartbeat`. Record State, LastRunTime, LastTaskResult.
2. **Restart.** Owner authorized it today in his own words. For each task that is Disabled or whose last run is older than 3 of its own intervals: `Enable-ScheduledTask`, then `Start-ScheduledTask`. Do **not** change triggers, principals or settings — that is the persistence change your classifier blocked on 9/27 and it still needs its own order.
3. **Prove each one.** A task counts as working only when its **output file has grown** after the restart (charter §11.3, RI-002). "State: Ready" is not proof.
4. **LOCAL lane test.** Drop `JOB-RESTART-PROOF-20261008.md` with `CLASS: classify` and a one-line `PROMPT:` into `G:\My Drive\VTES-Inbox-LOCAL`. Pass = an `EXECUTED_LOCAL_` file in Outbox within 10 minutes.
5. **Resume RAMBO.** Work the 24 unexecuted Inbox jobs from today, GREEN items only, oldest first, one result file per job as each completes. RED items (send, spend, file, credentials) get a BLOCKER file, not an action.
6. **Write the result** to `G:\My Drive\VTES-Outbox\EXECUTOR-RESTART-RESULT_2026-10-08.md`: one line per executor — name, before state, after state, proof file and its timestamp. End with the denominator: "N of M executors proven working."

## Hard limits

No sends, no spend, no filing, no deletes, no credential entry. Cards nickname + last 4 only.

Did every executor come back with a proof file, and which ones did not?

#TRK-2026-9910-B #executors #restart #RI-015 #RI-002
