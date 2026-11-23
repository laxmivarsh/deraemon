@echo off
set PATH=C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%
echo ========================================================
echo   Starting Doraemon Universe Dev Server (Next.js 14)
echo   URL: http://localhost:3000
echo ========================================================
pnpm run dev
