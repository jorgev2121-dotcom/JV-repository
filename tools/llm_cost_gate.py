#!/usr/bin/env python3
"""Cost gate for any paid LLM run (owner directive 2026-09-29).

No paid API run starts without an approved cost estimate.

  python tools/llm_cost_gate.py estimate RUN-ID MODEL RUNS IN_TOKENS OUT_TOKENS
      -> prints the estimate and writes approvals/RUN-ID.md with STATUS: PENDING
  python tools/llm_cost_gate.py check RUN-ID
      -> exit 0 only if approvals/RUN-ID.md says STATUS: APPROVED

Prices are USD per million tokens, kept by hand in tools/llm_prices.json
(check openrouter.ai/models before each new estimate; prices change).
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
PRICES = ROOT / "llm_prices.json"
APPROVALS = ROOT.parent / "approvals"
FEE = 0.055  # OpenRouter card top-up fee, $0.80 minimum per purchase


def estimate(run_id, model, runs, tin, tout):
    prices = json.loads(PRICES.read_text())
    if model not in prices:
        sys.exit(f"Unknown model {model!r}. Add its price to {PRICES.name} first.")
    p = prices[model]
    per_run = (tin * p["in"] + tout * p["out"]) / 1_000_000
    usage = per_run * runs
    total = usage * (1 + FEE)
    APPROVALS.mkdir(exist_ok=True)
    path = APPROVALS / f"{run_id}.md"
    path.write_text(
        f"# Cost approval request {run_id}\n\n"
        f"STATUS: PENDING\n\n"
        f"- Model: {model}\n"
        f"- Runs: {runs}, about {tin} tokens in and {tout} tokens out each\n"
        f"- Estimated cost: ${total:.2f} (${usage:.2f} usage + {FEE:.1%} top-up fee)\n\n"
        f"Jorge: change PENDING to APPROVED, or say yes, to let it run.\n"
    )
    print(f"{run_id}: {model} x{runs} = ${total:.2f} estimated. Request written to {path}")


def check(run_id):
    path = APPROVALS / f"{run_id}.md"
    if not path.exists() or "STATUS: APPROVED" not in path.read_text():
        sys.exit(f"{run_id}: NOT approved. Do not run.")
    print(f"{run_id}: approved.")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 6 and a[0] == "estimate":
        estimate(a[1], a[2], int(a[3]), int(a[4]), int(a[5]))
    elif len(a) == 2 and a[0] == "check":
        check(a[1])
    else:
        sys.exit(__doc__)
