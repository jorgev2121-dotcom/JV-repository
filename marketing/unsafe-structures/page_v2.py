import json
d=json.load(open('uns2020_v2.json'))
data=json.dumps(d).replace('</','<\\/')
page=r'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsafe Structures Leads</title>
<style>
:root{--bg:#f6f7f4;--card:#fff;--ink:#1c2321;--mut:#5a6460;--line:#d6dbd6;--acc:#1b5e9e;--hot:#b3261e;--warm:#8a5a00;--ok:#1d6b3b;--pend:#6b6b66}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#141917;--card:#1d2422;--ink:#e7ece9;--mut:#a3aea9;--line:#33403b;--acc:#7fb3e6;--hot:#f19a92;--warm:#f3c96b;--ok:#8fd6a6;--pend:#a8a8a0}}
:root[data-theme="dark"]{--bg:#141917;--card:#1d2422;--ink:#e7ece9;--mut:#a3aea9;--line:#33403b;--acc:#7fb3e6;--hot:#f19a92;--warm:#f3c96b;--ok:#8fd6a6;--pend:#a8a8a0}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "Segoe UI",Arial,sans-serif}
.wrap{max-width:none;margin:0;padding:10px 16px}h1{margin:2px 0;font-size:1.35rem}
.rpt{font:700 .85rem Consolas,monospace;color:var(--acc)}.meta{color:var(--mut);font-size:.95rem}
.bar{display:flex;flex-wrap:wrap;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px 8px;margin:8px 0;position:sticky;top:0;z-index:5}
details.ms{position:relative}details.ms summary{list-style:none;cursor:pointer;border:1px solid var(--line);border-radius:8px;padding:6px 10px;background:var(--bg);font-size:.9rem;white-space:nowrap}
details.ms summary::after{content:" ▾";color:var(--mut)}details.ms[open] summary{border-color:var(--acc)}
details.ms .menu{position:absolute;top:110%;left:0;min-width:260px;max-height:340px;overflow:auto;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px;box-shadow:0 6px 18px rgba(0,0,0,.18);z-index:9}
.menu label{display:flex;gap:8px;align-items:flex-start;padding:3px 2px;font-size:.88rem;cursor:pointer}.menu .hint{font-size:.78rem;color:var(--mut);margin:4px 2px}
.menu .all{display:flex;gap:10px;margin-bottom:6px}.menu .all button{font:inherit;font-size:.78rem;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:6px;padding:2px 8px;cursor:pointer}
.bar input[type=search]{font:inherit;padding:6px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);min-width:200px}
.count{font-weight:700;align-self:center;margin-left:auto}
.tw{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.86rem;table-layout:fixed}th,td{padding:4px 6px;white-space:normal;overflow-wrap:anywhere;line-height:1.3;border-bottom:1px solid var(--line);vertical-align:top;text-align:left}
th{background:var(--card);white-space:nowrap}tr.row{cursor:pointer}tr.row:hover{background:var(--bg)}
.OPEN{color:var(--hot);font-weight:700}.EXP{color:var(--warm);font-weight:700}.HAND{color:var(--ok);font-weight:700}
.small{color:var(--mut);font-size:.8rem}.pend{color:var(--pend);font-style:italic}
tr.det td{background:var(--bg)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(195px,1fr));gap:8px}
.box{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px 8px;font-size:.82rem;line-height:1.3}.box h4{margin:0 0 3px;font-size:.84rem}
ol.trail{margin:0;padding-left:18px}ol.trail li{margin:0}
footer{margin-top:16px;font:700 .8rem Consolas,monospace;color:var(--mut);text-align:right}
</style></head><body><div class="wrap">
<div class="rpt">RPT-LEADS-0001 · v2 · Unsafe Structures 2020</div>
<h1>Unsafe Structures Leads: 2020 cases</h1>
<div class="meta">Miami-Dade RER Unsafe Structures OPEN-cases report, year 2020, 160 cases (downloaded and classified by RAMBO 2026-10-04/05). Real county data only. Grey italic = not retrieved yet, never guessed. Every filter allows several choices; nothing ticked means "any". Opens on the sample of 20; tick “Other 2020 cases” under Show to see all 160. Click a row to open its details.</div>
<div class="bar" id="bar"><input type="search" id="q" placeholder="Search address, owner, ZIP, number"><span class="count" id="n"></span></div>
<div class="tw"><table><colgroup><col style="width:9%"><col style="width:15%"><col style="width:24%"><col style="width:6%"><col style="width:8%"><col style="width:10%"><col style="width:20%"><col style="width:8%"></colgroup><thead><tr><th>Status</th><th>Property</th><th>Owner · mailing</th><th>Lot sq ft</th><th>Legal type</th><th>Citation codes</th><th>Process / permit</th><th>Contact in log</th></tr></thead><tbody id="tb"></tbody></table></div>
<footer>RPT-LEADS-0001 · v2 · 2026-10-08 · DRAFT · #UNSAFE-STRUCTURES #MDC #LEAD-FILTER</footer></div>
<script>
const D=__DATA__;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lotBand=x=>x.lot==null?'Unknown':x.lot<5000?'Under 5,000':x.lot<7500?'5,000-7,499':x.lot<10000?'7,500-9,999':'10,000 or more';
const decade=x=>x.year_built?(Math.floor(x.year_built/10)*10)+'s':'Not retrieved yet';
const F=[
 {id:'show',label:'Show',get:x=>[x.sample?'Sample of 20':'Other 2020 cases'],def:['Sample of 20']},
 {id:'status',label:'Status',get:x=>[x.status]},
 {id:'flags',label:'Process / permit / closed',get:x=>x.flags},
 {id:'codes',label:'Citation code',get:x=>x.codes.length?x.codes.map(c=>c[0]+' - '+c[1]):['No code in log yet']},
 {id:'contact',label:'Owner or rep contact in case log',get:x=>[x.contact=='Y'?'Yes':x.contact=='N'?'No':'Not checked']},
 {id:'legal',label:'Legal description type',get:x=>[x.legal_type]},
 {id:'zoning',label:'Zoning code',get:x=>[x.zoning?x.zoning+' - '+x.zoning_def:'Not retrieved yet']},
 {id:'decade',label:'Year built (10-year range)',get:x=>[decade(x)]},
 {id:'lot',label:'Lot size',get:x=>[lotBand(x)]},
 {id:'otype',label:'Owner type',get:x=>[x.owner_type]},
 {id:'closed',label:'Case closed',get:x=>[x.closed=='Y'?'Closed':'Open']},
];
const sel={};const bar=document.getElementById('bar'),q=document.getElementById('q');
F.forEach(f=>{const counts={};D.forEach(x=>f.get(x).forEach(v=>counts[v]=(counts[v]||0)+1));sel[f.id]=new Set(f.def||[]);
 const d=document.createElement('details');d.className='ms';
 d.innerHTML=`<summary>${f.label}</summary><div class=menu><div class=all><button data-a=1>Select all</button><button data-a=0>Clear</button></div>${Object.keys(counts).sort().map(v=>`<label><input type=checkbox value="${esc(v)}" ${(f.def||[]).includes(v)?"checked":""}> <span>${esc(v)} <span class=small>(${counts[v]})</span></span></label>`).join('')}<div class=hint>Tick as many as you like.</div></div>`;
 d.querySelectorAll('input').forEach(i=>i.onchange=()=>{i.checked?sel[f.id].add(i.value):sel[f.id].delete(i.value);upd(d,f);draw()});
 d.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.preventDefault();d.querySelectorAll('input').forEach(i=>{i.checked=b.dataset.a=='1';i.checked?sel[f.id].add(i.value):sel[f.id].delete(i.value)});upd(d,f);draw()});
 bar.insertBefore(d,q);upd(d,f);});
