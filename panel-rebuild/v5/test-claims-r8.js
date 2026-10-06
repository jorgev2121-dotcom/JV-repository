// test-claims-r8.js - fix round 8, CLASS "words that claim more than the page or the script does", Tier 3 (ENFORCE). TRK-2026-9910-B
// Charter Rule 4: a recurring class gets an enforcement, not a patch. This test EXTRACTS every checkable factual sentence from
//   the Read me on the page, the queued-item headings and status lines, the card sentences, VERIFY-v5.ps1 (header comments and printed messages), INSTALL-BY-HAND.md, DATA-CONTRACT.md and KNOWN-LIMITS.md,
// maps each one to a test that proves it on REAL BEHAVIOUR (exit codes, whether a button is enabled, which words VERIFY prints, ASCII, whether a git command writes anything),
// and FAILS when (a) a checkable sentence has no test, (b) a test fails, or (c) a test no longer matches any sentence (a stale test would hide a missing one).
// A claim marked "retired" is a sentence that was once false and was removed: it may stay in the list so that it cannot come back (if the sentence returns, its test must pass).
// Usage: PWSH_DIR=<dir with pwsh> node test-claims-r8.js <out.json> [--no-docs]     (env V5DIR = the tree to test, default this folder; the tree holds package/, VERIFY-v5.ps1 and the documents)
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.resolve(process.env.V5DIR || __dirname);
process.env.PKG = process.env.PKG || path.join(ROOT, 'package');
const L = require('./test-v5-lib.js'); const { stage, open, fresh, NOWMS, at } = L;
const OUT = process.argv[2] || 'test-claims-r8-RESULT.json'; const COVER_DOCS = !process.argv.includes('--no-docs');
const PWD_DIR = process.env.PWSH_DIR; const PW = PWD_DIR ? path.join(PWD_DIR, 'pwsh') : null; const VER = path.join(ROOT, 'VERIFY-v5.ps1');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8home-'));
const ENV = Object.assign({}, process.env, { HOME, USERPROFILE: HOME, DOTNET_CLI_HOME: HOME, POWERSHELL_TELEMETRY_OPTOUT: '1', POWERSHELL_UPDATECHECK: 'Off', DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' });
/* ---------- sentence extraction ---------- */
function split(t) { return t.replace(/\r/g, '').split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9("'`<*])/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length > 8); }
const plain = s => s.replace(/[`*]/g, '');
function mdSentences(f) { const out = []; rd(f).split('\n').forEach((line, i) => { if (/^\s*(#|```|<!--|\|?\s*-{3})/.test(line)) { return; } split(line.replace(/^\s*(?:[-*]|\d+\.|[a-z]\))\s+/, '')).forEach(s => out.push({ raw: s, s: plain(s), where: f + ':' + (i + 1) })); }); return out; }
function verifySentences() {
  const out = [], lines = rd('VERIFY-v5.ps1').split('\n'); let inHead = true;
  lines.forEach((line, i) => {
    if (inHead && /^param\(/.test(line)) { inHead = false; }
    if (inHead && /^#/.test(line)) { split(line.replace(/^#\s*/, '')).forEach(s => out.push({ raw: s, s: plain(s), where: 'VERIFY-v5.ps1:' + (i + 1) + ' (header)' })); }
    else if (/Write-Host|\.Add\(|Stop-Early|return \(/.test(line)) { (line.match(/'(?:[^']|'')*'/g) || []).forEach(q => { const s = q.slice(1, -1).replace(/''/g, "'"); if (s.length > 25 && /[a-z]{3} [a-z]{3}/.test(s)) { split(s).forEach(x => out.push({ raw: x, s: x, where: 'VERIFY-v5.ps1:' + (i + 1) + ' (message)' })); } }); }
  });
  return out;
}
/* a sentence is CHECKABLE (it states a fact that behaviour can prove or disprove) when it holds one of these signals. Instructions to the executor ("Open the parent folder") hold none. */
const TRIGGER = /exit(?:s|ed)?(?: with)?(?: code)?s? \d|exit codes?|identical|ASCII|UTF-?16|UTF-?8|\bOK\b|PROBLEMS|CANNOT CHECK|writes? nothing|no write|only reads|read[- ]only|not followed|only updates|still here|no longer|one click|\bready\b|switched off|catch(?:es)?\b|can still miss|\d[\d,]* of \d[\d,]*|\d+ (?:scenarios|files|tests|lines|tabs|cards|bots|checks)|changes? no\b|BAD DATA FILE|EDITED|overwrit|Pure ASCII|never leaves/i;
/* ---------- the claim registry ---------- */
const CLAIMS = []; const claim = (id, src, re, test, o) => CLAIMS.push(Object.assign({ id, src, re, test }, o || {}));
const SRC = {}; /* name -> [{s, raw, where}] */
const cache = {};
const memo = (k, fn) => (k in cache ? cache[k] : (cache[k] = fn()));
/* ---------- behaviour helpers ---------- */
const sh = (cmd, args, o) => { const r = cp.spawnSync(cmd, args, Object.assign({ encoding: 'utf8', env: ENV, timeout: 120000, maxBuffer: 1 << 26 }, o || {})); return { code: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
const needPw = () => { if (!PW || !fs.existsSync(PW)) { throw new Error('PWSH_DIR is not set or has no pwsh: the VERIFY claims cannot be proved'); } };
function copyDir(a, b) { fs.mkdirSync(b, { recursive: true }); for (const n of fs.readdirSync(a)) { const x = path.join(a, n), y = path.join(b, n); if (fs.statSync(x).isDirectory()) { copyDir(x, y); } else { fs.copyFileSync(x, y); } } }
function fixture() { const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8fx-')); fs.mkdirSync(path.join(base, 'Docs')); const N = path.join(base, 'Docs', 'v5'); copyDir(process.env.PKG, N); return { base, N }; }
function verify(N, args, o) { needPw(); return sh(PW, ['-NoProfile', '-File', VER, '-Path', N].concat(args || []), o); }
function verifyRaw(args, o) { needPw(); return sh(PW, ['-NoProfile', '-File', VER].concat(args), o); }
const sha = f => require('crypto').createHash('sha256').update(fs.readFileSync(f)).digest('hex');
function tree(dir) { const o = []; (function w(d) { for (const n of fs.readdirSync(d).sort()) { const f = path.join(d, n), s = fs.lstatSync(f); if (s.isDirectory()) { o.push('D ' + f); w(f); } else if (s.isSymbolicLink()) { o.push('L ' + f + ' ' + fs.readlinkSync(f)); } else if (s.isFile()) { o.push('F ' + f + ' ' + sha(f)); } else { o.push('O ' + f); } } })(dir); return o.join('\n'); }
const utf16 = s => Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(s, 'utf16le')]);
let browser = null; const getBrowser = async () => browser || (browser = await L.chromium.launch());
async function pageWith(files, o) { const d = stage(files, o); const r = await open(await getBrowser(), d, o); r.dir = d; return r; }
const EV = (p, fn, a) => p.evaluate(fn, a);
const spawnNode = (f, args) => sh('node', [path.join(__dirname, f)].concat(args || []), { cwd: __dirname });
const stateText = () => memo('state', () => { const out = path.join(os.tmpdir(), 'cl8-state-' + process.pid + '.json'); const r = spawnNode('test-state-text-r8.js', [out]); try { return Object.assign(JSON.parse(fs.readFileSync(out, 'utf8')), { log: r.out }); } catch (e) { return { error: 'state-text test did not finish: ' + r.out.slice(-300), groups: {} }; } });
const grp = (g, name) => { const s = stateText(), x = s.groups && s.groups[name]; return x ? [x.ok === x.n, name + ': ' + x.ok + ' of ' + x.n + (x.ok === x.n ? '' : ' - see test-state-text-r8 for the failing rows')] : [false, name + ' did not run (' + (s.error || 'no group') + ')']; };
/* ---------- the text-change list (flaw 3) ---------- */
const TEXT_PATCHES = ['title', 'leadlead', 'botslead', 'sect7', 'tabs-render', 'panel-btn', 'index-btn', 'url-llm02', 'url-llm06', 't-llm01', 't-chief', 't-localexec', 't-orch', 't-prop', 't-poller', 't-queued', 't-rambo', 't-codex', 'd9', 'stamp', 'airdrop', 'how-local', 'local-j', 'local-a', 'local-pick', 'how-codex', 'how-rambo', 'how-llm06', 'row10', 'gate-line', 'gemini', 'footer-rambo', 'queued-head', 'queued-lead'];
const builtPatches = () => (rd('build-v5.js').match(/\brep(?:All)?\('([a-z0-9-]+)'/g) || []).map(x => x.replace(/^rep(?:All)?\('/, '').replace(/'$/, ''));

/* =====================================================================================================
   PAGE CLAIMS: the Read me, the queued items, the cards
   ===================================================================================================== */
const READ_RE = i => new RegExp(i, 'i');
const BASE = () => memo('basepage', () => null);
// ---- Read me 1 (flaw 3): "Everything from v3 is still here ..."
claim('R1', 'readme', /still here/i, async (s) => {
  const ev = []; const built = builtPatches(), missing = TEXT_PATCHES.filter(n => !built.includes(n)); const truthN = TEXT_PATCHES.length - missing.length;
  const m = /(\d+) (?:lines|places|pieces) of text/.exec(s), exceptOne = /except one/i.test(s);
  if (exceptOne) { return [false, 'the sentence says only one thing from v3 was changed, but ' + truthN + ' places of v3 text were changed, added to or removed by the build (' + built.filter(n => TEXT_PATCHES.includes(n)).slice(0, 8).join(', ') + ' ...)']; }
  if (!m) { return [false, 'the sentence names no number of changed lines and does not say "except one"; it must say how many (generated from the change list)']; }
  const N = +m[1]; ev.push('page says ' + N + ', build patches counted ' + truthN);
  if (N !== truthN) { return [false, ev.join('; ') + ' - the numbers differ']; }
  const rep = rd('PORT-REPORT.md'), blk = /<!-- CHANGE-LIST-BEGIN -->([\s\S]*?)<!-- CHANGE-LIST-END -->/.exec(rep);
  if (!blk) { return [false, 'PORT-REPORT.md has no CHANGE-LIST block']; }
  const lines = blk[1].split('\n').filter(l => /^\d+\. /.test(l)).length; ev.push('PORT-REPORT.md lists ' + lines);
  if (lines !== N) { return [false, ev.join('; ') + ' - the list has a different number of lines']; }
  const r = spawnNode('test-v3-survives.js', [path.join(os.tmpdir(), 'cl8-surv.json')]); const j = JSON.parse(fs.readFileSync(path.join(os.tmpdir(), 'cl8-surv.json'), 'utf8')); const fail = j.filter(x => x.status !== 'PASS').length;
  ev.push('v3 survival test: ' + (j.length - fail) + ' of ' + j.length + ' checks pass');
  return [fail === 0, ev.join('; ')];
}, { perItem: true });
claim('R2', 'readme', /NO DATA means nothing on the PC has reported/i, async () => {
  const bad = []; let n = 0; for (const files of [null, fresh(NOWMS)]) { const { ctx, p } = await pageWith(files); const r = await EV(p, () => [...document.querySelectorAll('.v5st,.v5b')].filter(e => /^NO DATA/.test(e.textContent.trim())).map(e => e.className)); n += r.length; r.forEach(c => { if (!/\bbad\b/.test(c)) { bad.push(c); } }); await ctx.close(); }
  return [n > 0 && bad.length === 0, n + ' NO DATA marks, ' + bad.length + ' not red'];
}, { perItem: true });
claim('R3', 'readme', /Green appears only when a fresh report file with proof/i, async () => {
  const { ctx, p } = await pageWith(null); const g = await EV(p, () => [...document.querySelectorAll('.v5st.ok,.v5b.ok')].length); await ctx.close();
  const f = fresh(NOWMS); f.heartbeat.at = at(300); f.bots.at = at(300); f.tokens.at = at(600); f.miamidade.at = at(60 * 24 * 9); const w = await pageWith(f);
  const strip = await EV(w.p, () => [...document.querySelectorAll('.v5b[data-src]')].filter(e => e.closest('#v5dash')).map(e => ({ n: e.getAttribute('data-src'), c: e.className }))); await w.ctx.close();
  const staleNames = ['heartbeat', 'bots', 'tokens', 'miamidade'], wrong = strip.filter(x => staleNames.includes(x.n) && /\bok\b/.test(x.c)).map(x => x.n);
  const w2 = await pageWith(fresh(NOWMS)); const g3 = await EV(w2.p, () => [...document.querySelectorAll('.v5st.ok')].length); await w2.ctx.close();
  return [g === 0 && strip.length === 7 && wrong.length === 0 && g3 > 0, 'no data: ' + g + ' green marks; stale world: ' + wrong.length + ' of 4 stale reports shown green (' + strip.length + ' strip entries read); fresh world: ' + g3 + ' green cards'];
}, { perItem: true });
claim('R3b', 'readme', /Grey NOT PROVEN means only the simple status writer/i, async () => {
  const f = fresh(NOWMS); delete f.heartbeat.executors['LLM-01']; const w = await pageWith(f, { status: { 'LLM-01': { st: 'up', seen: at(1) } } }); await L.tick(w.p);
  const r = await EV(w.p, () => { const e = document.querySelector('.v5st[data-state="LLM-01"]'); return e ? { c: e.className, t: e.textContent } : null; }); await w.ctx.close();
  return [!!r && /\bunp\b/.test(r.c) && /NOT PROVEN/.test(r.t) && /checks nothing/i.test(r.t), r ? r.c + ' | ' + r.t.slice(0, 140) : 'no card'];
}, { perItem: true });
claim('R4', 'readme', /press the big blue RAMBO button directly under the page title/i, async (s) => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => { const h = document.querySelector('h1'), b = document.getElementById('v5rambobtn'); return { next: h && h.nextElementSibling && h.nextElementSibling.id, inside: !!(b && h.nextElementSibling && h.nextElementSibling.contains(b)), disabled: b && b.disabled, cls: b && b.className }; }); await ctx.close();
  const tickWord = /tick/i.test(s); const st = grp(null, 'S7 press X names an enabled button');
  return [r.next === 'v5rambo' && r.inside && !r.disabled && st[0], 'button under the title: ' + JSON.stringify(r) + '; ' + st[1] + (tickWord ? '' : ' (the sentence does not mention the tick, so it is true only while the note is empty)')];
}, { perItem: true });
claim('R5', 'readme', /A web page cannot open a desktop app/i, async () => {
  const a = grp(null, 'S1 one click needs a link'), b = grp(null, 'S3 never both'), c = grp(null, 'S2 no Open button needs no link');
  return [a[0] && b[0] && c[0], [a[1], b[1], c[1]].join('; ')];
}, { perItem: true });
claim('R6', 'readme', /Tabs marked OLD PANEL go to a snapshot/i, async () => {
  const { ctx, p } = await pageWith(null); const r = await EV(p, () => [...document.querySelectorAll('#tabs a.panel')].map(a => ({ h: a.getAttribute('href'), t: a.textContent }))); await ctx.close();
  const ok = r.length === 10 && r.every(x => /VTES-CONTROL-PANEL\.html#/.test(x.h) && /OLD PANEL/.test(x.t)); return [ok, r.length + ' old-panel tabs, each labelled OLD PANEL and pointing at the snapshot file'];
}, { perItem: true });
const tickBehaviour = () => memo('tick', () => (async () => { const { ctx, p } = await pageWith(fresh(NOWMS)); const rs = await EV(p, async () => {
  const $ = i => document.getElementById(i), out = {}; window.open = () => null; const settle = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
  $('to').value = 'LLM-07'; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = 'Check the permit'; $('note').dispatchEvent(new Event('input')); await settle();
  out.offWhenUnticked = $('go').disabled && $('show').disabled; const c = $('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.onWhenTicked = !$('go').disabled && !$('show').disabled;
  $('note').value = 'Check the permit now'; $('note').dispatchEvent(new Event('input')); await settle(); out.resetOnNote = !c.checked && $('go').disabled; c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await settle();
  $('to').value = 'LLM-08'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.resetOnRoute = !c.checked && $('go').disabled;
  $('to').value = 'LOCAL'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.localNeedsNoTick = !$('go').disabled;
  return out; }); await ctx.close(); return rs; })());
claim('R7a', 'readme', /you must tick the box|Until it is ticked/i, async () => { const r = await tickBehaviour(); return [r.offWhenUnticked && r.onWhenTicked, 'buttons off when unticked: ' + r.offWhenUnticked + ', on when ticked: ' + r.onWhenTicked]; });
claim('R7b', 'readme', /tick clears itself/i, async () => { const r = await tickBehaviour(); return [r.resetOnNote && r.resetOnRoute, 'tick cleared on a note change: ' + r.resetOnNote + ', on a To change: ' + r.resetOnRoute]; });
claim('R7c', 'readme', /goes to LOCAL only/i, async () => { const r = await tickBehaviour(); return [r.localNeedsNoTick, 'LOCAL needs no tick (buttons enabled): ' + r.localNeedsNoTick + ' (that LOCAL needs a confirmed folder is a separate, live line on the LOCAL card)']; });
// ---- Read me, the guard (flaw 1)
const NOTES = () => require('./pii-notes-r8.js');
const guardCaught = async (samples) => { const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, s => s.map(x => [x, window.VTES5U.piiReasons(x).length > 0]), samples); await ctx.close(); return r; };
const CAP = [
  { re: /nine digits|9 digits|Social Security number/i, name: 'nine digits', sam: () => NOTES().PERSONAL.filter(t => /^[^a-z]*\d/i.test(t) || /ssn|social|s\.s\.n/i.test(t)).slice(0, 30) },
  { re: /card numbers?/i, name: 'card numbers', sam: () => ['4111 1111 1111 1111', '4111-1111-1111-1111', '4111111111111111', '378282246310005', '5555 5555 5555 4444', '6011000990139424', '4111, 1111, 1111, 1111'] },
  { re: /spelled out in words|written in words|in words/i, name: 'spelled-out words', sam: () => ['one two three four five six seven eight nine', 'one twenty three, forty five, sixty seven eighty nine', 'uno dos tres cuatro cinco seis siete ocho nueve', 'ssn 123 apples 45 pears 6789', 'ssn is 123 and then 45 and also 6789'] },
  { re: /commas/i, name: 'split with commas', sam: () => ['SSN 123, 45, 6789', 'his number is 123, 45, 6789', '4111, 1111, 1111, 1111'] },
  { re: /base64|hex/i, name: 'base64 or hex', sam: () => ['MTIzNDU2Nzg5', '313233343536373839', '31 32 33 34 35 36 37 38 39', '0x31 0x32 0x33 0x34 0x35 0x36 0x37 0x38 0x39', 'ssn hex 3132333435363738393031 ok'] },
  { re: /date of birth/i, name: 'date of birth', sam: () => ['born March 3, 1949', 'DOB: January second nineteen seventy', 'date of birth: March third, nineteen eighty one', 'DOB 01 02 1970', 'born on the 2nd of January 1970'] },
  { re: /licen[cs]e/i, name: 'licence', sam: () => ['FL DL S530 4607 5123 0', 'FL license: S530 460 75 123 0', 'dl s530460751230', 'driver licence V123-456-78-901-0'] },
  { re: /passport/i, name: 'passport', sam: () => ['passport A12345678', 'passport a12345678', 'pasaporte c03005988'] },
  { re: /bank/i, name: 'bank', sam: () => ['bank account 1234567890', 'IBAN GB82 WEST 1234 5698 7654 32', 'acct no 0012345678 routing 021000021'] }
];
const MISS_KEYS = { 'other languages': /other languages|languages other than/i, 'other scripts': /other scripts|scripts/i, 'letters between the digits': /letters/i, 'more than four words between the digit groups': /four words|more than four/i, 'encodings split into pieces': /split|pieces/i };
const BASIC_KEYS = [[/names/i, 'names'], [/home addresses?|addresses/i, 'home addresses'], [/email/i, 'email addresses'], [/phone/i, 'phone numbers']];
claim('R8', 'readme', /DIGITS in your note/i, async (s) => {
  const ev = []; let ok = true; const cut = s.search(/cannot catch|can not catch|can still miss|does not catch|will miss|may miss/i); const pos = cut < 0 ? s : s.slice(0, cut), neg = cut < 0 ? '' : s.slice(cut);
  if (cut < 0) { ok = false; ev.push('the sentence has no "can still miss" part: it promises without a limit'); }
  for (const c of CAP) { if (c.re.test(pos)) { const r = await guardCaught(c.sam()); const miss = r.filter(x => !x[1]).map(x => x[0]); ev.push(c.name + ': ' + (r.length - miss.length) + ' of ' + r.length + ' samples caught'); if (miss.length) { ok = false; ev.push('  the sentence says it catches ' + c.name + ' but it MISSES: ' + miss.slice(0, 3).map(x => JSON.stringify(x)).join(', ')); } } }
  const mr = await guardCaught(NOTES().MISSES.map(m => m.t)); const missed = NOTES().MISSES.filter((m, i) => !mr[i][1]); const cats = [...new Set(missed.map(m => m.cat))];
  ev.push('spellings the guard still misses: ' + missed.length + ' of ' + mr.length + ' known samples, in ' + cats.length + ' categories');
  cats.forEach(cat => { if (!MISS_KEYS[cat].test(neg)) { ok = false; ev.push('  the sentence does not name the category "' + cat + '" that the guard misses'); } });
  BASIC_KEYS.forEach(([re, nm]) => { if (!re.test(neg)) { ok = false; ev.push('  the sentence does not say it cannot catch ' + nm); } });
  return [ok, ev.join('; ')];
}, { perItem: true });
claim('R8b', 'readme', /tick[^.]*(?:real|only|main) (?:protection|check|guard)|real protection|Only the tick box/i, async () => {
  const N = NOTES(), notes = N.PERSONAL.concat(N.MISSES.map(m => m.t), N.ORDINARY); const { ctx, p } = await pageWith(fresh(NOWMS));
  const r = await EV(p, async notes => { const $ = i => document.getElementById(i); let n = 0, off = 0; window.open = () => null; const st = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
    for (const to of ['LLM-01', 'LLM-03', 'LLM-07', 'RAMBO', 'COWORK']) { for (const note of notes) { $('to').value = to; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = note; $('note').dispatchEvent(new Event('input')); const c = $('v5ack'); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); await st(); n++; if ($('go').disabled && $('show').disabled && $('v5rambobtn').disabled) { off++; } } } return { n, off }; }, notes); await ctx.close();
  return [r.n === r.off, r.off + ' of ' + r.n + ' (note x route) cases had every copy and show button switched off while the box was not ticked'];
}, { optional: true, perItem: true });
claim('R9', 'readme', /WHOLE PAGE/i, async () => {
  const worlds = [null, fresh(NOWMS), (() => { const f = fresh(NOWMS); f.bots.bots['CU-Orchestrator'].state = 'Disabled'; return f; })(), (() => { const f = fresh(NOWMS); f.heartbeat.at = at(300); return f; })(), (() => { const f = fresh(NOWMS); f.tokens.programs = { name: 'x' }; return f; })(), (() => { const f = fresh(NOWMS); f.health.checks_passed = 20; return f; })()];
  let n = 0, bad = 0; for (const w of worlds) { const { ctx, p } = await pageWith(w); const r = await EV(p, () => { const rank = { ok: 0, na: 1, neu: 1, unp: 1, bad: 2, stk: 2 }, it = window.VTES5U.pageItems().map(i => rank[i.cls] || 0), o = document.getElementById('v5overall'), oc = (o.className.match(/\b(ok|na|neu|unp|bad|stk)\b/) || [, 'ok'])[1]; return { worst: Math.max.apply(null, it.concat([0])), over: rank[oc] }; }); n++; if (r.over < r.worst) { bad++; } await ctx.close(); }
  return [bad === 0, n + ' worlds, WHOLE PAGE never greener than the worst card: ' + (n - bad) + ' of ' + n];
}, { perItem: true });
claim('R10', 'readme', /typed note were typed by hand on the date shown/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => { const o = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const t = w.currentNode.textContent; if (/typed note/i.test(t) && !w.currentNode.parentElement.closest('#v5read,script,style')) { o.push(t.trim()); } } return o; }); await ctx.close();
  const bad = r.filter(t => !/\d{4}-\d{2}-\d{2}/.test(t)); return [r.length > 0 && bad.length === 0, r.length + ' typed notes, ' + bad.length + ' without a date' + (bad.length ? ': ' + bad[0].slice(0, 80) : '')];
}, { perItem: true });
claim('R11', 'readme', /Every time is Eastern time/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => ['2026-07-04T15:00:00-04:00', '2026-01-10T15:00:00-05:00', '2025-07-04T15:00:00-04:00', '2027-01-10T15:00:00-05:00'].map(i => window.VTES5.fmtIso(i))); await ctx.close();
  const ok = /EDT/.test(r[0]) && /EST/.test(r[1]) && !/2026/.test(r[0]) && /2025/.test(r[2]) && /2027/.test(r[3]); return [ok, r.join(' | ')];
}, { perItem: true });
// ---- queued items (flaw 2) and the cards (flaw 4)
claim('Q-head', 'queued', /one click each/i, async () => { const q = grp(null, 'Q1 queued status matches the button'); return [false, 'one click does not leave a usable packet on every item: the item needs the tick first for every route except LOCAL (' + q[1] + ')']; });
claim('Q-lead', 'queued', /sends a ready packet/i, async () => { const { ctx, p } = await pageWith(fresh(NOWMS)); let req = 0; p.on('request', r => { if (!/^file:/.test(r.url())) { req++; } }); await EV(p, () => { window.open = () => null; document.querySelector('[data-q]').click(); }); await p.waitForTimeout(300); await ctx.close(); return [false, 'the page sent ' + req + ' requests when the queued button was pressed: it fills the packet box and never sends anything']; });
claim('Q-gray', 'queued', /grayed out as NOT READY/i, async () => [false, 'a statement about an older page (v2) that no test on this page can prove: the real v3 file holds the words NOT READY only in this one sentence'], { retired: true });
claim('Q-gate', 'queued', /need your call say so in the packet/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const q = await EV(p, () => window.QUEUED.map(x => ({ n: x.n, gate: x.gate, p: x.p }))); await ctx.close();
  const need = q.filter(x => /needs your|gated|approval/i.test(x.gate)), bad = need.filter(x => !/\bGO\b|approv|explicit yes/i.test(x.p)); return [need.length > 0 && bad.length === 0, need.length + ' queued items need your call; ' + bad.length + ' of them do not say so in the packet'];
});
claim('Q-fill', 'queued', /fills the packet box/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, async () => { window.open = () => null; const out = []; const n = document.querySelectorAll('[data-q]').length; for (let i = 0; i < n; i++) { document.querySelectorAll('[data-q]')[i].click(); out.push({ note: document.getElementById('note').value === window.QUEUED[i].p, to: document.getElementById('to').value }); } return out; }); await ctx.close();
  return [r.length === 6 && r.every(x => x.note), r.filter(x => x.note).length + ' of ' + r.length + ' queued buttons put the item text into the note box'];
}, { optional: true });
claim('Q-status', 'queued-status', /Packet ready|Press Copy packet and open|Packet written|Tick the box/i, async () => { const a = grp(null, 'Q1 queued status matches the button'), b = grp(null, 'Q3 when the button is enabled the status says ready'); return [a[0] && b[0], a[1] + '; ' + b[1]]; });
claim('C-oneclick', 'card', /one click|no Open button/i, async () => { const a = grp(null, 'S1 one click needs a link'), b = grp(null, 'S2 no Open button needs no link'), c = grp(null, 'S3 never both'), d = grp(null, 'S4 phone card'); return [a[0] && b[0] && c[0] && d[0], [a[1], b[1], c[1], d[1]].join('; ')]; });
claim('C-press', 'card', /press (?:the )?(?:big )?(?:blue|copy packet)/i, async () => { const a = grp(null, 'S7 press X names an enabled button'), b = grp(null, 'S5 status says ready'); return [a[0], a[1]]; });

