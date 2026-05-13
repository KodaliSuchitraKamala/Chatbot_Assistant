@echo off
echo Starting Chatbot Application...
echo.

echo Starting Backend Server...
cd backend
start cmd /k "npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
cd ..
start cmd /k "npm start"

echo.
echo Both servers are starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
echo Make sure Ollama is running: ollama serve
pause
