---
name: payment-popup
description: Bring every payment that comes due (county permit fees, upfront fees, invoices, renewals) to Jorge as a pop-up window on his PC that sits on top of every other window, with the payment page open and the amount, payee, county process "C number", property address, TRK and due date shown. Jorge presses Pay; no AI ever pays. Use whenever a fee notice, "Upfront Fee Payment Due" email, invoice or renewal comes in.
---

# Payment pop-up

**Owner directive, 2026-09-23 (CLAUDE.md Article 5). Spending is RED: Jorge presses Pay. No AI ever pays.**

## What the pop-up must show

1. **The county process number (the "C number")**, e.g. `C2026170181`. Show it in large type with a
   **Copy** button, because the county payment page asks for it.
2. The amount, payee and due date.
3. The property address and the TRK, e.g. `10980 SW 202 Dr Unit 29 · TRK-2026-1667`.
4. A button that opens the payment page already loaded.
5. Card on file: **nickname + last 4 digits only**. Never write the full card number anywhere.

## How it must behave

1. **It always comes to the front and stays on top** until Jorge closes it. On Windows, set the
   window's TopMost flag (for example, `Form.TopMost = $true`, or `ShowWindow` +
   `SetForegroundWindow`), then call Activate. **A pop-up hidden behind another window counts as not
   shown.**
2. **If the pop-up can't be shown** (the desktop is off, or the window failed to open), the payment
   goes in the daily summary with the same details, every day until it is paid.
3. **After Jorge pays**, save the receipt page as a PDF in the job's folder. Only then mark it paid.

## Where the C number comes from

1. It is on the county's email ("Upfront Fee Payment Due", "Fees Due") and on the permit application
   receipt. The format is `C` followed by the year, then digits.
2. **The C number is the PROCESS / application number. It is not the permit number.** On 20001 SW
   110 CT, `C2026116502` was the process and `2026061642` was the permit. Never glue a C onto a
   permit number.
3. Record it on the job's gap report or case card. Known C numbers:
   - `C2026170181`: 10980 SW 202 Dr, Unit 29, TRK-2026-1667. Upfront fee due, emailed 9/18 to 9/22.
   - `C2026116502`: 20001 SW 110 CT, Unit 143, TRK-2026-1262.

## Declines

The card on file has been declined at the county payment window before (9 declines before one
payment cleared). If it declines, the pop-up stays open, so Jorge can press Submit again or pick
another card.

#TRK-2026-1667 #payments #MDC
