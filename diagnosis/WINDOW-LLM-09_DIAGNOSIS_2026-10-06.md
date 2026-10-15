# WINDOW LLM-09 · Thin API router (bridge) · DIAGNOSIS (stage 1, cloud agent)

Written 2026-10-06 about 03:40 UTC (10-05 11:40 PM ET). Read-only. Nothing was repaired.

## 1. Verdict

**LLM-09 is INACTIVE, and that is the correct answer. Confidence: high for the window, low for the individual routers.**

Why INACTIVE is right: the registry defines LLM-09 as "STANDBY" and "not the main engine" (LLM-WINDOW-REGISTRY_v2.md, Drive 142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2, created 2026-09-30). No evidence shows any priced, approved API run through it. I found none.

Freshest evidence per candidate:

1. **LiteLLM :4001: UNKNOWN right now.** Last proven up at 10-05 4:01 PM ET, a real model reply, "SOS-LLM_RECOVERED" (Drive 1kG2V3AbVo7I4MczJbRlrCDoPrBUC7Y1v). That is about 7.5 hours old. It had gone down at 3:44 PM the same day (SOS-LLM_PRIMARY-DOWN, 1KL0aalb9RHWqVR9vbCl0OjOKR9BNY-if). It flaps.
2. **9Router: NOT running.** The desktop's closeout of 10-05 1:28 AM ET says port 20128 is not listening, confirmed by netstat (Drive 1Cek2nxsADF0921ZdbkXRhgIrCdlkGDoF). The task `CU-9Router-Serve-Guard` shows Disabled in AGENT-ROSTER.csv (Drive 1Pzav1VkksoO0J_8PORsCiVa_-8Uhiv2K, rows stamped 10-05 15:56). Age about 22 hours for the netstat, about 11 hours for the roster.
3. **vts_llm_panel.py: not a service at all.** It is a command-line script (`vts-llm-panel/vts_llm_panel.py`, repo). It can never be "running". It is only ever "has a key" or "no key".

## 2. Identity

Registry says: a routing bridge only. Candidates are `vts_llm_panel.py` (TRK-2026-9200), LiteLLM (RI-038), or "a hosted router". Rule: every API run is priced first and sent to Jorge for approval. Price anchor read 2026-09-30: Haiku 4.5 is $1 in and $5 out per million tokens; Sonnet 5.5 is $2 and $10. Gemini and OpenRouter prices are unverified. No address (`vtes://llm-09`) is listed; LLM-01 to LLM-08 have one.

The registry never names 9Router. Jorge's 10-04 Addendum B (Drive 1fpKH59MPMLEb1Df6W0vSw7XH56CkRYR6) orders "9Router first, Ollama second, LiteLLM demoted to optional, OpenRouter not in the plan." So the registry predates and disagrees with the owner's own routing order.

## 3. What the panel header would need to show, and where it is wrong or cannot be right

Which router is the real one today? **Answer from evidence: none is a proven working paid router.**

1. **LiteLLM :4001 is the only router answering.** But its live config is the local-only file `config-local.yaml` (Ollama models only: local-mistral, local-gemma, local-dolphin, cheap). The Claude tier in `config.yaml` is not loaded. No ANTHROPIC key is set. No budget limit exists. Source: RAMBO report 10-04 8:56 PM ET (Drive 1rZ7q23NNjbux5fdlIhlBpnQh1-9hyb4h). So it is a thin front door to the free local models, not a paid bridge.
2. **9Router is the owner's named first choice and is stopped.** The owner question "keep it removed or restart it" is still open. Cloud's recommendation in OPEN-ITEMS (07:20Z row): keep it removed. The 09-20 approval "Remove 9router as recommended" was never executed.
3. **vts_llm_panel.py has no working keys known.** The repo's `control-panel/panel-data.json` is a seed dated 2026-09-30 00:00 UTC with all four providers NO-KEY. I could not confirm any key was added since (a Gemini key task exists, `mailbox/to-desktop/MSG-CLOUD-TO-CODE_ADD-GEMINI-KEY_2026-09-29.md`; outcome UNVERIFIED).

What the panel should show:

