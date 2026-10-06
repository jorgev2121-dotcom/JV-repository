# CHECK-4 - independent third checker, panel v4, after fix round 2

OPUS 5.5 · PANEL V4 CHECKER 3 · cloud session · 2026-10-06. Checking branch `claude/panel-v4-sonnet-build` at commit 554aaf5.

## Section A - Verdict

**DRAFT 2 - IN PROGRESS. Provisional verdict: FAIL.** PowerShell 7.4.6 for Linux, my own fixtures, SHA256 of every file before and after. Browser checks still running.

Confirmed so far (full evidence in the final version):
1. A second install and rollback can put an OLD copy of Write-VtesStatus.ps1 back over a newer one, because a leftover Write-VtesStatus.ps1.pre-v4 from the first round is reused (ROLLBACK-v4.ps1 line 62 leaves it; EDIT-VtesStatus-v4.ps1 line 30 and INSTALL-v4.ps1 line 106 never refresh it). Result: a code file silently downgraded and the tamper check says PROBLEM.
2. The git-checkout refusal is bypassed when -LiveDir is a link (symlink here, junction on Windows) into the checkout: INSTALL edited the tracked MANIFEST.sha256.
3. A MANIFEST.sha256 with Windows line ends (CRLF) or a byte-order mark is not restored; rollback says it "was changed legitimately" (false) and deletes the only backup.
4. Running Verify once after EDIT, as EDIT itself tells you to, makes the rollback inexact and leaves a stale backup behind.

TRK-2026-9910-B · CHECK-4 · v0 draft · 2026-10-06 · IN PROGRESS · #VTES-control-panel #panel-v4 #independent-check
