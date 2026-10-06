# WINDOW LLM-03 · Claude Cowork · ANALYST — diagnosis (stage 1, cloud agent)

Read-only. Written 2026-10-06 about 03:50 UTC (11:50 PM ET on 10-05, Drive clock). Nothing was changed anywhere except this file. Every claim names its source; anything I did not read myself is marked UNVERIFIED.

## 1. Verdict

**ACTIVE as a scheduled routine. Confidence: MODERATE.** It is a clock-driven routine, not a window anyone can talk to.

1. **Freshest file I read:** `COWORK-CDM-PROGRESS.md` (ID 1_qcm0fSY4kxi2Qar5VY5TACaw8wHJ4Zd), run 103, written 10-05 9:31 PM ET (01:31Z). That is about **2 h 20 min old**. Its own text says the next run is the 1:15 AM ET slot (about 1.5 h from now).
2. **Freshest signal of any kind:** STATE-OF-PLAY.md (ID 1Unf8pWzRfiTp7MtuEQ1vRUuhsOFP2Ho4, auto-written 10-05 23:34 ET) says "COWORK | 10-05 22:56 | 37 min - active | Handover on file: none". That is inside 60 minutes. **I could not find which file or event made the 22:56 stamp. UNVERIFIED.** The only seat-gate script (Handover-Gate.ps1) is on the PC.
3. Why not higher confidence: Cowork leaves a trace only when a run finishes. Between runs it is silent by design, so "quiet" does not mean "dead".

## 2. Identity

1. **Registry (LLM-WINDOW-REGISTRY_v2.md, ID 142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2):** LLM-03 is "the Cowork window in the Claude desktop app", long documents and analysis, **CDM owner (COWORK-CDM-OWNER-01)**, may drive Chrome with Jorge's permission, writes MSG-COWORK-TO-CODE orders into VTES-Inbox. Paste prefix PASTE-X, orange X tray icon, address `vtes://llm-03` (registry says "paste your Cowork window address into vtes-addresses.json", i.e. not filled in).
2. **Executors file (ID 1ewQGj43s0tYzGlbp2E3DS4idmtt5Ztmi, 10-01):** COWORK row reads "no channel exists; cannot receive". STATE-OF-PLAY repeats it on 10-05.
3. **What it really does (12 boards read, runs 80 to 103):** a scheduled routine fires about every 4 hours, reads the Outbox, writes a board and CDM files to MY-DESK, and files orders to the desktop. **It originates work; it never receives work.** It reads replies by pulling the Outbox on its next slot.
4. **Model:** every board says it runs on `claude-fable-5-1` (see defect 5).

## 3. What the panel or header would need to show, and where it cannot be right

1. **"Active / inactive" has no single meaning for LLM-03.** The registry card implies a window you can open and talk to. The truth is a routine with six firings a day. The right header is: "Scheduled routine. No inbox. Last board: run N, time, age. Next slot: time. Slots missed in last 24 h: N."
2. **Source for that header:** modifiedTime of the un-numbered `COWORK-CDM-PROGRESS.md`. **Not** the numbered copies `(N)`: the board itself calls them a desktop-sync "resurrection" defect, and they skip runs (no copy for runs 96, 99, 100).
3. **It is not in HEARTBEAT-ROSTER.json** (ID 1apeD19ETuYUwvPaopbrWMIAUeCl6jJWm lists only VTES-LOCAL-POLLER and RECONCILER). The routine lives in Cowork's own scheduler, not Windows Task Scheduler. Mirror of 2026-09-05 (TO-CLOUD_MIRROR_2026-09-08.md line 5226): "Cowork is not installed here (Get-ScheduledTask matching 'owork' returns 0)". So any panel dot for Cowork that reads a desktop task is wrong by construction.
4. **A seat row built like RAMBO's cannot be right.** "Handover on file: none" is permanent for Cowork (it cannot run Handover-Gate.ps1), the same trap found for Chat. Orchestrator false flag #4 (RECURRING-ISSUES.md line 2293, 10-05) was filed against a Cowork board as if it were a job.

## 4. Defects found

**Question 1 — Is an order assigned to a window that cannot receive orders a structural fall-through? YES. Evidence: what happened to the Phase 2 order.**

