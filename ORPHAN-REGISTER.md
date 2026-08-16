# ORPHAN-REGISTER.md — every document that entered the system without a job

**TRK-2026-9073.** Written by the `orphan-onboarding` skill. Read
`.claude/skills/orphan-onboarding/SKILL.md` before adding rows.

---

## High-water mark

```
Next OPH to issue:  OPH-2026-0008
```

**Update this line every time a number is issued.** Orphan numbers increment by
**1** — plain sequential. They are never client-facing, so the +3 obfuscation that
applies to TRK numbers does not apply here.

**OPH-2026-0001 through 0007 are ISSUED** — removable-drive sweep, desktop,
2026-08-16.

**⚠ Transcribed by cloud from the Drive mailbox, not from a desktop push.** The
desktop reported *"Committed to repo"*; **no desktop commit exists on the remote** —
all commits on the branch are cloud's. The numbers are recorded here so that the next
session does not reissue them. **If the desktop later pushes its own version, these
rows are the same five numbers and must not be duplicated.**

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

**Removable-drive sweep, 2026-08-16.** Desktop enumerated `E:` (USB20FD, FAT32,
15.5 GB) and `B:` (Seagate, NTFS, 4 TB). Reported total: **5 files.**

| OPH | Found | Where | Appears to be | Evidence extracted | Rejected candidates |
|---|---|---|---|---|---|
| OPH-2026-0001 | 2026-08-16 | `E:\E-1.01-REV#2.pdf` (950 KB) | **Likely a real job document.** `E-1.01` is a standard electrical drawing sheet number and `REV#2` is a revision marker — this reads as a plan sheet from a permit set, not a stray file | **NOT YET EXTRACTED.** Needs address, folio, permit number, engineer of record from the title block | none tested yet |
| OPH-2026-0005 | 2026-08-16 | `B:\Warranty.pdf` (1.6 MB) | Warranty document. Desktop flagged "may relate to property equipment" | **NOT YET EXTRACTED.** If it names a property or an installed system it may attach to a job; if it is the Seagate's own warranty it is NON-JOB | none tested yet |
| OPH-2026-0006 | 2026-08-16 | PaperPort — scanned by Jorge in the moment | `JV A-P and creating a budget` — accounts payable / budget working document | Named by Jorge at scan time. **No date, no number, no type.** Internal admin, not client work | n/a — resolves NON-JOB, see below |
| OPH-2026-0007 | 2026-08-16 02:01 | Google Drive `01-JOBS` | **Bal Harbour + Plaza — HOA-questioned units.** Folder created by the DESKTOP, unattended | Building identified: 10000 W Bay Harbor Dr. **Five `TRK-TBD` unit folders exist for the same building** — 221, 301, 302, 404, 425 | n/a — correctly left as an OPH rather than borrowing TRK-2026-1582 |

---

## Resolved

| OPH | Outcome | TRK / reason | Date |
|---|---|---|---|
| OPH-2026-0002 | NON-JOB | `B:\MediaID.bin`, 528 B — Seagate device metadata | 2026-08-16 |
| OPH-2026-0003 | NON-JOB | `B:\Start_Here_Chromebook.pdf`, 1.1 MB — Seagate device documentation | 2026-08-16 |
| OPH-2026-0004 | NON-JOB | `B:\Start_Here_Win.exe`, 17 MB — Seagate bundled installer | 2026-08-16 |

**⚠ The three NON-JOB resolutions above are correct individually and suspicious
collectively.** `MediaID.bin`, `Start_Here_Chromebook.pdf`, `Start_Here_Win.exe` and
`Warranty.pdf` are **exactly the factory contents of a Seagate external drive.** A
4 TB drive holding nothing but its own shipping files is possible — and so is a scan
that did not see what is on it. **From the register the two are indistinguishable.**

**The control that settles it: capacity used versus files found.** A few megabytes
used means the drive is genuinely empty and `B:` closes clean. Hundreds of gigabytes
used with five files visible means the enumeration missed something. **Requested from
the desktop in TASK-09; not yet answered.** Until it is, `B:` is NOT a completed
survey.

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

---

## OPH-2026-0006 — the first live intake, and what it proves

**2026-08-16.** Jorge scanned a document into PaperPort and named it, in his own
words: **`JV A-P and creating a budget`**.

**Outcome: NON-JOB.** Accounts payable and budgeting are internal admin, not client
work. It does not belong in `01-JOBS` and it does not get a TRK. It routes to the
OneDrive filing cabinet. **Resolved in one step, correctly, with no ambiguity.**

### What it proves about the standard — and the standard is the thing that is wrong

The filename grammar in `CLAUDE.md` 9.1 is:

```
2026-08-16 _ OPH-2026-0006 _ Admin _ Accounts Payable Budget _ v1.pdf
```

**Jorge typed `JV A-P and creating a budget`. That is what actually happens at a
scanner, and it is not a failure of discipline.**

Expecting a dyslexic owner who dictates, standing at a scanner mid-task, to compose a
five-field underscore-delimited filename with a number he must first look up in a
registry — **that is a standard designed for the wrong moment.** It will be complied
with for a week and then abandoned, which is how the operation arrived at 870
untagged documents.

**And note what his name actually contains:** the party (`JV`), the category (`A-P`),
and the subject (`budget`). **He supplied the meaning. What is missing is the date and
the number — the two fields a machine can supply and he cannot.**

### The correction

**Do not ask him to name files better. Name them for him.**

1. **Whatever he types at scan time is accepted, unchanged, as the description
   field.** No rules, no lookup, no thinking at the scanner.
2. **Intake stamps the date and the OPH number** — both are derivable without him.
3. **The rename happens after**, producing the standard grammar, with his words
   preserved in the description slot.

```
he types:     JV A-P and creating a budget
becomes:      2026-08-16 _ OPH-2026-0006 _ Admin _ JV A-P and creating a budget _ v1.pdf
```

**His words survive.** That matters — he will search for "A-P budget" in three months,
not for a number he never saw.

**This is TRK-2026-9060, the intake stamp, and this document is the argument for
building it.** The gate goes on exit, not entry: at scan time nobody knows the job, so
demanding the number at scan time guarantees the standard gets skipped.

**Recorded as RI-020's clearest specimen:** *the filing convention exists for outputs,
not inputs.*

---

## OPH-2026-0007 — the rule working unattended, at 2am

**2026-08-16 02:01.** The desktop executor created
`OPH-2026-0007 _ Bal Harbour + Plaza _ HOA-questioned units` in `01-JOBS`.

TASK-11 had told it: *"Bal Harbour Plaza has NO TRK. Do not invent one and do not
borrow 1582. Issue the next number per the registry, or leave it as an OPH and say
so."*

**It read this register, took the next value — 0007 — and used an orphan number rather
than inventing a tracking number for a job whose identity is not established.**

**This is the first time the anti-fuzzy-match rule has been followed by a machine with
nobody watching.** Worth recording, because every other entry in this file is about the
rule being broken.

**Related, and it makes 0007 more important than it looks:** the census found **five
`TRK-TBD` folders for units in the same building** — 10000 W Bay Harbor Dr units 221,
301, 302, 404 and 425. **They should be OPH numbers too.** `TRK-TBD` is a defect by
the charter's own words, and eight of them collide with each other in any sort.

