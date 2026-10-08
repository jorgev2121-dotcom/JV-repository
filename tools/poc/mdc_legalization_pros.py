"""Pull Miami-Dade permits whose description mentions legalization (public ArcGIS permit layer, ~24-month window),
plus permits for our 2020 unsafe-structures C-numbers; build a professionals directory. Read-only, paced."""
import json, time, csv, os, re, urllib.request, urllib.parse, collections
UA={'User-Agent':'TeamUSASales-research/1.0 (read-only public records; Jorge@TeamUsaSales.com)'}
BASE='https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/miamidade_permit_data/FeatureServer/0/query'
F=['ProcessNumber','PermitNumber','MasterPermitNumber','PermitType','ResidentialCommercial','ApplicationTypeDescription','ProposedUseDescription','DetailDescriptionComments','CategoryDescription1','CategoryDescription2','EstimatedValue','ApplicationDate','PermitIssuedDate','LastApprovedInspDate','CoCcDate','FolioNumber','PropertyAddress','City','OwnerName','ArchitectName','ContractorNumber','ContractorName','ContractorAddress','ContractorCity','ContractorZip','ContractorPhone']
def q(where,offset=0,count=False):
    p={'where':where,'outFields':','.join(F),'f':'json','resultOffset':offset,'resultRecordCount':1000,'orderByFields':'ObjectId'}
    if count: p={'where':where,'returnCountOnly':'true','f':'json'}
    req=urllib.request.Request(BASE+'?'+urllib.parse.urlencode(p),headers=UA)
    with urllib.request.urlopen(req,timeout=60) as r: return json.loads(r.read().decode())
def ms(v):
    if isinstance(v,(int,float)): return time.strftime('%Y-%m-%d',time.gmtime(v/1000))
    return v or ''
os.makedirs('data/pros',exist_ok=True)
summary={}
where="UPPER(DetailDescriptionComments) LIKE '%LEGALIZ%' OR UPPER(DetailDescriptionComments) LIKE '%AS BUILT%' OR UPPER(DetailDescriptionComments) LIKE '%AS-BUILT%' OR UPPER(DetailDescriptionComments) LIKE '%WORK WITHOUT PERMIT%' OR UPPER(DetailDescriptionComments) LIKE '%W/O PERMIT%' OR UPPER(DetailDescriptionComments) LIKE '%UNSAFE%'"
summary['total_permits_in_layer']=q('1=1',count=True).get('count')
time.sleep(2)
summary['legalization_like_count']=q(where,count=True).get('count')
rows=[];off=0
while True:
    time.sleep(2); d=q(where,off); feats=d.get('features',[])
    rows+= [x['attributes'] for x in feats]
    if len(feats)<1000 or off>40000: break
    off+=1000
# our 2020 unsafe-structures C-numbers
cn=json.load(open('marketing/unsafe-structures/uns2020_v2.json'))
procs=sorted({t[1] for o in cn for t in o['trail'] if t[0].startswith('Process')})
case_of={t[1]:o['case'] for o in cn for t in o['trail'] if t[0].startswith('Process')}
ours=[]
for i in range(0,len(procs),50):
    time.sleep(2); chunk=procs[i:i+50]
    d=q("ProcessNumber IN ("+','.join("'%s'"%p for p in chunk)+")")
    for x in d.get('features',[]): a=x['attributes']; a['UnsafeCase']=case_of.get(a['ProcessNumber'],''); ours.append(a)
summary['our_2020_c_numbers']=len(procs); summary['our_2020_c_numbers_found_in_layer']=len({a['ProcessNumber'] for a in ours})
def norm(a):
    a=dict(a)
    for k in ('ApplicationDate','LastApprovedInspDate'): a[k]=ms(a.get(k))
    return a
