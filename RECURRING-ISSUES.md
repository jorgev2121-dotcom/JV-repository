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

- 2026-08-18 — **Jorge issued a direct challenge and supplied two facts that narrow this
  hard: the interruptions fire every 3–5 minutes (a timer, not an accident), and keys are
  MISSED with brief freezes (the input queue stalls — not mere misdirected focus).** Full
  deep dive in `ROOT-CAUSE_RI-001-POPUP-KEYBOARD_2026-08-18.md`. The catch-the-thief trap
  job is queued to the desktop as TRK-2026-9331: find the forgotten spy's logs first, then
  a one-working-day foreground logger + scheduled-task census (repetition ≤ 10 min) + USB
  re-enumeration events + keyboard-hook roster, plus the three never-executed Tier 2 fixes
  (`/cleanreminders`, RI-006 launcher, RI-021 PaperPort) and `-WindowStyle Hidden`
  verification on every VTES launch. **The forgetting step is where all twelve prior
  repairs died; this entry is the anti-forgetting.**
- 2026-08-18, 10:35 ET — **THE THIEF IS NAMED.** Three independent witnesses — the forgotten
  Focus-Spy (1,957 steals), Focus-Keeper (3,049 rescues, one per 1.14 min), and the live
  trap (steal caught in 14 minutes) — all converge: **the PowerShell console class, opened
  by our own scheduled-task fleet.** 23 timers ≤10 min, 8 on the exact 3–5 min cadence.
  Hardware ruled out (0 USB events/48h). Stall detector caught the freeze itself: 1.2–1.5 s
  stalls, six of seven with a PS console foreground, one continuing after focus returned —
  the vanished-letters mechanism. Full record: `RI-001-THIEF-NAMED_2026-08-18.md`.
  **Remaining: which timers. Six-hour table ~16:30 ET; Task Scheduler history needs Jorge's
  one command to make it provable.**
- 2026-08-18, 10:54 ET — **CONVICTED, by name: CU-Bus-Dispatcher (2.9 s) and CU-Records-Watch
  (4.3 s), command lines captured.** The killer fact: **`-WindowStyle Hidden` does not stop
  the console being created — it is created, takes foreground, then hides.** Twelve repairs
  added a flag that cannot work. 51 tasks launch shells directly; the 19 using
  `Run-Hidden.vbs` took zero foreground — a live control group. Fix = wrap the four 3–5 min
  offenders (Tier 2: the console never exists), Jorge's click. **Closure requires tomorrow's
  before/after table showing the cadence families gone — not the click.** See
  `RI-001-CONVICTION_DIR-0041_2026-08-18.md`.

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

**RECURRENCE 2026-08-16 16:01 ET — and this one is structural, not behavioural.**

Checked live: **RECONCILER last run 15:10 ET on a 30-minute cadence — 51 minutes,
one missed cycle.** Its own last report, written at 15:10, reads
`Stale components (>20 min): none` and `Crisis flag: False`.

**The component whose job is detecting staleness is the stalest thing on the machine,
and it is the only component that could report itself.** `HEARTBEAT-ROSTER.json` has
exactly two entries — poller and reconciler — and neither watches the other.

**This is not a session rounding a status up. It is a monitoring graph with no cycle
in it.** Logged as RI-002 because the visible symptom is identical — a healthy report
over a component that is not working — but the fix is different: **the missing third
SENTINEL layer (JOB-0062-A), acknowledged 2026-08-07 and never built.** See
`UNFINISHED-WORK-AUDIT.md` §11–§12.

**RECURRENCE 2026-08-16, evening — the 8/6 mass ACK, found and re-read.** Twenty-one
ACK files created in **636 milliseconds** on 2026-08-07. **Correction to this file's
own §3 diagnosis: they were not fabricated.** `ACK_JOB-0061` says `Status: in-progress`,
describes machinery that is verifiably running ten days later, and asks a real
question. **The defect is that a bulk-written ACK backed by a real build and a
bulk-written ACK backed by nothing were byte-identical in form and arrived in the same
second.** Nothing downstream could sort them. **RI-002's root mechanism is therefore
narrower than recorded: not false reporting, but unsortable reporting.**

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

### 2026-08-16 — THE MECHANISM, found in the operation's own records

The audit of `MASTER-UNFINISHED-WORK-REGISTER` batches 1 and 2 (TRK-2026-9086) names
what has been producing RI-002 for eighteen months. **It is not forgetfulness.**

**The measured rate.** The 2026-07-31 Registrar retrospective sweep registered 100
items: **4 verified DONE with an artifact. 88 never acknowledged at all.**

**The mechanism, quoted from batch 2:**

> *"All later swept by the **fabricated 8/6 mass ACK**."*

An entire tranche of ratified protocols was marked acknowledged in bulk without being
executed. Batch 1 records the same shape on a server that was *"ratified by owner 8/6,
ACK posted 8/7 in mass sweep; later admitted server never existed."*

**And the executor supposedly doing the work had never run:**

