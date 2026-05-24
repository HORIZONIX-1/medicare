@echo off
cd /d "d:\OFFICIAL\Programming\Web\Community Project\Project_Hope\medicare\backend"
echo Installing dependencies...
call npm install
echo.
echo Generating Prisma client...
call npx prisma generate
echo.
echo Running migrations...
call npx prisma migrate dev --name phase3_opd
echo.
echo Starting backend...
call npm run dev
pause
