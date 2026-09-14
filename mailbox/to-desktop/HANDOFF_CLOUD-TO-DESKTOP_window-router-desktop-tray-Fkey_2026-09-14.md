# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: wire the "Which Window Am I?" router to desktop + tray + an F-key
**2026-09-14 · owner wants the window-router (Chat / Cowork / Code · Cloud-Web / Desktop) one keypress away so nothing lands in the wrong window (the Class-A routing error).**

**OWNER DECISIONS 2026-09-14:** **F8 = window router**, **F9 = "My AI Subscriptions" launcher.** Both panels
get a desktop icon + tray icon + their F-key.

**OPEN LOCAL COPIES, not the web links (owner chose local).** Save each artifact's HTML to a local file on the
PC and point the shortcut/tray/F-key at the LOCAL file, so it opens instantly with no internet and no claude.ai
login — a router must never fail to pop. **Refresh the local copy whenever Cloud republishes** (the two source
artifacts: router `56122b47-e833-4189-a2d2-81acee5c7dd4`, subscriptions `f6ff8faf-970d-4589-af8a-ccbeb16a4504`).
The subscriptions panel's Open/Usage buttons are web links, so it still needs internet to *launch* a service —
but the panel itself opens offline.

**WHAT EXISTS:** both panels are published artifacts (URLs above). Use them — don't rebuild the content.

**EXACT NEXT ACTION (GREEN — shell/hotkey wiring, no client data, no money, fully reversible):**
1. **Desktop shortcut** — a `.lnk` on the Desktop (and in `_FILED\` per filing rules) that opens the router
   panel in Chrome (or as an .hta if that's how the other boards run).
2. **Tray icon** — add it to the same tray launcher as the four Claude window icons already built (2026-09-04),
   so it sits with them.
3. **F-key global hotkeys** — via **AutoHotkey** (or PowerToys Keyboard Manager): **F8 → window router**,
   **F9 → subscriptions launcher**, each opening its LOCAL copy. Confirm F8/F9 are free; if either is taken, flag it.
4. **Reversible:** record both shortcut paths, the tray entries, the local-copy file paths, and the AHK lines so
   it's one step to undo. Log it.

**RED or GREEN:** all GREEN (shortcut + tray + hotkey). Nothing irreversible, no spend. **Do NOT put the desktop
in any skip-all-permissions mode to do this** (Rule 9).

**CLOSING QUESTION:** Is the router now on the desktop + tray + an F-key (which key), and did the hotkey pop it from another app?

#window-router #which-window-am-i #desktop-shortcut #tray-icon #F-key-hotkey #autohotkey #green #cloud-to-desktop
