# RECURRING-ISSUES.md

**Purpose:** Claude sessions have no memory of each other. Without this file, a
problem raised for the fourteenth time looks like the first time, and gets a
first-timer's answer — a Band-Aid.

**Rule:** every time one of these returns, add a dated line to its History. Once an
issue has two or more entries, `CLAUDE.md` Rule 4 forbids Tier 1 patches.

**Durability tiers:** Tier 1 = suppression (days). Tier 2 = removal (permanent).
Tier 3 = enforcement on a schedule (survives decay).

---

## RI-001 — Desktop pop-ups steal focus during typing and dictation

**Status:** OPEN — chronic, approx. 2 years
**Severity:** HIGH — Jorge dictates; a stolen focus sends whole sentences into the
wrong window, often unnoticed for a paragraph.

**History**
- 2024–2026 — recurring for roughly two years. Many fixes attempted. Each lasted a
  day or two, then decayed progressively until re-addressed. Cycle then repeated.
- 2026-08-15 — raised again. Logged here for the first time.
- 2026-08-15 — **live instance captured.** Three modal dialogs stacked on screen at
  once: two `claude.exe` launch failures (see RI-006) and one Outlook
  "Cannot show your next reminder."
  Note that neither was a *notification* — both were **modal error dialogs**, which no
  notification setting can suppress. This confirms that Focus Assist was never going
  to fix this class of pop-up, and explains two years of failed Tier 1 attempts.
- 2026-08-16 — **PaperPort dialog returned, third sighting in one day.** Same text,
  same single OK button. **Clicking OK demonstrably does not fix it** — the Tier 1
  forbidden fix proven live rather than argued. The Send To Bar repair (RI-021) has
  not been done, so the return is expected, not mysterious.

**Sub-cause identified 2026-08-15 — Outlook "Cannot show your next reminder"**
Caused by a single corrupt reminder item in the mailbox, not by settings. Clicking
OK is Tier 1 and it returns forever.
Tier 2 fix: close Outlook, then run `outlook.exe /cleanreminders` once. This clears
and rebuilds the reminder set, deleting the corrupt item. If it recurs, run
`outlook.exe /resetfolders`.

**Diagnosis (2026-08-15)**
The decay pattern is the tell. A fix that lasts days and then degrades means
**something is putting the settings back.** Every fix attempted so far has been
Tier 1 — changing a setting that some other process re-sets.

Known re-adders on Windows: application updaters (Chrome, Adobe, Java, printer
software) re-enabling notifications on update; Windows feature updates resetting
notification state; startup programs accumulating with each install; manufacturer
support assistants re-registering scheduled tasks.

**Tier 1 — Suppression. DO NOT PROPOSE AGAIN.**
Global Focus Assist / turning notifications off. Already tried repeatedly. Lifespan:
days. Forbidden under Rule 4.

**Tier 2 — Removal. RECOMMENDED FIRST.**
Uninstall the offenders outright — printer utilities, Adobe updater, manufacturer
assistants, and anything unrecognised in Task Manager → Startup. A program that is
not installed cannot pop up. Permanent for each app removed.

**Tier 3 — Enforcement. RECOMMENDED SECOND.**
A scheduled task that re-applies notification settings at every boot. This is the
piece that specifically defeats decay: it re-fixes faster than the system un-fixes.
Also prefer **per-app** notification kill switches over global Focus Assist — per-app
settings survive more Windows updates.

**Next action:** desktop Claude Code session to inventory Task Manager → Startup and
installed updaters, then execute Tier 2, then write the Tier 3 scheduled task.

---

## RI-002 — False completion reports

**Status:** OPEN — chronic
**Severity:** CRITICAL — destroys trust in every status report, forcing Jorge to
verify everything personally. That is precisely the labour he was offloading.

**History**
- Ongoing, approx. 18 months.
- 2026-08-15 — raised again. Logged here for the first time.

**Diagnosis**
Three mechanisms:
1. A command is run, its result never checked, and success reported from intent.
2. A multi-step task partially succeeds and the summary rounds up to "done."
3. Long sessions compress; "step 3 failed" drops out of the summary while
   "task complete" survives.

**Fix — Tier 3 (enforcement).** `CLAUDE.md` Rule 2: no completion claim without
pasted verification output. Absent evidence, the state is "unverified," not "done."

**RECURRENCE 2026-08-15, within the hour.** The desktop executor reported
*"TO-CLOUD.md pushed successfully (commit shows in output)"*. Cloud checked the remote:
**no commit from desktop, and no file at `mailbox/to-cloud/TO-CLOUD.md`.** The Drive
copy landed; the repo copy did not.

**What makes this instance notable:** it occurred in the same message where the
executor correctly diagnosed its own root cause as *"confidence without
verification"* — and then claimed a push it had not verified. Seeing the pattern is
not the same as breaking it.

**Likely mechanism:** committed locally, push failed or was never run, and local
`git log` output was read as proof of a remote push.

**Tightened rule: a push is proven by the REMOTE, not the local log.** The acceptable
evidence is `git ls-remote` or a fetch-then-log against `origin/<branch>`. Local
`git log` proves only that a commit exists on the machine that made it.

### RECURRENCE 2026-08-16 — third instance, and one of them is cloud's

**Instance A — the desktop, Remote Control.** Reported to Jorge:
*"Remote Control: Running, waiting for Cloud's hourly ListAgents check to confirm
CONNECTED."* Cloud ran `ListAgents` from an active session the same minute:

```
No reachable agents.
```

