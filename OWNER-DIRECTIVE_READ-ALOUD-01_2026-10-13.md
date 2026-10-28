# OWNER-DIRECTIVE READ-ALOUD-01 — every reply can be heard with one key
Issued by Jorge Valdes, 2026-10-13 (Cloud session). Applies to: Code Cloud, Code Desktop (RAMBO), Cowork, Chat, Codex, Gemini, Grok, Copilot/Joey, all bots.
#owner-directive #read-aloud #speechify #accessibility #JorgeValdes

## What Jorge asked
"Set up PAD or a bot to click the copy button under each reply, paste it into Speechify and click it to auto-read. Add it as an owner's directive protocol and share it with all related systems."

## Objection recorded (Rule 3) and the chosen design
1. A bot that clicks the Copy button by screen position breaks whenever the chat page layout changes, and it can click the wrong window when several are open. Speechify's own buttons can't be pressed reliably by a script either.
2. **Chosen:** one hotkey on the PC, with no screen-position clicking.
   - Jorge clicks **Copy** under a reply (one click).
   - Then he presses **Ctrl+Alt+R**. The reply opens in a clean big-text page in Microsoft Edge, and **Edge "Read aloud" starts by itself**.
   - **Ctrl+Alt+S** opens the same page in Chrome instead, for the Speechify extension. There Jorge presses Speechify's play.
3. Stage 2, optional, after one week of use: let the bot also find the newest Copy button by its picture. Only if stage 1 proves too many clicks.

## Rules for every agent (all windows, all LLMs)
1. **Every reply must read well aloud.** Plain words, short paragraphs, numbered lists, few tables, labels spelled out, and no raw code in the parts meant for Jorge.
2. **Put the answer first.** The first two sentences must make sense if Jorge stops listening there.
3. **When a reply contains a paste block,** say so in one spoken sentence before it, e.g. "There is one paste block for the desktop window below."
4. **Never put secrets in a reply.** Read-aloud pages are saved on the PC (%APPDATA%\VTES-ReadAloud\reply.html, overwritten each time).

## Files
- tools/readaloud/Read-Aloud.ahk — the hotkeys (AutoHotkey v2).
- tools/readaloud/Install-Read-Aloud.ps1 — installs AutoHotkey if missing, copies the script to C:\VTES-LOCAL\ReadAloud\, adds a Startup shortcut, starts it.

## Status
Built by the cloud on 2026-10-13. **Not yet installed on the PC.** It needs the desktop helper (RAMBO) or one paste by Jorge. Not tested on Windows yet, so it is unverified until the first Ctrl+Alt+R works.
