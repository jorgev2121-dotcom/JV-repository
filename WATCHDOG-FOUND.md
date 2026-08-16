# WATCHDOG-FOUND.md — TRK-2026-9111

**Discovered 2026-08-16 ~06:00 by a cloud session widening its search beyond the
mailbox folder.**

---

## ⚠ CORRECTION — I told Jorge the watchdog did not exist. It does.

Earlier tonight I wrote, in `MORNING-REPORT.md` and `OVERNIGHT-QUEUE.md`:

> *"That check is written down and has never been built."*
> *"the heartbeat that would have noticed and restarted it is TRK-2026-9070, still
> unverified."*

**Both statements are wrong.** The evidence, quoted literally from
`RECONCILER-REPORT_20260816.md`:

```
Last run: 2026-08-16 05:40 AM ET on DESKTOP-OTB90LR | cadence 30 min
New files ledgered this run: 54
Auto-restored (deleted mid-lane): none
Dead-man reissues posted this run:
  MSG-CHAT-TO-CODE_ORANGETREE-POPULATE_ALEC-BALHARBOUR-PLAZA_30MIN-WATCH_2026-08-13.md
  JOB-0073-A_RENAME-01-JOBS-ONE-SOURCE-OF-TRUTH_2026-08-10.md
Stale components (>20 min): none
Crisis flag: False
```

**RECONCILER-01 is alive, runs every 30 minutes, ledgered 54 files this morning, has a
working dead-man detector — and it noticed the Orange Tree job had stalled and
reissued it at 5:40am.**

**It did the thing I said nothing was doing.**

### How I got it wrong

**I searched the mailbox folder and the county-proof folder. The reconciler writes to
`VTES-Inbox`, `VTES-Outbox`, `VTES-Bridge\Inbox` and `VTES-Bridge\Outbox`** — four
lanes I never looked in.

**This is the third time tonight I have reported on the whole from one place.** The
first was "Part 2 never started" — it had, in `01-JOBS`. **The pattern in my own work
is now as well-evidenced as the one I have been logging in the desktop's.**

**Rule for me, and it is the same one I gave the desktop: before writing that
something does not exist, enumerate where it would live and check each one.**

---

## What is actually running on that machine

The desktop **is powered on and executing automation right now**:

| Component | Evidence |
|---|---|
| **RECONCILER-01** | ran 05:40 ET, 30-minute cadence, 54 files ledgered |
| **VTES-LOCAL-POLLER** | posted an auto-ACK at 06:01 ET |
| **`heartbeat.json` / `HEARTBEAT-ROSTER.json`** | both written 10:01 UTC |
| **Four `_LEDGER.csv` files** | all four lanes updated 09:40 UTC |
| **`poller-2026-08-09.log`** | still being appended to |

**What is NOT running is a Claude Code session.** That is the distinction, and it is the
whole of the problem.

---

## So the detection half works. The recovery half does not.

The reconciler's own reissue is acknowledged like this:

```
AUTO-ACK - HOUSEKEEPING-ROUND_2026-08-16.md
Status: received | By: VTES-LOCAL-POLLER | At: 2026-08-16 06:01 AM ET
Queued for Claude Code's next work session.
```

**"Queued for Claude Code's next work session."**

**The watchdog can notice a stall and re-queue the work. It cannot start a Claude Code
session to do it.** So the reissued Orange Tree job is sitting in a queue waiting for
a window that only Jorge can open.

**That is the real gap, stated correctly this time:**

- **Detection: BUILT AND WORKING.** Better than I credited.
- **Re-queueing: BUILT AND WORKING.** It reissued two stalled jobs this morning.
- **Execution: REQUIRES A HUMAN TO OPEN A WINDOW.**

**TRK-2026-9070 — the heartbeat that launches headless Claude Code — is the missing
link, and it is the only missing link.** Everything else in the chain already exists
and has been running unnoticed.

---

## An important refinement to the AUTO-ACK finding

