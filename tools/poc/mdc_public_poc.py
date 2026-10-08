"""Proof of concept: what Miami-Dade public GIS / Property Appraiser data returns (read-only, a handful of requests)."""
import json, sys, time, urllib.request, urllib.parse
UA={'User-Agent':'TeamUSASales-research/1.0 (read-only public records; contact Jorge@TeamUsaSales.com)'}
def get(url):
    try:
        req=urllib.request.Request(url,headers=UA)
        with urllib.request.urlopen(req,timeout=40) as r: return r.status, r.read().decode('utf-8','replace')
    except Exception as e: return 'ERR', str(e)
out={}
BASE='https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/miamidade_permit_data/FeatureServer/0'
s,b=get(BASE+'?f=json'); out['permit_layer_status']=s
try:
    meta=json.loads(b); fields=[f['name'] for f in meta.get('fields',[])]
except Exception: meta={}; fields=[]
out['permit_layer_name']=meta.get('name'); out['permit_fields']=fields
time.sleep(2)
q=BASE+'/query?'+urllib.parse.urlencode({'where':'1=1','outFields':'*','resultRecordCount':3,'f':'json','orderByFields':''})
s,b=get(q); out['sample_status']=s
try: out['sample_records']=[x['attributes'] for x in json.loads(b).get('features',[])]
except Exception: out['sample_raw']=b[:1500]
time.sleep(2)
desc=[f for f in fields if any(k in f.upper() for k in ('DESC','WORK','SCOPE','TYPE'))]
for f in desc[:3]:
    q=BASE+'/query?'+urllib.parse.urlencode({'where':f"UPPER({f}) LIKE '%LEGALIZ%'",'outFields':'*','resultRecordCount':5,'f':'json'})
    s,b=get(q)
    try: out['legalize_on_'+f]=[x['attributes'] for x in json.loads(b).get('features',[])]
    except Exception: out['legalize_on_'+f+'_raw']=b[:800]
    time.sleep(2)
pro=[f for f in fields if any(k in f.upper() for k in ('ARCH','ENGIN','PROF','CONTR','QUAL','LICEN'))]
out['professional_fields_found']=pro
PA='https://apps.miamidadepa.gov/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetPropertySearchByFolio&clientAppName=PropertySearch&folioNumber=3049230321660'
s,b=get(PA); out['pa_status']=s; out['pa_excerpt']=b[:1200]
for name,url in [('RER_viewer','https://www.miamidade.gov/Apps/RER/RegulationSupportWebViewer/'),('permits_home','https://www.miamidade.gov/permits/'),('opendata_hub','https://gis-mdc.opendata.arcgis.com/')]:
    time.sleep(2); s,b=get(url); out[name+'_status']=s; out[name+'_bytes']=len(b)
print(json.dumps(out,indent=1,default=str)[:60000])
json.dump(out,open('poc_result.json','w'),indent=1,default=str)
