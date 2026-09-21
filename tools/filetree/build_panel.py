#!/usr/bin/env python3
"""build_panel.py — assemble the Filing Tree panel (TRK-2026-9970).

Reads every scan JSON in tools/filetree/data/drive/ (one per top-level job folder) plus any
local scans in tools/filetree/data/local/, folds them into one tree per source, pulls the
known TRK numbers out of TRK-REGISTRY.md, and injects everything into the HTML template.

    python tools/filetree/build_panel.py            -> tools/filetree/dist/filetree-panel.html

The template stays data-free; the built page is self-contained (no fetches, works offline).
"""
import json, glob, os, re, sys, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
DRIVE_DIR = os.path.join(HERE, 'data', 'drive')
LOCAL_DIR = os.path.join(HERE, 'data', 'local')
TEMPLATE = os.path.join(HERE, 'filetree-panel.html')
OUT = os.path.join(HERE, 'dist', 'filetree-panel.html')

REAL_ROOT_ID = '1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt'
SHADOW_ROOT_ID = '19QO2Q8EEmO0HDGnQrcy1KlVUdAU7DhFY'
ROOT_FILES = [  # files that sit directly in the real root (from the 2026-09-20 listing)
    {"id": "11zr2Udu2B0hNvOfJFVd6jaPaSTVm_GN5", "title": "_MASTER-CAPSULE-PORTAL.html", "size": 2371146,
     "modifiedTime": "2026-08-26T21:43:54.067Z", "createdTime": "2026-08-26T21:43:54.067Z"},
    {"id": "1v5xBy27aUefarLp98_WOcle8icQCTLU-", "title": "_ALEC-VALDES-DD_JACKET-REGISTER_SUBMITTED_2026-08-22.csv", "size": 1518,
     "modifiedTime": "2026-08-22T18:13:35.282Z", "createdTime": "2026-08-22T18:13:35.282Z"},
    {"id": "1EEydR7Y8qhbTPQqr-MSBLVXUbWDMZEYk", "title": "_INDEX.html", "size": 14066,
     "modifiedTime": "2026-08-17T19:42:23.541Z", "createdTime": "2026-08-15T02:14:36.772Z"},
]

def load_json(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)

def normalize(n):
    """Coerce a scanned node into the panel's shape; sizes become ints, children lists."""
    n['size'] = int(n.get('size') or 0)
    n['isFolder'] = bool(n.get('isFolder', n.get('mimeType') == 'application/vnd.google-apps.folder'))
    n['children'] = [normalize(c) for c in (n.get('children') or [])]
    n.setdefault('truncated', False)
    return n

def file_node(f):
    return {"id": f["id"], "title": f["title"], "mimeType": "file", "size": f["size"],
            "modifiedTime": f["modifiedTime"], "createdTime": f["createdTime"], "isFolder": False,
            "webUrl": f"https://drive.google.com/file/d/{f['id']}/view", "children": [], "truncated": False}

def main():
    drive_nodes, shadow = [], None
    scanned = []
    for p in sorted(glob.glob(os.path.join(DRIVE_DIR, '*.json'))):
        if os.path.basename(p).startswith('_'):
            continue
        n = normalize(load_json(p))
        scanned.append(n.get('scannedAt') or '')
        if n['id'] == SHADOW_ROOT_ID:
            shadow = n
        else:
            drive_nodes.append(n)
    drive_nodes.sort(key=lambda n: n['title'].lower())
    sources = []
    if drive_nodes or shadow:
        real = {"id": REAL_ROOT_ID, "title": "01-JOBS — ONE SOURCE OF TRUTH", "mimeType": "root", "size": 0,
                "modifiedTime": "", "createdTime": "2026-06-22T14:33:43.551Z", "isFolder": True,
                "webUrl": f"https://drive.google.com/drive/folders/{REAL_ROOT_ID}",
                "children": drive_nodes + [file_node(f) for f in ROOT_FILES], "truncated": False}
        sources.append({"name": "Google Drive · 01-JOBS", "kind": "drive", "scannedAt": max(scanned) if scanned else "",
                        "root": real})
        if shadow:
            shadow['title'] = 'SHADOW ROOT (duplicate 01-JOBS, marked DO-NOT-USE)'
            sources.append({"name": "Google Drive · shadow root", "kind": "drive-shadow", "scannedAt": shadow.get('scannedAt', ''),
                            "root": shadow})
    for p in sorted(glob.glob(os.path.join(LOCAL_DIR, '*.json'))):
        n = normalize(load_json(p))
        sources.append({"name": f"Local · {n.get('title') or os.path.basename(p)}", "kind": "local",
                        "scannedAt": n.get('scannedAt', ''), "root": n})

    reg_text = open(os.path.join(REPO, 'TRK-REGISTRY.md'), encoding='utf-8').read()
    registry = sorted(set(re.findall(r'TRK-2026-\d{4}(?:-[A-Z]+)?', reg_text)))

    payload = {"builtAt": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + 'Z',
               "sources": sources, "registry": registry}
    data = json.dumps(payload, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    tpl = open(TEMPLATE, encoding='utf-8').read()
    assert '/*__DATA__*/' in tpl, 'template marker missing'
    html = tpl.replace('/*__DATA__*/', data, 1)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)

    def count(n, acc):
        if n['isFolder']:
            acc[0] += 1
            for c in n['children']:
                count(c, acc)
        else:
            acc[1] += 1; acc[2] += n['size']
        return acc
    for s in sources:
        d, fl, b = count(s['root'], [0, 0, 0])
        print(f"{s['name']}: folders={d} files={fl} bytes={b:,} scannedAt={s['scannedAt']}")
    print(f"registry TRKs={len(registry)}  page={os.path.getsize(OUT):,} bytes -> {OUT}")

if __name__ == '__main__':
    main()
