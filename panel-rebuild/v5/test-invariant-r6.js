// test-invariant-r6.js - fix round 6, flaws 1 4 6 7 8 9: an INVARIANT test, not example tests (charter Rule 4: "green means good" broke four times, so the class must not be able to come back).
// For every data world (named worlds from the independent check plus seeded random worlds) it opens the page and asserts, from the page's own DOM and with its own rank table:
//   I1 every strip entry (and every file badge inside a panel) is at least as bad as the worst card, bot line or panel mark that uses its file;
//   I2 WHOLE PAGE is at least as bad as every card, every mark and every strip entry;
//   I3 the age line is red whenever WHOLE PAGE is red;
//   I4 a fully good world is NOT painted red (the rule must not just turn everything red).
// Named worlds also carry one example check each. Usage: node test-invariant-r6.js <out.json> [randomWorlds]. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { fs, at, NOWMS, fresh, stage, open, tick, stateCls, botCls, ALL, CHATS, BOTNAMES } = L;
const OUT = process.argv[2] || 'test-invariant-r6-RESULT.json', NRAND = +(process.argv[3] || 150);
const results = []; const T = (world, name, ok, why) => { results.push({ world, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 400) }); if (!ok) { console.log('FAIL', world, '|', name, '|', String(why).slice(0, 300)); } };
const RANK = { ok: 0, neu: 1, unp: 1, na: 1, bad: 2, stk: 2 };
/* the invariant, evaluated inside the page with the test's own rank table (it does not call the page's colour code) */
const CHECK = () => {
  const R = { ok: 0, neu: 1, unp: 1, na: 1, bad: 2, stk: 2 };
  const cls = el => { const c = ' ' + el.className + ' '; for (const n of ['stk', 'bad', 'neu', 'unp', 'na', 'ok']) { if (c.includes(' ' + n + ' ')) { return n; } } return 'ok'; };
  const files = el => { let f = el.getAttribute('data-files'); if (!f) { const pn = el.closest('.pn[data-files]'); f = pn ? pn.getAttribute('data-files') : ''; } return (f || '').split(/\s+/).filter(Boolean); };
  const items = [...document.querySelectorAll('.v5st[data-files]')].map(e => ({ e, c: cls(e), f: files(e), what: e.textContent.slice(0, 70) }))
    .concat([...document.querySelectorAll('.pn .v5b:not([data-src])')].map(e => ({ e, c: cls(e), f: files(e), what: e.textContent.slice(0, 70) })));
  const badges = [...document.querySelectorAll('.v5b[data-src]')].map(e => ({ n: e.getAttribute('data-src'), c: cls(e), where: e.closest('#v5dash') ? 'strip' : 'panel' }));
  const bad = []; let worst = 0;
  items.forEach(it => { worst = Math.max(worst, R[it.c]); it.f.forEach(f => badges.filter(b => b.n === f).forEach(b => { if (R[b.c] < R[it.c]) { bad.push('I1 ' + b.where + ' badge ' + f + ' is ' + b.c + ' but "' + it.what + '" (' + it.f.join('+') + ') is ' + it.c); } })); });
  badges.forEach(b => { worst = Math.max(worst, R[b.c]); });
  const o = document.getElementById('v5overall'), age = document.getElementById('v5age');
  if (!o) { bad.push('I2 no WHOLE PAGE element'); } else if (R[cls(o)] < worst) { bad.push('I2 WHOLE PAGE is ' + cls(o) + ' but the worst item or entry is rank ' + worst); }
  if (age && worst === 2 && !age.classList.contains('bad')) { bad.push('I3 age line is not red while the page has a red item'); }
  const reds = items.filter(i => R[i.c] === 2).length;
  return { bad, n: items.length, reds, overall: o ? cls(o) : null, greenBadges: badges.filter(b => b.c === 'ok').length, redCards: items.filter(i => R[i.c] === 2).map(i => i.what).slice(0, 5) };
};
// ---- named worlds: each returns the files; opt gives stage options, the clock, and one example check
const f0 = () => fresh(NOWMS);
/* move the page clock forward by ms, rewrite every data file as fresh for the new time (the one bot keeps the same no-time state), and let the page re-read them */
async function later(p, d, ms, bot) { await p.clock.runFor(ms); const f = fresh(NOWMS + ms); f.bots.bots['CU-Orchestrator'] = bot; for (const k of Object.keys(f)) { fs.writeFileSync(d + '/data/vtes5-' + k + '.js', L.wrap(k, f[k])); } await p.clock.runFor(61000); await p.waitForTimeout(700); }
const W = [];
const world = (name, mk, ex, opt) => W.push({ name, mk, ex, opt: opt || {} });
world('allFresh', f0, async (p, c) => { T('allFresh', 'I4 a fully good world is green, with 0 red items', c.overall === 'ok' && c.reds === 0, JSON.stringify(c)); T('allFresh', 'all 7 strip entries green', c.greenBadges >= 7, String(c.greenBadges)); });
world('hbAllUnknown (checker flaw 1)', () => { const f = f0(); ALL.forEach(i => { f.heartbeat.executors[i] = { state: 'unknown', last_seen: at(1) }; }); return f; }, async (p, c) => { const t = await p.innerText('#v5dash [data-src="heartbeat"]'); T('hbAllUnknown', 'the heartbeat strip entry is red, not green "OK"', /bad/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.className)) && !/^OK/.test(t), t.slice(0, 160)); });
world('hbOnlyLLM01 (checker flaw 1)', () => { const f = f0(); f.heartbeat.executors = { 'LLM-01': { state: 'up', last_seen: at(1) } }; return f; }, async (p) => { T('hbOnlyLLM01', 'a window missing from the heartbeat file counts as NO DATA and the strip is red', /bad/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.className)), ''); });
world('hbChatNoProof (checker flaw 1)', () => { const f = f0(); CHATS.forEach(i => { delete f.heartbeat.executors[i].proof_at; }); return f; }, async (p) => { T('hbChatNoProof', 'chat windows with no proof: strip red', /bad/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.className)), ''); });
world('grokProof20d (checker flaw 1)', () => { const f = f0(); f.heartbeat.executors['LLM-07'].proof_at = at(20 * 24 * 60); return f; }, async (p) => { T('grokProof20d', 'a proof 20 days old: the Grok card and the strip are red', /bad/.test((await stateCls(p, 'LLM-07')).cls) && /bad/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.className)), ''); });
world('queued3d (checker flaw 4)', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Queued', last_run_at: at(3 * 24 * 60), last_result: 0, interval_sec: 120 }; return f; }, async (p) => { const b = await botCls(p, 'CU-Orchestrator'); T('queued3d', 'queued since 3 days with a 2-minute interval: red "STUCK - CHECK", strip red', /stk/.test(b.cls) && /STUCK - CHECK/.test(b.txt) && /bad/.test(await p.$eval('#v5dash [data-src="bots"]', e => e.className)), b.cls + ' ' + b.txt); });
world('queuedFresh', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Queued', last_run_at: at(5), last_result: 0, interval_sec: 600 }; return f; }, async (p) => { const b = await botCls(p, 'CU-Orchestrator'); T('queuedFresh', 'queued for a normal time: still neutral blue (not red)', /neu/.test(b.cls) && /QUEUED/.test(b.txt), b.cls + ' ' + b.txt); });
world('queuedNoTime (clock +2 h)', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Queued', last_result: 0 }; return f; }, async (p, c, d) => { const b = await botCls(p, 'CU-Orchestrator'); T('queuedNoTime', 'queued with no time at all: blue at first sight', /neu/.test(b.cls), b.cls); await later(p, d, 2 * 3600 * 1000, { state: 'Queued', last_result: 0 }); const b2 = await botCls(p, 'CU-Orchestrator'); T('queuedNoTime', 'the same task 2 hours later is red "STUCK - CHECK"', /stk/.test(b2.cls) && /STUCK - CHECK/.test(b2.txt), b2.cls + ' ' + b2.txt); }, { late: true });
world('hungRunningNoStart (checker flaw 4)', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Running', last_result: 267009 }; return f; }, async (p, c, d) => { const b = await botCls(p, 'CU-Orchestrator'); T('hungNoStart', 'Running with no start time: "RUNNING NOW" at first sight', /neu/.test(b.cls) && /RUNNING NOW/.test(b.txt), b.cls + ' ' + b.txt); await later(p, d, 90 * 60 * 1000, { state: 'Running', last_result: 267009 }); const b2 = await botCls(p, 'CU-Orchestrator'); T('hungNoStart', '90 minutes later the same state is red "STUCK - CHECK"', /stk/.test(b2.cls) && /STUCK - CHECK/.test(b2.txt), b2.cls + ' ' + b2.txt); }, { late: true });
world('running72h', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Running', last_run_at: at(72 * 60), last_result: 267009, interval_sec: 120 }; return f; }, async (p) => { const b = await botCls(p, 'CU-Orchestrator'); T('running72h', 'running 72 hours: red', /stk/.test(b.cls) && /RUNNING FOR 72 HOURS - CHECK/.test(b.txt), b.txt); });
world('running30min (limit is 1 hour for a 2-minute task)', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Running', last_run_at: at(30), last_result: 267009, interval_sec: 120 }; return f; }, async (p) => { const b = await botCls(p, 'CU-Orchestrator'); T('running30min', 'running 30 minutes with a 2-minute interval: the limit is the larger of 3 x interval and 1 hour, so still blue', /neu/.test(b.cls), b.cls + ' ' + b.txt); });
world('code267010Ready (checker flaw 9)', () => { const f = f0(); f.bots.bots['CU-Orchestrator'] = { state: 'Ready', last_run_at: at(5), last_result: 267010, interval_sec: 600 }; return f; }, async (p) => { const b = await botCls(p, 'CU-Orchestrator'); T('267010', 'code 267010 is worded "DISABLED - the scheduler says this task is turned off", red, not FAILED', /DISABLED - the scheduler says this task is turned off/.test(b.txt) && !/FAILED/.test(b.txt) && /bad/.test(b.cls), b.txt); });
world('mdProofNoDate (checker flaw 6)', () => { const f = f0(); f.miamidade.sources = [{ id: '01', proof_ok: true }]; return f; }, async (p) => { const t = await p.innerText('#v5miami li:nth-child(1)'); T('mdNoDate', 'a source with proof_ok true and no checked_at is NOT green "proof checked"', !/proof checked/.test(t) && (await p.$$('#v5miami li:nth-child(1) .v5b.ok')).length === 0, t.slice(0, 200)); });
world('mdProofOld (checker flaw 6)', () => { const f = f0(); f.miamidade.sources = [{ id: '01', proof_ok: true, checked_at: '2026-01-01T09:00:00-05:00' }]; return f; }, async (p) => { const t = await p.innerText('#v5miami li:nth-child(1)'); T('mdOld', 'a source checked in January is red PROOF OLD, not green', /PROOF OLD/.test(t) && (await p.$$('#v5miami li:nth-child(1) .v5b.bad')).length === 1 && /bad/.test(await p.$eval('#v5dash [data-src="miamidade"]', e => e.className)), t.slice(0, 200)); });
world('mdProofFresh', () => { const f = f0(); f.miamidade.sources = [{ id: '01', proof_ok: true, checked_at: at(60) }]; return f; }, async (p) => { const t = await p.innerText('#v5miami li:nth-child(1)'); T('mdFresh', 'a source checked an hour ago is green "proof checked"', /proof checked/.test(t) && (await p.$$('#v5miami li:nth-child(1) .v5b.ok')).length === 1, t.slice(0, 200)); });
world('tokensResetPast (checker flaw 7)', () => { const f = f0(); f.tokens.window_resets_at = at(3 * 24 * 60); return f; }, async (p) => { const t = await p.innerText('#v5tokens'); T('resetPast', 'a reset time 3 days in the past is red, the badge is not green "Reporting"', /PAST/.test(t) && !/Reporting/.test(await p.innerText('#v5tokens [data-src="tokens"]')) && /bad/.test(await p.$eval('#v5dash [data-src="tokens"]', e => e.className)), t.slice(0, 300)); });
world('stateStale (checker flaw 8)', () => { const f = f0(); f.state.at = at(30 * 60); return f; }, async (p) => { const t = await p.innerText('#v5health'); T('stateStale', 'state numbers 30 hours old: "These numbers are old", the numbers are red marks (OLD n), no plain bold number', /These numbers are old/.test(t) && /OLD 12/.test(t) && (await p.$$eval('#pn-health b', b => b.filter(x => /^\d+$/.test(x.textContent)).length)) === 0, t.slice(0, 400)); });
world('healthStale', () => { const f = f0(); f.health.at = at(30 * 60); return f; }, async (p) => { const t = await p.innerText('#v5health'); T('healthStale', 'a stale health report shows its numbers as OLD marks', /OLD 12 of 12/.test(t), t.slice(0, 300)); });
world('housekeepingOld', () => { const f = f0(); f.housekeeping.last_report_at = at(5 * 24 * 60); return f; }, async (p) => { T('housekeepingOld', 'a last-report time 5 days old is red OLD and the strip is red', /OLD/.test(await p.innerText('#v5house')) && /bad/.test(await p.$eval('#v5dash [data-src="housekeeping"]', e => e.className)), await p.innerText('#v5house')); });
world('localFolderMissing (flaw 2)', () => { const f = f0(); delete f.heartbeat.local_only_folder; return f; }, async (p) => { const t = await p.innerText('#card-LOCAL'); T('localFolderMissing', 'no confirmed local-only folder: the LOCAL card says BLOCKED - UNVERIFIED, red, and the strip is red', /BLOCKED - UNVERIFIED/.test(t) && /bad/.test(await p.$eval('#card-LOCAL .v5st[data-localfolder]', e => e.className)) && /bad/.test(await p.$eval('#v5dash [data-src="heartbeat"]', e => e.className)), t.slice(0, 500)); });
world('localFolderCloud (flaw 2)', () => { const f = f0(); f.heartbeat.local_only_folder.label = 'G:\\My Drive\\VTES-Inbox-LOCAL'; return f; }, async (p) => { T('localFolderCloud', 'a folder name that looks like Google Drive is refused even when the file says ok', /BLOCKED/.test(await p.innerText('#card-LOCAL .v5st[data-localfolder]')), await p.innerText('#card-LOCAL .v5st[data-localfolder]')); });
world('hbStale', () => fresh(NOWMS, { hbAge: 40, lastSeenAge: 40 }), null);
world('none (shipped data)', () => null, async (p, c) => { T('none', 'the shipped data is red everywhere, 0 green items', c.reds > 20 && c.overall === 'bad', JSON.stringify(c)); });
world('futureClock', () => fresh(NOWMS + 365 * 86400000), null);
world('allBotsFailed', () => { const f = f0(); BOTNAMES.forEach(n => { f.bots.bots[n].last_result = 1; }); return f; }, null);
world('healthNotOk', () => { const f = f0(); f.health.ok = false; return f; }, null);
world('housekeepingNotDelivered', () => { const f = f0(); f.housekeeping.report_delivered = false; return f; }, null);
world('statusOnlyWriter', () => null, null, { status: { 'LLM-01': { st: 'up', seen: new Date(NOWMS - 60000).toISOString() }, 'LLM-02': { st: 'up', seen: new Date(NOWMS - 60000).toISOString() } } });
// ---- random worlds: a seeded generator mutates the good world in many ways at once
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function randomWorld(seed) {
  const r = rng(seed), pick = a => a[Math.floor(r() * a.length)], sev = [0, 0.08, 0.25, 1][seed % 4], chance = x => r() < x * sev, f = fresh(NOWMS); /* severity: every 4th world is untouched, the others are mildly, moderately and heavily damaged, so the invariant is tested on green, grey and red pages */
  const ageMin = () => pick([1, 5, 20, 40, 90, 400, 26 * 60 + 5, 3 * 24 * 60, 20 * 24 * 60, -30, -3000]);
  Object.keys(f).forEach(k => { if (chance(0.12)) { delete f[k]; } else if (chance(0.2)) { f[k].at = at(ageMin()); } });
  if (f.heartbeat) {
    if (chance(0.15)) { f.heartbeat.executors = {}; }
    ALL.forEach(i => { const e = f.heartbeat.executors[i]; if (!e) { return; } if (chance(0.2)) { delete f.heartbeat.executors[i]; } else { if (chance(0.15)) { e.state = pick(['down', 'unknown', 'up', 'weird']); } if (chance(0.15)) { e.last_seen = at(ageMin()); } if (e.proof_at && chance(0.25)) { e.proof_at = at(ageMin()); } if (chance(0.05)) { delete e.proof_at; } } });
    if (chance(0.2)) { delete f.heartbeat.local_only_folder; } else if (chance(0.15)) { f.heartbeat.local_only_folder = pick([{ ok: false }, { ok: true, label: 'OneDrive\\x', checked_at: at(5) }, { ok: true, label: 'LOCAL', checked_at: at(40 * 60) }, { ok: true, label: 'LOCAL' }]); }
    if (chance(0.15)) { f.heartbeat.interval_sec = pick([0, -5, 'x', 60, 3600, 99999]); }
  }
  if (f.bots) { BOTNAMES.forEach(n => { const b = f.bots.bots[n]; if (!b) { return; } if (chance(0.2)) { b.state = pick(['Ready', 'Running', 'Queued', 'Disabled', 'Weird', '']); } if (chance(0.25)) { b.last_result = pick([0, 1, 267009, 267010, 267011, -1, 'x', null]); } if (chance(0.25)) { b.last_run_at = chance(0.2) ? undefined : at(ageMin()); } if (chance(0.2)) { b.interval_sec = pick([0, 120, 600, 3600, 86400, 604800, 9999999, 'x', null]); } if (chance(0.05)) { delete f.bots.bots[n]; } }); }
  if (f.state) { ['open_items', 'in_progress', 'blocked'].forEach(k => { if (chance(0.15)) { f.state[k] = pick([-1, 2.5, 'x', 0, 7]); } }); }
  if (f.health) { if (chance(0.15)) { f.health.ok = pick([false, undefined, 'yes']); } if (chance(0.2)) { f.health.checks_passed = pick([0, 5, 99, -2]); } if (chance(0.2)) { f.health.report_sent_at = chance(0.3) ? null : at(ageMin()); } }
  if (f.tokens) { if (chance(0.3)) { f.tokens.window_resets_at = chance(0.2) ? undefined : at(pick([-300, -1, 1, 3 * 24 * 60, -2000])); } if (chance(0.15)) { f.tokens.burn_per_hour = pick([-5, 'x', null, 0]); } if (chance(0.15)) { f.tokens.window_used_pct = pick([101, -1, 50]); } }
  if (f.housekeeping) { if (chance(0.2)) { f.housekeeping.report_delivered = pick([false, undefined]); } if (chance(0.3)) { f.housekeeping.last_report_at = at(ageMin()); } if (chance(0.1)) { f.housekeeping.items_cleaned = pick([-1, 1.5]); } }
  if (f.miamidade) { if (chance(0.2)) { f.miamidade.counted = pick([null, 450, -3, 7.5]); } f.miamidade.sources = f.miamidade.sources.filter(() => !chance(0.3)).map(x => { const y = { ...x }; if (chance(0.25)) { y.proof_ok = pick([false, 'yes']); } if (chance(0.3)) { y.checked_at = chance(0.3) ? undefined : at(ageMin()); } return y; }); }
  return f;
}
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let n = 0;
  for (const w of W) {
    n++; const files = w.mk(); const d = stage(files, w.opt.status ? { status: w.opt.status } : {}); const { ctx, p, errs } = await open(br, d);
    const c = await p.evaluate(CHECK);
    T(w.name, 'invariant I1 to I3 hold (' + c.n + ' items, ' + c.reds + ' red, WHOLE PAGE ' + c.overall + ')', c.bad.length === 0, c.bad.slice(0, 3).join(' | '));
    T(w.name, '0 page errors', errs.length === 0, errs.join('|'));
    if (w.ex) { try { await w.ex(p, c, d); } catch (e) { T(w.name, 'example check ran', false, e.message); } if (w.opt.late) { const c2 = await p.evaluate(CHECK); T(w.name, 'invariant still holds after the clock moved', c2.bad.length === 0, c2.bad.slice(0, 3).join(' | ')); } }
    await ctx.close();
  }
  // random worlds: one page per world is slow, so a page is reused for 10 worlds in a row (new files, then the same tick the 60-second timer runs)
  let done = 0, stat = { ok: 0, na: 0, bad: 0 };
  for (let b = 0; b < Math.ceil(NRAND / 10); b++) {
    const d = stage(randomWorld(1000 + b * 10), {}); const { ctx, p, errs } = await open(br, d);
    for (let i = 0; i < 10 && done < NRAND; i++, done++) {
      const seed = 1000 + done; const files = randomWorld(seed);
      for (const k of ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade']) { const fp = d + '/data/vtes5-' + k + '.js'; fs.writeFileSync(fp, files[k] ? L.wrap(k, files[k]) : 'window.VTES_DATA = window.VTES_DATA || {};'); }
      if (i > 0) { await tick(p); } else { await p.reload(); await p.waitForTimeout(600); }
      const c = await p.evaluate(CHECK); stat[c.overall] = (stat[c.overall] || 0) + 1;
      T('random-' + seed, 'invariant I1 to I3 hold (' + c.n + ' items, ' + c.reds + ' red, WHOLE PAGE ' + c.overall + ')', c.bad.length === 0, c.bad.slice(0, 3).join(' | '));
    }
    T('random-batch-' + b, '0 page errors', errs.length === 0, errs.join('|'));
    await ctx.close();
  }
  T('random-spread', 'the random worlds cover good and bad pages (green ' + stat.ok + ', grey ' + stat.na + ', red ' + stat.bad + '; grey pages come from the named worlds, the random ones rarely stay grey), so the invariant was tested on both', stat.bad > 0 && stat.ok > 0, JSON.stringify(stat));
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-invariant-r6', named_worlds: W.length, random_worlds: NRAND, pass, total: results.length, outcomes_of_random_worlds: stat, results }, null, 1));
  console.log('INVARIANT R6: ' + pass + ' of ' + results.length + ' pass (' + W.length + ' named worlds, ' + NRAND + ' random worlds)');
  process.exit(pass === results.length ? 0 : 1);
})();
