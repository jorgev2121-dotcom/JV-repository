#!/usr/bin/env python3
"""EMAIL-PHONE-OCR-SEMANTICS-01 V1, steps 3-4: normalize and exact-match.

Pure standard library. Reads OCR output (already extracted emails, phones, names)
and the circle of truth, and returns MATCH / NO_MATCH / CONFLICT per item.
Writes nothing but its own log; never files, moves, or deletes a document.
"""
import json, re, sys, datetime

def norm_phone(p):
    d = re.sub(r"\D", "", p or "")
    return d[1:] if len(d) == 11 and d.startswith("1") else d

def norm_email(e):
    return (e or "").strip().lower()

def build_index(circle):
    idx = {"email": {}, "phone": {}}
    for job in circle:
        for e in job.get("emails", []):
            idx["email"].setdefault(norm_email(e), set()).add(job["trk"])
        for p in job.get("phones", []):
            idx["phone"].setdefault(norm_phone(p), set()).add(job["trk"])
    return idx

def match(item, idx):
    hits = set()
    for e in item.get("emails", []):
        hits |= idx["email"].get(norm_email(e), set())
    for p in item.get("phones", []):
        n = norm_phone(p)
        if len(n) >= 10:
            hits |= idx["phone"].get(n, set())
    if len(hits) == 1:
        return "MATCH", sorted(hits)
    if len(hits) > 1:
        return "CONFLICT", sorted(hits)   # step 5: semantics
    return "NO_MATCH", []                 # step 5: semantics

def run(items, circle):
    idx = build_index(circle)
    ts = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-5))).isoformat(timespec="seconds")
    return [{"ts_et": ts, "id": it["id"], "result": r, "trk": t,
             "next": {"MATCH": "attach to master folder (RED if it moves a client document: Jorge yes)",
                      "CONFLICT": "semantics on masked items",
                      "NO_MATCH": "semantics on masked items"}[r]}
            for it in items for r, t in [match(it, idx)]]

if __name__ == "__main__":
    items = json.load(open(sys.argv[1])); circle = json.load(open(sys.argv[2]))
    for row in run(items, circle):
        print(json.dumps(row))
