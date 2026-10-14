// phone-width-test.js — 2026-10-14. At phone widths (375, 390) the page must not scroll sideways:
// document.documentElement.scrollWidth <= viewport width, on every tab, with the Emails window
// closed, open, and maximized. Usage: node phone-width-test.js <abs panel path> <png path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' '+extra:''));if(!cond)fails++};
for(const w of [375,390]){
  const p=await b.newPage({viewport:{width:w,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{window.claude={use:async()=>null}});
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
  const sw=()=>p.evaluate(()=>document.documentElement.scrollWidth);
  let v=await sw();ok(w+'px home scrollWidth<=viewport',v<=w,v);
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('.tab[data-tab]')].map(t=>t.dataset.tab));
  const bad=[];for(const t of tabs){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(120);const s=await sw();if(s>w)bad.push(t+'='+s)}
  ok(w+'px every tab ('+tabs.length+') fits',bad.length===0,bad.join(' '));
  await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(200);
  await p.click('.mailmenu summary');await p.waitForTimeout(200);
  const open=await p.$eval('details.mailmenu',d=>d.open);v=await sw();
  const r=await p.$eval('.mailpop',e=>{const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.right)]});
  ok(w+'px emails window open & fits',open&&v<=w&&r[0]>=0&&r[1]<=w,'sw='+v+' pop='+r);
  if(w===375)await p.screenshot({path:process.argv[3]});
  await p.click('.mailbar button:nth-of-type(2)');await p.waitForTimeout(200);
  const r2=await p.$eval('.mailpop',e=>{const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.right)]});v=await sw();
  ok(w+'px emails window maximized & fits',v<=w&&r2[0]>=0&&r2[1]<=w,'sw='+v+' pop='+r2);
  await p.click('.mailbar button:nth-of-type(2)');await p.click('.mailbar button.x');
  ok(w+'px emails window closes',!(await p.$eval('details.mailmenu',d=>d.open)));
  ok(w+'px no page errors',errs.length===0,JSON.stringify(errs));
  await p.close()}
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
