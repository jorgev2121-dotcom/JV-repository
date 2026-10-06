# INSTALL - launcher v5 (TRK-2026-9910-B). For the desktop executor, not for Jorge.

Section A - What it does, in plain words
1. It makes ONE new folder that you name and puts 10 files in it, plus two small files (a settings file and a record of what it made).
2. It never writes in the folder that holds Jorge's real v3 launcher, and never touches any other existing file.
3. It checks (SHA-256) every file directly in the v3 folder before and after, and says "identical" or names the difference.
4. It refuses to run if the new folder already exists, is inside the v3 folder, or is inside a git checkout (links and junctions followed).

Section B - The command
    powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v5.ps1 -TargetDir "G:\My Drive\MY-DESK\VTES-PANEL\v5" -V3File "C:\Users\JV\Desktop\VTES-LLM-LAUNCHER_v3.html" -DryRun
Run it with -DryRun first, read it, then without -DryRun. `-StatusDir "<folder>"` is optional (see DATA-CONTRACT.md, "The old status-only file"). No admin rights.
`-TargetDir` is required. This script never picks a folder by itself, and there is no -LiveDir.

Section C - Exit codes
- 0 done (or dry run). 2 refused before changing anything (nothing was changed). 3 the package is incomplete. 4 ALARM: the v3 launcher itself changed during the run. 5 failed part-way: run the ROLLBACK command it prints.

Section D - The files it makes
`VTES-LLM-LAUNCHER_v5.html`, `vtes5-live.js`, `vtes5-ui.js`, `data\vtes5-heartbeat.js`, `-bots.js`, `-state.js`, `-health.js`, `-tokens.js`, `-housekeeping.js`, `-miamidade.js` (all seven data files ship with "at": null, so every light is red NO DATA), `vtes5-config.js`, `v5-install-record.txt`. If a folder `Reports\Undo_Manifests` exists under the user's OneDrive Documents, it also writes one `Rollback_Panel-v5_<time>.ps1` stub there (listed in the record, removed by the rollback).

Section E - Proof it was tested
73 PowerShell checks under PowerShell 7.4.6 for Linux, 19 scenario groups, with the SHA-256 of every file in the whole fixture before and after each (test-install-rollback-RESULT.txt, test-install-rollback-HASHES.txt). NOT run on Windows or Windows PowerShell 5.1 (KNOWN-LIMITS.md).

Did the install print "v3 untouched: SHA256 of all N files in the v3 folder is identical before and after"? (yes/no)

TRK-2026-9910-B · INSTALL-v5 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
