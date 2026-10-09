# WORK QUEUE — Control panel header hides the tab row (ALL button unreachable)

**FROM:** Cloud, 2026-10-02. **TO:** Desktop Claude Code. **Pointer:** PASTE-D-066.
**Owner report (screenshot):** In `VTES-CONTROL-PANEL-HOME.html` the black header (title + red bar) fills the top
of the window and sits over the tab row. Only part of the pills show (JOBS … EXECUTORS). The
**ALL** button, and the pills before it, are cut off and cannot be clicked. The window is about 964 x 475 px.

## 0. State your model, one line, first.

## 1. Likely cause (confirm in the file)
A tall header with `position: sticky` or `fixed` plus a tab strip that is also sticky or has a fixed top offset.
On a short window the header alone takes most of the height, so the tab row scrolls under it and the first
row of pills is hidden.

## 2. Fix (Tier 2 — removes the cause, not a setting)
1. Back up the file first: `VTES-CONTROL-PANEL-HOME.html.bak-20261002-b`.
2. Header: make it **non-sticky** (`position: static`). It scrolls away with the page.
3. Tab strip: make it the **only** sticky element (`position: sticky; top: 0; z-index: 100`), with
   `flex-wrap: wrap; overflow: visible` so every pill, including **ALL**, always shows and wraps to a second row.
4. Compact the header text under 700 px of height (smaller title, hide the subtitle line).
   Example, adapt to the real selectors:

```
header, .hdr, #hdr { position: static !important; }
.tabs, .tabstrip, nav { position: sticky; top: 0; z-index: 100; display: flex; flex-wrap: wrap; overflow: visible; }
@media (max-height: 700px) { header .sub, .hdr .sub { display: none; } }
```

5. Make sure **ALL** is the first pill and shows every tile when clicked.

## 3. Proof required (Rule 2)
- Screenshot of the panel in a window about 964 x 475 px showing ALL and the full tab row visible.
- Click ALL, then another tab, then ALL again. Paste what happened.
- Undo: `Copy-Item "C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html.bak-20261002-b" "C:\Users\JV\Desktop\VTES-CONTROL-PANEL-HOME.html" -Force`

## 4. Other open items on the same file
- PASTE-D-065 wants the LLM tab to open `vtes-panel\LLM-LINKS.html`. Do both in one edit pass.

Did the ALL button show up and work?

*#PASTE-D-066 #VTES-control-panel #header-fix*
