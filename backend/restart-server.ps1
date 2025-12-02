$ErrorActionPreference = "Continue"

Write-Host "🛑 Parando qualquer servidor anterior..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Host "✅ Iniciando novo servidor..." -ForegroundColor Green
Set-Location "C:\Users\gmuss\Downloads\rescene-bcdd 30 nov\backend"
& node server.js
