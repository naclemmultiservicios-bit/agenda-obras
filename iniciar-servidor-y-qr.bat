@echo off
echo ========================================
echo   Iniciar Servidor y Generar QR
echo   Agenda de Obras
echo ========================================
echo.

REM Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no está instalado.
    echo Por favor instala Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python instalado.
echo.

REM Iniciar servidor en background
echo Iniciando servidor en puerto 8000...
start /B python -m http.server 8000

REM Esperar unos segundos para que el servidor inicie
timeout /t 3 /nobreak >nul

REM Verificar que el servidor esté funcionando
curl -s http://localhost:8000 >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: No se pudo iniciar el servidor.
    echo Puede que el puerto 8000 ya esté en uso.
    pause
    exit /b 1
)

echo ✅ Servidor iniciado correctamente.
echo.
echo IP de acceso: http://192.168.0.244:8000
echo.
echo ========================================
echo   IMPORTANTE PARA EL MÓVIL
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
echo   El servidor seguirá ejecutándose
echo   Presiona CTRL+C en esta ventana para detenerlo
echo ========================================
echo.

REM Abrir la aplicación
start http://localhost:8000

REM Mantener el servidor ejecutándose
python -m http.server 8000