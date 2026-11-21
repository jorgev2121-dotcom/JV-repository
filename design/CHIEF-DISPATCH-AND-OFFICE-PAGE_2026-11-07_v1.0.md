# DESIGN — The Chief, dispatch, and the "My Office" page

#VTES #control-panel #my-office #chief #dispatch #EXEC-01 #design

**Written:** 2026-11-07, cloud lane (EXEC-01 helper). **Status:** design only; nothing in this file has been built on the panel yet. **For:** Jorge, then the builder session that makes the TEST COPY panel.

**Plain summary, first.** Jorge talks to one person, the Chief. The Chief writes the request down at once, hands it to the first free agent, and tells Jorge who has it. The agent works until it is finished and reports back to the Chief. The Chief hands the finished thing to Jorge. Every step is written in the panel database with a time, so nothing can quietly disappear. A new page on the control panel, **My Office**, shows all of it in one place. The Chief and the agents are the hourly runner and watch that already exist; this design adds a list and a page, not new machinery.

---

## Section A — Objection first (Rule 3)

**Strongest objection.** A Chief that only forwards is a second inbox. The panel already has three places a request can sit unanswered: `task-comments`, `approvals`, and `orchestrator/queue`. Adding a fourth would repeat RI "orchestrator item sat 5 days at queued" (selftest/CHECKS.md, check 1). The failure here has never been a missing router; it has been nothing reading the queue.

**How this design answers it.** The Chief is not a new seat. It is the existing hourly WATCH (:16) and RUNNER (:41) in session EXEC-01, which already read the panel database every hour (OWNER-DIRECTIVE AGENTS-OWN-FOLLOW-THROUGH-01). My Office is one new collection those cycles read, plus one page. The three old places keep working; My Office is the view that shows them together, and new requests from Jorge land there.

**Alternative considered and rejected.** Making the PC Orchestrator (CU-Orchestrator, TEAM-ROSTER B9) the Chief. Rejected: it has been silent since 10-07 and only runs when the PC is awake and logged in. The cloud runner has run every hour for weeks (control-panel/BUILDER-LOG.md).

---

## Section B — The database: collection `office/tasks`

Lives in the panel's shared database (artifact https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj), read and written with `ArtifactData`, the same way `task-comments`, `tasks/state`, `approvals`, `orchestrator/queue`, `costs` and `attention` are today. One document per request. Document id: `OT-YYYYMMDD-NN` (example `OT-20261107-01`).

Fields, one per line, with what each means in plain words:

1. `id` — the office task number, same as the document id.
2. `trk` — the job's tracking number if the request belongs to a job; otherwise `NON-JOB`. Never invented (CLAUDE.md section 9).
3. `title` — one line, Jorge's words.
4. `request` — the full request as typed or dictated.
5. `requestedBy` — `Jorge` (or the surface: `iPhone`, `Chat`, `Panel`).
6. `requestedAt` — ISO time, Eastern shown on the page.
7. `state` — one of `new`, `assigned`, `working`, `delivered`, `accepted`, `blocked`, `cancelled` (Section C).
8. `assignedTo` — the agent seat name from exec-01/TEAM-ROSTER.md (`EXEC-01 helper`, `RAMBO`, `Cowork`, `QC-01`), or empty while `new`.
9. `assignedAt` — when the Chief handed it over.
10. `lane` — `cloud`, `pc`, `owner` (needs Jorge), per the GREEN/RED rules.
11. `red` — true if any step is RED (filing, moving, outbound mail, spend, credentials). RED tasks stop at `delivered` as a prepared packet and wait for Jorge's yes.
12. `workingAt`, `deliveredAt`, `acceptedAt` — times for each step.
13. `result` — the finished thing: a link, a file path, or the text.
14. `proof` — what proves it is done (file id, screenshot path, count with denominator). A delivery with no proof is not `delivered`; it is `working`.
15. `blocker` — if `blocked`: what was tried, why it failed, the one small thing needed (WORKAROUND-CERT, Article 4).
16. `versions` — the version-viewer list for the result (Section F): `[{v, date, html, note}]`, newest last.
17. `log` — a list of `{at, who, what}` lines, appended never replaced (same rule as `tasks/state`).
18. `dueBy` — optional, Eastern.
19. `costUsd` — written by the runner from the session meter, per the 2026-10-15 cost rule. Not shown on the page while money is locked (0000 rule).

