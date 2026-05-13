@echo off
echo Starting Chatbot Application (Simple Mode)...
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
echo Servers are starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
echo Note: Backend will use fallback responses if Ollama is not available
echo To use Ollama, run: ollama serve && ollama pull codellama
echo.
pause
