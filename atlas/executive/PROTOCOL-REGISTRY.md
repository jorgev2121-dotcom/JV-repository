# 🧾 PROTOCOL REGISTRY — every protocol, its trigger language, versions, and duplicates
**TRK-2026-9800 · living document · 2026-09-17..19 · ☁️ Cloud · owner asked: list protocols + the language that invokes them, note versions, group by type to streamline duplicates.**
**"Language" = the exact word/phrase/format that invokes or names the protocol. ⚠ = streamline candidate (same idea in 2+ homes).**

---

## TYPE 1 — Charter rules (CLAUDE.md, the master rulebook)
| Protocol | Trigger language | Versions | Home | Note |
|---|---|---|---|---|
| No upward delegation | (behavioral) | Rule 1 → **superseded by EXHAUST-FIRST-01** for the escalation format | §2 + §12 Art.4 | ⚠ two escalation formats (Rule 1 vs EXHAUST-FIRST + WORKAROUND-CERT) |
| Three honest states | "DONE / BLOCKED / IN PROGRESS" | v1 | §3 | — |
| Don't agree reflexively | (behavioral) | v1 | §4 | — |
| Recurrence rule | reference `RECURRING-ISSUES.md` | v1 | §5 | pairs with Type 6 |
| Batch fan-out | ">5 similar items" | v1 | §6 | — |
| **ROOT CAUSE** | the literal words **"ROOT CAUSE"** → 3-question protocol | v1 | §7 | strongest keyword |
| Write-for-TTS + **end every message with a question** | **OD-01** | v1 | §8 | ⚠ duplicated in OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01 |
| Session start/end | **"ID"** → restate banner; window emojis 🖥️/☁️/🤝 | v1 | §10 | ⚠ overlaps WINDOW-HYGIENE-01 + WINDOW-CONFIG |
| Nights are for long runs | (schedule) | Rule 8 | §11 | ⚠ overlaps NIGHT-PROTOCOL + OVERNIGHT-QUEUE |
| FREEZE AND FINISH | **"FREEZE"**, "three workstreams" | supersedes lower conflicts; **thawed by OD-THAW-01** | §12 | version: freeze (8-16) → thaw (8-30) |
| GREEN/RED autonomy | **"RED" / "GREEN"** | v1 | §13 | ⚠ **biggest duplicate** — see Type 5 |
| One executor, many brains | (behavioral) | Rule 10 | §14 | ⚠ dup ONE-EXECUTOR-MANY-BRAINS-01 |
| Migration Status | **Rule 1.2** | new 2026-09-17 | BUSINESS-BRAIN | ATLAS-phase |
| Discovery-not-optimization | **ED-001** | new 2026-09-17 | BUSINESS-BRAIN | ATLAS-phase |
| Execution Profiles | **ED-003** | new 2026-09-17 | BUSINESS-BRAIN | ATLAS-phase |
| Model-neutrality | **Principle 0** | new 2026-09-17 | BUSINESS-BRAIN | ATLAS-phase |

## TYPE 2 — Owner / Executive Directives (atlas/owner-directives/ + BUSINESS-BRAIN)
| Directive | Language | Version | Note |
|---|---|---|---|
| ALWAYS-END-WITH-QUESTION-01 | OD-01 | v1 | ⚠ = charter §8 |
| ONE-EXECUTOR-MANY-BRAINS-01 | Rule 10 | v1 | ⚠ = charter §14 |
| PROACTIVE-DESKTOP-01 | OD-PROACTIVE-DESKTOP-01 | v1 | in RAMBO rider too |
| THAW-01 | OD-THAW-01 | v1 | reverses part of §12 |
| WINDOW-HYGIENE-01 | (window identity) | v1 | ⚠ = §10 + WINDOW-CONFIG |
| HOA-AUTOPAY-01 | OD-HOA-AUTOPAY-01 | v1 | pairs with portal-registration skill |
| DIRECTIVE_MANAGER-01 | MANAGER-01 | v1 | intake/managing-partner |
| ED-001 / ED-003 | ED-NNN | new | this session |

## TYPE 3 — Skills (.claude/skills/ — auto-load by trigger)
| Skill | Trigger language | Version | Note |
|---|---|---|---|
| tax-jacket | "tax jacket", "building jacket", PA PDFs | ratified 8-29; enhancements locked **TRK-2026-9788** 9-16 | footer stamp v1→v2 (see Type 7) |
| permit-expert | municipality / permit questions | v1; + annexation & Cutler Bay module | one module per city |
| orphan-onboarding | loose doc, **"OPH"**, sweep a holding area | v1 | ⚠ reads ORPHAN-NUMBERING (Held) |
| portal-registration | vendor/HOA portal signup, autopay | ratified 8-30 | pairs OD-HOA-AUTOPAY-01 |
| **county-data-sources** | (referenced in OPEN-ITEMS 9088) | **⚠ NOT in .claude/skills — desktop-side or retired** | reconcile vs new MDC source menu |

