# Morning report — Tuesday 2026-08-18

**Written overnight by the cloud session. Last updated 04:15 UTC (12:15 AM Miami).**
**You were not woken. Nothing broke that could not wait.**

---

## Section A — The answer first

**Three real things finished overnight, and one of them is the proof of concept you said you
never got a reply on.**

1. **The 22 county sources ran against your five unsafe-structure addresses, with images.**
   5 of 5 properties. **All five have a confirmed open Unsafe Structures case** — checked
   against the county's own endpoint, not inferred from the list they came off.
2. **Alec's job at 331 Tamiami Canal ran.** `TRK-2026-1612` issued, capsule built, 50 documents,
   his portal extended. **Blocked on one free sign-in, and Friday is the deadline.**
3. **The property-jacket question is answered.** Four of your six addresses never had a jacket
   at all. **The one real jacket email in the entire mailbox belongs to a seventh property.**

**And one thing was found that explains a great deal: the desktop has never been able to read
the rulebook.**

---

## Section B — The most important decision, and it is not one click

**Get signed in to the Clerk of Court's Official Records site. Check 1Password first — you may
already have an account.**

**Two lines, because the size of this depends on something only you can check:**

1. **If you already have a Clerk account, this is a login. One minute.**
2. **If you do not, it is a registration** — open the page, choose *Individual*, type your email,
   press one button, then finish whatever the confirmation email asks. **Call it a few minutes,
   not a click.**

**I originally wrote "one free sign-in, one click" in this report. That was wrong and it is
corrected here.** The desktop fetched the actual page at 1:26 AM and measured it: there are two
flows on it, and only one of them is a click. **Writing "one click" would have been an owner
action dressed smaller than it is — the exact defect we spent last night removing from Alec's
report.**

**One honest caveat, and I would rather say it now than have you hit it:** the county's own page
says registering clears the search limits, and that claim was verified. **But the registration
benefits also mention paid "Units" for advanced searches.** A free account should clear the
standard search, which is what the deed chain and liens need. **It has not been proven that the
free tier reaches everything, and nobody is going to promise you "free" and then have you hit a
paywall.**

### Why it is still the first item

It is the only thing standing between Alec's report and the **mortgages, liens, judgments and
deed chain** — the category he is paying to have checked. **His site inspection is Friday
2026-08-21 at 3:30 PM.** Everything else on that job is done.

**What happens without it:** the job ships Friday stamped **PRELIMINARY**, with Official Records
recorded as **NOT SEARCHED — requires a Clerk sign-in.**

**That sentence is now in the client file, and the false one is out.** It previously read *"the
county was asked and declined to answer"* — which was untrue. **The Clerk never declined. We
never signed in.** The correction was made overnight, byte-verified, and the page rendered and
read back to prove nothing broke.

## Section C — Everything else you have to decide, cheapest first

**Each one of these is a word or a click. None is a technical choice.**

1. **Microfilm on Alec's job: YES-ALL or ASK-PER-ITEM.** Nothing ordered, nothing paid. The
   charter dates microfilm retrieval before 2026-09-05.
2. **Your 4-digit passcode. One number releases two finished fixes.**
   **First:** right now **0 of 38 job capsules count their documents correctly and 247 real
   documents are hidden with no warning.**
   **Second:** the checker that proves our work has no way to prove something was *removed*. It
   can show a sentence is there; it cannot show a wrong one is gone. **Last night's job was a
   retraction, so that gap mattered for the first time.**
   **This is the largest single win on the list and it is four digits.**
3. **Sign in to Outlook once** so we can see what is filing **2,786 emails in 60 days** out of
   your sight. We still do not know what is doing it.
4. **Which set of the five property reports is the delivery**, and do we package the folder
   before it goes out. Right now the folder is not safe to browse — see Section F.
5. **The tax jacket cleanup: option A or option B.** Open since 2026-06-28.
6. **JOB-0079 D.1: yes or no** — whether the watcher that starts jobs by itself gets built.
7. **The Board-of-5 gate, DIR-0001.** Thirty days old. **Read Section G before you blame
   yourself for that one.**
8. **The HOA's list of units it claims are complete** — DIR-0019.
9. **Approve three of the four verified jobs and refuse the fourth.** I recommended refusing
   `JOB-0079-D2` — one check, and it only proves a file exists.
10. **Fix the desktop's git credential.** One action, and Section E explains why it matters far
    more than it sounds.

---

## Section D — What completed, with numbers

