# Naming change order — address first, keywords, tracking number last (proposal, 2026-10-13)

**Status: PROPOSED.** Renaming client folders is RED. Nothing is renamed until Jorge says yes to the plan below.

## Jorge's words (substance)

"Change order of naming convention: project address, then all the hashtags, then the tracking number, towards the end. Hashtags should reflect keywords used throughout the content of the job: names or keywords I would probably remember. The more the better, and allow for misspellings."

## Objection (Rule 3) and the recommended form

**The objection: real `#` signs and long tag lists cannot go inside folder or file names.**

1. **`#` breaks links.** The job portals and the Orange Tree open folders with `file:///` links. Browsers read everything after a `#` as a page anchor, so every link to a folder containing `#` would stop working.
2. **Long names break Windows.** Paths over 260 characters already broke the OCR pipeline (RI-017). Twenty tags with misspellings would put every document in a job past that limit.

**Recommended — the same idea, split in two:**

1. **Folder name: address first, then 3–5 plain keywords, then the tracking number last.** No `#` signs. For example:
   `8621 Pasadena Blvd Pembroke Pines _ Einar Suarez windows TomTech _ TUS-26-1018`
2. **The full hashtag list, with misspellings, goes in a `_TAGS.txt` file inside each job folder.** The Orange Tree and the panel search box read that file. Typing a misspelling such as "Passdena" or "Penbroke" then still finds the job.
3. **File names inside the job keep the date first,** so they sort by date. Tell Claude if you want address-first file names too.

## Samples (built 2026-10-13, written as new `_TAGS.txt` files in the two Drive job folders)

- TUS-26-1018 Einar: see `_TAGS.txt` in the Einar folder.
- TUS-26-1033 Medley: see `_TAGS.txt` in the Medley folder.

The misspellings are real. "Pasadina", "Passdena" and "Penbroke" already appear in file names on Drive. That is why the misspelling list matters.

## Rollout once approved

1. **Overnight (GREEN):** one helper per job (35 jobs) reads each job's documents and writes a `_TAGS.txt` with names, addresses, folios, permit and case numbers, companies, trades, and common misspellings. It also proposes a new folder name. Results are written per job as each one finishes.
2. **Morning (RED, with Jorge's yes):** the desktop renames the folders from the approved list, writes a rollback script first, and logs every rename.
