# W2 - Website/engine and existing portal pages (read-only survey, 2026-09-30)

## 1. WHAT WAS FOUND about the company website and the 15-year-old engine
NOT FOUND as a described system. Records name domains but say nothing about the site's code, host, or engine.
1. Domains that appear in the records:
   - onlinecou.com: Jorge's own domain for the CU Inspections business. Evidence: OPEN-ITEMS.md TRK-2026-9419 ("Jorge's own domain is onlinecou.com"); mailboxes jorge@onlinecou.com (5,075 inbox items) and info@onlinecou.com (MORNING-REPORT_2026-08-30.md, 40 of 201 high-volume mails); 2014 test emails "Test from onlinecou.com sending to teamusasales.com" (OWNER-QUEUE_MIRROR_2026-09-09.md line ~2914). Seen in records only as EMAIL. No record says a website runs there.
   - teamusasales.com: Team USA Sales, Inc. Gmail signature reads "Website: www.TeamUsaSales.com" (Gmail, Jorge's 2026-09-09 and 2026-09-30 sends). PROJECT_MARKETING-WALLY.md line 51 calls it "existing TEAMUSASALES.COM domain", about $7/month. Used for Outlook mail (Jorge@teamusasales.com).
   - systeamusa.com: sender info@systeamusa.com (OWNER-QUEUE_MIRROR line 198). Purpose UNKNOWN.
2. Hosting, registrar, CMS/technology (PHP, WordPress, ASP), developer, who maintains it, where source files live: UNKNOWN. No record says any of these.
3. "15 years old": no record states site age. Only dated trace: onlinecou.com mail tests from 2014. The engine's age is UNKNOWN.
4. WebFetch onlinecou.com and www.teamusasales.com: both BLOCKED by the network egress proxy (EGRESS_BLOCKED). Live site not inspected.
5. Only site-related planning in repo: OVERNIGHT-BUILD-PLAN_2026-08-26.md lists "website mockup + portal prototype" as "if time" overnight work, and "A LIVE multi-user portal = a real dev build + hosting + auth (freeze-gated)", with a prototype described as "login, per-party privacy zones, messaging, logistics view". No prototype file found in repo or Drive. marketing/CAMPAIGN-DRAFTS_TRK-2026-1614.md section 2 has draft QR landing-page copy for CU Inspections (three fields: address, name, phone; buttons Text us / Call us / Send my address). Not a built page.
6. What I searched:
   - Repo: grep for cuinspect, cu-inspect, cu inspections, website, web site, .php, wordpress, engine, portal, godaddy, hosting, cpanel, FTP, domain, DNS, legacy site, old website, in all .md/.html/.txt/.json; mailbox/; OPEN-ITEMS.md; AI-ROUTING-GUIDE, TRK-REGISTRY, LLM-WINDOW-REGISTRY; forms-library; marketing/.
   - Drive: fullText 'onlinecou' (results were Outlook-sweep reports only), title contains '_PORTAL_TRK', title website / web site / client portal / prototype, fullText cuinspections.
   - Gmail: onlinecou, cuinspections, GoDaddy, hosting, "web developer", website, wordpress, cpanel, domain (results were mostly newsletters and job mail; no hosting/registrar/developer thread).
   - Not searched (no access): Outlook stores (M365 not authorized from cloud), Jorge's PC disk (C:/OneDrive), 1Password.

## 2. THE EXISTING JOB PORTAL PAGES (_PORTAL_TRK-*.html)
Read in Drive: _PORTAL_TRK-2026-1292 (Alec, 7823 NW 5 Ave), _PORTAL_TRK-2026-0708 (Julia bond release); also repo _ORANGE-TREE-DD_TRK-2026-9344_v2.html. Drive holds others: 1256, 1262, 1265, 1534, 1536, 1612 (plus _EMBEDDED stale 25.7 MB snapshot), _PORTAL_BAL-HARBOUR-PLAZA_OPH-2026-0007, _PORTAL_UNASSIGNED_... (13920 SW 34 St).
1. Sections of a job portal (v3, "ORANGE TREE / Job Portal v3"):
   a. Stage banner: CURRENT STAGE (e.g. 08-DELIVERED, 04-OCR-INDEXED), days in stage against a clock, flag (MONEY DEFECT delivered-not-billed; PAST ITS CLOCK), next action, owner, last verified date.
   b. Header: project name (address - client - builder) at 33px, TRK number at 22px, document count "(+N support files, not counted)", generated-time with age (turns red after 24 h), hashtags.
   c. Button bar: Expand all, Collapse to root, Select all, Clear, Email selected (links), Copy links, Open selected, DROP NEW DOCUMENTS (links to Drive root), selected count.
   d. Link-health notice.
   e. Collapsible folder tree with per-folder document count, per-folder checkbox, red "SHELL - AWAITING RETRO-SWEEP" tag on empty folders. Folders seen: 00-Intake, 01-INTAKE, 01-Microfilm, 02-Permits, 03-Clerk-Liens, 03-INVOICES-PAYMENTS, 03-Research, 04-CORRESPONDENCE, 04-Property-Appraiser, 05-REPORTS-DELIVERABLES, 07-TAX-JACKET (ENHANCED / ORIGINAL), 08-Jacket-Order, Working Papers, _Superseded.
   f. Root-level files: _STAGE.md, _TAGS.txt, DD book PDF, 22-source run HTML.
   g. "Access (coming)" strip: badges Owner / Architect / Engineer / Contractor, "password-gated views will filter which documents each role sees. Placeholder for now."
   h. Footer: TRK, version, charter rule, "regenerate with Build-Job-Portal.ps1".
2. Data source: the job's folder tree on disk (G:\My Drive\01-JOBS - ONE SOURCE OF TRUTH\<TRK - address - client>\ and OneDrive PERM-APP-PORTAL capsules), plus _STAGE.md for the banner. No database. No client-entered data.
3. How generated: PowerShell script Build-Job-Portal.ps1 (OneDrive\Scripts\VTS\), walks the folder, writes one static HTML file into the job folder. Known defects in record: original capped depth 3 and 60 files per folder (Bal Harbour showed 77 of 1,961 links); patched copy (depth 6, 500 files, skips .bak/OCR sidecars) applied 2026-09-01 (TO-CLOUD_MIRROR_2026-09-03.md); OD-70 still asks Jorge to approve the promote. file:/// paths counted as Drive links (TRK-2026-9281). Nightly rewrite plus about 25 .bak-YYYYMMDD copies per portal; which task writes them is UNKNOWN (TASK-C2D_ADHOC-FILING-SYSTEM item 10). Orange Tree DD v2 (TRK-2026-9344) is a separate hand-built artifact with its own JS data tables.
4. What a client sees: a folder tree of file links with tick-boxes and Email/Copy-link buttons, a stage banner and stale-age marker. Observed in the 1292 and 0708 pages: banner says "all links resolve to Google Drive" but the link targets in the file are file:///G:/... paths, which open only on Jorge's PC (TRK-2026-9281 says the same: Alec's portal cannot be shared).
5. Orange Tree DD v2 (properties, not jobs): three layers property > folder > document/source; 22 county/state sources each with status pill: Answered (ok) / Blocked / Needs you (owner) / Not applicable / Document on disk; reason text on every slot ("nothing is blank"); Expand all, Collapse, Show gaps only, Contiguous read (all properties or selected), tick-to-share, Copy selection for email, Print, Copy link; blockers summary box; footer source-of-truth note.
6. What is missing:
   - No login or role filtering (placeholder only).
   - No client input: no forms, uploads, messaging, payments, e-signature.
   - No live status: the stage banner is regenerated by script, not by the client.
   - Links do not work for outsiders (file:/// paths).
   - No list of required documents or checklist per permit type, no deadline or fee display.
   - No per-document status (received / reviewed / approved).
   - Many folders are empty "SHELL" tags; counts have been wrong before (0 of 38 capsules counted correctly, TRK-2026-9288).
   - Builder depends on Jorge's PC; cloud cannot run it.

## 3. THE CONCEPT A NEW PORTAL SHOULD KEEP
1. One page per job, keyed by TRK number, address and client in the header; TRK shown large and stamped in the footer (charter 9.3).
2. Stage banner first: a fixed stage list (00-Intake through 08-Delivered seen), days in stage vs a clock, next action, owner, last-verified date.
3. Fixed folder set by number (01-Intake, 02-Permits, 03-Invoices-Payments, 04-Correspondence, 05-Reports-Deliverables, 07-Tax-Jacket, 08-Jacket-Order) with counts per folder and a visible "empty" marker. Never show a blank slot without a reason.
4. Status vocabulary from Orange Tree: Answered / Blocked / Needs you / Not applicable / Document on disk, each with a one-line reason and, for Needs you, the smallest owner action.
5. Tick-to-share plus Copy-for-email and Print; Expand all / Collapse / Show gaps only; one continuous reader view.
6. Drop-new-documents entry point (today a link to Drive root).
7. Roles already named: Owner, Architect, Engineer, Contractor (password-gated views, never built). Add Client. Matches the overnight-plan prototype: login, per-party privacy zones, messaging, logistics view.
8. Fields that recur for permit/legalization jobs (from CASE-CARDs, forms-library, Medley job): address and folio; owner/client; municipality and jurisdiction type (forms-library families: ETRAKIT, ACCELA, CITIZENSERVE, SMARTGOV, TYLER, CUSTOM, NOPORTAL, DEFUNCT); permit/process number; NOV/case number; fee and payment lines; invoice terms 50/40/10; deadlines/hearing dates; document list; signature/notary needs.
9. Keep links that work for outsiders (Drive share links, not file:///) and a freshness stamp that turns red when stale.

## 4. WHAT THE OWNER MUST SUPPLY (max 3)
1. The web address (URL) of the CU Inspections website that has the 15-year-old engine, pasted as text (onlinecou.com? teamusasales.com? something else?). Cloud is egress-blocked, so a screenshot of the home page and one inner page would also do.
2. One screenshot (or saved page) of the page where a client enters or tracks a job in that old engine. If it has no such page, one word: NONE.
3. Who hosts it and who built it: a forwarded hosting/registrar email or invoice (no passwords) or the developer's name.
