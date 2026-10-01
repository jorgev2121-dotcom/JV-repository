#!/usr/bin/env python3
"""COU legacy-report classifier. READ-ONLY. Writes ONE new CSV; moves/renames/edits nothing.
TRK-2026-1352 digits not issued here; stamp with the TRK Jorge assigns. #COU-Inspection-Reports #legacy

usage: python cou_classify.py "C:\\...\\Jobs-Master" [out.csv]
Each file is scored from its NAME and, if present, its .SEARCH.txt sidecar text.
Output has a denominator line, never "good progress"."""
import csv, os, re, sys, datetime, collections

NAME_SIGNALS = [  # (label, regex, points)
    ("field-inspection-name", r"field\s*inspection", 3),
    ("final-cu-report-name",  r"final\s*cu\s*report", 4),
    ("t-usa-suffix",          r"_\s*(jv|t-?usa)\b", 1),
    ("address-first-name",    r"^\d{2,6}\s+(nw|ne|sw|se|n|s|e|w)\b", 1),
]
TEXT_SIGNALS = [
    ("aronson-named",   r"\bAronson\b", 3),
    ("neil-or-neal",    r"\bNe[ia]l\b", 1),
    ("hugh-named",      r"\bHugh\b", 1),
    ("cert-of-use",     r"certificate\s+of\s+use", 4),
    ("disclosure-findings", r"disclosure\s+of\s+findings", 4),
    ("cu-inspections-co", r"CU\s+Inspections\s+of\s+South\s+Florida", 2),
    ("cou-of-miami-co", r"COU\s+of\s+Miami", 2),
    ("onlinecou",       r"onlinecou\.com", 2),
]
def shape(name):
    """Collapse a filename to its convention: addresses/numbers/dates -> tokens, so the standardized OCR naming shows up as one shape."""
    n = re.sub(r"\.search\.txt$", ".SEARCH.txt", name, flags=re.I)
    n = re.sub(r"\(\d+\)", "(N)", n)
    n = re.sub(r"^\s*\d{1,6}(?:[\s-]*\w+){0,6}?\s*(?=_|\bfield\b|\bfinal\b)", "ADDRESS ", n, flags=re.I)
    n = re.sub(r"\d{4}-\d{2}-\d{2}", "DATE", n)
    n = re.sub(r"\d+", "#", n)
    return re.sub(r"\s+", " ", n).strip()
def year_of(name, mod):
    m = re.search(r"\b(20[0-2]\d)\b", name)
    return (m.group(1) if m else (mod[:4] if mod else "?")), ("name" if m else "file-date")
def tier(score, has_text):
    if score >= 7: return "HIGH"
    if score >= 4: return "MEDIUM"
    return "LOW"

def main(root, out):
    rows, seen, shapes, years = [], 0, collections.Counter(), collections.Counter()
    for d, _, files in os.walk(root):
        for f in files:
            if f.lower().endswith(".search.txt") or f == "_INDEX.html" or os.path.abspath(os.path.join(d, f)).startswith(os.path.abspath(out).rsplit(".",1)[0]): continue
            seen += 1
            p = os.path.join(d, f)
            score, why = 0, []
            for lab, rx, pts in NAME_SIGNALS:
                if re.search(rx, f, re.I): score += pts; why.append(lab)
            side = p + ".SEARCH.txt"; has_text = os.path.exists(side)
            if has_text:
                try: txt = open(side, encoding="utf-8", errors="ignore").read(60000)
                except OSError: txt = ""
                for lab, rx, pts in TEXT_SIGNALS:
                    if re.search(rx, txt, re.I): score += pts; why.append(lab)
            try: st = os.stat(p); size, mod = st.st_size, datetime.datetime.fromtimestamp(st.st_mtime).date().isoformat()
            except OSError: size, mod = "", ""
            shp = shape(f); shapes[shp] += 1
            yr, ysrc = year_of(f, mod); years[(yr, ysrc)] += 1
            rows.append([p, f, size, mod, tier(score, has_text), score, "yes" if has_text else "no-OCR-yet", ";".join(why),
                         "COU-INSPECTION-REPORT-LEGACY" if score >= 4 else "UNCLASSIFIED-REVIEW", shp, yr, ysrc])
    with open(out, "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.writer(fh); w.writerow(["path","file","bytes","modified","confidence","score","ocr_text","signals","proposed_category","filename_shape","year","year_source"]); w.writerows(rows)
    n = len(rows); hi = sum(r[4]=="HIGH" for r in rows); me = sum(r[4]=="MEDIUM" for r in rows)
    cat = sum(r[8].startswith("COU") for r in rows); noocr = sum(r[6]!="yes" for r in rows)
    print(f"files scanned: {seen} | proposed COU-legacy: {cat} of {n} | HIGH {hi} | MEDIUM {me} | no OCR text yet: {noocr} of {n}")
    base = out.rsplit(".",1)[0]
    with open(base + "_SHAPES.csv", "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.writer(fh); w.writerow(["files","share","filename_shape"])
        for k, v in shapes.most_common(60): w.writerow([v, f"{100*v/max(n,1):.1f}%", k])
    with open(base + "_BY-YEAR.csv", "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.writer(fh); w.writerow(["year","year_source","files"])
        for (y, src), v in sorted(years.items()): w.writerow([y, src, v])
    top = shapes.most_common(1)[0] if shapes else ("",0)
    print(f"top filename shape: {top[1]} of {n} -> {top[0]}")
    print(f"wrote {base}_SHAPES.csv and {base}_BY-YEAR.csv")
    print(f"wrote {out}  (nothing moved, renamed, or edited)")
if __name__ == "__main__":
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "COU-CLASSIFY-MANIFEST.csv")
