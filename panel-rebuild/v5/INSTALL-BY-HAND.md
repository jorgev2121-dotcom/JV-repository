# INSTALL BY HAND - launcher v5 (TRK-2026-9910-B). For the desktop executor (RAMBO). Not for Jorge.

**There is no copy command, no delete command and no installer script. Anywhere.** Fix round 5 removed them (charter Rule 4, Tier 2: a fifth installer flaw means no scripts at all). The only script left is `VERIFY-v5.ps1`. It only reads.

**The real v3 launcher is never touched.** It stays on the Desktop exactly as it is. v5 is a second, separate folder.

**Fix round 6 changes this document in four places:** (1) where the package and VERIFY come from is written down (step 6, flaw 12); (2) the exact bytes are read from the branch with `git show`, never from a checkout that was switched to another branch (flaw 12); (3) file names are read back so a hidden extension cannot turn `.md` into `.md.txt` (flaw 10); (4) VERIFY now says OK when only the eight data and settings files changed (flaw 11), and says plainly when the cause is line endings or a link (flaws 12 and 5).

## Section A - Install, by hand

The order you are working from gives you ONE full path for the NEW folder. If it gives no path, a short name, or a path that does not start with the text in step 1, stop and report BLOCKED. Never choose a path yourself.

1. **Read the path in the order.** It must start with `G:\My Drive\MY-DESK\VTES-PANEL\` and end with the NEW folder name, for example `G:\My Drive\MY-DESK\VTES-PANEL\v5`. It must never be the Desktop, never inside a Desktop folder, and never inside a git checkout (for example `C:\Users\JV\JV-repository`). It must not be, or sit under, a link or junction (VERIFY checks this too). If it is any of those, stop and report BLOCKED.
2. **Open the parent folder.** In File Explorer, open `G:\My Drive\MY-DESK\VTES-PANEL\`. If it does not exist, stop and report BLOCKED. Do not create it.
3. **Check the new folder name is free.** If a folder with that name is already there, stop and report BLOCKED. Do not open it, do not write into it, do not delete it. A folder that already exists was not created by you.
4. **Create the NEW empty folder by hand.** Right-click an empty spot, click New, click Folder, type the exact name from the order, press Enter. Open it and create one empty subfolder named `data` the same way.
5. **Turn on file name extensions, then check where you are.** In File Explorer click View, then Show, then File name extensions, so that every name is shown in full. Open the new folder. Click the address bar. It must show exactly the full path from the order. If it shows anything else, stop and report BLOCKED. Click View, then Show, then Hidden items. The folder must hold only the empty `data` folder, and none of its parent folders may hold a folder named `.git`.
6. **Get the exact bytes from the branch, then save them. This is where the package comes from.** The package exists only on the branch `claude/panel-v5-port`, in the folder `panel-rebuild/v5/package`. `VERIFY-v5.ps1` is NOT in the package: it is one folder up, at `panel-rebuild/v5/VERIFY-v5.ps1`, on the same branch.
   - 6a. **Fetch, nothing else.** In the repo checkout (`C:\Users\JV\JV-repository`) first run `git status` and keep its output for step 8. Then run `git fetch origin claude/panel-v5-port`. That only updates the checkout's list of remote branches. **Never switch the checkout to this branch. Never run pull, merge, reset or checkout there.** Write the output of `git rev-parse origin/claude/panel-v5-port` in the report.
   - 6b. **Read each file with `git show origin/claude/panel-v5-port:<path>`** and save the exact bytes it prints, with your own file tools, under the same name in the new folder. The 11 package files are: `MANIFEST.sha256`, `VTES-LLM-LAUNCHER_v5.html`, `vtes5-config.js`, `vtes5-live.js`, `vtes5-ui.js`, and in the `data` folder `vtes5-heartbeat.js`, `vtes5-bots.js`, `vtes5-state.js`, `vtes5-health.js`, `vtes5-tokens.js`, `vtes5-housekeeping.js`, `vtes5-miamidade.js`. The path on the branch is `panel-rebuild/v5/package/` followed by that name. **Do not use PowerShell's redirect symbol to save them: Windows PowerShell 5.1 re-encodes the bytes as UTF-16 and the check fails.** Use a binary-safe way (your file tool, or a program that writes the bytes it reads from the git process).
   - 6c. **Line endings.** The files on the branch use LF line endings. `git show` prints them unchanged. Git for Windows with `core.autocrlf=true` would turn them into CRLF if you took them from a CHECKED OUT working folder instead, and then VERIFY says LINE ENDINGS CHANGED (CRLF). The branch carries a `.gitattributes` line (`panel-rebuild/v5/** -text`) so that even a checkout keeps the bytes, but you still never check this branch out in the PC's working checkout.
   - 6d. **Save VERIFY beside the new folder, not inside it.** Read `git show origin/claude/panel-v5-port:panel-rebuild/v5/VERIFY-v5.ps1` and save its exact bytes as `G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1` (the parent folder of the new folder). If you saved it inside the new folder, VERIFY reports it as an EXTRA FILE. Its SHA-256 must be `65d1ed8db6593635de5038017b3d8b6d28cc68de5d25db27cdabc3d7ef9e1afd` (read it with `Get-FileHash -Algorithm SHA256`). If it is different, stop and report BLOCKED.
7. **Read the names back.** In File Explorer, with file name extensions on (step 5), read every file name in the new folder and in `data`. Write the list of names in the report. Every name must be exactly one of the 11 above, ending exactly as written, with no `.txt` added at the end and no hidden extension. If a name is wrong, stop and report BLOCKED. Do not rename it to fix it: ask.
8. **Check the source was not changed.** Run `git status` in the checkout. It must show the same state as before step 6a (this document never changes the checkout's branch or files). If not, stop and report BLOCKED.
9. **Run the read-only check.** Open PowerShell and run this one line. Put the full path from the order where it says FULL PATH OF THE NEW FOLDER. It reads files. It writes, copies, moves and deletes nothing.

<!-- VERIFY-CMD -->
```
powershell -NoProfile -ExecutionPolicy Bypass -File "G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1" -Path "FULL PATH OF THE NEW FOLDER" -ExpectManifestSha256 dc948c92cc04f2ed8d767a281c1839c6539712ef10fe819acdd4eaac9f8252e2
```

10. **Report the answer, word for word.** There are four kinds of answer:
    - `OK: all 11 of 11 package files are present, readable and identical (SHA-256), and nothing else is in the folder` means a fresh install is good. Paste that line into the report.
    - `OK: all 11 of 11 package files are present and readable. N page and script files are identical ... data or settings file(s) were rewritten by a PC writer, which is expected` is also OK (exit 0). It is what a later check says once a writer has started: the lines starting `EDITED (data file) - expected` or `EDITED (settings file) - expected` name the eight files that are allowed to change (DATA-CONTRACT.md, section "Files that change by design"). Paste it. Any PROBLEMS line is not OK, even if expected lines are shown with it.
    - `PROBLEMS` lists every difference, one per line. Do not use the folder. Paste all the lines and report BLOCKED. Do not fix it by writing the files again over the folder, and do not delete anything. Two lines have their own meaning: **`LINE ENDINGS CHANGED (CRLF)`** means the files are right except for Windows line endings, usually from git for Windows: get the exact bytes again by step 6 in a NEW folder name given by Jorge's order. **`LINK IN PATH`** means the folder, or a folder above it, is a link or junction, so the files may live somewhere else (the Desktop, a git checkout): stop and report BLOCKED with the line, and do not choose another path yourself. `WRONG PLACE` means the folder is inside a Desktop folder or a git checkout.
    - `CANNOT CHECK` means the path or the manifest could not be read (a path with `..` in it, a short name, a missing folder). Paste it and report BLOCKED.
11. **Nothing else.** Do not edit any file. Do not create a Desktop shortcut: that needs Jorge's yes, as a separate order.

## Section B - Undo

**There is nothing to undo, because the real v3 launcher is never touched.** To stop using v5, close it. That is all.

**Deleting the v5 folder is Jorge's decision.** It is done by hand in File Explorer, only after Jorge says yes, never by a script, and never by you on your own. If an install went wrong, leave the folder as it is, paste the VERIFY output, and ask. Anything found in the folder that is not from the package (for example data written by a PC writer, or a note) stays where it is.

## Section C - What was tested, and what was not

- `VERIFY-v5.ps1` was run under PowerShell 7.4.6 for Linux (`test-verify.sh`, result in `test-verify-RESULT.txt`). In every scenario the SHA-256 of every file in the whole test area was taken before and after and was identical. Edited, missing, extra, unreadable (as an unprivileged user), linked (the folder itself, a parent folder, a file, a data file), malformed, a path with `..`, a folder inside a Desktop folder, a folder inside a git checkout, CRLF line endings and a data file rewritten by a writer are all reported as stated above, and none is ever called OK when it is not.
- `test-no-write-commands.js` scans this document, `DESKTOP-WORK.md`, `VERIFY-v5.ps1` and every package file, and fails if any of them holds a copy, move, delete, create or write command (result in `test-no-write-commands-RESULT.txt`).
- NOT tested, UNVERIFIED on the PC: `git show` writing from Windows PowerShell 5.1, Windows junctions (only Linux symbolic links were tested), whether `G:\My Drive` itself is reported as a link by VERIFY on the PC, File Explorer behaviour, Google Drive for desktop behaviour. See KNOWN-LIMITS.md, Section I, for the exact PC check of each.

Did VERIFY print the OK line, and did you paste it into the report? (yes/no)

TRK-2026-9910-B · INSTALL-BY-HAND · v2 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
