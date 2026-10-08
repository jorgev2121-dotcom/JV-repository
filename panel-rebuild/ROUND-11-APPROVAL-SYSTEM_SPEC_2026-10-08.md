ROUND-11-APPROVAL-SYSTEM_SPEC_2026-10-08
TRK-2026-9910-C · PANEL ENHANCEMENT · v1 · 2026-10-08 · CURRENT

---

# One-Click Approval System — VTES Control Panel Round 11

## The problem this solves

Jorge currently approves things by navigating to Drive, opening files,
reading BLOCKERs, and manually writing responses. Too many steps, too many
windows. The panel already shows pending items but has no buttons to act on
them.

## The solution

Every item that needs Jorge's approval appears in the panel with one button.
He clicks it. Done. No Drive navigation, no other window, no typing.

---

## Architecture

The panel runs in a browser on Jorge's desktop. Approvals need to reach
RAMBO, which monitors VTES-Inbox on Google Drive (synced locally at
`G:\My Drive\VTES-INBOX\`).

**Write mechanism: File System Access API**

1. First time: panel shows "Grant Drive access" prompt.
   Jorge clicks it, selects `G:\My Drive\VTES-INBOX\` once.
   Panel stores the directory handle in `localStorage`.
2. Every subsequent [APPROVE] click: panel writes a small JSON approval
   file directly to that folder. No browser dialog. No other step.
3. Google Drive syncs the file to the cloud within seconds.
4. RAMBO's watcher loop picks it up and executes.

This requires no server, no localhost port, no extra software.
One-time folder grant from Jorge. Works in Chromium (which RAMBO uses).

**Approval file format:**
```json
{
  "approval_id": "APPROVE_BILLING-INVOICE_TRK-2026-1250_20261008-143000",
  "action": "APPROVE",
  "timestamp": "2026-10-08T14:30:00Z",
  "item_type": "billing_invoice",
  "trk": "TRK-2026-1250",
  "source_file": "INVOICE-DRAFT_TRK-2026-1250_20261008.json"
}
```

File naming: `APPROVE_{ITEM_TYPE}_{ID}_{DATETIME}.json`
RAMBO watches VTES-INBOX for files matching `APPROVE_*.json`.

---

## New panel section: NEEDS MY APPROVAL

To be added to the VTES panel as a dedicated tab or prominent section
at the top of the NOW tab (above all other content).

### Section layout

**Header:** "⚡ X items need your approval" (red if nonzero, green if zero)

**One row per pending item:**

| What | TRK | Summary | Action |
|---|---|---|---|
| Invoice: Permit Fee $312.50 | TRK-2026-1250 | Paid 2026-10-05 for 123 Main St | [APPROVE] [SKIP] |
| BLOCKER: Switch to Opus | — | Click once to restore Opus model | [APPROVE] [SKIP] |
| Decision needed: Bay Harbor | TRK-2026-1370 | Plan v2 — go or hold? | [GO] [HOLD] |

**[APPROVE]** — writes approval JSON to VTES-INBOX, marks row green, removes from queue.
**[SKIP]** — defers 24 hours, row turns gray.
**[GO] / [HOLD]** — for binary decisions, same write mechanism.

---

## Sources of approval items

The panel reads from four places to build the queue:

### 1. BILLING SENTINEL invoices
- Source: VTES-Outbox files matching `INVOICE-DRAFT_*.json`
- When RAMBO generates a draft invoice, it writes one of these files
- Panel reads it, extracts: TRK, amount, payee, date, fee type
- Shows one row per draft invoice
- [APPROVE] → RAMBO sends the invoice from VTES-Outbox

### 2. BLOCKER files requiring Jorge action
- Source: VTES-Outbox files matching `BLOCKER_*.md`
- Panel reads each file, extracts the "THE ONE THING JORGE HAS TO DO" section
- Shows a condensed one-line summary with [APPROVE] button
- [APPROVE] writes a corresponding DECISION file to VTES-INBOX
  (e.g., `APPROVE_DECISION_37_OPUSPLAN_20261008.json`)

### 3. NEEDS-YOU items from Orchestrator
- Source: VTES-Outbox `_NEEDS-YOU.json` (already shown in panel NOW tab)
- Same items, now with an [APPROVE] button
- [APPROVE] writes `APPROVE_NEEDSYOU_{ID}.json` to VTES-INBOX

### 4. Unmatched payments (BILLING SENTINEL Loop C)
- Source: VTES-Outbox `UNMATCHED-PAYMENT_*.json`
- Panel shows: "Found $X payment to [payee] on [date] — which job?"
- Jorge picks TRK from a dropdown (populated from BILLING-MONITOR-STATE.json)
- [ASSIGN] → writes `MATCH_PAYMENT_{ID}_{TRK}.json` to VTES-INBOX

---

## Build order

This is a post-v5-install enhancement (round 11).

1. RAMBO: add File System Access API request to panel startup sequence
   (one-time permission grant, stored in localStorage).
2. RAMBO: add VTES-INBOX watcher for `APPROVE_*.json` files.
   On receipt: parse the action, execute it, write EXECUTED receipt.
3. Panel: build "NEEDS MY APPROVAL" section reading from VTES-Outbox.
4. Panel: wire [APPROVE] / [SKIP] buttons to write JSON via File System API.
5. Panel: add BILLING SENTINEL invoice queue (Section 2 of BILLING tab, per OD-109).
6. Panel: add TRK dropdown to unmatched-payment rows.

Estimated RAMBO build time: 4-6 hours.
Jorge involvement: one-time folder selection click when the section first loads.

---

## Constraints

- No item is actioned without Jorge's click.
- Panel never writes to client job folders — only to VTES-INBOX.
- Panel never sends email, messages, or invoices — it writes to VTES-INBOX;
  RAMBO executes from there.
- File System Access API requires HTTPS or localhost; if blocked, fallback
  is a [COPY APPROVAL CODE] button that copies a short code Jorge pastes
  into a text box in the panel → panel queues locally, RAMBO reads queue
  on next Drive sync.

---

ROUND-11-APPROVAL-SYSTEM · v1 · 2026-10-08 · CURRENT
