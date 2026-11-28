# PaperPort feeder shows only page 1: 5 steps for Jorge

**Short answer: it may only be the picture.** PaperPort often shows just page 1 as the thumbnail of a multi-page item. Start at Step 1.

**Section A. Try these in order. Stop when it works.**

1. **Check if the pages are already there.** Double-click the scan to open it. Look for a page count. Then look for a Page Thumbnails view (button name: check). If you see all pages, nothing is broken.
2. **Set the scanner source to the feeder.** In the Scan pane, pick your scan profile and click **Settings**, then the **Scan** tab (Windows Report guide). Set Source to **ADF**, or **Duplex ADF** if your scanner does two-sided. Scan 3 pages to test.
3. **Turn off single-page output.** In the same Settings window, find the option for single page items (Tungsten help mentions it; exact wording: check). It should be off. Any option for scanning multiple pages into one item should be on (wording: check). Test again.
4. **Try the scanner's own window.** In the scan profile's advanced setup, look for **Hide scanner native user interface** (Windows Report). Switch it on or off, then test. In the scanner's own window, pick the feeder and scan all pages (wording: check).
5. **Update the scanner driver.** Go to the scanner maker's website, find your model, download the **TWAIN** driver, and install it. Then test again. This one is the most likely fix if steps 2 to 4 did nothing.

**Section B. Safe to try.** None of these steps deletes or moves your scans.

If it is still stuck, say so and I will send the desktop Claude the full order: MSG-CLOUD-TO-CODE_PAPERPORT-MULTIPAGE-FIX_2026-10-14.md.

Did Step 1 show all your pages?
