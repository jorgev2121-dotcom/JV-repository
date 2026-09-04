# TASK REGISTER — the canonical intake log ("the CD"). Capture-first: nothing is worked before it's written here.
**TRK-2026-9776 · established 2026-09-04 on owner directive: "any request for a task automatically added to the register, so nothing gets forgotten."**

## THE RULE (standing, both Code seats)
**No task is acted on before it is written here.** The instant Jorge (or a seat) requests a task, the
receiving seat **appends a row to this file first, then works it.** A task that lives only in a
conversation dies when the conversation does (charter §10, OD-01). This is the intake gate — same
principle as orphan-onboarding's "write the row before any analysis."

- **Auto-capture is a hard rule for ☁️ Cloud and 🖥️ RAMBO** — on receiving any ask, log it here immediately.
- **Paste-tier surfaces (Chat, Cowork, phone, other LLMs) can't write here themselves** — so a task from
  them must be **echoed into this register** by whichever Code seat sees it. That is the honest limit of
  "automatic."
- Each row: **date · requested-by · task · owner-seat · status (NOT STARTED / IN PROGRESS / BLOCKED-why / DONE) · pointer** (the mailbox order or TRK).
- RED/GREEN and the caps still govern *doing*; this register only guarantees nothing is *lost*.

## ACCOUNTABILITY — both seats check this every cycle (owner directive 2026-09-04)
This file is the **accountability tracker.** On every heartbeat, each seat **reads the OPEN table and
flags what's falling through the cracks:**
- **Aging:** anything `NOT STARTED` or `IN PROGRESS` with no movement in **>48h**, or `BLOCKED` on the
  same reason for **>48h**, gets flagged.
- **Ownership:** every OPEN row must name a live owner-seat and a next step; a row with neither is itself a defect.
- **Surfacing:** stale/stuck items go to Jorge **only if they need his click**, batched; otherwise the
  seats clear or advance them between themselves (mutual aid). "Quiet" is only honest when the OPEN table
  has nothing aging.
- Update each row's status the moment it changes; move finished rows to DONE with proof. A row marked DONE
  without proof is not done (charter Rule 2).
This is the SCOREKEEPER function in its simplest form — the watchdog that catches the silent death the
backlog is full of.

---

## OPEN (as of 2026-09-04)
| Date | By | Task | Owner | Status | Pointer |
|---|---|---|---|---|---|
| 09-04 | Jorge | **GitHub sign-in on desktop** (closes the two-way loop) | Jorge | BLOCKED — owner click | OWNER-ACTIONS popup |
| 09-04 | Jorge | Build the OWNER-ACTIONS popup (sign-in + connect chrome) | RAMBO | ORDERED | HANDOFF_…owner-actions-button-popup |
| 09-04 | Jorge | Desktop cleanup by type + orphan OCR + **6 OPH numbers** | RAMBO | IN PROGRESS | WORK-ORDER_DESKTOP-CLEANUP-AND-ICONS |
| 09-04 | Jorge | **1Password single-source migration** (per-site loop) | RAMBO | ORDERED | WORK-ORDER_1PASSWORD-SINGLE-SOURCE-MIGRATION |
| 09-04 | Jorge | Document the **10–12 stored tasks** into the repo | RAMBO | ORDERED | HANDOFF_…document-the-10-12-stored-tasks |
| 09-04 | Jorge | Wire **Grok API** (find existing key, second-opinion bus) | RAMBO | ORDERED | HANDOFF_…wire-existing-LLM-api-key |
| 09-04 | Jorge | Build the desktop **VS Code chat panel** | RAMBO | NOT STARTED | FINDING_…replace-terminal-with-chat-panel |
| 09-04 | Jorge | Build the **Conductor** (after loop proven) | RAMBO | QUEUED | ORCHESTRATOR-SPEC_CONDUCTOR-01 |
| 09-04 | Cloud | Audit what else the 6pm pre-guardrail filing moved | RAMBO | ORDERED | FINDING_…reconcile-from-desktop-transcript |
| 09-04 | Jorge | **AI-BUILD LIBRARY** — keep inventoried; run the multi-LLM flaw-review pass on each item | both seats | ESTABLISHED — reviews pending Grok | AI-BUILD-LIBRARY.md |
| 09-04 | Cloud | **SessionStart hook** — prints TASK-REGISTER OPEN every session | Cloud | DONE (self-tested) | .claude/settings.json |