Writing rule: agents use `update` (merge), never `set` (replace), so no field is lost. Every state change appends one `log` line.

---

## Section C — The state flow

```
new  ->  assigned  ->  working  ->  delivered  ->  accepted
  \         \            \             \
   \         \            \             +--> (Jorge says no) -> working again, log line "returned"
    \         \            +--> blocked (WORKAROUND-CERT in `blocker`), Chief tells Jorge the one small thing
     \         +--> cancelled (only Jorge)
      +--> cancelled (only Jorge)
```

1. **new** — Jorge typed or dictated it. Written at once, before anything else, so it cannot be lost.
2. **assigned** — the Chief picked an agent (Section D) and wrote `assignedTo` + `assignedAt`. Jorge sees "Assigned to X at 9:14 AM".
3. **working** — the agent started and wrote `workingAt`. If the agent is a cloud helper it writes a `log` line at each milestone.
4. **delivered** — `result` and `proof` are filled. The Chief shows it to Jorge on the page (and in the 6 PM summary). RED tasks are delivered as a prepared packet and say so.
5. **accepted** — Jorge taps **Accept** on the page. That is the only step that is his. If he taps **Not right**, the task goes back to `working` with his comment in `log`.
6. **blocked** — only after the exhaust-first steps. Shows the one small action in red on the page.

**Two-hour rule (existing):** any task older than 2 hours in `new` or `assigned`, or older than 24 hours in `working` with no new log line, turns the "waiting on agents" counter red and is an agent fault (OWNER-DIRECTIVE AGENTS-OWN-FOLLOW-THROUGH-01). The self-test already checks the three old collections; add `office/tasks` to check 1 in selftest/CHECKS.md when this is built.

---

## Section D — How the Chief picks an available agent

The Chief does not guess. It reads, in this order, and takes the first fit:

1. **Lane first.** If the request needs the PC (files on C: or G:, printer, county site with login, OCR): lane `pc`, agent `RAMBO`, delivered as one order into `mailbox/to-desktop/WORK-QUEUE.md` and a `MSG-CLOUD-TO-CODE_*.md` file in VTES-Inbox (the existing channel). Never more than 2 PC orders an hour (throttle rule 3).
2. **RED check.** If any step is RED, `red = true`; the agent prepares, never executes, and the task stops at `delivered` with a one-line ask.
3. **Cloud budget.** The runner reads `rate_limit_info` from `get_session` (throttle rule 1). `allowed` = up to 4 helpers; `allowed_warning` = 1 helper; `rejected` = no new assignment, task stays `new` with a log line "paused, budget", and the page shows it.
4. **Free seat.** Count `office/tasks` in `working` per `assignedTo`. A cloud helper seat is free when it has no task in `working`. EXEC-01 runs one helper (Agent) per task, so "available agent" means "a helper slot under the budget cap". There is no idle pool to poll; a helper is created for the task and ends when the task is delivered.
5. **Long documents** go to `Cowork` only if Jorge is at the PC with Cowork open (TEAM-ROSTER B10: nothing hands Cowork work automatically). Otherwise the cloud helper does it.
6. **Judgment calls** (which of two readings of a request is right) are decided by the Chief itself (Opus judges, helpers work: throttle rule 1).

Everything the Chief decides is written as a `log` line: `{at, who: "CHIEF", what: "assigned to RAMBO, lane pc, reason: needs printer"}`.

---

## Section E — Reusing the hourly runner and watch (no new machinery)

- **WATCH (:16, trig_01VTtAhauH65mx7o1CxPx2jj)** — add one step: query `office/tasks` where `state == new`. For each: assign (Section D), write `assigned`. This is the Chief's "immediately" at hourly grain. For true immediacy, the page's submit button also writes a `task-comments` doc with `status: "new"`, because the watch already answers those; the two are linked by `id`.
- **RUNNER (:41, trig_01EdLXoKjFM3nNsVywHHYz7T)** — add `office/tasks` in state `assigned` (cloud lane) to the queue at position P0.5: after P0 deadline items, before capsules. One helper per task, result written the moment it finishes (runner rule), then the doc is updated to `delivered` with `proof`.
- **Self-test (every 6 h)** — add `office/tasks` to check 1 (age rule) and plant a probe task once a day (`OT-selftest-<date>`), the same way `task-comments/selftest-probe-*` works today.
- **6 PM summary** — lists every task that reached `delivered` today and every `blocked` one with its one-line ask.
- **No new scheduled task.** No new session. No new mailbox. Roll back by removing the three added steps.