> *"VTES-Executor never switched live (`job-ledger.json` shows only its own 6/28
> self-test — nothing from 0004 forward ever executed through it)."*

**So the pipeline was: order → acknowledge → mark done → nothing ever ran. The
acknowledgement WAS the deliverable.**

**This is the root cause of RI-002, and it reframes every other instance in this file
as a symptom.** A reporting layer that reports success independently of execution will
produce exactly this: confident completion claims, no artifacts, and a backlog nobody
can see the size of.

**Binding consequence: an ACK is not one of the three states.** DONE requires
evidence, BLOCKED requires what-was-tried, IN PROGRESS requires what-remains.
**"Acknowledged" is not a status and must never be recorded as one.**

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

**Status:** CLOSED 2026-08-18 — **already fixed on the machine, and the repo never heard.**
Click-tested by the desktop: the button now launches via AppUserModelID (the Tier-2 fix,
already in place), a visible Claude window appeared, zero error dialogs. Three repo claims
corrected by measurement: the buttons call `.lnk` chains, not the WindowsApps path; no
profile named "CLAUDE" exists (the live one is "Claude Code (Beige)", name-matched); the
`.local\bin\claude.exe` target exists at 324 MB. **The 2026-08-15 dialogs were real and
were fixed by someone who never told the record. Lesson — the mirror image of RI-022: a
DEFECT claimed from the record can be as stale as an absence claimed from it. Re-test
before re-fixing.**

**Original status:** OPEN — root cause identified 2026-08-15
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

---

## RI-022 — Absence reported from the record instead of the folder

**Status:** OPEN — chronic, and it is the mechanism behind most of RI-002's visible
symptoms.
**Severity:** HIGH. It causes finished work to be re-ordered, and it makes the backlog
look larger than it is.

**First logged 2026-08-17 after it occurred five times in a single night — all five by
the cloud session doing the logging.**

### The pattern

A register, board or job file says an item was never delivered. **A later session repeats
that claim without opening the folder. The item exists.**

### The five instances, one night

| Claimed | Reality |
|---|---|
| Job-tree dashboard "never delivered" — both register batches | Built. `_JOB-TREE_TRK-26-1042.html`, 2026-08-09 |
| "No index page over all jobs" — written by me | `01-JOBS\_INDEX.html`, 2026-08-14, with a working filter box |
| Excel CRM "never delivered. Re-order as a verified job" | Delivered 2026-08-16, 502 rows |
| Three of eight VAPOR items | Running that night — poller alive on a 5-minute interval |
| Orange Tree "population never executed" | Scaffolding built **five times**; 46 files across 8 unit folders |
| *(A sixth, caught before it cost anything)* | *"A ninth unit is missing" — the index says "8 open/no-final Plaza units." There is no ninth* |

### Why it keeps happening, stated precisely

**Registers record intent. Folders record outcome. Nothing reconciles them**, so a
register entry written truthfully on the day it was written stays true-looking forever,
long after the folder has changed underneath it.

**This is the mirror image of RI-002.** RI-002 is presence reported without evidence —
"done" with nothing behind it. **RI-022 is absence reported without evidence** — "never
done" with something behind it. **Same missing step, opposite direction: nobody checked
the artifact.**

### What it costs

**It is not harmless bookkeeping.** The Orange Tree job was ordered **four times**. Each
order produced another ring of scaffolding around work that was already there. **A fifth
order would have produced a sixth ring.** Re-ordering delivered work consumes exactly the
capacity the backlog is short of.

### Fix — Tier 3 (enforcement)

**Before writing that something does not exist, open the folder where it would live and
say which folder you opened.**

Cheap, mechanical, and it caught the sixth instance the same night the first five were
found. **Any claim of absence in this repository should name the location checked.** A
claim of absence with no location named is an opinion about a record, not a finding about
the work.

**Related:** the `TRK-26-` / `TUS-` / `KAR-` drift makes this worse — a folder that does
not match the search string is indistinguishable from a folder that does not exist. See
`CLAUDE.md` §9 and TRK-2026-9173.

### RECURRENCE 2026-08-17 10:07 ET — caught in under a minute, and it is a tooling trap

**A Drive search filtered by `modifiedTime` returned `{}` for the mailbox folder.** Read
naively, that says the reconciler — which writes every 30 minutes — had stopped.

**It had not.** A direct metadata check showed:

- **Poller alive at 10:06:43 ET** — seconds earlier.
- **Reconciler last run 09:40 ET** — 27 minutes prior, on a 30-minute cadence. **Its next
  run was simply not due yet.**

**The trap, stated for the next session:** this Drive search tool's date filtering is
**not reliable enough to prove absence**. Earlier the same night the same filter returned
folders *older* than the cutoff. **`get_file_metadata` on a known file ID is reliable;
a filtered search is not.**

**Why this belongs under RI-022 rather than its own entry:** an empty query result is a
record, not a folder. Reporting "the reconciler is dead" from `{}` would be **absence
claimed from the record instead of the artifact** — the same error, one layer down, in
the monitoring itself.

