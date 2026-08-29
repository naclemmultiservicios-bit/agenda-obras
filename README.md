# 🏗️ Agenda Profesional de Obras - PWA

Sistema de gestión integral para proyectos de construcción que funciona como aplicación web y como Progressive Web App (PWA) instalable en móviles.

## ✨ Características

### 📱 Como PWA (Progressive Web App)
- **Instalable en móviles**: Android e iOS
- **Funciona offline**: Service Worker incluido
- **Acceso desde cualquier lugar**: No requiere estar en la misma red WiFi
- **Experiencia nativa**: Se comporta como una app nativa

### 🏢 Gestión de Proyectos
- Creación de proyectos con nombre, cliente, ubicación
- Fechas de inicio y fin estimadas
- Presupuestos y seguimiento
- Estados: Planificación, En Progreso, Completado, En Espera

### ✅ Gestión de Tareas
- Tareas asignadas a proyectos y personal
- Prioridades: Baja, Media, Alta, Urgente
- Estados: Pendiente, En Progreso, Completada
- Filtros por estado
- Fechas límite

### 👷 Gestión de Personal
- Registro de trabajadores con cargo y especialidad
- Información de contacto
- Salarios diarios
- Estados: Activo/Inactivo
- Asignación a tareas

### 🧱 Control de Materiales
- Inventario por categorías (cemento, acero, madera, etc.)
- Control de cantidades y unidades
- Precios unitarios y cálculo automático
- Asignación a proyectos
- Gestión de proveedores

### 📊 Dashboard y Reportes
- Estadísticas en tiempo real
- Resumen de proyectos, tareas y costos
- Registro de actividad reciente
- Reportes por categorías

### 📱 Instalador Móvil por QR (Integrado)
- Generador de QR integrado en la aplicación
- Detección automática de URL actual
- Soporte para URLs locales y públicas
- Descarga e impresión de QR
- Instrucciones paso a paso para instalación

### 🤖 Automatización con n8n (Integrado)
- **Docker Compose** completo con n8n, PostgreSQL y Redis
- **Webhooks automáticos** desde la app a n8n
- **Notificaciones** por email y Slack
- **Exportación automática** a Oracle NoSQL
- **Flujos preconfigurados** para tareas comunes
- **Script de instalación** automática
- Guía completa en `GUIA-N8N.md`

## 🚀 Instalación Local

### Opción 1: Abrir directamente
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

### Opción 2: Servidor local (recomendado para acceso desde móvil)
**Automatizado**: Ejecuta `iniciar-servidor.bat` (Windows)

**Manual**:
```bash
# Con Python
python -m http.server 8000

# Con Node.js (necesitas http-server)
npx http-server
```

**IP Fija Configurada**: `http://192.168.0.244:8000`

## 🌐 Despliegue Público (para acceso desde móvil)

La aplicación está configurada como PWA y puede desplegarse en múltiples plataformas gratuitas.

### 🚀 Acceso desde la Calle (Opciones):

**Opción 1 - Tailscale (Recomendada - GRATIS):**
- Instala Tailscale en PC y móvil
- Acceso seguro como red local
- Ejecuta: `iniciar-con-tailscale.bat`
- Guía completa: `GUIA-ACCESO-REMOTO.md`

**Opción 2 - Despliegue en la Nube:**
- GitHub Pages, Netlify o Vercel
- Acceso desde cualquier lugar con internet
- Sin configuración de red

**Opción 3 - ngrok (Pruebas rápidas):**
- URL temporal pública
- Perfecto para testing
- Limitaciones en versión gratuita

La aplicación está configurada como PWA y puede desplegarse en múltiples plataformas gratuitas:

### Opción 1: GitHub Pages (Recomendado - GRATIS)
1. Crea un repositorio en GitHub
2. Sube los archivos
3. Activa GitHub Pages en Settings
4. Tu app estará disponible en: `https://tu-usuario.github.io/repo`

