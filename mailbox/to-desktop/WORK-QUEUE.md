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

## 13. OD-107 — Two sign-in failures, ONE cause: 1Password is locked and not answering (rides on TRK-2026-9346)

**Delivery note:** the desktop checkout cannot fast-forward (`git pull --ff-only`
refused, 15 ahead / 92 behind — TO-CLOUD.md 7 PM ET), so this item was ALSO filed to
`G:\My Drive\VTES-Inbox\MSG-CLOUD-TO-CODE_OD-107-SIGNIN-REPAIR_2026-09-19.md`. Same
text; work from whichever copy you can read.

**Issued by cloud 2026-09-19 from Jorge's four screenshots. Both the Desktop Executor and
Cowork are authorized to work this item; Jorge only touches Windows Hello or his master
password — nobody else ever types, reads, or records a password value.**

**Symptom A — Word.** Account page shows "Account Error — please sign in again" → Fix me →
Microsoft says "We couldn't sign you in — something went wrong when trying to sign in
with a passkey" → Windows Security pops "Insert your security key into the USB port."
Jorge has no USB key. Sign-in dies.

**Symptom B — 9Router.** The local AI-router dashboard (`http://127.0.0.1:20128/login`,
orange "9Router" page) rejects the password 1Password fills. It said **"3 attempt(s)
left before lockout"**; the page itself prints "Default password is 123456."

**Symptom C — Outlook (added 2026-09-19, second screenshot set).** "Outlook has
exhausted all shared resources, please close all messaging applications and restart
Outlook" — **three copies stacked**, each Outlook Data File retry spawning another.
Same family: Outlook's M365 account is in the same broken-token state as Word's, and
every failed re-auth leaks a MAPI session until the pool is empty. Fix is step 0.

