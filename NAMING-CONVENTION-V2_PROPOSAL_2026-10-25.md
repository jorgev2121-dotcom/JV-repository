# NAMING CONVENTION V2 — proposal (waiting for Jorge's YES)

Date: 2026-10-25 · Tracking: TRK-2026-10055 (admin band) · Resolves RI-012
Status: **PROPOSED.** Becomes the standard, and replaces charter §9.1, when Jorge says YES.

## Jorge's request, in Cloud's words

Our filing has no reliable structure and things aren't filed on time, so the system doesn't work. Build a program that OCRs **every document everywhere in the system** and renames each one to **one standard name**. The name **starts with what Jorge recognises**: the property address, the person's name, or the project keywords. It **ends with the date and then the tracking number.** Hidden ("blind") hashtags may be added where they help searching.

## The grammar

```
ADDRESS-or-NAME _ TYPE _ DESCRIPTION _ vN _ YYYY-MM-DD _ TRK-2026-NNNN.ext
```

Examples:

```
20001 SW 110 CT Unit 143 _ Permit _ Permit Card _ v1 _ 2026-07-29 _ TRK-2026-1262.pdf
8621 Pasadena Blvd _ Letter _ As-Built Corrections to Tomas _ v1 _ 2026-10-23 _ TUS-26-1018.pdf
7265 NW 74 ST Medley _ Microfilm _ Building Records _ v1 _ 2026-10-24 _ TUS-26-1033.pdf
Unknown Property _ Notice _ County Letter _ v1 _ 2026-10-25 _ OPH-2026-0108.pdf
```

Rules:

1. **First field, what Jorge recognises.** A street address for property jobs; a person's or company's name when there's no address; otherwise two or three project keywords.
2. **Addresses in one fixed spelling** so they group together: house number, USPS street abbreviations (SW, NW, ST, AVE, CT, BLVD, TER), no periods, no "th" or "nd", and the unit as `Unit 143`. "S.W. 110th Court #143" becomes `20001 SW 110 CT Unit 143`.
3. **TYPE** is one word from a fixed list: Permit, Plan, Letter, Notice, Invoice, Report, Photo, Contract, Microfilm, Citation, Email, Form, Other.
4. **Version** is a bare `v1`, `v2`. "CORRECTED" goes in the description, not the version. A page ID goes after the version: `_ v2 _ p047 _`.
5. **Date** is the document's own date (found by OCR); otherwise the date the file was made.
6. **The last field is always the ID:** a TRK number, a job number such as TUS-26-1018, or an OPH number if the job isn't known yet. When an OPH resolves, only that last field changes.
7. **Separator** ` _ ` (space, underscore, space), as Drive already uses. Keep the whole name under 120 characters; shorten the description first.
8. **Blind hashtags never go in the file name.** They go in the `.SEARCH.txt` sidecar and the file's own properties (PDF keywords, Drive description), e.g. `#TRK-2026-1262 #20001-SW-110-CT #Permit #Miami-Dade`. Search finds them; the name stays short and readable aloud.
9. **The ID also goes inside the document**, as the footer stamp or the sidecar (charter §9.3).

## Strongest objection (Rule 3), and how it's handled

**The tracking number at the end is the first thing cut off** when a window is narrow, and the address at the front is spelled differently from one file to the next. A front-loaded address that's spelled three ways splits one job into three groups.

- **Handled by:** the fixed address spelling (rule 2), the ID also stamped inside the file (rule 9), and the engine filing by the ID, never by the name.
- **Alternative considered:** keep the date first (today's Drive form). It sorts by time but doesn't help Jorge recognise the property, which is the point of his request. **Address first is the better fit for how he works.**

## How it gets applied

- **The engine renames gradually**, at most 200 items per run (size brake), so the whole library migrates over several nights, each run with its own rollback script.
- **Drive links don't break.** Drive links point at the file ID, not its name. Local desktop shortcuts to renamed files may break; the engine repairs or lists them.
- **Old names are kept** in the log and the sidecar, so a search for an old name still finds the file.

Jorge: **YES to this naming convention?**
