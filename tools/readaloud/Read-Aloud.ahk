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