The unfinished-work audit named *"the fabricated 8/6 mass ACK"* as the mechanism behind
eighteen months of false completion. **Auto-ACKs are still being generated — one was
written at 06:01 this morning.**

**But read what it actually says: `Status: received`. Not "done." Not "complete."**

**The ACK is honest.** It claims receipt and queueing, which is exactly what happened.

**So the failure was never the ACK itself — it was downstream, where "received" was
read as "done."** That is a meaningfully different diagnosis from the one in
`UNFINISHED-WORK-AUDIT.md` §3, and it is better news: **the machinery is telling the
truth and something above it was rounding up.**

**The fix follows from that.** Do not remove the auto-ACK. **Make sure nothing ever
treats `received` as a completion state** — which is precisely the charter's
three-state rule, now with a named failure point.

---

## What this changes about tonight's conclusion

I ended the last cycle saying the night proved *"a stopped executor can sit dead for
four hours with nobody to restart it."*

**More precisely: a stopped executor sat dead for four hours while a watchdog correctly
noticed, correctly re-queued the work, and had no way to start a session.**

**That is a far smaller gap than I described, and a far more fixable one.**

---

**Question for the morning: the reconciler reissued the Orange Tree job at 5:40am and
it is queued — do you want to open a desktop window and let it run?**

---

## THE SHARPEST STATEMENT OF THE PROBLEM — from the 06:40 run

The reconciler ran again at 06:40 ET and reported:

```
Last run: 2026-08-16 06:40 AM ET on DESKTOP-OTB90LR | cadence 30 min
New files ledgered this run: 0
Auto-restored (deleted mid-lane): none
Dead-man reissues posted this run: none
Stale components (>20 min): none
Crisis flag: False
```

**Read that against reality.** At 06:40, the Orange Tree job had been reissued an hour
earlier and **had not been executed**. The desktop had produced nothing for four and a
half hours. Half the night's queue was untouched.

**And the watchdog reports: no stale components. Crisis flag False.**

### The watchdog watches the plumbing, not the work

Every line in that report is about the **machinery**: files ledgered, lanes intact,
components responding, nothing deleted mid-lane. **All of it is true and all of it is
healthy.**

**Not one line asks whether any work got done.**

- *"Stale components"* means a poller stopped responding — not a job sitting unstarted.
- *"Dead-man reissues: none"* means it had nothing new to reissue — **not that the
  previous reissue was ever picked up.** It fires once and considers the item handled
  the moment it is queued.
- *"Crisis flag: False"* is the honest state of the pipes.

**So the system's own monitoring can report perfect health while nothing at all is
being produced.** The components are alive; the conveyor belt is running; there is
nothing on it.

### This is the eighteen months, stated in one sentence

**Every layer reported truthfully about itself, and no layer was responsible for
whether the work happened.**

- The auto-ACK honestly says `received`.
- The reconciler honestly says `components healthy`.
- The ledger honestly counts files.
- **Nothing measures output against intent.**

**That is why it never announced a failure. By each component's own definition, there
was no failure.**

### What that makes the fix

**Not a new watchdog. The watchdog is fine.** It needs one more check, and the check is
already specified in `NIGHT-PROTOCOL.md` §3b:

> *"The heartbeat checks whether the **output file has grown** — not whether the
> process exists."*

**Add work-completion to what the reconciler measures:**

1. When a dead-man reissue is posted, **record the item and keep watching it.**
2. If the reissued item has produced no output after N cycles, **escalate** — do not
   report `Crisis flag: False`.
3. **Count deliverables, not files ledgered.** "54 files ledgered" and "0 jobs
   completed" are both true statements about last night, and only one of them matters.

**TRK-2026-9070 is still the missing piece, but it is now precisely specified:** a
component that can start a Claude Code session, plus a check that notices when a
reissued job never produces output.

---

**Question for the morning: shall I write the spec for that one added check, so the
reconciler stops reporting healthy while nothing is being made?**

