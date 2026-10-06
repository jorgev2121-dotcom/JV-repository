# INSTALL BY HAND - launcher v5 (TRK-2026-9910-B). For the desktop executor (RAMBO). Not for Jorge.

**There is no copy command, no delete command and no installer script. Anywhere.** Fix round 5 removed them (charter Rule 4, Tier 2: a fifth installer flaw means no scripts at all). Every installer and undo command so far produced flaws in an independent check: a delete that could remove the whole Desktop, an install that followed a link into the Desktop, a delete of edited files with no copy. Code that is not there cannot have a flaw. The only script left is `VERIFY-v5.ps1`. It only reads.

**The real v3 launcher is never touched.** It stays on the Desktop exactly as it is. v5 is a second, separate folder.

## Section A - Install, by hand, in File Explorer

The order you are working from gives you ONE full path for the NEW folder. If it gives no path, a short name, or a path that does not start with the text in step 1, stop and report BLOCKED. Never choose a path yourself.

1. **Read the path in the order.** It must start with `G:\My Drive\MY-DESK\VTES-PANEL\` and end with the NEW folder name, for example `G:\My Drive\MY-DESK\VTES-PANEL\v5`. It must never be the Desktop, never inside a Desktop folder, and never inside a git checkout (for example `C:\Users\JV\JV-repository`). If it is any of those, stop and report BLOCKED.
2. **Open the parent folder.** In File Explorer, open `G:\My Drive\MY-DESK\VTES-PANEL\`. If it does not exist, stop and report BLOCKED. Do not create it.
3. **Check the new folder name is free.** If a folder with that name is already there, stop and report BLOCKED. Do not open it, do not copy into it, do not delete it. A folder that already exists was not created by you.
4. **Create the NEW empty folder by hand.** Right-click an empty spot, click New, click Folder, type the exact name from the order, press Enter.
5. **Check where you are.** Open the new folder. Click the address bar. It must show exactly the full path from the order. If it shows anything else, stop and report BLOCKED. Click View, then Show, then Hidden items. The folder must still be empty, and none of its parent folders may hold a folder named `.git`.
6. **Open the package.** In a second File Explorer window, open the `package` folder (in the repo checkout: `panel-rebuild\v5\package`). It holds 6 items: `MANIFEST.sha256`, `VTES-LLM-LAUNCHER_v5.html`, `vtes5-config.js`, `vtes5-live.js`, `vtes5-ui.js` and the folder `data`. Only read from it. Never change it.
7. **Copy the files in by drag and drop.** Click in the package window, press Ctrl+A to select all 6 items, hold Ctrl and drag them into the new folder window. The pointer must say "Copy". Let go. If Windows asks about replacing or merging, click Cancel and report BLOCKED: the new folder was supposed to be empty.
8. **Check the source is whole.** The package window still shows the same 6 items. If not, stop and report BLOCKED.
9. **Run the read-only check.** Open PowerShell and run this one line. Put the full path from the order where it says FULL PATH OF THE NEW FOLDER, and the full path of the file `VERIFY-v5.ps1` where it says FULL PATH OF VERIFY-v5.ps1. It reads files. It writes, copies, moves and deletes nothing.

<!-- VERIFY-CMD -->
```
powershell -NoProfile -ExecutionPolicy Bypass -File "FULL PATH OF VERIFY-v5.ps1" -Path "FULL PATH OF THE NEW FOLDER" -ExpectManifestSha256 92612e1500116e60ea403df00860d774807137cca537e66248a4e522428abecb
```

10. **Report the answer, word for word.**
    - `OK: all 11 of 11 package files are present, readable and identical` means the install is good. Paste that line into the report.
    - `PROBLEMS` lists every difference, one per line (including `WRONG PLACE` if the folder is inside a Desktop folder or a git checkout). Do not use the folder. Paste all the lines and report BLOCKED. Do not fix it by copying again, and do not delete anything.
    - `CANNOT CHECK` means the path or the manifest could not be read (a path with `..` in it, a short name, a missing folder). Paste it and report BLOCKED.
11. **Nothing else.** Do not edit any file. Do not create a Desktop shortcut: that needs Jorge's yes, as a separate order.

## Section B - Undo

**There is nothing to undo, because the real v3 launcher is never touched.** To stop using v5, close it. That is all.

**Deleting the v5 folder is Jorge's decision.** It is done by hand in File Explorer, only after Jorge says yes, never by a script, and never by you on your own. If an install went wrong, leave the folder as it is, paste the VERIFY output, and ask. Anything found in the folder that is not from the package (for example data written by a PC writer, or a note) stays where it is.

## Section C - What was tested, and what was not

- `VERIFY-v5.ps1` was run under PowerShell 7.4.6 for Linux in 38 scenarios (`test-verify.sh`, result in `test-verify-RESULT.txt`). In every scenario the SHA-256 of every file in the whole test area was taken before and after and was identical. Edited, missing, extra, unreadable (as an unprivileged user), linked, malformed, a path with `..`, a folder inside a Desktop folder and a folder inside a git checkout are all reported, and none is ever called OK.
- `test-no-write-commands.js` scans this document, `DESKTOP-WORK.md`, `VERIFY-v5.ps1` and every package file, and fails if any of them holds a copy, move, delete, create or write command (result in `test-no-write-commands-RESULT.txt`).
- NOT tested: File Explorer drag and drop on Windows (a person does it), Windows PowerShell 5.1, Google Drive for desktop behaviour. See KNOWN-LIMITS.md.

Did VERIFY print the OK line, and did you paste it into the report? (yes/no)

TRK-2026-9910-B · INSTALL-BY-HAND · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
