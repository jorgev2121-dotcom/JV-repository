# TASK FILE — Cowork Worker
**FROM:** Executive (Cloud Code) · **TO:** Cowork · **DATE:** 2026-09-29
**TRK-2026-9953 · #shift-brief #llm-rotation #role-handoff**

---

## TASK (one sentence)

Build the LLM Shift Brief system: a single Markdown file each LLM writes before handing off and reads before starting, so any model can step into any role without losing context or reproducing work already done.

## The Disney Model (this is the design brief)

At Disney World, when one cast member's shift ends and the replacement sits down, the handoff takes 60 seconds. The incoming person is immediately effective. The guest never notices the swap.

LLMs currently do the opposite: each new model walks in blind, can't find files the previous model created, reproduces them from scratch, and eventually finds the originals after wasting 30–60 minutes. This is not a model quality problem. It is an absence of a shift brief.

## DELIVERABLE

File: `shift-brief/SHIFT-BRIEF-SPEC.md`
Content:
1. The spec for what a shift brief contains (6–10 fields, no more)
2. A template each LLM fills out before handing off
3. Instructions: where it is written, where it is read, how it is formatted
4. Rules for what IS in a shift brief (what was done, what is pending, where the files are, what the next model must NOT do)
5. Rules for what is NOT in a shift brief (never full file contents, never reproduce files already linked, never project history that belongs in OPEN-ITEMS)

The brief must be:
- Readable by any LLM in under 30 seconds (≤200 words)
- Written in the same location always: `shift-brief/CURRENT.md` (overwritten each time)
- Archived to `shift-brief/archive/BRIEF-[DATE]-[HANDOFF-FROM]-[HANDOFF-TO].md`
- Plain Markdown, no code required to read it

## DONE-WHEN

`shift-brief/SHIFT-BRIEF-SPEC.md` exists and contains all five content requirements above.
A sample `shift-brief/CURRENT.md` is also written, filled with today's real state.

## DELIVER-TO

`mailbox/to-cloud/` — write `SHIFT-BRIEF-DONE_[DATE].md` with PASS and the two file paths as evidence.

## WORKER

Cowork

## DO NOT

- Build a Python script. This is Markdown only.
- Call it complete without the sample CURRENT.md filled with real state.
- Make the brief longer than 200 words.

---

*TRK-2026-9953 · Executive → Cowork · 2026-09-29 · #shift-brief*

Does this task make sense, or is any field ambiguous?
