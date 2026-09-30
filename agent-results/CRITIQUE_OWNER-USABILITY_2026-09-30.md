# CRITIQUE — Will this actually help Jorge? (Owner usability review)
**ADHOC-FILING-CRITIQUE · 2026-09-30 · ☁️ LLM-02 reviewer (read-only) · #filing #critique #JorgeValdes #usability**

## Section A — The answer first

**The design is good for AI agents and almost useless to Jorge's phone tomorrow morning.** Nothing he does at 7am changes, because every fix that touches his search is waiting on his approval or on a desktop run that has not happened.

Five plain facts:

1. **README-FIRST is close to enough, but it is not wired in.** Nothing that an AI reads automatically points to it. `CLAUDE.md` never mentions it. Only the constitution does. An AI that reads nothing else will never see it.
2. **The constitution is too long to ratify by ear.** It is about 2,300 words, eleven sections, and it asks for a yes on a tree he cannot picture.
3. **The phone search is not fixed.** The fix is written as a rule for new files. The old files that bury his results are untouched.
4. **Several "small" steps quietly land on him.** Section D lists them.
5. **Three changes would help most.** Section F lists them.

## Section B — Is README-FIRST enough? Is it short and plain?

**Short: yes. 397 words, one page. Plain: mostly. Enough: no, for three reasons.**

1. **It is not loaded automatically.** `CLAUDE.md` is what every session reads. It does not say "read README-FIRST." A cloud agent that follows `CLAUDE.md` only will never open it. **One line in `CLAUDE.md` fixes this.**
2. **It points at files that do not exist yet.** I looked. There is no `02-INTAKE/AGENT-INDEX.md`, no `APPROVALS-NOW.md`, and no `00-INDEX.md` for any job. Only `00-START-HERE` and `04-AI-SYSTEM` exist in the repo. An agent told "read the job's 00-INDEX.md" will find nothing and then roam, which is exactly what Jorge wants stopped. The page must say what to do when the pointer is missing: **stop and write a request, do not guess.**
3. **It contradicts `CLAUDE.md` today.** Rule 7 says backups go to `06-ARCHIVE/_BACKUPS/`. `CLAUDE.md` line 230 still says make a `.bak` copy, and that copy lands beside the file. An agent obeying the charter breaks the README. The constitution admits this, but README-FIRST states Rule 7 as if it were already law. **Until Jorge says yes, the README should say "proposed" on that line, or the charter line must be changed.**

Plainness problems inside README-FIRST:

1. **Jargon an AI knows but Jorge will hear as noise:** TRK, OPH, RED, folio, L0, "intake," "capsule," `_Superseded`. He wrote some of these himself, so TRK is fine. "Capsule" and "OPH" are not everyday words.
2. **The filename grammar line is a wall of symbols.** Read aloud it is: "Y Y Y Y dash M M dash D D underscore T R K dash twenty twenty-six dash N N N N." Jorge does not need to hear that line. The AI does.
3. **Rule 7 is the longest rule and the most important for him, yet it is buried last.** The 107-of-156 number is the best sentence on the page. Move it up.

**Keep the page as the AI's page.** Do not try to make Jorge read it. Give him a separate, shorter page (Section F, change 3).

## Section C — Can he ratify the constitution by listening?

**No. Not as written.** The length is the smaller problem. The bigger problem is that it asks him to approve a tree, a naming grammar, a program state model, and a five-phase reorganization in one sitting, with no picture.

**What he will misunderstand when it is read aloud:**

1. **File names with underscores and spaces.** Text-to-speech reads `2026-07-29 _ TRK-2026-1262 _ Permit _ Permit Card Unit 143 _ v1.pdf` as a stream of numbers and "underscore" or nothing. He hears digits, not a name. He cannot check whether a file is named correctly by ear.
2. **TRK, OPH.** He knows TRK. **OPH** will be heard as the letters "oh pee aitch." The charter already gives it a meaning, but the constitution uses it four times without saying "orphan number" each time.
3. **RED and GREEN.** To a listener these sound like colors, not rules. "Filing is RED" could be heard as "filing is bad" or "filing is an emergency." It means "needs Jorge's approval." **Say "needs your yes" in his reply.**
4. **`.bak`, `.SEARCH.txt`, SHA-256, `p047`.** Heard as "dot bak," "dot search dot text," "shaw two fifty six." None of these help him decide anything.
5. **Symbols.** The arrows, the middle dots in the stamp line, slashes in citations, the backticks. Some readers speak them, some skip them. Either way the meaning is lost.
6. **"Hybrid," "System 1," "System 2," "Section A to K."** Section A's history of two systems is interesting to an AI. To Jorge it is four minutes of listening before any decision. **He has to reach the decision at the end.**
7. **"Ratify."** Not a word he uses. "Say yes to" is.
8. **The dated stamp line.** `TRK ADHOC-FILING-CONSTITUTION` is not a TRK in his own format. The file admits it has no real TRK. That is a defect under the charter (`TRK-TBD` is a defect) and he will hear an odd number with no meaning.

