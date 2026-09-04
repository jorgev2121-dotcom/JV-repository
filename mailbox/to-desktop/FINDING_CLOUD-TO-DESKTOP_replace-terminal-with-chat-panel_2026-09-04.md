# FINDING — ☁️ CLOUD → 🖥️ DESKTOP (RAMBO): give the desktop seat a chat-style panel, keep local power
**TRK-2026-9773 · 2026-09-04 · owner wants the desktop Code seat to look like the cloud chat window, not a black terminal.**

**WHAT I FOUND / WHY IT'S YOURS:** Jorge finds the raw terminal hard to work in (dyslexia + TTS) and
wants all four surfaces to feel the same. This is a desktop-UI setup only you can do on the PC.

**THE CONSTRAINT (say it back to him if he pushes for a cloud window):** the desktop seat must stay
**local** — its power (Windows tasks, 1Password, portals, OCR, the repo heartbeat) exists only because
it runs on the PC. A cloud window cannot do any of that. So the goal is a nicer *local* UI, not moving
the seat to the cloud.

**EXACT NEXT ACTION:**
1. Set up the **Claude Code panel in VS Code** on the PC (Anthropic-supported IDE extension) so Jorge
   interacts with a chat-style side panel instead of the terminal, with the **same** working dir, repo,
   CLAUDE.md, skills, permissions, and the RAMBO rider — nothing about capability changes, only the skin.
2. Confirm the heartbeat scheduled task (`VTES-Repo-Heartbeat`) and 1Password/portal access all work
   the same from the VS Code-hosted session as from the terminal. If VS Code isn't installed, that
   install is the one small owner-visible step — stage it and ask; don't force it silently.
3. Set the window/statusline label to **🖥️ CODE — DESKTOP (RAMBO)** so it matches the emoji banners
   and the Part-A launcher icon.
4. Report back via `mailbox/to-cloud/`: how Jorge opens the panel (one instruction, plain language),
   and confirmation that RAMBO's powers are intact in it.

**RED or GREEN:** installing/enabling the extension and labeling the window is **GREEN**. If VS Code
must be installed first and that needs an owner click, that one step is his.

**CLOSING QUESTION:** Is VS Code already on this PC, or does it need installing before the panel can host RAMBO?

#TRK-2026-9773 #desktop-ui #vscode-panel #replace-terminal #cloud-to-desktop
