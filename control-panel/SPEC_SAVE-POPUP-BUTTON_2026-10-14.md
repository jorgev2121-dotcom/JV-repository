# Panel spec · "Save" button → pop-up collections (owner ask 2026-10-14 ~10:00 AM ET)
Owner words: "Add a button. To save. Documents, emails, or similar that are synonymous and/or hashtagged as pop-up. Use pop-up in different variation of hashtags so even if misspelled, will pop up. This should be a file that I can open view edit send or defer and or add a comment".

Build AFTER the search fix lands (same file).
1. A "⭐ Save" button on every search result, capsule, email row, document link, client card.
2. Save asks one thing: which collection (hashtag). Suggests existing ones; new name allowed. Stores the item in the panel's shared database (db capability, collection "saved"), never only in this window (APPROVAL-DURABILITY-01).
3. Fuzzy hashtags: each collection keeps its name + automatic variants (case, no #, no hyphens/spaces, common misspellings by edit distance ≤2, plus the people/misspelling lines from _HASHTAGS_v2). Searching "#plza", "plaza", "#PLAZA-PH11" all pop up the same collection.
4. Opening a collection = a pop-up "file" card list. Each item: Open (link) · View · Edit note · Send (Copy for email + mailto draft; nothing sent automatically) · Defer (date picker; hides until then) · Comment (thread on the item).
5. "Export collection" → one designed HTML/MD file (Orange Tree layout) Jorge can open, print or email himself.
6. Money lock respected; no amounts while locked. 375px, hover tips, button-group colours.
7. Test: tools/panel/test/save-popup-test.js — save 5 random items, search with 5 misspellings each, defer/comment round-trip survives reload.
