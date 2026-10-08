import csv,re,html,json,collections
rows=list(csv.DictReader(open('UNS-OPEN-2020_CASES.tsv',encoding='utf-8-sig'),delimiter='\t'))
det=open('UNS-OPEN-2020_CLASSIFICATION-DETAIL.md').read()
blocks=collections.defaultdict(str)
for b in re.split(r'\n## Case ',det)[1:]: blocks[b.split()[0]]+=b
U=lambda s:html.unescape(html.unescape(str(s or '')))
corp=re.compile(r'\b(LLC|INC|CORP|TRS?|TRUST|BANK|ASSN|ASSOCIATION|CO|LTD|LP)\b')
CODE_MEAN={}
for m in re.finditer(r'code (\d{2,3}[A-Z]?)[^"\n]{0,30}"([^"]{4,90})"',det):
    if re.fullmatch(r"[A-Z0-9 /&,.'()\-\u2014]+",m.group(2)): CODE_MEAN.setdefault(m.group(1),m.group(2))
out=[]
for r in rows:
    cn=r['CaseNum']; b=blocks.get(cn,''); legal=U(r['CLegal']); com=U(r['Comments'])
    lt='Condo' if re.search(r'\bCONDO',legal) else ('Metes & bounds' if re.search(r'\bBEG\b|\bDEG\b|THENCE|\bTH\b',legal) else ('Lot & block' if re.search(r'\bLOT\b',legal) and re.search(r'\bBLK\b|\bBLOCK\b',legal) else ('Lot (no block)' if re.search(r'\bLOT\b',legal) else 'Other')))
    m=re.search(r'LOT SIZE ([\d,.]+) SQ FT',legal); lot=int(float(m.group(1).replace(',',''))) if m else None
    codes=[]
    for c in re.findall(r'code (\d{2,3}[A-Z]?)',b):
        if c not in codes: codes.append(c)
    procs=[]; [procs.append(x) for x in re.findall(r'\bC\d{10}\b',b+' '+com) if x not in procs and not x.startswith('C000000')]
    permits=[]; [permits.append(x) for x in re.findall(r'\b(?:19|20)\d{8}\b',b+' '+com) if x not in permits and x!=cn and not x.startswith(cn[:6]+'02')]
    if r['PermitNum'].strip(): permits.insert(0,r['PermitNum'].strip())
    ce=[]; [ce.append(x) for x in re.findall(r'\b\d{11}-[A-Z]\b',b+' '+com+' '+U(r['AllegedViolation'])) if x not in ce]
    bp=[]; [bp.append(x) for x in re.findall(r'Book \d{4,5},? Page \d{1,5}',b) if x not in bp]
    liens=[]; [liens.append(x) for x in re.findall(r'\b[PT]\d{6}\b',b) if x not in liens]
    amts=[]
    for mm in re.finditer(r'.{0,60}\$[\d,]+(?:\.\d{2})?.{0,40}',b):
        s=mm.group(0)
        if re.search(r'lien|fine|penalt|cost|balance|CVN',s,re.I): amts.append(s.strip())
    contact='Y' if re.search(r"spoke (with|to)|called|met with|owner'?s? rep|representative|phone call|left (a )?message",b,re.I) else ('N' if b else '?')
    closed=not r['CloseDate'].startswith('1/1/0001')
    cls=r['ClassificationStatus'].split(' - ')[0].strip()
    m=re.search(r'SFR:\s*\**\s*(YES|NO)',b,re.I); sfr=m.group(1).upper() if m else ''
    m=re.search(r'DOR ?Code[^\d]{0,5}(\d{4})[^"]*"?([^"\n;]*)',b); dor=(m.group(1)+' '+m.group(2).strip().rstrip(',')) if m else ''
    flags=[]
    if procs: flags.append('Has process number')
    if procs and permits: flags.append('Has process and permit number')
    if permits and not procs: flags.append('Has permit number only')
    if closed: flags.append('Case closed')
    if not procs and not permits: flags.append('No process or permit')
    trail=[('Code-enforcement case',x) for x in ce]+[('Unsafe Structures case',cn)]+[('Process (C-number)',x) for x in procs]+[('Permit',x) for x in permits]+[('Recorded (Clerk OR)',x) for x in bp]+[('Lien/CVN reference',x) for x in liens]
    out.append(dict(case=cn,opened=r['OpenDate'].split()[0],last=r['ActivityDate'].split()[0],address=U(r['PropertyAddress']),folio=r['FolioNumber'],owner=U(r['FullName']),owner_type='Company/Trust' if corp.search(U(r['FullName'])) else 'Person',mailing=U(r['OwnerAdress']),legal=legal,legal_type=lt,lot=lot,status=cls,status_note=U(r['ClassificationStatus']),codes=[(c,CODE_MEAN.get(c,'meaning not captured yet')) for c in codes],flags=flags,contact=contact,closed='Y' if closed else 'N',sfr=sfr,dor=dor,zoning='',zoning_def='',year_built='',violation=U(r['AllegedViolation']),inspector=r['Inspector'],district=r['DistrictNumber'],trail=trail,amounts=amts[:4],clerk_face='',images=''))
json.dump(out,open('uns2020_v2.json','w'))
print(len(out),collections.Counter(o['legal_type'] for o in out),collections.Counter(o['contact'] for o in out),sum(1 for o in out if o['codes']),sum(1 for o in out if o['amounts']),len(CODE_MEAN))
