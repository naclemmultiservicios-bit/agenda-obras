@echo off
echo ========================================
echo   Iniciar Servidor Local - Agenda Obras
echo   IP Fija: 192.168.0.244:8000
echo ========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no está instalado en tu sistema.
    echo Por favor instala Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Python está instalado correctamente.
echo.
echo Iniciando servidor en puerto 8000...
echo IP de acceso: http://192.168.0.244:8000
echo.
echo ========================================
echo   INSTRUCCIONES PARA ACCEDER DESDE MÓVIL:
echo ========================================
echo.
echo 1. Asegúrate de que el móvil esté en la misma red WiFi
echo 2. Abre la app de Agenda de Obras en tu PC
echo 3. Ve a la seccion "Instalador Móvil"
echo 4. La URL ya está configurada con tu IP fija
echo 5. Haz clic en "Generar QR"
echo 6. Escanea el QR con tu móvil
echo 7. Instala la app como PWA
echo.
echo ========================================
echo   Presiona CTRL+C para detener el servidor
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause