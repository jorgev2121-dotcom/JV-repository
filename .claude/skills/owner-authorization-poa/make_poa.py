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
}
# Named on every POA by default (owner directive 2026-09-23). Spelling confirmed by Jorge 2026-09-23.
# Drop one for a single job with "omit_agents": ["jade"].
DEFAULT_AGENTS = {"jade": {"name": "JADE DE ARMAS", "org": "Team USA Sales, Inc."}}

# Wording per owner type. {owner} = owner name exactly as on the deed/Sunbiz.
TYPES = {
    "llc": dict(
        title=["CORPORATE / COMPANY RESOLUTION"], notary="jurat",
        short="Company",
        intro='The undersigned, being the Manager(s)/Member(s) of {owner}, a {state} limited liability company and owner of the real property described above (the "Property"), hereby adopt the following resolution:',
        lead="RESOLVED,", who="the Company's",
        until="This authorization remains in effect for {term} from the date of its execution, unless sooner revoked in writing by the Company.",
        by="COMPANY: {owner}", title_line="Title: Manager / Managing Member",
        ack_as="as {blank} of {owner}, a {state} limited liability company, on behalf of the company,"),
    "corp": dict(
        title=["CORPORATE RESOLUTION"], notary="jurat",
        short="Corporation",
        intro='The undersigned, being the Officer(s)/Director(s) of {owner}, a {state} corporation and owner of the real property described above (the "Property"), hereby adopt the following resolution:',
        lead="RESOLVED,", who="the Corporation's",
        until="This authorization remains in effect for {term} from the date of its execution, unless sooner revoked in writing by the Corporation.",
        by="CORPORATION: {owner}", title_line="Title: President / Vice President / Director",
        ack_as="as {blank} of {owner}, a {state} corporation, on behalf of the corporation,"),
    "trust": dict(
        title=["TRUSTEE AUTHORIZATION", "AND LIMITED POWER OF ATTORNEY"],
        short="Trust",
        intro='The undersigned, being the Trustee(s) of the {owner}, dated {trust_date}, which holds title to the real property described above (the "Property"), hereby authorize as follows:',
        lead="IT IS HEREBY AUTHORIZED", who="the Trust's",
        until="This authorization remains in effect for {term} from the date of its execution, unless sooner revoked in writing by the Trustee(s).",
        by="TRUSTEE(S) OF THE {owner}", title_line="Title: Trustee",
        ack_as="as Trustee of the {owner}, on behalf of the trust,"),
    "ladybird": dict(
        title=["LIMITED POWER OF ATTORNEY"],
        short="Owner",
        intro='The undersigned, being the life tenant(s) holding an enhanced life estate (Lady Bird deed) in the real property described above (the "Property"), recorded in Official Records Book {or_book}, Page {or_page}, hereby authorize as follows:',
        lead="IT IS HEREBY AUTHORIZED", who="the undersigned's",
        until="This authorization remains in effect for {term} from the date of its execution, unless sooner revoked in writing by the undersigned.",
        by="LIFE TENANT(S): {owner}", title_line="Capacity: Life Tenant",
        ack_as="as life tenant,"),
}


# ------------------------------------------------------------------------------------------
# LLC / corporation: CERTIFICATE OF COMPANY RESOLUTION, following the attorney-prepared
# template by Jacqueline R. Hernandez-Valdes, Esq. (OneDrive: "Template POA for LLC Resolution
# violation 2025 MSword for editing v2_.docx", 4100 Palm Ave LLC, March 2025). Jorge directed
# 2026-09-23 that this is the legal standard for entity owners.
# ------------------------------------------------------------------------------------------
# Default term (Jorge, 2026-09-23): one year unless the owner revokes it sooner. Override per job with "term".
TERM = "one (1) year"
PREPARER = ["Jorge Valdes", "Team USA Sales, Inc.", "13633 SW 142 Terrace", "Miami, Florida 33186"]

