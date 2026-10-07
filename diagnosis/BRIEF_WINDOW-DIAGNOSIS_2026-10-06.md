# BRIEF — window-by-window diagnosis of the VTES control panel (stage 1: cloud agents)

Ordered by Jorge Valdes, 2026-10-06. **Read-only. Diagnose only. Do not repair anything.**
Jorge's words: the VTES control panel "needs overhaul. Header of windows improperly displaying active and inactive windows. Go window by window; have an agent diagnose the problems, then an agent from another LLM diagnose the problems, then submit them to the orchestrator or equal for a final evaluation to make the determination of repairs that need to be made. List them and mention them to me for approval."

## Your rules (non-negotiable)

1. **Read-only.** Do not write, move, rename, send or delete anything in Drive, Gmail or anywhere except the ONE output file named in your task, which goes in `/home/user/JV-repository/diagnosis/` (a new file only).
2. **Never invent a fact.** Every claim carries its source (file name and Drive ID or repo path, and the timestamp inside it). Anything you did not read yourself is marked **UNVERIFIED**.
3. **The cloud cannot see Jorge's PC.** The live panel (`C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html`) and the launcher on the Desktop cannot be opened from here. Say plainly what you could not check, and give the exact PC check for the desktop to run.
4. **Say "ACTIVE", "INACTIVE" or "UNKNOWN" for your window as of now, with the freshest evidence and its age.** "Active" means evidence of activity in the last 60 minutes, not that the window is installed.
5. **Short.** One page. Plain words. Numbered lists, no tables.
6. Honest states only: DONE with proof, BLOCKED (what you tried, why it failed, the one small thing needed), or IN PROGRESS.

## What is known about the defect

- Jorge says the panel/launcher **header misreports which windows are active and which are inactive.**
- Evidence the header is not reading live state: on 2026-10-02 the panel showed **"125 of 131 are off"** (RAMBO report, 09:59 AM ET) while the launcher's repairs log the same day says **"Nodes 1-11 still show a 2026-09-02 snapshot - 90 of 119 tasks disabled" (OPEN)**. The live count in `HEALTH-2026-10-05` is **131 tasks: 34 Ready, 94 Disabled, 3 Running.** Three different numbers, none matching.
- The panel was last rebuilt **2026-09-02 08:52 AM** (footer `TRK-2026-9718 #JOB-0090-R`); the refresher for Nodes 1-11 was switched off (history doc says 2026-09-24). The panel-builder task re-enable (**RED-6**) was approved by Jorge on 10-04 and again on 10-05 but never executed.
- The launcher (`VTES-LLM-LAUNCHER_v3.html`, footer `TRK-2026-9910-B v3 2026-10-02`) has tabs: LLMS, EXECUTORS, BOTS, HAND OFF, QUEUED, STATUS, APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES, REPAIRS. Its repairs log says the IDENTITY section and a title block per window were added 10-02.
- **Open defects already logged:** ALL button hidden under the header (PASTE-D-066), LLM button wiring (PASTE-D-065), desktop copy of the live panel into Drive (PASTE-D-067).

## Sources (Google Drive file IDs; read with the Drive connector)

- Window registry: `142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2` (LLM-WINDOW-REGISTRY_v2.md; windows LLM-01 to LLM-09)
- Executors and orchestrator: `1ewQGj43s0tYzGlbp2E3DS4idmtt5Ztmi`
- Panel history and latest: `19sjnV2k910YE6BZyxa1hG7ksu16-sx2i`
- Panel change-history handoff: `1dIk8pQ-PMHNiyM65bP-XSJ7DBYHBgqjB`
- Phase 2 enhancements order (due 2026-10-03): `16S1yuc6bxT8GeuFxqsYk8LirBKyDO2wS`
- Live seat table (auto, every 10 min): STATE-OF-PLAY.md `1Unf8pWzRfiTp7MtuEQ1vRUuhsOFP2Ho4`
- Heartbeats: `heartbeat.json` `11hqffiroRVO2wH4J6uFZQxUdEzbiDM88`, `HEARTBEAT-ROSTER.json` `1apeD19ETuYUwvPaopbrWMIAUeCl6jJWm`, `_UPTIME-HEARTBEAT.md` `18y-a8VTNf-wZjN9pd5sDHiIevEzLLOlp`
- Remote Control status: `REMOTE-CONTROL-STATUS.md` `1z3ZrMHNBQ53ZnPqhjvLOp_nFIbaWx0Et`
- Daily health report: `HEALTH-2026-10-05.md` `1nC1DsAsLp373PyM00BZaEuxhnecO14IB`
- Latest Cowork board: `COWORK-CDM-PROGRESS.md` `1_qcm0fSY4kxi2Qar5VY5TACaw8wHJ4Zd`
- Handover files: `HANDOVER_RAMBO-DESKTOP.md` `1F5_FfzQ6ypp1AP3i5a_TQHIaaEWEjcsD`, `HANDOVER_ORCHESTRATOR.md` `1_jzkYVyFb9O6crSyCpCzYy5neCQ0balw`
- Repo (`/home/user/JV-repository`): `OPEN-ITEMS.md` (newest rows at the bottom, search `TRK-2026-9960`), `RECURRING-ISSUES.md` (bottom), `control-panel/PANEL.html` and `panel-data.json`, `vts-llm-panel/`, `shift-brief/CURRENT.md`, `mailbox/to-desktop/`, `mailbox/to-cloud/`, `CLAUDE.md` (the charter).
- Drive search works with `title contains '...'` and `modifiedTime > '...'`. Results come about 5 rows a page; use the page token.

## Output file format (your ONE file)

Name: `diagnosis/WINDOW-<ID>_DIAGNOSIS_2026-10-06.md` (or the ledger name in your task). Sections:

1. **Verdict** (ACTIVE / INACTIVE / UNKNOWN as of now, confidence, freshest evidence and its age)
2. **Identity** (what the registry says this window is and does)
3. **What the panel or header would need to show, and where it is wrong or cannot be right**
4. **Defects found** (numbered; each with evidence, severity, and whether it blocks Jorge's work)
5. **Could not be checked from the cloud** (and the exact PC check for the desktop)
6. **Proposed repairs** (one line each; mark RED or GREEN; mark reversible or not). **Proposals only.**
7. End with one cheap yes/no question for Jorge.

Footer: `TRK-2026-9960 · v1 · 2026-10-06 · DIAGNOSIS (stage 1, cloud agent)`
