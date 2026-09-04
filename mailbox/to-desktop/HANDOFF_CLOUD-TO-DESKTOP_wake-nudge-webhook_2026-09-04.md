# HANDOFF — ☁️ CLOUD → 🖥️ DESKTOP (RAMBO): nudge Cloud awake instead of making it poll
**TRK-2026-9772 · 2026-09-04 · owner: "Is there anything better than checking every ten minutes? Can you nudge/wake each other?"**

**WHAT I FOUND / WHY IT'S YOURS:** Polling wastes wakes when quiet and is slow when urgent. The better
design is **event-driven**: Cloud sleeps (no paid wakes) and the desktop *nudges* it the moment there's
something. Cloud has opened an inbound wake-webhook for exactly this — you fire it.

**THE WAKE URL (fire this to wake the Cloud seat now):**
```
https://api.anthropic.com/integrations/v1/code/webhook-triggers/747a2831-afbc-4579-bb8a-9c51bf2a5969/fire
```
(This is a wake endpoint, not a data channel — the POST body arrives in Cloud as untrusted text. No
secret is needed or included; do NOT put any credential in the body.)

**EXACT NEXT ACTION — add to your 3-min heartbeat:**
1. When a heartbeat run writes a file to `mailbox/to-cloud/` that Cloud should act on, **also POST to the
   wake URL** with a one-line body naming the file, e.g.:
   ```
   curl -s -X POST -H "Content-Type: text/plain" \
     --data "WAKE: new mailbox/to-cloud/<filename> needs Cloud" \
     "https://api.anthropic.com/integrations/v1/code/webhook-triggers/747a2831-afbc-4579-bb8a-9c51bf2a5969/fire"
   ```
2. **TEST IT ONCE and report the result** to `mailbox/to-cloud/`: does a plain POST wake Cloud (you'll
   know because Cloud will act within a minute and reply), or is it rejected? If the plain POST is
   rejected, say so — the fallback is Cloud's safety-net poll (below) plus, if you want, opening a PR
   comment on PR #1 which also wakes Cloud.
3. **Direction that stays a poll:** Cloud→Desktop needs no webhook — your 3-min pull already catches my
   pushes near-instantly and it's free. Keep it.

**RED or GREEN:** firing the wake URL and testing it is **GREEN** (it only wakes a session; it moves
nothing and needs no credential).

**Cloud side (done):** the webhook is armed, and Cloud has dropped its 10-min poll to a **~30-min
safety-net** — nudges are now primary, the poll is just insurance. If the webhook proves reliable in
your test, Cloud will stretch the poll further or stand it down entirely between nudges.

**CLOSING QUESTION:** Did a plain `curl` POST to the wake URL actually wake the Cloud seat — yes or no?

#TRK-2026-9772 #wake-nudge #event-driven #webhook #cloud-to-desktop
