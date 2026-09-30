# PANEL ARCHITECTURE — modular control panel
**TRK-2026-9910-B · v1 · 2026-09-30 · #panel #modules #wiring #integrity**

**Answer first: each page is its own small file, all share three helper files, and a manifest with SHA-256 fingerprints lets a script catch a wrong character the same day.** The "60,000 lines" worry was actually about 60,000 **characters** (about 740 lines) in one file. That single-file delivery was the fragile part, so it is gone.

## Section A — Layout (folder `tools/vtes-panel/`; on the PC: `G:\My Drive\MY-DESK\VTES-PANEL\`)
1. Pages: `VTES-PANEL.html` (home) · `VTES-LLM-LAUNCHER.html` (windows, chat, Map) · `VTES-BUDGET.html` · `VTES-MUNICIPALITIES.html` · `VTES-PROGRAMS.html` · `VTES-REMINDERS.html` · `VTES-TREEMAP.html`.
2. Shared: `vtes-common.js` (status logic, look-alike-tolerant search, top bar) · `vtes-modules.js` (the registry and module wires) · `vtes-subs.js` (subscriptions).
3. Data (allowed to change): `vtes-reminders.js` · `programs-data.js` · `vtes-status.js` · `vtes-verify.js`. Fixed data: `municipalities-data.js`.
4. Scripts: `Verify-VtesPanel.ps1` · `Write-VtesStatus.ps1` · `Export-ProgramsData.ps1` · `VTES-RedBell.ps1`. Each has a `-SelfTest`.

## Section B — Adding a page (3 steps)
1. Write `VTES-NEWTHING.html`; include the three shared scripts; call `VTES.nav('newthing')`.
2. Add one line to `vtes-modules.js` (state live) and the wires it needs.
3. Run `Verify-VtesPanel.ps1 -Build` from a known-good checkout; commit. The Panel home picks it up.

## Section C — Integrity (Tier 3: enforcement on a schedule)
`Verify-VtesPanel.ps1` compares every code file with `MANIFEST.sha256` and writes `vtes-verify.js`; the Panel home shows a green or red banner naming the file. RAMBO schedules it daily. **One known weakness:** launcher and `vtes-common.js` both hold the status table; a test keeps them identical.

## Section D — Wiring
Module wires are drawn on the Panel home from `VTES_WIRES`. Window hand-off wires are drawn in the launcher's Map. The Governor (token manager) sits on both.

Does this layout match how you pictured "every page built modularly"?
