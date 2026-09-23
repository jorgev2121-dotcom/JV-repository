#!/usr/bin/env python3
"""Build the Team USA client onboarding package for one job.

Usage: python3 make_package.py job.json OUT_DIR
Writes 01-05 PDFs + PACKAGE-CHECKLIST.md into OUT_DIR. See SKILL.md.
Every document is marked DRAFT - FOR ATTORNEY REVIEW until Jorge's attorney signs off.
"""
import json, os, sys, subprocess
from pdftext import Doc

HERE = os.path.dirname(os.path.abspath(__file__))
TUS = dict(name="TEAM USA SALES, INC.", addr="13633 SW 142 Terrace, Miami, FL 33186",
           phone="305-300-4500", email="Jorge@TeamUsaSales.com", web="www.TeamUsaSales.com",
           signer="Jorge Valdes, President")
DRAFT = "DRAFT - FOR ATTORNEY REVIEW"
ENTITY = {"llc", "corp", "trust", "ladybird"}
u = lambda n: "_" * n
money = lambda x: f"${x:,.2f}"

def prop_rows(j):
    unit = f', {j["unit"]}' if j.get("unit") else ""
    rows = [("OWNER:", j["owner_name"]), ("PROPERTY:", f'{j["address"]}{unit}, {j["city_state_zip"]}'),
            ("FOLIO NO.:", j["folio"])]
    if j.get("legal"): rows.append(("LEGAL:", j["legal"]))
    return rows

def stamp(j, doc):
    return f'{j["trk"]} | {doc} | v{j.get("version",1)} | {j["date"]} | {DRAFT}'

def ack_for(j):
    t = j["owner_type"]
    return {"individual": "individually,", "ladybird": "as life tenant,",
            "llc": f'as {u(18)} of {j["owner_name"]}, a Florida limited liability company, on behalf of the company,',
            "corp": f'as {u(18)} of {j["owner_name"]}, a Florida corporation, on behalf of the corporation,',
            "trust": f'as Trustee of the {j["owner_name"]}, on behalf of the trust,'}[t]