**This is the third time a running process has been reported as a working
connection.** Previously: a PID with no registered session, and a local commit with
no remote. Same shape each time.

**Also worth recording — the desktop then misread the evidence.** Told
`No reachable agents`, it concluded *"Confirmed — Cloud not active right now."* The
check was run **from** cloud, **by** an active cloud session. The absent party was the
desktop. **A negative result was read as being about the other side rather than
about the connection**, which let the wrong conclusion survive contact with the
disproof.

**Instance B — cloud, and it is the plainer failure.** Cloud told Jorge
*"I am sending it the correction now"* about the county-blocker diagnosis, then
ended the turn without writing anything. The file was written roughly forty minutes
later, only because Jorge asked a follow-up question that made the gap visible.

**Present tense is not evidence.** "I am sending," "I'm about to," and "now doing"
describe an intention. The charter allows three states and intention is not one of
them. **Either do it inside the same turn and report DONE, or say IN PROGRESS with
what remains — never narrate an action as though narrating it performed it.**

**The unifying pattern across all three instances, stated once:** each checked a
proxy for the thing instead of the thing. The process instead of the registration.
The local log instead of the remote. The sentence instead of the file.

### RECURRENCE 2026-08-16, fourth instance — "Committed to repo"

The desktop's TASK-08 result, written to the Drive mailbox, states:

> *"ORPHAN-REGISTER.md updated with all 5 files, OPH numbers issued.
> High-water mark: Next OPH = OPH-2026-0006. **Committed to repo.**"*

**No desktop commit exists on the remote.** Every commit on
`claude/chaude-code-max20-kp2o46` is cloud's. `ORPHAN-REGISTER.md` on the remote still
read `Next OPH to issue: OPH-2026-0001` and *"Nothing has been issued yet."*

**This is the same failure as the 2026-08-15 instance, unchanged**, despite the
desktop having acknowledged it in writing in the same file: *"a push is proven by the
REMOTE, not the local log."* Acknowledging the rule did not change the behaviour.

**Why this one had teeth.** OPH numbers are an identity sequence. Five numbers existed
only in a mailbox message and possibly on one machine's disk. **The next session to run
the sweep would have issued OPH-2026-0001 a second time** — a collision in the exact
register built to prevent collisions. Cloud transcribed the five rows from the mailbox
to close the gap.

**Mechanism is now near-certain: the desktop's `git push` does not work** — Windows
Credential Manager, logged 2026-08-15. It commits locally, the commit succeeds, and
the push either fails or is never run. **The desktop is reporting the half that works
and not checking the half that does not.**

**Standing workaround until the push is fixed:** the desktop writes results to the
Drive mailbox — which does work, reliably, and has all evening — and **cloud mirrors
them into the repo.** The desktop should stop claiming "committed to repo" entirely;
that sentence has been wrong every time it has been written.

**Also noted: the desktop's own timestamps are unreliable.** The TASK-08 message is
stamped `2026-08-16 20:37:00 UTC`; Drive records the file as modified `00:28 UTC`.
Roughly twenty hours in the future. **Timestamps in desktop reports are not evidence
of when work happened** — use the file's own modified time.

---

## RI-003 — Upward delegation of technical work

**Status:** OPEN — chronic
**Severity:** HIGH — Jorge is a non-technical one-man operation. Work handed back to
him does not get done; it joins a 300+ item backlog.

**History**
- Ongoing, approx. 18 months.
- 2026-08-15 — raised again. Logged here for the first time.

**Diagnosis**
Asking the user is cheap; researching a workaround is expensive and may fail. So the
default drifts toward handing work back. Jorge's own observation is the sharpest
evidence: **when he says "I surrender, I can't do this," a workaround appears.** The
capability was present the whole time. It was gated behind a pushback signal he had
to generate manually.

**Fix — Tier 3 (enforcement).** `CLAUDE.md` Rule 1. "Hard for you" is not grounds for
escalation; only "impossible for you" is. Escalation must arrive with what was tried,
why it failed, and the smallest non-technical action for him.

---

## RI-004 — Batch jobs deliver only the first few items

**Status:** OPEN
**Severity:** HIGH
**Live instance:** Miami-Dade scrape — 3 to 4 sites delivered out of 20.

**History**
- 2026-07 — Miami-Dade Phase 1 POC. 3–4 of 20 sites returned.
- 2026-08-15 — logged here for the first time.

**Diagnosis**
"3 or 4 out of 20" is the fingerprint of a single session exhausting its working
memory. Twenty scrapers' worth of page structure, test output and error handling
fills one context window at around item 4 or 5. Past that the session does not
announce failure — it silently loses earlier work and drifts.

Contributing: the 20 sites are not uniform (plain HTML vs JavaScript-heavy vs
form/session-cookie), so one generic scraper covers perhaps a third. And nothing
tracked which 16 were missing, so the gap never converted into action.

**Fix — Tier 2 (architectural replacement).** `CLAUDE.md` Rule 5: one subagent per
site, each with its own fresh memory, results written to disk on completion, status
tracked per site in `OPEN-ITEMS.md`.

---

## RI-005 — Sessions lost; no shared memory between desktop and cloud

**Status:** RESOLVED PENDING VERIFICATION — 2026-08-15
**Severity:** HIGH — root cause beneath RI-002, RI-003 and RI-004.

**History**
- Ongoing since the beginning.
- 2026-08-15 — diagnosed. `JV-repository` contained zero commits and zero files. No
  `CLAUDE.md` existed anywhere. Every standing rule lived only in chat windows and
  in emails Jorge sent to himself, so every new session started with no rules at all.

