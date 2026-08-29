# 🚀 Despliegue de Agenda de Obras - PWA

## 📱 Información de la PWA

La aplicación ahora es una **Progressive Web App (PWA)** que se puede:
- Instalar en el móvil (Android/iOS)
- Funcionar sin conexión (offline)
- Acceder desde cualquier lugar con internet

## 🌡️ OPCIONES DE DESPLIEGUE PÚBLICO

### Opción 1: GitHub Pages (GRATIS - Recomendado)

**Ventajas:** Gratis, fácil, HTTPS automático, CDNs globales

**Pasos:**
1. Crear cuenta en [github.com](https://github.com)
2. Crear un nuevo repositorio llamado `agenda-obras`
3. Subir todos los archivos al repositorio
4. Ir a Settings > Pages
5. Seleccionar la rama `main` y carpeta `/root`
6. Tu app estará disponible en: `https://tu-usuario.github.io/agenda-obras`

**Comandos Git:**
```bash
git init
git add .
git commit -m "Primera versión de Agenda de Obras PWA"
git branch -M main
git remote add origin https://github.com/tu-usuario/agenda-obras.git
git push -u origin main
```

### Opción 2: Netlify (GRATIS)

**Ventajas:** Muy fácil, HTTPS automático, dominios personalizados

**Pasos:**
1. Crear cuenta en [netlify.com](https://netlify.com)
2. Arrastrar la carpeta `agenda` al dashboard de Netlify
3. Tu app estará disponible en segundos con URL aleatoria
4. Puedes cambiar el dominio en Settings > Domain management

### Opción 3: Vercel (GRATIS)

**Ventajas:** Rápido, optimizado para frontend, HTTPS automático

**Pasos:**
1. Crear cuenta en [vercel.com](https://vercel.com)
2. Conectar tu repositorio de GitHub
3. Vercel detectará automáticamente que es un sitio estático
4. Desplegará automáticamente en cada push

### Opción 4: Hosting Propio (Servidor propio)

**Requisitos:**
- Servidor web (Apache, Nginx)
- Dominio propio
- Certificado SSL (HTTPS es obligatorio para PWAs)

**Configuración Nginx:**
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name tu-dominio.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/agenda;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Opción 5: Firebase Hosting (GRATIS)

**Ventajas:** Hosting de Google, rápido, HTTPS automático

**Pasos:**
1. Instalar Firebase CLI: `npm install -g firebase-tools`
2. Iniciar sesión: `firebase login`
3. Inicializar proyecto: `firebase init`
4. Seleccionar "Hosting"
5. Desplegar: `firebase deploy`

## 🔒 REQUISITOS OBLIGATORIOS PARA PWAs

Para que la PWA funcione correctamente, necesitas:

1. **HTTPS obligatorio** - Las PWAs solo funcionan con HTTPS
2. **Service Worker registrado** - Ya incluido en `sw.js`
3. **Manifest.json válido** - Ya incluido
4. **Iconos en los tamaños correctos** - 192x192 y 512x512

## 📱 INSTALACIÓN EN MÓVIL

### Android (Chrome)
1. Abre la app en Chrome
2. Verás un mensaje "Agregar a pantalla de inicio"
3. Toca "Agregar" o "Instalar"
4. La app aparecerá en tu pantalla de inicio como app nativa

### iOS (Safari)
1. Abre la app en Safari
2. Toca el botón "Compartir" (cuadrado con flecha)
3. Selecciona "Agregar a pantalla de inicio"
4. Toca "Agregar"
5. La app aparecerá en tu pantalla de inicio

## 🎯 CONVERSIÓN DE ICONOS SVG A PNG

Los iconos actuales están en formato SVG. Para convertirlos a PNG (necesario para PWAs):

**Opción A: Usar herramienta online**
1. Ve a [cloudconvert.com/svg-to-png](https://cloudconvert.com/svg-to-png)
2. Sube `icon-192.svg` y `icon-512.svg`
3. Descarga los archivos PNG

**Opción B: Usar herramienta local**
```bash
# Si tienes ImageMagick instalado:
convert icon-192.svg icon-192.png
convert icon-512.svg icon-512.png
```

**Opción C: Usar el script Node.js**
```bash
npm install canvas
node generate-icons.js
```

## 📋 ESTRUCTURA FINAL DE ARCHIVOS

```
agenda/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # Lógica JavaScript
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── icon-192.png       # Icono 192x192 (convertir desde SVG)
├── icon-512.png       # Icono 512x512 (convertir desde SVG)
├── icon-192.svg       # Icono SVG (original)
├── icon-512.svg       # Icono SVG (original)
└── README-DEPLOYMENT.md # Este archivo
```

## 🔧 CONFIGURACIÓN ADICIONAL

### Para dominio personalizado
1. Compra un dominio (ej: agenda-obras.com)
2. Configura los DNS para apuntar a tu hosting
3. Configura SSL en tu hosting
4. Actualiza el `manifest.json` con tu dominio

### Para notificaciones push (opcional)
Requiere servicio backend adicional como Firebase Cloud Messaging.

## 🚀 VERIFICACIÓN DE PWA

Para verificar que tu PWA está correctamente configurada:

1. **Lighthouse** (Chrome DevTools):
   - Abre DevTools (F12)
   - Ve a la pestaña Lighthouse
   - Ejecuta auditoría "Progressive Web App"
   - Deberías obtener puntuación alta

2. **Manifest Validator**:
   - Ve a [manifest-validator.appspot.com](https://manifest-validator.appspot.com)
   - Pega la URL de tu manifest.json

## 📞 SOPORTE

Si tienes problemas con el despliegue:
- GitHub Pages: Verifica que los archivos estén en la rama correcta
- Netlify/Vercel: Revisa los logs de despliegue
- Dominio propio: Verifica la configuración SSL y DNS

## ⚠️ IMPORTANTE - SEGURIDAD

Esta aplicación usa localStorage para guardar datos. Ten en cuenta:
- Los datos están solo en el dispositivo del usuario
- No hay sincronización entre dispositivos
- Para sincronización, necesitarías un backend con base de datos
- Para uso profesional multi-usuario, considera un backend real

## 🔄 PRÓXIMOS PASOS (OPCIONAL)

Para hacer la app más completa:
1. Agregar backend (Node.js + Express + MongoDB)
2. Implementar autenticación de usuarios
3. Sincronización en tiempo real (WebSocket)
4. Notificaciones push
5. Exportación de datos (PDF, Excel)
6. Integración con APIs de construcción