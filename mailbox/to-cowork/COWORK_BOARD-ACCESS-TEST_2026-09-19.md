# 🤝 COWORK — BOARD-ACCESS TEST (proves Cowork can join the loop A-to-Z)
**2026-09-19 · TRK-2026-9800 · owner-approved. This is the one test that switches OD-COWORK-FIRST-01 fully ON.**
**Goal: prove Cowork can READ the shared board, WRITE to it (repo + Drive), and hand the result back. TEST-BEFORE-SHIP.**

## The token (anti-fabrication — copy it exactly into every step)
`COWORK-TEST-TOKEN-9F3A-20260919`
Do NOT invent results. Each PASS must carry real evidence (a quoted line, a commit hash, a Drive file id). "Looks like it worked" = FAIL.

## Step 1 — READ the repo board (proves read)
Open `atlas/BUSINESS-BRAIN.md` in this GitHub repo (branch `claude/slack-app-overview-3i0w4g`). Quote its **Principle 0 heading line** verbatim. → evidence for T-1.

## Step 2 — WRITE to the repo board (proves repo write + version control)
Create a new file `mailbox/from-cowork/RESULT_BOARD-ACCESS-TEST_2026-09-19.md` containing:
- the token above,
- the current date/time,
- the Principle 0 line you quoted in Step 1,
- one sentence: "Cowork wrote this file directly to the repo."
Then **commit and push** it to the branch. → evidence for T-2 = the **commit hash**. (If you cannot git-commit, save the file and say so — that itself is the finding.)

## Step 3 — WRITE to Drive (proves Drive write)
Create a small text file named `COWORK-BOARD-TEST_2026-09-19.txt` in Google Drive (root or the mailbox folder) containing the token + timestamp. → evidence for T-3 = the **Drive file id / link**.

## Step 4 — REPORT BACK (hand-back A-to-Z)
Write your PASS/FAIL table into `mailbox/from-cowork/RESULT_BOARD-ACCESS-TEST_2026-09-19.md` (same file):

| Test | Result | Evidence |
|---|---|---|
| T-1 read repo | PASS/FAIL | the quoted Principle 0 line |
| T-2 write repo + push | PASS/FAIL | commit hash (or "cannot commit — reason") |
| T-3 write Drive | PASS/FAIL | Drive file id/link |
| T-4 hand-back | PASS/FAIL | this file exists in from-cowork |

## What each outcome means (for OD-COWORK-FIRST-01)
- **All 4 PASS →** Cowork is a full board member; **Cowork-first routing switches fully ON.**
- **Read PASS, repo-write FAIL, Drive-write PASS →** Cowork is Drive-only; route Cowork work that lands in Drive, Code keeps repo commits.
- **Reads only →** Cowork stays pull-when-opened; hand-backs come as pasted files, Code commits them.

## RED / GREEN
GREEN — creating new files that didn't exist, on the board. No client file moved, no spend, nothing outbound.

**CLOSING QUESTION:** Which of T-1..T-4 passed, and does the token appear in both the repo file and the Drive file?

#cowork #board-access-test #OD-COWORK-FIRST-01 #TEST-BEFORE-SHIP #TRK-2026-9800
