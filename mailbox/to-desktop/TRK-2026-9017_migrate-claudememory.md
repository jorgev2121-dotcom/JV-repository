# TRK-2026-9017 — Migrate ClaudeMemory into this repo

**FROM:** Cloud session (claude.ai/code), 2026-08-15
**TO:** Desktop Claude Code
**PRIORITY:** High — this is the last thing keeping two separate brains alive

---

## TASK

Migrate the contents of `OneDrive\Documents\ClaudeMemory\` into this repository.

1. Read everything in `ClaudeMemory\`, including `DIRECTIVE-REGISTER.md`.
2. Reconcile it against `CLAUDE.md` in this repo. Where a directive already exists as
   a rule here, do not duplicate it — note the overlap. Where it does not, add it.
3. Copy any registry, mailbox or state files into this repo, preserving their content.
4. Commit and push to branch `claude/chaude-code-max20-kp2o46`.
5. Leave a short `MIGRATED.md` note in the OneDrive folder pointing at this repo, so
   no future session writes to the old location.

## WHY

Cloud sessions cannot read OneDrive — the Microsoft 365 connector is unauthorized and
cloud has no access to the PC regardless. As long as governance lives in OneDrive,
half of Jorge's Claude sessions cannot see it. That is the root cause behind RI-005.

## DONE WHEN

- `git log` shows the migration commit pushed to the branch, and
- the ClaudeMemory content is readable in this repo, and
- you have pasted the output of `git show --stat HEAD` as evidence.

Per `CLAUDE.md` Rule 2: no pasted evidence means this is not done.

## ALSO, BEFORE YOU START

Read `CLAUDE.md` in this repo and quote **Rule 1** back to Jorge. He needs
confirmation that the charter actually loads on the desktop side.

Note for the desktop session: your last message ended by asking Jorge to pick one of
four technical options. Rule 1 and Rule 7 forbid that. Recommend one option, give the
tradeoff in a single line, and proceed unless he objects.