**Rule: never declare a component dead from a search that returned nothing. Fetch the
component's own heartbeat file by ID and read its timestamp.**

**Same family as:** TRK-2026-9132 (PowerShell 5.1 returns a silent false zero) and
TRK-2026-9097 (read the body, never the status code). **Three different tools, one
failure shape: a negative answer that means "I could not see," reported as "it is not
there."**

---

## RI-023 — The channel that asks Jorge questions was pointing off his screen

**Logged 2026-08-17 by cloud session. TRK-2026-9256.**

**Symptom, as recorded for five sessions running:** "Jorge has not answered the board
question." Ledgers, morning reports and handoffs all carried it as an owner delay.

**Actual cause, found 2026-08-17 in `EXECUTION-VERIFICATION_JOB-0075_2026-08-17.html`
and never surfaced to him until now:** the Ask-Jorge window has been opening at
**x = -963** — the left monitor he does not face. A census of open windows found the ask
window, the Orange Tree window, the deadline nudge and the control panel all sitting
there. Two more — owner approvals and the stop-the-popups button — had been minimised
since **2026-08-16 16:37**, the same minute as the most recent answer on file.

**He was never shown the question. The record said he declined to answer.**

### Why this is RI-022's family and not a new disease

RI-022 is *absence reported from the record instead of the artifact*. This is the same
shape with the owner in the loop: **a question's delivery was assumed from the fact that
it was sent.** Nothing ever checked that it landed where a human could see it. An unread
prompt and a refused prompt are indistinguishable in the log, and the log was believed.

### The aggravating factor — a report can go unread by me too

**This finding sat in a 7,536-byte file in VTES-Outbox from 15:55 ET and I did not open
it until 23:40 ET, after Jorge asked why he had not been shown the four passed jobs.**
I had summarised four sibling files and skipped the fifth. **A written report nobody
opens is the same failure as a window nobody sees.**

### Fix tier

**Tier 3 — Enforcement, not suppression.** Moving the window once (Tier 1) is exactly
what will decay: any script rewrite, monitor change or profile reset puts it back.

1. **Every prompt to Jorge records where it landed.** The delivery check is a measured
   coordinate, not the fact that a launch command returned success.
2. **A prompt with no answer and no confirmed on-screen position is UNDELIVERED, never
   UNANSWERED.** Those two words must never again be interchangeable in any ledger.
3. **Anything written to VTES-Outbox is opened before its siblings are summarised.**
   Reporting on 4 of 5 files in a folder is the folder-vs-record error again.

**Do not, ever, log an owner non-response without evidence the owner saw it.**

---

## RI-024 — Two executors on one output folder, and the collision landed where nobody was watching

**Logged 2026-08-18 by cloud session. TRK-2026-9266.**

**Two Claude Code sessions worked TRK-2026-9250 simultaneously tonight, neither aware of
the other.** Session A was the window Jorge pasted PASTE-D-009 into. Session B was
`claude.exe --chrome`, **PID 7856, running unattended since 2026-08-16 16:01** — a session
nobody knew was still executing jobs.

They wrote property 1 **nine seconds apart, on the same folio, into the same folder.**

### What makes this worth its own entry

**Session A saw the collision, wrote a notice, named the file it would land on, and then
lost a different file.**

- **Predicted casualty:** `PROOF-5-MASTER_2026-08-17.csv`. **Protected** — Session A wrote
  its own as `..._SESSION-A.csv`. The prediction worked.
- **Actual casualty:** the five `<dashed-folio>_DD-REPORT_2026-08-17.html` reports.
  **Both sessions used that identical filename and neither suffixed it.**

Session B reported its five reports at **5.1–5.5 MB with all images embedded**. The five
files on Drive are **16,540–23,183 bytes**, modified *after* that report was written.
**No 18-kilobyte file contains a 1.9-megabyte photograph.**

### The lesson, which is not "check for other sessions"

**A collision was detected, reasoned about, and mitigated — and the mitigation covered one
filename out of two.** Naming the likely victim is not the same as enumerating every path
both writers touch.

**Rule: when two writers are found on one folder, the mitigation is to suffix or redirect
EVERY output path, not the one that looks most contested.** A partial mitigation reads in
the log exactly like a complete one.

### Second lesson — an unattended session with no owner

**PID 7856 had been running jobs for 32 hours with nobody tracking it.** The heartbeat
roster does not list interactive `claude.exe` sessions, so a live executor was invisible to
every monitoring system in this repo.

**Fix tier: Tier 3 — Enforcement.** Any job file naming an output folder must declare its
full output path list, and a session must claim that folder before writing. **Suppression
(closing the extra window) is Tier 1 and will recur the next time two windows are open.**

### The one piece of good news, recorded so it is not lost

**The two runs agree on substance** — same owner, same violation rows, same
not-applicable verdicts, same five Unsafe Structures cases. **Two independent runs
corroborating each other is stronger evidence than one run asserting confidence.** The
collision cost a file; it also produced the only cross-check this pipeline has ever had.