for name,data in (('LEGALIZATION-PERMITS_24mo.csv',rows),('UNS2020-CNUMBER-PERMITS.csv',ours)):
    with open('data/pros/'+name,'w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=F+(['UnsafeCase'] if name.startswith('UNS') else []),extrasaction='ignore'); w.writeheader(); [w.writerow(norm(a)) for a in data]
def scope(a):
    t=' '.join(str(a.get(k) or '') for k in ('DetailDescriptionComments','ApplicationTypeDescription','CategoryDescription1')).upper()
    for k,v in [('POOL','pool/deck'),('FENCE','fence/wall'),('WALL','fence/wall'),('ENCLOS','enclosure'),('GARAGE','enclosure'),('CARPORT','carport/canopy'),('CANOPY','carport/canopy'),('SHED','shed/accessory'),('ADDITION','addition'),('ROOF','roof'),('WINDOW','windows/doors'),('DOOR','windows/doors'),('ELECT','electrical'),('PLUMB','plumbing'),('A/C','mechanical/AC'),('MECH','mechanical/AC'),('KITCHEN','interior'),('BATH','interior'),('INTERIOR','interior'),('CONVER','conversion/unit')]:
        if k in t: return v
    return 'other'
all_rows=rows+ours
pros=collections.defaultdict(lambda:{'role':'','name':'','license':'','address':'','phone':'','jobs':set(),'scopes':collections.Counter(),'types':collections.Counter(),'cities':set(),'first':'9999','last':'0000','examples':[]})
for a in all_rows:
    key_items=[]
    arch=(a.get('ArchitectName') or '').strip()
    if arch and arch.upper() not in ('NOT LISTED','NONE','N/A','OWNER','NOT REQUIRED'):
        role='engineer' if re.search(r'\bP\.?E\.?\b|ENGINEER|ENGINEERING|\bPE\b',arch.upper()) else 'architect'
        key_items.append((role,arch,'','',''))
    if (a.get('ContractorName') or '').strip() and (a.get('ContractorName') or '').strip().upper() not in ('OWNER','OWNER BUILDER','OWNER/BUILDER'): key_items.append(('contractor',a['ContractorName'].strip(),a.get('ContractorNumber') or '',' '.join(str(a.get(k) or '') for k in ('ContractorAddress','ContractorCity','ContractorZip')).strip(),a.get('ContractorPhone') or ''))
    for role,name,lic,addr,ph in key_items:
        p=pros[(role,name.upper())]; p.update(role=role,name=name,license=lic or p['license'],address=addr or p['address'],phone=ph or p['phone'])
        p['jobs'].add(a.get('ProcessNumber')); p['scopes'][scope(a)]+=1; p['types'][a.get('PermitType') or '']+=1; p['cities'].add(a.get('City') or '')
        dt=str(a.get('PermitIssuedDate') or ''); 
        if dt: p['first']=min(p['first'],dt); p['last']=max(p['last'],dt)
        if len(p['examples'])<3: p['examples'].append(f"{a.get('ProcessNumber')} {a.get('PropertyAddress')} - {a.get('DetailDescriptionComments')}")
out=[]
for (role,_),p in pros.items():
    out.append(dict(role=role,name=p['name'],license=p['license'],address=p['address'],phone=p['phone'],legalization_jobs=len(p['jobs']),top_scopes='; '.join(f'{k} {v}' for k,v in p['scopes'].most_common(4)),permit_types='; '.join(f'{k} {v}' for k,v in p['types'].most_common(4)),cities='; '.join(sorted(c for c in p['cities'] if c)),first_issued=p['first'] if p['first']!='9999' else '',last_issued=p['last'] if p['last']!='0000' else '',examples=' | '.join(p['examples'])))
order={'architect':0,'engineer':1,'contractor':2}
out.sort(key=lambda r:(order[r['role']],-r['legalization_jobs']))
with open('data/pros/PROS-DIRECTORY.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(out[0].keys()) if out else ['role']); w.writeheader(); w.writerows(out)
arch_listed=sum(1 for a in all_rows if (a.get('ArchitectName') or '').strip().upper() not in ('','NOT LISTED','NONE','N/A','OWNER'))
summary.update(rows_pulled=len(rows),rows_with_architect=arch_listed,architects=sum(1 for r in out if r['role']=='architect'),engineers=sum(1 for r in out if r['role']=='engineer'),owner_builder_rows=sum(1 for a in all_rows if (a.get('ContractorName') or '').strip().upper() in ('OWNER','OWNER BUILDER','OWNER/BUILDER')),contractors=sum(1 for r in out if r['role']=='contractor'),scope_counts=collections.Counter(scope(a) for a in all_rows).most_common(),permit_types=collections.Counter(a.get('PermitType') for a in all_rows).most_common(),issued_range=[min((str(a.get('PermitIssuedDate')) for a in all_rows if a.get('PermitIssuedDate')),default=''),max((str(a.get('PermitIssuedDate')) for a in all_rows if a.get('PermitIssuedDate')),default='')])
json.dump(summary,open('data/pros/SUMMARY.json','w'),indent=1,default=str)
print(json.dumps(summary,indent=1,default=str))
print('TOP ARCHITECTS'); [print(r['legalization_jobs'],r['name'],'|',r['top_scopes']) for r in out if r['role']=='architect'][:0]
for r in [r for r in out if r['role']=='architect'][:15]: print(r['legalization_jobs'],r['name'],'|',r['top_scopes'])
print('TOP ENGINEERS')
for r in [r for r in out if r['role']=='engineer'][:15]: print(r['legalization_jobs'],r['name'],'|',r['top_scopes'])
print('TOP CONTRACTORS')
for r in [r for r in out if r['role']=='contractor'][:15]: print(r['legalization_jobs'],r['name'],r['license'],r['phone'],'|',r['top_scopes'])
