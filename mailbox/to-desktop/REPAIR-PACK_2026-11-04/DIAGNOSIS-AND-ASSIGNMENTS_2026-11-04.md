# DIAGNOSIS AND ASSIGNMENTS - "everything is dead" - 2026-11-04 (Cloud, TRK-2026-10017)

## Section A. What the evidence says (read from Drive 22:43-22:48 ET, minutes old)
1. **The machinery is alive.** PC up 83 hours, no sleep. Poller green 22:48. Reconciler green 22:43. RAMBO active 1 min ago, Orchestrator 16 min, Local executor 3 min, Chat 4 min. 38 results written in 12 h. 0 open blockers. Burn-Rate report ran at 7 AM on 11-02, 11-03, 11-04.
2. **What is really dead or failing:**
   - **COWORK**: silent since 10-13 (32,382 min). The executors file says no channel reaches it. This is structural, not a crash.
   - **LOCAL lane (Ollama)**: OCR-CATCHUP job on 11-03 17:00 ET timed out after 301 s on mistral:latest. Screenshot shows RAM 76% (24.2 of 31.9 GB) with many Claude/node windows open.
   - **A mis-routed job**: BACKLOG-01 retry on 11-03 16:15 ET named model `claude-sonnet-5` on the LOCAL lane. Ollama cannot serve that name, so it returned 404 in 3.5 s. The BLOCKED note blamed memory. That note is a generic excuse, and it is wrong for a 404.
   - **Panel task board**: P0 items (T-20261010-11, -09, T-20261015-01) show BUILDING at 60%, 10%, 5%, 20-25 days late. I found no build record for them in the repo. Nobody has proved they are being worked.
3. **The panel's Org status page is stale** (snapshot 10-31) and says Orchestrator is down 44 h. The live file says it is active. The panel misreports; the system does not.

## Section B. Root cause
**Alive is not productive (RI-002, RI-015).** Every health check here asks "is the process running?" None asks "did output grow, and did the job succeed?" So a lane can fail every job while every light stays green, and a dead seat (Cowork) can stay on the roster for 3 weeks. Failed jobs also give a false reason, which sends people to the wrong fix.

## Section C. Three options (Rule 4: RI-015 is logged 4+ times, so no patches)
1. **Tier 1 - restart and re-run by hand.** Lifespan: days. Fails because nothing is broken at the process level; the next job fails the same way.
2. **Tier 2 - remove the causes.** (a) Remove COWORK from required seats and route its work to Chat/RAMBO. (b) Replace the generic "not enough free memory" text with the real error class (404 = model not installed; timeout = memory). (c) Reject any LOCAL job whose MODEL is not in `ollama list` before it runs. Lifespan: permanent. **Recommended, with option 3.**
3. **Tier 3 - enforce on a schedule.** Add a "productivity heartbeat" to CU-Handover-Gate: for each lane, count successes vs BLOCKED in the last 3 h and write one line to STATE-OF-PLAY. Lifespan: lasts while the task is enabled; re-check it daily (RI-015).

## Section D. Who does what (recommended agent level)
- **Level 1 - Ollama LOCAL (free, small model).** Text only. Cannot run scripts. Assign nothing risky. Use it only to summarize the three DIAG reports once they exist. Keep prompts short; it is the lane that is currently timing out, so run step 02 first.
- **Level 2 - Codex (`codex exec`, ChatGPT pool, not Claude).** Runs the read-only scripts 01, 02, 03, 05 and returns the report paths. Do not put the words send, pay or delete in its prompt; it refuses those (STATE-OF-PLAY / Org status note).
- **Level 3 - RAMBO (Claude Code on the PC, Opus).** Reads the three reports, then applies repair 04 (preview first, then -Apply) and the Tier 2 edits to the poller and Handover-Gate scripts with a `.bak-YYYYMMDD` copy and a rollback script first. Claude is scarce, so RAMBO does only what Codex cannot.
- **Cloud (me).** Plans, checks the reports when they land in VTES-Outbox, and updates the panel.

## Section E. Order of operations
1. Codex runs 02 first (does the LOCAL lane answer at all?), then 01, 03, 05. All read-only, all write one new report to VTES-Outbox.
2. RAMBO reads the reports. If 02 shows free RAM under 6 GB or several models loaded, RAMBO runs 04 as preview, then `-Apply`, then restarts Ollama and re-runs 02.
3. RAMBO applies Tier 2 (a), (b), (c) using the paths 03 reports.
4. Cloud checks the result, with the denominator (jobs OK of jobs run in the last 3 h).

## Section F. "Unit 305" (the second ask)
**05 only lists candidates. It files nothing.** "305" matches at least three properties: 10185 Collins Ave Unit 305 (TRK-2026-1265), 2055 SW 122 Ave #305 (Descarga, a different job), and 13276 Old Biscayne Dr 305. Filing on "or similar" is forbidden by the charter. Rows with no property hint need Jorge's yes before any move or tag.

TRK-2026-10017
