@echo off
REM ============================================================
REM  VTS-LLM-PANEL KEY SETUP  --  TRK-2026-9200
REM  ☁️ Built by Cloud Executor 2026-09-29
REM ============================================================
REM
REM  STEP 1 — Get your FREE Gemini key (takes 2 minutes):
REM    Go to: https://aistudio.google.com/app/apikey
REM    Click "Create API Key" — no credit card needed.
REM    Copy the key that appears.
REM
REM  STEP 2 — Double-click this file and paste the key when asked.
REM
REM  STEP 3 — Restart any open Claude Code windows.
REM           The key is now permanent (saved to your user environment).
REM ============================================================

echo.
echo  VTS MULTI-LLM PANEL -- KEY SETUP
echo  TRK-2026-9200
echo  ============================================================
echo.
echo  You will need your FREE Gemini API key.
echo  Get one at: https://aistudio.google.com/app/apikey
echo.

set /p GEMINI_KEY="  Paste your Gemini API key here and press Enter: "

if "%GEMINI_KEY%"=="" (
    echo.
    echo  ERROR: No key entered. Nothing saved.
    pause
    exit /b 1
)

REM Save permanently to user environment (survives reboots)
setx GEMINI_API_KEY "%GEMINI_KEY%" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Could not save key with setx. Try running as Administrator.
    pause
    exit /b 1
)

echo.
echo  Key saved permanently.
echo.

REM Wire key into this session so health check works immediately
set GEMINI_API_KEY=%GEMINI_KEY%

REM Find Python — try py launcher first, then python
where py >nul 2>&1
if %errorlevel%==0 (
    set PYTHON=py
) else (
    where python >nul 2>&1
    if %errorlevel%==0 (
        set PYTHON=python
    ) else (
        echo  WARNING: Python not found. Skipping health check.
        echo  The key is saved. Install Python and re-run to verify.
        pause
        exit /b 0
    )
)

echo  Running health check...
echo  ============================================================
%PYTHON% "%~dp0vts_llm_panel.py" --health
echo  ============================================================
echo.
echo  DONE. Restart Claude Code desktop for the key to be available there.
echo.
pause
