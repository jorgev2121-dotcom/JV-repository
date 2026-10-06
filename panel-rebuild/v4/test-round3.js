// test-round3.js - fix round 3: one test world per flaw F3, F4, F8 to F13, F16 from CHECK-4 Section D, plus the downgraded claims N4, N5, N12 and the v3-folder config. TRK-2026-9910-B
// Usage: node test-round3.js <out.json>      PKG=<folder of an older package> node test-round3.js <out.json>   (the BEFORE run, old round-2 files)
// Opens the page from file://, headless Chromium. The F1, F2, F5, F6, F7, F14, F15 flaws are PowerShell flaws: see test-install-rollback.sh.
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const HERE = __dirname, PKG = process.env.PKG || HERE, OUT = process.argv[2] || 'test-round3-RESULT.json';
const NOW = '2026-10-06T14:00:00-04:00', NOWMS = new Date(NOW).getTime();
const at = (m, base) => new Date((base === undefined ? NOWMS : base) - m * 60000).toISOString();
const wrap = (n, o) => 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + n + ' = ' + JSON.stringify(o) + ';';
const ALL = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
const CHATS = ['LLM-04', 'LLM-05', 'LLM-07', 'LLM-08', 'LLM-10'];
function fresh(base, o) {
  o = o || {}; const lastSeenAge = o.lastSeenAge === undefined ? 1 : o.lastSeenAge, hbAge = o.hbAge === undefined ? 1 : o.hbAge;
  const ex = {}; ALL.forEach(i => { ex[i] = { state: 'up', last_seen: at(lastSeenAge, base) }; }); CHATS.forEach(i => { ex[i].proof_at = at(2, base); });
  return {
    heartbeat: { schema: 1, at: at(hbAge, base), writer: 'fixture', interval_sec: o.interval === undefined ? 300 : o.interval, vtes_scheme_registered: true, addresses_filled: { 'LLM-01': true, 'LLM-03': true, 'LLM-09': true }, executors: ex },
    state: { schema: 1, at: at(30, base), open_items: 12, in_progress: 3, blocked: 2, repairs: [], money: [] },
    health: { schema: 1, at: at(30, base), ok: true, checks_passed: 9, checks_total: 12, report_sent_at: at(31, base) },
    tokens: { schema: 1, at: at(2, base), burn_per_hour: 41000, window_used_pct: 33, window_resets_at: at(-180, base), week_used_pct: 61, programs: [{ name: 'p', tokens_today: 1 }] },
    housekeeping: { schema: 1, at: at(60, base), last_report_at: at(60, base), report_delivered: true, delivered_to: 'jorge', items_cleaned: 17 },
    miamidade: { schema: 1, at: at(20, base), counted: 7, target: 300, sources: [{ id: '01', proof_ok: true }, { id: '03', proof_ok: true }] }
  };
}
const results = [];
const T = (world, name, ok, why) => { results.push({ world, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) console.log('FAIL', world, name, String(why).slice(0, 200)); };
const REMFILE = items => 'window.VTES_REMINDERS = ' + JSON.stringify(items) + ';';
function stage(files, opts) {
  opts = opts || {};
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'v4r3-'));
  for (const f of ['VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js']) fs.copyFileSync(path.join(PKG, f), path.join(d, f));
  fs.writeFileSync(path.join(d, 'vtes-status.js'), 'window.VTES_STATUS = window.VTES_STATUS || {};');
  fs.mkdirSync(path.join(d, 'data'));
  for (const f of fs.readdirSync(path.join(PKG, 'data'))) fs.copyFileSync(path.join(PKG, 'data', f), path.join(d, 'data', f));
  for (const f of ['vtes-reminders.js', 'vtes-common.js']) fs.copyFileSync(path.join(HERE, 'v3-source', f), path.join(d, f));
  for (const f of ['VTES-REMINDERS.html', 'VTES-PANEL.html']) fs.writeFileSync(path.join(d, f), '<html></html>');
  if (files) for (const k of Object.keys(files)) fs.writeFileSync(path.join(d, 'data', 'vtes4-' + k + '.js'), wrap(k, files[k]));
  if (opts.status) fs.writeFileSync(path.join(d, 'vtes-status.js'), 'window.VTES_STATUS = ' + JSON.stringify(opts.status) + ';');
  if (opts.reminders) fs.writeFileSync(path.join(d, 'vtes-reminders.js'), REMFILE(opts.reminders));
  return d;
}
async function open(br, dir, o) {
  o = o || {};
  const ctx = await br.newContext(); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(String(e.message).slice(0, 140)));
  await ctx.route(u => /^https?:/.test(u.toString()), r => (o.abortSites ? r.abort() : r.fulfill({ status: 200, contentType: 'text/html', body: 'ok' })));
  const init = ({ n, useFixed }) => { if (useFixed) { window.VTES4_NOW = n; window.VTES_NOW = Date.parse(n); } window.open = () => null; const w = () => Promise.resolve(); try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: w }, configurable: true }); } catch (e) { } };
  if (o.clock) { await p.clock.install({ time: new Date(NOW) }); }
  const nowIso = o.now || NOW;
  await p.addInitScript(init, { n: nowIso, useFixed: !o.clock && !o.real });
  await p.goto('file://' + dir + '/' + (o.page || 'VTES-LLM-LAUNCHER_v4.html')); await p.waitForTimeout(o.settle || 800);
  return { ctx, p, errs };
}
const wait = (p, ms) => p.waitForTimeout(ms || 400);
/* the same work the 60-second timer does, run once on demand (the timer itself is covered by the clock worlds) */
const tick = p => p.evaluate(() => new Promise(res => { VTES4.reload(() => { VTES4P.refresh(VTES4_BUILT); VTES4C.repaint(); VTES4C.paintBell(); VTES_MAP.refresh(); VTES4C.paintSites(VTES_MAP.probe); res(); }); }));
const chip = (p, id) => p.evaluate(i => { const c = document.querySelector('#chips .chip[data-id="' + i + '"]'); return { cls: [...c.classList].filter(x => /^st-/.test(x)).join(' '), hrs: (c.querySelector('.hrs') || {}).textContent, title: c.title }; }, id);
const cardState = (p, id) => p.evaluate(i => { const e = document.querySelector('.v4st[data-state="' + i + '"]'); return e ? { cls: e.className, txt: e.textContent } : null; }, id);
const stripOk = p => p.evaluate(() => { const o = {}; document.querySelectorAll('#v4dash .v4b').forEach(b => { o[b.getAttribute('data-src')] = { ok: b.classList.contains('ok'), t: b.textContent }; }); return o; });
const greenChips = p => p.evaluate(() => [...document.querySelectorAll('#chips .chip.st-up')].map(c => c.getAttribute('data-id')));
const greenCards = p => p.evaluate(() => [...document.querySelectorAll('.v4st.ok')].map(c => c.getAttribute('data-state')));
const mapBots = async p => { await p.click('#t_map'); await wait(p, 300); return p.evaluate(() => { const b = [...document.querySelectorAll('.mbox')].find(x => /BOTS/.test(x.querySelector('.mid').textContent)); return b ? { all: b.textContent, st: b.querySelector('.mst').textContent } : null; }); };
const sel = (p, css) => p.evaluate(c => { const el = document.querySelector(c); if (!el) { return -1; } const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return s.toString().length; }, css);
const selLen = p => p.evaluate(() => getSelection().toString().length);
(async () => {
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const htmlSrc = fs.readFileSync(path.join(PKG, 'VTES-LLM-LAUNCHER_v4.html'), 'utf8');
  const BUILT = (/window\.VTES4_BUILT = "([^"]+)"/.exec(htmlSrc) || [])[1];

  // ---- F3: build time from the real build instant, held to the BAD CLOCK rule
  { const W = 'F3', d = stage(fresh(Date.now()));
    { const { ctx, p, errs } = await open(br, d, { real: true }); const info = await p.evaluate(() => ({ built: VTES4_BUILT, now: Date.now(), age: document.getElementById('v4age').textContent, foot: (document.querySelector('.foot') || {}).textContent, bad: (VTES4.builtBad ? VTES4.builtBad(VTES4_BUILT) : null) }));
      T(W, 'no page errors', errs.length === 0, errs.join('|'));
      T(W, 'F3: the build instant is not in the future (real clock): ' + info.built, Date.parse(info.built) <= info.now, info.built + ' vs now ' + new Date(info.now).toISOString());
      T(W, 'F3: the top line does not say BAD CLOCK for a real build time', !/Built BAD CLOCK/.test(info.age), info.age.slice(0, 160));
      T(W, 'F3: the footer shows the same build time as the top line', info.age.indexOf('Built ' + info.foot.split('built ')[1].split(' ·')[0]) === 0 || /BAD CLOCK/.test(info.foot), (info.foot || '').slice(0, 120) + ' | ' + info.age.slice(0, 80));
      await ctx.close(); }
    { const { ctx, p } = await open(br, d, { now: new Date(Date.parse(BUILT) - 3600000).toISOString() }); const info = await p.evaluate(() => ({ age: document.getElementById('v4age').textContent, bad: document.getElementById('v4age').classList.contains('bad'), foot: document.querySelector('.foot').textContent }));
      T(W, 'F3: when the PC clock is an hour BEFORE the build time, the top line says BAD CLOCK and is red', /Built BAD CLOCK/.test(info.age) && info.bad, info.age.slice(0, 160));
      T(W, 'F3: ... and so does the footer', /BAD CLOCK/.test(info.foot), info.foot.slice(0, 120)); await ctx.close(); }
    if (PKG === HERE) {
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'v4build-')); fs.copyFileSync(path.join(HERE, 'build-v4.js'), path.join(tmp, 'build-v4.js')); fs.copyFileSync(path.join(HERE, 'vtes4.css'), path.join(tmp, 'vtes4.css')); fs.cpSync(path.join(HERE, 'v3-source'), path.join(tmp, 'v3-source'), { recursive: true });
      const before = Date.now(); const out = cp.execFileSync('node', [path.join(tmp, 'build-v4.js')], { env: Object.assign({}, process.env, { V4_BUILT: '2099-01-01T00:00:00Z' }) }).toString(); const after = Date.now();
      const built = (/VTES4_BUILT = "([^"]+)"/.exec(fs.readFileSync(path.join(tmp, 'VTES-LLM-LAUNCHER_v4.html'), 'utf8')) || [])[1], bt = Date.parse(built);
      T(W, 'F3: build-v4.js ignores a hand-set V4_BUILT=2099 and says so', !/2099/.test(built) && /V4_BUILT is ignored/.test(out), built + ' | ' + out.slice(0, 100));
      T(W, 'F3: the stamped build instant is the real instant of the build (within the 1 s rounding)', bt >= Math.floor(before / 1000) * 1000 - 1000 && bt <= after + 1000, built + ' vs ' + new Date(before).toISOString());
    }
  }
  // ---- F4: Grok Bots UP only with a proof field
  { const W = 'F4';
    let fx = fresh(NOWMS); fx.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1) };
    { const d = stage(fx); const { ctx, p } = await open(br, d); const box = await mapBots(p); const gc = await p.evaluate(() => document.querySelector('#card-LLM-07 [data-note]').textContent);
      T(W, 'F4: a BOTS report with NO proof_at: the Map box says NOT BUILT (not UP)', box && /NOT BUILT/.test(box.st) && !/\bUP\b/.test(box.st), box && box.st);
      T(W, 'F4: ... and the Grok card does not claim "reporting UP with proof"', !/reporting UP with proof/.test(gc), gc.slice(0, 100)); await ctx.close(); }
    fx = fresh(NOWMS); fx.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1), proof_at: at(2) };
    { const d = stage(fx); const { ctx, p } = await open(br, d); const box = await mapBots(p); const gc = await p.evaluate(() => document.querySelector('#card-LLM-07 [data-note]').textContent);
      T(W, 'F4: with proof_at the box says UP and the Grok card says reporting UP with proof', box && /UP/.test(box.st) && !/NOT BUILT/.test(box.st) && /reporting UP with proof/.test(gc), box && box.st); await ctx.close(); }
    fx = fresh(NOWMS); fx.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1), proof_at: at(60 * 24) };
    { const d = stage(fx); const { ctx, p } = await open(br, d); const box = await mapBots(p); T(W, 'F4: a proof_at a day old is not proof: NOT BUILT', box && /NOT BUILT/.test(box.st), box && box.st); await ctx.close(); }
    fx = fresh(NOWMS); fx.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1), proof_at: at(-600) };
    { const d = stage(fx); const { ctx, p } = await open(br, d); const box = await mapBots(p); T(W, 'F4: a proof_at in the future is not proof: NOT BUILT', box && /NOT BUILT/.test(box.st), box && box.st); await ctx.close(); }
    { const d = stage(null, { status: { BOTS: { st: 'up', seen: at(1) } } }); const { ctx, p } = await open(br, d); const box = await mapBots(p); T(W, 'F4 (also N4): the status-only writer saying BOTS up is not proof: NOT BUILT', box && /NOT BUILT/.test(box.st) && !/\bUP\b/.test(box.st), box && box.st); await ctx.close(); }
    const dc = fs.readFileSync(path.join(PKG, 'DATA-CONTRACT.md'), 'utf8');
    T(W, 'F4: DATA-CONTRACT defines the BOTS proof field (executors.BOTS.proof_at) and says what it proves', /executors\.BOTS\.proof_at/.test(dc) || /`BOTS`[^\n]*proof_at/.test(dc), 'contract text');
  }
  // ---- F8: the stale limit scales with interval_sec
  { const W = 'F8';
    for (const [iv, age, expectGreen, label] of [[1800, 20, true, 'a legitimate 30-minute tick, file and sightings 20 minutes old'], [1800, 100, false, '30-minute tick, 100 minutes old (> 3 ticks = 90)'], [3600, 170, true, '60-minute tick, 170 minutes old (< 180 cap)'], [3600, 190, false, '60-minute tick, 190 minutes old (> 3-hour cap)'], [60, 2, true, '1-minute tick, 2 minutes old'], [60, 4, false, '1-minute tick, 4 minutes old (> 3 minutes)'], [300, 14, true, '5-minute tick, 14 minutes old (15-minute limit as before)'], [300, 16, false, '5-minute tick, 16 minutes old']]) {
      const fx = fresh(NOWMS, { interval: iv, lastSeenAge: age, hbAge: age }); CHATS.forEach(i => { fx.heartbeat.executors[i].proof_at = at(age + 1); });
      const d = stage(fx); const { ctx, p, errs } = await open(br, d); const g = await greenChips(p), gc = await greenCards(p), st = await stripOk(p), cs = await cardState(p, 'LLM-01'); const tk = await p.evaluate(() => document.querySelector('.v4tick').textContent);
      T(W, 'F8: ' + label + ' -> RAMBO ' + (expectGreen ? 'green' : 'red STALE') + ' (chip, card and heartbeat badge agree)', expectGreen ? (g.includes('LLM-01') && gc.includes('LLM-01') && st.heartbeat.ok && !/STALE/.test(tk)) : (!g.includes('LLM-01') && !gc.includes('LLM-01') && !st.heartbeat.ok && /STALE/.test(cs.txt)), JSON.stringify([g.length, gc.length, st.heartbeat, cs && cs.txt, tk]));
      T(W, 'no page errors (' + iv + '/' + age + ')', errs.length === 0, errs.join('|')); await ctx.close();
    }
    const dc = fs.readFileSync(path.join(PKG, 'DATA-CONTRACT.md'), 'utf8');
    T(W, 'F8: DATA-CONTRACT rule 3 and the heartbeat limit say the same thing (3 x interval_sec, 3 minutes to 3 hours)', /3 x interval_sec/.test(dc) && !/LIMIT 15 minutes/.test(dc), 'contract text');
  }
  // ---- F9: no half-empty state during a reload; one shared timer
  // the checker's world F: the PC writer (vtes-status.js) is the only report for RAMBO (grey NOT PROVEN); the heartbeat file does not exist yet
  const noHb = base => { const f = fresh(base); delete f.heartbeat; return f; };
  { const W = 'F9', d = stage(noHb(NOWMS), { status: { 'LLM-01': { st: 'up', seen: at(1) } } }); const { ctx, p, errs } = await open(br, d);
    const r = await p.evaluate(() => new Promise(res => {
      const key = () => { const c = document.querySelector('#chips .chip[data-id="LLM-01"]'); return [...c.classList].filter(x => /^st-/.test(x)).join(' ') + '|' + document.querySelector('.v4st[data-state="LLM-01"]').textContent.slice(0, 20) + '|' + document.querySelector('#chips .chip[data-id="LLM-04"]').className.replace(/\s+/g, ' ') + '|' + VTES_MAP.effective('LLM-01').txt.slice(0, 12); };
      VTES_MAP.refresh(); const base = key(); const seen = new Set(); let n = 0, rounds = 0, mid = 0;
      (function round() {
        rounds++; let done = false; VTES4.reload(() => { done = true; });
        (function spin() { VTES_MAP.refresh(); const k = key(); seen.add(k); n++; if (!done) { mid++; setTimeout(spin, 0); } else if (rounds < 15) { setTimeout(round, 0); } else { res({ base, seen: [...seen], n, mid }); } })();
      })();
    }));
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'F9: during 15 reloads, ' + r.mid + ' repaints happened WHILE files were loading; every one showed the same, complete state (' + r.n + ' samples)', r.mid > 0 && r.seen.length === 1 && r.seen[0] === r.base, JSON.stringify(r.seen.slice(0, 3)) + ' mid=' + r.mid);
    await ctx.close(); }
  { const W = 'F9-timer'; const d = stage(noHb(NOWMS), { status: { 'LLM-01': { st: 'up', seen: at(1) } } }); const { ctx, p, errs } = await open(br, d, { clock: true, abortSites: true });
    await p.evaluate(() => { window.__flips = []; const c = document.querySelector('#chips .chip[data-id="LLM-01"]'); const t = () => window.__flips.push([...c.classList].filter(x => /^st-/.test(x)).join(' ') + ' ' + (c.querySelector('.hrs') || {}).textContent); new MutationObserver(t).observe(c, { attributes: true, childList: true, subtree: true, characterData: true }); });
    for (let i = 0; i < 10; i++) { await p.clock.runFor(60000); await wait(p, 350); const fx = noHb(NOWMS + (i + 1) * 60000); for (const k of Object.keys(fx)) { const f = path.join(d, 'data', 'vtes4-' + k + '.js'); fs.writeFileSync(f + '.tmp', wrap(k, fx[k])); fs.renameSync(f + '.tmp', f); } fs.writeFileSync(path.join(d, 'vtes-status.js'), 'window.VTES_STATUS = ' + JSON.stringify({ 'LLM-01': { st: 'up', seen: at(1, NOWMS + (i + 1) * 60000) } }) + ';'); }
    const flips = await p.evaluate(() => window.__flips); const bad = flips.filter(x => !/st-unk NOT PROVEN|st-unk \? NOT PROVEN/.test(x));
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'F9: over 10 ticks (5 of them probe ticks, sites unreachable) the RAMBO chip (grey NOT PROVEN, status writer only) never flipped to NO DATA: ' + flips.length + ' changes seen, ' + bad.length + ' not green', bad.length === 0, JSON.stringify(bad.slice(0, 4)));
    const nTimers = (htmlSrc.match(/setInterval\(/g) || []).length;
    T(W, 'F9: reload and probes share one timer (the page has one 60-second setInterval and no separate probe interval)', /v4tickN % 2 === 0\) \{ runProbes\(\)/.test(htmlSrc) && !/setInterval\(runProbes/.test(htmlSrc), 'setInterval count ' + nTimers);
    await ctx.close(); }
  // ---- F10: due today; the date forms the reminders file really uses; unreadable dates flagged
  { const W = 'F10', REM = (id, due, done) => ({ id, kind: 'money', title: 't' + id, due, detail: '', src: '', done: !!done });
    // the real reminders file (R-01 due 2026-10-11) on 2026-10-11 at noon
    { const d = stage(fresh(Date.parse('2026-10-11T12:00:00-04:00')), {}); const { ctx, p } = await open(br, d, { now: '2026-10-11T12:00:00-04:00' }); const b = await p.evaluate(() => { const a = document.getElementById('t_rem'); return { bg: a.style.background, title: a.title, n: document.getElementById('remn').textContent }; });
      T(W, 'F10: the real reminders on 2026-10-11 (R-01 is due that day): the bell is RED and counts it due today', /179, 38, 30|b3261e/.test(b.bg) && / [1-9]\d* due today or overdue/.test(b.title), JSON.stringify(b)); await ctx.close(); }
    const mk = async (items, now) => { const d = stage(fresh(NOWMS), { reminders: items }); const { ctx, p } = await open(br, d, { now: now || NOW }); const b = await p.evaluate(() => { const a = document.getElementById('t_rem'); return { bg: a.style.background, title: a.title, n: document.getElementById('remn').textContent }; }); await ctx.close(); return b; };
    const red = b => /b3261e|179, 38, 30/.test(b.bg), blue = b => /1b5e9e|27, 94, 158/.test(b.bg), grey = b => /6b6b66|107, 107, 102/.test(b.bg);
    let b = await mk([REM('A', '2026-10-06')]); T(W, 'F10: due today (2026-10-06, clock 2 PM ET) is DUE: red', red(b), JSON.stringify(b));
    b = await mk([REM('A', '2026-10-07')]); T(W, 'F10: due tomorrow is not due: blue', blue(b) && /1 open, 0 due/.test(b.title), JSON.stringify(b));
    b = await mk([REM('A', '2026-10-05')]); T(W, 'F10: due yesterday is overdue: red', red(b), JSON.stringify(b));
    b = await mk([REM('A', '10/01/2026')]); T(W, 'F10: the form 10/01/2026 (M/D/YYYY) is read, in the past: red, not flagged unreadable', red(b) && !/not readable/.test(b.title), JSON.stringify(b));
    b = await mk([REM('A', '10/09/2026')]); T(W, 'F10: the form 10/09/2026 in the future: blue', blue(b), JSON.stringify(b));
    b = await mk([REM('A', 'Oct 6, 2026')]); T(W, 'F10: the form "Oct 6, 2026" is read: due today, red', red(b) && !/not readable/.test(b.title), JSON.stringify(b));
    b = await mk([REM('A', 'October 20, 2026')]); T(W, 'F10: the form "October 20, 2026" is read: not due, blue', blue(b), JSON.stringify(b));
    b = await mk([REM('A', '2026-10-06T09:00:00-04:00')]); T(W, 'F10: an ISO date with a time is read by its day: due today, red', red(b), JSON.stringify(b));
    b = await mk([REM('BAD-1', 'next week')]); T(W, 'F10: an unreadable date ("next week") is FLAGGED by name in the tooltip and counted as due: red', red(b) && /not readable for BAD-1/.test(b.title), JSON.stringify(b));
    b = await mk([REM('BAD-2', '2026-13-45')]); T(W, 'F10: an impossible date (2026-13-45) is flagged too', red(b) && /not readable for BAD-2/.test(b.title), JSON.stringify(b));
    b = await mk([REM('A', '')]); T(W, 'F10: an empty due date is simply not due: blue', blue(b) && !/not readable/.test(b.title), JSON.stringify(b));
    b = await mk([REM('A', '2026-10-01', true)]); T(W, 'F10: a done item is not counted: grey', grey(b), JSON.stringify(b));
    b = await mk([REM('A', '2026-10-07')], '2026-10-06T23:30:00-04:00'); T(W, 'F10: 11:30 PM Eastern on Oct 6 is still Oct 6 (not tomorrow in UTC): due-tomorrow item stays blue', blue(b), JSON.stringify(b));
  }
  // ---- F11: a deleted reminders file clears the bell
  { const W = 'F11', d = stage(fresh(NOWMS), { reminders: [{ id: 'A', kind: 'x', title: 't', due: '2026-10-01', done: false }, { id: 'B', kind: 'x', title: 't', due: '', done: false }] }); const { ctx, p, errs } = await open(br, d);
    const b0 = await p.evaluate(() => ({ n: document.getElementById('remn').textContent, bg: document.getElementById('t_rem').style.background }));
    fs.unlinkSync(path.join(d, 'vtes-reminders.js')); await tick(p); const b1 = await p.evaluate(() => ({ n: document.getElementById('remn').textContent, bg: document.getElementById('t_rem').style.background, title: document.getElementById('t_rem').title }));
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'F11: before: count 2 and red', /2/.test(b0.n) && /b3261e|179, 38, 30/.test(b0.bg), JSON.stringify(b0));
    T(W, 'F11: one reload after deleting vtes-reminders.js the count is gone and the bell is grey, and the tooltip says the file is missing', b1.n.trim() === '' && /6b6b66|107, 107, 102/.test(b1.bg) && /missing/.test(b1.title), JSON.stringify(b1));
    await ctx.close(); }
  // ---- F12: a status-writer entry never replaces the probe address
  { const W = 'F12'; const st = {}; ['LLM-04', 'LLM-07', 'LLM-01'].forEach(i => { st[i] = { st: 'up', seen: at(1) }; });
    const d = stage(null, { status: st }); const { ctx, p, errs } = await open(br, d, { settle: 2500 }); const sites = await p.evaluate(() => [...document.querySelectorAll('.v4site')].map(e => e.getAttribute('data-site') + ': ' + e.textContent.replace(/\. \(A small.*/, '')));
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'F12: with the status writer stamping LLM-04 and LLM-07, every site check still answers (none stuck on "checking"): ' + sites.join(' | '), sites.length === 4 && sites.every(s => !/checking/.test(s)), sites.join(' | '));
    T(W, 'F12: the probe table still holds the four addresses', await p.evaluate(() => ['LLM-04', 'LLM-07', 'LLM-08', 'LLM-10'].every(i => VTES_MAP.status[i] && VTES_MAP.status[i].probe)), 'probe table'); await ctx.close(); }
  // ---- F13: interval_sec below 1 is invalid
  { const W = 'F13';
    for (const iv of [0.001, 0.5, 0, -1, 'x', null === 1 ? 1 : 0.999]) {
      const fx = fresh(NOWMS); fx.heartbeat.interval_sec = iv; const d = stage(fx); const { ctx, p } = await open(br, d); const st = await stripOk(p), g = await greenChips(p), one = await p.evaluate(() => VTES4.status('heartbeat').state);
      T(W, 'F13: interval_sec ' + JSON.stringify(iv) + ' -> heartbeat NOT OK, badge red, 0 green chips (one page, one answer)', one === 'NOT OK' && !st.heartbeat.ok && g.length === 0 && /NOT OK/.test(st.heartbeat.t), JSON.stringify([one, st.heartbeat, g.length])); await ctx.close();
    }
    for (const iv of [1, 1.5]) { const fx = fresh(NOWMS, { interval: iv }); const d = stage(fx); const { ctx, p } = await open(br, d); const one = await p.evaluate(() => VTES4.status('heartbeat').state); T(W, 'F13: interval_sec ' + iv + ' is valid (not NOT OK)', one !== 'NOT OK', one); await ctx.close(); }
  }
  // ---- F16: the 60-second redraw does not wipe a selection or the Map's note
  { const W = 'F16', d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
    await p.click('#t_pan'); await wait(p, 300);
    const n1 = await sel(p, '#pn-health'); await tick(p); const a1 = await selLen(p);
    T(W, 'F16: a selection of ' + n1 + ' characters in the Health panel survives a tick (data unchanged)', n1 > 100 && a1 === n1, n1 + ' -> ' + a1);
    const n2 = await sel(p, '#v4age1'); await p.evaluate(() => { window.VTES4_NOW = new Date(Date.parse(window.VTES4_NOW) + 60000).toISOString(); window.VTES_NOW = Date.parse(window.VTES4_NOW); }); await tick(p); const a2 = await selLen(p);
    T(W, 'F16: a selection in the top line survives when only the "Re-checked" time changes (one minute later)', n2 > 20 && a2 === n2, n2 + ' -> ' + a2);
    const n3 = await sel(p, '#card-LLM-01 .v4st'); await tick(p); const a3 = await selLen(p);
    T(W, 'F16: a selection in a card state line survives a tick', n3 > 10 && a3 === n3, n3 + ' -> ' + a3);
    await p.click('#t_map'); await wait(p, 300); await p.click('#mapcopy'); await wait(p, 400); const note0 = await p.textContent('#mapnote');
    await p.evaluate(() => { window.VTES4_NOW = new Date(Date.parse(window.VTES4_NOW) + 60000).toISOString(); window.VTES_NOW = Date.parse(window.VTES4_NOW); }); await tick(p); const note1 = await p.textContent('#mapnote');
    T(W, 'F16: the Map note "Copied." survives a tick one minute later (' + JSON.stringify(note0) + ' -> ' + JSON.stringify(note1) + ')', /Copied/.test(note0) && note1 === note0, note0 + ' -> ' + note1);
    const n4 = await sel(p, '#map .v4typedbox'); await tick(p); const a4 = await selLen(p);
    T(W, 'F16: a selection inside the Map survives a tick', n4 > 50 && a4 === n4, n4 + ' -> ' + a4);
    const leg = await p.evaluate(() => (document.getElementById('v4legt') || {}).textContent);
    T(W, 'F16: the Map legend time is its own node and shows the new time', /Oct 6, 2:0[1-9] PM EDT/.test(leg || ''), leg);
    // typed text and focus still survive (the checker found this already passing)
    await p.click('#t_con'); await p.fill('#say', 'typed words stay'); await tick(p); T(W, 'F16 (control): typed text survives a tick', (await p.inputValue('#say')) === 'typed words stay', 'say');
    T(W, 'no page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---- N5 re-test (downgraded claim): bad interval values
  { const W = 'N5';
    for (const iv of [864000, 3601, 0, -5, '300', 0.001]) { const fx = fresh(NOWMS); fx.heartbeat.interval_sec = iv; const d = stage(fx); const { ctx, p } = await open(br, d); const g = await greenChips(p), gc = await greenCards(p), st = await stripOk(p);
      T(W, 'N5: interval_sec ' + JSON.stringify(iv) + ' -> NOT OK, 0 green chips, 0 green cards, red badge', g.length === 0 && gc.length === 0 && !st.heartbeat.ok && /NOT OK/.test(st.heartbeat.t), JSON.stringify([g.length, gc.length, st.heartbeat])); await ctx.close(); }
    { const fx = fresh(NOWMS, { interval: 1800, lastSeenAge: 20, hbAge: 20 }); CHATS.forEach(i => { fx.heartbeat.executors[i].proof_at = at(21); }); const d = stage(fx); const { ctx, p } = await open(br, d); const g = await greenChips(p); T(W, 'N5: any tick up to 60 minutes can be green (F8): a 30-minute tick, 20 minutes old', g.includes('LLM-01'), g); await ctx.close(); }
  }
  // ---- v3 folder config: the page reads vtes-status.js and vtes-reminders.js from the v3 folder named in vtes4-config.js
  if (PKG === HERE) {
    const W = 'CONFIG', v3 = fs.mkdtempSync(path.join(os.tmpdir(), 'v3dir-')), d = stage(fresh(NOWMS));
    fs.unlinkSync(path.join(d, 'vtes-reminders.js')); fs.unlinkSync(path.join(d, 'vtes-status.js'));
    fs.writeFileSync(path.join(v3, 'vtes-status.js'), 'window.VTES_STATUS = ' + JSON.stringify({ 'LLM-02': { st: 'up', seen: at(1) } }) + ';');
    fs.writeFileSync(path.join(v3, 'vtes-reminders.js'), REMFILE([{ id: 'A', kind: 'x', title: 't', due: '2026-10-20', done: false }, { id: 'B', kind: 'x', title: 't', due: '', done: false }, { id: 'C', kind: 'x', title: 't', due: '', done: false }]));
    const heartbeatOff = fresh(NOWMS); delete heartbeatOff.heartbeat; fs.unlinkSync(path.join(d, 'data', 'vtes4-heartbeat.js')); fs.writeFileSync(path.join(d, 'vtes4-config.js'), 'window.VTES4_CONFIG = { "v3_dir": "' + v3 + '", "v3_dir_url": "file://' + v3 + '/" };');
    const { ctx, p, errs } = await open(br, d); const g = async () => p.evaluate(() => ({ n: document.getElementById('remn').textContent, card: document.querySelector('.v4st[data-state="LLM-02"]').textContent }));
    let s = await g(); T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'CONFIG: the bell counts the 3 reminders in the v3 folder, and LLM-02 shows the status-only report from the v3 folder (grey, not proven)', /3/.test(s.n) && /WRITER SAYS UP, NOT PROVEN/.test(s.card), JSON.stringify(s));
    fs.writeFileSync(path.join(v3, 'vtes-reminders.js'), REMFILE([{ id: 'A', kind: 'x', title: 't', due: '2026-10-20', done: false }])); await tick(p); s = await g(); T(W, 'CONFIG: after the file in the v3 folder changes, one tick shows 1', /1/.test(s.n) && !/3/.test(s.n), JSON.stringify(s));
    fs.unlinkSync(path.join(v3, 'vtes-status.js')); fs.unlinkSync(path.join(v3, 'vtes-reminders.js')); await tick(p); s = await g(); T(W, 'CONFIG: after both files are deleted from the v3 folder, the bell is clear and LLM-02 is NO DATA', s.n.trim() === '' && /NO DATA/.test(s.card), JSON.stringify(s));
    T(W, 'CONFIG: nothing was written into the v3 folder by the page', fs.readdirSync(v3).length === 0, fs.readdirSync(v3));
    const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => /VTES-(PANEL|REMINDERS)\.html$/.test(h)));
    T(W, 'CONFIG: the two local links (bell, house) point into the v3 folder, so they are not dead links in the new folder: ' + links.join(' , '), links.length === 2 && links.every(h => h.indexOf('file://' + v3 + '/') === 0), links);
    await ctx.close();
    fs.writeFileSync(path.join(d, 'vtes4-config.js'), 'window.VTES4_CONFIG = { "v3_dir_url": "https://evil.example/x/" };'); fs.writeFileSync(path.join(d, 'vtes-reminders.js'), REMFILE([{ id: 'Z', kind: 'x', title: 't', due: '', done: false }]));
    { const o = await open(br, d); const reqs = []; o.p.on('request', r => { if (/evil\.example/.test(r.url())) reqs.push(r.url()); }); await tick(o.p); const n = await o.p.evaluate(() => document.getElementById('remn').textContent);
      T(W, 'CONFIG: a config that is not a file: address is ignored (no request to the outside address; the page folder is used)', reqs.length === 0 && /1/.test(n), JSON.stringify([reqs, n])); await o.ctx.close(); }
  }
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length, fail = results.length - pass;
  fs.writeFileSync(OUT, JSON.stringify({ package: PKG === HERE ? 'round 3 (current)' : 'OLD: ' + PKG, total: results.length, pass, fail, results }, null, 1));
  console.log(pass + ' of ' + results.length + ' pass; ' + fail + ' fail');
  process.exit(fail ? 1 : 0);
})();
