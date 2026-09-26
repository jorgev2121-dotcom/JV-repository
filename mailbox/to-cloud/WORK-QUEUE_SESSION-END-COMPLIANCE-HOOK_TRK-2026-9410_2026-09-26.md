# SESSION-END TASK COMPLIANCE HOOK — TRK-2026-9410
**Fired by:** Rule 9 enforcement (CLAUDE.md) · **Date:** 2026-09-26 · **Status:** QUEUED — Execute before any new task assignments can be ignored
**TRK:** TRK-2026-9410
**Priority:** FOUNDATIONAL — Blocks recurring failures. Deploy first.
**Executor:** CLOUD

---

## TASK SUMMARY

Implement an automated post-session compliance hook that scans every session transcript, finds task-like language patterns, cross-references against OPEN-ITEMS.md and work queue files, and flags any discussed-but-unassigned tasks. The hook escalates unassigned items and prevents sessions from closing until they are either queued or explicitly deferred.

**Why this matters:** Rule 9 (CLAUDE.md) says "no task lives in conversation only." But a written rule has no enforcement. This hook makes it automatic.

---

## SCOPE

**Design and implement:**

1. **Task extraction:** Parse session transcript for imperative verbs (create, build, implement, deploy, monitor, add, fix, integrate) + task objects (system, agent, job, worker, script, pipeline, protocol, hook).

2. **Cross-reference:** Check OPEN-ITEMS.md and all `mailbox/to-*/WORK-QUEUE_*.md` files. For each extracted task:
   - If it has a TRK and an executor assignment: mark **COMPLIANT**
   - If missing TRK or executor: mark **UNASSIGNED**

3. **Generate report:** Create `UNASSIGNED-TASKS_[SESSION-DATE].md` with:
   - Extracted task name
   - Missing fields (no TRK? no executor? no scope? no timeline?)
   - Auto-read formatted (short paragraphs, numbered list)

4. **Escalation:** Exit with flag `compliance-check-needed=true` if unassigned count > 0. The session harness surfaces the report to Jorge automatically.

5. **Execution:** Hook runs at session-end (before archiving), configured in `.claude/hooks/` as a post-session trigger.

---

## IMPLEMENTATION LOCATION

**File:** `.claude/hooks/post-session-compliance-check.sh`  
**Trigger:** `session.post_end` (configured in `settings.json` hooks array)  
**Dependencies:** bash, grep, jq (for transcript JSON parsing), repo access

**Reference:** `CLAUDE.md` Rule 9 (Task Assignment Governance)

---

## EXECUTION CHECKLIST

- [ ] Hook script written and tested locally
- [ ] Integrated into `.claude/settings.json` hooks array
- [ ] Test run against current session transcript
- [ ] Report generated and reviewed
- [ ] Deployment verified on next session end
- [ ] Documented in NIGHT-PROTOCOL.md (part of standing infrastructure)

---

## TIMELINE

**Duration:** ~3 hours (design + implementation + test)  
**Start:** Immediately after daily worker (TRK-2026-9411)  
**Priority:** Critical infrastructure — unblocks future task assignments

---

**Why this is foundational:** Without it, Rule 9 is just a file. With it, Rule 9 becomes automatic enforcement.

---

**Questions:** Ready to deploy this as the enforcement mechanism for Rule 9?
