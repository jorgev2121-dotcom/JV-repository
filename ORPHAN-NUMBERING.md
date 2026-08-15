# ORPHAN NUMBERING — the `OPH` standard

**Designed by Jorge, 2026-08-15. Adopted over cloud's `INTAKE-` proposal.**

---

## The scheme

A document entering the system from anywhere — scan, email, download, hand-off —
gets an **orphan number**, not a tracking number:

```
OPH-2026-0042
```

Same shape as `TRK-2026-NNNN`. Same coding system. Only the prefix differs.

**When the document is matched to its job, the OPH number does not vanish. It becomes
a hashtag in the document body, and the TRK takes over as the identity:**

```
Before:  OPH-2026-0042            (identity — an orphan, job unknown)
After:   TRK-2026-1262            (identity — belongs to this job)
         #OPH-2026-0042           (category handle — how it arrived)
```

---

## Why this beats cloud's `INTAKE-2026-0815-PP-0007`

Recorded because the rejected option was cloud's own and the reasoning matters.

**1. One coding system, not two.** Jorge already reads `TRK-2026-NNNN` fluently.
`OPH-2026-0042` is instantly legible to him. The `INTAKE-` format had four segments
and a source code to memorise — a second grammar for a man who uses text-to-speech and
already runs one.

**2. It states the STATUS, not the origin.** "OPH" says *this document has no family
yet* — which is the fact that matters and the fact that has to change. `INTAKE-PP-`
said where it came from, which is useful for fixing a pipeline but useless for knowing
what to do with the document in front of you.

**3. The hashtag conversion is the genuinely clever part.** It solves the audit
problem cloud's version did not address at all. Because `#OPH-2026-0042` stays in the
body after filing, you can always ask *"what arrived as an orphan, and where did it
end up?"* — and get an answer, months later.

It also uses Jorge's existing hashtag concept exactly as intended: **a tracking number
is an identity that returns one thing; a hashtag is a category that returns many.**
An orphan number starts as an identity and is demoted to a category the moment a real
identity exists. Nothing is lost and nothing is duplicated.

---

## Two gaps cloud is closing

### Gap 1 — OPH numbers must be CHEAP, or you get a second drifting registry

The TRK registry is already out of sync with reality (RI-013): the stated range covers
less than a third of what exists, the +3 increment is not being followed, and numbers
appear above the ceiling. **A second series maintained the same way inherits the same
disease.**

**The fix is a distinction that removes most of the burden:**

- **TRK numbers are client-facing.** They are seeded high at 1247 and increment by 3
  *specifically so clients cannot infer company size*. That obfuscation is why the
  series needs careful custody.
- **OPH numbers never leave the building.** No client sees one. They carry no
  commercial signal.

**Therefore OPH is plain sequential — 0001, 0002, 0003.** No seeding, no +3, no gaps
to preserve. It can be issued mechanically by whatever is doing the intake, with no
registry lookup and no risk of leaking anything. **Cheap to issue, cheap to keep
straight.**

### Gap 2 — not every orphan becomes a TRK

The design says an orphan number is replaced when the document "merges with its
family." But some documents have no family and never will: templates, personal
records, bank statements, junk, duplicates.

**Without a terminal state for those, they sit in the orphan register forever and
recreate the original problem one level up.**

**So an OPH resolves to exactly one of four outcomes, and never stays open:**

| Outcome | Meaning |
|---|---|
| `→ TRK-2026-NNNN` | Matched to a job. OPH becomes `#OPH-` in the body |
| `→ NON-JOB` | Real document, no job. Personal, template, company record. Filed outside `01-JOBS`, keeps its OPH permanently as its identity |
| `→ DUPLICATE of <TRK or OPH>` | Already filed elsewhere. Points at the original |
| `→ DISCARD-PENDING` | Believed junk. **Jorge decides.** Deletion is RED — nothing is deleted by an executor |

**An OPH with no outcome after 30 days appears in the daily digest.** That is the
sensor, and it is what has been missing everywhere else in this system.

---

## The register

`OPH-REGISTER.md`, one row per orphan. The number stays short; the metadata lives here
rather than being crammed into the identity.

| Column | Example |
|---|---|
| OPH | `OPH-2026-0042` |
| Received | `2026-08-15` |
| Source | `PaperPort` / `Downloads` / `Outlook` / `Drive-root` |
| Original name | `20001 Re-Work - test.pdf` |
| Evidence | permit number, folio, address, party found in the document |
| Outcome | `TRK-2026-1262` / `NON-JOB` / `DUPLICATE` / `DISCARD-PENDING` / *(open)* |
| Resolved | `2026-08-16` |

---

## Rules

1. **Every document entering any holding area gets an OPH immediately.** No exceptions,
   no judgement call required at intake — that is the point.
2. **An OPH is never reused**, even after it resolves. Same discipline as TRK.
3. **Nothing leaves a holding area for `01-JOBS` without a TRK.** The gate is on exit.
4. **Never convert OPH → TRK on a fuzzy match.** `CLAUDE.md` section 9. Uncertain means
   it stays an orphan, and that is the correct outcome. `14598 SW 110 ST` was nearly
   filed into `TRK-2026-1262` because both addresses contain "110" — under this scheme
   it stays `OPH-` until a real number is issued for 14598.
5. **The OPH number goes in the filename AND the document body**, same as a TRK. A
   number that exists only in a filename dies when the file is printed or re-saved.
