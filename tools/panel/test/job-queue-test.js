const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1000,height:1600}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{const store={};const subs={};
function col(name){return {onSnapshot(fn){(subs[name]=subs[name]||[]).push(fn);setTimeout(()=>emit(name),10);return()=>{}},doc(id){return doc(name+'/'+id)}}}
function emit(name){const docs=Object.keys(store).filter(k=>k.startsWith(name+'/')&&k.split('/').length===2).map(k=>({id:k.split('/')[1],data:store[k]}));(subs[name]||[]).forEach(f=>f({docs}))}
function doc(path){return {async get(){return {data:store[path]}},async set(d){store[path]=d;emit(path.split('/')[0])},async update(d){store[path]=Object.assign(store[path]||{},d);emit(path.split('/')[0])}}}
const db={collection:col,doc};window.claude={use:async n=>n==='db'?db:null};
// seed a running job
store['jobs/VJ-TEST-A']={text:'Job A (test)',status:'RUNNING',created:new Date(Date.now()-40*60000).toISOString(),accepted_at:new Date(Date.now()-35*60000).toISOString(),executor:'RAMBO (Desktop)',where:'DESKTOP',history:[]};});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('ORCHESTRATOR'));await p.waitForTimeout(300);
await p.fill('#oq','Job B test');await p.evaluate(()=>VTES.send());await p.waitForTimeout(300);console.log('R1:',await p.textContent('#receipt'));
await p.fill('#oq','Job C test');await p.evaluate(()=>VTES.send());await p.waitForTimeout(300);console.log('R2:',await p.textContent('#receipt'));
console.log('ACTIVE:',(await p.textContent('#jobactive')).slice(0,80));console.log('FAIL:',(await p.textContent('#jobfail')).slice(0,120));
console.log('QUEUE:',(await p.textContent('#jobqueue')).replace(/\s+/g,' ').slice(0,200));
await p.screenshot({path:process.argv[3],fullPage:false});console.log('ERRS',errs);await b.close()})();