# ---------------------------------------------------------------- 01 agreement
def agreement(j, out):
    d = Doc(stamp(j, "Owner's Agent Services Agreement"))
    d.rich([(DRAFT, 1)], 8, True, 4)
    d.title("OWNER'S AGENT / PERMIT EXPEDITING", "SERVICES AGREEMENT")
    d.rich(f'This Services Agreement (the "Agreement") is made on {j["date"]} between {TUS["name"]}, a Florida corporation, '
           f'{TUS["addr"]} ("Team USA"), and the Owner named below (the "Owner"), concerning the property described below (the "Property"). '
           f'Team USA and the Owner are each a "Party" and together the "Parties."')
    d.box(prop_rows(j) + [("TRACKING NO.:", j["trk"])])
    n = [0]
    def sec(title, *paras):
        n[0] += 1; d.heading(f"{n[0]}. {title}")
        for p in paras: d.rich(p, indent=0)
    sec("SCOPE OF SERVICES",
        "Team USA shall act as the Owner's agent and permit expediter for the Property and shall perform the services listed below "
        "(the \"Services\"). Services not listed are excluded unless added by a written change order signed by both Parties.",
        *[f"({chr(97+i)}) {s}" for i, s in enumerate(j["services"])])
    sec("COMPENSATION AND PAYMENT",
        f'The Owner shall pay Team USA a total fee of {money(j["fee_total"])} (the "Agreement Amount"), payable as set out in the '
        "Payment Schedule attached as Exhibit A (document 02 of this package), which is part of this Agreement.",
        "Government permit, plan review, recording and inspection fees, and the fees of design professionals, surveyors, testing labs "
        "and other third parties, are not included in the Agreement Amount. They are paid by the Owner directly or reimbursed to Team USA "
        "at cost upon invoice.",
        "Invoices are due on receipt. Any amount unpaid 15 days after its due date bears a late charge of 1.5% per month (18% per year) "
        "or the maximum rate allowed by law, whichever is less. Team USA may suspend the Services while any invoice is past due.")
    sec("NO GUARANTEE OF GOVERNMENT ACTION",
        "Permit approvals, plan review comments, inspection results and processing times are decided by the governing authorities, "
        "not by Team USA. Team USA does not guarantee any approval, outcome or deadline, and a delay or denial by a governing authority "
        "is not a breach of this Agreement and does not reduce the Agreement Amount.")
    sec("OWNER'S RESPONSIBILITIES",
        "The Owner shall: (a) provide true, complete and timely information and documents, including ownership, entity and identification "
        "records; (b) disclose all known open permits, code violations, liens and association requirements affecting the Property; "
        "(c) sign, witness and notarize documents that the law requires the Owner to sign personally, including the Notice of "
        "Commencement; (d) provide safe and reasonable access to the Property; and (e) complete and keep current the Contact Sheet "
        "(document 03) and the Site Access and Pet Disclosure (document 04).")
    sec("TERMINATION WITHOUT CAUSE",
        "Either Party may terminate this Agreement without cause by giving the other Party at least thirty (30) days' written notice. "
        "Termination takes effect on the same day of the calendar month following the month in which the notice is delivered, or on the last day of that following month if it has no such day (the \"Termination Date\").",
        "Upon termination for any reason, the Owner shall pay Team USA the fees earned through the last calendar day of the month in which "
        "the Termination Date falls, plus all reimbursable costs incurred through the Termination Date. For example, if notice is "
        "delivered on December 15, the Termination Date is January 15, and Team USA is paid through January 31.",
        "Termination does not affect any payment already due. The hold harmless, non-disparagement (if included), default and governing-law sections survive termination.")
    sec("HOLD HARMLESS AND INDEMNIFICATION",
        "To the fullest extent permitted by law, the Owner shall indemnify, defend and hold harmless Team USA and its officers, employees "
        "and agents from and against all claims, losses, fines, penalties, damages and expenses, including reasonable attorneys' fees, "
        "arising out of or related to: (a) the condition of the Property; (b) any information or document furnished by the Owner that "
        "is false or incomplete; (c) the design, construction, materials or workmanship of any architect, engineer, contractor or other "
        "party retained by the Owner; (d) any animal kept at the Property; or (e) the Owner's breach of this Agreement; except to the "
        "extent caused by the sole negligence or willful misconduct of Team USA.",
        "Team USA is not a contractor, architect or engineer, does not perform or supervise construction, and is not responsible for "
        "the means, methods or safety of any work at the Property.")
    if j.get("_non_disparagement"):
        sec("MUTUAL NON-DISPARAGEMENT",
            "Neither Party shall make, publish or communicate, or cause any other person to make, publish or communicate, any false, "
            "defamatory, disparaging or negative statement about the other Party, its officers, employees or agents, or the Services, "
            "whether orally, in writing, or by any electronic means, including social media, online review sites and messaging platforms.",
            "The Parties agree that the damages caused by a breach of this Section are difficult to determine, and that an amount equal to "
            "the Agreement Amount is a reasonable estimate of those damages and not a penalty. A Party that breaches this Section shall pay "
            "the other Party that amount as liquidated damages, in addition to any other relief available at law or in equity, including "
            "injunctive relief.",
            "A breach of this Section by the Owner is a default under this Agreement. To secure payment of the liquidated damages, the Owner "
            "grants Team USA a lien on the Property and consents to the recording of a notice of that lien in the Official Records of the "
            "county where the Property is located. The Owner shall sign any further document reasonably required to perfect the lien.",
            "Nothing in this Section restricts any statement required by law, made to a government agency, or made in testimony under oath.")
    sec("DEFAULT, REMEDIES AND ATTORNEYS' FEES",
        "In any action to enforce this Agreement, the prevailing Party shall recover its reasonable attorneys' fees and costs, including on "
        "appeal and in collection. Unpaid amounts may be pursued by any lawful means, including any lien rights available under Florida law.")
    sec("GOVERNING LAW AND VENUE",
        "This Agreement is governed by the laws of the State of Florida. Venue for any action lies exclusively in the state courts of "
        "Miami-Dade County, Florida. EACH PARTY KNOWINGLY AND VOLUNTARILY WAIVES TRIAL BY JURY.")
    sec("GENERAL",
        "This Agreement, with its exhibits and the documents in this package, is the entire agreement of the Parties and replaces all "
        "prior discussions. It may be changed only in a writing signed by both Parties. If any provision is held unenforceable, the rest "
        "remains in effect and the provision is enforced to the maximum extent allowed. Notices shall be in writing and delivered by "
        "email and by mail to the addresses on the Contact Sheet. This Agreement may be signed in counterparts and electronically, and "
        "each counterpart is an original.")
    d.rich([("IN WITNESS WHEREOF,", 1), (" the Parties have signed this Agreement on the dates below.", 0)], gap=12)
    d.sig_block(f"TEAM USA: {TUS['name']}")
    nd = j.get("_non_disparagement")
    d.sig_block(f"OWNER: {j['owner_name']}", witnesses=bool(nd), notary_ack=ack_for(j) if nd else None)
    return d.save(out, must=(j["owner_name"], "TERMINATION WITHOUT CAUSE", "HOLD HARMLESS", j["folio"]))

