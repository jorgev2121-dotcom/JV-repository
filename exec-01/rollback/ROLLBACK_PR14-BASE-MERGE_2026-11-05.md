# ROLLBACK — PR 14 base-branch merge (YELLOW), 2026-11-05 11:2xZ
Action: merged origin/claude/chaude-code-max20-kp2o46 (cf61cb6) into claude/pensive-allen-tyjgl4. Merge commit a98ad3d7ba6ced232bcb6aa913bf46e2c331cb92. Only conflict: OPEN-ITEMS.md, resolved by keeping every row from both sides.
Why: the weekly PR-14 check found the PR "dirty" (conflict with its base); the standing instruction is to merge the base and push.
Undo (history-safe, no force-push): `git revert -m 1 a98ad3d7ba6ced232bcb6aa913bf46e2c331cb92` then push. That removes the 4 base commits from this branch's tree again and restores the pre-merge OPEN-ITEMS.md. The PR returns to "conflicting with base".
Proof it worked: GitHub showed mergeable_state "clean" at 11:42Z (was "dirty" at 11:21Z).
