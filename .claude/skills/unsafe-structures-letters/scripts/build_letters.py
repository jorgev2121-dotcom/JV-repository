#!/usr/bin/env python3
"""Build the Unsafe Structures print list, letters PDF and labels PDF from a REFRESHED csv.

Usage:  python build_letters.py REFRESHED.csv OUTDIR [--version N] [--date "October 26, 2026"]

No AI needed. Never invents data: any blank field prints as ?? and is listed in UNKNOWNS.
Rows kept: use in COMMERCIAL/INDUSTRIAL and status == NO ACTION. Sorted A, B1, B2, C, D.
"""
import csv, sys, os, html, argparse, datetime, subprocess, json

COLS = ["grade","property_address","folio","use","case_number","violation","lien_total","lien_asof",
        "daily_fine","fine_since","owner","entity_status","signer_name","signer_title",
        "mail_line1","mail_line2","mail_city_state_zip","last_outreach","status","sources"]
GRADE_ORDER = {"A":0,"B1":1,"B2":2,"B":1,"C":3,"D":4}
KEEP_USE = {"COMMERCIAL","INDUSTRIAL"}

def q(v):
    v = (v or "").strip()
    return v if v else "??"

def load(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    missing = [c for c in COLS if rows and c not in rows[0]]
    if missing:
        sys.exit(f"STOP: input is missing columns {missing}")
    return rows

def letter_html(r, date):
    e = lambda k: html.escape(q(r.get(k)))
    signer = q(r["signer_name"]) + ("" if not r["signer_title"].strip() else ", " + r["signer_title"].strip())
    addr2 = f"{e('mail_line2')}<br>" if r["mail_line2"].strip() else ""
    salute = q(r["signer_name"]) if r["signer_name"].strip() else q(r["owner"])
    fine = q(r["daily_fine"]); since = q(r["fine_since"])
    return f"""<div class="page"><div class="bar"></div>
<div class="lh"><b>TEAM USA SALES, INC.</b><small>Code compliance, permitting and legalization · CU Inspections of South Florida</small><small>{{OFFICE}}</small></div>
<div class="to">{html.escape(signer)}<br>{e('owner')}<br>{e('mail_line1')}<br>{addr2}{e('mail_city_state_zip')}</div>
<div class="body">{html.escape(date)}<br><br>Dear {html.escape(salute)},
<p>Miami-Dade County records show an open unsafe structures case on a property you own. It is costing you money every day it stays open.</p>
<table class="facts"><tr><td>Property</td><td>{e('property_address')} · Folio {e('folio')}</td></tr>
<tr><td>Case number</td><td>{e('case_number')}</td></tr>
<tr><td>Problem identified</td><td>{e('violation')}</td></tr>
<tr><td>Current lien</td><td>{e('lien_total')} as of {e('lien_asof')}</td></tr>
<tr><td>Daily fine</td><td><b>{html.escape(fine)} per day, accruing since {html.escape(since)}</b></td></tr></table>
<p>A case like this can usually be resolved by legalizing or correcting the work, and closing the case stops the daily fine. We handle the plans, permits, inspections and county paperwork from start to finish.</p>
<p><b>With 30 years of experience, we can help. Give us a call or write us.</b></p>
Sincerely,<br><br><br>Jorge Valdes<br>Team USA Sales, Inc. · {{CONTACT}}</div>
<div class="memo">Re: Property matter · Miami-Dade County</div><div class="tag">{{TRK}} · v{{VER}}</div></div>"""

CSS = """@page{size:8.5in 11in;margin:0}body{margin:0;font-family:Georgia,serif;color:#111}
.page{width:8.5in;height:11in;position:relative;box-sizing:border-box;page-break-after:always;font-size:11.5pt;line-height:1.42}
.bar{position:absolute;left:0;top:0;width:.28in;height:11in;background:#1f3a5f}
.lh{position:absolute;left:.875in;top:.5in;font-family:Arial,sans-serif}.lh b{font-size:16pt;color:#1f3a5f}.lh small{display:block;font-size:9pt;color:#444}
.to{position:absolute;left:.875in;top:2.05in;width:4.3in;height:1.05in;font-family:Arial;font-size:11pt;line-height:1.3;overflow:hidden}
.body{position:absolute;left:.875in;right:.9in;top:3.75in}
.facts{margin:10px 0 12px;border-left:4px solid #1f3a5f;background:#f2f5f9;padding:8px 12px}.facts td{padding:1px 10px 1px 0;vertical-align:top}.facts td:first-child{font-weight:bold;white-space:nowrap}
.memo{position:absolute;left:.875in;bottom:.5in;font-family:Arial;font-size:8.5pt;color:#555}.tag{position:absolute;right:.9in;bottom:.5in;font-family:Arial;font-size:8.5pt;color:#999}"""

LABEL_CSS = """@page{size:8.5in 11in;margin:0}body{margin:0;font-family:Arial,sans-serif}
.sheet{width:8.5in;height:11in;box-sizing:border-box;padding:.5in .1875in 0;display:grid;grid-template-columns:repeat(3,2.625in);column-gap:.125in;grid-auto-rows:1in;page-break-after:always}
.l{box-sizing:border-box;padding:.1in .15in;font-size:9pt;line-height:1.2;overflow:hidden}"""

def render(html_path, pdf_path, w="8.5in", h="11in"):
    js = f"""const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://{os.path.abspath(html_path)}');await p.pdf({{path:'{os.path.abspath(pdf_path)}',width:'{w}',height:'{h}',printBackground:true}});await b.close();}})();"""
    env = dict(os.environ); env.setdefault("NODE_PATH", "/opt/node22/lib/node_modules")
    subprocess.run(["node", "-e", js], check=True, env=env)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("csv"); ap.add_argument("outdir")
    ap.add_argument("--version", default="1"); ap.add_argument("--date", default=datetime.date.today().strftime("%B %d, %Y").replace(" 0", " "))
    ap.add_argument("--office", default="?? office address · ?? phone · Jorge@TeamUSASales.com")
    ap.add_argument("--contact", default="?? phone · Jorge@TeamUSASales.com"); ap.add_argument("--trk", default="TRK-2026-????")
    ap.add_argument("--ret", default="JORGE VALDES|13633 SW 142ND TER|MIAMI FL 33186", help="envelope return address, lines split by |")
    a = ap.parse_args(); os.makedirs(a.outdir, exist_ok=True); V = a.version
    rows = load(a.csv)
    found = len(rows)
    ci = [r for r in rows if r["use"].strip().upper() in KEEP_USE]
    keep = [r for r in ci if r["status"].strip().upper() == "NO ACTION"]
    keep.sort(key=lambda r: (GRADE_ORDER.get(r["grade"].strip().upper(), 9), r["property_address"]))
    def out(name): 
        p = os.path.join(a.outdir, name.replace("{V}", V))
        if os.path.exists(p): sys.exit(f"STOP: {p} exists. New version = new file; pass --version.")
        return p
    # print list
    pl_cols = ["grade","property_address","folio","use","case_number","violation","lien_total","daily_fine","owner","signer_name","signer_title","mail_line1","mail_line2","mail_city_state_zip","last_outreach"]
    pl = out("VTES-UNSAFE-STRUCTURES-PRINT-LIST_V{V}.csv")
    with open(pl, "w", newline="") as f:
        w = csv.writer(f); w.writerow(pl_cols); [w.writerow([q(r[c]) for c in pl_cols]) for r in keep]
    try:
        import openpyxl
        wb = openpyxl.Workbook(); ws = wb.active; ws.title = "Print list"; ws.append(pl_cols)
        for r in keep: ws.append([q(r[c]) for c in pl_cols])
        wb.save(out("VTES-UNSAFE-STRUCTURES-PRINT-LIST_V{V}.xlsx"))
    except ImportError:
        print("note: openpyxl not installed, xlsx skipped")
    # unknowns
    unk = [(r["case_number"] or "?", r["property_address"] or "?", c) for r in keep for c in
           ["lien_total","lien_asof","daily_fine","fine_since","signer_name","mail_line1","mail_city_state_zip","violation","case_number","folio"] if not r[c].strip()]
    with open(out("VTES-UNSAFE-STRUCTURES-UNKNOWNS_V{V}.csv"), "w", newline="") as f:
        w = csv.writer(f); w.writerow(["case_number","property_address","blank_field"]); w.writerows(unk)
    # letters
    body = "".join(letter_html(r, a.date) for r in keep).replace("{OFFICE}", html.escape(a.office)).replace("{CONTACT}", html.escape(a.contact)).replace("{TRK}", html.escape(a.trk)).replace("{VER}", V)
    lh = os.path.join(a.outdir, f"_letters_V{V}.html"); open(lh, "w").write(f"<!doctype html><meta charset=utf-8><style>{CSS}</style>{body}")
    render(lh, out("VTES-UNSAFE-STRUCTURES-LETTERS_V{V}.pdf"))
    # labels, Avery 5160 / 8160 (30 per sheet)
    labs = []
    for r in keep:
        s = q(r["signer_name"]) + ("" if not r["signer_title"].strip() else ", " + r["signer_title"].strip())
        lines = [s, q(r["owner"]), q(r["mail_line1"])] + ([r["mail_line2"]] if r["mail_line2"].strip() else []) + [q(r["mail_city_state_zip"])]
        labs.append('<div class="l">' + "<br>".join(html.escape(x) for x in lines) + "</div>")
    sheets = "".join('<div class="sheet">' + "".join(labs[i:i+30]) + "</div>" for i in range(0, len(labs), 30))
    lb = os.path.join(a.outdir, f"_labels_V{V}.html"); open(lb, "w").write(f"<!doctype html><meta charset=utf-8><style>{LABEL_CSS}</style>{sheets}")
    render(lb, out("VTES-UNSAFE-STRUCTURES-LABELS_V{V}.pdf"))
    # envelopes, approved format E5 (2026-10-26): #10 printed directly, no case details on the outside
    ENV_CSS = """@page{size:9.5in 4.125in;margin:0}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#111}
.e{width:9.5in;height:4.125in;position:relative;page-break-after:always;box-sizing:border-box}
.ret{position:absolute;left:.35in;top:.3in;font-size:9.5pt;line-height:1.3}.re{position:absolute;left:3.6in;top:1.35in;font-size:10pt}
.to{position:absolute;left:3.6in;top:1.85in;font-size:12pt;line-height:1.35}.ref{position:absolute;left:.35in;bottom:.28in;font-size:8.5pt;color:#333}"""
    envs = []
    for r in keep:
        s2 = q(r["signer_name"]) + ("" if not r["signer_title"].strip() else " " + r["signer_title"].strip())
        lines = [s2, q(r["owner"]), q(r["mail_line1"])] + ([r["mail_line2"]] if r["mail_line2"].strip() else []) + [q(r["mail_city_state_zip"])]
        envs.append(f'<div class="e"><div class="ret">{html.escape(a.ret).replace("|","<br>")}</div>'
                    f'<div class="re">RE: {html.escape(q(r["property_address"]))}</div>'
                    f'<div class="to">{"<br>".join(html.escape(x.upper()) for x in lines)}</div>'
                    f'<div class="ref">Reference: Miami-Dade County property matter · Time sensitive</div></div>')
    eh = os.path.join(a.outdir, f"_envelopes_V{V}.html"); open(eh, "w").write(f"<!doctype html><meta charset=utf-8><style>{ENV_CSS}</style>{''.join(envs)}")
    render(eh, out("VTES-UNSAFE-STRUCTURES-ENVELOPES_V{V}.pdf"), "9.5in", "4.125in")
    summary = {"found": found, "commercial_industrial": len(ci), "filtered_out_responded_or_acted": len(ci) - len(keep),
               "letters_ready": len(keep), "blank_fields": len(unk), "label_sheets": (len(labs) + 29) // 30, "envelopes": len(envs)}
    json.dump(summary, open(out("VTES-UNSAFE-STRUCTURES-COUNTS_V{V}.json"), "w"), indent=1)
    print(json.dumps(summary))

if __name__ == "__main__":
    main()
