# RESUME NOTES for EXEC-01 after context compaction (written 2026-11-02 02:4x AM EST, context 736k of 784k)
Read CLAUDE.md first, then this file, OPEN-ITEMS.md (bottom rows), drafts/2026-11-01/_STATUS-REGISTRY.md, exec-01/PRE-MORTEM_2026-11-02.md.

## Who/what
☁️ Cloud executor (EXEC-01), session_01DUB8NQHkiANrQ9LQZnK1Ho, branch claude/pensive-allen-tyjgl4, PR #14 draft open. Jorge Valdes: non-technical, text-to-speech, answer first, short paragraphs, END EVERY MESSAGE WITH A QUESTION, label paste blocks PASTE-D-nnn (latest PASTE-D-075, in PASTE-LOG.md).
Two hourly triggers: WATCH :16 (mail both boxes, panel db task-comments "new", Outbox EXECUTED_/BLOCKER_/CLAIM_/REPLY, self-test at UTC 00/06/12/18 with probe selftest-probe-YYYYMMDDHH), RUNNER :41 (Drive heartbeat file in Outbox 1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN, get_session rate limit, update exec-01/HEARTBEAT.md line 5, BUILDER-LOG, EXEC-LOG, USAGE-LEDGER, commit, push). Push works since Jorge said "allow the push" (2026-11-01).

