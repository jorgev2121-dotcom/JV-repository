# 01 INVENTORY - v3 launcher and panel, WORKS / DEAD / MISLABELED (TRK-2026-9910-B)

SOURCE USED: the REPO copy (branch executor-tray-icon-1cazza, tools/vtes-panel/, launcher footer "v4 2026-09-30", includes the v3 console).
The Drive copy VTES-LLM-LAUNCHER_v3.html (id 1uuH8C6gA-FtPhGoKIbRmhcN2GNtl6tBt) WAS READ and is NOT the launcher: it is an 889-byte page titled
"This copy was retired 2026-10-02" that redirects to file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html. The two .bak files beside it are 20 KB
(not 99 KB). So the "27 cards, 22 tabs" v3 Jorge pasted is UNVERIFIED from the cloud. Everything below is measured on the repo copy.

## Test run on v3 (BEFORE count). Script: test-everything.js. Raw: before-v3.json
Result: **71 of 79 pass, 8 fail** (VTES-LLM-LAUNCHER.html + VTES-PANEL.html).
- Launcher: 34 buttons clicked, 0 JS errors. 8 https links syntax-ok. 2 local links ok. 4 script files 404.
- Panel: 25 module tiles link to local files, all exist. 4 script files 404.
- The 8 failures: vtes-status.js, vtes-alerts.js, vtes-reviews.js, vtes-budget.js (launcher) and vtes-alerts.js, vtes-reviews.js, vtes-budget.js,
  vtes-verify.js (panel) return 404. These are DATA files a scheduled task on the PC writes; they are not in the repo. On the PC they may exist (UNVERIFIED).
  Meaning: header status, alerts, reviews, budget and file-integrity read nothing in this copy, and the page does not say "NO DATA" - it just goes quiet.
- https links are only syntax-checked (the cloud cannot prove third-party sites); they count as PASS-SYNTAX, not proof they load.

## Cards in the launcher (10 cards, not 27)
- LLM-01 Claude Code Desktop (RAMBO): **DEAD** - no clickable Open. A grey non-link span says "Open: Claude desktop app -> Code tab, or the green D tray icon". Address shown as plain text "vtes://llm-01".
- LLM-02 Claude Code Cloud: **WORKS** - https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf (syntax ok).
- LLM-03 Cowork: **DEAD** - span only, no link. Address text "vtes://llm-03" with "paste it into vtes-addresses.json".
- LLM-04 Chat: **WORKS** (https://claude.ai) but **MISLABELED**: opens the claude.ai home, not "your one cockpit conversation".
- LLM-05 iPhone: **DEAD by nature** (lives on the phone) - span only; honest, but it looks like a button.
- LLM-06 Codex: **MISLABELED** - Open button goes to chatgpt.com, but the card says the PC terminal shortcut is the thing; vtes-addresses.json points to a .lnk.
- LLM-07 Grok: link to grok.com **WORKS**; the card says nothing about the true state (registry: unproven 31 days) and no bots exist.
- LLM-08 Gemini: **WORKS** (https://gemini.google.com).
- LLM-10 Copilot: **WORKS** link; plan coverage UNVERIFIED (card says so).
- BUS: 2 Drive folder links (Inbox 1hI2TmVn..., Outbox 1NDadXJz...) syntax-ok.
- LLM-09 appears in the script's id list with no card (**gap**).

## vtes:// addresses
- 10 occurrences in the launcher; in this copy all are plain TEXT, not anchors, so nothing clickable is dead here. In the copy Jorge pasted they are reported dead (UNVERIFIED).
- Cause: VTES-Open.ps1 -Install (HKCU, no admin) was never run on the PC. vtes-addresses.json has EMPTY url/run for LLM-01, 03, 05 (RAMBO, Cowork, iPhone).
- **MISLABELED**: the page hint says "The vtes:// ones work from any link or Win+R once RAMBO installs them" but the cards show them as live addresses.

## Contradictory timings found in the file
- Card LLM-01 line 238: "Runs by itself every 15 minutes".  Registry (brief): poller ticks every 300 seconds (5 min).  Brief also cites "every 2 minutes" in the v3 text; that string is not in this copy (UNVERIFIED).
- v4 fix: no timing is typed; the interval is read from the heartbeat data file.

## Header / chips
- 9 chips (01-08 and 10) built from a typed list CHIPS. Their dot colour is set by vtes-status.js (404 here). With the file missing, nothing tells the user the dots are not live. **MISLABELED** header.

## Panel (VTES-PANEL.html): 25 module tiles, all local links exist (WORKS); the integrity box says "Not checked yet" without vtes-verify.js (honest). 
## Other pages (BUDGET, CAPTURE, INTERVIEW, MUNICIPALITIES, PORTAL, PROGRAMS, QUOTE, REMINDERS, TASKS, TREEMAP, WHERE): present, not retested in piece 1. They load the same 4 missing data files.
