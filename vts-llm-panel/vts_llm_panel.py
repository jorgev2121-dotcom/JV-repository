#!/usr/bin/env python3
"""
VTS MULTI-LLM CONTROL PANEL  --  TRK-2026-9200
One dispatcher that sends a prompt to whichever LLM is cheapest-and-alive,
falling back down a priority list if one is missing a key or errors out.

DESIGN DECISION (see RECURRING-ISSUES RI-038): NO router (LiteLLM removed).
Direct API calls with real try/fallback. The old router gave FALSE-GREEN health
(said "up" when it had no key). This does a REAL ping per provider instead.

Keys are read from environment variables so no secret is ever written to a file:
    GEMINI_API_KEY   (FREE - make at aistudio.google.com/app/apikey)  <- priority 1
    XAI_API_KEY      (Grok - console.x.ai; current key is DEAD)
    OPENAI_API_KEY   (paid)
    ANTHROPIC_API_KEY(Claude - weekly-limited)                        <- last resort

Usage:
    python vts_llm_panel.py --health            # real ping of every provider
    python vts_llm_panel.py "your question"     # ask, auto-fallback
    python vts_llm_panel.py --prefer grok "hi"  # force an order
"""
import os, sys, json, argparse, urllib.request, urllib.error

# ---- provider definitions -------------------------------------------------
# Each provider knows how to build its own request and read its own reply.
def _post(url, headers, body, timeout=45):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode())

def call_gemini(key, prompt):
    url = ("https://generativelanguage.googleapis.com/v1beta/models/"
           "gemini-1.5-flash:generateContent?key=" + key)
    out = _post(url, {"Content-Type": "application/json"},
                {"contents": [{"parts": [{"text": prompt}]}]})
    return out["candidates"][0]["content"]["parts"][0]["text"]

def call_openai_style(url, key, model, prompt):
    out = _post(url, {"Content-Type": "application/json",
                      "Authorization": "Bearer " + key},
                {"model": model, "messages": [{"role": "user", "content": prompt}]})
    return out["choices"][0]["message"]["content"]

def call_grok(key, prompt):
    return call_openai_style("https://api.x.ai/v1/chat/completions", key, "grok-2-latest", prompt)

def call_openai(key, prompt):
    return call_openai_style("https://api.openai.com/v1/chat/completions", key, "gpt-4o-mini", prompt)

def call_anthropic(key, prompt):
    out = _post("https://api.anthropic.com/v1/messages",
                {"Content-Type": "application/json", "x-api-key": key,
                 "anthropic-version": "2023-06-01"},
                {"model": "claude-3-5-haiku-latest", "max_tokens": 1024,
                 "messages": [{"role": "user", "content": prompt}]})
    return out["content"][0]["text"]

# priority order: free first, paid/limited last
PROVIDERS = [
    {"name": "gemini",    "env": "GEMINI_API_KEY",    "call": call_gemini},
    {"name": "grok",      "env": "XAI_API_KEY",       "call": call_grok},
    {"name": "openai",    "env": "OPENAI_API_KEY",    "call": call_openai},
    {"name": "anthropic", "env": "ANTHROPIC_API_KEY", "call": call_anthropic},
]

def _ordered(prefer=None):
    if not prefer:
        return PROVIDERS
    first = [p for p in PROVIDERS if p["name"] == prefer]
    rest  = [p for p in PROVIDERS if p["name"] != prefer]
    return first + rest

# ---- public functions -----------------------------------------------------
def ask(prompt, prefer=None):
    """Try providers in order; return (provider_name, answer). Raise if all fail."""
    errors = []
    for p in _ordered(prefer):
        key = os.environ.get(p["env"])
        if not key:
            errors.append(f"{p['name']}: no key ({p['env']} not set)")
            continue
        try:
            return p["name"], p["call"](key, prompt)
        except urllib.error.HTTPError as e:
            errors.append(f"{p['name']}: HTTP {e.code} {e.reason}")
        except Exception as e:
            errors.append(f"{p['name']}: {type(e).__name__} {e}")
    raise RuntimeError("ALL providers failed:\n  " + "\n  ".join(errors))

def health():
    """REAL ping of every provider. Returns list of (name, status, detail)."""
    rows = []
    for p in PROVIDERS:
        key = os.environ.get(p["env"])
        if not key:
            rows.append((p["name"], "NO-KEY", f"{p['env']} not set"))
            continue
        try:
            p["call"](key, "reply with the single word OK")
            rows.append((p["name"], "LIVE", "answered"))
        except urllib.error.HTTPError as e:
            rows.append((p["name"], "DEAD", f"HTTP {e.code} {e.reason}"))
        except Exception as e:
            rows.append((p["name"], "DEAD", f"{type(e).__name__} {e}"))
    return rows

# ---- CLI ------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="VTS Multi-LLM Control Panel (TRK-2026-9200)")
    ap.add_argument("prompt", nargs="*", help="the question to ask")
    ap.add_argument("--health", action="store_true", help="ping every provider and exit")
    ap.add_argument("--prefer", help="force this provider first (gemini|grok|openai|anthropic)")
    a = ap.parse_args()

    if a.health:
        print("VTS PANEL HEALTH  (TRK-2026-9200)")
        for name, status, detail in health():
            print(f"  {name:10} {status:7} {detail}")
        return

    if not a.prompt:
        ap.error("give a prompt, or use --health")
    provider, answer = ask(" ".join(a.prompt), prefer=a.prefer)
    print(f"[answered by: {provider}]\n{answer}")

if __name__ == "__main__":
    main()
