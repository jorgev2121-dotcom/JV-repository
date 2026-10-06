// test-round2.js - fix round 2 worlds: FUTURE, FUTUREEXEC, STATUSONLY, BIGTICK, OLDMIAMI, BOTSPROVEN, bell, packet stamp, pad stamp, Map note,
// and the 2-hour clock runs (page left open, with and without a live writer). Opens the page from file://. Headless Chromium. TRK-2026-9910-B
// Usage: node test-round2.js <out.json>
const fs = require('fs'), path = require('path'), os = require('os');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const HERE = __dirname, OUT = process.argv[2] || 'test-round2-RESULT.json';
const NOW = '2026-10-06T14:00:00-04:00', NOWMS = new Date(NOW).getTime();
const at = (m, base) => new Date((base === undefined ? NOWMS : base) - m * 60000).toISOString();
const wrap = (n, o) => 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + n + ' = ' + JSON.stringify(o) + ';';
const ALL = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
function fresh(base, extra) {
  const ex = {}; ALL.forEach(i => { ex[i] = { state: 'up', last_seen: at(1, base) }; });
  ['LLM-04', 'LLM-05', 'LLM-07', 'LLM-08', 'LLM-10'].forEach(i => { ex[i].proof_at = at(2, base); });
  const w = {
    heartbeat: { schema: 1, at: at(1, base), writer: 'fixture', interval_sec: 300, vtes_scheme_registered: true, addresses_filled: { 'LLM-01': true, 'LLM-03': true, 'LLM-09': true }, executors: ex },
    state: { schema: 1, at: at(30, base), open_items: 12, in_progress: 3, blocked: 2, repairs: [], money: [] },
    health: { schema: 1, at: at(30, base), ok: true, checks_passed: 9, checks_total: 12, report_sent_at: at(31, base) },
    tokens: { schema: 1, at: at(2, base), burn_per_hour: 41000, window_used_pct: 33, window_resets_at: at(-180, base), week_used_pct: 61, programs: [{ name: 'p', tokens_today: 1 }] },
    housekeeping: { schema: 1, at: at(60, base), last_report_at: at(60, base), report_delivered: true, delivered_to: 'jorge', items_cleaned: 17 },
    miamidade: { schema: 1, at: at(20, base), counted: 7, target: 300, sources: [{ id: '01', proof_ok: true }, { id: '03', proof_ok: true }] }
  };
  return extra ? extra(w) : w;
}
const clone = o => JSON.parse(JSON.stringify(o));
const REM = (items) => 'window.VTES_REMINDERS = ' + JSON.stringify(items) + ';';
const results = [];
const T = (world, name, ok, why) => { results.push({ world, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) console.log('FAIL', world, name, String(why).slice(0, 200)); };
function stage(files, opts) {
  opts = opts || {};
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'v4r2-'));
  for (const f of ['VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js', 'vtes-status.js']) fs.copyFileSync(path.join(HERE, f), path.join(d, f));
  fs.mkdirSync(path.join(d, 'data'));
  for (const f of fs.readdirSync(path.join(HERE, 'data'))) fs.copyFileSync(path.join(HERE, 'data', f), path.join(d, 'data', f));
  for (const f of ['vtes-reminders.js', 'vtes-common.js']) { const s = path.join(HERE, 'v3-source', f); if (fs.existsSync(s)) fs.copyFileSync(path.join(HERE, 'v3-source', f), path.join(d, f)); }
  for (const f of ['VTES-REMINDERS.html', 'VTES-PANEL.html']) fs.writeFileSync(path.join(d, f), '<html></html>');
  if (files) for (const k of Object.keys(files)) fs.writeFileSync(path.join(d, 'data', 'vtes4-' + k + '.js'), wrap(k, files[k]));
  if (opts.status) fs.writeFileSync(path.join(d, 'vtes-status.js'), 'window.VTES_STATUS = ' + JSON.stringify(opts.status) + ';');
  if (opts.reminders) fs.writeFileSync(path.join(d, 'vtes-reminders.js'), REM(opts.reminders));
  return d;
}
async function open(br, dir, o) {
  o = o || {};
  const ctx = await br.newContext(); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(String(e.message).slice(0, 140)));
  await ctx.route(u => /^https?:/.test(u.toString()), r => r.fulfill({ status: 200, contentType: 'text/html', body: 'ok' }));
  const init = ({ n, useFixed }) => { if (useFixed) { window.VTES4_NOW = n; window.VTES_NOW = Date.parse(n); } window.open = () => null; const w = () => Promise.resolve(); try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: w }, configurable: true }); } catch (e) { } };
  if (o.clock) { await p.clock.install({ time: new Date(NOW) }); }
  await p.addInitScript(init, { n: NOW, useFixed: !o.clock });
  await p.goto('file://' + dir + '/VTES-LLM-LAUNCHER_v4.html'); await p.waitForTimeout(800);
  return { ctx, p, errs };
}
async function snap(p) {
  return p.evaluate(() => {
    const chipsUp = [...document.querySelectorAll('#chips .chip.st-up')].map(c => c.getAttribute('data-id'));
    const chipsGrey = [...document.querySelectorAll('#chips .chip.st-unk')].map(c => c.getAttribute('data-id'));
    const cardsUp = [...document.querySelectorAll('.v4st.ok')].map(c => c.getAttribute('data-state'));
    const cardsUnp = [...document.querySelectorAll('.v4st.unp')].map(c => c.getAttribute('data-state'));
    const cardText = {}; document.querySelectorAll('.v4st').forEach(c => { cardText[c.getAttribute('data-state')] = c.textContent; });
    const chipTitle = {}; document.querySelectorAll('#chips .chip').forEach(c => { chipTitle[c.getAttribute('data-id')] = c.title; });
    return { chipsUp, chipsGrey, cardsUp, cardsUnp, cardText, chipTitle, okBadges: document.querySelectorAll('.v4b.ok').length, age: document.getElementById('v4age').textContent, ageBad: document.getElementById('v4age').classList.contains('bad'),
      vtes: [...document.querySelectorAll('a[href^="vtes:"]')].map(a => a.getAttribute('href')), strip: document.getElementById('v4dash').textContent, panels: document.getElementById('v4panels').textContent };
  });
}
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
async function wait(p, ms) { await p.waitForTimeout(ms || 400); }
(async () => {
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // ---- FUTURE: every file dated one year ahead (flaw N1)
  { const W = 'FUTURE', fx = fresh(NOWMS + 365 * 86400000); const d = stage(fx); const { ctx, p, errs } = await open(br, d); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'N1: 0 green chips', s.chipsUp.length === 0, s.chipsUp); T(W, 'N1: 0 green cards', s.cardsUp.length === 0, s.cardsUp); T(W, 'N1: 0 green badges', s.okBadges === 0, s.okBadges);
    T(W, 'N1: no vtes:// link', s.vtes.length === 0, s.vtes);
    T(W, 'N1: age line says BAD CLOCK and is red', /BAD CLOCK/.test(s.age) && s.ageBad, s.age);
    T(W, 'N1: the year 2027 is shown', /2027/.test(s.age + s.strip + JSON.stringify(s.cardText)), s.age);
    T(W, 'N1: card says BAD CLOCK', /BAD CLOCK/.test(s.cardText['LLM-01']), s.cardText['LLM-01']);
    T(W, 'N1: chip says BAD CLOCK', /BAD CLOCK/.test(s.chipTitle['LLM-01']), s.chipTitle['LLM-01']);
    T(W, 'N1: panels show no future numbers (token burn 41000 hidden)', !/41000/.test(s.panels), s.panels.slice(0, 200));
    const f = await p.evaluate(() => [VTES4.fmt(new Date('2025-10-06T18:00:00Z')), VTES4.fmt(new Date('2026-10-06T18:00:00Z'))]);
    T(W, 'N1: year shown when not the current year, hidden when it is', /2025/.test(f[0]) && !/2026/.test(f[1]), f);
    await ctx.close(); }
  // ---- FUTUREEXEC: file time fine, but each window's own last_seen and proof are in the future
  { const W = 'FUTUREEXEC', fx = fresh(NOWMS); ALL.forEach(i => { fx.heartbeat.executors[i].last_seen = at(-600); if (fx.heartbeat.executors[i].proof_at) fx.heartbeat.executors[i].proof_at = at(-600); });
    const d = stage(fx); const { ctx, p, errs } = await open(br, d); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|')); T(W, 'N1: 0 green chips', s.chipsUp.length === 0, s.chipsUp); T(W, 'N1: 0 green cards', s.cardsUp.length === 0, s.cardsUp);
    T(W, 'N1: card says BAD CLOCK', /BAD CLOCK/.test(s.cardText['LLM-01']) && /BAD CLOCK/.test(s.cardText['LLM-04']), s.cardText['LLM-01']);
    await ctx.close(); }
  { const W = 'FUTUREPROOF', fx = fresh(NOWMS); fx.heartbeat.executors['LLM-04'].proof_at = at(-600); const d = stage(fx); const { ctx, p } = await open(br, d); const s = await snap(p);
    T(W, 'N1: chat window with a future proof time is not green', !s.chipsUp.includes('LLM-04') && /BAD CLOCK/.test(s.cardText['LLM-04']), s.cardText['LLM-04']);
    T(W, 'other windows still green (test is not just everything red)', s.chipsUp.includes('LLM-01') && s.cardsUp.includes('LLM-01'), s.chipsUp); await ctx.close(); }
  // ---- STATUSONLY: only vtes-status.js reports (it always writes up) (flaws N3, N4)
  { const W = 'STATUSONLY', st = {}; ['LLM-01', 'LLM-09', 'BOTS', 'LLM-02', 'LLM-04'].forEach(i => { st[i] = { st: 'up', seen: at(1) }; });
    const d = stage(null, { status: st }); const { ctx, p, errs } = await open(br, d); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|')); T(W, 'N3: 0 green chips', s.chipsUp.length === 0, s.chipsUp); T(W, 'N3: 0 green cards', s.cardsUp.length === 0, s.cardsUp); T(W, 'N3: 0 green badges', s.okBadges === 0, s.okBadges);
    T(W, 'N3: RAMBO card says WRITER SAYS UP, NOT PROVEN (grey)', /WRITER SAYS UP, NOT PROVEN/.test(s.cardText['LLM-01']) && s.cardsUnp.includes('LLM-01'), s.cardText['LLM-01']);
    T(W, 'N3: RAMBO chip is grey (st-unk), not green', s.chipsGrey.includes('LLM-01') && !s.chipsUp.includes('LLM-01'), s.chipsGrey);
    T(W, 'N3: chat window Chat (LLM-04) ignores the status writer: NO DATA', /NO DATA/.test(s.cardText['LLM-04']), s.cardText['LLM-04']);
    T(W, 'N4: windows confirmed up = 0 of 12', /Windows confirmed up now: <?b?>?0 of 12|Windows confirmed up now: 0 of 12/.test(s.panels), s.panels.match(/Windows confirmed up[^.]*/));
    T(W, 'N4: the age line does not contradict (says no valid data file, status writer cannot prove)', /NO DATA/.test(s.age) && /cannot prove/.test(s.age), s.age);
    await p.click('#t_map'); await wait(p, 300);
    const box = await p.evaluate(() => { const b = [...document.querySelectorAll('.mbox')].find(x => /BOTS/.test(x.querySelector('.mid').textContent)); return b ? { all: b.textContent, st: b.querySelector('.mst').textContent } : null; });
    T(W, 'N4: Map Grok Bots box says NOT BUILT and never UP', box && /NOT BUILT/.test(box.st) && !/\bUP\b/.test(box.st), box && box.st);
    T(W, 'N4: Map Grok Bots box subtitle says NOT BUILT', box && /NOT BUILT/.test(box.all), box && box.all.slice(0, 100));
    const mt = await p.evaluate(() => document.getElementById('map').textContent);
    T(W, 'N13: the Map says plainly it does not draw LOCAL and CHIEF', /does not draw LOCAL.*CHIEF/.test(mt), mt.slice(0, 200));
    T(W, 'N4: no "ride on SuperGrok" and one Grok sentence', !/ride on SuperGrok|nothing set up yet/.test(mt), 'x');
    await p.click('[data-t="wire"]'); await wait(p, 200);
    const wnode = await p.evaluate(() => { const g = document.querySelector('.wnode[data-id="BOTS"]'); return g ? g.textContent : ''; });
    T(W, 'N4: wiring node for Grok Bots is not UP', !/\bUP\b/.test(wnode), wnode);
    await ctx.close(); }
  // ---- BOTSPROVEN: the poller reports BOTS up with a fresh report: UP, and then it is NOT shown as NOT BUILT
  { const W = 'BOTSPROVEN', fx = fresh(NOWMS); fx.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1), proof_at: at(2) }; const d = stage(fx); const { ctx, p } = await open(br, d); await p.click('#t_map'); await wait(p, 300);
    const box = await p.evaluate(() => { const b = [...document.querySelectorAll('.mbox')].find(x => /BOTS/.test(x.querySelector('.mid').textContent)); return b ? b.textContent : ''; });
    T(W, 'N4: with a proven report the box shows UP and not NOT BUILT', /UP/.test(box) && !/NOT BUILT/.test(box.slice(0, 120)), box.slice(0, 150)); await ctx.close(); }
  // ---- BIGTICK (flaw N5)
  { const W = 'BIGTICK', fx = fresh(NOWMS); fx.heartbeat.interval_sec = 864000; ALL.forEach(i => { fx.heartbeat.executors[i].last_seen = at(2 * 1440); if (fx.heartbeat.executors[i].proof_at) fx.heartbeat.executors[i].proof_at = at(2 * 1440); });
    const d = stage(fx); const { ctx, p, errs } = await open(br, d); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|')); T(W, 'N5: 0 green chips with interval_sec 864000', s.chipsUp.length === 0, s.chipsUp); T(W, 'N5: 0 green cards', s.cardsUp.length === 0, s.cardsUp);
    T(W, 'N5: heartbeat badge says NOT OK about interval_sec', /interval_sec/.test(s.strip) && /NOT OK/.test(s.strip), s.strip); await ctx.close();
    for (const [iv, expectGreen] of [[3600, false], [3601, false], [0, false], ['300', false], [-5, false]]) {
      const f2 = fresh(NOWMS); f2.heartbeat.interval_sec = iv; ALL.forEach(i => { f2.heartbeat.executors[i].last_seen = at(2 * 1440); if (f2.heartbeat.executors[i].proof_at) f2.heartbeat.executors[i].proof_at = at(2 * 1440); });
      const o = await open(br, stage(f2)); const s2 = await snap(o.p); T(W, 'N5: interval_sec ' + JSON.stringify(iv) + ' with 2-day-old sightings: 0 green', s2.chipsUp.length === 0 && s2.cardsUp.length === 0, s2.chipsUp); await o.ctx.close(); }
    const f3 = fresh(NOWMS); f3.heartbeat.interval_sec = 3600; ALL.forEach(i => { f3.heartbeat.executors[i].last_seen = at(100); if (f3.heartbeat.executors[i].proof_at) f3.heartbeat.executors[i].proof_at = at(100); }); f3.heartbeat.at = at(1);
    const o3 = await open(br, stage(f3)); const s3 = await snap(o3.p); T(W, 'N5: interval_sec 3600 (the maximum) is accepted: a sighting 100 minutes ago is green (3 ticks = 180 min)', s3.chipsUp.includes('LLM-01'), s3.chipsUp); await o3.ctx.close(); }
  // ---- OLDMIAMI (flaw N6)
  { const W = 'OLDMIAMI', fx = fresh(NOWMS); fx.miamidade.at = at(30 * 1440); const d = stage(fx); const { ctx, p, errs } = await open(br, d); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    const proofOk = await p.evaluate(() => [...document.querySelectorAll('#pn-miami .v4b.ok')].filter(x => /proof checked/.test(x.textContent)).length);
    const neutral = await p.evaluate(() => [...document.querySelectorAll('#pn-miami .v4b.na')].length);
    T(W, 'N6: 0 green "proof checked" marks from a 30-day-old file', proofOk === 0, proofOk); T(W, 'N6: all 22 proof marks neutral grey', neutral === 22, neutral);
    T(W, 'N6: the Miami-Dade badge says STALE (red)', /STALE/.test(await p.textContent('#pn-miami')), 'x');
    const f2 = fresh(NOWMS); const o = await open(br, stage(f2)); const pc = await o.p.evaluate(() => [...document.querySelectorAll('#pn-miami .v4b.ok')].filter(x => /proof checked/.test(x.textContent)).length);
    T(W, 'N6 control: with a fresh file, 2 proof checked marks show', pc === 2, pc); await o.ctx.close(); await ctx.close(); }
  // ---- BELL (flaw N12)
  { const W = 'BELL'; const col = async (rem) => { const o = await open(br, stage(fresh(NOWMS), { reminders: rem })); const r = await o.p.evaluate(() => { const a = document.getElementById('t_rem'); return { bg: a.style.backgroundColor, n: document.getElementById('remn').textContent.trim(), title: a.title }; }); await o.ctx.close(); return r; };
    const over = await col([{ id: 'a', title: 'x', due: '2026-10-01', done: false }, { id: 'b', title: 'y', due: '', done: false }]);
    const open2 = await col([{ id: 'a', title: 'x', due: '2026-12-01', done: false }]);
    const none = await col([{ id: 'a', title: 'x', due: '2026-10-01', done: true }]);
    T(W, 'N12: overdue item -> red bell, count 2', over.bg === 'rgb(179, 38, 30)' && over.n === '2', JSON.stringify(over));
    T(W, 'N12: open but not due -> blue bell (not red), count 1', open2.bg === 'rgb(27, 94, 158)' && open2.n === '1', JSON.stringify(open2));
    T(W, 'N12: nothing open -> grey bell, no count', none.bg === 'rgb(107, 107, 102)' && none.n === '', JSON.stringify(none));
    T(W, 'N12: the title says the file has no time stamp (age unknown)', /no time stamp/.test(over.title), over.title);
    const real = await col(undefined); T(W, 'N12: shipped reminders file: bell colour is computed (red only if something is due)', /rgb/.test(real.bg), JSON.stringify(real)); }
  // ---- STAMPS (flaw N7)
  { const W = 'STAMPS'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
    await p.click('#v4rambobtn'); await wait(p, 400); const pk = await p.inputValue('#preview'); const first = pk.split('\n')[0];
    T(W, 'N7: packet stamp is Eastern short form with the zone', /Oct 6, 2:00 PM EDT/.test(first) && !/\d+\/\d+\/\d{4}/.test(first), first);
    await p.fill('#say', 'hello pad'); await p.click('#sendbtn'); await wait(p, 400);
    const lg = await p.textContent('#log'); T(W, 'N7: conversation-pad entry is Eastern short form with the zone', /Oct 6, 2:00 PM EDT/.test(lg) && !/\d+\/\d+\/\d{4}/.test(lg), lg.slice(0, 120));
    const pt = await p.evaluate(() => [VTES4.padTime('10/6/2026, 6:00:08 PM'), VTES4.padTime('10/6/2025, 1:00:00 PM'), VTES4.padTime('Oct 6, 2:00 PM EDT')]);
    T(W, 'N7: an older saved pad entry is shown in Eastern form too (and a year when not current)', /(EDT|EST)/.test(pt[0]) && /2025/.test(pt[1]) && pt[2] === 'Oct 6, 2:00 PM EDT', pt);
    await p.click('#t_map'); await wait(p, 200); await p.click('#mapcopy').catch(() => { });
    T(W, 'no page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---- TWO HOURS WITH NO WRITER: page left open, files never rewritten (flaw N2)
  { const W = 'TWOHOURS-NOWRITER'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d, { clock: true }); const s0 = await snap(p);
    T(W, 'at load: lights, cards and strip agree and are green (control)', same(s0.chipsUp, s0.cardsUp) && s0.chipsUp.includes('LLM-01') && s0.okBadges > 0, JSON.stringify([s0.chipsUp, s0.cardsUp]));
    await p.clock.runFor(2 * 3600 * 1000); await wait(p, 600); await p.clock.runFor(61000); await wait(p, 600); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'N2: after 2 hours 0 green chips', s.chipsUp.length === 0, s.chipsUp); T(W, 'N2: after 2 hours 0 green cards (cards agree with the header)', s.cardsUp.length === 0, s.cardsUp);
    const strip = await p.evaluate(() => { const o = {}; document.querySelectorAll('#v4dash .v4b').forEach(b => { o[b.getAttribute('data-src')] = b.classList.contains('ok'); }); return o; });
    T(W, 'N2: after 2 hours the heartbeat (15 min limit) and tokens (30 min limit) strip badges are red', strip.heartbeat === false && strip.tokens === false, JSON.stringify(strip));
    T(W, 'N2: the daily files (state, health, housekeeping, Miami-Dade) are still inside their own limits, so still green: honest, not everything red', strip.state === true && strip.health === true && strip.housekeeping === true && strip.miamidade === true, JSON.stringify(strip));
    T(W, 'N2: the top age line is red and says it was re-checked at the new time', s.ageBad && /Re-checked Oct 6, 4:0\d PM EDT/.test(s.age), s.age);
    T(W, 'N2: cards say STALE, same as the chips', /STALE/.test(s.cardText['LLM-01']) && /STALE/.test(s.chipTitle['LLM-01']), s.cardText['LLM-01']);
    T(W, 'N2: the vtes:// link is gone after the heartbeat went stale', s.vtes.length === 0, s.vtes);
    await ctx.close(); }
  // ---- TWO HOURS WITH A LIVE WRITER: files rewritten every 10 minutes; the page must pick up the new files (cache-busted reload)
  { const W = 'TWOHOURS-WRITER'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d, { clock: true });
    for (let i = 1; i <= 12; i++) { await p.clock.runFor(10 * 60000); const base = NOWMS + i * 600000; const fx = fresh(base); fx.tokens.burn_per_hour = 41000 + i * 1000; for (const k of Object.keys(fx)) { const f = path.join(d, 'data', 'vtes4-' + k + '.js'); fs.writeFileSync(f + '.tmp', wrap(k, fx[k])); fs.renameSync(f + '.tmp', f); } await wait(p, 150); }
    await p.clock.runFor(61000); await wait(p, 800); const s = await snap(p);
    T(W, 'no page errors', errs.length === 0, errs.join('|'));
    T(W, 'N2: after 2 hours with a live writer the lights are still green and cards agree', s.chipsUp.includes('LLM-01') && same(s.chipsUp, s.cardsUp), JSON.stringify([s.chipsUp, s.cardsUp]));
    T(W, 'N2: the new files were read (burn rate 53000 shown, so the reload is cache-busted)', /53000/.test(s.panels), s.panels.slice(0, 200));
    // a file deleted from disk goes back to NO DATA
    fs.unlinkSync(path.join(d, 'data', 'vtes4-tokens.js')); await p.clock.runFor(61000); await wait(p, 800); const s2 = await snap(p);
    T(W, 'N2: a deleted data file shows NO DATA on the next tick', !/53000/.test(s2.panels) && /NO DATA/.test(await p.textContent('#pn-tokens')), (await p.textContent('#pn-tokens')).slice(0, 150));
    // the poller dies: nothing written for 20 minutes -> heartbeat file STALE, all windows red, on the cards and on the chips
    await p.clock.runFor(20 * 60000); await wait(p, 800); const s3 = await snap(p);
    T(W, 'N2: when the writer stops, the lights AND the cards both go red within a tick', s3.chipsUp.length === 0 && s3.cardsUp.length === 0, JSON.stringify([s3.chipsUp, s3.cardsUp]));
    await ctx.close(); }
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length, fail = results.length - pass;
  fs.writeFileSync(OUT, JSON.stringify({ total: results.length, pass, fail, results }, null, 1));
  console.log(pass + ' of ' + results.length + ' pass; ' + fail + ' fail');
  process.exit(fail ? 1 : 0);
})();
