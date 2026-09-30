PASTE-D-064 - 2026-09-30 - Jorge's PC, Claude Code on the desktop (the session named "Claude desktop executor"). Replaces PASTE-D-063.

Jorge speaking directly. Do these four things in order. Jorge is not technical and these windows are new to him: whenever you need a click from him, SHOW a pop-up with big plain words naming the exact button. Do not just write in chat.

Proof from Jorge's screen (2026-09-29): 1Password is ALREADY UNLOCKED. His vault "Jorge Valdes" is open and he searched "desktop". An unrelated "Weak password" banner on the Google - Gmail personal item is only a warning. Do NOT change any password.

1. 9ROUTER LOGIN (was OD-107).
   a. Confirm 1Password is unlocked (it was). If it locked again, pop up ONE message: "Click the 1Password icon in the taskbar, then press Unlock." Nothing else.
   b. Open the 9Router login page. Fill it ONLY with 1Password autofill (Jorge's entry). If there is no saved 9Router entry, STOP and report BLOCKED. Do NOT type guesses. 9Router showed "3 attempts left" before.
   c. If you need Jorge to click something on screen, take a screenshot, draw a red arrow and box on the exact button (PowerShell System.Drawing is fine), save it as CLICK-HERE.png on the Desktop, open it, and pop up: "Click the button the red arrow points to."
   d. Never print, log, or copy any password.

2. FIX THE DEAD POLLER (RAMBO's own 9/27 root cause, Jorge now says YES).
   Create the scheduled task VTES-Bridge-Poller (the missing VTES-LOCAL-POLLER) per the N-1/N-2 directive:
   git show origin/claude/vibrant-albattani-slgt2p:mailbox/to-desktop/OWNER-DIRECTIVE_N1-N2_rebuild-poller-and-heartbeat_2026-09-28.md
   Leave CU-Inbox-Job-Watcher OFF (PR #10 safety gate not merged). Write an undo script first. After creating it, prove it works: heartbeat.json alive_at must be newer than now minus 10 minutes.

3. DESKTOP COMMANDER LAUNCH TEST (Jorge saved it in 1Password three times by accident; all three say "Signs in with Google", so there may be no separate password).
   a. Launch Desktop Commander and try to sign in. If it asks for Google sign-in, use the Google account Jorge is already signed into. If it needs a click, use the CLICK-HERE.png arrow method from step 1c.
   b. Do NOT delete any of the three 1Password entries. Only report which one the sign-in used (the entry title and its last-edited date, never the password).
   c. Report what you see: did it launch, did it sign in, what error if not.

4. REPORT.
   Write mailbox/to-cloud/RESULT_PASTE-D-064_2026-09-30.md with one state per part (1, 2 and 3): DONE with proof (for 1: the words on the logged-in page, not the password; for 2: the new heartbeat alive_at time), BLOCKED (what you tried, why, the one small click needed), or IN PROGRESS. Do not claim DONE without proof.

If a safety refusal stops you, do not work around it. Report it.

Did the 9Router login, the poller, and the Desktop Commander launch all work?
