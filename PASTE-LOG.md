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
