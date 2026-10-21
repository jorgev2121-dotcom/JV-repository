# STAGED (not yet in VTES-Inbox) — Build the one-click "Bank and Card Feeds" session. No credentials handled by any agent.
TRK-2026-9952ai · from ☁️ CLOUD · 2026-10-12 · Jorge: "Rambo jumps in, sets everything up. And sets up one click for owner to execute and repeat the process."
**Send only after:** (1) the Claude desktop lane is answering, and (2) the Phase 1 audit (TRK-2026-9952ag) result has come back, because this job takes its institution list from it. Plan: PLAN_BANK-CARD-DOWNLOADS_ONE-SOURCE-OF-TRUTH_TRK-2026-9952ah. Protocol: ONE-PASSWORD-TAKEOVER_TRK-2026-9346.

## HARD LIMITS
- No agent signs in, enters a password or a code, reads a code, or reads the page contents of a bank or card site. No computer-use clicking inside a bank or card page. Jorge signs in himself, with 1Password filling, and enters his own code.
- Never write any password, code, full card number or full account number to any file. Cards and accounts appear as **nickname and last-4 only** (Charter Article 5).
- Moves only: a file is moved only if it matches an exact rule (below). Never match by fuzzy name. Nothing is deleted. Timeout on every step. Every script that runs unattended launches via Run-Hidden.vbs. The launcher window the owner opens is the one visible exception, because Jorge starts it himself.

## What to build
1. **Folder tree.** `C:\Users\JV\OneDrive\Documents\Bank-Feeds\<Institution>_<last-4>\` for each institution in the audit result that is a bank or card, plus `_config\institutions.csv` (columns: institution, nickname_last4, sign_in_url_host, notes, order). The sign-in URL host comes from the 1Password item's URL field (not a secret). Show Jorge the list ONCE for a yes or no before first use (the launcher's first screen).
2. **`_MANIFEST.csv` per folder:** original download name, stored name, date range if shown in the file name, size, SHA256, row count (CSV only), TRK-2026-9952ai, moved-at time, original path (so the move can be undone).
3. **The one click.** `C:\Users\JV\Desktop\Bank-Feeds - One Click.lnk` (the Desktop is a launchpad; the target lives in `C:\AI\scripts\Bank-Feeds-Session.ps1`). When Jorge clicks it:
   a. A small window shows "Institution 1 of N: <nickname> <last-4>" and two buttons: **Open sign-in** and **Skip**.
   b. **Open sign-in** opens that institution's sign-in page in Chrome, in the profile where 1Password is installed. The agent does nothing further on that page.
   c. Jorge signs in with 1Password, enters his code, downloads the statement or transaction file, and clicks **Done**.
   d. On **Done**, the launcher looks in `C:\Users\JV\Downloads` for new .csv, .qfx, .ofx, .pdf, .xlsx files that appeared since step b. Rule for moving: the file must be new since step b AND the extension must be on the list. It moves the file into that institution's folder as `<YYYY-MM-DD> _ <Institution>-<last-4> _ Statement _ <original name> _ v1.<ext>` and appends the manifest row. If more than one new file appears, it moves all of them and lists them. If none, it says "No new file found" and does not guess.
   e. Next institution, until N. Final screen: "n of N institutions have a new file", with the newest file date per institution, and a button to open the run log.
4. **Repeat.** The same shortcut is the whole process, every week or whenever Jorge wants. A second shortcut is not needed.
5. **Run log:** `Bank-Feeds\_RUN-LOG.csv` (time, institution, files moved, skipped, result).
6. **Undo:** `Bank-Feeds\_UNDO_<timestamp>.ps1` per run, moving each file back to its original path.
7. **Weekly read-only check** (Run-Hidden, every 7 days): newest file date per institution; mark **STALE** after 10 days; write one line to the daily digest. It never moves or opens anything.

## Proof (no proof means not done)
- A screenshot of the launcher window at 930x620 (headless render is acceptable if no one is present).
- A dry run with a **dummy test file** named `TEST_Bank-Feeds_DUMMY.csv` placed in Downloads by the job itself: show it moved to the right folder, the manifest row, and the undo script putting it back. Remove the dummy at the end. Do not touch any real file.
- The folder listing and the shortcut's target, pasted into the result.

## Exit
`EXECUTED_...` with the proof, or `BLOCKER_...` with what you tried, why it failed, and the one small thing you need. Report "n of N institutions configured" with the list of nicknames and last-4 only.

Did the dummy file move and come back?
#BankFeeds #1Password #TRK-2026-9952ai
