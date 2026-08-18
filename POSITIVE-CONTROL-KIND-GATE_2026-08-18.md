# The monitor fix was proven before the passcode was typed

**TRK-2026-9299 · built and run by the desktop executor 2026-08-18 05:20 ET · mirrored into the
repo 10:10 UTC**

**This is the best piece of engineering discipline in the whole night and it is worth recording
as a pattern, not just a result.**

---

## The problem with proving a silencer works

The fix stops a monitor from reporting two healthy components as dead. **The obvious test is to
watch the alarm go quiet.**

**That test is worthless**, and the reason is the whole point:

> **A quiet alarm is exactly what a completely broken alarm also produces.**

The failure that would actually cost this business — **a real stall going unheard** — is silent
too. **So silence proves nothing, and no amount of waiting turns it into evidence.**

**The acceptance test has two halves: records silenced, AND heartbeats still heard.** Duration
never establishes the second.

---

## What was done instead

**The gate is pure logic over a roster, so the roster can be supplied.**

Rather than break a live component to make a heartbeat go stale, the desktop **lifted the
staleness loop out of the reconciler verbatim** — lines 113–119 — and ran it **twice** over a
synthetic five-row roster in a temp folder: once as the code stands today, once with the new gate
spliced in exactly as the stager would write it.

**The live roster was never read and never written.**

### Result: 5 pass, 0 fail

| Row | Heard after the gate | Expected | What it proves |
|---|---|---|---|
| `FIX-RECORD-STALE` (401m) | no | no | a passive record is silenced |
| `FIX-ONDEMAND-STALE` (92m) | no | no | an idle on-demand job is silenced |
| **`FIX-HEARTBEAT-STALE` (45m)** | **yes** | **yes** | **the positive control — a real stall is still reported** |
| `FIX-HEARTBEAT-FRESH` (3m) | no | no | a live heartbeat is not called dead |
| `FIX-UNTAGGED-STALE` (77m) | yes | yes | an untagged entry defaults to heartbeat — nothing gets blinder |

**The 401-minute and 92-minute rows are not invented numbers. They are the two false deaths the
live report has been printing every thirty minutes for days.**

---

## The honest limit, stated by the person who ran it

**This proves the gate logic does both jobs. It does not prove the splice lands correctly in the
real file** — that is the stager's read-back, and it is still unrun.

**The live confirmation is still the first apply**, whose observable appears inside thirty
minutes: a run number that increments, and the stale line going to `none`.

---

## A trap found while proving it

**The reconciler rebuilds its own roster entry from scratch every run, without a `kind` field**,
then writes the whole roster back. Proven by seeding a three-row fixture with `kind` on all three,
running that construct, and reading it back: **`RECONCILER kind = (GONE)`.**

**Functionally harmless** — that entry is skipped before the gate is reached, and a missing kind
defaults to heartbeat anyway.

**The trap is in the read-back, not the behaviour.** Anyone checking *"did the kind field land"*
thirty minutes after the apply will find **3 of 4 rows carry it** and reasonably conclude the fix
half-failed. **It did not.**

**Documented expectation: after the apply, 3 of 4 is the correct passing number.**

**Not fixed, deliberately** — it would be a second edit to the same locked file, and both the
freeze and the §1.33 lock say no.

---

## The pattern worth keeping

**When the fix is a silencer, the test must include something that should still be heard.**

**And when a live test would cost a real component, build the fixture instead** — lift the actual
code, feed it a synthetic input, and compare before against after. **Nothing was degraded, nothing
was applied, and both halves are proven.**

**This is the opposite of everything logged in RI-025 through RI-028.** Those were all tests that
returned confident answers about the wrong subject. **This one names its subject, supplies its
own input, and states what it does not prove.**

#TRK-2026-9299 #RI-028 #PositiveControl #JorgeValdes #CU-Inspections
