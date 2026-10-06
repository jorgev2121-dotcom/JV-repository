# INSTALL AND UNDO - launcher v5 (TRK-2026-9910-B). For the desktop executor (RAMBO). Not for Jorge.

There is no installer script and no rollback script. They were removed on purpose (charter Rule 4, Tier 2): four checks in a row found flaws in installer code. What is left is a folder of files, a list of fingerprints, one copy command, one read-only check, and one delete command.

**Which folder.** The order you are working from gives you two FULL paths: the NEW folder to create, and the `package` folder to copy from (`panel-rebuild\v5\package`). If the order gives only a short name, or no path, stop and report BLOCKED. Never pick a path yourself.

## Section A - Install

1. **Check the new path, in words, before anything.** All of these must be true. If one is false, stop and report; do not fix it yourself.
   - It starts with a drive letter, a colon and a backslash, for example `C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5`. It is not a short name.
   - It does not exist yet. Its parent folder does exist.
   - It is not the Desktop, and is not inside the Desktop.
   - It is not inside the folder that holds the real v3 launcher (`VTES-LLM-LAUNCHER_v3.html`).
   - It is not inside a git checkout (for example `C:\Users\JV\JV-repository`).
2. **Run this one command in PowerShell.** Put the two full paths from the order in the two quoted places. It creates the NEW folder (with no -Force, so an existing folder stops it) and copies the package in. It stops at the first error and copies nothing if the folder already exists.

<!-- INSTALL-CMD -->
```
$New='FULL PATH OF THE NEW FOLDER'; $Pkg='FULL PATH OF THE package FOLDER'; if ($New -notmatch '^[A-Za-z]:[\\/]') { throw 'not a full path' }; if (-not (Test-Path -LiteralPath (Split-Path $New -Parent) -PathType Container)) { throw 'the parent folder does not exist' }; New-Item -ItemType Directory -Path $New -ErrorAction Stop | Out-Null; Copy-Item -Path (Join-Path $Pkg '*') -Destination $New -Recurse -ErrorAction Stop
```

3. **Run the check straight away.** It only reads. It writes nothing anywhere.

<!-- VERIFY-CMD -->
```
powershell -NoProfile -ExecutionPolicy Bypass -File "FULL PATH OF panel-rebuild\v5\VERIFY-v5.ps1" -Path "FULL PATH OF THE NEW FOLDER" -ExpectManifestSha256 358a288e9f928a8d7611eb276c301ee80cf54f2b2d5d9fe0f7abebbdc5e3bd65
```

4. **Read the answer.**
   - `OK: all 11 of 11 package files are present, readable and identical` means the install is good. Paste that line into the report.
   - `PROBLEMS` lists every difference, one per line. Do not use the folder. Report the lines. Then do the Undo below and start again only if the order says so.
   - `CANNOT CHECK` means the folder or its manifest is missing or unreadable (for example the copy stopped half-way). Treat it as a failed install: do the Undo.
   - A file the check cannot read is a problem (UNREADABLE). It is never counted as identical.
5. **Nothing else.** Do not edit the files. Do not create a Desktop shortcut (that needs Jorge's yes, as a separate order). The real v3 launcher on the Desktop stays exactly as it is.

## Section B - Undo

Undo means: look at that one folder, then delete exactly that one folder. Nothing else.

1. **Look first.** Run the check from Section A step 3 on the folder. Then list it:

<!-- LOOK-CMD -->
```
Get-ChildItem -LiteralPath "FULL PATH OF THE NEW FOLDER" -Recurse -Force | Select-Object FullName, Length
```

2. **Save anything that is not from the package.** If the check printed EDITED or EXTRA lines, those files hold something the package did not (for example data written by a PC writer, or a note). Copy each one into a NEW folder next to it named `<same name>-SAVED-YYYYMMDD`. If it printed only OK, there is nothing to save.
3. **Delete exactly that one folder.** The command refuses unless the path is a full path and the folder holds both `MANIFEST.sha256` and `VTES-LLM-LAUNCHER_v5.html` (so it is a v5 folder and not some other folder):

<!-- UNDO-CMD -->
```
$New='FULL PATH OF THE NEW FOLDER'; if ($New -notmatch '^[A-Za-z]:[\\/].+[\\/].+') { throw 'not a full path' }; if (-not ((Test-Path -LiteralPath (Join-Path $New 'MANIFEST.sha256') -PathType Leaf) -and (Test-Path -LiteralPath (Join-Path $New 'VTES-LLM-LAUNCHER_v5.html') -PathType Leaf))) { throw 'this is not a v5 folder' }; Remove-Item -LiteralPath $New -Recurse -ErrorAction Stop
```

4. **Prove it.** `Test-Path -LiteralPath "FULL PATH OF THE NEW FOLDER"` prints False, and the folder that held it still exists.
5. **Never.**
   - Never a short name. Never a path you worked out yourself.
   - Never the folder that holds the real v3 launcher, and never the Desktop.
   - Never a git checkout, and never `git checkout`, `git reset` or `git clean` as an "undo".
   - Never a wildcard, and never `-Force` on the delete.

## Section C - What was tested, and what was not

- The check (`VERIFY-v5.ps1`) was run under PowerShell 7.4.6 for Linux in 30 scenarios: `test-verify.sh`, result in `test-verify-RESULT.txt`. In every scenario the SHA-256 of every file in the whole test area was taken before and after, and was identical (it writes nothing). Edited, missing, extra, unreadable (as an unprivileged user), linked and malformed cases are all reported and none is ever called OK.
- The install command and the delete command were run the same way in `test-install-command.sh` (result in `test-install-command-RESULT.txt`): an existing folder stops the install and leaves it untouched; a missing parent and a short name are refused; the delete refuses a short name and a folder that is not a v5 folder, and removes only the one folder.
- NOT run on Windows or in Windows PowerShell 5.1 (KNOWN-LIMITS.md). The two commands use only commands that exist in 5.1. The test replaced the drive-letter test with a Linux-path test, because Linux has no drive letters.

Did the check print the OK line, and did you paste it into the report? (yes/no)

TRK-2026-9910-B · INSTALL-AND-UNDO · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
