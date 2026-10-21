#!/usr/bin/env python3
"""
Session Restore — Load backed-up context after reboot.

Usage: python scripts/session-restore.py
       Then follow prompts to pick which session to restore.

After running this, use the import-memory skill in your new Claude session
to reload the SESSION-MEMORY.md file.
"""

import os
import sys
from datetime import datetime
from pathlib import Path

def find_session_exports():
    """Find all session exports in mailbox/session-exports/"""
    export_dir = Path("mailbox/session-exports")
    if not export_dir.exists():
        print(f"⚠️  No session exports found. Create {export_dir} first.")
        return []

    exports = sorted(export_dir.glob("*.md"), reverse=True)
    return exports[:10]  # Return 10 most recent

def restore_git_state(branch_name):
    """Attempt to restore git branch."""
    try:
        os.system(f"git fetch origin {branch_name}")
        os.system(f"git checkout {branch_name}")
        print(f"✅ Restored branch: {branch_name}")
    except Exception as e:
        print(f"⚠️  Could not auto-restore branch. Manual: git checkout {branch_name}")

def show_memory_restore_instructions():
    """Show instructions for loading SESSION-MEMORY.md"""
    print("\n" + "="*70)
    print("NEXT STEP: Load memory into this session")
    print("="*70)
    print("""
In your new Claude session, use the import-memory skill:

  /import-memory

Then select the SESSION-MEMORY.md file from this repo.

This will restore:
  ✓ All CLAUDE.md rules
  ✓ Tracking number protocol (TRK)
  ✓ Current work context
  ✓ Open items status
  ✓ Window identities (emoji, model, branch)

Takes about 2 minutes to load into your new session.
""")

def main():
    print("="*70)
    print("SESSION RESTORE")
    print("="*70)
    print("\nThis script helps you pick up after a reboot.\n")

    # Step 1: Show available exports
    exports = find_session_exports()
    if exports:
        print("Found recent session exports:")
        for i, exp in enumerate(exports, 1):
            size = exp.stat().st_size
            mtime = datetime.fromtimestamp(exp.stat().st_mtime).strftime("%Y-%m-%d %H:%M")
            print(f"  {i}. {exp.name} ({size} bytes, {mtime})")
        print()
    else:
        print("⚠️  No previous exports found. This is your first restore.\n")

    # Step 2: Show memory file status
    memory_file = Path("SESSION-MEMORY.md")
    if memory_file.exists():
        print(f"✅ SESSION-MEMORY.md found ({memory_file.stat().st_size} bytes)")
        print("   This is your unified memory. It will survive the reboot.\n")
    else:
        print("⚠️  SESSION-MEMORY.md not found. Create it first.\n")

    # Step 3: Check git state
    print("Current git state:")
    os.system("git status --short")
    print()

    # Step 4: Instructions
    print("WHAT TO DO NOW:")
    print("  1. Do NOT close this terminal")
    print("  2. Open a NEW Claude Code session (cloud or desktop)")
    print("  3. In the new session, run: /import-memory")
    print("  4. Select SESSION-MEMORY.md from this repo")
    print("  5. Memory loaded — you're ready to continue\n")

    # Step 5: Show memory restore instructions
    show_memory_restore_instructions()

    print("\n" + "="*70)
    print("RECOVERY COMPLETE")
    print("="*70)
    print("\nYour context is ready. Paste the block below into your new session:\n")

    # Generate paste block
    print(f"""
PASTE-X-[NEW-SESSION]:

I just rebooted. I'm loading SESSION-MEMORY.md via import-memory skill now.

Recent work context:
  - Branch: {os.popen('git rev-parse --abbrev-ref HEAD 2>/dev/null').read().strip()}
  - Last commit: {os.popen('git log -1 --oneline 2>/dev/null').read().strip()}
  - Files changed: {len(os.popen('git status --short 2>/dev/null').read().strip().split(chr(10)))}

Please read CLAUDE.md again, then OPEN-ITEMS.md to see what's in progress.

What should I focus on first?
""")

if __name__ == "__main__":
    main()
