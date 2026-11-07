# PaperPort scan settings: what to select, and why · Brother MFC-L3770CDW
☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-15 · #PaperPort #Scanner #Feeder · written for Jorge to hear, not to read

**Bottom line: Gemini's list is sound. I added three settings Gemini left out. I have NOT yet checked your PC against it, because the cloud cannot see your PC. PC item 36 will check it.**

## Section A. Select these (Gemini's list)
1. **Scanner driver: TWAIN, named "TW-Brother MFC-L3770CDW".** Not WIA. Reason given: WIA can report a false paper jam from the feeder. That reason is plausible, but I could not prove it.
2. **Color mode: Grayscale (8-bit).** Not black-and-white. Black-and-white can break small text and lose white-on-dark headings.
3. **Resolution: 300 DPI.** Good balance of speed and text reading (OCR).
4. **Source: Document feeder, two-sided (Duplex ADF), with automatic page size on.** The Brother's own page says it scans both sides in one pass (see Section D).
5. **Brightness 50 percent, auto-enhance off.** Keeps pages looking like the paper.

## Section B. Three settings Gemini did not mention, from my 10-14 note
1. **"Single page items" must be OFF.** If it is on, a multi-page stack becomes separate one-page files. That is the "only page 1" symptom.
2. **"Multiple pages into one item" must be ON.**
3. **"Hide scanner native user interface":** try it ON first. If the Brother window pops up, switch it OFF. Test with a 3-page stack.
Also: with two-sided scanning on, one-sided sheets produce blank backs. Turn on blank-page skipping if PaperPort offers it. The exact wording is "check".

## Section C. Network check, if the scanner is on Wi-Fi or a cable to the router
1. Give the printer a fixed address, or a reserved address in the router (DHCP reservation). If its address changes mid-batch, the driver loses the scanner and Windows may call it a "paper jam".
2. This is the likely reason for "works one day, fails the next". It is a possibility, not a diagnosis.

## Section D. What was verified
1. The Brother MFC-L3770CDW has a 50-sheet feeder and single-pass two-sided scanning, per [Brother USA's product page](https://www.brother-usa.com/products/mfcl3770cdw). One retailer, [Office Depot](https://www.officedepot.com/a/products/6129456/Brother-MFC-L3770CDW-Wireless-Laser-All/), lists 35 sheets. Brother's page also marks this model discontinued.
2. Everything in Sections A to C about PaperPort's menus is from guides, not from your screen. Menu names may differ.

## Section E. What happens next
PC item 36 writes a report of what is actually set. I then compare it with Section A and B and list each mismatch. Nothing is changed on the PC without your yes.
