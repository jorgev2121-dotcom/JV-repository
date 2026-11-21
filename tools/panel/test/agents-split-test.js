const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
for(const v of ['cloud','desktop','all']){await p.evaluate(v=>VTES.connectView(v),v);await p.waitForTimeout(200);console.log(v,await p.$$eval('#connectbody h4.grp',e=>e.map(x=>x.textContent.slice(0,30))),await p.$$eval('#connectbody .ent',e=>e.length))}
await p.evaluate(()=>VTES.connectView('desktop'));await p.waitForTimeout(200);await p.screenshot({path:process.argv[3]});
console.log('ERRS',errs);await b.close()})();
