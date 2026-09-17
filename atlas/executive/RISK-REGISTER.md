# ⚠️ RISK REGISTER — what could bite us, ranked
**TRK-2026-9797 · living document · last updated 2026-09-17 by ☁️ Cloud.**
**Impact × Likelihood → priority. Every risk names a mitigation and an owner.** Status: OPEN · MITIGATING · CLOSED.

---

| # | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R1 | **No incoming sales pipeline** (Wally) — cash flow fails, business stops | Critical | High | Stand up Wally pipeline (Priority Zero, charter §12) | Jorge + seats | OPEN |
| R2 | **Silent automation death** — a scheduled task dies and nobody notices (RI-015: 4 OCR tasks dead 2 months) | High | High | Heartbeat checks output GROWTH, not process existence; health report first | RAMBO | MITIGATING |
| R3 | **Single executor is a SPOF** — only RAMBO touches the PC | High | Medium | Cloud approved as 2nd executor (pending Windows computer-use) | Jorge | MITIGATING |
| R4 | **Remote Control down** — no direct cloud↔desktop line, no phone push | Medium | High (already down) | One PC-side reconnect | RAMBO | OPEN |
| R5 | **1Password gap** — ~265 of 280 logins not loaded | High | High | One attended bulk-import session | Jorge + RAMBO | OPEN |
| R6 | **Misfile of a client document** — found months later by the client | High | Medium | Filing is RED; one owner click; folio 13-digit check; no fuzzy-match writes | All seats | MITIGATING |
| R7 | **Hidden path coupling** — moving a file breaks a skill/automation that reads it by name | Medium | Medium | ED-001 discovery + Held-on-conflict; grep before every move | Cloud | MITIGATING |
| R8 | **Vendor lock-in of memory** — knowledge trapped in one AI's private memory | Medium | Medium | Principle 0: memory lives in open repo/Drive files | All seats | MITIGATING |
| R9 | **Context exhaustion in batch work** — a single session degrades after ~item 4–5 | Medium | Medium | Rule 5: fan out one subagent per item; write results per item | Cloud | OPEN |
| R10 | **Overspend** — uncontrolled AI/API or errand spend | Medium | Low | Caps: $40/day, $3/card; over-cap is RED | Jorge | MITIGATING |

---
*Update rule: add a risk the moment it's spotted; move to CLOSED only with evidence it's resolved. Footer: TRK-2026-9797 · living · #risk-register*
