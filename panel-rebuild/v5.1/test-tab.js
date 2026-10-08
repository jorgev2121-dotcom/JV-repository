const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1536, height: 730 } });
  await p.goto('file://' + process.argv[2] + '/VTES-LLM-LAUNCHER_v5.html'); await p.waitForTimeout(1200);
  const res = [];
  for (const sel of ['.tab >> nth=0', '.tab.panel >> nth=0', '.tab.v51soon >> nth=0', '#go']) {
    const el = await p.$(sel); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
    const bx = await el.boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.waitForTimeout(200);
    res.push(sel + ' => ' + await p.evaluate(() => { const t = document.getElementById('v51tip'); return t.style.display + ' | ' + t.textContent; }));
    if (sel.includes('v51soon')) await p.screenshot({ path: process.argv[3] + '/v51-tip-soon.png' });
    await p.mouse.move(5, 700); await p.waitForTimeout(100);
  }
  console.log(res.join('\n')); await b.close();
})();
