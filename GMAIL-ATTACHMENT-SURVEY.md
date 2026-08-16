# GMAIL-ATTACHMENT-SURVEY.md — TRK-2026-9073

**Counted by a cloud session overnight 2026-08-16. Counts and senders only. Nothing
filed, nothing moved.**

---

## The headline, and it redirects the whole sweep

**Exactly ONE thread in the entire Gmail account carries both an attachment and a
`TRK-2026` number.**

Against **200+** threads with PDF attachments in the last twelve months alone.

**Gmail is effectively outside the tracking system.** Not partially — almost
entirely.

---

## The counts

| Query | Threads |
|---|---|
| `has:attachment filename:pdf newer_than:1y` | **200+** (saturated — see below) |
| `has:attachment` + permit/folio/code-enforcement/inspection/TRK, 2 years | **200+** (saturated) |
| `has:attachment`, July 2026 | **18** |
| `has:attachment`, June 2026 | **5** |
| `has:attachment` + `"TRK-2026"`, all time | **1** |

**Method note, stated because it limits the number:** Gmail's result-count estimate
**saturates at 201.** Any query returning "201" means "at least 200," not 201. Exact
totals need pagination. **Narrow date windows return true counts**, which is why the
monthly figures above are trustworthy and the annual ones are floors.

---

## What the shape says

**5 to 18 attachment threads a month is a low rate for an operation running 28 client
matters.** That is not the volume of a business document channel.

**The reason is visible in the senders: the business address is
`Jorge@teamusasales.com`, and that mailbox lives in Outlook.** `jorgev2121@gmail.com`
is the personal account — its recent attachment traffic is Microsoft notices, Stripe
receipts, PayPal, Anthropic, Speechify, Grok, X, PLAUD, DigitalOcean marketing.

**Conclusion, and it changes the plan: Gmail is a low-yield holding area.** The
job documents are in Outlook.

**Recommendation: do not spend a night on Gmail.** It is worth one focused pass for
the handful of genuine job attachments, not a sweep. **The 21 rows that matter here
would fit on one screen.**

**This makes the Outlook survey more important, and Outlook is desktop-only** — the
Microsoft 365 connector is still unauthorized (TRK-2026-9020), so cloud cannot reach
it at all.

---

## The one exception, and it is worth keeping

`has:attachment "TRK-2026"` returns exactly one thread:

```
2026-08-05  Jorge@teamusasales.com -> Jorge@teamusasales.com
"Jorge Valdes — Corporate History"
Sunbiz sweep + corroboration, prepared to support the TEDC work
```

**Jorge emailing himself is how documents currently get from one place to another.**
That is a workaround for the absence of an intake step — the same gap as RI-020 and
TRK-2026-9060.

---

## What this does NOT cover

**Stated so the gap is not mistaken for a finding.**

1. **Exact totals.** Saturation at 201 means the annual figures are floors. Pagination
   would settle it and was not run — the monthly sampling answered the question more
   cheaply.
2. **Attachment-level counts.** These are *thread* counts. One thread may carry
   several documents.
3. **Outlook.** The business mailbox, and almost certainly where the real volume is.
   Desktop-only.
4. **Nothing was opened, downloaded, filed or labelled.** Counts and senders only, per
   the overnight GREEN rule.

---

**Question for whoever picks this up: shall the one focused Gmail pass run against
`from:Jorge@teamusasales.com has:attachment` only, since that is where the single
tracked thread came from?**
