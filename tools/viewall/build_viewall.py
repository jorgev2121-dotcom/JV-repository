#!/usr/bin/env python3
"""Build _VIEW-ALL_TUS-26-1033_2026-10-14.html (OWNER-DIRECTIVE VIEW-THREE-WAYS-01 pilot)."""
import json, re, base64, html, sys

SP = '/tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad'
OUT = '/home/user/JV-repository/reports/_VIEW-ALL_TUS-26-1033_2026-10-14.html'
OCR = json.load(open(SP + '/ocr/ocr_all.json'))
CAP = 20000

# date, name, folder, original id, ocr id, pretty-html id ('' if none), kind, flag, summary
D = [
 ("2024-06-18","DERM_APPLICATION-FORM_NDS-TIRES_2024-06-18.pdf","02_County-Records / DERM_2026-08-31","11SdCmcvqOXWPdbhGSZoKtBYezAe25Cke","1WvLhoClBoAdEN4ExurIFOG4qd9u8tBqw","","PDF · 6 pages","PRIOR TENANT",
  "Miami-Dade DERM application for an industrial-waste (IW5) operating permit, signed June 11, 2024 by Adriana Ospina as President of NDS Tires Inc (Paul's Tires Services), a tire and suspension shop that used Bay 2 before the theater. It includes her notarized business letter, the list of equipment and chemicals, and the County's approval of the shop's Certificate of Use (MU24003571, zoning M-1). Why it matters: it is property history, and it names Adriana Ospina, who is also listed as an officer of the landlord, Monaco Pereira LLC."),
 ("2024-07-01","DERM_OPERATING-PERMIT_NDS-TIRES_2024-07-01.pdf","02_County-Records / DERM_2026-08-31","1jzW5_8MnGatj-J-DN4zm9CVpaUNCGebA","1jLDxFhwHw7m73BxjQQaLTp6WctIlw0AJ","","PDF · 2 pages","PRIOR TENANT",
  "The DERM annual operating permit IW5-025165 issued to NDS Tires for 7265 NW 74 St Unit 2, valid May 1, 2024 to April 30, 2025. It lists the standard waste, spill and storage conditions. It shows the bay was permitted as an industrial use before the theater moved in."),
 ("2025-03-27","DERM_INSPECTION-REPORT_NDS-TIRES_2025-03-27.pdf","02_County-Records / DERM_2026-08-31","1b8qvZ6iWEIii_Pf-UYch39ah_VGQ3lJg","1OoIpPkeYl6_GbQnbLHYmY2uNyuT48XD3","","PDF · 7 pages","PRIOR TENANT",
  "DERM routine inspection of March 27, 2025. The inspector found NDS Tires gone and an “Office furniture warehouse” using the space, with no chemicals on site. The supervisor closed and deleted the IW5 permit on April 7, 2025. This is the last County environmental record before the theater use."),
 ("2026-03-29","A-1 - FLOOR PLAN.pdf","06_Plans-Photos-Sketches","1Ubjtm740LTpJwLSNyDJEimakHNYLXQrD","1k59xhHXUrhl9Smt5UxElmU6B826kgY-J","","Plan sheet","KEY",
  "Architectural floor plan by J. Fabregat, under the title block of Juan B. Ordonez, P.E. (FL 43380), dated March 29, 2026. It shows the two enlarged ADA restrooms, the new lobby storage room, the plumbing-fixture count for an occupant load of 252, and the door schedule. Not sealed by the new Engineer of Record yet."),
 ("2026-03-29","E-1 - ELECTRICAL PLAN.pdf","06_Plans-Photos-Sketches","10Yvo4YCpU0HsGhk13nn1rjLFRJd10BCN","1y6-vizL3onEzQBJzUKVUP7mww4KXGiW-","","Plan sheet","",
  "Electrical plan with the existing 225-amp panel “LA” schedule and demand calculation. Existing circuits are only moved to suit the new restrooms and storage room; no change to the electrical load. Waits on the engineer seal."),
 ("2026-03-29","LS-1 - FLOOR PLAN - LIFE SAFETY PLAN.pdf","06_Plans-Photos-Sketches","1UrZKdttbMEN6V_FtQsFW-0tydWFxL0Xj","1PrqnW5gUzmR-OAkXhCqEZZuqxpqzedVR","","Plan sheet","",
  "Life-safety plan: egress paths, exit doors and their capacities, 1-hour walls, and the occupant-load table (total 252, Assembly A-1). Says the egress layout is the one Miami-Dade Fire approved in December 2025. This copy carries no digital signature line."),
 ("2026-03-29","LS-1 - LIFE SAFETY.pdf","06_Plans-Photos-Sketches","1Wn3WtlPiAIU6PzeVaxYx4D5bY3XN2Cna","1Nclvs8OPacGt8kNcVcxQm__hejeot0J9","","Plan sheet","",
  "A second copy of the LS-1 life-safety sheet. It differs from the one above in two places: it says “catering storage”, and it carries Juan B. Ordonez’s digital signature dated March 30, 2026. Two versions of the same sheet should be reconciled before submittal."),
 ("2026-03-29","M-1 - MECHANICAL PLAN.pdf","06_Plans-Photos-Sketches","1KVUjn20eIGvYvuCJZaoL4LB2GDoNeevI","1Q94L8i84tbl1znObYqUieUYpskcetizx","","Plan sheet","",
  "Mechanical plan: the existing A/C and exhaust are rearranged for the new restrooms and storage room; no change to the air-conditioned area. Note: its general note still cites the 2020 (7th) Florida Building Code while the other sheets cite 2023 (8th)."),
 ("2026-03-29","P-1 - SANITARY SERVICE PLAN.pdf","06_Plans-Photos-Sketches","1oJ3MGrvmeWyTJCQt1eJcm_zwDcVz_5p3","1pWb_PzS3faArI-Lvgxbc2NZTqcg1m-p1","","Plan sheet","",
  "Plumbing and sanitary plan: fixture schedule, new 3-inch sanitary line tied to the existing 4-inch line, vents, water lines and the relocated tankless water heater. Waits on the engineer seal."),
 ("2026-03-30","WORK WITHOUT PERMIT FORM.pdf","06_Plans-Photos-Sketches","1jhEO57lgUhZfTsvqHV3kxthFx8FIvoeh","1gUWxhaNvB5tOkmh-WgFiDujuWDRZucDd","","PDF form","UNSIGNED",
  "Miami-Dade BORA memo of January 26, 2026 with the county-wide Work Without Permit guidelines, plus the Work Without Permit Certificate filled for 7265 NW 74 St (owner Monaco Pereira LLC) naming Juan B. Ordonez, P.E., digitally dated March 30, 2026. The landlord and both tenants still have to sign at a notary session that is not booked."),
 ("2026-06-23","image001.png","06_Plans-Photos-Sketches","13RfinhERgOO8yVgrIAQj-w8FvfKaZNJn","1ONZndvp_MLpfJCoRLUTvUKWHMIBXyJgF","","Image","",
  "Screenshot of a Miami-Dade e-Permitting inquiry for process W2026066388, review type ENFC (enforcement violation), disapproval code 26: “unpaid ticket or fine”. It points to an open enforcement item on the property that still needs its citation number and amount."),
 ("2026-06-23","GAME-PLAN-and-CONTACTS_TUS-26-1033.pdf","06_Plans-Photos-Sketches","1CgIP0hlaheoTbCYfQzKzGHLt27EF5laP","1vtD4YaviAbSDfdhjSgziNOx0jylH6wta","1Cf9xBpNdK0OGGcZslAQkqQvLqW4qJhZf","PDF","",
  "The June 23 game plan: who the players are, a first contact sheet, the six-step path (cure the violation, take over from the architect, lock in the engineer, landlord consent, file, quote) and the seven agreements in signing order. Several blanks it lists (landlord contact, NOV number) are still open."),
 ("2026-06-23","CONTACT-LIST_Medley_TUS-26-1033.pdf","03_Research-and-Proposal","1Im1yvFfsJbRSZxej9aP2iu-6DJqNo7gf","1-rJ3hAuM3f9w6lI3QA_wRohqpKVPNcwo","118N7hw_c5aIJa0eac17YcLVAi8LTRxDL","PDF","OLDER COPY",
  "The June 23 contact list: landlord Monaco Pereira LLC (signer Carlos Flores Walters), tenant MiamiArt House LLC (Daniel Felipe and Miall Mulkay), Synergyn as Engineer of Record replacing Ordonez, and the code-enforcement items still pending. The October 9 web page is the current version."),
 ("2026-06-23","SCOPE-OF-WORK_Medley_TUS-26-1033.pdf","03_Research-and-Proposal","16_hRqJdLmuDGtjl98Vk-TNIg5dIZ0LSf","1_PaMXqH0BUzo7RpSry76IAFw4VQ9naOl","1Sx-uA7SSXmekLMPOz2gDvW8zDLP-fwEE","PDF","",
  "Scope of work for permitting services only (no material or labor): Phase 1 takes the plans through the Town of Medley and Miami-Dade reviews to approval; Phase 2 is the contractor’s build and the Certificate of Use / Occupancy. Lists the eight documents the job needs. Its fee line uses the June proposal amount of $21,200."),
 ("2026-06-23","ES_ALCANCE-DE-TRABAJO_TUS-26-1033.pdf","03_Research-and-Proposal","1XNe8evlTVcG1C3J1Juk_Xk--RB5tEsub","1w_r5Qt5qFFevylX0tWz8b19mJXdBs53W","1BA4jTPGWaZuQWD11C_JyoPCvriO0-hQZ","PDF · Spanish","SPANISH",
  "Spanish courtesy translation of the Scope of Work above. The English version is the official one."),
 ("2026-06-23","PERMIT-APP-MEDLEY_COMPLETED_TUS-26-1033.pdf","04_Permits-and-Applications","1Gpvqh_jm0GrR2NOZqZQ5Q0MneX-_GYhV","1Y7ejFY5ooX8hC-b1Jp09esJR3UCTQagS","1-1KrP-Vx9NESl8JHOYthNQzWFTvzBgRG","PDF","UNSIGNED",
  "Town of Medley permit application filled in for the legalization (interior alteration, folio 22-3011-052-0020). Unsigned. It was made for process PB26-0047, which the Town voided on October 13, so a new application is needed."),
 ("2026-06-23","PERMIT-APP-MIAMIDADE_COMPLETED_TUS-26-1033.pdf","04_Permits-and-Applications","1PDtVJ-T8TtwTks-ICSLgGJ4gu_sWVXyN","187F2wOj-8Zcw2ndA-ZO4iVQRMdmo5Bwt","1GvoK8yp5WyUDdunf8AgNSz7Tp4D1kSlu","PDF","UNSIGNED",
  "The Miami-Dade companion application for the county reviews (Building, Structural, DERM, WASD, Fire). Unsigned. Same PB26-0047 caveat as the Medley application."),
 ("2026-06-23","PROPOSAL_TeamUSA-to-Tenant_TUS-26-1033.pdf","09_Financial","1-HsL3_rcRGP3waJ97KevHtk5TNw2g2qF","1ZNsjb95GfnF4dbFqXYvmsQ2i7DqTk6eU","1LjVOb0yOQX75pxsHuP3v8aTeytBFlEhY","PDF","UNSIGNED",
  "The original June 23 proposal to the tenant: $21,200 total, paid 50% / 30% / 20%. Blank and unsigned. It was later replaced by revision 3 at $16,000 (see the August 10 packet)."),
 ("2026-06-23","ES_PROPUESTA_TeamUSA-al-Inquilino_TUS-26-1033.pdf","09_Financial","1remNogMiWUqe44BxgG_LXeHcQfxDJvmm","1-i6Y4e5EIwU7bvVrZ0C5ytQoSEUjzt0n","19GzAMnT5TTZCOIs-bdTGbeVplY8OKsx3","PDF · Spanish","SPANISH",
  "Spanish courtesy translation of the June 23 proposal ($21,200). Unsigned."),
 ("2026-06-23","LIMITED-POA_Tenant-Authorization_TUS-26-1033.pdf","09_Financial","1SfMN1_GDzxRZcy3CrkjvAZ__MD0pt5Ko","1kVoDCxQceV6v22Z5zVQ5VZ_S9Krpt2nm","1D9pi8sQn0xA85BE03Se7eq9QMD-OVKWn","PDF","UNSIGNED",
  "Limited Power of Attorney: MiamiArt House LLC appoints Jorge Valdes and Team USA Sales as its agent for permits only, not construction. Needs both members’ signatures and a notary. Nothing signed has come back."),
 ("2026-06-23","ES_PODER-LIMITADO_Autorizacion-Inquilino_TUS-26-1033.pdf","09_Financial","1rvcr72DHqU7A3UbaPNbPmA1zqkpD-Ro6","1-AlyBupasQbBLQzBqHMLD7EKfKh_9py8","1xcskKsvyY1ccnXyuuoXl1KboRQPNHazQ","PDF · Spanish","SPANISH",
  "Spanish courtesy translation of the Limited Power of Attorney. Unsigned."),
 ("2026-06-23","LANDLORD-CONSENT_MonacoPereira_TUS-26-1033.pdf","09_Financial","1if7XTXOLfYO6WK10izVmgNLJTCZJI8Wo","1dO2197Gro3PspOm4rHjJ9j8Lb4-HHZ-B","1wG1n9CBu4CHt2NV-kvq-mFlnJhaW9ueD","PDF","UNSIGNED",
  "Landlord consent: Monaco Pereira LLC lets the tenant and its agent pull permits for the legalization. Needs Carlos Flores Walters’ signature and a notary. Blocked: there is no direct landlord contact on file."),
 ("2026-06-23","INVOICE-01_TUS-26-1033.pdf","09_Financial","1HgOEq3EawxDpEL1iEsbtHOgg5na1AiRA","1gV__-64pD1vYJZ6e0SKFrnhrA8tzb1qO","1OJkM5ADPU5hHqUXG50hL7E4xqiQDNsgu","PDF","SENT 06-23",
  "Invoice TUS-26-1033-01, dated June 23: $10,600 due now (50% of $21,200), due on acceptance of the proposal. Mailed June 23. Not shown as paid; no signed proposal is on file, so payment is unverified."),
 ("2026-06-23","ES_FACTURA-01_TUS-26-1033.pdf","09_Financial","1xz4uPdZ95w1Xj_gQvctIVTAPak7BA09H","1g3uYqIizwT-y0FxXhQmRu9OwydoNrSPG","1kvRfyAWnuKFtlun11eamwWKfG0SvrciL","PDF · Spanish","SPANISH",
  "Spanish courtesy translation of invoice TUS-26-1033-01 ($10,600 due now)."),
 ("2026-08-10","COVER-SHEET_Signers_TUS-26-1033.pdf","OUT-FOR-SIGNATURE_2026-08-10","1LlvOYY5QkQY8E4CpRMELhMaWlsosycU8","187kb59g_nOwK9AungPnKDShgfnN3Uds2","","PDF","",
  "Cover sheet of the August 10 signing packet: who signs what. Landlord (Carlos Flores Walters), tenants (Daniel Felipe and Miall Mulkay), Jorge Valdes as agent, and Miguel Zaldivar of MZ Solutions (CGC1528486) as contractor."),
 ("2026-08-10","TRANSMITTAL-LIST_OutForSignature_TUS-26-1033.pdf","OUT-FOR-SIGNATURE_2026-08-10","1RX2NADuWtHyBTPqo1AIlfoSVJqAUSF0i","16dXq_SQqnXUCNsXVkeO_uXyustNXja7T","","PDF","",
  "The checklist for the packet in two notary sessions: Session 1 (landlord consent, resolutions, power of attorney, hold-harmless, lien authorization, proposal v3 at $16,000), then Session 2 (both permit applications, the Work Without Permit form, sealed plans). Nothing is ticked as returned."),
 ("2026-08-10","MEDLEY_1_PERMIT-APPLICATIONS.pdf","OUT-FOR-SIGNATURE_2026-08-10","1A7Q0CTTtouTkCd5nse7MfjARrcUv9Ptt","1lyltDuSzcSdtSwkCOWbquzvYzAJhVQSS","","PDF","UNSIGNED",
  "Packet section 1: the Medley and Miami-Dade permit applications together, same text as the June 23 versions. Unsigned. Superseded in effect by the October 13 voiding of PB26-0047."),
 ("2026-08-10","MEDLEY_2_SIGN-and-NOTARIZE.pdf","OUT-FOR-SIGNATURE_2026-08-10","18KdO32y-TuLBoUerh2U1NJD2P1e9GsqA","1jRGuS1hdmFgdW5t6YdooY-oNrU9bMHZp","","PDF","UNSIGNED",
  "Packet section 2: the landlord consent and the Limited Power of Attorney to be signed before a notary. The text layer also carries a stray Ordonez digital-signature stamp from the attached Work Without Permit form. Unsigned; nothing returned in 65 days."),
 ("2026-08-10","MEDLEY_3_SCOPE-and-PROPOSAL.pdf","OUT-FOR-SIGNATURE_2026-08-10","1V19RwtboY59GeVOO6j4Hnu1jq8zpT6a0","1JFnsOCmJOWmoVf_HHK96Xtl0GRTi1D01","","PDF","UNSIGNED",
  "Packet section 3: the scope of work plus proposal revision 3 dated August 7: $16,000 total, paid 50% / 25% / 25% ($8,000 on acceptance). The footer stamp says v2 while the header says revision 3. Not countersigned."),
 ("2026-08-10","MEDLEY_4_FINANCIAL-INVOICE.pdf","OUT-FOR-SIGNATURE_2026-08-10","1OaAQy5wPiF4qZHsRsInupxeKSp-JaXms","1syqCv1i1fHjcySITH_MI64pkb5-XDad9","","PDF","",
  "Packet section 4: invoice TUS-26-1033-01 revision 3, dated August 10: $8,000 due now on a $16,000 contract. It reuses the same invoice number as the June $10,600 invoice; the capsule notes this copy was only ever sent to Jorge’s own address."),
 ("2026-08-10","MEDLEY_5_PLANS.pdf","OUT-FOR-SIGNATURE_2026-08-10","1uI6ABzQFEuVia_cJVj23ieKtnDfWzdtl","1CsZEtGk0IWd5vMF7aWZTPvi7SvHL626x","","PDF · 6 sheets","",
  "Packet section 5: the six plan sheets in one file (A-1, E-1, both LS-1 versions, M-1, P-1). Same content as the single sheets above. Engineer seal still to be decided (Ordonez or Synergyn)."),
 ("2026-08-17","NOTICE-OF-COMMENCEMENT_DRAFT_TUS-26-1033.pdf","04_Permits-and-Applications","14ZEza46Ck3Yu3G9RTDmuwQvoSBO66SvF","1iIV51RuGNccWFabslZOPIsjVhhbCR84z","11oIl5uwXMbk1hI9ZbyRaSkfmFER-pDJ0","PDF","DRAFT",
  "Draft Notice of Commencement (Florida Statutes 713.13), staged for Phase 2. Owner Monaco Pereira LLC, contractor Miguel Zaldivar (MZ Solutions). Still to fill: the recorded legal description, the permit number, and several addresses. Not signed, not recorded."),
 ("2026-08-17","ENGINEERING-AGREEMENT_Synergyn_DRAFT_TUS-26-1033.pdf","09_Financial","1VUxY9dZ4jWwYHOsW1HpoQobth749crfo","1LLNiyBEsiImG_n8kXEB6ZZceSEQBoBxK","1Ev7CwQTpqqa03SuVRmWDn9FuzVwtZeGx","PDF","DRAFT · UNSIGNED",
  "Draft Engineer of Record agreement between the tenant and Synergyn for MEP completion, seals and plan-review answers. Fee lines are left blank on purpose. Missing: Synergyn’s sealing engineer and license number. Synergyn has not answered since August 24, and the engineer decision is still open."),
 ("2026-08-18","MEDLEY-PRINT-RUN_TUS-26-1033_2026-08-18.pdf","05-REPORTS-DELIVERABLES","1JRTZp1tayi5S0AY_wDsxGGENsYB-Vjs-","1mCRrk_qIPgf7quM_Wzl1x8gLdxMBc-TD","","PDF · 19 pages","",
  "The 19-page print run Jorge approved on August 18: cover index, proposal and scope v3 ($16,000), the plan sheets, the contact sheet and the scope of work as sent to Synergyn. It records that no labeled job photos exist anywhere."),
 ("2026-09-08","2026-09-08_1520_Jorge-Valdes_Project-Onboarding-Schedule.pdf","04-CORRESPONDENCE","1As0bGR430expGEKOnO2nXjlSh3qXZ4FC","1VFdUTuF--VubpI_6-n0LvZXFlY9JLh1h","","Email (PDF)","",
  "Jorge’s September 8 kickoff email with the 18-week schedule: intake to September 28, submittals to November 17, permit and inspections to December 28, closeout by January 15, 2027. Both miamiarthouse.com addresses bounced. The schedule predates the October 13 voiding, so its dates are now stale."),
 ("2026-09-11","2026-09-11_2136_Mailer-Daemon_Bounce-Evidence-TUS-26-1033.pdf","04-CORRESPONDENCE","1tJ9i1chRoB3LzNBL3CPZdD1Cn2l-pEBo","1pWVHvmzWSytDkTWCho3imS5plrNkPCp6","","Email (PDF)","",
  "Bounce proof for the September 8 email: daniel@ and miall@miamiarthouse.com permanently failed on September 11 because that domain’s mail servers were down. Use cfelipe87@live.com and elmija74@gmail.com instead."),
]
assert len(D) == 36, len(D)

