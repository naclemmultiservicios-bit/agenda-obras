@echo off
echo ========================================
echo   Instalación de n8n para Agenda Obras
echo   Automatización Completa
echo ========================================
echo.

REM Verificar Docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker no está instalado en tu sistema.
    echo.
    echo Por favor instala Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker está instalado.
echo.

REM Verificar Docker Compose
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Compose no está disponible.
    echo.
    echo Docker Compose debería venir con Docker Desktop.
    echo Por favor asegúrate de tener Docker Desktop instalado correctamente.
    echo.
    pause
    exit /b 1
)

echo ✅ Docker Compose está disponible.
echo.

cd /d "%~dp0"

echo ========================================
echo   Creando y configurando contenedores
echo ========================================
echo.

REM Crear red y volúmenes
docker-compose up -d

if %errorlevel% neq 0 (
    echo ERROR: No se pudieron crear los contenedores.
    echo.
    echo Verifica que:
    echo 1. Docker Desktop esté ejecutándose
    echo 2. No haya otros servicios usando los puertos 5678, 5432, 6379
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ Instalación completada exitosamente
echo ========================================
echo.
echo Servicios configurados:
echo   - n8n: http://localhost:5678
echo   - PostgreSQL: localhost:5432
echo   - Redis: localhost:6379
echo.
echo Credenciales n8n:
echo   Usuario: admin
echo   Password: obras2024
echo.
echo ========================================
echo   ACCESO A n8n
echo ========================================
echo.
echo 1. Abre tu navegador en: http://localhost:5678
echo 2. Inicia sesión con admin / obras2024
echo 3. Importa los flujos desde la carpeta workflows/
echo 4. Configura los webhooks según la guía
echo.
echo Para detener los servicios:
echo   docker-compose down
echo.
echo Para ver los logs:
echo   docker-compose logs -f
echo.
pause