**The 22-source proof of concept, TRK-2026-9250**

- **5 of 5** properties run, by two sessions independently, which **agree on substance**.
- **5 of 5** open Unsafe Structures cases confirmed against the county's own endpoint.
- **103 images** captured — aerials, block context, parcel maps, and screenshots of every
  county screen that returned data.
- **13 of 22** sources answered on the best run, **with the counting rule now printed beside
  the number** so it cannot be read three different ways.
- **The five final reports are self-contained** — 17 to 28 images embedded in each, verified
  three ways: image tags, embedded payloads, and files on disk, all matching.

**Alec's job, TRK-2026-1612**

- Capsule built, **50 documents**, six standard subfolders.
- **12 of 22** sources answered, every gap named with its reason.
- Portal **extended, not replaced**. Verifier **9 of 9 pass**.

**The jacket hunt, TRK-2026-9230**

- **530 folders across 6 Outlook stores** scanned. **Exactly one** jacket email exists.
- Matched to **14598 SW 110 St**, folio 30-5910-018-0210, capsule TUS-25-1023 — **by reading the
  county form inside the attachments**, because the email body names neither address nor folio.
- **0 of its 3 attachments were ever saved.** They are staged, not filed. Filing needs you.
- **67 jacket folders exist, 5 of them completely empty.**

---

## Section E — The finding of the night

**The desktop executor has never read the operating charter.**

Its git has been logged for days as "broken push." **A broken push is also a broken pull.** The
charter lives in the repository it cannot reach.

**So it has been working without the numbering rules, without the freeze order, without the
escalation standard, and without the recurring-issues file — including every entry written last
night about its own work.**

**It issued a real tracking number against a protocol it has never seen. It happened to be
fine. Nothing guaranteed that.**

**Fixed overnight without needing you:** the full charter is now mirrored into Drive, and the
desktop has read it and confirmed the exact version. **The permanent fix is your one git
action** — the mirror is a stopgap, and a mirror nobody refreshes becomes a second source of
truth, which is its own problem.

**Worth saying plainly: everything the desktop did last night, it did well, and it did without
the rulebook.**

**And nothing found this. A person did — the desktop refused to repeat a claim it could not
verify, and that refusal is the only reason we know.**

---

## Section F — What is not ready, stated honestly

**The five property reports are deliverable. The folder they sit in is not.**

- **Ten superseded reports sit beside the five good ones**, with the same names and no marker.
- **The superseded files were written one second later than the good ones**, so sorting by date
  puts you on the wrong file.
- **On four of the five properties the superseded file is also the bigger file**, so sorting by
  size puts you on the wrong file too.
- **The only reliable signal is the text `v2-ALL-IMAGES` in the filename.** A read-me has been
  placed at the top of the folder saying exactly that.
- **The build tooling and raw data are still inside the delivery folder.** A folder handed to an
  owner should not contain the machinery that made it.

**Still not answered anywhere:** deeds, mortgages and liens (Section B), tax status, City of
Miami permits before 2014, and the Property Appraiser's building photos.

---

## Section G — Why some of these have sat for a month, and it was not you

**The window that asks you questions has been opening at minus 963 across — the left monitor you
do not face.**

A census found the ask window, the Orange Tree window, the deadline nudge and the control panel
all over there. Two more had been minimised since 4:37 PM on Saturday — **the same minute as the
most recent answer on file.**

**For five sessions the record said you had not answered. You were never shown the question.**

**The ledgers said UNANSWERED where the truth was UNDELIVERED.** Those two words will never be
interchangeable in this repository again.

---

## Section H — What never started

- **The September board deck.** No PowerPoint and no Google Slides exists anywhere in your
  Drive. Not started.
- **Seven register items have no artifact anywhere** — the 1Password audit, the segmented
  scheduler, the guided tour, the Fable status report, the subscription plan, the Zapier-Plaud
  delivery, and the reboot root cause.
- **Three more cannot be checked from the cloud at all** — they live on your machine. **Those
  are not missing. They are out of sight**, and calling them missing is the mistake that was
  made eleven times on Sunday.

---

## Section I — What I got wrong overnight, corrected in the files

**I reported a silent overwrite that never happened.** I listed a folder while another session
was still writing to it, saw five small files, and announced that five large ones had been
destroyed. **They were written four minutes after I looked.**

**I did the exact thing this repository exists to stop: I turned "I could not see it" into "it
is gone."** Withdrawn, with a new rule — a snapshot of a moving folder is a snapshot, not an
inventory.

