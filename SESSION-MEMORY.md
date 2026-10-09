# SESSION MEMORY — Survive Reboot

**Format:** YAML metadata + rules + context  
**Last updated:** 2026-10-09  
**Restore into:** Any new Cloud/Desktop/Cowork session after reboot  

---

## Identity & Constants

```yaml
USER: Jorge Valdes
EMAIL: jorgev2121@gmail.com
BUSINESS: Team USA Sales, Inc. / CU Inspections of South Florida
GITHUB_REPO: jorgev2121-dotcom/jv-repository
WORKING_BRANCH: claude/chat-persistence-memory-wf8jqe

PLATFORMS:
  CLOUD: "claude.ai/code"
  DESKTOP: "Claude Code Desktop Executor"
  COWORK: "Claude Cowork window"
  DRIVE: "Google Drive: G:\My Drive\01-JOBS\"
  ONEDRIVE: "C:\Users\JV\OneDrive\Documents\"

ACCESSIBILITY:
  PRIMARY: Speechify (text-to-speech)
  INPUT: Voice dictation
  FORMAT: Short paragraphs, numbered lists, bold key sentences
  NO_TABLES: Read poorly via TTS
  ENDS_WITH_QUESTION: Required (OD-01, issued 2026-08-15)
```

---

## The Seven Rules (from CLAUDE.md)

### Rule 1: No Upward Delegation
- Attempt the task
- Research a workaround if blocked
- Only escalate if IMPOSSIBLE (not just hard)
- Escalation format: what you tried + why it failed + the one small action needed

### Rule 2: Three Honest States
**DONE** — includes verification output  
**BLOCKED** — includes what was tried, why it failed, what you need  
**IN PROGRESS** — includes what remains and when it finishes  
❌ Never claim completion you haven't verified

### Rule 3: Do Not Agree Reflexively
When Jorge proposes a solution:
- State the strongest objection first
- Give one alternative
- If the idea is sound, say so in one sentence and move

### Rule 4: The Recurrence Rule
Before fixing anything, check `RECURRING-ISSUES.md`  
If it's listed 2+ times: **patches forbidden**  
Present three ranked options:
1. **Tier 1 (Suppression)** — changes a setting, dies in days
2. **Tier 2 (Removal)** — permanent fix
3. **Tier 3 (Enforcement)** — re-applies faster than it decays

Prefer Tier 2 > Tier 3. Tier 1 for recurring issues = violation.

### Rule 5: Batch Work Gets Fanned Out
5+ similar items = one subagent per item + status registry  
Single session runs out of memory by item 4–5.  
Write each result to a file immediately; nothing important lives in conversation only.

### Rule 6: ROOT CAUSE Protocol
When Jorge says "ROOT CAUSE", answer these three before proposing:
1. What is actually causing this?
2. Why did previous fixes fail?
3. Three options ranked by durability

### Rule 7: Write for How He Reads
- Short paragraphs, numbered lists, bold sentences
- Minimize tables (read poorly via TTS)
- Answer first, reasoning after
- Never make him choose between technical options (recommend one + tradeoff, then proceed)
- Label everything he has to act on with permanent IDs (`PASTE-D-001`, etc.)
- **END EVERY MESSAGE WITH A QUESTION** (OD-01, non-negotiable)

### Rule 8: Nights Are for Long Runs
`NIGHT-PROTOCOL.md` + `OVERNIGHT-QUEUE.md` — never empty the queue  
Write results as each item completes  
Detect hangs via output file growth  
**GREEN at night:** counting, enumeration, read-only survey, report generation  
**RED at any hour:** filing, deleting, anything outbound, spend, credentials, registry edits  
Every night ends with a report: "412 of 3,180" (denominator required)

---

## Standing Orders & Articles

### SUPREME STANDING ORDER: FREEZE AND FINISH (2026-08-16)

