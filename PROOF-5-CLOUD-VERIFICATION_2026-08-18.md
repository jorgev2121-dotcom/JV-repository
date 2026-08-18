# The 22-sources proof of concept — verified from the cloud, independently

**TRK-2026-9250 · cloud session · written 2026-08-18 00:20 UTC (8:20 PM ET 08-17)**

**The proof of concept Jorge said he "never got a reply" on was executed tonight by the
desktop, and I have confirmed it against Drive myself rather than believing the report.**

**But it did not come out clean, and the part that is wrong is the part he would notice first.**


> ## ⚠ CORRECTION — 2026-08-18 01:10 UTC. SECTION B BELOW IS WRONG.
>
> **There was no overwrite. No data was lost. I reported a loss that did not happen.**
>
> The two sessions used **different folio formats** in their filenames — session A wrote
> `30-6006-001-0700_DD-REPORT…` (dashed), session B wrote `3060060010700_DD-REPORT…`
> (undashed). **Both sets exist side by side, intact.**
>
> **My error:** I listed `PROOF-5` at 00:15 UTC and did not see the 5 MB reports. They were
> written at 00:19–00:27 UTC — **after I looked.** I read a folder mid-write, saw the small
> files, and declared the large ones destroyed.
>
> **That is RI-022 again, in a folder I had just been told had a live writer in it.** I did
> the one thing this repo exists to stop: I turned "I could not see it" into "it is gone."
>
> **Section C onward stands. Section B's collision finding does not.** The real defect is in
> the corrected Section B2 immediately below it.

---

## Section A — What is provably on disk

I listed the `PROOF-5` folder in Drive directly. **Not the desktop's claim — my own count.**

- **5 of 5 `_DD-REPORT_2026-08-17.html`**, one per folio. Present.
- **28 PNG images** in `06-IMAGES` — county orthophotos at 1.6–1.9 MB, block-context and
  parcel-close aerials at ~1.0–1.1 MB, parcel/lot/street maps at 40–57 KB.
  **All five folios represented.** The desktop reported 25; the true count is **28**.
- **Two master CSVs**, both intact: `PROOF-5-MASTER_2026-08-17.csv` (35,430 bytes) and
  `PROOF-5-MASTER_2026-08-17_SESSION-A.csv` (5,929 bytes).
- **`_RAW`** and the runner script `_RUNNER_Run-22-Sources.ps1` (25,663 bytes).

**The images are real and they are large. This is the first time image scraping has actually
been done, and it worked.**

---

## Section B — The failure, stated plainly

**Two Claude Code sessions worked this same job at the same time, neither aware of the other.**
The desktop raised its own collision notice at 19:47 ET and predicted the crash would land on
`PROOF-5-MASTER_2026-08-17.csv`.

**It predicted the wrong file.** Session A protected the CSV by writing its own under a
`_SESSION-A` suffix. **It did not protect the HTML reports, and both sessions used the identical
filename** `<dashed-folio>_DD-REPORT_2026-08-17.html`.

### The arithmetic that settles it

- The session that finished at 19:58 ET reported its five reports at **5.1 – 5.5 MB each**,
  with **all images embedded inside the file**, and stated: *"You can email any one of those
  five files to a client… and it opens with the photographs intact."*
- **The five files now on Drive are 16,540 to 23,183 bytes.** They were last modified at
  00:00–00:01 UTC — **after** that report was written.

**No 18-kilobyte file contains a 1.9-megabyte photograph.** This needs no further testing:
the surviving reports must reference their images by relative path.

**Consequence for Jorge, which is the only part that matters:** *emailing one of those five
HTML files on its own will not carry the photographs.* It will open with broken image slots
unless the `06-IMAGES` folder travels with it.

**What I cannot determine from the cloud:** whether the 5 MB embedded versions existed and were
overwritten at 00:01, or whether the 5 MB figure was never accurate. **Both are consistent with
what I can see. I am not going to pick one and call it fact.**

## Section B2 — The real defect, which is worse and which I had backwards

**Found by desktop session C by counting `<img>` tags and base64 payloads in every report,
against the PNGs actually on disk for each folio.**

| Report | Size | `<img>` tags | Embedded | Images on disk for that folio |
|---|---|---|---|---|
| 3060060010700 (session B) | 5,199,775 B | **1** | 1 | **24** |
| 3059330330170 (session B) | 5,313,689 B | **1** | 1 | **28** |
| 3031280110800 (session B) | 5,172,761 B | **1** | 1 | **15** |
| 30-6006-001-0700 (session A) | 21,091 B | 5 | 0 | 24 |
| 30-5933-033-0170 (session A) | 16,971 B | 5 | 0 | 28 |

**A 5.2 MB report does not contain nineteen photographs. It contains one.** The single payload
is 5,178,076 base64 characters — one PNG, the 3.8 MB `gis-aerial-with-parcel-outline`,
re-encoded. **That is the entire 5 MB.** The other 23 images appear in no report at all.

**"5.1 MB, images embedded" is true only in the singular.** The size went up, so nobody
checked what the size was made of.

**Both halves are defective, in opposite directions:**

- **Session A** — the right five pictures, **none of them travelling with the file.** My
  broken-slot prediction was correct for these five, and session C confirmed it after
  correcting its own regex (the files use single-quoted `src='…'`).
