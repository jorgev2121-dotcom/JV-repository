# TASK-SWEEPER PROTOCOL — an agent that comes behind every chat

**Owner directive, Jorge Valdes, 2026-10-10.** Built and switched on the same day by ☁️ Cloud.
#task-sweeper #tracker #orchestrator #JorgeValdes

## Section A — What it is, in one breath

A scheduled cloud agent runs **every 2 hours**. It reads every Claude session that changed since its last run, pulls out every task Jorge asked for, gives each one an urgency and a realistic schedule, assigns it to a lane, and writes it to the **TRACKER** tab of the VTES Control Panel:
https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj

Each task there has a fuel gauge. The gauge fills to 100% as work gets done. A notch shows where it should be by now. At 100% the task goes into testing for its set number of hours, then rollout.

## Section B — The rules the sweeper follows

1. **Owner-flagged errors are P0 and go to the top.** If Jorge calls something an error, a bug, broken, wrong, or "not working" — in any chat, or with the 🚨 button — the task is set `urgency: P0`, `owner_error: true`. It is never queued behind other work.
2. **Urgency:** P0 owner error · P1 today (money, Wally pipeline, cash collection, anything with a date inside 48 hours) · P2 this week · P3 when free.
3. **Schedule, aggressive but realistic:** P0 build due within 4 hours; P1 within 24 hours; P2 within 5 days; P3 within 14 days. Testing hours: 1 for a page or text change, 4 for anything touching the PC, 24 for anything Jorge must look at.
4. **Assignee** by what the task needs: PC files, printer or scripts → RAMBO (Desktop); repo, research, pages → Cloud Code; long analysis → Cowork; code on the ChatGPT pool → Codex; Jorge only for a click, a yes/no, or a login (with the WORKAROUND-CERT, charter Article 4).
5. **Never duplicate.** Before adding, compare with every open tracker task. If it is the same task, add a log line instead.
6. **Progress is evidence, not guesswork.** The gauge moves only when a session shows work done (a commit, a published page, a result file). Done = 100% with a `proof` line. No proof, no 100%.
7. **Every run writes a sweep record** to `tracker_meta/last_sweep` with time, sessions read (with a denominator), tasks added, tasks updated. A run with no record counts as a failed run.
8. **Read-only on everything else.** The sweeper only writes the tracker. It never sends email, files documents, or messages other sessions.

## Section C — Data shape (collection `tracker`, document id `T-YYYYMMDD-NN`)

`title, status (queued|building|testing|rolled-out|done|blocked), pct (0-100), urgency (P0-P3), owner_error (bool), assignee, created, build_start, build_due, test_hours, rollout_due (optional), source (chat link), proof, log [{at, by, text}]`

These are tracker IDs, not TRK numbers. A task that becomes a client job still gets its TRK from the registry.

## Section D — How it is wired

- **Schedule:** Routine "VTES task sweeper (every 2 hours)", trigger trig_01Ri9ipkXwqxhvJdV2eTLij2, firing at :18 past every second hour UTC into the cloud session session_01FdGTRVtDwdX9dVbnggQTfG.
- **Why not a fresh session each run:** tried first on 2026-10-10 15:18Z. The fresh session had ArtifactData but NOT list_sessions or list_events, so it could not read any chat. The fix was to fire into a session that has those tools.
- **Reads:** Claude Code Remote `list_sessions` and `list_events` (user and assistant turns only).
- **Writes:** the panel database through the ArtifactData tool, collections `tracker` and `tracker_meta`.
- **Known limit:** Cowork and phone chats are not in the session list, so the sweeper cannot read them. Tasks from those go in by the 🚨 / note buttons, or by saying them in a Code chat.

Footer: TASK-SWEEPER-PROTOCOL · v1 · 2026-10-10 · CURRENT · #task-sweeper
