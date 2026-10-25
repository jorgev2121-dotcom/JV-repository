# OWNER-DIRECTIVE: RUN-NEXT-SLOT-AND-FINISH-01

Date: 2026-10-25 · Issued by: Jorge Valdes (owner) · Tracking: TRK-2026-10056 (admin band)
Applies to: every Claude window, RAMBO, Cowork, Joey and every Grok Bot, Codex, and any agent added later.

## Owner's words

*"When an order or task is placed, it should be scheduled for the next available space where the appropriate agents, lanes, and RAM is available, and not just a time in the future, unless requested and approved. When a run is requested, it should run all the way through and deemed not finished until it goes through the entire cycle, unless a blocker prevents it from going to the another section in the run. In that case, pop it up and make it flash so it can get owner's attention."*

## In Cloud's words

1. **Start at the first free slot, not at a picked time.** A new task goes to the front of its lane's queue and starts as soon as the right agent is free and the PC has the memory for it. A future start time is used only when Jorge asks for one and approves it.
2. **A run isn't finished until every step of it is finished.** "Started", "partly done" or "stage 1 of 3" is IN PROGRESS, never DONE. The agent keeps going to the next step by itself.
3. **The only thing that pauses a run is a real blocker:** a step that can't go on without something only Jorge can give. Then:
   - a **flashing red pop-up** goes up at once and stays until Jorge clicks it, saying in one line what's needed;
   - the rest of the run carries on with any steps that don't depend on the blocked one;
   - the run picks up again by itself the moment the blocker clears.

## How this fits the existing rules (Rule 3 objection, recorded)

**Objection:** "next free slot" and "run all the way through" can collide with three safety brakes: the night rule (RED steps such as filing never run unattended), the filing engine's size brake (200 items), and the hung-run rule (kill a run that stops growing). Taken literally, the order would remove those brakes.

**Resolution adopted:** those brakes **count as blockers.** They don't silently stop a run. They pause only the step they guard, raise the flashing pop-up, and let everything else finish. Two other rules:

- A run killed for hanging is **restarted from its last saved item** and re-tried once.
- A second hang becomes a blocker pop-up.

Nothing is dropped and nothing goes quiet.

## Where "free" is measured (desktop)

- **Lane free:** no other job is running for that agent. Exception: GREEN read-only jobs may run two at a time.
- **Memory free:** at least 25 percent of RAM free. **Speechify's share is never counted as available** (SPEECHIFY-PRIORITY-01).
- **Check interval:** the dispatcher looks every 2 minutes.

## The flashing pop-up

- A red Windows notification that stays until clicked, and the taskbar icon flashes.
- The title says "NEEDS YOU". One line says what's blocked and the one thing needed.
- It **never plays a sound or takes focus while Speechify is reading**; it waits for the end of the sentence.
- The same blocker also goes to the phone and to the book, page 38.

Agents: questions about this directive go in OPEN-ITEMS. Understood?
