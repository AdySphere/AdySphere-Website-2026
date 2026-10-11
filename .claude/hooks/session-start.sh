#!/bin/bash
# Cloud sessions only: install playwright-cli and point Playwright (CLI + MCP)
# at the container's preinstalled Chromium.
set -euo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

command -v playwright-cli >/dev/null 2>&1 || npm install -g @playwright/cli@latest >/dev/null 2>&1 || true

if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo 'export PLAYWRIGHT_MCP_BROWSER=chromium'
    echo 'export PLAYWRIGHT_MCP_EXECUTABLE_PATH=/opt/pw-browsers/chromium'
  } >> "$CLAUDE_ENV_FILE"
fi
