const { chromium } = require('playwright');
const path = require('path');
const V5 = 'file://' + process.argv[2] + '/VTES-LLM-LAUNCHER_v5.html';
const V51 = 'file://' + process.argv[3] + '/VTES-LLM-LAUNCHER_v5.html';
const OUT = process.argv[4];
async function probe(url, tag, w, h) {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await p.goto(url); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const q = s => document.querySelectorAll(s).length;
    return { tabs: q('.tab'), soonTabs: q('.tab.v51soon'), pages: q('.v51page'), key: q('#v51key li'),
      tabsNoTip: [...document.querySelectorAll('.tab')].filter(t => !t.dataset.tip).length,
      btns: q('button, a.btn'), btnsNoTip: [...document.querySelectorAll('button, a.btn')].filter(t => !t.dataset.tip).length,
      abbr: q('abbr.v51g'), pills: q('.v51pill'), cards: q('.card'),
      overflowX: document.documentElement.scrollWidth > window.innerWidth };
  });
  // search still filters
  await p.fill('#q', 'ollama'); await p.waitForTimeout(200);
  r.hiddenOnSearch = await p.evaluate(() => document.querySelectorAll('.card.hide').length);
  await p.fill('#q', ''); 
  // LOCAL packet last line
  await p.selectOption('#to', 'LOCAL'); await p.click('#show'); await p.waitForTimeout(200);
  r.localLast = await p.evaluate(() => { const v = document.getElementById('preview').value.split('\n'); return v[v.length - 1]; });
  r.textLen = await p.evaluate(() => document.body.innerText.replace(/\s+/g,' ').length);
  if (tag === 'v51') {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.hover('.tab >> nth=0'); await p.waitForTimeout(150);
    r.tipOnTab = await p.evaluate(() => { const t = document.getElementById('v51tip'); return t.style.display + ' | ' + t.textContent; });
    const ab = await p.$('abbr.v51g'); await ab.scrollIntoViewIfNeeded(); await ab.hover(); await p.waitForTimeout(150);
    r.tipOnAbbr = await p.evaluate(() => document.getElementById('v51tip').textContent);
    await p.screenshot({ path: OUT + '/v51-' + w + '-top.png' });
    await p.evaluate(() => document.getElementById('v51-soon').scrollIntoView());
    await p.screenshot({ path: OUT + '/v51-' + w + '-soon.png' });
    await p.waitForTimeout(61000); // one live refresh cycle
    r.afterRefresh = await p.evaluate(() => ({ abbr: document.querySelectorAll('abbr.v51g').length, nested: document.querySelectorAll('abbr abbr').length, btnsNoTip: [...document.querySelectorAll('button, a.btn')].filter(t => !t.dataset.tip).length }));
  }
  r.errors = errs; await b.close(); return r;
}
(async () => {
  for (const [w, h] of [[1536, 730], [390, 844]]) {
    const a = await probe(V5, 'v5', w, h); const c = await probe(V51, 'v51', w, h);
    console.log(JSON.stringify({ size: w + 'x' + h, v5: a, v51: c }, null, 1));
  }
})();
