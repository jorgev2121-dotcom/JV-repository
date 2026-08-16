# RECONCILER-OUTPUT-CHECK-SPEC.md — TRK-2026-9114

**The one added check that stops the system reporting healthy while nothing is made.**

Written by a cloud session 2026-08-16. **Specification only — nothing was changed.**
Modifying a running component is Jorge's call.

---

## The problem in one line

**RECONCILER-01 measures the plumbing. Nothing measures the output.**

Last night it truthfully reported `Stale components: none` and `Crisis flag: False`
while the Orange Tree job sat reissued-and-unexecuted and half the queue went
untouched. **Every component was healthy. Nothing was produced.**

---

## The check, in plain terms

**When the reconciler reissues a job, it must remember that it did, and keep asking
whether anything came of it.**

Today the reissue fires once and the item leaves its attention the moment it is
queued. That is the entire bug.

---

## Specification

### 1. A reissue creates a WATCH, not just a message

When a dead-man reissue is posted, append a row to a new
`_WATCHLIST.csv` beside the existing ledgers:

```
item_id, reissued_at, expected_output_path, cycles_since_reissue, last_output_size, status
```

`expected_output_path` is **the thing the job is supposed to produce** — a folder, a
report, a count file. **If a job cannot name its own expected output, it is not
specified well enough to run unattended.** That is a useful forcing function on its
own.

### 2. Every cycle, measure growth — not existence

For each open watch:

```
if expected_output does not exist                 -> no progress
else if size == last_output_size                  -> no progress
else                                              -> progress, update size, reset counter
```

**Existence is not progress. Size that has not changed is not progress.** This is
`NIGHT-PROTOCOL.md` §3b applied to a specific item rather than to the machine.

### 3. Escalate after three quiet cycles

Three cycles at 30 minutes is **90 minutes of nothing**, which is well past normal.

```
cycles_since_reissue >= 3 AND no growth  ->  status = STALLED
                                             Crisis flag = TRUE
                                             name the item in the report
```

**`Crisis flag: False` must become false-able by work not happening**, not only by a
component dying. That single change is the whole point of this document.

### 4. The report gains two lines

```
Open watches: N
STALLED (no output in 3+ cycles): <item names, or 'none'>
```

**Two lines. That is the entire user-facing change.**

### 5. Count deliverables, not files

`New files ledgered this run: 54` and `Jobs completed: 0` were **both true** of last
night. Only one of them describes the night.

**Add:** `Jobs closed with output this run: N`.

---

## What this deliberately does NOT do

- **It does not start a Claude Code session.** That is TRK-2026-9070 and is separate.
  This check makes the *absence* of a session loud instead of silent.
- **It does not touch the auto-ACK.** The ACK is honest — it says `received`, which is
  true. Leave it.
- **It does not move, file, rename or delete anything.** It reads sizes and writes one
  CSV and two report lines.

---

## Why this is a Tier 3 fix

Per `CLAUDE.md` Rule 4:

- **Tier 1 (suppression)** would be "remember to check the reports." Lifespan: days.
- **Tier 2 (removal)** does not apply — there is nothing here to delete.
- **Tier 3 (enforcement)** is this: **a scheduled check that re-detects the failure
  every thirty minutes, faster than it can hide.**

**The reconciler already runs on a schedule and already has the ledger machinery. This
adds a column and a comparison.**

---

## Effort

**Small.** The reconciler already: runs every 30 minutes, writes CSVs, reads the
filesystem, and emits a report. This adds one CSV, one size comparison, and two report
lines. **No new component, no new schedule, no new dependency.**

---

## The test that proves it works

**Re-run last night against it.** With this check in place, the 06:40 report would have
read:

```
Open watches: 2
STALLED (no output in 3+ cycles): ORANGETREE-POPULATE, JOB-0073-A-RENAME
Crisis flag: TRUE
```

**Instead of `Crisis flag: False`.** That is the difference between a night that
announces its own failure and a night that looks identical to a good one.

---

**Question: shall this go to the desktop as a job, or do you want to look at it
first?**