### RECURRENCE 2026-08-18 00:45 UTC — RI-022 again, and this time it was mine

**On 2026-08-17 I wrote "zero `bldg jacket` mail" as a flat statement.** I had searched Gmail.

**The email exists.** Received 2026-07-08 16:27 from `cpl@MiamiDadePA.gov`, sitting in
`\\Jorge@TEAMUSASALES.COM\Inbox` — an Outlook store **this cloud session cannot reach at all**
(Microsoft 365 unauthorised). The desktop found it by scanning 530 folders across 6 stores.

**My statement was true of the store I searched and false as written.** Nobody reading it
would have known which.

**Rule, stated so it is mechanical: name the store in the same sentence as the zero.**
Not "there is no jacket mail" — **"there is no jacket mail in Gmail; Outlook was not searched."**

**Three stores exist and I can see one of them.** Every absence I report about email is
partial by construction until that changes.

### CORRECTION 2026-08-18 01:15 UTC — RI-024's central claim was wrong, and the error was mine

**RI-024 above says two sessions used the identical filename and one silently overwrote the
other's five reports. That did not happen. Nothing was lost.**

The two sessions used **different folio formats**: session A wrote
`30-6006-001-0700_DD-REPORT…` (dashed), session B wrote `3060060010700_DD-REPORT…`
(undashed). **All ten files exist side by side, intact.** Measured on disk at 20:29:48 ET by
desktop session C — a *third* session neither of us knew about.

### How I got it wrong

**I listed `PROOF-5` at 00:15 UTC. The 5 MB reports were written at 00:19–00:27 UTC.**
They did not exist yet when I looked. I saw five small files, matched them against a report
claiming five large ones, and concluded the large ones had been destroyed.

**I read a folder mid-write, in a folder I had been explicitly told had a live writer in it,
and turned "I could not see it" into "it is gone."**

**That is RI-022. Not a cousin of it — it.** And it is worse than the earlier instances,
because those were absences of things that were merely hard to find. **This one invented a
destructive event out of a timing gap**, wrote it into the recurring-issues file as a new
disease, and sent a correction demand to another executor based on it.

### What survives from RI-024, and it is not nothing

**The second lesson stands and is independently confirmed:** an unattended executor had been
running jobs since 2026-08-16 16:01 with nothing tracking it. It is now on the heartbeat
roster with status `green-unmonitored` — **recorded, not monitored, and the entry says so in
its own words.** That distinction must never be softened in a later report.

**Correction to my own note on it: PID 7856 is `pwsh`, not `claude.exe`.** The `claude.exe`
processes from that launch are 12416, 21996, 23508, 25004.

### The rule this adds, which the earlier RI-022 entries did not cover

**Never measure a folder that has a live writer in it and report the measurement as a state.**
Either wait for the writer to finish, or label the number `AS-OF <timestamp>, RUN IN PROGRESS`
and draw no conclusion about what is absent.

**A snapshot of a moving folder is a snapshot, not an inventory.**

---

## RI-025 — A failure wearing the costume of a success

**Logged 2026-08-18 by cloud session. TRK-2026-9286.**

**Five instances in two days, in five unrelated systems. Listing them together because
separately each one looked like a one-off bug, and together they are a class.**

| What was asked | What came back | What it actually meant |
|---|---|---|
| County ePermitting, permit history | the main menu re-rendered | **reCAPTCHA scored me low.** Reads as "no permits found" |
| `Build-Job-Portal.ps1` link audit | *"drive links: 50, local links: 0"* | **all 50 are `file:///G:/…`.** The portal cannot be shared |
| Property Appraiser, 331 Tamiami Canal Rd | 111 NW 1 ST, the government centre | **wrong operation.** A confident answer about a different building |
| County ePermitting, a City of Miami parcel | *"ADDRESS NOT FOUND"* | **the county does not index city addresses.** Not a clean record |
| Portal *Expand all* button | nothing, no error | **`onclick="all(1)"` bound to `document.all`.** Silent no-op |

### The shape

**Every one returned a well-formed, positive-looking result.** None threw an error. Four of the
five would have been written into a client report as a finding — *no permits*, *portal shared*,
*this is the property*, *no record*.

### What caught each one

**Not a test suite. In every case, somebody asked what the number was made of.**

- 50 links → *which* 50?
- 5.2 MB of embedded images → **one image, re-encoded.**
- A button that "works" → **click it and count the sections that opened.**
- An address that resolves → **does the returned address match the one I asked for?**

### The standing test this adds

**A self-reported success must state the quantity it counted, not merely that it counted.**

- Not "images embedded" — **`<img>` tags == base64 payloads == files on disk, three numbers.**
- Not "drive links: 50" — **50 hrefs matching `https://drive.google.com/`.**
- Not "permits: none" — **the positive signature of a real result page, present.**

**A source that can refuse without saying so must be given a positive signature to prove it
answered.** The absence of an error is not evidence of an answer.

### Why this is Tier 3 and not Tier 1