**Root cause (cloud's read).** Microsoft has a **passkey** registered for
`jorge@teamusasales.com`. When Word asks for it, Windows hands the request to the
passkey provider on this PC — that is 1Password. **1Password has been sitting on its
own unlock screen for days** (MORNING-REPORT_2026-09-05, "1Password is sitting on its
own unlock screen"). A locked provider cannot answer, so Windows falls back to
"insert a hardware key," and the sign-in fails. **The same lock explains B:** locked,
the extension either fills nothing or fills the wrong `localhost` item — every local
app (LiteLLM, the VTS panel, 9Router) shares the hostname `localhost`, so 1Password
cannot tell their entries apart unless the saved URL carries the port.

This is not 1Password failing. It is 1Password locked, plus Section C of
TRK-2026-9346 (Hello unlock, default-manager, passkey provider) never finished.
Logged as **RI-046**.

### Steps — in this order

0. **Outlook first, it is blocking everything else.** Click OK on all three dialogs.
   Then Task Manager (Ctrl+Shift+Esc) → Details tab → **End task on every
   `OUTLOOK.EXE`** (there will be more than one — zombies are the cause), and on
   Teams / Skype / any other messaging app. Reopen Outlook. If the dialog returns
   within the session: close Outlook, Win+R → `outlook.exe /resetnavpane`, reopen.
   If it returns a third time, count the data files (File → Account Settings → Data
   Files) and add-ins (File → Options → Add-ins) and report both numbers — the MAPI
   pool has a hard ceiling and something on this machine is eating it. **Evidence:**
   number of `OUTLOOK.EXE` processes found before the kill; Outlook reopened without
   the dialog, yes/no.
1. **Unlock 1Password** (Jorge present: face/PIN, or his master password). Then turn on
   1Password app → Settings → Security → **Unlock with Windows Hello** (Section C
   step 4) so this cannot silently happen again. **Evidence:** `op whoami` prints the
   account (paste the account name line only).
2. **Make 1Password the Windows passkey provider.** Windows Settings → Accounts →
   Passkeys → Advanced options → **1Password ON**. Then 1Password app → Settings →
   Security → **"Save and sign in with passkeys" ON**. Report each toggle's
   before-and-after state in words.
3. **Retry Word.** Word → Account → **Fix me**. If the passkey prompt now goes to
   1Password and signs in: done — report "Account page shows no yellow box."
   If Windows still asks for a USB key: click **"Sign in another way"** → password →
   Authenticator/phone code → sign in. That gets Word working today. Then report
   "passkey path still broken" — it means the passkey lives on the iPhone, not this PC.
   Fix for that: at `mysignins.microsoft.com` → Security info → **Add sign-in method →
   Passkey** → save it to 1Password on this PC (1Password's generated credential is
   pre-approved under TRK-2026-9346 Section B).
4. **9Router — stop guessing first** (lockout). Facts from the project README
   (github.com/decolua/9router): data lives in `~/.9router` → on this PC
   `C:\Users\JV\.9router\db\data.sqlite` (check `%APPDATA%\.9router` too); the
   dashboard port is `20128`; `INITIAL_PASSWORD` (default `123456`) is honoured
   **only when no saved password hash exists.** So:
   **Cloud found the answer in TO-CLOUD.md (RAMBO, 2026-09-15 4:17 PM):** *"9Router:
   logged into the dashboard with the password on file."* **The password is NOT
   `123456` — the desktop lane set one and has it on file, and it was never put into
   1Password.** That is the whole reason Jorge's attempts fail. So:
   a. Desktop: find where you keep that 9Router password "on file" (your own
      credential store / settings / the 09-06 install notes) and **save it as a new
      1Password item titled `9Router (127.0.0.1:20128)` with the full URL including
      the port** so autofill matches the port and stops colliding with the other
      localhost apps (`localhost:8731`, LiteLLM, VTS panel — give each its own
      port-in-URL item). Then Jorge's next visit fills correctly. Never paste the
      value anywhere else.
   b. Only if the on-file value cannot be found: stop the 9router process (that also
      clears any in-memory attempt counter), copy `data.sqlite` to
      `data.sqlite.bak-20260919`, then delete the saved-password row from its
      settings table (`sqlite3 data.sqlite` → look in the `settings` table for the
      password/hash key; delete only that row — the same file holds every provider
      API key, so never delete the file). Restart 9router; `123456` works again;
      change it in Settings to a 1Password-generated value (pre-approved,
      TRK-2026-9346 Section B) and save per step a.
   c. While in the dashboard: the 12-day standing blocker `9ROUTER-WIRE-NOW` is
      Providers → Claude Code → Add New Connection → consent. If Jorge is present,
      have him click it then and there — one click closes a 12-day blocker.
   d. Confirm at the end that 9router binds to `127.0.0.1` only, not `0.0.0.0` — the
      README's production example exposes it to the LAN, and the database holds live
      API keys (this is CVE-2026-63732, the default-password takeover).
5. **Suspect to check once in — RI-018.** *(Desktop 2026-09-19 23:26Z: this is a Power
   Automate CLOUD flow, not a Task Scheduler task — no local toggle. Off-switch is
   make.powerautomate.com → My flows → Turn off; owner click 8 on the one-click page, or
   Cowork with Jorge present.)* The hourly PAD routine
   `PAD - Verification Code Monitor (Hourly)` auto-re-requests Microsoft security codes.
   Repeated code requests are exactly what trips Microsoft's risk detection and
   invalidates Office's sign-in token, which would make Symptom A come back every few
   weeks. **Recommendation: disable it** (Task Scheduler / Power Automate → turn off,
   do not delete) and log the before/after state. Jorge told cloud today "get the
   situation under control"; cloud reads that as a yes on this — proceed unless he
   objects. Closes TRK-2026-9051.

### Evidence to paste back (TO-CLOUD.md)

- Outlook: zombie `OUTLOOK.EXE` count before the kill; reopened clean, yes/no.
- `op whoami` account line.
- Passkey-provider toggle: before → after.
- Word Account page: yellow box gone, yes/no. Passkey path fixed, or password path used.
- 9Router dashboard reached, yes/no. Lockout counter cleared, yes/no.
- RI-018 routine: still enabled / disabled, with the task's last-run time.

### Never

- Never type, screenshot, or store a password value anywhere — chat, repo, Drive.
- Never insert an unknown USB device to satisfy the "security key" prompt.
- Never turn Edge's or Chrome's password manager back on to "help."
- Never keep guessing at 9Router — a lockout turns a five-minute fix into a reinstall.

---

## 14. TRK-2026-9952 — OWNER DIRECTIVE: fill in the LLM Usage Inventory (read-only, GREEN even overnight)

**Jorge said this directly to cloud, in his own words: "Instruct RAMBO as an owner's
directive to do that work."** This is not a cloud-invented task — it is an explicit
instruction, passed on verbatim. `LLM-USAGE-INVENTORY.md` (repo root) is the shared
race-car table for every AI subscription Jorge pays for — tank size, refuel cost, reset
date, current fuel level, quality rank. Cloud filled in price and quality from the
existing routing guide; every plan/reset-date/current-usage cell is marked **NEEDS
JORGE** because no session has login access to any billing page. Read that file first
so the shape of what's needed is clear before starting.

**What to do — one pass, whatever is already logged in on this machine's browsers:**

1. **Claude first, it matters most** — open `claude.ai/settings/usage` (or the current
   equivalent settings page) in whichever browser profile is already signed into Jorge's
   Anthropic account. Read off: confirmed plan tier (Pro / Max 5x / Max 20x), the usage
   window's reset day, and current usage (used or remaining, whichever the page shows).
2. **Then whichever of these are already logged in** — do not sign into anything that
   isn't already logged in, see the rule below: `chatgpt.com` → Settings → usage/limits
   (ChatGPT), `one.google.com` subscriptions/usage or the Gemini app's account page
   (Gemini), Grok's app account settings (Grok), the M365 admin/usage page if visible
   (Copilot — confirm it's the Premium bundle, not the retired standalone Pro tier).
3. **Paste the raw numbers back to `TO-CLOUD.md`**, one line per service: plan tier,
   reset date, usage used or remaining (whichever the page states — say which). Cloud
   will fold them into `LLM-USAGE-INVENTORY.md` and mark it live from that point.
4. **If a service isn't already logged in on this machine, say so and skip it** — "ChatGPT:
   not logged in on this profile, skipped" is a complete and correct answer for that line.
   This is read-only browsing of pages you're already signed into — never a new sign-in,
   never a password, never an MFA code, never a "keep me signed in" click on an unfamiliar
   device prompt.

**Never:** sign into any of these five accounts that isn't already logged in. Never enter
a password or MFA code for this task. Never store a number that came from a guess instead
of the page itself — if a number isn't visible, say "not visible on this page" rather than
estimating.

**Addendum, 2026-09-23, Jorge direct:** re-confirmed as an owner directive in a second
message — his words: *"consider this a owner directive and pass it on to Rambo in that
fashion so he accesses."* **This does not loosen the Never list above** — cloud read his
"modifying my rule" as authorizing you to check pages already logged in, not as permission
to enter passwords or click through new sign-ins. If Jorge meant something broader, that
needs his own unambiguous confirmation, not an inference from here. **Jorge already
checked Claude's own number himself** (see `LLM-USAGE-INVENTORY.md`, filled in): main pool
~14% left for the week, Fable pool exhausted, page projects the main pool running out by
~10am tomorrow at the current rate. That part of item 14 is done — focus the rest of this
pass on ChatGPT/Gemini/Grok/Copilot.

**Addendum 2, 2026-09-23 (TRK-2026-9952d), Jorge direct — the tokens-to-dollars button.**
Jorge asked for an on-demand report that turns tokens into dollars. The only tool that
does this for real is **`ccusage`**, a free read-only tool that reads Claude Code's own
log files on this PC (`~/.claude/projects`) and prints tokens and what they would cost
at API list price. It needs no login, sends nothing out and changes nothing. GREEN.

1. In PowerShell run: `npx ccusage@latest monthly` then `npx ccusage@latest daily --since 20260901`.
2. Paste both outputs, unedited, into `TO-CLOUD.md` under the heading `TRK-2026-9952d`.
3. If `npx` is missing, say "npx not installed" and stop. Do not install Node for this.
4. If it works, make a desktop shortcut called **"LLM Usage Report"** that runs command 1
   and pauses so he can read the result. That shortcut is the button. It only
   launches, so it is not storage.

**Say it plainly in the report:** these dollars are *what the tokens would have cost on
the API*. They are not what Jorge paid, because Max 20 is a flat $200/month. They show
whether the subscription is paying for itself.

---

## 15. TRK-2026-9082 — Repair the broken git push (this is "the communication" Jorge means)

**Jorge's words, 2026-09-23: "instruct Rambo to repair your communication."** This is the
long-standing, already-diagnosed defect: **the desktop's `git push` does not work**
(Windows Credential Manager, first logged 2026-08-15, RI-002's mechanism section). You
commit locally and the push either fails silently or is never actually run — which is why
every one of your results has to go through the Drive mailbox for cloud to mirror in,
instead of landing directly. Fixing this removes that whole detour.

1. **Reproduce it first, don't guess.** Make a trivial local commit, run `git push` for
   real, and capture the exact error text — timeout, 403, wrong credential, expired token,
   whichever it is. Paste the raw error, not a paraphrase.
2. **Check Windows Credential Manager** (`Control Panel → Credential Manager → Windows
   Credentials`) for the stored GitHub entry — is it present, expired, or pointing at the
   wrong account/token scope?
3. **If it's an expired or scope-mismatched personal access token:** a new token needs to
   be generated **on GitHub, by Jorge, in his own browser session** — this is account
   credential creation, so it is Jorge's click, not yours to generate or type in for him.
   Stage the exact steps for him (which GitHub settings page, what scopes to tick) rather
   than doing the sign-in yourself.
4. **If it's something else** (e.g. `credential.helper` misconfigured, a cached bad
   credential, git itself pointing at the wrong remote) — that part you can fix directly,
   it isn't a secret-entry step.
5. **Prove the fix**, don't just claim it: after whatever change, make a real commit and a
   real `git push`, and paste the command output showing it reached `origin` — the same
   standard RI-002 already demands for every claimed fix in this repo.
6. **Report the outcome in `TO-CLOUD.md`** either way — fixed-and-proven, or exactly which
   step needs Jorge's one click, with the smallest possible ask spelled out.

---

## 16. TRK-2026-9952e — OWNER DIRECTIVE: PC never sleeps + line up the night runs (mid-tier, price-controlled)

Delivered via Drive on 2026-09-23 because Jorge was away from the PC. The full text is
`G:\My Drive\VTES-Inbox\MSG-CLOUD-TO-CODE_OWNER-DIRECTIVE_STAY-ON-AND-NIGHT-RUNS_TRK-2026-9952e_2026-09-23.md`
(Drive ID 1zRQX0fCMd5ZkDgwZzpnKSfSE8j_3rNYj). In short:

1. **Save the current power settings first** (that saved copy is the undo). Then run
   `powercfg /change standby-timeout-ac 0` and `powercfg /change hibernate-timeout-ac 0`,
   and add a daily task `CU-Keep-Awake` that re-applies them, because Windows Update resets them.
   If admin rights are needed, report BLOCKED and stop there.
2. **Rebuild `OVERNIGHT-QUEUE.md`** from what is really pending: OCR Queue A only, GREEN only.
   OCR stays a plain Tesseract script with zero LLM tokens. Use `--model sonnet` only for
   QC sampling (1 in 20) and judgment steps. Stop the LLM steps if the weekly pool drops under ~5%.
3. **Result file** goes to VTES-Outbox with nonce `NIGHT-NONCE-OSPREY-7734-20260923` + `STARTED-BY:`.

---

## 17. Install Grok Build desktop app (jonyb21/grok-build-app) — owner request 2026-09-27 · PASTE-D-053

Jorge asked cloud to install this and said **do not ask him to run it**. Cloud cannot: the
installer is Windows-only (it throws on non-Windows) and cloud has no link to the PC.
**You run it. Jorge does nothing except sign in to grok.com at the end if asked.**

Cloud reviewed the whole repo before queuing it (install.ps1, src/*.cs, scripts/Build-Icons.ps1):
it downloads only the official x.ai CLI installer, compiles a small launcher with the
built-in `csc.exe`, and makes Desktop + Start Menu shortcuts. No admin needed. Nothing
sends data anywhere else. It is reversible with `uninstall.ps1`.

Steps:

1. `git clone --depth 1 https://github.com/jonyb21/grok-build-app C:\Users\JV\grok-build-app`
   (if the folder already exists: `git -C C:\Users\JV\grok-build-app pull`).
2. `cd C:\Users\JV\grok-build-app` then
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1`
3. Do **not** touch `%USERPROFILE%\.grok\auth.json` or `config.toml` if they already exist.
4. Proof of DONE: paste the printed summary and the contents of
   `%USERPROFILE%\.grok\grok-build-app-install.json` into `mailbox/TO-CLOUD.md`.
5. If `login_needed` is true, tell Jorge in one line: "Double-click Grok Build on the
   Desktop and sign in at grok.com." That is his only step.
6. Failure rules: missing `csc.exe` = BLOCKED, report the path. If the official x.ai
   installer fails, stop — never download an unofficial grok binary. A failed taskbar pin
   is still a success.

Undo: `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\JV\grok-build-app\uninstall.ps1`

### Item 17 addendum — 2026-09-27 · PASTE-X-008 → COWORK (supersedes PASTE-D-053 as the pointer)

Jorge re-sent the install request and added two more. All three need his screen, so
**Cowork does all three**; the desktop lane backs it up. Order:

**A. Grok approval pop-up that is waiting for him.** Cloud searched Gmail (x.ai mail, last
7 days) and the OD-107 approvals board: **no Grok approval is waiting in either.** So the
prompt is on the PC screen. Take a screenshot and find it: a Grok CLI / Grok Build permission
prompt, a Windows "Do you want to allow" (UAC) box, or a browser sign-in tab at grok.com / x.ai.
Bring it to the front and read it aloud to Jorge in one sentence. **He clicks Allow himself**
(Cowork never approves on his behalf). If it is a sign-in, he types the password; you do not.

**B. Install Grok Build.** Steps 1–6 above (clone, `install.ps1`, proof to TO-CLOUD.md).
Cowork can open PowerShell and run them. If the pop-up in A turns out to be this installer's own
x.ai CLI prompt, that is expected.

**C. "Router password issue."** Cloud's records: **9Router was UNINSTALLED 2026-09-20 at Jorge's
request (TRK-2026-9961)**, and the 09-24 morning report shows the **Grok router and LiteLLM :4001
OFFLINE**. Check which one is on screen:
1. If 9Router is back and asking for a password: the working password is "on file" with the
   desktop lane (RAMBO 09-15). Use it, then save it to 1Password as `9Router (127.0.0.1:20128)`.
   Never guess — it locks after 3 tries.
2. If it is the Grok router / LiteLLM: it does not use a password; it uses `XAI_API_KEY`.
   Start it bound to 127.0.0.1 only, confirm `http://127.0.0.1:4001/health` answers.
3. If it is the Wi-Fi router: stop and tell cloud; that is a different job.
Report which one it was and the proof to TO-CLOUD.md.

## 18. ON HOLD (GW-0001 not approved 09-29) — OpenRouter gateway · PASTE-D-054 · rules: CLAUDE.md Article 5

Read `GATEWAY-DECISION_2026-09-27.md` (DECISION section) first. **Never put Claude Code behind it.**

0. Wait until Jorge has done his one step: signed in at openrouter.ai and bought **$10 of credit
   with auto top-up OFF** (approval GW-0001, $10.80 total). If not done, stop and say so.
1. Create one API key named `CU-bots-nightruns`. If the page offers a credit limit per key, set $10.
2. Save it straight into 1Password as `OpenRouter — CU-bots-nightruns`. Never into a file, the repo,
   or chat. Bots read it from 1Password or a user environment variable `OPENROUTER_API_KEY`.
3. Copy real prices for the models we use from openrouter.ai/models into `tools/llm_prices.json`
   and set "Last checked" to today.
4. Proof round-trip (costs well under $0.01, pre-approved as part of GW-0001): one request to
   `https://openrouter.ai/api/v1/chat/completions` with a cheap model, asking "reply OK".
   Paste the model name, the reply and the cost shown on the OpenRouter activity page to TO-CLOUD.md.
5. After that, **every paid run** goes through `tools/llm_cost_gate.py` — estimate, wait for
   APPROVED, then run. No exceptions.

## 19. Free Gemini path — APPROVED by Jorge 2026-09-29 ("yes, approved, execute") · PASTE-X-009 → COWORK

Cost: **$0** (Gemini free tier). No card. If Google asks for billing, STOP — that is not approved.
Cloud already fixed and tested the tool (`vts-llm-panel/`, 4 offline tests pass): Gemini model
updated to `gemini-2.5-flash` (1.5 was retired), and paid fallbacks are now blocked unless a cost
estimate is APPROVED (tools/llm_cost_gate.py). Cloud cannot reach Google, so the live proof is yours.

1. `git pull`.
2. In Chrome, open `https://aistudio.google.com/app/apikey`, signed in as jorgev2121@gmail.com.
   Click **Create API key**. If Google shows a consent screen, Jorge clicks Continue (his only step).
3. Save the key into 1Password as `Gemini API — free tier (VTS panel)`. Never into a file or chat.
4. Set it as a user environment variable, not in any script:
   `[Environment]::SetEnvironmentVariable('GEMINI_API_KEY','<paste from 1Password>','User')`
   then open a new PowerShell window.
5. Proof: `python vts-llm-panel\vts_llm_panel.py --health` must show `gemini LIVE`, then
   `python vts-llm-panel\vts_llm_panel.py "Reply with the word OK"` must show `[answered by: gemini]`.
6. Paste both outputs (never the key) into TO-CLOUD.md under "ITEM 19 PROOF".

### Item 19 — CHECKPOINT MODE (Jorge 2026-09-29: "I do not trust Code to take A-Z")

Do ONE step, paste its proof to TO-CLOUD.md, then STOP and ask Jorge "Step N done — shall I do step N+1?".
Never chain steps. Do NOT resume the paused 1Password login-options cleanup unless Jorge says so by name.

- **Step 1 — DONE 2026-09-29 (Jorge confirmed 4 ok on PC).** (read-only): `git pull`; run `python -m unittest vts-llm-panel/test_vts_llm_panel.py -v`;
  report the 4 "ok" lines and `git log --oneline -1`. Change nothing else. STOP.
- **Step 2 (Jorge, 3 clicks, no agent):** aistudio.google.com/app/apikey → Create API key → Copy →
  save in 1Password as `Gemini API — free tier (VTS panel)`. If Google asks for billing: stop, $0 only.
- **Step 3 (after Jorge says "step 3"):** set user env var `GEMINI_API_KEY` from that 1Password item
  (`op read`), open a new shell, run `--health` and one "Reply with the word OK" call. Paste outputs,
  never the key. STOP.

## 20. Free AI keys straight into 1Password — Jorge approved 2026-09-29 · PASTE-X-010 → COWORK
Supersedes item 19 steps 2–3. Protocol base: `ONE-PASSWORD-TAKEOVER_TRK-2026-9346_2026-08-18.md` Section A —
**no executor reads, types, stores or transmits a key value.**

**Rules:** $0 only — if any site asks for a card, skip it and report. Sign up with "Continue with Google"
(jorgev2121@gmail.com). **Do not take a screenshot while a key is on screen, and never read a key aloud or
type it anywhere.** Checkpoint mode: after EACH key, report "SAVED: …" line and ask Jorge "next key?".

0. `git pull`. Unlock check + dry run: `.\tools\Save-ClipboardKeyTo1Password.ps1 -SelfTest`
   must print SELF-TEST PASSED. If vault AI-Services is missing, stop and report.
For each row: open the page → create key → click the page's **Copy** button → run the script → close the key page.
1. Gemini — aistudio.google.com/app/apikey → "Create API key" → `-Title "Gemini API free"`
2. Groq — console.groq.com/keys → "Create API Key" → `-Title "Groq API free"`
3. Cerebras — cloud.cerebras.ai → API Keys → `-Title "Cerebras API free"`
4. Mistral — console.mistral.ai → choose the free "Experiment" plan (may text Jorge's phone a code —
   his only step) → API Keys → `-Title "Mistral API free"`
5. OpenRouter — openrouter.ai/settings/keys → create key, **add no credit** (free models only, $0) →
   `-Title "OpenRouter API free"`
5a. GitHub Models — github.com/settings/personal-access-tokens → fine-grained token, **only** permission
    "Models: read", expiry 1 year → `-Title "GitHub Models token"`
5b. NVIDIA — build.nvidia.com → sign in → "Get API Key" → `-Title "NVIDIA API free"`
5c. SambaNova — cloud.sambanova.ai → API Keys → `-Title "SambaNova API free"`
5d. Hugging Face — huggingface.co/settings/tokens → "Read" token → `-Title "Hugging Face token"`
5e. Cohere — dashboard.cohere.com/api-keys → the free **Trial** key → `-Title "Cohere API trial"`
5f. **Airtable (Wally pipeline, Article 2 priority)** — airtable.com/create/tokens → personal access
    token, scopes `data.records:read` + `data.records:write` + `schema.bases:read`, access = the Wally
    CRM base only (if no such base exists, skip and say so) → `-Title "Airtable Wally token"`
6. Proof: `.\vts-llm-panel\run-panel.ps1 --health` → paste the table (shows LIVE / NO-KEY, never keys)
   into TO-CLOUD.md under "ITEM 20 PROOF".

**Not in this item (paid — cost gate first):** OpenAI, Anthropic API, xAI/Grok. Existing XAI key is dead.

**Data rule for free tiers:** providers may use free-tier inputs to train models. Until reviewed, send
them no client names, addresses, SSNs or account numbers — sorting labels and generic text only.

## 21. Grok Bot "out of usage" — check which account it is signed into · PASTE-X-011 → COWORK
**Facts (cloud, from Gmail 2026-09-29):** "Grok Bot is now included with your SuperGrok plan" (updates@email.grok.com,
2026-08-27, to jorgev2121@gmail.com). SuperGrok is active (Stripe receipt #2347-8393, 2026-09-17). Grok Bot usage is a
quota that resets on a timer ("Your Grok Bot usage just reset", 2026-09-05). Jorge ALSO pays X Premium+ ($40) — a
different login that also carries Grok. **API keys and SuperGrok are separate billing and cannot be linked.**

Read-only, checkpoint mode — look and report, change nothing:
1. Open the Grok Bot app (desktop). Find Settings / Account. Report which account is signed in: the grok.com
   account jorgev2121@gmail.com (holds SuperGrok) or an X account (holds X Premium+).
2. Report the plan it shows and the usage-reset time it shows. No screenshots of anything showing keys or cards.
3. STOP and ask Jorge. If it is the X account: the fix is Sign out → sign in with the account that holds SuperGrok
   (Jorge clicks; 1Password fills). If it is already SuperGrok: usage simply ran out; it comes back at the reset time,
   and more usage means a bigger plan (SuperGrok Plus ~$100/mo — needs Jorge's approval, cost rule).

### Item 21 — UPDATE 2026-09-29: Jorge APPROVED moving the bots to SuperGrok (PASTE-X-012)
> Jorge: "cowork to move bots to supergrok; if too challenging recreate the bots under the supergrok account."
4. **Before changing anything, inventory every bot** into `mailbox/to-cloud/GROK-BOTS-INVENTORY_2026-09-29.md`:
   name, its full instructions text, schedule, which tools/apps it is connected to. **No passwords, keys or tokens.**
   Commit + push it. This file is what makes recreation possible if the old bots do not carry over.
5. Sign Grok Bot out, sign in with the SuperGrok account (jorgev2121@gmail.com; 1Password fills, Jorge approves).
   Report: plan shown, usage shown, and whether the bots are still listed.
6. If the bots did not come across: recreate each one from the inventory, one at a time, and report after each.
   Re-connecting a tool (Gmail, Drive, etc.) needs Jorge's consent click — ask, never click consent for him.
7. Do NOT delete anything on the X account. Old bots stay there until Jorge says otherwise.

---

## 22. Broken shortcut pop-up: "shortcut file no longer exists" in OneDrive\Scripts\Panel · PASTE-D-068 → DESKTOP

**Reported by Jorge 2026-10-09.** When he clicks something, a pop-up says a Windows
shortcut under `C:\Users\JV\OneDrive\Scripts\Panel\` no longer exists. The cloud
cannot see the PC, and the full filename was cut off in what he pasted. **Do not ask
Jorge diagnostic questions. Find it yourself.**

Checkpoint mode: do one step, show the proof, then stop.

1. **Find it (read-only).**
   - List `C:\Users\JV\OneDrive\Scripts\Panel\` with dates, or record that the folder is gone.
   - Search for anything that points into that folder: Desktop and Start-menu `.lnk` targets,
     `VTES-CONTROL-PANEL.html`, `BRIDGE-PICKER.hta`, the scripts in `OneDrive\Scripts\`,
     the browser's start pages, and Task Scheduler.
   - Check the OneDrive recycle bin and the Windows recycle bin for the missing `.lnk`.
   - Report: what Jorge clicked, which file it calls, and whether that file was deleted,
     moved, or never created.
2. **Fix (only after step 1's proof is shown).**
   - If it was moved, re-point the caller to the real file.
   - If it is in a recycle bin, restore it.
   - If its target is gone for good, remove the dead button rather than leave a pop-up.
   - Back up any file before editing it (`NAME_bak-YYYYMMDD.ext`, extension last — never `.ext.bak-DATE`). Delete nothing without Jorge's yes.
3. **Proof.** Click the same button once. It should open the right thing with no pop-up.
   Push a short result to `mailbox/to-cloud/`.

## 23. REMOVE the PC headless cap, then Speechify everywhere · PASTE-D-071 → DESKTOP · owner yes 2026-10-14 ~8:50 AM ET
**Owner words:** "yes, remove the PC limit first. Add all enhancements available so speechify becomes available to read highlighted and or auto-populate". RED approved by Jorge in chat. Work from branch `claude/pensive-allen-tyjgl4` (git fetch + checkout that branch first).

**A. Remove the cap (RECURRING-ISSUES 2026-10-14, option 2, Tier 2 — removal).**
1. Backup first: copy Inbox-Codex-Failover.ps1 to `Inbox-Codex-Failover_bak-20261014.ps1` (same folder). Write rollback `Rollback_Remove-Headless-Cap_2026-10-14_HHMM.ps1` to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\` (it copies the _bak file back).
2. In Inbox-Codex-Failover.ps1 (and any other script that writes CAP-REACHED_*.md — search for "CAP-REACHED" and "daily cap"), remove the home-made daily counter so headless Claude runs are limited only by Anthropic's real plan limit. Do not touch any other logic.
3. Proof: run one headless job; show it starts after the old 6 limit would have blocked it; no new CAP-REACHED file. Write `EXECUTED_REMOVE-HEADLESS-CAP_2026-10-14.md` to VTES-Outbox with the diff, the backup path and the rollback path.
4. Then drain the stalled queue in order: orders/pending/ (oldest first), RAMBO-QUEUE_2026-10-12.md, the PaperPort-188 table copy, Alec PDFs copy. Codex never gets client data.

**B. Speechify everywhere (YELLOW — rollback first).**
1. Install the new read-aloud script: run `tools\readaloud\Install-Read-Aloud.ps1` from the branch. New: **highlight text in ANY app, press Ctrl+Alt+R (Edge reads it) or Ctrl+Alt+S (Chrome + Speechify)** — no Copy click needed; the clipboard is restored.
2. Speechify browser extension in BOTH Chrome and Edge: installed, signed in, enabled. Open its settings and switch ON every option that reads highlighted text or shows the player automatically (right-click "listen"/context menu, the on-page play button, auto-show on all sites). Write down the exact names of the options you switched on — do not guess.
3. Windows right-click on files: do orders/pending/MSG-CLOUD-TO-CODE_SPEECHIFY-RIGHT-CLICK_2026-10-14.md (HKCU only, rollback first).
4. If the Speechify Windows desktop app is installed, turn on its own "read selected text" shortcut if it has one; record the key.
5. Proof: screenshots of each switched-on setting + both right-click menus → `EXECUTED_SPEECHIFY-EVERYWHERE_2026-10-14.md` in VTES-Outbox.

## 24. Claude opens on RAMBO (Code) + Claude Launcher pinned to the taskbar · PASTE-D-072 → DESKTOP · owner ask 2026-10-14 ~9:05 AM ET
**Owner words (summary):** clicking Claude should open the desktop executor RAMBO by default; all other Claude options one click away; an off-the-rack dashboard pinned as an icon. No official Anthropic launcher exists (docs checked 2026-10-14), so the cloud built `tools/claude-launcher/Claude-Launcher.html` (tested: 11 links, no errors, fits phone width).
YELLOW — rollback first (`Rollback_Claude-Launcher_2026-10-14_HHMM.ps1` in Undo_Manifests: removes the 2 shortcuts, re-pins the original Claude icon).
1. Copy `tools\claude-launcher\Claude-Launcher.html` to `C:\VTES-LOCAL\ClaudeLauncher\`.
2. **Default = RAMBO:** create shortcut "Claude — RAMBO (Code)" whose target is `claude://code/new` (documented Claude desktop deep link; add `?folder=<the repo folder on this PC>` if Desktop accepts it). Unpin the plain Claude icon from the taskbar and pin this one in its place (Claude icon as the shortcut icon). TEST: click it → a new Code session opens. If `claude://` cannot be pinned directly, make the shortcut run `explorer.exe "claude://code/new"`.
3. **Launcher:** open the launcher HTML in Edge → ⋯ → Apps → "Install this site as an app" (name "Claude Launcher") → right-click its taskbar icon → Pin to taskbar. Also put a shortcut on the Desktop (launchpad only). First click on a 🖥️/🤝/💬 tile: tick "Always allow" for claude://.
4. TEST every tile once; note any that fail.
5. Proof: screenshot of the taskbar + launcher → `EXECUTED_CLAUDE-LAUNCHER_2026-10-14.md` in VTES-Outbox.

## 25. Panel approvals 2026-10-14 (owner yes 10:38 AM)
**Owner words:** "YES — go ahead with the workaround in the blocker note", clicked in the panel's "Waiting on you" list at 10:38 AM ET. Covered by the already-pasted PASTE-D-072 queue drain. No new paste ID. Do these after items 23 and 24.

1. **D-062 read-only check (A-20260928-16). GREEN, read-only.** The result never came back since 2026-09-28 (no `PASTE-D-062-RESULT.txt` in VTES-Outbox, searched by cloud 2026-10-14). Run **only section 1** of `mailbox/to-desktop/Executor-Takeover_PASTE-D-063.ps1` (the "Read-only check" block: state of `CU-Uptime-Heartbeat`, `VTES-LOCAL-POLLER`, `CU-Inbox-Job-Watcher`; newest Outbox file; reachability of api.anthropic.com, github.com, drive.google.com; printer queue). Do not run the other sections; they were for the 2026-09-28 rebuild. Write the output to `G:\My Drive\VTES-Outbox\PASTE-D-062-RESULT.txt` with today's date on line one. Proof = that file exists.
2. **Two PC confirmations from the 17 owner gates (A-20260731-17, gates REG-0009 and REG-0010). GREEN, read-only.** Check whether (a) the Buttons 9/10/13 install package from 2026-07-23 and (b) the Dropbox Auto-Installer Watcher are installed and working on this PC. Look only: list the files, shortcuts and scheduled tasks by name, and the watcher's last run time. Change nothing. Write `EXECUTED_GATES-REG-0009-0010-CHECK_2026-10-14.md` to VTES-Outbox: one line each, "PRESENT and working", "PRESENT but broken (why)", or "NOT FOUND". Jorge has already approved both gates; this check is the proof they can be closed.

## Standing note for the desktop session

Your last two replies ended by asking Jorge to pick between technical options and by
handing him four decisions. `CLAUDE.md` Rules 1 and 7 forbid both. **Recommend one
option, give the tradeoff in a single line, and proceed unless he objects.** He is a
non-technical one-man operation; work handed back to him does not get done.

## Item 26 — Panel feeds to 100% via Power Automate Desktop (PAD) · owner ask 2026-10-14 ~9:45 PM ET · 🖥️ DESKTOP
Goal: finish the 22 PC-only panel pieces (TASKS, APPROVALS, ORCHESTRATOR, TODAY, SESSIONS, CONNECT, STATUS, OCR, REPORTS, JOBS, CAPSULES, LLMS, AGENTS, USAGE, BACKUP). Each piece only needs the PC to write ONE small status file to Drive VTES-Outbox on a schedule; the panel reads it.
Build each as a PAD flow (Windows Task Scheduler trigger), no Claude run needed, so the 6-a-day cap does not matter:
1. Every 5 min: `_RAM-GUARD-HEARTBEAT.md` + free-RAM number → STATUS (RAM guard, Free RAM).
2. Every 20 min: `_OCR-HEARTBEAT.md` + counts of PaperPort / Downloads / Dropbox / C: scans waiting → STATUS, OCR.
3. Every 15 min: `heartbeat.json` per lane (Orchestrator, Token Monitor, Local Executor) with OK/FAILED/LATE/STUCK → SESSIONS, CONNECT, USAGE (token monitor tile).
4. Hourly: export the PC task registry and approvals queue as `PC-TASKS.json` and `PC-APPROVALS.json` → TASKS, APPROVALS, TODAY (no money amounts — counts only).
5. Hourly: job-folder census `PC-JOBS.json` (folder, file count, newest file date) and `_TAG-INDEX.json` → JOBS, CAPSULES.
6. Hourly: LLM provider ping results `LLM-HEALTH.json` (13 providers, up/down only) → LLMS; housekeeping counts → AGENTS; repair rows → REPORTS.
7. Nightly 2 AM: backup of the repo + panel export to Drive `BACKUP/` with a dated name → BACKUP.
8. ORCHESTRATOR: worker picks up a queued job and writes back the same correlation ID (`CID-<date>-<n>`) in its EXECUTED file.
Rules: GREEN only (read, count, write new status files). No client file is moved, renamed or deleted. No money amounts in any feed. Proof: one EXECUTED_PAD-FEEDS_<date>.md listing each flow, its schedule and the first file it wrote (Drive ID). Grok bots cannot reach the PC, so they are not used for this item; they keep doing reminders. Did each flow write its first file?

## 27. Windows login error + reconnect disconnected agents (from panel orchestrator queue, 2026-10-10; missed 5 days, routed 2026-10-15)
- Jorge typed into the panel on 10-10: "fix windows login error and fix all LLMs and agent that are disconnected". No check read it until 10-15.
- PC: capture the exact Windows login error text (screenshot to VTES-Outbox), list which local agents and LLM links are down, and write EXECUTED_/BLOCKER_ to VTES-Outbox. Read-only first; no credential changes without Jorge present (1Password rule).

## 28. Free PC watchdog for the panel (no Claude usage) · OWNER-DIRECTIVE AGENTS-OWN-FOLLOW-THROUGH-01
- A small scheduled script (PAD or PowerShell, every 30 min) that reads the repo files selftest/SELFTEST-LOG.md and inbox-sweep/last-mail-check.txt. If either is older than 3 hours, it writes BLOCKER_EXEC01-SILENT_<time>.md to VTES-Outbox and shows a Windows toast.
- Purpose: when Claude's usage limit stops the Cloud checks, something still notices. GREEN: read-only plus one new file.

## 29. Owner-approved panel items of 10-14 (approved 14:01Z, never run) · Claude lane, client items never to Codex
1. outlook-fix: run the one-click stray-process clear and reopen Outlook.
2. edge-cookie-clear: clear Edge cookies for the HTTP 400 fix (1Password signs back in).
3. inbox-approval-gate: add the approval gate to CU-Inbox-Job-Watcher (already in OWNER-APPROVED-PC-ITEMS_2026-10-13).
4. codex-backup-install: check first; Codex is already installed and answered an order on 10-14 22:51. If installed, report "already done".
5. Alec reports TRK-2026-1286, 1292, 1534, 1612 (ready) and 1535, 1536 (PDFs not made): make the missing PDFs, then open ONE Outlook draft to Alec with all ready PDFs attached, for Jorge's Send. Never send.
6. claude-desktop-install: needs Jorge's own click on the Windows Administrator box; just leave the installer in Downloads and say so.
Receipt per item: EXECUTED_/BLOCKER_ in VTES-Outbox. The cloud then sets doneAt on each panel approval.

## 30. OCR to the LATEST protocol (L3), Phase 1 = 2022-01-01 to today · owner ask 2026-10-15 · 🖥️ DESKTOP · free lane, zero AI tokens
Files: tools/ocr/Install-OCR-QueueA.ps1 (v2), OCR-QueueA-Runner.ps1 (v2), OCR-L3-Lib.ps1, OCR-Census.ps1. Backups: *_bak-20261015.ps1.
1. Install Tesseract and Poppler if missing (the runner reports tools=False in the heartbeat if they are).
2. Run Install-OCR-QueueA.ps1. It registers the 15-minute runner and the hourly census. No admin needed.
3. Check G:\My Drive\VTES-Outbox\_OCR-HEARTBEAT.md grows and _OCR-CENSUS.md appears. Report both files as the proof.
Tested in the cloud on sample PDFs (text-layer and upgrade paths). NOT tested: scanned pages (no Tesseract in the cloud).
Order of work: 2022-to-today first, then 2021, 2020 and so on. Older sidecars are upgraded from their own text and backed up to C:\AI\ocr\_bak first.

## 31. Save the signed Unit 922 and 321 scans from email into the job folder (GREEN, read and save only) · owner ask 2026-10-15 · 🖥️ DESKTOP
1. Gmail message id 1a0848e2533236e2 (2026-09-09 03:32 UTC, subject "Permit Extension Applications - Units 220 & 721 ...") has two PDF attachments both named "PERM App - Extention of time submittal -.pdf". The same send is in Outlook Sent, 9/8 11:32 PM. Save both into the TRK-2026-1265 job folder as new files named per CLAUDE.md section 9.1 (do not overwrite anything), then tell the cloud the file names.
2. Open each and say which pages show a signature and a notary seal. Hebert Martinez's reply says they show Units 922 and 321.
3. Jorge also holds executed hard copies of 922 and 321. If the email scans are not clean, scan the hard copies instead.
4. Nothing leaves the PC. Sending to the Village is RED and waits for Jorge.

## 32. Print the Bal Harbour renewal packs, 3 copies each (GREEN, print only; nothing leaves the PC) · owner ask 2026-10-15 · 🖥️ DESKTOP
Files are in the repo folder renewal-packet/ : PRINT-PACK_3-copies_Unit-423_BLC2024-0714, Unit-922_BLC2024-0717, Unit-321_BLC2024-0707 (each 3 copies of the Renewal-marked application, 3 of the Notice of Commencement, and for 922 and 321 3 of the owner-signed recorded 2024 notice page). Print at 100 percent, black and white is fine, Letter size. Then tell Jorge which printer and the page counts (423: 6, 922: 9, 321: 9). Copy the packs and the v5 and NOC files into the TRK-2026-1265 Drive job folder as new files (do not overwrite). Unit 321 application has a garbled owner address line (needs fixing before signing).

## 33. Document-event bot with Power Automate Desktop (PAD), no AI in the loop · owner ask 2026-10-15 · 🖥️ DESKTOP · free lane
Goal: any action on the PC that creates or moves a document or email attachment is picked up at once, by rules, with no thinking and no tokens.
1. Outlook rule plus PAD flow: every new attachment is saved to one Drive folder `_INBOX-ATTACHMENTS` with the name `DATE _ SENDER _ ORIGINAL-NAME` (new file only, nothing overwritten).
2. PAD folder watchers on Downloads, Desktop, PaperPort and the scanner folder: copy each new file to the same inbox folder and add one line to `_INBOX-LOG.csv` (time, source, name, size).
3. A matcher reads the file name and text and looks for EXACT keys only: TRK number, permit number (BLC...), folio, unit plus address. Exact hit: write the key into the log row and the sidecar. No exact hit: leave it as an orphan (OPH number). No fuzzy matching, ever.
4. MOVING a file into a job folder is filing, which is RED. It stays a one-click approval until Jorge gives a standing yes for exact-key moves. Until then the bot only saves, stamps and logs.
5. The cloud watch reads `_INBOX-LOG.csv` hourly and updates the job page placeholders. See control-panel/ROOT-CAUSE_DOCS-NEVER-APPLIED-TO-PLACEHOLDERS_2026-10-15.md.
Related: item 26 (PAD panel feeds), item 31, item 32.

## 34. MODEL BLOCK on the PC: Desktop executor defaults to Sonnet · owner order 2026-10-15 ~4:10 PM ET · 🖥️ DESKTOP (GREEN, setting only, no client data)
Jorge ordered Fable 5.1 and Opus 5.5 blocked from running and using his usage limits. He never authorized them.
1. Back up the Claude Code settings file first (NAME_bak-20261015.ext). Write a rollback script to the Undo_Manifests folder.
2. Set the default model for Claude Code and for every scheduled task or headless script on this PC to Sonnet 5.5. Search the scripts for "opus", "fable" and "--model" and list every hit.
3. Do not choose Opus or Fable for any run unless Jorge says so in that run's own order.
4. Proof: the settings diff and the list of script hits, written to EXECUTED_MODEL-BLOCK_2026-10-15.md in VTES-Outbox. Then report the file name to the cloud.

## 35. WRONG OR DATED PANEL PAGE opens from the PC · owner complaint 2026-10-15 ~4:20 PM ET · 🖥️ DESKTOP (GREEN, read first)
Jorge clicked "VTES CONTROL PANEL" and got a page that says "Built 2026-10-15 15:46. Source dates are shown on each destination." It shows no version number and looks dated. The current panel is the claude.ai page titled "VTES Control Panel v58 (CURRENT)" (artifact 321Zo6MTHdv9Mj3hGD1QDj). That sentence does not appear in v58 or in the repo, so the PC is serving a different page.
1. Find which file or shortcut produced that page (the click target, the file path, its Built time, which task or script writes it). Read only. List every other panel page file on the PC with its date.
2. Back up what you change (NAME_bak-20261015.ext). Write a rollback script.
3. Point the "VTES CONTROL PANEL" button, the Desktop shortcut and the Claude Launcher tile at the v58 artifact link. Retire the older pages by moving them to _Superseded.
4. Proof: screenshot of the click opening the page with the version name in its title, plus the list from step 1, written to EXECUTED_PANEL-POINTER_2026-10-15.md in VTES-Outbox.

## 36. PaperPort and scanner feeder: read-only settings report (GREEN, change nothing) · owner ask 2026-10-15 ~6:50 PM ET · 🖥️ DESKTOP
Jorge has recurring feeder trouble. Gemini gave him PaperPort settings; the cloud has not seen them. First capture what is actually set, so the two can be compared.
1. Write a plain-words report, no changes, to `G:\My Drive\VTES-Outbox\EXECUTED_PAPERPORT-SETTINGS-REPORT_2026-10-15.md` (never overwrite).
2. For each PaperPort scan profile: name, scanner, driver type (TWAIN or WIA), Source (Flatbed / ADF / Duplex ADF), resolution, colour mode, "single page items" option on or off, "multiple pages into one item" on or off, "Hide scanner native user interface" on or off, save format, save folder.
3. The scanner: make, model, driver name, driver date and version, connection (USB or network), whether Windows lists it as healthy, and the last 10 scanner or PaperPort errors in Event Viewer (time and text only).
4. Feeder mechanics Jorge can check by eye are NOT for the PC; leave them out.
5. Proof: the file above. Tell the cloud the file name; the cloud compares it with Gemini's list once Jorge pastes it.
