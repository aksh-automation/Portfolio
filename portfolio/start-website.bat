@echo off
title Portfolio Local Server
echo ===================================================
echo Starting your Portfolio Local Server...
echo ===================================================
echo.

REM Kill any old python servers that might be blocking the port
taskkill /F /IM python.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul

echo Opening http://localhost:8080 in your browser...
start http://localhost:8080
echo.
echo Server is running! (Keep this window open while viewing)
echo Press Ctrl+C in this window to stop the server.
echo.
python -m http.server 8080 --bind 0.0.0.0
pause