1. **The order** `MSG-COWORK-TO-CODE_VTES-CONTROL-PANEL-REBUILD_ENHANCEMENTS_2026-09-26.md` (ID 16S1yuc6bxT8GeuFxqsYk8LirBKyDO2wS, created in VTES-Inbox 09-26 20:21Z, due 10-03) says "Assignment: Cowork + RAMBO (desktop for build, Cowork for testing)", "Execution plan: Assigned to Cowork", "routed to Cowork per DIR-0091", "Confirmation to follow after assignment acknowledged". Filename says Cowork to Code. Body says Cowork does it. **Nobody owns it.**
2. **What happened, step by step:**
   - It sat unread in the Inbox. The only reader of the Inbox is the desktop poller/watcher.
   - **Auto-ACK 10-01 4:25 PM ET** (ID 14xLs51upovlarjPh9f3lu-bUmNfIwAGe), **4 days 20 h after filing**, identical to 37 other ACKs the poller posted in one second when it restarted (poller-2026-10-01.log, ID 1y4C6sM6E4ZwRfdrYaNUb0Z-uMsWEvWEx). Text: "Queued for Claude Code's next work session." A receipt closes nothing (executors file rule).
   - **No CLAIM, EXECUTED, BLOCKED or validation report ever followed.** Drive title/text searches for PANEL-REBUILD, ENHANCEMENTS, VALIDATION-REPORT find only the order and that ACK.
   - **Cowork never touched it.** None of the 12 boards I read mentions it or `ControlPanel.html`. Cowork's routine is scoped to CDM. Cowork also cannot receive.
   - 10-02 history doc (ID 19sjnV2k910YE6BZyxa1hG7ksu16-sx2i, item 6): "Auto-acknowledged ... but not built."
   - **Due date 10-03 has passed. It is 3 days overdue and still QUEUED.** Nothing, not Orchestrator, STATE-OF-PLAY ("Open blockers: 0") or the panel, shows it as stuck.
3. **Control experiment, same week:** the 10-02 order `MSG-COWORK-TO-CODE_DESKTOP-EXECUTOR-SHORTCUT-AND-PANEL-RESTORE` (ID 1bxK5YJWKSsiOoCBDsUkChd1eruuxgBdy) was written "To: RAMBO". It closed **EXECUTED-WITH-PROOF in about 6 minutes** (order 14:42Z, EXECUTED file ID 1JSGu5FeScaOoSH32stuCb8GLE31GfABv at 14:48Z). **An order addressed to a window that can receive closes in minutes; one assigned to Cowork does not close in 10 days.**
4. **Two more faults in the same order, even if someone picked it up:** it targets `ControlPanel.html`, but RAMBO's reports show the live panel is `VTES-CONTROL-PANEL-HOME.html` (history doc Section A item 3: "Unresolved: the desktop must confirm"). And the 10-03 panel work happened elsewhere (hybrid build 10-02). Its "128 tiles" count and the source spec `SPEC_VTES-Panel-Rebuild_AssignedToGrok.md` are on the PC. UNVERIFIED.
5. **Why this is structural, not a one-off:** DIR-0091 "Cowork leg" was recorded NOT DONE on 09-05 (mirror line 5226). The routing rule can name Cowork, but no lane exists to carry the work. Severity: **high** for trust; **it blocks the panel Phase 2 work Jorge asked for**.

**Question 2 — How often does Cowork miss its slots?**

6. **Slots are every 4 h at 1:15, 5:15, 9:15 AM and PM ET** (boards say "Next run (1:15 AM ET)" etc.; runs finish about 10 to 20 min later). From 10-02 1:15 AM ET (run 82) to 10-05 9:15 PM ET (run 103) there are **24 slots**. Result:
   - **15 slots have a board** (11 read in full, plus run 80 earlier; runs 82, 91, 96, 100 proved by file times or the next board).
   - **7 slots left nothing:** 10-02 5:15 AM; **runs 85 to 89 in a row (10-02 5:15 PM through 10-03 9:15 AM)**; 10-04 5:15 AM (runs 93 and 94 are consecutive numbers across it).
   - **1 slot did work but wrote no board:** run 84 (10-02 1:15 PM; work at 17:23 to 17:35Z, recorded only in run 90).
   - **1 slot UNVERIFIED:** run 99 (10-05 5:15 AM). Run 101 says runs 97 to 100 wrote boards, but I found no file or time for 99.
