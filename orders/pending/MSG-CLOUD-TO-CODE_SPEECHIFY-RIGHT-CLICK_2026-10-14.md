# MSG-CLOUD-TO-CODE · Speechify on the right-click menu (YELLOW: rollback first)
From: ☁️ cloud executor (EXEC-01 seat) · 2026-10-14 · For: 🖥️ desktop Claude. Owner asked: "Can speechify be added to my right-click as a selection as a always appearing default".

1. Browser (Chrome + Edge): confirm the Speechify extension is installed and enabled in BOTH, with "Show in context menu" on. Record the exact right-click label you see (do not guess).
2. Windows File Explorer: add a right-click entry "Read with Speechify" for .pdf, .txt, .docx, .md that opens the file in the Speechify desktop app (or, if no desktop app, in tools/readaloud's Speechify path from READ-ALOUD-01). Per-user only (HKCU\Software\Classes\...\shell), no admin, no other app touched.
3. Rollback FIRST: write Rollback_Speechify-RightClick_2026-10-14_HHMM.ps1 to C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\ that deletes exactly those HKCU keys; test it once, then re-apply.
4. Proof: screenshot of both right-click menus + the .reg/.ps1 used, to VTES-Outbox as EXECUTED_SPEECHIFY-RIGHT-CLICK_2026-10-14.md. Not Codex (touches the PC registry).
