# WINDOW LLM-07 · Grok (SuperGrok) · SECOND OPINION — stage 1 diagnosis

Cloud agent, read-only, 2026-10-06. Nothing was changed anywhere. This file is the only thing written.

## 1. Verdict

**UNKNOWN. Confidence: high that it is unknown, not high that it is dead.** The window has no heartbeat anywhere, so "active in the last 60 minutes" cannot be shown for it. It is a browser tab (grok.com) plus a command-line call, neither of which writes a heartbeat.

Freshest evidence, with age:

1. **Lane proven alive 2026-09-05, about 31 days ago.** A real Grok completion came back (`FINISH: stop`, key ending `kcWM`, model `grok-4.6`, 268 s). Source: Drive `FINDING_THE-HEARTBEATS-GREEN-LANE-IS-INVERTED...2026-09-05.md`, id `1OLzS0iNv8Vd2Utp9rCS106fULqYVOquZ`, created 2026-09-05 19:22 UTC.
2. **Last planned use 2026-09-23, 13 days ago, with no proof it ran.** Cloud ordered a "Grok orchestrator task" and a `direct_router` test (Drive `MSG-CLOUD-TO-CODE_GROK-ONBOARD_..._ADDENDUM-02`, id `19TRUtcCBWcxdSkHPiybRF662Gb19cV_G`). The only trace in Drive is three auto-ACKs (04:06 to 04:09 PM ET). I found no EXECUTED file and no Grok-orchestrator output. The desktop's own BLOCKER said the queue exceeded the 6-run daily cap.
3. **No Grok activity found in Drive after 2026-09-23.** My searches (`fullText contains 'Grok'`, `'Second-Opinion'`, `'grok-4'`, `'kcWM'`) returned nothing newer than 2026-09-23, except documents that merely list Grok as a lane (executors file 10-01, registry 10-02, owner directive 10-05).
4. **Not in the live seat table.** `STATE-OF-PLAY.md` (id `1Unf8pWzRfiTp7MtuEQ1vRUuhsOFP2Ho4`, auto-written 2026-10-05 23:34 ET) lists five seats (RAMBO, ORCHESTRATOR, LOCAL-EXECUTOR, COWORK, CHAT) as active. Grok is not a seat. It appears only as a row in the lanes table with no status. `HEARTBEAT-ROSTER.json` (id `1apeD19ETuYUwvPaopbrWMIAUeCl6jJWm`, 2026-10-05 23:33 ET) holds only VTES-LOCAL-POLLER and RECONCILER.

Is the lane alive or dead? **Alive on 09-05, unproven since.** The "dead key" claim in the registry is stale or ambiguous (defect 1).

## 2. Identity

Source: `LLM-WINDOW-REGISTRY_v2.md`, id `142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2`, footer 2026-09-30.

1. LLM-07, emoji 🔮, Grok (SuperGrok), nickname "Fabian". Job: second-opinion analysis, live-web answers, sanity checks on Claude's work.
2. Billing per registry: **SuperGrok subscription.** "The old API key is dead; a replacement is allowed only as a priced, approved routing bridge."
3. Handoff: Jorge pastes a file or Drive link into the chat. Results come back by Jorge's copy or LLM-02 filing.
4. Address `vtes://llm-07` goes to https://grok.com.
5. Executors file (id `1ewQGj43s0tYzGlbp2E3DS4idmtt5Ztmi`, 2026-10-01) lists a different thing under the same name: GROK lane, `Second-Opinion.ps1 -Prompt "<q>"`, **paid xAI API key**, cannot write files.
6. The owner directive of 2026-10-05 (id `1puUp3k_fNt1r09sbKiObwRi3FkbF7IgX`) says Grok is an advisor "behind glass in a browser", not on the depth chart.

## 3. What the header must show, and where it is wrong or cannot be right

LLM-07 is really two things, and one badge cannot be right for both:

1. **The chat tab (SuperGrok, grok.com).** Nothing can observe it from the PC or cloud. It can only show "UNKNOWN, last used: Jorge says".
2. **The API lane (`Second-Opinion.ps1`).** This one can be probed honestly with a real round trip on the desktop and stamped with the time.

What the panel and launcher do today:

1. **Launcher v3 shows no live state for LLM-07 at all.** The LLM-07 card is static text. The only colour is the pool class, which is hard-coded `cls:'free'` (green) for LLM-07 although its pool text reads "SuperGrok / paid xAI key". Source: the 20 KB retired copy `VTES-LLM-LAUNCHER_v3.html.bak-20261002-retired`, id `1yoVUY_PrUwAfuFi29kzarKwXqsyOwjQl` (the only readable copy; the Drive v3 file is now an 889-byte redirect stub). So the launcher does not claim "ready", but its green "free" label implies no cost and no problem.
2. **The repo panel shows Grok as NO-KEY, which is a claim about the cloud box.** `control-panel/panel-data.json` says grok `NO-KEY`, `XAI_API_KEY not set`, `SKIP`, stamped `generated_at 2026-09-30 00:00 UTC`, note "SEED FILE". It is 6 days old and was never regenerated from the desktop. It reads only the `XAI_API_KEY` environment variable, and the 09-01 verdict (id `1Rb-XUWqF8wiBXBdA7d4G_Vo9FVb8PWNb`) says that variable is absent in all three scopes on the desktop. The working key lives in a file on the Desktop. So this badge would show Grok red even when `Second-Opinion.ps1` works.
3. **The same health code would also fail a good key.** `vts-llm-panel/vts_llm_panel.py` line 45 calls model `grok-2-latest`, which the 2026-08-26 desktop result (id `1Mdi331TWUu4PAbSUZhPDjEiXyD_pUs0u`) says is retired. Live ids are `grok-4.3`, `grok-4.5`, `grok-4.6`. Last repo change to that file 2026-08-30, so not fixed.
4. **The live HOME.html panel and the current launcher could not be read** (PC only). Whether either shows Grok as ready is UNVERIFIED (section 5).

