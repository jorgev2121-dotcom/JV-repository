# TWO-SEAT HANDOFF PROTOCOL — Cloud ⇄ Desktop, no human in the middle
**TRK-2026-9772 · drafted by ☁️ CLOUD 2026-09-04 · for ☁️ CODE-CLOUD + 🖥️ CODE-DESKTOP (RAMBO)**
**Purpose (owner, 2026-09-04):** *"How could both Codes do this proactively and hand off to each other
or warn each other of things the other can't see… the key is to get me out of the middle."*

---

## 1. Why Jorge is still in the middle today (the real cause)
The two seats **can** already pass files. What forces the human relay is that **neither seat checks
the mailbox on its own initiative:**
- **Desktop** only pulls the repo when Jorge opens the terminal / RAMBO runs a manual cycle.
- **Cloud** only reads the Drive/repo when Jorge sends it a prompt.

So every handoff waits for Jorge to paste or to open a window. **Fix the two heartbeats and the relay
disappears** — the seats poll a shared board on a timer, and only RED decisions ever reach Jorge.

## 2. What each seat can and cannot see (the reason handoffs exist)
- **☁️ CLOUD reaches:** Gmail, Google Drive, Google Calendar, **Outlook/M365 (now authorized)**, this
  repo, GitHub. **Cannot:** touch the PC, open the HOA/county portals (egress-blocked), use 1Password,
  create Windows tasks, attach local files to email.
- **🖥️ DESKTOP (RAMBO) reaches:** the PC filesystem, Outlook/OneDrive, 1Password, the browser
  (portals, county sites), Windows Task Scheduler, local OCR. **Cannot:** be messaged live by Cloud,
  and does not see what Cloud sees in Gmail/Drive unless told.

**A handoff is exactly the moment one seat needs something in the other's column.**

## 3. The two-lane mailbox (both in this repo)
- `mailbox/to-desktop/` — **Cloud → Desktop.** (exists)
- `mailbox/to-cloud/` — **Desktop → Cloud.** (new — replaces the 1 MB Drive `TO-CLOUD.md`, which is
  too big for Cloud to read cheaply; keep TO-CLOUD.md only as the human-readable running log.)

**Filename grammar (so a poller can route without reading the body):**
```
HANDOFF_<FROM>-TO-<TO>_<SLUG>_<YYYY-MM-DD>.md      a task the other seat must action
FINDING_<FROM>_<SLUG>_<YYYY-MM-DD>.md              something the other seat can't see, FYI/act
DONE_<JOB>_<SLUG>_<YYYY-MM-DD>.md                  a close-out the other seat should record
```

**Every handoff/finding body carries these five lines** (so no context is lost between seats):
1. **WHAT I FOUND** — the fact, with proof (a Gmail date, a portal HTTP code, a file path).
2. **WHY IT'S YOURS** — the capability the other seat has that I don't.
3. **EXACT NEXT ACTION** — the single concrete step, not a discussion.
4. **RED or GREEN** — GREEN = the other seat just does it; RED = it stages and waits for Jorge's click.
5. **CLOSING QUESTION** — OD-01; keeps the thread alive.

## 4. The two heartbeats (this is the new part)
- **🖥️ DESKTOP heartbeat — a Windows Scheduled Task, every ~10 min:** `git pull` → process any new
  `mailbox/to-desktop/` files per RED/GREEN → write replies to `mailbox/to-cloud/` → `git push`.
  Run-if-missed ON, restart-on-failure ON, runs whether logged on or not. **This is GREEN to build
  (creating a task) and is the piece that removes Jorge from the desktop side.** (Work order:
  `WORK-ORDER_DESKTOP-AUTOPULL-HEARTBEAT_2026-09-04.md`.)
- **☁️ CLOUD heartbeat — a scheduled self-check-in:** on a timer, pull the repo, read
  `mailbox/to-cloud/`, do the Gmail/Drive/Outlook work the notes ask for, and push handoffs back.
  **Honest limit:** a Cloud session is not as permanent as a Windows task — its heartbeat lasts as
  long as the scheduled wake-ups persist, and a long silence may need Jorge to reopen the Cloud seat
  once. The Windows side is the durable anchor; Cloud is the fast, data-rich responder.

## 5. What still reaches Jorge — and only this
- **RED items only, batched.** "Approve filing 1–12: yes." "Click the fresh HOA link." "Press pay."
- **A blocker neither seat can clear** (a credential only he has, an OAuth consent screen).
- Everything GREEN — reading, counting, OCR, staging, seat-to-seat warnings — **flows without him.**

## 6. Guardrails that do NOT change
- The **RED/GREEN autonomy line** (Rule 9) governs every auto-action. No seat crosses it alone.
- **Spend caps** (OD-BUDGET-01 $40/day, OD-CARD-VERIFY-01 $3/card), **never auto-delete a credential
  or client file**, **never file on a fuzzy match**. Automation moves work *up to* the RED line faster;
  it never moves the line.
- Every handoff is a **file on the record** — auditable, reversible, nothing lives only in a chat.

**Is this the shape you want — the two heartbeats plus the RED-only escalations — before I wire it up?**

## 7. Mutual aid — help-first, ask the OTHER SEAT before the owner (ratified 2026-09-04)
**Owner intent:** *"establish an ongoing role where you ask each other on a constant basis — what's blocked,
how can I help, offer to run things, work in synergy."* Implemented the cheap way — **event-driven, not a
timer.** (Delegating *execution* to RAMBO's local compute is near-free; only *chatter* costs tokens, so
seats speak on a real block, not on a schedule.)

Standing role for both seats:
1. **The instant you are blocked, ask the other seat first** — a `HANDOFF_…-TO-…_BLOCKED_…` note + a nudge:
   "stuck on X, can you clear it in your lane?" This is EXHAUST-FIRST between seats.
2. **A block reaches Jorge ONLY if BOTH seats are stuck.** Seat→seat is the first line; the owner is the
   last resort, never the relay. That is what keeps him out of the middle.
3. **Every handoff offers what you can run in your lane** ("I can pull that from Gmail/Drive/Outlook" /
   "I can OCR/script/drive the portal locally") — don't wait to be asked.
4. **Silence when there is nothing to ask.** No empty "checking in" turns — those are wasted model tokens.
   Readiness is constant; speaking is event-driven.
5. **Cost rule of thumb:** push *doing* to the cheapest worker (free local compute first); spend model
   turns only on judgment and on real handoffs. More delegation = lower cost, not higher.

6. **Check the accountability tracker every cycle.** Each heartbeat reads `TASK-REGISTER.md` ("the CD"),
   flags anything aging (>48h no movement, or a row with no owner/next-step), and clears or advances it —
   surfacing to Jorge only what needs his click. Capture-first: log any new task there BEFORE working it.
   This is the watchdog against silent death.

Bound by RED/GREEN and the spend caps as always: a seat clears another's GREEN block on its own; a RED
block still stages for Jorge's one click.

#TRK-2026-9772 #two-seat-handoff #out-of-the-middle #RED-GREEN #heartbeat #mutual-aid #help-first