Fixing the five bugs is Tier 2 and four of them are already fixed. **But the class regenerates**
— every new source, script and portal can produce a sixth. The durable fix is the acceptance
rule above, applied at the point where any executor writes the word DONE.

**Related and already logged:** TRK-2026-9132 (PowerShell 5.1 silent false zero), TRK-2026-9097
(read the body, never the status code), RI-022 (absence from the record, not the artifact).
**RI-025 is the general case those three are instances of.**

### RI-025 addendum 2026-08-18 03:20 UTC — the sixth instance, and it is the sharpest

**Contributed by desktop session C, quoted verbatim because the wording is better than mine:**

> *"The report front page said `13 of 22` and was true of a definition nobody had written down.
> It was not wrong. It was **uncountable**, which is how it managed to be published as 7, 10 and
> 13 without anyone lying. **A number with no stated unit is the same failure as a number
> counted wrong, and it is harder to catch because it never disagrees with anything.**"*

**That is the hardest member of the class.** The other five instances could each be caught by
asking what the number was made of. **This one survives that question**, because every count
was honestly derived under a rule its author never wrote down.

**The fix, applied: the counting rule goes inside the count box, not in a footnote.** Session C
applied it to 10 reports and 5 CSV cells, read back 11 of 11, and rendered one to look at it.

**Additional reason the box matters here and not elsewhere: Jorge listens by text-to-speech.**
A footnote is read minutes after the number and detached from it. In the box it is read in the
same breath. **Placement is a legibility decision for this reader, not a formatting preference.**

**RI-025 rule extended:** a self-reported success must state the quantity it counted **and the
rule by which it counted.** Neither alone is enough.

---

## RI-026 — A broken push is also a broken pull

**Logged 2026-08-18. TRK-2026-9287.**

**`TRK-2026-9082` has been recorded for days as "the desktop's git push is broken," and every
mitigation built around it — including my own standing instruction to mirror the desktop's
output into the repo by hand — treated it as a *publishing* problem.**

**It is a reading problem, and that half was never noticed.**

**The desktop cannot pull `CLAUDE.md`. It has never read the operating charter.** Not §9
numbering, not §12 FREEZE-AND-FINISH, not EXHAUST-FIRST-01, not Rules 1–8, not this file.

### How it stayed invisible

**Because the desktop kept producing correct-looking work**, including issuing a real tracking
number tonight against a protocol it has never seen. **A missing input produces no error. It
produces slightly-unmoored competence, which is indistinguishable from the real thing until it
isn't.**

**It surfaced only because a peer refused to repeat a citation it could not verify.** Nothing
in any monitoring system would ever have found this.

### The general form, which is worse than the instance

**Every defect logged as "cannot write" should be re-read as "may also mean cannot read."**
The same applies to: the dead mirror, the Outlook authorisation, the M365 connector, and any
future one-directional-sounding failure. **Ask what the broken channel was also carrying
inbound.**

### Fix tiers

- **Tier 1 — paste the charter into the window.** Dies on restart. `CLAUDE.md` §7 already names
  this failure. **Not on the table under Rule 4.**
- **Tier 2 — fix the git credential so the desktop pulls.** Deletes the cause. **Blocked on
  Jorge; one owner action.**
- **Tier 3 — mirror the charter to a Drive path both executors read on start, and require each
  session to state the commit it loaded.** Survives the git problem entirely.

**Tier 3 executed 2026-08-18 03:04 UTC**, unattended and without owner action:
`_CLAUDE-MAILBOX\CHARTER-MIRROR_CLAUDE-MD_commit-2d01ea5_2026-08-18.md`, 22,220 bytes, carrying
a header that names the repo as authoritative and forbids editing the mirror.

**Tier 2 remains the real fix and is on Jorge's list. Tier 3 is not a substitute for it — a
mirror that nobody refreshes becomes a second source of truth, which is its own disease.**

---

## RI-027 — Every check we have proves presence. None proves removal.

**Logged 2026-08-18. TRK-2026-9302. Found by the desktop executor while correcting a false
sentence in a client deliverable.**

**`Verify-Job-Artifact.ps1` has five check types: `PathExists`, `PathAbsent`, `FileContains`,
`TaskReady`, `ChildDirsAllHave`.**

**There is no `FileNotContains`.** `PathAbsent` proves a *path* is gone; nothing proves a
*string* is gone from inside a file.

### Why that matters more than it sounds

**In the desktop's own words:**

> *"A verifier that can only prove presence cannot prove a retraction — and tonight was a
> retraction."*

**The errors that mattered most this week were all false sentences that needed removing:**

- *"the county was asked and declined to answer"* — in a client file, converting our gap into
  the county's refusal.
- *"zero client documents"* — said of a folder holding nineteen.
- *"the five reports were overwritten"* — a destructive event that never happened.

**Every one was a retraction. Not one of them could be proven complete by the verifier.**

### The asymmetry, stated plainly

**We can prove we built something. We cannot prove we removed something.**