**So the answer to "does the panel show it ready when its key is dead?":** neither readable artifact shows Grok as READY. The repo panel shows it dead (no key), the launcher shows nothing. The error is the other way round: the repo panel's "NO-KEY" is probably false for the real lane, and nothing shows when it was last proven.

## 4. Defects found

1. **The registry's "old API key is dead" is stale and half true. Severity: medium. Blocks work: no, but it misleads routing.** Two keys exist (id `1Rb-XUWqF8wiBXBdA7d4G_Vo9FVb8PWNb`). Key ending `avHC` was rejected 2026-08-25 (HTTP 400). Key ending `kcWM`, in a file on the Desktop, returned HTTP 200 on 2026-09-01 and a full completion on 2026-09-05. Nobody has updated the registry, and the later 09-05 finding closed register row 41 as "wired".
2. **Billing contradiction. Severity: medium (policy and money). Blocks: no.** Registry billing standard says every window "runs on a SUBSCRIPTION", API keys only as a thin bridge, priced and approved first. Executors file, STATE-OF-PLAY and launcher say Grok is "paid xAI key". Both cannot be the standard. Evidence the key is metered: the 09-05 run was "billed-tested". Evidence of a separate subscription: SuperGrok $30/month, last charged Aug 17 (`agent-results/C7-subscriptions-burn-rate.md`), plus X Premium Plus $40/month. I found no record that the API calls were priced or approved per the standing rule (TRK-2026-9952e). That is UNVERIFIED either way.
3. **No heartbeat or status for LLM-07 anywhere. Severity: high for Jorge's complaint. Blocks: no.** It is absent from the seat table, the heartbeat files and the bots list. The panel cannot say ACTIVE or INACTIVE for it, only a stamped probe could.
4. **Repo panel-data.json is a six-day-old seed that reports Grok as NO-KEY. Severity: medium. Blocks: no.** Wrong source (env var, cloud box) and wrong age. The same "all four NO-KEY" mistake was already named in the 08-26 desktop result (TRK-2026-9817).
5. **`vts_llm_panel.py` uses the retired model `grok-2-latest`. Severity: medium. Blocks: only the panel's Grok leg.**
6. **Launcher card mislabels cost.** `cls:'free'` (green) beside "SuperGrok / paid xAI key". Severity: low.
7. **The 09-23 Grok orchestrator plan and `direct_router.ps1` have no proof of execution.** Severity: medium. If they never ran, the "grok first" routing in ADDENDUM-02 is a paper lane. Blocks: no.
8. **Single point of confusion: two meanings of "Grok" under one ID.** Chat tab versus API script. The launcher's handoff text says "Chat only; cannot write files" while the roles card shows an API command. Severity: low to medium.
9. **Unreviewed items already open from Grok's own work:** defects 2, 3, 4b and 5 in `VTES-Repo-Heartbeat.ps1` and the inverted RED/GREEN control were listed as owner decisions on 2026-09-05. I found no closure. Out of scope for the panel, noted only.

## 5. Could not be checked from the cloud

1. Whether `Second-Opinion.ps1` works today, and the current state of the `kcWM` key and xAI credits.
2. `C:\Users\JV\OneDrive\Documents\Reports\Second-Opinion-Log.md` (the log of every Grok call; would show the real last-use date).
3. The live `VTES-CONTROL-PANEL-HOME.html` and the current launcher (and how each draws LLM-07).
4. Whether grok.com is open or logged in, and the SuperGrok renewal after Aug 17.
5. Whether `C:\AI\system\router\direct_router.ps1` exists and returns READY for grok.

**Exact PC checks for the desktop (read-only except one small, priced test call that Jorge must approve first):**

1. Read the last 20 lines of `Second-Opinion-Log.md` and report the newest date.
2. `Test-Path 'C:\AI\system\router\direct_router.ps1'`, and report its last write time.
3. Open the HOME panel, find the LLM-07 card and report the exact words and colour it shows.
4. Run `Second-Opinion.ps1 -Prompt "Reply READY"` once (costs a fraction of a cent) and report the reply, the time, and the model name. That is the only valid proof the lane is alive today.

## 6. Proposed repairs (proposals only)

1. Update the registry LLM-07 entry to say two things: chat tab on SuperGrok (state "Jorge-reported"), and API lane via the Desktop key file (state "last proven, date"). GREEN, reversible.
2. Settle the billing statement in one sentence: "Grok API is a metered bridge, priced and approved per run" or "no API". RED (policy and spend), Jorge's yes. Reversible.
3. Replace the green "free" label on LLM-07 with a stamped probe result (READY / NOT READY / NOT TESTED, with date). GREEN, reversible.
4. Make the probe a scheduled free-of-judgment check that writes one dated line per lane to a heartbeat file the panel reads, Tier 3 enforcement. The Grok probe costs a few cents, so it needs a priced approval. RED for the spend part, reversible.
5. Delete the `XAI_API_KEY` env-var-only check from `health_monitor.py`, or point it at the key file the real script uses, and change `grok-2-latest` to a live id. GREEN, reversible by backup.
6. Re-run `health_monitor.py` on the desktop so `panel-data.json` is no longer a seed. GREEN, reversible.
7. Close or re-order the 09-23 Grok-orchestrator and `direct_router` item with proof or a BLOCKER. GREEN.

## 7. Question for Jorge

Do you want Grok kept as a chat-only advisor with no API key (a one-line registry fix, nothing to pay)?

*TRK-2026-9960 · v1 · 2026-10-06 · DIAGNOSIS (stage 1, cloud agent)*
