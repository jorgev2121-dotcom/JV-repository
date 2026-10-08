# REPORT-TYPES.md — report type codes (owner request 2026-10-08)

Every internal report carries a report number that says what KIND of report it is, so Jorge
can say "give me another RPT-PANEL". Format: `RPT-<TYPE>-NNNN`, plain sequence per type,
never reused, never a TRK (TRK numbers are for jobs and clients). The number goes in the
page header AND in the footer stamp of every printed page:
`RPT-PANEL-0001 · v1 · 2026-10-08 · CURRENT`.

## Types
- **RPT-PANEL** — VTES control panel accounting: what is live, on the dashboard but not
  connected, queued with expected dates; five-slice status; flowchart of everything pending.
- **RPT-BOOKS** — P&L, balance sheet, AR/AP (OD-109-A).
- **RPT-BILL** — unbilled reimbursements and invoice queue (OD-109).
- **RPT-NIGHT** — overnight run report with denominators (Rule 8).
- **RPT-STATUS** — whole-business status of every open item (OPEN-ITEMS digest).

New types are added here before first use.

## Log (append one line per report issued)
| Number | Date | Title | Where |
|---|---|---|---|
| RPT-PANEL-0001 | 2026-10-08 | VTES Panel Status | https://claude.ai/artifact/HctGdFCtiUoeVJdpVycjMG ; source reports/RPT-PANEL-0001.html |
