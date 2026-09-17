# 🧠 ATLAS INVENTORY — the seed of the Business Brain
**TRK-2026-9794 · ☁️ Cloud · owner directive 2026-09-17: produce an inventory as the migration goes; it seeds the Business Brain.**

**Columns (owner spec):** File · Category · Purpose · Dependencies · Confidence.
**Confidence key:** High = Cloud has read the file · Medium = inferred from title + context · Low = guess.
Metadata lives here (central index), not in file headers, so the migration stays a clean move.

---

| File | Category | Purpose | Dependencies | Confidence |
|---|---|---|---|---|
| atlas/rambo/AGENT-RIDER_EXECUTOR-01 | Governance | Charter rider that created & scoped RAMBO — test-before-ship, the 4 lanes, 1Password guardrail, proactive execution | CLAUDE.md | High |
| atlas/rambo/RAMBO-CAPABILITY-SHEET_TRK-2026-9791 | Reference | One-page reference: RAMBO's charter, lanes, hooks, tools, connectors, RED limits | AGENT-RIDER, CLAUDE.md, INTEGRATION-MAP, AUTONOMY-ARCHITECTURE | High |
| atlas/rambo/DESKTOP-CANNOT-READ-THE-CHARTER | Incident | Finding: desktop seat was not loading the charter at start | CLAUDE.md | High |
| atlas/owner-directives/OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01 | Governance | OD-01: every outbound message ends with a question | CLAUDE.md §8 | High |
| atlas/owner-directives/OWNER-DIRECTIVE_HOA-AUTOPAY-01 | Governance | How HOA one-time payment / autopay is set up | portal-registration skill | Medium |
| atlas/owner-directives/OWNER-DIRECTIVE_ONE-EXECUTOR-MANY-BRAINS-01 | Governance | Rule 10: one hand on the machine (RAMBO); other LLMs are brains via API only | CLAUDE.md §14 | High |
| atlas/owner-directives/OWNER-DIRECTIVE_PROACTIVE-DESKTOP-01 | Governance | RAMBO fixes stuck mechanics; hands owner only the RED click | AGENT-RIDER | High |
| atlas/owner-directives/OWNER-DIRECTIVE_THAW-01 | Governance | Lifts the build-freeze; safety guardrails stay | CLAUDE.md §12 | High |
| atlas/owner-directives/OWNER-DIRECTIVE_WINDOW-HYGIENE-01 | Governance | Window identity / routing discipline (which seat is which) | CLAUDE.md §10 | Medium |
| atlas/owner-directives/OWNER-GATES.md | Governance | The RED gates the owner must click before an irreversible action | AUTONOMY.md | Medium |
| atlas/owner-directives/OWNER-QUEUE.md | Governance | Owner-facing action queue, written for a small screen / iPhone | AUTONOMY-ARCHITECTURE | Medium |
| atlas/owner-directives/DIRECTIVE_MANAGER-01_INTAKE-01 | Governance | Manager/intake directive — how tasks enter the system | TASK-REGISTER.md | Medium |
| atlas/sops/NIGHT-PROTOCOL.md | SOP | Standing protocol for overnight long runs (queue never empty, detect a dead run) | OVERNIGHT-QUEUE, CLAUDE.md §11 | High |
| atlas/sops/HANDOFF-PROTOCOL_TWO-SEAT-01.md | SOP | Cloud ⇄ Desktop handoff with no human in the middle | mailbox/, RAMBO, Cloud | High |
| atlas/sops/ORPHAN-ONBOARDING-SWEEP.md | SOP | Sweep every holding area, split by who can reach it | orphan-onboarding skill, ORPHAN-NUMBERING | High |
| atlas/sops/RECONCILER-OUTPUT-CHECK-SPEC.md | SOP | Spec for checking reconciler output (TRK-2026-9114) | reconciler runs | Medium |
| atlas/sops/OCR-PROTOCOL.md | SOP | How a scanned/photographed doc becomes findable and filed | orphan-onboarding skill, night OCR sweep | High |

---

## ⛔ HELD AT ROOT — Rule 6 (a skill reads these by name; moving breaks the skill)
| File | Category | Purpose | Dependencies | Confidence |
|---|---|---|---|---|
| ORPHAN-NUMBERING.md | SOP | The `OPH` orphan-numbering standard | **read by `.claude/skills/orphan-onboarding/SKILL.md` (twice, by bare name)** | High |
| DD-WRITEUP-TEMPLATE.md | Template | Fixed format every due-diligence write-up follows | **read by `permit-expert` + `tax-jacket` skills (by bare name)** | High |

**To move these later (standardize phase):** update the skill files to point at the new `atlas/sops/` path *in the same commit* as the move, then verify the skills still load. Not done now, per Rule 6 (record, don't fix mid-migration).
