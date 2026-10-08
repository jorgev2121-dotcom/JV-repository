# PASTE-D-064 — Owner order: job-watcher hands off to Codex when the Claude cap trips

**From:** ☁️ Code Cloud · **To:** 🖥️ RAMBO (Code Desktop, DESKTOP-OTB90LR)
**Owner approval:** Jorge answered **"yes"** in the cloud window, 2026-10-08 ~4:00 PM ET, to: *"May RAMBO make that change to the job-watcher script?"* He confirms it again in RAMBO's own window with PASTE-D-064.
**Why:** see `RAMBO-DOWN-PROTOCOL.md`, Section D.2. Today the cap tripped at 1:46 AM and 24 jobs sat for 14 hours, with nothing said and nothing passed on.

## The change (one file: `C:\AI\scripts\Inbox-Job-Watcher.ps1`)

1. **Back up first:** `Inbox-Job-Watcher.ps1.bak-20261008`. Write the rollback script to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\Rollback_WatcherFailover_2026-10-08_HHMM.ps1`. All it does is copy the .bak back.
2. **Announce the cap.** The first time each day that the cap trips, write `G:\My Drive\VTES-Outbox\CAP-REACHED_<yyyy-MM-dd>.md` with the time, the cap value, and the count of jobs waiting. Write it once per day, not every cycle.
3. **Hand off instead of skip.** When the cap is reached, take the oldest unexecuted Inbox job:
   - **RED screen first.** If the job asks to send, pay, sign, file or move a client document, delete anything, or use credentials or a CAPTCHA, write `BLOCKER_CODEX_<job>.md` and do not run it.
   - **Otherwise run it with Codex.** Run `codex exec` with the job file's text, working directory `C:\AI\codex-work\<job>` (create it), and AGENTS.md rules. Write the output to `G:\My Drive\VTES-Outbox\EXECUTED_CODEX_<job>_<yyyy-MM-dd-HHmm>.md` and log a line in the watcher log.
   - **One job per cycle.** Codex gets its own daily cap of 12, with its own counter file next to the Claude one.
   - **When Codex fails or isn't signed in,** write `BLOCKER_CODEX-DOWN_<date>.md` once a day and fall back to today's behaviour (skip).
4. **Do not change** the scheduled task's trigger, principal or settings. Do not change the Claude cap of 12 (6 after 10-13).

## Proof required before reporting DONE

1. Run the watcher once with a `-DryRun` switch, or with the Claude counter temporarily copied at the cap value in a test folder, so that it takes the Codex path on **one** GREEN money job from today's backlog.
2. DONE means two files exist: `CAP-REACHED_2026-10-08.md` and one `EXECUTED_CODEX_...` file in VTES-Outbox. Report both file names and their times.
3. Restore the real counter if a test copy was used. Leave the .bak and the rollback script in place.

Did the Codex path produce an EXECUTED_CODEX file, and what time did it land?

#PASTE-D-064 #RAMBO-DOWN #LLM-06 #CODEX #failover #TRK-2026-9952f
