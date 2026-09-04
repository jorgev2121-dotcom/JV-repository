# AI-BUILD LIBRARY — every program, connector, hook, skill & system built by AI, inventoried + reviewed
**TRK-2026-9777 · established 2026-09-04 on owner directive · this is the JOB-0086 LIBRARIAN-RND idea, now real.**

## Purpose & the review rule
A single catalog of everything the AI seats have created, so nothing is orphaned, unowned, or trusted
blind. **Every artifact here must be scrutinized by ≥2 independent reviewers to find flaws + fixes before
it is marked TRUSTED.** Ties to Rule 10: outside-built code is untrusted until reviewed.

- **Review status:** `UNREVIEWED` → `SELF-TESTED` (author tested it) → `PEER-REVIEWED` (1 other model) →
  `MULTI-REVIEWED` (2+ **independent** models, flaws logged) → `TRUSTED` / `FLAWS-OPEN` / `FIXED`.
- **Honest limit on "multiple LLMs":** today the reviewers are ☁️ Cloud and 🖥️ RAMBO — **both Claude**, so
  cross-review is real but not fully independent. It becomes genuinely multi-vendor only once **Grok (API)**
  is wired as a third reviewer (GPT/Gemini optional). Until then, mark such reviews `PEER-REVIEWED`, not
  `MULTI-REVIEWED`.
- **Hashtags** go in each row so items are findable by category (#script #hook #connector #skill #protocol #hta #pending-review …).
- **Intake rule:** anything the seats build gets a row here the moment it's created (capture-first, like TASK-REGISTER).

---

## Scripts & programs
| Item | Where | Purpose | By | Review | Tags |
|---|---|---|---|---|---|
| VTES-Repo-Heartbeat.ps1 | desktop `~\OneDrive\Scripts` | 3-min repo pull + RED/GREEN triage + reply | RAMBO | PEER-REVIEWED (Cloud design + RAMBO tested; 3 defects fixed) | #script #heartbeat |
| Build-OutboxTrueDateIndex.ps1 | desktop `~\OneDrive\Scripts` | true-date index of the Outbox | RAMBO | SELF-TESTED | #script |
| build_10980_book.py | Cloud scratchpad | tax-jacket PDF builder (cv2 polaroid extract) | Cloud | SELF-TESTED | #script #pdf |
| Four Claude launcher icons | desktop | one shortcut per seat | RAMBO | SELF-TESTED (1st build discarded, redone+verified) | #desktop #icons |
| OWNER-ACTIONS popup (.hta) | desktop (ordered) | one-click sign-in + connect-chrome | RAMBO | UNREVIEWED — pending build | #hta #pending |
| The Conductor | spec only | deterministic always-on orchestrator | — | SPEC ONLY (not built) | #orchestrator #pending |

## Hooks
| Item | Where | Purpose | Review | Tags |
|---|---|---|---|---|
| SessionStart → print TASK-REGISTER OPEN | repo `.claude/settings.json` | every session starts aware of pending tasks | SELF-TESTED (Cloud pipe-tested + jq-validated) | #hook #accountability |

## Connectors (MCP / API — inventory + auth state)
| Connector | Reaches | Auth | Tags |
|---|---|---|---|
| Gmail | mail read/send | OK (Cloud) | #connector |
| Google Drive / Calendar | files, events | OK (Cloud) | #connector |
| Microsoft 365 / Outlook | mail, SharePoint | OK (owner reconnected 2026-09-04) | #connector |
| GitHub (MCP) | repo/PRs | OK | #connector |
| Zapier | 9,000+ apps | connected, no LLM action enabled | #connector |
| CData Connect | data sources | connected | #connector |
| Claude_Code_Remote | sessions/triggers | OK | #connector |
| **Grok / xAI API** | second-opinion brain | **PENDING — RAMBO to find the key** | #connector #pending #llm |

## Skills (AI-authored)
| Skill | Purpose | Review | Tags |
|---|---|---|---|
| portal-registration | register/pay vendor portals | owner-ratified | #skill |
| tax-jacket | county jacket → ORIGINAL/ENHANCED/FINAL | owner-ratified | #skill |
| orphan-onboarding | loose doc → OPH/TRK filing | in use | #skill |

## Protocols & systems (AI-authored docs)
| Doc | Purpose | Tags |
|---|---|---|
| HANDOFF-PROTOCOL_TWO-SEAT-01 | Cloud⇄Desktop mailbox + heartbeats + mutual aid | #protocol |
| INTEGRATION-MAP_ALL-SURFACES-01 | who can join the loop vs paste-only | #protocol |
| ORCHESTRATOR-SPEC_CONDUCTOR-01 | redundancy / failover orchestrator | #protocol #pending |
| TASK-REGISTER | capture-first accountability tracker | #protocol #accountability |
| OD-ONE-EXECUTOR-MANY-BRAINS-01 (Rule 10) | one executor, brains via API | #protocol #directive |

---

## The multi-LLM scrutiny pass (how items become TRUSTED)
For each `UNREVIEWED`/`SELF-TESTED` item: route it to a second (and, once Grok is wired, a third
**independent**) model with the prompt *"find flaws and propose fixes — do not agree."* Log each reviewer's
findings verbatim, apply fixes, then mark `MULTI-REVIEWED` / `TRUSTED`. This is the second-opinion bus
(JOB-0096) pointed at our own build output. **No AI-built script is installed/run in production until it
clears this pass** (Rule 10). Anything both reviewers independently flag jumps the fix queue.

#TRK-2026-9777 #ai-build-library #inventory #multi-llm-review #librarian-rnd #rule-10
