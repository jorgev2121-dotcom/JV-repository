# 🧩 CAPABILITY REGISTRY — what the system can actually do
**TRK-2026-9797 · living document · last updated 2026-09-17 by ☁️ Cloud.**
**Vendor-neutral (Principle 0): capabilities are described by role, not brand.** Status: LIVE · PARTIAL · DOWN · PLANNED.

---

## Execution & seats
| Capability | Provided by | Status | Notes |
|---|---|---|---|
| Run commands / touch files on the Windows PC | Desktop executor (RAMBO) | LIVE | Only seat with PC hands (Rule 10) |
| Second reasoning seat, no PC hands | Cloud seat | LIVE | Data lanes, repo/Drive/Gmail/Outlook/GitHub |
| Live desktop control from the cloud | Computer-use | PLANNED | Not on Windows yet; owner approval recorded |
| Direct cloud↔desktop messaging + phone push | Remote Control | DOWN | Off since 2026-08-09; PC-side reconnect needed |
| Headless timed execution (runs forever) | Desktop heartbeat (~3 min) | LIVE | Windows Scheduled Task |
| Overnight long runs | Night Protocol + overnight queue | PARTIAL | Watch for silent dead runs (RI-015) |

## Document & filing capabilities
| Capability | Provided by | Status | Notes |
|---|---|---|---|
| County tax-jacket enhancement (A–Z) | tax-jacket skill | LIVE | Protocol locked TRK-2026-9788 |
| Permit / jurisdiction expertise | permit-expert skill | LIVE | One module per municipality |
| Onboard loose documents (OPH numbers) | orphan-onboarding skill | LIVE | Reads ORPHAN-NUMBERING.md |
| Portal registration + autopay setup | portal-registration skill | LIVE | HOA / property-mgmt portals |
| OCR a scan into a findable, filed doc | OCR protocol | PARTIAL | Some night OCR tasks have gone silent before |
| Tracking-number system (TRK/OPH) | Charter §9 + registries | LIVE | Seeded high, +3 increment |

## Connectors (outside services)
| Capability | Provided by | Status | Notes |
|---|---|---|---|
| Email read/send | Gmail · Outlook/M365 | LIVE | Sending is RED (needs a click) |
| Files | Google Drive | LIVE | Single source of truth for jobs |
| Calendar | Google Calendar | LIVE | |
| Code / repo | GitHub | LIVE | |
| 9,000+ apps | Zapier | LIVE | Prefer over scripting a website |
| Databases / data services | CData Connect | LIVE | |
| Second-opinion from other LLMs | API bus | PLANNED | By API key only; key lives in 1Password |

---
*Update rule: change a status the moment it changes; add a row when a new capability appears. Footer: TRK-2026-9797 · living · #capability-registry*
