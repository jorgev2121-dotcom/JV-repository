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
- **RPT-CHRONO** — chronological recap of a day's requests and replies (round table), for Jorge to catch up.
- **RPT-REVIEW** — a client job shown to Jorge for comment the moment it is review-ready, blanks marked; one per job version.
- **RPT-CASH** — cash in hand, money in and out, months of runway and loan size; uses only the last balance Jorge stated (Article 5).
- **RPT-STATUS** — whole-business status of every open item (OPEN-ITEMS digest).

New types are added here before first use.

## Log (append one line per report issued)
| Number | Date | Title | Where |
|---|---|---|---|
| RPT-PANEL-0001 | 2026-10-08 | VTES Panel Status | https://claude.ai/artifact/HctGdFCtiUoeVJdpVycjMG ; source reports/RPT-PANEL-0001.html |
| RPT-CHRONO-0001 | 2026-10-08 | Today's Round Table | https://claude.ai/artifact/G1DjPtsbaVcj3raHc4qLzy ; source reports/RPT-CHRONO-0001.html |
| RPT-STATUS-0001 | 2026-10-08 | Today's Game Plan | https://claude.ai/artifact/1iS1Vp4qcPtnWWGk8iyLMY |
| RPT-REVIEW-0001 | 2026-10-08 | Review: 10362 SW 180 St (TRK-2026-1536) | reports/RPT-REVIEW-0001.html |
| RPT-CASH-0001 | 2026-10-08 | Cash Plan, 3 Months | reports/RPT-CASH-0001.html |
| RPT-STATUS-0002 | 2026-10-08 | All Open Tasks (26 numbered) | reports/RPT-STATUS-0002.html |
