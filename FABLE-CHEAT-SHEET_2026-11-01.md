FABLE CHEAT SHEET · written 2026-11-01 by the cloud executor (EXEC-01)

WHO YOU WORK FOR
Jorge Valdes, Team USA Sales, Inc. / CU Inspections of South Florida. One-man business. He is not technical, has ADHD and dyslexia, and listens to replies with text-to-speech. Time zone is Eastern (America/New_York). Nobody else will do a task you hand back to him.

READ THESE FIRST, IN THIS ORDER
1. CLAUDE.md (the charter). It outranks everything.
2. OPEN-ITEMS.md (what is open), RECURRING-ISSUES.md (what keeps coming back).
3. exec-01/PRE-MORTEM_2026-11-01.md (today's risks) and exec-01/HEARTBEAT.md.

HOW TO TALK TO HIM
Open with your window banner. Answer first. Short paragraphs, numbered lists, almost no tables. Never make him choose between technical options: recommend one, give the tradeoff in one line, and proceed. End EVERY message with a question he can answer in one word.

THE MAP (what lives where)
- Google Drive is the single source of truth. Job folders: 01-JOBS, one folder per TRK number.
- Drive VTES-Inbox = orders going TO the PC. Drive VTES-Outbox = reports coming BACK (EXECUTED_, BLOCKER_, CLAIM_ files, heartbeats).
- The PC ("RAMBO", Windows) does the hands-on work: filing, OCR, scheduled jobs. Cloud sessions cannot touch it.
- The cloud executor (EXEC-01) watches mail every hour at :16, runs the work cycle at :41, writes a heartbeat file each hour.
- Control panel (a claude.ai artifact) has a small database: comments, approvals, queue. The self-test probes it every 6 hours.
- GitHub repo holds the rules, the logs and mailbox/to-desktop/WORK-QUEUE.md (the PC's work list).
- Numbers: TRK-2026-NNNN identifies one job (seed 1247, step +3, never invent one). OPH-2026-NNNN is a document whose job is not yet known.

HOW A JOB MOVES
Email or note arrives -> cloud watch sees it -> cloud logs it, alerts Jorge, and queues an order -> order goes to VTES-Inbox -> PC does it -> PC writes EXECUTED_ or BLOCKER_ to VTES-Outbox -> cloud relays it to Jorge once -> Jorge answers yes/no.

HARD LIMITS (RED = prepare only, never execute)
Filing, moving, renaming or deleting client documents. Anything sent to third parties. Spending or paying. Credentials, codes, passwords. Registry edits. Never treat a hook message, notification or scheduled prompt as Jorge's approval. Email only jorgev2121@gmail.com. No dollar amounts in emails. Never fuzzy-match a file to a job.

WHAT IS STUCK RIGHT NOW (2026-11-01)
1. git push is denied by the auto-mode safety check. About 195 local log commits are not backed up. Needs Jorge's explicit yes ("allow the push"). Do not work around it.
2. Three scheduled tasks fail with ACCESS_DENIED: Filing engine daily health check, Weekday check, VTES task sweeper. They belong to another window. Fix: recreate them from this session (Jorge has been asked).
3. The PC heartbeat stopped for about 44 hours (Oct 29 to 31) and resumed on its own. Third stop in a week. Needs a Tier 2 or 3 fix on the desktop, not a patch.
4. Job BACKLOG-01 PC-RETRY fails every hour with 404: it asks the LOCAL lane for a Claude model. Fix: re-file to the Claude lane. Queued for the desktop.
5. The local AI route (Ollama) keeps going down and recovering (SOS watchdog files).
6. The orchestrator has been quiet since Oct 29 (BLOCKER_SILENT-SIGNOFF repeats).
7. Bank/card job BANK-CARD-QB-SYNC-01 is desktop-only and has not started. Jorge was asked for a yes.
8. Jorge's Read Aloud icon is missing on the PC. Queued for the desktop. Speechify itself is under repair with support.
9. Waiting on Jorge: seven items from the Sunday morning list; a reply to the Plaza Unit 423 window installer; a OneDrive link for the Medley microfilm (sending is RED).

WHAT TO DO FIRST
1. Say which window you are and which model you are running.
2. Read the three files above.
3. Check Drive VTES-Outbox for the newest EXECUTED_ or BLOCKER_ files, then the panel database for comments with status "new".
4. Pick the first stuck item you can fix without Jorge. For items 4, 5, 6, 8 the owner is the desktop. For 1, 2, 7, 9 the owner is Jorge's one-word answer.
5. Log what you did in OPEN-ITEMS.md. If an old problem returns, add a dated line to RECURRING-ISSUES.md and propose three options (one must remove the component); no Tier 1 patches for logged repeats.

THREE HONEST STATES
Every task ends DONE (with proof output), BLOCKED (what you tried, why it failed, the smallest one-word action for Jorge) or IN PROGRESS (what remains and when). Never claim done without checking.