7. **Worst gap:** run 83 board (10-02 9:35 AM ET) to run 90 board (10-03 1:35 PM ET) = **28 hours with no board**. Run 90's own header: "runs 85-89 left nothing; run 84 never rewrote this board". It logged it as "a routine-health defect on Cowork's side". Cause UNVERIFIED.
8. **Not new.** RECURRING-ISSUES.md lines 876 to 885 (RI-015, fifth instance): run 53 self-reported ROUTINE-OUTAGE-02, **no firing 09-21 about 5 PM through 09-26 about 9 AM, about 30 missed runs**, nobody noticed. So this is at least the **third** outage on Cowork's scheduler (09-21 to 09-26; 10-02 to 10-03; the 5:15 AM misses). Charter Rule 4 applies: patches are forbidden; see section 6.
9. **Pattern worth checking:** the 5:15 AM ET slot misses on 10-02 and 10-04 and is unproven on 10-05. Hypothesis, UNVERIFIED: the routine does not fire when the PC or the Fable pool is down (LLM-USAGE-INVENTORY.md line 45: Fable pool "0%" on 09-23; the pool is smaller and separate from the main pool).

**Question 3 — Were the board's "Code lane stalled" claims correct?**

10. **Run 94 (10-04 9:28 AM ET): WRONG, and Cowork says so itself.** Header: "Code lane missed an 8-hour window: reissue #1 filed." Evidence from the Outbox: order M2-V3-ADOPT filed **05:25:16Z** (ID 1f6FLoilkWEoSnqwDcjeqkvZ-I4ETnoxN). **CLAIM 05:27:40Z (2 min 24 s later, ID 1SHuDFTSXPGgK7wdUEvvCKrCw9aUcLFVL), auto-ACK 05:27:49Z, PARTIAL 05:33:12Z (ID 1b3HblebT7ThOfaAMekTNYK8guTpCAEYt), EXECUTED 05:39:18Z (ID 1i17Vk5gDETF7R5ZDMnhf5kc83mlS3Gz_), 14 min after filing.** Run 94 wrote "no claim/ACK/REPLY at 13:26Z (8.0 h)". Run 95 (ID 1yfVIjxEbqsjo9Xg6B_DiWifqzL0L_BVw) admits: "Run 94's state check missed them... The desktop pointed this out and re-did the work, which cost it two passes." Cause: the check searched by modified time, not by the order's name. **Cost: a false stall order and a duplicate desktop pass (RI-037 per the board, UNVERIFIED beyond the board).**
11. **Run 80 (10-01 5:35 PM ET): half right.** Board (ID 1asdo29goqhJbMMXJKmzjXRGo8RWO4E8d) declared "STALLED 18.3 h", BRIDGE-INCIDENT CDM-BI-2026-10-01, third reissue 21:20:41Z, owner email "VTES GO — CDM stalled" about 21:21Z, telling Jorge to open Claude Code and paste PASTE-D-059. True: no CDM artifact since 03:02Z. **But the poller had restarted at 20:25Z (55 min before) and the desktop answered reissue #3 in 18 minutes**: EXECUTED file ID 1IKC83GDD3c5Cg44IUXRIPulnk12BG4dt created 21:38:41Z, "started by the JOB-0079 Section D watcher". **Jorge was asked to act when no action was needed.** The same file records that Cowork and RAMBO did the same job at the same time and collided; and Cowork filed a reply under the RAMBO name (identity blur).
12. **Correct stall calls:** runs 83, 90, 92, 93 said NOT STALLED with reasons that match the Outbox.
13. **Desktop reply times I verified:** claim 2.4 min and execution 14 min (V3-ADOPT, 10-04); about 8 min (M2 port, 10-02, per run 83); about 9 min (M2-V1-ADOPT, 10-02, per run 90); 23 min (DENSITY-01, 10-05, per run 101); 80 min (FILL, per run 98); 3.6 h (V16-X37A8, per run 97). **The stall rule is a fixed 8 hours, while real answers come in minutes when the watcher is alive and never when it is dead.** It cannot tell "dead" from "slow" from "done and I did not look".

**Question 4 — Fable**

14. **Every board I read ends: "owner-directives memory says 'Do NOT use Claude Fable 5.1' (9/13) and 'Fable for QC/review only' (9/26). This routine still runs on claude-fable-5-1. Cowork has not changed it; that needs Jorge's word."** That is all 12 boards I read (runs 80 to 103), a standing note nobody has answered. **I could not find the 9/13 or 9/26 directive text in Drive or the repo (UNVERIFIED; the board is my only source).** The one Fable directive I did find (OWNER-DIRECTIVE_FABLE-REVIEW-OVERRIDE-COUNCIL-PROJECT-01, ID 11GuwT9vJ61SYaZOI2r_I4gcKSZxmgsZN, 09-16) makes Fable the QC approver and says its weekly pool was at 100%. Six firings a day on the small Fable pool is long unattended work on the pool Jorge says is not for that. **Severity: medium; a plain conflict between a standing routine and an owner directive, and Cowork says it may not fix it itself.**

