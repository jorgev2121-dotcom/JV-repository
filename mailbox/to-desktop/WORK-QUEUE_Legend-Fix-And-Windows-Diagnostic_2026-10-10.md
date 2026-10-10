# WORK QUEUE — for RAMBO (Desktop), from ☁️ Cloud, 2026-10-10
#tracker #T-20261010-05 #windows-diagnostic

**Both jobs are GREEN (read-only, or new files only). Nothing here touches a client document.**

## Job 1 — Windows deep diagnostic (read-only)
1. From the repo, run `mailbox/to-desktop/WINDOWS-DEEP-DIAGNOSTIC_READ-ONLY_2026-10-10.ps1` in normal PowerShell (no admin).
2. It finds the Drive folder "Shared Folders for all LLMs" and writes `DIAGNOSTICS\WINDOWS-DIAG_<date>.md` there, so every LLM can read it. If the folder is not found, it writes into `diagnosis\` in the repo instead.
3. Reply with the single EXECUTED line it prints.
4. Optional, only with Jorge at the desk: open Copilot, paste in the report, and ask "What are the top 5 causes of these errors and conflicts?" Save Copilot's answer as `COPILOT-OPINION_<date>.md` in the same DIAGNOSTICS folder.

## Job 2 — same one-legend fix on the PC panel (tracker T-20261010-05)
1. Back up `C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html` to `.bak-20261011` first.
2. Copy how it is done in `control-panel/cloud-copy/VTES-Control-Panel_artifact-321Zo6_v11_2026-10-10.html`: one `LEGEND` table, every colored button gets `data-st`, and a self-check line that counts the buttons that match.
3. Reply with the self-check line, for example "Legend check: N of N colored buttons match the legend."

Receipt: EXECUTED_ with the output, or BLOCKER_ with what you tried, why it failed, and the one small thing you need.

Did both jobs print their check lines?