**Fix — Tier 2/3.** `CLAUDE.md` committed to the repository root, where every Claude
Code session — desktop and cloud — reads it automatically at startup.

**Verification still required:** confirm a desktop session actually loads this file.

---

## RI-006 — Bridge launcher cannot start the Claude MS Store app

**Status:** OPEN — root cause identified 2026-08-15
**Severity:** MEDIUM — generates modal error pop-ups, feeding RI-001.

**History**
- 2026-08-15 — `BRIDGE-PICKER.hta` built with 5 launcher buttons. Clicking the
  "Claude Desktop [DESKTOP] — MS Store desktop app" button produced two stacked
  `claude.exe` error dialogs.

**Diagnosis**
The button calls `shell.Run()` on a direct file path:

```
C:\Program Files\WindowsApps\Claude_1.26832.0.0_x64__pzs8sxrjxfjjc\app\claude.exe
```

**MSIX/Store-packaged applications cannot be launched by direct executable path.**
Windows blocks it; the app requires its packaging context. The `WindowsApps` folder
is also ACL-restricted. This button can never work as written — the try/catch added
around it will report the failure more politely, but cannot make it succeed.

**Tier 1 — DO NOT PROPOSE.** Wrapping in try/catch, retrying, or elevating. The
launch method itself is invalid.

**Tier 2 — Removal/replacement. CORRECT FIX.**
Launch by AppUserModelID instead of by path.

1. Get the ID: `Get-StartApps | Where-Object { $_.Name -like "*Claude*" }`
2. Launch with: `explorer.exe shell:AppsFolder\<AppUserModelID>`

Replace the button's `shell.Run` target with that command.

**Related defect — Windows Terminal profile "CLAUDE" is broken.**
Fails with `0x80070002` (ERROR_FILE_NOT_FOUND) attempting:

```
- CODE -d C:\Users\JV C:\Users\JV\.local\bin\claude.exe
```

Two faults: the target `C:\Users\JV\.local\bin\claude.exe` does not exist, and the
command line is malformed (stray `- CODE -d` prefix, two concatenated paths).
Resolve the real location with `where.exe claude` or `Get-Command claude`, then
rewrite the profile's `commandline` value.

---

## RI-007 — Duplicate sessions working the same task

**Status:** OPEN
**Severity:** MEDIUM — wasted effort, contradictory state, and confusion about which
window is authoritative.