## Panel (artifact https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj)
Live = v63 (version id 1793555224-57ac): red read/dictate dot + Back/Forward buttons + Speechify-style Read Aloud window (drag from any empty part). Rollbacks: v62 1793554630-9d2f, v61 1793553946-e8ac, v60 1793469478-4aee.
TEST COPY https://claude.ai/artifact/AXQNpypU2ajR8Q2V6Atx8Z = v63.2 (drag-any-window, NEW badge). Rule (CLAUDE.md sec 20 item 6): versions go up by .1; build on the test copy; publish to live only after Jorge says it works.
Jorge's local file "VTES Control Panel V61.8 2026-10-31.html" (C:\Users\JV\VTES-NeedsYou\) is a separate lineage with the business/personal split and "Page 39 OCR Layer Status". PC copy to Drive is queued. Plan: merge (newest wins, nothing lost, _MERGE-LOG.md), call result V61.9. Medication Refills belongs on the PERSONAL side.
Icons: tools/readaloud/icons/*.ico + Make-Panel-Icon.ps1 + Install-Read-Aloud.ps1, delivered by PASTE-D-075 (needs RAMBO signed in).

## Blockers only Jorge can clear
1. RAMBO signed out of Claude Code: open RAMBO (Claude Code Beige) and run /login. All PC jobs wait (mailbox/to-desktop/WORK-QUEUE.md newest items: icon hunt, panel icon, snip 3, OCR count, V61.8 copy, 5 product-approval lookups).
2. Say "recreate" to rebuild 4 ACCESS_DENIED scheduled tasks (Filing engine health, Weekday check, Task sweeper, County-watch).
3. Four answers: Pasadena Notice of Commencement (record/wait); "13 units" count vs PH11 finaled 10-15 + which Bay Harbor unit; 14598 checklist four one-liners; yes/no to email Pembroke Pines about PE seal. Drafts in drafts/2026-11-01/ (A2 partial, A3, A5, B3, D1-D2).
4. Orchestration plan (Drive 1ZJWpd1sibdxFdTfU_1AIx8iSFnMRdvaD) lists 10 approvals; none answered.
5. Personal: CVS three sender numbers merge (iPhone Contacts > Link Contacts); file personal/PERSONAL-REQUESTS.md.

## Standing owner directives added 2026-11-01
MERGE-AND-INDEX-01 (CLAUDE.md sec 21): merge duplicates, newest wins, master panel is only the index, folder names end with date+TRK, hashtags in _TAGS.md. Moving/renaming client docs = RED.

## Next due
06Z self-test was pass 71. 12Z self-test: plant selftest-probe-2026110212. OCR check 5 fails after 16:10Z Nov 2 if no new .SEARCH.txt. Morning digest to Jorge about 7:16 AM ET. Daily pre-mortem written (2026-11-02); next one 2026-11-03 at the 05:41Z run.

## RESUME NOTE 2026-11-08 18:2xZ (written because context reached 726k of 784k)
Cycle pattern: WATCH at :16 (mail Gmail+Outlook, panel task-comments new, Outbox new files, RAM guard, uptime), RUNNER at :41 (panel query, Drive heartbeat `_EXEC-01-HEARTBEAT_<date>T<HHMM>Z.md` in VTES-Outbox 1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN, repo logs, commit and push). Self-test at UTC 00, 06, 12, 18: plant `task-comments/selftest-probe-<YYYYMMDDHH>` at the watch, answer at the runner (batch: set reply-selftest-probe-<id> + update original with if_version 1).
Open probe: selftest-probe-2026110818 (answer at 18:41Z runner).
Waiting on Jorge: RAMBO window (PASTE-D-064), RAMBO's eight one-word items, Natalie draft SEND/HOLD, Unit 307 job folder, My Office build yes/no on TEST COPY, Grok panel-sync handoff YES (TRK-2026-1016-SYNC-01), roles lock with 0000.
Facts: RAM guard dips AMBER at each :16 (local AI engine loads), first RED 3.75 GB at 18:15Z 11-08, pushed once. Four scheduled tasks denied (Filing engine check, Weekday check, task sweeper, County-watch). OCR files stalled since 11-05. QC-01 audit 11-08 WARN fixed: write Drive EXEC-LOG_<date>.md and PRE-MORTEM_<date>.md every day (done for 11-08: Drive 1l6qUUipHzKRE2HUy88xdXfCxB06bWXpF and 1NLuAEkyf4N3Cn0d5fOATaIzMjq9L8d7C); at the next 04:41Z runner write the 11-09 pair and add the rest of 11-08's lines.
Rules in force: no PC orders unless RAM guard GREEN; no money lines in emails/logs; no outbound to third parties; panel changes only on test copy; never log a line before the event.

## Refresh 2026-11-09T18:2xZ (1:2x PM ET Mon) for the next context window
- Cycle pattern unchanged: WATCH at :16 (mail Gmail+Outlook, panel, Outbox for EXECUTED/BLOCKER/CLAIM, RAM guard), RUNNER at :41 (panel new, Drive heartbeat named from the exact `date -u +%H%M` value, repo logs, commit+push). Self-test at UTC 00/06/12/18: plant `selftest-probe-<YYYYMMDDHH>` at the watch, answer it (reply doc + update if_version 1) at the next runner. Latest: pass 101 (6 of 10), probe 2026110918 planted 18:17Z, answer at 18:41Z.
- Fails that stay unchanged and are NOT re-alerted: check 5 OCR (no .SEARCH.txt since at least 11-07), check 6 four scheduled tasks ACCESS_DENIED (Filing engine daily check, Weekday check, task sweeper, County-watch).
- Waiting on Jorge: CDM answer (is application 2027-246S Edison Towers II selected in RFA 2026-205; the 10:35 AM ET 11-09 working time passed; three reminders sent, reminders STOPPED); yes/no on fixing the hourly :15 PC memory dip (RECURRING-ISSUES.md last line, recommend option 1 = move or stop the task that loads the local AI engine at :15); Natalie Baez draft SEND or HOLD; My Office build yes/no; Plaza Unit 307/602 job folders; Grok sync YES; roles lock with 0000; 1Password/QuickBooks approvals. RAMBO window: Jorge is signing Claude Code back in himself (11-09 ~9:32 AM ET), stop asking.
- Jorge is active at his PC today: voice orders go through Grok Bot (Talent Discovery) which files JOB-NEXT_* work orders in VTES-Outbox for Claude Code/RAMBO/others; none are addressed to the cloud EXEC-01 seat, so do not answer them.
- QC-01 audit 11-09: WARN (8 verified, 3 unverified, 0 failed). Answered with Drive EXEC-LOG_2026-11-09 (id 1rpKXx-PDIkNh4tPmDlMDJiwqThi4Hixd) in the fuller format: time, color, what, why, proof, rollback, result. Keep that format; write the Drive log for each new day at the first runner after 04:00Z; the 11-09 Drive log covers up to 12:25Z so a part 2 is due.
- Rules that stay: no dollar amounts anywhere, no log line before the event happens, name heartbeats from the real clock value, push once per RED outage (hourly :15 dips at night are logged only), RED items prepared only, no third-party sends, panel changes only on the TEST COPY.
