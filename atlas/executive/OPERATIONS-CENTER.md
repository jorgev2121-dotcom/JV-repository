# 🎛️ OPERATIONS CENTER — the front door
**TRK-2026-9797 · living document · last updated 2026-09-17 by ☁️ Cloud.**
**Start every session here. This is the console: where things are, what's running, and what needs your one click.**

---

## 🚦 SYSTEM STATUS (owner board, 2026-09-17) — 🟢 Healthy · 🟡 Unknown · 🔴 Offline
- 🟢 **Business Brain** — Healthy
- 🟢 **Executive Layer** — Healthy
- 🟢 **GitHub** — Healthy
- 🟢 **Google Drive** — Healthy
- 🟢 **Connectors** — Healthy
- 🟡 **Desktop (RAMBO)** — Unknown (not verifiable from Cloud)
- 🟡 **Cloud** — Unknown *(this interactive seat is live; the scheduled-wake trigger is the Unknown part)*
- 🟡 **Heartbeat** — Unknown
- 🟡 **OCR Night Sweep** — Unknown (RI-015 repeat-risk)
- 🔴 **Remote Control** — Offline (since 2026-08-09)

**Read in one line:** the memory, the code, and the connectors are green; **everything that runs on the Desktop is a question mark, and the link that would let Cloud see it is offline.**

---

## ⛔ NEEDS JORGE (RED — one click each)
1. **Reconnect Remote Control** (PC-side) — restores cloud↔desktop line AND phone push. Highest leverage.
2. **1Password bulk import** — ~265 of 280 logins missing; one attended session.
3. **First-light health report** — approve RAMBO to report each scheduled task's last-run + output-growth (flips 5 blind spots to known). *GREEN — just say go.*

## 🟢 RUNNING NOW (no action needed)
- Repo hooks (session-start, stop-check, git-identity) — **Healthy**, Cloud-verified.
- ATLAS migration — 5 categories home, executive layer built.

## ❓ RUNNING BLIND (Unknown — can't verify from Cloud)
- Desktop heartbeat · Overnight watcher · **OCR night sweep** — no failure detection. See System Observability.

---

## The map — where everything lives
**Governance:** `CLAUDE.md` (root) · `atlas/owner-directives/`
**Company memory + migration dashboard:** `atlas/BUSINESS-BRAIN.md`
**Migration log:** `atlas/MIGRATION-LOG.md`
**Executive layer** (`atlas/executive/`):
- **OPERATIONS-CENTER** (this file) — front door / console
- **EXECUTIVE-DASHBOARD** — status readout (workstreams, blockers, progress)
- **CAPABILITY-REGISTRY** — what the system can do
- **DECISION-LOG** — every decision, dated
- **RISK-REGISTER** — ranked risks + mitigations
- **SYSTEM-OBSERVABILITY** — what we can/can't see + health cards
- **BUSINESS-VOCABULARY** — glossary
**Automations:** `atlas/automations/` (+ AUTOMATION-REGISTRY execution profiles)
**Connectors:** `atlas/connectors/` · **RAMBO:** `atlas/rambo/` · **SOPs:** `atlas/sops/`
**Skills:** `.claude/skills/` (root — immovable) · **Intake:** `TASK-REGISTER.md` (root — immovable)

## The three workstreams (charter §12 — nothing outranks these)
1. **Wally pipeline** (Priority Zero) — incoming cash. *Untouched this session — flag.*
2. **Cash collection** — Medley (voided), Alec DD + invoice, microfilm, Einar.
3. **JOB-0079 pilot** — headless-execution proof loop.

## Migration status (live)
- Home: RAMBO · Owner Directives · SOPs · Connectors · Automations.
- Root loose files: ~77 · Held: 2 · Locked: 3 · Data lost: 0 · Rollback-able: yes.
- Next: Batch 6 (GitHub/repo meta) → Projects (careful — TASK-REGISTER anchor lives there).

---
*Update rule: refresh the RED list and migration line whenever they change; this file must always answer "what now?" in ten seconds. Footer: TRK-2026-9797 · living · #operations-center #front-door*
