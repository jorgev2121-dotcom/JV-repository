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

## 12. TRK-2026-9348 — RII read-only 1Password inventory (Jorge present, ~10 minutes)

Script: `mailbox/to-desktop/RII-Inventory-ReadOnly.ps1`. Read-only, start to finish —
verified against `CLAUDE.md` TRK-2026-9346 Section A (no executor ever sees, types,
stores, or transmits a password value). It only reads `op whoami`, vault list, item
list, and each item's username field — never the password/OTP fields, never
`--reveal`. It never modifies, rotates, or deletes anything.

1. Sit with Jorge, unlock 1Password.
2. Run `.\RII-Inventory-ReadOnly.ps1` from this folder.
3. It writes `Inventory.csv`, `Duplicates.csv`, `IdentityMap.json`, `UrlMap.json`,
   `Top60.csv`, `Summary.md` to `C:\Users\JV\OneDrive\Documents\Reports\RII\<date>\` —
   **local only. Do not commit that folder to this repo or paste its contents into
   chat** — it contains real usernames/emails per account, which is personal data
   even without a single password in it.
4. Paste back only the console summary block (the `DONE.` line and the counts) —
   that has no personal data in it, and it is what closes out TRK-2026-9348.
5. Note in the paste: **the "Top 60" list is a heuristic (recency + identity-group
   weight), not a measured usage ranking** — the `op` CLI doesn't expose real
   usage-frequency data, so don't report it as if it were.

**If `op` is not signed in or the CLI isn't enabled yet**, that's TRK-2026-9346
Section C step 5 (1Password app → Settings → Developer → enable CLI) — do that first,
then re-run.

---

## 13. TRK-2026-9949 — Owner directive 2026-09-19: 3 desktop-executable approvals, plus dead-automation reactivation and 5 missing task-board files

**Jorge said "all approved as recommended" live in chat.** Full split in `OWNER-GATES.md`
under "OWNER DIRECTIVE 2026-09-19." Your three:

1. **`REG-0006`** — send the drafted COI refile email to RER Licensing (Outlook Drafts).
2. **`NEW-03`** — send the drafted 5-report email to Wally Milian + Alec Valdes (Outlook Drafts, since 2026-07-30).
3. **`NEW-05`** — close the line: confirm Zoho CRM dropped / shared workbook is CRM of record (already true, just mark it CLOSED in the register).

**"Reactivate if dead"** — `MY-TASK-BOARD.html`'s own live check reported **7 working, 2 out
of date, 5 dead**. Enumerate which of the "RUNNING FOR YOU" automations (skip-trace merge,
follow-up radar, REGISTRAR-01, inbox job watcher, typing shield, housekeeper, doc-intake)
are actually dead vs just showing stale output, and reactivate the true dead ones. Same
RI-001/RI-015 shape: a disabled task looks identical to one that ran and found nothing —
check Task Scheduler history, don't just re-enable and hope.

**Separately — 5 buttons on `MY-TASK-BOARD.html` are grayed out because the files they
point at don't exist on disk:** `OWNER-APPROVALS-PENDING.hta`, `RUNNING-LOG.html`,
`MARKETING-REPORTS.hta`, `SKIP-TRACE-ONE-CLICK.hta`, `TODAY-CALL-LIST.html`. Find whatever
script generates the task board and find out why these five were never written — that's
the actual defect, not the missing files themselves (regenerating them by hand would just
go stale again).

**Also reported: Jorge could not click the OK/action button on this same task board.**
Possible RI-023 family (that RI is windows opening off-screen / behind others / minimized
on this exact control-panel setup) rather than a broken button — before assuming the button
itself is broken, check whether the dialog is rendering off the visible monitor or behind
another window. If it's a genuinely broken `onclick`, that's a new finding — log it.

---

## 14. TRK-2026-9950 — Jorge asked to "refresh" LiteLLM, Ollama, 9Router — here's what each actually needs (not a uniform restart)

**LiteLLM** (per TRK-2026-9738/9739, 2026-08-26): was healthy at `localhost:4001` for 7
straight days, `db: Not connected` (admin UI loads but does nothing), and **every model
route 401s because no real keys are wired in** — `ANTHROPIC_API_KEY` absent, OpenAI/
OpenRouter placeholders. **The fix that was already found and never applied: a real
Grok/xAI key (84 chars) is already sitting on the machine, unused.** Wire that in first
(cheapest, no owner action needed) — 4-line config block into `litellm_config_4001.yaml`
per the 2026-08-25 wiring note. Jorge still needs to paste a real `ANTHROPIC_API_KEY`
himself for the Anthropic route (never accept it relayed through a report — paste-only,
directly into the config, same rule as every other key).

**Ollama** — confirmed down, nothing listening on `:11434` as of 08-26. Check whether the
service exists and start it, or confirm intentionally not run.

**9Router — do NOT install or restart. This one is not a refresh.** Per the RAMBO cycles
2026-09-06 (11:41 / 11:57 / 12:50, mirrored in `TO-CLOUD_MIRROR_2026-09-08.md`), 9Router
**was never installed** — it was correctly held BLOCKED three cycles running, including
once refusing an "approval" that arrived relayed through another AI session rather than
from Jorge directly, because it's an obscure, low-visibility package that would sit in
front of provider credentials once installed globally. That reasoning hasn't been
answered or overturned since. **If Jorge's "refresh...9Router" today is a fresh, direct
yes to installing it, treat it as that — a new direct confirmation — and say so back to
him in the register; don't fold it silently into a generic refresh pass.**

---

## Standing note for the desktop session

Your last two replies ended by asking Jorge to pick between technical options and by
handing him four decisions. `CLAUDE.md` Rules 1 and 7 forbid both. **Recommend one
option, give the tradeoff in a single line, and proceed unless he objects.** He is a
non-technical one-man operation; work handed back to him does not get done.
