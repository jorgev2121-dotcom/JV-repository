#!/usr/bin/env python3
"""Master index extractor (pilot 2026-10-15).
Reads OCR text per document and pulls the things Jorge remembers:
address, folio, permit/case numbers, people's emails and phones.
One row per document -> control-panel/master-index/<JOB>.json
Usage: extract.py <ocr_json {id: text}> <job> <meta_json [{oid,sid,name,date,folder}]> <out>
Money amounts are never extracted."""
import json, re, sys
ocr = json.load(open(sys.argv[1])); job = sys.argv[2]; meta = json.load(open(sys.argv[3]))
P = {
 'folio':   r'\b\d{2}-\d{4}-\d{3}-\d{4}\b',
 'permit':  r'\b(?:[A-Z]{1,5}\d{2,4}-\d{3,6}|[A-Z]{1,3}\d{10})\b',
 'email':   r'[\w.+-]+@[\w-]+\.[\w.]+',
 'phone':   r'\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b',
 'address': r'\b\d{3,6}\s+(?:N\.?W\.?|S\.?W\.?|N\.?E\.?|S\.?E\.?|NW|SW|NE|SE)?\s*\d{0,3}(?:st|nd|rd|th)?\s*(?:St|Street|Ave|Avenue|Ct|Court|Blvd|Rd|Road|Ter|Pl|Way|Dr)\b\.?',
}
rows = []
for m in meta:
    t = ocr.get(m['sid'], '')
    r = dict(m, job=job, has_text=bool(t.strip()))
    for k, pat in P.items():
        found = sorted(set(x.strip() for x in re.findall(pat, t, re.I)))
        r[k] = found[:25]
    rows.append(r)
json.dump(rows, open(sys.argv[4], 'w'), indent=1)
tot = {k: len(set(v for r in rows for v in r[k])) for k in P}
print(job, 'docs', len(rows), 'with text', sum(r['has_text'] for r in rows), 'distinct', tot)
