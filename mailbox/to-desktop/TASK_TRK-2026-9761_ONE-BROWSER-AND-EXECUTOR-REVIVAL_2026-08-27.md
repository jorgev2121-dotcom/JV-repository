# TASK — TRK-2026-9761 — One browser (Chrome), and the executor that cannot die
From: Cloud Code executor | To: the FIRST desktop Claude Code session that reads this | 2026-08-27
#TRK-2026-9761 #browser #executor-revival #JorgeValdes

**Jorge reports (2026-08-27): there is currently NO desktop executor running — they go
missing for days at a time.** Cloud's read of the root cause: executor sessions are
interactive terminal windows; they die on every reboot or closed window and NOTHING
relaunches them. They are not being "removed" — they are simply never restarted.
The permanent fix is the JOB-0079 loop itself: a Windows scheduled task (logon +
hourly) that launches Claude Code headless to work the queue, watched by the
heartbeat roster. **Whichever session reads this: that scheduled task is your first
deliverable, before all other queued work — it is the reason the queue keeps dying.**
Order of work for this session: ① JOB-0079 headless loop + logon task + roster entry
(the executor that cannot die) ② AUTONOMY-MAX orders (TRK-2026-9746) ③ 1Password
labeling (9752) ④ Dropbox Phase 1 survey (9755) ⑤ contacts merge (9758)
⑥ tray icons (9740).

## Browser ruling (Jorge's dilemma, decided)
**Chrome (CU-Business profile) is THE working browser. Edge is retired from daily
work** — not uninstalled, just demoted. Do: make Chrome the Windows default browser;
keep the Claude connection and the 1Password extension in Chrome; apply the
TRK-2026-9346 settings so Edge stops competing for saved logins; Claude is signed in
via Chrome only from now on. The "permissions bouncing between browsers" pain is two
browsers both claiming his logins — one champion ends it.

## 1Password sync answer (for the record, desktop verifies)
1Password syncs every change through its own cloud to ALL devices automatically —
PC and iPhone see a changed password within seconds; sync needs no configuration.
The weak link is CAPTURE: when a website has Jorge change a password, the 1Password
extension must be present in the browser and it offers to update the saved item —
which is why the extension lives in the one champion browser and iPhone AutoFill is
set to 1Password (all part of the 9346 six settings). Verify the extension is pinned
and signed in.

## Multi-LLM note (token crisis)
The LLM briefing pack ALREADY EXISTS: repo file `LLM-HANDOFF_2026-08-26.md` — it can
be pasted into free Gemini or ChatGPT web chats TODAY, no API needed, to put another
LLM to work on analysis and drafting. API lanes (Gemini key, Grok key) remain
ordered under 9746 Order 1. Do not build agent frameworks inside other LLMs — route
heavy ANALYSIS to them; execution stays with Code + PowerShell, which costs zero
tokens at runtime.

Report each numbered item to VTES-Outbox with artifact proof. Will you ACK with a
commencement stamp and, first, the scheduled-task proof for item ①?
