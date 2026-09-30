# TREE-COUNTS — the two-tree guard values
**ADHOC-FILING-CONSTITUTION · v1 · 2026-09-30 · #filing #guard · source: MIRROR-9073_FILING-INTEGRITY-FOUR-TREES_2026-08-19.md (desktop sweep, 2026-08-19)**

Any script that reads or writes either tree below must print both top-level folder counts first and ABORT if they differ from these numbers. **The numbers are a snapshot from 2026-08-19; the nightly inventory must refresh them before the guard is relied on.**

- `C:\Users\JV\Documents\CU Inspections\Jobs` — **6,479 folders**, 235,719 PDFs, 46.8 GB. The duplicate/conflict-copy tree (231,487 names carry `(2)`, `- Copy` or a UTC stamp). This is the reclaim target.
- `C:\Users\JV\OneDrive\Documents\CU Inspections\Jobs-Master` — **3,997 folders**, 4,149 PDFs, 14.6 GB. The clean originals. **Never a reclaim target.**

Use literal absolute paths. Never build either path from `$env:USERPROFILE` or a Known Folder, because redirection turns one into the other.

*ADHOC-FILING-CONSTITUTION · v1 · 2026-09-30 · CURRENT*
