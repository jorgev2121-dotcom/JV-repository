# MODEL BLOCK · Fable 5.1 and Opus 5.5 · owner order 2026-10-15 ~4:10 PM ET
☁️ CODE · CLOUD / WEB EXECUTOR · #EXEC-01 #MODEL-BLOCK #OWNER-DIRECTIVE · written by EXEC-01

**Order (Jorge, in his words, cleaned):** Block Claude's two most expensive models, Fable and Opus, from running and using up my usage limits. I never authorized or elevated usage for Fable, yet it keeps getting in.

## Section A — Where Fable 5.1 was getting in (confirmed)
Five scheduled routines were hard-set to `claude-fable-5-1`. Together they fire about 12 times a day:
1. VTES Watchdog (Cowork cloud): 5 runs a day. Last run FAILED, usage limit reached.
2. COWORK-CDM-OWNER-01: 5 runs a day. Last run FAILED, usage limit reached.
3. Weekday business-inbox triage, 7:30 AM ET: this morning's run FAILED, usage limit reached. You received no triage today.
4. Plaza biweekly progress-report drafter, Wednesdays.
5. Sunday 14-day look-ahead sweep.
Older standing notes already said "Do NOT use Fable 5.1" (9/13) and "Fable for QC/review only" (9/26). The routines were never moved. That is the gap.

## Section B — What I changed (Tier 1, a setting)
Switched to `claude-sonnet-5-5` at 3:50 PM ET: Watchdog, CDM, Plaza drafter. Proof: update_trigger returned model claude-sonnet-5-5 for each.
**NOT changed, refused by the platform's safety classifier (no reason given): the weekday triage (trig_011iBy66YmTH8JQSEFReXD8C) and the Sunday sweep (trig_011SVNiLWXU3aich5RNf5AMW).** I did not try to work around the refusal. Both are still on Fable.

## Section C — Where Opus 5.5 is getting in (found, not yet changed)
Triggers that wake an existing session keep that session's model, and a trigger edit cannot change it. Four sessions are on Opus:
1. Task sweeper, 4 runs a day, into session_01FdGT… (Opus).
2. PR #10 daily check, into session_012PM7… (Opus, huge saved context).
3. Medley owner report (5th/15th/25th) and uncategorized-transactions review (every 3 days), into session_01Ddfq… (Opus).
4. County-reply watch and the weekday check, into session_01EVDh… (Opus). U.S. Bank check, one run, same session as item 3.
The Desktop executor on the PC is also set to Opus.
This session (the hourly watch and runner) is now Sonnet 5.5.

## Section D — Recurrence rule: three options
Logged before: model drift (RI-008) and the Fable note of 10-06. A setting alone will drift back.
1. **Tier 1, suppression:** set models by hand on each trigger (done for 3 of 5). Lifespan: days, until someone edits a routine.
2. **Tier 2, removal (recommended):** recreate the Opus-bound recurring triggers as fresh Sonnet runs and disable the old ones. Lifespan: permanent. Failure mode: a fresh run starts with no memory, so each prompt must be self-contained.
3. **Tier 3, enforcement (recommended with 2):** the hourly watch lists every trigger, and re-applies Sonnet to any that show Fable or Opus. Lifespan: re-applied within one hour of drift.

## Section E — PC side
WORK-QUEUE item 34: Desktop executor default model = Sonnet; Opus and Fable only on a per-run yes from Jorge.

## Section F — What cannot be done from here (IMPOSSIBLE)
An account-wide "never allow Fable or Opus" switch. No tool I hold can do it. The nearest control is each routine's model.
