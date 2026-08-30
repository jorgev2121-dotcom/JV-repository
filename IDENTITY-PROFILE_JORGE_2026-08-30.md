# IDENTITY PROFILE — Jorge Valdes (for auto-filling portal registrations)
**TRK-2026-9760 · 2026-08-30 · NON-SECRET fields only. Secrets live in 1Password, never here.**

**Purpose:** the repeatable values RAMBO drops into any vendor/HOA/management registration form so
Jorge never re-types them. Pairs with the `portal-registration` skill and the registration registry.

## Non-secret identity (safe to store here — this is the "populate the variables" source)
| Field | Value |
|---|---|
| First name | **Jorge** |
| Last name | **Valdes** |
| Full street address | **13633 SW 142 Terrace, Miami, FL 33186** |
| Street number (split forms) | **13633** |
| Street name (split forms) | **SW 142 Terrace** |
| City | **Miami** |
| State | **FL** |
| Zip | **33186** |
| Unit | *(none — single-family homestead)* |
| Login email (registrations) | **Jorge@TeamUsaSales.com** |
| Alt email | jorgev2121@gmail.com |
| Company | Team USA Sales, Inc. / CU Inspections of South Florida |
| Directory / opt-in boxes | **leave unchecked (privacy default)** |

## SECRETS — never in this file, never in any repo file, never in a chat
- **Phone number(s), passwords, bank account + routing numbers, and per-portal account numbers**
  live in **1Password**. RAMBO pulls them from there at fill time.
- Recommended 1Password items:
  - **Identity item "Jorge Valdes"** — name, address, phones, email → powers autofill where forms allow.
  - **Per-vendor login items** (one per portal), tagged `vendor`, each with the site URL, username, and
    a **1Password-generated strong password**.
  - **Bank item** — BofA checking + routing, entered only into portals, never exported.

## Why not one big credentials database file
A plaintext (or repo) database of passwords/bank numbers is the exact exposure the charter forbids.
1Password IS that database — encrypted, autofilling, already in use. This profile only holds the
non-secret identity so agents can fill the boring fields fast.

#TRK-2026-9760 #identity-profile #portal-registration #1password
