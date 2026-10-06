// test-v5-lib.js - shared helpers for the v5 browser tests (TRK-2026-9910-B). Opens the page from file://, headless Chromium, Playwright clock.
const fs = require('fs'), path = require('path'), os = require('os');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const PKG = process.env.PKG || __dirname;
const NOW = '2026-10-06T14:00:00-04:00', NOWMS = new Date(NOW).getTime();
const at = (m, base) => new Date((base === undefined ? NOWMS : base) - m * 60000).toISOString();
const wrap = (n, o) => 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + n + ' = ' + JSON.stringify(o) + ';';
const ALL = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
const CHATS = ['LLM-04', 'LLM-05', 'LLM-07', 'LLM-08', 'LLM-10'];
const BOTNAMES = ['CU-Inbox-Job-Watcher', 'CU-Local-Executor', 'CU-TokenMonitor-Hourly', 'CU-Orchestrator', 'CU-Propagation-Check', 'VTES-LOCAL-POLLER'];
function fresh(base, o) {
  o = o || {}; const ls = o.lastSeenAge === undefined ? 1 : o.lastSeenAge, hb = o.hbAge === undefined ? 1 : o.hbAge;
  const ex = {}; ALL.forEach(i => { ex[i] = { state: 'up', last_seen: at(ls, base) }; }); CHATS.forEach(i => { ex[i].proof_at = at(2, base); });
  const bots = {}; BOTNAMES.forEach((n, i) => { bots[n] = { state: 'Ready', last_run_at: at(3 + i, base), last_result: 0, next_run_at: at(-5, base), interval_sec: 600 }; });
  return {
    heartbeat: { schema: 1, at: at(hb, base), writer: 'fixture', interval_sec: o.interval === undefined ? 300 : o.interval, vtes_scheme_registered: o.registered === undefined ? true : o.registered, addresses_filled: { 'LLM-01': true, 'LLM-03': true }, executors: ex },
    bots: { schema: 1, at: at(1, base), writer: 'fixture', interval_sec: 300, bots },
    state: { schema: 1, at: at(30, base), open_items: 12, in_progress: 3, blocked: 2, repairs: [{ id: 'R1', text: 'Fixture repair row', status: 'OPEN' }], money: [{ item: 'Fixture invoice', status: 'staged' }] },
    health: { schema: 1, at: at(30, base), ok: true, checks_passed: 9, checks_total: 12, report_sent_at: at(31, base) },
    tokens: { schema: 1, at: at(2, base), burn_per_hour: 41000, window_used_pct: 33, window_resets_at: at(-180, base), week_used_pct: 61, programs: [{ name: 'fixture-program', tokens_today: 1234 }] },
    housekeeping: { schema: 1, at: at(60, base), last_report_at: at(60, base), report_delivered: true, delivered_to: 'jorge', items_cleaned: 17 },
    miamidade: { schema: 1, at: at(20, base), counted: 7, target: 300, sources: [{ id: '01', proof_ok: true }, { id: '03', proof_ok: true }] }
  };
}
function stage(files, opts) {
  opts = opts || {};
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'v5t-'));
  for (const f of ['VTES-LLM-LAUNCHER_v5.html', 'vtes5-live.js', 'vtes5-ui.js']) fs.copyFileSync(path.join(PKG, f), path.join(d, f));
  fs.mkdirSync(path.join(d, 'data'));
  for (const f of fs.readdirSync(path.join(PKG, 'data'))) fs.copyFileSync(path.join(PKG, 'data', f), path.join(d, 'data', f));
  let cfg = { status_dir_url: '' };
  if (opts.status) { const sd = fs.mkdtempSync(path.join(os.tmpdir(), 'v5st-')); fs.writeFileSync(path.join(sd, 'vtes-status.js'), 'window.VTES_STATUS = ' + JSON.stringify(opts.status) + ';'); cfg.status_dir_url = 'file://' + sd + '/'; }
  fs.writeFileSync(path.join(d, 'vtes5-config.js'), 'window.VTES5_CONFIG = ' + JSON.stringify(cfg) + ';\n');
  if (files) for (const k of Object.keys(files)) fs.writeFileSync(path.join(d, 'data', 'vtes5-' + k + '.js'), wrap(k, files[k]));
  return d;
}
const sleep = (p, ms) => p.waitForTimeout(ms || 400);
async function open(br, dir, o) {
  o = o || {};
  const ctx = await br.newContext({ viewport: o.viewport || { width: 1300, height: 900 } }); const p = await ctx.newPage(); const errs = [], pops = [];
  p.on('pageerror', e => errs.push(String(e.message).slice(0, 160)));
  ctx.on('page', pg => { pops.push(pg); });
  await ctx.route(u => /^(https?|file:\/\/\/C:)/.test(u.toString()) && !u.toString().startsWith('file://' + dir), r => r.abort());
  const init = () => { window.__clip = null; window.__clipAttempts = 0; const w = t => { window.__clip = t; window.__clipAttempts++; return Promise.resolve(); }; try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: w }, configurable: true }); } catch (e) { } };
  await p.addInitScript(init);
  if (o.clock !== false) { await p.clock.install({ time: new Date(o.now || NOW) }); }
  await p.goto('file://' + dir + '/VTES-LLM-LAUNCHER_v5.html'); await sleep(p, o.settle || 700);
  return { ctx, p, errs, pops };
}
/* the same work the 60-second timer does, once on demand */
const tick = p => p.evaluate(() => new Promise(res => { VTES5.reload(() => { VTES5U.refresh(VTES5_BUILT); VTES5U.repaint(); res(); }); }));
const stateCls = (p, id) => p.evaluate(i => { const e = document.querySelector('.v5st[data-state="' + i + '"]'); return e ? { cls: e.className, txt: e.textContent } : null; }, id);
const botCls = (p, n) => p.evaluate(i => { const e = document.querySelector('.v5st[data-bot="' + i + '"]'); return e ? { cls: e.className, txt: e.textContent } : null; }, n);
const greenCards = p => p.evaluate(() => [...document.querySelectorAll('.v5st.ok')].map(c => c.getAttribute('data-state') || ('bot:' + c.getAttribute('data-bot'))));
const greenBadges = p => p.evaluate(() => [...document.querySelectorAll('.v5b.ok')].map(c => c.textContent));
const pageText = p => p.evaluate(() => document.body.innerText);
module.exports = { fs, path, os, chromium, PKG, NOW, NOWMS, at, wrap, ALL, CHATS, BOTNAMES, fresh, stage, sleep, open, tick, stateCls, botCls, greenCards, greenBadges, pageText };
