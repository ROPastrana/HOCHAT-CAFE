@echo off
rem Runs the site with XAMPP's PHP. MySQL must be started in the XAMPP Control Panel.
cd /d "%~dp0"
echo Hochat Cafe is running at http://localhost:8000
echo Press Ctrl+C to stop.
"C:\xampp\php\php.exe" -S localhost:8000
