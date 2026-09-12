# FINDING — 🖥️ RAMBO → ☁️ CLOUD: the frozen miamidade window was an orphaned COM-driven Internet Explorer, not a browser tab

**2026-09-04 03:24 -04:00 · answers `HANDOFF_CLOUD-TO-DESKTOP_kill-frozen-miamidade-window_2026-09-04.md`**

## CLOSING QUESTION, ANSWERED

**What was spinning the loop?** Neither of the two hypotheses in the handoff. Not a Claude-in-Chrome retry,
not a reload-stuck tab, not a scheduled task. It was **`iexplore.exe` PID 13644, COM-activated**, parent
`36076 IEXPLORE.EXE -Embedding` under `svchost.exe` — an IE automation object somebody created and never
called `.Quit()` on.

- Started **2026-09-01 17:57:14**. Alive **57 hours**.
- Accumulated **104,392 s CPU = 29 CPU-hours**.
- Measured rate over a 90-second sample: **83.3% of one core, sustained**.

**Control measurement — the innocent party.** `chrome` 29424, the "Official Records"
(`www2.miamidadeclerk.gov/ocs/`) window this lane opened for TRK-2026-1684, was sampled over the same 90
seconds: **0.1% of one core.** Idle. Had I gone by window title alone I would have killed the wrong process.

## WHY IT SURVIVED 57 HOURS — three separate invisibilities

1. **No visible title.** It never appeared in a `MainWindowTitle -ne ''` enumeration.
2. **`Shell.Application.Windows()` returned count 0** — it was not registered as an IE window at all, which
   is itself the proof that the creating client is gone.
3. **`Responding` read `True`** on both processes. The message pump was alive while nothing progressed.

It did hold a real window handle (`1115118`) with an **empty title**. That is what a frozen IE becomes once
the page that would have named it never completes — consistent with Jorge seeing *"online services . Miami
Dade"* two hours before the handoff and the title being blank by the time anyone looked.

**A process reporting `Responding=True` while burning a core and rendering nothing is the RI-002 signature
exactly: alive is not progressing.** Add the COM-orphan case to RI-002.

## ACTION TAKEN — GREEN, as the handoff rated it

`Stop-Process -Id 13644, 36076 -Force`, then verified: **`NO iexplore.exe processes remain`.** Chrome, Edge,
Outlook and the Official Records window were untouched. Nothing to undo — the only state change was ending
two dead processes.

## PREVENTION — PARTIAL, and the gap is named rather than papered

**I could not identify the source.** Parentage dead-ends at the DCOM launcher. A sweep of every
`.ps1/.vbs/.js/.hta/.bat/.cmd` under `OneDrive\Scripts`, `Desktop`, `OneDrive\Desktop`, `VerticalTray` and
`MY-DESK`, **plus every scheduled task's action line**, returned **NONE** for `InternetExplorer.Application`
or `iexplore`. Most likely PAD or a one-off from a live session, and already gone.

The detector is three lines — kill any `iexplore` whose parent is `svchost` and whose CPU rate holds above
50% of a core across two samples. **Not built:** ZERO-AA forbids a new watcher while the money lock is open.
Recommend folding it into an existing sweep when the lock lifts.

## THE REASON THIS ORDER SAT UNREAD FOR 3h50m

The desktop heartbeat tracks `claude/slack-app-overview-3i0w4g` and is **ahead 1, behind 16**, with
`git merge-tree --write-tree` reporting **zero conflicts**. The single local commit is
`793974f heartbeat: acknowledge 1 new to-desktop file(s)` — **written by the heartbeat itself** — and it
cannot be pushed because `gh auth login` has never been run. `VTES-Repo-Heartbeat.ps1` warned of exactly
this at its own line 185 and then walked into it.

Last good pull **2026-09-03 23:25:03**. **83 `PULL FAILED` entries since**, one every 3 minutes, every task
run returning `Result=0`. **This is not AP-0026** — that is the 3-register conflict on
`chaude-code-max20-kp2o46`, re-confirmed this cycle and still not merged.

**ONE OWNER ACTION: `gh auth login`, once, in a terminal.** It releases the push, the push releases the
fast-forward, and 16 commits reach the desktop — including this URGENT one, both PRIORITY popup items, the
TASK-REGISTER and the SessionStart hook.

**RED or GREEN:** GREEN. A process was ended; nothing was submitted, paid, entered or deleted.

#urgent-answered #frozen-window #miamidade #RI-002 #com-orphan #heartbeat-blocked #gh-auth-login
