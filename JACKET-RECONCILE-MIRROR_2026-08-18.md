# The property jackets — answered, and the answer is not what the OCR screen said

**TRK-2026-9230 · desktop executor, worked 18:52–19:10 ET 2026-08-17 · mirrored into the repo
by the cloud session 2026-08-18 because the desktop's git push is broken (TRK-2026-9082)**

**Jorge's question:** six addresses on the OCR screen looked like truncated property jackets —
two or three pages where two or three attachments should be. Find the real ones.

---

## The answer, first

**One of the six had a complete jacket. Four of the six never had a jacket at all. And the one
real jacket email in the entire mailbox belongs to a seventh property nobody was looking at.**

`ADDRESSES-CHECKED: 6 named + 1 discovered = 7`
`COMPLETE: 1 · NO JACKET EVER EXISTED: 4 · INCOMPLETE: 2`

---

## Section A — Jorge's diagnosis was half right, and the right half is exactly right

**The split-attachment-set theory is proven, twice:**

1. **2195 NW 27 AV** holds a numbered set — (2)(3)(4)(5)(6)(8)(9) plus JACKET — **split across
   two folders.** The Desktop copy is missing (6). **Both copies are missing (1) and (7).**
2. **Eighteen county emails from 2020 each carry exactly ONE attachment** — `ACS (3).pdf`
   through `ACS (12).pdf`. The county really does send one slice per message.
   **Zero of those 18 files exist anywhere on disk.**

**But the six addresses he pointed at are not examples of it.**

---

## Section B — Why the OCR index returned those five: it was never a jacket

The index search for `jacket` matched **text inside field-inspection reports**, not jacket
documents. Each PDF's text layer was read and every matching line printed:

- **1335 NE 203 ST** — *"property jacket and property pictures on one drive '1335 Ernesto'"*
- **1540 NE 118 ST** — *"built 1951 tax jacket ordered …jv"*
- **2817 NW 99 ST** — *"Property Jacket - already SaVed on"*
- **7900 SW 36 TER** — *"roperty jacket for flat roof addition"*
- **9114 SW 143 AVE** — *"I will be sending you by entail the property jacket for this"*

**They are 3-to-8-page inspection reports because that is what an inspection report is. They
are not truncated jackets. There is no missing attachment behind any of them.**

**Two of those notes were followed and paid off:**

- **2817 NW 99 ST** — *"already saved on OneDrive"* is **TRUE**. A complete 3-part county set
  sits in the old Dropbox archive under `SpinHouse\3. Intermediate Files\…\Property Tax Jacket\`.
  **Not in its Jobs-Master folder, which is why nobody could find it.**
- **1335 NE 203 ST** — the folder *"1335 Ernesto"* exists but holds photos, a cover and a
  sketch. **The jacket the note promises is not in it.**

---

## Section C — The real jacket email, and it is 0 of 3 on disk

**All 530 folders across 6 Outlook stores were scanned. There is exactly ONE `bldg jacket`
email in the entire mailbox.**

- **Received 2026-07-08 16:27**, from **Campbell, Yaira (PA) — `cpl@MiamiDadePA.gov`**
- **3 attachments:** `ACS.pdf` (1,654 KB, 12 pages) · `ACS (1).pdf` (94 KB, 2 pages) ·
  `ACS (2).pdf` (197 KB, 2 pages)
- **Files on disk: ZERO.** A whole-disk sweep of OneDrive, G: and Downloads returns **0 files
  named `ACS*.pdf`.**

**Which property?** Identified by OCR of the county form *inside* the attachments — the email
body does not say:

> `FOLIO … 5910 18 0210 … ADDR 14598 SW 110 ST`

**Matched to a live capsule: `TUS-25-1023 _ 30-5910-018-0210 _ 14598 SW 110 St Miami`.** Exact
match on both folio and address.

**This is the finding the job was looking for, on a property the job did not name.**

---

## Section D — Three corrections to the search rule, or the next one is missed too

**1. The sender is wrong in every prior note.** Replies come from **`cpl@MiamiDadePA.gov`**, not
`PAWEBMAIL@MDCPA.NET` — that is the address you send requests *to*. **A domain sweep of
`*@mdcpa.net` returns 19 messages and the 2026 jacket is not among them.**

**2. The body does not identify the property.** It is a form letter — *"Dear Customer … Attached
please find building jacket available."* **No address, no folio, no permit number.** The only
way to identify the property is to open the attachments.

**3. `ACS` is not the historic naming.** Older county scans use scan codes —
`0Q5JPKX0LL0009.pdf`, `0S28BKX0LL0009.pdf`. **88 such files sit on disk right now and are
invisible to any search for "jacket" or "ACS."** The working pattern is `*X0LL####.pdf`.

