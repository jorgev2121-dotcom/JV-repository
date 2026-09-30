# CRITIQUE: VTES-Attention, VTES-Inventory, VTES-Open, treemap viewer
#adversarial-review #VTES-control-panel #JorgeValdes #RI-001 #RI-002 #RI-022 #RI-045

Window: CLOUD / WEB EXECUTOR. Model: Sonnet 5.5. Reviewer mode: read-only, adversarial.
Target: Windows PowerShell 5.1 (powershell.exe), hidden, at logon, OneDrive + Google Drive for desktop.

What I actually ran (PowerShell 7 on Linux only): both -SelfTest switches (25 of 25 and 15 of 15 pass, so nothing below is a logic-test failure), plus three small probes of closure scoping and the Poll de-duplication. I could not run WinForms or 5.1. Anything about 5.1, OneDrive or Chrome is marked VERIFIED (ran it), LOGIC (proved from the code), or BELIEVED (Windows behavior I am confident of but could not execute).

**SINGLE MOST LIKELY DAY-ONE FAILURE: finding 1, the ghost duplicate banner.** Any banner left unanswered for 60 seconds comes back a second time after you answer it.

---

## 1. Ghost duplicate banners (Attention 412-441, 573-582, 598-601). Severity: silent wrong result. VERIFIED by emulation.

A banner that has been popped off `Pending` into `Active` is not yet in `State.ids`. The id is only added later, in `Record-Decision` (line 422). Sixty seconds later `Poll` runs again: `Get-Alertable` still sees the item as new, and the de-dup at line 599 only looks at `Pending`, not at the banner on screen. So the item is queued a second time. When Jorge clicks YES, the same banner pops up again (flash and sound), and a second click writes a second decision file. If he clicks GO and then NO, the inbox receives two conflicting OWNER-APPROVAL files. The same happens for a snoozed item that comes due, because the snooze key stays until a decision.

I reproduced the exact sequence: after three polls `Pending` still held AP-1 while AP-1 was on screen. Jorge dictates; a banner sitting 60 seconds is normal, not rare.

Fix: in `Show-Next`, right after the pop, add the id to `$script:State.ids`, remove any `snooze[$id]`, and `Save-State`. Also add `$script:Active.id` to the `$queued` list in `Poll`. Add a self-test: poll twice with the same open item, expect one banner.

## 2. Inventory skips every reparse-point folder, which probably includes OneDrive folders (Inventory line 83). Severity: silent wrong numbers. BELIEVED.

The code skips any directory with the `ReparsePoint` attribute, to avoid symlink and junction twins. OneDrive Files On-Demand placeholder folders carry that same attribute. This is the `d----l` Mode that PowerShell shows for OneDrive folders. If so, `C:\Users\JV\OneDrive\Documents` will report only its loose files plus a large `skipped` count, and the result still says ROOT-DONE. The banner text "OneDrive twin trees cannot be counted twice" shows the author had junctions in mind, not placeholders. I could not confirm this on Windows.

Fix: read the reparse tag and skip only symlink (0xA000000C) and mount point (0xA0000003). The simple way is a small C# `FindFirstFile` call (`dwReserved0` holds the tag). Cheaper interim fix: log the first 50 skipped reparse directories with full path to `inventory.progress.txt`, so a wrong count is visible instead of silent, and print `skipped` in the final line.

Hydration note: `EnumerateFileSystemInfos` uses FindFirstFile and never reads file contents, so no file is downloaded from OneDrive or Google Drive. Enumerating a never-opened OneDrive folder does make OneDrive create its placeholders (metadata only), which is slow but safe.

## 3. Autostart points at wherever the script happens to be sitting (Attention 353-360; Open 62). Severity: silent, appears at next logon. LOGIC + BELIEVED.

`-Install` writes the `.vbs` next to the script and registers `powershell -File <current path>`. OPEN-ITEMS says the file was delivered to `G:\My Drive\VTES-Inbox`, a folder the desktop cycle ingests and moves. Two failures follow. The script gets moved and the Run key now points at nothing. Or, even if it stays, the Run key fires before Google Drive has mounted `G:`, so `powershell -File "G:\..."` fails hidden and nobody sees it. The `.vbs` would also be written into the Inbox and ingested as a stray file. The same pattern applies to the `vtes://` handler, whose command embeds `$Self`.

