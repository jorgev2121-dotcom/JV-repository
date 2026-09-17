# 🧠 BUSINESS BRAIN — the company's memory (migration dashboard + inventory)
**TRK-2026-9794 · ☁️ Cloud · renamed from ATLAS-INDEX 2026-09-17.**
**ATLAS is the project (the reorg). The Business Brain is the company's memory — different things.**

---

## 🏛️ Principle 0 — PORTABILITY / MODEL-NEUTRALITY (owner executive decision, 2026-09-17)
**Nothing in ATLAS or the Business Brain ever belongs to a particular AI.** Not "Claude Memory," not
"ChatGPT Memory," not "Gemini Notes. **It all belongs to the Business Brain — the company's asset.**
Claude is helping *build* it; Jorge *governs* it. If a future model surpasses today's, it **inherits**
the Business Brain rather than starting over. **Practical consequences, binding on every seat:**
- Store memory in these open repo/Drive files (plain Markdown), never inside any vendor's private memory feature.
- Write vendor-neutral: describe the role ("the desktop executor," "the cloud seat"), not the brand, wherever the brand isn't load-bearing.
- Any new knowledge an AI produces lands here, portable, so no single model is a point of failure.

---

## Governing rules for this phase
**Rule 1.2 (owner, 2026-09-17):** every item carries a **Migration Status**. This table is the migration dashboard.
Status vocabulary: **Moved · Held · Locked · Needs Rewrite · Deprecated · Archive Candidate.**

**Executive Directive ED-001 (owner, 2026-09-17):** from Batch 4 on, every item records dependencies in THREE kinds —
- **Operational** = other docs/policies it relies on to be used correctly.
- **Automation** = skills, hooks, scheduled tasks, or agents that read it or that it triggers.
- **Knowledge** = domain knowledge/reference it draws on.

**On a movement-blocking dependency: do NOT repair, do NOT work around. Mark Held, record exactly what references it, continue the batch.** Objective of this phase is **discovery, not optimization.**

**Executive Directive ED-003 (owner, 2026-09-17):** every automation discovered gets an **Execution Profile** —
Name · Trigger · Frequency · Runs On · Dependencies · Failure Mode · Human Approval · Current Health.
Registry: `atlas/automations/AUTOMATION-REGISTRY.md`. Desktop-only automations Cloud cannot verify read **Unknown (not verifiable from Cloud)** until RAMBO confirms.

**Confidence key:** High = Cloud has read the file · Medium = inferred from title + context · Low = guess.

---

## 🔒 Anchors (Locked — the machine reads them by exact path; never move)
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| CLAUDE.md | Governance | Master operating charter | — | Read at start by every Claude Code seat | Full business context | **Locked** | High |
| .claude/skills/ | Skill | All 5 skills (tax-jacket, permit-expert, orphan-onboarding, portal-registration) | — | Loaded automatically only from this path | Per-skill domain | **Locked** | High |
| TASK-REGISTER.md | Governance | Canonical intake log | — | Read by SessionStart hook + stop hook | — | **Locked** | High |

## Batch 1 — RAMBO → atlas/rambo/
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| AGENT-RIDER_EXECUTOR-01 | Governance | Rider that created & scoped RAMBO (test-before-ship, 4 lanes, 1Password guardrail) | CLAUDE.md | RAMBO desktop seat | 1Password, microfilm payments | Moved | High |
| RAMBO-CAPABILITY-SHEET_TRK-2026-9791 | Reference | One-page reference of RAMBO's charter/lanes/hooks/tools/connectors/RED limits | AGENT-RIDER, CLAUDE.md | — | Integration map, autonomy arch | Moved | High |
| DESKTOP-CANNOT-READ-THE-CHARTER | Incident | Finding: desktop seat wasn't loading the charter | CLAUDE.md | RAMBO session start | — | Moved | High |

## Batch 2 — Owner Directives → atlas/owner-directives/
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01 | Governance | OD-01: every message ends with a question | CLAUDE.md §8 | All seats' reply flow | — | Moved | High |
| OWNER-DIRECTIVE_HOA-AUTOPAY-01 | Governance | How HOA one-time / autopay is set up | — | portal-registration skill | HOA/portal payment | Moved | Medium |
| OWNER-DIRECTIVE_ONE-EXECUTOR-MANY-BRAINS-01 | Governance | Rule 10: one hand (RAMBO); other LLMs via API only | CLAUDE.md §14 | RAMBO, API bus | LLM landscape | Moved | High |
| OWNER-DIRECTIVE_PROACTIVE-DESKTOP-01 | Governance | RAMBO fixes stuck mechanics; owner gets only the RED click | AGENT-RIDER | RAMBO desktop seat | — | Moved | High |
| OWNER-DIRECTIVE_THAW-01 | Governance | Lifts the build-freeze; guardrails stay | CLAUDE.md §12 | New-agent builds | — | Moved | High |
| OWNER-DIRECTIVE_WINDOW-HYGIENE-01 | Governance | Window identity/routing discipline | CLAUDE.md §10 | All seats | — | Moved | Medium |
| OWNER-GATES.md | Governance | The RED gates owner must click before an irreversible action | AUTONOMY.md | RED/GREEN enforcement | — | Moved | Medium |
| OWNER-QUEUE.md | Governance | Owner-facing queue, small-screen/iPhone | AUTONOMY-ARCHITECTURE | iPhone window, push | — | Moved | Medium |
| DIRECTIVE_MANAGER-01_INTAKE-01 | Governance | How tasks enter the system | TASK-REGISTER.md | Intake capture | — | Moved | Medium |