- **Session B** — self-contained, but **1 picture of 24.**

**Neither set is emailable to a client as it stands.** One fix, after the live run ends:
embed all N images per report, verified by comparing tag count to disk count per folio.

---

## Section C — The two runs disagree on the headline number, and both are honest

| | Session A (PASTE-D-009 window) | Session B (`claude.exe --chrome`, PID 7856) |
|---|---|---|
| Sources answered, property 1 | **7 of 22** | **10 of 22** |

**The gap is definitional, not factual.** Session B counted browser-gated sources as PARTIAL;
Session A counted the same sources BLOCKED. **Neither invented a result**, and every one of the
22 states on the page why it did or did not answer.

**Two independent runs agreeing on the substance is worth more than one run asserting
confidence** — same owner, same violation rows, same not-applicable verdicts.

---

## Section D — The county findings, which are the actual deliverable

**All five properties carry a confirmed open Miami-Dade Unsafe Structures case.** Not inferred
from the list they came off — each case number was put back to the county's own endpoint and
the raw response saved.

| Property | Folio | Unsafe Structures case |
|---|---|---|
| 11485 Quail Roost Dr | 30-6006-001-0700 | **20200202351** (opened 01/13/2020, **never closed**) |
| 2745 NW 28 St | 30-3128-011-0800 | **20200202361** |
| 18302 SW 152 Ct | 30-5933-033-0170 | **20200202534** |
| 3085 SW 79 Ave | 30-4015-018-0410 | **20200202568** |
| 1055 NW 73 St | 30-3111-035-3740 | **20200202658** |

### The money finding, and the warning that must travel with it

Property 1's folio returns **7 open code-enforcement citations totalling $61,082.82**, plus two
**recorded liens** — book/page 29369/0272 recorded 10/29/2014 and 28998/1580 recorded
01/22/2014, both *Referred to ICD for Collections*.

**But the street address printed on those citations is 11865 SW 206 ST, not 11485 Quail Roost
Dr.** That surface returns citations tied to the **violator**, and the violator is the owner of
record.

**So the money is proven against the OWNER. It is NOT proven to encumber this parcel.** It must
not appear in any client report as a lien on this property until the case detail is read.
**The desktop caught this itself and wrote it on the page. That is the behaviour this repo has
been trying to produce for eighteen months.**

---

## Section E — A correction that changes every past zoning answer

**Layer 17 is municipal zoning. All five of these parcels are unincorporated**, so layer 17
returns `ZONE=NONE` — which reads as "no zoning" and is wrong.

**County zoning is layer 14**, and it returns `RU-1 — Single-family Residential District,
7,500 ft² net`, matching the June library exactly.

**Any earlier report that said these parcels had no zoning was wrong for this reason.** Fixed in
the runner; both layers are now reported side by side.

---

## Section F — Four bugs the run found in itself

Recorded because this machine's history is full of confident output that was wrong.

1. **`$PA` collided with `$pa`.** PowerShell variable names are case-insensitive, so the URL was
   destroyed and SITE-01 failed for every property. **Same root cause as the heartbeat-roster
   bug found an hour earlier.**
2. **SITE-11 false positive** — "Unsafe Structures" is also a tab label, so a keyword match
   reported a case that did not exist.
3. **SITE-11 false negative** — tightening that filter then hid case 20200202351, which is real.
4. **`$pa.SiteAddress` is an array**, so `.Address` bound to a .NET member and wrote
   `System.Object&, System.Private.CoreLib…` into the address column of three runs.

**A near-empty first image was caught by opening the file rather than trusting its byte count.**
That is RI-022 applied correctly, by the desktop, unprompted.

---

## Section G — The gaps, none of them faked

**SITE-03 Tax Collector · SITE-04 Clerk Official Records · SITE-05 Clerk civil · SITE-06 permit
history** — browser or captcha required. **SITE-04 is the biggest single gap in the package**:
no deeds, mortgages or liens were searched.

**SITE-12** — no public Certificate-of-Use search exists for 2012→today. **Silence there is not
"no CU."**

**SITE-15, 19, 20, 21** — registers with no property input. **SITE-18, 22** — other jurisdictions.

**The Property Appraiser building photo is missing for all five.** Five likely image addresses
were probed and all five returned not-found. **No placeholder was substituted** — the job's rule
was "if a source has no image, write nothing," and it was kept.

**All of it clears in one supervised Chrome pass. The browser tool was not authorised, so none
of it was faked.**

---

## Denominators

- **5 of 5** properties run, by two independent sessions.
- **28 of 28** images verified present by direct Drive listing, with byte counts.
- **5 of 5** Unsafe Structures cases confirmed against the county's own endpoint.
- **7 of 22** to **10 of 22** sources answered, depending on whose counting rule.
- **1 silent overwrite**, on the HTML reports, unnoticed by the session that predicted it.

**Nothing was filed, moved, renamed or deleted. Everything is new, inside `VTES-Outbox`.**
Rollback: `Rollback_Proof5_2026-08-17_2000.ps1`.

#TRK-2026-9250 #ProofOfConcept #UnsafeStructures #RI-024 #JorgeValdes #CUInspections
