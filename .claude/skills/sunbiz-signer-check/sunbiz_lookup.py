#!/usr/bin/env python3
"""Look up a Florida entity on Sunbiz, confirm it is ACTIVE, and list the people who can sign for it.

Usage: python3 sunbiz_lookup.py "EXACT ENTITY NAME" OUT_DIR [--trk TRK-2026-NNNN]
       python3 sunbiz_lookup.py --detail-html saved_detail.html OUT_DIR   (offline / testing)

Writes into OUT_DIR:
  sunbiz.json                         entity, status, document no., officers/managers, annual reports
  sunbiz_detail.html                  the raw page, exactly as downloaded
  <date> _ <trk> _ WorkingPaper _ Sunbiz-<name> _ v1.pdf   working paper for the client file

Exit codes: 0 active + signers found, 2 entity NOT ACTIVE, 3 no exact name match, 4 network blocked.
Standard library only (no bs4). Network: needs search.sunbiz.org (blocked in the cloud sandbox
unless the environment's allowed domains include it; the desktop PC can reach it).
"""
import html, json, os, re, sys, datetime, urllib.parse, urllib.request

BASE = "https://search.sunbiz.org"
UA = {"User-Agent": "Mozilla/5.0 (Team USA Sales permit expediting; contact Jorge@TeamUsaSales.com)"}
TITLES = {"MGR": "Manager", "MGRM": "Managing Member", "AMBR": "Authorized Member", "MBR": "Member",
          "AP": "Authorized Person", "P": "President", "VP": "Vice President", "S": "Secretary",
          "T": "Treasurer", "D": "Director", "CEO": "Chief Executive Officer", "CFO": "Chief Financial Officer",
          "COO": "Chief Operating Officer", "C": "Chairman", "PRES": "President", "TR": "Trustee",
          "GP": "General Partner", "SVP": "Senior Vice President", "EVP": "Executive Vice President"}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def norm(s):
    return re.sub(r"[^A-Z0-9]", "", s.upper().replace("L.L.C.", "LLC").replace("INCORPORATED", "INC"))

def to_lines(h):
    h = re.sub(r"(?is)<(script|style).*?</\1>", "", h)
    h = re.sub(r"(?i)<br\s*/?>|</(p|div|tr|label|span|td|h\d)>", "\n", h)
    t = html.unescape(re.sub(r"<[^>]+>", " ", h))
    return [re.sub(r"\s+", " ", l).strip() for l in t.split("\n") if l.strip()]

def search(name):
    q = urllib.parse.urlencode({"inquiryType": "EntityName", "searchNameOrder": norm(name), "searchTerm": name})
    page = get(f"{BASE}/Inquiry/CorporationSearch/SearchResults?{q}")
    rows = re.findall(r'<a href="(/Inquiry/CorporationSearch/SearchResultDetail[^"]+)"[^>]*>([^<]+)</a>\s*</td>\s*'
                      r'<td[^>]*>([^<]*)</td>\s*<td[^>]*>([^<]*)</td>', page)
    hits = [(html.unescape(u), html.unescape(n).strip(), d.strip(), s.strip()) for u, n, d, s in rows]
    exact = [h for h in hits if norm(h[1]) == norm(name)]
    return exact, hits

def parse_detail(h):
    L = to_lines(h)
    def after(label):
        for i, l in enumerate(L):
            if l.lower() == label.lower() and i + 1 < len(L): return L[i + 1]
        return ""
    out = {"entity_type": "", "name": "", "document_number": after("Document Number"),
           "fei_ein": after("FEI/EIN Number"), "date_filed": after("Date Filed"), "state": after("State"),
           "status": after("Status").upper(), "last_event": after("Last Event"),
           "principal_address": [], "registered_agent": [], "signers": [], "annual_reports": []}
    m = re.search(r'corporationName">\s*<p>([^<]*)</p>\s*<p>([^<]*)</p>', h)
    if m: out["entity_type"], out["name"] = html.unescape(m.group(1)).strip(), html.unescape(m.group(2)).strip()
    # signers: "Title XXX" followed by the person's name
    for i, l in enumerate(L):
        mt = re.match(r"^Title\s+([A-Z,\s/]+)$", l)
        if mt and i + 1 < len(L):
            codes = [c for c in re.split(r"[,\s/]+", mt.group(1).strip()) if c]
            raw = L[i + 1].strip()
            if "," in raw:   # Sunbiz lists "LAST, FIRST M"
                last, first = [x.strip() for x in raw.split(",", 1)]; display = f"{first} {last}".strip()
            else: display = raw
            addr = [x for x in L[i + 2:i + 5] if not x.startswith("Title") and not x.startswith("Annual")][:2]
            out["signers"].append({"sunbiz_name": raw, "name": display.upper(), "title_codes": codes,
                                   "title": " / ".join(TITLES.get(c, c) for c in codes), "address": addr})
    for yr, dt in re.findall(r"<td>\s*(\d{4})\s*</td>\s*<td>\s*(\d{2}/\d{2}/\d{4})\s*</td>", h):
        out["annual_reports"].append({"year": yr, "filed": dt})
    for sec, key in (("Principal Address", "principal_address"), ("Registered Agent Name & Address", "registered_agent")):
        if sec in L:
            i = L.index(sec); out[key] = [x for x in L[i + 1:i + 5] if not x.startswith(("Mailing", "Changed", "Name Changed", "Address Changed", "Officer", "Authorized"))][:4]
    return out

