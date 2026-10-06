// test-fixes-r5.js - one before/after test per page flaw fixed in fix round 5 (N1 N2 N3 N10 N11 N12 N13 N14 N15 N16 N17 and the page part of F14). TRK-2026-9910-B.
// Usage: PKG=<package folder> node test-fixes-r5.js <out.json>. Run once on the round-4 package (the tests must FAIL there, except the controls) and once on the fixed package (all must pass).
// The worlds are the ones the independent checker (CHECK-6) described: allBotsFail, allDown, hung, housekeeping 40 days old and dated in the future, health 2 of 10 with a June report and 14 of 10,
// Miami-Dade 450 of 300 and -3 of 300, tokens -5 per hour and 250 percent, a LOCAL note with a fake Social Security number, a Queued task, 11 window sizes.
const L = require('./test-v5-lib.js'); const { fs, path, NOWMS, at, fresh, stage, open, sleep, botCls, stateCls } = L;
const OUT = process.argv[2] || 'test-fixes-r5-RESULT.json'; const res = [];
const T = (id, name, ok, why) => { res.push({ id, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); console.log((ok ? 'PASS ' : 'FAIL ') + id + ' | ' + name + (ok ? '' : ' | ' + String(why).slice(0, 220))); };
/* ROUND 7 CHANGE (FIX-ROUND-7.md, older tests that changed): every non-LOCAL route needs the confirmation tick. These N10 tests play a person who TICKS BY MISTAKE, so they still test the digit guard (the second layer). `tickFor` ticks the box for the destination. The no-tick case is tested by test-privacy-matrix-r7.js. */
const tickFor = (p, to) => p.evaluate(to => { const s = document.getElementById('to'); if (to) { s.value = to; s.dispatchEvent(new Event('change', { bubbles: true })); } const c = document.getElementById('v5ack'); if (c) { c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); } }, to);
const stubCopy = p => p.evaluate(() => { window.__clip = null; document.execCommand = function (c) { if (c === 'copy') { var a = document.activeElement; window.__clip = a && a.value; return true; } return false; }; });
const SSN = '123-45-6789', NOTE = 'SSN ' + SSN + ' client Jane Doe, please classify';
const setNote = (p, t) => p.evaluate(t => { const n = document.getElementById('note'); n.value = t; n.dispatchEvent(new Event('input', { bubbles: true })); }, t);
/* ROUND 7 CHANGE: the packet for a non-LOCAL destination is built only after the confirmation tick; this helper ticks it (a person who ticks by mistake), so the digit guard is still what is tested. */
const packetFor = (p, to) => p.evaluate(to => { const s = document.getElementById('to'); s.value = to; s.dispatchEvent(new Event('change', { bubbles: true })); s.dispatchEvent(new Event('input', { bubbles: true })); const c = document.getElementById('v5ack'); if (c) { c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); } return document.getElementById('preview').value; }, to);
/* ROUND 7 CHANGE: the strip labels are plain words now (jargon rule), so the tests look the entry up by its plain label */
const LBL = { heartbeat: 'window check-in', state: 'open items', health: 'health', tokens: 'token use', miamidade: 'Miami-Dade', bots: 'bots', housekeeping: 'housekeeping' };
const stripBadge = (p, name) => p.$$eval('#v5dash span', (e, n) => e.filter(x => x.textContent.indexOf(n + ':') === 0).map(x => x.innerHTML), LBL[name] || name);
const isGreen = h => /v5b ok/.test(h.join(''));
const stripCls = async (p, name) => { const h = await stripBadge(p, name); return /v5b ok/.test(h.join('')) ? 'ok' : /v5b bad/.test(h.join('')) ? 'bad' : /v5b na/.test(h.join('')) ? 'na' : 'none'; };
const stripTxt = async (p, name) => (await p.$$eval('#v5dash span', (e, n) => e.filter(x => x.textContent.indexOf(n + ':') === 0).map(x => x.textContent), LBL[name] || name)).join(' ');
const badgeOf = (p, sel) => p.$$eval(sel + ' .v5b[data-src]', e => e.map(x => x.className + ' | ' + x.textContent));
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // ================= N10: LOCAL never routes client personal data through Claude
  { const { ctx, p, errs } = await open(br, stage(fresh(NOWMS))); await stubCopy(p); await setNote(p, NOTE);
    // the steps on the LOCAL card
    const steps = await p.$$eval('#card-LOCAL .v5steps li', e => e.map(x => x.textContent));
    /* ROUND 7 CHANGE: lines that start "For RAMBO:" are notes for the desktop executor, shown small and italic and marked as such (jargon rule); they are not instructions to the person, so they are skipped here. */
    const tell = steps.filter(x => !/^(Do NOT|For RAMBO:)/.test(x) && /RAMBO|Claude|Cowork|Codex|Grok|blue/i.test(x));
    T('N10', 'LOCAL card: no step tells the user to use the blue RAMBO button or any Claude, Cowork, Codex or Grok window (only "Do NOT" lines may name them)', steps.length > 0 && tell.length === 0, tell.join(' || '));
    T('N10', 'LOCAL card: the steps do say not to hand the packet to a Claude window', steps.some(x => /^Do NOT/.test(x) && /Claude/.test(x)), steps.join(' || '));
    // LOCAL packet carries the note, addressed to LOCAL
    await p.click('#card-LOCAL button.bigcopy'); await sleep(p, 300); const clip = await p.evaluate(() => window.__clip);
    T('N10', 'the LOCAL button copies a packet addressed to LOCAL that carries the note (the job is private and must carry it)', !!clip && /->  LOCAL \(/.test(clip.split('\n')[0]) && clip.indexOf(SSN) >= 0, String(clip).slice(0, 120));
    // every other destination: no packet carries the number
    const tos = await p.$$eval('#to option', e => e.map(o => o.value)); const carry = [];
    for (const to of tos) { const pk = await packetFor(p, to); if (pk.indexOf(SSN) >= 0) { carry.push(to); } }
    T('N10', 'with the fake Social Security number in the note, the packet for LOCAL carries it and the packets for the other ' + (tos.length - 1) + ' destinations do not (' + tos.length + ' destinations tried)', tos.indexOf('LOCAL') >= 0 && carry.length === 1 && carry[0] === 'LOCAL', 'carrying: ' + carry.join(','));
    const claude = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'RAMBO', 'CODEX', 'LLM-06', 'LLM-07', 'GROK', 'LLM-08']; const leak = [];
    for (const to of claude) { if ((await packetFor(p, to)).indexOf(SSN) >= 0) { leak.push(to); } }
    T('N10', 'no packet addressed to LLM-01 (RAMBO), any Claude window, COWORK, CODEX, GROK or Gemini carries the number (' + claude.length + ' tried)', leak.length === 0, 'leaking: ' + leak.join(','));
    // every big copy button, in the order a user could press them after LOCAL
    const btns = await p.$$eval('button.bigcopy', e => e.map(b => ({ to: b.getAttribute('data-paste'), role: b.getAttribute('data-role') }))); const bl = [];
    for (let i = 0; i < btns.length; i++) { await stubCopy(p); await tickFor(p, btns[i].to); await p.evaluate(i => document.querySelectorAll('button.bigcopy')[i].click(), i); await sleep(p, 250); const c = await p.evaluate(() => window.__clip); if (c && c.indexOf(SSN) >= 0 && btns[i].to !== 'LOCAL') { bl.push(btns[i].to); } }
    T('N10', 'pressing each of the ' + btns.length + ' big copy buttons with the number in the note: only the LOCAL button puts it in the clipboard', bl.length === 0, 'leaking buttons: ' + bl.join(','));
    // the top RAMBO button
    await stubCopy(p); await tickFor(p, 'LLM-01'); await p.click('#v5rambobtn'); await sleep(p, 250); const rc = await p.evaluate(() => window.__clip);
    T('N10', 'the blue RAMBO button at the top (the one the old LOCAL steps pointed at) copies a packet to LLM-01 WITHOUT the number', !!rc && /->  LLM-01 \(/.test(rc.split('\n')[0]) && rc.indexOf(SSN) < 0, String(rc).slice(0, 100));
    // "Copy packet and open" for each destination
    const gl = []; for (const to of tos) { await p.evaluate(to => { const s = document.getElementById('to'); s.value = to; s.dispatchEvent(new Event('input', { bubbles: true })); }, to); await stubCopy(p); await p.evaluate(() => { window.open = () => null; }); await tickFor(p, to); await p.click('#go'); await sleep(p, 250); const c = await p.evaluate(() => window.__clip); if (c && c.indexOf(SSN) >= 0 && to !== 'LOCAL') { gl.push(to); } }
    T('N10', '"Copy packet and open" for every destination: the number is copied only for LOCAL', gl.length === 0, gl.join(','));
    // the line printed after "Copy packet and open" for LOCAL
    await p.evaluate(() => { const s = document.getElementById('to'); s.value = 'LOCAL'; s.dispatchEvent(new Event('input', { bubbles: true })); }); await p.click('#go'); await sleep(p, 250); const st = await p.innerText('#status');
    T('N10', 'the line after "Copy packet and open" for LOCAL does not point at RAMBO or a Claude window as the way to do the job', !/(blue RAMBO button|hand the packet to the desktop executor)/i.test(st) && /Do not give this packet to any Claude window/.test(st), st);
    // GROK, CODEX, COWORK role cards must not route through the blue RAMBO button either
    for (const id of ['GROK', 'CODEX', 'COWORK']) { const t = await p.$$eval('#card-' + id + ' .v5steps li', e => e.map(x => x.textContent)); T('N10', id + ' card: no step says to use the blue RAMBO button', t.length > 0 && !t.some(x => /blue RAMBO button/i.test(x)), t.join(' || ')); }
    T('N10', 'GROK card: no step routes the packet through RAMBO at all', !(await p.$$eval('#card-GROK .v5steps li', e => e.map(x => x.textContent))).some(x => /RAMBO/.test(x)), '');
    // control: ordinary notes are untouched
    for (const ok of ['Check permit 123 and call 305-555-0100 about folio 01-4120-001-0010', 'Order 12345', 'unit 143, 2026-10-06']) { await setNote(p, ok); const pk = await packetFor(p, 'LLM-01'); T('N10', 'control: the note "' + ok + '" is still carried to LLM-01 unchanged', pk.indexOf(ok) >= 0, ''); }
    for (const bad of ['ssn 123456789 for the client', 'social security: 123 45 6789', 'Social Security number 123456789']) { await setNote(p, bad); const pk = await packetFor(p, 'LLM-01'); T('N10', 'the note "' + bad + '" is left out of the packet for LLM-01 and the packet says why', pk.indexOf('NOT INCLUDED') >= 0 && !/123.?45.?6789|123456789/.test(pk), pk.slice(200, 400)); }
    T('N10', '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); }

  // ================= N1: the strip and the heartbeat badge are green only when the content says good
  { // control: the good world
    const o0 = await open(br, stage(fresh(NOWMS)));
    T('N1', 'control: good data: bots and heartbeat strip entries are green', (await stripCls(o0.p, 'bots')) === 'ok' && (await stripCls(o0.p, 'heartbeat')) === 'ok', (await stripTxt(o0.p, 'bots')) + ' | ' + (await stripTxt(o0.p, 'heartbeat'))); await o0.ctx.close();
    const f = fresh(NOWMS); Object.keys(f.bots.bots).forEach(n => { f.bots.bots[n].last_result = 1; });
    const o = await open(br, stage(f)); const b = await stripCls(o.p, 'bots'), bt = await stripTxt(o.p, 'bots'); const reds = await o.p.$$eval('.v5st[data-bot].bad', e => e.length);
    T('N1', 'world allBotsFail: all six bots show red FAILED lines', reds === 6, 'red bot lines: ' + reds);
    T('N1', 'world allBotsFail: the strip entry "bots" is RED (never green "OK" above six FAILED bots)', b === 'bad' && !/bots: OK/.test(bt), bt);
    T('N1', 'world allBotsFail: the strip says how many bots are not fine ("6 of 6")', /6 of 6/.test(bt), bt);
    T('N1', 'world allBotsFail: the age line says at least one file is not OK', /At least one data file or card is missing, stale, in the future or not OK/.test(await o.p.innerText('#v5age')), await o.p.innerText('#v5age')); await o.ctx.close();
    const f1 = fresh(NOWMS); f1.bots.bots['CU-Orchestrator'].last_result = 1; const o1 = await open(br, stage(f1)); T('N1', 'one failed bot out of six: the strip entry is red', (await stripCls(o1.p, 'bots')) === 'bad', await stripTxt(o1.p, 'bots')); await o1.ctx.close();
    const f2 = fresh(NOWMS); f2.bots.bots['CU-Orchestrator'].state = 'Disabled'; const o2 = await open(br, stage(f2)); T('N1', 'one disabled bot: the strip entry is red', (await stripCls(o2.p, 'bots')) === 'bad', await stripTxt(o2.p, 'bots')); await o2.ctx.close();
    const f3 = fresh(NOWMS); delete f3.bots.bots['CU-Propagation-Check']; const o3 = await open(br, stage(f3)); T('N1', 'one bot missing from the bots file: the strip entry is red (NO DATA for that bot)', (await stripCls(o3.p, 'bots')) === 'bad', await stripTxt(o3.p, 'bots')); await o3.ctx.close();
    const f4 = fresh(NOWMS); f4.bots.bots['CU-Orchestrator'].last_result = 267009; f4.bots.bots['CU-Orchestrator'].state = 'Running'; f4.bots.bots['CU-Orchestrator'].last_run_at = at(1); const o4 = await open(br, stage(f4)); T('N1', 'one bot running now and none failed: the strip entry is grey, never green and not red', (await stripCls(o4.p, 'bots')) === 'na', await stripTxt(o4.p, 'bots')); await o4.ctx.close();
    // heartbeat
    const h = fresh(NOWMS); Object.keys(h.heartbeat.executors).forEach(i => { h.heartbeat.executors[i].state = 'down'; });
    const oh = await open(br, stage(h)); const hc = await stripCls(oh.p, 'heartbeat'), ht = await stripTxt(oh.p, 'heartbeat'); const downs = await oh.p.$$eval('.v5st[data-state].bad', e => e.length);
    T('N1', 'world allDown: the windows show red', downs >= 8, 'red windows: ' + downs);
    T('N1', 'world allDown: the heartbeat strip entry is RED, never green "OK"', hc === 'bad' && !/heartbeat: OK/.test(ht), ht);
    T('N1', 'world allDown: the badge in the Health panel line is not green either', !/v5b ok/.test(await oh.p.$eval('#v5dash', e => e.innerHTML.split('</span>').filter(x => /heartbeat/.test(x)).join(''))), '');
    await oh.ctx.close();
    const h2 = fresh(NOWMS); h2.heartbeat.executors['LLM-02'].state = 'down'; const oh2 = await open(br, stage(h2)); T('N1', 'one window down out of the rest: the heartbeat entry is red (round 6: never greener than the worst card)', (await stripCls(oh2.p, 'heartbeat')) === 'bad', await stripTxt(oh2.p, 'heartbeat')); await oh2.ctx.close();
    const h3 = fresh(NOWMS); h3.heartbeat.executors = {}; const oh3 = await open(br, stage(h3)); T('N1', 'a fresh heartbeat file that lists no window at all: red', (await stripCls(oh3.p, 'heartbeat')) === 'bad', await stripTxt(oh3.p, 'heartbeat')); await oh3.ctx.close(); }

  // ================= N3: stale, impossible or out-of-range content is never green (the checker's cases)
  { const cases = [
      ['housekeeping', 'last report 40 days old (Aug 27)', f => { f.housekeeping.last_report_at = at(40 * 24 * 60); }, '#pn-house', /OLD/],
      ['housekeeping', 'last report dated in the future (Oct 9)', f => { f.housekeeping.last_report_at = new Date(NOWMS + 3 * 86400000).toISOString(); }, '#pn-house', /BAD CLOCK/],
      ['housekeeping', 'items_cleaned is negative', f => { f.housekeeping.items_cleaned = -4; }, '#pn-house', /IMPOSSIBLE/],
      ['health', '2 of 10 checks passed with the daily report sent Jun 18', f => { f.health.checks_passed = 2; f.health.checks_total = 10; f.health.report_sent_at = '2026-06-18T12:00:00-04:00'; }, '#pn-health', /OLD/],
      ['health', '14 of 10 checks passed (140 percent)', f => { f.health.checks_passed = 14; f.health.checks_total = 10; }, '#pn-health', /IMPOSSIBLE/],
      ['health', 'daily report dated in the future', f => { f.health.report_sent_at = new Date(NOWMS + 3 * 86400000).toISOString(); }, '#pn-health', /BAD CLOCK/],
      ['health', '-1 of 10 checks passed', f => { f.health.checks_passed = -1; f.health.checks_total = 10; }, '#pn-health', /IMPOSSIBLE/],
      ['health', '0 of 10 checks passed', f => { f.health.checks_passed = 0; f.health.checks_total = 10; }, '#pn-health', /FAILING/],
      ['health', '2 of 10 checks passed with a report sent today (not impossible, but not good)', f => { f.health.checks_passed = 2; f.health.checks_total = 10; }, '#pn-health', /PARTIAL/, 'na'],
      ['miamidade', 'counted 450 of 300', f => { f.miamidade.counted = 450; }, '#pn-miami', /IMPOSSIBLE/],
      ['miamidade', 'counted -3 of 300', f => { f.miamidade.counted = -3; }, '#pn-miami', /IMPOSSIBLE/],
      ['miamidade', 'counted 7.5 of 300', f => { f.miamidade.counted = 7.5; }, '#pn-miami', /IMPOSSIBLE/],
      ['tokens', 'burn rate -5 tokens per hour', f => { f.tokens.burn_per_hour = -5; }, '#pn-tokens', /IMPOSSIBLE/],
      ['tokens', 'window used 250 percent', f => { f.tokens.window_used_pct = 250; }, '#pn-tokens', /IMPOSSIBLE/],
      ['tokens', 'week used -2 percent', f => { f.tokens.week_used_pct = -2; }, '#pn-tokens', /IMPOSSIBLE/],
      ['tokens', 'a program with -10 tokens today', f => { f.tokens.programs = [{ name: 'p', tokens_today: -10 }]; }, '#pn-tokens', /IMPOSSIBLE/],
      ['state', 'open_items is -1', f => { f.state.open_items = -1; }, '#pn-health', /IMPOSSIBLE/],
      ['state', 'blocked is 2.5', f => { f.state.blocked = 2.5; }, '#pn-health', /IMPOSSIBLE/] ];
    for (const [file, name, mut, panel, re, want] of cases) {
      const f = fresh(NOWMS); mut(f); const o = await open(br, stage(f)); const b = await badgeOf(o.p, panel), strip = await stripCls(o.p, file), stx = await stripTxt(o.p, file), mine = b.filter(x => new RegExp('data-src|').test(x));
      const my = (await o.p.$$eval(panel + ' .v5b[data-src="' + file + '"]', e => e.map(x => x.className + ' | ' + x.textContent)));
      const w = want || 'bad';
      T('N3', file + ': ' + name + ': the panel badge is ' + (w === 'bad' ? 'red' : 'grey') + ' and says ' + re, my.length >= 1 && my.every(x => !/\bok\b/.test(x.split('|')[0]) && re.test(x)) && my.every(x => new RegExp('\\b' + w + '\\b').test(x.split('|')[0])), my.join(' ; '));
      T('N3', file + ': ' + name + ': the strip entry is ' + (w === 'bad' ? 'red' : 'grey') + ', never green', strip === w, stx);
      if (/IMPOSSIBLE|BAD CLOCK/.test(re.source)) { const txt = await o.p.innerText(panel); const shown = file === 'miamidade' ? !/Counted so far: (450|-3|7\.5) of 300/.test(txt) : (file === 'tokens' ? !/Burn rate per hour: -5 tokens/.test(txt) && !/used: 250%/.test(txt) : true); T('N3', file + ': ' + name + ': the impossible number is not shown as a plain value', shown, txt.slice(0, 200)); }
      await o.ctx.close(); }
    // controls: the good world stays green on every panel
    const o = await open(br, stage(fresh(NOWMS))); for (const [file, panel] of [['housekeeping', '#pn-house'], ['health', '#pn-health'], ['miamidade', '#pn-miami'], ['tokens', '#pn-tokens'], ['state', '#pn-health']]) { const my = await o.p.$$eval(panel + ' .v5b[data-src="' + file + '"]', e => e.map(x => x.className)); T('N3', 'control: good ' + file + ' data is still green', my.length >= 1 && my.every(x => /\bok\b/.test(x)), my.join(';')); } await o.ctx.close(); }

  // ================= N2: a task shown RUNNING for too long is not blue forever
  { const mk = (min, iv, extra) => { const f = fresh(NOWMS); const w = f.bots.bots['CU-Inbox-Job-Watcher']; w.state = 'Running'; w.last_result = 267009; w.last_run_at = at(min); if (iv === null) { delete w.interval_sec; } else { w.interval_sec = iv; } if (extra) { extra(w); } return f; };
    // the checker's world: runs every 2 minutes, started Oct 3
    const hung = mk(3 * 24 * 60 + 5, 120); const o = await open(br, stage(hung)); const bl = await botCls(o.p, 'CU-Inbox-Job-Watcher'); const rc = await stateCls(o.p, 'RAMBO');
    T('N2', 'world hung (every 2 minutes, started 3 days ago): the bot line says "RUNNING FOR 72 HOURS - CHECK"', /RUNNING FOR 72 HOURS - CHECK/.test(bl.txt), bl.txt);
    T('N2', 'world hung: the line carries the start time (the last-run time, Oct 3)', /Started Oct 3, \d+:\d\d (AM|PM) E[DS]T/.test(bl.txt), bl.txt);
    T('N2', 'world hung: the colour is the strong grey-red class, not neutral blue and not plain', /\bstk\b/.test(bl.cls) && !/\bneu\b/.test(bl.cls), bl.cls);
    T('N2', 'world hung: the line no longer says "RUNNING NOW"', !/RUNNING NOW/.test(bl.txt), bl.txt);
    T('N2', 'world hung: the RAMBO card carries the same warning, not blue', /RUNNING FOR 72 HOURS - CHECK/.test(rc.txt) && !/\bneu\b/.test(rc.cls), rc.cls + ' | ' + rc.txt.slice(0, 200));
    T('N2', 'world hung: the strip entry for bots is red', (await stripCls(o.p, 'bots')) === 'bad', await stripTxt(o.p, 'bots')); await o.ctx.close();
    const cases = [
      ['running 3 minutes, every 2 minutes: still neutral (under 3 x 2 minutes = 6)', mk(3, 120), 'RUNNING NOW', 'neu'],
      ['running 7 minutes, every 2 minutes: still neutral (round 6: the limit is the larger of 3 x interval and 1 hour)', mk(7, 120), 'RUNNING NOW', 'neu'],
      ['running 70 minutes, every 2 minutes: STUCK, "1 HOUR"', mk(70, 120), 'RUNNING FOR 1 HOUR - CHECK', 'stk'],
      ['running 30 minutes, no interval known: still neutral (under 1 hour)', mk(30, null), 'RUNNING NOW', 'neu'],
      ['running 90 minutes, no interval known: STUCK (over 1 hour), "1 HOUR"', mk(90, null), 'RUNNING FOR 1 HOUR - CHECK', 'stk'],
      ['running 5 hours, no interval known: STUCK, "5 HOURS"', mk(5 * 60 + 2, null), 'RUNNING FOR 5 HOURS - CHECK', 'stk'],
      ['running 2.5 hours, hourly bot: still neutral (under 3 hours)', mk(150, 3600), 'RUNNING NOW', 'neu'],
      ['running 3.5 hours, hourly bot: STUCK', mk(210, 3600), 'RUNNING FOR 3 HOURS - CHECK', 'stk'],
      ['scheduler state Running with result 0, started 2 days ago, every 2 minutes: STUCK too', mk(2 * 24 * 60, 120, w => { w.last_result = 0; }), 'RUNNING FOR 48 HOURS - CHECK', 'stk'],
      ['running with no start time at all: neutral, and says how long cannot be judged', mk(1, 120, w => { delete w.last_run_at; }), 'first saw this state', 'neu'] ];
    for (const [name, f, txt, cls] of cases) { const o = await open(br, stage(f)); const b = await botCls(o.p, 'CU-Inbox-Job-Watcher'); T('N2', name, b.txt.indexOf(txt) >= 0 && new RegExp('\\b' + cls + '\\b').test(b.cls), b.cls + ' | ' + b.txt.slice(0, 160)); await o.ctx.close(); }
    // result 1 is still red FAILED, 0 and finished is still green
    const f = fresh(NOWMS); f.bots.bots['CU-Local-Executor'].last_result = 1; const oo = await open(br, stage(f)); const b1 = await botCls(oo.p, 'CU-Local-Executor'), b0 = await botCls(oo.p, 'CU-Orchestrator'); T('N2', 'controls: result 1 is still red FAILED; a finished result 0 task is still green', /FAILED/.test(b1.txt) && /\bbad\b/.test(b1.cls) && /\bok\b/.test(b0.cls), b1.cls + ' / ' + b0.cls); await oo.ctx.close(); }

  // ================= N14: one sentence, one answer
  { const mk = fn => { const f = fresh(NOWMS); fn(f.bots.bots['CU-Orchestrator']); return f; };
    const cases = [
      ['bot running now', mk(w => { w.state = 'Running'; w.last_result = 267009; w.last_run_at = at(1); }), 'neu', /RUNNING NOW/, /not fine/i],
      ['bot queued', mk(w => { w.state = 'Queued'; }), 'neu', /QUEUED/, /not fine/i],
      ['bot not yet run', mk(w => { w.last_result = 267011; }), 'unp', /NOT YET RUN/, /not fine/i],
      ['bot failed', mk(w => { w.last_result = 1; }), 'bad', /NOT FINE: FAILED/, null],
      ['bot disabled', mk(w => { w.state = 'Disabled'; }), 'bad', /NOT FINE: DISABLED/, null],
      ['bot stuck', mk(w => { w.state = 'Running'; w.last_result = 267009; w.last_run_at = at(5 * 60); }), 'stk', /NOT FINE: RUNNING FOR 5 HOURS - CHECK/, null],
      ['bot fine', mk(w => { }), 'ok', /Its bot CU-Orchestrator: RAN/, /not fine/i] ];
    for (const [name, f, cls, want, forbid] of cases) { const o = await open(br, stage(f)); const s = await stateCls(o.p, 'CHIEF'); T('N14', 'CHIEF card, ' + name + ': one answer: colour ' + cls + ', the sentence agrees' + (forbid ? ' and never says "not fine" (while its own text says "not failed")' : ''), new RegExp('\\b' + cls + '\\b').test(s.cls) && want.test(s.txt) && (!forbid || !forbid.test(s.txt)), s.cls + ' | ' + s.txt.slice(0, 260)); await o.ctx.close(); }
    // the window-down plus bot-running mix must not claim "up"
    const f = mk(w => { w.state = 'Running'; w.last_result = 267009; w.last_run_at = at(1); }); f.heartbeat.executors.CHIEF.state = 'down'; const o = await open(br, stage(f)); const s = await stateCls(o.p, 'CHIEF'); T('N14', 'CHIEF card, window DOWN and bot running: red, and the sentence starts with DOWN', /\bbad\b/.test(s.cls) && /DOWN/.test(s.txt), s.cls + ' | ' + s.txt.slice(0, 200)); await o.ctx.close(); }

  // ================= N17: the scheduler state Queued
  { const f = fresh(NOWMS); f.bots.bots['CU-Propagation-Check'].state = 'Queued'; const o = await open(br, stage(f)); const b = await botCls(o.p, 'CU-Propagation-Check');
    T('N17', 'scheduler state Queued: the bot line says QUEUED in neutral blue, not red NO DATA', /QUEUED/.test(b.txt) && !/NO DATA/.test(b.txt) && /\bneu\b/.test(b.cls), b.cls + ' | ' + b.txt);
    T('N17', 'scheduler state Queued: the strip entry is not red (one queued bot, none failed: grey)', (await stripCls(o.p, 'bots')) === 'na', await stripTxt(o.p, 'bots'));
    f.bots.bots['CU-Propagation-Check'].state = 'Banana'; const o2 = await open(br, stage(f)); const b2 = await botCls(o2.p, 'CU-Propagation-Check'); T('N17', 'control: an unknown state ("Banana") is still red NO DATA', /NO DATA/.test(b2.txt) && /\bbad\b/.test(b2.cls), b2.cls + ' | ' + b2.txt); await o.ctx.close(); await o2.ctx.close(); }

  // ================= N13: the Grok history is a typed note with its date
  { for (const [world, d, mod] of [['no data', stage(null)], ['stale heartbeat (400 minutes)', stage(fresh(NOWMS, { hbAge: 400 }))], ['fresh heartbeat, BOTS without proof', stage(fresh(NOWMS))], ['fresh heartbeat, BOTS with proof', (() => { const f = fresh(NOWMS); f.heartbeat.executors.BOTS = { state: 'up', last_seen: at(1), proof_at: at(3) }; return stage(f); })()]]) {
      const o = await open(br, d); const t = (await o.p.innerText('#card-LLM-07')).replace(/\s+/g, ' '), g = (await o.p.innerText('#card-GROK')).replace(/\s+/g, ' ');
      /* ROUND 8 CHANGE (FIX-ROUND-8.md, older tests that changed): the typed Grok note is now four short sentences ("Typed note, dated 2026-10-06, not checked by this page. ... It says no Grok bot had been built, although one was asked for many times.") so no sentence is over 25 words (CHECK-9 edge 20). The label, the date and the "not checked" words are all still required. */
      T('N13', world + ': the sentence "no Grok bot had been built, ... asked for many times" is inside a note labelled "Typed note, dated 2026-10-06" and says the page does not check it', /Typed note, dated 2026-10-06, not checked by this page\.[\s\S]*It says no Grok bot had been built[^.]*asked for many times/.test(t) && /Typed note, dated 2026-10-06, not checked by this page\.[\s\S]*It says no Grok bot had been built/.test(g), t.slice(t.indexOf('Grok is chat only'), t.indexOf('Grok is chat only') + 400));
      T('N13', world + ': the old unlabelled sentence "No Grok bot has been built (asked for many times, never built)" is gone', !/No Grok bot has been built \(asked for many times, never built\)/.test(t + g), '');
      T('N13', world + ': the only live claim is about the heartbeat file (UP with proof, or no Grok bot is reporting UP)', /Live check: (a Grok bot is reporting UP with proof|no Grok bot is reporting UP with proof)/.test(t), t.slice(0, 300)); await o.ctx.close(); } }

  // ================= N15 and the clock times: a label may not claim more than was typed
  { const o = await open(br, stage(fresh(NOWMS))); const rows = await o.p.$$eval('.repair-log tbody tr', e => e.map(x => x.innerText.replace(/\s+/g, ' ')));
    T('N15', 'repair row 10 keeps "runs 7:00 AM daily" and its label says only "typed note 2026-10-02" and that no time zone was given', rows.length === 12 && /runs 7:00 AM daily \(typed note 2026-10-02; the note gives no time zone/.test(rows[9]), rows[9]);
    T('N15', 'the words "Eastern time" are not attached to the typed 7:00 AM', !/7:00 AM daily[^|]*Eastern time/.test(rows[9]), rows[9]);
    const body = (await o.p.innerText('body')).replace(/\s+/g, ' '); const bad = []; const re = /\b\d{1,2}:\d{2}\s?(AM|PM)\b/g; let m; while ((m = re.exec(body))) { const tail = body.slice(m.index, m.index + 130); if (!/\b(EDT|EST)\b/.test(tail.slice(0, 20)) && !/typed note 2026-10-02; the note gives no time zone/.test(tail)) { bad.push(tail); } }
    T('N15', 'every clock time on the page carries EDT or EST right after it, except the typed 7:00 AM, which says plainly that no zone was given', bad.length === 0, bad.join(' | ')); await o.ctx.close(); }

  // ================= N16: Codex steps in the right order
  { const o = await open(br, stage(fresh(NOWMS)));
    for (const id of ['LLM-06', 'CODEX']) { const t = await o.p.$$eval('#card-' + id + ' .v5steps li', e => e.map(x => x.textContent)); const iFirst = t.findIndex(x => /^First time only/.test(x)), iUse = t.findIndex(x => /Ctrl\+V/.test(x)); T('N16', id + ' card: "First time only: sign in" comes BEFORE the step that pastes (step ' + (iFirst + 1) + ' before step ' + (iUse + 1) + ')', iFirst === 0 && iUse > iFirst, t.join(' || ')); }
    await o.ctx.close(); }

  // ================= F14 (page part): no typed command is handed to Jorge
  { const o = await open(br, stage(fresh(NOWMS))); const body = (await o.p.innerText('body')).replace(/\s+/g, ' ');
    T('F14', 'the bots lead line no longer says "Check any of them with Get-ScheduledTask" and says the desktop executor checks them', !/Get-ScheduledTask/.test(body) && /The desktop executor \(RAMBO\) checks the tasks on the PC; you type nothing/.test(body), '');
    T('F14', 'no step tells the user to open Windows Terminal or type codex', !/open Windows Terminal|Type codex|type codex/.test(body), (body.match(/.{40}(open Windows Terminal|ype codex).{40}/) || [''])[0]);
    const cards = await o.p.$$eval('#g-llm .card, #g-roles .card', e => e.map(c => ({ id: c.id, t: c.innerText.replace(/\s+/g, ' ') }))); const loose = [];
    for (const c of cards) { for (const re of [/codex exec/, /Second-Opinion\.ps1/, /Get-ScheduledTask/]) { if (re.test(c.t) && !/(the desktop executor \(RAMBO\) runs it, you type nothing|the desktop executor runs it, you type nothing)/.test(c.t)) { loose.push(c.id + ':' + re.source); } } }
    T('F14', 'the typed addresses `codex exec "<task>"` and `Second-Opinion.ps1 -Prompt "<question>"` appear only on lines that say the desktop executor (RAMBO) runs them and you type nothing', loose.length === 0 && /codex exec[^|]*/.test(body) && /For RAMBO only \(typed in v3; the desktop executor runs it, you type nothing\): codex exec/.test(body) && /For RAMBO only \(typed in v3; the desktop executor runs it, you type nothing\): Second-Opinion\.ps1/.test(body), loose.join(','));
    T('F14', 'the LLM-06 card line no longer says "type codex"', !/Windows Terminal, type codex/.test(body) && /You type no command: the desktop executor runs Codex for you/.test(body), '');
    await o.ctx.close(); }

  // ================= N12: OLD PANEL warning type at least 14 px everywhere
  { const o = await open(br, stage(fresh(NOWMS)), { viewport: { width: 1600, height: 900 } });
    const m = await o.p.evaluate(() => { const px = e => parseFloat(getComputedStyle(e).fontSize); const out = []; document.querySelectorAll('.tab.panel').forEach(a => { out.push(['tab ' + a.firstChild.textContent, px(a)]); const s = a.querySelector('small'); out.push(['label of ' + a.firstChild.textContent, px(s)]); }); document.querySelectorAll('#vtes-back-to-panel a').forEach(a => out.push(['corner ' + a.textContent.slice(0, 12), px(a)])); document.querySelectorAll('.v5old').forEach(a => out.push(['v5old', px(a)])); return out; });
    const small = m.filter(x => x[1] < 14);
    T('N12', 'all ' + m.length + ' OLD PANEL warning elements (10 tab names, 10 tab labels, the PANEL and INDEX buttons) are at least 14 px', m.length >= 22 && small.length === 0, JSON.stringify(small));
    const t = await o.p.evaluate(() => [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && /\bOLD\b/.test(e.textContent)).map(e => [e.tagName, e.textContent.slice(0, 30), parseFloat(getComputedStyle(e).fontSize)]).filter(x => x[2] < 14));
    T('N12', 'every text on the page that contains the word OLD is at least 14 px', t.length === 0, JSON.stringify(t)); await o.ctx.close(); }
  await br.close();

  // ================= N11: all 18 tabs reachable on laptops, RAMBO button still on the first screen (scroll bars drawn, as on Windows)
  { const br2 = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium', ignoreDefaultArgs: ['--hide-scrollbars'] });
    for (const world of ['shipped data', 'fresh data']) { const d = world === 'fresh data' ? stage(fresh(NOWMS)) : stage(null);
      for (const [w, h] of [[1366, 657], [1280, 609], [1280, 720], [390, 844], [1440, 789], [1000, 700], [1600, 789]]) {
        const { ctx, p } = await open(br2, d, { viewport: { width: w, height: h } });
        const m = await p.evaluate(() => {
          const t = document.getElementById('tabs'), tr = t.getBoundingClientRect(), tabs = [...t.querySelectorAll('a.tab')], vh = innerHeight, vw = innerWidth, b = document.getElementById('v5rambobtn').getBoundingClientRect(), hint = document.getElementById('v5tabhint');
          const inView = a => { const r = a.getBoundingClientRect(); return r.left >= -0.5 && r.right <= vw + 0.5 && r.top >= -0.5 && r.bottom <= vh + 0.5 && r.left >= tr.left - 0.5 && r.right <= tr.right + 0.5; };
          const initially = tabs.filter(inView).map(a => a.firstChild.textContent);
          const reach = []; tabs.forEach(a => { a.scrollIntoView({ inline: 'center', block: 'nearest' }); if (inView(a)) { reach.push(a.firstChild.textContent); } });
          t.scrollLeft = 0; window.scrollTo(0, 0);
          return { n: tabs.length, initially: initially, reach: reach, overflow: t.scrollWidth > t.clientWidth + 2, bar: t.offsetHeight - t.clientHeight, hint: hint ? hint.textContent : '', hintShown: hint ? getComputedStyle(hint).display !== 'none' : false, hintPx: hint ? parseFloat(getComputedStyle(hint).fontSize) : 0, btnTop: Math.round(b.top), btnBot: Math.round(b.bottom), vh: vh, tabsBottom: Math.round(tr.bottom) };
        });
        const tag = world + ' ' + w + 'x' + h;
        T('N11', tag + ': all ' + m.n + ' tabs can be brought fully into view (reachable: ' + m.reach.length + ' of ' + m.n + ')', m.n === 18 && m.reach.length === 18, JSON.stringify(m.reach));
        T('N11', tag + ': the RAMBO button is whole on the first screen (' + m.btnTop + '-' + m.btnBot + ' of ' + m.vh + ')', m.btnTop >= 0 && m.btnBot <= m.vh, JSON.stringify(m));
        if (m.overflow) {
          T('N11', tag + ': the bar scrolls sideways, so a scroll bar is drawn (' + m.bar + ' px) and a plain hint of at least 14 px is shown under it', m.bar >= 8 && m.hintShown && m.hintPx >= 14 && /drag the bar/.test(m.hint) && /There are 18 tabs/.test(m.hint), JSON.stringify({ bar: m.bar, hint: m.hint, px: m.hintPx }));
          if (w >= 1000) { T('N11', tag + ': without scrolling, the live tabs STATUS, REPAIRS and MIAMI-DADE are already on screen', ['STATUS', 'REPAIRS', 'MIAMI-DADE', 'LLMS', 'EXECUTORS', 'BOTS', 'HAND OFF', 'QUEUED'].every(x => m.initially.indexOf(x) >= 0), m.initially.join(',')); }
        } else { T('N11', tag + ': the bar does not scroll, so no hint is shown and all 18 tabs are on screen at once', !m.hintShown && m.initially.length === 18, m.initially.length + ' visible'); }
        /* ROUND 7 CHANGE: the bar now scrolls (one 87 px row) under 1700 px wide, so a 1536 x 730 screen keeps 75 percent of its height (CHECK-8 flaw 22). Widths 1536 and 1600 therefore take the first branch. */
        await ctx.close(); } }
    await br2.close(); }
  fs.writeFileSync(path.resolve(__dirname, OUT), JSON.stringify({ pass: res.filter(r => r.status === 'PASS').length, total: res.length, fail: res.filter(r => r.status === 'FAIL').length, results: res }, null, 1));
  console.log('FIXES R5: ' + res.filter(r => r.status === 'PASS').length + ' of ' + res.length + ' pass');
})().catch(e => { console.error(e); process.exit(2); });
