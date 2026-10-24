const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:1100}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{const store={},subs={};function emit(n){const docs=Object.keys(store).filter(k=>k.startsWith(n+'/')).map(k=>({id:k.split('/')[1],data:store[k]}));(subs[n]||[]).forEach(f=>f({docs}))}
const db={collection:n=>({onSnapshot(fn){(subs[n]=subs[n]||[]).push(fn);setTimeout(()=>emit(n),10);return()=>{}}}),doc:path=>({async get(){return{data:store[path]}},async set(d){store[path]=d;emit(path.split('/')[0])},async update(d){store[path]=Object.assign(store[path]||{},d)}})};
window.claude={use:async n=>n==='db'?db:null};});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
console.log('tabbar height',await p.$eval('#tabs',e=>e.getBoundingClientRect().height),'scrollW>clientW',await p.$eval('#tabs',e=>e.scrollWidth>e.clientWidth));
console.log('badges',(await p.$$eval('.tab .pct',e=>e.map(x=>x.parentElement.dataset.tab+':'+x.textContent))).join(' '));
await p.evaluate(()=>VTES.show('HANDOFFS'));await p.waitForTimeout(200);
console.log('bbox',(await p.textContent('#bb-HANDOFFS')).slice(0,160));
for(const t of ['HANDOFFS','STATUS','LINKS','MENU','APPROVALS'])await p.evaluate(t=>VTES.prio(t,5),t);await p.waitForTimeout(200);
console.log('gov',(await p.textContent('#bb-HANDOFFS')).match(/Governor[^.]*\./)?.[0]);
await p.evaluate(()=>VTES.dictate());console.log('mic:',await p.textContent('#voicemsg'));
await p.screenshot({path:process.argv[3]+'/v18-tabs-rows-build.png'});
console.log('ERRS',errs);await b.close()})();
