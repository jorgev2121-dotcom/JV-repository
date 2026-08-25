# MIRROR of RESULT-D2C-9740 (desktop → cloud, 2026-08-25 17:12 ET)
**Cloud mirrored from Google Drive `_CLAUDE-MAILBOX`. #desktop-mirror #TRK-2026-9903 #mic #icons**

Answers `TASK-C2D_INSTALL-4-CLAUDE-APPS-WITH-MIC-AND-DESKTOP-ICONS`. One reversible change
(4 desktop shortcuts, undo command below). Nothing installed/downloaded/enabled/deleted. Freeze respected.

## The task's premise was wrong in Jorge's favor
1. **The Claude desktop app is ALREADY installed and running** — package `Claude_pzs8sxrjxfjjc`,
   **v1.34493.1.0**, Appx status Ok, 13 live processes, visible window titled `Claude`. **Nothing to
   install, no download, no sign-in.** (This supersedes cloud's "run the installer in Downloads" — it's
   not merely downloaded, it's installed and live.)
2. **Cowork is NOT a separate app** — it's a surface inside that one Claude window (`cowork-svc` PID 81352
   logs under the app's own folder). A COWORK icon can only open the same app; no invented deep-link.
3. **Local Claude Code exists in TWO versions:** winget `2.1.140` at `~\.local\bin\claude.exe` (what the
   shortcuts point at) and bundled `2.1.237` under `AppData\Roaming\Claude\claude-code\`. The shortcut
   targets the older one — worth knowing before debugging "Code behaves differently in two windows."

## The mic — cloud's theory was WRONG (important)
The OS grants the microphone to **both** the Claude app AND Chrome (Global mic Allow HKCU+HKLM; app Allow;
NonPackaged/Chrome inherits Allow; JV Lenovo USB headset present, Status OK). **So moving Jorge to the app
would NOT have fixed a mic problem — Windows was never blocking it.** If browser dictation fails, the cause
is one level up: a Chrome per-site permission for `claude.ai`, the wrong default input device in Chrome, or
the cloud Code surface simply not offering a mic button — not a Windows privacy setting. The desktop (headless)
**cannot certify a live mic** — that needs Jorge to speak into it and watch text appear.

## What the desktop BUILT — four plain-ASCII icons (done, read back, reversible)
On the REAL desktop `C:\Users\JV\OneDrive\Desktop` (not the phantom `C:\Users\JV\Desktop`):
- **CHAT** → the installed Claude desktop app (has OS mic = Allow)
- **COWORK** → same app window (Cowork is a tab inside it)
- **CODE** → the local desktop executor via existing `Open-Code-Executor.vbs`
- **CLOUD** → Chrome app-window on `claude.ai/code`, CU-Business profile

All four names pure ASCII — nothing renders as `??`. No screenshot (headless can't see the screen; Jorge
looking at his own desktop is the proof).

## What it costs Jorge: ONE look, not an install
Click **CHAT**, look for the microphone button — that single click answers the mic question this whole task
was built around. No install, no sign-in, no admin.

**UNDO (removes only the four icons):**
`powershell -ExecutionPolicy Bypass -File "C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\Rollback_FourClaudeIcons_2026-08-25_1710.ps1"`

*Mirrored + QC'd by cloud 2026-08-25. Corrects cloud's install-theory and mic-theory. #desktop-mirror*
