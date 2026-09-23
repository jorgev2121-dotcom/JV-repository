#!/usr/bin/env python3
"""Generate an Owner Authorization / Limited Power of Attorney PDF.

Built from the approved TRK-2026-1667 version (10980 SW 202 Dr, Unit 29,
2026-09-23). Uses only the PDF built-in fonts (Helvetica), no form fields,
no embedded fonts, so the file is about 4 KB, has no fields to come up blank,
and opens in any mail app or phone viewer. See SKILL.md.

Usage:
    python3 make_poa.py job.json out.pdf
job.json keys are documented in SKILL.md.
"""
import json, sys
import pymupdf as f

JORGE = {"name": "JORGE VALDES", "org": "Team USA Sales, Inc."}
KNOWN_AGENTS = {
    "miguel": {"name": "MIGUEL ZALDIVAR", "org": "MZ Solutions, LLC"},
    "jade":   {"name": "JADE DE ARMAS", "org": "Team USA Sales, Inc."},  # spelling UNCONFIRMED
}

# Wording per owner type. {owner} = owner name exactly as on the deed/Sunbiz.
TYPES = {
    "llc": dict(
        title=["CORPORATE / COMPANY RESOLUTION", "AND LIMITED POWER OF ATTORNEY"],
        short="Company",
        intro='The undersigned, being the Manager(s)/Member(s) of {owner}, a {state} limited liability company and owner of the real property described above (the "Property"), hereby adopt the following resolution:',
        lead="RESOLVED,", who="the Company's",
        until="This authorization remains in effect until revoked in writing by the Company.",
        by="COMPANY: {owner}", title_line="Title: Manager / Managing Member",
        ack_as="as {blank} of {owner}, a {state} limited liability company, on behalf of the company,"),
    "corp": dict(
        title=["CORPORATE RESOLUTION", "AND LIMITED POWER OF ATTORNEY"],
        short="Corporation",
        intro='The undersigned, being the Officer(s)/Director(s) of {owner}, a {state} corporation and owner of the real property described above (the "Property"), hereby adopt the following resolution:',
        lead="RESOLVED,", who="the Corporation's",
        until="This authorization remains in effect until revoked in writing by the Corporation.",
        by="CORPORATION: {owner}", title_line="Title: President / Vice President / Director",
        ack_as="as {blank} of {owner}, a {state} corporation, on behalf of the corporation,"),
    "trust": dict(
        title=["TRUSTEE AUTHORIZATION", "AND LIMITED POWER OF ATTORNEY"],
        short="Trust",
        intro='The undersigned, being the Trustee(s) of the {owner}, dated {trust_date}, which holds title to the real property described above (the "Property"), hereby authorize as follows:',
        lead="IT IS HEREBY AUTHORIZED", who="the Trust's",
        until="This authorization remains in effect until revoked in writing by the Trustee(s).",
        by="TRUSTEE(S) OF THE {owner}", title_line="Title: Trustee",
        ack_as="as Trustee of the {owner}, on behalf of the trust,"),
    "ladybird": dict(
        title=["LIMITED POWER OF ATTORNEY"],
        short="Owner",
        intro='The undersigned, being the life tenant(s) holding an enhanced life estate (Lady Bird deed) in the real property described above (the "Property"), recorded in Official Records Book {or_book}, Page {or_page}, hereby authorize as follows:',
        lead="IT IS HEREBY AUTHORIZED", who="the undersigned's",
        until="This authorization remains in effect until revoked in writing by the undersigned.",
        by="LIFE TENANT(S): {owner}", title_line="Capacity: Life Tenant",
        ack_as="as life tenant,"),
}