def build_certificate(job, out, agents):
    """Attorney-style layout (Jorge, 2026-09-23): Times serif, justified, 12 pt, 1.5 spacing,
    page 1 filled at least 3/4, execution + notary on page 2 with generous signature spacing,
    'Page X of Y' on every page, signer names typed in when known."""
    corp = job["owner_type"] == "corp"
    kind = "Florida Corporation" if corp else "Florida Limited Liability Company"
    word = "Corporation" if corp else "Company"
    owner = job["owner_name"]; signer = job.get("signer_name")
    title = job.get("signer_title") or ("President" if corp else "Manager")
    who = signer or "_" * 26
    unit = f', {job["unit"]}' if job.get("unit") else ""
    prop = f'{job["address"]}{unit}, {job["city_state_zip"]} (Folio No. {job["folio"]})'
    agency = job.get("agency", "Miami-Dade County")
    matter = job.get("matter", "the permit(s) and any related code enforcement case(s)")
    REG, BOLD = "tiro", "tibo"
    doc = f.open()
    X0, X1, TOP, BOT = 72, 540, 72, 730
    st = {"y": TOP, "p": doc.new_page(width=612, height=792)}
    tl = lambda s_, fn, fs: f.get_text_length(s_, fontname=fn, fontsize=fs)

    def newpage():
        st["p"] = doc.new_page(width=612, height=792); st["y"] = TOP

    def rich(segs, fs=12, center=False, gap=10, indent=0, justify=True, lh=1.5):
        words = []
        for text, bold in segs:
            for k, w in enumerate(text.split(" ")):
                if not w: continue
                fn = BOLD if bold else REG
                if k == 0 and words and w[0] in ",.;:)":
                    words.append(("\x00" + w, fn)); continue
                words.append((w, fn))
        wl = lambda w, fn: fs * 0.75 + 2 if w == "[]" else tl(w.lstrip("\x00"), fn, fs)
        sp = tl(" ", REG, fs); x0 = X0 + indent; wmax = X1 - x0
        lines, cur, width = [], [], 0
        for w, fn in words:
            add = (sp if cur and not w.startswith("\x00") else 0) + wl(w, fn)
            if cur and width + add > wmax: lines.append((cur, width)); cur, width, add = [], 0, wl(w, fn)
            cur.append((w, fn)); width += add
        if cur: lines.append((cur, width))
        for li, (ln, wid) in enumerate(lines):
            if st["y"] > BOT: newpage()
            gaps = sum(1 for w, _ in ln[1:] if not w.startswith("\x00"))
            last = li == len(lines) - 1
            extra = (wmax - wid) / gaps if (justify and not last and not center and gaps) else 0
            x = x0 + ((wmax - wid) / 2 if center else 0)
            for i, (w, fn) in enumerate(ln):
                if w.startswith("\x00"): w = w[1:]; x -= sp + (extra if i else 0)
                if w == "[]":
                    b = fs * 0.75   # square check box (Florida notarial certificate style)
                    st["p"].draw_rect(f.Rect(x, st["y"] - b + 1, x + b, st["y"] + 1), width=0.8); x += b + sp + 2 + extra
                else:
                    st["p"].insert_text((x, st["y"]), w, fontname=fn, fontsize=fs); x += tl(w, fn, fs) + sp + extra
            st["y"] += fs * lh
        st["y"] += gap

    names = lambda: [seg for i, a in enumerate(agents) for seg in
                     ([(" and/or ", 0)] if i else []) + [(a["name"], 1), (f' of {a["org"]}', 0)]]
    for i, l in enumerate(["This Instrument Prepared by:"] + PREPARER):
        rich([(l, i == 0)], 10, gap=0, justify=False, lh=1.25)
    st["y"] += 22
    head = "CERTIFICATE OF COMPANY RESOLUTION" if not corp else "CERTIFICATE OF CORPORATE RESOLUTION"
    hw = tl(head, BOLD, 18); hx = (612 - hw) / 2; hy = st["y"] + 6
    for dx in (0, 0.35, 0.7):   # triple-strike for a heavier bold
        st["p"].insert_text((hx + dx, hy), head, fontname=BOLD, fontsize=18)
    st["y"] = hy + 34
    rich([("The undersigned, as authorized representative of ", 0), (owner, 1), (f', a {kind} (the "{word}"), hereby certifies that:', 0)], gap=12)
    rich([(f"1. The {word} is a duly formed, validly existing {kind} in good standing under the laws of the State of "
           f"Florida and is qualified to do business under the laws of the State of Florida.", 0)], indent=24)
    rich([("2. That ", 0), (who, 1), (f" is the {title} of the {word}.", 0)], indent=24)
    rich([("3. That ", 0), (who, 1), (f", as the {title} of ", 0), (owner, 1), (f", a {kind}, has appointed ", 0)] + names()
         + [(f" to represent the {word} before {agency}, including at any administrative hearing(s), and to request "
             f"extensions of time, in all matters pertaining to {matter} for the real property located at {prop}.", 0)], indent=24)
    legal = job.get("legal_full") or job.get("legal") or ""
    rich([("4. That ", 0), (who, 1), (f", as the {title} of ", 0), (owner, 1), (f", a {kind}, has appointed ", 0)] + names()
         + [(f" to act on behalf of the {word} to execute all permit applications, plans revisions and documents on behalf "
             f"of the {word} pertaining to {matter} for the real property located at {prop}"
             + (f", and described as follows: {legal}." if legal else "."), 0)], indent=24)
    rich([("RESOLVED,", 1), (f" that this Resolution shall continue in full force and effect for {job.get('term', TERM)} from the "
           f"date of its execution, unless sooner revoked in writing by the {word}, and may be relied upon by {agency} during that period.", 0)])
    if st["p"].number == 0 and st["y"] < 792 * 0.75:
        print(f"NOTE: page 1 text ends at {st['y']/792:.0%} of the page (target: at least 75%)")

    # ---- page 2: IN WITNESS + execution + notary, generous spacing; 1.5-inch top margin (Jorge, 2026-09-23)
    newpage(); st["y"] = 108 + 12
    rich([("IN WITNESS WHEREOF,", 1), (" the undersigned has executed this Certificate this ______ day of ____________________, 20____.", 0)], gap=38)
    rich([("_" * 44, 0)], gap=2, justify=False)
    rich([(signer or "Print name: " + "_" * 30, 1 if signer else 0)], gap=0, justify=False, lh=1.3)
    rich([(f"{title}, {owner}", 0)], gap=20, justify=False)
    rich([("Signed in the presence of:", 1)], gap=22, justify=False)
    for n in (1, 2):
        for x_, lab in ((X0, f"Witness {n} signature"), (X0 + 250, f"Witness {n} printed name")):
            st["p"].draw_line(f.Point(x_, st["y"]), f.Point(x_ + 218, st["y"]), width=0.6)
            st["p"].insert_text((x_, st["y"] + 12), lab, fontname=REG, fontsize=10)
        st["y"] += 26
        rich([("Address: " + "_" * 62, 0)], 10, gap=16, justify=False)
    rich([("STATE OF FLORIDA", 1)], gap=0, justify=False, lh=1.3)
    rich([("COUNTY OF " + ("_" * 22), 1)], gap=14, justify=False)
    rich([("The foregoing instrument was sworn to and subscribed before me via [] physical presence or via [] online "
           "notarization, this ______ day of ____________________, 20____, by ", 0), (who, 1),
          (f", as {title} of {owner}, who is personally known to me or has produced ______________________ as identification.", 0)], gap=38)
    rich([("_" * 44, 0)], gap=2, justify=False)
    rich([("Notary Public, State of Florida", 0)], gap=8, justify=False, lh=1.3)
    rich([("Printed Name: " + "_" * 30, 0)], gap=8, justify=False)
    rich([("Commission No.: " + "_" * 16 + "     Commission Expires: " + "_" * 16, 0)], gap=8, justify=False)
    rich([("(NOTARY SEAL)", 0)], gap=0, justify=False)
    if len(doc) != 2: raise SystemExit(f"LAYOUT: certificate must be exactly 2 pages, got {len(doc)}")
    return doc, st["p"]

