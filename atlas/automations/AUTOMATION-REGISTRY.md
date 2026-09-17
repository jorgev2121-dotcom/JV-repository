# ⚙️ AUTOMATION REGISTRY — Execution Profiles (ED-003)
**TRK-2026-9794 · living document · created 2026-09-17 by ☁️ Cloud.**
**ED-003 (owner, 2026-09-17): every automation gets an Execution Profile for operational visibility.**
Fields: Name · Trigger · Frequency · Runs On · Dependencies · Failure Mode · Human Approval · Current Health.

> **Honesty note (Rule 2):** Cloud can verify repo-side hooks directly (it sees them fire this session).
> **It cannot verify desktop scheduled tasks — those run on RAMBO's PC.** Those read **Unknown (not
> verifiable from Cloud)** until RAMBO confirms. That blind spot is itself a finding → Risk R2/R4.

---

## LIVE — repo/harness side (Cloud-verifiable)

### 1. SessionStart task-register loader
- **Trigger:** session start (hook in `.claude/settings.json`)
- **Frequency:** every session
- **Runs On:** both Code seats
- **Dependencies:** TASK-REGISTER.md (anchor)
- **Failure Mode:** Silent-safe (prints nothing if file missing; `true` guard)
- **Human Approval:** No
- **Current Health:** Healthy — fired this session

### 2. Stop-hook git check
- **Trigger:** turn/stop (`~/.claude/stop-hook-git-check.sh`)
- **Frequency:** on stop
- **Runs On:** Cloud session (harness)
- **Dependencies:** git working tree
- **Failure Mode:** Logged — surfaces "untracked files" feedback
- **Human Approval:** No
- **Current Health:** Healthy — fired this session

### 3. SessionStart git identity
- **Trigger:** session start (`~/.claude/session-start-git-identity.sh`)
- **Frequency:** every session
- **Runs On:** Cloud session (harness)
- **Dependencies:** git config
- **Failure Mode:** Logged
- **Human Approval:** No
- **Current Health:** Healthy — commits succeed this session

### 4. Cloud scheduled wake / triggers
- **Trigger:** scheduled trigger
- **Frequency:** ~hourly (day & night)
- **Runs On:** Cloud
- **Dependencies:** repo + Drive board
- **Failure Mode:** Unknown — no explicit alert wired
- **Human Approval:** No (GREEN work only)
- **Current Health:** Unknown — not evidenced this session

---

## DESKTOP side — NOT verifiable from Cloud

### 5. Desktop heartbeat
- **Trigger:** Windows Scheduled Task
- **Frequency:** ~every 3 min
- **Runs On:** Desktop (RAMBO)
- **Dependencies:** mailbox/Drive, repo work queue
- **Failure Mode:** historically **Silent** (RI-015) — mitigation is output-growth check, not process-exists
- **Human Approval:** No
- **Current Health:** **Unknown (not verifiable from Cloud)** — ask RAMBO for last-run + output-growth

### 6. Overnight watcher
- **Trigger:** Night Protocol schedule
- **Frequency:** Nightly
- **Runs On:** Desktop (RAMBO)
- **Dependencies:** OVERNIGHT-QUEUE.md, HEARTBEAT-BASELINES
- **Failure Mode:** historically **Silent** — must write results per item, detect a dead run in one cycle
- **Human Approval:** No (GREEN eligibility only; RED work never auto-runs)
- **Current Health:** **Unknown (not verifiable from Cloud)**

### 7. OCR night sweep
- **Trigger:** Windows Scheduled Task(s)
- **Frequency:** Nightly
- **Runs On:** Desktop (RAMBO)
- **Dependencies:** OCR protocol, orphan-onboarding, folio-from-path
- **Failure Mode:** **Silent** — 4 tasks sat disabled 2 months undetected (RI-015)
- **Human Approval:** No (GREEN; filing stays RED)
- **Current Health:** **Unknown (not verifiable from Cloud)** — highest-suspicion item

---

## PLANNED — not built

### 8. The Conductor / token agent
- **Trigger:** (planned) always-on local orchestrator
- **Frequency:** continuous
- **Runs On:** Desktop (planned)
- **Dependencies:** LLM-SUBSCRIPTIONS.md, SCOREKEEPER
- **Failure Mode:** n/a (not built)
- **Human Approval:** No (design intent: GREEN only)
- **Current Health:** PLANNED — ORCHESTRATOR-SPEC_CONDUCTOR-01

---
*Update rule: add a profile the moment a new automation is discovered or built; flip Current Health on any evidence. Footer: TRK-2026-9794 · living · ED-003 · #automation-registry #execution-profiles*
