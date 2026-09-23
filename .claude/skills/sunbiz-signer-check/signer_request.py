#!/usr/bin/env python3
"""Build the "who will sign?" email to the client from sunbiz.json.

Usage: python3 signer_request.py OUT_DIR/sunbiz.json job.json OUT_DIR
job.json needs: trk, address, unit (optional), client_email, client_first_name (optional).

Rules (Jorge, 2026-09-23):
  - Only ask when a choice is needed: 2 or more possible signers. With exactly 1, no email;
    that person becomes signer_name / signer_title in job.json.
  - The Sunbiz working paper is attached, so the client sees where the names came from.
  - The email is written to OUT_DIR/signer_request_email.json for the session to put in a
    Gmail DRAFT (Jorge presses Send). Auto-send only after Jorge switches it on in SKILL.md.
"""
import json, os, sys, glob, html

def main(sb_path, job_path, outdir):
    sb = json.load(open(sb_path)); job = json.load(open(job_path))
    if sb["status"] != "ACTIVE": sys.exit(f"STOP: {sb['name']} is {sb['status']}, not ACTIVE. No email; tell Jorge.")
    signers = sb["signers"]
    if len(signers) == 1:
        s = signers[0]; job.update(signer_name=s["name"], signer_title=s["title"]); json.dump(job, open(job_path, "w"), indent=2)
        print(f"ONE SIGNER: {s['name']} ({s['title']}). No email needed; job.json updated."); return
    if not signers: sys.exit("STOP: Sunbiz lists nobody. Ask Jorge how to proceed.")
    unit = f', {job["unit"]}' if job.get("unit") else ""
    prop = f'{job["address"]}{unit}'
    hi = job.get("client_first_name", "")
    wp = sorted(glob.glob(os.path.join(outdir, "*WorkingPaper*Sunbiz*.pdf")))
    subject = f"Quick question - who will sign for {sb['name']}? - {prop} - {job['trk']}"
    rows_t = "\n".join(f"[  ]  {s['name']} - {s['title']}" for s in signers) + "\n[  ]  Someone else: ______________________ (name and title)"
    rows_h = "".join(f"<tr><td style='font-size:20px;padding:4px 10px'>&#9744;</td><td style='padding:4px'><b>{html.escape(s['name'])}</b> - {html.escape(s['title'])}</td></tr>" for s in signers)
    rows_h += "<tr><td style='font-size:20px;padding:4px 10px'>&#9744;</td><td style='padding:4px'>Someone else: ______________________ (name and title)</td></tr>"
    intro = (f"We are preparing the permit documents for {prop}. The Florida Division of Corporations (Sunbiz) lists the "
             f"following people as authorized for {sb['name']} (Document No. {sb['document_number']}, status {sb['status']}, "
             f"checked {sb['fetched'][:10]}). Please reply and tell us which one will sign the documents, so we can type "
             f"the correct name on them. You can simply reply with the name, or mark the box.")
    text = (f"Good morning{(' ' + hi) if hi else ''},\n\n{intro}\n\n{rows_t}\n\nThe Sunbiz record we used is attached for your "
            f"reference.\n\nWhich person should we list as the signer?\n\nBest regards,\nJorge Valdes\nTeam USA Sales, Inc.\n"
            f"305-300-4500 | Jorge@TeamUsaSales.com\n{job['trk']}")
    body_h = (f"<p>Good morning{(' ' + html.escape(hi)) if hi else ''},</p><p>{html.escape(intro)}</p><table>{rows_h}</table>"
              f"<p>The Sunbiz record we used is attached for your reference.</p><p><b>Which person should we list as the signer?</b></p>"
              f"<p>Best regards,<br>Jorge Valdes<br>Team USA Sales, Inc.<br>305-300-4500 | Jorge@TeamUsaSales.com<br>{job['trk']}</p>")
    email = {"to": [job["client_email"]], "subject": subject, "body": text, "htmlBody": body_h, "attachments": wp,
             "send_mode": "DRAFT - Jorge presses Send"}
    out = os.path.join(outdir, "signer_request_email.json"); json.dump(email, open(out, "w"), indent=2)
    print(f"{len(signers)} possible signers -> email prepared: {out}")

if __name__ == "__main__":
    main(*sys.argv[1:4])