**Fast path (optional, later):** when Jorge is talking to a cloud session live, that session is the Chief for that conversation: it writes the `office/tasks` doc first, then starts the helper right away instead of waiting for :16. The hourly cycles still catch anything it drops.

---

## Section F — What the My Office page shows

New tab on the VTES Control Panel titled **My Office**. Orange Tree layout (PRETTY-AND-MONEY-LOCK-01): branches that click open, a checkbox per item, "View these together", "Copy for email", prints in color. Large text, phone width first, light and dark.

1. **Talk to the Chief** at the top: one big text box, a microphone hint ("dictate here"), and one button **Send to the Chief**. Submitting writes `office/tasks` (`state: new`) and the linked `task-comments` doc. The page shows "Written down at 9:12 AM ET. Nobody can lose this now."
2. **Waiting on agents** counter: how many in `new`/`assigned`/`working`, with the oldest age. Red past 2 hours (existing rule).
3. **Four branches:** *With the Chief (new)*, *Being worked (assigned, working)*, *Ready for you (delivered)*, *Done (accepted, last 30 days)*. A fifth, *Blocked, needs one thing from you*, shows only when non-empty, in red.
4. **Each task card:** title, TRK, who has it, since when (Eastern), the latest log line, and buttons **Accept** / **Not right** (delivered only) and **Open result**.
5. **Open result** uses the **version viewer** (`tools/version-viewer/version-viewer.js`, inlined into the panel since artifacts load no external scripts): the header shows "v1.2 (current) · Nov 7, 2026"; the click-down lists every earlier version of that result; **View** shows it, **Use** marks that version as the one Jorge wants (writes `log` line "Jorge chose v1.0"). An older version on screen shows the banner "A newer version of this is available: v1.2 (date)" with the jump button. Every delivery that changes a result appends a new `versions` entry at exactly +.1, never overwrites.
6. **Money:** `costUsd` and any dollar figure inside a result stay behind the 0000 zone code. Not shown, copied or printed while locked.
7. **Read aloud:** the page's text is plain so the Read/Dictate dot (v61+) can read any card.
8. **Everything is logged:** tapping a card's "History" opens the `log` list: request, pending, who assigned, when, each milestone, delivered, accepted.

---

## Section G — Panel versioning (section 20 of CLAUDE.md, as it stands today)

1. Build on the **TEST COPY** panel artifact first. Never on the live panel https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj.
2. Version increases by **.1** per enhancement (owner directive 2026-11-01). Live is at v65 per OPEN-ITEMS (TRK-2026-10016, 2026-11-04); the v63 note in CLAUDE.md section 20 is older. **Check the live page title before numbering** (another window has published over this one before, see TRK-2026-10015). The My Office tab is one enhancement: live vNN becomes vNN.1.
3. Put the number in the page title (`VTES Control Panel vNN.1 (CURRENT)`) and add a dated line to the Change log tab.
4. Publish over the same address only after Jorge says "it works" on the TEST COPY. Record the previous version id in OPEN-ITEMS.md for roll-back.
5. The test copy itself is a version of a document: its header can use this same version viewer so Jorge can click back to what he tested yesterday.

---

## Section H — Reaching the panel from the phone and the PC (click steps, plain words)

### H1. iPhone Home Screen (Safari)

1. Open **Safari** on the iPhone.
2. Go to the panel address (the claude.ai artifact link). Sign in to claude.ai if asked.
3. Tap the **Share** button (the square with an arrow pointing up, bottom middle of the screen).
4. Scroll the list down and tap **Add to Home Screen**.
5. Change the name to **My Office** if you like, then tap **Add** (top right).
6. A new icon appears on the Home Screen. Tap it to open the panel full screen.

