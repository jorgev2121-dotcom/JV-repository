GMAIL_PDF_THREADS: 442+
GMAIL_IMAGE_THREADS: 161+
GMAIL_PDF_THREADS_WITH_TRK: 3
GMAIL_INBOX_UNREAD: 42701
GMAIL_INBOX_TOTAL: 45101
GMAIL_TRIAGE_LABELS: 4

# Gmail inventory for the OCR and triage dashboard

Account: Jorge's main Gmail. Taken 2026-10-12 by a cloud session. Read-only: nothing was sent, labelled, moved or deleted. Counts only. No message bodies were read.

## Section A: The short version

1. **Gmail holds at least 442 email threads with a PDF attached. Only 3 of them carry a TRK-2026 tracking number.** That works out to under 1 percent filed with a TRK.
2. The inbox holds 45,101 threads. 42,701 of them are unread, which is about 95 percent.
3. At least 161 threads have a photo or scan attached (jpg, png, tif or heic), counting 2022 onward only.
4. **Gmail does not OCR attachments where they sit.** A scanned PDF in Gmail can be found by its file name only, never by the words on the page. To search inside it, it must be saved to Drive or OneDrive first.

## Section B: PDF threads by year

Query used: has:attachment filename:pdf. Every year below was paged through to the end, so these are exact.

1. 2026 so far: 82
2. 2025: 70
3. 2024: 53
4. 2023: 28
5. 2022: 23
6. Total for 2022 to 2026: 256

Older years, also exact:

1. 2020 and 2021 together: 71
2. 2019: 113

Before 2019: not counted. The mailbox has PDF threads going back to at least 2014, so 442 is a floor. The real total is higher.

Most PDFs from 2022 on are automatic bills and statements (software and phone-company invoices, payment receipts). Most from 2019 to 2021 are permit and building-department notices and inspection-report emails. Real job documents are a minority of the count.

## Section C: Image and scan threads

Query used: has:attachment with jpg, jpeg, png, tif, tiff or heic.

1. 2026 so far: 32
2. 2025: 22
3. 2024: 16
4. 2022 and 2023 together: 91
5. Total for 2022 to 2026: 161

**Caveat:** about 80 of the 2023 hits are one burst of promotional mail in June 2023, not scans. Gmail also counts logos and signature pictures as attachments, so this number overstates real photos and scans. Years before 2022 were not counted.

## Section D: Tracking numbers in PDF threads

Query used: has:attachment filename:pdf TRK-2026.

1. Matches: 3 threads, all from September and October 2026.
2. That is 3 out of at least 442 PDF threads.

**This is only a rough stand-in for "saved and filed."** Gmail matches TRK-2026 when it appears in the subject, the body or an attachment's file name. It cannot see a TRK stamped inside a scanned page. Older jobs from before the TRK system started cannot carry one at all. Short-form numbers (TRK-26-NNNN) were not searched.

## Section E: Triage state

1. Inbox threads: 45,101
2. Unread inbox threads: 42,701
3. Starred threads: 7
4. Spam folder: 170 threads. Trash: empty.
5. User labels: 24 in total.

No label name contains TRK, FILED, TRIAGE, OCR or VTES. Four labels look like sorting or filing labels:

1. Claude-Sorted (empty)
2. Claude-Sorted/Promotions (14 threads)
3. Claude-Sorted/Social (empty)
4. Superseded - sent from Outlook (4 threads)

Two more labels are hashtag-style job tags on a building and a town (3 threads each). They are left out of the count and their names are left out of this file. Two broad buckets also exist: "Receipts & Bills" with 249 threads and "People & Work" with 138.

## Section F: How the counts were made, and their limits

1. Gmail's own count estimate is not reliable. It stops at 201, and it changes with the page size. So each year was paged 50 threads at a time until there were no more pages.
2. Inbox, unread, starred, spam and label totals come from Gmail's label counters. They are exact at the time of reading.
3. Counts are threads, not messages and not files. One thread can hold several PDFs.
4. Spam and trash are not included in the attachment counts.

Does this give the dashboard what it needs?
