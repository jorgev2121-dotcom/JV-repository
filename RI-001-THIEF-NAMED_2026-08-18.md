# The 24-month keyboard thief has a name — and it is our own fleet

**RI-001 · TRK-2026-9331 · desktop start-confirmation 10:35 ET, mirrored 15:10 UTC**
**The trap sprang in fourteen minutes, and the old spies had already answered the question —
nobody had ever read them.**

---

## Section A — The answer

**The thief is the PowerShell console — the black window our own scheduled tasks flash open.**

**Three independent witnesses agree:**

1. **The forgotten spy, found and finally read.** `Focus-Spy.log` — 1,957 focus steals over
   13 hours, parsed tonight. `powershell` and `pwsh` are **the only two processes on the
   machine with a metronome**: 221 of their gaps land in the 3–5 minute band (30% and 39% of
   their appearances). Everything else — Chrome, Claude, Edge, Explorer, Outlook — sits at or
   below 8%, which is what human clicking looks like.
2. **A second forgotten spy, different tool, different days.** `Focus-Keeper.log` — **3,049
   keyboard rescues in 57.7 hours, one every 1.14 minutes**, every line reading *"powershell
   console appeared → keyboard returned."*
3. **The live trap, today.** Fourteen minutes in: Chrome had focus, a PowerShell console took
   it, Chrome got it back 1.1 seconds later. **A third spy — 41 MB of `popup-catcher.log` —
   is still unmined and names parent processes; that is the next pass.**

## Section B — The freeze itself, caught for the first time

The desktop added a stall detector beyond the job's spec — **the right call**, because a
freeze that eats letters without switching windows would have left no trace in a focus log.

**Seven stalls in the first nine minutes, 1.2 to 1.5 seconds each where the machine should
lose a quarter second. Six of the seven had a PowerShell console in the foreground.** And the
key row: **one stall was still running *after* focus returned to Chrome — which is exactly why
Jorge's letters vanish from the window he is typing in.**

## Section C — Which tasks

**23 scheduled tasks run on a 10-minute-or-faster cycle. Eight fire every 3–5 minutes** —
the reported period exactly: NoGap-ChatArchive (3), Records-Watch (3), Plaud-DesktopBridge
(5), Chrome-KeepAlive (5), Bus-Dispatcher (5), Bridge-Guardian (5), Print-Archive-Processor
(5), Inbox-Job-Watcher (5). Plus a 1-minute and a 2-minute task.

**One exact second-for-second match already:** the 10:23:23 steal lands on three tasks whose
`LastRunTime` reads 10:23:23. **Stated at its true strength — one match is a lead, not a
conviction.** The six-hour table (~16:30 ET) converts it.

**A false flag the desktop raised and killed itself:** four tasks first flagged as launching
visible consoles actually run through `Run-Hidden.vbs`, window style 0 — genuinely hidden.
Its own pattern-match did not know the wrapper. Reported so no session re-raises it.

## Section D — Ruled out, cleanly

- **Hardware: ZERO USB re-enumeration events in 48 hours.** Not a cable, hub or dongle —
  **a software fix can hold.** The best possible negative.
- **Hooks: no AutoHotkey, no expander, no clipboard manager.** Only Logitech Options+ sits
  third-party in the input path — the fallback suspect if the fleet does not explain
  everything.
- **The executor's own PowerShell:** probed live — its consoles have no window and never take
  focus. Different class from the stalling ones.

## Section E — Why twelve repairs never held, now provable

**The fix was never applied to the cause.** The consoles belong to the task fleet; killing a
console or muting notifications leaves 23 timers rearming every few minutes — **the relapse
was scheduled.** And the answer sat in two log files for three weeks, unread. **The
forgetting step was the disease; the ledger is the cure.**

## Section F — What is queued and what is Jorge's

- **Six-hour interval table lands ~16:30 ET**, then full task-to-steal correlation, then the
  41 MB log.
- **D-1 corrected: the running mail app is NEW Outlook** (`olk.exe`) — `/cleanreminders` is a
  Classic-Outlook switch and touches nothing. Staged for a one-click go anyway because
  Classic is installed; **it deletes all reminders, so it stays owner-gated.**
- **Jorge's one decision, one reversible command:** the Task Scheduler history log is OFF, so
  Windows keeps no record of which task started which process. Turning it on makes the
  conviction provable instead of inferred: `wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true`

**The question is no longer WHO. It is WHICH of the 23 timers — and that answer arrives with
proof, not opinion.**

#RI-001 #TRK-2026-9331 #ThiefNamed #JorgeValdes #CU-Inspections
