@echo off
echo ========================================
echo   Iniciar Servidor con Tailscale
echo   Agenda de Obras - Acceso Remoto
echo ========================================
echo.

REM Verificar Tailscale
where tailscale >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Tailscale no está instalado en tu sistema.
    echo.
    echo Por favor:
    echo 1. Ve a tailscale.com
    echo 2. Descarga e instala Tailscale para Windows
    echo 3. Inicia sesión con tu cuenta
    echo 4. Ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

REM Verificar si Tailscale está activo
tailscale status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Tailscale no está activo.
    echo.
    echo Por favor:
    echo 1. Abre la aplicación Tailscale
    echo 2. Inicia sesión si es necesario
    echo 3. Activa la conexión
    echo 4. Ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

echo ✅ Tailscale está instalado y activo.
echo.
echo ========================================
echo   INFORMACIÓN DE CONEXIÓN
echo ========================================
echo.
echo Tu IP de Tailscale:
tailscale ip -4
echo.
echo Puerto del servidor: 8000
echo URL de acceso móvil: http://[IP-TAILSCALE]:8000
echo.
echo ========================================
echo   INSTRUCCIONES PARA EL MÓVIL
echo ========================================
echo.
echo 1. Asegúrate de tener Tailscale instalado en el móvil
echo 2. Inicia sesión con la MISMA cuenta que en el PC
echo 3. Activa Tailscale en el móvil
echo 4. Usa la IP de Tailscale mostrada arriba
echo 5. Abre la app de Agenda de Obras
echo 6. Ve a "Instalador Móvil" y genera el QR
echo.
echo ========================================
echo   Iniciando servidor local...
echo   Presiona CTRL+C para detener
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause