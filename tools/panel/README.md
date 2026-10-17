# VTES panel v5 feeder

**What it does.** The v5 control panel shows red "NO DATA" because nothing writes its data files. `VTES5-Feeder.ps1` writes them every 2 minutes from real sources on the PC. If a source is missing, the panel says so. It never makes up a number.

**What it reads.**

1. VTES-Outbox: the uptime, OCR, RAM guard and usage governor heartbeat files, `_LEDGER.csv`, and the newest `EXECUTED_`, `BLOCKER_` and `CAP-REACHED_` files. A name with CODEX in it is Rambo 2. Any other name is Rambo 1.
2. VTES-Inbox `_LEDGER.csv`.
3. The Windows scheduler: tasks whose names start with CU-, VTES- or AI-.
4. Free RAM, read from Windows.
5. The time the Orange Tree index was last written.

**What it writes.** The seven files in `G:\My Drive\MY-DESK\VTES-PANEL\v5-live\data\`. Each one is written to a `.tmp` file first and then swapped in. If a file is owned by another real writer, the feeder leaves it alone. Problems are logged to `C:\AI\panel\VTES5-Feeder.log`.

**Install** (once, in the desktop window, no admin needed):

    powershell -NoProfile -ExecutionPolicy Bypass -File tools\panel\Install-VTES5-Feeder.ps1

This copies the feeder to `C:\AI\panel` and registers the task **CU-VTES5-Feeder**. The task runs every 2 minutes and at logon. It runs hidden at below-normal priority, and each run is stopped after 2 minutes.

**Check it.** Run `VERIFY-v5.ps1 -Path "<panel folder>" -AfterWriters`. It should say OK (after writers).

**Test without the PC.** Run `test/run-feeder-test.ps1`. Then run `node test/check-feeder-output.js <out folder> <path to package/vtes5-live.js>`.

**Undo:**

    Unregister-ScheduledTask -TaskName CU-VTES5-Feeder -Confirm:$false

The panel then goes back to stale, then to NO DATA. It does not show false green.