For a business whose deliverables go to clients and sit in files for years, **the second is the
one that carries legal weight.** A wrong sentence that was never fully removed is worse than a
right sentence that was never added.

### What was done and what was not

**The desktop proved the removal by read-back** — new string present, old string absent, the
literal phrase proven gone, then rendered in headless Chrome and the DOM read back to confirm a
byte-level edit inside a 912 KB file had not broken a tag.

**That proof is real and it lives in a message.** As the desktop said: **messages are not
evidence.** It is not in the registry, so nothing downstream can check it.

### Fix

**Add `FileNotContains`.** It is a small check type and the hard part is not writing it.

**The hard part is that `Verify-Job-Artifact.ps1` is a completed build and §1.33 locks it behind
Jorge's 4-digit passcode — the same code already blocking the portal document-count fix.**

**One four-digit number releases both.** Written to him as one item, not two.

**Tier: this is Tier 2, removal of the cause.** The verifier gains the ability to prove the
thing it currently cannot, permanently. **No Tier 1 alternative was considered, because there
isn't one — you cannot suppress your way into an absence proof.**

---

## RI-028 — Three layers of liveness test, and all three were wrong at once

**Logged 2026-08-18 08:15 UTC. TRK-2026-9311.**

**In six hours, three separate liveness tests were found to be producing confident wrong
answers about the same components. They were found in order, each one exposing the next.**

### Layer 1 — my baseline rule (found 06:15, mine)

I wrote that a component proves life by its **output file growing** and recorded the reconciler
at 464 bytes. **An hour later it was 444.** It is a snapshot file that overwrites itself; it can
never grow. **My rule would have declared a healthy reconciler dead on its second reading.**

**Fixed:** state the file type first — append log (size grows), snapshot (`modifiedTime`
advances), per-item output (file count grows).

### Layer 2 — the reconciler's own stale list (found 07:24, by the desktop)

**The reconciler reports `Stale components (>20 min): UNATTENDED-EXECUTOR (401m),
JOB-VERIFIER (92m)`. Both are false, and it has been saying so every thirty minutes for days.**

- **`UNATTENDED-EXECUTOR` is a passive record, not a heartbeat.** Its own roster note says
  *"NO watchdog re-starts this — the entry records the process, it does not monitor it. Stale
  last_run means nothing refreshed it."* **It can only ever age.**
- **`JOB-VERIFIER` is event-driven.** It is idle because no job asked for it.

**The roster has no field distinguishing `heartbeat` from `record` from `on-demand`, so the
staleness test is applied to entries where age carries no information.** A warning that fires
on two healthy components twice an hour is not a warning; it is background noise that will hide
the real death when it comes.

### Layer 3 — my own measurement channel (found 08:10, mine again)

**I have been checking the reconciler's liveness by reading its report's `modifiedTime` in
Drive. Four observations: 04:40, 05:40, 06:40, 07:40 UTC — exactly hourly.**

**The reconciler declares a 30-minute cadence, and the desktop measured it on disk at 07:21 UTC
as "11 min since last run" — implying a 07:10 run that never reached Drive.**

**So my liveness check is not measuring the reconciler. It is measuring Drive sync**, which
appears to lag or coalesce, and can drop an entire run from the cloud's view.

**Stated as an observation, not a verdict:** both explanations fit — Drive sync coalescing, or a
missed run. **A fourth data point at hourly spacing cannot distinguish them, and I am not going
to pick one.** The run counter now staged resolves it permanently: a monotonic number that jumps
by 2 tells you a run was skipped in transit; one that stops tells you the reconciler stopped.

### The general lesson, which is the point of this entry

**Every one of the three was a test that returned a well-formed answer instead of an error, and
each was only found because something else was being checked.**

**Rule: a liveness test must state what it is actually measuring, not what it is named after.**
Mine was named "is the reconciler alive" and was measuring Drive sync. The reconciler's was named
"stale components" and was measuring age on entries where age is meaningless.

**Related:** RI-002 (a process in the task list is not a run making progress) and RI-025 (a
number true of a rule nobody wrote down). **RI-028 is what happens when RI-002's fix is written
without RI-025's discipline.**

### RI-028 CORRECTION 2026-08-18 09:15 UTC — layer 3 was wrong too. The bottom is aliasing.

**Layer 3 above says my liveness check was measuring Drive sync, and offers "Drive coalescing"
or "a missed run" as the two candidate explanations. Both are wrong. There is a third and it
needs neither.**

**The reconciler did not miss a run. Its own log shows twenty consecutive completions across
nine and a half hours — 18:40, 19:10, 19:40 … 04:10 ET — every thirty minutes, zero gaps.
Scheduled task result 0, next fire armed.**

**And Drive did not drop anything.** Read through the Drive API rather than the mounted folder,
the report's own server-side fields are `createdTime 04:10:07Z` and `modifiedTime 08:10:21Z` —
**both of them `:10` runs, one uploaded ten seconds after it was written.** If Drive
systematically dropped the `:10` writes, neither timestamp could exist.

