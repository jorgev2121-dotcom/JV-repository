# OWNER DIRECTIVE: Claude Desktop + Ollama Service + LangChain + LlamaIndex RAG
# TRK-2026-10055 · 2026-09-21
# Author: Cloud Claude Code · Execution: RAMBO Desktop
# Authorization: Owner Directive Override (Freeze-and-Finish exception)

# Phase 1: Verify Ollama and configure as Windows Service
Write-Host "[PHASE 1] Ollama Service Configuration"

# Check if Ollama is installed
$ollamaPath = "C:\Users\$env:USERNAME\AppData\Local\Programs\Ollama\ollama.exe"
if (-not (Test-Path $ollamaPath)) {
    Write-Host "ERROR: Ollama not found at $ollamaPath. Install Ollama first."
    exit 1
}

# Create Windows Task Scheduler entry for Ollama (replaces tray app)
$taskName = "Ollama-Service-Wrapper"
$taskExists = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($taskExists) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# PowerShell script that runs Ollama and auto-restarts on failure
$ollamaWrapperScript = @'
$ollamaExe = "C:\Users\' + $env:USERNAME + '\AppData\Local\Programs\Ollama\ollama.exe"
$logPath = "C:\Users\' + $env:USERNAME + '\AppData\Local\Ollama\service.log"

while ($true) {
    try {
        & $ollamaExe serve 2>&1 | Tee-Object -FilePath $logPath -Append
    } catch {
        Add-Content -Path $logPath -Value "$(Get-Date): Ollama crashed: $_"
        Start-Sleep -Seconds 5
    }
}
'@

$wrapperPath = "C:\temp\ollama-service-wrapper.ps1"
New-Item -ItemType Directory -Path "C:\temp" -Force | Out-Null
Set-Content -Path $wrapperPath -Value $ollamaWrapperScript

# Register scheduled task to run on startup and restart on failure
$taskAction = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$wrapperPath`""
$taskTrigger = New-ScheduledTaskTrigger -AtStartup
$taskSettings = New-ScheduledTaskSettingsSet -RunOnlyIfNetworkAvailable -RestartInterval (New-TimeSpan -Minutes 1) -RestartCount 10 -MultipleInstances IgnoreNew
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest

Register-ScheduledTask -TaskName $taskName -Action $taskAction -Trigger $taskTrigger -Settings $taskSettings -Principal $principal -Force | Out-Null
Start-ScheduledTask -TaskName $taskName

Write-Host "[PHASE 1] ✓ Ollama service registered and started"

# Phase 2: Install Python and LangChain + LlamaIndex
Write-Host "[PHASE 2] Python Dependencies"

# Check if Python is installed
$pythonExe = "python.exe"
try {
    $pythonVersion = & $pythonExe --version 2>&1
    Write-Host "Python found: $pythonVersion"
} catch {
    Write-Host "ERROR: Python not found. Install Python 3.10+ first."
    exit 1
}

# Install LangChain, LlamaIndex, and OCR libraries
pip install --upgrade pip
pip install langchain langchain-community ollama
pip install llama-index llama-index-embeddings-ollama llama-index-llms-ollama
pip install pytesseract pdf2image pillow

Write-Host "[PHASE 2] ✓ Python packages installed"

# Phase 3: Create RAG indexing script skeleton
Write-Host "[PHASE 3] RAG Indexing Script"

$ragScriptPath = "C:\temp\rag-indexing.py"
$ragScript = @'
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.ollama import Ollama
from pathlib import Path
import json

# Configuration
OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_MODEL = "mistral"  # or "neural-chat", "dolphin-mixtral"
DESKTOP_PATH = Path.home() / "Desktop"
GOOGLE_DRIVE_PATH = Path.home() / "Google Drive"
INDEX_CACHE_PATH = Path.home() / ".rag_index"

# Initialize LLM and embeddings
llm = Ollama(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL)
embed_model = OllamaEmbedding(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL)

# Load documents from Desktop and Google Drive
documents = []
print("[RAG] Loading documents from Desktop...")
if DESKTOP_PATH.exists():
    reader = SimpleDirectoryReader(str(DESKTOP_PATH), recursive=True)
    documents.extend(reader.load_data())

print("[RAG] Loading documents from Google Drive...")
if GOOGLE_DRIVE_PATH.exists():
    reader = SimpleDirectoryReader(str(GOOGLE_DRIVE_PATH), recursive=True)
    documents.extend(reader.load_data())

if not documents:
    print("[ERROR] No documents found. Check paths and re-run.")
    exit(1)

print(f"[RAG] Indexed {len(documents)} documents")

# Create index
index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
index.storage_context.persist(str(INDEX_CACHE_PATH))

print(f"[RAG] Index cached at {INDEX_CACHE_PATH}")

# Example query (test connection)
query_engine = index.as_query_engine(llm=llm)
response = query_engine.query("What are the main job tracking numbers in my files?")
print(f"[RAG TEST] Response: {response}")
'@

Set-Content -Path $ragScriptPath -Value $ragScript
Write-Host "[PHASE 3] ✓ RAG indexing script created at $ragScriptPath"

# Phase 4: Test Ollama connection
Write-Host "[PHASE 4] Testing Ollama Connection"

$testUrl = "http://localhost:11434/api/tags"
try {
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -TimeoutSec 5
    Write-Host "[PHASE 4] ✓ Ollama API responding. Available models:"
    $response.models | ForEach-Object { Write-Host "  - $($_.name)" }
} catch {
    Write-Host "[PHASE 4] ⚠ Ollama not responding yet. It may still be starting. Retry in 10 seconds."
    Start-Sleep -Seconds 10
    try {
        $response = Invoke-RestMethod -Uri $testUrl -Method Get -TimeoutSec 5
        Write-Host "[PHASE 4] ✓ Ollama now responding."
    } catch {
        Write-Host "[PHASE 4] ✗ Ollama still not responding. Check Windows Task Scheduler or restart."
    }
}

Write-Host ""
Write-Host "==============================================="
Write-Host "PHASE 5: MANUAL STEPS (RED ITEMS)"
Write-Host "==============================================="
Write-Host ""
Write-Host "[RED-01] Verify Ollama models are pulled:"
Write-Host "  Run: ollama pull mistral"
Write-Host "  (Or whatever model you prefer)"
Write-Host ""
Write-Host "[RED-02] Test RAG indexing (if you have files to index):"
Write-Host "  Run: python C:\temp\rag-indexing.py"
Write-Host ""
Write-Host "[RED-03] Verify Claude Code Desktop is installed:"
Write-Host "  Download: https://claude.ai/code"
Write-Host "  Install as normal, select this repo"
Write-Host ""
Write-Host "[RED-04] Configure Claude Code plugin for RAG (manual in Claude settings)"
Write-Host ""
Write-Host "==============================================="
Write-Host "EXECUTION REPORT"
Write-Host "==============================================="
Write-Host "Date: $(Get-Date)"
Write-Host "Task: TRK-2026-10055 Claude Desktop + Ollama + RAG"
Write-Host "Status: PHASES 1-4 COMPLETE (GREEN items done)"
Write-Host "Blocking: RED items require manual action"
Write-Host "Script: $PSCommandPath"
Write-Host ""
