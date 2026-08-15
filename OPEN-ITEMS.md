# OPEN-ITEMS.md — Work Registry

**This is the ledger. A request that is not in this file does not exist.**

Chat conversations are not a backlog: they compress, they end, and dropped items are
never announced. Anything that matters gets a row here.

**Statuses:** `NOT_STARTED` · `IN_PROGRESS` · `DONE` (requires evidence) ·
`BLOCKED` (requires what-was-tried + the one thing needed)

**Tracking number format:** `TRK-2026-NNNN`
**Last issued in this file:** `TRK-2026-1611` *(observed in Google Drive — verify
against the master registry before issuing new numbers)*

---

## Active

| TRK | Item | Status | Notes |
|---|---|---|---|
| TRK-2026-9001 | Operating charter (`CLAUDE.md`) committed to repo root | DONE | Verified by read-back 2026-08-15 |
| TRK-2026-9002 | `RECURRING-ISSUES.md` created and seeded | DONE | Verified by read-back 2026-08-15 |
| TRK-2026-9003 | `OPEN-ITEMS.md` created | DONE | This file |
| TRK-2026-9004 | Confirm desktop Claude Code loads this charter | NOT_STARTED | Open the repo in a desktop session and ask it to quote Rule 1 |
| TRK-2026-9005 | Pop-up focus theft — Tier 2 removal pass | NOT_STARTED | See RI-001. Requires a desktop session. Cloud cannot touch the PC |
| TRK-2026-9006 | Pop-up focus theft — Tier 3 enforcement scheduled task | NOT_STARTED | Depends on 9005 |
| TRK-2026-9007 | Miami-Dade scrape — rebuild as one agent per site | NOT_STARTED | See RI-004. Site list required — see below |
| TRK-2026-9008 | Normalise `TRK-26-NNNN` → `TRK-2026-NNNN` across Drive and Gmail | NOT_STARTED | Two incompatible formats in use; searches silently miss records |
| TRK-2026-9009 | Assign real numbers to the two `_JOB-TREE_TRK-TBD.html` files | NOT_STARTED | Placeholder numbers collide with each other |
| TRK-2026-9010 | Import the 300+ enhancement backlog into this file | NOT_STARTED | Scattered across chats and emails; cannot be delegated until it is a list |
| TRK-2026-9011 | Unstick desktop session "Test bridge buttons" | BLOCKED | Frozen awaiting an answer. Only Jorge can type into it — cloud has no channel to the PC |
| TRK-2026-9012 | Put TRK numbers in email subject lines | NOT_STARTED | Filenames already comply; subjects do not |
| TRK-2026-9013 | Fix BRIDGE-PICKER.hta MS Store button — launch by AppUserModelID | NOT_STARTED | See RI-006. Direct-path launch of an MSIX app is invalid |
| TRK-2026-9014 | Repair Windows Terminal profile "CLAUDE" (0x80070002) | NOT_STARTED | Bad path + malformed command line. See RI-006 |
| TRK-2026-9015 | Outlook reminder pop-up — run `outlook.exe /cleanreminders` | NOT_STARTED | Tier 2 fix for a corrupt reminder item. See RI-001 |
| TRK-2026-9016 | Close duplicate session "Test bridge buttons after w…" | NOT_STARTED | See RI-007. Frozen duplicate of the active bridge task |
| TRK-2026-9017 | Migrate OneDrive ClaudeMemory into this repo | NOT_STARTED | Message queued in mailbox/to-desktop/. Desktop only — cloud cannot read OneDrive |
| TRK-2026-9018 | Enable /voice in desktop Claude Code | NOT_STARTED | Type `/voice`, hold space. Windows: allow desktop apps mic access |
| TRK-2026-9019 | Evaluate Wispr Flow for system-wide dictation | NOT_STARTED | Known bug: Claude Code v2.1.83 breaks injection on Windows; use v2.1.81 |
| TRK-2026-9020 | Authorize Microsoft 365 connector (OneDrive read) | BLOCKED | Only Jorge can click the consent screen in claude.ai connector settings |

---

## Miami-Dade site registry — TRK-2026-9007

Approximately 20 Miami-Dade County public websites, scraped for permissible public
records, reformatted and merged into a due-diligence report.

**Architecture (per `CLAUDE.md` Rule 5):** one subagent per site. Each writes its
result to disk on completion. Never a single session iterating through all 20.

| # | Site | Type | Status | Output file |
|---|---|---|---|---|
| 1 | *to be filled* | | NOT_STARTED | |
| 2 | *to be filled* | | NOT_STARTED | |
| 3 | *to be filled* | | NOT_STARTED | |
| 4 | *to be filled* | | NOT_STARTED | |
| 5 | *to be filled* | | NOT_STARTED | |
| 6 | *to be filled* | | NOT_STARTED | |
| 7 | *to be filled* | | NOT_STARTED | |
| 8 | *to be filled* | | NOT_STARTED | |
| 9 | *to be filled* | | NOT_STARTED | |
| 10 | *to be filled* | | NOT_STARTED | |
| 11 | *to be filled* | | NOT_STARTED | |
| 12 | *to be filled* | | NOT_STARTED | |
| 13 | *to be filled* | | NOT_STARTED | |
| 14 | *to be filled* | | NOT_STARTED | |
| 15 | *to be filled* | | NOT_STARTED | |
| 16 | *to be filled* | | NOT_STARTED | |
| 17 | *to be filled* | | NOT_STARTED | |
| 18 | *to be filled* | | NOT_STARTED | |
| 19 | *to be filled* | | NOT_STARTED | |
| 20 | *to be filled* | | NOT_STARTED | |

**To populate:** paste the list of 20 URLs, or point a desktop session at the
existing Miami-Dade Phase 1 brief and have it fill these rows.

**Known so far:** 3–4 sites were delivered in the July Phase 1 POC. Which ones is
not recorded anywhere — that is itself the problem this file exists to prevent.

---

## Completed

*Items move here with their verification evidence attached.*