def build(job, out):
    t = TYPES[job["owner_type"]]
    v = dict(owner=job["owner_name"], state=job.get("state", "Florida"),
             trust_date=job.get("trust_date", "_" * 16), or_book=job.get("or_book", "_" * 8),
             or_page=job.get("or_page", "_" * 6), blank="_" * 18)
    omit = set(job.get("omit_agents", []))
    agents = ([JORGE] + [a for k, a in DEFAULT_AGENTS.items() if k not in omit]
              + [KNOWN_AGENTS[k] for k in job.get("extra_agents", []) if k not in DEFAULT_AGENTS])
    if job["owner_type"] in ("llc", "corp"):
        doc, p = build_certificate(job, out, agents)
        docname = "Certificate of Company Resolution" if job["owner_type"] == "llc" else "Certificate of Corporate Resolution"
        return finish(job, out, doc, p, docname)
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
        wl = lambda w, fn: fs * 0.75 if w == "[]" else tl(w, fn, fs)
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
                    b = fs * 0.75   # square check box
                    p.draw_rect(f.Rect(x, st["y"] - b + 1, x + b, st["y"] + 1), width=0.8); x += b + tl(" ", "helv", fs)
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
    rich([(t["until"].format(term=job.get("term", TERM)), 0)], gap=12)
    rich([(t["by"].format(**v), 1)], gap=14)
    rich([("By: " + u(46) + "     Date: " + u(18), 0)], gap=10)
    rich([("Print name: " + u(36) + "     " + t["title_line"], 0)], gap=12)
    rich([("SIGNED IN THE PRESENCE OF TWO WITNESSES:", 1)], gap=12)
    for n in (1, 2):
        rich([(f"Witness {n}: " + u(32) + "   Print: " + u(32), 0)], gap=5)
        rich([("Address: " + u(76), 0)], gap=12)
    if t.get("notary") == "jurat":
        # Wording of the approved original resolution (TRK-2026-1310, 2026-07-05), kept as Jorge directed 2026-09-23.
        rich([("STATE OF " + u(18) + ", COUNTY OF " + u(18), 0)], gap=8)
        rich([("Sworn to (or affirmed) and subscribed before me by means of [] physical presence [] online notarization, this "
               + u(6) + " day of " + u(16) + ", 20" + u(4) + ", by " + u(28) + ", who is [] personally known to me or [] produced "
               + u(22) + " as identification.", 0)], gap=22)
    else:
        rich([("STATE OF FLORIDA, COUNTY OF ", 1), (u(24), 0)], gap=8)
        rich([("The foregoing instrument was acknowledged before me by means of [] physical presence or [] online "
               "notarization, this " + u(5) + " day of " + u(15) + ", 20" + u(4) + ", by " + u(28) + ", "
               + t["ack_as"].format(**v) + " who is [] personally known to me or [] has produced " + u(22)
               + " as identification.", 0)], gap=22)
    rich([(u(44) + "   (SEAL)", 0)], gap=0)
    rich([("Notary Public - State of Florida", 0)], gap=0)
    rich([("Print name: " + u(28) + "   My commission expires: " + u(16), 0)])
    if st["y"] > 760: raise SystemExit(f"LAYOUT OVERFLOW: text ends at y={st['y']:.0f} (> 760). Shorten scope/legal.")

    docname = " ".join(t["title"]).title().replace(" / ", "/")
    return finish(job, out, doc, p, docname)

