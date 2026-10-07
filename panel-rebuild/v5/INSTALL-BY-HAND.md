# INSTALL BY HAND - launcher v5 (TRK-2026-9910-B). For the desktop executor (RAMBO). Not for Jorge.

Follow the steps in order. Stop at the first BLOCKED. Do not touch the real v3 launcher on the Desktop. The only script is `VERIFY-v5.ps1`, and it only reads.

1. Read the path in the order. It must start with `G:\My Drive\MY-DESK\VTES-PANEL\`. If it does not, stop and report BLOCKED. Never choose a path yourself.
2. The path must not be the Desktop, inside a Desktop folder, inside a git checkout, or under a link or junction. If it is, stop and report BLOCKED.
3. In File Explorer, open `G:\My Drive\MY-DESK\VTES-PANEL\`. If it does not exist, stop and report BLOCKED. Do not create it.
4. Check that the new folder name is free. If a folder with that name already exists, stop and report BLOCKED. Do not open, change or delete it.
5. Create the new empty folder by hand, with the exact name from the order. Open it and create one empty subfolder named `data`.
6. In File Explorer click View, then Show, then File name extensions. Click View, then Show, then Hidden items.
7. Open the new folder and click the address bar. It must show the full path from the order. If it shows anything else, stop and report BLOCKED.
8. Check that the new folder holds only the empty `data` folder, and that no parent folder holds a folder named `.git`. If not, stop and report BLOCKED.
9. In the checkout `C:\Users\JV\JV-repository` run `git status` and keep the output.
10. In the same checkout run `git fetch origin claude/panel-v5-port`. It writes only inside the checkout's `.git` folder, and changes no branch and no working file.
11. Never run pull, merge, reset or checkout in that checkout. Write the output of `git rev-parse origin/claude/panel-v5-port` in the report.
12. The package is 12 files: `MANIFEST.sha256`, `VTES-LLM-LAUNCHER_v5.html`, `vtes5-config.js`, `vtes5-live.js`, `vtes5-ui.js`, and seven data files.
13. The seven data files are `vtes5-heartbeat.js`, `vtes5-bots.js`, `vtes5-state.js`, `vtes5-health.js`, `vtes5-tokens.js`, `vtes5-housekeeping.js` and `vtes5-miamidade.js`, all inside `data`.
14. For each of the 12 files run `git show origin/claude/panel-v5-port:panel-rebuild/v5/package/<path>` and save the exact bytes under the same path in the new folder.
15. Save with your own file tools, or another program that writes the bytes it reads. Do not use the PowerShell redirect symbol: it can save UTF-16, and VERIFY refuses that.
16. Save `VERIFY-v5.ps1` beside the new folder, never inside it: `G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1`. First run `Test-Path -LiteralPath 'G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1'`; read an existing file's SHA-256 with `Get-FileHash -Algorithm SHA256`.
17. If that file does not exist, save there the exact bytes of `git show origin/claude/panel-v5-port:panel-rebuild/v5/VERIFY-v5.ps1`. Its SHA-256 must be `f291b8c40afd044af1892649028e87efb39c40dd4a714e3715931f46390ce089`. If it differs, stop and report BLOCKED.
18. If that file exists and has that SHA-256, use it as it is. Never overwrite, move, rename or delete it. Write in the report that it was already there: that is not BLOCKED.
19. If that file exists with another SHA-256, save the new copy beside it as `VERIFY-v5.ps1.new-YYYYMMDD-HHMM`, touch nothing else, and report BLOCKED with both SHA-256 values. Do not run VERIFY.
20. In File Explorer read every file name in the new folder and in `data`. Each must be one of the 12 names, with no `.txt` added. If one is wrong, stop and report BLOCKED. Do not rename it.
21. Run `git status` in the checkout. It must show what it showed before the fetch. If it does not, stop and report BLOCKED.
22. Open PowerShell. If PowerShell itself prints a red error about a parameter, nothing was checked: paste it and report BLOCKED.
23. Run this one line. Put the full path from the order where it says FULL PATH OF THE NEW FOLDER.

<!-- VERIFY-CMD -->
```
powershell -NoProfile -ExecutionPolicy Bypass -File "G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1" -Path "FULL PATH OF THE NEW FOLDER" -ExpectManifestSha256 816e2efa6170f93699aca9e6c2274c51d260fa2c5f4d4bd62b9bf808dc6e4ad0
```

24. Paste VERIFY's whole answer into the report. The install is good only if it prints "OK: all 11 of 11 package files are present, readable and identical (SHA-256), and nothing else is in the folder".
25. On day one that line is the only good answer. Any other answer is BLOCKED. Never add `-AfterWriters` unless the order says so. A later check may print "OK (after writers)".
26. If VERIFY prints "PROBLEMS", paste every line, do not use the folder, and report BLOCKED. Do not write the files again over the folder and do not delete anything.
27. If VERIFY prints "LINE ENDINGS CHANGED (CRLF)", get the exact bytes again, into a new folder name given by Jorge's order.
28. If VERIFY prints "LINK IN PATH", "WRONG PLACE" or "CANNOT CHECK", paste the line and report BLOCKED. Do not choose another path yourself.
29. If VERIFY prints a day-one line starting "EDITED: data/vtes5-bots.js (data file) has SHA-256" with "saved as UTF-16", save that file again with a tool that keeps the bytes.
30. Do not edit any file. Do not create a Desktop shortcut: that needs Jorge's yes, as a separate order.
31. To stop using v5, close it. Do not delete the v5 folder: only Jorge decides that, in File Explorer, after he says yes.

Did VERIFY print the OK line, and did you paste it into the report? (yes/no)

TRK-2026-9910-B · INSTALL-BY-HAND · v4 · 2026-10-07 · CURRENT · #VTES-control-panel #panel-v5