1. **LLM-09 header: "standby" (grey).** Correct for all three candidates.
2. **LiteLLM should show "standby" even when :4001 answers.** A port answering means a service is available. It does not mean the window is active. If the panel turns LLM-09 green because :4001 is up, that is **wrong**. It is the same false-green trap as RI-038 (a health 200 while the models are empty).
3. **9Router should show "standby: stopped".** If it shows "running" anywhere, that is wrong.
4. **vts_llm_panel.py should show "standby: no key", never "running".**

What I cannot confirm: what the live panel actually draws for LLM-09. I could not open it (see section 5). The repo copy `control-panel/PANEL.html` has no LLM-09, router, LiteLLM or 9Router text at all (grep). The launcher v3 in Drive is now only a redirect stub (889 bytes, "This copy was retired 2026-10-02", Drive 1uuH8C6gA-FtPhGoKIbRmhcN2GNtl6tBt) pointing at `C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html`. So no file I can read draws the LLM-09 header.

Is the retired :4000 listener a defect? **Yes, a real but low-urgency one. Severity medium. It does not block Jorge's work.**

1. **The fact is single-source and UNVERIFIED by me.** Only the desktop's closeout (10-05 1:28 AM ET) says port :4000 listens (PID 6552) and that "CLAUDE.md states :4000 retired 2026-07-13." **The CLAUDE.md in this repo contains no such line** (I searched for "4000" and "retired"). The desktop is 92 commits behind and may read a different copy. I cannot locate the 07-13 retirement record.
2. **The only :4000 history I can find is a plan that was dropped.** RECURRING-ISSUES RI-038, 2026-09-27: a plan to run LiteLLM at `localhost:4000` in front of Claude Code. Jorge dropped it that day, and the file said it was "never built on the PC." So a live :4000 listener is not explained by any approved work. Either an old process survived, or something started it again.
3. **Why it matters.** RI-038 says LiteLLM binds 0.0.0.0 behind a hard-coded master key (network-exposed, logged 2026-08-25). An unexplained second listener is another open door. About 45 `litellm.exe` child processes were seen. RI-038's own root cause (2026-09-24) is the watchdog killing and restarting LiteLLM under low RAM, which fits piles of stale processes. Not proven as a leak.
4. **Free memory is thin.** HEALTH 10-05 4:00 PM shows 2.92 GB free, under the 3 GB floor (Drive 1oA3A-s_i5Sn2zHwxnXm-VxNpXSCPBjtp). Stray litellm processes make that worse.

## 4. Defects found

1. **The registry and the owner's routing order disagree.** Registry v2 (09-30) lists LiteLLM as a candidate and omits 9Router. Addendum B (10-04) makes 9Router first and LiteLLM optional. Blocks Jorge's work: no. Severity: medium. A panel built from the registry cannot show the owner's chosen router.
2. **The 9Router decision is open and the contradiction is live.** The 09-20 removal approval was never executed. 9Router was reinstalled (npm 0.5.81, not the 0.5.69 named in the removal order). Addendum B then ordered it first. Asked of Jorge at least since the 09-28 morning report (still open 10-05). Blocks: yes, it blocks any router setup. Severity: high.
3. **The :4000 listener is unexplained** (section 3). Medium. Not blocking.
4. **About 45 `litellm.exe` children.** Unconfirmed as a leak. Low to medium. Not blocking.
5. **"Running" is judged by a port or `/health` answer.** The 10-05 closeout calls LiteLLM "Yes" running on the strength of "I'm alive!" alone. RI-038 says this is the exact false-green. The watchdog was hardened on 09-24 to need a real completion; the closeout and the panel are not known to use that test. Medium. Not blocking, but it is what makes the header lie.
6. **LiteLLM has flapped 10-05 3:44 to 4:01 PM** after the 09-24 "root cause found" fix, and RI-038 has about six logged recurrences. By Rule 4 the answer is not another patch. Open question: the Tier 2 option (remove it) is now in conflict with Addendum B, which keeps LiteLLM "optional" and not to be restart-looped. Not blocking while Ollama carries the load.
7. **Port :4002 is monitored but undocumented.** The SOS notices list :4001, :4002 and :11434. I found no record of what :4002 is. Low.
8. **Stale seed file.** `control-panel/panel-data.json` is dated 09-30 and shows "NONE - all models blocked or unknown." The repo `PANEL.html` shows no router state. Low. Not blocking.
9. **LLM-09 has no `vtes://` address** in the registry, unlike LLM-01 to -08. Low.
10. **The RAMBO health task reads LiteLLM, Ollama and Codex, not LLM-09 as a window.** The panel's LLM-09 card has no data source of its own. Medium for the header problem.