def build(job, out):
    t = TYPES[job["owner_type"]]
    v = dict(owner=job["owner_name"], state=job.get("state", "Florida"),
             trust_date=job.get("trust_date", "_" * 16), or_book=job.get("or_book", "_" * 8),
             or_page=job.get("or_page", "_" * 6), blank="_" * 18)
    agents = [JORGE] + [KNOWN_AGENTS[k] for k in job.get("extra_agents", [])]
    scope = job.get("scope") or ("to apply for, sign, file, and process all building permits, Notices of "
        "Commencement, plans revisions, and related documents, and to represent {who} before {agency} in "
        "all matters concerning the pending permit(s) for the work at the Property, including requesting "
        "extensions of time and attending hearings.")
    scope = scope.format(who=t["who"].replace("the ", "the ", 1).replace("'s", ""), agency=job.get("agency", "Miami-Dade County"))

    doc = f.open(); p = doc.new_page(width=612, height=792)
    X0, X1 = 54, 558; st = {"y": 58}
    tl = lambda s, fn, fs: f.get_text_length(s, fontname=fn, fontsize=fs)

    def rich(segs, fs=10, center=False, gap=7):
        words = []
        for text, bold in segs:
            for w in text.split(" "):
                if w: words.append((w, "hebo" if bold else "helv"))
        wl = lambda w, fn: tl("[]", fn, fs) + 7 if w == "[]" else tl(w, fn, fs)
        lines, cur, width = [], [], 0
        for w, fn in words:
            sp = tl(" ", "helv", fs) if cur else 0
            if cur and width + sp + wl(w, fn) > X1 - X0:
                lines.append((cur, width)); cur, width, sp = [], 0, 0
            cur.append((w, fn)); width += sp + wl(w, fn)
        if cur: lines.append((cur, width))
        for ln, wid in lines:
            x = X0 + ((X1 - X0 - wid) / 2 if center else 0)
            for w, fn in ln:
                if w == "[]":
                    p.insert_text((x, st["y"]), "[", fontname=fn, fontsize=fs); x += tl("[", fn, fs) + 7
                    p.insert_text((x, st["y"]), "]", fontname=fn, fontsize=fs); x += tl("]", fn, fs) + tl(" ", "helv", fs)
                else:
                    p.insert_text((x, st["y"]), w, fontname=fn, fontsize=fs); x += tl(w, fn, fs) + tl(" ", "helv", fs)
            st["y"] += fs * 1.32
        st["y"] += gap

    u = lambda n: "_" * n
    for i, line in enumerate(t["title"]):
        rich([(line, 1)], 12.5, True, 6 if i == len(t["title"]) - 1 else 0)
    rich([(job["owner_name"], 1), (f' (the "{t["short"]}" / Owner)', 0)], 10, True, 8)
    top = st["y"] - 10; st["y"] += 4
    unit = f', {job["unit"]}' if job.get("unit") else ""
    rich([("PROPERTY:", 1), (f' {job["address"]}{unit}, {job["city_state_zip"]}', 0)], gap=0)
    rich([("FOLIO NO.:", 1), (f' {job["folio"]}', 0)], gap=0)
    if job.get("legal"): rich([("Legal:", 1), (f' {job["legal"]}', 0)], gap=0)
    p.draw_rect(f.Rect(X0 - 5, top, X1, st["y"] - 5), width=0.8); st["y"] += 10

    rich([(t["intro"].format(**v), 0)])
    segs = [(t["lead"], 1), (" that ", 0)]
    for i, a in enumerate(agents):
        if i: segs.append((" AND/OR ", 0))
        segs += [(a["name"], 1), (f' ({a["org"]})', 0)]
    segs.append((f' {"is" if len(agents) == 1 else "are each individually"} authorized to act as {t["who"]} agent and attorney-in-fact {scope}', 0))
    rich(segs)
    rich([(t["until"], 0)], gap=12)
    rich([(t["by"].format(**v), 1)], gap=14)
    rich([("By: " + u(46) + "     Date: " + u(18), 0)], gap=10)
    rich([("Print name: " + u(36) + "     " + t["title_line"], 0)], gap=12)
    rich([("SIGNED IN THE PRESENCE OF TWO WITNESSES:", 1)], gap=12)
    for n in (1, 2):
        rich([(f"Witness {n}: " + u(32) + "   Print: " + u(32), 0)], gap=5)
        rich([("Address: " + u(76), 0)], gap=12)
    rich([("STATE OF FLORIDA, COUNTY OF ", 1), (u(24), 0)], gap=8)
    rich([("The foregoing instrument was acknowledged before me by means of [] physical presence or [] online "
           "notarization, this " + u(5) + " day of " + u(15) + ", 20" + u(4) + ", by " + u(28) + ", "
           + t["ack_as"].format(**v) + " who is [] personally known to me or [] has produced " + u(22)
           + " as identification.", 0)], gap=22)
    rich([(u(44) + "   (SEAL)", 0)], gap=0)
    rich([("Notary Public - State of Florida", 0)], gap=0)
    rich([("Print name: " + u(28) + "   My commission expires: " + u(16), 0)])
    if st["y"] > 760: raise SystemExit(f"LAYOUT OVERFLOW: text ends at y={st['y']:.0f} (> 760). Shorten scope/legal.")

    stamp = f'{job["trk"]} | Owner Authorization & Limited Power of Attorney | {job["address"]}{unit} | Folio {job["folio"]} | v{job.get("version", 1)} | {job["date"]}'
    p.insert_text((54, 772), stamp, fontname="helv", fontsize=6.5)
    doc.set_metadata({"title": f'Limited Power of Attorney - {job["owner_name"]} - {job["address"]}{unit}',
                      "keywords": f'{job["trk"]} Folio {job["folio"]}'})
    doc.save(out, garbage=4, deflate=True, clean=True)

    # Blank-file guard: re-open and prove the content is really there.
    chk = f.open(out); txt = chk[0].get_text()
    for must in (job["owner_name"], job["folio"], "JORGE VALDES", "Witness 2", "Notary Public"):
        if must not in txt: raise SystemExit(f"VERIFY FAILED: '{must}' not found in {out}")
    if sum(len(list(pg.widgets())) for pg in chk): raise SystemExit("VERIFY FAILED: form fields present")
    chk[0].get_pixmap(dpi=75).save(out[:-4] + "_preview.png")
    import hashlib, os
    print(f"OK {out} {os.path.getsize(out)} bytes sha256={hashlib.sha256(open(out,'rb').read()).hexdigest()[:16]} preview={out[:-4]}_preview.png")

if __name__ == "__main__":
    build(json.load(open(sys.argv[1])), sys.argv[2])
