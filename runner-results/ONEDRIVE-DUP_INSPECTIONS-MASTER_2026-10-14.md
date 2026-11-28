# OneDrive duplicate compare: INSPECTIONS - MASTER FOLDER - ALL CORPS, 2026-10-14

**Read-only survey. Nothing was moved, renamed, copied, uploaded or deleted.**
**Proposal only — deleting duplicates needs Jorge's yes per batch**

## Section A. Counts in plain words (FLOOR counts, 5 tool calls used)

1. **The folder is "INSPECTIONS - MASTER FOLDER - ALL CORPS".** A is 13,863,038 bytes in the listing; the real difference is one folder that exists only in A.
2. **Top-level files: 19 in A, 19 in B. 19 identical** (name + size). 0 different size, 0 only in A, 0 only in B.
3. **Top-level sub-folders: 7 in A, 6 in B.** The 6 shared sub-folders have identical byte sizes in both. They were NOT opened (size match only, so unverified file by file).
4. **Only in A: 1 sub-folder**, "1301 NE 191 ST #F419 Miami, FL 33179 - Kary Luis" (1,491,618 bytes, 12 files). It is absent from B.
5. **Same name but different size: 0** found at the levels listed.
6. **Only in B: 0** found.

## Section B. Examples

Only in A (the missing folder, file names only):
1. .ppinfocache
2. 1301 NE 191 ST - # F419 - RECORDED .pdf
3. CERT - 1301 NE 191 ST  #F419    pdf.pdf
4. processing fees for 1300 & 1301 - ePayment ServicesePayment Services.pdf
5. ePayment Services (2).pdf
6. ePayment Services.pdf
7. Invoice - 1301 NE 191 ST #F419 Miami, FL 33179.pdf
8. MaxDesk.ini
9. maxdesk.ini2
10. PP11Thumbs.ptn
11. PP11Thumbs.ptn2

Identical top-level files (examples): 1300 SW 122 Ave #101-2 - Field inspection -T-USA.pdf (726,574); 13195 SW 10 Lane - Field inspection -T-USA.pdf (429,800); PP11Thumbs.ptn (908,154); Property Search Application - Miami-Dade County (19).pdf (586,429).

Same name, different size: none. Only in B: none.

Shared sub-folders with equal size (not opened): 10700 SW 68 ST - chad -2022; 1300 SW 122 AVE  101-2  - Michelle Basile; 14700 S. SPUR DRIVE - Michelle Basile; 16700 NW 52 ave - cou; 5700 SW 139TH COURT -Descarca; 9375 Fontainebleau Blvd Unit L-432 - Descarca.

## Section C. Method and limits

1. Listings via read_resource on folder ids. A id 01UJXG6QNNX3YCUI4EIZE2LUOEIZFMQGDG, B id 01UJXG6QOSTV6SCNCUFRHYXT6SVAV7HV4O. No pagination marker appeared.
2. Match rule: name + byte size. No hashes, no dates.
3. A in-folder "Kary Luis" listing printed names run together; names above were split by hand.
4. Unverified: contents of the 6 shared sub-folders. Treat the whole result as a floor.

Shall I open the 6 shared sub-folders next to confirm file by file?
