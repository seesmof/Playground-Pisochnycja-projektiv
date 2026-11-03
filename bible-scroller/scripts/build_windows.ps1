# Build the standalone Windows app into app\dist\VerseFeed.
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File scripts\build_windows.ps1
$ErrorActionPreference = "Stop"

$appRoot = Split-Path -Parent $PSScriptRoot
Set-Location $appRoot

Write-Host "Syncing Python environment..."
uv sync
if ($LASTEXITCODE -ne 0) { throw "uv sync failed" }

Write-Host "Generating icon..."
uv run python scripts\make_icon.py
if ($LASTEXITCODE -ne 0) { throw "Icon generation failed" }

if (Test-Path build) { Remove-Item build -Recurse -Force }
if (Test-Path dist) { Remove-Item dist -Recurse -Force }

Write-Host "Building executable..."
uv run pyinstaller main.py `
    --name VerseFeed `
    --windowed `
    --noconfirm `
    --clean `
    --icon assets\verse-feed.ico `
    --version-file assets\version_info.txt `
    --add-data "../bible.json;." `
    --exclude-module tkinter
if ($LASTEXITCODE -ne 0) { throw "PyInstaller failed" }

$exe = Join-Path $appRoot "dist\VerseFeed\VerseFeed.exe"
if (-not (Test-Path $exe)) { throw "Build output not found: $exe" }

$sizeMb = (Get-ChildItem (Join-Path $appRoot "dist\VerseFeed") -Recurse |
    Measure-Object Length -Sum).Sum / 1MB
Write-Host ("Built {0} ({1:N0} MB)" -f $exe, $sizeMb)
Write-Host "Next: powershell -ExecutionPolicy Bypass -File scripts\install_windows.ps1"
