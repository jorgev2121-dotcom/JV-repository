# ROOT CAUSE — the popups that eat Jorge's keystrokes

**RI-001 · TRK-2026-9331 · cloud deep dive 2026-08-18**
**Trigger: Jorge's direct challenge — 24 months unsolved, dozens of repairs, always back
by end of day. New facts he supplied today are in Section B and they narrow this
considerably.**

Per Rule 6, the three questions are answered before anything is proposed.

---

## Section A — What is already known (from RI-001, read first per Rule 4)

- **Two years, chronic.** Every fix lasted a day or two, then decayed; back to 100%.
- **Live captures on record:** three modal dialogs stacked at once on 2026-08-15 — two
  `claude.exe` launch failures (RI-006's broken launcher button, which **can never work as
  written**) and one Outlook *"Cannot show your next reminder"* (a corrupt reminder item).
  PaperPort's error dialog seen three times in one day on 2026-08-16.
- **Every fix ever attempted was Tier 1** — Focus Assist, notification settings, clicking OK,
  killing the process. Modal *error* dialogs ignore every notification setting, which alone
  explains two years of failed attempts.
- **Three Tier 2 fixes were prescribed in RI-001 and there is no record any was executed:**
  `outlook.exe /cleanreminders` · the RI-006 launcher rewrite by AppUserModelID · the RI-021
  PaperPort Send To Bar repair.
- **The spy:** a trigger-logger was installed at some point to catch the culprit in the act.
  **Its output has never been harvested.** No trace of it exists in this repo; if its logs
  exist they are on the desktop's C: drive. **Finding them is step 1 of the trap job — the
  evidence may already have been captured and simply never read.**

---

## Section B — The two new facts, and what each one rules out

**Fact 1: it fires every three to five minutes.**

That is a **timer**, not an accident. Corrupt-reminder dialogs, PaperPort errors and launcher
failures are *irregular* — they cannot produce a 3–5 minute metronome. **Something on that
machine runs on a 3–5 minute schedule and takes the foreground when it does.** This single
fact separates the chronic background noise (RI-001's known dialogs) from the metronome that
interrupts typing, and they may well be different culprits.

**Fact 2: keys are MISSED and typing FREEZES briefly — not just misdirected.**

A stolen focus sends keystrokes to the wrong window. **Dropped letters and momentary freezes
mean the input queue itself is stalling.** Only a few mechanisms do that:

1. **A low-level keyboard hook whose host process stalls.** Windows routes every keystroke
   through installed hooks; when a hook's owner hangs even briefly, keys are delayed or
   silently dropped. Dictation tools, text expanders, clipboard managers and some antivirus
   products hold exactly these hooks. **Jorge dictates all day — a dictation/TTS tool sitting
   in the input path is a first-class suspect, and its own updater restarting it would explain
   the decay pattern.**
2. **Foreground theft at the moment of typing** — a window (even an invisible console flash)
   takes focus for half a second on its timer; keys typed in that half second vanish.
3. **A periodic system stall** — a scheduled scan, a sync-engine storm, or **a failing USB
   device re-enumerating.** Hardware deserves the unconventional flag Jorge asked for: **a
   flaky hub, dongle or keyboard re-connecting every few minutes survives every software
   repair ever attempted — which is exactly the 24-month history.** Re-enumeration also
   produces the connect chime and a device flash that reads as "a popup."

---

## Section C — Question 2: why did a dozen repairs fail?

**Four reasons, compounding:**

1. **Wrong tier.** Every attempt was suppression. Rule 4 now forbids that for this issue.
2. **Wrong class.** Notification settings were applied to modal *error* dialogs, which no
   notification setting touches.
3. **The trigger is re-created faster than it is removed.** Updaters relaunch killed
   processes; logon re-registers startup entries; **and Jorge's own automation now includes a
   Guardian whose explicit job is restarting a killed poller.** Any repair that works by
   killing a process is undone *by design* within hours. The system's Tier 3 machinery is on
   the disease's side.
4. **No follow-up on the measurement.** The spy was installed and never read. **The fix
   cycle has been: suffer → patch → improve → forget → relapse. The forgetting step is where
   all twelve repairs died — and that step is exactly what this repo exists to remove.**

**One more, structural: the 24-month timeline means the original offender predates the
current agent ecosystem.** Today's culprit may not be 2024's culprit. **This is probably a
relay race of different processes sharing one mechanism** — which is why removing any single
app "significantly improved" things and never finished the job.

---

## Section D — Question 3: three options, ranked by expected lifespan

**Option A — Tier 1, named to refuse it.** Silence notifications, click OK, kill the process
on sight. **Lifespan: hours to days. Forbidden under Rule 4 — this is the option that has
been run twelve times.**

**Option B — Tier 3 first, then targeted Tier 2: CATCH THE THIEF, then remove exactly what
the log names. RECOMMENDED.**

The offender **signs its name in the foreground log the moment it fires.** A logger that
records every foreground-window change with process, path and timestamp, left running for one
working day, converts a 24-month mystery into a sorted table: **group by process, compute the
median interval, and the 3–5 minute metronome falls out of the data.** Alongside it, three
censuses that each catch what the logger cannot: scheduled tasks with repetition ≤ 10
minutes; USB re-enumeration events from the last 48 hours (the hardware hypothesis); and the
roster of processes holding keyboard hooks. **Then remove the named offender outright.**
Lifespan of each removal: **permanent per offender** — and if a guardian re-adds it, the log
shows that too, and the guardian gets fixed instead of fought.

**Option C — Tier 2 now, no diagnosis needed: remove the three proven popup factories and
muzzle the automation.** These are already convicted by RI-001's own captures and need no
logger: run `outlook.exe /cleanreminders` once (kills the corrupt reminder permanently);
rewrite or delete the RI-006 launcher buttons that can never work; repair or uninstall
PaperPort per RI-021. **And one new item from this ecosystem: every VTES scheduled task and
agent launch gets `-WindowStyle Hidden` verified, so no automation of ours can ever take the
foreground** — whatever else is true, our own machinery must be provably innocent, and today
it is not provable. Lifespan: **permanent for each item.**

**Recommendation: C and B together, tonight.** C removes the known offenders in under an
hour. B's trap runs through tomorrow's working day and names whatever survives C. Neither
waits on the other.

---

## Section E — The unconventional list, as requested

Ranked by how well each matches *both* new facts (3–5 min cadence AND dropped keys):

1. **A periodic task launching a visible console** — every poller/watchdog/sync helper that
   runs `powershell.exe` without `-WindowStyle Hidden`. Flash, focus theft, dropped keys,
   metronome. **Our own VTES family must be checked first, because our Guardian resurrects
   anything killed** — the exact relapse signature.
2. **A failing USB device re-enumerating** — survives every software fix; produces freezes,
   missed keys, chimes and device flashes; invisible to every diagnosis that only looks at
   software. One event-log query settles it.
3. **A dictation/input tool's hook stalling** — he is never not dictating; the tool's
   updater restarting it daily matches "back by end of day."
4. **Two sync engines on one folder tree** — Dropbox and OneDrive both sync overlapping
   content (the de-dupe merge is a known open item). Periodic scan storms stall the shell;
   typing into anything Explorer-hosted drops keys during the storm.
5. **Our own ask-windows** — RI-023 proved this ecosystem opens prompt windows on a timer.
   They currently open at x = −963 where they steal focus *invisibly* — the worst case:
   keystrokes vanish into a window he cannot even see.

---

## Section F — What was executed tonight

1. **This analysis**, committed to the repo.
2. **The trap job, queued to the desktop** as `JOB_CATCH-THE-THIEF_TRK-2026-9331` in
   VTES-Inbox: find the old spy's logs first, then run the foreground logger for a working
   day, plus the three censuses, plus Option C's three removals — each with verification
   output required, per Rule 2.
3. **RI-001 history updated** with today's two new facts and this deep dive.

**What the cloud cannot do:** touch the machine. Every measurement above is a desktop job,
and it is queued. **What was refused:** proposing any Tier 1 fix, per Rule 4.

#RI-001 #TRK-2026-9331 #RootCause #JorgeValdes #CU-Inspections
