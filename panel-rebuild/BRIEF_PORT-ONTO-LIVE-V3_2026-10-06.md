# BRIEF — port the fixed live layer onto Jorge's REAL launcher (build name: v5)

Authority: Jorge Valdes 2026-10-06 (rebuild the panel; checks before install). The desktop executor copied the real files to Drive at 04:12 AM ET (EXECUTED-WITH-PROOF; manifest read by the cloud keeper).

## The real base (verified by the desktop; read by the keeper)
- Drive folder LIVE-COPY-2026-10-06 (id 18aCU-pEZXU79qR11xjxHdGlUYTftvGt7), file VTES-LLM-LAUNCHER_v3.html (Drive id 104sYoYpR0AzmrtMerxklubRx8Y6yAYFd). 24,463 bytes, SHA-256 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3, last modified 2026-10-03 16:27 ET. Footer "TRK-2026-9910-B v3 2026-10-02 CURRENT". It sits on the PC at `C:\Users\JV\Desktop\VTES-LLM-LAUNCHER_v3.html`.
- It is a SMALL single-file page (6 sections, 17 tabs, no data files next to it, no internet needed). The 99 KB "v4" lineage built so far (repo branch executor-tray-icon-1cazza, Map / Console / Dir views) is a DIFFERENT file; it is not what Jorge opens. Build the port as **VTES-LLM-LAUNCHER_v5.html** and archive the older lineage (do not ship it).
- The other three files: VTES-CONTROL-PANEL-HOME.html is an 889-byte retired redirect stub; WAITING-ON-YOU_DECISIONS.html (35,553 B) and ACTION-WINDOW.html (9,880 B) are the decision pages (separate job, not this port).
- Your session can read Drive. Read the file from Drive (it comes back as a markdown rendition with backslash escapes: unescape it carefully), save an unescaped text copy to `panel-rebuild/v3-live/VTES-LLM-LAUNCHER_v3.html`, and report its size and SHA-256 next to the manifest's. A byte match may be impossible (line endings); say so plainly.

## Defects the keeper found in the REAL v3 by reading its source (all must be fixed or labelled honestly in v5)
1. **RAMBO has no Open button.** In the LLMS array LLM-01 has `url:''`, so the page builds no link; only "Hand work here" and a how-to line. Same for LLM-03 Cowork, LLM-05 iPhone, LLM-09. A web page cannot launch a desktop app: give RAMBO (and every desktop window) a big **Copy packet for RAMBO** button plus the exact click path, in plain words, on the card.
2. **`vtes://llm-NN` is shown as plain text.** No scheme is registered on the PC (a registration order awaits Jorge's click on a pop-up). It must be clickable only when the heartbeat says registered AND the address book entry is filled (use the v4 logic); otherwise one plain sentence saying what is missing.
3. **PANEL, INDEX and 10 of the 17 tabs (APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES) link to `file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html`**, the stale snapshot built 2026-09-02, and the Desktop home page is a retired redirect to it. Do not present them as live: label them "OLD PANEL (snapshot of 2026-09-02, not live)" on the tab itself. Building those sections natively is a later job; list it in KNOWN-LIMITS.
4. **LLM-02 carries a hard-coded session address** `https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf`. It is one specific old cloud session; the keeper cannot confirm it is the current one. Replace with the sessions list `https://claude.ai/code` and say UNVERIFIED for any other.
5. **Contradictory timings typed on the page:** RAMBO "runs every 2 minutes", poller "15-minute", registry 300 seconds, CU-Orchestrator "every 2 minutes" on the card and "Every 15 minutes" on the bot card. Remove every typed interval; show the interval read from the heartbeat file, or NO DATA.
6. **Bots (6) have no state at all:** no running / last run. Add a live line per bot from the data file (NO DATA in red when absent). Add the token monitor's real numbers (burn rate, window used, programs) and the housekeeping report's last-sent time, or NO DATA. Do not invent numbers.
7. **Everything is typed text:** "Proven 2026-10-01", "About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday". Label as typed notes with their date, as v4 did.
8. **The Repairs log is hand-maintained** and its one OPEN row says Nodes 1-11 show a 2026-09-02 snapshot. Keep every row; label "typed log"; add the keeper's findings of today as new rows only if a data file supplies them (no hand-typing).
9. Packet and pad stamps use the PC's local format with no zone: use Eastern short form with the zone (v4 logic).

## What must survive unchanged
All six sections and their order; every one of the 9 LLM cards and 6 role cards (LOCAL, CODEX, RAMBO, GROK, COWORK, CHIEF), 6 bots, 6 queued items, 9 picker rows, the 17 tabs, the search box, the packet text (WHO / TASK / HOW TO ANSWER / HARD RULES / FACTS LIVE IN / RETURN PATH), the repairs rows, the dictation-friendly large type, the PANEL and INDEX buttons (labelled honestly). Jorge said "this is my house": do not remove anything.

## What to reuse
The fixed live layer from the v4 work on branch claude/panel-v4-sonnet-build (after fix round 3): data contract, BAD CLOCK, 60-second swap-on-reload, status-only writer grey, interval cap and scaling, Miami-Dade tab content (add as a 7th section, 22 live links and 'n of 300 unknown'), install into a NEW folder (never inside the folder holding the live file, never edit v3, never touch any manifest, rollback removes only what the record lists).

## Install target (charter: the Desktop is a launchpad, never storage)
v5 installs into a NEW folder named by `-TargetDir`, for example `G:\My Drive\MY-DESK\VTES-PANEL\v5` or `C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5`; the Desktop file stays untouched. Creating a Desktop shortcut is a separate order for Jorge's yes. No `-LiveDir` guessing; refuse a git checkout using real paths.

## Process
Push after each of: (1) the unescaped copy plus an inventory of the real v3, (2) the port with all nine fixes, (3) install and rollback with SHA-256 scenarios under PowerShell for Linux (7.4.6, download from the PowerShell GitHub release), (4) tests, FIX/PORT report, KNOWN-LIMITS. Then an independent checker audits it with its own scripts. Do not claim zero flaws. No Drive writes, no PC, no pull request, ASCII-only PowerShell, no invented facts.

TRK-2026-9910-B · v1 · 2026-10-06 · BRIEF (cloud keeper)
