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

# gemini-1.5-* was retired by Google; 2.5-flash has a free tier. Override with GEMINI_MODEL.
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

def call_gemini(key, prompt):
    url = ("https://generativelanguage.googleapis.com/v1beta/models/"
           + GEMINI_MODEL + ":generateContent")
    out = _post(url, {"Content-Type": "application/json", "x-goog-api-key": key},
                {"contents": [{"parts": [{"text": prompt}]}]})
    return out["candidates"][0]["content"]["parts"][0]["text"]

def call_openai_style(url, key, model, prompt):
    out = _post(url, {"Content-Type": "application/json",
                      "Authorization": "Bearer " + key},
                {"model": model, "messages": [{"role": "user", "content": prompt}]})
    return out["choices"][0]["message"]["content"]

# Free-tier OpenAI-compatible providers. Model names drift; override with <NAME>_MODEL env vars.
def _free(url, env_model, default_model):
    def call(key, prompt):
        return call_openai_style(url, key, os.environ.get(env_model, default_model), prompt)
    return call

call_groq = _free("https://api.groq.com/openai/v1/chat/completions",
                  "GROQ_MODEL", "llama-3.3-70b-versatile")
call_cerebras = _free("https://api.cerebras.ai/v1/chat/completions",
                      "CEREBRAS_MODEL", "llama-3.3-70b")
call_mistral = _free("https://api.mistral.ai/v1/chat/completions",
                     "MISTRAL_MODEL", "mistral-small-latest")
# OpenRouter with $0 credit: only ":free" models answer, nothing can be charged.
call_openrouter_free = _free("https://openrouter.ai/api/v1/chat/completions",
                             "OPENROUTER_FREE_MODEL", "meta-llama/llama-3.3-70b-instruct:free")

call_github = _free("https://models.github.ai/inference/chat/completions",
                    "GITHUB_MODELS_MODEL", "openai/gpt-4.1-mini")
call_nvidia = _free("https://integrate.api.nvidia.com/v1/chat/completions",
                    "NVIDIA_MODEL", "meta/llama-3.3-70b-instruct")
call_sambanova = _free("https://api.sambanova.ai/v1/chat/completions",
                       "SAMBANOVA_MODEL", "Meta-Llama-3.3-70B-Instruct")
call_huggingface = _free("https://router.huggingface.co/v1/chat/completions",
                         "HF_MODEL", "meta-llama/Llama-3.3-70B-Instruct")
call_cohere = _free("https://api.cohere.ai/compatibility/v1/chat/completions",
                    "COHERE_MODEL", "command-a-03-2025")

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

# priority order: free first, paid/limited last.
# Paid providers are skipped unless the run has an approved cost estimate
# (owner directive 2026-09-29, CLAUDE.md Article 5, tools/llm_cost_gate.py).
PROVIDERS = [
    {"name": "gemini",    "env": "GEMINI_API_KEY",    "call": call_gemini,    "paid": False},
    {"name": "groq",      "env": "GROQ_API_KEY",      "call": call_groq,      "paid": False},
    {"name": "cerebras",  "env": "CEREBRAS_API_KEY",  "call": call_cerebras,  "paid": False},
    {"name": "mistral",   "env": "MISTRAL_API_KEY",   "call": call_mistral,   "paid": False},
    {"name": "openrouter-free", "env": "OPENROUTER_API_KEY", "call": call_openrouter_free, "paid": False},
    {"name": "github",    "env": "GITHUB_MODELS_TOKEN", "call": call_github,  "paid": False},
    {"name": "nvidia",    "env": "NVIDIA_API_KEY",    "call": call_nvidia,    "paid": False},
    {"name": "sambanova", "env": "SAMBANOVA_API_KEY", "call": call_sambanova, "paid": False},
    {"name": "huggingface", "env": "HF_TOKEN",        "call": call_huggingface, "paid": False},
    {"name": "cohere",    "env": "COHERE_API_KEY",    "call": call_cohere,    "paid": False},
    {"name": "grok",      "env": "XAI_API_KEY",       "call": call_grok,      "paid": True},
    {"name": "openai",    "env": "OPENAI_API_KEY",    "call": call_openai,    "paid": True},
    {"name": "anthropic", "env": "ANTHROPIC_API_KEY", "call": call_anthropic, "paid": True},
]

APPROVALS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "approvals")

def paid_approved(run_id):
    """True only if approvals/<run_id>.md exists and says STATUS: APPROVED."""
    if not run_id:
        return False
    path = os.path.join(APPROVALS, run_id + ".md")
    try:
        with open(path, encoding="utf-8") as f:
            return "STATUS: APPROVED" in f.read()
    except OSError:
        return False

def _ordered(prefer=None):
    if not prefer:
        return PROVIDERS
    first = [p for p in PROVIDERS if p["name"] == prefer]
    rest  = [p for p in PROVIDERS if p["name"] != prefer]
    return first + rest

# ---- public functions -----------------------------------------------------
def ask(prompt, prefer=None, approved_run=None):
    """Try providers in order; return (provider_name, answer). Raise if all fail."""
    errors = []
    allow_paid = paid_approved(approved_run)
    for p in _ordered(prefer):
        if p["paid"] and not allow_paid:
            errors.append(f"{p['name']}: skipped (paid, no approved cost estimate)")
            continue
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
        if p["paid"]:
            rows.append((p["name"], "KEY-SET", "paid: not pinged (needs approved cost estimate)"))
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
    ap.add_argument("--prefer", help="force this provider first (gemini|groq|cerebras|mistral|openrouter-free|grok|openai|anthropic)")
    ap.add_argument("--approved", metavar="RUN-ID",
                    help="approved cost-estimate id; without it paid providers are skipped")
    a = ap.parse_args()

    if a.health:
        print("VTS PANEL HEALTH  (TRK-2026-9200)")
        for name, status, detail in health():
            print(f"  {name:10} {status:7} {detail}")
        return

    if not a.prompt:
        ap.error("give a prompt, or use --health")
    provider, answer = ask(" ".join(a.prompt), prefer=a.prefer, approved_run=a.approved)
    print(f"[answered by: {provider}]\n{answer}")

if __name__ == "__main__":
    main()
