# 🖥️ RAMBO WORK ORDER — Alec DD: snip sweep + jackets/microfilm + OCR-matched package → Tray 3
**2026-09-19 · Alec DD · TRK-2026-9047 · owner: run the sweep, pull the jackets, and FIX the OCR matching. Deliver to Tray 3.**
**Cloud built the status report (delivered to owner). This order is the operational half Cloud cannot do (snips, email pull, OCR, desktop Tray 3).**

## Why this exists (owner finding 2026-09-19)
**"The DD reports are failing to use the OCR protocol to make the matches."** That is **RI-016** (OCR output not attached to a TRK), OPEN since 2026-08-15. Documents are OCR'd but not tied to the right job/folio, so the DD report can't match them. **This order treats OCR-matching as a HARD GATE, not an afterthought.**

## JOB 1 — Snip sweep (one worker per source, Rule 5)
For each of the ~22–30 DD sources (the 17 named in `ALEC-DD_SITE-SWEEP-REGISTRY.md` + the rest of the checklist), per property/folio in the Alec portfolio:
1. Open the source. Capture a **SNIP** (screenshot) = the working paper / client proof.
2. Record **RETRIEVED / BLOCKED** + the exact blocker (Turnstile / login / reCAPTCHA / 404).
3. Write the row into `ALEC-DD_SITE-SWEEP-REGISTRY.md` the moment it finishes — **no claim without a snip.**
4. The 4 known blockers (Clerk=Turnstile, County EPS=login+reCAPTCHA, City iBuild=login, County ArcGIS=404) are **owner-attended** where a login is needed — stage them, take Jorge to the one login click, then continue.

## JOB 2 — Jackets + microfilm (both copies)
1. Pull the original county **tax jackets + microfilm** from email (mdcpa.net) for each Alec property.
2. Produce the **ENHANCED** copy per the `tax-jacket` skill (rotate head-up, drop blanks, ink-deepen fades, stamp footer). Keep the **ORIGINAL** alongside it — deliver BOTH.

## JOB 3 — OCR-MATCH GATE (the RI-016 fix, mandatory)
Apply `atlas/sops/OCR-PROTOCOL.md` to EVERY snip and jacket page:
1. OCR the page → `.SEARCH.txt` sidecar.
2. **Stamp the TRK/folio into the sidecar header AND the source filename at OCR time**, derived from the containing job folder (RI-016 Tier-2 fix). A sidecar with no TRK is a defect — do not leave it.
3. Match each document to its property by the OCR'd folio (**MDC folio = 13 digits**) — **exact match only. Fuzzy match is for SEARCH, never for writing/filing.** A wrong match is worse than a failed one.
4. Extract the matched facts into our report; **keep the snip as the proof exhibit** behind each fact.

## JOB 4 — Assemble + deliver
1. Build the **contiguous PDF** per `DD-WRITEUP-TEMPLATE`: snip-backed working papers → extracted data → plain client verdict (clean / loose end / undetermined), including the jacket-vs-microfilm narrative and the permit-code translation.
2. **Include both jacket copies (original + enhanced) and the microfilm.**
3. **Drop the package into desktop Tray 3.** Then tell Jorge it's there.

## RED / GREEN
- GREEN: OCR, snips, report assembly, Tray 3 placement (new files only).
- **RED (one owner click each):** the 4 login-gated sources; **any filing/move/rename of a client document** stays RED — this order PREPARES filing, it does not execute it.

## Report back (to `mailbox/to-cloud/`)
Denominator: **retrieved-with-snip X / blocked Y / of N**; how many sidecars now carry a TRK; which blockers still need an owner login; confirm Tray 3 delivery.

**CLOSING QUESTION:** How many of the ~22–30 sources came back retrieved-with-snip, and is every OCR sidecar now stamped with its TRK?

#alec-dd #snip-sweep #jackets #microfilm #OCR-match #RI-016 #tray3 #TRK-2026-9047 #cloud-to-desktop
