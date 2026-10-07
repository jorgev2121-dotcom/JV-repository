// lib-harvest-r9.js - fix round 9. A DUMB, independent reader of the page's visible text in many states. It knows nothing about the page's own code and picks sentences by two plain rules only
// (a digit, or one of the plain words below), never by topic. Used by test-claims-r9.js and gen-text-diff-r9.js. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { stage, open, fresh, NOWMS, at } = L;
const CHECK_WORDS = /\b(never|always|only|cannot|can not|does not|do not|every|all|none|exactly|blocked|ready|one click|catches|misses)\b/i;
const norm = s => String(s).replace(/\s+/g, ' ').trim();
// the visible text of one open page: the text a person sees, the selects' option rows, the textarea words and placeholders, the status boxes
function harvestPage(p) {
  return p.evaluate(() => {
    const out = [];
    const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && (r.width > 0 || r.height > 0); };
    document.body.innerText.split('\n').forEach(l => out.push(l));
    document.querySelectorAll('select').forEach(s => { Array.prototype.forEach.call(s.options, o => out.push(o.textContent)); });
    document.querySelectorAll('textarea').forEach(t => { if (vis(t)) { String(t.value).split('\n').forEach(l => out.push(l)); if (!t.value && t.placeholder) { out.push(t.placeholder); } } });
    document.querySelectorAll('input[type=search]').forEach(t => { if (t.placeholder) { out.push(t.placeholder); } });
    return out;
  });
}
function sentences(lines) {
  const out = [];
  lines.forEach(l => { norm(l).split(/(?<=[.!?])\s+(?=[A-Z0-9("'<*])/).forEach(s => { s = norm(s); if (s.length > 1) { out.push(s); } }); });
  return out;
}
// a template: numbers, times and ids are replaced, so the same sentence seen with a different time or count is ONE sentence
const tmpl = s => s.replace(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},(?: \d{4},)? \d{1,2}:\d{2} [AP]M [A-Z]{3,4}\b/g, '<TIME>').replace(/\d+/g, '#');
const checkable = s => /\d/.test(s) || CHECK_WORDS.test(s);
// ---- the worlds (data + actions). Each returns after settling. ----
const clone = o => JSON.parse(JSON.stringify(o));
function worlds() {
  const F = () => fresh(NOWMS), W = [];
  const add = (name, files, act, o) => W.push({ name, files, act, o });
  add('no-data', null);
  add('fresh-green', F());
  add('fresh-unregistered', (() => { const f = F(); f.heartbeat.vtes_scheme_registered = false; return f; })());
  add('grok-proven-all-up', F());
  add('grok-red', (() => { const f = F(); delete f.heartbeat.executors['LLM-07'].proof_at; return f; })());
  add('grok-grey-zone', (() => { const f = F(); f.heartbeat.executors['LLM-07'].last_seen = f.heartbeat.executors['LLM-07'].last_seen.replace(/Z$/, ''); return f; })());
  add('local-unconfirmed', (() => { const f = F(); delete f.heartbeat.local_only_folder; return f; })());
  add('local-bad-folder', (() => { const f = F(); f.heartbeat.local_only_folder.label = 'G:\\My Drive\\x'; return f; })());
  add('local-confirmed-proof', (() => { const f = F(); f.heartbeat.local_only_folder = { ok: true, checked_at: at(30), label: 'C:\\Data\\Private', local_only_verified_by: 'RAMBO', not_synced_proof: 'checked the folder is not under any sync root' }; return f; })());
  add('all-stale', (() => { const f = F(); f.heartbeat.at = at(500); f.bots.at = at(500); return f; })());
  add('bots-failed', (() => { const f = F(); f.bots.bots['CU-Orchestrator'].last_result = 1; f.bots.bots['CU-Local-Executor'].state = 'Disabled'; return f; })());
  add('status-writer-only', null, null, { status: { 'LLM-01': { seen: at(1), st: 'up' }, 'LLM-02': { seen: at(1), st: 'up' }, LOCAL: { seen: at(1), st: 'up' } } });
  add('health-partial-md-fresh', (() => { const f = F(); f.health.checks_passed = 9; f.miamidade.counted = null; delete f.state.at; return f; })());
  add('no-zone-and-future', (() => { const f = F(); f.tokens.at = at(1).replace(/Z$/, ''); f.housekeeping.at = at(-90); f.miamidade.sources[0].checked_at = at(1).replace(/Z$/, ''); return f; })());
  add('unreadable-file', (() => { const f = F(); f.bots.bots['CU-Orchestrator'] = 'text'; f.heartbeat.executors['LLM-02'] = 5; return f; })());
  add('bad-numbers', (() => { const f = F(); f.tokens.window_used_pct = 140; f.state.open_items = -2; f.miamidade.counted = 999; f.health.checks_passed = 20; return f; })());
  // interactions on the fresh page
  const S = { sel: async (p, s, v) => { await p.selectOption(s, v); await p.waitForTimeout(150); } };
  const typed = 'Check the Bal Harbour permit summary for anything missed.';
  add('note-unticked-rambo', F(), async p => { await p.fill('#note', typed); await p.selectOption('#to', 'LLM-01'); await p.waitForTimeout(1100); });
  add('note-ticked-click-all', F(), async (p, rec) => { await p.fill('#note', typed); await p.selectOption('#to', 'LLM-01'); await p.check('#v5ack'); await p.waitForTimeout(300); await rec(); await clickAll(p, rec); });
  add('note-unticked-click-all', F(), async (p, rec) => { await p.fill('#note', typed); await p.selectOption('#to', 'LLM-03'); await p.waitForTimeout(300); await rec(); await clickAll(p, rec); });
  add('note-local', F(), async (p, rec) => { await p.fill('#note', 'Client Maria needs the roof report. SSN 123-45-6789.'); await p.selectOption('#to', 'LOCAL'); await p.waitForTimeout(300); await rec(); await clickAll(p, rec, true); });
  add('note-pii-ticked', F(), async (p, rec) => { await p.fill('#note', 'My number is 123-45-6789 please check'); await p.selectOption('#to', 'LLM-03'); await p.check('#v5ack'); await p.waitForTimeout(300); await p.click('#show'); await p.waitForTimeout(300); });
  add('queued-unticked', F(), async (p, rec) => { await p.evaluate(() => { window.open = () => null; }); const n = await p.evaluate(() => document.querySelectorAll('[data-q]').length); for (let i = 0; i < n; i++) { await p.evaluate(i => document.querySelectorAll('[data-q]')[i].click(), i); await p.waitForTimeout(150); await rec(); } });
  add('queued-ticked', F(), async (p, rec) => { await p.evaluate(() => { window.open = () => null; }); const n = await p.evaluate(() => document.querySelectorAll('[data-q]').length); for (let i = 0; i < n; i++) { await p.evaluate(i => document.querySelectorAll('[data-q]')[i].click(), i); await p.check('#v5ack'); await p.waitForTimeout(250); await rec(); await p.uncheck('#v5ack'); } });
  add('packets-every-to', F(), async (p, rec) => { await p.fill('#note', typed); await p.check('#v5ack'); const tos = await p.evaluate(() => [...document.querySelectorAll('#to option')].map(o => o.value)); await p.evaluate(() => { window.open = () => null; }); for (const t of tos) { await p.selectOption('#to', t); await p.check('#v5ack'); await p.click('#show'); await p.waitForTimeout(120); await rec(); await p.click('#go'); await p.waitForTimeout(120); await rec(); } });
  add('small-phone-width', F(), null, { viewport: { width: 360, height: 640 } });
  return W;
}
async function clickAll(p, rec, noPop) {
  await p.evaluate(() => { window.open = () => null; });
  const n = await p.evaluate(() => document.querySelectorAll('button.bigcopy, #v5rambobtn, #go, #show').length);
  for (let i = 0; i < n; i++) { await p.evaluate(i => { const b = document.querySelectorAll('button.bigcopy, #v5rambobtn, #go, #show')[i]; if (b && !b.disabled) { b.click(); } }, i); await p.waitForTimeout(120); await rec(); }
}
// returns { sentences: Map(template -> {text, worlds:Set, examples:[...]}), perWorld: {name: [sentences]} }
async function harvestAll(browser, only) {
  const map = new Map(), perWorld = {}, lines = new Set();
  for (const w of worlds()) {
    if (only && !only.includes(w.name)) { continue; }
    const d = stage(w.files, w.o && w.o.status ? { status: w.o.status } : {});
    const { ctx, p, errs } = await open(browser, d, { viewport: w.o && w.o.viewport });
    const got = []; const rec = async () => { const ls = await harvestPage(p); ls.forEach(l => { const n = norm(l); if (n) { lines.add(n); } }); got.push(...sentences(ls)); };
    try { await rec(); if (w.act) { await w.act(p, rec); } await p.waitForTimeout(300); await rec(); } catch (e) { got.push('HARVEST ERROR in world ' + w.name + ': ' + String(e.message).slice(0, 120)); }
    perWorld[w.name] = got;
    got.forEach(s => { const k = tmpl(s); let e = map.get(k); if (!e) { e = { text: s, worlds: new Set(), n: 0, examples: new Map() }; map.set(k, e); } e.worlds.add(w.name); e.n++; if (!e.examples.has(s)) { e.examples.set(s, new Set()); } e.examples.get(s).add(w.name); });
    await ctx.close();
  }
  return { sentences: map, perWorld, lines };
}
module.exports = { harvestAll, harvestPage, sentences, tmpl, checkable, norm, CHECK_WORDS, worlds };
