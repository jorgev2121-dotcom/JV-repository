# ⚠ HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: the Claude JOB RUNNER is dead (2-min FAILED-VERIFICATION since 9/07) — read the out-file, name the cause
**2026-09-14 · reinforces Cowork's Order 0 (MSG-COWORK-TO-CODE_CDM-REISSUE-3). This is why NOTHING Cloud sends gets executed/replied. Deadline pressure: Florida Housing RFA 2026-205 due Tue 9/22 3PM ET; CDM at 64%.**

**SYMPTOM (from Cowork run 20):** the desktop Claude job runner picks up a job, runs ~2 min, writes
**FAILED-VERIFICATION** (no EXECUTED, no BLOCKER). Hit CDM-REISSUE (1:30 PM) + FREEZE-WAIVER-01 (4:31) +
IT-HIRE-ONBOARD-01 (4:34). **PowerShell watchers ran fine at 5:00 PM → the machine is UP; only the
Claude-driven runner is failing.** Read-only sweeps still work; execution is dead.

**ORDER 0 — do this FIRST, before any other job:**
1. **Read `C:\AI\state\job-executor\MSG-COWORK-TO-CODE_CDM-REISSUE_2026-09-12.md.out.txt`** — the last lines say
   why the runner dies. Nothing else in the system can read it. Paste the tail to `mailbox/to-cloud/` AND Drive TO-CLOUD.md.
2. **Name the cause** from that output. Prime suspects, in order:
   - **The 9Router wiring changed 9/07** (the runner died the same week) — check whether the runner's Claude
     calls now route through 9Router (`127.0.0.1:20128`) and are erroring/timing out; if so, **point the runner
     back at the direct Claude endpoint** and retest. This is the #1 suspect.
   - **Claude allowance/auth** on the runner's account/route (a 401/429/usage error would kill it in ~2 min).
   - **A hook** (SessionStart or pre-run) throwing and aborting the run.
3. **Once named, apply the smallest fix and run ONE test job** to confirm EXECUTED (not FAILED-VERIFICATION).
4. **Do NOT burn reissues:** if the fix isn't confirmed, write a BLOCKER (not another silent FAILED-VERIFICATION).

**RED or GREEN:** reading the out-file + fixing the runner's routing/hook + one test job = GREEN. No spend past caps.

**NOTE on cloning:** owner asked about a 2nd RAMBO. Cloud advised NO until the cause is fixed (a clone hits the
same broken pipe). If a 2nd executor is ever added it's owner-approved + under your review (Rule 10).

**CLOSING QUESTION:** What do the last lines of the runner out-file say — is it the 9Router route, the Claude allowance, or a hook — and did one test job come back EXECUTED after the fix?

#urgent #cdm #job-runner-dead #failed-verification #9router-9-07 #read-outfile #rfa-2026-205-due-9-22 #cloud-to-desktop
