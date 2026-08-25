# DESKTOP WORK QUEUE

**FROM:** Cloud session (claude.ai/code), 2026-08-15
**TO:** Desktop Claude Code
**Read this file at session start. Work top to bottom. Do not skip ahead.**

This file replaces pasted instructions. A restart wipes a pasted block; it cannot
wipe this file. When Jorge pastes a short pointer at you, this is what it points to.

Per `CLAUDE.md` Rule 2: each item is DONE only with pasted verification evidence.
Update `OPEN-ITEMS.md` as you go, and move finished work into `mailbox/done/`.

---

## 0. FIRST — state your model

Say which model you are running, in one line, before anything else.

If it is not Opus, **stop and fix item 1 before doing anything else.** Items 3 and 4
are architecture and diagnostic work; running them on a small model produces output
that has to be thrown away. See `RECURRING-ISSUES.md` RI-008.

---

## 1. TRK-2026-9021 — Unpin the model  ⚠ CRITICAL, DO FIRST

The statusline read `Using Haiku 4.5 (from .claude\settings.json)`. Jorge pays for
Max 20, which includes Opus. Every desktop session has silently inherited the
smallest model.

1. Show Jorge the contents of `.claude\settings.json` — the project one **and** the
   one in his user folder, if both exist.
2. Change the pinned model to Opus. If the `model` key will not accept it, delete the
   key so it falls back to the account's best available model.
3. Report **every other place a model is pinned** — `settings.local.json`,
   environment variables, launcher shortcuts, Windows Terminal profiles. There is
   drift across `haiku-4-5`, `fable-5` and `opus-4-8`; find all of it (TRK-2026-9022).
4. Restart. Confirm the statusline no longer says Haiku. **Paste it as evidence.**

**After restarting, come back to this file and continue at item 2.**

---

## 2. TRK-2026-9004 — Load the charter

```
git fetch origin && git checkout claude/chaude-code-max20-kp2o46 && git pull
```

Read `CLAUDE.md`, `HANDOFF.md`, `OPEN-ITEMS.md`, `RECURRING-ISSUES.md`,
`PASTE-LOG.md`. Quote **Rule 1** back to Jorge so he knows the charter loaded.

---

## 3. TRK-2026-9017 — Migrate ClaudeMemory into this repo

