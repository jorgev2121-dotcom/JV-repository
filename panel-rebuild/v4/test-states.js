// test-states.js - proves the page is never green by default. Usage: node test-states.js <image-dir> <out.json>
// Three worlds: NONE (shipped, empty data), FRESH (all six files fresh), STALE (heartbeat and tokens 1 day old).
// TRK-2026-9910-B
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const dir = path.resolve(process.argv[2]), outFile = process.argv[3];
const NOW = '2026-10-06T14:00:00-04:00', iso = m => new Date(new Date(NOW).getTime() - m * 60000).toISOString();
const wrap = (n, o) => 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + n + ' = ' + JSON.stringify(o) + ';';
const FRESH = {
  heartbeat: { schema: 1, at: iso(2), writer: 'fixture', interval_sec: 300, vtes_scheme_registered: true, executors: { 'LLM-01': { state: 'up', last_seen: iso(3) }, 'LLM-02': { state: 'up', last_seen: iso(1) }, 'LLM-07': { state: 'down', last_seen: iso(4) } } },
  state: { schema: 1, at: iso(60), open_items: 12, in_progress: 3, blocked: 2, repairs: [{ id: 'R1', text: 'fixture repair', status: 'OPEN' }] },
  health: { schema: 1, at: iso(60), ok: true, checks_passed: 9, checks_total: 12, panel_built_at: iso(500), report_sent_at: iso(61) },
  tokens: { schema: 1, at: iso(5), burn_per_hour: 41000, window_used_pct: 33, window_resets_at: iso(-120), week_used_pct: 61, programs: [{ name: 'fixture-prog', tokens_today: 1234 }] },
  housekeeping: { schema: 1, at: iso(120), last_report_at: iso(120), report_delivered: true, delivered_to: 'jorge', items_cleaned: 17 },
  miamidade: { schema: 1, at: iso(30), counted: 7, target: 300, sources: [] }
};
const STALE = JSON.parse(JSON.stringify(FRESH)); STALE.heartbeat.at = iso(1440); STALE.tokens.at = iso(1440);
const worlds = { NONE: null, FRESH, STALE };
const results = []; const t = (world, name, ok, why) => results.push({ world, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : (why || '') });
(async () => {
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const [world, fx] of Object.entries(worlds)) {
    const srv = http.createServer((q, r) => {
      const rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\//, '');
      const m = rel.match(/^data\/vtes4-(\w+)\.js$/);
      if (m && fx) { r.writeHead(200, { 'Content-Type': 'text/javascript' }); return r.end(wrap(m[1], fx[m[1]])); }
      const f = path.join(dir, rel); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
      r.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(fs.readFileSync(f));
    });
    await new Promise(r => srv.listen(0, r));
    const ctx = await br.newContext(); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(n => { window.VTES4_NOW = n; window.open = () => null; }, NOW);
    await p.goto('http://127.0.0.1:' + srv.address().port + '/VTES-LLM-LAUNCHER_v4.html'); await p.waitForTimeout(400);
    const text = await p.evaluate(() => { const c = document.body.cloneNode(true); c.querySelectorAll('script,style,textarea,pre').forEach(e => e.remove()); return c.textContent.replace(/\s+/g, ' '); }), html = await p.content();
    t(world, 'no JS errors', errs.length === 0, errs.join('|'));
    t(world, 'no contradictory typed timings (every 2 minutes / every 15 minutes / 15-minute)', !/every 2 minutes|every 15 minutes|15-minute|runs by itself/i.test(text));
    t(world, 'no placeholder address example.com', !/vtes\.example\.com/.test(html));
    t(world, 'age stamp present', /Built .*, data as of /.test(await p.textContent('#v4age')));
    t(world, 'read-me-first panel open with 7 numbered sentences', await p.$$eval('#v4read li', l => l.length) === 7 && await p.$eval('#v4read', e => e.open));
    t(world, 'Miami-Dade has 22 proof links', await p.$$eval('#pn-miami ol.md a[href^="https://drive.google.com/file/d/"]', a => a.length) === 22);
    t(world, 'Grok card states no bots and a next step', /NO Grok bots exist/.test(text) && /Next step: RAMBO sends Grok one test message/.test(text));
    t(world, 'every window card has plain name first (RAMBO card)', /Claude Code Desktop Executor \/ RAMBO/.test(await p.textContent('#card-LLM-01 .name')));
    for (const id of ['LLM-01', 'LLM-03', 'LLM-05']) {
      await p.click('#t_dir'); await p.click('#card-' + id + ' .pastebtn'); await p.waitForTimeout(300);
      t(world, 'paste button on ' + id + ' gives a visible result', (await p.textContent('#cs-' + id)).trim().length > 10 && (await p.inputValue('#preview')).includes('HANDOFF'));
    }
    const vt = await p.$$eval('a[href^="vtes:"]', a => a.length);
    const na1 = await p.$$eval('[data-na="LLM-01"]', a => a.length);
    const chipsNod = await p.$$eval('#chips .chip.st-nod', c => c.length), chipsUp = await p.$$eval('#chips .chip.st-up', c => c.length);
    const stateBad = await p.$$eval('.v4st.bad', c => c.length), stateOk = await p.$$eval('.v4st.ok', c => c.length);
    const okBadges = await p.$$eval('#v4dash .v4b.ok', c => c.length);
    if (world === 'NONE') {
      t(world, 'all 6 data badges red (NO DATA), none green', okBadges === 0 && /heartbeat: NO DATA/.test(text));
      t(world, 'no executor chip is green; none up', chipsUp === 0 && chipsNod >= 6, 'nod=' + chipsNod + ' up=' + chipsUp);
      t(world, 'every card state is red', stateOk === 0 && stateBad >= 10, 'ok=' + stateOk + ' bad=' + stateBad);
      t(world, 'vtes:// is NOT clickable and RAMBO shows the one-step fix', vt === 0 && na1 === 1 && /One step:/.test(text));
      t(world, 'Miami counter says unknown of 300', /unknown of 300/.test(text));
      t(world, 'token monitor and housekeeping say NO DATA, no invented numbers', /Token monitor[\s\S]*NO DATA/.test(text) && !/Burn rate per hour: \d/.test(text) && /Last report time: NONE/.test(text));
      t(world, 'tick text says interval unknown', /interval unknown \(NO DATA\)/.test(text));
      t(world, 'completion percentage says NO DATA', /Completion: NO DATA/.test(text));
    }
    if (world === 'FRESH') {
      t(world, 'six data badges green', okBadges === 6, 'ok=' + okBadges);
      t(world, 'LLM-01 and LLM-02 state green from heartbeat', /UP - seen/.test(await p.textContent('[data-state="LLM-01"]')) && /UP - seen/.test(await p.textContent('[data-state="LLM-02"]')));
      t(world, 'LLM-07 state is red and says DOWN', /DOWN|down/i.test(await p.textContent('[data-state="LLM-07"]')) && await p.$eval('[data-state="LLM-07"]', e => e.classList.contains('bad')));
      t(world, 'LLM-03 (not in heartbeat) still red NO DATA', /NO DATA/.test(await p.textContent('[data-state="LLM-03"]')));
      t(world, 'timing read from file: every 5 minutes', /every 5 minutes/.test(text));
      t(world, 'vtes:// link now clickable for RAMBO only after registered=true', await p.$$eval('#card-LLM-01 a[href="vtes://llm-01"]', a => a.length) === 1 && na1 === 0);
      t(world, 'token numbers shown from file', /41000/.test(text) && /33%/.test(text) && /fixture-prog/.test(text));
      t(world, 'housekeeping last report shown', /Items cleaned: 17/.test(text) && /Delivered: yes/.test(text));
      t(world, 'Miami counter reads 7 of 300', /7 of 300/.test(text));
      t(world, 'completion shows 75% (9 of 12 checks)', /75% \(9 of 12 checks\)/.test(text));
      t(world, 'repairs come from state file', /fixture repair/.test(text));
    }
    if (world === 'STALE') {
      t(world, 'heartbeat badge says STALE since and is red', /STALE since/.test(await p.textContent('#v4dash')) && /heartbeat: STALE since/.test(text));
      t(world, 'token monitor says STALE and warns old numbers', /STALE since/.test(await p.textContent('#pn-tokens')) && /old\. Do not trust/.test(text));
      t(world, 'no executor chip is green when heartbeat is stale', chipsUp === 0, 'up=' + chipsUp);
    }
    await ctx.close(); srv.close();
  }
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(outFile, JSON.stringify({ total: results.length, pass, fail: results.length - pass, results }, null, 1));
  console.log(pass + ' of ' + results.length + ' pass; ' + (results.length - pass) + ' fail');
  results.filter(r => r.status !== 'PASS').forEach(r => console.log('FAIL', r.world, r.name, '-', r.why));
})();
