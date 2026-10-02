# WORK QUEUE — Copy the live control panel and its backups into Drive for Gemini

**FROM:** Cloud, 2026-10-02. **TO:** Desktop Claude Code. **Pointer:** PASTE-D-067.
**Owner directive:** Jorge, 2026-10-02: share the VTES control panel, its history and the most recent version, so Gemini can take over.

## 0. State your model, one line, first.

## 1. Why
Cloud cannot read the PC. Gemini cannot read the PC either unless it runs there. Drive is the only place all of them can read. This job only writes **new** files. It is GREEN.

## 2. Steps
1. `git pull --ff-only`.
2. Confirm which file is the live panel. Two names are in play: `C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html` and `C:\Users\JV\Desktop\ControlPanel.html`. Report both with size and last-modified time. Say which one the Desktop shortcut opens.
3. Create the folder `PANEL-VERSIONS_2026-10-02` inside `G:\My Drive\VTES-PANEL`.
4. **Copy** (never move) into it: the live panel, every `.bak-*` copy in the same folder, `C:\Users\JV\JV-repository\VTES-CONTROL-PANEL.html`, `C:\Users\JV\Desktop\_FILED\02-Pages-HTML\ControlPanel.html`, and `C:\Users\JV\LLM-Control-Panel\architect-executor.html`. Add the suffix `_COPY-20261002` to each copy so nobody mistakes one for the original.
5. Write `PANEL-VERSIONS_2026-10-02\INDEX.md` listing each copy: original path, size in bytes, last-modified time, and one line on what changed from the previous version. Cite the history file `VTES-CONTROL-PANEL_HISTORY-AND-LATEST_2026-10-02.md` in the same folder.
6. If PASTE-D-066 (header fix) is not yet done, copy the panel **before** that edit and again after.

## 3. Proof (Rule 2)
Paste the folder listing with sizes. Each copy's size must match its original. Mismatch means BLOCKED.

## 4. Do not
- Do not edit, move or delete any original.
- Do not copy anything that holds a password or key. If a file contains one, skip it and say which.

Did the copies land in Drive?

*#PASTE-D-067 #VTES-control-panel #gemini-share*
