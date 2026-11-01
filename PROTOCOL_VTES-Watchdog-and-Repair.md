PROTOCOL_VTES-Watchdog-and-Repair · v1.0 · 2026-10-08 · CURRENT

# VT ES Watchdog and Repair Protocol

## What the Watchdog is

The Watchdog is a designated monitoring role in the VT ES system.
It runs independently of the sections it monitors.
Its sole job is to detect failure, assign a repair agent, and confirm proof of repair.

The Watchdog is NOT an LLM by default. It is a script plus a protocol.
An LLM (any model) fills the repair-agent role only when the script detects a failure
and cannot self-correct.

---

## Watchdog schedule

The Watchdog runs every 15 minutes while the system is active.
At night, it runs as part of the overnight queue health check (Rule 8 / NIGHT-PROTOCOL.md).
If the Watchdog itself fails to run for more than 30 minutes, that is itself a failure
and must be logged.

---

## Test protocol: what counts as a passing test

For each section in the VT ES launcher, the following constitutes a passing test:

| Section | Pass condition |
|---|---|
| QUEUED | `queue.json` (or JSONL file) exists AND was modified within the last 30 min |
| STATUS | `status.json` exists AND was modified within the last 30 min |
| AGENTS | At least one agent shows a `lastSeen` timestamp within the last 2 hours |
| OCR Bot | Output folder contains at least one file newer than the start of the last scheduled run |
| Overnight Runner | Queue cursor advanced since last Watchdog check |
| Health Monitor | Health log file modified within the last 15 min |
| Token Monitor | Token log file modified within the last 15 min |
| PLAUD | Last sync timestamp within the last 24 hours |
| JOBS | `_WORK-REGISTER.csv` modified within the last 24 hours |
| APPROVALS | Approval snapshot is no more than 24 hours old |
| CONNECTORS | Each listed connector returns a non-error ping within 10 seconds |
| SESSIONS | At least one session is in ACTIVE or IDLE state |

Sections marked `grey: true` in the launcher are SKIPPED — they have no test.

Any section not in this table gets a default test: **"Was a file in this section's
output folder modified within the last 24 hours?"** If no output folder is defined,
the section is SKIP until a folder is registered.

---

## What happens on test FAILURE

When a section fails its test, the Watchdog does the following immediately:

### Step 1 — Log the failure

Write one line to `C:\Logs\Watchdog\failures.log` (desktop) or
`G:\My Drive\VTES\watchdog\failures.log` (Drive):

```
2026-10-08T14:32:00 | SECTION: OCR Bot | TEST: output file newer than run start | RESULT: FAIL | EVIDENCE: no file newer than 2026-10-07T02:00
```

### Step 2 — Open a repair record

Create a file named:
```
REPAIR_[SECTION-ID]_[YYYY-MM-DD]_[HHMM].md
```

in `G:\My Drive\VTES\watchdog\repairs\`.

The file must contain:
- Section name
- Test that failed
- Evidence of failure (log excerpt, file listing, timestamp)
- Assigned agent (see table below)
- Status: OPEN

### Step 3 — Assign the repair agent

| Section type | Assigned agent |
|---|---|
| Infrastructure (runner, monitor, bot) | Desktop Executor |
| Cloud-only section (cloud queue, cloud sessions) | Cloud Executor |
| Data file (JSONL, CSV, JSON) | whichever executor last wrote the file |
| Owner-gated section | Surface to Jorge with BLOCKED status — do NOT assign to an agent |

### Step 4 — Agent runs corrective action

The assigned agent must:
1. Read the repair record.
2. Diagnose the root cause (not just the symptom).
3. Apply a fix rated Tier 2 (removal) or Tier 3 (enforcement) — never Tier 1 unless
   a Tier 2/3 fix is impossible for this section. (See CLAUDE.md Rule 4 for tier definitions.)
4. Re-run the section's test.

### Step 5 — Proof of repair

Proof is a file, not a statement. The agent must write a proof file named:
```
PROOF_[SECTION-ID]_[YYYY-MM-DD]_[HHMM].md
```

in the same `repairs\` folder. The proof file must contain:
- The fix applied (specific, with file paths or command used)
- The re-run test result (PASS or FAIL)
- Evidence (log excerpt, file listing, output sample, screenshot path)

**"I ran it and it worked" is not proof. A log excerpt or file listing is proof.**

### Step 6 — Close the repair record

The Watchdog reads the proof file. If the test is now PASS:
- Update the repair record: Status → CLOSED, proof file linked.
- Log the closure in `failures.log`.

If the re-run test is still FAIL:
- Escalate: surface to Jorge as BLOCKED with the WORKAROUND-CERT (Article 4 of
  SUPREME STANDING ORDER).
- Do NOT mark CLOSED.
- Do NOT assign to a second agent silently.

---

## Watchdog section on the VT ES launcher

The Watchdog has its own button on the VT ES launcher (#25).

When clicked, it shows:
- Last sweep time
- Section health table: each section listed with PASS / FAIL / SKIP + last check time
- Open repair records (count and links)
- Closed repairs in the last 7 days (count)

The Watchdog section's own health check: the Watchdog is healthy if its
sweep log was modified within the last 20 minutes (i.e., it actually ran).

---

## Never do

- Mark a repair CLOSED without a proof file.
- Skip a section's test without recording the skip reason.
- Assign a repair task to the owner unless the section is genuinely owner-gated.
- Re-run a failed test more than once before logging the failure. One re-run
  to confirm a transient failure is allowed; after that, log and assign.

---

TRK-2026-9956 · v1.0 · 2026-10-08 · CURRENT
