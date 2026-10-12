const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1100,height:1400}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{let n=0;const mcp={watchTool(){return()=>{}},invalidate:async()=>{},callTool:async(s,t,i)=>{n++;const page=i.pageToken?2:1;const files=Array.from({length:3},(_,k)=>({id:i.query.length+'-'+page+'-'+k,title:'x'+k,modifiedTime:new Date().toISOString(),viewUrl:'#'}));return {payload:{files,nextPageToken:page===1?'t':undefined}}}};window.claude={use:async n=>n==='mcp'?mcp:null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('OCR'));await p.waitForTimeout(300);
await p.evaluate(()=>VTES.ocrCheck(1));await p.waitForTimeout(800);
console.log('job1:',await p.textContent('#jc-1'));
await p.screenshot({path:process.argv[3]});console.log('ERRS',errs);await b.close()})();