Fix: at `-Install`, copy the `.ps1` (and `vtes-addresses.json` for Open) to `%LOCALAPPDATA%\VTES-Attention\` (and `...\VTES-Open\`), write the `.vbs` there, and register that path. The script itself already copes with a missing `G:`.

## 4. The viewer will not see fresh data, and the crawler writes inside its own scan (Inventory 35-36, 167). Severity: silent stale picture. LOGIC.

`TREEMAP-DATA.js` is written to `G:\My Drive\MY-DESK\INVENTORY`. The viewer loads `TREEMAP-DATA.js` from its own folder (HTML lines 108-110), and the built page lives in `tools/vtes-panel/`. Unless the HTML is also copied into the INVENTORY folder, the page keeps showing the embedded 8/24 legacy scan. The age banner will say so, but nothing tells Jorge why.

Second problem: `OutDir` is inside the scanned root `G:\My Drive`. The script creates `inventory.progress.txt` and rewrites `TREEMAP-DATA.js`, a JSON and a CSV inside the tree it is walking, and every 5,000 files it appends to a file Drive is uploading. It also counts its own outputs on the next run. That contradicts "read-only" in spirit, and adds Drive churn.

Fix: add a `-ViewerDir` parameter and write `TREEMAP-DATA.js` there as well. Skip `OutDir` (and `MY-DESK\INVENTORY`) inside the walk. Better: write to a local `C:\AI\inventory\` and copy the finished files once at the end.

## 5. Button handlers break unless started with `-File` (Attention 501-542, 550). Severity: broken buttons, only in some launch modes. VERIFIED (pwsh 7, same closure rules in 5.1).

`.GetNewClosure()` binds the handler to a dynamic module. I tested both launch styles. With `-File` the functions and top-level variables are global, so `Open-Digest` and `$FlashSeconds` resolve. With `& .\VTES-Attention.ps1 -Demo` from a console or ISE, which is the most natural first test, `Open-Digest` gives "term not recognized" (SHOW ALL and OPEN DETAILS die) and `$FlashSeconds` is `$null`. The flash then stops after the first 0.5 s tick, since `n -ge 0`. Also `$script:X` inside a closure refers to the closure module's scope, not the script's. The YES/NO buttons survive only because they go through `$close`, a plain scriptblock that keeps the script's session state.

The `-Install` path uses `-File`, so the installed copy is fine. Fix anyway: capture `$fs = $FlashSeconds` and `$openDigest = ${function:Open-Digest}` as locals before the closure and call `& $openDigest`. Then it works in every launch mode.

## 6. An error in any click handler pops a modal Windows dialog in a hidden process (Attention 48, 501-542, 632-637). Severity: frozen banner, invisible cause. BELIEVED.

`$ErrorActionPreference = 'Stop'` turns small errors in handlers into terminating ones. A WinForms handler exception with no handler shows the .NET "Unhandled exception has occurred" Continue/Quit dialog, which blocks the message loop. Likely triggers: `Send-Decision` failing while writing to `pending-send` (line 220, outside any try), a sharing violation on `Add-Content` for the heartbeat (line 637, not in try), or `Open-Digest` from finding 5.

Fix: call `[Windows.Forms.Application]::SetUnhandledExceptionMode('CatchException')` before the first control is created, add a `ThreadException` handler that calls `Write-Log`, and wrap `Record-Decision` in try/catch. Set `$ErrorActionPreference='Continue'` inside handlers.

## 7. "Never takes focus" is unproven for real button clicks, and one timer can be garbage collected (Attention 374-388, 478-487, 554-556). Severity: the RI-001 promise, UNVERIFIED on Windows.

`WS_EX_NOACTIVATE` plus `MA_NOACTIVATE` stops the form being activated. The native BUTTON control still calls `SetFocus` on mouse-down, and `TabStop=$false` does not stop that. On most systems the banner's thread is not the foreground thread, so the typing window keeps the keyboard. I cannot rule out focus movement on every build, and this is exactly the failure Jorge already suffered (RI-001).

Fix: add a `VtesButton : Button` class in the C# block with `SetStyle(ControlStyles.Selectable, false)` in its constructor, and use it in `$mk`. Then run the 10-second proof: type in Notepad, click NO, keep typing, confirm no characters were lost.

The `$arm` timer (the one that enables the buttons after 1.5 s) is referenced only by its own closure. If the garbage collector takes it, the buttons stay disabled forever. I cannot confirm that Forms.Timer roots itself while running. Fix: keep it in `$script:Active` and stop and dispose the timers in `$close`.

## 8. First-run baseline can be taken against an empty or unreadable queue, and 5.1's JSON reader is stricter (Attention 75-79, 251-263, 590-597). Severity: one big false summary, log spam. LOGIC + BELIEVED.

RI-045 records Drive truncating the queue file to 0 bytes. If the queue is missing, empty or half-synced at the first poll, `Get-AllItems` returns zero items, and the baseline completes with zero ids, `baselined=true` saved. When the file returns, all 70-plus open items look new and collapse into one "N NEW APPROVALS" banner. A half-written file makes `Read-Utf8Json` throw every minute and `poll-error` is appended to two Drive logs each time.

Also, `ConvertFrom-Json` in 5.1 uses JavaScriptSerializer: a 2 MB string cap, errors on empty property names or keys that differ only by case. The real queue was only tested under PowerShell 7.

Fix: baseline only when `$r.source` is set and the parse succeeded. Log identical poll errors once. Test-load the real `APPROVALS-QUEUE.json` once with `powershell.exe` (not pwsh) before trusting it.

## 9. Long paths are silently dropped (Inventory 75-77). Severity: silent undercount. BELIEVED.

`powershell.exe` 5.1 is not long-path aware. A folder whose path passes roughly 248 to 260 characters throws `PathTooLongException`, the `catch` does `skipped++; continue`, and its whole subtree is lost. OneDrive paths with "Date _ TRK _ Type _ Description _ v1.pdf.SEARCH.txt" style names are prone to this.

Fix: prefix the root with `\\?\` for the DirectoryInfo calls, and strip the prefix when computing `rel` and when writing `path`. Count `PathTooLong` separately so it shows in the ROOT-DONE line.

## 10. Heartbeat and progress writes are unsafe for RI-002 (Inventory 92-99, 217-228). Severity: a dead run or a false "hung". LOGIC.

The progress line is written after the `continue` statements for `.bak` and sidecar files (lines 92-93), so it is skipped whenever the 5,000th file is one of those. In job folders a large share of files are sidecars. On a slow Drive walk the "file grew" heartbeat may see long gaps and declare a healthy run hung. The `Add-Content` calls at lines 217, 220 and 228 are outside any try/catch; one sharing violation from Drive sync kills the entire night run with no result.

Fix: move the progress check to right after `$seen++`, add a time-based write every 60 seconds, and wrap all progress writes in one helper with try/catch and a short retry.

## 11. The per-folder TRK list is capped at 12, so searches can silently miss (Inventory 97, 113). Severity: a wrong "not found". LOGIC.

Each node keeps the first 12 TRK numbers it happens to see, in walk order. Roll-up also stops at 12. A depth-2 folder holding 40 jobs shows 12 of them, and the viewer search (HTML line 122 builds `_hay` from `trk`) will not find the other 28. The charter says tracking numbers must be exact-searchable. Also `[regex]::Matches` is case-sensitive while the `-match` calls beside it are not.

Fix: raise the cap to a few hundred, or better write an uncapped `TRK-INDEX.csv` (number, folder path), which also serves as the filing cross-check.

## 12. Smaller items that look bad or fail quietly (VTES-Open and the HTML). Severity: cosmetic to minor.

- **VTES-Open, silent failure (124-125):** `Start-Process` has no try/catch, so a wrong `run` path (for example a Desktop shortcut that moved) does nothing visible. Wrap it, log, and call `Show-Note`.
- **VTES-Open, console flash:** `-WindowStyle Hidden` still flashes a console for a moment. Use the same `.vbs` wrapper as Attention.
- **VTES-Open, browser prompt:** Chrome and Edge ask "Open VTES address?" for custom schemes. From a `file://` page the "always allow" box is usually not offered, so expect the prompt every click. BELIEVED.
- **VTES-Open, focus:** `SetForegroundWindow` from a freshly started process often only flashes the taskbar.
- **HTML "Open folder" (261-262):** a `file:///` link to a folder shows a browser directory listing, not Explorer. `#` and `%` in paths break the URL (only spaces are encoded). Use `encodeURI`, and make "Copy path" the primary button. The clipboard call itself works on `file://` with a click.
- **HTML search placeholder (70)** promises `#hashtag` search, but no hashtags exist in the data.
- **HTML colors (87-96):** the compartment rules do not match the numbered names in the legend. `01-JOBS`, `03-BUSINESS`, `04-AI-SYSTEM`, `05-REFERENCE` and `06-ARCHIVE` all fall into red "Unclassified: needs a decision", so once the real scan lands the biggest folder looks like a problem.
- **Inventory `-Roots` via `-File`:** `-Roots 'C:\AI','G:\My Drive'` arrives as one string under `-File` in 5.1, so both roots report missing. Use `-Command` or split on commas.