# ---------------------------------------------------------------- 02 payment + invoice
def payment(j, out):
    d = Doc(stamp(j, "Exhibit A - Payment Schedule and Invoice"))
    d.rich([(DRAFT, 1)], 8, True, 4)
    d.title("EXHIBIT A", "PAYMENT SCHEDULE AND INVOICE")
    d.box([("FROM:", f'{TUS["name"]}, {TUS["addr"]}'), ("", f'{TUS["phone"]} | {TUS["email"]}')] )
    d.box(prop_rows(j) + [("INVOICE NO.:", j.get("invoice_no", u(12))), ("INVOICE DATE:", j["date"]), ("TRACKING NO.:", j["trk"])])
    d.heading("PAYMENT SCHEDULE")
    tot = 0
    for i, p in enumerate(j["payment_schedule"], 1):
        tot += p["amount"]
        d.rich([(f'{i}. {p["desc"]}', 1), (f' - {money(p["amount"])} - due {p["due"]}', 0)], gap=3)
    d.y += 6
    if abs(tot - j["fee_total"]) > 0.005:
        raise SystemExit(f"PAYMENT SCHEDULE {tot} does not add up to fee_total {j['fee_total']}")
    d.rich([("AGREEMENT AMOUNT: ", 1), (money(tot), 1)], 11, gap=12)
    first = j["payment_schedule"][0]
    d.heading("AMOUNT DUE NOW")
    d.rich([(f'{first["desc"]}: ', 0), (money(first["amount"]), 1), (f' - due {first["due"]}', 0)], 11, gap=10)
    d.heading("HOW TO PAY")
    d.rich(j.get("pay_methods", "Check payable to Team USA Sales, Inc., or Zelle / ACH to the account details provided "
           "separately by Jorge Valdes. Never pay to account details received only by email without confirming by phone at 305-300-4500."))
    d.heading("TERMS")
    d.rich("Due on receipt. Late charge of 1.5% per month on amounts unpaid 15 days after the due date. Government, recording and "
           "third-party fees are billed separately at cost. On termination, fees are earned through the last day of the month in which "
           "the Termination Date falls (Agreement Section 5).")
    return d.save(out, must=("PAYMENT SCHEDULE", money(tot), j["trk"]))

