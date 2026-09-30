# tools/stamps — the stamp checker

**Status: NOT YET RUN ON WINDOWS.** The self-test passes under PowerShell 7 on Linux (25 of 25). It has not been run under Windows PowerShell 5.1 on the PC.

## Section A — what it does

`Check-Stamps.ps1` counts, file by file, whether each text file carries its identity.

1. Is there a `TRK-2026-NNNN` (or `OPH-2026-NNNN`) in the body?
2. Is there a stamp line: `TRK-2026-#### · v[N] · [date] · CURRENT` (page version adds `pNNN`)?
3. Is there at least one hashtag?
4. Does the file use the short form `TRK-26-NNNN`? (drift)
5. Is the TRK in the filename but missing from the body? (charter violation)

It scans `.md`, `.txt`, `.htm`, `.html`, `.js` and `*.SEARCH.txt` sidecars.

## Section B — it is read-only

1. It never changes, moves, renames or deletes a scanned file.
2. It writes one new CSV. If that name already exists, it uses a numbered name. It never overwrites.
3. No network. Nothing is sent.
4. The summary always shows a denominator, for example "PASS 412 of 3,180", never "good progress".

## Section C — how to run it on the PC

Step 1. Self-test first (takes a few seconds, uses only its own temp files):

```
powershell -ExecutionPolicy Bypass -File Check-Stamps.ps1 -SelfTest
```

It must end with `RESULT: 25 passed, 0 failed`.

Step 2. Real scan:

```
powershell -ExecutionPolicy Bypass -File Check-Stamps.ps1 -Path "G:\My Drive\01-JOBS" -Out "$env:TEMP\stamps.csv"
```

The last lines print the summary and where the CSV is.

## Section D — known limits

1. A Drive folder that is online-only may read slowly or fail. The summary prints how many folders could not be listed.
2. Files over 10 MB are skipped and counted as skipped.
3. Numeric hashtags need 4 or more digits (`#20001` counts, `#1` does not). A number in a normal sentence, such as `#2024`, would still count. The checker cannot tell.
4. It checks that a stamp exists and has the right shape. It does **not** check that the TRK is real or that the folder agrees. That is a later step, see the proposal.

TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #hashtag-protocol #stamps

**Question: shall the desktop run the self-test, then the real scan on 01-JOBS, and paste back the summary lines?**
