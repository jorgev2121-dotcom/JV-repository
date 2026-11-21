# MSG-CLOUD-TO-CODE — INSTALL READ-ALOUD HOTKEYS (OWNER-DIRECTIVE READ-ALOUD-01) · any desktop lane · no client data
From: ☁️ Cloud · 2026-10-13. Owner asked for this directly.
1. Save the two files below to C:\VTES-LOCAL\ReadAloud\setup\ (Read-Aloud.ahk and Install-Read-Aloud.ps1). They are also in the repo branch claude/pensive-allen-tyjgl4 under tools/readaloud/.
2. Run: powershell -ExecutionPolicy Bypass -File C:\VTES-LOCAL\ReadAloud\setup\Install-Read-Aloud.ps1
3. Test: copy any text, press Ctrl+Alt+R → Edge opens "Read aloud - VTES" and starts speaking.
Proof: write EXECUTED_READ-ALOUD_2026-10-13.md to VTES-Outbox with the INSTALLED line the script prints and "Ctrl+Alt+R spoke: yes/no".
Undo: delete the Startup shortcut "VTES Read-Aloud" and C:\VTES-LOCAL\ReadAloud\.
Did Ctrl+Alt+R speak?


---
## File 1: Read-Aloud.ahk
```
; VTES Read-Aloud · OWNER-DIRECTIVE READ-ALOUD-01 (2026-10-13)
; Ctrl+Alt+R : read the text you just copied (click "Copy" under any Claude reply first).
;              Opens it in a clean big-text page in Microsoft Edge and starts Edge "Read aloud" automatically.
; Ctrl+Alt+S : same page, opened in Chrome, for the Speechify button (press Speechify's play).
; Nothing is sent anywhere. The text is saved only to %APPDATA%\VTES-ReadAloud\reply.html and overwritten each time.
#Requires AutoHotkey v2.0
#SingleInstance Force

^!r::ReadCopied("edge")
^!s::ReadCopied("chrome")

ReadCopied(browser) {
    txt := A_Clipboard
    if (StrLen(Trim(txt)) < 2) {
        MsgBox "Nothing is copied yet.`n`nClick the Copy button under a Claude reply, then press Ctrl+Alt+R.", "Read aloud", 64
        return
    }
    dir := A_AppData "\VTES-ReadAloud"
    DirCreate dir
    f := dir "\reply.html"
    html := "<!doctype html><html><head><meta charset='utf-8'><title>Read aloud - VTES</title>"
        . "<style>body{font:24px/1.7 'Segoe UI',sans-serif;max-width:900px;margin:40px auto;padding:0 24px;background:#fffdf7;color:#111}"
        . "pre{white-space:pre-wrap;font:inherit;margin:0}</style></head><body><pre>" EscapeHtml(txt) "</pre></body></html>"
    try FileDelete f
    FileAppend html, f, "UTF-8"
    if (browser = "chrome") {
        Run 'chrome.exe "' f '"'
        return
    }
    Run 'msedge.exe "' f '"'
    if WinWaitActive("Read aloud - VTES", , 15) {
        Sleep 1500
        Send "^+u"          ; Edge: Read aloud (Ctrl+Shift+U)
    } else {
        MsgBox "Edge did not open in time. Press Ctrl+Shift+U in the Edge window to start reading.", "Read aloud", 48
    }
}

EscapeHtml(s) {
    s := StrReplace(s, "&", "&amp;")
    s := StrReplace(s, "<", "&lt;")
    return StrReplace(s, ">", "&gt;")
}
```

## File 2: Install-Read-Aloud.ps1
```
# Install VTES Read-Aloud (OWNER-DIRECTIVE READ-ALOUD-01). Safe to run twice. Writes only new files.
# 1) Installs AutoHotkey v2 with winget if missing.  2) Copies Read-Aloud.ahk to C:\VTES-LOCAL\ReadAloud\.
# 3) Adds a Startup shortcut so the hotkeys work after every restart.  4) Starts it now.
$ErrorActionPreference = 'Stop'
$src  = Join-Path $PSScriptRoot 'Read-Aloud.ahk'
$dest = 'C:\VTES-LOCAL\ReadAloud'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item $src (Join-Path $dest 'Read-Aloud.ahk') -Force
$ahk = @("$env:ProgramFiles\AutoHotkey\v2\AutoHotkey64.exe","$env:LOCALAPPDATA\Programs\AutoHotkey\v2\AutoHotkey64.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $ahk) {
  winget install --id AutoHotkey.AutoHotkey -e --accept-source-agreements --accept-package-agreements
  $ahk = @("$env:ProgramFiles\AutoHotkey\v2\AutoHotkey64.exe","$env:LOCALAPPDATA\Programs\AutoHotkey\v2\AutoHotkey64.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $ahk) { throw 'AutoHotkey v2 not found after install.' }
$lnk = Join-Path ([Environment]::GetFolderPath('Startup')) 'VTES Read-Aloud.lnk'
$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut($lnk)
$s.TargetPath = $ahk; $s.Arguments = '"' + (Join-Path $dest 'Read-Aloud.ahk') + '"'; $s.Save()
Start-Process $ahk -ArgumentList ('"' + (Join-Path $dest 'Read-Aloud.ahk') + '"')
"INSTALLED · AutoHotkey: $ahk · Script: $dest\Read-Aloud.ahk · Startup: $lnk"
```

Sent to VTES-Inbox 2026-10-13 12:21Z, Drive id 1V2RTa8T2IAuwZy56D6jXC0m2ppjao7JQ. Directive copied to Shared Folders for all LLMs: 1quWpnrIGYi5fsMbjKkQnFUJrJ6EgURzS.
