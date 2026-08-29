# 📱 Instrucciones de Acceso Móvil - IP Fija

## 🔧 Configuración de tu Red

**IP Fija del ordenador**: `192.168.0.244`
**Puerto**: `8000`
**URL de acceso**: `http://192.168.0.244:8000`

## 🚀 Pasos para Acceder desde el Móvil

### 1. Iniciar el Servidor Local
**Opción A - Automatizada (Recomendada)**:
```bash
# Ejecuta el archivo:
iniciar-servidor.bat
```

**Opción B - Manual**:
```bash
# Abre CMD en la carpeta de la agenda y ejecuta:
python -m http.server 8000
```

### 2. Verificar Conexión
- Asegúrate de que el servidor esté iniciado (verás mensajes en la consola)
- Abre en tu PC: `http://localhost:8000` o `http://192.168.0.244:8000`
- La aplicación debe cargarse correctamente

### 3. Conectar el Móvil
- **IMPORTANTE**: El móvil debe estar conectado a la **misma red WiFi** que tu PC
- No puede ser datos móviles, debe ser WiFi de la misma red

### 4. Generar QR desde la App
1. Abre la aplicación en tu PC
2. Ve a la sección **"📱 Instalador Móvil"**
3. La URL ya está preconfigurada: `http://192.168.0.244:8000`
4. Haz clic en **"🔄 Generar QR"**
5. El QR se generará automáticamente

### 5. Escanear e Instalar
1. Abre la cámara de tu móvil
2. Escanea el código QR
3. Se abrirá la aplicación en el navegador del móvil
4. **Android**: Toca "Agregar a pantalla de inicio"
5. **iOS**: Toca "Compartir" > "Agregar a pantalla de inicio"
6. ¡La app se instalará como nativa!

## ⚠️ Solución de Problemas

### El QR no funciona:
- ✅ Verifica que el servidor esté iniciado en tu PC
- ✅ Confirma que el móvil está en la misma red WiFi
- ✅ Prueba acceder directamente: `http://192.168.0.244:8000` en el móvil
- ✅ Verifica que el firewall no bloquee el puerto 8000

### El servidor no inicia:
- ✅ Verifica que Python esté instalado: `python --version`
- ✅ Asegúrate de estar en la carpeta correcta de la agenda
- ✅ Prueba con otro puerto si 8000 está ocupado: `python -m http.server 8080`

### El móvil no se conecta:
- ✅ Verifica la IP fija: `ipconfig` en Windows
- ✅ Confirma que ambos dispositivos estén en la misma red
- ✅ Desactiva VPN en el móvil si está activa
- ✅ Prueba reiniciar el router si hay problemas de conexión

## 🔒 Seguridad Básica

- Esta configuración es para uso en red local
- No expone la aplicación a internet
- Solo dispositivos en tu red WiFi pueden acceder
- Considera usar contraseña en tu WiFi

## 📝 Notas Importantes

- La IP fija `192.168.0.244` está configurada en:
  - `script.js` (función testLocalIP)
  - `index.html` (valor por defecto del input)
  - `config.json` (archivo de configuración)

- Los datos se guardan en el dispositivo (localStorage)
- Cada dispositivo tiene sus propios datos
- Para sincronización entre dispositivos, necesitarías un backend

## 🔄 Para Futuros Cambios de IP

Si tu IP cambia en el futuro:
1. Actualiza `config.json` con la nueva IP
2. Modifica la función `testLocalIP()` en `script.js`
3. Actualiza el valor por defecto en `index.html`
4. O mejor aún, configura tu router para asignar IP fija a tu PC

## 🎯 Acceso Rápido

Una vez configurado, el flujo es:
1. Ejecutar `iniciar-servidor.bat`
2. Abrir la app en el PC
3. Ir a "Instalador Móvil"
4. Generar QR
5. Escanear con el móvil

¡Listo para usar desde cualquier lugar de tu casa!