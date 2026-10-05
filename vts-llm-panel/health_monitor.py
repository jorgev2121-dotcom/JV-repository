#!/usr/bin/env python3
"""
VTS HEALTH MONITOR — TRK-2026-9953
Writes live LLM status to panel-data.json on a schedule.
The control panel HTML reads this file. The two never mix.

Run once:   python health_monitor.py
Run loop:   python health_monitor.py --watch 300   (every 5 minutes)
"""
import json, os, sys, time, datetime
from vts_llm_panel import health as llm_health

OUTPUT = os.path.join(os.path.dirname(__file__), "..", "control-panel", "panel-data.json")

# Quota thresholds — at or below WARNING, route grunt work away from this model.
# These are estimates until Jorge confirms actual plan limits.
QUOTA_WARNING_PCT = 20   # percent remaining that triggers rerouting

def read_known_quotas():
    """
    Returns last-known quota data.
    These are updated manually by Jorge or via billing-page screenshots.
    Source: LLM-USAGE-INVENTORY.md (the human-readable version of this data).
    """
    return {
        "claude":    {"plan": "Max", "reset": "weekly", "pct_remaining": None, "note": "CHECK claude.ai/settings/usage"},
        "gemini":    {"plan": "Free",  "reset": "daily",  "pct_remaining": None, "note": "CHECK aistudio.google.com"},
        "grok":      {"plan": "unknown", "reset": "unknown", "pct_remaining": None, "note": "CHECK console.x.ai"},
        "openai":    {"plan": "unknown", "reset": "monthly", "pct_remaining": None, "note": "CHECK platform.openai.com/usage"},
    }

def build_panel_data():
    now = datetime.datetime.now(datetime.timezone.utc)
    stamp = now.strftime("%Y-%m-%d %H:%M UTC")

    # Live API health check
    live_rows = []
    try:
        for name, status, detail in llm_health():
            live_rows.append({"name": name, "status": status, "detail": detail})
    except Exception as e:
        live_rows = [{"name": "ERROR", "status": "DEAD", "detail": str(e)}]

    # Quota data (manually updated until billing APIs are wired)
    quotas = read_known_quotas()

    # Routing recommendation
    routing = []
    for row in live_rows:
        name = row["name"]
        status = row["status"]
        quota_info = quotas.get(name, {})
        pct = quota_info.get("pct_remaining")

        if status != "LIVE":
            rec = "SKIP"
            reason = status
        elif pct is not None and pct <= QUOTA_WARNING_PCT:
            rec = "ROUTE-AWAY"
            reason = f"{pct}% remaining (threshold {QUOTA_WARNING_PCT}%)"
        else:
            rec = "OK"
            reason = "live and within quota"

        routing.append({
            "name": name,
            "api_status": status,
            "api_detail": row["detail"],
            "plan": quota_info.get("plan", "unknown"),
            "pct_remaining": pct,
            "quota_note": quota_info.get("note", ""),
            "recommendation": rec,
            "recommendation_reason": reason,
        })

    # Recommended active model (first OK, live model in priority order)
    priority = ["gemini", "grok", "openai", "claude"]
    active_model = next(
        (r["name"] for r in sorted(routing, key=lambda x: priority.index(x["name"]) if x["name"] in priority else 99)
         if r["recommendation"] == "OK"),
        "NONE — all models blocked or unknown"
    )

    return {
        "generated_at": stamp,
        "generated_at_iso": now.isoformat(),
        "active_model": active_model,
        "models": routing,
        "quota_warning_threshold_pct": QUOTA_WARNING_PCT,
        "note": "Quota % fields are MANUAL — Jorge updates them from billing pages. API status is live.",
    }

def write_panel_data():
    data = build_panel_data()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, "w") as f:
        json.dump(data, f, indent=2)
    print(f"[{data['generated_at']}] Panel data written → {OUTPUT}")
    print(f"  Active model: {data['active_model']}")
    for m in data["models"]:
        print(f"  {m['name']:10} {m['api_status']:7} {m['recommendation']:12} {m['api_detail']}")
    return data

def main():
    import argparse
    ap = argparse.ArgumentParser(description="VTS Health Monitor (TRK-2026-9953)")
    ap.add_argument("--watch", type=int, metavar="SECONDS",
                    help="Run continuously, updating every N seconds")
    a = ap.parse_args()

    if a.watch:
        print(f"Watching — updating every {a.watch}s. Ctrl+C to stop.")
        while True:
            try:
                write_panel_data()
            except Exception as e:
                print(f"ERROR: {e}")
            time.sleep(a.watch)
    else:
        write_panel_data()

if __name__ == "__main__":
    main()