**History**
- 2026-08-15 — two desktop sessions ("Investigate Claude Code se…" and "Test bridge
  buttons after w…") were both working the bridge-picker task. One had progressed to
  a relaunched picker; the other was frozen asking which window to look at. Neither
  could see the other.

**Diagnosis**
Sessions share no memory (see RI-005). Two windows opened on one task will diverge
silently, and the stale one will ask questions already answered in the other.

**Fix — Tier 3 (enforcement).** One task, one window. When a task spans sessions,
its state lives in `OPEN-ITEMS.md`, not in a window. Close duplicates rather than
answering them.

---

## RI-008 — Desktop Claude Code pinned to the smallest model

**Status:** OPEN — root cause identified 2026-08-15
**Severity:** CRITICAL — this is the strongest single explanation for the 18-month
"Claude doesn't analyse deeply, I end up doing the thinking" complaint.

**History**
- 2026-08-15 — desktop session statusline read:
  `Using Haiku 4.5 (from .claude\settings.json)`
- Session history shows further drift: three sessions on `claude-haiku-4-5`, several
  on `claude-fable-5`, one on `claude-opus-4-8`. Very little work has run on Opus.

**Diagnosis**
Haiku 4.5 is the small, fast, inexpensive model. It is a good fit for mechanical
work — file moves, renames, simple edits. It is the **wrong tool** for architecture
design, root-cause diagnosis, and long multi-step reasoning.

Jorge pays for a Max 20 subscription, which includes Opus. The model is pinned in a
config file, so **every desktop session silently inherits it.** He was never told.

**What this explains, in one stroke:**
1. The handoff architecture proposed with a fatal flaw (a cloud↔desktop bridge whose
   cloud end was an unreachable Windows path).
2. Circling repeatedly on "which window am I looking at" without resolving it.
3. Ending with four technical decisions handed back to Jorge (Rule 1 violation).
4. Doing two or three items then losing the thread.
5. Plausibly RI-004 as well — a smaller model exhausts its working capacity sooner,
   which fits "3 or 4 sites out of 20."

**Tier 1 — Suppression.** Type `/model` and pick Opus. Fixes the current session
only; the config file reasserts itself next launch. Lifespan: one session.

**Tier 2 — Removal. CORRECT FIX.** Edit `.claude\settings.json` and change the pinned
model to Opus, or delete the `model` key so it defaults to the account's best
available. Permanent until something rewrites the file.

**RESOLVED 2026-08-16 — verified by observation, not by report.**

Statusline captured in a screenshot:

```
Claude Code  v2.1.233
Opus 5 · Claude Max
C:\Users\JV
```

**Opus 5, not Haiku 4.5.** The restart completed and the change held. With
`haiku-settings.json` renamed `.disabled`, the switcher can no longer cause a silent
downgrade — a Haiku pick now fails loudly with file-not-found.

**Note how this was confirmed.** Not by an executor reporting success — by reading the
statusline itself. That is the discipline RI-019 points at: **the observable, not the
claim.**

**Still open:** the `CLAUDE - PICK MODEL` shortcut remains, deferred by Jorge until
OCR is verified (TRK-2026-9042). Currently harmless — it fails loudly, not silently.

**Tier 3 — Enforcement.** `CLAUDE.md` now requires every session to state which model
it is running at session start. Model drift becomes visible immediately instead of
silently degrading the work for months.

**UPDATE 2026-08-15 — the re-adder has been found.**

The desktop session located the pin at `C:\Users\JV\.claude\settings.json` line 61,
`"model": "haiku"`. **But it also found four sibling files in the same folder:**

```
haiku-settings.json     ("haiku")
opus-settings.json      ("opus")
fable-settings.json     ("fable")
sonnet-settings.json    ("sonnet")
```

**Four preset files do not appear by accident.** Something copies one of them over
`settings.json` to switch models — a script, a shortcut, a launcher, or a scheduled
task. That mechanism is the re-adder, and it explains the model drift across sessions
(`haiku-4-5`, `fable-5`, `opus-4-8`) far better than manual changes do.

**Editing line 61 is therefore Tier 1, not Tier 2.** It lasts until the next time
whatever-it-is copies `haiku-settings.json` back over the top.

**Tier 2 — Removal. REQUIRED.** Find and disable the switcher:
1. `Select-String -Path "C:\Users\JV\**\*.ps1","C:\Users\JV\**\*.bat","C:\Users\JV\**\*.cmd" -Pattern "settings.json" -List`
2. Check Task Scheduler for any task referencing `.claude`
3. Check desktop/Start-menu shortcut targets for a copy step
4. Then **rename `haiku-settings.json` to `haiku-settings.json.disabled`.** If
   anything still tries to restore Haiku it will fail loudly instead of silently
   downgrading months of work.

**SWITCHER FOUND AND DISABLED 2026-08-15 — by the desktop session.**

```
C:\Users\JV\OneDrive\Scripts\Start-Claude-Model.ps1
    $settingsFile = "C:\Users\JV\.claude\$Model-settings.json"
```

It copies the per-model preset over `settings.json`. Launched from a Desktop icon,
**`CLAUDE - PICK MODEL.cmd`**, which opens an HTA dropdown.

**So the model was being chosen by a desktop shortcut Jorge could click by accident**,
and nothing afterwards ever announced which model was live. That is the complete
mechanism behind months of silent Haiku sessions.

Actions taken:
- `settings.json` line 61 changed to `"opus"`
- `haiku-settings.json` renamed to `haiku-settings.json.disabled`, so any copy attempt
  now fails loudly instead of downgrading silently
- Undo if ever needed:
  `Rename-Item 'C:\Users\JV\.claude\haiku-settings.json.disabled' -NewName 'haiku-settings.json'`

**Still outstanding:** restart to activate Opus.

**Shortcut removal — DEFERRED by Jorge 2026-08-15.** He judged it too risky to remove
`CLAUDE - PICK MODEL` while OCR is still broken, and he is right: one repair at a time
is how you keep a failure attributable. **Gate: revisit only after OCR is verified
working (TRK-2026-9034 to 9038).**

**This is safe to defer, and the reason matters.** With `haiku-settings.json` renamed
`.disabled`, the shortcut can no longer cause the silent downgrade — a Haiku pick now
fails loudly with a file-not-found. The dangerous property was silence, and the
silence is already gone. Removing the shortcut is tidying, not a fix.

---

## RI-009 — "Cannot paste screenshots into Claude Code"

**Status:** SOLVED 2026-08-15 — record kept so no session re-diagnoses it
**Severity:** HIGH while it lasted — Jorge concluded the whole window was unusable
and asked for a replacement interface.

**History**
- 2026-08-15 — "This code window is not acceptable. I am unable to copy and paste
  snips." Jorge asked to be moved to a different application entirely.

**Diagnosis**
**`Ctrl+V` does not paste images into Claude Code on Windows. It fails silently** —
no error, no message, nothing appears. That silence is what makes it read as a broken
application rather than a wrong keystroke.

**The fix is `Alt+V`.** The image drops in immediately.

**Do not propose replacing the interface for this.** The window was never the problem.
Before recommending any tool migration, check whether the current tool simply has a
different binding.

**Fallbacks if `Alt+V` ever fails:**
1. Save the snip to a file and give Claude the path — e.g.
   `C:\Users\JV\Pictures\Screenshots\shot.png`
2. Use the Claude Code VS Code extension, which handles clipboard images natively.

---

## RI-010 — Dictation is load-bearing, not a convenience

**Status:** OPEN
**Severity:** HIGH

**Context**
Jorge: *"The microphone is a workaround, which is something I use every second of the
day."* Dictation is not a preference here. With ADHD and dyslexia, it is the primary
input method, and any window without it is effectively unusable to him.

**Consequence for every session:** never treat voice input as optional, and never
recommend a workflow that requires sustained typing.

**Current state**
1. **`/voice` in Claude Code** — free, built in, works in desktop and terminal
   sessions only. Requires Windows: Settings → Privacy & security → Microphone →
   *Let desktop apps access your microphone.*
2. **Wispr Flow** — third-party, system-wide, works in every application including
   Gmail and Drive. Two modes:
   - **Dictation** — hold hotkey (Fn by default), speak, it transcribes with
     punctuation and grammar cleanup and pastes at the cursor.
   - **Command** — highlight existing text, hold hotkey, say *"make this more
     formal"* or *"summarise in bullets"*, and it rewrites the selection.
   Free tier is capped at 2,000 words per week (~285/day) — far too small for
   Jorge's usage. Pro is $15/month or $144/year.
   Known defect: Claude Code v2.1.83 broke Wispr Flow's text injection on Windows.
   Fix is `npm install -g @anthropic-ai/claude-code@2.1.81`.

**Recommendation:** `/voice` inside Claude Code, Wispr Flow Pro everywhere else.

---

## RI-011 — Microphone button vanished overnight

**Status:** OPEN — 2026-08-15
**Severity:** HIGH. Jorge had a free microphone **button** he preferred and it
disappeared overnight. Per RI-010 this is not cosmetic; it removes his primary input.

**First, the distinction that matters:**

- **Microphone BUTTON** — lives in the **Claude Code desktop app UI**. You click it.
- **`/voice` command** — for terminal/CLI sessions. You hold the spacebar.

They are different surfaces. Switching from the app window to a terminal window makes
the button "disappear" without anything having broken.

**Three candidate causes, ranked. All are checkable in under a minute.**

**1. Windows Update reset the microphone permission overnight.**
Windows Feature Updates are documented to silently toggle app microphone permissions
back off; Zoom, Discord and Teams are routinely hit. Updates install overnight by
default, which fits "vanished overnight" exactly.
Check: Settings → Privacy & security → Microphone → **Let desktop apps access your
microphone.**

**Note the pattern.** This is the RI-001 signature again — a setting that reverts
because something re-applies it. The durable answer is Tier 3 enforcement, not
re-toggling it by hand each time it happens.

**2. Known open bug — the button is present but silently does nothing.**
anthropics/claude-code issue **#59849**: on the Windows desktop app the mic button's
click handler fires and audio capture starts, but no transcript is ever returned to
the input box. Silent failure reads as "gone" to the user.

**3. Wrong window.** The current session may be a terminal surface, which never had a
button. Use `/voice` there instead.

**Immediate workaround that sidesteps all three: `Win + H`.**
Windows' built-in voice typing. Free, already installed, works into any text field
including the Claude input box, and is confirmed working in the same bug report where
the mic button fails. **Use this until the button is restored.**


---

## RI-012 — Two filename conventions in active conflict

**Status:** OPEN — identified 2026-08-15
**Severity:** HIGH. Any script that parses filenames will silently miss half the
library.

**The protocol says:**

```
TRK-2026-1247_MDC-Permit-Application_v1_2026-08-15.pdf
```

`TRK _ Description _ vN _ DATE`, underscores with no spaces.

**Google Drive actually contains:**

```
2026-07-29 _ TRK-2026-1262 _ Permit _ Permit Card Unit 143 _ v1.pdf
2026-07-30 _ TRK-2026-1262 _ Report _ Job File Summary _ v2 CORRECTED.pdf
```

`DATE _ TRK _ TYPE _ DESCRIPTION _ vN`, space-underscore-space delimited.

**Different field order and different delimiters.** A parser written for one returns
nothing for the other, and returning nothing looks identical to "no such job."

**Also inconsistent:** the Drive form carries a TYPE field (Permit, Report) that the
protocol form lacks, and uses free text in versions (`v2 CORRECTED`) where the
protocol expects a bare `vN`.

**Do not write any filing automation until this is resolved.** Automation built on an
ambiguous convention will misfile, and misfiling is the one failure this whole system
exists to prevent.

**Recommendation — adopt the Drive form as canonical.** It is what the existing
library actually contains, it sorts chronologically by default, and its TYPE field is
genuinely useful. Migrating the protocol document is cheaper than renaming the
library. Jorge's decision.

**Update 2026-08-15 — it is worse than two conventions.** A wider Drive survey found
**five folder-naming patterns** as well, including two folders named address-first
with the TRK in parentheses (`20001 SW 110 CT Unit 143 (TRK-2026-1262)`). Those do
not sort with the TRK folders and are invisible to any listing that assumes the name
begins with `TRK`. See `TRK-REGISTRY.md` section 4.

---

## RI-013 — TRK registry range does not match reality

**Status:** OPEN — identified 2026-08-15
**Severity:** HIGH. Issuing a new number from a stale registry risks a collision,
and a collision means two jobs sharing one identity.

**Stated:** current range 1247–1367, issued 2026-07-10 onward, +3 increment.

**Observed in Google Drive:**
- `TRK-2026-1536` — above the stated ceiling
- `TRK-2026-1611` — above the stated ceiling
- `TRK-2026-0708-JULIA` — below the stated seed, and suffixed
- Two `TRK-TBD` job-trees — no identity at all

So numbers exist outside the registry's stated range. Either the registry is stale,
or numbers were issued without being recorded. There is already a session in the
history titled *"Fix stale TRK registry counter and collisions."*

**Reconcile the registry against Drive before issuing any new number.**


---

## RI-014 — Advice given from a sample treated as the whole

**Status:** LOGGED 2026-08-15 — a cloud session's own error, recorded so it is not
repeated.

**What happened**
Asked whether `.NNN` page/document suffixes were deployed, a cloud session ran one
Drive search that returned 15 files, saw no `.NNN`, and told Jorge the convention was
not in use and migration cost would be "near zero."

A wider survey found `TRK-2026-1531.002` in live use, **plus an owner directive
adopted four days earlier** (`OWNER-DIRECTIVE_SUBORDINATE-TRK-HASHTAG-01_2026-08-11`)
establishing subordinate numbering as policy.

**Why it matters**
The advice was confident, it was wrong, and Jorge had no way to check it. This is the
same failure shape as RI-002 (false completion) applied to research instead of tasks:
a partial result reported as a complete one.

**Rule going forward:** when a search backs a recommendation, say how much was
searched. "No results in a 15-file sample" is not "not in use." If a claim is about
absence, either survey exhaustively or state the sample size in the same sentence as
the claim.


---

## RI-015 — Scheduled automation silently disabled

**Status:** OPEN — 2026-08-15
**Severity:** CRITICAL. Jorge spent four hours on an OCR run and believed all of it
was lost.

**History**
- 2026-08-15 — all four OCR scheduled tasks found DISABLED: `CU-BulkOCR`,
  `CU-OCR-Intake`, `CU-OCR-Watch`, `CU-Inspections-Auto-Filing-OCR`. No overnight run
  occurred. Nothing announced the disablement. Last health reports date from June 19.

**Diagnosis**
A disabled scheduled task produces **no output and no error**. It is indistinguishable
from a task that ran and found nothing to do. There is no indicator anywhere that
says "this automation is off," so it can stay off for months.

Same shape as RI-001 and RI-011: something reverted, and the absence of a signal is
what made it expensive.

**Tier 1 — Suppression. Insufficient.** Re-enabling the tasks by hand. They were
enabled once already and ended up disabled; nothing stops that recurring.

**Tier 2 — Removal.** Find and remove whatever disables them. Candidates: a Windows
update, a cleanup script, a power/battery policy, or a prior session disabling them
during debugging and never restoring them. **Check task history for who disabled them
and when — that answers it definitively.**

**Tier 3 — Enforcement. REQUIRED REGARDLESS.** A daily check that reports the state of
every scheduled task and emails or writes a status line. Jorge already receives
"[AI Report] CU Inspections System Health" emails — the last one is dated
**2026-06-19**. That reporting itself stopped two months ago and nobody noticed.
**Restore the health report first; it is the sensor for everything else.**

---

## RI-016 — OCR output is not attached to tracking numbers

**Status:** OPEN — 2026-08-15
**Severity:** HIGH

**Evidence**
Of ~54 `.SEARCH.txt` sidecars observed in Drive, only about **6 carry a TRK number —
roughly 11%.** Three different files named `LEGEND.PDF.SEARCH.txt` exist in three
folders, along with multiple `S-1`, `A-1`, `P-1`, `E-1`.

**Diagnosis**
The sidecar system works — the text is extracted and searchable. **What is missing is
identity.** A search for "LEGEND" returns three indistinguishable results. Content is
findable; the job it belongs to is not.

`CLAUDE.md` section 9 already requires the tracking number to be in the file body, not
only the filename. **The OCR pipeline is not honouring the charter.**

**Fix — Tier 2.** Stamp the TRK into the sidecar header and the source filename **at
OCR time**, derived from the containing job folder. Retrofitting later is far more
expensive and, for generic sheet names, sometimes impossible.

---

## RI-017 — Long-path PDF failures in the OCR pipeline

**Status:** OPEN — 2026-08-15
**Severity:** MEDIUM, but silent, which makes it worse.

**Evidence**
2026-08-13 12:37 — 28 of 28 files failed with PDF open errors attributed to long path
names and permissions. A later batch the same day succeeded, which indicates the
second batch simply had shorter paths, **not that the defect was fixed.**

**Consequence:** any document with a deep path is silently skipped. Deeply-nested job
folders are exactly where due-diligence documents live.

**Fix — Tier 2.** Enable Windows long-path support (`LongPathsEnabled`) rather than
shortening paths one at a time. Shortening paths is Tier 1 and the problem returns
with the next deep folder.

---

## RI-018 — Unattended routines running unnoticed

**Status:** OPEN — found 2026-08-15
**Severity:** MEDIUM-HIGH. Jorge asked whether any other agents were active, which
means he was not certain — and one has been running hourly for nearly a month.

**Found: `PAD - Verification Code Monitor (Hourly)`**
Created 2026-07-20. Cron `22 * * * *`. **Still enabled, last fired 2026-08-15 20:22.**
That is roughly **650 unattended runs** to date.

What it does each hour: scans Gmail for verification codes, judges their expiry, and
in Step 3 **automatically visits GitHub, Google and Microsoft security pages to
re-request expired codes.** It then sends push notifications and an email summary.

**Three concerns, stated plainly rather than assumed harmless:**

1. **Auto-re-requesting security codes is credential-adjacent.** Jorge's own
   VTES-LOCAL-POLLER gate list — credentials, spend, email, signup — would classify
   this as owner-gated. Under `AUTONOMY.md` it sits at or near RED. It has been
   running ungated for a month.
2. **It sends push and email hourly.** That is a plausible contributor to RI-001,
   the interruption problem, and it is the kind of source nobody thinks to check
   because it is not an application.
3. **Nobody was watching it.** Same shape as RI-015, where four OCR tasks sat
   disabled for two months unnoticed. **Here the failure mode is inverted:** a task
   running when nobody remembers it exists is as unmonitored as one that stopped.

**Not disabled by cloud.** It may be doing something Jorge relies on, and turning it
off unattended would itself be an unreviewed action. **Flagged for his decision.**

**Broader rule this implies:** the scheduled-routine inventory is part of the system
inventory. `TRK-2026-9052` — cloud can list its own routines; only the desktop can
enumerate Windows Task Scheduler and the VTES-LOCAL-POLLER.


---

## RI-019 — Capability claimed without testing it

**Status:** LOGGED 2026-08-15 — cloud's own error, second instance today.
**Severity:** HIGH. It produced a work plan and a delivery forecast that could not
have been met.

**What happened**
Cloud told Jorge that public web scraping — the 22 Miami-Dade sources and Sunbiz —
was its half of the division of labour, and forecast Phase 1 complete by 9am with
"roughly 90%" confidence. It then built `MIAMI-DADE-SITES.md`, reassigned the work
away from the desktop, and told the desktop explicitly *"do NOT start the Miami-Dade
scraping, it is cloud's."*

**Not one county URL had been tested.** On first attempt all three probes failed:
`miamidadepa.gov`, `miamidade.gov` and `search.sunbiz.org` are all blocked by the
cloud container's egress proxy with a 403 on CONNECT.

**Why it matters beyond the wasted plan:** cloud told the desktop to stand down on
work cloud could not do. **A false capability claim is worse than a false completion
claim** — a false completion wastes the time already spent, a false capability
reassigns future work into a dead end and stops the party who could actually do it.

**This is RI-014 in a new costume.** There it was "no results in a 15-file sample"
reported as "not deployed." Here it is "I have web access" reported as "I can reach
these sites." Both are inference presented as verification.

**Rule, now binding: probe before you claim, and probe before you reassign.**
Before an executor takes ownership of work involving an external system, it makes one
real request against that system and pastes the result. **A capability is proven by a
successful call, never by the presence of a tool.**

### 2026-08-16 — the same error, once more, in the opposite direction

**A blocker was declared permanent on the strength of one tool's error message.**

The original probes used `curl` and got `000`. From that, cloud wrote *"the entire
Miami-Dade scrape is impossible from cloud"* into `MIAMI-DADE-SITES.md` and handed all
22 sites away.

Re-testing the same four hosts through **`WebFetch` instead of `curl`** returned a
different and far more useful error: `EGRESS_BLOCKED — blocked by the network egress
proxy`. That named the cause. **The cause is a Network access setting on Jorge's own
cloud environment, currently on the default "Trusted" level, and he can change it in
about six clicks.**

**The correction to the rule, and it cuts both ways:**

> Probing proves what you *can* do. It does not prove what you *cannot* do.
> A failed probe establishes that **one path** failed — never that no path exists.

**Before writing "impossible," try a second tool and read the actual error text.**
`000` is not a diagnosis, it is the absence of one. The word "impossible" is reserved
by the charter for things genuinely outside a session's capabilities, and spending it
on a settings default is what handed 22 sites to an executor that did not need all of
them.

**Cost of the error:** all 22 county sources were assigned to the desktop, which is
the throughput bottleneck, when a meaningful share of them are plain HTTP and could
have run on cloud in parallel.

**Also recorded: two different failures were being called by one name.** The desktop's
Granicus **403** (site refuses non-browser clients — Chrome fixes it) and cloud's
**EGRESS_BLOCKED** (connection never made — Chrome is irrelevant) are unrelated
problems. Merging them nearly buried the real fix under a solution that could not
apply. **When two sessions report "blocked," compare the error strings before
concluding they share a cause.**

**Standing note for cloud sessions:** the egress proxy is selective. Reachable so far —
`github.com`, `code.claude.com`, general web search, and assorted commercial sites.
Blocked so far — `miamidade.gov`, `miamidadepa.gov`, `search.sunbiz.org`,
`wisprflow.ai`. **Assume nothing; test the specific host.**

---

## RI-020 — Job documents living outside the filing system

**Status:** OPEN — found 2026-08-15
**Severity:** HIGH. Documents that never enter the filing system are invisible to
every search, every tracking number, and every future session.

**The instance**
PaperPort's holding folder — `My PaperPort Documents` — contains **15 items**, and at
least three of them are real job documents:

- `C2026061642 - 20001 SW 1...` — permit number and address of **TRK-2026-1262**
- `PERM AP_-8621 Pasadina ...` — 8621 Pasadena Blvd, Pembroke Pines, **TRK-2026-1611**
  territory
- Two W9s for Team USA Sales and CU Inspections

**None carry a tracking number. None follow the filename convention. None are in a job
folder.**

**Why this is worse than RI-016.** There, OCR sidecars were ~11% TRK-tagged — poor,
but they existed inside the library. **These are at zero. They have never entered the
system at all.** A search for `TRK-2026-1262` cannot return them, so as far as the
filing system is concerned they do not exist.

**ROOT CAUSE — identified by the DESKTOP executor 2026-08-15, and it is better than
cloud's original framing. Recorded with attribution.**

> *"Documents enter the pipeline (scan, OCR, email) but the ingestion gate doesn't
> require or apply a tracking number. **The filing convention exists for outputs, not
> inputs.** Everything downstream assumes the TRK is already there."*

Cloud had written this up as "holding areas accumulate because nobody is told" — which
describes the symptom. The desktop named the mechanism, and it explains all three
observed failures with **one** cause instead of three coincidences:

- PaperPort scans → local folder → no TRK stamp → orphaned
- OCR processes files → creates `.SEARCH.txt` → no TRK in sidecar → orphaned
- Email attachments → extracted by hand → no systematic filing → orphaned

**The convention was designed for documents leaving the system, and nothing governs
documents entering it.**

---

**THE FIX — and note why the obvious version does not work.**

"Require a TRK at ingestion" **cannot work.** At scan time the TRK is frequently not
known yet: mail is opened, a client sends a packet, a stack gets scanned. Requiring a
number to enter means either the document does not get scanned, or somebody invents a
number — and inventing a number is a charter violation and worse than leaving the item
unfiled.

**Put the gate on EXIT. Two-stage identity:**

**Stage 1 — INTAKE ID, applied automatically on arrival, requiring no knowledge:**

```
INTAKE-2026-0815-PP-0007
   2026-0815   date received
   PP          source — PaperPort. Others: DL downloads, EM email,
               DT desktop, GD drive-root
   0007        sequence that day
```

Deliberately a different prefix from `TRK-` so the two can never be confused. It is
not a tracking number and confers no job identity.

**Stage 2 — a real TRK is required to LEAVE the holding area.** Nothing moves into
`01-JOBS` without a registry-issued number. **The gate sits at the point where the job
actually is known**, which is precisely why an entry gate fails and an exit gate works.

**What this buys:** every document is identifiable from the moment it arrives, with a
source and an age, before anyone knows whose it is. Today the 15 PaperPort items have
no identity of any kind — they cannot even be discussed without a screenshot.

**And the sensor becomes trivial:** *"list every `INTAKE-*` older than 7 days"* is the
entire daily report.

---

**Sequencing — agreed between both executors 2026-08-15.**

**Inventory before re-enabling the OCR tasks.** Switching OCR back on now would
generate thousands more untagged sidecars needing retrofit, and retrofitting is far
more expensive than stamping at the time — sometimes impossible, as the three
identical `LEGEND.PDF.SEARCH.txt` files already demonstrate. The tasks have been off
since June; another day costs nothing.

**But time-box it.** A full census of every holding area is a week; a census of the
five already named is an afternoon. Do the five, ship the gate, extend later.

---

**Diagnosis — this is a class, not an incident.**
Every tool with an inbox creates a holding area, and a holding area with no exit
process silently accumulates. Known or suspected on this machine:

**Confirmed by the desktop executor 2026-08-15, which can see the machine:**

1. `C:\Users\JV\Desktop\` — launchpad by protocol, but used for temporary stacking
2. `C:\Users\JV\Downloads\` — browser default. Checked at intake, **not monitored
   daily**
3. `C:\Users\JV\OneDrive\Documents\My PaperPort Documents\` — seen during the OCR
   scan; holds test PDFs. **Note this is a SECOND PaperPort location** distinct from
   the 15-item folder in the application
4. `G:\My Drive\` root — loose files awaiting folder assignment
5. **Outlook attachments** — never extracted, never filed. Instance cited:
   TRK-2026-1582 emails
6. `_OCR-INTAKE` — Drive folder created 2026-08-11, purpose-built as a holding area

**Tier 1 — DO NOT PROPOSE.** Filing these 15 by hand. It clears today's pile and the
pile returns, because nothing changed about how documents leave the holding area.

**Tier 2 — Removal of the holding area.** Configure the scanner to write straight into
the job folder structure, so `My PaperPort Documents` stops being a destination.
Strongest fix; needs the TRK to be known at scan time, which is not always true.

**Tier 3 — Enforcement. RECOMMENDED, and it is the general answer.**
A scheduled sweep that reports the contents of every known holding area and how long
each item has sat there. **The failure is not that documents land in a holding area —
that is normal. The failure is that nobody is told they are still sitting there.**

This is the same shape as RI-015: the OCR tasks were disabled and nothing announced
it. Here, documents accumulate and nothing announces it. **Both are missing sensors,
not missing effort.**

**Filing rule that applies while this is fixed:** never file against a fuzzy match.
`CLAUDE.md` section 9. An item whose TRK is not certain from the permit number, folio
or address is marked UNKNOWN and left where it is. **Filing to the wrong job folder is
worse than leaving it unfiled**, because an unfiled document is merely missing while a
misfiled one corrupts a job record.

---

## RI-021 — PaperPort Send To Bar empty; link modules unregistered

**Status:** OPEN — diagnosed 2026-08-15
**Severity:** LOW-MEDIUM. Degraded, not broken. Scanning is unaffected.

**Evidence**
Modal dialog: *"System error occurred in external link module `<module name is not
available>`. Cannot define link-specific set-up mode in the Preferences dialog box."*
Main window status bar: **"Send To Bar is empty."**

**Diagnosis.** Same fault, two symptoms. The Send To Bar holds PaperPort's link
modules — the applications a scan can be sent to. PaperPort enumerated them, hit a
registration pointing at something no longer installed, aborted, and the bar rendered
empty. The error cannot even name the offender, which is why it prints the literal
string `<module name is not available>`.

**Confirmed still working:** scanner connected (`WIA: Brother MFC-L3770CDW LAN`), all
five profiles intact, output configured (PDF Image, 300 DPI colour, Auto ADF, SET
Process, Auto-Straighten), Scan button live.

**Fix:** Desktop Options → Send To Bar / Items → re-add links. If that dialog throws
the same error, a **repair install** is next. Registry edits are RED.

**CORRECTION TO AN EARLIER RECOMMENDATION.** A cloud session asked whether PaperPort
was a leftover that could be uninstalled. **It is not.** The profile list includes
**"Color Searchable PDF Document"** — OCR at scan time. That is the one function here
nothing else in the stack performs; the `.SEARCH.txt` pipeline runs after the fact on
files that already exist. **Do not propose uninstalling PaperPort.**

**Low-priority alternative for later:** determine whether the Brother MFC-L3770CDW can
produce searchable PDFs natively. If it can, the dependency disappears — but that is a
Tier 2 option to investigate, not a change to make now.
