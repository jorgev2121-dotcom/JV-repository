# 👁️ SYSTEM OBSERVABILITY — what we can see, what we can't, and how we'd know
**TRK-2026-9797 · living document · created 2026-09-17 by ☁️ Cloud.**
**Companion to the Automation Registry. The Registry lists automations; this file says whether we can actually OBSERVE them — and names every blind spot.**

> **The core problem, stated plainly:** an automation that fails *silently* is indistinguishable from one that never ran. Eighteen months of this business's pain came from dead sensors, not dead work (RI-015: 4 OCR tasks dead 2 months; the health email dead since June). **Observability is the sensor. If the sensor is blind, nothing else matters.**

---

## The three observability questions (asked of every automation)
1. **Did it run?** (last-run timestamp)
2. **Did it do work?** (did its output file GROW — not just "is the process alive")
3. **Who finds out if it didn't?** (silent / logged / alerted — and to whom)

A "yes/yes/alerted" automation is observable. Anything else is a blind spot.

---

## What we CAN see (Cloud-verifiable this session)
- **Repo-side hooks** — SessionStart loader, stop-hook git check, git-identity. Cloud watches them fire. **Observable.**
- **The repo itself** — every commit, every file move, the migration log. Full history. **Observable.**
- **The Business Brain + registries** — because they're open files Cloud reads directly. **Observable.**

## What we CANNOT see (the blind spots) ⛔
| Blind spot | Why blind | Consequence | Risk link |
|---|---|---|---|
| Desktop heartbeat health | Runs on RAMBO's PC; Cloud has no PC access | Can't tell "running" from "dead" | R2, R4 |
| Overnight watcher health | Same | A killed night run looks like a quiet night | R2 |
| **OCR night sweep health** | Same | This is the exact task that died 2 months undetected | R2 (highest) |
| Cloud scheduled-trigger firing | No explicit self-report wired | Can't confirm the hourly wake happened | R2 |
| Desktop scheduled-task list | Cloud can't enumerate Windows Task Scheduler | Unknown tasks may exist or be disabled | R2 |

## The root cause of the blind spots (ROOT CAUSE)
1. **What's causing this?** Cloud and Desktop are separate machines, and **Remote Control (the direct link) has been down since 2026-08-09.** With no link, Cloud can only see what lands in the shared files.
2. **Why did previous fixes fail?** The health signal was a single email that itself died silently — a sensor with no sensor on it.
3. **The durable fix, ranked (charter Rule 4 tiers):**
   - **Tier 3 — Enforcement (recommended):** each automation writes a heartbeat line (name · last-run · output-bytes) to a shared file every cycle; a watcher flags any line that stopped growing for 3 cycles. Self-reporting beats a central poller that can itself die.
   - **Tier 2 — Removal:** retire any automation that can't self-report and replace it with one that does.
   - **Tier 1 — Suppression (rejected for logged recurrences):** a status email. This is what already failed. Not acceptable alone for RI-015.

## The smallest step to first light
**One RAMBO report:** for every Windows Scheduled Task — name, last-run time, and whether its output file grew. That single read turns 5 of the 5 desktop blind spots from **Unknown** to a known state, today, without building anything. Then wire the Tier-3 heartbeat line so it stays lit.

---
## Health status cards (owner format — Expected · Current · Cloud Verification · Health · Failure Detection · Owner)

**Desktop Heartbeat** — Expected: Running · Current: **Unknown** · Cloud Verification: No · Health: **Unknown** · Failure Detection: **None** · Owner: RAMBO

**Overnight Watcher** — Expected: Nightly run · Current: **Unknown** · Cloud Verification: No · Health: **Unknown** · Failure Detection: **None** (historically silent) · Owner: RAMBO

**OCR Night Sweep** — Expected: Nightly · Current: **Unknown** · Cloud Verification: No · Health: **Unknown** · Failure Detection: **None** (died 2 mo undetected, RI-015) · Owner: RAMBO

**Cloud Scheduled Triggers** — Expected: ~Hourly · Current: **Unknown** · Cloud Verification: Partial · Health: **Unknown** · Failure Detection: None · Owner: Cloud

**SessionStart Loader** — Expected: Every session · Current: Running · Cloud Verification: Yes · Health: **Healthy** · Failure Detection: Logged-safe · Owner: Cloud/harness

**Stop-hook Git Check** — Expected: On stop · Current: Running · Cloud Verification: Yes · Health: **Healthy** · Failure Detection: Logged · Owner: Cloud/harness

**Git-identity Hook** — Expected: Every session · Current: Running · Cloud Verification: Yes · Health: **Healthy** · Failure Detection: Logged · Owner: Cloud/harness

**The Conductor** — Expected: Not built · Current: Planned · Cloud Verification: n/a · Health: **Planned** · Failure Detection: n/a · Owner: RAMBO (future)

---
## Observability scoreboard (live)
- **Observable:** 3 repo hooks + repo/Brain. 
- **Blind (Unknown):** desktop heartbeat, overnight watcher, OCR sweep, cloud trigger, desktop task list.
- **First-light action:** RAMBO scheduled-task health report — NOT yet ordered.

*Update rule: flip a blind spot to Observable only when a real signal exists for it. Footer: TRK-2026-9797 · living · #system-observability #dead-sensor #RI-015*
