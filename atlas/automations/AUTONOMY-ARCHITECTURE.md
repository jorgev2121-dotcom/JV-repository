# AUTONOMY-ARCHITECTURE — how to get Jorge out of the loop

**Written 2026-08-15 in response to: "what is your solution? Anything better than
Google Drive? Get me out of the loop, acting autonomously, leaving only marginal
calls for my involvement."**

---

## 1. The reframe — Google Drive is not the weak link

Replacing Drive with anything else changes nothing, and it is worth being precise
about why.

**The substrate works.** A cloud session created a folder in Drive, wrote to it, and
the desktop read it — proven the same day. GitHub works too. Files move fine.

**The bottleneck is that only one endpoint has a heartbeat.**

- **Cloud has one.** Hourly scheduled triggers, day and night. It wakes itself.
- **The desktop has none.** It runs only while a window is open on the PC. When that
  window closes, it is not slow — it is *dead*. Cloud writes into an empty room.

**A faster mailbox does not help a correspondent who is asleep.** Swapping Drive for
Dropbox, a database, or a message queue leaves the desktop exactly as unreachable.

**Give the desktop a clock and the problem is ~90% solved, on any substrate.**

---

## 2. THE FINDING — the purpose-built channel exists and it lapsed

Session history shows something neither party remembered:

```
Jorge-PC   environment_kind: bridge   tags: remote-control-repl
           connection_status: DISCONNECTED     last seen 2026-08-09
Jorge-PC   environment_kind: bridge   tags: remote-control-repl
           connection_status: DISCONNECTED     last seen 2026-08-03
plus several  remote-control-sdk  sessions, now archived
```

**Jorge already had Claude Code Remote Control running on his PC. It has been
disconnected since 2026-08-09 — six days.**

That is not a file-sharing workaround. **It is the mechanism built for exactly this
problem.** With it live:

- `ListAgents` from cloud lists the desktop as a reachable peer
- `SendMessage` delivers **directly** to it — no file, no polling, no Jorge
- The desktop can reply the same way

Everything built today — the Drive mailbox, the relaying, Jorge pasting screenshots
between windows — **was a workaround for a channel that already existed and had simply
gone dark.** Nobody noticed, because nothing was watching. **That is RI-015 again: a
service stopped and there was no sensor.**

**This is the single highest-value fix available. Reconnect it.**

---

## 3. The architecture, ranked

### TIER 1 — Remote Control  ← restore this first
Direct agent-to-agent messaging. Cloud sees the desktop in `ListAgents` and messages
it. Latency: seconds. No polling, no files, no Jorge.
**Status: disconnected since 2026-08-09. Needs reconnecting on the PC.**

### TIER 2 — Desktop heartbeat  ← build this regardless
A Windows Scheduled Task running Claude Code **headless** on a timer:

```
claude -p "Read G:\My Drive\_CLAUDE-MAILBOX\TO-DESKTOP.md and the repo work queue.
           Execute what you can. Write results to TO-CLOUD.md and push."
```

Every 15 minutes. **This converts the desktop from "runs when Jorge opens a window"
into "runs forever."** Combined with cloud's hourly triggers, the loop closes with
nobody in it.

**Why build it even if Tier 1 is restored:** Remote Control delivers a *message*, but
something still has to be awake to act on it. A heartbeat means the desktop is always
awake. The two are complementary — Tier 1 is the phone line, Tier 2 is having someone
in the office.

**⚠ PRECONDITION, from Jorge's own history.** RI-015: four OCR scheduled tasks sat
disabled for two months and nobody noticed, because the daily health email died on
2026-06-19 — *the sensor failed before the thing it watched.* **Restore the health
report BEFORE adding another scheduled task**, or this becomes the next silent
failure. The report must include "when did each task last run."

### TIER 3 — The file substrate  ← already working, leave it
Drive for live messages, the repo for rules and durable state.

**Keep the files even after Tier 1 works.** Remote Control carries conversation; files
carry memory. A conversation with no memory is precisely the eighteen-month failure —
things discussed, agreed, and lost when the window closed. **Direct messaging without
a written record would recreate it in faster form.**

---

## 3b. The iPhone — a window, not a third executor

**Question asked 2026-08-15: "can you do that with iPhone as well?"**

**Not the same way, and it should not be.**

**Why not the same way.** Remote Control is Claude Code infrastructure. The Claude
iPhone app is a chat client, not a Claude Code session — it has connectors, but it is
not an executor that can be listed as a peer and messaged agent-to-agent. There is no
`ListAgents` entry to reach.

**Why it should not be.** A third executor would be a third thing that can act on the
same files, and the whole diagnosis of RI-005 is that parallel actors on shared state
diverge. **The iPhone's value is not that it can do work. It is that it is the one
device Jorge always has.**

**So its role is his window into the loop, and three layers already serve that:**

