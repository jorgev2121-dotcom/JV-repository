# TEAM-ROSTER · EXEC-01
#EXEC-01 #TEAM-ROSTER #VTES #INFRASTRUCTURE

**As of:** 2026-10-14, 08:49 AM Eastern. Written by EXEC-01 (cloud lane).
**Rule (charter section 3, rule 6):** a seat idle for 14 days is retired unless it has a written reason.
**Sources:** this account's scheduled-task list (read 12:48 UTC today), AUDIT_QC-01_2026-10-14, BUILDER-LOG, RECURRING-ISSUES, the panel's CONNECT cards, WATCHDOG-FOUND.md, TO-CLOUD_MIRROR_2026-09-04.md.
**Cost:** no money amounts in this file. "Flat fee" means it runs on the Claude Max plan, with no per-use charge.
**"unknown"** means neither the repo nor Drive shows it.

---

## Section A — Cloud seats

### A1. EXEC-01 (this seat)
- **Purpose:** run the whole system and fix problems before Jorge finds them.
- **Runs:** cloud, session_01DUB8NQHkiANrQ9LQZnK1Ho. It uses the runner (A2) and the watch (A3) as its cycle.
- **Cost:** flat fee.
- **Reports to:** Jorge. Checked by QC-01.
- **Rollback:** stop the runner and the watch (A2, A3). No separate schedule exists.
- **Added:** 2026-10-14. **Retired:** no.

### A2. Cloud always-on work runner
- **Purpose:** hourly work: P0 items, capsules, decisions, panel pieces, overnight queue.
- **Runs:** cloud, scheduled task trig_01EdLXoKjFM3nNsVywHHYz7T, every hour at :41, inside session_01DUB8NQHkiANrQ9LQZnK1Ho.
- **Cost:** flat fee. Throttled by the session's budget reading.
- **Reports to:** EXEC-01 (before today: Jorge). Logs to control-panel/BUILDER-LOG.md.
- **Rollback:** turn the scheduled task off (enabled = false). Run history is kept.
- **Added:** 2026-10-13 (13:31 UTC). **Retired:** no. Last fired 12:41 UTC today.

### A3. Cloud watch (mail arrivals, RAMBO queue, panel, Orange Tree)
- **Purpose:** hourly Gmail and Outlook arrivals check; looks for real PC receipts in VTES-Outbox; relays them once.
- **Runs:** cloud, scheduled task trig_01VTtAhauH65mx7o1CxPx2jj, every hour at :16, same session.
- **Cost:** flat fee.
- **Reports to:** EXEC-01 (before today: Jorge).
- **Rollback:** turn the scheduled task off.
- **Added:** 2026-10-10 (20:15 UTC). **Retired:** no. Last fired 12:17 UTC today.

### A4. QC-01 independent audit
- **Purpose:** checks that what was claimed actually happened. Files AUDIT_QC-01_<date> daily.
- **Runs:** cloud, scheduled task trig_016GJDaaGSp21zj4dp6WsGYg, daily at 6:51 AM Eastern, a fresh session each time, Sonnet model.
- **Cost:** flat fee.
- **Reports to:** Jorge. **Not** to EXEC-01. EXEC-01 may not edit its files or schedule.
- **Rollback:** turning it off is RED (charter section 2). EXEC-01 will not touch it.
- **Added:** 2026-10-13 (22:20 UTC). **Retired:** no. Last run 10:52 UTC today: succeeded, result WARN.

### A5. 6 PM summary
- **Purpose:** one daily summary to Jorge at 6 PM Eastern, instead of a message per batch (his choice).
- **Runs:** a duty of the runner (A2), per the 15:10Z addendum to STANDING-ORDER_ALWAYS-ON-WORK-RUNNER. **No separate scheduled task for it was found** in the enabled list read today. Whether one ran on 10-13 is unknown.
- **Cost:** flat fee.
- **Reports to:** Jorge.
- **Rollback:** remove the addendum line.
- **Added:** 2026-10-13. **Retired:** no.

