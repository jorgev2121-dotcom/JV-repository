# VTES CONTROL PANEL — history, versions, and the latest

**Compiled 2026-10-02 by ☁️ Cloud (Claude Code) for Gemini and anyone taking over. Every line below comes from a file I read in Drive or the repo, named at the end of the line. Nothing here was checked on Jorge's PC, because cloud cannot reach it.**
#VTES-control-panel #history #handoff #LLM-08 #JorgeValdes

## Section A — The answer first

1. **The latest panel is a file on Jorge's PC, and cloud cannot copy it.** The RAMBO desktop report names it `C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html` (16,402 bytes after the 10:47 AM ET edit on 2026-10-02).
2. **A second copy of the panel lives in the cloud** as a private claude.ai page: https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj ("VTES Control Panel", published 2026-09-29). Gemini cannot open it unless Jorge shares it from the page's Share menu.
3. **Two files claim to be "the live panel".** One handoff says `ControlPanel.html` on the Desktop. RAMBO's report says `VTES-CONTROL-PANEL-HOME.html`. The screenshot Jorge sent shows the hybrid panel with the banner "Hybrid 2026-10-02", so HOME.html is the better bet. **Unresolved: the desktop must confirm.**
4. **Open defect right now:** the black header covers the tab row, so the ALL button cannot be seen or clicked. The fix is queued as PASTE-D-066.

## Section B — Version timeline, oldest first

