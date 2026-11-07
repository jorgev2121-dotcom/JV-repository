// Playwright proof for tools/version-viewer. Run: node tools/version-viewer/test-shots/run-test.js
// Writes screenshots (deviceScaleFactor 1) next to this file and prints PASS/FAIL lines.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const URL = 'file://' + path.resolve(DIR, '..', 'demo.html');
const results = [];
function check(name, ok, detail) { results.push({ name, ok: !!ok, detail: detail || '' }); console.log((ok ? 'PASS' : 'FAIL') + '  ' + name + (detail ? '  (' + detail + ')' : '')); }

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  async function run(label, viewport, colorScheme) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(label + ': ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(label + ': console ' + m.text()); });
    await page.goto(URL);

    // 1. Opens on the current version with its date
    const head = await page.textContent('.vv-vbtn');
    check(label + ' opens on current version v1.1 with date', /v1\.1 \(current\)/.test(head) && /Nov 6, 2026/.test(head), head.trim().replace(/\s+/g, ' '));
    check(label + ' banner hidden on current', (await page.getAttribute('.vv-banner', 'data-show')) === 'false');
    check(label + ' body shows the revised time', /2:30 PM/.test(await page.textContent('.vv-body')));
    await page.screenshot({ path: path.join(DIR, label + '-1-current.png'), fullPage: true });

    // 2. Dropdown lists prior versions, newest first, each with View and Use
    await page.click('.vv-vbtn');
    check(label + ' dropdown opens', (await page.getAttribute('.vv-menu', 'data-open')) === 'true');
    const labels = await page.$$eval('.vv-item .vv-label', els => els.map(e => e.textContent.trim().split(/\s+/)[0]));
    check(label + ' dropdown lists versions newest first', labels.join(',') === 'v1.1,v1.0', labels.join(','));
    check(label + ' each row has View and Use', (await page.$$('.vv-item .vv-view')).length === 2 && (await page.$$('.vv-item .vv-use')).length === 2);
    await page.screenshot({ path: path.join(DIR, label + '-2-dropdown.png'), fullPage: true });

    // 3. View the old appointment: banner with the exact wording and a jump button
    await page.click('.vv-item .vv-view[data-v="1.0"]');
    const btext = await page.textContent('.vv-btext');
    check(label + ' banner text when old version shown', btext === 'A newer version of this is available: v1.1 (Nov 6, 2026)', btext);
    check(label + ' old body shows original 10:00 AM time', /10:00 AM/.test(await page.textContent('.vv-body')));
    check(label + ' header says v1.0 (older)', /v1\.0 \(older\)/.test(await page.textContent('.vv-vbtn')));
    await page.screenshot({ path: path.join(DIR, label + '-3-old-version-banner.png'), fullPage: true });

    // 4. Jump button returns to current
    await page.click('.vv-jump');
    check(label + ' jump button returns to v1.1', /v1\.1 \(current\)/.test(await page.textContent('.vv-vbtn')) && (await page.getAttribute('.vv-banner', 'data-show')) === 'false');

    // 5. Use an old version fires the callback
    await page.click('.vv-vbtn');
    await page.click('.vv-item .vv-use[data-v="1.0"]');
    check(label + ' Use on old version fires onUse', /USE v1\.0/.test(await page.textContent('#log')), (await page.textContent('#log')).trim());

    // 6. Adding a change makes exactly +.1
    await page.click('#btn-change');
    check(label + ' add-change makes v1.2 current', /v1\.2 \(current\)/.test(await page.textContent('.vv-vbtn')));

    // 7. No sideways scroll
    const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    check(label + ' no horizontal scroll', widths.scroll <= widths.client, widths.scroll + ' <= ' + widths.client);
    // dropdown open must also stay inside the viewport
    await page.click('.vv-vbtn');
    const box = await page.$eval('.vv-menu', el => el.getBoundingClientRect().right);
    check(label + ' open dropdown stays inside the viewport', box <= viewport.width, 'right edge ' + Math.round(box) + ' <= ' + viewport.width);
    await page.keyboard.press('Escape');

    // 8. Readable text size
    const fs1 = await page.$eval('.vv-body', el => parseFloat(getComputedStyle(el).fontSize));
    check(label + ' body text at least 18px', fs1 >= 18, fs1 + 'px');

    // 9. Colour scheme actually applied
    const bg = await page.$eval('.vv', el => getComputedStyle(el).backgroundColor);
    check(label + ' background matches scheme', colorScheme === 'dark' ? bg === 'rgb(20, 20, 20)' : bg === 'rgb(255, 255, 255)', bg);
    await ctx.close();
  }

  await run('phone-light', { width: 390, height: 844 }, 'light');
  await run('phone-dark', { width: 390, height: 844 }, 'dark');
  await run('desktop-light', { width: 1200, height: 800 }, 'light');

  // Unit checks of the version maths (Node, no browser)
  const VV = require(path.resolve(DIR, '..', 'version-viewer.js'));
  check('nextVersion 1.0 -> 1.1', VV.nextVersion('1.0') === '1.1');
  check('nextVersion 1.9 -> 2.0', VV.nextVersion('1.9') === '2.0');
  check('validate rejects out-of-order versions', (() => { try { VV.validate({ versions: [{ v: '1.1' }, { v: '1.0' }] }); return false; } catch (e) { return true; } })());

  check('no page errors or console errors', errors.length === 0, errors.join(' | '));
  await browser.close();

  const pass = results.filter(r => r.ok).length;
  const line = `RESULT ${pass} of ${results.length} checks passed, ${new Date().toISOString()}`;
  console.log(line);
  fs.writeFileSync(path.join(DIR, 'RESULT.txt'), results.map(r => (r.ok ? 'PASS' : 'FAIL') + '  ' + r.name + (r.detail ? '  (' + r.detail + ')' : '')).join('\n') + '\n' + line + '\n');
  process.exit(pass === results.length ? 0 : 1);
})().catch(e => { console.error('CRASH', e); process.exit(2); });
