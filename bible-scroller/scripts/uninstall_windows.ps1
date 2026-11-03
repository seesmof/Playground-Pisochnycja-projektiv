# Remove the installed app, its shortcuts and its Settings > Apps entry.
# Works both from the repo and from the installed copy.
$ErrorActionPreference = "Stop"

$expected = Join-Path $env:LOCALAPPDATA "Programs\VerseFeed"
$installDir = $PSScriptRoot
if ([IO.Path]::GetFullPath($PSScriptRoot).TrimEnd("\") -ne
    [IO.Path]::GetFullPath($expected).TrimEnd("\")) {
    $installDir = $expected
}

if (-not (Test-Path (Join-Path $installDir "VerseFeed.exe"))) {
    Write-Host "Verse Feed is not installed at $installDir"
    exit 0
}

Get-Process VerseFeed -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 300

$shortcuts = @(
    (Join-Path ([Environment]::GetFolderPath("Desktop")) "Verse Feed.lnk"),
    (Join-Path ([Environment]::GetFolderPath("Programs")) "Verse Feed.lnk")
)
foreach ($shortcut in $shortcuts) {
    Remove-Item $shortcut -Force -ErrorAction SilentlyContinue
}

Remove-Item "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\VerseFeed" `
    -Recurse -Force -ErrorAction SilentlyContinue

# The running script may live inside the folder being deleted, so remove it
# from a short-lived helper process.
$escaped = $installDir.Replace("'", "''")
Start-Process -FilePath "powershell.exe" -WindowStyle Hidden -ArgumentList @(
    "-NoProfile",
    "-Command",
    "Start-Sleep -Milliseconds 500; Remove-Item -LiteralPath '$escaped' -Recurse -Force"
)

Write-Host "Verse Feed uninstalled."
