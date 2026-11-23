@echo off
set PATH=C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\laxmi\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%
echo ========================================================
echo   Starting Doraemon Universe Production Server
echo   URL: http://localhost:3000
echo ========================================================
pnpm run start
