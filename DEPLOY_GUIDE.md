# 🚀 Guía de Despliegue - ColorBox

## OPCIÓN 1: Vercel (Recomendado - Gratuito)

Vercel es la plataforma ideal para proyectos React/Next.js. Ofrece:
- ✅ Despliegue gratuito ilimitado
- ✅ CDN global rápido
- ✅ SSL automático (HTTPS)
- ✅ Dominio personalizado gratuito (*.vercel.app)
- ✅ Previews automáticos en cada push

### 📋 Requisitos
- Cuenta en GitHub, GitLab o Bitbucket
- Cuenta gratuita en [vercel.com](https://vercel.com)

### 🔧 Pasos para desplegar

#### 1. Subir código a GitHub

```bash
# En tu computadora local, dentro de la carpeta del proyecto
cd /ruta/al/proyecto/colorbox

# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit - ColorBox website"

# Crear repositorio en GitHub (desde la web)
# Luego conectar tu repositorio local:
git remote add origin https://github.com/TU_USUARIO/colorbox.git
git branch -M main
git push -u origin main
```

#### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Haz clic en **"Add New Project"**
3. Selecciona tu repositorio `colorbox`
4. Vercel detectará automáticamente que es un proyecto Vite/React
5. Configuración recomendada:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Haz clic en **"Deploy"**

#### 3. Configurar dominio personalizado (Opcional)

1. En el dashboard de Vercel, selecciona tu proyecto
2. Ve a **"Settings"** → **"Domains"**
3. Ingresa tu dominio: `colorbox.com`
4. Sigue las instrucciones para configurar los DNS en GoDaddy (ver sección de GoDaddy abajo)

---

## OPCIÓN 2: GoDaddy (Hosting Tradicional)

GoDaddy es ideal si ya tienes tu dominio comprado allí y prefieres hosting compartido.

### 📋 Requisitos
- Cuenta en GoDaddy
- Plan de hosting (Economy, Deluxe o Ultimate)
- Dominio registrado

### 🔧 Pasos para desplegar

#### 1. Comprar hosting en GoDaddy

1. Ve a [godaddy.com](https://godaddy.com)
2. Compra un plan de **Web Hosting Linux** (cPanel)
3. Durante la compra, vincula tu dominio `colorbox.com`

#### 2. Preparar archivos para subir

Los archivos ya están listos en la carpeta `dist/`. Necesitas:

```bash
# Los archivos a subir están en:
/mnt/okcomputer/output/app/dist/

# Archivos principales:
# - index.html
# - assets/ (carpeta con JS y CSS)
```

#### 3. Subir archivos vía FTP

**Opción A: FileZilla (Recomendado)**

1. Descarga e instala [FileZilla](https://filezilla-project.org/)
2. Obtén tus credenciales FTP de GoDaddy:
   - Ve a **"My Products"** → **"Web Hosting"** → **"Manage"**
   - Busca **"FTP Users"** y crea uno si no existe
3. Conecta en FileZilla:
   - **Host:** `ftp.colorbox.com` (o la IP del servidor)
   - **Username:** tu usuario FTP
   - **Password:** tu contraseña FTP
   - **Port:** `21`
4. Navega a la carpeta `public_html/` en el servidor
5. **Elimina** el archivo `index.html` existente (si hay uno)
6. **Sube** todos los archivos de la carpeta `dist/` a `public_html/`

**Opción B: cPanel File Manager**

1. Inicia sesión en tu cPanel de GoDaddy
2. Busca **"File Manager"** y ábrelo
3. Navega a `public_html/`
4. Elimina el archivo `index.html` existente
5. Haz clic en **"Upload"** y selecciona todos los archivos de `dist/`

#### 4. Configurar SSL (HTTPS)

1. En cPanel, busca **"SSL/TLS"**
2. Ve a **"Manage SSL Sites"**
3. Instala el certificado SSL gratuito de Let's Encrypt (si está disponible)
4. O compra un certificado SSL en GoDaddy

---

## 🔗 Configurar DNS para dominio personalizado

### Si usas Vercel + Dominio en GoDaddy:

1. Ve a [godaddy.com](https://godaddy.com) → **"My Products"** → **"DNS"**
2. Selecciona tu dominio `colorbox.com`
3. Edita los registros DNS:

**Para dominio raíz (colorbox.com):**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21
TTL: 600 segundos
```

**Para www (www.colorbox.com):**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 600 segundos
```

4. Guarda los cambios (puede tardar hasta 48 horas en propagarse)

---

## 📁 Estructura de archivos a desplegar

```
dist/
├── index.html              # Página principal
├── assets/
│   ├── index-XXXX.js       # JavaScript compilado
│   ├── index-XXXX.css      # CSS compilado
│   └── ...                 # Otros assets
└── images/                 # Imágenes (si las agregas)
```

---

## 🔄 Actualizar el sitio después de cambios

### Para Vercel:
```bash
# Hacer cambios en el código
git add .
git commit -m "Nuevos cambios"
git push origin main
# Vercel se actualiza automáticamente!
```

### Para GoDaddy:
```bash
# Reconstruir el proyecto
npm run build
# Subir nuevamente los archivos de dist/ vía FTP
```

---

## ⚙️ Configuración recomendada para producción

### Variables de entorno (si necesitas)

Crea un archivo `.env` en la raíz:

```env
# Para servicio de email real (SendGrid, Resend, etc.)
VITE_EMAIL_API_KEY=tu_api_key
VITE_EMAIL_FROM=hola@colorbox.com
VITE_EMAIL_TO=cotizaciones@colorbox.com
```

### Configurar email real para cotizaciones

El sitio actual simula el envío de emails. Para emails reales, necesitas:

**Opción 1: EmailJS (Gratuito)**
1. Crea cuenta en [emailjs.com](https://emailjs.com)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Instala EmailJS en el proyecto:
   ```bash
   npm install @emailjs/browser
   ```

**Opción 2: Formspree (Gratuito)**
1. Crea cuenta en [formspree.io](https://formspree.io)
2. Obtén tu endpoint único
3. Configura el formulario para enviar a ese endpoint

**Opción 3: Backend propio**
- Node.js + Nodemailer
- PHP + mail()
- Python + smtplib

---

## 🛠️ Solución de problemas comunes

### Error 404 al recargar página (Vercel)
El archivo `vercel.json` ya está configurado para manejar esto.

### Error 404 al recargar página (GoDaddy)
Crea un archivo `.htaccess` en `public_html/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### CSS no carga correctamente
Verifica que los archivos en `dist/assets/` se subieron correctamente.

### Imágenes no aparecen
Asegúrate de que las imágenes estén en la carpeta `public/` y se copien a `dist/`.

---

## 📞 Soporte

- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **GoDaddy:** [godaddy.com/help](https://godaddy.com/help)

---

## 💰 Comparativa de costos

| Plataforma | Hosting | SSL | CDN | Precio mensual |
|------------|---------|-----|-----|----------------|
| **Vercel** | Gratis | Gratis | Global | $0 |
| **GoDaddy Economy** | Sí | $6.99/año | USA | ~$5.99/mes |
| **GoDaddy Deluxe** | Sí | Incluido | USA | ~$7.99/mes |

**Recomendación:** Usa Vercel para el hosting + GoDaddy solo para el dominio.
