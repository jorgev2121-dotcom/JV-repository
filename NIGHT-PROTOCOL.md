# NIGHT-PROTOCOL.md — standing protocol for overnight long runs

**Owner directive, issued by Jorge 2026-08-16:**

> *"I want a standing protocol that nights are used for long runs, line them up, and
> never stop them. Otherwise, we'll never catch up."*

**TRK-2026-9079. This is standing policy, not a plan for one night.**

---

## 1. The directive is right, and the reason matters

Jorge is correct and the arithmetic backs him. The backlog is 300+ enhancement
requests, 183 rows in `_WORK-REGISTER.csv`, ~870 PaperPort documents, an unknown
count of untagged PDFs, and 22 county sources. **Daytime attention is the scarcest
resource in this operation and it is fully consumed.** Work that needs no judgement
must stop competing for it.

**Nights are eight to ten hours of machine time that currently produce nothing.**

---

## 2. The objection, stated once, and how it is answered

**"Never stop them" is the right instinct pointed at the wrong enemy.**

Long runs here have never been stopped by caution. They have been stopped by
**failing silently and nobody noticing**:

- Four OCR scheduled tasks sat DISABLED for weeks (`RI-015`)
- The daily health email died 2026-06-19 and was not missed (`RI-015`)
- A PAD routine ran ~650 times unwatched (`RI-018`)
- A scrape returned 3 of 20 and reported no failure (`RI-004`)

**In every case the run did stop. What was missing was anyone finding out.**

So "never stop them" cannot be implemented by removing brakes. It is implemented by
**always having queued work, and always noticing when a run dies.** Those are the two
mechanisms below.

**This is the only objection. It is not a reason to run less at night — it is the
reason last year's night runs produced nothing.**

---

## 3. The two mechanisms

### 3a. The queue is never empty

**A night run that finishes its list at 2am and idles until morning has wasted six
hours.** The queue must always be deeper than the night is long.

`OVERNIGHT-QUEUE.md` is the standing list. Rules:

1. **Ordered, not prioritised in the moment.** An unattended executor does not choose
   — it takes the top unclaimed item.
2. **Always at least 12 hours of work queued.** Whichever session notices the queue
   running short refills it. Refilling the queue is itself a queue item.
3. **Every item states its completion evidence** before it is started. Per Rule 2,
   an item with no defined evidence cannot be reported DONE.
4. **Results are written per item, as each completes** — never batched at the end.
   A run killed at item 40 must leave 39 results on disk, not zero.

### 3b. A dead run is detected within one cycle

The heartbeat exists for this. Every cycle:

1. Is the current long run's process alive?
2. Has its output file grown since the last cycle?
3. If the process is alive but the output has not grown for **three consecutive
   cycles**, the run is hung — kill it, log it, and start the next queue item.
4. If no run is active and the queue is non-empty, **start the next item.**

**Point 2 is the load-bearing one.** A process being alive is not a run making
progress — that confusion is `RI-002`, logged three times. **The observable is the
output file's size and timestamp, not the process list.**

---

## 4. What may run unattended, and what may never

**The test is not difficulty. It is reversibility.**

### GREEN — always eligible for a night run

- **Counting and enumeration.** File counts, byte counts, folder inventories.
- **Read-only survey.** Drive searches, registry reconciliation, gap-finding.
- **Text extraction (OCR) where identity is already certain** — see section 5.
- **Report and index generation** into new files.
- **Anything writing only to a new file that did not previously exist.**

### RED — never runs unattended, at any hour

- **Filing, moving, renaming or deleting a client document.**
- **Sending anything outbound** — email, form submission, portal upload.
- **Spend, credentials, signup.**
- **Registry edits.**

**Why filing is RED even though it is mundane:** a misfile is not discovered by the
executor, it is discovered months later by a client. `14598 SW 110 ST` was one step
from being absorbed into another client's job folder on a digit match. **An
unattended misfile at 3am has nobody to catch it.**

**Filing is not slow because it is hard. It is slow because it needs a session that
can be questioned.** Night runs prepare filing decisions; morning executes them.
That keeps the night full without making the night dangerous.

---

## 5. OCR — the specific carve-out, and how it stops being one

**Bulk OCR is currently held** (`TRK-2026-9034`, blocked by design). Only ~11% of
existing `.SEARCH.txt` sidecars carry a TRK (`RI-016`). An unattended eight-hour run
against that pipeline enlarges the untagged pile rather than clearing the backlog.

**The split that lets OCR run tonight anyway:**

| Queue | Contents | Status |
|---|---|---|
| **A** | PDFs already inside a `01-JOBS\TRK-2026-NNNN\` folder | **GREEN — runs tonight.** The TRK is knowable from the path, so the sidecar is stamped correctly at write time |
| **B** | PDFs anywhere else | **HELD** until the intake stamp ships |

**And the way the carve-out ends: `TRK-2026-9060` — the intake stamp and exit gate —
is itself a night task.** It is a build, it needs no client-document decisions, and
it is what unblocks Queue B.

**Build the gate tonight; run at full width tomorrow night.** That is faster than
running Queue B tonight and re-attributing it by hand later.

---

## 6. Free the machine before a long run

**Bulk OCR is bound by disk I/O and CPU, not RAM.** Jorge suspended Dropbox on a
previous attempt and it helped — the mechanism was mostly Dropbox's filesystem
watcher and indexer competing for the same disk, not the memory it freed.

Standing pre-run checklist:

1. **Quit Dropbox completely** — tray icon, then Quit. **Pausing sync is not
   enough**; the process stays resident and keeps watching the filesystem.
2. **Quit PaperPort** — it holds handles on the same documents.
3. **Exclude the working folder from Windows Search indexing.**
4. **Close unneeded Chrome windows.**

**Never, as part of a night run:**

- **Do not set Dropbox to online-only/placeholder.** Those files are stubs. OCR reads
  nothing and reports success on empty content — a silent-failure generator, and
  Dropbox has not been surveyed yet (`TRK-2026-9074`).
- **Do not disable antivirus.** A folder exclusion is the correct tool and it is
  Jorge's decision, not an executor's.

---

## 7. The morning report

**Every night ends with one short report, whether the night went well or not.**

It states:

1. **Numerator and denominator.** "412 of 3,180 PDFs" — never "good progress."
2. **Which queue items completed, which failed, and which never started.**
3. **Anything that needs a decision**, gathered into one place for the morning.
4. **One question**, per OD-01.

**A night with no report is treated as a failed night**, even if work was done. An
unverifiable run is indistinguishable from no run, and that is precisely how eighteen
months of night capacity went unnoticed.

---

## 8. Sessions have no memory — this file is the protocol

No session remembers the last one. If the protocol is not in a file, it is not a
protocol. **This file, `OVERNIGHT-QUEUE.md`, and the summary in `CLAUDE.md` §11 are
the whole of it.**

---

**Standing question for each morning report: what is the denominator, and did the
queue run dry before sunrise?**
