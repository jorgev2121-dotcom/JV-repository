const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{const store={},subs={};window.__store=store;function emit(n){const docs=Object.keys(store).filter(k=>k.split('/')[0]===n&&k.split('/').length===2).map(k=>({id:k.split('/')[1],data:store[k]}));(subs[n]||[]).forEach(f=>f({docs}))}
store['tracker/T1']={title:'Blocked on Jorge',status:'blocked',assignee:'Jorge',schedule_approved:false};store['tracker/T2']={title:'Proposed',status:'proposed',assignee:'Cloud Code'};
const db={collection:n=>({onSnapshot(fn){(subs[n]=subs[n]||[]).push(fn);setTimeout(()=>emit(n),10);return()=>{}}}),doc:path=>({async get(){return{data:store[path]}},async set(d){store[path]=d;emit(path.split('/')[0])},async update(d){store[path]=Object.assign(store[path]||{},d);emit(path.split('/')[0])}})};
window.claude={use:async n=>n==='db'?db:null};});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1000);
await p.evaluate(()=>VTES.approveAllAsk());console.log('ASK:',await p.textContent('#approveall'));
await p.evaluate(()=>VTES.approveAllGo());await p.waitForTimeout(1500);console.log('GO:',await p.textContent('#approveall'));
const st=await p.evaluate(()=>({tasks:Object.keys((__store['tasks/state']||{}).map||{}).length,moved:Object.values((__store['tasks/state']||{}).map||{}).filter(x=>x.who).length,t1:__store['tracker/T1'],appr:Object.keys(__store).filter(k=>k.startsWith('approvals/')).length}));console.log(JSON.stringify(st).slice(0,400));
await p.evaluate(()=>VTES.approveAllAsk());console.log('AFTER:',await p.textContent('#approveall'));
console.log('ERRS',errs);await b.close()})();
