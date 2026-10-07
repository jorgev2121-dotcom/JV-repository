# CHECK-10 - sixth independent check of panel v5 (after fix round 8) - INTERIM DRAFT

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 6 · 2026-10-07. Configured model: claude-opus-5-5 (the serving model may differ).

**INTERIM. Not the verdict.** This draft holds my first measured results only. Parts C, D, E, F and most of B are still running. The FINAL report will replace this file.

Checked: branch `claude/panel-v5-port` at commit 0204fca, on my branch `claude/panel-v5-check6`. I did not build v5. I did not run or reuse the builder's tests. Scripts and fixtures are in my scratchpad, not committed.

## Section A - First results (my own scripts)

1. **CHECK-9 flaw 2 (queued line says ready while the button is off): FIXED.** 6 queued items, unticked, ticked, then typed into: 0 of 16 lines disagree with the real state of Copy packet and open.
2. **CHECK-9 flaw 4 (cards say "one click" and "no Open button" at once): FIXED.** World with shortcuts registered and every address filled: 0 of 9 cards say both; the iPhone card has no one-click link.
3. **CHECK-9 flaw 1 (Read me promises more than the guard): PARTIAL.** CHECK-9's 5 spot spellings are now all caught (5 of 5). But one new sentence still claims more than the guard does:
   - The Read me says the guard "misses digits written as words in other languages (it knows English and Spanish)".
   - Measured: "SSN novecientos ochenta y siete sesenta y cinco cuatro tres dos uno" is carried. So is "seguro social novecientos ...". Spanish hundreds (doscientos to novecientos) are not in the word list (package/vtes5-ui.js line 359 has only cien and ciento).
   - Spanish dates of birth are carried: "fecha de nacimiento: 3 de marzo de 1980" and "DOB enero 2 1970". The label is known; Spanish month names are not.
   - Class: mislead, second layer only (it matters only if the tick is ticked by mistake).
4. **CHECK-9 flaw 3 (the count of changed v3 lines): PARTIAL.** The Read me says "34 lines of text were changed". My count of v3's visible lines that do not appear unchanged in v5: 42. At least 8 of them (the "Address: vtes://llm-0N" lines on the cards) are changed by the page at run time and are not in the PORT-REPORT.md list. Class: mislead (low).
5. **Edge e20 (sentences at most 25 words): PARTIAL.** KNOWN-LIMITS item 65 says step lines are at most 25 words. Measured: at least 5 step lines are 27 to 33 words (vtes5-ui.js lines 34, 36, 65, 75, 81). Class: edge (style).

Still running: the type-fuzz and invariant (C), privacy through every route (D), VERIFY under PowerShell 7.4.6 (E) and the install steps (G), survival and window sizes (F), and the full claims extraction (B).

TRK-2026-9910-B - CHECK-10 - v1 - 2026-10-07 - INTERIM