def finish(job, out, doc, p, docname):
    unit = f', {job["unit"]}' if job.get("unit") else ""
    stamp = f'{job["trk"]} | {docname} | {job["address"]}{unit} | Folio {job["folio"]} | v{job.get("version", 1)} | {job["date"]}'
    n = len(doc)
    for i, pg in enumerate(doc):
        label = f"Page {i+1} of {n}"
        w = f.get_text_length(label, fontname="tiro", fontsize=10)
        pg.insert_text(((612 - w) / 2, 758), label, fontname="tiro", fontsize=10)
        pg.insert_text((54, 776), stamp + f" | p{i+1:03d} of {n:03d}", fontname="helv", fontsize=6.5)
    doc.set_metadata({"title": f'{docname} - {job["owner_name"]} - {job["address"]}{unit}',
                      "keywords": f'{job["trk"]} Folio {job["folio"]}'})
    doc.save(out, garbage=4, deflate=True, clean=True)

    # Blank-file guard: re-open and prove the content is really there.
    chk = f.open(out); txt = "".join(pg.get_text() for pg in chk)
    musts = [job["owner_name"], job["folio"], "JORGE VALDES", "Notary Public", "Witness 2"]
    for must in musts:
        if must not in txt: raise SystemExit(f"VERIFY FAILED: '{must}' not found in {out}")
    if sum(len(list(pg.widgets())) for pg in chk): raise SystemExit("VERIFY FAILED: form fields present")
    for i, pg in enumerate(chk):
        pg.get_pixmap(dpi=75).save(out[:-4] + (f"_preview_p{i+1}.png" if len(chk) > 1 else "_preview.png"))
    import hashlib, os
    print(f"OK {out} {os.path.getsize(out)} bytes sha256={hashlib.sha256(open(out,'rb').read()).hexdigest()[:16]} preview={out[:-4]}_preview.png")

if __name__ == "__main__":
    build(json.load(open(sys.argv[1])), sys.argv[2])
