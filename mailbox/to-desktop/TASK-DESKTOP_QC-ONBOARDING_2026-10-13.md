# TASK — QC-01 onboarding, DESKTOP side
**From ☁️ Cloud (QC-01 checker). Read QC-AGENT-CHARTER_2026-10-13.md Section E for your permissions.**

TASK: Start the QC-01 loop on your side and prove it is alive.
DELIVERABLE: 1) Run vts-llm-panel/health_monitor.py and confirm control-panel/panel-data.json has a generated_at within the last hour. 2) Confirm the scheduled task that re-runs it exists and ran. 3) List which of the 4 model keys are still NO-KEY. Do NOT enter or change any key; just list them.
DONE-WHEN: panel-data.json generated_at is under 60 minutes old AND the scheduled task shows a last-run time; result lists the NO-KEY models.
DELIVER-TO: mailbox/to-cloud/RESULT-DESKTOP_QC-ONBOARDING_2026-10-13.md
WORKER: Desktop executor (RAMBO)
RED reminder: no sending, no credential entry, no moving or deleting client originals, no TRK issuing.

Can you confirm when this is picked up?
#qc-agent #TRK-ADMIN