**What is good:** Section K is three lines and could stand alone. The yes/no question at the end is well-formed. Sections C and D are readable because they are lists.

**Recommendation:** split it. An AI version (the constitution as written, fine) and a one-page "What I am asking you to say yes to" for Jorge with three numbered items, each answerable in a word.

## Section D — What Jorge can do tomorrow morning, and what he cannot

**What he can do differently tomorrow:**

1. **Nothing on his phone changes.** Be honest about this. Searches for `#Karla` and `20001` return the same pile tomorrow.
2. **He can say yes or no to about six questions** in the sweep registry (Sugar Hill alive? Garden Walk alive? 13920 or 13980? Copy six Karla files? Send Alec's three finished books? Bay Harbor suffix numbers?). Those are real and cheap. **They are also the most useful thing in the whole package.** The Alec books are cash.
3. **He can say yes to the tree and the filename form.** That unblocks new folders in Drive.
4. **He can say yes to Rule 7.** That is the one yes that eventually clears the `.bak` pile from search.

**What he still cannot do:**

1. **Find every Karla document with one phone search.** Six identities, hashtags in filenames, about 45 of 85 hits are nightly `.bak` copies.
2. **See 20001's real documents.** About 40 to 60 real files sit among about 156 titles, and the capsule's permit, invoice, correspondence and report folders are empty.
3. **Find anything that lives only on OneDrive or the PC.** Sugar Hill (247 files) and Jobs-Master (4,149 PDFs) cannot be seen by Drive search. The `where:` line helps only after someone writes it.
4. **Stop agents from filing wherever they like, today.** The rules are written. **Nothing enforces them.** An agent can still create a folder. The only guard is that agents read a page that no startup file points to. The constitution says folders are created "by one approved script," but no such script is named or installed.
5. **Use the tree view.** It is a single HTML file that Jorge cannot easily open on an iPhone, and its data is the 8/24 scan. It says so itself. Its wording is clear and kind ("This scan is N days old... It shows what was there then"). The folder names shown, such as `0097` and `Trey 999`, will mean nothing to him. That is a data problem, not a wording problem.

## Section E — Where the design hands work back to him (charter Rule 1 forbids this)

1. **"Assign a TRK for this project. Registry edit is RED."** The project could have used the next free number itself and asked for one yes. Instead it ships with a fake ID. That is handing him a registry decision. The charter says to recommend one and proceed.
2. **Daily banner: "N documents are ready to file. YES / LATER."** One click is small, but it is **every day, for every batch, forever.** With a 300-item backlog and filing as RED, this becomes a daily chore. "LATER" clicks pile up silently. **The first-two-weeks rule "Jorge sees five examples first" is good, then he should stop seeing it.** Filing into a folder that is certain by exact TRK could be pre-approved once.
3. **"Yes to the Drive form as canonical filename. Proceeding unless he objects."** Good pattern, correctly done. Keep it. But the constitution then lists two other items as needing him, so the silence rule is applied unevenly.
4. **Merging identities is RED, "Jorge decides."** Jorge cannot decide which of six Karla numbers is the survivor. The sweep already recommends TRK-2026-1256. **Recommend it and proceed. He objects only if wrong.**
5. **Email circles: "RAMBO must find the existing protocol on the PC."** Fine, but the paragraph is labeled "unverified" and aimed at Jorge's understanding. If the agent cannot find it, Jorge will be asked to explain his own protocol. That is the exact pattern he complained about.
6. **Unregistered numbers, double-booked 1582 and 1412.** These need someone to reconcile the registry. The sweep lists them and does not say who does it. **Someone must own this, and it should not be Jorge.**
7. **Section J asks every LLM to critique the document.** Jorge's own window will have to launch "Hand work to another window." That is a technical action pushed to him. Have an agent do it.
8. **"Is Sugar Hill still alive?" "Is Garden Walk still alive?"** These are real business questions and only he can answer. Fine. But the registry asks six at once with no order. **Put cash first: Alec books, then Medley, then the rest.** The charter's own Article 3 says that is the order.
9. **Paste blocks.** The charter asks for permanent PASTE IDs for anything he must paste. None of these documents creates a paste block or a PASTE-LOG entry. Good, as long as nothing is hidden behind "tell the desktop session."
10. **Closing question.** README-FIRST tells agents to end with a question. Good. The constitution ends with one. The critique requested here ends with one too.

## Section F — Will his iPhone search work? And the three changes that help most

**Short answer: not yet. The diagnosis is right. The cure is not installed.**

How Drive search works on his phone, as the sweeps describe it:

1. It reads the **document body** and the **file name**. It does not know that `#Karla` is a category unless the word sits in the body text of a file that Drive can read.
2. It returns **everything**, including nightly `.bak` copies and `.SEARCH.txt` sidecars. For job 20001 that was 107 of about 156 titles.
3. **Scanned PDFs without a text layer are invisible to it.** Only about 6 of 54 sidecars carried a TRK (about 11%).
4. **Nothing on OneDrive or the PC is searchable from the phone.**

What each symptom needs:

1. **`20001` returns junk.** The folder name should carry "20001" (the address) **and** TRK-2026-1262 so one search hits the folder first. The dates and file noise come second.
2. **`#Karla` returns almost nothing real.** Hashtags are in filenames, and Drive does not treat them as tags. They must also be in the body. For a Google Doc or a text file, that is one line. For a scanned PDF, it is the sidecar's first line, and the sidecar is itself a search hit.

**The smallest thing that would make `#Karla` and `20001` work from his phone:**

**One plain-text file per job, named with the TRK and the words people search for, sitting in the job folder root, and containing the hashtags, address, nicknames and folio in its first line.** Drive indexes the body of text files. A search for `Karla` or `20001` then returns that one file first, and opening it lists the real documents. This is the `00-INDEX.md` the constitution already proposes. **What is missing is the search-words line.** Suggested first line for the Karla file:

`TRK-2026-1256 · Karla · #Karla · #pool · Groves at Sunset · Sunset Cove · 8850 SW 72 St · folio 30-4033-001-0012 · TUS-26-1021 · KAR-26-GROVES · TRK-2026-1436`

That single line pulls all six identities into one hit. For 20001 it would read: `TRK-2026-1262 · 20001 · 20001 SW 110 CT · Unit 143 · MZ Solutions · #20001`. Two files, about ten minutes of agent work each, nothing moved, nothing renamed, nothing deleted. **Creating a new file is GREEN under the charter's own test ("anything writing only to a file that did not previously exist"). It does not need Jorge's yes.**

One caution. The file name should start with a character that sorts and searches cleanly, such as `00-INDEX _ TRK-2026-1256 _ Karla`. A bare `00-INDEX.md` in every folder will make fifty identical titles on his phone. **Put the TRK and a nickname in the file name, not just the word INDEX.** The constitution's name, plain `00-INDEX.md`, will look the same in fifty places. That is a flaw in the current design.

**The `.bak` problem** is the largest noise source. Rule 7 stops new `.bak` copies beside files. It does not clear the existing ones. About 240 nightly copies bury Bay Harbor. Someone has to stop the nightly job that writes them, or move them. **Stopping the writer is cheaper and safer than moving 240 copies.** The constitution moves the burden to a rule agents must remember. A rule that agents must remember is the failure mode this repository already logged many times. **Find the nightly job that makes the copies and turn it off. That is removal, the charter's preferred tier.**

## Section G — The three changes that would cut his effort most

1. **Make the nightly `.bak` copies stop at the source, and do not wait for a ratification.** Find the job that writes them and change where it writes. This cleans all future search results for every job at once. It removes the cause instead of asking every agent to remember a rule. Changing the charter line at `CLAUDE.md` 230 is the matching edit. Until the job is fixed, Rule 7 is a wish.

2. **Put a search-words index file in the top 10 active jobs, starting with Karla and 20001.** One new text file per job, TRK and nickname in the file name, all identities, hashtags, addresses and folio numbers in the first line, then a one-line-per-document list with a `where:` pointer for anything on OneDrive or the PC. New files only, so it is GREEN tonight. After that, `#Karla` and `20001` work on his phone. Do Alec's five DD jobs next, because they are cash.

3. **Give Jorge a one-page "say yes to these three things" and do everything else without asking.** Drop the fake TRK by taking the next free number with a note, recommend TRK-2026-1256 as the Karla survivor, pre-approve filing where the TRK is an exact match, and cut the daily banner to the ambiguous items only. Write that page in his style: short, numbered, no file names, no RED/GREEN, one yes/no at the end.

And one fix that costs one line: **add to `CLAUDE.md`, near the top: "Filing work: read `filing-system/00-START-HERE/README-FIRST.md` first."** Without it, the page that stops agents from filing wherever they like is one that no agent is told to read.

## Section H — Smaller wording fixes (cheap, do them while editing)

1. In README-FIRST, replace "RED" with "needs Jorge's yes" on first use.
2. In README-FIRST, say "orphan number" once before using OPH.
3. In README-FIRST, put Rule 7's 107-of-156 sentence into the top two lines. It is the reason the page exists.
4. In the constitution, move Section K to the top, above Section A.
5. In the constitution, delete or move Section J (the conflict list) to its own file. It is a work list for agents, not for Jorge.
6. Give each of the three Section K items a single word he can answer: yes, no, or later.
7. The registry's last line, "Which one do you want me to chase first?", is a good closing question, but it asks him to choose among six. **Recommend one (Alec books, because cash) and ask only "Go?"**

**One question for Jorge: may I start with the two search-words files for Karla and 20001 tonight, yes or no?**