## TYPE 4 — SOP / process protocols (atlas/sops/ + new)
| Protocol | Language | Version | Note |
|---|---|---|---|
| NIGHT-PROTOCOL | "night run", overnight queue | v1 | ⚠ = Rule 8 + OVERNIGHT-QUEUE |
| HANDOFF-PROTOCOL_TWO-SEAT-01 | "handoff", Cloud⇄Desktop | **-01** (implies future versions) | ⚠ also HANDOFF.md + INTEGRATION-MAP |
| OCR-PROTOCOL | "OCR", `.SEARCH.txt` | v1 | ⚠ = orphan-onboarding + RI-016 gate (Type 6) |
| ORPHAN-ONBOARDING-SWEEP | "sweep" | v1 | pairs orphan-onboarding skill |
| RECONCILER-OUTPUT-CHECK-SPEC | reconciler runs | v1 | — |
| DD-WRITEUP-TEMPLATE | DD write-up | v1 (Held) | read by 2 skills |
| **BLOCKER-ACCESS-PROTOCOL** | Chrome + 1Password + one click | **new 2026-09-19, UNVERIFIED** | folds in PERMIT-GATE-BEATEN |
| **OCR ingestion gate** | RI-016 fix | **build order 2026-09-19** | the durable OCR protocol |

## TYPE 5 — Autonomy / gating (the biggest duplicate cluster) ⚠⚠
**RED / GREEN** is defined or restated in: charter **§13 (Rule 9)** · **AUTONOMY.md** · **OWNER-GATES.md** · **NIGHT-PROTOCOL §RED/GREEN** · the RAMBO rider · and every work order.
**Streamline:** make charter §13 the ONE canonical definition; everywhere else points to it, never redefines.

## TYPE 6 — Tracking / identity protocols
| Protocol | Language | Version | Note |
|---|---|---|---|
| Tracking numbers | **TRK-2026-NNNN** (seed 1247, +3) | v1 | ⚠ homes: §9 + TRK-REGISTRY + drift notes |
| Orphan numbers | **OPH-2026-NNNN** | v1 | ORPHAN-NUMBERING (Held) |
| Admin band | **9xxx** reserved | v1 | §9 |
| Paste routing | **PASTE-D / -C / -X-NNN** | many superseded (see PASTE-LOG) | D/C/X = Desktop/Cloud/anywhere |
| Hashtags | **#category** | v1 | category, not identity |
| Page identity | **_ pNNN** | adopted 8-15; **.NNN forbidden** | §9.2 |

## TYPE 7 — Formatting / stamp protocols (versioned)
| Protocol | Language | Versions |
|---|---|---|
| Footer stamp | `TRK · vN · pNNN · date · …` | **v1 = "CURRENT/SUPERSEDED"** → **v2 (2026-09-16) = TIME + "supersedes vN-1"** |
| Filename grammar | `DATE _ TRK _ TYPE _ DESC _ vN.ext` | v1; ⚠ RI-012 = two conventions in use |
| Tax-jacket footer | same stamp | v1→v2 with the charter §9.2 change |

## TYPE 8 — Method changes (explicit version history worth keeping)
- **1Password migration:** per-site loop (8-04) → **BULK IMPORT (8-14)** — old method retired.
- **JOB-0079 freeze:** build-freeze (8-16) → **OD-THAW-01 (8-30)** lifted it.
- **Index name:** ATLAS-INDEX → **BUSINESS-BRAIN** (9-17).
- **Escalation:** Rule 1 format → **EXHAUST-FIRST-01 + WORKAROUND-CERT** (§12).

---

## TOP STREAMLINE RECOMMENDATIONS (ranked)
1. **RED/GREEN — collapse to one home (charter §13).** It's restated in ≥5 places; drift risk is high. Everything else links to it.
2. **End-with-question + window-identity — dedupe the directive files into the charter** (§8, §10 already say it; OD-01 + WINDOW-HYGIENE-01 + WINDOW-CONFIG repeat it).
3. **OCR — one protocol chain.** Merge OCR-PROTOCOL + the orphan-onboarding OCR steps + the RI-016 ingestion gate into a single "OCR + match" SOP.
4. **Night runs — one home.** Rule 8 + NIGHT-PROTOCOL + OVERNIGHT-QUEUE overlap; make NIGHT-PROTOCOL canonical, charter points to it.
5. **county-data-sources skill vs MDC-DD-SOURCE-MENU — reconcile.** The referenced skill isn't in `.claude/skills`; decide: rebuild it from the new menu, or retire the reference.
6. **Handoff — one home.** HANDOFF-PROTOCOL_TWO-SEAT-01 vs HANDOFF.md vs INTEGRATION-MAP.

