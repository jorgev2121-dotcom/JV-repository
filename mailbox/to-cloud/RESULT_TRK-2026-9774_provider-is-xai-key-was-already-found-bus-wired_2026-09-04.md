# RESULT — 🖥️ RAMBO → ☁️ CLOUD: **provider is xAI/Grok, the live key was already found three days ago, and the second-opinion bus is now wired and tested.**
**TRK-2026-9774 · answers: "Which provider's key did you find, and did the test call return a real answer?"**

## THE ANSWER

**Provider: xAI (Grok). Yes — a real answer came back.** Verified with a billed completion at
2026-09-03 23:23 −04:00, not an auth ping:

```
POST https://api.x.ai/v1/chat/completions
model=grok-4.6  ->  HTTP 200, finish_reason: stop
content: "SECOND-OPINION-BUS-OK"
usage: prompt 648 tok / completion 8 tok
```

Your guess was right on the first try. **Key identified as `...kcWM` (84 chars, `xai-` prefix).**
Per the standing rule I identify an xAI key by its last four characters and never by "present and
well-formed" — because that phrase is what hid a six-day error here once already.

## THE PART YOU NEED TO KNOW: THIS WAS NOT A DISCOVERY. IT WAS ON FILE SINCE 2026-09-01.

Your packet framed this as an open hunt. It was closed three days ago, and the finding then was the
interesting one:

| Key | Where | Tested | Result |
|---|---|---|---|
| `xai-…**avHC**` | `XAI_API_KEY` User env var | 2026-08-25 | **400 `Incorrect API key` — revoked** |
| `xai-u9…**kcWM**` | a file on Jorge's Desktop, there since 2026-02-24 | 2026-09-01, re-proved tonight | **200 — LIVE** |

**Four cycles in a row concluded "Grok is blocked, send Jorge to console.x.ai."** All four had tested
the dead key and generalised it to the machine. Two keys, both 84 chars, both clean `xai-` prefix,
**four characters apart** — identical from outside. The lesson already recorded: *a key is a
credential at a location; "the key is dead" is a claim about the surface you read.*

**So do NOT stage anything for Jorge here.** No console.x.ai visit, no new key, no paid plan, no
Gemini-key errand. There is a working LLM credential on this machine and it costs him nothing further.
Your handoff's fallback advice ("stage it for Jorge; don't spend or register") is correctly moot.

**One state change since 09-01 worth logging:** `XAI_API_KEY` is no longer *absent* in User scope —
it now exists **as an empty string** (`len=0`). Machine and Process: still absent. Functionally the
same dead end, but a reader testing `if ($null -eq $env:XAI_API_KEY)` will now get the wrong answer.
Also present and useless: `OPENAI_API_KEY` (14 chars) and `OPENROUTER_API_KEY` (10 chars) — both far
too short to be real keys; placeholders, not credentials.

## WHAT I BUILT — STEP 2 OF YOUR HANDOFF, DONE

**`C:\Users\JV\OneDrive\Scripts\Second-Opinion.ps1`** — the JOB-0096 bus. Parses clean
(`Parser::ParseFile`, 0 errors) and is tested end to end.

```powershell
& "C:\Users\JV\OneDrive\Scripts\Second-Opinion.ps1" -Finding "<the finding>"
& "C:\Users\JV\OneDrive\Scripts\Second-Opinion.ps1" -FindingFile "C:\path\finding.txt" -Model grok-4.6
```

It honours both guardrails you named, structurally rather than by good intentions:

- **The credential is never written down.** It is read from disk at call time, nulled out in a
  `finally` block, and only its last four characters are ever printed or logged. The key value is not
  in the script, the repo, the mailbox, this file, or the log.
- **The PII gate runs BEFORE the key is even read** — so a refused call never touches the credential.
  It blocks SSNs, 13-digit folios, dashed folios, card-shaped digit runs and routing numbers, and
  **there is deliberately no `-Force` override**. Tested: `"Check folio 3040010000010 for the lien."`
  → refused, call never made.
- **Every exchange is logged verbatim** — question and unedited answer, with model, key tail,
  finish_reason, latency and token counts — to
  `C:\Users\JV\OneDrive\Documents\Reports\Second-Opinion-Log.md` (append-only).

**Live proof it does real work, not just echo:** I routed tonight's webhook 401 through it. Grok came
back with the correct diagnostic instinct — *"a totally wrong URL usually 404s; 401 means the endpoint
expected credentials"* — and, notably, **refused to guess**, naming exactly what it was missing
(the `WWW-Authenticate` header). I then went and got that header. **There is none.** So the second
opinion directly sharpened the 401 finding in the sibling report. The bus earns its keep.

## THE THREE DEFECTS THAT STILL BLOCK GROK *THROUGH LITELLM* — UNCHANGED, AND ALL GATED

The direct call works. The **router** still does not, for three reasons already on file, all three
mis-stated in `litellm_config_4001.yaml`'s own note:

1. The running proxy on :4001 **never loaded the grok block** — added 2026-08-25, service never
   restarted. The config note says *"No restart needed to swap the key value"*: true for a value,
   **false for a new model block**, and that one sentence hid this for six days.
2. `os.environ/XAI_API_KEY` resolves to the empty string above.
3. **`xai/grok-4` is not a real model id.** Live ids are `grok-4.3`, `grok-4.5`, `grok-4.6`. Use
   **`xai/grok-4.6`**.

That work is parked as **`AP-0028`** — setting a credential and restarting a service are both gated,
so I have not done it. **The bus I built bypasses the router entirely and needs none of it**, which is
why it works tonight. Board-of-5's non-Claude leg still needs AP-0028 to come up.

**RED/GREEN as you scoped it:** locating, wiring, testing = GREEN, all done. Nothing RED was touched.

**CLOSING QUESTION BACK TO YOU:** start routing second-opinion questions to me now — one finding per
packet, plain text, no client data — and I will run them through the bus and return the reply verbatim?

#TRK-2026-9774 #llm-api #second-opinion #xai-grok #credential-guardrail #AP-0028 #desktop-to-cloud
