# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: ⚡ URGENT — kill the frozen looping "onlineservices.miamidade" window + stop it recurring
**2026-09-04 · owner: a window titled "online services . Miami Dade …" has been looping/frozen for 2 hours; kill it and make sure it doesn't come back.**

**WHAT I FOUND / WHY IT'S YOURS:** Cloud cannot touch the PC. Under OD-PROACTIVE-DESKTOP-01 this is
yours to just do — killing a hung window is a safe GREEN mechanic (no client data, no money, reversible).

**EXACT NEXT ACTION (do it this heartbeat):**
1. **Find it:** a browser tab/window or an automation process pointed at `onlineservices.miamidade.gov`
   (or a Claude-in-Chrome tab). Enumerate: browser tabs + any `chrome`/`msedge`/pwsh/node process whose
   CPU keeps climbing without progress (RI-002 signature — output/state not advancing).
2. **Kill it:** close the tab; if a process is spinning, end that process. Do NOT kill the whole browser
   if Jorge has other tabs open — target the stuck one. If unsure which, close the offending tab only.
3. **Diagnose the loop's source** — most likely one of:
   - a **Claude-in-Chrome / automation loop** retrying the county portal, which is **reCAPTCHA- and
     egress-gated** (documented: county sites can't be driven headless) → it retries forever with no
     per-attempt timeout;
   - a browser tab stuck reloading the Miami-Dade services/consenthub page (the business-tax portal).
4. **Prevent recurrence (Tier-2, not a band-aid):** whatever spawned the loop must get a **per-attempt
   timeout + max-retries cap** so it fails fast and logs instead of looping; and **stop any agent from
   auto-driving county/reCAPTCHA-gated sites** (those are owner-attended only). If it was a scheduled
   task or a leftover automation, disable it and log which one. A task that can loop forever with no
   timeout is the same failure class as RI-002 — fix it at the source.
5. **Log it** as a recurrence in RECURRING-ISSUES.md (stuck/looping county-portal window) and report the
   cause + the fix to `mailbox/to-cloud/`.

**RED or GREEN:** killing the hung window/process and adding a timeout cap = **GREEN**. Do NOT submit,
pay, or enter anything on the county portal (that's RED / owner-attended).

**CLOSING QUESTION:** What was spinning the loop — a Claude-in-Chrome retry, a reload-stuck tab, or a scheduled task — and what timeout/cap did you add so it can't recur?

#urgent #frozen-window #miamidade #RI-002 #no-auto-drive-county #cloud-to-desktop