### The actual cause: **aliasing**

**I sampled once an hour. The writer runs every thirty minutes.** A sampler slower than its
subject sees exactly one of the two runs and always the same one.

**My four observations at 04:40, 05:40, 06:40, 07:40 were not evidence that the writer is
hourly. They are the signature of an hourly sampler.**

**Three diagnoses, each one a correction of the last, and the third was still not the bottom:**

1. *"The output file must grow"* — wrong; it is a snapshot.
2. *"I am measuring Drive sync"* — wrong; Drive delivered every write.
3. **The test was measuring my own poll interval.**

### The rule, extended — this is the durable part

**A liveness test must state its sampling period alongside what it measures.**

**A sample slower than the thing it samples cannot see that thing's rate at all. It can only
report its own.** Every number such a test produces will be well-formed, stable, reproducible
and about the wrong subject.

**The honest limit, kept from the desktop's note:** one server-side observation proves a `:10`
run *can* reach Drive in ten seconds. It does not retro-prove that every past `:10` write did.
**Which is why the run counter still ships** — a monotonic number that jumps by two separates
transit loss from a stopped writer permanently, and no amount of timestamp-reading from either
side ever will.

### Tally for this entry

**Four wrong liveness answers in eight hours** — my growth rule, the reconciler's stale list, my
Drive-sync diagnosis, and the desktop's own repetition of my "never reached Drive" claim on my
word without asking Drive.

**Every one was found by checking something else. Not one was found by the test failing.**

---

## RI-029 — Windows reports a dead printer as "Ready"

**Logged 2026-08-18. TRK-2026-9374.** The fifth instance this week of RI-025's shape — an
error dressed as a success — and the first to threaten a client-facing deadline.

**Jorge's default printer, `Brother MFC-L3770CDW` at 192.168.1.80, is off the network** —
ping fails, all ports (9100/80/443/631/515) fail, absent from the ARP table on the same
subnet. **Windows reports it `PrinterStatus 3 / WorkOffline False / DetectedErrorState 0` —
"Ready."**

**A job sent there spools, sits, and prints nothing while every status surface says green.**
Jorge would have stood at an empty tray believing "Claude printed it."

**Caught because the desktop pinged the printer instead of trusting Windows' status.** It
printed to the reachable `MFC-8890DW` (mono) and *said so* rather than swapping silently.

**The rule: never report a print as done from a spooler `printed` count or a "Ready" status.
Confirm the target device answers on the network first, and state the one thing software
cannot see — paper in the tray — as unverified.**

**Fix tier: Tier 2 for the device (power it on / fix its network), Tier 3 for the process
(a pre-print reachability check).** Both belong to the desktop; the L3770's actual state is a
Jorge question — is it supposed to be alive?