**Other defects**

15. **Cowork wrote under another seat's name.** Run 80 era: "REPLY-TO-CHAT filed by Cowork under the RAMBO name" (ID 1IKC83... text). Two seats, one name, found in a collision. Severity: low.
16. **The 10-02 order "From: COWORK (cloud)"** (ID 1bxK5YJWKSsiOoCBDsUkChd1eruuxgBdy) was written by a Cloud session on Jorge's word, not by the Cowork routine, yet carries the COWORK prefix. A filename prefix is not proof of which window wrote a file. Severity: low, but it makes any "last Cowork activity" count unreliable.
17. **Numbered board copies** "(N)" pile up in the Outbox (copies 3 to 36). They hide which file is newest and confuse any panel that searches by title. Severity: low.

## 5. Could not be checked from the cloud (and the exact PC check)

1. **Why runs 85 to 89 and the 5:15 AM slots did not fire.** On the PC: open Claude desktop app, Cowork, Scheduled, the CDM routine, run history for 10-02 5:15 AM to 10-03 9:15 AM ET and 10-04 5:15 AM ET. Report each run's status and error text. Also read the uptime heartbeat for sleep gaps in those windows.
2. **Which model the routine is set to** (same screen). Read it back.
3. **What made the 22:56 ET COWORK stamp** in Handover-Gate: open `C:\Users\JV\OneDrive\Scripts\Handover\Handover-Gate.ps1`, find the lines that fill the COWORK row, report the file or folder and timestamp it reads.
4. **Which file is the live panel** (`ControlPanel.html` or `VTES-CONTROL-PANEL-HOME.html`) and whether `ClaudeMemory\SPEC_VTES-Panel-Rebuild_AssignedToGrok.md` exists.
5. **What the live panel and launcher card for LLM-03 read for its dot** (`VTES-CONTROL-PANEL-HOME.html`, `VTES-LLM-LAUNCHER_v3.html`). I could not open either.
6. **Directive text for Fable** (9/13, 9/26): memory file on the PC.

## 6. Proposed repairs (proposals only; nothing done)

1. **Replace the Cowork dot with a fact line:** "Scheduled routine, no inbox. Last board: run N, age. Next slot. Missed in 24 h." Source: modifiedTime of the un-numbered board. GREEN, reversible. Tier 2 (removes the false signal).
2. **Close the Phase 2 order as ORPHANED and re-file it "To: RAMBO"** with the verified target file and a due date; Cowork keeps only an optional test role. A new Inbox file is GREEN; the desktop's own gates cover the build. Reversible.
3. **Add a router check:** any `MSG-*` whose body says "Assigned to Cowork" gets a BLOCKER ("no lane"), not an ACK. Edits a desktop agent: RED, reversible with `.bak`. Tier 3.
4. **Make the stall rule smarter** (run 95 already added "search the Outbox by order name"): also count a CLAIM, ACK or poller green heartbeat as life; wait for the poller to be green for 2 h before any reissue or owner email. Needs Jorge's word to change the routine: RED, reversible.
5. **Move the routine off Fable 5.1** as the directive says, or ask Jorge to retire the note. RED (routine setting), reversible. Tradeoff: the main Claude pool is the scarce one (75% on 10-01), so this may cost more than it saves; Cowork cannot decide it.
6. **RI-015 recurrence (third Cowork outage): charter Rule 4 requires three options, one of them remove or replace.** (a) **Remove:** retire the 4-hour routine and run CDM only when Jorge or an order asks; permanent, loses the automatic loop (Tier 2). (b) **Replace:** move the routine to a Windows scheduled task with a heartbeat in the roster; durable but spends Claude Max and needs the PC awake (Tier 3). (c) **Enforce:** a watchdog that flags when the board is older than 5 h and shows the count on the panel; lifespan weeks, detects but does not prevent (Tier 3). I recommend (c) now plus (a) for any slot that misses twice. Add a dated line to RECURRING-ISSUES.md. GREEN to log.
7. **Hide or purge the numbered board copies** from the panel's source list. GREEN (display filter), reversible.

## 7. Question for Jorge

Do you want the Cowork routine moved off Fable 5.1 now: yes or no?

TRK-2026-9960 · v1 · 2026-10-06 · DIAGNOSIS (stage 1, cloud agent)