Do not build the OneDrive mailbox extension. It cannot work: cloud sessions run in an
ephemeral container with no access to the PC, so a Windows path like
`ClaudeMemory\mailbox\claude\outbox\` is unreachable from the cloud side — the bridge
would have only one end. OneDrive does not fix it either; the Microsoft 365 connector
is unauthorized. The mailbox *pattern* is right; this repo is the correct substrate.

1. Read everything in `OneDrive\Documents\ClaudeMemory\`, including
   `DIRECTIVE-REGISTER.md`.
2. Reconcile against `CLAUDE.md`. Do not duplicate rules that already exist here —
   note the overlap. Add what is missing.
3. Copy registry, mailbox and state files into this repo.
4. Commit and push to `claude/chaude-code-max20-kp2o46`.
5. Leave a `MIGRATED.md` note in the OneDrive folder pointing here, so nothing writes
   to the old location again.

**Evidence required:** output of `git show --stat HEAD`.

---

## 4. TRK-2026-9013 — Fix the bridge picker's MS Store button

It calls `shell.Run()` on a direct path:

```
C:\Program Files\WindowsApps\Claude_1.26832.0.0_x64__pzs8sxrjxfjjc\app\claude.exe
```

MSIX/Store-packaged apps **cannot** be launched by direct executable path — Windows
blocks it and the folder is ACL-restricted. That is what raised the two `claude.exe`
error dialogs. The try/catch reports the failure more politely but cannot fix it.

Fix by launching via AppUserModelID:

```
Get-StartApps | Where-Object { $_.Name -like "*Claude*" }
explorer.exe shell:AppsFolder\<AppUserModelID>
```

See RI-006.

---

## 5. TRK-2026-9014 — Repair the "CLAUDE" Windows Terminal profile

Fails with `0x80070002` (file not found) attempting:

```
- CODE -d C:\Users\JV C:\Users\JV\.local\bin\claude.exe
```

Two faults: that path does not exist, and the command line is malformed. Find the
real location with `where.exe claude` or `Get-Command claude`, then rewrite the
profile's `commandline`.

---

## 6. TRK-2026-9015 — Clear the Outlook pop-up

Caused by one corrupt reminder item, not by settings. Close Outlook, then run:

```
outlook.exe /cleanreminders
```

See RI-001.

---

## 7. TRK-2026-9018 — Turn on voice dictation

Type `/voice`, then hold space to talk. On Windows, first enable
Settings → Privacy & security → Microphone → **Let desktop apps access your
microphone.** Jorge dictates heavily; this matters more than it looks.

---

## 8. TRK-2026-9025 — Install and configure Wispr Flow

Jorge dictates constantly; this is his primary input method, not a convenience
(RI-010). `/voice` covers Claude Code only. Wispr Flow covers every application.

1. Install Wispr Flow for Windows from wisprflow.ai. It runs as a system tray app.
2. Set it to **Pro** — the free tier caps at 2,000 words/week (~285/day), which he
   will exhaust before lunch. $15/month or $144/year.
3. Configure both modes and show him each once:
   - **Dictation** — hold the hotkey (Fn by default), speak, released text lands at
     the cursor with punctuation already applied.
   - **Command** — highlight text, hold the hotkey, say "make this more formal" or
     "summarise in bullets", and the selection is rewritten.
4. **Check the Claude Code version first.** v2.1.83 broke Wispr Flow's text injection
   on Windows. If injection fails into the Claude Code prompt, run:
   `npm install -g @anthropic-ai/claude-code@2.1.81`
5. Confirm the tray icon is pinned and visible — see RI-001, hidden tray icons have
   cost him time before.

---

## 9. TRK-2026-9026 — Confirm Alt+V image paste works

`Ctrl+V` does not paste images into Claude Code on Windows and fails silently, which
led Jorge to conclude the window was unusable (RI-009). `Alt+V` works.

Have him take a snip, press `Alt+V`, and confirm the image registers. If it does not,
set up the VS Code extension route instead — do not leave him without a way to send
screenshots.

---

## 10. TRK-2026-9034/9035 — OCR: you reported this wrong, and it cost Jorge four hours

**Correction.** You read the 2026-08-13 `12:37` log, saw 28 of 28 failures, and told
Jorge the run was a total loss. **Drive says otherwise.** A later run the same day
wrote **at least 54 `.SEARCH.txt` sidecars between 16:35 and 17:57**, with real
extracted text from 625 bytes to 95 KB. See `OCR-STATUS.md` in this repo.

Before reporting a run as failed, check the *output*, not only the log.

Then do these:

1. **Task history — who disabled the four OCR tasks, and when.**
   `Get-WinEvent -LogName Microsoft-Windows-TaskScheduler/Operational` filtered for
   the task names, or check each task's History tab. This is the root cause of
   RI-015; do not just re-enable and move on.
2. **Re-enable** `CU-BulkOCR`, `CU-OCR-Intake`, `CU-OCR-Watch`,
   `CU-Inspections-Auto-Filing-OCR`.
3. **Restore the daily System Health email.** The last one is dated **2026-06-19**.
   That report is the sensor that should have caught this; it failed two months before
   the thing it monitors. Fix the sensor first.
4. **Enable Windows long-path support** (`LongPathsEnabled`). The 12:37 failures were
   long-path PDF open errors, and they will silently skip deeply-nested files forever
   otherwise. See RI-017.
5. **Count for a real completion figure** — total PDFs in scope versus total
   `.SEARCH.txt`. Cloud cannot get the denominator; you can, in seconds.
   Report both numbers, not a percentage on its own.
6. **Stamp the TRK into sidecars at OCR time.** Only ~11% carry one today, and three
   separate `LEGEND.PDF.SEARCH.txt` files exist in three folders with no way to tell
   them apart. See RI-016.

---

## 11. Search your own history for what was agreed and never done

Jorge's words: *"We discussed. We agreed. And ultimately it was not done."* Find those.

1. Search your Claude Code session history and project files for OCR decisions:
   ```
   Select-String -Path "C:\Users\JV\.claude\**\*" -Pattern "OCR" -List
   Select-String -Path "C:\Users\JV\OneDrive\Documents\ClaudeMemory\**\*" -Pattern "OCR" -List
   ```
2. Also check `CodeHandoff\Done\`, `DIRECTIVE-REGISTER.md`, and any
   `CROSS-LLM-THREAD.md`.
3. Produce a single list: **what was agreed, on what date, and whether evidence exists
   that it was done.** Anything agreed with no evidence of completion goes into
   `OPEN-ITEMS.md` with a TRK number.

**That list is the deliverable.** Do not summarise it in chat only — write it to
`OCR-AGREEMENTS-AUDIT.md` in this repo and push it.

---

## 12. TRK-2026-9740 — Executor tray icons: D / C / X, always visible  (Jorge asked 2026-08-25)

**Jorge's ask, third time on record (9341 → 9363 → today): every Claude executor
window gets an icon on his tray.** The FREEZE deferral in PASTE-D-019 is lifted for
this item by his direct request. This is the Tier-2 replacement Rule 4 requires —
no more shortcut-pinning patches (that was 9246, and it failed twice).

**The build is already done.** Cloud wrote `tools/tray/CU-ExecutorTray.ps1` on
branch `claude/executor-tray-icon-1cazza`. It draws three badge icons itself
(green **D** = Desktop executor, blue **C** = Cloud/web executor, orange **X** =
Cowork), left-click focuses-or-opens that window, right-click has Open/Exit,
re-asserts its own HKCU Run key every launch (Tier 3, no UAC — RI-036),
self-promotes out of the Win11 tray overflow (the 9341 failure), writes a
heartbeat file every 5 min (9249), and is pure-ASCII + BOM (RI-032).

Your steps — nothing here needs Jorge except the final look:

1. `git fetch origin claude/executor-tray-icon-1cazza && git checkout claude/executor-tray-icon-1cazza && git pull`
2. **Verify the three `$Targets` lines** against the real machine: the desktop
   terminal's actual window title (statusline says `🖥️ CODE · DESKTOP EXECUTOR`
   per D-024 — confirm what the OS title bar says), the browser tab title for
   claude.ai/code, and how Cowork actually opens on this PC (app vs URL). Fix the
   `TitlePattern` / `OpenCommand` values, **keeping the file ASCII-only** (RI-032).
3. Copy the script to a stable local path outside the repo checkout (e.g.
   `%LOCALAPPDATA%\CU-ExecutorTray\CU-ExecutorTray.ps1`) so a repo move never
   kills the logon entry, then run:
   `powershell -NoProfile -STA -ExecutionPolicy Bypass -File <that path>`
4. **Register it in `HEARTBEAT-ROSTER.json`** watching
   `%LOCALAPPDATA%\CU-ExecutorTray\heartbeat.log` for growth — a new component
   nothing watches is how the last one died (TRK-2026-9249 / RI-002).
5. **Acceptance evidence (Rule 2 — all four, pasted):**
   a. All three icons visible on the tray itself, NOT behind the `^` overflow —
      Jorge eyeballs, you paste his answer.
   b. Left-click each icon does the right thing (focus if open, open if not).
   c. Kill the process, log off/on (or re-run the Run-key command) — it comes back
      alone. That is the 9337-LOCKS self-healing test.
   d. `heartbeat.log` has grown after 10+ minutes.
6. Report via `TO-CLOUD.md`, update `OPEN-ITEMS.md` row TRK-2026-9740.

---

## Standing note for the desktop session

Your last two replies ended by asking Jorge to pick between technical options and by
handing him four decisions. `CLAUDE.md` Rules 1 and 7 forbid both. **Recommend one
option, give the tradeoff in a single line, and proceed unless he objects.** He is a
non-technical one-man operation; work handed back to him does not get done.
