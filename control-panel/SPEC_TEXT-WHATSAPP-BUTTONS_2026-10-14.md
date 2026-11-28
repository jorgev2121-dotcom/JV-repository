# SPEC · Text + WhatsApp buttons linked to contacts · 2026-10-14
#T-20261014-12 #T-20261014-10 #VTES #control-panel #spec

**Status:** spec only. The panel is NOT edited by this file. Build it in the next panel version.
**Owner approval:** Jorge said YES at 10:38 AM ET on 2026-10-14, from "Waiting on you" (task-comments doc k98ysx4y291qy2x5ibui). The yes means: **contact phone numbers may be shown inside the private panel.**
**Privacy rule:** the panel holds client names and phone numbers, so it stays **private** (SHARE-LINK-01 exception). Never turn on "Anyone with the link" for it.

## Section A. Answer first
1. Every contact row gets two buttons: **💬 Text** and **🟢 WhatsApp**.
2. Each button is a plain link. It opens the phone's own Messages or WhatsApp app with the number and a draft message filled in. **Jorge presses Send himself. Nothing is ever sent by the panel or by an agent.**
3. The numbers come from one place: a `contacts` collection in the panel database, filled by a one-time import from Google Contacts (Zapier), plus the few numbers the repo already holds.

## Section B. What the repo holds today (counted 2026-10-14 10:45 AM ET)
1. **PEOPLE-INDEX** (`inbox-sweep/PEOPLE-INDEX.md`): 291 people and companies, **0 phone numbers** (emails only).
2. **Hashtag census** (`control-panel/hashtag-census/*.json`, 57 job files): **3 phone fields** filled: 2 clients (Synergy General Contracting; Renzo Gustavo Cahuana) and 1 city officer (Yairis Chapelli, Homestead Code Compliance). One more client number sits in a hashtag list, not a phone field (Toni Hamilton).
3. **Capsules and inbox sweeps** (`runner-results/CAPSULE_*.md`, `inbox-sweep/`): Miguel Zaldivar (MZ Solutions) has one number, in `inbox-sweep/2026-10-10/D_homestead-1684-synergy-13920-15601.md`. The rest are office lines (Bal Harbour Village building department, RER lien collection, City of Miami code compliance) and Jorge's own signature number.
4. **Total usable named contact numbers: 5 people or companies** (Miguel Zaldivar, Synergy GC, Renzo Cahuana, Toni Hamilton, Yairis Chapelli), plus Jorge's own. **That is 5 of 291 people, under 2%.** A raw regex finds 112 phone-shaped strings across the repo, but most are permit and process numbers, not phones.
5. **Conclusion: the repo is not a usable phone book.** The real numbers are in Jorge's phone contacts, which sync to Google Contacts.

## Section C. The import (one Jorge click, then cloud does the rest)
1. **Jorge's one click (credential, so he does it himself):** open this link and connect his Google account to Zapier's Google Contacts app:
   https://mcp.zapier.com/api/v1/connect-auth/GoogleContactsCLIAPI?accountId=28548110
   The Google Contacts app is already enabled on the Zapier server with 0 connections. No agent types a password.
2. **Cloud, after he says "connected":**
   1. `list_zapier_connections` (Google Contacts), then set it as the default connection.
   2. Read-only search of contacts (Google Contacts "Find contact" search action). Read only. Never create, edit or delete a Google contact.
   3. Match each PEOPLE-INDEX person by **exact email first**, then exact full name. **No fuzzy matching** (charter §9). A name that matches two contacts is listed for Jorge, not guessed.
   4. Write one doc per matched person to the panel db collection `contacts` (below), as a single `batch` write.
   5. Report "N of 291 matched, M ambiguous, K not found" in `runner-results/CONTACTS-IMPORT_<date>.md`. Counts only; the file carries **no phone numbers**.
3. Phone numbers live **only in the panel database**, never in a repo file, never in an email, never in a report.

## Section D. Data shape: db collection `contacts`
One doc per person. Doc id = a slug of the name (e.g. `miguel-zaldivar`).
```
{ name, org, role, emails: [..], phone_e164: "+1NNNNNNNNNN", whatsapp: true|false|null,
  jobs: ["TRK-2026-1262", ...], source: "google-contacts" | "repo-census" | "manual",
  matched_by: "email" | "name", updated: ISO time }
```
1. `phone_e164`: digits only with +1 for US numbers. Strip spaces, dots, dashes and brackets.
2. `whatsapp`: null means "not known". Show the WhatsApp button anyway; WhatsApp itself says if the number is not on WhatsApp.
3. Seed rows for the 5 repo contacts are written by cloud at build time (source `repo-census`), so the buttons work before the import.

## Section E. The buttons
1. **💬 Text:** `sms:+1NNNNNNNNNN?&body=<urlencoded text>`
   The `?&body=` form works on both iPhone and Android. Without a draft: `sms:+1NNNNNNNNNN`.
2. **🟢 WhatsApp:** `https://wa.me/1NNNNNNNNNN?text=<urlencoded text>`
   Digits only after `wa.me/`: no plus sign, no dashes, no leading zeros.
3. Both open in a new tab (`target="_blank" rel="noopener"`). On the PC, `sms:` opens Phone Link if it is set up; if nothing opens, the tooltip says "Use your phone for this button."
4. Draft text is optional and short (under 153 characters, the SMS-by-Zapier limit, so the same text works for both paths). Default draft: empty.
5. Tooltips (data-tip, plain words): "Text Miguel Zaldivar. Opens your Messages app with the number filled in. You press Send." and the same for WhatsApp.
6. A contact with no phone shows the two buttons greyed out with the tip "No phone number on file yet."

## Section F. Where the buttons appear
1. **People list** (new "📇 Contacts" tab, Orange Tree layout: branches by company, a checkbox per person, "Copy for email" copies names and emails only, never phones).
2. **Every capsule's contact line** (Medley, Plaza, Pasadena, etc.): the buttons sit next to each named person.
3. **"Text my location" card (T-20261014-10):** two buttons, "Text Jorge's cell" and "Text Miguel (MZ)". Each is an `sms:` link with the draft "My location: <Google Maps link>". The panel fills the link from the browser's location only when Jorge clicks "Get my location" (geolocation capability, asks permission each time). Nothing is sent automatically.
4. The automatic path for T-10 (an agent texting **Jorge's own** number with no tap) is separate: SMS by Zapier, which is enabled on the Zapier server and needs Jorge's one connect click (link in `runner-results/PANEL-APPROVALS_2026-10-14_1038.md`). SMS by Zapier can only text **verified** numbers, so it can never text a client. Clients are always tap-to-send.

## Section G. Tests (must pass before publish)
1. Unit: `toE164("(305) 555-0100") === "+13055550100"`; `toWa("+13055550100") === "13055550100"`; a 7-digit or foreign number returns null and greys the buttons.
2. Unit: the built `sms:` and `wa.me` links are exact strings for 3 fixtures (use 555-01xx test numbers, never real ones).
3. DOM: no `fetch`, `sendBeacon` or form post is made when a button is clicked (the button is only a link).
4. Privacy: grep the published HTML for any 10-digit phone pattern. It must find **0**: numbers come from the db at run time, never baked into the page.
5. Phone width: two buttons fit side by side at 360 px with the 16 px gutter.

## Section H. Rollback
Republish the previous panel version. The `contacts` collection can be deleted doc by doc with Jorge's yes (deletion is RED).

Shall the cloud seed the 5 known contacts into the panel database when the button build starts?