| 09-04 | Jorge | **ENABLE ALL-NIGHT RUNS** — elevated re-register heartbeat to run logged-off | Jorge | PENDING — owner elevation click | OWNER-ACTIONS popup ③ |
| 09-04 | Cloud | Pre-approve the GREEN command set (allow-list, NOT bypass) for smooth night runs | RAMBO | PENDING | Rule 9 / fewer-permission-prompts |
| 09-04 | Cloud | Test the wake-nudge webhook (plain curl wakes Cloud?) | RAMBO | PENDING | HANDOFF_…wake-nudge-webhook |
| 09-02 | Jorge | **Plaza — DRAFT letter to the Association** (Quanny/Silvio), NOT SENT | Jorge | AWAITING SEND DECISION (RED) | Plaza draft letter (TRK-1582-LC) |
| 09-02 | Jorge | **Plaza Unit 220** permit-extension request — unsent in Outlook Drafts | Jorge/RAMBO | AWAITING SEND | Unit-220 extension draft |
| 09-02 | Cloud | **Plaza Unit 721** — expired permit, ~151-day reissue window (to ~2027-01-31) | RAMBO | FLAGGED — time-sensitive | Plaza report §5 |
| 09-01 | Cloud | **Plaza — 4 Impact Windows COIs all expired**, none names The Plaza | RAMBO | LOGGED — surface if Association asks | GC-Insurance-Cert report |
| 09-04 | Jorge | **3 safe follow-up emails** (close NOV; Plaza follow-up; Monroe permit) | Cloud | HOLD — awaiting owner "send" | Gmail drafts |
| 09-04 | Jorge | **4 attachment emails** (Miami Art House ×2; Unit 404 docs; MZ COI) | RAMBO | TO SEND (attachments) | Gmail drafts |
| 09-04 | Jorge | **Local business tax license** login + pay (Miami-Dade Clerk/consenthub) | Jorge/RAMBO | BLOCKED — owner login | Clerk temp pw in mail |
| 09-04 | Cloud | **Multi-LLM flaw-review pass** on AI-BUILD-LIBRARY items | both seats | PENDING GROK (independent reviewer) | AI-BUILD-LIBRARY |
| 09-04 | Cloud | Reconcile the stray branch `claude/chaude-code-max20-kp2o46` (unmerged commits) | RAMBO | OPEN | branch cleanup |
| 09-04 | Jorge | **OCR sweep 2022→present** (needs an interactive desktop window) | RAMBO | BLOCKED — interactive | OCR sweep |
| 09-04 | Jorge | **Alec big jacket books** (10362, 1840) | RAMBO | NOT STARTED | Alec DD books |
| 09-04 | Jorge | **⚡ KILL the frozen looping "onlineservices.miamidade" window** (2h stuck) + prevent recurrence | RAMBO | URGENT | HANDOFF_…kill-frozen-miamidade-window |
| 09-04 | Jorge | **OCR inventory Jan-2022→present** — done vs remaining, with a denominator | Cloud (Drive est., running) + RAMBO (authoritative) | IN PROGRESS | HANDOFF_…ocr-inventory-denominator |

## DONE (recent)
| Date | Task | Proof |
|---|---|---|
| 09-04 | HOA $555 paid (by phone) — AP-0001 closed | owner report |
| 09-04 | HOA $180/mo = bank ACH auto-debit + monthly verify reminder | calendar 6jbgnb2hjs693fgsqvbm8gm9k4 |
| 09-04 | File the nine client docs into capsules | RAMBO DONE report |
| 09-04 | Desktop heartbeat VTES-Repo-Heartbeat live (3-min) | RAMBO DONE report |
| 09-04 | Four Claude launcher icons built | RAMBO DONE report |

#TRK-2026-9776 #task-register #capture-first #the-CD #dont-lose-work
