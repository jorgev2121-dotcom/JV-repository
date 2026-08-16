# JOB-0079-ALREADY-SPECIFIED.md — TRK-2026-9117

**Found 2026-08-16 ~09:00 by re-testing the audit's "vapor" list against Drive.**

---

## The headline

**Everything I spent last night deriving was already written down on 2026-08-12,
ratified by Jorge out loud, and marked CLASS-A FAULT — and then not built.**

`JOB-0079_EXECUTION-INTEGRITY-01_LEDGER-REISSUE-HEADLESS_2026-08-12.md`

> *Owner-ratified: YES (spoken "Yes" 8/12) | Priority: CLASS-A FAULT — precedes all
> other work except live client deadlines.*

---

## It names the fault exactly

Section A, quoted:

> *"Receipt-only AUTO ACKs (~400 bytes) were posted to canonical Outbox for JOB-0074,
> 0074-B, 0075, 0076, 0077, 0077-A, 0078 on 8/11 **while the ordered work was NOT
> performed**. Artifact test 8/12: 01-JOBS folder is still named "01-JOBS" — the
> rename ordered in JOB-0073-A and re-ordered in JOB-0075 never happened, even though
> ACK_JOB-0075 was posted 8/11 6:26 PM ET. **Per the JOB-0075 standing rule, a
> receipt-only ACK never closes a job.**"*

**That is the same diagnosis I reached at 6am today, four days later, from scratch.**

And note the artifact test it used: **is the folder actually renamed?** Checking the
thing, not the report about the thing. **The right method was already in use.**

---

## It specifies the fix I wrote up last night as if it were new

Section D, quoted:

> *1. Change the Inbox watcher from "log the file" to **"execute the file"**: on job
> detection, **launch Claude Code headless (`claude -p` with the job file as the
> prompt)** so every job spawns a real work session.*
>
> *2. Build a **deterministic VERIFIER script** (plain code, no AI decisions): after
> each job run, **check that the promised artifact exists**. Missing = **auto re-queue
> the job** + write `FAILED-VERIFICATION_JOB-XXXX.md`.*
>
> *3. Only two legal exits from any job run: (a) artifact + proof line, or (b) BLOCKER
> file naming the ONE thing the owner must do. Anything else = failure = auto-reissue.
> **Silence is structurally impossible.***

**Point 1 is TRK-2026-9070.** Already specified, in the right words, with the right
command.

**Point 2 is `RECONCILER-OUTPUT-CHECK-SPEC.md`, which I wrote this morning.** Mine is
an independent rediscovery of the same design. **That is corroboration, not waste —
two separate analyses four days apart reached the same mechanism — but it is not new
and I will not present it as new.**

**Point 3 — "silence is structurally impossible" — is the whole charter in five
words.**

---

## And Section C is the three-state rule, already ratified

> *"One line per job... exactly one status: **EXECUTED-WITH-PROOF** (artifact link
> required) / **PARTIAL** (list exactly what is missing) / **NOT-EXECUTED** /
> **BLOCKED** (name the single owner action). **Receipts, ACKs, and heartbeats count
> as NOTHING in this ledger.** This three-state disclosure is the ONLY permitted
> close-out format on every job from now on."*

**`CLAUDE.md` Rule 2 is this, rewritten on 2026-08-15 by a session that had not seen
it.**

---

## The pilot is already chosen — and it is queued right now

Section E:

> *"Do NOT re-run the whole backlog blind. **Pilot: the 01-JOBS rename** to
> "01-JOBS - ONE SOURCE OF TRUTH" as the single test job — watcher fires, headless
> Code executes, verifier confirms the renamed folder, EXECUTED-WITH-PROOF line
> posted. **Three consecutive verified successes on small jobs, then widen.**"*

**`JOB-0073-A_RENAME-01-JOBS-ONE-SOURCE-OF-TRUTH` is one of the two jobs the
reconciler reissued at 5:40 this morning.**

**The designated pilot for the fix is sitting in the queue, reissued daily, waiting for
a session that never opens.** The system is asking for its own repair on a loop and
cannot start the loop.

---

## What this changes

**It is not a diagnosis problem. The diagnosis has been correct and written down since
August 12th.**

Everything built here in the last two days — the charter, the three states, the night
protocol, the output check — **is a rediscovery of a document that already exists and
was already approved.**

**That is either discouraging or the best news available, depending on how you read
it. I read it as the second**, for one reason: **it means nothing more needs to be
designed. There is one build task, it is four days old, it is owner-ratified, it has
no owner gates, and it has a chosen pilot.**

Section F, quoted in full:

> *"**Owner gates: None**, except blockers surfaced per BLOCKER-PING-01. Owner is
> last-resort middleware only."*

**Jorge already cleared it. Nothing is waiting on him.**

---

## And a duplicate of my own to own

Jorge told me on 2026-08-16: *"I want a standing protocol that nights are used for long
runs, line them up, and never stop them."* I wrote `NIGHT-PROTOCOL.md` and added Rule 8
to the charter.

**`OWNER-DIRECTIVE_NEVER-IDLE-PROTOCOL_2026-08-04.md` and its `v1.1` revision already
existed.** He issued that directive twelve days earlier.

**I did not check before writing.** The protocol I produced may well be better or
worse than the one he already had — **I have not compared them, and until I do, the
honest statement is that there are now two.**

---

## Recommended next step, and it is one thing

**Do not add anything. Build JOB-0079 Section D.**

1. Watcher executes instead of logs — `claude -p <job file>`.
2. Verifier checks the artifact exists; missing means auto re-queue.
3. Pilot on the 01-JOBS rename, which is already queued.
4. Three consecutive verified successes, then widen.

**Everything else on the board is downstream of that one build.**

---

**Question: shall the desktop be told to build JOB-0079 Section D and nothing else
until the pilot passes three times?**
