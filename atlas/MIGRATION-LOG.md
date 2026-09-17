# 🗺️ ATLAS MIGRATION LOG
**TRK-2026-9794 · started 2026-09-17 by ☁️ Cloud · owner-approved controlled batch reorg.**

**Rules in force:** 3 root anchors stay put until the end (CLAUDE.md, .claude/skills/, TASK-REGISTER.md) ·
one category per batch · verify before continuing · no renames this phase · if an automation/scheduled
task references an old path, STOP and record (don't fix) · all moves via `git mv` (history-preserving,
rollback = `git mv` back or `git revert`).

---

## Batch 1 — RAMBO  → `atlas/rambo/`  (2026-09-17 ~04:28 UTC)

| Source (root) | Destination | Time (UTC) | Method | Status |
|---|---|---|---|---|
| AGENT-RIDER_EXECUTOR-01_2026-08-29.md | atlas/rambo/ | 2026-09-17 04:28 | git mv | OK |
| RAMBO-CAPABILITY-SHEET_TRK-2026-9791.md | atlas/rambo/ | 2026-09-17 04:28 | git mv | OK |
| DESKTOP-CANNOT-READ-THE-CHARTER_2026-08-18.md | atlas/rambo/ | 2026-09-17 04:28 | git mv | OK |

**Automation/hook/script references to old paths:** NONE found (grep over `.claude/`, `~/.claude/*.sh`). No stop-and-record needed.

**Plain doc-to-doc text mentions (not links, do not break; recorded per Rule 4, NOT rewritten per Rule 7):**
- `AGENT-RIDER_EXECUTOR-01_2026-08-29.md` mentioned in: PASTE-LOG.md, OPEN-ITEMS.md, mailbox/to-desktop/WORK-ORDER_M365-RESET_PAPERPORT_OVERLAY_2026-08-29.md
- `RAMBO-CAPABILITY-SHEET_TRK-2026-9791.md` mentioned in: PASTE-LOG.md
- `DESKTOP-CANNOT-READ-THE-CHARTER_2026-08-18.md`: none

**Data loss:** none — 3 files in, 3 files out, contents verified intact.
**Rollback for this batch:** `git mv atlas/rambo/<file> ./<file>` for each, or `git revert` the batch commit.