# ---------------------------------------------------------------- 03 contact sheet
def contacts(j, out):
    d = Doc(stamp(j, "Project Contact Sheet"))
    d.title("PROJECT CONTACT SHEET")
    d.box(prop_rows(j) + [("TRACKING NO.:", j["trk"])])
    roles = ["Owner / Owner's signer", "Owner's second contact", "Property manager / association",
             "Tenant / occupant", "Emergency contact 1", "Emergency contact 2",
             "Contractor of record", "Architect / Engineer", "Team USA - Jorge Valdes"]
    given = {c["role"]: c for c in j.get("contacts", [])}
    given.setdefault("Team USA - Jorge Valdes", {"name": "Jorge Valdes", "company": TUS["name"],
                     "phone": TUS["phone"], "email": TUS["email"]})
    for r in roles + [k for k in given if k not in roles]:
        c = given.get(r, {})
        d.heading(r.upper())
        d.rich(f'Name: {c.get("name") or u(34)}   Company: {c.get("company") or u(26)}', gap=2)
        d.rich(f'Mobile: {c.get("phone") or u(18)}   Alt phone: {c.get("alt_phone") or u(18)}', gap=2)
        d.rich(f'Email: {c.get("email") or u(40)}', gap=2)
        if r.startswith("Emergency"):
            d.rich(f'Relationship to owner: {c.get("relationship") or u(30)}', gap=2)
        d.y += 6
    d.heading("PREFERRED WAY TO REACH THE OWNER")
    d.rich("[] Call   [] Text   [] Email   [] WhatsApp        Best hours: " + u(24))
    return d.save(out, must=("PROJECT CONTACT SHEET", "EMERGENCY CONTACT 1", j["trk"]))

# ---------------------------------------------------------------- 04 site access + pets
def site(j, out):
    d = Doc(stamp(j, "Owner Site Access and Pet Disclosure"))
    d.rich([(DRAFT, 1)], 8, True, 4)
    d.title("OWNER'S SITE ACCESS, SAFETY", "AND PET DISCLOSURE")
    d.box(prop_rows(j) + [("TRACKING NO.:", j["trk"])])
    d.heading("1. ANIMALS AT THE PROPERTY")
    d.rich("Are any dogs or other animals kept at or allowed on the Property?   [] No   [] Yes")
    d.rich("If yes, list each animal (type, breed, number, name): " + u(40), gap=2)
    d.rich(u(88))
    d.rich("Has any animal at the Property ever bitten or threatened a person?   [] No   [] Yes, explain: " + u(20))
    d.heading("2. OWNER'S DUTY TO RESTRAIN ANIMALS")
    d.rich("The Owner shall keep every animal at the Property securely confined, leashed or otherwise restrained, out of the work area "
           "and away from all access routes, at all times while any Related Party is at the Property. \"Related Party\" means Team USA "
           "and its staff, the design professionals (architects, engineers, surveyors, inspectors), trade contractors and their workers, "
           "and government inspectors. A Related Party may refuse to enter, or may leave, the Property if an animal is not restrained, "
           "and any resulting delay or return-trip cost is the Owner's responsibility. The Owner is solely responsible for any injury or "
           "damage caused by an animal at the Property and shall indemnify and hold harmless each Related Party as provided in the "
           "Services Agreement.")
    d.heading("3. ACCESS")
    d.rich("Gate / door / lockbox codes, or how to get a key: " + u(40), gap=2)
    d.rich("Alarm system?   [] No   [] Yes - who disarms it: " + u(34), gap=2)
    d.rich("Parking instructions: " + u(62), gap=2)
    d.rich("Association or building-manager rules for contractor access (hours, insurance, elevator booking): " + u(10), gap=2)
    d.rich(u(88))
    d.heading("4. KNOWN HAZARDS")
    d.rich("To the Owner's knowledge, does the Property have any of the following?  [] Unsafe or damaged structure   [] Mold   "
           "[] Asbestos or lead paint   [] Exposed wiring   [] Pool or open excavation   [] Other: " + u(26))
    d.rich("The Owner shall tell Team USA in writing of any new hazard as soon as the Owner learns of it.", gap=12)
    d.sig_block(f"OWNER: {j['owner_name']}")
    return d.save(out, must=("ANIMALS AT THE PROPERTY", "RESTRAIN", j["trk"]))

