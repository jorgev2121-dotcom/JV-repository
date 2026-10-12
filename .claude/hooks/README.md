# Claude Code Hooks

This directory contains automation hooks that run at key moments in the Claude Code session lifecycle.

---

## post-session-compliance-check.sh

**TRK:** TRK-2026-9410  
**Fires:** At session end (before archive)  
**Purpose:** Enforce Rule 9 (task assignment governance) — ensure no task lives in conversation only

### What it does

1. Scans the session transcript for task-shaped language (verbs: create, build, implement, deploy, monitor + objects: system, agent, job, worker, script, pipeline, protocol)
2. Extracts candidate tasks
3. Cross-references against `OPEN-ITEMS.md` and `mailbox/to-*/WORK-QUEUE_*.md`
4. Flags any unassigned task (missing TRK, executor, scope, or timeline)
5. Generates `UNASSIGNED-TASKS_[DATE].md` report
6. Surfaces report to Jorge for action (queue or defer)

### Owner (Jorge) participation

**Before closing the session:** Jorge reviews the compliance report and responds to each flagged task with one of:

- **"Queue this task TRK-2026-NNNN to [EXECUTOR]"** — triggers work queue file creation
- **"Defer [task name], reason: [brief reason]"** — parks the task, reviewed weekly

Jorge never implements the hook, configures it, or debugs it. Cloud owns the implementation. Jorge's only action is one-word decisions.

### Configuration

This hook is configured in `.claude/settings.json` under the `hooks` array:

```json
{
  "hooks": {
    "session.post_end": [
      {
        "name": "post-session-compliance-check",
        "script": ".claude/hooks/post-session-compliance-check.sh",
        "args": ["${REPO_ROOT}", "${SESSION_ID}", "${TRANSCRIPT_PATH}"]
      }
    ]
  }
}
```

### Exit codes

- **0** — Session is compliant (no unassigned tasks)
- **1** — Unassigned tasks found (report generated, session blocked until reviewed)

### Output

- **`mailbox/to-desktop/UNASSIGNED-TASKS_[DATE].md`** — Report with flagged tasks and action instructions

---

## Related

- **Rule 9 (CLAUDE.md §9):** Task assignment governance — the rule this hook enforces
- **TRK-2026-9410:** The tracking number for this enforcement system
- **OPEN-ITEMS.md:** The source of truth for all active and assigned tasks

---

_Last updated: 2026-10-12_
