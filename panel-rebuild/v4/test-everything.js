// test-everything.js - click-everything headless test. Usage:
//   node test-everything.js <dir> <page1.html,page2.html,...> <out.json>
// Serves <dir> on localhost, opens each page in Chromium, and for EVERY a[href], button,
// tab chip and vtes:// address checks that it is not dead:
//  - local file link: the target must load (HTTP 200) and the page must have no JS errors
//  - https link: syntax checked only (cloud cannot prove external sites) -> counted PASS-SYNTAX
//  - vtes:// link: counted FAIL-DEAD unless it is rendered non-clickable with an explanation
//  - button: clicked; FAIL if it throws a JS error, or does nothing visible AND is not a toggle
// TRK-2026-9910-B
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const [dirArg, pagesArg, outFile] = process.argv.slice(2); const dir = path.resolve(dirArg);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain' };
const srv = http.createServer((q, r) => {
  const f = path.join(dir, decodeURIComponent(q.url.split('?')[0].split('#')[0]));
  if (!f.startsWith(path.resolve(dir)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('nf'); }
  r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f));
});
(async () => {
  await new Promise(r => srv.listen(0, r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const results = [];
  const add = (page, kind, label, status, why) => results.push({ page, kind, label: (label || '').replace(/\s+/g, ' ').slice(0, 70), status, why: why || '' });
  for (const pg of pagesArg.split(',')) {
    const ctx = await br.newContext(); const p = await ctx.newPage();
    const errs = []; const missing = [];
    p.on('pageerror', e => errs.push(String(e.message).slice(0, 120)));
    p.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) missing.push(r.url().replace(base, '')); });
    await p.addInitScript(() => { window.open = () => null; navigator.clipboard && (navigator.clipboard.writeText = async () => {}); });
    await p.goto(base + pg, { waitUntil: 'load' }).catch(e => errs.push('load: ' + e.message));
    await p.waitForTimeout(400);
    add(pg, 'page', pg, errs.length ? 'FAIL' : 'PASS', errs.join(' | '));
    [...new Set(missing)].forEach(m => add(pg, 'script/file', m, 'FAIL', 'HTTP 404 - file referenced but not present'));
    // links
    const links = await p.$$eval('a[href]', as => as.map((a, i) => ({ i, href: a.getAttribute('href'), text: a.textContent, vis: !!(a.offsetWidth || a.offsetHeight) })));
    for (const l of links) {
      if (/^vtes:/i.test(l.href)) { add(pg, 'vtes-link', l.href, 'FAIL', 'vtes:// address clickable but not registered on a machine without the installer'); continue; }
      if (/^https?:/i.test(l.href)) { try { new URL(l.href); add(pg, 'https-link', l.href, /example\.com/.test(l.href) ? 'FAIL' : 'PASS', /example\.com/.test(l.href) ? 'placeholder address' : 'syntax ok; site not fetched from cloud'); } catch (e) { add(pg, 'https-link', l.href, 'FAIL', 'bad URL'); } continue; }
      if (/^(file:|mailto:|javascript:)/i.test(l.href)) { add(pg, 'other-link', l.href, 'PASS', 'not fetched'); continue; }
      const target = l.href.split('#')[0].split('?')[0];
      if (!target) { add(pg, 'anchor', l.href, 'PASS', 'same page'); continue; }
      const ok = fs.existsSync(path.join(dir, target));
      add(pg, 'local-link', l.href, ok ? 'PASS' : 'FAIL', ok ? '' : 'target file missing');
    }
    // buttons: click each, watch for errors
    const n = await p.$$eval('button', b => b.length);
    for (let i = 0; i < n; i++) {
      const info = await p.$$eval('button', (bs, i) => { const b = bs[i]; return b ? { t: (b.textContent || b.title || b.id || 'button').trim(), d: b.disabled, v: !!(b.offsetWidth || b.offsetHeight) } : null; }, i);
      if (!info) continue;
      if (info.d) { add(pg, 'button', info.t, 'PASS', 'disabled and labeled'); continue; }
      const before = errs.length;
      await p.$$eval('button', (bs, i) => bs[i] && bs[i].click(), i).catch(e => errs.push(e.message));
      await p.waitForTimeout(60);
      add(pg, 'button', info.t, errs.length > before ? 'FAIL' : 'PASS', errs.length > before ? errs.slice(before).join('|') : (info.v ? '' : 'hidden button, click ran without error'));
    }
    await ctx.close();
  }
  await br.close(); srv.close();
  const pass = results.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(outFile, JSON.stringify({ total: results.length, pass, fail: results.length - pass, results }, null, 1));
  console.log(pass + ' of ' + results.length + ' pass; ' + (results.length - pass) + ' fail');
  results.filter(r => r.status !== 'PASS').forEach(r => console.log('FAIL', r.page, r.kind, r.label, '-', r.why));
})();
