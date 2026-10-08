# Executor failover — three options (Rule 4: RI-015 has recurred 7 times; patches forbidden)
Owner, 2026-10-08 ~3:05 PM ET: "Rambo has not run since 1 a.m. … why it wasn't reassigned to another executor … Do we not have agents in place to prevent that? … take corrective action." Also: "is this not a task that … becomes very mechanical … minimal expense agent or a bot?"

## ROOT CAUSE answers
1. **What is causing it:** every order needing a computer goes to ONE executor, RAMBO, a Claude Code session on the PC that only works while its window is open and active. The PC's watcher auto-ACKs orders, so the board looks alive while nothing executes. The owner cannot find the window.
2. **Why previous fixes failed:** they restarted or re-prompted RAMBO (Tier 1). Nothing watches the gap between "ACK" and "EXECUTED", and there is no second executor to hand work to.
3. **Three options, ranked by lifespan:**

### Option A — Remove the PC from public-data work (Tier 2). RECOMMENDED
Public county/state data (GIS permits, Property Appraiser, Sunbiz, DBPR, RER case viewer) needs no PC and no login. Run it from a cloud executor instead:
- **A1:** this cloud environment with the county domains added to its allowed network list (owner: one settings change). Cloud then runs the jobs itself and on a schedule (cloud routines), with no window to keep open.
- **A2:** GitHub Actions runner in the repo (proof of concept ran 2026-10-08), scheduled nightly, results committed as CSV.
Failure mode: a county site blocks data-center traffic or changes its pages. Lifespan: months to years; failures are visible in the run log.
RAMBO keeps only what truly needs the PC: PaperPort, QuickBooks, Outlook files, 1Password logins.

### Option B — Stall watchdog with automatic reassignment (Tier 3, REQUIRED with A)
Every 30 minutes cloud checks Drive: any order ACKed more than 60 minutes ago with no EXECUTED_/BLOCKER_ = stalled. Then (1) a pop-up line in Jorge's chat and the panel, and (2) public-data orders are re-issued to the cloud executor automatically. The check is "did a receipt appear," never "is the window open."
Failure mode: the watchdog routine itself stops; caught because each run writes a timestamp that the morning report checks. Lifespan: as long as cloud routines run.

### Option C — Keep RAMBO always reachable (Tier 1, suppression)
Pin the RAMBO window, auto-start it at login, and enable Remote Control so the session can be reached from the Claude app on any device. Helps, but the same window can close or wait on a prompt again. Lifespan: days to weeks.

## Recommendation
**A + B now; C as convenience.** First step needs one owner action: add the county domains to this cloud environment's allowed list (or approve the GitHub runner as the scraper).

EXECUTOR-FAILOVER · v1 · 2026-10-08 · CURRENT