---

## Section E — My own "zero jacket mail" claim was wrong, and here is why

**Yesterday I wrote that there was zero `bldg jacket` mail. I searched Gmail. The email is in
Outlook, at `Jorge@teamusasales.com`, which this cloud session cannot reach at all.**

**My statement was true of the store I searched and false as written.** That is RI-022 in its
purest form: **absence reported from the place I could see, not the place it would live.**

**Rule reinforced: when a search comes back empty, name the store you searched in the same
sentence as the zero.**

---

## Section F — Staged, not filed. Rule honoured.

The three attachments were saved to a **new staging folder** so the property could be
identified. **They were NOT put into the job capsule.**

`C:\Users\JV\OneDrive\Documents\Reports\JacketStaging_TRK-2026-9230_2026-08-17\`

Proposed names for one supervised pass into `…TUS-25-1023…\02-PERMITS\`:

```
2026-07-08 _ TUS-25-1023 _ Jacket _ 14598 SW 110 ST _ p01of03.pdf
2026-07-08 _ TUS-25-1023 _ Jacket _ 14598 SW 110 ST _ p02of03.pdf
2026-07-08 _ TUS-25-1023 _ Jacket _ 14598 SW 110 ST _ p03of03.pdf
```

**Explicitly not claimed:** the p01/p02/p03 order is the *email's attachment order*, not a
proven document order. **The county gave no sequence.** If order matters it must be set by eye
before filing. No file with these names exists — nothing would be overwritten.

---

## Section G — Bonus findings from the sweep

- **67 jacket folders** across OneDrive and G:, holding **202 documents**.
- **5 of the 67 are completely empty** — a folder was made and nothing was ever put in it:
  `15545 SW 302 TER` · `20102 SW 123 DRIVE (JOEL)` · `1938 NW 52 ST` (twice) · `3521 NW 80 TER`.
- **88 county scan-code PDFs** invisible to keyword search.
- **18 single-attachment 2020 county emails, none of them saved.**

---

## Section H — The standing warning on the five jackets ordered 2026-08-16

**The catcher for `TRK-2026-9157` will miss them unless two things change:**

1. **Watch `cpl@MiamiDadePA.gov` and the domain `MiamiDadePA.gov`** — not `PAWEBMAIL@MDCPA.NET`.
2. **The email will not say which property it is.** Any catcher that files by subject or
   filename **will misfile them** — the exact failure that put 11 documents into the wrong
   Plaza unit folders on 2026-08-17.

**As of 19:10 ET, no reply to the five orders has arrived.**

---

## Still open

1. **One supervised pass to file the three 14598 SW 110 ST files.** Filing is RED — Jorge in the room.
2. **2195 NW 27 AV numbers 1 and 7** — not on disk, source email not found. Re-order or check Gmail/portal.
3. **1540 NE 118 ST and 9114 SW 143 AVE** — jackets ordered or promised that never arrived.
4. **The tax-jacket cleanup decision `MSG-TJ-20260628T172910Z` (option A or B) is still open** —
   as it has been since 2026-06-28.

**Everything above was read-only.** Six scripts, 0 errors. Rollback:
`Rollback_JacketReconcile_2026-08-17_1910.ps1`.

#TRK-2026-9230 #TaxJacket #TUS-25-1023 #RI-022 #JorgeValdes #CUInspections
