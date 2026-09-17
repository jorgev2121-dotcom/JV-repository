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
**Metadata:** indexed in `atlas/ATLAS-INDEX.md` (owner directive 2026-09-17: metadata via central index, not per-file headers).

---

## Batch 2 — Owner Directives  → `atlas/owner-directives/`  (2026-09-17 ~04:34 UTC)

9 files moved via `git mv` (history preserved), all verified in destination:
OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01 · HOA-AUTOPAY-01 · ONE-EXECUTOR-MANY-BRAINS-01 · PROACTIVE-DESKTOP-01 · THAW-01 · WINDOW-HYGIENE-01 · OWNER-GATES.md · OWNER-QUEUE.md · DIRECTIVE_MANAGER-01_INTAKE-01.

**Automation/hook/script references to old paths:** NONE (grep over `.claude/`, `~/.claude/*.sh`). No stop-and-record needed.

**Plain doc-to-doc text mentions (non-breaking; recorded per Rule 4, NOT rewritten per Rule 7):**
- OWNER-GATES.md → mentioned in OPEN-ITEMS.md, UNFINISHED-WORK-AUDIT.md, MORNING-REPORT.md
- OWNER-QUEUE.md → mentioned in OPEN-ITEMS.md, STATUS.md, MORNING-REPORT_2026-08-19.md, AUTONOMY-ARCHITECTURE.md
- OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01 → mentioned in CLAUDE.md (a "See …" pointer; charter still loads normally — CLAUDE.md itself did not move)
- others: no doc mentions

**Data loss:** none — 9 in, 9 out, contents intact.
**Metadata:** indexed in `atlas/ATLAS-INDEX.md`.
**Rollback:** `git mv atlas/owner-directives/<file> ./<file>` per file, or `git revert` the batch commit.

---

## Batch 3 — SOPs  → `atlas/sops/`  (2026-09-17 ~04:42 UTC)

**Moved (5, via `git mv`, verified):** NIGHT-PROTOCOL · HANDOFF-PROTOCOL_TWO-SEAT-01 · ORPHAN-ONBOARDING-SWEEP · RECONCILER-OUTPUT-CHECK-SPEC · OCR-PROTOCOL.

**⛔ STOP-AND-RECORD (Rule 6) — 2 files HELD at root, NOT moved:**
- **ORPHAN-NUMBERING.md** — `.claude/skills/orphan-onboarding/SKILL.md` reads it by bare name twice ("Read ORPHAN-NUMBERING.md for the current high-water mark"). Moving it would break the orphan-onboarding skill.
- **DD-WRITEUP-TEMPLATE.md** — `permit-expert` and `tax-jacket` skills reference it by bare name. Moving it would break those skills.
- **Resolution (deferred to standardize phase):** move the file AND update the skill's path reference in the SAME commit, then verify the skill loads. Recorded, not fixed now.

**Other automation/hook references to the 5 moved files:** NONE.
**Inventory:** all batches re-cut into the owner's Business-Brain columns (File · Category · Purpose · Dependencies · Confidence) in `atlas/ATLAS-INDEX.md`.
**Data loss:** none — 5 in, 5 out, 2 intentionally held.
**Rollback:** `git mv atlas/sops/<file> ./<file>` per file, or `git revert` the batch commit.
