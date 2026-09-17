# The desktop executor has been working without the operating charter

**TRK-2026-9287 · found 2026-08-18 03:05 UTC by the cloud session, after desktop session C
refused to repeat one of my citations**

**This is the most consequential thing found tonight and it was found by a peer saying
"I cannot verify that, name the source."**

---

## What happened

I told the desktop that `TRK-2026-1612` sits above a ceiling of 1367 "recorded in `CLAUDE.md`."

**Session C searched and answered:** there are exactly two `CLAUDE.md` files on that machine —
`C:\Users\JV\.claude\CLAUDE.md` and `C:\AI\CLAUDE.md` — and **neither contains the string
`TRK`.** It declined to repeat my claim as fact.

**It was right to decline, and I was right about the content. Both are true because we were
looking at different files.**

---

## The citation, verified and quoted

**Source: `CLAUDE.md` in this repository, lines 197–276, committed `e9d09d2` on 2026-08-16.**
Repository: `github.com/jorgev2121-dotcom/JV-repository`.

> **§9 Issuing, item 1:** *"Seed: `TRK-2026-1247`. Deliberately seeded high so clients cannot
> infer company size."*
> **item 2:** *"Increment: +3."*
>
> **§9 Known drift to repair, item 3:** *"The stated range (1247–1367) does not cover observed
> numbers. Drive contains `TRK-2026-1536` and `TRK-2026-1611`, both above the stated ceiling,
> plus `TRK-2026-0708-JULIA` below the seed."*

**With 1612 that is three live numbers above the ceiling, not two.** The reconciliation stands
as a Jorge item, and the source is now named.

---

## The real finding, which is not about numbering

**The operating charter that governs both executors lives in a repository the desktop cannot
read.**

The desktop's git is broken — `TRK-2026-9082`, the reason I have been mirroring its output by
hand all night. **A broken push was recorded as an inconvenience. It is not. It is also a
broken pull.**

**So for the entire period covered by that defect, the desktop executor has been operating
without:**

- **§9 tracking-number protocol** — the seed, the +3 increment, the ban on inventing a number,
  the four filing rules, the `pNNN` page standard.
- **§12 FREEZE-AND-FINISH-01** — the ratification freeze, the three-workstream limit, and
  **EXHAUST-FIRST-01**, which governs every escalation to Jorge.
- **Rules 1 through 8** — no upward delegation, three honest states, do not agree reflexively,
  the recurrence rule, batch fan-out, ROOT CAUSE, write-for-how-he-reads, night protocol.
- **`RECURRING-ISSUES.md`** — including every RI logged tonight about its own work.

**Everything it did tonight, it did well, and it did without the rulebook.** That is worth
saying plainly: the quality was not coming from the charter. It was coming from the executor.

---

## Why nobody noticed

**Because the desktop kept producing correct-looking work.** It issued `TRK-2026-1612` tonight —
a number it had no way to check against a registry it cannot see.

**It happened to be fine.** Nothing proves the next one will be.

**This is RI-025 at the level of the whole collaboration:** a system reporting success while
missing the input that makes success meaningful. **Six instances in two days; this is the
seventh and the largest.**

---

## What to do about it, ranked by durability

**Tier 1 — Suppression. Paste the charter into the desktop window.** Lifespan: one session. It
dies on restart, which is exactly the failure mode `CLAUDE.md` §7 already names.

**Tier 2 — Removal. Fix the git credential so the desktop pulls the repo.** This deletes the
cause. It is the right answer and it needs one owner action.

**Tier 3 — Enforcement. Write the charter to a Drive path both executors read on start**, and
have each session state which revision it loaded. **The desktop can read Drive — it has been
writing to it all night.** This survives the git problem entirely and does not depend on it
ever being fixed.

**Recommendation: Tier 3 now, Tier 2 when Jorge is awake.** Tier 3 needs no owner action and
closes the gap tonight; Tier 2 is the permanent fix but is blocked on a credential only he can
supply.

**Per the charter's own Rule 4, Tier 1 is not on the table.**

---

## What this does not excuse

**My citation was correct and my sourcing was lazy.** I named a filename without a path, in a
message to an executor I already knew could not see this repository. **Naming the file was not
the same as naming where it lives, and I knew the difference.**

#TRK-2026-9287 #TRK-2026-9082 #FreezeAndFinish #RI-025 #JorgeValdes #CUInspections
