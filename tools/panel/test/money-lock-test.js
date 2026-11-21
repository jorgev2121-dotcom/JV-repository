const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
const leak=()=>p.evaluate(()=>{const t=document.body.innerText;return (t.match(/\$\s?\d[\d,]*/g)||[]).length});
const tabs=await p.$$eval('[data-tab]',e=>[...new Set(e.map(x=>x.dataset.tab))]);let worst=0;
for(const t of tabs){await p.evaluate(x=>VTES.show(x),t);await p.waitForTimeout(250);const n=await leak();if(n){console.log('LEAK on',t,n);worst+=n}}
console.log('locked: visible dollar amounts across',tabs.length,'tabs =',worst,' masks on page:',await p.$$eval('.mz',e=>e.length));
await p.evaluate(()=>VTES.show('USAGE'));await p.waitForTimeout(250);
await p.click('#mzbtn');await p.fill('#mzpin','1111');await p.click('#mzform button[type=submit]');console.log('wrong:',await p.textContent('#mzerr'));
await p.fill('#mzpin','0000');await p.click('#mzform button[type=submit]');await p.waitForTimeout(200);console.log('open: visible amounts on USAGE =',await leak());
await p.screenshot({path:process.argv[3]+'-open.png'});
await p.click('#mzbtn');await p.waitForTimeout(200);console.log('relocked: visible amounts =',await leak());
await p.screenshot({path:process.argv[3]+'-locked.png'});
console.log('ERRS',errs);await b.close()})();
