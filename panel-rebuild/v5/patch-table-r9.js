// patch-table-r9.js - fix round 9. EVERY patch build-v5.js applies to the real v3 launcher is named here, with its kind and its reason. build-v5.js stops if a patch is not in this table or a name here is never used;
// gen-text-diff-r9.js writes this table into PORT-REPORT.md (Section F) next to the generated list of changed lines; test-claims-r9.js checks both. TRK-2026-9910-B
// kind TEXT   = changes a line of v3 text a person can read (the generated line list shows the line before and after)
// kind ADD    = adds a slot, a tab, a picker row, a section or a script that v3 did not have
// kind LINK   = changes where a link or a tab goes (the visible words may not change)
// kind CODE   = changes how the page behaves or looks; no v3 line of text changes
const P = {
  'title': ['TEXT', 'the page title says v5 and carries the TRK number'],
  'css': ['CODE', 'adds the v5 style rules (vtes5.css)'],
  'scripts': ['ADD', 'loads the config file, the seven data files, vtes5-live.js and vtes5-ui.js, and holds the build time'],
  'tabhint': ['ADD', 'adds the line under the tab bar that says when some tabs are off the edge'],
  'top': ['ADD', 'adds the slot for the Read me, Live status and the WHOLE PAGE line'],
  'leadlead': ['TEXT', 'the repairs lead says TYPED LOG: nothing in the table is checked by the page'],
  'botslead': ['TEXT', 'the bots lead says the lines are read from data files and the desktop executor checks the tasks'],
  'repairslive': ['ADD', 'adds the slot for the live repair rows under the typed table'],
  'sect7': ['TEXT', 'the footer stamp says v5 and the real build time, and a Miami-Dade section sits above it'],
  'tabs-status': ['LINK', 'the STATUS tab goes to #livestatus (the new Live status heading), not to #status'],
  'tabs-add': ['ADD', 'adds a MIAMI-DADE tab at the end of the page tabs'],
  'tabs-render': ['TEXT', 'each old-panel tab says OLD PANEL, snapshot of 2026-09-02, not live'],
  'panel-btn': ['TEXT', 'the PANEL button says OLD, snapshot, not live'],
  'index-btn': ['TEXT', 'the INDEX button says OLD, snapshot, not live'],
  'url-llm02': ['TEXT', 'LLM-02 opens the sessions list, because the typed session address may be an old session'],
  't-llm01': ['TEXT', 'a typed schedule (every 2 minutes) is removed: nothing proves it'],
  't-chief': ['TEXT', 'a typed schedule (every 2 minutes) is removed'],
  't-localexec': ['TEXT', 'a typed schedule (every 5 minutes) is removed'],
  't-orch': ['TEXT', 'a typed schedule (every 15 minutes) is removed'],
  't-prop': ['TEXT', 'a typed schedule (hourly) is removed'],
  't-poller': ['TEXT', 'a typed schedule (15-minute) is removed'],
  't-queued': ['TEXT', 'a typed schedule (15 minutes) is removed'],
  't-rambo': ['TEXT', 'a typed quota forecast is moved into a dated typed note'],
  't-codex': ['TEXT', 'a typed claim (Proven 2026-10-01) is moved into a dated typed note'],
  'd9': ['TEXT', 'the packet box label said editable but the box is read only'],
  'stamp': ['TEXT', 'packet time stamps now carry the Eastern time zone'],
  'win-grok': ['ADD', 'adds a GROK row to the window list, so the picker and the packet can name it'],
  'guard': ['CODE', 'the note passes through the digit checker before it is put into a packet'],
  'render': ['CODE', 'the live cards replace the static cards (same data, same order)'],
  'search': ['CODE', 'the search matches only the text v3 matched, never the live state lines'],
  'rambo-slot': ['ADD', 'adds the slot for the big RAMBO button under the page title'],
  'url-llm06': ['TEXT', 'the Codex CLI card no longer opens chatgpt.com, because Codex runs on the PC'],
  'airdrop': ['TEXT', 'AirDrop does not exist on a Windows PC'],
  'how-local': ['TEXT', 'the old LOCAL instruction saved client data in a Google Drive folder, which uploads it'],
  'local-j': ['TEXT', 'the LOCAL description claimed it never leaves the PC, which is true only for a confirmed local-only folder'],
  'local-a': ['TEXT', 'the LOCAL address told you to drop files in a Google Drive folder'],
  'local-pick': ['TEXT', 'the picker line claimed personal data never leaves the machine'],
  'how-codex': ['TEXT', 'a typed command is removed: the desktop executor runs Codex'],
  'how-rambo': ['TEXT', 'the RAMBO how-to line is written as click steps'],
  'how-llm06': ['TEXT', 'a typed command is removed from the LLM-06 line'],
  'row10': ['TEXT', 'repair row 10 labels its typed schedule as a typed note with no time zone'],
  'gate-line': ['TEXT', 'the line under the note box carries the three guard sentences, and the tick box is added under it'],
  'refresh-gate': ['CODE', 'the packet box shows the reason instead of a packet while the tick is missing'],
  'show-gate': ['CODE', 'Just show the packet is refused until the tick is made (not needed for LOCAL)'],
  'go-gate': ['CODE', 'Copy packet and open is refused until the tick is made (not needed for LOCAL)'],
  'queued-head': ['TEXT', 'the queued heading no longer says one click each'],
  'queued-lead': ['TEXT', 'the queued lead no longer says the page sends a ready packet, and drops a sentence about an older page'],
  'queued-status': ['TEXT', 'the status line after a queued button is worked out from the real state of the Copy packet and open button (run-time line)'],
  'gemini': ['TEXT', 'the file name GEMINI.md is removed from the Gemini line'],
  'footer-rambo': ['TEXT', 'registry file names move into a For RAMBO line'],
  'init': ['CODE', 'a start-up script of its own draws the top block and sets the timers']
};
// not a patch that rep() makes, but a change to every style block: pixel font sizes become rem, so the browser text-size setting works
const TRANSFORMS = [['rem', 'CODE', 'every pixel font size in the style blocks becomes rem (16 px = 1 rem), so the browser text-size setting works']];
module.exports = { P, TRANSFORMS };