---

## ACCESSIBILITY TO OTHER LLMs — do Grok/ChatGPT/Gemini auto-know these? (owner Q, 2026-09-19)
**Short answer: Claude seats YES, other LLMs NO (not automatically).**
- **Claude Code (Cloud + RAMBO):** auto-load `CLAUDE.md` + skills every session. Automatic. ✅
- **Other LLMs (Grok, ChatGPT, Gemini, Copilot):** **cannot** read the repo/Drive on their own and get NO protocol unless it's pasted into their custom-instructions. Today that's the **#sitdown board** (`PASTE-INTO-EVERY-LLM.txt`, PASTE-X-004) — Jorge pastes it once per app. It's manual and doesn't auto-update. ❌

**How to make protocols auto-available to other LLMs (ranked, Principle 0 / model-neutral):**
1. **PROTOCOLS DIGEST (recommended, cheapest durable):** maintain ONE condensed, model-neutral digest of the load-bearing rules (a compressed CLAUDE.md). Any model can be pointed at it. Feed it BOTH ways below so there's one source, not four.
2. **API bus (real automation):** a Code seat calls the other model via API and injects the digest as the system prompt on every call — the protocols are then present automatically, no paste. Needs an API key (xAI key already exists per TRK-2026-9748); RED to wire, GREEN to run within caps.
3. **#sitdown paste (exists, manual):** keep for chat-window use; point it at the same digest so it never drifts.
4. **MCP / shared-context server (heaviest):** expose the Business Brain over MCP for agentic clients that support it. Most build; do last.
**Recommendation:** build the digest (1), inject via API bus (2) as models are wired, and repoint #sitdown (3) at it. One digest, three delivery paths, model-neutral.

## ⛔ OBSOLETE / CONFLICT — FLAGGED FOR QUARANTINE (owner to approve; deletion is RED)
**Real conflicts (a naive reader/LLM could act on the wrong one — fix first):**
1. **§12 FREEZE ("no new systems") vs OD-THAW-01 ("build freely").** THAW wins, but the freeze text still sits live in CLAUDE.md §12 Art.1 (marked lifted). **Quarantine:** collapse to one line — "thawed 2026-08-30, guardrails stand" — remove the contradictory body.
2. **Rule 1 escalation format vs EXHAUST-FIRST-01.** §12 says EXHAUST-FIRST *replaces* Rule 1's format; both still printed. **Quarantine:** Rule 1 points to EXHAUST-FIRST, drops its own format.

**Obsolete (a more-enhanced version exists — the old one is dead weight):**
3. **Footer stamp v1 ("CURRENT/SUPERSEDED")** → superseded by **v2 (time + "supersedes vN-1")**, 2026-09-16. Retire v1 wording on sight.
4. **1Password per-site loop** → superseded by **BULK IMPORT** (2026-09-14). Per-site method obsolete.
5. **OCR-PROTOCOL (standalone)** → subsumed by the **RI-016 OCR ingestion gate** (2026-09-19). Merge into one "OCR + match" SOP; the gate is canonical.
6. **`county-data-sources` skill (referenced in OPEN-ITEMS 9088, not in `.claude/skills`)** → replace with / fold into the new **MDC-DD-SOURCE-MENU**. Retire the dead reference.
7. **RED/GREEN restated in 5+ homes** → keep charter §13 canonical; the copies in AUTONOMY.md / OWNER-GATES / Night Protocol / rider become pointers (not redefinitions).
8. **HANDOFF.md vs HANDOFF-PROTOCOL_TWO-SEAT-01** → the `-01` is the enhanced one; HANDOFF.md is a quarantine candidate.

**Action rule:** these are FLAGGED, not deleted. Charter/skill edits and file deletion are RED — await one owner "approve quarantine 1–8: yes." Quarantine = move to `_SUPERSEDED/` or mark obsolete in place; never hard-delete governance without the owner's click.

*Footer: TRK-2026-9800 · v2 · p001 · 2026-09-19 · supersedes v1 · #protocol-registry #streamline #obsolete-flags #business-brain*
