// test-fixes-r4.js - one before/after test per page flaw fixed in fix round 4 (F2, F3, F5, F6, F7, F9, F10, F12, F13, F14, F15, F17). TRK-2026-9910-B.
// Usage: PKG=<package folder> node test-fixes-r4.js <out.json>. Run it once on the package BEFORE the fixes (the round-3 package: the tests must FAIL there) and once on the
// package AFTER (all must pass). Worlds are the ones the independent checker used (W2 housekeeping, W3 Miami-Dade, W4 tokens, W5 running task, W6 daily bot, W7 disabled bots).
const L = require('./test-v5-lib.js'); const { fs, path, NOWMS, at, fresh, stage, open, sleep, botCls, stateCls } = L;
const OUT = process.argv[2] || 'test-fixes-r4-RESULT.json'; const res = [];
const T = (id, name, ok, why) => { res.push({ id, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); console.log((ok ? 'PASS ' : 'FAIL ') + id + ' | ' + name + (ok ? '' : ' | ' + String(why).slice(0, 220))); };
const stubCopy = p => p.evaluate(() => { window.__clip = null; document.execCommand = function (c) { if (c === 'copy') { var a = document.activeElement; window.__clip = a && a.value; return true; } return false; }; });
const V3 = path.join(__dirname, '..', 'v3-live', 'VTES-LLM-LAUNCHER_v3.html');
const lum = c => { const m = c.match(/[\d.]+/g).map(Number); const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // ---------- F2: scheduler result codes
  { const f = fresh(NOWMS), B = f.bots.bots;
    B['CU-Inbox-Job-Watcher'].last_result = 267009; B['CU-Inbox-Job-Watcher'].state = 'Running';
    B['CU-Local-Executor'].last_result = 267011; delete B['CU-Local-Executor'].last_run_at;
    B['CU-TokenMonitor-Hourly'].last_result = 1; B['CU-Orchestrator'].last_result = 267011; B['CU-Propagation-Check'].state = 'Running'; B['VTES-LOCAL-POLLER'].last_result = 2147942402;
    const { ctx, p, errs } = await open(br, stage(f));
    const run = await botCls(p, 'CU-Inbox-Job-Watcher'), nyr = await botCls(p, 'CU-Local-Executor'), failed = await botCls(p, 'CU-TokenMonitor-Hourly'), nyr2 = await botCls(p, 'CU-Orchestrator'), ok = await botCls(p, 'CU-Propagation-Check'), other = await botCls(p, 'VTES-LOCAL-POLLER');
    T('F2', '267009 means RUNNING: neutral blue, says RUNNING NOW, never FAILED', /RUNNING NOW/.test(run.txt) && !/FAILED/.test(run.txt) && /\bneu\b/.test(run.cls), run.cls + ' | ' + run.txt);
    T('F2', '267011 means NOT YET RUN: grey, even with no last-run time, never FAILED', /NOT YET RUN/.test(nyr.txt) && !/FAILED/.test(nyr.txt) && /\bunp\b/.test(nyr.cls), nyr.cls + ' | ' + nyr.txt);
    T('F2', '267011 with a last-run time is also grey NOT YET RUN', /NOT YET RUN/.test(nyr2.txt) && /\bunp\b/.test(nyr2.cls), nyr2.cls + ' | ' + nyr2.txt);
    T('F2', 'result 1 is still red FAILED with its code (ROUND 7 CHANGE: the words "result code" are jargon and became "error number")', /FAILED.*(result code|error number) 1\b/.test(failed.txt) && /\bbad\b/.test(failed.cls), failed.txt);
    T('F2', 'any other non-zero code (2147942402) is red FAILED', /FAILED.*2147942402/.test(other.txt) && /\bbad\b/.test(other.cls), other.txt);
    T('F2', 'a running task with result 0 is still green', /\bok\b/.test(ok.cls), ok.cls + ' | ' + ok.txt);
    T('F2', '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---------- F3: green only when the file is fresh AND its content says good
  { const good = fresh(NOWMS); const og = await open(br, stage(good));
    const gb = async sel => og.p.$$eval(sel + ' .v5b[data-src]', e => e.map(x => x.className + ' | ' + x.textContent));
    T('F3', 'control: good housekeeping, Miami-Dade count and token report show green badges', (await gb('#pn-house')).every(x => /\bok\b/.test(x)) && (await gb('#pn-miami')).every(x => /\bok\b/.test(x)) && (await gb('#pn-tokens')).every(x => /\bok\b/.test(x)), JSON.stringify([await gb('#pn-house'), await gb('#pn-miami'), await gb('#pn-tokens')])); await og.ctx.close();
    const f2 = fresh(NOWMS); f2.housekeeping.report_delivered = false; const o2 = await open(br, stage(f2));
    const h2 = await o2.p.$$eval('#pn-house .v5b[data-src]', e => e.map(x => x.className + ' | ' + x.textContent)), s2 = await o2.p.$$eval('#v5dash span', e => e.filter(x => /^housekeeping/.test(x.textContent)).map(x => x.innerHTML));
    T('F3', 'W2 housekeeping report_delivered:false: the badge is red (not green) and says NOT DELIVERED', h2.length === 1 && /\bbad\b/.test(h2[0]) && !/\bok\b/.test(h2[0]) && /NOT DELIVERED/.test(h2[0]), h2.join(';'));
    T('F3', 'W2 the status strip entry for housekeeping is red too', s2.length === 1 && /v5b bad/.test(s2[0]) && !/v5b ok/.test(s2[0]), s2.join(';')); await o2.ctx.close();
    const f2b = fresh(NOWMS); delete f2b.housekeeping.report_delivered; const o2b = await open(br, stage(f2b)); const h2b = await o2b.p.$$eval('#pn-house .v5b[data-src]', e => e.map(x => x.className));
    T('F3', 'W2b housekeeping with no report_delivered field: red, not green', h2b.length === 1 && /\bbad\b/.test(h2b[0]), h2b.join(';')); await o2b.ctx.close();
    const f3 = fresh(NOWMS); f3.miamidade.counted = null; const o3 = await open(br, stage(f3)); const m3 = await o3.p.$$eval('#pn-miami .v5b[data-src]', e => e.map(x => x.className + ' | ' + x.textContent)), s3 = await o3.p.$$eval('#v5dash span', e => e.filter(x => /^(miamidade|Miami-Dade)/.test(x.textContent)).map(x => x.innerHTML));
    T('F3', 'W3 Miami-Dade counted:null: the badge is GREY "not counted", never green "Counted"', m3.length === 1 && /\bna\b/.test(m3[0]) && !/\bok\b/.test(m3[0]) && /NOT COUNTED/i.test(m3[0]), m3.join(';'));
    T('F3', 'W3 the strip entry for Miami-Dade is not green', s3.length === 1 && !/v5b ok/.test(s3[0]), s3.join(';'));
    T('F3', 'W3 the count line still says unknown of 300', /Counted so far: unknown of 300/.test(await o3.p.innerText('#pn-miami')), ''); await o3.ctx.close();
    const f4 = fresh(NOWMS); f4.tokens = { schema: 1, at: at(2), writer: 'fixture' }; const o4 = await open(br, stage(f4)); const t4 = await o4.p.$$eval('#pn-tokens .v5b[data-src]', e => e.map(x => x.className + ' | ' + x.textContent)), s4 = await o4.p.$$eval('#v5dash span', e => e.filter(x => /^(tokens|token use)/.test(x.textContent)).map(x => x.innerHTML));
    T('F3', 'W4 an empty token report (only schema, at, writer): the badge is red NO DATA, never green "Reporting"', t4.length === 1 && /\bbad\b/.test(t4[0]) && !/\bok\b/.test(t4[0]) && /NO DATA/.test(t4[0]), t4.join(';'));
    T('F3', 'W4 the strip entry for tokens is red', s4.length === 1 && /v5b bad/.test(s4[0]), s4.join(';')); await o4.ctx.close(); }
  // ---------- F5: the RAMBO paste button is on the first screen, directly under the title, above "Read me first"
  for (const world of ['shipped data (no data)', 'fresh data']) {
    const d = world === 'fresh data' ? stage(fresh(NOWMS)) : stage(null);
    for (const [w, h] of [[1366, 657], [1280, 609], [1280, 720], [390, 844]]) {
      const { ctx, p } = await open(br, d, { viewport: { width: w, height: h } });
      const m = await p.evaluate(() => { const b = document.getElementById('v5rambobtn'), r = b.getBoundingClientRect(), t = document.getElementById('tabs'); const h1 = document.querySelector('h1'); const tops = [...t.querySelectorAll('a')].map(a => a.offsetTop); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, tabsH: Math.round(t.getBoundingClientRect().height), oneRow: getComputedStyle(t).flexWrap === 'nowrap', scrolls: t.scrollWidth > t.clientWidth, afterH1: h1.nextElementSibling && h1.nextElementSibling.id, order: document.getElementById('v5rambo').compareDocumentPosition(document.getElementById('v5read')) & 4 }; });
      T('F5', world + ' ' + w + 'x' + h + ': the whole RAMBO button is on the first screen (top ' + m.top + ', bottom ' + m.bottom + ' of ' + m.vh + ')', m.top >= 0 && m.bottom <= m.vh, JSON.stringify(m));
      T('F5', world + ' ' + w + 'x' + h + ': the RAMBO block is the element directly after the title and comes before "Read me first"', m.afterH1 === 'v5rambo' && m.order === 4, JSON.stringify(m));
      T('F5', world + ' ' + w + 'x' + h + ': the tab bar is one compact row (height ' + m.tabsH + '), scrollable', m.oneRow && m.tabsH <= 90 && (w > 1000 ? m.scrolls : true), JSON.stringify(m));
      await ctx.close();
    } }
  { const { ctx, p } = await open(br, stage(fresh(NOWMS)), { viewport: { width: 390, height: 844 } }); await stubCopy(p);
    await p.click('#v5rambobtn'); await sleep(p, 300); const clip = await p.evaluate(() => window.__clip);
    T('F5', 'phone 390x844: pressing the button on the first screen copies a packet addressed to LLM-01', !!clip && /->  LLM-01 \(/.test(clip.split('\n')[0]), String(clip).slice(0, 80)); await ctx.close(); }
  // ---------- F6: one card, one answer
  { const f = fresh(NOWMS), B = f.bots.bots; B['CU-Orchestrator'].state = 'Disabled'; B['CU-Inbox-Job-Watcher'].state = 'Disabled'; B['CU-Local-Executor'].last_result = 1;
    const { ctx, p } = await open(br, stage(f));
    for (const [card, word, bot] of [['CHIEF', 'DISABLED', 'CU-Orchestrator'], ['RAMBO', 'DISABLED', 'CU-Inbox-Job-Watcher'], ['LOCAL', 'FAILED', 'CU-Local-Executor']]) {
      const r = await p.evaluate(c => { const el = document.getElementById('card-' + c); const st = [...el.querySelectorAll('.v5st[data-state]')]; return { n: st.length, cls: st.map(x => x.className), txt: st.map(x => x.textContent), green: el.querySelectorAll('.v5st[data-state].ok').length, red: el.querySelectorAll('.v5st[data-state].bad').length }; }, card);
      T('F6', card + ' card (window UP, bot ' + word + '): exactly ONE status line, red, and it says ' + word + ' and names ' + bot, r.n === 1 && r.green === 0 && r.red === 1 && new RegExp(word).test(r.txt[0]) && r.txt[0].includes(bot), JSON.stringify(r)); }
    await ctx.close();
    const g = await open(br, stage(fresh(NOWMS))); const r2 = await g.p.evaluate(() => ['CHIEF', 'RAMBO', 'LOCAL'].map(c => { const el = document.getElementById('card-' + c); return { n: el.querySelectorAll('.v5st[data-state]').length, ok: el.querySelectorAll('.v5st[data-state].ok').length, txt: el.querySelector('.v5st[data-state]').textContent }; }));
    T('F6', 'control: window UP and bot fine: still one line, green, naming both', r2.every(x => x.n === 1 && x.ok === 1 && /UP/.test(x.txt) && /RAN/.test(x.txt)), JSON.stringify(r2)); await g.ctx.close();
    const t = fresh(NOWMS); const o = await open(br, stage(t)); await o.p.evaluate(() => 0);
    const f2 = fresh(NOWMS + 60000); f2.bots.bots['CU-Orchestrator'].state = 'Disabled'; for (const k of Object.keys(f2)) { fs.writeFileSync(path.join(path.dirname(o.p.url().replace('file://', '')), 'data', 'vtes5-' + k + '.js'), L.wrap(k, f2[k])); }
    await o.p.clock.runFor(61000); await sleep(o.p, 700);
    const r3 = await o.p.evaluate(() => { const el = document.getElementById('card-CHIEF'); return { n: el.querySelectorAll('.v5st').length, red: el.querySelectorAll('.v5st.bad').length, txt: el.querySelector('.v5st').textContent }; });
    T('F6', 'after the 60-second reload the CHIEF card flips from green to one red line (bot now DISABLED)', r3.n === 1 && r3.red === 1 && /DISABLED/.test(r3.txt), JSON.stringify(r3)); await o.ctx.close(); }
  // ---------- F7: bot intervals up to 7 days, late after 1.5 x the interval
  { const f = fresh(NOWMS), B = f.bots.bots;
    B['CU-Propagation-Check'].interval_sec = 86400; B['CU-Propagation-Check'].last_run_at = at(20 * 60);
    B['CU-Orchestrator'].interval_sec = 86400; B['CU-Orchestrator'].last_run_at = at(40 * 60);
    B['CU-Local-Executor'].interval_sec = 604800; B['CU-Local-Executor'].last_run_at = at(5 * 24 * 60);
    B['CU-TokenMonitor-Hourly'].interval_sec = 3600; B['CU-TokenMonitor-Hourly'].last_run_at = at(80);
    B['CU-Inbox-Job-Watcher'].interval_sec = 3600; B['CU-Inbox-Job-Watcher'].last_run_at = at(100);
    B['VTES-LOCAL-POLLER'].interval_sec = 604801;
    const { ctx, p } = await open(br, stage(f)); const c = {}; for (const n of ['CU-Propagation-Check', 'CU-Orchestrator', 'CU-Local-Executor', 'CU-TokenMonitor-Hourly', 'CU-Inbox-Job-Watcher', 'VTES-LOCAL-POLLER']) { c[n] = await botCls(p, n); }
    T('F7', 'a daily bot whose last run was 20 hours ago is GREEN and says "every 1 day"', /\bok\b/.test(c['CU-Propagation-Check'].cls) && /every 1 day/.test(c['CU-Propagation-Check'].txt), JSON.stringify(c['CU-Propagation-Check']));
    T('F7', 'a daily bot whose last run was 40 hours ago (more than 1.5 x 24 h) is red LATE', /LATE/.test(c['CU-Orchestrator'].txt) && /\bbad\b/.test(c['CU-Orchestrator'].cls), JSON.stringify(c['CU-Orchestrator']));
    T('F7', 'a weekly bot (interval 604800 s = 7 days), last run 5 days ago: green "every 7 days"', /\bok\b/.test(c['CU-Local-Executor'].cls) && /every 7 days/.test(c['CU-Local-Executor'].txt), JSON.stringify(c['CU-Local-Executor']));
    T('F7', 'an hourly bot last run 80 minutes ago (inside 1.5 x 60) is green; 100 minutes ago is red LATE', /\bok\b/.test(c['CU-TokenMonitor-Hourly'].cls) && /LATE/.test(c['CU-Inbox-Job-Watcher'].txt), JSON.stringify([c['CU-TokenMonitor-Hourly'], c['CU-Inbox-Job-Watcher']]));
    T('F7', 'an interval over 7 days (604801) makes only THAT bot grey "lateness cannot be judged"; the others keep their own verdicts', /lateness cannot be judged/.test(c['VTES-LOCAL-POLLER'].txt) && /\bunp\b/.test(c['VTES-LOCAL-POLLER'].cls) && /\bok\b/.test(c['CU-Propagation-Check'].cls), JSON.stringify(c['VTES-LOCAL-POLLER']));
    const dc = fs.readFileSync(path.join(__dirname, 'DATA-CONTRACT.md'), 'utf8');
    T('F7', 'DATA-CONTRACT.md says the same: per-bot interval up to 604800 s (7 days), late after 1.5 x, and a bad per-bot interval greys only that bot', /604800/.test(dc) && /1\.5 x/.test(dc) && /only that (one )?bot/i.test(dc), 'contract text'); await ctx.close(); }
  // ---------- F9: the OLD PANEL label
  { const { ctx, p } = await open(br, stage(null));
    const r = await p.evaluate(() => [...document.querySelectorAll('.tab.panel small')].map(s => { const cs = getComputedStyle(s); let bg = cs.backgroundColor, e = s; while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && e.parentElement) { e = e.parentElement; bg = getComputedStyle(e).backgroundColor; } return { fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, color: cs.color, bg, text: s.textContent }; }));
    T('F9', '10 OLD PANEL labels, each at least 14 px and bold', r.length === 10 && r.every(x => x.fs >= 14 && x.fw >= 700), JSON.stringify(r.map(x => x.fs + '/' + x.fw)));
    T('F9', 'each label has strong contrast (at least 7 to 1, WCAG AAA), computed from its real colours', r.length === 10 && r.every(x => ratio(x.color, x.bg) >= 7), JSON.stringify(r.map(x => ratio(x.color, x.bg).toFixed(1))));
    T('F9', 'each label still says OLD PANEL, snapshot of 2026-09-02, not live', r.every(x => /OLD PANEL, snapshot of 2026-09-02, not live/.test(x.text)), ''); await ctx.close(); }
  // ---------- F10: search matches only what v3 matched
  { const d3 = fs.mkdtempSync(require('os').tmpdir() + '/v3q-'); fs.copyFileSync(V3, d3 + '/VTES-LLM-LAUNCHER_v3.html');
    const ctx3 = await br.newContext({ viewport: { width: 1300, height: 900 } }), p3 = await ctx3.newPage(); await ctx3.route(u => /^(https?|file:\/\/\/C:)/.test(u.toString()), r => r.abort()); await p3.goto('file://' + d3 + '/VTES-LLM-LAUNCHER_v3.html');
    const o5 = await open(br, stage(fresh(NOWMS)));
    const names = async p => p.$$eval('.card:not(.hide)', e => e.map(x => (x.querySelector('.name') || { textContent: x.textContent.slice(0, 30) }).textContent.trim()).sort());
    const q = async (p, t) => { await p.fill('#q', t); await sleep(p, 120); return names(p); };
    const same = ['rambo', 'bot', 'proven', 'codex', 'grok', 'cowork', 'iphone', 'claude', 'ollama', 'local', 'chief', 'orchestrator', 'LLM-02', 'LLM-05', '#cowork', 'files on my PC', 'free', 'scarce', 'quota', 'terminal', 'inbox', 'poller', 'email', 'drive', 'pii'];
    const diffs = []; let counts = {};
    for (const t of same) { const a = await q(p3, t), b = await q(o5.p, t); counts[t] = a.length + '/' + b.length; const expectB = (t === 'inbox') ? a.filter(n => !/^LOCAL/.test(n)) : a; /* round 6, flaw 2: the LOCAL card no longer names the folder VTES-Inbox-LOCAL (it is inside Google Drive), so the word inbox no longer finds it */ if (JSON.stringify(expectB) !== JSON.stringify(b)) { diffs.push(t + ': v3 ' + a.length + ' v5 ' + b.length); } }
    T('F10', 'for ' + same.length + ' search words the same cards match on v3 and on v5 (counts v3/v5: ' + JSON.stringify(counts) + ')', diffs.length === 0, diffs.join(' ; '));
    const r5 = await q(o5.p, 'rambo'), b5 = await q(o5.p, 'bot'), p5 = await q(o5.p, 'proven');
    T('F10', '"rambo" stays near v3 (9 cards), "bot" stays 6, "proven" stays 1 (v5 gives ' + r5.length + ', ' + b5.length + ', ' + p5.length + ')', r5.length === 9 && b5.length === 6 && p5.length === 1, [r5.length, b5.length, p5.length].join(','));
    const state = []; for (const t of ['no data', 'what fixes it', 'state of', 'copied the packet', 'not proven', 'does not open yet', 'steps:']) { const a = await q(o5.p, t); if (a.length) { state.push(t + ' -> ' + a.length); } }
    T('F10', 'words that exist only in the live state lines and steps match no card (as on v3)', state.length === 0, state.join(' ; '));
    await ctx3.close(); await o5.ctx.close(); }
  // ---------- F12: Codex CLI must not open chatgpt.com
  { const { ctx, p, pops } = await open(br, stage(fresh(NOWMS)));
    const r = await p.evaluate(() => ({ links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => /chatgpt\.com/.test(h)), btn: !!document.querySelector('#card-LLM-06 button.bigcopy'), steps: (document.querySelector('#card-LLM-06 .v5na2') || { textContent: '' }).textContent, open: !!document.querySelector('#card-LLM-06 a.btn') }));
    T('F12', 'no link anywhere on the page goes to chatgpt.com, and the Codex CLI card has no Open button', r.links.length === 0 && !r.open, JSON.stringify(r.links));
    T('F12', 'the Codex CLI card has a Copy packet button and the sign-in click path (round 5: the desktop executor (RAMBO) runs Codex, and the sign-in shortcut; no typed command)', r.btn && /desktop executor \(RAMBO\)/.test(r.steps) && /Codex - sign in \(Jorge\)/.test(r.steps), r.steps.slice(0, 200));
    await stubCopy(p); if (r.btn) { await p.click('#card-LLM-06 button.bigcopy'); await sleep(p, 300); } const clip = await p.evaluate(() => window.__clip);
    T('F12', 'its button copies a packet addressed to LLM-06 and opens no new page', !!clip && /->  LLM-06 \(/.test(clip.split('\n')[0]) && ctx.pages().length === 1, String(clip).slice(0, 80));
    await p.selectOption('#to', 'LLM-06'); await p.evaluate(() => { window.__clip = null; }); await p.click('#go'); await sleep(p, 400);
    T('F12', '"Copy packet and open" with To = LLM-06 opens no page (v3 opened chatgpt.com)', ctx.pages().length === 1, ctx.pages().map(x => x.url()).join(',')); await ctx.close(); }
  // ---------- F13 / F14 / F17: wording
  { const { ctx, p } = await open(br, stage(fresh(NOWMS)));
    await p.selectOption('#to', 'LLM-05'); await p.click('#go'); await sleep(p, 400); const st = await p.innerText('#status'); const body = await p.innerText('body');
    T('F13', 'AirDrop (and Notes-first) appear nowhere on the page, including the Copy-and-open status for the iPhone', !/airdrop/i.test(body + st) && !/Notes first/i.test(body + st), (body.match(/.{30}airdrop.{30}/i) || [''])[0] + st);
    T('F13', 'the iPhone card gives a step that works on a Windows PC (a new email to yourself)', /new email to yourself/.test(await p.innerText('#card-LLM-05')), '');
    const steps = async id => (await p.$$eval('#card-' + id + ' .v5na2', e => e.map(x => x.textContent).join(' ')));
    const local = await steps('LOCAL'), grok = await steps('GROK'), rambo = await steps('RAMBO');
    T('F14', 'LOCAL steps are click by click in File Explorer and send the packet nowhere else (round 5, N10: they used to hand it to RAMBO, which is Claude)', /right-click/i.test(local) && /Text Document/.test(local) && /File name extensions/.test(local) && !/open Google Drive, open the folder VTES-Inbox-LOCAL/.test(local) && !/blue RAMBO button for it[^.]*\./.test(local.replace(/Do NOT[^.]*\./, '')), local);
    T('F14', 'GROK steps do not tell Jorge to run Second-Opinion.ps1 -Prompt and (round 5, N10) do not route the packet through RAMBO', !/Second-Opinion\.ps1/.test(grok) && !/RAMBO/.test(grok.replace(/Steps:/, '')) && /grok\.com/.test(grok), grok);
    T('F14', 'RAMBO step "save a JOB file" is click by click (File Explorer, right-click, New, Text Document)', /right-click/.test(rambo) && /Text Document/.test(rambo) && !/save the packet as JOB-something\.md in G:/i.test(rambo), rambo);
    for (const [to, bad] of [['LOCAL', /CLASS:|JOB-\*\.md|G:\\/], ['CODEX', /codex exec|<task>/], ['RAMBO', /JOB-\*\.md|G:\\/], ['GROK', /Second-Opinion\.ps1 -Prompt/]]) {
      await p.selectOption('#to', to); await p.click('#go'); await sleep(p, 300); const stt = await p.innerText('#status');
      T('F14', 'Copy packet and open for ' + to + ': the status line hands Jorge no command or file path job (it said: ' + stt.slice(0, 90) + ')', !bad.test(stt) && stt.length > 20, stt); }
    T('F17', 'the footer no longer claims "your v3 file is untouched"', !/untouched/i.test(body) && /TRK-2026-9910-B . v5 . built .* . CURRENT\./.test(body.replace(/\s+/g, ' ')), (body.match(/.{40}CURRENT.{60}/) || [''])[0]);
    await ctx.close(); }
  // ---------- F15: repair row 10 and times with no zone
  { const { ctx, p } = await open(br, stage(fresh(NOWMS)));
    const rows = await p.$$eval('.repair-log tbody tr', e => e.map(x => x.innerText.replace(/\s+/g, ' ')));
    T('F15', 'repair row 10 keeps its words and shows the visible label (round 5, N15: only what was typed: the date, and that no zone was given)', rows.length === 12 && /Burn-rate agent installed, runs 7:00 AM daily \(typed note 2026-10-02; the note gives no time zone/.test(rows[9]), rows[9]);
    const body = (await p.innerText('body')).replace(/\s+/g, ' '); const bad = []; const re = /\b\d{1,2}:\d{2}\s?(AM|PM)\b/g; let m; while ((m = re.exec(body))) { const tail = body.slice(m.index, m.index + 70); if (!/\b(EDT|EST)\b/.test(tail.slice(0, 20)) && !/typed note 2026-10-02; the note gives no time zone/.test(tail)) { bad.push(tail); } }
    T('F15', 'every clock time on the page carries a zone (EDT or EST) right after it, except the typed 7:00 AM, which says no zone was given', bad.length === 0, bad.join(' | '));
    const pk = fs.readdirSync(L.PKG, { recursive: true }).filter(f => fs.statSync(path.join(L.PKG, f)).isFile()); const stamps = pk.filter(f => /\d{4}-\d\d-\d\d_\d{4}/.test(fs.readFileSync(path.join(L.PKG, f), 'utf8')));
    T('F15', 'no package file holds an installer-style time with no zone (YYYY-MM-DD_HHMM)', stamps.length === 0, stamps.join(','));
    await ctx.close(); }
  await br.close(); const pass = res.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ pkg: L.PKG, pass, total: res.length, results: res }, null, 1)); console.log('FIXES-R4: ' + pass + ' of ' + res.length + ' pass (' + L.PKG + ')');
})();
