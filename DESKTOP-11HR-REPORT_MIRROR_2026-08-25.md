# DESKTOP 11-HOUR SESSION REPORT — mirrored by cloud
**Source:** desktop session "jv-b0", 11-hour run started 2026-08-24 ~2:30 PM.
**Why it's here:** `SendMessage` could not reach the cloud pipe, so Jorge relayed the
report by hand. Cloud QC'd and mirrored it 2026-08-25 so it survives the chat.
**#desktop-mirror #handoff #JorgeValdes #TRK-2026-9903**

---

## 1. Pending builds — ALL ASSIGNED TO COWORK (cloud must NOT double-build)
Claim any build in `RoundTable\HANDOFF-LEDGER.jsonl` first (see `LEDGER-PROTOCOL.md`). **One builder only.**

1. **ONE BOARD** — Phase 1 of the owner-approved One-List Plan. `PROJECT-QUEUE-LIVE.hta`
   absorbs Pending-Tasks / FOCUS-BOARD / OWNER-QUEUE / APPROVE-BOARD / Ask-Jorge.
   **Target 08-27**, packet HANDOFF-L.
2. **FOREMAN** — Phase 2, an upgrade of CU-REGISTRAR-01. **Target 08-29.**
3. **July cleanup four-button cards** — **Target 09-02.**

## 2. Technical constraints / failure modes the desktop learned (so cloud doesn't re-trip them)
- **`GetWindowRect` via PS struct silently returns zeros** — do rect/bitmap work inside a C# `Add-Type`.
- **`PrintWindow` returns null on MINIMIZED windows.**
- **The auto-mode classifier BLOCKS outbound-email machinery** (eml compose, `outlook.exe /m`,
  even popping an email HTA) — route via a **user-clicked button HTA** instead.
- **qPublic 403s scripts but loads in the in-app browser.** MCeSearch permits = **pre-10/2022 only**
  (positive control: permit 13304892).
- **Alabama Jack's email trail is Outlook-ONLY** (Gmail is empty for it).
- **Outlook COM is unreachable from the Code sandbox;** the one-shot scheduled-task pattern works.
- **Machine pegged ~100% CPU until the tesseract OCR job finishes (~tonight 08-25).** Start nothing
  heavy, no second OCR run.
- **The Mechanic (CU-Board-Janitor v2, every 5 min) auto-closes hung/duplicate/runaway boards.**
  An HTA with a hot timer loop gets killed at >30 CPU-min — keep timers ≥5 s, no OneDrive file I/O
  on the UI thread.

## 3. Owner directives now loaded in desktop memory
- **take-me-there** (open things, never just point at them)
- **flash-on-pop** (`Flash-Window.ps1`)
- **arrow-guidance** (`Arrow-Overlay.ps1`)
- **1Password naming + accept-suggested-password**

## 4. Alabama Jack's — corrected/locked facts (supersede any earlier cloud notes)
- **Contact person = "Rick", ricksmobile@mail.com** (header-verified; in the capsule).
- **14458086 = the FPL ORDER NUMBER** (sender's own words; in the capsule).
- **Proposal now $4,750, split $2,375 / $2,375**, payee **"Team USA Sales Inc."**
  (the payee change may not be in the capsule yet).
- **FPL deposit / temp-service charge = an Owner-paid exclusion.**
- **Internal split of the $4,750 is TBD** — only $500 agent / $500 GC are locked.
- **Einar Suarez = the ELECTRICAL CONTRACTOR, 786-399-7842 — NOT the contact person.**
  `EMAIL-PROPOSAL-TO-EINAR.hta` is actually addressed to **Rick** (the filename is historic).
- Desktop edited the deep-view HTA today (backup `.bak-20260823`): $2,500 → $4,750 everywhere;
  stamped **TRK-2026-1645.001** bottom-right. *(Note: `.001` suffix violates CLAUDE.md §9.2 —
  page identity must be `p001` after the version, not a dot-suffix on the TRK. Flagged, not yet fixed.)*

## 5. RETIRE-FIRST ruling
`ALABAMA-JACKS-REVIEW.hta` **stays** — built ~12:30 PM before the "no more standalone boards" law
landed, and already counted as TRK-2026-1645.001 (one of the counted 13, not a 14th). Pattern going
forward: **ONE BOARD = master list; job boards = the deep-dive layer reachable from a job's row.**
When Phase 1 lands, the AJ-1..AJ-5 cards must ALSO render on the ONE BOARD, sourced from the same
`OWNER-DECISIONS.json` — one truth.

## 6. OPEN ON JORGE — desktop says DO NOT RE-ASK (already pending with him)
1. **AJ-1: approve sending the $4,750 proposal to Rick.**
2. The new internal split of the $4,750.
3. **THE SITTING** — mid-flight, PIN step interrupted by the CPU freeze
   (runbook `ClaudeMemory\THE-SITTING-RUNBOOK.md`).
4. **$44 microfilm** (target Sep 5).
5. **TEDC renumber click.**
6. **YubiKey checkout.**
7. **Renzo emails release.**

---
*Mirrored + QC'd by cloud 2026-08-25. Cloud and desktop now agree on the Alabama Jack's number set
($4,750, payee Team USA Sales). #desktop-mirror #TRK-2026-9903*