**1. It reads Google Drive — already proven.** The Drive Board runs Code↔iPhone at
roughly 30 seconds. `_CLAUDE-MAILBOX` is therefore *already* visible to the iPhone
with nothing new built. `OWNER-QUEUE.md` was written to be read on a small screen for
exactly this reason.

**2. Push notifications — and here is the find.** Cloud can push a notification to his
phone, **but only when Remote Control is connected.**

**That means restoring Remote Control fixes two things, not one:**
- the direct desktop↔cloud channel
- the path to reach Jorge on his phone

**One action, two unlocks.** It strengthens the case for doing it first, already made
in section 6.

**3. He can reply from the iPhone** either by answering the notification or by opening
Claude on the phone and writing into the Drive mailbox.

**The discipline that makes this work: push only for RED items.** Spend, credentials,
outbound email, deletions, genuine product decisions. **Nothing else, ever.**

A notification he did not need is annoying in a way that accumulates. Push for routine
progress and he will mute them — and then we have built **another dead sensor**, which
is RI-015 and RI-011 and the health report all over again. **The channel that reaches
him is only worth having if it stays worth answering.**

Paired with the 48-hour rule, an unanswered push never stalls work: the executor
records what it is doing in the absence of an answer and proceeds on the safest
reversible option.

---

## 4. What Jorge is left with

Only **RED** items under `AUTONOMY.md` — spend, credentials, outbound email,
deletions, and genuine product decisions. Everything else runs without him.

Those go to **one place**: `OWNER-QUEUE.md` in the Drive mailbox. One line each,
answerable in a word, readable on a phone. **Not chat messages — chat is where his
last seventeen approvals went to die.**

And the 48-hour rule: an unanswered question does not stall the work. The executor
records what it is doing in the absence of an answer and proceeds on the safest
reversible option.

---

## 5. Why two agents beat one — the mechanism, not the sentiment

Recorded because it justifies the cost of running both.

Four times on 2026-08-15 the two executors corrected each other:

1. **Desktop out-diagnosed cloud** on the orphaned-documents root cause — *"the filing
   convention exists for outputs, not inputs"* — while running on the smallest model.
2. **Cloud corrected desktop's** entry-gate design; at scan time the job is often not
   yet known, so the gate belongs on exit.
3. **Cloud caught a misfiling** — `14598 SW 110 ST` was about to be filed into
   `TRK-2026-1262` because both addresses contain "110".
4. **Desktop found six holding areas** cloud could not see; cloud resolved an UNKNOWN
   from a registry desktop did not have.

**The value is not two opinions. It is two vantage points, where one can falsify the
other.** Each agent states things confidently that it has not verified — RI-014 and
RI-019 are both cloud doing exactly that. **A second agent that can actually go and
look is worth more than a single smarter agent that cannot.**

**One agent, however capable, agrees with itself.** That is the eighteen-month problem
stated in one line.

---

## 6. Order of operations — REVISED 2026-08-15

**An earlier draft of this file said "restore the health report first, the sensor comes
first, always." Jorge asked cloud to make the call. On harder thought that ordering is
wrong here, and the reversal is recorded rather than quietly edited.**

### 1. RECONNECT REMOTE CONTROL — first, before anything else

**Why it moved to the top:** it is the fix that lets cloud perform the other fixes.

With Remote Control live, cloud can message the desktop directly and drive the health
report, the heartbeat and the backlog **without Jorge in the room**. Every other item
on this list needs a human to relay it until this one is done.

**Sensor-first is correct logic and the wrong sequencing when one option unlocks the
rest.** Doing the health report first means Jorge personally carries three more
instructions across. Doing Remote Control first means he carries one.

**And the RI-015 objection does not apply to it.** RI-015 is about *scheduled tasks*
running unwatched. Remote Control is a persistent connection, not a scheduled task —
and **cloud is already its sensor.** Cloud's hourly triggers call `ListAgents`. If the
desktop is connected it appears; if the connection drops, the list goes empty and
cloud notices **within the hour**, automatically. That is exactly the sensor whose
absence let it sit dark from 2026-08-09 to 2026-08-15 unnoticed.

### 2. Restore the daily health report
Now drivable by cloud over the live channel. Must include *when each scheduled task
last ran* — that is the specific gap that let four OCR tasks sit disabled for two
months.

### 3. Add the desktop heartbeat
Scheduled task, headless Claude Code, 15 minutes. **Now correctly ordered after the
sensor**, per RI-015 — this one *is* a scheduled task and the objection does apply.

### 4. Prove the loop with no human in it
Cloud writes a task, desktop executes and replies, cloud confirms — Jorge absent.
**Until that happens with him out of the room, this is correspondence, not autonomy.**

### 5. Hand the backlog to the loop

**Step 1 needs Jorge once. Everything after it should not.**
