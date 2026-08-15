# Campaign drafts — Marketing / Wally
**TRK-2026-1614** · drafted by cloud 2026-08-15 · **DRAFT, nothing sent**

Everything here needs no approval and no spend. It is ready for Jorge's edit whenever
the identity (`help@teamusasales.com` + OpenPhone number) exists.

---

## ⚠ Design rule that governs every piece below

**A letter about code violations can be mistaken for county correspondence. It must
never be.**

So, on every printed piece, non-negotiable:

- Company name and logo **at the top**, not the bottom
- The line **"This is not a government notice"** in the first block, plainly visible
- No county seals, no official-looking typefaces, no window envelopes styled like
  county mail
- No invented deadlines. If a date is cited it must be the real one from the public
  record, with the case number so the owner can verify it themselves

A homeowner who feels tricked does not become a client, and the complaint lands with
the county Jorge works alongside every day. **Credibility is the asset here.**

---

## 1. The letter — cold outreach, open code case

Plain, short, and it leads with a fact the owner can check.

> **CU INSPECTIONS OF SOUTH FLORIDA**
> *This is not a government notice. We are a private inspection and permitting firm.*
>
> Dear [OWNER NAME],
>
> Public records show an open code enforcement case on your property at
> **[ADDRESS]** — case **[CASE NUMBER]**, opened **[DATE]**.
>
> You can verify that yourself at the county's code case search. We are writing
> because open cases in Miami-Dade tend to do three things if they sit: accrue daily
> fines, become a lien on the property, and stop a sale from closing.
>
> Most of what we see is fixable. Common ones are an old permit that was never closed
> out, work done by a prior owner, or windows and doors installed without a permit
> that can be legalised after the fact.
>
> **What we do:** pull the full permit history, tell you exactly what is open and what
> it will take to close it, and handle the county process end to end.
>
> **What it costs to find out:** nothing. The records review is free and takes about
> two business days.
>
> If it is useful, call or text **[PHONE]**, or scan the code on the back.
>
> — Jorge Valdes, CU Inspections of South Florida
> [PHONE] · [EMAIL] · [LICENCE #]

**Notes for Jorge's edit:** the free records review is the whole offer — it costs a
Sunbiz lookup and a permit search, and it is the only line that reliably gets a reply
from someone who is already being written to by lawyers and lien buyers.

**Variant needed for LLC-owned parcels.** NEW-02 turns 246 anonymous LLCs into named
officers. Those letters go to a person by name at the officer's address, and open with
*"as the registered officer of [LLC]"* rather than *"Dear owner."*

---

## 2. QR landing page copy

Short enough to read on a phone at a mailbox.

> **You have an open code case. Here is what that means.**
>
> Open cases accrue fines daily, can become a lien, and will stop a sale from closing.
> Most are fixable — usually an unclosed permit or work done without one.
>
> **Free records review.** We pull your full permit and case history and tell you what
> is actually open. About two business days. No obligation.
>
> [ Text us ] [ Call us ] [ Send my address ]
>
> CU Inspections of South Florida · not a government agency

**Form fields, kept to three:** address, name, phone. Anything longer loses them.

---

## 3. OpenPhone business-hours auto-text

Fires on a missed call or an inbound text during business hours.

> Thanks for reaching CU Inspections. This is Jorge's line — a real person will reply
> shortly. If you are calling about a code case or an open permit, send the property
> address and we will pull the records before we call you back.

**After hours:**

> Thanks for reaching CU Inspections. We are closed right now and will reply first
> thing. Send the property address and we will have your permit history ready when we
> call.

---

## 4. Voicemail greeting

> You have reached Jorge Valdes at CU Inspections of South Florida. Leave your name,
> the property address, and what you are dealing with, and I will call you back the
> same business day. If it is faster for you, text this same number.

**Deliberately mentions texting** — for this audience it converts better than a call
back, and it keeps the thread in writing.

---

## 5. Rollout tracker — 500 per week

Suggested columns for the tracking sheet, one row per letter:

`SEND_DATE · TRK · OWNER · ADDRESS · FOLIO · CASE_NUMBER · OWNER_TYPE (person/LLC) ·
LETTER_VARIANT · SOURCE_BATCH · RESPONSE_DATE · RESPONSE_CHANNEL (call/text/QR) ·
OUTCOME · NOTES`

**Why `SOURCE_BATCH` matters:** NEW-01 is 233 individuals, NEW-02 is 426 LLC officers.
They are different letters to different people, and without that column there is no
way to learn which list is worth re-buying.

**Suggested cadence:** 500/week is 5 batches of 100, Monday to Friday, so a bad list
or a broken phone number costs 100 letters, not 500.

**One number to watch:** response rate by `SOURCE_BATCH`. Everything else is noise
until there is enough volume to say anything.

---

## 6. What is still blocked

- **The identity does not exist yet.** No `help@teamusasales.com`, no OpenPhone number.
  Every `[PHONE]` and `[EMAIL]` above is a placeholder until JOB-0028 runs.
- **The list does not exist yet.** Blocked on the two skip traces, ~$99 total.
- **Cloud cannot pull the case data.** `miamidade.gov` is egress-blocked from cloud —
  see RI-019. The desktop has to pull case numbers and owner names.

**Nothing above is blocked. The letter, the landing copy, the scripts and the tracker
are done and waiting.**

---

**Question for Jorge: is the free records review the right offer, or would you rather
lead with a fixed-price permit search?**