**I also told the desktop a rule was in a file without saying where the file lives**, to an
executor I already knew could not reach it. It refused the citation. **That refusal is what
found Section E.**

---

## Section J — The pattern worth knowing

**Seven times in two days, a system reported success while failing.**

The permit gate re-rendered its menu instead of erroring — **which reads exactly as "no permits
found."** A portal builder reported "50 Drive links, 0 local" when all 50 were local. The
Property Appraiser returned the county government centre for a Flagami address. The county said
"address not found" for a City of Miami parcel. A button did nothing, silently. A 5-megabyte
report held **one** image, not nineteen. And a count of "13 of 22" was published three different
ways without anyone lying, because nobody had written down what was being counted.

**Four of those would have gone into a client report as fact.**

**Every one was caught by somebody asking what the number was made of.** Never by an error
message. That is now the standing test: **a claim of success must state the quantity it counted
and the rule it counted by.**

---

---

## Section K — Added 04:40 UTC. The register audit, and the file nobody has opened

**There is a register of record on your machine that no session has ever opened.**

`_WORK-REGISTER.csv`, built 2026-07-30. **167 open items across seven streams** — 12 owner
gates, 59 jobs, 8 lanes, 28 client matters, 21 never-built protocols, 19 bizdev, 15 CRM gaps.

**The register that names it says, in its own words: "That is the two-to-three-hundred count
the owner remembers."** Your memory of the size of this backlog is accurate to the line.

**It is on the desktop and the cloud cannot open it. That is the next desktop job.**

### The number that should stop everything

**The retro sweep on 2026-07-31 registered 100 items. Four were verified done with an artifact.
Eighty-eight were never acknowledged at all.**

**Four percent — against a list that existed specifically to catch things not getting done.**

### What the audit resolved

**Eight items closed or corrected. Six of the eight were artifacts that already existed under a
name nobody searched for.** The 35-municipality intel matrix is real and is called
`Municipality-Software-Map.xlsx`. The token-cost agent was built as "Governor."

**And one of them is the answer to something you said twice this week.** The register lists
JOB-0026 as *"the promised job tree, never delivered."*

**It was delivered. It is the Orange Tree.** Index page, eight unit capsules, PDFs, search
sidecars, a per-unit index.

**Things are not disappearing. They are being built, and then recorded as missing by the very
register meant to find them.**

### Confirmed genuinely absent — seven

The 1Password audit · the segmented scheduler · the guided tour · the Fable status report · the
subscription plan **and the September 21 board deck** · the Zapier-Plaud delivery · the
reboot root cause.

**On the board deck: there is no PowerPoint and no Google Slides anywhere in your Drive. It has
not been started, and the date on it is September 21.**

### The one that explains the rest

**Nine ratified protocols from early August were marked acknowledged by a fabricated mass
acknowledgement on 2026-08-06.**

**Not lost. Not skipped. Recorded as done by something that made the record up.** That is the
ancestor of every problem logged this week.

### One recommendation, one line

**Reconcile against that 167-line file before anyone writes another register.** There are now
four overlapping lists of the same work and none has been checked against it. **A fifth list is
not progress.**

---

## Section L — Added 05:20 UTC. Something that has been unenforceable for months

**Your night protocol says a run is proved alive by its output file GROWING, not by the process
existing.** It has been logged three separate times as a recurring failure.

**Nobody ever wrote down a size to compare against.** So for months the rule could not actually
be applied by anyone.

**Fixed. The sizes are now in the repo** — the reconciler was 464 bytes at 12:40 AM. Every
hourly check from now on compares against that number and updates it. **Same size three cycles
running means hung, not busy.**

### Two words that have been used interchangeably and should not be

**Idle is not dead.** The verifier was flagged stale after 84 minutes when nothing had needed
verifying. **A warning light that fires on healthy idle teaches everyone to ignore the warning
light** — which is exactly how a real death gets missed.

**On the roster is not monitored.** The unattended executor was added to the roster last night
with its own status reading `green-unmonitored`. **It is recorded. Nothing restarts it and
nothing alarms if it dies.** No future report may call it monitored just because it now appears
in a list.

### One gap found while doing this

**The reconciler ledgers four lanes. Two are missing.**

`_CLAUDE-MAILBOX` — 25 files, every task the desktop has ever been given, **and now the only
copy of the rulebook either machine can read.** Not ledgered at all.