## 5. Could not be checked from the cloud

The cloud cannot see Jorge's PC. Exact PC checks for the desktop (all read-only, no restarts):

1. Open `C:\Users\JV\Desktop\VTES-CONTROL-PANEL.html` and screenshot the LLM-09 card. Does it say standby, running or active?
2. In PowerShell: `Get-NetTCPConnection -State Listen -LocalPort 4000,4001,4002,11434,20128 | Select LocalPort,OwningProcess,LocalAddress`. Record the owner process and whether each binds 127.0.0.1 or 0.0.0.0.
3. `Get-CimInstance Win32_Process -Filter "ProcessId=6552" | Select ProcessId,ParentProcessId,CreationDate,CommandLine`. That names who started :4000, and when.
4. `(Get-Process litellm -ErrorAction SilentlyContinue | Measure-Object).Count` and the total working set. Is the count still about 45?
5. Search the PC's CLAUDE.md for "4000" (`Select-String -Path <the CLAUDE.md the desktop reads> -Pattern '4000'`). Find the 2026-07-13 retirement line and where it lives.
6. `Get-ScheduledTask CU-LLM-Watchdog, CU-9Router-Serve-Guard | Select TaskName,State`. Confirm which one is on.
7. Which of the keys exist on the PC (names only, never values): GEMINI_API_KEY, XAI_API_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY.

Also not read by me: the 8 MB TO-CLOUD.md, the 10-04 Addendum A parent directive, and any file newer than 10-06 03:35Z.

## 6. Proposed repairs (proposals only)

1. **Get Jorge's one-line answer on 9Router (keep removed or restart).** RED (a decision, outbound ask). Reversible. Recommendation stands: keep it removed, because it moves no quote, invoice or client, and the sales directive says park infrastructure.
2. **Panel rule: LLM-09 shows "standby" unless a priced, approved API run is in flight in the last 60 minutes.** A port answering must not turn it green. GREEN (rewrite of one panel rule). Reversible.
3. **Make the router row use a real model round-trip, not `/health`.** Same test the watchdog already uses (Tier 3). GREEN. Reversible.
4. **Update registry v2 to v3.** Name 9Router, say its true state (stopped), and say LiteLLM is local-only and optional per Addendum B. Add a `vtes://llm-09` line pointing at the bridge doc. GREEN (a new file, old moved to `_Superseded`). Reversible.
5. **Identify :4000.** Desktop runs checks 2 and 3 in section 5 and reports owner, parent and start time. GREEN (read-only).
6. **If :4000 is a leftover with no approved purpose: stop that one process, then add a startup check that fails loudly if anything binds :4000.** RED (kills a process). Reversible (relaunch). Prefer Tier 2: remove the cause, not just the process.
7. **Count the litellm.exe children over one hour.** If they keep growing, fix the watchdog's kill-restart loop (RI-038, Tier 3). GREEN to measure, RED to change the watchdog.
8. **Decide the standing RI-038 conflict.** Tier 2 says remove self-hosted LiteLLM; Addendum B keeps it optional. Ask Jorge once; I recommend removal once 9Router or direct API is chosen. RED. Reversible for 30 days if the folder is kept.
9. **Delete or refresh the 09-30 seed `panel-data.json`.** Make the panel show "no data since [date]" instead of a stale NONE. GREEN. Reversible.

## 7. Question for Jorge

Should LLM-09 stay "standby, nothing running" on the panel until you approve a priced API run (yes or no)?

TRK-2026-9960 · v1 · 2026-10-06 · DIAGNOSIS (stage 1, cloud agent)
