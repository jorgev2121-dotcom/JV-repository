const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
await p.evaluate(()=>VTES.show('APPROVALS'));await p.waitForTimeout(500);
console.log('flagged buttons:',await p.$$eval('button.needsyou',e=>e.length),'flag tabs:',await p.$$eval('.tab.flagtab',e=>e.map(x=>x.dataset.tab)));
await p.screenshot({path:process.argv[3]});console.log('ERRS',errs);await b.close()})();