## Batch 3 — SOPs → atlas/sops/
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| NIGHT-PROTOCOL.md | SOP | Overnight long-run protocol (queue never empty; detect dead runs) | OVERNIGHT-QUEUE, CLAUDE.md §11 | Overnight watcher / scheduled task | — | Moved | High |
| HANDOFF-PROTOCOL_TWO-SEAT-01.md | SOP | Cloud ⇄ Desktop handoff, no human in the middle | mailbox/ | RAMBO + Cloud heartbeats | — | Moved | High |
| ORPHAN-ONBOARDING-SWEEP.md | SOP | Sweep every holding area, split by who can reach it | ORPHAN-NUMBERING | orphan-onboarding skill | Filing system | Moved | High |
| RECONCILER-OUTPUT-CHECK-SPEC.md | SOP | Spec for checking reconciler output (TRK-9114) | — | reconciler runs | Ledger/invoice data | Moved | Medium |
| OCR-PROTOCOL.md | SOP | How a scanned/photographed doc becomes findable and filed | ORPHAN-NUMBERING | orphan-onboarding skill, night OCR sweep | OCR, folio format | Moved | High |

## Executive layer → atlas/executive/  (created 2026-09-17, not migrated — born here)
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| OPERATIONS-CENTER.md | Executive | The front door / console: live status board, RED-needs-Jorge, the whole map | all executive docs, BUSINESS-BRAIN | reflects system status | Whole-business state | Moved | High |
| EXECUTIVE-DASHBOARD.md | Executive | One screen: workstreams, blockers, migration status; links the others | BUSINESS-BRAIN, the other execs | — | Whole-business state | Moved | High |
| CAPABILITY-REGISTRY.md | Executive | What the system can do; LIVE/PARTIAL/DOWN/PLANNED | RAMBO sheet, connectors | reflects skills/heartbeat | Capability landscape | Moved | High |
| DECISION-LOG.md | Executive | Every decision, dated, with the reason | — | — | Session/owner history | Moved | High |
| RISK-REGISTER.md | Executive | Ranked risks + mitigations + owners | — | reflects automation health | Operational risk | Moved | High |
| BUSINESS-VOCABULARY.md | Executive | Plain-language glossary of our terms | — | — | All domains | Moved | High |
| SYSTEM-OBSERVABILITY.md | Executive | What we can/can't see; blind spots + health status cards + first-light plan | AUTOMATION-REGISTRY, RISK-REGISTER | reflects every automation's sensor | Dead-sensor history (RI-015) | Moved | High |
| INFRASTRUCTURE-REGISTER.md | Executive | The plumbing punch list behind "Infra 18%": component · status · blocker · action | SYSTEM-OBSERVABILITY, RISK-REGISTER | Remote Control, hooks, scheduled tasks | Machine/network infra | Moved | High |

## Batch 4 — Connectors → atlas/connectors/
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| INTEGRATION-MAP_ALL-SURFACES-01.md | Connector | Every AI surface and how far each can join the loop (Tier 1/2/3) | HANDOFF-PROTOCOL_TWO-SEAT-01 | Cloud + RAMBO heartbeats; Zapier/CData | Cross-LLM capability ceilings | Moved | High |
| LLM-SUBSCRIPTIONS.md | Connector | Contact sheet + usage/balance, one block per provider | — | **FUTURE: token agent / Conductor Part 1 reads it (not yet built — flag if built expecting root path)** | Provider account/usage | Moved | High |
| WINDOW-CONFIG_ALL-SURFACES_2026-08-24.md | Connector | Claude windows configuration & restore sheet | WINDOW-HYGIENE-01 | Per-session specs | — | Moved | Medium |

## Batch 5 — Automations → atlas/automations/
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| AUTONOMY.md | Automation | What an executor may do without asking | RED/GREEN, OWNER-GATES | enforced by every seat | — | Moved | High |
| AUTONOMY-ARCHITECTURE.md | Automation | How to get Jorge out of the loop (Remote Control / heartbeat / files) | HANDOFF-PROTOCOL | heartbeat, cloud triggers | — | Moved | High |
| ORCHESTRATOR-SPEC_CONDUCTOR-01.md | Automation | Spec for the always-on local orchestrator (redundancy) | LLM-SUBSCRIPTIONS | PLANNED Conductor | Token/subscription mgmt | Moved | High |
| OVERNIGHT-QUEUE.md | Automation | Mundane batch work queued for the night | NIGHT-PROTOCOL | overnight watcher | — | Moved | High |
| HEARTBEAT-BASELINES_2026-08-18.md | Automation | Baselines so a hang can be told from a run | — | heartbeat health check | — | Moved | Medium |
| PANEL-ENHANCEMENTS.md | Automation | Backlog for window router (F8) + subscriptions launcher (F9) | WINDOW-CONFIG | desktop panels | — | Moved | Medium |
| AUTOMATION-REGISTRY.md *(born here, ED-003)* | Automation | Execution Profiles for every automation | AUTONOMY-ARCHITECTURE | catalogs all automations | — | Moved | High |

---

## ⛔ HELD (Rule 6 / ED-001 — a skill reads these by bare name; moving breaks the skill)
| File | Category | Purpose | Operational Deps | Automation Deps | Knowledge Deps | Migration Status | Confidence |
|---|---|---|---|---|---|---|---|
| ORPHAN-NUMBERING.md | SOP | The `OPH` orphan-numbering standard | CLAUDE.md §9 | **`orphan-onboarding` skill reads it by bare name (2×)** | Numbering scheme | **Held** | High |
| DD-WRITEUP-TEMPLATE.md | Template | Fixed format every DD write-up follows | — | **`permit-expert` + `tax-jacket` skills read it by bare name** | Permit/DD narrative | **Held** | High |

**Held-item resolution (standardize phase, later):** move the file AND update the skill's path reference in the SAME commit, then verify the skill still loads. Recorded, not fixed now (ED-001).
