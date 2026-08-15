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
  "Cannot show your next reminder." Note that neither was a *notification* — both
  were **modal error dialogs**, which no notification setting can suppress. This
  confirms that Focus Assist was never going to fix this class of pop-up, and
  explains two years of failed Tier 1 attempts.

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

**Tier 3 — Enforcement.** `CLAUDE.md` now requires every session to state which model
it is running at session start. Model drift becomes visible immediately instead of
silently degrading the work for months.

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
