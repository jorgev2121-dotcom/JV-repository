# Morning Report — 2026-09-05

**Desktop overnight execution + cloud mailbox reconciliation. Covers 2026-09-03 09:30 UTC through 2026-09-05 04:00 UTC.**

---

## Executive Summary

**A ~2 hour Google Drive outage on the cloud side (2026-09-04 evening) hid a full day-plus of real desktop work.** Once access came back, 91 new desktop cycles were found and mirrored into this repo. The desktop spent the evening re-testing its own prior claims about the Bal Harbour Plaza Tuesday filing and found two of those claims were wrong — both corrected before they could cause a mistake at Village Hall. One item needed you last night and was pushed to your phone (**AP-0049**, still unanswered as of this report). Everything else is written up below, nothing needs you before you've had coffee.

**Nothing was filed, sent, spent, or deleted anywhere in this window.** Every cycle marked itself GREEN.

---

## The one thing still waiting on you

### AP-0049 — Bal Harbour signatures, one word answers it

Only 3 of 8 unit owners have a reachable address or email for the Tuesday 2026-09-08 filing. The other 5 need time to receive, sign, and notarize documents. **Friday (yesterday) was the last business day before Tuesday** — Saturday, Sunday, and Labor Day Monday are all non-working days — so this was pushed to your phone last night rather than held for this report.

**WRITE IT** — email the Association (`obhadmin@` / `qmarte@plazaofbalharbour.com`) for the 5 missing owner emails, or **SKIP** — mail all 5 at their county-listed addresses instead.

If you're reading this without having answered overnight, it's now the weekend — the email route may cost less time than it would have Friday, since the Association still has all weekend to reply before Tuesday morning.

---

## Two corrections the desktop caught in its own work

**AP-0077 — a Tuesday double-filing risk, corrected before it could happen.** The calendar event for Tuesday's filing lists units 321 and 922 for in-person lodging. Your own 9/3 instruction says those two were already mailed as renewals (original + cheque), expected back 9/10. The calendar was never updated after that instruction. Following it as written on Tuesday would file both units a second time — a second set of fees, a second process number.

Your options: (A) file the other six Tuesday and let the mailed package for 321/922 run to 9/10, (B) treat the mail as likely returned and re-file both at the counter, or (C) — added after a second look — simply ask the clerk (Olga) whether a renewal will be accepted for 321/922 the same way it was for a different unit (PH11) the day before, before filing anything new. Option C costs one question and could save two full new-permit fees.

**AP-0048 — the "nothing is on your calendar" claim was wrong, and now corrected.** An earlier card said no calendar held the Tuesday filing. It's actually on your Google calendar (created 84 seconds after you asked for it) and, separately found, on your Outlook calendar too — 30 minutes apart, under two different names. What's still genuinely open: your **GO, or who's going in your place**, and a two-weekly written progress report you promised the Association, first due **2026-09-16**.

---

## New decision needed before Tuesday — not urgent yet, but don't let it slide

**Update, checked twice now and it's worse than first thought: all ten Bal Harbour permit applications print with your tracking number completely missing — not some of them, all of them.** The first pass found two units losing the stamp off the right edge of the page. A full re-check of all ten (220, 307, 321, 423, 714, 721, 914, 922, 1016, PH11) found the real problem is the stamp running off the *bottom* of the page on every single one — including the two that looked fine on the right edge. Not a printer setting; it's baked into the files. Separately, three of the ten (321, 922, and now also PH11) have the date cut off mid-character inside the file itself.

Fixing this now needs **two** decisions, not one, because they're tangled together:

1. **Where should the tracking number go — bottom-right (current spot, just moved inboard so it actually prints) or up top under "REVIEWED"?** Either works; the desktop has a ready fix for the bottom-right option, tested and staged for two of the ten units.
2. **Which copy of these files is the real one — the copy on Google Drive, or the copy on OneDrive?** Two different folders both claim to be the master, and they don't fully match. The desktop won't extend its fix to the other eight units until this is settled, because fixing the wrong copy three days before a counter filing is worse than not fixing it yet.

Answer both and the fix finishes itself. Until then: printing now means filing paperwork Tuesday with no visible tracking number on any of it.

One more small thing settled along the way, not needing a decision: it also confirmed which of the two tracking numbers on the 10980 SW 202 Dr matter above is the real one — TRK-2026-1310 (used since July), with TRK-2026-1667 being a later duplicate that's already been cross-referenced so nothing gets lost.

**And the EIN request from the item above is now one click, not a to-do.** A ready-to-send reply is sitting in Outlook Drafts, and a desktop button (**"SEND IT - ask the client for the EIN"**) will send it — the desktop confirmed the button actually reaches the right draft but did not press Send itself, since sending is your step.

---

## Small, no-rush items