# ---------------------------------------------------------------- driver
def main(jpath, outdir):
    j = json.load(open(jpath)); os.makedirs(outdir, exist_ok=True)
    nd = j.get("non_disparagement", "auto")
    j["_non_disparagement"] = (j["owner_type"] in ENTITY) if nd == "auto" else bool(nd)
    base = f'{j["date"]} _ {j["trk"]} _ '
    v = f'v{j.get("version",1)}'
    made = []
    for num, name, fn in [("01", "Agreement _ Owners-Agent-Services-Agreement", agreement),
                          ("02", "Invoice _ Exhibit-A-Payment-Schedule-and-Invoice", payment),
                          ("03", "Contacts _ Project-Contact-Sheet", contacts),
                          ("04", "Disclosure _ Site-Access-and-Pet-Disclosure", site)]:
        out = os.path.join(outdir, f"{base}{name} _ {v}.pdf")
        pages = fn(j, out); made.append((num, out, pages))
    poa = None
    if j["owner_type"] in ENTITY:
        poa = os.path.join(outdir, f"{base}POA _ Owner-Authorization-LPOA _ {v}.pdf")
        pj = dict(j); pj.pop("services", None)
        tmp = os.path.join(outdir, "_poa_job.json"); json.dump(pj, open(tmp, "w"))
        subprocess.run([sys.executable, os.path.join(HERE, "..", "owner-authorization-poa", "make_poa.py"), tmp, poa], check=True)
        os.remove(tmp)
        for extra in (poa[:-4] + "_preview.png",):
            if os.path.exists(extra): os.remove(extra)
    ck = [f"# Onboarding package checklist - {j['trk']} - {j['owner_name']}", "",
          f"Generated {j['date']}. Owner type: {j['owner_type']}. Non-disparagement clause: "
          f"{'INCLUDED' if j['_non_disparagement'] else 'OMITTED (individual consumer - Consumer Review Fairness Act)'}.", "",
          "## Generated by make_package.py (verified non-blank)", ""]
    for num, out, pages in made: ck.append(f"- [x] {num} {os.path.basename(out)} ({pages} pages)")
    ck.append(f"- [{'x' if poa else ' '}] 05 Power of attorney / resolution: " + (os.path.basename(poa) if poa else "not needed - owner is an individual and signs personally"))
    ck += ["", "## County forms - filled per job, then FLATTENED before sending (RI-048)", "",
           "- [ ] 06 Building permit application (Miami-Dade form 123_01-52 or the municipality's form)",
           "- [ ] 07 Notice of Commencement - OWNER SIGNS PERSONALLY (Fla. Stat. 713.13(1)(g)); for an entity, its officer/manager/trustee",
           "- [ ] 08 Notice of Termination (Fla. Stat. 713.132) - prepared now, signed and recorded at close-out",
           "", "## Collect from the owner", "",
           "- [ ] Copy of signer's driver's license, all numbers readable",
           "- [ ] Entity owners: Sunbiz print-out showing the signer's authority; trusts: certification of trust (Fla. Stat. 736.1017)",
           "- [ ] Signed 01, 04 and 05 back as scans, checked before originals go in the mail",
           "- [ ] First payment received (02)"]
    open(os.path.join(outdir, "PACKAGE-CHECKLIST.md"), "w").write("\n".join(ck) + "\n")
    for num, out, pages in made: print(f"OK {num} {os.path.getsize(out):>6} bytes {pages}p {os.path.basename(out)}")
    if poa: print(f"OK 05 {os.path.getsize(poa):>6} bytes {os.path.basename(poa)}")
    print("OK checklist", os.path.join(outdir, "PACKAGE-CHECKLIST.md"))

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
