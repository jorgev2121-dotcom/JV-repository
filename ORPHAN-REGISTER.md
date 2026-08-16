# ORPHAN-REGISTER.md — every document that entered the system without a job

**TRK-2026-9073.** Written by the `orphan-onboarding` skill. Read
`.claude/skills/orphan-onboarding/SKILL.md` before adding rows.

---

## High-water mark

```
Next OPH to issue:  OPH-2026-0001
```

**Update this line every time a number is issued.** Orphan numbers increment by
**1** — plain sequential. They are never client-facing, so the +3 obfuscation that
applies to TRK numbers does not apply here.

Nothing has been issued yet. The sweep has not started.

---

## Rules for this file

1. **The row is written when the number is issued, not when the document is
   resolved.** If a session dies mid-analysis, the number and the location survive.
2. **Rejected TRK candidates get recorded.** Otherwise the next session repeats the
   same failed search and may talk itself into a fuzzy match. See the 14598 SW 110
   ST near-miss below.
3. **Nothing is deleted from this file.** Resolved rows move to the resolved
   section with their outcome, they do not disappear.

---

## Open orphans

*None yet. The sweep has not started.*

| OPH | Found | Where | Appears to be | Evidence extracted | Rejected candidates |
|---|---|---|---|---|---|

---

## Resolved

| OPH | Outcome | TRK / reason | Date |
|---|---|---|---|

---

## The near-miss that set the rule

**2026-08-15.** A session mapped `14598 SW 110 ST` to `TRK-2026-1262`, which is
`20001 SW 110 CT Unit 143`. It matched on the digits "110" — different street,
different suffix, different job, different client.

It was caught before anything was filed. `14598 SW 110 ST` now holds
`TRK-2026-1614` in its own right.

**A failed search costs a minute. A misfile is discovered months later by the
client.** When identity is uncertain, the document stays an orphan.

---

## Where the orphans are known to be

From `HOLDING-AREAS-INVENTORY.md` and `ORPHAN-ONBOARDING-SWEEP.md`. Counts are
estimates except where marked.

1. **PaperPort** — ~870 documents (counted by desktop). Stable, one place.
2. **Gmail attachments** — not yet counted. Cloud can reach these.
3. **Outlook attachments** — not yet counted. Desktop only.
4. **Dropbox** — not yet surveyed at all. TRK-2026-9074.
5. **OneDrive outside the filing cabinet** — not yet counted.
6. **Downloads and Desktop** — high churn, mostly duplicates.
7. **Unidentified holding areas** — USB20FD `E:`, Seagate `B:`, phone photos,
   messaging attachments. TRK-2026-9075.

**Item 7 is the most urgent despite being the smallest.** Order of work is by
lostness, not by count — a USB stick nobody has opened in two years has no backup
and nobody looking for it.

---

**Question for whichever session picks this up next: which holding area did you
enumerate, and what was the count?**
