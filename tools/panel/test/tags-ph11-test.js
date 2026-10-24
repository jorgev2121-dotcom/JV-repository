// tags-ph11-test.js — 2026-10-14. OWNER-DIRECTIVE TAGS-EVERYWHERE-01 pilot: TRK-2026-1265 / OPH-2026-0007 (Plaza of Bal Harbour, PH11).
// 1. The 1265 job card shows a readable "Permits" block with the renewals, the Drive tag-file link, and no dollar amounts.
// 2. The OPH-2026-0007 card shows a cross-reference to 1265.
// 3. Each fixed query (exact, #, any case, misspellings) finds the 1265 permits block in the top 5, and clicking it highlights the block.
// Usage: node tags-ph11-test.js <abs panel path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const PANEL=process.argv[2];let fails=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&x!==''?' '+x:''));if(!c)fails++};
const LINK='https://drive.google.com/file/d/1x4yCzOWCAIKxnf2j6ovDBf8D-etUr849/view';
const Q=['PH11','#ph11','BLC2026-1438','BLC20261438','blc2024-1061','penthouse 11','Orfanopolous','10185 colins','bal harbor ph11'];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1100,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.clear()}catch(e){}});
await p.goto('file://'+PANEL);await p.waitForTimeout(900);
await p.evaluate(()=>VTES.show('CLIENTS'));await p.waitForTimeout(200);
const blk=await p.evaluate(L=>{const b=document.querySelector('.clperm[data-k="TRK-2026-1265"]:not(.clpermx)');if(!b)return null;const card=b.closest('details.clcard');
  return {card:card&&card.dataset.k,txt:b.textContent,link:!!b.querySelector('a[href="'+L+'"]')}},LINK);
ok('1265 job card has a Permits block',!!blk&&blk.card==='TRK-2026-1265',blk&&blk.card);
if(blk){ok('Permits block reads in plain words (PH11 1061 → 1438, 220, 721)',/Unit PH11 \(Penthouse 11\): the old permit BLC2024-1061 was renewed as BLC2026-1438/.test(blk.txt)&&/BLC2024-1335 was renewed as BLC2026-1437/.test(blk.txt)&&/BLC2024-0715 was renewed as BLC2026-1436/.test(blk.txt));
  ok('Permits block: dates with verify, expired, never issued, invoice number',/10\/13\/2026/.test(blk.txt)&&/4\/11\/2027 \(verify on the portal\)/.test(blk.txt)&&/423 BLC2024-0714/.test(blk.txt)&&/15P BLC2024-0287/.test(blk.txt)&&/321 BLC2024-0707/.test(blk.txt)&&/BLC2024-1333: approved, never issued/.test(blk.txt)&&/WEB4575/.test(blk.txt));
  ok('Permits block has the Drive tag-file link',blk.link);ok('Permits block shows no dollar amount',!/\$\s?\d/.test(blk.txt))}
const xr=await p.evaluate(()=>{const b=document.querySelector('.clpermx[data-k="OPH-2026-0007"]');return b?b.textContent:null});
ok('OPH-2026-0007 card cross-references TRK-2026-1265',!!xr&&/TRK-2026-1265/.test(xr)&&/BLC2026-1438/.test(xr));
for(const q of Q){await p.evaluate(()=>VTES.show('CLIENTS'));
  const r=await p.evaluate(q=>{const el=document.getElementById('q');el.value=q;el.dispatchEvent(new Event('input',{bubbles:true}));
    const hits=[...document.querySelectorAll('#searchpane .hit')];const i=hits.findIndex(h=>/^Job permits$/.test(h.querySelector('small.kv').textContent)&&/TRK-2026-1265/.test(h.textContent));
    return {i,n:hits.length,c:document.getElementById('scount').textContent}},q);
  ok('query '+JSON.stringify(q)+' finds the 1265 permits block (top 5)',r.i>=0&&r.i<5,'rank '+(r.i+1)+' of '+r.n+' · '+r.c);
  if(r.i>=0){await p.click('#searchpane .hit[data-i="'+r.i+'"] .go');await p.waitForTimeout(150);
    const f=await p.evaluate(()=>{const b=document.querySelector('.clperm.srchflash');return {tab:(document.querySelector('.tab.active')||{}).dataset.tab,k:b&&b.dataset.k,open:b&&b.closest('details').open}});
    ok('  click jumps to CLIENTS and highlights the permits block',f.tab==='CLIENTS'&&f.k==='TRK-2026-1265'&&f.open,JSON.stringify(f))}}
ok('no page errors',errs.length===0,JSON.stringify(errs));
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