### A6. Other cloud scheduled tasks (exist today, listed so nothing is hidden)
1. VTES task sweeper, trig_01Ri9ipkXwqxhvJdV2eTLij2, 8 AM, noon, 4 PM, 8 PM Miami. Added 2026-10-10.
2. Weekday business-inbox triage, trig_011iBy66YmTH8JQSEFReXD8C, weekdays 7:30 AM. Added 2026-09-15.
3. Sunday 14-day look-ahead, trig_011SVNiLWXU3aich5RNf5AMW, Sundays 6 PM. Added 2026-09-15.
4. Plaza progress-report drafter, trig_01EmuP1YPUp1pMDVuEU8QaFr, Wednesdays 7 AM. Added 2026-09-15.
5. Medley owner report, trig_01YKD9ZHMDiKB4WN3gtEdazZ, 5th, 15th, 25th. Added 2026-10-08.
6. Books review, trig_01Cc8KuJGAcyWcPs6E64dFB3, every 3 days. Added 2026-10-08.
7. Weekly PR 14 and Grok inventory check, trig_01AkDFu35BaNGwCbS6WFzWDV, Thursdays. Added 2026-10-09.
8. One-time check-ins (county reply watch, PR #10 daily, weekday check, U.S. Bank, codex-login reminder).
9. **Disabled, kept for history:** RAMBO stall watchdog (trig_01NypY5isMYUmRmyJyDmRRsf, off since 2026-10-08) and four 10-02 overnight one-time runs.
- **Note:** the list had more pages than were read. Any further tasks are unknown here.

---

## Section B — PC seats (Jorge's Windows PC, DESKTOP-OTB90LR)

### B1. RAMBO (Claude Code desktop executor)
- **Purpose:** the hands on the PC: files, OneDrive, Chrome, printer, county sites, OCR.
- **Runs:** PC window "🖥️ DESKTOP EXECUTOR · LIVE on Jorge-PC (RAMBO)", session_01X9KWApDTq8SVpbHUxm4JAG.
- **Cost:** flat fee.
- **Reports to:** the cloud lane by VTES-Outbox receipts (EXECUTED_RAMBO1_ / BLOCKER_).
- **Rollback:** unknown (it is a window, not a schedule).
- **Added:** unknown. **Retired:** no.
- **Health:** silent. No RAMBO1 receipts since 10-10 (BUILDER-LOG). RI-031 note says it sat idle from 10-12, waiting for a "yes".

### B2. Codex lane (Codex CLI, via Inbox-Codex-Failover.ps1)
- **Purpose:** takes orders when the home-made Claude cap is used up.
- **Runs:** PC, headless.
- **Cost:** ChatGPT plan pool. Plan type unknown.
- **Reports to:** VTES-Outbox, as EXECUTED_CODEX_ files.
- **Rollback:** unknown.
- **Added:** unknown. **Retired:** no.
- **Health:** working but not useful for PC or Drive jobs. It refuses client details. **7 receipts on 10-13 say EXECUTED but the text says BLOCKED or PARTIAL** (QC-01).

### B3. CU-Inbox-Job-Watcher (the PC job executor)
- **Purpose:** runs Drive-inbox jobs headless.
- **Runs:** PC scheduled task.
- **Cost:** flat fee.
- **Reports to:** VTES-Outbox.
- **Rollback:** unknown.
- **Added:** unknown. Repaired 2026-10-06. **Retired:** no.
- **Health:** capped at 6 runs a day by a home-made counter. Cap used by 12:12 AM today (CAP-REACHED_2026-10-14). Gives up after 2 tries.

### B4. VTES-LOCAL-POLLER
- **Purpose:** picks up every new VTES-Inbox file and hands it to RAMBO.
- **Runs:** PC.
- **Cost:** free (local).
- **Reports to:** heartbeat.json and HEARTBEAT-ROSTER.json in Drive.
- **Rollback:** unknown.
- **Added:** unknown. **Retired:** no.
- **Health:** green. Last run 6:52 AM Eastern today (QC-01).

### B5. RECONCILER (RECONCILER-01)
- **Purpose:** ledgers new files, restores deletions, re-posts dead orders, flags stale parts.
- **Runs:** PC, every 30 minutes.
- **Cost:** free (local).
- **Reports to:** RECONCILER-REPORT_<date>.md and the heartbeat roster.
- **Rollback:** unknown.
- **Added:** unknown. Seen running by 2026-08-16. **Retired:** no.
- **Health:** green. Last run 6:40 AM Eastern today (QC-01).

### B6. CU-Handover-Gate
- **Purpose:** flags a seat that went quiet without a handover note.
- **Runs:** PC.
- **Cost:** free (local).
- **Reports to:** VTES-Outbox, as BLOCKER_SILENT-SIGNOFF_<date>.md.
- **Rollback:** unknown.
- **Added:** unknown. **Retired:** no.
- **Health:** working. Filed BLOCKER_SILENT-SIGNOFF_2026-10-14 at 6:44 AM Eastern.

### B7. Finisher stand-up (CU-Finisher-01-Standup and CU-Finisher-01-Sweep)
- **Purpose:** daily stand-up at 7:45 AM; sweep every 10 minutes.
- **Runs:** PC scheduled tasks, script C:\AI\scripts\MatterStage\Finisher-01-Sweep.ps1.
- **Cost:** free (local).
- **Reports to:** unknown.
- **Rollback:** unknown.
- **Added:** unknown. Seen running 2026-09-04. **Retired:** no.
- **Health:** unknown today. Known defect from 09-04: both tasks are set to run only while Jorge is logged in (LogonType Interactive).

### B8. Watchdog
- **Purpose:** notices stalls and re-queues work.
- **Runs:** PC. Which program the charter means by "VTES Watchdog" is unknown. WATCHDOG-FOUND.md (2026-08-16) names RECONCILER-01 as the watchdog. The panel also lists "Claude-RC-Watchdog" (restarts Remote Control if the PC session drops).
- **Cost:** free (local).
- **Reports to:** unknown.
- **Rollback:** unknown.
- **Added:** unknown. **Retired:** no.
- **Health:** unknown. QC-01 found no watchdog file in today's window.

### B9. ORCHESTRATOR (CU-Orchestrator, Chief seat)
- **Purpose:** routes queued jobs to the right lane.
- **Runs:** PC.
- **Cost:** flat fee or free; unknown which.
- **Reports to:** HANDOVER_ORCHESTRATOR.md.
- **Rollback:** unknown.
- **Added:** unknown. **Retired:** not yet.
- **Health:** **silent.** Handover note last written 10-07. Quiet 313 minutes at 6:44 AM today (CU-Handover-Gate). Idle-day count reaches 14 on 2026-10-21; then the retire rule applies unless a reason is written.

### B10. Cowork (Claude Cowork, analyst)
- **Purpose:** long documents and the CDM work.
- **Runs:** inside the Claude desktop app on the PC.
- **Cost:** flat fee.
- **Reports to:** VTES-Outbox replies.
- **Rollback:** not applicable.
- **Added:** unknown. **Retired:** no.
- **Health:** nothing hands it items automatically. Its approved items were moved to the cloud runner on 2026-10-13. Two CDM orders wait on Cowork answers (BUILDER-LOG 04:00Z).

### B11. iPhone (Claude iPhone, voice)
- **Purpose:** dictation and approvals on the go.
- **Runs:** Jorge's iPhone, same account as Chat.
- **Cost:** flat fee.
- **Reports to:** Jorge.
- **Rollback:** not applicable.
- **Added:** unknown. **Retired:** no.
- **Health:** in use (repeal order of 2026-09-23 came from it).

### B12. Also on the PC, known by name only
- CU-RAM-Guard (RAM limits for PC jobs). Health unknown.
- CU-Local-Executor and LOCAL Ollama (free local model). Ollama lane alive on 10-13 (BUILDER-LOG).
- CU-TokenMonitor-Hourly. Heartbeat missing (panel CONNECT "still missing").
- LiteLLM router. Primary down since 1:41 PM 10-13 (BUILDER-LOG). Today unknown.

---

## Section C — Seats added or retired today
1. **Added:** EXEC-01, no new schedule (reuses A2 and A3).
2. **Retired:** none.

Does this roster miss any seat you know about?
