# ORDER — save email attachments into job folders, and sweep Downloads + PaperPort

From: ☁️ Cloud · To: 🖥️ RAMBO (desktop) · 2026-10-13 · GREEN (copies into the job's own folder only; TRK/TUS certain from the address)

The cloud can read attachment text but cannot download the files. Please do the following.

## A. Save these attachments (exact match: 8621 Pasadena Blvd = TUS-26-1018)

Destination: `G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH\TUS-26-1018 _ FOLIO-TBD _ 8621 Pasadena Blvd Pembroke Pines\04_Permits-and-Applications\`

1. Outlook, from tomtechengineer@gmail.com, 2026-10-12 3:55 PM ET, "Signed and seale4d plans and Certified As-built":
   - Save `A1.0_FLOOR-A1.0.pdf` as `2026-10-12 _ TUS-26-1018 _ Plans _ A1.0 Floor Signed-Sealed TomTech _ v1.pdf`.
   - Save `A2.0_ELEVATIONS-A2.0.pdf` as `2026-10-12 _ TUS-26-1018 _ Plans _ A2.0 Elevations Signed-Sealed TomTech _ v1.pdf`.
   - Save `Certified As-Built Letter 8621 Pasadena Boulevard.pdf` as `2026-10-12 _ TUS-26-1018 _ Engineering _ Certified As-Built Letter TomTech _ v1.pdf`.
2. Gmail, from jdrafters@gmail.com, 2026-10-12 1:35 PM ET, "Fwd: 8621 Pasadena Blvd". It carries the same two sheets, "digitally signed".
   - Compare them by SHA-256 with item 1.
   - If they are identical, do not save a duplicate.
   - If they differ, save them with `_ Julio-copy` added to the name.
3. Create a `.SEARCH.txt` sidecar for each saved file, and log every action in `_VERSION-LOG.md`.

## B. Sweep Downloads and PaperPort (RI-020; the cloud cannot see them)

1. List every file modified since 2026-10-01 in:
   - `C:\Users\JV\Downloads\`
   - both PaperPort folders
   - `C:\Users\JV\Desktop\`
2. Match each file against `inbox-sweep/WATCHLIST.md` (the copy on Drive is in Shared Folders for all LLMs).
3. Report the matches in `EXECUTED_RAMBO1_SAVE-EMAIL-ATTACHMENTS_2026-10-13.md` in the VTES-Outbox.
4. **Do not move anything from the sweep.** Report only.

Report: a count of files saved, the paths, the SHA-256 of each, and the sweep matches.

## C. Added by the 2026-10-13 13:18Z watch run

- TUS-26-1033 Medley: retrieve the PAID microfilm images for process X2027004874 (7265 NW 74 ST) from http://bldgappl.miamidade.gov/microfilm/AppointmentMaintenance.aspx before ~2026-11-11. Save them into the Medley job folder under `03_Research\Microfilm\`. No payment is needed; it is already paid.