UNVERIFIED: that the claude.ai sign-in survives inside the Home Screen copy; if it asks to sign in again, sign in once and it should stay. Chrome on iPhone: the same, but the Share button is in the address bar (top right), then "Add to Home Screen".

### H2. Windows taskbar (Edge or Chrome, "install as app")

1. Open **Edge** on the PC and go to the panel address.
2. Click the **three dots** (top right) → **Apps** → **Install this site as an app**. Name it **My Office**, click **Install**.
3. The panel opens in its own window. **Right-click its icon on the taskbar → Pin to taskbar.** (Right-clicking a running app's taskbar icon still offers "Pin to taskbar" on Jorge's Windows build; the scripted route was the one that was blocked, TRK-2026-9137 / 9247.)
4. Chrome: three dots → **Cast, save and share** → **Install page as app** (or **Save and share → Install**), then the same right-click pin.

UNVERIFIED: wording of the Edge and Chrome menus on Jorge's exact versions; the menu names above are from the current public builds. The tray (notification area) icon route exists as a plan (TRK-2026-9247, NotifyIcon) but is not built.

### H3. Reaching the PC from the phone (what exists)

1. **Claude app Remote Control.** On the PC, the Claude Code window runs `claude remote-control` (or `/remote-control` typed in the Desktop Claude Code window). Then the Claude iPhone app lists that PC session and Jorge can drive it from the phone, and the cloud can message it. This is the purpose-built channel (OPEN-ITEMS TRK-2026-9069).
2. **Keeping it alive.** `mailbox/to-desktop/RC-Watchdog.ps1` plus `Install-RC-Watchdog.ps1` register the Windows scheduled task **Claude-RC-Watchdog**: at logon and every 10 minutes it starts `claude remote-control` only if none is running, logs one line per run to `%USERPROFILE%\ClaudeWatchdog\rc-watchdog.log`, and sets the PC never to sleep on AC power. Undo: `Unregister-ScheduledTask -TaskName Claude-RC-Watchdog`.
3. **State as last recorded:** Remote Control was CONNECTED 2026-10-05 and again 2026-10-09 (OPEN-ITEMS ADMIN row); the watchdog install was IN PROGRESS waiting on PASTE-D-065 being pasted into the Jorge-PC window. **UNVERIFIED today** whether the watchdog task is registered and whether Remote Control is connected right now; the cloud cannot start it, only an action at the PC can (RECURRING-ISSUES 2026-10-09 line).
4. **Fallback that always works:** the Drive mailbox (VTES-Inbox / VTES-Outbox) read by the PC poller every few minutes, which is how PC orders are delivered today.

---

## Section I — What is UNVERIFIED in this design

1. The exact field names inside existing `approvals` and `orchestrator/queue` docs (only `doneAt`, `status`, `items`, `queued` were seen in the repo copies). Read the live db before building.
2. The live panel version number right now (v65 per OPEN-ITEMS; check the page title).
3. Phone menu wording (H1, H2) on Jorge's device versions.
4. Whether the Claude-RC-Watchdog task exists on the PC today, and whether Remote Control is connected (H3).
5. Cowork availability detection: no signal exists; the design assumes "not available unless Jorge says so".
6. Version viewer on Safari/iPhone: tested in Chromium only (tools/version-viewer/README.md).

---

## Section J — Build order for the TEST COPY (one enhancement, one .1)

1. Read the live db collections once (`ArtifactData` list on `task-comments`, `approvals`, `orchestrator/queue`) to confirm field names. Record them here as v1.1 of this design.
2. Add the My Office tab to the TEST COPY with the version viewer inlined, the Send-to-the-Chief box, the four branches, Accept / Not right, 0000 lock, change-log line, title vNN.1.
3. Add the three cycle steps (Section E) to the WATCH and RUNNER prompts and `selftest/CHECKS.md` check 1.
4. Plant one probe task, watch it go new → assigned → delivered → accepted inside two cycles, screenshot each state at 390 px. That is the proof.
5. Jorge says "it works" on the TEST COPY. Only then publish over the live address, record the old version id in OPEN-ITEMS.md.

---
TRK-TBD-ASSIGN-ON-REGISTRY · v1.0 · 2026-11-07 · CURRENT

Shall the builder start step 1 (reading the live database field names) on the next runner cycle?
