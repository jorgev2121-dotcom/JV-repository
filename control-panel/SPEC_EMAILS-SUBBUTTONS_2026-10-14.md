# Panel spec · Emails drop-down → sub-category buttons (owner ask 2026-10-14 ~10:05 AM ET)
Today the header "📧 Emails ▾" opens a small list of 7 links: Gmail (jorgev2121@gmail.com) Inbox · Unread · Sent · Emails with a TRK number; Outlook (Jorge@TeamUsaSales.com) Inbox · Sent · Drafts.
Change (build right after the search fix, before the Save button):
1. Clicking "📧 Emails" opens a sub-button bar under the header (same pale tint for all email buttons, one labelled row per mailbox: "Gmail" and "Outlook (work)"), instead of a tiny list.
2. Each sub-button: big, icon + plain word, hover tip saying what it opens.
3. Add: "Emails needing a reply" (Gmail is:unread in:inbox -category:promotions), "From the city" (from:balharbourfl.gov OR miamidade.gov OR ppines.com OR townofmedley.com), "Outlook unread".
4. A "View as" switch with 3 methods: Buttons (default) · Compact list (today's look) · Big cards (for phone). Choice remembered per browser.
5. Keep minimize/maximize/close. 375px no sideways scroll; hover tips; button-group colours; money lock untouched.
6. Test: tools/panel/test/emails-subbuttons-test.js.
