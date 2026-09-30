// programs-data.js · TRK-2026-9910-B · #programs #shortcuts · generated from /tmp programs-seed.json by the cloud survey 2026-09-30 (repo evidence only).
// HONEST LIMIT: built from what the repo's reports say. Nothing here was run or checked on the PC. RAMBO's AI-PROGRAMS-CLASSIFICATION csv replaces it (see Export-ProgramsData.ps1).
window.VTES_PROGRAMS = {
 "asOf": "2026-09-30",
 "source": "repo survey (TO-CLOUD mirrors, OPEN-ITEMS, registry, tools/)",
 "entries": [
  {
   "name": "CU-Inbox-Job-Watcher",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Watches VTES-Inbox, 00-CONTINUITY-BOARD and _FROM-IPHONE for jobs; every 5 min 6am-11pm.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:225; HEALTH_MIRROR_2026-09-03.md:36",
   "tags": [
    "scheduled-task",
    "inbox",
    "watcher",
    "vtes-inbox",
    "desktop",
    "trk-2026-9163"
   ]
  },
  {
   "name": "CU-Bridge-Guardian",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Bridge guard task; one of a three-task watchdog fleet re-enabled if found Disabled.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:37; TO-CLOUD_MIRROR_2026-09-08.md:644",
   "tags": [
    "scheduled-task",
    "bridge",
    "guardian",
    "watchdog",
    "desktop"
   ]
  },
  {
   "name": "CU-ClaudeRemote-Guard",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Guards the claude.exe --remote-control Jorge-PC session; checks process presence, not reachability.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:38 and section 3",
   "tags": [
    "scheduled-task",
    "claude-remote",
    "guard",
    "remote-control",
    "desktop"
   ]
  },
  {
   "name": "VTES-Poller-Guardian",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Keeps the VTES local poller alive; Ready, last result 0 on 2026-09-03 00:05:05.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:39",
   "tags": [
    "scheduled-task",
    "vtes",
    "poller",
    "guardian",
    "desktop"
   ]
  },
  {
   "name": "CLAUDE-HEARTBEAT",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Heartbeat task reported to run every 15 minutes; ran 2026-09-03 00:04:04.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:40; OVERNIGHT-QUEUE.md:111",
   "tags": [
    "scheduled-task",
    "heartbeat",
    "claude",
    "jobs-pilot",
    "desktop"
   ]
  },
  {
   "name": "CU-REGISTRAR-01",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "REGISTRAR-01 scheduled task built 2026-07-31; 100-item retro sweep and desktop stand-ups.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:41; REGISTER-BATCH-2-AUDIT_2026-08-18.md:115",
   "tags": [
    "scheduled-task",
    "registrar",
    "retro-sweep",
    "desktop",
    "accountability"
   ]
  },
  {
   "name": "CU-Orphan-Matcher",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Runs the orphan matcher every 30 minutes; ran result 0 on 2026-09-03 00:05:05.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:42; TO-CLOUD_MIRROR_2026-09-03.md:3525",
   "tags": [
    "scheduled-task",
    "orphan",
    "matcher",
    "oph",
    "filing"
   ]
  },
  {
   "name": "CU-Catalog-Mirror",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Catalog mirror task; last result 1 (general error) on 2026-09-02 07:20.",
   "state": "BUILT",
   "source": "HEALTH_MIRROR_2026-09-03.md:48",
   "tags": [
    "scheduled-task",
    "catalog",
    "mirror",
    "failed",
    "desktop"
   ]
  },
  {
   "name": "CU-FollowUp-Agent",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Runs every 3 hours and writes MORNING-BRIEF.html; last run was terminated (267014).",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:10807; HEALTH_MIRROR_2026-09-03.md:49",
   "tags": [
    "scheduled-task",
    "followup",
    "morning-brief",
    "agent",
    "desktop"
   ]
  },
  {
   "name": "CU-Shift29-BigTrees-Once",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "One-shot big-trees task; killed at console 2026-08-25, stale; later disabled 2026-09-05.",
   "state": "DISABLED",
   "source": "HEALTH_MIRROR_2026-09-03.md:50; TO-CLOUD_MIRROR_2026-09-08.md:1099",
   "tags": [
    "scheduled-task",
    "one-shot",
    "bigtrees",
    "disabled",
    "desktop"
   ]
  },
  {
   "name": "CU-Credential-Consolidation-90d",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Enabled 90-day credential consolidation job; has never run.",
   "state": "BUILT",
   "source": "HEALTH_MIRROR_2026-09-03.md:51; TO-CLOUD_MIRROR_2026-09-03.md:1150",
   "tags": [
    "scheduled-task",
    "credentials",
    "never-run",
    "1password",
    "desktop"
   ]
  },
  {
   "name": "CU-Desktop-Cleanup-Tuesday",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Enabled Tuesday desktop cleanup job; has never run.",
   "state": "BUILT",
   "source": "HEALTH_MIRROR_2026-09-03.md:52; TO-CLOUD_MIRROR_2026-09-03.md:1150",
   "tags": [
    "scheduled-task",
    "cleanup",
    "desktop",
    "never-run",
    "tuesday"
   ]
  },
  {
   "name": "CU-Approvals-Queue-Mirror",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "15-minute mirror of APPROVALS-QUEUE.json; ran 04:15 on 2026-09-03.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:11; RECURRING-ISSUES.md:2118",
   "tags": [
    "scheduled-task",
    "approvals",
    "mirror",
    "queue",
    "owner-actions"
   ]
  },
  {
   "name": "CU-Sort-Inbox-3h",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "3-hourly inbox sorter that auto-files out of Outlook Inbox; switched off 2026-09-05.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099; TO-CLOUD_MIRROR_2026-09-03.md:3484",
   "tags": [
    "scheduled-task",
    "outlook",
    "inbox",
    "sorter",
    "disabled"
   ]
  },
  {
   "name": "CU-TaskHealth-Watchdog",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Watchdog over other tasks; disabled 9/5, then re-enabled by Housekeeper and fired 06:20:20 result 0.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:642; TO-CLOUD_MIRROR_2026-09-03.md:12286",
   "tags": [
    "scheduled-task",
    "watchdog",
    "task-health",
    "housekeeper",
    "desktop"
   ]
  },
  {
   "name": "CU-Backlog-Burndown-AM",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Backlog burndown (AM); disabled in a 36-second batch on 2026-09-05.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099",
   "tags": [
    "scheduled-task",
    "backlog",
    "burndown",
    "disabled",
    "desktop"
   ]
  },
  {
   "name": "CU-Backlog-Burndown-PM",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Backlog burndown (PM); disabled in a 36-second batch on 2026-09-05.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099",
   "tags": [
    "scheduled-task",
    "backlog",
    "burndown",
    "disabled",
    "desktop"
   ]
  },
  {
   "name": "CU Photo Organizer Nightly",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Nightly photo organizer task; disabled 2026-09-05.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099",
   "tags": [
    "scheduled-task",
    "photo",
    "organizer",
    "nightly",
    "disabled"
   ]
  },
  {
   "name": "Claude-Reminder-DeepAnalytics-20260901",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Claude reminder task dated 2026-09-01; disabled 2026-09-05.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099",
   "tags": [
    "scheduled-task",
    "reminder",
    "claude",
    "analytics",
    "disabled"
   ]
  },
  {
   "name": "CU-Morning-Packet-0810",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Morning packet task set for 08:10; disabled 2026-09-05 so it will not fire.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1099,1105",
   "tags": [
    "scheduled-task",
    "morning-packet",
    "briefing",
    "disabled",
    "desktop"
   ]
  },
  {
   "name": "CU-One-Briefing",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Daily 07:00 briefing task; still Ready after the 9/5 disable batch.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1105",
   "tags": [
    "scheduled-task",
    "briefing",
    "morning",
    "daily",
    "desktop"
   ]
  },
  {
   "name": "CU-Bus-Dispatcher",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Bus dispatcher task; convicted of pop-up focus theft (2.9 s) in RI-001; hidden-wrapper fix proposed.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:502; RECURRING-ISSUES.md:90",
   "tags": [
    "scheduled-task",
    "bus",
    "dispatcher",
    "ri-001",
    "popup",
    "trk-2026-9331"
   ]
  },
  {
   "name": "CU-Records-Watch",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Runs Watch-RecordsDelivery.ps1; convicted of pop-up focus theft (4.3 s) in RI-001.",
   "state": "BUILT",
   "source": "RI-001-CONVICTION_DIR-0041_2026-08-18.md:13; OPEN-ITEMS.md:502",
   "tags": [
    "scheduled-task",
    "records",
    "watch",
    "ri-001",
    "popup",
    "trk-2026-9331"
   ]
  },
  {
   "name": "CU-Doc-Filing-Arm",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Document filing arm task; runs Doc-Filing-Arm.ps1 (filing script with the 01-JOBS encoding bug).",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12286; JOBS-CAPSULE-INDEX_2026-08-24.md:7",
   "tags": [
    "scheduled-task",
    "filing",
    "documents",
    "01-jobs",
    "desktop"
   ]
  },
  {
   "name": "CU-Connector-Watcher-10min",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "10-minute connector watcher; member of the hardcoded three-task watchdog fleet.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:3192; TO-CLOUD_MIRROR_2026-09-08.md:644",
   "tags": [
    "scheduled-task",
    "connector",
    "watcher",
    "watchdog",
    "desktop"
   ]
  },
  {
   "name": "CU-PaperPort-Watch",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "PaperPort watch task; named in the IgnoreNew/72-hour-limit list, purpose not stated.",
   "state": "UNKNOWN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12286",
   "tags": [
    "scheduled-task",
    "paperport",
    "watch",
    "scanner",
    "desktop"
   ]
  },
  {
   "name": "CU-Governor-Hourly",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Hourly governor task; named in the IgnoreNew/72-hour-limit list, purpose not stated.",
   "state": "UNKNOWN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12286",
   "tags": [
    "scheduled-task",
    "governor",
    "hourly",
    "desktop"
   ]
  },
  {
   "name": "CU-NightShift",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Night shift task; named in the IgnoreNew/72-hour-limit list, purpose not stated.",
   "state": "UNKNOWN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12286",
   "tags": [
    "scheduled-task",
    "nightshift",
    "night",
    "desktop"
   ]
  },
  {
   "name": "CU-OrangeTree-Refresh",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Periodic Orange Tree portal rebuild; execution limit PT0S so a hang would have no reaper.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12288",
   "tags": [
    "scheduled-task",
    "orange-tree",
    "portal",
    "refresh",
    "desktop"
   ]
  },
  {
   "name": "CU-Dictation-Tray",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Dictation tray task; enabled but dead per the 2026-09-05 morning report.",
   "state": "BUILT",
   "source": "MORNING-REPORT_2026-09-05.md:191; OPEN-ITEMS.md:749",
   "tags": [
    "scheduled-task",
    "dictation",
    "tray",
    "dead",
    "trk-2026-9955"
   ]
  },
  {
   "name": "CU-MicButton",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Runs Mic-Button-Overlay.ps1 (owner-confirmed mic button); enabled but reported dead 2026-09-05.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:268; MORNING-REPORT_2026-09-05.md:191",
   "tags": [
    "scheduled-task",
    "mic",
    "dictation",
    "button",
    "trk-2026-9955"
   ]
  },
  {
   "name": "CU-Chat-Brief-01",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Builds the chat brief; second unattended run 20:15:15 result 0.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12474",
   "tags": [
    "scheduled-task",
    "chat-brief",
    "brief",
    "unattended",
    "desktop"
   ]
  },
  {
   "name": "CU-Ollama-Serve-Guard",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Keeps Ollama serving; Ready, ran result 0 at 00:11:11; replaces broken Ollama-AutoStart.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:336",
   "tags": [
    "scheduled-task",
    "ollama",
    "guard",
    "local-llm",
    "desktop"
   ]
  },
  {
   "name": "CU-System-Audit-Weekly",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Weekly system audit; Ready, last run 2026-08-31 09:02:02.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:4549",
   "tags": [
    "scheduled-task",
    "audit",
    "weekly",
    "system",
    "desktop"
   ]
  },
  {
   "name": "CU-TypingShield-Guard",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Watcher over the typing shield; ran 11:52:52 result 0. The shield itself is a registry value.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:3633,3639",
   "tags": [
    "scheduled-task",
    "typing-shield",
    "guard",
    "dictation",
    "ri-001"
   ]
  },
  {
   "name": "CU-PopupShield-Enforcer",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Popup shield enforcer; showed Running (267009/267014 codes), not a failure.",
   "state": "UNKNOWN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:431",
   "tags": [
    "scheduled-task",
    "popup",
    "shield",
    "enforcer",
    "ri-001"
   ]
  },
  {
   "name": "CU-Finisher-01-Standup",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Finisher standup; Ready, 08:30:30 result 0, repeats every 10 minutes.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:13860",
   "tags": [
    "scheduled-task",
    "finisher",
    "standup",
    "matter",
    "desktop"
   ]
  },
  {
   "name": "CU-Matter-Board-4h",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Runs Matter-Stage-Engine.ps1 every 4 h; last run 13:00:00 result 0; writes BLOCKER_MATTER-AGING files.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:8196",
   "tags": [
    "scheduled-task",
    "matter-board",
    "matter-stage",
    "blocker",
    "desktop"
   ]
  },
  {
   "name": "CU-Uptime-Heartbeat",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "5-minute heartbeat independent of any AI session; no write since 2026-09-24 13:14 UTC (watch item).",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:747; RECURRING-ISSUES.md:815",
   "tags": [
    "scheduled-task",
    "uptime",
    "heartbeat",
    "stale",
    "trk-2026-9959"
   ]
  },
  {
   "name": "CU-Board-Janitor",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "'The Mechanic' v2, every 5 min: auto-closes hung, duplicate or runaway boards.",
   "state": "PROVEN-RUN",
   "source": "DESKTOP-11HR-REPORT_MIRROR_2026-08-25.md:29; TO-CLOUD_MIRROR_2026-09-03.md:3192",
   "tags": [
    "scheduled-task",
    "board-janitor",
    "mechanic",
    "boards",
    "desktop"
   ]
  },
  {
   "name": "CU-LLM-Watchdog",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "LLM watchdog; found Disabled on 2026-09-24 with no directive, re-enabled (RI recurrence).",
   "state": "BUILT",
   "source": "RECURRING-ISSUES.md:812",
   "tags": [
    "scheduled-task",
    "llm",
    "watchdog",
    "recurrence",
    "ri-038"
   ]
  },
  {
   "name": "CU-Overnight-TreeReport",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Nightly 02:30 TreeSize report; never completed since 2026-08-03 and wrote an empty table.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:630; TO-CLOUD_MIRROR_2026-09-03.md:431",
   "tags": [
    "scheduled-task",
    "treesize",
    "nightly",
    "disk-report",
    "broken"
   ]
  },
  {
   "name": "CU-BulkOCR",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Bulk OCR scheduled task; one of four OCR tasks found DISABLED.",
   "state": "DISABLED",
   "source": "OCR-STATUS.md:35",
   "tags": [
    "scheduled-task",
    "ocr",
    "bulk",
    "disabled",
    "ri-015"
   ]
  },
  {
   "name": "CU-OCR-Intake",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "OCR intake scheduled task; one of four OCR tasks found DISABLED.",
   "state": "DISABLED",
   "source": "OCR-STATUS.md:35",
   "tags": [
    "scheduled-task",
    "ocr",
    "intake",
    "disabled",
    "ri-015"
   ]
  },
  {
   "name": "CU-OCR-Watch",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "OCR watch scheduled task; one of four OCR tasks found DISABLED.",
   "state": "DISABLED",
   "source": "OCR-STATUS.md:35",
   "tags": [
    "scheduled-task",
    "ocr",
    "watch",
    "disabled",
    "ri-015"
   ]
  },
  {
   "name": "CU-Inspections-Auto-Filing-OCR",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Auto-filing OCR scheduled task; one of four OCR tasks found DISABLED.",
   "state": "DISABLED",
   "source": "OCR-STATUS.md:36",
   "tags": [
    "scheduled-task",
    "ocr",
    "auto-filing",
    "disabled",
    "ri-015"
   ]
  },
  {
   "name": "CU-ProofGate-Day7",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Proof-gate day-7 comparison task; flagged 'never run' then measured as having run.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:8558",
   "tags": [
    "scheduled-task",
    "proof-gate",
    "day7",
    "compare",
    "verification"
   ]
  },
  {
   "name": "CU-Housekeeper-Weekly",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Weekly housekeeper; ran 06:00:00 result 0 and re-enabled CU-TaskHealth-Watchdog.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:642",
   "tags": [
    "scheduled-task",
    "housekeeper",
    "weekly",
    "watchdog",
    "desktop"
   ]
  },
  {
   "name": "CU-PileDots-Overlay",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Pile-dots overlay; carries NOTE-KEEP-DISABLED file dated 2026-08-06, so it stays disabled.",
   "state": "DISABLED",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:644",
   "tags": [
    "scheduled-task",
    "overlay",
    "pile-dots",
    "disabled",
    "desktop"
   ]
  },
  {
   "name": "VTES-AgentBridge",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "The Grok Bot's scheduled task; FINISH - Remove Grok Bot Task.cmd targets it for deletion.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:3462",
   "tags": [
    "scheduled-task",
    "grok",
    "bot",
    "agent-bridge",
    "vtes"
   ]
  },
  {
   "name": "VTES-BackupBridge-Heartbeat",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Posted HEARTBEAT_BACKUP-BRIDGE.md on 2026-08-17 07:20 ET; watches both lanes on a 5-minute cycle.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:206",
   "tags": [
    "scheduled-task",
    "backup-bridge",
    "heartbeat",
    "vtes",
    "trk-2026-9191"
   ]
  },
  {
   "name": "CU-Tray-Launcher",
   "kind": "scheduled-task",
   "where": "Windows Task Scheduler on DESKTOP-OTB90LR",
   "what": "Tray launcher component required on HEARTBEAT-ROSTER.json; roster entry 'stamps only'.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:271; ONE-ROSTER-ONE-READER_2026-08-18.md:29",
   "tags": [
    "scheduled-task",
    "tray",
    "launcher",
    "heartbeat-roster",
    "trk-2026-9249"
   ]
  },
  {
   "name": "CU-Keep-Awake",
   "kind": "scheduled-task",
   "where": "unknown",
   "what": "Proposed daily task re-applying keep-awake power settings that Windows Update resets.",
   "state": "PLANNED",
   "source": "mailbox/to-desktop/WORK-QUEUE.md:474",
   "tags": [
    "scheduled-task",
    "keep-awake",
    "power",
    "planned",
    "desktop"
   ]
  },
  {
   "name": "VTES-LOCAL-POLLER",
   "kind": "agent",
   "where": "DESKTOP-OTB90LR",
   "what": "Desktop poller: runs every 15 min, auto-ACKs and executes anything dropped in VTES-Inbox.",
   "state": "PROVEN-RUN",
   "source": "WATCHDOG-FOUND.md:58,74 (06:01 auto-ACK); LLM-WINDOW-REGISTRY.md:34",
   "tags": [
    "agent",
    "poller",
    "vtes-inbox",
    "job-0079",
    "desktop"
   ]
  },
  {
   "name": "RECONCILER-01",
   "kind": "agent",
   "where": "DESKTOP-OTB90LR",
   "what": "Reconciler: every 30 min ledgers files in four VTES lanes and reissues stalled jobs.",
   "state": "PROVEN-RUN",
   "source": "WATCHDOG-FOUND.md:20,30",
   "tags": [
    "agent",
    "reconciler",
    "watchdog",
    "ledger",
    "trk-2026-9111"
   ]
  },
  {
   "name": "JOB-0079 headless executor loop",
   "kind": "agent",
   "where": "unknown",
   "what": "Loop that launches headless Claude Code on files landing in VTES-Inbox; pilot cycle 1 verified 2026-08-29.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:768",
   "tags": [
    "agent",
    "job-0079",
    "headless",
    "pilot",
    "vtes-inbox",
    "trk-2026-9117"
   ]
  },
  {
   "name": "FOREMAN",
   "kind": "agent",
   "where": "unknown",
   "what": "Phase 2 upgrade of CU-REGISTRAR-01; target 2026-08-29, assigned to Cowork.",
   "state": "PLANNED",
   "source": "DESKTOP-11HR-REPORT_MIRROR_2026-08-25.md:14",
   "tags": [
    "agent",
    "foreman",
    "registrar",
    "planned",
    "cowork"
   ]
  },
  {
   "name": "LLM-01 Claude Code Desktop (RAMBO)",
   "kind": "agent",
   "where": "Jorge's Windows PC (Claude desktop app, Code tab; green D tray icon)",
   "what": "The only hands on the PC; runs every 15 min and executes VTES-Inbox orders.",
   "state": "PROVEN-RUN",
   "source": "LLM-WINDOW-REGISTRY.md:30",
   "tags": [
    "agent",
    "llm-01",
    "rambo",
    "claude-code",
    "desktop",
    "paste-d"
   ]
  },
  {
   "name": "LLM-02 Claude Code Cloud (REPO KEEPER)",
   "kind": "agent",
   "where": "https://claude.ai/code (blue C tray icon)",
   "what": "Holds the git repo, QC on desktop results, Drive dispatch and reporting; cannot touch the PC.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:44",
   "tags": [
    "agent",
    "llm-02",
    "cloud",
    "claude-code",
    "repo-keeper",
    "paste-c"
   ]
  },
  {
   "name": "LLM-03 Claude Cowork (ANALYST)",
   "kind": "agent",
   "where": "Claude desktop app, Cowork tab (orange X tray icon)",
   "what": "Long documents and analysis; writes MSG-COWORK-TO-CODE orders into VTES-Inbox.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:57",
   "tags": [
    "agent",
    "llm-03",
    "cowork",
    "analyst",
    "cdm",
    "paste-x"
   ]
  },
  {
   "name": "LLM-04 Claude Chat (COCKPIT)",
   "kind": "agent",
   "where": "Claude desktop app Chat, or https://claude.ai",
   "what": "Jorge's decision seat; dictate and approve here; it does not execute.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:69",
   "tags": [
    "agent",
    "llm-04",
    "chat",
    "cockpit",
    "owner-seat"
   ]
  },
  {
   "name": "LLM-05 Claude iPhone (VOICE)",
   "kind": "agent",
   "where": "iPhone Claude app",
   "what": "Dictation on the go and voice approvals; same account as the cockpit.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:80",
   "tags": [
    "agent",
    "llm-05",
    "iphone",
    "voice",
    "dictation"
   ]
  },
  {
   "name": "LLM-06 Codex CLI (BACKUP EXECUTOR)",
   "kind": "agent",
   "where": "Windows Terminal, command: codex",
   "what": "Backup executor when Claude limit is hit; installed 2026-09-26, awaiting ChatGPT sign-in.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:89",
   "tags": [
    "agent",
    "llm-06",
    "codex",
    "backup-exec",
    "openai"
   ]
  },
  {
   "name": "LLM-07 Grok SuperGrok (SECOND OPINION)",
   "kind": "agent",
   "where": "https://grok.com",
   "what": "Second-opinion analysis and live-web answers; nickname Fabian.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:100",
   "tags": [
    "agent",
    "llm-07",
    "grok",
    "fabian",
    "second-opinion"
   ]
  },
  {
   "name": "LLM-08 Gemini (VOLUME DRAFTER)",
   "kind": "agent",
   "where": "https://gemini.google.com or Windows Terminal: gemini",
   "what": "Cheap volume drafting and summarizing; Gemini CLI can run headless under GEMINI.md.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:111",
   "tags": [
    "agent",
    "llm-08",
    "gemini",
    "volume",
    "google"
   ]
  },
  {
   "name": "LLM-09 Thin API router (STANDBY)",
   "kind": "agent",
   "where": "unknown",
   "what": "Routing bridge only (vts_llm_panel.py, LiteLLM or hosted); each API run priced and approved first.",
   "state": "PLANNED",
   "source": "LLM-WINDOW-REGISTRY.md:129",
   "tags": [
    "agent",
    "llm-09",
    "api-router",
    "standby",
    "routing"
   ]
  },
  {
   "name": "LLM-10 Microsoft Copilot (HELPER)",
   "kind": "agent",
   "where": "https://copilot.microsoft.com",
   "what": "Second opinion from the Microsoft side; Outlook and OneDrive questions; chat only.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:120",
   "tags": [
    "agent",
    "llm-10",
    "copilot",
    "microsoft",
    "outlook",
    "paste-x"
   ]
  },
  {
   "name": "VTES-Attention.ps1",
   "kind": "script",
   "where": "tools/attention/VTES-Attention.ps1",
   "what": "Resident popup banner at top of the active monitor for new approvals: YES/GO, NO or LATER.",
   "state": "BUILT",
   "source": "tools/attention/VTES-Attention.ps1:1-20; OPEN-ITEMS.md:781",
   "tags": [
    "script",
    "attention",
    "popup",
    "approvals",
    "adhoc-attention-popup",
    "ri-001"
   ]
  },
  {
   "name": "VTES-Inventory.ps1",
   "kind": "script",
   "where": "tools/inventory/VTES-Inventory.ps1",
   "what": "Read-only folder crawler that writes the data file the Tree View draws; self-test 15 of 15.",
   "state": "PROVEN-RUN",
   "source": "tools/inventory/VTES-Inventory.ps1:1-12; mailbox/to-desktop/WORK-QUEUE.md:534",
   "tags": [
    "script",
    "inventory",
    "treemap",
    "filing",
    "read-only",
    "adhoc-filing-inventory"
   ]
  },
  {
   "name": "CU-ExecutorTray.ps1",
   "kind": "script",
   "where": "tools/tray/CU-ExecutorTray.ps1",
   "what": "Puts D (green), C (blue), X (orange) icons in the Windows tray, one per Claude window.",
   "state": "BUILT",
   "source": "tools/tray/CU-ExecutorTray.ps1:1-12; mailbox/to-desktop/WORK-QUEUE.md:492",
   "tags": [
    "script",
    "tray",
    "executor",
    "icons",
    "trk-2026-9740",
    "ri-031"
   ]
  },
  {
   "name": "VTES-Open.ps1",
   "kind": "script",
   "where": "tools/vtes-panel/VTES-Open.ps1",
   "what": "Registers vtes://llm-NN addresses (HKCU, no UAC) that open the right LLM window.",
   "state": "BUILT",
   "source": "tools/vtes-panel/VTES-Open.ps1:1-12",
   "tags": [
    "script",
    "vtes-address",
    "llm-registry",
    "launcher",
    "trk-2026-9910-b"
   ]
  },
  {
   "name": "Write-VtesStatus.ps1",
   "kind": "script",
   "where": "tools/vtes-panel/Write-VtesStatus.ps1",
   "what": "Stamps 'I am alive' per window into vtes-status.js so the launcher can colour its tabs.",
   "state": "BUILT",
   "source": "tools/vtes-panel/Write-VtesStatus.ps1:1-10",
   "tags": [
    "script",
    "status",
    "heartbeat",
    "launcher",
    "vtes-control-panel",
    "trk-2026-9910-b"
   ]
  },
  {
   "name": "build_treemap.py",
   "kind": "script",
   "where": "tools/treemap/build_treemap.py",
   "what": "Builds VTES-TREEMAP.html from the template plus a scan or VTES-Inventory JSON.",
   "state": "PROVEN-RUN",
   "source": "tools/treemap/build_treemap.py:1-5",
   "tags": [
    "script",
    "treemap",
    "python",
    "build",
    "filing"
   ]
  },
  {
   "name": "vts_llm_panel.py",
   "kind": "script",
   "where": "vts-llm-panel/vts_llm_panel.py",
   "what": "Multi-LLM dispatcher: cheapest live provider first, real-ping health check, fallback list.",
   "state": "BUILT",
   "source": "vts-llm-panel/vts_llm_panel.py:2-20",
   "tags": [
    "script",
    "llm-panel",
    "router",
    "multi-llm",
    "trk-2026-9200",
    "ri-038"
   ]
  },
  {
   "name": "enhance_full.py",
   "kind": "script",
   "where": "jacket-pipeline/enhance_full.py",
   "what": "Tax-jacket page enhancement using PyMuPDF and tesseract (auto-rotate, crop, classify).",
   "state": "BUILT",
   "source": "jacket-pipeline/enhance_full.py:1-30",
   "tags": [
    "script",
    "jacket",
    "enhance",
    "ocr",
    "tax-jacket",
    "python"
   ]
  },
  {
   "name": "RII-Inventory-ReadOnly.ps1",
   "kind": "script",
   "where": "mailbox/to-desktop/RII-Inventory-ReadOnly.ps1",
   "what": "Read-only 1Password metadata inventory (titles, URLs, usernames only); never reads passwords.",
   "state": "BUILT",
   "source": "mailbox/to-desktop/RII-Inventory-ReadOnly.ps1:1-20",
   "tags": [
    "script",
    "rii",
    "1password",
    "read-only",
    "trk-2026-9348",
    "identity"
   ]
  },
  {
   "name": "vtes-addresses.json",
   "kind": "tool",
   "where": "tools/vtes-panel/vtes-addresses.json",
   "what": "Single file that says where each vtes://llm-NN address goes; edit it, never the script.",
   "state": "BUILT",
   "source": "tools/vtes-panel/vtes-addresses.json:1-4",
   "tags": [
    "tool",
    "config",
    "vtes-address",
    "launcher",
    "trk-2026-9910-b"
   ]
  },
  {
   "name": "Approvals-Queue.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Approvals-Queue.ps1",
   "what": "Rebuilds the approvals queue; 'refreshed 17:41:06 - 62 open, 21 urgent, mirrored to VTES-Outbox'.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:181,477",
   "tags": [
    "script",
    "approvals",
    "queue",
    "owner-actions",
    "outbox"
   ]
  },
  {
   "name": "Match-Orphans.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Scores orphan documents against jobs; AUTO-FILE only at Score >= 85; Matches.csv had 67 rows.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:5339,3023",
   "tags": [
    "script",
    "orphan",
    "matcher",
    "oph",
    "filing"
   ]
  },
  {
   "name": "Run-OrphanMatcher.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Runs each 30-minute pool scan and calls Apply-Matches.ps1 (line 73).",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:5339",
   "tags": [
    "script",
    "orphan",
    "matcher",
    "filing",
    "mover"
   ]
  },
  {
   "name": "Apply-Matches.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Mover that files matches with Verdict AUTO-FILE and Score >= 85; nothing qualified.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:5339",
   "tags": [
    "script",
    "orphan",
    "mover",
    "filing",
    "auto-file"
   ]
  },
  {
   "name": "Verify-Job-Artifact.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\VTS\\Verify-Job-Artifact.ps1",
   "what": "Deterministic verifier: PathExists, PathAbsent, FileContains checks; wrote EXECUTED-WITH-PROOF files.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:308",
   "tags": [
    "script",
    "verifier",
    "proof",
    "job-0079",
    "trk-2026-9202"
   ]
  },
  {
   "name": "Verify-Claims.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Stop hook that re-checks 44 claims; registered async so it cannot block a false DONE.",
   "state": "BUILT",
   "source": "HEALTH_MIRROR_2026-09-03.md:10-12; MORNING-REPORT_2026-09-03.md:151",
   "tags": [
    "script",
    "hook",
    "claims",
    "proof-of-done",
    "verification"
   ]
  },
  {
   "name": "Finisher-01-Sweep.ps1",
   "kind": "script",
   "where": "C:\\AI\\scripts\\MatterStage\\Finisher-01-Sweep.ps1",
   "what": "Matter finisher sweep behind CU-Finisher-01-Sweep; AP-0035 patch applied 2026-09-04.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:498,546",
   "tags": [
    "script",
    "finisher",
    "sweep",
    "matter",
    "ap-0035"
   ]
  },
  {
   "name": "Matter-Stage-Engine.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Stamps 'Last verified' matter cards (run MSTG-20260904-050002); writes BLOCKER_MATTER-AGING files.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:4381,8196",
   "tags": [
    "script",
    "matter",
    "stage",
    "capsule",
    "engine"
   ]
  },
  {
   "name": "Build-Job-Portal.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Builds job portals; counts file:/// paths as Drive links, so Alec's portal cannot be shared.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:411",
   "tags": [
    "script",
    "portal",
    "job-portal",
    "alec",
    "trk-2026-9281"
   ]
  },
  {
   "name": "Second-Opinion.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Second-Opinion.ps1",
   "what": "Sends a finding to Grok with a PII gate, no key written down, every exchange logged.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:6785-6790",
   "tags": [
    "script",
    "grok",
    "second-opinion",
    "pii-gate",
    "llm"
   ]
  },
  {
   "name": "CU-WhatAmILookingAt.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\CU-WhatAmILookingAt.ps1",
   "what": "Window-identity helper; CPU fix applied 0.90 to 0.015 cores (60x); relaunched by the Keeper.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:9770,9798",
   "tags": [
    "script",
    "window",
    "identity",
    "cpu-fix",
    "trk-2026-9995"
   ]
  },
  {
   "name": "CU-Claude-Windows-Tray.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\CU-Claude-Windows-Tray.ps1",
   "what": "Claude windows tray helper; CPU fix applied 0.90 to 0.008 cores (112x); relaunched by the Keeper.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:9770,9797",
   "tags": [
    "script",
    "tray",
    "claude",
    "cpu-fix",
    "trk-2026-9995"
   ]
  },
  {
   "name": "CU-Claude-Keeper.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "60-second loop that restarts each helper by name (pid 124048 alive when measured).",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:9790",
   "tags": [
    "script",
    "keeper",
    "helper",
    "restart",
    "loop"
   ]
  },
  {
   "name": "APPLY-CPU-FIX.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Applies the CPU-burn fix with a stable .bak-pre9995 backup and a rollback; parses clean.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:10035",
   "tags": [
    "script",
    "cpu-fix",
    "rollback",
    "trk-2026-9995",
    "desktop"
   ]
  },
  {
   "name": "Retrieve-Microfilm-Order.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\VTS\\Retrieve-Microfilm-Order.ps1",
   "what": "Retrieves paid county microfilm; returns 0 under PowerShell 5.1 but all 993 documents under pwsh 7.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:192,696",
   "tags": [
    "script",
    "microfilm",
    "county",
    "retrieval",
    "pwsh",
    "trk-2026-9460"
   ]
  },
  {
   "name": "Get-ClerkDocument_2026-09-05.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Get-ClerkDocument_2026-09-05.ps1",
   "what": "New clerk-document retrieval script shipped 2026-09-05; parses clean.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3763",
   "tags": [
    "script",
    "clerk",
    "documents",
    "county",
    "retrieval"
   ]
  },
  {
   "name": "Crash-Watch.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Crash-Watch.ps1",
   "what": "Crash logger writing VTES-Outbox\\_CRASH-LOG.md; scheduled task not created (admin denied).",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12758",
   "tags": [
    "script",
    "crash-watch",
    "uptime",
    "log",
    "trk-2026-9982"
   ]
  },
  {
   "name": "INSTALL Crash Watch.cmd",
   "kind": "shortcut",
   "where": "Desktop\\INSTALL Crash Watch.cmd",
   "what": "Desktop installer for Crash Watch; waits on one UAC approval batched with other elevation.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12758,12482",
   "tags": [
    "shortcut",
    "crash-watch",
    "installer",
    "uac",
    "trk-2026-9982"
   ]
  },
  {
   "name": "Start-Claude-Remote.ps1",
   "kind": "script",
   "where": "C:\\AI\\scripts\\ClaudeTray\\Start-Claude-Remote.ps1",
   "what": "Launcher for claude.exe --remote-control Jorge-PC; process PID 29796 alive with 3 sockets on :443.",
   "state": "PROVEN-RUN",
   "source": "HEALTH_MIRROR_2026-09-03.md:68",
   "tags": [
    "script",
    "claude-remote",
    "remote-control",
    "launcher",
    "desktop"
   ]
  },
  {
   "name": "Run-Heartbeat.ps1",
   "kind": "script",
   "where": "C:\\AI\\scripts\\Run-Heartbeat.ps1",
   "what": "Heartbeat runner; two independent heartbeat processes ran concurrently, fix not yet applied.",
   "state": "BUILT",
   "source": "OWNER-QUEUE_MIRROR_2026-09-11.md:2854",
   "tags": [
    "script",
    "heartbeat",
    "duplicate",
    "runner",
    "owner-actions"
   ]
  },
  {
   "name": "VTES-Repo-Heartbeat.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Repo heartbeat that ran on a 3-minute cadence; predicted the unpushable-commit problem in its own comment.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:5415,5478",
   "tags": [
    "script",
    "repo",
    "heartbeat",
    "git",
    "vtes"
   ]
  },
  {
   "name": "Follow-Up-Agent.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Follow-up agent script behind CU-FollowUp-Agent; edited with backup, no money or email sent.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:10703,10807",
   "tags": [
    "script",
    "follow-up",
    "agent",
    "morning-brief",
    "desktop"
   ]
  },
  {
   "name": "Approval-Classifier.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Approval-Classifier.ps1",
   "what": "Classifies approvals; wrote AUTO-APPROVER-DIGEST.md and modified APPROVALS-QUEUE.json.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12595",
   "tags": [
    "script",
    "approvals",
    "classifier",
    "auto-approver",
    "job-0103"
   ]
  },
  {
   "name": "Assert-ApprovalCardPaths.ps1",
   "kind": "script",
   "where": "C:\\Users\\JV\\OneDrive\\Scripts\\Assert-ApprovalCardPaths.ps1",
   "what": "Checks approval card paths; regenerated CARD-PATH-AUDIT.md at 07:42:15.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:582",
   "tags": [
    "script",
    "approvals",
    "card-paths",
    "audit",
    "verification"
   ]
  },
  {
   "name": "Build-VTES-Control-Panel.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Builds the VTES control panel page that the desktop shortcut opens.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:41,4108",
   "tags": [
    "script",
    "control-panel",
    "vtes",
    "build",
    "desktop"
   ]
  },
  {
   "name": "Sweep-BLC2026-1438.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Sweeps the machine for permit BLC2026-1438: target found 37 times, control 439 (valid run).",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:501",
   "tags": [
    "script",
    "sweep",
    "permit",
    "search",
    "control-test"
   ]
  },
  {
   "name": "File-BldgJackets-MailDriven_2026-08-25.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Files building jackets from mail; broken for every date except the one tested.",
   "state": "BUILT",
   "source": "TO-CLOUD-MIRROR_DESKTOP-WORK_2026-08-29.md:60",
   "tags": [
    "script",
    "jackets",
    "filing",
    "mail-driven",
    "bug"
   ]
  },
  {
   "name": "Assemble-Jacket_2026-08-25.py",
   "kind": "script",
   "where": "unknown",
   "what": "Reads the jacket decisions file and assembles jackets; consumer shipped and proven.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3811",
   "tags": [
    "script",
    "jacket",
    "assemble",
    "decisions",
    "python"
   ]
  },
  {
   "name": "Run-OCRSweep-9754.py",
   "kind": "script",
   "where": "Scripts\\Run-OCRSweep-9754.py",
   "what": "OCR sweep; patched, behaviour proven, .bak-20260905 kept for rollback.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:2206,2233",
   "tags": [
    "script",
    "ocr",
    "sweep",
    "python",
    "trk-2026-9754"
   ]
  },
  {
   "name": "scan_ocr_inventory.py",
   "kind": "script",
   "where": "unknown",
   "what": "Scanned the OCR inventory: finished 20:07:06 in 19.7 min, 10,817 rows.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:1213",
   "tags": [
    "script",
    "ocr",
    "inventory",
    "scan",
    "python"
   ]
  },
  {
   "name": "Mic-Button-Overlay.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Mic button overlay run by CU-MicButton; built and owner-confirmed.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:268",
   "tags": [
    "script",
    "mic",
    "dictation",
    "overlay",
    "button"
   ]
  },
  {
   "name": "Update-Wins-Fails.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "The only bridge-down alarm on the machine; 10-minute stale check (lines 115-124).",
   "state": "BUILT",
   "source": "ONE-ROSTER-ONE-READER_2026-08-18.md:42; OPEN-ITEMS.md:466",
   "tags": [
    "script",
    "bridge",
    "alarm",
    "stale-check",
    "roster"
   ]
  },
  {
   "name": "VTES-Reconciler.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "The one reader of HEARTBEAT-ROSTER.json (lines 113-119); reconciler logic.",
   "state": "BUILT",
   "source": "ONE-ROSTER-ONE-READER_2026-08-18.md:19; OPEN-ITEMS.md:465",
   "tags": [
    "script",
    "reconciler",
    "roster",
    "heartbeat",
    "trk-2026-9322"
   ]
  },
  {
   "name": "VTES-Poller-Guardian.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Liveness by process match; restarts then stamps. One report says it does not exist on disk.",
   "state": "UNKNOWN",
   "source": "ONE-ROSTER-ONE-READER_2026-08-18.md:27; OPEN-ITEMS.md:406",
   "tags": [
    "script",
    "poller",
    "guardian",
    "roster",
    "cannot-verify",
    "trk-2026-9277"
   ]
  },
  {
   "name": "CLAUDE - PICK MODEL.cmd",
   "kind": "shortcut",
   "where": "Desktop",
   "what": "Desktop icon that launches the model switcher; removal deferred until OCR is verified.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:104,105",
   "tags": [
    "shortcut",
    "model",
    "switcher",
    "desktop",
    "trk-2026-9042"
   ]
  },
  {
   "name": "Run-Hidden.vbs",
   "kind": "script",
   "where": "unknown",
   "what": "Wrapper for hidden launches; required instead of -WindowStyle Hidden, which steals focus.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:737",
   "tags": [
    "script",
    "hidden",
    "vbs",
    "wrapper",
    "ri-001"
   ]
  },
  {
   "name": "Open-Code-Executor.vbs",
   "kind": "script",
   "where": "unknown",
   "what": "Opens the local desktop Claude Code executor; target of the CODE desktop icon and tray D icon.",
   "state": "BUILT",
   "source": "tools/tray/CU-ExecutorTray.ps1:106; RESULT-D2C-9740_MIRROR_four-icons-app-already-installed.md:30",
   "tags": [
    "script",
    "vbs",
    "code",
    "executor",
    "desktop"
   ]
  },
  {
   "name": "recreate-jv-executor.ps1",
   "kind": "script",
   "where": "Drive mailbox (GitHub commit pending)",
   "what": "Fire-proof rebuild script for the JV executor; safe in the Drive mailbox.",
   "state": "BUILT",
   "source": "MORNING-REPORT_2026-08-27.md:41",
   "tags": [
    "script",
    "executor",
    "rebuild",
    "recovery",
    "mailbox"
   ]
  },
  {
   "name": "Build-Chat-Brief.ps1",
   "kind": "script",
   "where": "unknown",
   "what": "Weekly script that builds the chat brief; block 6 reads cached JSON, else CANNOT-MEASURE.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:12506",
   "tags": [
    "script",
    "chat-brief",
    "weekly",
    "brief",
    "desktop"
   ]
  },
  {
   "name": "OWNER-ACTIONS.hta",
   "kind": "shortcut",
   "where": "Desktop\\OWNER-ACTIONS.hta",
   "what": "Card board of owner actions; Card 4 stops the desktop agent doubling up.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:4856; MORNING-REPORT_2026-09-05.md:63",
   "tags": [
    "hta",
    "owner-actions",
    "approvals",
    "cards",
    "desktop"
   ]
  },
  {
   "name": "PAY THE 44 DOLLARS - City of Miami.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Button to pay the $44 City of Miami microfilm invoice (331 Tamiami Canal Rd); restored, hash-verified.",
   "state": "BUILT",
   "source": "URGENT-UPDATE_2026-09-04-2300UTC.md:47",
   "tags": [
    "hta",
    "payment",
    "city-of-miami",
    "microfilm",
    "331-tamiami",
    "ap-0002"
   ]
  },
  {
   "name": "Authorize-Overnight-Runs.hta",
   "kind": "shortcut",
   "where": "Desktop\\Authorize-Overnight-Runs.hta",
   "what": "Button that authorizes overnight runs; writes its own receipt, still zero readers.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:6247",
   "tags": [
    "hta",
    "overnight",
    "authorize",
    "receipt",
    "night-protocol"
   ]
  },
  {
   "name": "APPROVE - Install Standing Rules.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Green button that installs the standing operating rules; AP-0003 found already done.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:5687",
   "tags": [
    "hta",
    "approve",
    "standing-rules",
    "ap-0003",
    "claude-md"
   ]
  },
  {
   "name": "APPROVALS-NOW.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Approvals board HTA; did not carry AP-0026, 0027, 0034, 0035, 0047 or 0049.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:870",
   "tags": [
    "hta",
    "approvals",
    "board",
    "ap-queue",
    "desktop"
   ]
  },
  {
   "name": "OD91-Decision.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Decision window for OD-91 with STOP IT / LET IT buttons; found stale.",
   "state": "BUILT",
   "source": "OWNER-QUEUE_MIRROR_2026-09-03.md:428",
   "tags": [
    "hta",
    "decision",
    "od-91",
    "owner-queue",
    "stale"
   ]
  },
  {
   "name": "SEND IT - ask the client for the EIN.hta",
   "kind": "shortcut",
   "where": "C:\\Users\\JV\\OneDrive\\Desktop\\SEND IT - ask the client for the EIN.hta",
   "what": "User-clicked button HTA that sends the client an EIN request email.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3867",
   "tags": [
    "hta",
    "send",
    "ein",
    "client",
    "email"
   ]
  },
  {
   "name": "KAT SLACK - REVIEW AND SEND.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Review-and-send button for the Kat Slack message (card AP-0068).",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:614",
   "tags": [
    "hta",
    "kat",
    "slack",
    "review-send",
    "ap-0068"
   ]
  },
  {
   "name": "HOA - 2 CLICKS TO PAY.hta",
   "kind": "shortcut",
   "where": "Desktop\\HOA - 2 CLICKS TO PAY.hta",
   "what": "Two-click HOA payment button; last modified 2026-08-31 06:08.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:4735",
   "tags": [
    "hta",
    "hoa",
    "payment",
    "two-clicks",
    "desktop"
   ]
  },
  {
   "name": "HOA - PAY THE ASSOCIATION.hta",
   "kind": "shortcut",
   "where": "C:\\Users\\JV\\OneDrive\\Desktop\\HOA - PAY THE ASSOCIATION.hta",
   "what": "HOA association payment button, created 05:15.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:13469",
   "tags": [
    "hta",
    "hoa",
    "payment",
    "association",
    "desktop"
   ]
  },
  {
   "name": "SEND-JACKET-ORDERS_Alec.hta",
   "kind": "shortcut",
   "where": "Your Desktop",
   "what": "Window to send the five building jacket orders for Alec; free, 7 to 10 days.",
   "state": "BUILT",
   "source": "MORNING-REPORT_2026-08-17.md:269",
   "tags": [
    "hta",
    "jackets",
    "alec",
    "orders",
    "send"
   ]
  },
  {
   "name": "FIX OUTLOOK - 3 emails stuck in the Outbox.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Button to fix three emails stuck in the Outlook Outbox.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3868",
   "tags": [
    "hta",
    "outlook",
    "outbox",
    "fix",
    "email"
   ]
  },
  {
   "name": "EMAIL-PROPOSAL-TO-EINAR.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Alabama Jack's email-proposal button; addressed to Rick, filename historic.",
   "state": "BUILT",
   "source": "DESKTOP-11HR-REPORT_MIRROR_2026-08-25.md:50",
   "tags": [
    "hta",
    "alabama-jacks",
    "proposal",
    "email",
    "job-0086"
   ]
  },
  {
   "name": "ALABAMA-JACKS-REVIEW.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Alabama Jack's review board and deep-view HTA (counted TRK-2026-1645.001).",
   "state": "BUILT",
   "source": "DESKTOP-11HR-REPORT_MIRROR_2026-08-25.md:47-50",
   "tags": [
    "hta",
    "alabama-jacks",
    "review",
    "board",
    "job-0086"
   ]
  },
  {
   "name": "LIVE-SCRAPE_Alec.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Live county scrape window: 41 results on screen, feed in _LIVE/FEED.jsonl.",
   "state": "PROVEN-RUN",
   "source": "OPEN-ITEMS.md:188",
   "tags": [
    "hta",
    "scrape",
    "county",
    "alec",
    "trk-2026-9128"
   ]
  },
  {
   "name": "NEED-YOU-2-THINGS.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Two-item owner window: Clerk sign-up and microfilm YES-ALL/ASK-PER-ITEM.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:556",
   "tags": [
    "hta",
    "owner-actions",
    "clerk",
    "microfilm",
    "trk-2026-9397"
   ]
  },
  {
   "name": "Master-Index.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Existing master index HTA; to be compared with Job-Tree.hta and the Tree View.",
   "state": "UNKNOWN",
   "source": "mailbox/to-desktop/TASK-C2D_ADHOC-FILING-SYSTEM_2026-09-30.md:31",
   "tags": [
    "hta",
    "master-index",
    "filing",
    "treeview",
    "compare"
   ]
  },
  {
   "name": "Job-Tree.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Existing job tree HTA; to be compared with Master-Index.hta and the Tree View.",
   "state": "UNKNOWN",
   "source": "mailbox/to-desktop/TASK-C2D_ADHOC-FILING-SYSTEM_2026-09-30.md:31",
   "tags": [
    "hta",
    "job-tree",
    "filing",
    "treeview",
    "compare"
   ]
  },
  {
   "name": "JACKET-DECISIONS.hta",
   "kind": "shortcut",
   "where": "Desktop\\JACKET-DECISIONS.hta",
   "what": "Jacket decisions board, built 09-03 22:25, 508 pages.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3799",
   "tags": [
    "hta",
    "jackets",
    "decisions",
    "board",
    "desktop"
   ]
  },
  {
   "name": "BRIDGE-PICKER.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Bridge picker HTA; Microsoft Store button needs AppUserModelID launch.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:76",
   "tags": [
    "hta",
    "bridge",
    "picker",
    "ri-006",
    "trk-2026-9013"
   ]
  },
  {
   "name": "FIX-POPUPS-NOW.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Popup fix button; left POPUP-FIX-RESULT.txt (641 bytes) on the Desktop.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:6890",
   "tags": [
    "hta",
    "popup",
    "fix",
    "ri-001",
    "desktop"
   ]
  },
  {
   "name": "SPEECHIFY IS OFF - turn it back on.hta",
   "kind": "shortcut",
   "where": "Desktop",
   "what": "Button prompting Jorge to turn Speechify back on in his main browser profile.",
   "state": "BUILT",
   "source": "MORNING-REPORT_2026-09-05.md:163",
   "tags": [
    "hta",
    "speechify",
    "browser",
    "button",
    "desktop"
   ]
  },
  {
   "name": "APPROVE - TEDC Renumber.hta",
   "kind": "shortcut",
   "where": "C:\\Users\\JV\\Desktop\\APPROVE - TEDC Renumber.hta",
   "what": "Stages TEDC job renumbering (Garden Walk East/West, Sugar Hill) with preview and UNDO.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:4204",
   "tags": [
    "hta",
    "approve",
    "tedc",
    "renumber",
    "garden-walk",
    "sugar-hill"
   ]
  },
  {
   "name": "APPROVE - Set Model Default.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Approval button to set the model default; findPwsh() tries PowerShell 7 first.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:3738",
   "tags": [
    "hta",
    "approve",
    "model",
    "default",
    "pwsh"
   ]
  },
  {
   "name": "1-CLICK - Allow CU-Escalate.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "One-click approval to allow CU-Escalate.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-04.md:5212",
   "tags": [
    "hta",
    "cu-escalate",
    "approve",
    "one-click",
    "desktop"
   ]
  },
  {
   "name": "PROJECT-QUEUE-LIVE.hta",
   "kind": "shortcut",
   "where": "unknown",
   "what": "ONE BOARD HTA that absorbs Pending-Tasks, FOCUS-BOARD, OWNER-QUEUE, APPROVE-BOARD, Ask-Jorge.",
   "state": "PLANNED",
   "source": "DESKTOP-11HR-REPORT_MIRROR_2026-08-25.md:12",
   "tags": [
    "hta",
    "one-board",
    "project-queue",
    "planned",
    "cowork"
   ]
  },
  {
   "name": "VTES CONTROL PANEL.lnk",
   "kind": "shortcut",
   "where": "C:\\Users\\JV\\Desktop\\VTES CONTROL PANEL.lnk",
   "what": "Desktop shortcut to the VTES control panel; target verified to resolve.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:4108",
   "tags": [
    "shortcut",
    "control-panel",
    "vtes",
    "lnk",
    "desktop"
   ]
  },
  {
   "name": "CLICK ME - Stop the CPU burn.lnk",
   "kind": "shortcut",
   "where": "Visible desktop",
   "what": "Shortcut that applies the CPU-burn fix; verified at 400x, needs no UAC.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:9961,10035",
   "tags": [
    "shortcut",
    "cpu-fix",
    "click-me",
    "no-uac",
    "desktop"
   ]
  },
  {
   "name": "RUN OCR RECOVERY PASS.cmd",
   "kind": "shortcut",
   "where": "Desktop",
   "what": "Runs the OCR recovery pass over the remaining 1,026 unread files.",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:3572",
   "tags": [
    "shortcut",
    "ocr",
    "recovery",
    "cmd",
    "desktop"
   ]
  },
  {
   "name": "FINISH - Remove Grok Bot Task.cmd",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Deletes the VTES-AgentBridge scheduled task (the Grok Bot's task).",
   "state": "BUILT",
   "source": "TO-CLOUD_MIRROR_2026-09-03.md:3462",
   "tags": [
    "shortcut",
    "grok",
    "bot",
    "task-removal",
    "cmd"
   ]
  },
  {
   "name": "BUTTON-1.bat",
   "kind": "shortcut",
   "where": "G:\\My Drive\\_ONE-CLICK\\BUTTON-1.bat",
   "what": "Interim-executor install button: installs Node if missing and the free Gemini CLI.",
   "state": "PLANNED",
   "source": "PASTE-LOG.md:99",
   "tags": [
    "shortcut",
    "button",
    "gemini",
    "interim-executor",
    "trk-2026-9764"
   ]
  },
  {
   "name": "Desktop icons CHAT / COWORK / CODE / CLOUD",
   "kind": "shortcut",
   "where": "C:\\Users\\JV\\OneDrive\\Desktop",
   "what": "Four ASCII desktop icons: Claude app, same app for Cowork, local executor, and claude.ai/code.",
   "state": "BUILT",
   "source": "RESULT-D2C-9740_MIRROR_four-icons-app-already-installed.md:25-31",
   "tags": [
    "shortcut",
    "icons",
    "claude-app",
    "cowork",
    "trk-2026-9740"
   ]
  },
  {
   "name": "Claude BEIGE",
   "kind": "shortcut",
   "where": "unknown",
   "what": "Existing beige Claude launcher noted as already built.",
   "state": "BUILT",
   "source": "OPEN-ITEMS.md:268",
   "tags": [
    "shortcut",
    "claude",
    "beige",
    "launcher",
    "trk-2026-9246"
   ]
  },
  {
   "name": "Codex - sign in (Jorge)",
   "kind": "shortcut",
   "where": "Desktop",
   "what": "Desktop terminal shortcut for Jorge's ChatGPT sign-in to Codex CLI.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:95",
   "tags": [
    "shortcut",
    "codex",
    "sign-in",
    "llm-06",
    "openai"
   ]
  },
  {
   "name": "vtes://llm-NN addresses",
   "kind": "shortcut",
   "where": "Windows registry (HKCU) via VTES-Open.ps1 -Install",
   "what": "Web-style addresses vtes://llm-01 to llm-10 that open the right LLM window.",
   "state": "BUILT",
   "source": "LLM-WINDOW-REGISTRY.md:14-17",
   "tags": [
    "shortcut",
    "vtes-address",
    "llm-registry",
    "win-r",
    "trk-2026-9910-b"
   ]
  },
  {
   "name": "VTES-LLM-LAUNCHER.html",
   "kind": "page",
   "where": "tools/vtes-panel/VTES-LLM-LAUNCHER.html",
   "what": "Searchable launcher cards for every LLM window, status dots and a hand-off box.",
   "state": "BUILT",
   "source": "tools/vtes-panel/VTES-LLM-LAUNCHER.html:title; OPEN-ITEMS.md:793",
   "tags": [
    "page",
    "launcher",
    "llm-registry",
    "vtes-control-panel",
    "trk-2026-9910-b"
   ]
  },
  {
   "name": "VTES-TREEMAP.html",
   "kind": "page",
   "where": "tools/vtes-panel/VTES-TREEMAP.html",
   "what": "VTES Tree View: colourful treemap of folders drawn from the scan data.",
   "state": "BUILT",
   "source": "tools/vtes-panel/VTES-TREEMAP.html:title",
   "tags": [
    "page",
    "treemap",
    "tree-view",
    "filing",
    "vtes-control-panel"
   ]
  },
  {
   "name": "VTES-FLOWCHART-DRAFT_v1 (superseded)",
   "kind": "page",
   "where": "tools/vtes-panel/_Superseded/VTES-FLOWCHART-DRAFT_v1_SUPERSEDED-by-launcher-Map.html",
   "what": "Who-talks-to-whom flowchart draft, superseded by the launcher Map.",
   "state": "DISABLED",
   "source": "tools/vtes-panel/_Superseded/ (filename: SUPERSEDED-by-launcher-Map)",
   "tags": [
    "page",
    "flowchart",
    "superseded",
    "vtes-control-panel",
    "draft"
   ]
  },
  {
   "name": "API-METER_prototype.html",
   "kind": "page",
   "where": "API-METER_prototype.html",
   "what": "API Spend Meter prototype: API spend this month.",
   "state": "BUILT",
   "source": "API-METER_prototype.html:title",
   "tags": [
    "page",
    "api-meter",
    "spend",
    "prototype",
    "subscriptions"
   ]
  },
  {
   "name": "BEFORE-AFTER_diagram.html",
   "kind": "page",
   "where": "BEFORE-AFTER_diagram.html",
   "what": "Before-and-after diagram of the AI set-up: one fragile door, no finish line.",
   "state": "BUILT",
   "source": "BEFORE-AFTER_diagram.html:title",
   "tags": [
    "page",
    "diagram",
    "before-after",
    "architecture"
   ]
  },
  {
   "name": "DESK-BOARD_2026-08-25.html",
   "kind": "page",
   "where": "DESK-BOARD_2026-08-25.html",
   "what": "Jorge's Desk Board: every project stuck at almost done, with status and what is left.",
   "state": "BUILT",
   "source": "DESK-BOARD_2026-08-25.html:title",
   "tags": [
    "page",
    "desk-board",
    "projects",
    "status",
    "owner-queue"
   ]
  },
  {
   "name": "ONE-BOARD_2026-08-26.html",
   "kind": "page",
   "where": "ONE-BOARD_2026-08-26.html",
   "what": "Jorge's One Board: what needs you, then what you have; built by cloud 2026-08-26.",
   "state": "BUILT",
   "source": "ONE-BOARD_2026-08-26.html:title",
   "tags": [
    "page",
    "one-board",
    "needs-you",
    "owner-queue",
    "cloud"
   ]
  },
  {
   "name": "CAPSULE-INVENTORY_2026-08-26.html",
   "kind": "page",
   "where": "CAPSULE-INVENTORY_2026-08-26.html",
   "what": "Capsule inventory of Drive 01-JOBS: 41 capsules, 279 top-level documents.",
   "state": "BUILT",
   "source": "CAPSULE-INVENTORY_2026-08-26.md:2-11",
   "tags": [
    "page",
    "capsule",
    "inventory",
    "01-jobs",
    "count"
   ]
  },
  {
   "name": "_ORANGE-TREE-DD_TRK-2026-9344_v2.html",
   "kind": "page",
   "where": "_ORANGE-TREE-DD_TRK-2026-9344_v2.html",
   "what": "Orange Tree due-diligence page with three layers and a per-job file view.",
   "state": "BUILT",
   "source": "_ORANGE-TREE-DD_TRK-2026-9344_v2.html:title",
   "tags": [
    "page",
    "orange-tree",
    "due-diligence",
    "trk-2026-9344"
   ]
  },
  {
   "name": "CALL-CARD_20001-SW-110-CT_TRK-2026-1262.html",
   "kind": "page",
   "where": "contacts/CALL-CARD_20001-SW-110-CT_TRK-2026-1262.html",
   "what": "Call card for 20001 SW 110 CT, Unit 143 with owner and contractor contacts.",
   "state": "BUILT",
   "source": "contacts/CALL-CARD_20001-SW-110-CT_TRK-2026-1262.html:title",
   "tags": [
    "page",
    "call-card",
    "20001-sw-110-ct",
    "contacts",
    "trk-2026-1262"
   ]
  },
  {
   "name": "CONTACTS-TO-ADD_2026-08-24.html",
   "kind": "page",
   "where": "contacts/CONTACTS-TO-ADD_2026-08-24.html",
   "what": "Three contacts to add, with .vcf import files.",
   "state": "BUILT",
   "source": "contacts/CONTACTS-TO-ADD_2026-08-24.html:title",
   "tags": [
    "page",
    "contacts",
    "vcf",
    "import",
    "mdc"
   ]
  },
  {
   "name": "TEMPLATE_itemized-task-checklist.html",
   "kind": "page",
   "where": "templates/TEMPLATE_itemized-task-checklist.html",
   "what": "Reusable client/job itemized task checklist template.",
   "state": "BUILT",
   "source": "templates/TEMPLATE_itemized-task-checklist.html:title",
   "tags": [
    "page",
    "template",
    "checklist",
    "itemized-task",
    "reusable"
   ]
  },
  {
   "name": "Claude desktop app",
   "kind": "app",
   "where": "MSIX package Claude_pzs8sxrjxfjjc (v1.34493.1.0)",
   "what": "Installed and running; Chat and Cowork live inside it, mic granted by Windows.",
   "state": "PROVEN-RUN",
   "source": "RESULT-D2C-9740_MIRROR_four-icons-app-already-installed.md:6-8",
   "tags": [
    "app",
    "claude",
    "desktop-app",
    "cowork",
    "chat"
   ]
  },
  {
   "name": "Ollama",
   "kind": "app",
   "where": "localhost:11434",
   "what": "Local LLM server: UP with 6 models and a live completion round-trip proved.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:565",
   "tags": [
    "app",
    "ollama",
    "local-llm",
    "free",
    "mistral"
   ]
  },
  {
   "name": "LiteLLM proxy (port 4001)",
   "kind": "app",
   "where": "localhost:4001",
   "what": "LiteLLM proxy answered HTTP 200 'I'm alive'; Grok block never loaded.",
   "state": "PROVEN-RUN",
   "source": "TO-CLOUD_MIRROR_2026-09-08.md:565; TO-CLOUD_MIRROR_2026-09-04.md:6795",
   "tags": [
    "app",
    "litellm",
    "router",
    "port-4001",
    "grok"
   ]
  },
  {
   "name": "TreeSize",
   "kind": "app",
   "where": "unknown",
   "what": "GUI disk-space tool used for disk reports; nightly scripted use never completed.",
   "state": "UNKNOWN",
   "source": "OPEN-ITEMS.md:630",
   "tags": [
    "app",
    "treesize",
    "disk",
    "report",
    "ssot"
   ]
  },
  {
   "name": "Wispr Flow",
   "kind": "app",
   "where": "unknown",
   "what": "Candidate system-wide dictation tray app; evaluation not started.",
   "state": "PLANNED",
   "source": "OPEN-ITEMS.md:82",
   "tags": [
    "app",
    "wispr-flow",
    "dictation",
    "tray",
    "trk-2026-9019"
   ]
  },
  {
   "name": "Airtable CRM (Wally pipeline)",
   "kind": "app",
   "where": "unknown",
   "what": "Wally CRM with 159 contacts and 34 jobs; Priority Zero pipeline item.",
   "state": "UNKNOWN",
   "source": "OPEN-ITEMS.md:315",
   "tags": [
    "app",
    "airtable",
    "crm",
    "wally",
    "pipeline",
    "trk-2026-9122"
   ]
  },
  {
   "name": "Wally-Marketing-CRM_TRK-2026-1614_v1.xlsx",
   "kind": "tool",
   "where": "marketing/Wally-Marketing-CRM_TRK-2026-1614_v1.xlsx",
   "what": "Marketing CRM workbook for the Wally campaign.",
   "state": "BUILT",
   "source": "marketing/ folder listing",
   "tags": [
    "tool",
    "wally",
    "crm",
    "marketing",
    "workbook",
    "trk-2026-1614"
   ]
  },
  {
   "name": "VTES Panel (this control panel)",
   "kind": "page",
   "where": "tools/vtes-panel/VTES-PANEL.html (repo); G:\\My Drive\\MY-DESK\\VTES-PANEL\\ once RAMBO places it",
   "what": "Home of the modular control panel: windows, budget, cities, programs, reminders.",
   "state": "BUILT",
   "source": "this build 2026-09-30",
   "tags": [
    "panel",
    "control-panel",
    "vtes",
    "trk-2026-9910-b",
    "modules"
   ]
  },
  {
   "name": "Verify-VtesPanel.ps1",
   "kind": "script",
   "where": "tools/vtes-panel/Verify-VtesPanel.ps1",
   "what": "Checks every panel file against MANIFEST.sha256 so one wrong character is caught the same day.",
   "state": "BUILT",
   "source": "this build 2026-09-30",
   "tags": [
    "script",
    "integrity",
    "manifest",
    "trk-2026-9910-b",
    "sha256"
   ]
  }
 ]
};