# ---------- money obfuscation ----------
MONEY = []
money_re = re.compile(r'\$\s?\d[\d,]*(?:\.\d+)?(?:\s?[MK]\b)?')
def protect(text):
    """escape text for HTML; replace each dollar amount with a locked placeholder span."""
    out = []; last = 0
    for m in money_re.finditer(text):
        out.append(html.escape(text[last:m.start()], quote=False))
        MONEY.append(base64.b64encode(m.group(0).encode()).decode()[::-1])
        out.append('<span class="amt" data-m="%d">\U0001F512 $—</span>' % (len(MONEY) - 1))
        last = m.end()
    out.append(html.escape(text[last:], quote=False))
    return ''.join(out)

def durl(i): return 'https://drive.google.com/file/d/%s/view' % i
def purl(i): return 'https://drive.google.com/file/d/%s/preview' % i

# Real page images (rendered from the Drive originals by scratchpad/va/render.py)
import os, glob
VA = SP + '/va'
NUM = {m['id']: m['n'] for m in json.load(open(VA + '/manifest.json'))}
def pages_for(oid):
    n = NUM.get(oid)
    return sorted(os.path.basename(f) for f in glob.glob('%s/pages/d%02d_p*.jpg' % (VA, n))) if n else []

D.sort(key=lambda r: (r[0], r[1].lower()))
n = len(D)
n_img = sum(1 for r in D if r[3])
n_ocr = sum(1 for r in D if r[4] and r[4] in OCR)
n_pretty = sum(1 for r in D if r[5])
n_rep = sum(1 for r in D if r[8])
capped = []

