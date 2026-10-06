// test-file-click.js - the checker's method: open the page from file://, walk Console, Dir and all three Map tabs,
// click every button, expander and drop-down, count everything. Data worlds NONE / FRESH / STALE / BADHEALTH, internet ON / OFF.
// Usage: node test-file-click.js <out.json>   TRK-2026-9910-B
const fs = require('fs'), path = require('path'), os = require('os');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const HERE = __dirname, OUT = process.argv[2] || 'test-file-click.json';
const NOW = '2026-10-06T14:00:00-04:00', iso = m => new Date(new Date(NOW).getTime() - m * 60000).toISOString();
const wrap = (n, o) => 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + n + ' = ' + JSON.stringify(o) + ';';
const ALLIDS = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
const ex = { 'LLM-01': { state: 'up', last_seen: iso(3) }, 'LLM-02': { state: 'up', last_seen: iso(1) }, 'LLM-07': { state: 'down', last_seen: iso(4), proof_at: iso(4) }, 'LLM-09': { state: 'up', last_seen: iso(2) }, 'CHIEF': { state: 'up', last_seen: iso(2) }, 'LLM-04': { state: 'up', last_seen: iso(2), proof_at: iso(30) } };
const FRESH = {
  heartbeat: { schema: 1, at: iso(2), writer: 'fixture', interval_sec: 300, vtes_scheme_registered: true, addresses_filled: { 'LLM-01': true, 'LLM-03': false, 'LLM-09': false }, executors: ex },
  state: { schema: 1, at: iso(60), open_items: 12, in_progress: 3, blocked: 2, repairs: [{ id: 'R1', text: 'fixture repair', status: 'OPEN' }], money: [{ item: 'fixture invoice', status: 'owed' }] },
  health: { schema: 1, at: iso(60), ok: true, checks_passed: 9, checks_total: 12, panel_built_at: iso(500), report_sent_at: iso(61) },
  tokens: { schema: 1, at: iso(5), burn_per_hour: 41000, window_used_pct: 33, window_resets_at: '2026-10-06T17:00:00-04:00', week_used_pct: 61, programs: [{ name: 'fixture-prog', tokens_today: 1234 }] },
  housekeeping: { schema: 1, at: iso(120), last_report_at: iso(120), report_delivered: true, delivered_to: 'jorge', items_cleaned: 17 },
  miamidade: { schema: 1, at: iso(30), counted: 7, target: 300, sources: [{ id: '01', proof_ok: true }, { id: 3, proof_ok: true }] }
};
const clone = o => JSON.parse(JSON.stringify(o));
const STALE = clone(FRESH); STALE.heartbeat.at = iso(1440); STALE.tokens.at = iso(1440); STALE.heartbeat.executors['LLM-01'].last_seen = iso(1440);
const BADHEALTH = clone(FRESH); BADHEALTH.health.ok = false;
const WORLDS = { NONE: null, FRESH, STALE, BADHEALTH };
const results = [], counts = {};
const add = (world, net, kind, label, status, why, key) => results.push({ world, net, kind, label: String(label || '').replace(/\s+/g, ' ').slice(0, 80), status, why: why || '', key: key || '' });
const T = (world, net, name, ok, why) => add(world, net, 'assert', name, ok ? 'PASS' : 'FAIL', ok ? '' : why);
function stage(world) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'v4file-'));
  for (const f of ['VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js', 'vtes-status.js']) { fs.copyFileSync(path.join(HERE, f), path.join(d, f)); }
  fs.mkdirSync(path.join(d, 'data'));
  for (const f of fs.readdirSync(path.join(HERE, 'data'))) { fs.copyFileSync(path.join(HERE, 'data', f), path.join(d, 'data', f)); }
  for (const f of ['vtes-reminders.js', 'vtes-common.js']) { const s = path.join(HERE, 'v3-source', f); if (fs.existsSync(s)) fs.copyFileSync(s, path.join(d, f)); }
  for (const f of ['VTES-REMINDERS.html', 'VTES-PANEL.html']) { const s = path.join(HERE, 'v3-source', f); fs.writeFileSync(path.join(d, f), fs.existsSync(s) ? fs.readFileSync(s) : '<html></html>'); }
  const fx = WORLDS[world];
  if (fx) for (const k of Object.keys(fx)) fs.writeFileSync(path.join(d, 'data', 'vtes4-' + k + '.js'), wrap(k, fx[k]));
  return d;
}
(async () => {
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const world of Object.keys(WORLDS)) for (const net of ['ON', 'OFF']) {
    const dir = stage(world), url = 'file://' + dir + '/VTES-LLM-LAUNCHER_v4.html';
    const ctx = await br.newContext(); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(String(e.message).slice(0, 140)));
    // internet ON: every external request answers 200; OFF: every external request fails
    await ctx.route(u => /^https?:/.test(u.toString()), r => net === 'ON' ? r.fulfill({ status: 200, contentType: 'text/html', body: 'ok' }) : r.abort());
    await p.addInitScript(n => { window.VTES4_NOW = n; window.VTES_NOW = Date.parse(n); window.open = () => null; window.__cp = ''; const w = t => { window.__cp = t; return Promise.resolve(); }; try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: w }, configurable: true }); } catch (e) { } }, NOW);
    await p.goto(url); await p.waitForTimeout(900);
    const W = world + '/' + net;
    add(world, net, 'page', 'load from file://', errs.length ? 'FAIL' : 'PASS', errs.join(' | '));
    const text = async () => p.evaluate(() => { const c = document.body.cloneNode(true); c.querySelectorAll('script,style,textarea,pre').forEach(e => e.remove()); return c.textContent.replace(/\s+/g, ' '); });
    // ---- FIRST VIEW (flaw 10)
    T(world, net, 'first view: RAMBO paste button visible', await p.isVisible('#v4rambobtn'), 'not visible');
    // ---- assertions per flaw
    const lightsUp = await p.$$eval('#chips .chip.st-up', c => c.map(x => x.getAttribute('data-id')));
    const lightsAmber = await p.$$eval('#chips .chip.st-warn', c => c.length);
    T(world, net, 'no amber lights anywhere', lightsAmber === 0, 'amber=' + lightsAmber);
    if (world === 'NONE') T(world, net, 'flaw 2: no light green with all data empty (internet ' + net + ')', lightsUp.length === 0, 'green: ' + lightsUp);
    if (world === 'STALE') T(world, net, 'flaw 5: no light green and none amber when stale', lightsUp.length === 0 && lightsAmber === 0, 'green: ' + lightsUp);
    if (world === 'FRESH') {
      T(world, net, 'flaw 2: lights green exactly for fresh up windows (01,02,09,CHIEF, and 04 which has a recorded test reply)', JSON.stringify(lightsUp.sort()) === JSON.stringify(['CHIEF', 'LLM-01', 'LLM-02', 'LLM-04', 'LLM-09']), 'green: ' + lightsUp);
      const g = await p.$eval('#chips [data-id="LLM-07"]', c => c.className);
      T(world, net, 'flaw 2: Grok light red and card DOWN agree', /st-down/.test(g) && /DOWN/.test(await p.textContent('[data-state="LLM-07"]')), g);
    }
    // site mark separate (flaw 2)
    const site = await p.textContent('[data-site="LLM-07"]');
    T(world, net, 'separate site-answers mark shows ' + (net === 'ON' ? 'yes' : 'no'), new RegExp('answers from this browser: ' + (net === 'ON' ? 'yes' : 'no')).test(site), site);
    // flaw 3: no clickable vtes link unless scheme registered AND entry filled
    const vt = await p.$$eval('a[href^="vtes:"]', a => a.map(x => x.getAttribute('href')));
    if (world === 'FRESH') T(world, net, 'flaw 3: only vtes://llm-01 clickable (entry filled); 03 and 09 (empty entries) are not', JSON.stringify(vt) === '["vtes://llm-01"]', JSON.stringify(vt));
    else if (world === 'BADHEALTH') T(world, net, 'flaw 3: only the filled entry (01) is clickable', JSON.stringify(vt) === '["vtes://llm-01"]', JSON.stringify(vt));
    else T(world, net, 'flaw 3: no vtes:// link clickable', vt.length === 0, JSON.stringify(vt));
    // flaw 4
    if (world === 'BADHEALTH') T(world, net, 'flaw 4: health ok=false shows red NOT OK, not OK', /health: NOT OK/.test(await text()) && !(await p.$$eval('#v4dash .v4b.ok', c => c.map(x => x.textContent).join('|'))).includes('health'), 'dash');
    // flaw 6 / 20 / 11 / 8 / 9 text checks
    const tx = await text();
    T(world, net, 'flaw 6: exactly one CURRENT footer visible', (await p.$$eval('.foot', f => f.filter(x => /CURRENT/.test(x.textContent)).length)) === 1, 'n');
    T(world, net, 'flaw 6: age line shows Eastern zone, no raw ISO', /Built .*\b(EDT|EST)\b/.test(await p.textContent('#v4age')) && !/\d{4}-\d\d-\d\dT\d\d:\d\d/.test(tx), await p.textContent('#v4age'));
    if (world === 'FRESH') T(world, net, 'flaw 6: window resets shown in short Eastern form', /Window resets: Oct 6, 5:00 PM EDT/.test(tx), (tx.match(/Window resets: [^.]*/) || [''])[0]);
    T(world, net, 'flaw 20: no doubled DOWN - DOWN', !/DOWN - DOWN/.test(tx) && !/DOWN - DOWN/.test(await p.$$eval('#chips .chip', c => c.map(x => x.title).join('|'))), 'doubled');
    T(world, net, 'flaw 8: one Grok statement, no contradiction ("NO Grok bots exist" gone, no "ride on SuperGrok")', !/NO Grok bots exist|ride on SuperGrok|nothing set up yet/.test(tx), 'x');
    T(world, net, 'flaw 9: LLM-09 and CHIEF cards and lights exist', (await p.$$('#card-LLM-09,#card-CHIEF')).length === 2 && (await p.$$('#chips [data-id="LLM-09"],#chips [data-id="CHIEF"]')).length === 2, 'missing');
    const want = await p.evaluate(() => (window.VTES_REMINDERS || []).filter(r => !r.done).length), got = (await p.textContent('#remn')).trim();
    T(world, net, 'flaw 11: bell count equals the real open reminders (' + want + ')', String(want) === got, 'bell=' + got + ' reminders=' + want);
    // ---- walk: Console, Dir, Map 3 tabs, click everything
    const clickAll = async (view) => {
      const n = await p.$$eval('button', b => b.length);
      for (let i = 0; i < n; i++) {
        const info = await p.$$eval('button', (bs, i) => { const b = bs[i]; return b ? { t: (b.textContent || b.title || b.id || 'button').trim(), d: b.disabled, v: !!(b.offsetWidth || b.offsetHeight), id: b.id, cid: b.getAttribute('data-id') || '', ds: b.getAttribute('data-to') || '' } : null; }, i);
        if (!info) continue; const key = info.id ? '#' + info.id : (info.cid ? 'chip ' + info.cid : (info.ds ? 'packet button for ' + info.ds : info.t)); if (info.d) { add(world, net, 'button', view + ': ' + info.t, 'PASS', 'disabled', key); continue; }
        const before = errs.length;
        await p.$$eval('button', (bs, i) => bs[i] && bs[i].click(), i).catch(e => errs.push(e.message)); await p.waitForTimeout(40);
        add(world, net, 'button', view + ': ' + info.t, errs.length > before ? 'FAIL' : 'PASS', errs.length > before ? errs.slice(before).join('|') : (info.v ? '' : 'hidden at this view, click ran without error'), key);
      }
    };
    const links = async (view) => {
      const ls = await p.$$eval('a[href]', as => as.map(a => ({ h: a.getAttribute('href'), t: a.textContent, v: !!(a.offsetWidth || a.offsetHeight) })));
      for (const l of ls) {
        if (/^https?:/i.test(l.h)) { let ok = true; try { new URL(l.h); } catch (e) { ok = false; } add(world, net, 'https-link', l.h, ok && !/example\.com/.test(l.h) ? 'PASS' : 'FAIL', 'syntax only'); }
        else if (/^vtes:/i.test(l.h)) add(world, net, 'vtes-link', l.h, 'PASS', 'clickable only because the data says registered and filled');
        else if (/^(mailto|javascript|#)/.test(l.h)) add(world, net, 'other-link', l.h, 'PASS', '');
        else add(world, net, 'local-link', l.h, fs.existsSync(path.join(dir, l.h.split('#')[0])) ? 'PASS' : 'FAIL', 'file exists');
      }
    };
    const details = await p.$$eval('details', d => d.length), selects = await p.$$eval('select', d => d.length);
    for (let i = 0; i < details; i++) { await p.$$eval('details > summary', (s, i) => s[i] && s[i].click(), i); add(world, net, 'expander', 'details #' + (i + 1), 'PASS', ''); await p.$$eval('details > summary', (s, i) => s[i] && s[i].click(), i); }
    for (let i = 0; i < selects; i++) { const o = await p.$$eval('select', (s, i) => Array.from(s[i].options).map(x => x.value), i); for (const v of o) { await p.$$eval('select', (s, a) => { s[a[0]].value = a[1]; s[a[0]].dispatchEvent(new Event('change')); s[a[0]].dispatchEvent(new Event('input')); }, [i, v]); } add(world, net, 'dropdown', 'select #' + (i + 1) + ' (' + o.length + ' options all chosen)', errs.length ? 'FAIL' : 'PASS', errs.join('|')); }
    await p.click('#t_con'); await links('console'); await clickAll('console');
    await p.click('#t_dir'); await links('dir'); await clickAll('dir');
    // every chip in turn (selects each window, fills the card and packet)
    const chips = await p.$$eval('#chips .chip', c => c.map(x => x.getAttribute('data-id')));
    for (const id of chips) { const b = errs.length; await p.click('#chips [data-id="' + id + '"]'); add(world, net, 'chip', 'select ' + id, errs.length > b ? 'FAIL' : 'PASS', errs.slice(b).join('|')); }
    await p.click('#t_map');
    for (const tab of ['flow', 'wire', 'subs']) {
      await p.click('#map .mt button[data-t="' + tab + '"]'); await p.waitForTimeout(80);
      await links('map-' + tab); await clickAll('map-' + tab);
      await p.click('#t_map'); await p.click('#map .mt button[data-t="' + tab + '"]');
      const mt = await p.evaluate(() => document.getElementById('map').textContent.replace(/\s+/g, ' '));
      if (tab === 'subs') { T(world, net, 'flaw 7: Subscriptions has no bare green ACTIVE; typed notes labelled', !(await p.$$eval('.subc .sw', s => s.some(x => !/typed note/.test(x.textContent)))) && /Typed note from 2026-09-30/.test(mt), 'x'); }
      if (tab === 'flow') { T(world, net, 'flaw 7: Map capability words labelled typed note', /Typed note, 2026-09-30/.test(mt) && /v4typedmap|Typed note from 2026-09-30, not live/.test(mt), 'x'); T(world, net, 'flaw 9: Governor node on the Map has a light', (await p.$$('.mbox')).length > 0 && /LLM-09/.test(mt), 'x'); }
      T(world, net, 'flaw 6: Map has no CURRENT footer of its own', !/map v1/.test(mt), 'map v1');
    }
    // after the walk, the paste button still works from the first view (flaw 10), clipboard text captured
    await p.click('#t_con'); await p.click('#v4rambobtn'); await p.waitForTimeout(250);
    const out = await p.textContent('#v4ramboout');
    T(world, net, 'flaw 10: RAMBO paste button gives a visible result and a HANDOFF packet', out.trim().length > 10 && (await p.inputValue('#preview')).includes('HANDOFF'), out);
    add(world, net, 'page', 'no script errors during the whole walk', errs.length ? 'FAIL' : 'PASS', errs.join(' | '));
    await ctx.close(); fs.rmSync(dir, { recursive: true, force: true });
  }
  await br.close();
  const kinds = {}; results.forEach(r => { kinds[r.kind] = (kinds[r.kind] || 0) + 1; });
  // the checker's way of counting: ONE world (empty data, internet ON), each distinct item once, however many views show it
  const uniq = {}, seen = new Set();
  // ONE counting method (fix round 2): an item is one distinct control in the shipped state, identified by kind + label or address, counted once across all views.
  // The 12 window chips are buttons, so they are counted ONCE, inside "button". The separate chip-by-chip click run (kind chip) checks them again but adds nothing to the count.
  results.filter(r => r.world === 'NONE' && r.net === 'ON' && r.kind !== 'assert' && r.kind !== 'chip' && !(r.kind === 'page' && /no script errors/.test(r.label))).forEach(r => { const k = r.kind + '|' + (r.key || r.label.replace(/^(console|dir|map-\w+): /, '')); if (!seen.has(k)) { seen.add(k); uniq[r.kind] = (uniq[r.kind] || 0) + 1; } });
  const uniqTotal = Object.values(uniq).reduce((a, b) => a + b, 0);
  fs.writeFileSync(OUT.replace(/\.json$/, '') + '-ITEMS.txt', 'ITEM LIST (NONE world, internet ON, one method: kind + id/address/label, chips counted once as buttons, the no-script-errors check is not an item)\n' + [...seen].sort().map((k, i) => (i + 1) + '. ' + k).join('\n') + '\n');
  const pass = results.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(OUT, JSON.stringify({ total: results.length, pass, fail: results.length - pass, kinds, uniqueNoneOn: { total: uniqTotal, uniq }, results }, null, 1));
  console.log(pass + ' of ' + results.length + ' pass; ' + (results.length - pass) + ' fail'); console.log(JSON.stringify(kinds)); console.log('checker-style unique count (NONE, internet ON): ' + uniqTotal + ' ' + JSON.stringify(uniq));
  results.filter(r => r.status !== 'PASS').slice(0, 60).forEach(r => console.log('FAIL', r.world + '/' + r.net, r.kind, r.label, '-', String(r.why).slice(0, 160)));
})();