function upd(d,f){const n=sel[f.id].size;d.querySelector('summary').textContent=f.label+(n?' ('+n+')':'')}
document.addEventListener('click',e=>document.querySelectorAll('details.ms[open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')}));
q.oninput=draw;const cls=s=>s.startsWith('OPEN/CALL')?'OPEN':s.startsWith('EXPIRED')?'EXP':'HAND';
const P='<span class=pend>not retrieved yet</span>';
function detail(x){return `<tr class=det><td colspan=8><div class=grid>
<div class=box><h4>Number trail (oldest to newest)</h4><ol class=trail>${x.trail.map(t=>`<li>${esc(t[0])}: <b>${esc(t[1])}</b></li>`).join('')}</ol><div class=small>Recorded lien instrument (CFN) and NOV date: ${P}</div></div>
<div class=box><h4>Liens and amounts</h4>${x.amounts.length?x.amounts.map(a=>`<div class=small>“${esc(a)}”</div>`).join(''):'<div>RER lien amounts: '+P+'</div>'}<div>Clerk of Court face amount: ${x.clerk_face?esc(x.clerk_face):P}</div><div>Recorded images: ${x.images?esc(x.images):P}</div></div>
<div class=box><h4>Citation codes</h4>${x.codes.length?x.codes.map(c=>`<div><b>${esc(c[0])}</b> ${esc(c[1])}</div>`).join(''):'<div class=small>No code captured in the case log notes yet.</div>'}<div class=small>Building code cited: FBC</div><h4 style="margin-top:8px">Violation</h4><div class=small>${esc(x.violation)}</div></div>
<div class=box><h4>Property</h4><div>Folio ${esc(x.folio)}</div><div>Zoning: ${x.zoning?esc(x.zoning+' - '+x.zoning_def):P}</div><div>Year built: ${x.year_built||P}</div><div>Land use: ${x.dor?esc(x.dor):P}</div><div class=small>Legal: ${esc(x.legal)}</div></div>
<div class=box><h4>Owner</h4><div>${esc(x.owner)} <span class=small>(${esc(x.owner_type)})</span></div><div class=small>Mailing: ${esc(x.mailing)}</div>${x.owner_type!='Person'?'<div>Sunbiz officers / agent: '+P+'</div>':''}</div>
<div class=box><h4>Case</h4><div>Opened ${esc(x.opened)} · last activity ${esc(x.last)}</div><div>Inspector ${esc(x.inspector)} · district ${esc(x.district)}</div><div>Owner/rep contact in log: ${x.contact=='Y'?'Yes':x.contact=='N'?'No':'Not checked'}</div><div class=small>${esc(x.status_note)}</div></div>
</div></td></tr>`}
const open=new Set();
function draw(){const t=q.value.toLowerCase();
 const r=D.filter(x=>F.every(f=>!sel[f.id].size||f.get(x).some(v=>sel[f.id].has(v)))&&(!t||JSON.stringify(x).toLowerCase().includes(t)));
 document.getElementById('n').textContent=r.length+' of '+D.length;
 document.getElementById('tb').innerHTML=r.map(x=>`<tr class=row data-c="${x.case}"><td class=${cls(x.status)}>${esc(x.status)}${x.sample?'<div class=small>sample</div>':''}</td><td>${esc(x.address)} <span class=small>· ${esc(x.folio)}</span></td><td>${esc(x.owner)} <span class=small>· ${esc(x.mailing)}</span></td><td>${x.lot??''}</td><td>${esc(x.legal_type)}</td><td class=small>${x.codes.map(c=>esc(c[0])).join(', ')}</td><td class=small>${esc(x.flags.join(' · '))}</td><td>${x.contact}</td></tr>`+(open.has(x.case)?detail(x):'')).join('');
 document.querySelectorAll('tr.row').forEach(tr=>tr.onclick=()=>{const c=tr.dataset.c;open.has(c)?open.delete(c):open.add(c);draw()});}
draw();
</script></body></html>'''
open('RPT-LEADS-0001_UnsafeStructures-2020_v2.html','w').write(page.replace('__DATA__',data))
print('ok')
