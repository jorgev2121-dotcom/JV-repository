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

## Standing note for the desktop session

Your last two replies ended by asking Jorge to pick between technical options and by
handing him four decisions. `CLAUDE.md` Rules 1 and 7 forbid both. **Recommend one
option, give the tradeoff in a single line, and proceed unless he objects.** He is a
non-technical one-man operation; work handed back to him does not get done.
