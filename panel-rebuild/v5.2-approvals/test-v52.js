/* test-v52.js - panel v5.2 NEEDS MY APPROVAL test. Run:
   NODE_PATH=/opt/node-tools/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node test-v52.js <v5.1 package> <v5.2 package> <scratch dir> <screenshot dir>
   It copies the v5.2 package into the scratch dir (fresh, stale and no-data copies); it never edits the package itself. */
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const [V51, V52, TMP, SHOTS] = process.argv.slice(2);
const PAGE = '/VTES-LLM-LAUNCHER_v5.html';
const results = []; let fails = 0;
function check(name, ok, detail) { results.push((ok ? 'PASS ' : 'FAIL ') + name + (detail !== undefined ? ' -> ' + JSON.stringify(detail) : '')); if (!ok) fails++; }

function copyPkg(dst, mutate) {
  fs.rmSync(dst, { recursive: true, force: true }); fs.cpSync(V52, dst, { recursive: true });
  const f = path.join(dst, 'data/vtes5-approvals.js');
  if (mutate === 'remove') fs.rmSync(f);
  else if (mutate) { const s = fs.readFileSync(f, 'utf8').replace(/"written": "[^"]+"/, '"written": "' + mutate + '"'); fs.writeFileSync(f, s); }
  return dst;
}
function isoAgo(h) { const d = new Date(Date.now() - h * 3600e3); return d.toISOString().replace(/\.\d+Z$/, 'Z'); }

const FAKE_FSA = ({ folderName, mode }) => {
  window.__files = {}; window.__pickerCalls = 0;
  const dir = {
    name: folderName, kind: 'directory',
    queryPermission: async () => 'granted', requestPermission: async () => 'granted',
    getFileHandle: async (name) => ({
      name, createWritable: async () => { let buf = ''; return { write: async (t) => { buf += t; }, close: async () => { window.__files[name] = buf; } }; },
      getFile: async () => ({ text: async () => window.__files[name] })
    })
  };
  window.showDirectoryPicker = async () => { window.__pickerCalls++; if (mode === 'abort') { const e = new Error('closed'); e.name = 'AbortError'; throw e; } return dir; };
};

async function open(browser, dir, w, h, init) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  try { await ctx.grantPermissions(['clipboard-read', 'clipboard-write']); } catch (e) { }
  if (init) await ctx.addInitScript(init.fn, init.arg);
  const p = await ctx.newPage();
  const errs = [], consoleErrs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });
  await p.goto('file://' + dir + PAGE); await p.waitForTimeout(1500);
  return { ctx, p, errs, consoleErrs };
}
async function legacy(p) {
  await p.fill('#q', 'ollama'); await p.waitForTimeout(250);
  const hidden = await p.evaluate(() => document.querySelectorAll('.card.hide').length + ' of ' + document.querySelectorAll('.card').length);
  await p.fill('#q', '');
  await p.selectOption('#to', 'LOCAL'); await p.click('#show'); await p.waitForTimeout(200);
  const last = await p.evaluate(() => { const v = document.getElementById('preview').value.split('\n'); return v[v.length - 1]; });
  return { hidden, last };
}
const T = p => p.evaluate(() => document.getElementById('v52sec').innerText);
const overflow = p => p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
const NOSENT = /saved in your|your answer is saved|was sent|has been sent|sent to rambo|delivered/i;

