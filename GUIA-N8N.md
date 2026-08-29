# 🤖 Guía de Instalación y Configuración - n8n para Agenda de Obras

## 🎯 Sistema de Automatización Completa

Esta guía te permite instalar n8n con Docker y configurar la automatización completa para tu agenda de obras.

## 📋 Requisitos Previos

1. **Docker Desktop** instalado en tu PC
   - Descargar desde: https://www.docker.com/products/docker-desktop
   - Asegúrate de que Docker Desktop esté ejecutándose

2. **Acceso a internet** para descargar las imágenes de Docker

## 🚀 Instalación Automática

### Paso 1: Ejecutar el Script de Instalación
```bash
# Ejecuta el archivo que creamos:
instalar-n8n.bat
```

Este script automáticamente:
- ✅ Verifica que Docker esté instalado
- ✅ Crea los contenedores necesarios
- ✅ Configura la red y volúmenes
- ✅ Inicia todos los servicios

### Paso 2: Acceder a n8n
1. Abre tu navegador en: `http://localhost:5678`
2. Inicia sesión con:
   - **Usuario**: `admin`
   - **Password**: `obras2024`

## 🔧 Configuración de n8n

### Importar los Workflows

1. **Importar Workflow de Notificaciones**:
   - Ve a "Workflows" > "Import from File"
   - Selecciona: `workflows/notificacion-nueva-tarea.json`
   - Guarda el workflow

2. **Importar Workflow de Exportación**:
   - Ve a "Workflows" > "Import from File"
   - Selecciona: `workflows/exportacion-automatica.json`
   - Guarda el workflow

### Configurar Credenciales

#### 1. Credenciales SMTP (Para emails)
- Ve a "Credentials" > "Add Credential"
- Selecciona "SMTP"
- Configura con tu proveedor de email:
  - **Gmail**: Usa app password
  - **Outlook**: Configura con tu cuenta Microsoft
  - **Otro**: Usa los datos de tu servidor SMTP

#### 2. Credenciales Slack (Opcional)
- Ve a "Credentials" > "Add Credential"
- Selecciona "Slack API"
- Crea una app en: https://api.slack.com/apps
- Obtén el Bot Token y configura en n8n

#### 3. Credenciales Google Sheets (Opcional)
- Ve a "Credentials" > "Add Credential"
- Selecciona "Google Sheets OAuth2"
- Sigue el proceso de autenticación de Google

#### 4. Credenciales PostgreSQL
- Ve a "Credentials" > "Add Credential"
- Selecciona "PostgreSQL"
- Configura con:
  - **Host**: `postgres`
  - **Database**: `agenda_obras`
  - **User**: `agenda_user`
  - **Password**: `obras2024`

#### 5. Credenciales Oracle NoSQL
- Ve a "Credentials" > "Add Credential"
- Selecciona "Oracle NoSQL"
- Configura con tus credenciales de Oracle Cloud

## 🔄 Flujos de Automatización Configurados

### 1. Notificación Nueva Tarea
**Trigger**: Webhook que se activa cuando creas una tarea en la app

**Acciones automáticas**:
- 📧 Enviar email con detalles de la tarea
- 💬 Enviar notificación a Slack
- 📊 Guardar en Google Sheets
- ✅ Responder al webhook

**Webhook URL**: `http://192.168.0.244:5678/webhook/agenda-obras`

### 2. Exportación Automática a Oracle NoSQL
**Trigger**: Se ejecuta cada hora automáticamente

**Acciones automáticas**:
- 📥 Obtener datos de la app
- 🗄️ Consultar PostgreSQL
- 🔀 Combinar todos los datos
- ☁️ Guardar en Oracle NoSQL
- 📧 Enviar notificación de exportación

## 📱 Integración con la App de Agenda

La app ya está configurada para enviar webhooks a n8n automáticamente cuando:

- ✅ Creas un nuevo proyecto
- ✅ Creas una nueva tarea
- ✅ Agregas nuevo personal
- ✅ Actualizas cualquier dato

Los webhooks se envían a: `http://192.168.0.244:5678/webhook/agenda-obras`

## 🛠️ Gestión de Servicios Docker

### Verificar estado de los contenedores:
```bash
docker-compose ps
```

### Ver logs en tiempo real:
```bash
docker-compose logs -f
```

### Detener todos los servicios:
```bash
docker-compose down
```

### Reiniciar servicios:
```bash
docker-compose restart
```

### Actualizar n8n a la última versión:
```bash
docker-compose pull
docker-compose up -d
```

## 🔗 URLs de Acceso

- **n8n**: http://localhost:5678
- **n8n (desde móvil)**: http://192.168.0.244:5678
- **App Agenda**: http://192.168.0.244:8000

## ⚙️ Configuración Avanzada

### Cambiar contraseñas por defecto:
Edita `docker-compose.yml` y cambia:
- `N8N_BASIC_AUTH_PASSWORD`
- `POSTGRES_PASSWORD`

### Acceso desde internet:
Para acceder a n8n desde la calle:
1. Configura Tailscale (ver `GUIA-ACCESO-REMOTO.md`)
2. Usa la IP de Tailscale en lugar de localhost
3. Actualiza `N8N_HOST` y `WEBHOOK_TUNNEL_URL`

### Base de datos PostgreSQL:
Puedes acceder directamente a PostgreSQL:
```bash
docker exec -it agenda-obras-db psql -U agenda_user -d agenda_obras
```

## 🐛 Solución de Problemas

### n8n no inicia:
```bash
# Ver logs
docker-compose logs n8n

# Reiniciar contenedor
docker-compose restart n8n
```

### Webhooks no funcionan:
- Verifica que n8n esté accesible: `http://192.168.0.244:5678`
- Revisa los logs de n8n para errores
- Verifica la configuración de firewall

### PostgreSQL no responde:
```bash
# Verificar estado
docker-compose ps postgres

# Reiniciar
docker-compose restart postgres
```

## 📊 Monitoreo

n8n incluye un panel de ejecuciones donde puedes:
- Ver historial de ejecuciones de workflows
- Debuggear problemas
- Ver tiempos de ejecución
- Revisar datos procesados

## 🔒 Seguridad

- Cambia las contraseñas por defecto
- Usa HTTPS en producción
- Configura firewall appropriately
- Mantén Docker actualizado
- Usa credenciales seguras para servicios externos

## 📈 Escalado

Para mayor rendimiento:
- Aumenta recursos en `docker-compose.yml`
- Configura Redis para caché
- Considera n8n Enterprise para producción

## 🎯 Próximos Pasos

1. ✅ Instalar Docker Desktop
2. ✅ Ejecutar `instalar-n8n.bat`
3. ✅ Configurar credenciales en n8n
4. ✅ Importar workflows
5. ✅ Probar creando una tarea en la app
6. ✅ Verificar notificaciones automáticas

¡Tu sistema de automatización estará completamente funcional!