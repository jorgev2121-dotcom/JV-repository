const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:700}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
await p.click('.mailmenu summary');await p.waitForTimeout(200);
console.log(await p.$$eval('.mailpop a',e=>e.map(x=>x.textContent+' -> '+x.href.slice(0,60))));
await p.screenshot({path:process.argv[3]});console.log('ERRS',errs);await b.close()})();
