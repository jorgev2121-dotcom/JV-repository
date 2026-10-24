# TASK-C2D: Plaud bridge and iPhone connection check (READ-ONLY)

From: cloud window. To: Desktop Executor (RAMBO). Date: 2026-10-24. Directive: OD-PL-01, OD-AM-01. Traffic light: **GREEN** (read-only). Do not move, rename, delete, install, send or type any password.

ACK first in VTES-Outbox, then run these and write ONE result file `PLAUD-IPHONE-CHECK_RESULT_2026-10-24.md` there, with a proof line (command output) for every answer. If a step cannot be done, say BLOCKED and why.

1. **Bridge task.** `Get-ScheduledTask -TaskName CU-Plaud-DesktopBridge | Get-ScheduledTaskInfo` : state, LastRunTime, LastTaskResult, NextRunTime.
2. **Catcher script.** Does `Plaud-Import.ps1` exist? Path, LastWriteTime, size.
3. **Folder counts.** Number of files and newest LastWriteTime in: `C:\Users\JV\Desktop\PLAUD - Recordings`, `G:\My Drive\Plaud`, `C:\Users\JV\OneDrive\_FROM-IPHONE`, Downloads (files named *plaud*).
4. **Is the output growing?** Compare the Desktop folder count with `plaud-intake/PLAUD-INTAKE-REGISTRY.csv` (53 real rows, 9 landed at 2026-10-24).
5. **iPhone connection.** Is the iPhone visible to Windows right now (Apple Devices app, or `Get-PnpDevice -FriendlyName "*iPhone*"`)? Is the Apple Devices app installed? Do NOT click Trust. If the phone shows as locked, say so.
6. **IPHONE-MIRROR job (22 Oct).** Did it run? Is there anything in `G:\My Drive\VTES-Outbox\IPHONE-MIRROR\`? Quote file names and dates.
7. **Heartbeat.** Does a heartbeat check for the bridge exist (output-growth based, RI-002)? If not, say so; do not build it yet.

Closing question for the result file: "Shall I build the output-growth heartbeat for the Plaud bridge?"
