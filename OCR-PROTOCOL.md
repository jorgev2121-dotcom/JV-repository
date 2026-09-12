# OCR PROTOCOL — how a scanned/photographed document becomes findable and filed
**TRK-2026-9778 · written 2026-09-04. The operational half of the `orphan-onboarding` skill + the night OCR sweep.**

## The protocol, step by step
1. **Find the image-only docs.** A PDF or photo with no text layer (a scan, a Polaroid, an iPhone photo)
   is invisible to search. These are the OCR candidates. (Born-digital PDFs already have text — skip them;
   counting them is what inflated the denominator to a false 30%.)
2. **OCR the image** (pytesseract, local on the desktop — RAMBO's lane; this is the heavy sweep).
3. **Extract identity — copy literal strings, don't summarize:** property address (+unit), folio
   `NN-NNNN-NNN-NNNN`, permit number, **party names AND email addresses**, date on the document, issuing
   body, and any `TRK-2026-####` already in the body.
4. **Write two sidecars next to the file:**
   - `NAME.SEARCH.txt` — the full OCR text, so the page is searchable by any word on it.
   - `NAME.TAGS.txt` — the identifiers + hashtags (`#folio` `#permit` `#party` `#email`), the category handles.
5. **Stamp the footer identity** (`TRK · v · pNNN · date · CURRENT`) so the page keeps its identity after
   it's printed, screenshotted, or pasted elsewhere. Filename identity is for storage; footer for retrieval.
6. **Match to a capsule — EXACT match only** (folio → permit → full address+unit → party+address). Two
   candidates = no match → it stays an **orphan (OPH)**, never filed on a fuzzy match.
7. **The move into a capsule is RED** (owner's one click). OCR + tagging + proposing the capsule is GREEN.

## How it integrates with EMAIL ADDRESSES
Email is a **primary intake source** and email addresses are **identity + routing**, three ways:

1. **Attachments are documents to OCR.** Files arriving in **Gmail (jorgev2121@gmail.com)** and **Outlook
   (Jorge@TeamUsaSales.com)** are pulled, OCR'd, identity-extracted, and filed by this same protocol.
   Cloud can read Gmail; **pulling attachments and OCR run on the desktop (RAMBO)** — Cloud hands those off.
2. **The sender/party email becomes searchable metadata.** The `.TAGS.txt` captures who emailed it — so a
   doc is findable by the person as well as the address/permit (e.g. an MZ / Zaldivar email, a client's
   address). Email = a category handle, like a hashtag; the TRK is still the one identity.
3. **The two mailboxes are two doors, one filing system.** A doc can arrive at either address; the protocol
   files it to the same capsule. This is also why the HOA "two email" conflict mattered — the portal keyed
   the account to one address; the same care applies to which address a document came in on.
4. **Task/document intake channel:** anything sent to the `JOB:` gmail (from the iPhone or elsewhere) is
   read by the cloud seat, and any attached document enters this OCR protocol.

## The cross-reference / entity layer — "who was in the deal" (owner spec 2026-09-12)
A relationship graph keyed to the **master TRK**, built from documents AND email headers:

1. **Tag every party to the job's TRK.** For each document/email, capture who **sent, received, or was
   CC'd**, plus every **phone number** on it, and tag them all with that job's TRK. Find one → find the
   job → find everyone connected. Phones are indexed exactly like names/emails.
2. **Entity resolution — one person, many identities.** A single real person may hold several contact
   identities (Javi = **Javier Vasquez**, attorney for Garden Walk West: **two firms, two emails, two
   addresses** because he changed firms mid-deal). Unify them under one person so history **before and
   after** the switch stays linked.
3. **The exact-vs-fuzzy rule still governs (charter §9 / Rule 9).** Index automatically by an **exact
   identifier** — a specific email address or phone number. **Merging two identities into "one person" is
   a judgment, never automatic** — the seat *proposes* the merge (e.g. "these two emails look like the
   same Javi"), the owner confirms with one click. Same principle as filing: exact = auto, fuzzy = flag,
   never silently merge. Jorge's own words: "we'll filter them out manually if needed."
4. **Save format:** the graph is relational data, so it lives in a **structured file — `PEOPLE-REGISTER.csv`
   (or `.json`)** — columns: person · aliases · emails · phones · firms · addresses · TRKs-they-appear-in ·
   confidence · merged?(owner-confirmed). A human-readable `.md` view can render from it, but the queryable
   source is the CSV/JSON, not prose.

## Honest limits
- **The heavy OCR sweep is desktop-only** (pytesseract on RAMBO). Cloud can read a Drive PDF/image's text
  representation for one-off checks, but not run the bulk sweep or pull Gmail attachments.
- **Authoritative OCR status (2026-09-04): 8,774 of 9,758 client docs = 89.9%; 984 remaining**, biggest
  pile PaperPort (569 files, 2022–23), queued as night-eligible GREEN work.

#TRK-2026-9778 #ocr-protocol #orphan-onboarding #email-intake #the-CD