And the folder holding last night's entire proof of concept — five reports, 103 images, every
raw county response — **may be outside the ledger too**, depending on whether it counts
subfolders. **I have asked. It is a yes-or-no question and it is not answered yet.**

**Nothing is lost. But if it were, nothing would have noticed.**

---

## Section M — Added 06:25 UTC. The safety net has a hole where the valuable work sits

**Everything is where it should be. Nothing is lost. But if it went missing, nothing would
notice.**

The ledger that tracks the outbox **covers 164 files. The folder holds 541.**

**377 files are outside it, and 369 of those are last night's proof of concept** — all five
client-ready reports, all 103 images, and all 241 raw county responses that sit underneath every
finding as evidence.

**The reason is simple: the ledger does not look inside subfolders.** So it reads as 164 of 164,
one hundred percent complete — and it is thirty percent of the folder. **The top level is where
small files pile up. Depth is where deliverables go.**

**The second uncovered lane is the mailbox** — 96 files including the entire 22-source county
proof, and the only readable copy of your operating rules.

**Not urgent. Nothing is at risk tonight.** Worth fixing before the next big job, which on this
week's pace is in the next few days.

### Three of my own numbers were wrong and are corrected

I said the mailbox held 25 files; it holds 96. I said the proof folder held roughly 30 at top
level; it holds 25. **The image count of 103 was exact.**

**Every one of those corrections came from the other executor measuring instead of agreeing.**

---

## Section N — Added 07:25 UTC. Where your work actually arrives

**I enumerated every email with an attachment in your Gmail for the last twelve months. One
hundred threads, counted one at a time.**

**Two of the hundred came from a government address. Zero carried a client job document.**

**Gmail is a billing mailbox. It is not where the work comes in.**

The largest single sender is **OneDrive's automated photo-memories email — seventeen of the
hundred.** After that it is Stripe receipts, Zoho sales outreach, Microsoft and Anthropic
billing. **Twelve are you, forwarding to yourself from your work address.**

### Why this matters beyond curiosity

**It settles the property-jacket question properly.** I told you there was no jacket email;
there was, and it is in Outlook, which this side cannot reach. **That was a real error, and now
it has a measured explanation instead of an excuse: the documents never come through Gmail at
all.**

**And it kills a whole class of future work before it gets built.** Any intake watcher, OCR feed
or jacket catcher pointed at Gmail **would find two government emails a year.** Anything like
that has to point at Outlook or it is watching the wrong door.

### Two small things worth one look each

**Four QuickBooks invoice threads in your inbox are addressed to somebody else entirely** — a
`candy.almonte@iberostar.com`. Not you, not copied to you. All from January. **Either an old
alias is forwarding or a sender mistyped an address.** Not urgent. Not touched.

**And there are eight login-dot-gov emails clustered across two days in April** — the signature
of a government identity check being attempted more than once.

**Said carefully because it touches the Clerk decision: login-dot-gov is a federal service, not
the Miami-Dade Clerk. It does not prove you have a Clerk account.** What it does suggest is that
**checking 1Password first is worth the thirty seconds** before assuming you have to register.

### One caution about counting

Gmail's own result estimator said **201** on the first page and **53** on the second, for the
identical search. **The estimate is not a count.** The hundred above were counted by listing
them.

---

## Denominators

- **5 of 5** properties · **103** images · **5 of 5** Unsafe Structures cases confirmed
- **50** documents in Alec's capsule · **12 of 22** sources · **9 of 9** verifier checks
- **530** Outlook folders scanned · **1** jacket email found · **0 of 3** attachments saved
- **20 of 20** register items re-tested: **10 exist, 7 have nothing, 3 out of sight**
- **38 of 38** job folders confirmed to have all six subfolders
- **10** decisions waiting on you, **all of them a word or a click**
- Register batch 2: **8** resolved · **7** absent · **3** out of sight · **9** vapor · **5** proven
- **167** open items in the register of record — **0** sessions have opened it
- Ledger covers **164 of 541** files in the outbox — **369** of the gap is last night's proof of concept
- Mailbox: **96** files, **0** ledgered
- Gmail attachments: **100** threads examined · **2** governmental · **0** client job documents
- Heartbeat baselines recorded: **3 of 3** components, first time ever

**Nothing was filed, moved, renamed or deleted overnight.**

#MorningReport #TRK-2026-9250 #TRK-2026-1612 #TRK-2026-9287 #JorgeValdes #CU-Inspections
