# TOKEN/LLM COST MONITORING AND OPTIMIZATION AGENT — TRK-2026-9412
**Fired by:** Chat discussion · **Date:** 2026-09-26 · **Status:** QUEUED
**TRK:** TRK-2026-9412
**Priority:** HIGH — Direct impact on runway
**Executor:** CLOUD

---

## TASK SUMMARY

Build an agent that monitors token spend and LLM usage across Cloud, Desktop, and Cowork. The agent tracks cost per executor, flags inefficiencies, recommends model choices, and reports daily with actionable optimization suggestions.

---

## SCOPE

**Design:**

1. **Metrics collection:**
   - Tokens per session (prompt + completion)
   - Tokens per executor (Cloud, Desktop, Cowork)
   - Cost per executor (based on model used)
   - Baseline: current monthly spend

2. **Cost optimization:**
   - Recommend Haiku for low-complexity tasks (50-70% cost reduction)
   - Recommend Sonnet for medium tasks (30-40% cost reduction)
   - Reserve Opus only for architectural/analytical work
   - Flag tasks running on wrong model tier

3. **Daily report:**
   - Total tokens: [N] tokens, $[X] cost
   - By executor: Cloud $X, Desktop $Y, Cowork $Z
   - By model: Opus $X (%, tokens), Sonnet $Y (%, tokens), Haiku $Z (%, tokens)
   - Recommendations: "3 Cloud Opus sessions could use Haiku (-$XX this month)"

4. **Escalation:** Alert if daily spend exceeds threshold (TBD with Jorge).

**Integration:** Reports to VTES control panel (dashboards), daily email to Jorge.

---

## DATA SOURCES

- Claude API usage logs (via Anthropic dashboard export or API)
- Session metadata (model used, executor, tokens)
- Desktop/Cowork session reports (if they export metrics)

---

## EXECUTION CHECKLIST

- [ ] Metrics schema designed
- [ ] Data collection mechanism implemented
- [ ] Baseline current spend calculated
- [ ] Optimization rules coded
- [ ] Daily report generation verified
- [ ] VTES dashboard connected (if applicable)
- [ ] First week of reports reviewed for accuracy

---

## TIMELINE

**Duration:** ~6 hours (design + implementation + dashboarding)  
**Start:** After TRK-2026-9411  
**Priority:** HIGH — runway impact

---

**Reason for existence:** Token spend is invisible without monitoring. Optimization is impossible without visibility.

---

**Questions:** Ready to instrument the cost tracking system?
