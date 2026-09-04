# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: build a ONE-CLICK owner-actions popup (Jorge can't do terminal steps)
**TRK-2026-9772 · 2026-09-04 · owner: "I cannot execute as requested. If you provide one-click buttons on a pop up, I will execute."**

**WHAT I FOUND / WHY IT'S YOURS:** Jorge won't type terminal commands (dyslexia/TTS) — correct, don't
ask him to. Cloud cannot pop a window on his PC; you can. Build/refresh a single `.hta` button board
(the APPROVALS-NOW pattern) and **pop it to the front.** OD-PROACTIVE-DESKTOP-01 applies: drive the
mechanics, take him to the one click.

**BUILD: one popup titled "OWNER ACTIONS" with two big labeled buttons (the two live blockers):**

1. **① SIGN IN TO GITHUB — closes the two-way loop.**
   - Runs the browser sign-in for you: `gh auth login --web -h github.com -p https` if `gh` is present,
     otherwise a `git push` that triggers Git Credential Manager's browser device-flow. Launch it in a
     visible window so Jorge just approves in the browser.
   - After it returns, **verify** with `gh auth status` (or a test `git push` of your pending
     `mailbox/to-cloud/` replies) and show the result on the board: "Signed in ✓ — your replies just
     flushed to Cloud." This is the click that makes your return leg work; your queued DONE/FINDING
     files flush on that first successful push.

2. **② CONNECT CHROME — unblock the HOA.**
   - Wire it to the existing `CONNECT CHROME - click me.hta` action already on his Desktop. Once Chrome
     is connected, you can drive the T&G portal: trigger the **fresh** Forgot-Password on
     tgmgmt.cincwebaxis.com under **jorgev2121@gmail.com**, then a **③ CLICK RESET LINK** and
     **④ PAY $555** button appear on the SAME board when each is ready.

**Guardrails:** these buttons only perform **Jorge's own** actions (his sign-in, his connect, his final
pay click) — they never cross RED autonomously. The eventual PAY button still only stages to the final
confirm screen; he presses it; bank/ACH numbers are his to enter, never typed by any agent.

**RED or GREEN:** building and popping the board is **GREEN**. Each button is the delivery mechanism for
one of Jorge's RED clicks — that's the point.

**CLOSING QUESTION:** Once he clicks SIGN IN TO GITHUB, did your queued `mailbox/to-cloud/` replies flush to the remote — yes or no?

#TRK-2026-9772 #owner-actions #one-click-popup #hta #github-signin #connect-chrome
