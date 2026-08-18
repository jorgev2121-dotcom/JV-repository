# The ledger covers 164 files. The folder holds 541.

**TRK-2026-9299 · measured by the desktop executor 2026-08-18 01:40 ET, at the cloud's request ·
mirrored into the repo 06:20 UTC**

**Measured from the disk, not asked of the thing being measured.** A question about whether a
count recurses must never be answered by the counter.

---

## The numbers

| | |
|---|---|
| `VTES-Outbox` files, **recursively** | **541** |
| `VTES-Outbox\_LEDGER.csv` rows | **164** |
| **Files outside the ledger** | **377** |
| **Of those, inside `PROOF-5`** | **369** |

**Recursion: NO.** Zero of the 164 rows contain a path separator. **Zero name a `DD-REPORT`.
Zero name a `.png`.**

---

## What is outside the ledger

**All of last night's proof of concept:**

- **5 client-ready reports** with every image embedded
- **103 images** in `06-IMAGES`
- **241 raw county responses** in `_RAW` — the evidence layer under every finding

**If that folder vanished, nothing in this system would notice.**

---

## Two ledgers, not one mirrored file

**Different sizes, different MD5s, different lanes:**

- `VTES-Inbox\_LEDGER.csv` — **142 rows, every row lane `CHAT-TO-CODE`.** Inbox top level holds
  145 files.
- `VTES-Outbox\_LEDGER.csv` — **164 rows, every row lane `CODE-TO-CHAT`.** Outbox top level holds
  165 files; the one unledgered file is `_LEDGER.csv` itself, correctly self-excluded.

**At the top level the ledgers are essentially complete. The gap is entirely depth.**

---

## The second uncovered lane, and my count of it was wrong

**`_CLAUDE-MAILBOX` is not ledgered at all.**

**I reported it as 25 files. It is 28 at top level and 96 recursively** — it contains a subfolder,
`COUNTY-PROOF-TRK-2026-9078`, holding **68 files**, which is the entire 22-source county proof
from TASK-11.

**So the lane I flagged as unledgered is nearly four times the size I flagged it as** — and it
also holds the charter mirror, currently the only copy of the operating rules either executor can
read.

**Two other counts of mine corrected in the same pass:** `PROOF-5` top level is **25 files, not
"roughly 30."** The 103 PNG figure was exact.

---

## Why this is not a filing problem

**Everything is where it should be. Nothing is lost.** The defect is that the safety net has a
hole in it exactly where the valuable work lives.

**A ledger that stops at the top level will always look complete**, because the top level is
where small files accumulate and depth is where deliverables go. **164 of 164 at the top reads as
100 percent.** It is 30 percent of the folder.

**That is RI-025 in its purest form: a number that is true, correctly computed, and describes a
rule nobody wrote down.**

---

## The fix, and it is not urgent

**Make the ledger recurse, and print the depth in every reconciler report** as one line:
`recursive: yes` or `recursive: no, top level only`.

**Not urgent because nothing is lost and nothing is at risk tonight.** Worth doing before the
next multi-hundred-file job, which on current pace is this week.

#TRK-2026-9299 #RI-025 #NightProtocol #JorgeValdes #CU-Inspections
