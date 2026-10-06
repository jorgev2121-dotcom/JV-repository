# STAGING — Panel v4 built in five pieces (Fable declined the whole job under Jorge's 5-minute rule; his own suggestion, adopted)

Engineer from here: Sonnet 5.5, ordered by Jorge ("hand it over to Sonnet 5.5"). Same brief: BRIEF_FABLE-ENGINEER_PANEL-V4_2026-10-06.md. Build in these five pieces, in order. **Commit and push after EACH piece**, so Jorge can see progress and nothing is lost.

1. **Piece 1 — Inventory and test harness.** List every tab, link, button and address in the v3 launcher and panel. Mark each WORKS, DEAD or MISLABELED, with evidence. Write the click-everything headless test (Chromium, Playwright, executablePath /opt/pw-browsers/chromium) and run it against v3 so the "before" count is on record. File: `v4/01_INVENTORY.md` plus the test script.
2. **Piece 2 — Data contract and live status layer.** `v4/DATA-CONTRACT.md` naming each data file the desktop must write (heartbeat, STATE-OF-PLAY, health, token-monitor output), format, and age limit. The page reads these; if missing or too old it shows NO DATA or STALE in red. No hand-typed status anywhere.
3. **Piece 3 — Window and executor cards.** Plain names first (e.g. "Claude Code Desktop Executor / RAMBO"), a working Open or Paste button on every card (RAMBO, Cowork and iPhone included), real state from the data layer, contradictory timings removed, anything not yet working labeled with the one fixing step and not clickable.
4. **Piece 4 — Panels.** Miami-Dade tab (22 live links, "n of 300" = "unknown"), token monitor and housekeeping panels (numbers or NO DATA), Grok card with true state, "read me first" panel, panel-age stamp in the header.
5. **Piece 5 — Install, rollback, tests, limits.** `INSTALL-v4.ps1` (backup first, no admin), `ROLLBACK-v4.ps1`, `TEST-REPORT.md` (N of N, failures listed, before and after), `KNOWN-LIMITS.md` (what only the PC can check, exact check for each).

Rules unchanged: work only in `panel-rebuild/v4/`; never touch the live Desktop file or v3; ASCII-only PowerShell; no invented facts; no pull request.
TRK-2026-9910-B · v1 · 2026-10-06 · STAGING (cloud keeper)
