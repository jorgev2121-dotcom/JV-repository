#!/usr/bin/env python3
"""Build VTES-TREEMAP.html from treemap-template.html + a scan.
Usage: build_treemap.py            -> uses the dated 8/24 scan (scan_2026-08-24.py)
       build_treemap.py data.json  -> uses a VTES-Inventory.ps1 JSON (roots with children)
"""
import json, sys, os, importlib.util
here = os.path.dirname(os.path.abspath(__file__))
def legacy():
    s = importlib.util.spec_from_file_location('scan', os.path.join(here, 'scan_2026-08-24.py')); m = importlib.util.module_from_spec(s); s.loader.exec_module(m)
    roots = {}
    for r, name, b, f in m.D:
        roots.setdefault(r, []).append({'name': name, 'path': r + '\\' + name, 'bytes': b, 'files': f})
    out = []
    for r, kids in roots.items():
        out.append({'name': r.split('\\')[-1] if r != r'C:\AI' else r'C:\AI', 'path': r, 'bytes': sum(k['bytes'] for k in kids), 'files': sum(k['files'] for k in kids), 'children': kids})
    return {'title': 'This PC', 'source': 'TreeSize-style scan (desktop-built 8/24)', 'generated': m.SCAN_LABEL, 'legacy': True, 'roots': out}
data = json.load(open(sys.argv[1], encoding='utf-8-sig')) if len(sys.argv) > 1 else legacy()
html = open(os.path.join(here, 'treemap-template.html'), encoding='utf-8').read()
blob = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
out = html.replace('__DATA__', blob)
dst = os.path.join(here, '..', 'vtes-panel', 'VTES-TREEMAP.html')
open(dst, 'w', encoding='utf-8').write(out); print('wrote', os.path.normpath(dst), len(out), 'bytes')
