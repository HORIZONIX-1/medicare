@echo off
setlocal enabledelayedexpansion

cd /d "d:\OFFICIAL\Programming\Web\Community Project\Project_Hope\medicare\backend"

echo.
echo ================================
echo Setting up Backend...
echo ================================
echo.

echo [1/4] Installing dependencies...
call npm install
if !errorlevel! neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo [1/4] ✓ Dependencies installed
echo.

echo [2/4] Generating Prisma client...
call npx prisma generate
if !errorlevel! neq 0 (
    echo ERROR: prisma generate failed
    pause
    exit /b 1
)
echo [2/4] ✓ Prisma client generated
echo.

echo [3/4] Running database migrations...
call npx prisma migrate dev --name init
if !errorlevel! neq 0 (
    echo WARNING: Migration may have issues, but continuing...
)
echo [3/4] ✓ Migrations processed
echo.

echo [4/4] Starting backend server...
echo Backend should be running on http://localhost:4000
echo.
call npm run dev

pause
