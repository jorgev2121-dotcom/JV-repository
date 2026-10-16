# OWNER DIRECTIVE — EXECUTOR-FIRST-01 + GUIDED-HANDOFF-01

**Issued by:** Jorge Valdes (owner), dictated 2026-09-28.
**Applies to:** every window: 🖥️ Code Desktop (RAMBO), ☁️ Code Cloud, 🤝 Cowork, Chat, and any other AI working here (see `AGENTS.md`).
**Standing rule.** The next step is to add it to `CLAUDE.md` as §13, which every session reads automatically. That edit is pending the owner's OK (see Section G).
**TRK:** TRK-2026-9959b (family of PC-ALWAYS-ON-01, where the gap surfaced).

---

## Section A — The directive, restated

1. **If an executor can do it, an executor does it.** When any AI window can do a task on Jorge's behalf, it does the task. It never turns the task into instructions for him.
2. **Before anything reaches Jorge, look for another way.** Every owner ask first goes through EXHAUST-FIRST-01 (`CLAUDE.md` §12 Article 4): what was tried, why it failed, and the smallest action left.
3. **Worst case: guided hand-off, "remote IT" style.** When a real human click is the only thing left, the executor takes the wheel:
   1. Note where the screen is now (app, window, page). This is the **start point**.
   2. Drive the mouse and keyboard to the exact screen where the human action happens.
   3. Point at it with an arrow or highlight: what to click, what to type.
   4. Wait for Jorge to do only that one thing.
   5. Take the wheel back and keep going. Repeat steps 2–4 for every remaining human click.
   6. When the whole task is done, announce **"TASK COMPLETE"** and show the proof.
   7. Go back to the start point and hand control back to Jorge.
4. **Build it into everything.** This applies to every app, procedure, protocol, charter, hook, trigger and handoff file in the shared folders.
5. **1Password is the special case.** It must run itself. The executor does all the navigating and only brings Jorge to the one screen that needs his own unlock or approval.

## Section B — What counts as a "human-only" click

Only these stop an executor. Everything else, the executor does itself.

1. Unlocking 1Password, and Windows Hello, fingerprint or face checks.
2. Two-factor codes, CAPTCHAs, and "are you a human" checks.
3. The Windows "Allow this app to make changes?" (admin) prompt.
4. OAuth / "Sign in with Google" consent screens.
5. The final **Send**, **Pay**, **Sign**, **Submit** or **Delete** on anything client-facing, financial or irreversible (the RED list in `CLAUDE.md` §11).
6. An approval the system itself says must come in the owner's own words. Example: creating a permanent background task, as with PASTE-X-008.

**The executor never reads, types, stores or repeats a password, card number or 2FA code.** It brings Jorge to the box, and he fills it or 1Password fills it.

## Section C — Which window can take the wheel

1. 🤝 **Cowork:** yes. It has computer use on Jorge's PC and has driven it before (PASTE-X-006).
2. 🖥️ **Code Desktop / Claude desktop app:** yes, when computer use is turned on in that app.
3. ☁️ **Code Cloud:** **no.** A cloud container has no screen or mouse on the PC. Cloud does the reachable work itself, then routes the guided part to the PC:
   - First choice: a one-shot Routine into the desktop's Remote Control session **Jorge-PC** (`session_013dZRrPpodEovzocGV48bqh`). Proven 2026-09-28 03:02 UTC.
   - Second choice: a job file in `G:\My Drive\VTES-Inbox\` (only works while the Inbox poller is alive).
   - Last resort: a single short paste block for Jorge.

## Section D — The arrow

- **Target:** a real on-screen arrow or highlight box over the button or field, with a one-line caption ("Click **Unlock**").
- **Until that tool exists:** park the mouse pointer on the exact button and state its exact on-screen label and position ("the blue **Unlock** button, center of the 1Password window").
- **Build item (GREEN):** the desktop builds a small pointer-overlay tool: a transparent always-on-top window that draws an arrow and caption at given screen coordinates, then closes itself. Queued as `mailbox/to-desktop/WORK-QUEUE.md` item 17.

## Section E — 1Password flow (self-sufficient)

1. The executor opens 1Password (or the browser extension) and goes to the right vault or item by name.
2. If it's locked, the executor points at the unlock box or the Windows Hello prompt. **Jorge unlocks.** That's the only human step.
3. The executor carries on: opens the site, lets 1Password autofill, and moves through the pages.
4. If a 2FA or approval screen appears, the executor points at it, Jorge taps it, and the executor carries on.
5. TASK COMPLETE: the executor shows the proof, goes back to the start point, and hands back.

## Section F — Strongest objection and the chosen answer (Rule 3)

- **Objection:** "The executor takes control" can't be literal from every window. Cloud has no screen, and computer use on the PC only works while Cowork or the desktop app is running and allowed to control the screen. If that access is off, guided hand-off quietly falls back to written steps. That's the failure mode this directive exists to kill.
- **Answer adopted:** make "is someone able to take the wheel right now?" a check done before every owner ask. If nobody can, the ask says so plainly and names the one window Jorge should open. It is never a long list of steps.

## Section G — Where this is built in (proof list)

1. `CLAUDE.md` §13: **NOT YET DONE.** The cloud session's safety layer blocked it from editing its own charter file ("self-modification"). It needs Jorge to OK the edit, or to make it himself. Once §13 is in, every Claude session loads it automatically.
2. `AGENTS.md` / `GEMINI.md`: both say "follow `CLAUDE.md` in full", so Codex, Gemini and others inherit §13 once it's added.
3. `mailbox/to-desktop/WORK-QUEUE.md` item 17: the desktop adopts it locally and builds the arrow tool.
4. Drive `VTES-Inbox`: a copy, so Cowork and the desktop pick it up in their own lanes.
5. The Jorge-PC Remote Control session: delivered directly by Routine.
6. `OPEN-ITEMS.md` TRK-2026-9959b: tracks adoption.

**Why no separate Claude Code hook:** `CLAUDE.md` is loaded into every session automatically, so once §13 is in, that's the strongest hook there is. A second hook would only repeat it and could drift from it.

#OWNER-DIRECTIVE #EXECUTOR-FIRST-01 #GUIDED-HANDOFF-01 #1Password #TRK-2026-9959b
TRK-2026-9959b · v1 · 2026-09-28 · CURRENT