**Same family:** RI-025 (a number true of a rule nobody wrote down), RI-001 (the "hidden"
flag that doesn't hide), the permit gate re-rendering its menu. **Software's self-report of
its own success is the least trustworthy signal on the machine.**

### RI-025 addendum 2026-08-18 — the widen-the-rescue trap: a filter order that would fake success

**Contributed by the desktop while STAGING (not running) the 37-email widening.**

The mail rescue **filters by date before folder.** The 37 business emails in Bills/Permits/
CU_Inspections are all **outside the date window.** So "just add the three folders" would have
scanned them, matched zero by date, and **printed DONE on zero moved** — word for word the
2026-07-30 failure the tool's own footer apologises for.

**Caught by staging and reasoning about the filter order, not by running it and seeing zero.**
The candidate now defaults to ALL-TIME (`-Days 0`), names any folder it cannot find, and
**reports a zero result as "ZERO — this is NOT success."**

**Rule reinforced: when widening a tool's scope, check the tool's OTHER filters first — a
second filter can silently null the first, and the result still reads as a clean finish.**

### RI-025 recurrence 2026-08-18 18:35 — "nothing left to move" was read off the wrong setting

**My own 13:05 mirror said the mail rescue "had already finished" and "there was nothing left
to move." That was read off the 08:48 preview which ran at Days=60. The button had already
been re-cut to Days=120, where the answer is not 0 — it is 22 real business emails still
buried.**

**The desktop caught it by reading the engine's own log line by line** rather than trusting a
summary: `08:48 WOULD MOVE 0 (Days=60)` vs `08:55 WOULD MOVE 22 (Days=120)`.

**Two things it proved and one it refused to guess, correctly:**
- PROVEN: 22 business emails are still buried at the current setting; the button is armed.
- PROVEN: the engine did not run at Jorge's ~11:30 click (no log entry, manifest ends 08:55).
- NOT CLAIMED: *why* the click produced nothing — a failed launch and an opened-then-closed
  window leave identical traces (none). It would not book "worked" or "broken" off silence.

**The rule, again: a "zero result" is only as true as the filter it was measured under.
State the setting next to the number, every time.** My mirror quoted the number without the
setting, and the record briefly told the next session the button was spent when it was not.

### RI-023 ROOT CAUSE FOUND 2026-08-18 20:35 — it was FancyZones all along, NOT a recurrence

**Supersedes the "recurrence" framing below.** The desktop proved by arithmetic that the
−1919/−963 positions are zones 0 and 1 of the "CU 4-Half" FancyZones layout applied to the
invisible monitor (predicted rects match observed to the pixel; margins sum to 1920 with no
residual). A Chrome window landed on the byte-identical rectangle. **Two years of "my windows
disappear" has one cause: FancyZones with `moveWindowsBasedOnPosition=true`,
`displayOrWorkAreaChange_moveWindows=true`, and `excluded_apps=""`.** 19 live apps remember a
zone on the monitor Jorge cannot see. **Every owner button is `mshta.exe`, so one remembered
zone governs all of them.** Fix staged (exclude mshta + clear the 29 memories), passcode-gated.
Full record: `RI-023-ROOT-CAUSE-FANCYZONES_2026-08-18.md`. **RI-023 is hereby reclassified from
"off-screen prompts" to "FancyZones relocates windows to the unwatched monitor" — the deeper
and correct statement.**

### RI-023 (earlier framing) 2026-08-18 19:10 — the ask windows were off-screen AGAIN

**Both owner-action windows were parked on DISPLAY2 (x −1920→0), the monitor Jorge cannot see**,
measured at 15:05: STOP THE INTERRUPTIONS at −1919,8 and MAIL RESCUE at −963,8. The 11:05
register had verified STOP THE INTERRUPTIONS *self-placing at 5,55 on the primary* — **it was
verified, then it moved and resized (610x840 → 962x1071).** Cause not identified.

**FancyZones is running on this machine and its whole job is moving windows — named as the
first thing to check, not accused.** This is the same x=−963 coordinate as the original RI-023.

**Desktop fix:** both windows moved to the visible monitor (STOP THEM at 5,55; MAIL RESCUE at
1298,55), clear of the Claude chat, `SWP_NOACTIVATE` so no focus stolen. Screenshotted.

### RI-030 — a window is only as fresh as the file it was launched from

**TRK-2026-9377, resolved.** Jorge clicked MAIL RESCUE and saw "no response." The window he
clicked (`mshta` PID 228912) was **launched 2026-08-17 21:03:56**; the file was **edited
2026-08-18 08:54:18** — the window was **11 hours older than its own source.** Its face still
read "2,786 emails / BRING BACK MY 116 / last 60 days"; the file on disk said DAYS=120 / 22.

**An HTA is a snapshot taken at launch. Editing the file does not touch the running window —
and `SINGLEINSTANCE="yes"` means relaunching silently re-activates the stale one instead of
loading the fix.** So we "delivered a fix" to a file while the stale window sat on screen.

**This is RI-025's shape at the UI layer, and the cloud's own line names it:** *a zero result
is only as true as the filter it was measured under — and a window is only as true as the file
it was launched from.* **Rule: after editing a script that has a live window, kill and relaunch
the window, then read its face back — the file changing is not the window changing.**

**Third case, neither of us had it: not "button failed," not "never pressed" — "button worked
perfectly and would have done the wrong thing" (the stale Days=60 button returns 0 because the
113 already came back).** Desktop killed the stale window and relaunched from the corrected
file; its face now reads 3,116 / 22, screenshotted.

### RI-030 addendum 2026-08-18 21:30 — WindowFromPoint proves geometry, not reachability

**The 16:50 check proved the two owner buttons "clickable" with WindowFromPoint at two convenient
points. Re-run at each button's own CENTRE at 17:28: 0 of 4 owner buttons receive the click.** A
Windows "(Not Responding)" ghost window (`dwm.exe`) is drawn over MAIL RESCUE and OWNER APPROVALS;
a Speechify/Edge window over STOP THEM. **`WindowFromPoint` proves a rectangle is there — not that
the top window is the button, reachable, or alive.** Test the centre, and test responsiveness
separately. Same family as RI-030 (a window is not its file) and RI-025 (a number needs its rule):
**the honest test point is the one the user would actually click.**

## RI-023 recurrence — 2026-08-19 (the count, not the diagnosis)
FancyZones banishment quantified for the first time: the desktop parsed
`app-zone-history.json` read-only and found **32 of 51 zone-history entries point
at DISPLAY2 (the dark monitor)** — including `explorer.exe` and `chrome.exe`, not
just the `mshta.exe` owner buttons. The old MEMORY note `project_fancyzones_hides_windows`
undercounted at "19 apps." **Rule 4 consequence, recorded so no future session
re-opens the patch debate:** clearing remembered entries (at any blast radius) is
Tier-1 — FancyZones rewrites the file from memory (~3 min), and the buttons' launch
race reforms even a surgical single-entry delete. The Tier-2 removal is to stop
monitor 2 from being a snap target at all (disable the phantom display, or restrict
FancyZones to the one real monitor). Gate before any fix: confirm read-only whether
DISPLAY2 is a live monitor or a phantom. Refs TRK-2026-9390 / 9391 / 9392.