def working_paper(d, url, fetched, outdir, trk):
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "onboarding-package"))
    from pdftext import Doc
    day = fetched[:10]
    doc = Doc(f"{trk} | Working Paper - Sunbiz record | {d['name']} | fetched {fetched} | v1")
    doc.title("WORKING PAPER", "FLORIDA DIVISION OF CORPORATIONS (SUNBIZ) RECORD")
    doc.box([("ENTITY:", d["name"]), ("TYPE:", d["entity_type"]), ("DOCUMENT NO.:", d["document_number"]),
             ("STATUS:", d["status"]), ("FILED:", d["date_filed"]), ("LAST EVENT:", d["last_event"] or "-"),
             ("FETCHED:", fetched), ("SOURCE:", url[:95])])
    doc.heading("PERSONS AUTHORIZED TO SIGN (as listed on Sunbiz)")
    for s in d["signers"]:
        doc.rich([(s["name"], 1), (f"  -  {s['title']} ({', '.join(s['title_codes'])})", 0)], gap=1)
        if s["address"]: doc.rich("      " + " | ".join(s["address"]), 9, gap=5)
    if not d["signers"]: doc.rich("None listed.")
    mr = d.get("most_recent_filing", {}).get("annual_report")
    doc.heading("MOST RECENT FILING (titles above are taken from it)")
    doc.rich((f"Annual report {mr['year']}, filed {mr['filed']}" if mr else "No annual report listed") + (f"; last event: {d['last_event']}" if d["last_event"] else ""))
    doc.heading("ANNUAL REPORTS")
    doc.rich(", ".join(f"{a['year']} (filed {a['filed']})" for a in d["annual_reports"]) or "None listed.")
    if d["principal_address"]: doc.heading("PRINCIPAL ADDRESS"); doc.rich(" | ".join(d["principal_address"]))
    if d["registered_agent"]: doc.heading("REGISTERED AGENT"); doc.rich(" | ".join(d["registered_agent"]))
    doc.heading("NOTE")
    doc.rich("Pulled by Team USA Sales, Inc. from the public Sunbiz record on the date above to identify who may sign "
             "for the owner. The raw page is kept with this working paper (sunbiz_detail.html). Re-check before filing "
             "if more than 30 days have passed.")
    safe = re.sub(r"[^A-Za-z0-9]+", "-", d["name"]).strip("-")
    out = os.path.join(outdir, f"{day} _ {trk} _ WorkingPaper _ Sunbiz-{safe} _ v1.pdf")
    doc.save(out, must=(d["name"], "PERSONS AUTHORIZED")); return out

def main():
    a = sys.argv[1:]; trk = "TRK-TBD"
    if "--trk" in a: i = a.index("--trk"); trk = a[i + 1]; del a[i:i + 2]
    fetched = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    if a[0] == "--detail-html":
        h = open(a[1], encoding="utf-8").read(); outdir = a[2]; url = "file://" + os.path.abspath(a[1])
    else:
        name, outdir = a[0], a[1]
        try:
            exact, hits = search(name)
        except Exception as e:
            print(f"NETWORK BLOCKED or failed reaching Sunbiz: {e}"); sys.exit(4)
        if not exact:
            print("NO EXACT MATCH. Closest results (never file against a fuzzy match):")
            for u, n, d, s in hits[:10]: print(f"  {n} | {d} | {s}")
            sys.exit(3)
        exact.sort(key=lambda h: (h[3].upper() != "ACTIVE",))
        url = BASE + exact[0][0]; h = get(url)
    os.makedirs(outdir, exist_ok=True)
    open(os.path.join(outdir, "sunbiz_detail.html"), "w", encoding="utf-8").write(h)
    d = parse_detail(h); d.update(source_url=url, fetched=fetched)
    # Title rule (Jorge 2026-09-23): the most recent filing wins. Record which filing that is.
    reps = sorted(d["annual_reports"], key=lambda a: (a["year"], a["filed"][-4:], a["filed"]))
    d["most_recent_filing"] = {"annual_report": reps[-1] if reps else None, "last_event": d["last_event"],
                               "rule": "Use signer titles exactly as listed on this most recent filing."}
    json.dump(d, open(os.path.join(outdir, "sunbiz.json"), "w"), indent=2)
    wp = working_paper(d, url, fetched, outdir, trk)
    print(f"{d['name']} | {d['document_number']} | STATUS {d['status']} | {len(d['signers'])} signer(s)")
    for s in d["signers"]: print(f"  - {s['name']} ({s['title']})")
    print("working paper:", wp)
    if d["status"] != "ACTIVE": print("STOP: entity is NOT ACTIVE. Tell Jorge before anything is signed."); sys.exit(2)

if __name__ == "__main__":
    main()
