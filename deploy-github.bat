@echo off
echo ========================================
echo   Despliegue de Agenda de Obras PWA
echo   a GitHub Pages
echo   Usuario: naclemmultiservicios-bit
echo ========================================
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git no está instalado en tu sistema.
    echo Por favor instala Git desde: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git está instalado correctamente.
echo.

REM Configurar usuario de GitHub
set GITHUB_USERNAME=naclemmultiservicios-bit
set REPO_NAME=agenda-obras

echo.
echo Creando repositorio local...
git init
git add .
git commit -m "Primera versión de Agenda de Obras PWA"

echo.
echo Configurando repositorio remoto...
git branch -M main
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo ========================================
echo IMPORTANTE: Antes de continuar,
echo crea el repositorio en GitHub:
echo ========================================
echo.
echo 1. Ve a https://github.com/new
echo 2. Nombre del repositorio: %REPO_NAME%
echo 3. Marca "Public" o "Private" según prefieras
echo 4. NO marques "Add a README file"
echo 5. NO marques "Add .gitignore"
echo 6. Crea el repositorio
echo.
pause

echo.
echo Subiendo archivos a GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo subir a GitHub.
    echo Verifica que:
    echo 1. El repositorio existe en GitHub
    echo 2. Tus credenciales de GitHub son correctas
    echo 3. Tienes permisos de escritura en el repositorio
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ¡Despliegue exitoso!
echo ========================================
echo.
echo Tu aplicación estará disponible en:
echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo.
echo Pasos finales:
echo 1. Ve a tu repositorio en GitHub
echo 2. Settings > Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: main / (root)
echo 5. Save
echo.
echo Espera unos minutos y tu app estará online.
echo.
pause