// MENU "Coming next list": greyed future pages with dates (BILLING, BOOKS, PROJECTS, COUNTY MONITOR,
// LAUNCHER and the rest of the nine v5.1 planned pages), late/expected computed from today's date,
// the one already built links to its page, hover tips, search finds them, and no dollar figure leaks.
// Usage: node menu-coming-next-test.js <abs panel path> <png path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:1280,height:900}});
await ctx.addInitScript(()=>{window.claude={use:async()=>null}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(300);
console.log('Coming next box visible on MENU',await p.isVisible('#pane-MENU #coming'));
const rows=await p.$$eval('#pane-MENU .cn-row',e=>e.map(x=>({t:x.dataset.cn,k:x.className,dis:x.querySelector('.cn-t').getAttribute('aria-disabled'),pill:x.querySelector('.cn-pill').textContent,op:parseFloat(getComputedStyle(x).opacity),bs:getComputedStyle(x).borderStyle,tip:x.dataset.tip||''})));
const need=['BILLING','BOOKS','PROJECTS','COUNTY MONITOR','LAUNCHER'];
console.log('the five named pages are listed',need.every(n=>rows.some(r=>r.t===n)),rows.length+' rows');
const notBuilt=rows.filter(r=>!/built/.test(r.k));
console.log('unbuilt rows are greyed (dimmed + dashed + aria-disabled)',notBuilt.length>0&&notBuilt.every(r=>r.op<0.9&&r.bs==='dashed'&&r.dis==='true'));
console.log('every unbuilt row carries a date',notBuilt.every(r=>/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}/.test(r.pill)),JSON.stringify(notBuilt.map(r=>r.pill)));
// date logic against a fixed clock, independent of when the test runs
const logic=await p.evaluate(()=>{const C=VTES.coming(new Date(2026,9,14,9));const g=n=>C.state(n);return {books:g('BOOKS'),billing:g('BILLING'),launcher:g('LAUNCHER'),appr:g('NEEDS MY APPROVAL'),html:C.html}});
console.log('past date says LATE with days late (BOOKS, Oct 10 -> 4 days)',logic.books.k==='late'&&/4 days late/.test(logic.books.s),JSON.stringify(logic.books.s));
console.log('today says Expected today (BILLING Oct 14)',logic.billing.k==='today',JSON.stringify(logic.billing.s));
console.log('future says Expected in N days (LAUNCHER Oct 16 -> 2)',logic.launcher.k==='soon'&&/in 2 days/.test(logic.launcher.s),JSON.stringify(logic.launcher.s));
console.log('heading counts with a denominator (8 of 9 not built, 5 late)',/8 of 9 pages not built yet · 5 late/.test(logic.html),JSON.stringify((logic.html.match(/Coming next[^<]*/)||[''])[0]));
console.log('NEEDS MY APPROVAL shown as built with Open APPROVALS',logic.appr.k==='built'&&rows.some(r=>r.t==='NEEDS MY APPROVAL'&&/built/.test(r.k)));
console.log('hover tips on every row',rows.every(r=>r.tip.length>20));
await p.hover('#pane-MENU .cn-row[data-cn="LAUNCHER"]');await p.waitForTimeout(450);
console.log('hover tip shows for LAUNCHER',/LAUNCHER: .*Not built yet/.test(await p.textContent('#tipbox')),JSON.stringify((await p.textContent('#tipbox')).slice(0,70)));
await p.locator('#coming').scrollIntoViewIfNeeded();await p.screenshot({path:process.argv[3]});
// the built row's button goes to APPROVALS; LLM LIBRARY points at LINKS
await p.click('#pane-MENU .cn-row[data-cn="NEEDS MY APPROVAL"] button.go');await p.waitForTimeout(250);
console.log('Open APPROVALS button works',await p.isVisible('#pane-APPROVALS'));
await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(200);
await p.click('#pane-MENU .cn-row[data-cn="LLM LIBRARY"] button.go');await p.waitForTimeout(250);
console.log('LLM LIBRARY button goes to LINKS',await p.isVisible('#pane-LINKS'));
// search finds planned pages
await p.fill('#q','county monitor');await p.waitForTimeout(400);
console.log('search "county monitor" finds the planned page',/Coming next \(not built yet\)/.test(await p.textContent('#searchpane'))&&/COUNTY MONITOR/.test(await p.textContent('#searchpane')));
await p.fill('#q','#comingnext');await p.waitForTimeout(400);
console.log('search #comingnext lists all 9',(await p.$$eval('#searchpane .hit',e=>e.filter(x=>/Planned page|Coming next/.test(x.textContent)).length))===9);
await p.fill('#q','');await p.waitForTimeout(200);
// money lock: no dollar figure in the box while locked
await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(200);
console.log('locked: no dollar amount in Coming next',!/\$\s?\d/.test(await p.textContent('#coming')));
// mobile width: no horizontal scroll
await p.setViewportSize({width:375,height:800});await p.waitForTimeout(250);
// (the page as a whole already scrolls sideways at 375px because of the older email bar; checked separately, not by this test)
console.log('phone width: Coming next box and its rows fit the screen',await p.evaluate(()=>[document.getElementById('coming'),...document.querySelectorAll('#coming .cn-row')].every(e=>e.getBoundingClientRect().right<=window.innerWidth+1)),await p.evaluate(()=>Math.round(document.getElementById('coming').getBoundingClientRect().right)));
console.log('BUILD flipped',fs.readFileSync(process.argv[2],'utf8').includes("['Greyed future pages with dates (BILLING, BOOKS, PROJECTS, COUNTY MONITOR, LAUNCHER)',1]"));
console.log('ERRS',errs);await b.close()})();
