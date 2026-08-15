# OPEN-ITEMS.md — Work Registry

**This is the ledger. A request that is not in this file does not exist.**

Chat conversations are not a backlog: they compress, they end, and dropped items are
never announced. Anything that matters gets a row here.

**Statuses:** `NOT_STARTED` · `IN_PROGRESS` · `DONE` (requires evidence) ·
`BLOCKED` (requires what-was-tried + the one thing needed)

**Tracking number format:** `TRK-2026-NNNN`, seeded at 1247, **+3 increment**.
**Authoritative registry:** `C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md`
**⚠ The `9xxx` numbers below are an internal admin band, NOT job numbers.** They were
issued on 2026-08-15 before the protocol was known. Reserved band — see TRK-2026-9027
and `CLAUDE.md` section 9. Never issue a job number from 9xxx.

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
| TRK-2026-9021 | Unpin Haiku 4.5 in desktop `.claude\settings.json` | NOT_STARTED | **CRITICAL.** See RI-008. Tier 2 fix; `/model` alone reverts next launch |
| TRK-2026-9022 | Audit model used by every saved session | NOT_STARTED | Drift found across haiku-4-5, fable-5, opus-4-8. See RI-008 |
| TRK-2026-9023 | Adopt `_ pNNN` page-identity standard | DONE | Written into CLAUDE.md 9.1-9.3, verified on remote 2026-08-15 |
| TRK-2026-9024 | Add footer stamping to the document pipeline | NOT_STARTED | Filename identity is lost on print/screenshot; footer stamp is what makes pNNN pay off |
| TRK-2026-9025 | Install and configure Wispr Flow Pro | NOT_STARTED | See RI-010. Two modes: dictation + command. Free tier too small at 285 words/day |
| TRK-2026-9026 | Confirm `Alt+V` image paste in Claude Code | NOT_STARTED | See RI-009. `Ctrl+V` fails silently on Windows — this is why the window seemed broken |
| TRK-2026-9027 | Record the `9xxx` admin band in Tracking-Registry.md | NOT_STARTED | Cloud issued 9001-9027 outside the registry. Must be reserved so it never collides with jobs |
| TRK-2026-9028 | Resolve the two conflicting filename conventions | NOT_STARTED | See RI-012. **Blocks all filing automation.** Recommend adopting the Drive form |
| TRK-2026-9029 | Reconcile Tracking-Registry against Drive | NOT_STARTED | See RI-013. Numbers exist above the stated ceiling; collision risk on next issue |
| TRK-2026-9030 | Restore the microphone button | NOT_STARTED | See RI-011. Check Windows mic permission first; `Win+H` works meanwhile |

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
