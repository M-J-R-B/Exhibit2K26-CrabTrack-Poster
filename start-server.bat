@echo off
echo Starting CrabTrack Exhibition Server...
echo.
echo Open your browser and go to:
echo http://localhost:8080/index.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8080
