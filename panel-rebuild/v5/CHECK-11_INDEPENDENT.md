# CHECK-11 - seventh independent check of panel v5 (after fix round 9) - INTERIM

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 7 · 2026-10-07. Configured model: claude-opus-5-5 (the serving model may differ).

**INTERIM. This is a partial result, pushed so that something is on the branch. It is not the verdict. The FINAL report will replace this file.**

Checked: commit 894e6ac of `claude/panel-v5-port`, on my branch `claude/panel-v5-check7`. I did not build v5. I did not run the builder's tests. Every number here comes from my own scripts, kept in my scratchpad.

## Section A - Where things stand

1. **No verdict yet.** Five helpers are running parts B to F with their own scripts.
2. **CHECK-10's 8 flaws, measured by me so far:** flaws 1, 2, 3, 5, 6 and 8 behave as fixed. Flaw 4 and flaw 7 wait for the helpers (the generated list and VERIFY under PowerShell).
   - Flaw 1 (card with expiry): 10 of 10 card notes held back, including the 3 from CHECK-10.
   - Flaw 2 (Spanish): 7 of 8 Spanish notes held back. The miss is "cumpleanos 5 de mayo 1982"; the page no longer claims to know Spanish, so it is edge.
   - Flaw 3 (labelled IDs): 12 of 12 held back. 12 of 12 ordinary notes carried, including the 4 CHECK-10 false alarms.
   - Flaw 5 (LOCAL steps): in 4 folder states, no LOCAL line hands client data to RAMBO or a Claude window.
   - Flaw 6 (Grok): green card shows no next-step sentence; 4 of 4 red states say "stays red".
   - Flaw 8 (WHOLE PAGE): with no red or grey card, it now says "1 of 7 reports grey".
3. **Edge items the builder says are fixed:** e8 (From change clears the tick, also with no event: 0 copies), e9 (25 of 25 bad labels refused, with and without proof; "C:\GDrive\VTES" with proof still passes, as disclosed), e10 (an unreadable file turns every card that uses it red) and e31 (0 of 34 step lines over 25 words) all behave as fixed.
4. **One candidate flaw so far, still to be confirmed with real PowerShell output:** VERIFY-v5.ps1 line 342 tells the reader to "Get the exact bytes again (INSTALL-BY-HAND.md, Section A, step 6)". Round 9 removed Section A, and step 6 is now "turn on file name extensions". The pointer goes nowhere.
5. **One edge so far:** the checker took 895 to 943 ms on a 20,000-character note here; KNOWN-LIMITS item 40 says about 400 ms.

Is the FINAL report wanted even if it runs past the second hour? (yes/no)

TRK-2026-9910-B - CHECK-11 - v1 - 2026-10-07 - INTERIM · #VTES-control-panel #panel-v5 #independent-check
