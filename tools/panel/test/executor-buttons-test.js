const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{const data={ccr:{data:[{id:'session_DESK1',title:'🖥️ DESKTOP EXECUTOR · LIVE on Jorge-PC (RAMBO)',environment_kind:'bridge',connection_status:'connected',post_turn_summary:{needs_action:'Type yes to run the Windows checkup'}},{id:'session_CLOUD1',title:'☁️ VTES Cloud Executor',environment_kind:'anthropic_cloud',connection_status:'connected'}]}};
window.claude={use:async n=>n==='mcp'?{watchTool:(s,t,i,cb)=>{setTimeout(()=>cb({type:'data',result:{payload:data}}),50);return ()=>{}},invalidate:async()=>{}}:null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
await p.click('text=LLM desktop executors');await p.waitForTimeout(400);
console.log(await p.$$eval('#connectbody a.act',e=>e.map(x=>x.textContent+' '+x.href)));
await p.screenshot({path:process.argv[3]});console.log('ERRS',errs);await b.close()})();
