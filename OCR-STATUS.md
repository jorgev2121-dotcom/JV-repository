# OCR-STATUS.md — Verified from Google Drive, 2026-08-15

**Built by a cloud session by inspecting Drive directly. No desktop input.**

---

## 1. Headline — the work was not lost

A desktop session reported the 2026-08-13 OCR run as **"28 files processed, 0%
success, all FAILED."** That report came from reading the `12:37` log.

**Drive tells a different story.** A later run the same day succeeded:

| Window (2026-08-13) | Result |
|---|---|
| 12:37 | 28 files attempted, all failed on PDF open errors — **the log the desktop read** |
| 16:35 – 16:36 | ~40 `.SEARCH.txt` sidecars written |
| 17:49 – 17:57 | ~14 more `.SEARCH.txt` sidecars written |

**At least 54 `.SEARCH.txt` files exist, carrying real extracted text.** Sizes run
from 625 bytes to 95,414 bytes. Pagination was not exhausted, so 54 is a **floor,
not a total.**

**The desktop's "all wasted" conclusion is wrong.** It read the failing log and
stopped, exactly the failure shape recorded in RI-014 — a partial view reported as
the whole picture. This instance cost Jorge four hours of believing his work was
destroyed.

---

## 2. Answers to the four questions asked

**Q: Status of the overnight run.**
**No overnight run occurred** between 2026-08-14 and 2026-08-15. All four scheduled
tasks are DISABLED — `CU-BulkOCR`, `CU-OCR-Intake`, `CU-OCR-Watch`,
`CU-Inspections-Auto-Filing-OCR`. That part of the desktop report is confirmed.
**The successful output is from 2026-08-13, not overnight.**

**Q: Percentage complete, 2022 to present.**
**Cannot be computed yet — stating that rather than guessing.** It needs the total
count of PDFs in scope, which lives on the PC and in Drive folders this pass has not
enumerated. 54+ sidecars is the numerator; the denominator is unknown. A desktop
session can count both in seconds (see the paste block).

**Q: Average added to each new scan.**
From the 54 observed: **625 bytes to 95 KB of extracted text per document.**
The distribution is bimodal and that matters:
- **Drawing sheets** (`A-1`, `S-1`, `LEGEND`, `P-2`) — 700 B to 1.5 KB. Titles and
  labels only, which is all a drawing contains.
- **Text documents** (product approvals, permits, bills) — 6 KB to 95 KB.

**A single average would be misleading.** Median is roughly 1–2 KB; the mean is
dragged up by a handful of large documents.

**Q: How many attached to the master tracking number.**
**This is the important one, and the answer is bad.**

Of the ~54 sidecars observed, only these carry a TRK in the filename:
- `#karla DOH Non-Compliance Response Package - Permit 13-60-01441 - TRK-2026-1436.pdf.SEARCH.txt`
- 5 files under `TRK-2026-1262`

**Roughly 6 of 54 — about 11%.** The other ~89% are searchable by *content* but are
**not attached to any job.**

---

## 3. The collision this creates

Three separate files named `LEGEND.PDF.SEARCH.txt` were found, in three different
folders. Also multiple `S-1`, `A-1`, `P-1`, `E-1`.

**Without a tracking number, these are indistinguishable.** A search for "LEGEND"
returns three results and nothing in the name says which job each belongs to. The
sidecar system works; the *identity* half is missing.

**This is the single highest-value OCR fix:** stamp the TRK into the sidecar and into
the source filename at OCR time, not afterwards. `CLAUDE.md` section 9 already
requires the number to be in the file body — the OCR pipeline is not honouring it.

---

## 4. Why the run failed at 12:37 and succeeded later

The 12:37 failures were **PDF open errors — long path names and permissions.**

Long-path failures are deterministic: the same file fails every time until the path
is shortened or long-path support is enabled. The later run succeeding on different
files suggests the second batch simply had shorter paths, not that the bug was fixed.

**So the long-path defect is still live** and will silently drop any file with a deep
path. Windows long-path support is a registry/Group Policy setting
(`LongPathsEnabled`) — a Tier 2 fix that removes the cause rather than working around
it.

---

## 5. What is still unknown

Stated explicitly per RI-014, rather than implied:

1. **Total `.SEARCH.txt` count.** Pagination not exhausted. 54 is a floor.
2. **Total PDFs in scope**, so no completion percentage.
3. **Whether `.TAGS.txt` count matches `.SEARCH.txt` count.** A mismatch means some
   documents got text but no tags.
4. **Which 28 files failed at 12:37**, and whether any were later retried
   successfully.
5. **Anything before 2026-08-13.** OCR pipeline logs from the May–June pilot are on
   the PC only.