- **AP-0078** — a finished Certificate-of-Insurance request has sat unsent in Outlook Drafts 28+ hours. Open it, read it once, press Send.
- **AP-0064** — Alabama Jack's, a $4,780 job stalled on an unsent email to Rick asking for two things it needs.
- **AP-0002** — the $44 City of Miami microfilm fee is confirmed real (a different property from the one already paid in August, not a duplicate). The one-click payment button had gone missing from your Desktop; the desktop lane found and restored it, hash-verified. No urgency — already stalled two weeks, a few more days changes nothing. Two clicks when you get to it: pay, then send the "I paid" reply (the City won't start the search otherwise). Also sitting in Drafts: an old duplicate request for the same property that must **not** be sent — it would trigger a second $44.
- **AP-0080** — new, and deliberately not raised as urgent by the desktop itself. Your August 25th voice order ("let him do anything and everything he can do without owner participation") only exists on the cloud repo branch — no file the desktop reads at startup carries it, so it's been invisible to every session since the git-merge problem below started blocking pulls. Nothing was self-applied. One word (**ADOPT**) puts it properly into CLAUDE.md whenever you're up.

---

## One message that closes two 17-day-old questions

A $5,000 cheque (#1002, VAAV LLC to Impact Windows, 2/27/2024) reads **"#1215"** on both the check face and the payor's own carbon copy — confirmed by looking at the image twice, not just the filename. It is **not** unit 1515, and not a typo. Separately, your unit ledger has been asking "which unit is #1215?" since August 18th. Those are the same question, unlinked for over two weeks. **One text to Doron — "which unit is #1215 on the $5,000 check?" — answers both.**

Whether an actual 1515 payment exists at all is still open. Nothing found proves or disproves it; three Plaud recordings and the full payments folder were checked and none mention it.

---

## System health

**The chronic git-merge failure (AP-0036) — update: the fix is holding.** After hitting 10+ desktop sessions Wednesday-Thursday, a config change applied Thursday night (`git pull.ff=only`, which refuses to auto-merge instead of silently corrupting files) gave **the first fully clean day since August 30th** — zero incidents overnight. The underlying reason the two copies of the repo have grown apart (currently ~100 commits/94 commits out of sync) is still open and still needs a real decision from you eventually, but it's no longer actively breaking anything every 15 minutes.

**TASK-11 (county proof + Orange Tree population) — closed, nothing owed.** No new activity in this window; its results were already mirrored into `COUNTY-PROOF-RESULTS.md`.

**Three small plumbing items, no client impact, one-click cards already on your screen:**
- Two of your own daily system-health emails (Aug 31, Sep 1) are stuck in Outlook's Outbox, plus a 373-day-old test email that's the real cause of the "2 did not send" you'd noticed. A card is open on your main monitor with three buttons: send the two stuck reports, park the old test email, and fix Outlook so a closed mail app doesn't silently swallow the report (which is also why yesterday's report never arrived).
- The "Authorize Overnight Runs" button you pressed Tuesday doesn't connect to anything yet — nothing on the machine reads what it writes. A different card ("Fix it now") is already open to correct the piece that's fixable unattended; separately, worth you deciding at some point whether that overnight button should be wired up or retired, since right now it implies a permission it can't deliver.
- A funding-research file for an unrelated matter (Edison Towers) was found using two different naming conventions where the "correct-looking" one is actually the weaker version. Already flagged for whoever's building that file next; nothing for you to do.
- A second, corrupted copy of your entire jobs folder was found on Drive (a stray character in the folder name confused an old script into creating a duplicate). It held stale, three-day-old copies of the Bal Harbour tracking files — since fixed at the source, and the duplicate folder is marked "do not use" rather than deleted, in case you'd rather keep or remove it yourself.
- Good find: there's a way to pull recorded county documents (deeds, mortgages) with no login at all, if you already know the book and page number — closes most of what looked like a login-blocked research task.

**Why some of tonight's "one-click" buttons might not have actually been on your screen — found and fixed.** Some buttons the desktop builds land in a OneDrive folder that looks like your Desktop to the machine but never actually shows up on your screen. Two buttons built earlier tonight (the EIN request, and the stuck-Outlook fix) were sitting there instead of on your real Desktop — both have now been copied to the real one and confirmed working. Also found along the way: **Speechify is switched off in the browser profile you actually use day-to-day** (it's on in a different, less-used one) — a new button, **"SPEECHIFY IS OFF - turn it back on"**, is on your real Desktop now; the actual switch has to be your click, browsers won't let it be flipped by script.

**A silent future problem was caught before it happened.** The tax-jacket marking board (508 pages, six buttons per page) had three of its six buttons — the ones for deleting blank pages and merging photo-backs — wired to a file nothing ever read. If you'd spent time marking pages and pressing Save, none of those three actions would have actually changed anything, and you wouldn't have found out until the final document came out wrong. Fixed and tested before you ever used it — nothing lost. The turn/rotate buttons were always fine.

---

## One more worth knowing, not urgent

**A signature package already sent Wednesday (10980 SW 202 Dr, Unit 29) has two small problems.** It went out to the property manager (Cinde Velazquez, cc Miguel Zaldivar) carrying tracking number TRK-2026-1667 — which doesn't match anything in this matter's own file. The desktop confirmed the real number is TRK-2026-1310 (used on this property since July) and cross-referenced the two so nothing gets lost. Separately, the email tells her "everything is done except one field, see item 1" — but item 1 just says "sign both documents," not what field is missing. The actual blank field is the **EIN for the owning LLC**, and she was never actually asked for it — see the one-click fix for that below. Also confirmed: a separate insurance-certificate request for this same job was never sent at all.

---

## Denominators

- **91 desktop cycles** reviewed and mirrored (2026-09-03 09:30 UTC → 2026-09-04 22:54 UTC), full text in `TO-CLOUD_MIRROR_2026-09-04.md` (9,770 lines).
- **7 of 16** backlog threads reconstructed from your own verbatim words (172 utterances, 2026-08-29→2026-09-04) have been re-tested and measured; **9 remain unproven** — treat any status on those nine as unverified until re-checked.
- **0** items filed, sent, spent, or deleted overnight.
- **1** push notification sent (AP-0049), **0** replies received as of this report.

---

**Full detail on everything above:** `URGENT-UPDATE_2026-09-04-2300UTC.md` in this repo.

Anything here you want handled differently before I keep watching?