---

## Also noted (not in the top 12)

1. **Encoding:** the decision `.md` files are UTF-8 without BOM (Attention line 216), and they can contain non-ASCII text copied from the queue. A 5.1 reader using `Get-Content` with no `-Encoding` will show mojibake. Write `.md` files for the desktop cycle with a BOM. The scripts themselves have the BOM and are ASCII-only (checked with grep).
2. **Mutex:** `Local\VTES-Attention` is handled correctly. `WaitOne(0)` then release in `finally` is fine; `Abandoned` is not a practical risk.
3. **VBS quoting** in `-Install` is correct (quotes doubled, ASCII, window style 0). It breaks only for non-ASCII user names.
4. **Banner has no dismiss.** It stays on top of the window title bar until answered, and later alerts wait behind it unseen. The summary banner's "LATER (2 hours)" button schedules nothing; it only closes.
5. **DPI:** `powershell.exe` is not DPI-aware, so the banner may look blurry on scaled screens and mixed-DPI placement can be off while the RI-022 check still passes (it uses the same scaled coordinates).
6. **ALERT_*.json drops** are never closed (state is always OPEN) and are re-read every poll, so old alert files show in "Waiting on Jorge" forever.
7. **Writes inside scanned folders:** Attention writes only to VTES-Inbox, VTES-Outbox and MY-DESK logs, and `%LOCALAPPDATA%`. It never writes into a scanned client folder. Inventory's only in-tree writes are the OutDir files from finding 4.

Shall I turn findings 1, 3, 4 and 5 into a patch for the desktop session to apply?
