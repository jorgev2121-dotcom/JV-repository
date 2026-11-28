// APPROVALS "Read aloud": one speaker button per card, "Read all", Stop, hover tips,
// and no dollar amount ever spoken while the 0000 money lock is closed.
// Usage: node approvals-readaloud-test.js <abs panel path> <png path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
// copy of the panel with one extra money card injected, so the lock can be tested on real card text
const src=fs.readFileSync(process.argv[2],'utf8'),tmp=path.join(path.dirname(process.argv[3]),'readaloud-money-copy.html');
const inj='var approvalItems=[\n{id:"money-test",since:new Date(Date.now()-30*3600000).toISOString(),title:"Send Medley invoice $8,000",body:"Invoice for $8,000.00 plus a $1.5k fee and $ 250 deposit.",detail:"x"},';
if(!src.includes('var approvalItems=[\n')){console.log('inject point missing',false);process.exit(1)}
fs.writeFileSync(tmp,src.replace('var approvalItems=[\n',inj));
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null};window.__spoken=[];window.__cancels=0;
  window.SpeechSynthesisUtterance=function(t){this.text=t};
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{speak:u=>{window.__spoken.push(u.text);u.onstart&&u.onstart();},cancel:()=>{window.__cancels++},speaking:false}})});
await p.goto('file://'+tmp);await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('APPROVALS'));await p.waitForTimeout(400);
const cards=await p.evaluate(()=>document.querySelectorAll('#pane-APPROVALS .card').length);
const btns=await p.evaluate(()=>document.querySelectorAll('#pane-APPROVALS .card .rabtn').length);
console.log('speaker button on every card',btns>0&&btns===cards,btns+' of '+cards);
console.log('read all + stop buttons',await p.isVisible('#ra-all')&&await p.isVisible('#ra-stop'));
// single card
await p.click('#ra-outlook-fix');await p.waitForTimeout(100);
const one=await p.evaluate(()=>window.__spoken.slice());
console.log('card reads title + summary + wait',one.length===1&&/^Fix Outlook/.test(one[0])&&/One-click script/.test(one[0])&&/waiting \d+ (days|h)/i.test(one[0]),JSON.stringify(one[0]));
console.log('no emoji spoken',!/[⏰🔒🔊]/u.test(one[0]));
// money card while locked
await p.evaluate(()=>{window.__spoken=[]});await p.click('#ra-money-test');await p.waitForTimeout(100);
const m1=await p.evaluate(()=>window.__spoken.slice());
console.log('LOCKED money card spoken:',JSON.stringify(m1[0]));
console.log('locked: no $ spoken',m1.length===1&&!m1[0].includes('$')&&!/8,000|1\.5k|250/.test(m1[0])&&/amount locked/.test(m1[0]));
// read all while locked
await p.evaluate(()=>{window.__spoken=[]});await p.click('#ra-all');await p.waitForTimeout(100);
const all=await p.evaluate(()=>window.__spoken.slice());
console.log('read all speaks every card',all.length===cards,all.length+' of '+cards);
console.log('read all locked: no $ spoken',all.every(t=>!t.includes('$')&&!/8,000/.test(t)));
console.log('reading highlight',await p.evaluate(()=>document.querySelectorAll('#pane-APPROVALS .card.reading').length===1));
await p.screenshot({path:process.argv[3]});
// stop
const c0=await p.evaluate(()=>window.__cancels);await p.click('#ra-stop');
console.log('stop cancels speech',await p.evaluate(c=>window.__cancels>c,c0)&&/Stopped/.test(await p.textContent('#ra-msg')));
// hover tips
await p.hover('#ra-outlook-fix');await p.waitForTimeout(500);const tip=await p.textContent('#tipbox');
console.log('hover tip on card button',/out loud/.test(tip)&&/locked/.test(tip),JSON.stringify(tip));
console.log('tips on all read-aloud buttons',await p.evaluate(()=>[...document.querySelectorAll('#ra-all,#ra-stop,.rabtn')].every(e=>(e.dataset.tip||'').length>10)));
// unlocked with 0000: amounts may be read
await p.click('#mzbtn');await p.fill('#mzpin','0000');await p.click('#mzform button[type=submit]');await p.waitForTimeout(200);
await p.evaluate(()=>{window.__spoken=[]});await p.click('#ra-money-test');await p.waitForTimeout(100);
const m2=await p.evaluate(()=>window.__spoken.slice());
console.log('open: amount read after 0000',/\$8,000/.test(m2[0]||''),JSON.stringify(m2[0]));
await p.click('#mzbtn');await p.waitForTimeout(150);
await p.evaluate(()=>{window.__spoken=[]});await p.click('#ra-money-test');await p.waitForTimeout(100);
console.log('relocked: no $ spoken',await p.evaluate(()=>window.__spoken.length===1&&!window.__spoken[0].includes('$')));
// no-speech fallback
const fb=await p.evaluate(()=>{const s=window.speechSynthesis;delete window.speechSynthesis;VTES.sayCard('outlook-fix');const t=document.getElementById('ra-msg').textContent;Object.defineProperty(window,'speechSynthesis',{configurable:true,value:s});return t});
console.log('fallback to Speechify message',/Speechify/.test(fb),JSON.stringify(fb));
console.log('BUILD flipped',fs.readFileSync(process.argv[2],'utf8').includes("['Read aloud',1]"));
fs.unlinkSync(tmp);console.log('ERRS',errs);await b.close()})();
