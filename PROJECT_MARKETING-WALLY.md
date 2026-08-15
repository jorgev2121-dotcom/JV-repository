# PROJECT: MARKETING — WALLY
**TRK-2026-1614** *(PROVISIONAL — next safe number after 1611 observed in Drive.
Desktop must confirm against `Tracking-Registry.md` before this is treated as issued.)*

**Objective:** add and integrate every pending marketing item so the function actually
runs. Assembled by a cloud session 2026-08-15 from Drive; nothing here was invented.

---

## 1. THE FIND — the backlog exists, and it is a file

`OWNER-APPROVALS-PENDING_CODE_2026-07-31.md` names its source of record:

> **`_WORK-REGISTER.csv` — 183 rows, 12 owner gates.**
> Closing line: **"Open work register items overall: 183 of 183."**

**As of 2026-07-31, none of the 183 had closed.** This is the "300+ requests" Jorge
describes. It is not scattered sentences — **a register already exists** and cloud has
never seen it. `_WORK-REGISTER.csv` is not in Google Drive under that name; it is
almost certainly on the PC or in OneDrive.

**Finding and pulling that file into this repo is the single highest-value action
available.** Tracked as TRK-2026-9053. Cloud cannot reach it. Desktop can.

---

## 2. What "Marketing — Wally" actually consists of

Four threads, discovered in Drive, with a real dependency order.

### 2.1 NEW-03 — the Wally email  ⚠ QUICKEST WIN ON THE BOARD
**"SEND: 5-report management email to Wally Milian + Alec Valdes."**
Claude recommended **APPROVE** on 2026-07-31. Status per that file:

> *"Drafted with all 5 color reports attached and the logic explained; sitting in
> Outlook Drafts."*

**The work is finished. The email has been sitting in Drafts, unsent, for over two
weeks.** Blocks 1 job.

Supporting file: `SEND-ME_Management-5-Reports_Wally-Alec_2026-07-30.eml` (6.7 MB,
Drive).

**This needs one decision from Jorge: send it or don't.** Sending is RED under
`AUTONOMY.md` — outbound mail is never unattended.

### 2.2 JOB-0028 — Marketing Identity (email + phone)
The campaign contact identity for a **500-per-week code-enforcement mailing**.

- **Email:** `help@teamusasales.com` on Google Workspace Business Starter, on the
  existing TEAMUSASALES.COM domain — ~$7/month. More credible for outreach than a
  gmail.com address. Fallback: a chosen gmail.com name.
- **Phone:** OpenPhone Starter, $15/month. Search Miami 305/786 numbers, present the
  three most memorable (repeating digits or word-spelling patterns) for a one-tap pick.
- **Then:** business-hours auto-text, voicemail greeting, CRM feed.
- **Then:** both credentials into 1Password.

**Design note already in the job:** Owner supplies only the phone-verification tap and
payment; Code navigates every screen. **That is Rule 1 written before Rule 1 existed.**

### 2.3 NEW-01 and NEW-02 — the contact data the mailing needs
- **NEW-01:** REISkip skip trace, batch 1 — **233 individuals** south of Flagler.
  Max $34.95, likely ~$30. Returns phones **and** emails at 85–90% match.
- **NEW-02:** REISkip skip trace, batch 2 — **426 company officers** already found free
  via Sunbiz. Max $63.90. **Turns 246 anonymous LLCs into named humans.**

Both recommended APPROVE. Card already on file. **Combined maximum: $98.85.**
Between them they block 5 jobs.

### 2.4 Supporting material already in Drive
- `MARKETING-MAILING/` folder with `MARKETING-MAILING_Vendor-Contacts`
- `TRK-2026-0707-QR` — QR code / marketing letter / email review thread

---

## 3. The dependency chain — why nothing has moved

```
NEW-01 + NEW-02  (skip trace, ~$99)
        ↓  produces the contactable list
JOB-0028         (email + phone identity, ~$22/month)
        ↓  gives the campaign a credible sender and a number to call
500/week code-enforcement mailing  ← the actual objective
```

**NEW-03 (the Wally email) sits outside this chain and can go today.**

**Everything is gated on spend approvals, not on work.** Roughly **$99 one-off and
$22/month** stands between a drafted campaign and a running one. The work was done in
July; the approvals were never given.

---

## 4. What cloud can and cannot do here

**Cloud can, unattended:**
- Assemble and de-duplicate the mailing list
- Pull company officers from Sunbiz **free** — NEW-02 says 426 were already found that
  way, so the free half is repeatable
- Draft the letter, the QR landing content, the auto-text and voicemail scripts
- Build the tracking sheet for a 500/week rollout

**Cloud cannot, ever:**
- Spend money (REISkip, Workspace, OpenPhone) — RED
- Send the Wally email — RED
- Complete phone verification — needs a physical tap
- Store credentials in 1Password — RED

**Desktop must:** find `_WORK-REGISTER.csv`, drive the signup screens, and hold the
credentials.

---

## 5. Recommended order

1. **Send the Wally email.** Already written. One decision. Two weeks overdue.
2. **Find `_WORK-REGISTER.csv` and pull it into this repo.** 183 rows. Nothing can be
   scheduled until the backlog is visible.
3. **Approve the two skip traces (~$99).** They unblock five jobs and the whole mailing.
4. **Run JOB-0028** with Jorge present for the verification tap only.
5. **Cloud drafts the campaign material** in parallel — needs no approval and no spend.

---

## 6. The honest note

**None of this was blocked on difficulty.** The email was drafted. The skip traces were
scoped and priced. The identity setup was fully specified down to which plan and how to
pick the number.

**It stalled on seventeen approval lines that were presented once, on 2026-07-31, and
never answered.** That is RI-003 and OD-01 in one artifact: a list of questions nobody
replied to, and work that stopped dead because of it.

**Question for Jorge: shall the Wally email go out as drafted, and do the two skip
traces at roughly $99 total get approved?**