blocks = []
for k, (date, name, folder, oid, sid, hid, kind, flag, summ) in enumerate(D, 1):
    has_img = bool(oid); has_ocr = bool(sid and sid in OCR); has_rep = bool(summ)
    badges = ''.join([
        '<span class="pill %s">%s</span>' % ('p-done' if has_img else 'p-miss', 'IMAGE' if has_img else 'NO IMAGE'),
        '<span class="pill %s">%s</span>' % ('p-done' if has_rep else 'p-miss', 'REPORT' if has_rep else 'NO REPORT'),
        '<span class="pill %s">%s</span>' % ('p-done' if has_ocr else 'p-miss', 'OCR TEXT' if has_ocr else 'NO OCR'),
    ])
    if flag:
        badges += '<span class="pill p-flag">%s</span>' % html.escape(flag)
    links = ['<a class="open" href="%s" target="_blank" rel="noopener">Open the original ↗</a>' % durl(oid)]
    if has_ocr:
        links.append('<a class="open" href="%s" target="_blank" rel="noopener">Open the OCR text ↗</a>' % durl(sid))
    if hid:
        links.append('<a class="open" href="%s" target="_blank" rel="noopener">Pretty web version ↗</a>' % durl(hid))
    head = ('<div class="dh"><p class="dn"><span class="num">%d</span>%s</p>'
            '<p class="dm">%s · %s · TUS-26-1033 · %s</p>'
            '<p class="badges">%s</p><p class="links">%s</p></div>') % (
        k, html.escape(name), date, html.escape(kind), html.escape(folder), badges, ' '.join(links))
    # view 1
    pg = pages_for(oid) if oid else []
    if pg:
        v1 = ''.join('<img class="pg" loading="lazy" src="pages/%s" alt="%s, page %d of %d"><p class="pgn">%s · page %d of %d</p>' % (f, html.escape(name), i, len(pg), html.escape(name), i, len(pg)) for i, f in enumerate(pg, 1))
    elif has_img:
        v1 = ('<div class="frame"><iframe loading="lazy" src="%s" title="%s" allow="autoplay"></iframe></div>'
              '<p class="hint">If the page above is blank, sign in to Google in this browser, or use “Open the original”.</p>') % (purl(oid), html.escape(name))
    else:
        v1 = '<div class="gap">No image on file for this document. Its report is shown in its place.</div><div class="rep">%s</div>' % protect(summ)
    # view 2
    src = 'Summary written for this viewer from the OCR text and the 2026-10-13 capsule.'
    if hid:
        src += ' A fuller pretty version is on file (link above).'
    v2 = '<div class="rep"><p>%s</p><p class="src">%s</p></div>' % (protect(summ), src) if has_rep else '<div class="gap">No report yet for this document.</div>'
    # view 3
    if has_ocr:
        t = OCR[sid].strip('\n')
        more = ''
        if len(t) > CAP:
            capped.append((name, len(t)))
            t = t[:CAP].rsplit('\n', 1)[0]
            more = '<p class="more">…continues in the file. <a class="open" href="%s" target="_blank" rel="noopener">Read the full OCR text ↗</a> (%s characters in all)</p>' % (durl(sid), format(len(OCR[sid]), ','))
        v3 = '<pre class="ocr">%s</pre>%s' % (protect(t), more)
    else:
        v3 = '<div class="gap">No OCR text yet for this document.</div>'
    blocks.append('<section class="doc" id="d%d">%s<div class="v v1"><p class="vl">1 · ORIGINAL PAGES</p>%s</div><div class="v v2"><p class="vl">2 · REPORT</p>%s</div><div class="v v3"><p class="vl">3 · TRANSCRIPTION</p>%s</div>'
                  '<p class="stamp">TUS-26-1033 · VIEW-ALL · v1 · doc %02d of %d · 2026-10-14 · CURRENT</p></section>' % (k, head, v1, v2, v3, k, n))

all3 = sum(1 for r in D if r[3] and r[8] and r[4] in OCR)
money_js = json.dumps(MONEY)

tpl = open('/home/user/JV-repository/tools/viewall/viewall_template.html').read()
out = (tpl.replace('{{BLOCKS}}', '\n'.join(blocks))
          .replace('{{N}}', str(n)).replace('{{NIMG}}', str(n_img)).replace('{{NOCR}}', str(n_ocr))
          .replace('{{NREP}}', str(n_rep)).replace('{{NPRETTY}}', str(n_pretty)).replace('{{NALL3}}', str(all3))
          .replace('{{MONEY}}', money_js))
open(OUT, 'w').write(out)
print('docs', n, 'img', n_img, 'ocr', n_ocr, 'report', n_rep, 'pretty-on-file', n_pretty, 'all3', all3)
print('money amounts locked', len(MONEY))
print('capped', capped)
import os; print('bytes', os.path.getsize(OUT))
