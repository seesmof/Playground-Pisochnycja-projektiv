# Install Verse Feed for the current user and create a desktop shortcut.
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File scripts\install_windows.ps1
$ErrorActionPreference = "Stop"

$appRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $appRoot "dist\VerseFeed"
$sourceExe = Join-Path $source "VerseFeed.exe"

if (-not (Test-Path $sourceExe)) {
    throw "Build not found at $source. Run scripts\build_windows.ps1 first."
}

Get-Process VerseFeed -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 300

$installDir = Join-Path $env:LOCALAPPDATA "Programs\VerseFeed"
if (Test-Path $installDir) {
    Remove-Item $installDir -Recurse -Force
}

New-Item -ItemType Directory -Path $installDir -Force | Out-Null
Copy-Item (Join-Path $source "*") $installDir -Recurse -Force
Copy-Item (Join-Path $PSScriptRoot "uninstall_windows.ps1") `
    (Join-Path $installDir "Uninstall.ps1") -Force

$exe = Join-Path $installDir "VerseFeed.exe"
$shell = New-Object -ComObject WScript.Shell

$shortcuts = @(
    (Join-Path ([Environment]::GetFolderPath("Desktop")) "Verse Feed.lnk"),
    (Join-Path ([Environment]::GetFolderPath("Programs")) "Verse Feed.lnk")
)

foreach ($shortcutPath in $shortcuts) {
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $exe
    $shortcut.WorkingDirectory = $installDir
    $shortcut.IconLocation = "$exe,0"
    $shortcut.Description = "Random Bible verses"
    $shortcut.Save()
    Write-Host "Shortcut: $shortcutPath"
}

$sizeKb = [int]((Get-ChildItem $installDir -Recurse |
    Measure-Object Length -Sum).Sum / 1KB)
$uninstallCommand = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$installDir\Uninstall.ps1`""

$uninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\VerseFeed"
New-Item -Path $uninstallKey -Force | Out-Null
Set-ItemProperty -Path $uninstallKey -Name DisplayName -Value "Verse Feed"
Set-ItemProperty -Path $uninstallKey -Name DisplayVersion -Value "0.1.0"
Set-ItemProperty -Path $uninstallKey -Name Publisher -Value "Verse Feed"
Set-ItemProperty -Path $uninstallKey -Name InstallLocation -Value $installDir
Set-ItemProperty -Path $uninstallKey -Name DisplayIcon -Value "$exe,0"
Set-ItemProperty -Path $uninstallKey -Name UninstallString -Value $uninstallCommand
Set-ItemProperty -Path $uninstallKey -Name QuietUninstallString -Value $uninstallCommand
Set-ItemProperty -Path $uninstallKey -Name EstimatedSize -Value $sizeKb -Type DWord
New-ItemProperty -Path $uninstallKey -Name NoModify -Value 1 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path $uninstallKey -Name NoRepair -Value 1 -PropertyType DWord -Force | Out-Null

Write-Host "Installed to $installDir"
Write-Host "Launch it from the 'Verse Feed' shortcut on your desktop."
