# Hashtag census — fix list for a morning session (nothing changed yet)

- TRK-26-1042 (15222 SW 108 Pl):
  - The v2 DELIVERABLE .TAGS.txt carries #TRK-2026-9490, which is in the admin band. It should be #TRK-26-1042 / #TRK-2026-1042.
  - The FINAL_ALL tags are cut off at "Daymara-Yh".
  - The root has _TAGS.txt instead of _HASHTAGS.txt, so a second tag-file convention is in use.
  - The folder name says FOLIO-TBD; the folio is 30-5030-008-0370.
- 13328 SW 113 CT (Nick): the DELIVERABLE v2 tags carry #TRK-2026-9490, which is in the admin band. This is the same wrong number as TRK-26-1042, so a template bug likely stamped it on several jobs. The FINAL_ALL tags read #23328 instead of 13328 (OCR error).
- 535 NW 7 ST Homestead: the folder is still labelled TRK-TBD and FOLIO-TBD. The registry has TRK-2026-1532 and the folio is 10-7813-003-0120. The relabel waits on Jorge.
- 4225 Rose Arbor (1588): the 2022 tax bill tags carry #TRK-2026-9754, which is in the admin band.
- Julia (0708): _HASHTAGS.txt and _TAGS.txt use different TRK forms.
- 1286: the folder says "1997 SW 218 St"; the real address is 11997. Two report names use the short form "TRK-1286".
- Pattern: three tag-file conventions are in use: _HASHTAGS.txt, _TAGS.txt, and per-document .TAGS.txt. About 50 nightly .bak copies sit in every job root.
