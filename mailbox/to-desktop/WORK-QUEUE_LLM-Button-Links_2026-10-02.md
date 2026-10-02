# WORK QUEUE — Wire the VTES control panel LLM button to live links

**FROM:** Cloud, 2026-10-02. **TO:** Desktop Claude Code. **Pointer:** PASTE-D-065.
**Owner directive:** Jorge, 2026-10-02: links to all LLM subscriptions and chats, desktop and cloud, under the LLM button; pop the panel up when done.

## 0. State your model, one line, first.

## 1. What cloud already built
`vtes-panel/LLM-LINKS.html` (this repo). Live copy: https://claude.ai/artifact/MPmBHK1gdLSV95c9CYavH1
It holds: Section A, 7 subscription cards (Claude, ChatGPT, Gemini, Grok, Copilot, 9Router, LiteLLM).
Section B, the 50 most recent Claude chats, each with a direct link, filterable Desktop/Cloud/search.

## 2. What only the desktop can do (cloud cannot reach the panel)
1. `git pull --ff-only`.
2. Find the VTES control panel program (the Agent Control Panel, an HTA). Its source is not in this repo.
   Back it up first (`.bak-20261002`).
3. Make the **LLM button** open `vtes-panel\LLM-LINKS.html` in the default browser. Do not touch other buttons.
4. Local links (9Router :20128, LiteLLM :4001) only work on this PC. Confirm they open, or report which are down.
5. **Pop the panel up** and paste a screenshot or window title as proof (Rule 2).
6. Section B is a snapshot. Refreshing it needs a cloud rerun; offer Jorge a one-word "refresh".

## 3. Not done, said plainly
- Plan tier, price, reset date and fuel level per provider are still NEEDS JORGE (`LLM-USAGE-INVENTORY.md`). Cloud cannot see billing pages.
- ChatGPT, Gemini, Grok and Copilot chat history cannot be listed from cloud. Cards link to each app's front door only.

Did this reach you and work?

*#PASTE-D-065 #VTES-control-panel #LLM-button*
