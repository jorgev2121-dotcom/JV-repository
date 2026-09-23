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
5. **Suspect to check once in — RI-018.** The hourly PAD routine
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

## Standing note for the desktop session

Your last two replies ended by asking Jorge to pick between technical options and by
handing him four decisions. `CLAUDE.md` Rules 1 and 7 forbid both. **Recommend one
option, give the tradeoff in a single line, and proceed unless he objects.** He is a
non-technical one-man operation; work handed back to him does not get done.
