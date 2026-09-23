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
        until="This authorization remains in effect until revoked in writing by the Company.",
        by="COMPANY: {owner}", title_line="Title: Manager / Managing Member",
        ack_as="as {blank} of {owner}, a {state} limited liability company, on behalf of the company,"),
    "corp": dict(
        title=["CORPORATE RESOLUTION"], notary="jurat",
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


# ------------------------------------------------------------------------------------------
# LLC / corporation: CERTIFICATE OF COMPANY RESOLUTION, following the attorney-prepared
# template by Jacqueline R. Hernandez-Valdes, Esq. (OneDrive: "Template POA for LLC Resolution
# violation 2025 MSword for editing v2_.docx", 4100 Palm Ave LLC, March 2025). Jorge directed
# 2026-09-23 that this is the legal standard for entity owners.
# ------------------------------------------------------------------------------------------
PREPARER = ["Jorge Valdes", "Team USA Sales, Inc.", "13633 SW 142 Terrace", "Miami, Florida 33186"]

def build_certificate(job, out, agents):
    corp = job["owner_type"] == "corp"
    kind = "Florida Corporation" if corp else "Florida Limited Liability Company"
    word = "Corporation" if corp else "Company"
    owner = job["owner_name"]; signer = job.get("signer_name") or "_" * 26
    title = job.get("signer_title") or ("President" if corp else "Manager")
    unit = f', {job["unit"]}' if job.get("unit") else ""
    prop = f'{job["address"]}{unit}, {job["city_state_zip"]} (Folio No. {job["folio"]})'
    agency = job.get("agency", "Miami-Dade County")
    matter = job.get("matter", "the permit(s) and any related code enforcement case(s)")
    doc = f.open()
    X0, X1 = 72, 540; st = {"y": 60, "p": doc.new_page(width=612, height=792)}
    tl = lambda s_, fn, fs: f.get_text_length(s_, fontname=fn, fontsize=fs)
    def rich(segs, fs=10.5, center=False, gap=8, indent=0):
        words = []
        for text, bold in segs:
            for k, w in enumerate(text.split(" ")):
                if not w: continue
                if k == 0 and words and w[0] in ",.;:" :   # glue punctuation to the previous word
                    words.append(("\x00" + w, "hebo" if bold else "helv")); continue
                words.append((w, "hebo" if bold else "helv"))
        wl = lambda w, fn: tl("[]", fn, fs) + 7 if w == "[]" else tl(w.lstrip("\x00"), fn, fs)
        sp = tl(" ", "helv", fs); x0 = X0 + indent; wmax = X1 - x0
        lines, cur, width = [], [], 0
        for w, fn in words:
            add = (sp if cur and not w.startswith("\x00") else 0) + wl(w, fn)
            if cur and width + add > wmax: lines.append((cur, width)); cur, width, add = [], 0, wl(w, fn)
            cur.append((w, fn)); width += add
        if cur: lines.append((cur, width))
        for ln, wid in lines:
            if st["y"] > 740:
                st["p"] = doc.new_page(width=612, height=792); st["y"] = 60
            x = x0 + ((wmax - wid) / 2 if center else 0)
            for w, fn in ln:
                if w == "[]":
                    st["p"].insert_text((x, st["y"]), "[", fontname=fn, fontsize=fs); x += tl("[", fn, fs) + 7
                    st["p"].insert_text((x, st["y"]), "]", fontname=fn, fontsize=fs); x += tl("]", fn, fs) + sp
                else:
                    if w.startswith("\x00"): w = w[1:]; x -= sp
                    st["p"].insert_text((x, st["y"]), w, fontname=fn, fontsize=fs); x += tl(w, fn, fs) + sp
            st["y"] += fs * 1.35
        st["y"] += gap
    names = lambda: [seg for i, a in enumerate(agents) for seg in
                     ([(" and/or ", 0)] if i else []) + [(a["name"].title() if False else a["name"], 1), (f' of {a["org"]}', 0)]]
    rich([("This Instrument Prepared by:", 0)], 9, gap=0)
    for l in PREPARER: rich([(l, 0)], 9, gap=0)
    st["y"] += 14
    rich([("CERTIFICATE OF COMPANY RESOLUTION" if not corp else "CERTIFICATE OF CORPORATE RESOLUTION", 1)], 13, True, 12)
    rich([("The undersigned, as authorized representative of ", 0), (owner, 1), (f', a {kind} (the "{word}"), hereby certifies that:', 0)])
    rich([(f"1. The {word} is a duly formed, validly existing {kind} in good standing under the laws of the State of "
           f"Florida and is qualified to do business under the laws of the State of Florida.", 0)], indent=18)
    rich([("2. That ", 0), (signer, 1), (f" is the {title} of the {word}.", 0)], indent=18)
    rich([("3. That ", 0), (signer, 1), (f", as the {title} of {owner}, a {kind}, has appointed ", 0)] + names()
         + [(f" to represent the {word} before {agency}, including at any administrative hearing(s), and to request "
             f"extensions of time, in all matters pertaining to {matter} for the real property located at {prop}.", 0)], indent=18)
    legal = job.get("legal_full") or job.get("legal") or ""
    rich([("4. That ", 0), (signer, 1), (f", as the {title} of {owner}, a {kind}, has appointed ", 0)] + names()
         + [(f" to act on behalf of the {word} to execute all permit applications, plans revisions and documents on behalf "
             f"of the {word} pertaining to {matter} for the real property located at {prop}"
             + (f", and described as follows: {legal}." if legal else "."), 0)], indent=18)
    rich([("RESOLVED,", 1), (f" that this Resolution shall continue in full force and effect until revoked in writing by the {word}, "
           f"and may be relied upon by {agency}.", 0)])
    if st["y"] > 740 - 300:   # keep the execution + notary block together on one page
        st["p"] = doc.new_page(width=612, height=792); st["y"] = 60
    rich([("IN WITNESS WHEREOF,", 1), (" the undersigned has executed this Certificate this ______ day of ________________, 20____.", 0)], gap=34)
    rich([("_" * 40, 0)], gap=0)
    rich([(signer, 1)], gap=0); rich([(f"{title}, {owner}", 0)], gap=18)
    rich([("State of Florida", 0)], gap=0); rich([("County of " + ("_" * 20), 0)], gap=10)
    rich([("The foregoing instrument was sworn to and subscribed before me via [] physical presence or via [] online "
           "notarization, this ______ day of ________________, 20____, by " + (signer if job.get("signer_name") else "_" * 26)
           + ", who [] is personally known to me or [] has produced ______________________ as identification.", 0)], gap=30)
    rich([("_" * 40, 0)], gap=0); rich([("Notary Public, State of Florida", 0)], gap=0)
    rich([("Printed Name: " + "_" * 26, 0)], gap=0); rich([("Commission Expires: " + "_" * 20, 0)], gap=0)
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
        pg.insert_text((54, 772), stamp + (f" | p{i+1:03d} of {n:03d}" if n > 1 else ""), fontname="helv", fontsize=6.5)
    doc.set_metadata({"title": f'{docname} - {job["owner_name"]} - {job["address"]}{unit}',
                      "keywords": f'{job["trk"]} Folio {job["folio"]}'})
    doc.save(out, garbage=4, deflate=True, clean=True)

    # Blank-file guard: re-open and prove the content is really there.
    chk = f.open(out); txt = "".join(pg.get_text() for pg in chk)
    musts = [job["owner_name"], job["folio"], "JORGE VALDES", "Notary Public"]
    if not docname.startswith("Certificate"): musts.append("Witness 2")
    for must in musts:
        if must not in txt: raise SystemExit(f"VERIFY FAILED: '{must}' not found in {out}")
    if sum(len(list(pg.widgets())) for pg in chk): raise SystemExit("VERIFY FAILED: form fields present")
    for i, pg in enumerate(chk):
        pg.get_pixmap(dpi=75).save(out[:-4] + (f"_preview_p{i+1}.png" if len(chk) > 1 else "_preview.png"))
    import hashlib, os
    print(f"OK {out} {os.path.getsize(out)} bytes sha256={hashlib.sha256(open(out,'rb').read()).hexdigest()[:16]} preview={out[:-4]}_preview.png")

if __name__ == "__main__":
    build(json.load(open(sys.argv[1])), sys.argv[2])