1. **2026-07-08** — a desktop shortcut `_Open MDC DD Control Panel.url` points at `MDC-Property-DD-Report.html`. (Drive: `_Open MDC DD Control Panel.url`)
2. **2026-07-30** — JOB-0050 asks for three lists on the "VT Control Panel / ControlDesk": the Work Register (167 items), Agent and Orchestrator Status, and 30 started-not-finished jobs. (Drive: `JOB-0050_THREE-LISTS-TO-CONTROL-PANEL...md`)
3. **2026-08-29** — an older duplicate copy of the panel was published to the cloud. Marked "OLD copy - duplicate". (Panel's own report list)
4. **2026-09-01** — JOB-0090-R-A: rebuilt panel saved as `VTES-CONTROL-PANEL.html`, with a Desktop shortcut so typing "vtes" in Windows search finds it first. Also asked for a Remote Control status line. (Drive: `JOB-0090-R-A_PANEL-FINDABILITY_REMOTE-CONTROL_2026-09-01.md`)
5. **2026-09-02 08:52 AM Miami** — the last refresh of Nodes 1 to 11. The panel banner still says these nodes are "a 2026-09-02 snapshot" because the agent that refreshes them was switched off 2026-09-24. A stale copy `VTES-CONTROL-PANEL.html` sits in `C:\Users\JV\JV-repository`. (Panel banner in Jorge's screenshot; Drive: BLOCKER file 2026-10-01)
6. **2026-09-26** — Phase 2 order filed: tree index, frozen header with scrolling body, hover text, hashtags and lane colors, live ticker, tray icon. Target file `ControlPanel.html`. Due 2026-10-03. Auto-acknowledged by the poller 2026-10-01 but not built. (Drive: `MSG-COWORK-TO-CODE_VTES-CONTROL-PANEL-REBUILD_ENHANCEMENTS_2026-09-26.md`)
7. **2026-09-29** — cloud copy published with 22 tabs: MENU, TASKS, MYASKS, ORCHESTRATOR, LLMS, HANDOFFS, STATUS, APPROVALS, REPORTS, ORPHANS, LINKS, WINDOWS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES, BACKUP. (The cloud page itself)
8. **2026-10-01 14:10** — `VTES-CONTROL-PANEL-HOME.html` last modified. Backups made the same day: `.bak-20261001`, `.bak-20261001-b`, `.bak-20261001-c`. A "Results: Sunbiz / clerk / PACER / DBPR job" tile was added to section 2. Every tile is a static link and the chat list is a hard-coded snapshot from 12:20. (Drive: `BLOCKER_MSG-CHAT-TO-CODE_JOB_SUNBIZ...2026-10-01.md`)
9. **2026-10-02 06:54** — `VTES-LLM-LAUNCHER.html` (v2) and `LLM-WINDOW-REGISTRY_v2.md` land in the VTES-PANEL folder. Older versions: `SUPERSEDED_VTES-LLM-LAUNCHER.html` (v1) and `VTES-LLM-LAUNCHER_v2.html`, both in VTES-Inbox.
10. **2026-10-02 09:35 ET** — Claude wrote `VTES-LLM-LAUNCHER_v3.html` (about 20 KB): tab strip LLMS, EXECUTORS, BOTS, HAND OFF, QUEUED, an agent picker, and cards for the six grayed-out "NOT READY" items. Script passed a syntax check. **Never opened in a browser and never clicked through.** Handoff file: `HANDOFF_VTES-CONTROL-PANEL_CHANGE-HISTORY_2026-10-02.md`. A paste for Gemini already exists: `PASTE-TO-GEMINI_VTES-CONTROL-PANEL_2026-10-02.txt`. All three are in the VTES-PANEL folder.
11. **2026-10-02 09:59 AM** — RAMBO's hybrid build of HOME.html: sticky LLMS tab pointing at `VTES-LLM-LAUNCHER_v3.html`, plus Decisions, BOTS, HAND OFF, QUEUED. Header now reads "Hybrid 2026-10-02: Decisions, LLMS, BOTS, HAND OFF and QUEUED added. Node 0 is live." Screenshot shows "125 of 131 are off". (RAMBO report; Jorge's screenshot)
12. **2026-10-02 10:46 to 10:47 AM ET** — RAMBO backed up to `.bak-20261002-a`, added a "Desktop Executor — open the PASTE-D window" tile at the top, and two tiles for LLM Launcher v2 and the LLM Subscriptions Panel. File grew from 15,174 to 16,402 bytes. RAMBO reported the order as PARTIAL: no earlier panel with separate top buttons for LLMs, bots and roles was ever found. (Drive: `EXECUTED_MSG-COWORK-TO-CODE_DESKTOP-EXECUTOR-SHORTCUT-AND-PANEL-RESTORE_2026-10-02.md`)
13. **2026-10-02 later** — Jorge reports the ALL button is hidden under the header. Fix queued as PASTE-D-066 (repo: `mailbox/to-desktop/WORK-QUEUE_Panel-Header-Hides-ALL-Tab_2026-10-02.md`). LLM button wiring is queued as PASTE-D-065.

## Section C — Where each version lives

- **Live panel (PC only):** `C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html`
- **Backups (PC only, same folder):** `.bak-20261001`, `.bak-20261001-b`, `.bak-20261001-c`, `.bak-20261002`, `.bak-20261002-a`
- **Stale older panel (PC only):** `C:\Users\JV\JV-repository\VTES-CONTROL-PANEL.html` and `C:\Users\JV\Desktop\_FILED\02-Pages-HTML\ControlPanel.html`
- **Older LLM tools (PC only):** `C:\Users\JV\LLM-Control-Panel` (April 2026), including `architect-executor.html`
- **Cloud copy (private):** https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj
- **Drive, folder VTES-PANEL** (id `1_G5KbMkQ44ydAmEW7qCcrF4-6sBIKH9k`): launcher v2 and v3, registry, handoff, Gemini paste
- **Drive, folder VTES-Inbox:** launcher v1 and v2, Phase 2 order
- **Drive, folder "Shared Folders for all LLMs"** (id `1gKyWrzYwIRyiX1qRVjTW2PNNI0qeQYL1`): takeover file, executors file

## Section D — Gaps, said plainly

1. Cloud has not seen the live HOME.html. A desktop job (PASTE-D-067) copies it and its backups into Drive so Gemini can read them.
2. The panel's own link targets (`ControlPanel.html` anchors) are guesses and unverified.
3. Six items show NOT READY: email attachments, mini LLM panel, ALEC DD review links, out-of-turn progress flashes, 24/7 runs, Orchestrator / Chief seat. v3 only makes them dispatchable. None is built.

Which would you like next: the desktop copy (PASTE-D-067), or the browser test of v3?

*Footer: v1 · 2026-10-02 · CURRENT · #VTES-control-panel #history. No TRK issued; the desktop assigns one from the registry.*
