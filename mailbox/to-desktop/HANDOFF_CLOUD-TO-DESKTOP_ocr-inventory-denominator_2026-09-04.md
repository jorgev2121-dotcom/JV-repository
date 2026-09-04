# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: authoritative OCR inventory with a denominator (Jan 2022 → present)
**2026-09-04 · owner wants: how much has been OCR'd vs how much remains, from January 2022 to present.**

**WHAT I FOUND / WHY IT'S YOURS:** Cloud is running a Drive-only ESTIMATE in the background (SEARCH-sidecar
count vs candidate docs). But the **authoritative** number is yours — you can see **OneDrive + local-only
files Cloud can't**, and you run the sweep. This is a Rule-11 "report with a denominator" job, ideal for
overnight.

**EXACT NEXT ACTION (GREEN — read-only counting, night-eligible):**
1. Enumerate all source docs dated/created **2022-01-01 → present** across the sweep's scope (G:\ 01-JOBS +
   OneDrive + PaperPort/holding areas). Count PDFs + image-only files.
2. Count how many already have OCR done — a `.SEARCH.txt` (and/or `.TAGS.txt`) sidecar, or a real text
   layer. That's the numerator.
3. Report a clean **denominator**: "OCR'd X of Y (Z%); remaining Y−X," broken down by location
   (01-JOBS vs OneDrive vs PaperPort/other) and, if cheap, by year. Name the biggest remaining piles
   (e.g. the ~664 image-only Garden Walk/Sugar Hill batch already noted).
4. Note anything that CAN'T be OCR'd unattended (needs an interactive window) so the "remaining" is honest
   about what's blocked vs merely pending.
5. Write the result to `mailbox/to-cloud/` (and TO-CLOUD.md) so Cloud folds it into the morning brief, and
   reconcile against Cloud's Drive-only estimate — flag any big gap (that gap ≈ the OneDrive/local-only
   files Cloud can't see).

**RED or GREEN:** counting is GREEN. Do not move/rename/OCR-write anything that changes a client file's
identity as part of this — inventory only.

**CLOSING QUESTION:** What's the real denominator — OCR'd X of Y since 2022 — and which pile is the largest chunk of the remainder?

#ocr-inventory #denominator #rule-11 #2022-to-present #cloud-to-desktop
