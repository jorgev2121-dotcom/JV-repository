# Scan-Tree.ps1 — desktop back engine for the Filing Tree panel (TRK-2026-9970)
# No admin, no install, no owner. Produces the same JSON node schema the Drive scan uses
# (tools/filetree/data/drive/_SCHEMA.md) so the panel can overlay both sources.
#
#   powershell -File Scan-Tree.ps1 -Root 'C:\Users\JV\OneDrive\Documents' -Depth 4 -Out '.\onedrive.json'
#   powershell -File Scan-Tree.ps1 -Root 'G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH' -Depth 4 -Out '.\gdrive-local.json'
#
# GREEN: read-only. It never opens, moves, renames or deletes a file. On Drive-for-Desktop
# streaming folders it reads metadata only (no placeholder is hydrated).
# Faster alternative on NTFS when WizTree is installed and you are already elevated:
#   WizTree64.exe /export="tree.csv" /admin=1   (MFT read, seconds) — then convert; not required.

param(
    [Parameter(Mandatory=$true)][string]$Root,
    [int]$Depth = 4,
    [int]$MaxChildren = 300,
    [Parameter(Mandatory=$true)][string]$Out
)
$ErrorActionPreference = 'SilentlyContinue'

function Get-Node([System.IO.FileSystemInfo]$item, [int]$level) {
    $isDir = $item.PSIsContainer
    $node = [ordered]@{
        id           = $item.FullName
        title        = $item.Name
        mimeType     = $(if ($isDir) { 'application/vnd.google-apps.folder' } else { 'application/octet-stream' })
        size         = $(if ($isDir) { 0 } else { [int64]$item.Length })
        modifiedTime = $item.LastWriteTimeUtc.ToString('o')
        createdTime  = $item.CreationTimeUtc.ToString('o')
        isFolder     = $isDir
        webUrl       = 'file:///' + ($item.FullName -replace '\\','/')
        children     = @()
        truncated    = $false
    }
    if ($isDir -and $level -lt $Depth) {
        $kids = @(Get-ChildItem -LiteralPath $item.FullName -Force -ErrorAction SilentlyContinue)
        if ($kids.Count -gt $MaxChildren) { $node.truncated = $true; $kids = $kids[0..($MaxChildren-1)] }
        $node.children = @($kids | ForEach-Object { Get-Node $_ ($level + 1) })
    }
    return $node
}

$rootItem = Get-Item -LiteralPath $Root -Force
if (-not $rootItem) { throw "Root not found: $Root" }
$tree = Get-Node $rootItem 0
$tree.scannedAt = (Get-Date).ToUniversalTime().ToString('o')
$tree.source = "local:$env:COMPUTERNAME"

$json = $tree | ConvertTo-Json -Depth ($Depth + 6) -Compress
[System.IO.File]::WriteAllText($Out, $json, (New-Object System.Text.UTF8Encoding($false)))

# denominator line, always (NIGHT-PROTOCOL rule 5)
$files = 0; $dirs = 0; $bytes = 0
function Count($n) { if ($n.isFolder) { $script:dirs++; foreach ($c in $n.children) { Count $c } } else { $script:files++; $script:bytes += $n.size } }
Count $tree
Write-Host ("SCAN DONE  root={0}  depth={1}  folders={2}  files={3}  bytes={4}  out={5}" -f $Root, $Depth, $dirs, $files, $bytes, $Out)