(async () => {
  const browser = await chromium.launch();
  const fresh = copyPkg(path.join(TMP, 'fresh'), new Date().toISOString().replace(/\.\d+Z$/, 'Z'));
  const stale = copyPkg(path.join(TMP, 'stale'), isoAgo(30));
  const nodata = copyPkg(path.join(TMP, 'nodata'), 'remove');
  const noFSA = { fn: () => { try { delete window.showDirectoryPicker; } catch (e) { } window.showDirectoryPicker = undefined; } };

  for (const [w, h] of [[1536, 730], [390, 844]]) {
    const sz = w + 'x' + h + ': ';
    /* baseline v5.1 vs shipped v5.2 (the package exactly as committed) */
    const a = await open(browser, V51, w, h); const la = await legacy(a.p); await a.ctx.close();
    const b = await open(browser, V52, w, h);
    const lb = await legacy(b.p);
    check(sz + 'v5.1 page errors 0', a.errs.length === 0, a.errs);
    check(sz + 'v5.2 page errors 0 (shipped package)', b.errs.length === 0 && b.consoleErrs.length === 0, b.errs.concat(b.consoleErrs));
    check(sz + 'search "ollama" hides the same cards as v5.1', la.hidden === lb.hidden, { v51: la.hidden, v52: lb.hidden });
    check(sz + 'LOCAL packet last line unchanged', la.last === lb.last, lb.last);
    const s0 = await b.p.evaluate(() => ({
      head: document.getElementById('v52-approvals').textContent, headCls: document.getElementById('v52head').className,
      afterKey: (document.getElementById('v51key') || {}).nextElementSibling === document.getElementById('v52sec'),
      placeholder: !!document.getElementById('v51-approvals-new'), tab: (document.querySelector('a.v52tab') || {}).textContent,
      greyTabs: document.querySelectorAll('.tab.v51soon').length, choices: [...document.querySelectorAll('.v52choice')].map(x => x.innerText.split('\n')[0]),
      sample: document.querySelectorAll('#v52card .v52sample').length, count: (document.querySelector('.v52count') || {}).textContent,
      allButtons: [...document.querySelectorAll('#v52sec button')].every(x => x.tagName === 'BUTTON')
    }));
    check(sz + 'card renders under the colour key, amber header', s0.afterKey && /^5 things need your OK$/.test(s0.head) && /you/.test(s0.headCls), s0);
    check(sz + 'placeholder replaced, tab live (grey tabs 9 -> 8)', !s0.placeholder && /NEEDS MY APPROVAL/.test(s0.tab) && s0.greyTabs === 8, { tab: s0.tab, grey: s0.greyTabs });
    check(sz + 'recommended first and labelled, card 1 of 5, SAMPLE tag', /\(Recommended\)$/.test(s0.choices[0]) && s0.count === 'Card 1 of 5' && s0.sample === 1 && s0.allButtons, s0.choices);
    check(sz + 'no sideways scroll (shipped page)', !(await overflow(b.p)));
    await b.p.click('a.v52tab'); await b.p.waitForTimeout(1200);
    const jump = await b.p.evaluate(() => ({ barBottom: Math.round(document.getElementById('tabs').getBoundingClientRect().bottom), headTop: Math.round(document.getElementById('v52head').getBoundingClientRect().top), sticky: getComputedStyle(document.getElementById('tabs')).position === 'sticky' }));
    check(sz + 'NEEDS MY APPROVAL tab jumps to the section, header not under the tab bar', !jump.sticky || jump.headTop >= jump.barBottom, jump);
    if (w === 1536) { await b.p.screenshot({ path: path.join(SHOTS, 'v52-1536-card.png') }); }
    await b.ctx.close();

    /* flow with File System Access unavailable: recommended -> follow-up -> Done with Copy fallback, no "sent" claim */
    const c = await open(browser, fresh, w, h, noFSA);
    await c.p.click('.v52choice.rec');
    const fu = await T(c.p);
    check(sz + 'clicking Recommended advances to the follow-up card', /follow-up question/.test(fu) && /Draft the invoices after the rename\?/.test(fu));
    check(sz + 'focus moves to the new card heading', await c.p.evaluate(() => document.activeElement && document.activeElement.id === 'v52focus'));
    await c.p.click('.v52choice.rec');
    const dn = await T(c.p);
    const copyBtn = await c.p.locator('[data-act="copy"]').count();
    check(sz + 'no-FSA: Done card shows with Copy fallback and the RAMBO paste sentence', /Not sent yet/.test(dn) && copyBtn === 1 && /paste it into the RAMBO window/.test(dn) && /What happens next:/.test(dn), dn.slice(0, 160));
    check(sz + 'no-FSA: no "saved"/"sent" claim anywhere', !NOSENT.test(dn));
    check(sz + 'no-FSA: header now 4 things', (await c.p.textContent('#v52-approvals')) === '4 things need your OK');
    await c.p.click('[data-act="copy"]'); await c.p.waitForTimeout(300);
    const copied = await c.p.textContent('#v52copied');
    let clip = ''; try { clip = await c.p.evaluate(() => navigator.clipboard.readText()); } catch (e) { clip = 'unreadable: ' + e.message; }
    check(sz + 'Copy answer copies the answer text', /^Copied\./.test(copied) && /Item id: SAMPLE-TEDC-RENAME/.test(clip) && /Chosen: Yes, rename them/.test(clip) && /Answered by Jorge in the panel\./.test(clip), { copied, clip: clip.slice(0, 80) });
    if (w === 390) { await c.p.locator('#v52card').scrollIntoViewIfNeeded(); await c.p.screenshot({ path: path.join(SHOTS, 'v52-390-done-copy-fallback.png') }); }
    await c.p.click('[data-act="next"]');
    const n2 = await T(c.p);
    check(sz + 'Next card: Medley shows "No recommendation" and card 1 of 4', /Card 1 of 4/.test(n2) && /No recommendation/.test(n2));
    await c.p.click('[data-act="later"]');
    check(sz + 'Later moves to card 2 of 4 without answering', /Card 2 of 4/.test(await T(c.p)) && (await c.p.textContent('#v52-approvals')) === '4 things need your OK');
    check(sz + 'no-FSA flow page errors 0', c.errs.length === 0 && c.consoleErrs.length === 0, c.errs.concat(c.consoleErrs));
    check(sz + 'no sideways scroll (done/follow-up flow)', !(await overflow(c.p)));
    await c.ctx.close();

    /* flow with a working folder (File System Access mocked): setup once, write, read back, green Done */
    const d = await open(browser, fresh, w, h, { fn: FAKE_FSA, arg: { folderName: 'VTES-Inbox', mode: 'ok' } });
    await d.p.click('.v52choice.rec'); await d.p.click('.v52choice.rec');
    const su = await T(d.p);
    check(sz + 'FSA: first answer asks once for the VTES-Inbox folder', /One-time setup/.test(su) && /Pick the VTES-Inbox folder \(Recommended\)/.test(su));
    await d.p.click('[data-act="pick"]'); await d.p.waitForTimeout(300);
    const ok1 = await d.p.evaluate(() => ({ text: document.getElementById('v52sec').innerText, cls: document.querySelector('#v52card .v52card').className, files: window.__files, calls: window.__pickerCalls }));
    const names = Object.keys(ok1.files);
    check(sz + 'FSA: green Done card after the write was read back', /Done\. Your answer is saved\./.test(ok1.text) && /\bok\b/.test(ok1.cls), ok1.cls);
    check(sz + 'FSA: one file APPROVE_<id>_<yyyymmdd-hhmmss>.md with id, label, time, signature', names.length === 1 && /^APPROVE_SAMPLE-TEDC-RENAME_\d{8}-\d{6}\.md$/.test(names[0]) &&
      /Item id: SAMPLE-TEDC-RENAME/.test(ok1.files[names[0]]) && /Chosen: Yes, rename them/.test(ok1.files[names[0]]) && /Follow-up: .* -> Chosen: Yes, draft the invoices/.test(ok1.files[names[0]]) &&
      /Answered at: \d{4}-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d/.test(ok1.files[names[0]]) && /Answered by Jorge in the panel\./.test(ok1.files[names[0]]) && /SAMPLE - not real/.test(ok1.files[names[0]]), names);
    await d.p.click('[data-act="next"]'); await d.p.click('.v52choice >> nth=1'); await d.p.waitForTimeout(300);
    const ok2 = await d.p.evaluate(() => ({ n: Object.keys(window.__files).length, calls: window.__pickerCalls, text: document.getElementById('v52sec').innerText }));
    check(sz + 'FSA: second answer writes without asking again', ok2.n === 2 && ok2.calls === 1 && /Your answer is saved/.test(ok2.text), ok2.n + ' files, ' + ok2.calls + ' folder prompts');
    check(sz + 'FSA flow page errors 0', d.errs.length === 0, d.errs);
    await d.ctx.close();

    /* wrong folder and closed folder window: never claims saved */
    const e = await open(browser, fresh, w, h, { fn: FAKE_FSA, arg: { folderName: 'Downloads', mode: 'ok' } });
    await e.p.click('.v52choice.rec'); await e.p.click('.v52choice.rec'); await e.p.click('[data-act="pick"]'); await e.p.waitForTimeout(200);
    const wr = await T(e.p);
    check(sz + 'wrong folder is refused and nothing is written', /That folder is called "Downloads"/.test(wr) && (await e.p.evaluate(() => Object.keys(window.__files).length)) === 0);
    await e.ctx.close();
    const f = await open(browser, fresh, w, h, { fn: FAKE_FSA, arg: { folderName: 'VTES-Inbox', mode: 'abort' } });
    await f.p.click('.v52choice.rec'); await f.p.click('.v52choice.rec'); await f.p.click('[data-act="pick"]'); await f.p.waitForTimeout(200);
    const ab = await T(f.p);
    check(sz + 'closed folder window falls back to Copy, no saved claim', /You closed the folder window/.test(ab) && /Not sent yet/.test(ab) && !NOSENT.test(ab), ab.slice(0, 600));
    await f.ctx.close();

    /* NO DATA and STALE */
    const g = await open(browser, nodata, w, h);
    const nd = await g.p.evaluate(() => ({ head: document.getElementById('v52-approvals').textContent, line: document.getElementById('v52line').textContent, lineCls: document.getElementById('v52line').className, choices: document.querySelectorAll('.v52choice').length, text: document.getElementById('v52sec').innerText }));
    check(sz + 'data removed: red NO DATA line, no cards, never "0 items"', /NO DATA/.test(nd.head) && /^NO DATA - /.test(nd.line) && /bad/.test(nd.lineCls) && nd.choices === 0 && !/\b0 things\b/.test(nd.text), nd.line);
    check(sz + 'data removed: page errors 0 (the missing-file console line is expected)', g.errs.length === 0, { pageErrors: g.errs, consoleErrors: g.consoleErrs.length });
    const lg = await legacy(g.p); check(sz + 'data removed: rest of panel unchanged', lg.hidden === la.hidden && lg.last === la.last);
    await g.ctx.close();
    const st = await open(browser, stale, w, h);
    const sl = await st.p.textContent('#v52line');
    check(sz + 'list older than 26 hours: red STALE since line', /^STALE since .*(EDT|EST)/.test(sl) && /bad/.test(await st.p.getAttribute('#v52line', 'class')), sl);
    await st.ctx.close();
  }

  /* keyboard only, 200% zoom (1536 at 200% = 768 CSS px wide), and no speech engine */
  const k = await open(browser, fresh, 768, 365, noFSA);
  await k.p.locator('.v52choice.rec').focus(); await k.p.keyboard.press('Enter'); await k.p.waitForTimeout(100);
  let tabs = 0; for (; tabs < 8; tabs++) { await k.p.keyboard.press('Tab'); if (await k.p.evaluate(() => document.activeElement.classList.contains('v52choice'))) break; }
  const ring = await k.p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth; });
  check('768x365 (200% zoom): Tab reaches the first button after ' + (tabs + 1) + ' presses; focus ring visible', tabs < 8 && /solid 4px/.test(ring), ring);
  await k.p.keyboard.press('Enter'); await k.p.waitForTimeout(100);
  check('768x365 (200% zoom): Enter answers; Done card shows', /Not sent yet/.test(await T(k.p)));
  check('768x365 (200% zoom): no sideways scroll', !(await overflow(k.p)));
  check('768x365 keyboard page errors 0', k.errs.length === 0, k.errs);
  await k.ctx.close();
  const sp = await open(browser, fresh, 390, 844, { fn: () => { try { delete window.speechSynthesis; } catch (e) { } Object.defineProperty(window, 'speechSynthesis', { value: undefined }); } });
  const spt = await T(sp.p);
  check('no speech engine: plain note instead of Read aloud, no errors', /Read aloud does not work in this browser/.test(spt) && sp.errs.length === 0, sp.errs);
  await sp.ctx.close();
  const rd = await open(browser, fresh, 390, 844);
  await rd.p.click('[data-act="read"]'); await rd.p.waitForTimeout(200);
  check('Read aloud button runs without error', rd.errs.length === 0 && /Reading aloud/.test(await rd.p.textContent('#v52msg')), rd.errs);
  await rd.ctx.close();

  /* the 60-second reload: delete the data file while the page is open -> NO DATA on the next reload */
  const r = await open(browser, copyPkg(path.join(TMP, 'reload'), new Date().toISOString().replace(/\.\d+Z$/, 'Z')), 1536, 730);
  fs.rmSync(path.join(TMP, 'reload/data/vtes5-approvals.js'));
  await r.p.evaluate(() => window.VTES52.reload()); await r.p.waitForTimeout(500);
  check('reload after the file is deleted shows NO DATA', /^NO DATA - /.test(await r.p.textContent('#v52line')));
  await r.ctx.close();

  await browser.close();
  console.log(results.join('\n'));
  console.log('\n' + (results.length - fails) + ' of ' + results.length + ' checks passed');
  process.exit(fails ? 1 : 0);
})();