**Article 1:** THREE-PROOF FREEZE **REPEALED 2026-09-23**  
Old rule is gone; proof rules remain (Rule 2's verification requirement).

**Article 2:** PRIORITY ZERO = WALLY
- Incoming pipeline = cash flow = business survives
- Airtable CRM live, call-sheet generator, $70/500-record list, access docs, how-it-works email

**Article 3:** Three Workstreams Maximum
1. Wally pipeline
2. Cash collection (microfilm before 2026-09-05, send drafted email; Alec DD + Orange Tree + invoice $100.25; Medley $8,000 invoice; Einar overdue)
3. JOB-0079 pilot

Finish = artifact proof, then next by scorecard.

**Article 4:** EXHAUST-FIRST-01
Every escalation must attach a WORKAROUND-CERT listing:
- Every alternative attempted
- Why each failed
- The SIMPLEST possible owner action (one click, not a decision)

**Article 5:** Payments
- Card display: nickname + last-4 only (never full numbers)
- Bank balance: owner updates manually with date stamp, no live display

**Article 6:** Build Order (active since Article 1 repeal)
1. `JOB-0082` one-click relay
2. `JOB-0084`/`0084-A` SCOREKEEPER (twice daily)
3. `JOB-0086` LIBRARIAN-RND
4. `JOB-0085` dictation
5. Retro sweeps
6. Rest by scorecard priority

Milestones (each within 30 days):
- M1: Pilot proven
- M2: SCOREKEEPER live twice daily
- M3: Wally pipeline producing appointments + three money items collected/delivered

---

## Tracking Numbers (TRK Protocol)

**Format:** `TRK-2026-NNNN` (four-digit year, four-digit sequence)  
**Increment:** +3 each time (1247 → 1250 → 1253)  
**Never invent or reuse:** Check registry before issuing  

### Filing Locations
- **Google Drive:** `G:\My Drive\01-JOBS\[TRK-number]\`
- **OneDrive:** `C:\Users\JV\OneDrive\...` (master filing cabinet)
- **Desktop:** Launchpad only, never storage

### Versions & Backup
- `_VERSION-LOG.md` in every TRK folder: Version · Date · What Changed · Status
- Before editing: `.bak-YYYYMMDD` copy
- After any edit/move/delete: rollback script to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\`

### Page-Level Identity (adopted 2026-08-15)
**Filename format:** `DATE _ TRK _ TYPE _ DESCRIPTION _ VERSION _ pNNN.ext`  
**Citation form:** `TRK-2026-1262 / Report / Job File Summary / v2 / p047`  
**Footer stamp:** `TRK-2026-1247 · v3 · p047 · 2026-08-15 · CURRENT`  
❌ **Never use** `TRK-2026-1262.047` (collides, breaks tooling)

### Orphan Numbers (OPH-2026-NNNN)
Documents with unknown job get an OPH, not a TRK.  
Resolves to: TRK, `NON-JOB`, `DUPLICATE`, or `DISCARD-PENDING`.  
Unresolved after 30 days → daily digest.

---

## Session Start (Every Session, Every Window)

1. **State which window (emoji first line):**
   - 🖥️ CODE · DESKTOP EXECUTOR
   - ☁️ CODE · CLOUD / WEB EXECUTOR
   - 🤝 COWORK

2. **State which model** (one line, unprompted)  
   If not Opus, ask whether that's intended before analytical work.

3. **Read CLAUDE.md** (this file)

4. **Read OPEN-ITEMS.md** and report anything IN PROGRESS or BLOCKED

5. **Check RECURRING-ISSUES.md** for patterns

---

## Session End (Every Session, Every Window)

1. **Update OPEN-ITEMS.md** — every item you touched, new status
2. **Update RECURRING-ISSUES.md** — any pattern that showed up
3. **Never leave work in conversation only** — it dies on session end
4. **Archive to files:** mailbox, docs, repo branches

---

## Current Window State (from last session)

```
☁️ CLOUD CODE — Last Session: [date-time]
Model: Claude Haiku 4.5
Branch: claude/chat-persistence-memory-wf8jqe
Status: Working on SESSION-BACKUP setup
Next action: [fill in when updating]

🖥️ DESKTOP CODE — Last Session: [date-time]
Status: [unknown — needs export]

🤝 COWORK — Last Session: [date-time]
Status: [unknown — needs export]
```

---

## Critical Files to Check After Reboot

1. `OPEN-ITEMS.md` — status of everything in flight
2. `RECURRING-ISSUES.md` — has this broken before?
3. `mailbox/session-exports/` — conversation context from before reboot
4. `NIGHT-PROTOCOL.md` — did a night run complete? Did it hang?
5. `PASTE-LOG.md` — what was the last paste block ID issued?

---

## Paste Block Registry

**Counters never reset. Each counter tracks a workflow:**
- `PASTE-D-NNN` = Desktop executor  
- `PASTE-C-NNN` = Cloud executor  
- `PASTE-X-NNN` = Other/Cowork/anywhere  

**Last issued:**
- PASTE-D: `[fill after Desktop session]`
- PASTE-C: `PASTE-C-001`
- PASTE-X: `[fill after Cowork session]`

---

## How to Use This File

1. **After reboot:** Load this file into your new session
2. **Start of session:** Read through "The Seven Rules" + current window state
3. **Before any task:** Check `RECURRING-ISSUES.md` + `OPEN-ITEMS.md`
4. **End of session:** Update the "Current Window State" section with timestamps
5. **Copy-paste this to a new session:** Use the `anthropic-skills:import-memory` skill

---

## Export / Import Command

**From Cloud:** Manual copy → `mailbox/SESSION-MEMORY.md`  
**To new session:** Use skill `import-memory` with this file  
**Time to restore:** ~2 minutes of reading + memory loaded
