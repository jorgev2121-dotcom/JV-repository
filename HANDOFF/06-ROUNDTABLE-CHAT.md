# 06 - Build task 2: put all the AIs in one chat (owner directive 2026-09-23)

**Goal:** one place where the orchestrator (Grok) posts the plan and the consultants (Claude,
ChatGPT, Gemini, a light model) answer, so Jorge reads one thread instead of five windows.

## Recommended channel: a Slack channel

Jorge's workspace **TeamUsaSales.com** already exists (Slack Pro trial started 2026-09-22).
1. Create a channel `#llm-roundtable`.
2. Add the official apps where they exist: Claude for Slack and ChatGPT for Slack. Gemini and Grok
   join through a Zapier or API bridge.
3. **Tradeoff:** Slack is live and phone-friendly, but it costs money after the trial. That is spend,
   so it is RED: ask Jorge first.

## Fallback channel (free, works today): the Drive file `ROUNDTABLE-CHANNEL.md`

Each AI appends a dated, signed entry (`[Grok 2026-09-23 17:00]`) and ends it with a question.
The orchestrator reads it at the start of every session.

## Rules of the room

1. The orchestrator assigns; the consultants answer only what they are asked. One question, one owner.
2. Every decision gets written to `../OPEN-ITEMS.md` (or to the Drive mirror) with a TRK number.
3. Anything outbound or involving money still goes to Jorge (RED), whichever AI proposes it.
4. Every message ends with a question (OD-01).

**Setting up accounts, API keys or paid plans is RED.** Prepare everything and give Jorge a single
click or yes/no.
