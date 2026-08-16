# JOBS-FOLDER-CENSUS.md — TRK-2026-9106

**Full enumeration of the `01-JOBS` root, cloud session 2026-08-16 ~05:00. Read-only.**

This was the top item on the refilled queue: *enumerate everything with no TRK at all.*
It turned up more than that.

---

## ⚠ CORRECTION FIRST — Part 2 DID start

**Earlier tonight I wrote in the morning report that Orange Tree Part 2 "never
started." That was wrong, and I am correcting it before anything else.**

The desktop created two folders before it stopped:

```
_ALEC-VALDES-DD                                        01:57:19
OPH-2026-0007 _ Bal Harbour + Plaza _ HOA-questioned units   02:01:24
```

**It started Part 2 and got about nine minutes into it.** I reported "never started"
because I was watching the mailbox folder and the `_ALEC-SWEEP` subfolder — **the
desktop was writing into `01-JOBS` instead, which I had not checked.**

**That is the same error shape I have been logging all night: I checked one place and
reported on the whole.** Logged against RI-014.

### And it did the hard thing correctly

TASK-11 told it: *"Bal Harbour Plaza has NO TRK. Do not invent one and do not borrow
1582. Issue the next number per the registry, or leave it as an OPH and say so."*

**It issued `OPH-2026-0007` — which is exactly the next number in
`ORPHAN-REGISTER.md`.** It read the register, took the right value, and used an
orphan number rather than inventing a tracking number for a job whose identity was not
established.

**That is the anti-fuzzy-match rule working, unattended, at two in the morning.**

---

## 1. Eight `TRK-TBD` folders, not two

`TRK-2026-9009` records *"the two `_JOB-TREE_TRK-TBD.html` files."* The real count is
**eight job folders** carrying no identity at all:

```
TRK-TBD _ FOLIO-TBD _ 13328 SW 113 CT (Nick)
TRK-TBD _ FOLIO-TBD _ 535 NW 7 ST Homestead (Renzo Cahuana)
TRK-TBD _ FOLIO-TBD _ 2362-2364 NW 32 ST City of Miami (2362 Acquisition LLC)
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 221
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 301
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 302
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 404 (Reyna Jovel)
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 425
```

**Five of the eight are units in one building — 10000 W Bay Harbor Dr.** That is the
Bay Harbour matter, and it is the same building the desktop just opened
`OPH-2026-0007` for.

**`TRK-TBD` is a defect by the charter's own words: *"`TRK-TBD` is a defect. Assign a
real number."*** Eight of them collide with each other in any sort or search.

**They should be OPH numbers, not TBD.** That is exactly what the orphan scheme is
for, and the desktop has just demonstrated the pattern with 0007.

---

## 2. FIVE identity schemes are in live use, not two

RI-012 records two filename conventions. The folder census shows **five different
identity prefixes**:

| Scheme | Example | Count seen |
|---|---|---|
| `TRK-2026-NNNN` | `TRK-2026-1292` | 14 |
| `TRK-26-NNNN` | `TRK-26-1042 _ FOLIO-TBD _ 15222 SW 108 Pl` | 1 |
| `TUS-YY-NNNN` | `TUS-26-1018`, `TUS-25-1023`, `TUS-26-1033` | 3 |
| `KAR-26-...` | `KAR-26-GROVES` | 1 |
| `JOB-NNNN` | `JOB-4225 _ Rose Arbor` | 1 |
| none | `1514 NW 73 St - House Project` | 1 |
| `TRK-TBD` | eight folders | 8 |

**A search for `TRK-2026` finds fourteen of these. The other fifteen are invisible to
it.**

---

## 3. ⚠ TWO JOBS APPEAR TWICE UNDER DIFFERENT SCHEMES

### 14598 SW 110 St already had an identity

```
TUS-25-1023 _ 30-5910-018-0210 _ 14598 SW 110 St Miami
```

**This is the property that nearly got misfiled into `TRK-2026-1262` on a digit
match** — and on 2026-08-15 I issued it a *new* provisional number,
`TRK-2026-1614`, because it appeared to have no identity.

**It had one. `TUS-25-1023`. With the folio already recorded: `30-5910-018-0210`.**

**So TRK-2026-1614 may be a second identity for a job that already has one.** It was
issued in good faith from a survey that searched for `TRK-2026` and could not see a
`TUS-` prefix. **This is the collision the registry protocol exists to prevent, caused
by the scheme drift in section 2.**

**Do not use TRK-2026-1614 until Jorge decides.** Options: retire 1614 and keep
TUS-25-1023, or migrate TUS-25-1023 to 1614 and cross-reference. **Either is his
call — renaming a job folder is RED.**

### Groves at Sunset appears twice

```
TRK-2026-1256 - Groves at Sunset (Karla)
KAR-26-GROVES _ FOLIO-TBD _ 8850 SW 72 St Groves at Sunset Pool
```

**Same client, same development.** Possibly two genuine jobs (a pool permit is a
separate scope), possibly one job filed twice. **Needs a look, not a guess.**

---

## 4. FOUR unsent emails, not one

The `01-JOBS` root holds four `.eml` files whose names begin `SEND-ME_`:

| File | Size | Date |
|---|---|---|
| `SEND-ME_Management-5-Reports_Wally-Alec_2026-07-30.eml` | **6.6 MB** | 2026-07-30 |
| `SEND-ME_Alec-CRM-Welcome_2026-07-30.eml` | 3 KB | 2026-07-30 |
| `SEND-ME_CrossCollateral-System-Explainer_2026-07-30.eml` | 5 KB | 2026-07-30 |
| `SEND-ME_Team-CRM-Launch_2026-07-31.eml` | 340 KB | 2026-07-31 |

**I knew about one of these. There are four, and all four are finished work.**

The 6.6 MB one is the Wally management report package — the item that has been sitting
in Drafts since July 30th. **The other three are the CRM launch sequence for Alec**,
which is the marketing function Jorge described as *"the window to our pipeline."*

**Four finished emails, none sent, all from the same two days in July.** Sending is
RED and stays Jorge's decision — but he should know it is four, not one.

---

## 5. What else is in the root

- **`_ORPHANS`** — an existing orphan folder, predating tonight's register
- **`_CONVERGE-STAGING`** — holds the duplicate `TRK-2026-1262` folder from
  `VERSION-LOG-GAP-MAP.md`
- **`_INDEX.html`** — a job index, last written 2026-08-15
- **`1514 NW 73 St - House Project`** — a job folder with no identifier of any kind

---

## 6. Revised totals

| | |
|---|---|
| Job folders in `01-JOBS` root | **29** |
| Carrying a `TRK-2026-` number | 14 |
| Carrying `TRK-TBD` | 8 |
| Carrying some other scheme | 6 |
| Carrying nothing | 1 |

**Roughly half the job folders cannot be found by the canonical search.**

---

**Question: TRK-2026-1614 and TUS-25-1023 are the same property. Retire the new number,
or migrate the old one?**