/* =====================================================================================================
   VERIFY AND DOCUMENT CLAIMS (flaws 5 to 11)
   ===================================================================================================== */
// flaw 5: the exit codes in the header
claim('V-exit', 'verify-header', /Exit codes?:/i, async (s0) => {
  const head = rd('VERIFY-v5.ps1').split('\n').filter(l => /^#/.test(l)).map(l => l.replace(/^#\s*/, '')).join(' '); const m = /Exit codes?:(.*?)(?:\. What it does|What it does|$)/i.exec(head); const txt = m ? m[1] : s0;
  const clauses = {}; (txt.match(/\b[0-3] = [^;]*?(?=(?:, | ; |; )[0-3] = |$)/g) || [txt]).forEach(c => { const n = /^([0-3]) =/.exec(c.trim()); if (n) { clauses[n[1]] = c; } });
  const fx = fixture(); const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8e-')); const conds = [
    ['a wrong switch', /wrong switch/i, () => verify(fx.N, ['-NoSuchSwitch']).code], ['no -Path at all', /missing path|no path|path is missing|missing -?path/i, () => verifyRaw([]).code],
    ['a path that is not a full path', /no full path|not a full path|relative path/i, () => verify('relative/dir', []).code], ['a folder that does not exist', /folder missing|folder does not exist|missing folder/i, () => verify(path.join(os.tmpdir(), 'cl8-nope-' + process.pid), []).code],
    ['a manifest that is missing', /manifest missing|missing manifest/i, () => verify(empty, []).code], ['a good package', /\b0 = OK\b|0 = ok/i, () => verify(fx.N, []).code], ['an edited file', /1 = at least one problem|at least one problem/i, () => { fs.appendFileSync(path.join(fx.N, 'vtes5-ui.js'), ' '); const c = verify(fx.N, []).code; return c; }]];
  const ev = []; let ok = true; const want = { 'a good package': '0', 'an edited file': '1' };
  for (const [name, re, run] of conds) { const n = Object.keys(clauses).find(k => re.test(clauses[k])); const real = run(); if (n === undefined) { ev.push(name + ': not mentioned (real exit ' + real + ')'); continue; } const good = String(real) === n; if (!good) { ok = false; } ev.push(name + ': header says exit ' + n + ', real exit ' + real + (good ? '' : ' <-- WRONG')); }
  return [ok && Object.keys(clauses).length > 0, ev.join('; ')];
}, { perItem: true });
// flaw 6: a link anywhere means no "N of N identical" count and no false "not followed"
claim('V-link', 'verify-msgs', /not followed/i, async () => {
  const ev = []; let ok = true; const run = (name, mk) => { const fx = fixture(); const arg = mk(fx); const r = verify(arg, []); const hasLink = /LINK/.test(r.out), count = /\d+ of \d+ package files are identical/.test(r.out); const bad = hasLink && count; if (bad) { ok = false; } ev.push(name + ': ' + (hasLink ? 'LINK reported' : 'no LINK line') + ', identical-count printed under PROBLEMS: ' + count + (bad ? ' <-- WRONG' : '')); };
  run('the folder itself is a link', fx => { const l = path.join(fx.base, 'Docs', 'v5link'); fs.symlinkSync(fx.N, l); return l; });
  run('the parent folder is a link', fx => { const l = path.join(fx.base, 'linkdocs'); fs.symlinkSync(path.join(fx.base, 'Docs'), l); return path.join(l, 'v5'); });
  run('a data file is a link', fx => { const f = path.join(fx.N, 'data', 'vtes5-bots.js'), t = f + '.real'; fs.renameSync(f, path.join(fx.base, 'real-bots.js')); fs.symlinkSync(path.join(fx.base, 'real-bots.js'), f); return fx.N; });
  return [ok, ev.join('; ')];
}, { perItem: true });
// flaw 7: the words INSTALL-BY-HAND.md quotes for a UTF-16 data file are the words VERIFY really prints
claim('V-utf16', 'install', /UTF-16/i, async (s, ent) => {
  const quotes = (ent.raw.match(/`[^`]+`/g) || []).map(q => q.slice(1, -1)).filter(q => /UTF-16|BAD DATA FILE|EDITED/.test(q)); if (!quotes.length) { return [true, 'no quoted VERIFY words in this sentence']; }
  const ev = []; let ok = true; const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-bots.js'); fs.writeFileSync(f, utf16(fs.readFileSync(f, 'utf8')));
  const day = verify(fx.N, []).out, aft = verify(fx.N, ['-AfterWriters']).out;
  quotes.forEach(q => { const after = /^BAD DATA FILE/.test(q) && /AfterWriters/.test(s); const out = after ? aft : day; const frags = q.split(/\s*\.\.\.\s*/).map(x => x.trim()).filter(x => x.length > 2); const miss = frags.filter(x => out.indexOf(x) < 0); if (miss.length) { ok = false; } ev.push('"' + q + '" (' + (after ? 'with -AfterWriters' : 'day one') + '): ' + (miss.length ? 'VERIFY does not print ' + miss.map(x => '"' + x + '"').join(', ') : 'printed word for word')); });
  return [ok, ev.join('; ')];
}, { perItem: true });
// flaw 8: no document may say VERIFY answers OK for a changed data file on day one
claim('V-okchanged', 'install', /says OK when only the eight|OK when only the .{0,40}(?:changed|data)/i, async () => {
  const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f, 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1};\n'); const r = verify(fx.N, []); return [/^OK/m.test(r.out) && r.code === 0, 'a changed, valid data file on day one gives exit ' + r.code + (/^PROBLEMS/m.test(r.out) ? ' and PROBLEMS' : '') + ', not OK'];
}, { retired: true });
// flaw 9: "Pure ASCII"
claim('V-ascii', 'contract', /Pure ASCII/i, async () => {
  const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f, Buffer.from('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1,"x":"café"};\n', 'utf8')); const r = verify(fx.N, ['-AfterWriters']);
  const fx2 = fixture(); const f2 = path.join(fx2.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f2, 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1,"x":"caf\\u00e9"};\n'); const r2 = verify(fx2.N, ['-AfterWriters']);
  return [r.code === 1 && /PROBLEMS/.test(r.out) && r2.code === 0, 'a UTF-8 accent under -AfterWriters: exit ' + r.code + ' (' + (/PROBLEMS/.test(r.out) ? 'PROBLEMS' : 'not refused') + '); the same text written as \\u00e9: exit ' + r2.code];
});
// flaw 10: what git fetch really writes
claim('G-fetch', 'install', /git fetch/i, async (s) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8git-')); const g = (cwd, ...a) => sh('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', '-c', 'protocol.file.allow=always'].concat(a), { cwd });
  g(base, 'init', '-q', '--bare', 'o.git'); g(base, 'clone', '-q', 'o.git', 'w'); const W = path.join(base, 'w'); fs.writeFileSync(path.join(W, 'a.txt'), '1\n'); g(W, 'add', '.'); g(W, 'commit', '-q', '-m', 'one'); g(W, 'branch', '-M', 'main'); g(W, 'push', '-q', 'origin', 'main');
  g(base, 'clone', '-q', 'o.git', 'c'); const C = path.join(base, 'c'); fs.writeFileSync(path.join(W, 'b.txt'), (Math.random() + '\n').repeat(50)); g(W, 'add', '.'); g(W, 'commit', '-q', '-m', 'two'); g(W, 'push', '-q', 'origin', 'main');
  const count = () => sh('bash', ['-c', 'find .git -type f | wc -l'], { cwd: C }).out.trim() * 1, head0 = g(C, 'rev-parse', 'HEAD').out, br0 = g(C, 'for-each-ref', 'refs/heads').out, wt0 = g(C, 'status', '--porcelain').out + sh('bash', ['-c', 'ls -la --time-style=+%s . | grep -v " \\.git$" | md5sum'], { cwd: C }).out, n0 = count(), trk0 = g(C, 'for-each-ref', 'refs/remotes').out;
  g(C, 'fetch', '-q', 'origin', 'main'); const n1 = count(), trk1 = g(C, 'for-each-ref', 'refs/remotes').out, same = g(C, 'rev-parse', 'HEAD').out === head0 && g(C, 'for-each-ref', 'refs/heads').out === br0 && (g(C, 'status', '--porcelain').out + sh('bash', ['-c', 'ls -la --time-style=+%s . | grep -v " \\.git$" | md5sum'], { cwd: C }).out) === wt0;
  const real = 'fetch wrote ' + (n1 - n0) + ' new files inside .git, moved the remote-tracking list: ' + (trk1 !== trk0) + ', changed a working file or a branch: ' + !same;
  if (/only (?:updates|changes|touches)|just (?:updates|changes)/i.test(s) && !/object|\.git/i.test(s)) { return [false, 'the sentence says fetch only updates the remote-branch list, but ' + real]; }
  const sayWrites = /object|\.git/i.test(s), sayNoWork = /no working file|no file in the working|does not change (?:any )?working/i.test(s) && /branch/i.test(s);
  return [n1 > n0 && same && sayWrites && sayNoWork, real + '; the sentence ' + (sayWrites ? 'says it writes inside .git' : 'does not say it writes inside .git') + ' and ' + (sayNoWork ? 'says no working file or branch changes' : 'does not say no working file or branch changes')];
});
// flaw 11: step 6d must not be able to overwrite
claim('I-6d', 'install', /Save VERIFY beside the new folder|VERIFY-v5\.ps1/i, async (s, ent) => {
  const all = rd('INSTALL-BY-HAND.md'); const at6 = all.search(/6d\./); if (at6 < 0) { return [true, 'no step 6d in this document']; } const step = all.slice(at6, all.indexOf('\n7. ', at6) > 0 ? all.indexOf('\n7. ', at6) : at6 + 3000);
  if (ent.where.indexOf(':') < 0 || !/6d\./.test(ent.raw) && !/Save VERIFY beside/.test(ent.raw)) { return [true, 'not the 6d sentence']; }
  const testFirst = step.search(/Test-Path|already (?:there|exists)|exists/i), save = step.search(/save|write/i); const never = /never overwrite|do not overwrite|never replace|do not replace/i.test(step), newName = /VERIFY-v5\.ps1\.new-/.test(step), blocked = /BLOCKED/.test(step);
  return [testFirst >= 0 && never && newName && blocked, 'step 6d: tests whether the file exists: ' + (testFirst >= 0) + ', says never overwrite: ' + never + ', names the .new- copy: ' + newName + ', says BLOCKED: ' + blocked];
}, { oncePerRun: true });

/* =====================================================================================================
   RUN
   ===================================================================================================== */
(async () => {
  const br = await getBrowser(); const rows = []; const add = (r) => { rows.push(r); console.log(r.status + ' ' + r.id + ' | ' + r.src + ' | ' + r.sentence.slice(0, 110) + ' | ' + String(r.evidence).slice(0, 330)); };
  // extract the sentences
  { const { ctx, p } = await pageWith(fresh(NOWMS)); SRC.readme = (await EV(p, () => [...document.querySelectorAll('#v5read li')].map(l => l.textContent))).flatMap((t, i) => split(t).map(s => ({ s, raw: s, item: t.replace(/\s+/g, ' ').trim(), where: 'Read me item ' + (i + 1) })));
    SRC.queued = (await EV(p, () => ['#queued', '#queued + p.lead'].map(q => (document.querySelector(q) || {}).textContent || ''))).flatMap(t => split(t).map(s => ({ s, raw: s, where: 'section 5' })));
    const qs = await EV(p, async () => { const out = []; window.open = () => null; for (const b of document.querySelectorAll('[data-q]')) { b.click(); out.push(document.getElementById('status').textContent); } return out; }); SRC['queued-status'] = qs.flatMap(t => split(t).map(s => ({ s, raw: s, where: 'status line after a queued click' })));
    SRC.card = (await EV(p, () => [...document.querySelectorAll('.card')].map(c => c.innerText))).flatMap(t => split(t).filter(s => /one click|no Open button|press (?:the )?(?:big )?(?:blue|copy packet)/i.test(s)).map(s => ({ s, raw: s, where: 'card text' }))); await ctx.close(); }
  SRC['verify-header'] = []; SRC['verify-msgs'] = []; verifySentences().forEach(x => SRC[/header/.test(x.where) ? 'verify-header' : 'verify-msgs'].push(x));
  SRC.install = mdSentences('INSTALL-BY-HAND.md'); SRC.contract = mdSentences('DATA-CONTRACT.md'); SRC.limits = mdSentences('KNOWN-LIMITS.md');
  const covered = new Set(); let uncovered = 0;
  for (const c of CLAIMS) {
    let ents = (SRC[c.src] || []).filter(e => c.re.test(c.perItem ? (e.item || e.s) : e.s)); ents.forEach(e => covered.add(c.src + '|' + e.where + '|' + e.s));
    const seen = new Set(); ents = ents.filter(e => { const k = (c.perItem ? (e.item || e.s) : e.s); if (seen.has(k)) { return false; } seen.add(k); return true; });
    if (!ents.length) { const gone = c.retired || c.optional; add({ id: c.id, src: c.src, sentence: '(no sentence matches)', status: gone ? 'ABSENT-OK' : 'STALE', evidence: gone ? 'the sentence is not in the text (a retired or optional claim)' : 'this claim test matches no sentence any more: remove it or fix its pattern' }); if (!gone) { uncovered++; } continue; }
    let done = false;
    for (const e of ents) {
      if (c.oncePerRun && done) { continue; } done = true; let r; try { r = await c.test(c.perItem ? (e.item || e.s) : e.s, e); } catch (x) { r = [false, 'the test could not run: ' + String(x && x.message || x).slice(0, 200)]; }
      add({ id: c.id, src: c.src, where: e.where, sentence: c.perItem ? (e.item || e.s) : e.s, status: r[0] ? 'PASS' : 'FAIL', evidence: r[1] });
    }
  }
  // coverage: every checkable sentence must have a test
  const miss = [];
  const checkable = { readme: () => true, queued: () => true, 'queued-status': () => true, card: () => true };
  for (const src of Object.keys(SRC)) {
    const docSrc = ['verify-header', 'verify-msgs', 'install', 'contract', 'limits'].includes(src); if (docSrc && !COVER_DOCS) { continue; }
    SRC[src].forEach(e => { const must = checkable[src] ? checkable[src](e) : TRIGGER.test(e.s); if (must && !covered.has(src + '|' + e.where + '|' + e.s)) { miss.push({ src, where: e.where, s: e.s }); } });
  }
  miss.forEach(m => add({ id: 'UNTESTED', src: m.src, where: m.where, sentence: m.s, status: 'UNTESTED', evidence: 'a checkable sentence with no test (' + m.where + ')' }));
  const bad = rows.filter(r => ['FAIL', 'STALE', 'UNTESTED'].includes(r.status)); const sentencesChecked = rows.filter(r => r.status === 'PASS' || r.status === 'FAIL').length;
  const total = rows.filter(r => r.status !== 'ABSENT-OK').length, pass = rows.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-claims-r8', root: ROOT, docs_covered: COVER_DOCS, claims: CLAIMS.length, sentences_extracted: Object.fromEntries(Object.keys(SRC).map(k => [k, SRC[k].length])), pass, total, untested: miss.length, rows }, null, 1));
  console.log('\nCLAIMS R8: ' + pass + ' of ' + total + ' claim checks pass; ' + miss.length + ' checkable sentences have no test; ' + bad.filter(r => r.status === 'FAIL').length + ' claims are FALSE; ' + rows.filter(r => r.status === 'STALE').length + ' tests are stale. Sentences extracted: ' + JSON.stringify(Object.fromEntries(Object.keys(SRC).map(k => [k, SRC[k].length]))));
  await br.close(); process.exit(bad.length === 0 ? 0 : 1);
})();
