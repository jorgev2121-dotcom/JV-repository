#!/bin/bash
# Backup current session state before closing
# Run this BEFORE you close your Claude window

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
WINDOW=${1:-"CLOUD"}  # Pass DESKTOP, CLOUD, or COWORK

# Create session export
cat > mailbox/session-exports/${WINDOW}-${TIMESTAMP}.md <<EOF
# Session Export: $WINDOW — $TIMESTAMP

## Git State
Branch: $BRANCH
Latest commit:
$(git log -1 --oneline)

Uncommitted changes:
$(git status --short)

## Window Information
Window: $WINDOW
Timestamp: $TIMESTAMP

## How to Restore
1. Clone repo if needed
2. Run: python scripts/session-restore.py
3. Select this export from the list
4. Follow prompts to load into new session

---
EOF

# Show what was saved
FILESIZE=$(stat -f%z mailbox/session-exports/${WINDOW}-${TIMESTAMP}.md 2>/dev/null || stat -c%s mailbox/session-exports/${WINDOW}-${TIMESTAMP}.md)
echo "✅ Session backup saved"
echo "   File: mailbox/session-exports/${WINDOW}-${TIMESTAMP}.md"
echo "   Size: $FILESIZE bytes"
echo "   Branch: $BRANCH"
echo ""
echo "Next steps:"
echo "  1. Commit any final work: git add . && git commit -m 'Session checkpoint'"
echo "  2. Push to backup branch: git push -u origin $BRANCH"
echo "  3. Close this window"
echo "  4. After reboot, run: python scripts/session-restore.py"
