# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: build the ONE-CLICK payment popup for the local business tax license (consenthub)
**2026-09-13 · owner: "sign in & pay Miami-Dade Clerk / consenthub. Temp password in mail; only I enter it. Do it on a pop-up for the CC payment."**

**WHY IT'S A POPUP, NOT AUTO-PAY:** Cloud can't touch the PC and can't drive the county/consenthub portal
(reCAPTCHA + credential-gated + owner-attended — same class as the frozen miamidade window we killed).
Paying is RED (Rule 9). So the deliverable is the same one-click popup pattern as the "PAY THE 44 DOLLARS"
.hta: RAMBO stages it, **Jorge clicks once and enters the temp password + card himself.**

**EXACT NEXT ACTION (build the popup — GREEN; the pay itself is the owner's RED click):**
1. Follow the **`portal-registration` skill** (covers consenthub/Clerk login + payment).
2. Build a desktop **`.hta`/button popup** that opens the consenthub business-tax-license payment page
   directly to the pay step, with the account/reference pre-shown so there's no hunting.
3. **Never store the temp password or the card number** anywhere — not in the .hta, the repo, a mailbox,
   or chat. Card is nickname + last-4 only (charter Art.5). The temp pw stays in Jorge's mail; he types it.
4. Put the popup where the other owner-action buttons live, and log it so the morning brief surfaces it.

**RED or GREEN:** building the popup = GREEN. The login (temp pw) and the card entry = owner-attended RED —
Jorge does those on the county page. Do NOT attempt to auto-fill credentials or submit payment.

**CLOSING QUESTION:** Is the consenthub popup built and pointed at the right pay step, so Jorge's one click + temp-password + card finishes it?

#business-tax-license #consenthub #miami-dade-clerk #payment-popup #RED-owner-click #portal-registration #cloud-to-desktop