**Automatizado**: Ejecuta `deploy-github.bat` (Windows) para despliegue automático

### Opción 2: Netlify (Muy fácil - GRATIS)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. ¡Listo en segundos!

### Opción 3: Vercel (Rápido - GRATIS)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Despliegue automático

📖 **Instrucciones detalladas**: Ver `README-DEPLOYMENT.md`

## 📱 Instalación en Móvil

### Android (Chrome)
1. Abre la app desplegada en Chrome
2. Toca "Agregar a pantalla de inicio"
3. La app se instalará como nativa

### iOS (Safari)
1. Abre la app en Safari
2. Toca "Compartir" > "Agregar a pantalla de inicio"
3. La app se instalará como nativa

## 🎨 Generación de Iconos

Los iconos están en formato SVG. Para convertirlos a PNG (necesario para PWA):

1. Abre `generate-icons-manual.html` en tu navegador
2. Los iconos se generarán automáticamente
3. Descarga ambos iconos (192x192 y 512x512)
4. Guárdalos como `icon-192.png` y `icon-512.png`

## � Generador de QR para Instalación

Para facilitar la instalación en móviles, usa el generador de QR incluido:

1. Abre `qr-generator.html` en tu navegador
2. Ingresa la URL de tu aplicación desplegada
3. Genera el código QR automáticamente
4. Escanea con la cámara del móvil
5. Instala la app como PWA

**Funciones del generador:**
- ✅ Genera QR automáticamente desde cualquier URL
- ✅ Descarga el QR como imagen PNG
- ✅ Imprime el QR para compartir
- ✅ Incluye instrucciones de instalación
- ✅ Funciona con URLs locales y públicas

## �📂 Estructura del Proyecto

```
agenda/
├── index.html                  # Página principal
├── styles.css                  # Estilos CSS
├── script.js                   # Lógica JavaScript
├── manifest.json               # Configuración PWA
├── sw.js                      # Service Worker (offline)
├── icon-192.svg               # Icono SVG 192x192
├── icon-512.svg               # Icono SVG 512x512
├── icon-192.png               # Icono PNG 192x192 (generar)
├── icon-512.png               # Icono PNG 512x512 (generar)
├── generate-icons-manual.html # Generador de iconos web
├── deploy-github.bat          # Script de despliegue automático
├── README.md                  # Este archivo
└── README-DEPLOYMENT.md       # Guía de despliegue detallada
```

## 💾 Almacenamiento de Datos

- **LocalStorage**: Los datos se guardan en el navegador del usuario
- **Persistencia**: Los datos persisten entre sesiones
- **Sin sincronización**: Cada dispositivo tiene sus propios datos
- **Offline**: La app funciona sin conexión

## 🔧 Requisitos Técnicos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Para PWA: HTTPS obligatorio (incluido en opciones de despliegue gratuito)
- Para icons: Canvas API (incluido en navegadores modernos)

## 🚨 Limitaciones Actuales

- Datos locales por dispositivo (sin sincronización)
- Sin autenticación de usuarios
- Sin backend para datos compartidos
- Funcionalidad offline pero sin sincronización automática

## 🔄 Próximas Mejoras (Opcionales)

Para convertir en una app empresarial completa:

1. **Backend con base de datos** (Node.js + MongoDB/PostgreSQL)
2. **Autenticación de usuarios** (JWT, OAuth)
3. **Sincronización en tiempo real** (WebSocket)
4. **Notificaciones push** (Firebase Cloud Messaging)
5. **Exportación de datos** (PDF, Excel)
6. **APIs externas** (clima, mapas, proveedores)

## 📞 Soporte

Para problemas de despliegue, consulta `README-DEPLOYMENT.md`

## 📄 Licencia

Proyecto de código abierto para uso personal y profesional.

---

**Desarrollado como solución integral para gestión de obras de construcción** 🏗️