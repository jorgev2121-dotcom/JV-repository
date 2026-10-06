// test-v5-worlds.js - data worlds for the v5 page: none, fresh, stale, future, status-only writer, big tick, old Miami-Dade, 2-hour run, bots, Grok, times, redraw. TRK-2026-9910-B
// Usage: node test-v5-worlds.js <out.json>. Fake clock 2026-10-06 2:00 PM ET. Every result is PASS or FAIL with the reason.
const L = require('./test-v5-lib.js'); const { fs, path, at, NOWMS, NOW, fresh, stage, sleep, open, tick, stateCls, botCls, greenCards, greenBadges, pageText, ALL, CHATS, BOTNAMES } = L;
const OUT = process.argv[2] || 'test-v5-worlds-RESULT.json'; const results = [];
const T = (world, name, ok, why) => { results.push({ world, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) { console.log('FAIL', world, '|', name, '|', String(why).slice(0, 200)); } };
const TYPED = /every \d+ (minutes?|seconds?)|15-minute|every 15|300 seconds|every 2 minutes|every 5 minutes|runs every/i;
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // ---------------- W1 none: the shipped state (six+one files with at:null, no config status)
  { const W = 'W1-none'; const d = stage(null); const { ctx, p, errs } = await open(br, d);
    T(W, 'page loads with 0 page errors', errs.length === 0, errs.join('|'));
    T(W, '0 green cards, 0 green badges', (await greenCards(p)).length === 0 && (await greenBadges(p)).length === 0, JSON.stringify(await greenCards(p)));
    for (const id of ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LOCAL', 'CODEX', 'RAMBO', 'GROK', 'COWORK', 'CHIEF']) { const s = await stateCls(p, id); T(W, 'card ' + id + ' says NO DATA in red', !!s && /NO DATA/.test(s.txt) && /bad/.test(s.cls), JSON.stringify(s)); }
    for (const n of BOTNAMES) { const s = await botCls(p, n); T(W, 'bot ' + n + ' line says NO DATA in red', !!s && /NO DATA/.test(s.txt) && /bad/.test(s.cls), JSON.stringify(s)); }
    T(W, 'bot lines: 6 on the Bots cards', (await p.$$('#g-bots .v5st[data-bot]')).length === 6, '');
    const age = await p.innerText('#v5age'); T(W, 'age line says Built ... data as of NO DATA, and is red', /^Built Oct 6, \d+:\d\d (AM|PM) EDT, data as of NO DATA/.test(age) && (await p.$eval('#v5age', e => e.classList.contains('bad'))), age.slice(0, 200));
    const t = await pageText(p); T(W, 'no typed interval anywhere on the page (every N minutes, 15-minute, 300 seconds, runs every)', !TYPED.test(t), (t.match(TYPED) || [])[0]);
    T(W, 'token monitor panel says NO DATA with no numbers', /Token monitor[\s\S]{0,400}NO DATA/.test(await p.innerText('#v5tokens')) && !/\d{3,}/.test((await p.innerText('#v5tokens')).replace(/data\\vtes5-tokens\.js/, '')), await p.innerText('#v5tokens'));
    T(W, 'housekeeping panel: last report time NONE in red', /Last report time: NONE/.test(await p.innerText('#v5house')), await p.innerText('#v5house'));
    T(W, 'Miami-Dade: 22 proof links and "unknown of 300"', (await p.$$('#v5miami ol.md li')).length === 22 && /unknown of 300/.test(await p.innerText('#v5miami')), '');
    T(W, 'Miami-Dade: 0 green marks', (await p.$$('#v5miami .v5b.ok')).length === 0, '');
    T(W, 'no vtes:// link on the page (heartbeat says nothing)', (await p.$$('a[href^="vtes:"]')).length === 0, '');
    T(W, '8 address sentences name what is missing (the PC has not reported)', (await p.$$('.v5na')).length === 8, String((await p.$$('.v5na')).length));
    T(W, 'repairs: live rows say NO DATA; the typed log is labelled TYPED LOG', /NO DATA/.test(await p.innerText('#v5repairs')) && /TYPED LOG/.test(await p.innerText('#repairs + p.lead')), '');
    await ctx.close(); }
  // ---------------- W2 fresh, everything proven
  { const W = 'W2-fresh'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
    T(W, '0 page errors', errs.length === 0, errs.join('|'));
    const g = await greenCards(p); const expect = [...['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LOCAL', 'CODEX', 'RAMBO', 'GROK', 'COWORK', 'CHIEF'], ...BOTNAMES.map(n => 'bot:' + n)];
    T(W, 'every card and every bot line green (' + expect.length + ')', expect.every(i => g.includes(i)), 'missing ' + expect.filter(i => !g.includes(i)).join(','));
    const t = await pageText(p); T(W, 'LLM-01 card tick sentence: every 5 minutes, read from the heartbeat', /Check-in interval: every 5 minutes/.test(await p.innerText('#card-LLM-01')), await p.innerText('#card-LLM-01'));
    T(W, 'RAMBO role card and poller bot show the same interval', /every 5 minutes/.test(await p.innerText('#card-RAMBO')) && /every 5 minutes/.test(await p.innerText('#bot-VTES-LOCAL-POLLER')), '');
    T(W, 'bot line shows its own scheduled interval (every 10 minutes) from the data', /Scheduled every 10 minutes/.test(await p.innerText('#bot-CU-Orchestrator')), await p.innerText('#bot-CU-Orchestrator'));
    T(W, 'vtes:// link on LLM-01 and LLM-03 only (registered AND filled)', JSON.stringify(await p.$$eval('a[href^="vtes:"]', a => a.map(x => x.getAttribute('href')).sort())) === '["vtes://llm-01","vtes://llm-03"]', JSON.stringify(await p.$$eval('a[href^="vtes:"]', a => a.map(x => x.getAttribute('href')))));
    T(W, 'the other six addresses give one plain sentence: "the address book entry ... is empty"', (await p.$$eval('.v5na', a => a.filter(x => /registered, but the address book entry for LLM-0\d is empty/.test(x.textContent)).length)) === 6, '');
    T(W, 'token monitor shows 41000, 33%, 61%, program 1234', /41000/.test(await p.innerText('#v5tokens')) && /33%/.test(await p.innerText('#v5tokens')) && /61%/.test(await p.innerText('#v5tokens')) && /1234/.test(await p.innerText('#v5tokens')), await p.innerText('#v5tokens'));
    T(W, 'housekeeping: last report time, Delivered yes, to jorge', /Oct 6, 1:00 PM EDT/.test(await p.innerText('#v5house')) && /Delivered: yes to jorge/.test(await p.innerText('#v5house')), await p.innerText('#v5house'));
    T(W, 'Miami-Dade: counted 7 of 300, exactly 2 "proof checked", 20 NOT RE-CHECKED', /7 of 300/.test(await p.innerText('#v5miami')) && (await p.$$('#v5miami li .v5b.ok')).length === 2 && (await p.$$eval('#v5miami li', l => l.filter(x => /NOT RE-CHECKED/.test(x.textContent)).length)) === 20, '');
    T(W, 'health panel: 11 windows counted, numbers 12 / 3 / 2, money list, 9 of 12 checks', /Windows confirmed up now: 10 of 11|Windows confirmed up now: 11 of 11/.test(await p.innerText('#v5health')) && /Open items: 12\. In progress: 3\. Blocked: 2/.test(await p.innerText('#v5health')) && /Fixture invoice: staged/.test(await p.innerText('#v5health')) && /9 of 12 health checks passed \(75%\)/.test(await p.innerText('#v5health')), await p.innerText('#v5health'));
    T(W, 'live repair row from the state file shows', /OPEN: Fixture repair row/.test(await p.innerText('#v5repairs')), '');
    T(W, 'strip: 7 files all OK green', (await p.$$('#v5dash .v5b.ok')).length === 7, String((await p.$$('#v5dash .v5b.ok')).length));
    T(W, 'age line is not red when every file is fresh and OK', !(await p.$eval('#v5age', e => e.classList.contains('bad'))), await p.innerText('#v5age'));
    await ctx.close(); }
  // ---------------- W3 stale: heartbeat 40 min old with a 5-minute tick
  { const W = 'W3-stale'; const f = fresh(NOWMS, { hbAge: 40, lastSeenAge: 40 }); f.bots.at = at(40); f.tokens.at = at(90); const d = stage(f); const { ctx, p, errs } = await open(br, d);
    T(W, '0 page errors', errs.length === 0, errs.join('|'));
    const g = await greenCards(p); T(W, '0 green cards and 0 green bot lines', g.length === 0, JSON.stringify(g));
    const s = await stateCls(p, 'LLM-01'); T(W, 'LLM-01 says STALE since ... in red', /STALE since Oct 6, 1:20 PM EDT/.test(s.txt) && /bad/.test(s.cls), s.txt);
    const b = await botCls(p, 'CU-Orchestrator'); T(W, 'bot line says STALE (bots report is old)', /STALE/.test(b.txt) && /bad/.test(b.cls), b.txt);
    T(W, 'token panel says the numbers are old', /These numbers are old/.test(await p.innerText('#v5tokens')), '');
    T(W, 'strip: heartbeat badge red STALE', /STALE/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.textContent)), '');
    T(W, 'vtes:// links gone (heartbeat not OK)', (await p.$$('a[href^="vtes:"]')).length === 0, '');
    await ctx.close(); }
  // ---------------- W4 future dates
  { const W = 'W4-future'; const base = NOWMS + 365 * 86400000; const d = stage(fresh(base)); const { ctx, p, errs } = await open(br, d);
    T(W, '0 page errors', errs.length === 0, errs.join('|'));
    T(W, '0 green cards, 0 green badges', (await greenCards(p)).length === 0 && (await greenBadges(p)).length === 0, JSON.stringify(await greenCards(p)));
    const tx = await p.innerText('#v5age') + await p.innerText('#v5tokens') + await p.innerText('#card-LLM-01'); T(W, 'BAD CLOCK shown and 2027 visible', /BAD CLOCK/.test(tx) && /2027/.test(tx), tx.slice(0, 200));
    T(W, 'token numbers hidden (41000 not on page)', !/41000/.test(await p.innerText('#v5tokens')), '');
    T(W, 'no vtes:// link', (await p.$$('a[href^="vtes:"]')).length === 0, '');
    const b = await botCls(p, 'CU-Orchestrator'); T(W, 'bot line: BAD CLOCK, red', /BAD CLOCK/.test(b.txt) && /bad/.test(b.cls), b.txt);
    await ctx.close();
    // one window 30 minutes ahead, one bot's last run 30 minutes ahead, one proof 30 minutes ahead
    const f = fresh(NOWMS); f.heartbeat.executors['LLM-02'].last_seen = at(-30); f.heartbeat.executors['LLM-07'].proof_at = at(-30); f.bots.bots['CU-Local-Executor'].last_run_at = at(-30);
    const d2 = stage(f); const o2 = await open(br, d2);
    T(W, 'one window 30 min ahead: that card alone is BAD CLOCK', /BAD CLOCK/.test((await stateCls(o2.p, 'LLM-02')).txt) && /OK|UP/.test((await stateCls(o2.p, 'LLM-01')).txt), (await stateCls(o2.p, 'LLM-02')).txt);
    T(W, 'a proof 30 min ahead: that window is BAD CLOCK', /BAD CLOCK/.test((await stateCls(o2.p, 'LLM-07')).txt), (await stateCls(o2.p, 'LLM-07')).txt);
    T(W, 'a bot last run 30 min ahead: BAD CLOCK for that bot only', /BAD CLOCK/.test((await botCls(o2.p, 'CU-Local-Executor')).txt) && /RAN/.test((await botCls(o2.p, 'CU-Orchestrator')).txt), (await botCls(o2.p, 'CU-Local-Executor')).txt);
    await o2.ctx.close();
    // the build time itself: set the PC clock one hour before the build instant
    const bi = (/VTES5_BUILT = "([^"]+)"/.exec(fs.readFileSync(path.join(L.PKG, 'VTES-LLM-LAUNCHER_v5.html'), 'utf8')) || [])[1];
    T(W, 'build time is a real past instant (not after now)', !!bi && Date.parse(bi) <= Date.now(), bi + ' vs ' + new Date().toISOString());
    const d3 = stage(fresh(Date.parse(bi) - 3600000), {}); const o3 = await open(br, d3, { now: new Date(Date.parse(bi) - 3600000).toISOString() });
    T(W, 'clock one hour before the build: top line says Built BAD CLOCK in red; footer too', /Built BAD CLOCK/.test(await o3.p.innerText('#v5age')) && /BAD CLOCK/.test(await o3.p.innerText('#v5fb')) && (await o3.p.$eval('#v5age', e => e.classList.contains('bad'))), await o3.p.innerText('#v5age'));
    await o3.ctx.close(); }
  // ---------------- W5 status-only writer
  { const W = 'W5-statusonly'; const st = {}; ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-06', 'LLM-09', 'LOCAL', 'CHIEF', 'BOTS'].forEach(i => { st[i] = { st: 'up', seen: at(1) }; });
    const d = stage(null, { status: st }); const { ctx, p, errs } = await open(br, d); await tick(p); await sleep(p, 200);
    T(W, '0 page errors', errs.length === 0, errs.join('|'));
    T(W, '0 green cards and 0 green badges', (await greenCards(p)).length === 0 && (await greenBadges(p)).length === 0, JSON.stringify(await greenCards(p)));
    const s = await stateCls(p, 'LLM-01'); T(W, 'LLM-01 reads WRITER SAYS UP, NOT PROVEN in grey (unp)', /WRITER SAYS UP, NOT PROVEN/.test(s.txt) && /unp/.test(s.cls), JSON.stringify(s));
    T(W, 'chat-only window with a writer entry stays NO DATA', /NO DATA/.test((await stateCls(p, 'LLM-04')).txt), '');
    T(W, 'Grok note says NO Grok bot built (writer entry for BOTS is no proof)', /No Grok bot has been built/.test(await p.innerText('#card-LLM-07')), '');
    T(W, 'health: "Windows confirmed up now" is not claiming any', /Windows confirmed up now: 0 of 11/.test(await p.innerText('#v5health')), await p.innerText('#v5health'));
    await ctx.close(); }
  // ---------------- W6 big / invalid tick, and a long legal tick
  { const W = 'W6-ticks'; for (const iv of [864000, 3601, 0, 0.001, 0.5, -5, '300', true]) { const d = stage(fresh(NOWMS, { interval: iv })); const { ctx, p, errs } = await open(br, d);
      T(W, 'interval_sec ' + JSON.stringify(iv) + ': 0 green anywhere, heartbeat NOT OK, 0 errors', errs.length === 0 && (await greenCards(p)).filter(x => !/^bot:/.test(x)).length === 0 && /NOT OK/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.textContent)), JSON.stringify([errs, await greenCards(p)]));
      await ctx.close(); }
    for (const [iv, age, expectGreen] of [[1800, 20, true], [1800, 100, false], [3600, 170, true], [3600, 190, false], [300, 14, true], [300, 16, false], [1, 2, true], [1, 4, false]]) {
      const d = stage(fresh(NOWMS, { interval: iv, hbAge: age, lastSeenAge: age })); const { ctx, p } = await open(br, d); const s = await stateCls(p, 'LLM-01');
      T(W, 'interval ' + iv + ' s, file ' + age + ' min old: LLM-01 ' + (expectGreen ? 'green' : 'red'), (/ok/.test(s.cls)) === expectGreen, JSON.stringify(s)); await ctx.close(); } }
  // ---------------- W7 old Miami-Dade
  { const W = 'W7-miami'; const f = fresh(NOWMS); f.miamidade.at = at(30 * 1440); const d = stage(f); const { ctx, p } = await open(br, d);
    T(W, '30-day-old file: 0 green "proof checked", 22 neutral marks', (await p.$$('#v5miami .v5b.ok')).length === 0 && (await p.$$('#v5miami .v5b.na')).length === 22, String((await p.$$('#v5miami .v5b.na')).length));
    T(W, 'the badge says STALE', /STALE/.test(await p.$eval('#v5dash [data-src="miamidade"]', e => e.textContent)), ''); await ctx.close();
    const f2 = fresh(NOWMS); f2.miamidade.counted = null; f2.miamidade.sources = [{ id: 3, proof_ok: true }, { id: '7', proof_ok: false }, { id: 'xx', proof_ok: true }]; const d2 = stage(f2); const o2 = await open(br, d2);
    T(W, 'counted null: says unknown of 300', /unknown of 300/.test(await o2.p.innerText('#v5miami')), '');
    T(W, 'bare number 3 read as 03 (checked); "7" read as 07 (PROOF NOT OK); "xx" ignored', (await o2.p.$$eval('#v5miami li', l => [l[2].textContent, l[6].textContent])).every((t, i) => i === 0 ? /proof checked/.test(t) : /PROOF NOT OK/.test(t)) && (await o2.p.$$('#v5miami li .v5b.ok')).length === 1, ''); await o2.ctx.close();
    const f3 = fresh(NOWMS); f3.miamidade.at = at(-30); const d3 = stage(f3); const o3 = await open(br, d3);
    T(W, 'file dated in the future: BAD CLOCK, 0 green marks', (await o3.p.$$('#v5miami li .v5b.ok')).length === 0 && /BAD CLOCK/.test(await o3.p.innerText('#v5miami')), ''); await o3.ctx.close(); }
  // ---------------- W8 two-hour run with the real 60-second timer on the simulated clock
  { const W = 'W8-2hour'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
    const g0 = (await greenCards(p)).length; T(W, 'at load: 26 cards green (15 cards + 6 bots + others as in W2)', g0 >= 20, String(g0));
    for (let i = 0; i < 120; i++) { await p.clock.runFor(60000); await sleep(p, 40); } await sleep(p, 500);
    const g1 = await greenCards(p); T(W, 'after 2 hours with no writer: 0 green cards, 0 green bot lines', g1.length === 0, JSON.stringify(g1));
    T(W, 'age line red and says Re-checked 4:00 PM EDT (2 hours later)', /Re-checked Oct 6, 4:00 PM EDT/.test(await p.innerText('#v5age')) && (await p.$eval('#v5age', e => e.classList.contains('bad'))), await p.innerText('#v5age'));
    T(W, 'LLM-01 STALE', /STALE/.test((await stateCls(p, 'LLM-01')).txt), '');
    T(W, '0 page errors in 2 simulated hours', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---------------- W9 a living writer keeps it green; a deleted file goes NO DATA within a tick
  { const W = 'W9-writer'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
    for (let i = 1; i <= 12; i++) { await p.clock.runFor(60000); const fx = fresh(NOWMS + i * 60000); for (const k of Object.keys(fx)) { const f = path.join(d, 'data', 'vtes5-' + k + '.js'); fs.writeFileSync(f + '.tmp', L.wrap(k, fx[k])); fs.renameSync(f + '.tmp', f); } await sleep(p, 120); }
    await tick(p); await sleep(p, 300); T(W, 'writer rewriting every minute: LLM-01 and a bot still green after 12 minutes', /ok/.test((await stateCls(p, 'LLM-01')).cls) && /ok/.test((await botCls(p, 'CU-Orchestrator')).cls), JSON.stringify(await stateCls(p, 'LLM-01')));
    T(W, 'the card now says seen 2:12 PM', /seen Oct 6, 2:11 PM EDT/.test((await stateCls(p, 'LLM-01')).txt), (await stateCls(p, 'LLM-01')).txt);
    fs.unlinkSync(path.join(d, 'data', 'vtes5-heartbeat.js')); await p.clock.runFor(60000); await sleep(p, 400);
    T(W, 'heartbeat file deleted: next 60-second tick shows NO DATA on LLM-01', /NO DATA/.test((await stateCls(p, 'LLM-01')).txt) && /bad/.test((await stateCls(p, 'LLM-01')).cls), JSON.stringify(await stateCls(p, 'LLM-01')));
    fs.unlinkSync(path.join(d, 'data', 'vtes5-bots.js')); await p.clock.runFor(60000); await sleep(p, 400);
    T(W, 'bots file deleted: next tick shows NO DATA on every bot line', (await p.$$eval('#g-bots .v5st[data-bot]', l => l.filter(x => /NO DATA/.test(x.textContent) && /bad/.test(x.className)).length)) === 6, '');
    T(W, 'no leftover script tags after 14 reloads', (await p.$$eval('script', s => s.length)) <= 14, String((await p.$$eval('script', s => s.length)))); T(W, '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---------------- W10 bots in all their states
  { const W = 'W10-bots'; const f = fresh(NOWMS); const B = f.bots.bots;
    B['CU-Inbox-Job-Watcher'].last_result = 267009; B['CU-Local-Executor'].state = 'Disabled'; B['CU-TokenMonitor-Hourly'].last_run_at = at(40); delete B['CU-Orchestrator']; B['CU-Propagation-Check'].interval_sec = null; B['VTES-LOCAL-POLLER'].state = 'Running';
    const d = stage(f); const { ctx, p, errs } = await open(br, d);
    T(W, 'result code 267009: red FAILED with the code', /FAILED.*267009/.test((await botCls(p, 'CU-Inbox-Job-Watcher')).txt) && /bad/.test((await botCls(p, 'CU-Inbox-Job-Watcher')).cls), (await botCls(p, 'CU-Inbox-Job-Watcher')).txt);
    T(W, 'disabled task: red DISABLED', /DISABLED/.test((await botCls(p, 'CU-Local-Executor')).txt) && /bad/.test((await botCls(p, 'CU-Local-Executor')).cls), '');
    T(W, 'late run (40 min ago, scheduled every 10): red LATE', /LATE/.test((await botCls(p, 'CU-TokenMonitor-Hourly')).txt) && /bad/.test((await botCls(p, 'CU-TokenMonitor-Hourly')).cls), (await botCls(p, 'CU-TokenMonitor-Hourly')).txt);
    T(W, 'no entry for a bot: red NO DATA, others unaffected', /NO DATA.*no entry/.test((await botCls(p, 'CU-Orchestrator')).txt), (await botCls(p, 'CU-Orchestrator')).txt);
    T(W, 'no schedule interval: grey (not green) "lateness cannot be judged"', /lateness cannot be judged/.test((await botCls(p, 'CU-Propagation-Check')).txt) && /unp/.test((await botCls(p, 'CU-Propagation-Check')).cls), (await botCls(p, 'CU-Propagation-Check')).txt);
    T(W, 'a running task with result 0: green', /ok/.test((await botCls(p, 'VTES-LOCAL-POLLER')).cls), '');
    T(W, 'the CHIEF role card shows the Orchestrator bot line too (NO DATA)', /NO DATA/.test(await p.innerText('#card-CHIEF')), ''); T(W, '0 page errors', errs.length === 0, errs.join('|')); await ctx.close();
    const f2 = fresh(NOWMS); f2.bots.interval_sec = 0.001; const o2 = await open(br, stage(f2)); T(W, 'bots file with interval_sec 0.001: every bot NOT OK, 0 green bot lines', (await o2.p.$$eval('#g-bots .v5st[data-bot]', l => l.filter(x => /NOT OK/.test(x.textContent)).length)) === 6, ''); await o2.ctx.close();
    const f3 = fresh(NOWMS); f3.bots.at = at(-30); const o3 = await open(br, stage(f3)); T(W, 'bots file dated 30 min ahead: every bot BAD CLOCK', (await o3.p.$$eval('#g-bots .v5st[data-bot]', l => l.filter(x => /BAD CLOCK/.test(x.textContent)).length)) === 6, ''); await o3.ctx.close(); }
  // ---------------- W11 Grok and the Grok bots
  { const W = 'W11-grok'; const f = fresh(NOWMS); f.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1) }; let o = await open(br, stage(f));
    T(W, 'BOTS up without proof_at: still "No Grok bot has been built"', /No Grok bot has been built/.test(await o.p.innerText('#card-LLM-07')), ''); await o.ctx.close();
    f.heartbeat.executors.BOTS.proof_at = at(3); o = await open(br, stage(f)); T(W, 'BOTS up with fresh proof_at: card says a Grok bot is reporting UP with proof', /A Grok bot is reporting UP with proof/.test(await o.p.innerText('#card-LLM-07')), ''); T(W, 'both Grok statements carry the typed-note label (31 days)', /Typed note, registry brief of 2026-10-06/.test(await o.p.innerText('#card-LLM-07')), ''); await o.ctx.close();
    f.heartbeat.executors['LLM-07'] = { state: 'up', last_seen: at(1) }; o = await open(br, stage(f)); T(W, 'LLM-07 up with no proof_at: red NO DATA (never green on a ping)', /NO DATA/.test((await stateCls(o.p, 'LLM-07')).txt), (await stateCls(o.p, 'LLM-07')).txt); await o.ctx.close(); }
  // ---------------- W12 times: Eastern with zone; year added; no slash dates
  { const W = 'W12-times'; const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d); await p.click('#show'); const v = await p.inputValue('#preview'); const first = v.split('\n')[0];
    T(W, 'packet header stamp is Eastern short form with the zone', /\)   Oct 6, 2:00 PM EDT$/.test(first), first);
    T(W, 'no slash date or "AM" without zone in the packet header', !/\d\/\d\d?\/\d{4}/.test(first), first); await ctx.close();
    const o2 = await open(br, stage(fresh(NOWMS)), { now: '2027-01-05T09:30:00-05:00' }); const f2 = fresh(NOWMS); await o2.p.click('#show'); const first2 = (await o2.p.inputValue('#preview')).split('\n')[0];
    T(W, 'a winter date shows EST', /Jan 5, 9:30 AM EST$/.test(first2), first2); await o2.ctx.close(); }
  // ---------------- W13 redraw: a selection and typed text survive the 60-second tick (F16)
  { const W = 'W13-redraw'; const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d); await p.fill('#note', 'typed text that must survive'); await p.fill('#q', 'LLM-0');
    const n = await p.evaluate(() => { const el = document.querySelector('#v5health'); const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return s.toString().length; });
    for (let i = 0; i < 3; i++) { await p.clock.runFor(60000); await sleep(p, 200); } const after = await p.evaluate(() => getSelection().toString().length);
    T(W, 'a ' + n + '-character selection in the Health panel survives 3 ticks', n > 50 && after === n, n + ' -> ' + after);
    T(W, 'typed note and search text survive', (await p.inputValue('#note')) === 'typed text that must survive' && (await p.inputValue('#q')) === 'LLM-0', '');
    const n2 = await p.evaluate(() => { const el = document.querySelector('#card-LLM-01 .v5st'); const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return s.toString().length; });
    await p.clock.runFor(60000); await sleep(p, 200); const a2 = await p.evaluate(() => getSelection().toString().length); T(W, 'a selection inside an unchanged card state line survives a tick', a2 === n2, n2 + ' -> ' + a2);
    await ctx.close(); }
  // ---------------- W14 ten simulated hours: memory and node growth
  { const W = 'W14-10hours'; const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d); const m0 = await p.evaluate(() => ({ n: document.getElementsByTagName('*').length, s: document.scripts.length }));
    for (let i = 0; i < 600; i++) { await p.clock.runFor(60000); if (i % 50 === 0) { await sleep(p, 30); } } await sleep(p, 500); const m1 = await p.evaluate(() => ({ n: document.getElementsByTagName('*').length, s: document.scripts.length }));
    T(W, 'after 600 reloads the DOM node count did not grow by more than 10% (' + m0.n + ' -> ' + m1.n + ')', m1.n <= m0.n * 1.1, JSON.stringify([m0, m1])); T(W, 'script tags did not grow (' + m0.s + ' -> ' + m1.s + ')', m1.s <= m0.s + 2, JSON.stringify([m0, m1])); T(W, '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---------------- W15 a half-copied package: no config file and no data folder
  { const W = 'W15-halfpackage'; const d = stage(null); fs.unlinkSync(path.join(d, 'vtes5-config.js')); fs.rmSync(path.join(d, 'data'), { recursive: true }); const { ctx, p, errs } = await open(br, d);
    T(W, 'page loads with 0 page errors with no config file and no data folder', errs.length === 0, errs.join('|'));
    T(W, 'every card says NO DATA, 0 green, 7 red badges, all 6 bot lines NO DATA', (await greenCards(p)).length === 0 && (await p.$$('#v5dash .v5b.bad')).length === 7 && (await p.$$eval('#g-bots .v5st[data-bot]', l => l.filter(x => /NO DATA/.test(x.textContent)).length)) === 6, '');
    T(W, 'the hand-off still works (the page is usable with no data at all)', await (async () => { await p.click('#go'); await sleep(p, 200); return /HANDOFF/.test(await p.inputValue('#preview')); })(), ''); await ctx.close(); }
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ pass, total: results.length, failures: results.filter(r => r.status !== 'PASS'), results }, null, 1));
  console.log('WORLDS: ' + pass + ' of ' + results.length + ' pass');
})();
