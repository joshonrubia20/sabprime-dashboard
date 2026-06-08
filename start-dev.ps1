$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeRoot = Join-Path $projectRoot ".tools\node-v22.22.3-win-x64"
$env:PATH = "$nodeRoot;$env:PATH"
Set-Location $projectRoot
& "$nodeRoot\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3000
