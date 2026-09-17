# 🗂️ ATLAS INDEX — purpose · owner · related · dependencies
**TRK-2026-9794 · ☁️ Cloud · one row per document moved into ATLAS.**
Metadata lives here (not in file headers) so the migration stays a clean move, not an edit of every body.
Purpose lines are Cloud's summaries; correct any that are off.

---

## atlas/rambo/
| File | Purpose | Owner | Related | Dependencies |
|---|---|---|---|---|
| AGENT-RIDER_EXECUTOR-01_2026-08-29 | Charter rider that created & scoped RAMBO — test-before-ship, the 4 lanes, 1Password guardrail, proactive execution | Jorge (ratified) | RAMBO, 1Password migration, JOB-0079 | extends CLAUDE.md |
| RAMBO-CAPABILITY-SHEET_TRK-2026-9791 | One-page plain-language reference: RAMBO's charter, lanes, hooks, tools, connectors, RED limits | Cloud (author) / Jorge (requested) | RAMBO, Connectors | AGENT-RIDER, CLAUDE.md, INTEGRATION-MAP, AUTONOMY-ARCHITECTURE |
| DESKTOP-CANNOT-READ-THE-CHARTER_2026-08-18 | Incident finding: the desktop seat was not loading the charter at start | Cloud / Jorge | RAMBO, charter-loading | CLAUDE.md |

## atlas/owner-directives/
| File | Purpose | Owner | Related | Dependencies |
|---|---|---|---|---|
| OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01_2026-08-15 | OD-01: every outbound message ends with a question (turn-taking) | Jorge | all seats, all comms | CLAUDE.md §8 |
| OWNER-DIRECTIVE_HOA-AUTOPAY-01_2026-08-30 | How HOA one-time payment / autopay is set up | Jorge | Cash collection, portals | portal-registration skill |
| OWNER-DIRECTIVE_ONE-EXECUTOR-MANY-BRAINS-01_2026-09-04 | Rule 10: one hand on the machine (RAMBO); other LLMs are brains via API only | Jorge | RAMBO, Connectors | CLAUDE.md §14 |
| OWNER-DIRECTIVE_PROACTIVE-DESKTOP-01_2026-08-31 | RAMBO fixes stuck mechanics automatically, hands owner only the RED click | Jorge | RAMBO | AGENT-RIDER |
| OWNER-DIRECTIVE_THAW-01_2026-08-30 | Lifts the build-freeze; safety guardrails (RED/GREEN, caps) stay | Jorge | Freeze-and-Finish, new agents | CLAUDE.md §12 |
| OWNER-DIRECTIVE_WINDOW-HYGIENE-01_2026-08-30 | Window identity/routing discipline (which seat is which) | Jorge | all seats | CLAUDE.md §10 |
| OWNER-GATES.md | The RED gates the owner must click before an irreversible action | Jorge | Autonomy, RED/GREEN | AUTONOMY.md |
| OWNER-QUEUE.md | Owner-facing action queue, written for a small screen / iPhone | Jorge | Autonomy, iPhone window | AUTONOMY-ARCHITECTURE |
| DIRECTIVE_MANAGER-01_INTAKE-01_2026-08-18 | Manager/intake directive — how tasks enter the system | Jorge | Intake, TASK-REGISTER | TASK-REGISTER.md |
