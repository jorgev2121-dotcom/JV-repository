# WORK-QUEUE — Add a "Windows" launcher section to the VTES Control Panel

**From:** ☁️ Code Cloud · **To:** 🖥️ Code Desktop or 🤝 Cowork (ONE owner, see Claim rule) · **Date:** 2026-10-01 · **Paste ID:** PASTE-D-066
**Owner request (Jorge):** "Add all windows. Such as desktop window, JSON, PowerShell 7, etc. to the VTES control panel. So I don't need to navigate."

## WORKAROUND-CERT
- **Tried:** find `ControlPanel.html` from cloud. It lives at `C:\Users\JV\Desktop\ControlPanel.html`. It is not in the repo or Drive, so cloud cannot read or edit it. **IMPOSSIBLE from cloud.**
- **Existing job:** Cowork already owns the Phase 2 rebuild of that file (Drive: `MSG-COWORK-TO-CODE_VTES-CONTROL-PANEL-REBUILD_ENHANCEMENTS_2026-09-26.md`, due 2026-10-03). This item rides on it.
- **Smallest owner action:** none. If a one-time Windows security prompt appears, click Allow.

## Claim rule (RI-048)
Two AIs edited one live document at once before. **Cowork's Phase 2 job owns `ControlPanel.html`.** Whoever picks this up writes `CLAIM_ControlPanel_<window>_<time>.txt` in `G:\My Drive\VTES-Outbox\` first, makes `ControlPanel.html.bak-20261001`, and edits nothing if another claim file is fresh (under 2 hours).

## The one design problem (read first)
A web page cannot open PowerShell, folders or Windows apps by itself. A plain link fails silently. **Fix: a tiny `vtes://` launcher.**
1. `Register-VtesLauncher.ps1` (HKCU only, no admin) registers protocol `vtes://` to run `Invoke-VtesLaunch.ps1`.
2. `Invoke-VtesLaunch.ps1` reads `vtes-launch-map.json` and opens ONLY the names in that file. It accepts a name, never a path or a command from the page. Anything not in the map is refused and logged.
3. Panel tiles are plain links: `vtes://open/powershell7`.
Fallback if the registry write is blocked: the same tiles point at `.lnk` shortcuts in a `Launchers\` folder beside the panel.

## Tiles to add (new section "Windows", lane = system, green)
Each gets hover text, `data-tags`, and `data-lane="system"` per the Phase 2 spec.
1. **Desktop folder** · `explorer.exe` on the VISIBLE desktop (check `C:\Users\JV\OneDrive\Desktop` vs `C:\Users\JV\Desktop`; use the one that shows on screen)
2. **PowerShell 7** · `pwsh.exe` (if missing, say so on the tile; do not install)
3. **Windows PowerShell 5** · `powershell.exe`
4. **Command Prompt** · `cmd.exe`
5. **JSON files** · opens the folder holding the JSON configs (find them; list the real path in the report) in Explorer
6. **Notepad** · `notepad.exe`
7. **Task Manager** · `taskmgr.exe`
8. **Task Scheduler** · `taskschd.msc`
9. **Drive: My Drive** · `G:\My Drive`
10. **VTES-Outbox** · `G:\My Drive\VTES-Outbox`
11. **VTES-Inbox** · `G:\My Drive\VTES-Inbox`
12. **01-JOBS** · `G:\My Drive\01-JOBS`
13. **OneDrive Documents** · `C:\Users\JV\OneDrive\Documents`
14. **Outlook**, **Chrome**, **Claude Desktop** · launch if installed, else the tile shows "not installed"
15. **Repo folder** · the local `JV-repository` clone

Add more only if they already exist on the PC. Do not invent targets.

## Rules
- GREEN: read-only launching and opening folders. No tile may delete, move, or send anything.
- Link count: the old 128 must be unchanged. Report new count as 128 + added.
- No secrets in the map file.
- Log each launch to `G:\My Drive\VTES-Outbox\launcher.log` (time, name, ok/refused).

## Proof required (Rule 2)
Write `EXECUTED_PANEL-WINDOWS-SECTION_2026-10-01.md` to `VTES-Outbox` with: the tile count, a click test result for EACH tile (opened / failed / not installed), the backup path, and a screenshot path. Or write `BLOCKER_...` with what failed and the one small need. Cloud wrote the plan only. **None of this is tested.**

This job was filed by cloud. Shall I also queue the same plan for Cowork as a PASTE-X, since Cowork owns the panel rebuild?

*#VTES-control-panel #PASTE-D-066 #launcher · 2026-10-01*
