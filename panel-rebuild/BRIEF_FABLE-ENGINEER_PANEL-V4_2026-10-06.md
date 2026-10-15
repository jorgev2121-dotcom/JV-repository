# BRIEF — rebuild the VTES panel and launcher to v4 (engineer: Fable, ordered by Jorge)

Authority: Jorge Valdes, 2026-10-06 (typed): "Put an army of agents, bots, to re-engineer this, make it squeaky clean, everything functional. Make Fable do the engineering. Then put him to sleep." This is Jorge's own approval to use Fable for this job. Nothing else.

## Who Jorge is
Non-technical owner, one-man business, listens by text-to-speech. He lives in this panel. He cannot fix anything. Short paragraphs, answer first, numbered lists, few tables. End every report with one cheap question.

## What he sees wrong (his words, 2026-10-06)
1. "Why is RAMBO not displayed? How am I expected to paste into the desktop executor when I have dead links in the VTES control panel?"
2. Only two tray icons, both open one window holding 6 to 8 windows. He cannot tell them apart. Every window must say plainly what it is, e.g. "Claude Code Desktop Executor / RAMBO".
3. All desktop executors are of ultimate importance. Grok bots were requested many times and never built. The token monitor is "alive" but shows no burn rate or statistics. The housekeeping agent has never sent a report.
4. "No inefficiencies or downtime. A Swiss watch. Indexed, OCR'd, functional."
5. Header shows active/inactive windows wrongly.

## What the cloud keeper verified in the v3 launcher text (Jorge pasted it 2026-10-06)
1. LLM-01 RAMBO has a card, but its only button is "Hand work here". Cards LLM-02, 04, 06, 07, 08 have an "Open ..." button; LLM-01, 03, 05 do not. The vtes:// addresses were never registered on the PC, so every vtes:// link is dead.
2. Contradictory timings on one page: RAMBO "runs every 2 minutes" (card), poller "15-minute" (bots), CU-Orchestrator "every 2 minutes" (chief card) and "every 15 minutes" (bot card); the registry says the poller ticks every 300 seconds.
3. The Repairs log is "maintained by hand" and still lists "Nodes 1-11 still show a 2026-09-02 snapshot" as OPEN.
4. Statuses are typed words, not live data. (Another page, made at 8 PM, showed "Live" next to a placeholder address, https://vtes.example.com.)
5. The card says "(no note typed: ask Jorge what he wants done)" is fine; the rest of the packet text is fine. Keep it.

## Sources (read these first)
- Branch `origin/claude/executor-tray-icon-1cazza`: `tools/vtes-panel/` (37 files: VTES-PANEL.html, VTES-LLM-LAUNCHER.html, VTES-Open.ps1, VTES-PORTAL.html, VTES-TASKS.html and more). The repo copy of the launcher is dated 2026-09-30. The newest launcher is v3 (footer "TRK-2026-9910-B v3 2026-10-02") in Google Drive folder VTES-PANEL (id 1_G5KbMkQ44ydAmEW7qCcrF4-6sBIKH9k), file VTES-LLM-LAUNCHER_v3.html. Use the Drive copy if your session can read it; if it cannot, use the repo copy and SAY SO in your report.
- `diagnosis/` on this branch: 9 window diagnoses, 2 ledgers, the self-evaluation. `diagnosis/REPORT_8PM-CHAT-ARTIFACTS_2026-10-06.md`.
- `panel-rebuild/REQUIREMENTS_FROM-JORGE_2026-10-06.md` (his 10 requirements).
- Registry LLM-WINDOW-REGISTRY_v2.md (Drive 142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2); EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md (1ewQGj43s0tYzGlbp2E3DS4idmtt5Ztmi); STATE-OF-PLAY.md (1Unf8pWzRfiTp7MtuEQ1vRUuhsOFP2Ho4).
- Repo `CLAUDE.md` (the charter). Read it fully.

## What to build
1. **Repair v3 into v4. Do not start from nothing.** v3's 22 tabs rendered in a headless test and its launcher loaded 27 cards; throwing that away risks regressions. Keep v3 untouched as the rollback.
2. **Every window and executor is clearly named and openable:** one card per window, the plain name first (e.g. "Claude Code Desktop Executor / RAMBO"), an Open or Paste button that works, and its real state.
3. **No dead link, no dead button, no dead address.** Anything that cannot work yet (for example vtes:// before the address is registered) must say so on the page in plain words, with the one step that fixes it, and must not look clickable.
4. **No hand-typed status. Tier 3 enforcement (charter Rule 4).** The panel has been rebuilt many times and decays every time because nothing refreshes it (this is the third sighting of "stale panel"). Therefore: every status, count and time on the page must be read from a data file that a scheduled task on the PC writes (heartbeat, STATE-OF-PLAY, health report, token-monitor output). If the data is missing or older than its limit, the page shows "NO DATA" or "STALE since <time>" in red. Never green by default. Specify the data file names and formats in a short `DATA-CONTRACT.md` so the desktop can produce them.
5. **Fix the contradictory timings** by reading them from the data file.
6. **Token monitor and housekeeping panels** that show burn rate and last-report time, or "NO DATA" in red. Do not invent numbers.
7. **Grok:** a card with its true state (registry says LLM-07 unproven 31 days), and a one-line next step. Do not pretend it works.
8. **Miami-Dade tab:** the 22 sources as live links to the proof files (use the Drive index document id 1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o as the model), with an "n of 300" counter that says "unknown" until counted.
9. **Plain text for listening:** a "read me first" panel at the top in short numbered sentences.
10. A panel-age stamp ("Built <time>, data as of <time>") in the header.

## Rules you must follow
1. Work only in this repo, on your branch, in `panel-rebuild/v4/`. Never touch the live Desktop file, Drive originals, or the v3 launcher.
2. Do not send, spend, delete, sign, install anything on the PC, or enter any password. You cannot touch the PC. Installation is done by two desktop executors afterwards.
3. Never invent a fact. Mark anything you did not read yourself UNVERIFIED.
4. Do not use any tracking number you did not read in the repo. Use TRK-2026-9910-B for the panel.
5. Files pure ASCII where PowerShell reads them (RI-032).

## Deliverables (all in `panel-rebuild/v4/`)
1. The v4 HTML files and data-contract file.
2. `INSTALL-v4.ps1`: backs up the current live files with a `.bak-YYYYMMDD` copy, installs v4, and writes a rollback script. No admin rights.
3. `ROLLBACK-v4.ps1`.
4. `TEST-REPORT.md`: run an automated check in a headless browser (Chromium is pre-installed; use Playwright with executablePath /opt/pw-browsers/chromium; do not run "playwright install"). Click or request EVERY tab, link, button and address on EVERY page. Report "N of N pass" with the list of any failures and the reason. One failing item is reported, not hidden.
5. `KNOWN-LIMITS.md`: what cannot be tested from the cloud (the PC, the tray icons, vtes:// registration) with the exact PC check for each.
6. Commit and push to your branch. Do not open a pull request.

## When done
Reply with: the branch name, the pass count (N of N), the failures, and one yes/no question for Jorge. Then stop. Jorge has ordered that you be put to sleep when finished; the cloud keeper will archive this session after checking your work. Another agent will then verify everything independently; assume your work will be audited line by line.

TRK-2026-9910-B · v4-brief · 2026-10-06 · BRIEF (cloud keeper)
