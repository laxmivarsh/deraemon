# Doraemon Universe Dev Server Launcher for PowerShell
$env:PATH = "C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;" + $env:PATH
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting Doraemon Universe Dev Server (Next.js 14)" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
pnpm run dev
