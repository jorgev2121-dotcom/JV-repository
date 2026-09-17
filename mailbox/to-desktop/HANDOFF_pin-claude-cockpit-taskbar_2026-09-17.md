# 🖥️ RAMBO — pin Claude-Cockpit.hta to the taskbar (owner asked you to execute + confirm)
**2026-09-17 · owner: "Rambo to execute for me and confirm."**

**Task:** put a launcher for `C:\Users\JV\OneDrive\Desktop\Claude-Cockpit.hta` on the taskbar (the tray row).

**Steps (an .hta won't pin on its own — wrap it in mshta):**
1. Right-click `Claude-Cockpit.hta` → Create shortcut.
2. Shortcut → Properties → **Target:** `C:\Windows\System32\mshta.exe "C:\Users\JV\OneDrive\Desktop\Claude-Cockpit.hta"` → OK.
3. Right-click the shortcut → **Pin to taskbar.** (Optional: Change Icon.)
4. Click it once to confirm the cockpit opens.

**RED or GREEN:** GREEN — a launcher on his own machine, reversible. No spend, no client-file move.

**CLOSING QUESTION:** Is the Claude-Cockpit launcher pinned to the taskbar and opening the cockpit on one click?

#claude-cockpit #taskbar-pin #hta #mshta #cloud-to-desktop
