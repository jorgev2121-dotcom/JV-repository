# SELF-TEST · the system tests itself so Jorge does not have to (2026-10-15)
Owner complaint, 10-15: "I have an agent that should be testing all of these programs. Why am I the one catching bugs?"
Root cause: no scheduled job ever tested a feature end to end. WATCH and RUNNER checked mail and Drive only. Every panel button that "relays on the next check" wrote into the panel database, and nothing read it (an orchestrator item sat 5 days at "queued"; comment T-20261015-01 had no reply).

Runs inside the hourly WATCH at 00, 06, 12 and 18 UTC (one full pass about every 6 hours). Step 0b (panel inbox) runs every hour.
Each check writes PASS or FAIL with a number to selftest/SELFTEST-LOG.md.
A NEW failure gets one push plus one Gmail to jorgev2121@gmail.com, and one line in the panel db `attention` collection. It is not repeated while the failure stays the same.
Fixable failures get fixed in the same run (GREEN only). RED fixes are queued with a one-line ask.

1. PANEL INBOX (end to end). In the panel db (artifact 321Zo6MTHdv9Mj3hGD1QDj), any `task-comments` doc with status "new" older than 70 min, or any `orchestrator/queue` item with status "queued" older than 70 min, is a FAIL: the relay is broken.
2. PROBE. Write `task-comments/selftest-probe-<YYYYMMDDHH>` {by:"SELF-TEST", status:"new", text:"probe"}. The next hourly step 0b must answer it (reply doc, status answered). If the previous probe is still "new", FAIL.
3. PANEL LOADS. Artifact read of the panel (path index.html) succeeds and is over 100 KB.
4. PC ALIVE. Drive VTES-Outbox `_UPTIME-HEARTBEAT.md` modified under 30 min ago.
5. OCR FLOWING. The newest `.SEARCH.txt` in Drive was created under 48 h ago. (FAILING since 10-05.)
6. SCHEDULED TASKS. list_triggers: any enabled task whose last_run is not SUCCEEDED is a FAIL, named.
7. MAIL WATCH. inbox-sweep/last-mail-check.txt is under 70 min old.
8. STATUS BOARD. Count nodes STALE (no report in 24 h) on artifact YKFqJDp6UfLFKrnEpub1WN. Report the count; FAIL only if it rises.
9. VIEWERS. Medley View All (2AwstRCwUPHJDFrZaMocuY) lists 101 page files.
Denominator line at the top of each run: "N of 9 checks passing".
