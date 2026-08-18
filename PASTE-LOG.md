# PASTE-LOG.md — Numbered paste blocks

**Problem this solves:** Jorge runs several Claude windows at once. When a reply
contains a block of text to paste somewhere, it is easy to lose track of which block
belongs in which window, and whether it was ever pasted at all.

---

## The scheme

Every paste block gets a permanent ID. **Numbers never reset and are never reused** —
the same rule as tracking numbers.

```
PASTE-D-001    →  paste into DESKTOP Claude Code
PASTE-C-001    →  paste into CLOUD Claude (claude.ai/code)
PASTE-X-001    →  paste somewhere else (named in the block)
```

**D** = Desktop. **C** = Cloud. **X** = elsewhere.

Reading sections in a reply are labelled **Section A, Section B, Section C**. Those
are for navigation only — they are never pasted anywhere.

**How to use it:** say "done with PASTE-D-002" or "PASTE-D-001 failed." That is
enough to identify it exactly, with no description needed.

---

## Rules

1. Every paste block in a reply carries its ID **on the first line inside the block**,
   so the ID travels with the text even when copied.
2. A paste is `ISSUED` until Jorge confirms. Confirmation is required — per
   `CLAUDE.md` Rule 2, an unconfirmed paste is not done.
3. If a block is replaced, the old ID is marked `SUPERSEDED` and points at the new
   one. Old IDs are never silently reused.
4. Anything requiring more than one window gets one ID per window, never a combined
   block.

---

## Issued

| ID | Date | Destination | Subject | Status |
|---|---|---|---|---|
| PASTE-D-001 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Bridge picker: MS Store button fails; launch by AppUserModelID. Terminal profile repair. Outlook `/cleanreminders`. Load the charter. | SUPERSEDED by PASTE-D-003 |
| PASTE-D-002 | 2026-08-15 | Desktop — same window | Stop building the OneDrive mailbox; use the repo. Pull the branch, read the charter, execute TRK-2026-9017. | SUPERSEDED by PASTE-D-003 |
| PASTE-D-003 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Consolidates D-001 and D-002 into one block: load charter, execute TRK-2026-9017, fix bridge button, repair terminal profile, clear Outlook reminder. | SUPERSEDED by PASTE-D-005 |
| PASTE-D-004 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | **Run BEFORE D-003.** Unpin Haiku 4.5 from `.claude\settings.json` and restart on Opus. See RI-008. | SUPERSEDED by PASTE-D-005 |
| PASTE-D-005 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Single pointer block. Merges D-003 + D-004. Fix model, restart, then work `mailbox/to-desktop/WORK-QUEUE.md` top to bottom. Survives restart because the work lives in the repo. | SUPERSEDED by PASTE-D-006 |
| PASTE-D-006 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Fix model, restart, pull repo, work WORK-QUEUE.md. | SUPERSEDED by PASTE-D-007 |
| PASTE-D-007 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | **One sentence.** "Check the mailbox in Drive." Everything else now lives in `G:\My Drive\_CLAUDE-MAILBOX\TO-DESKTOP.md`, written by cloud directly. | SUPERSEDED by PASTE-D-008 |
| PASTE-D-008 | 2026-08-16 | Desktop — "Investigate Claude Code se…" | Pull the repo for the new `orphan-onboarding` skill, then work `TASK-07` (heartbeat) and `TASK-08` (orphan sweep + the 22 county sites) from the Drive mailbox. | ISSUED |
| PASTE-D-009 | 2026-08-17 | Desktop — live executor session, C:\Users\JV | **One pointer.** Read `G:\My Drive\VTES-Inbox\TONIGHT-QUEUE_2026-08-17_ORDERED.md` and work it top to bottom. Four items, shortest first: verifier→roster · jacket hunt (9230) · **the 22×5 proof of concept (9250)** · tray launchers (9246). Nothing filed while Jorge is out. | ISSUED |

---

## Confirmed

*Blocks move here once Jorge reports the result, with the outcome recorded.*

| **PASTE-D-010** | 2026-08-18 06:30 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Reply on the Clerk two-line framing, the corrected liveness rule for snapshot files, and the `FileNotContains` gap | `PASTE-D-010_REPLY-TWO-LINES-AND-MY-BASELINE-WAS-WRONG_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-011** | 2026-08-18 07:24 UTC | Desktop → Cloud (inbound) | Run counter staged; the reconciler's stale list is producing false deaths | `PASTE-D-011_YES-RUN-COUNTER-STAGED-AND-YOUR-STALE-LIST-IS-FALSE_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-012** | 2026-08-18 08:20 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Bundle the run counter and `kind` field as one change; my liveness check was measuring Drive sync | `PASTE-D-012_ONE-CHANGE-AND-MY-MEASURING-CHANNEL-WAS-ALSO-WRONG_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-013** | 2026-08-18 08:42 UTC | Desktop → Cloud (inbound) | Bundled stager built; Drive is not dropping runs — the cause was aliasing | `PASTE-D-013_TWO-RUNS-ONE-CODE_AND-DRIVE-IS-NOT-DROPPING-RUNS_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-014** | 2026-08-18 09:25 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Hold the `kind` rollout for a positive control, not a clock; morning report consolidated | `PASTE-D-014_HOLD-BUT-NOT-FOR-24-HOURS_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-015** | 2026-08-18 09:10 UTC | Desktop → Cloud (inbound) | Positive control run green without applying: 5 of 5, live roster untouched; the 3-of-4 read-back trap | `PASTE-D-015_POSITIVE-CONTROL-RUN-GREEN-WITHOUT-APPLYING_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-016** | 2026-08-18 10:15 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Pre-flight the fixture on Bridge and Cowork; night closed from the cloud side | `PASTE-D-016_PREFLIGHT-YES-AND-THE-NIGHT-IS-CLOSED_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-017** | 2026-08-18 10:23 UTC | Desktop → Cloud (inbound) | Pre-flight run: there is no second loop; `Update-Wins-Fails.ps1` must not get the gate; passcode direct not mailbox | `PASTE-D-017_PREFLIGHT-RUN-THERE-IS-NO-SECOND-LOOP_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-018** | 2026-08-18 11:15 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Agreed on all four; the disproved claim was the desktop's own; passcode protocol adopted | `PASTE-D-018_AGREED-ON-ALL-FOUR-AND-THE-CLAIM-WAS-YOURS_TRK-2026-9299_2026-08-18.md` |
