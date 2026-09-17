# 🏗️ INFRASTRUCTURE REGISTER — the plumbing (the 18%)
**TRK-2026-9797 · living document · created 2026-09-17 by ☁️ Cloud.**
**This is the punch list behind "Infrastructure 18%." Each row: what it is, its state, the blocker, and the ONE action to raise it.**
Status: 🟢 Online · 🟡 Degraded/Unknown · 🔴 Offline/Missing · ⚪ Planned.

---

## Critical plumbing (fix these to move the 18%)
| # | Component | Status | Enables | Blocker | Action to raise | Owner |
|---|---|---|---|---|---|---|
| I1 | **Remote Control** | 🔴 Offline (since 2026-08-09) | Cloud↔Desktop link + phone push | PC-side reconnect | One reconnect on the PC | RAMBO |
| I2 | **Health/observability sensor** | 🔴 Missing | Detect silent failure (RI-015) | Tier-3 heartbeat line not built | Each task writes name·last-run·bytes; watcher flags no-growth | RAMBO |
| I3 | **1Password vault** | 🟡 Partial (~15/280) | Access to ~280 sites | Needs attended bulk import | One attended import session | Jorge + RAMBO |
| I4 | **Desktop heartbeat** | 🟡 Unknown | Timed headless execution | No health signal reaches Cloud | First-light report (last-run + growth) | RAMBO |
| I5 | **Computer-use (live desktop control)** | 🔴 Not available | Cloud as live 2nd executor | Windows unsupported (macOS preview) | Wait for Windows support; approval already recorded | Anthropic / Jorge |
| I6 | **GitHub sign-in on desktop** | 🔴 Blocked | Unattended desktop push | Owner click needed | One sign-in click | Jorge |

## Runtime plumbing (partly working / unknown)
| # | Component | Status | Enables | Blocker | Action to raise | Owner |
|---|---|---|---|---|---|---|
| I7 | Overnight watcher | 🟡 Unknown | Long night runs | Same blind spot as I4 | First-light report | RAMBO |
| I8 | OCR pipeline / scheduled tasks | 🟡 Unknown | Scan→findable→filed | Died 2mo undetected before | First-light report (highest suspicion) | RAMBO |
| I9 | Cloud scheduled triggers | 🟡 Unknown | Cloud wakes itself hourly | No self-report wired | Add a wake-log line | Cloud |
| I10 | Cloud network egress | 🟡 Degraded | Reach county/listing sites | miamidade/realtor/redfin blocked (403); Maps works but no key | Browser jobs via RAMBO; add Maps key | RAMBO |
| I11 | Window router / panels (F8/F9) | 🟡 Partial | Fast window switching | Backlog in PANEL-ENHANCEMENTS | Work the backlog | RAMBO |

## Planned / not built
| # | Component | Status | Enables | Blocker | Action to raise | Owner |
|---|---|---|---|---|---|---|
| I12 | The Conductor / token agent | ⚪ Planned | Always-on orchestration + token/subscription watch | Not built (spec exists) | Build after pilot proves | RAMBO |
| I13 | API bus (2nd-opinion LLMs) | ⚪ Planned | Call other models as tools | One API key needed | Create key, store in 1Password | Jorge |

---

## The read, in one line
**Almost every critical row points at two things: Remote Control offline (I1) and no health sensor (I2).** Fix those two and I4/I7/I8/I9 stop being blind. **The single highest-leverage move is one RAMBO work order that reconnects Remote Control and runs the first-light health report.** That is the fastest path from 18% upward — and it needs one "go" from Jorge.

*Update rule: flip a status only on real evidence; add a row when new plumbing appears. Footer: TRK-2026-9797 · living · #infrastructure-register #the-18-percent*
