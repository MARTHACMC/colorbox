# 🚀 Despliegue de ColorBox

## ⚡ Opción Rápida: Vercel (Recomendado)

### 1. Crear cuenta y conectar GitHub
```bash
# 1. Ve a https://github.com/new y crea un repositorio llamado "colorbox"
# 2. Sube el código:
cd app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/MARTHACMC/colorbox.git
git push -u origin main
```

### 2. Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en **"Add New Project"**
4. Selecciona tu repositorio `colorbox`
5. Click en **"Deploy"** (Vercel detecta automáticamente Vite)
6. ¡Listo! Tu sitio estará en `https://colorbox.vercel.app`

### 3. Conectar tu dominio colorbox.com
1. En Vercel, ve a tu proyecto → **Settings** → **Domains**
2. Agrega `colorbox.com`
3. Vercel te dará instrucciones DNS para GoDaddy

---

## 🌐 Opción Alternativa: GoDaddy

### Método 1: Subida por ZIP (Más fácil)

1. **Descarga el archivo listo:**
   - Descarga: `colorbox-deploy.zip` de esta carpeta

2. **Sube a GoDaddy:**
   - Inicia sesión en [godaddy.com](https://godaddy.com)
   - Ve a **"My Products"** → **"Web Hosting"** → **"Manage"**
   - Abre **"File Manager"**
   - Navega a `public_html/`
   - Elimina todos los archivos existentes
   - Click en **"Upload"** y selecciona `colorbox-deploy.zip`
   - Extrae el ZIP

3. **Configurar dominio:**
   - Ve a **"DNS"** en GoDaddy
   - Asegúrate de que el dominio apunte a tu hosting

### Método 2: FTP con FileZilla

1. **Descarga FileZilla:** [filezilla-project.org](https://filezilla-project.org)

2. **Obtén credenciales FTP de GoDaddy:**
   - En cPanel, busca **"FTP Accounts"**
   - Crea una cuenta FTP o usa la existente

3. **Conecta FileZilla:**
   ```
   Host: ftp.colorbox.com (o la IP del servidor)
   Username: tu_usuario_ftp
   Password: tu_contraseña_ftp
   Port: 21
   ```

4. **Sube archivos:**
   - Local: `app/dist/`
   - Remoto: `/public_html/`
   - Arrastra todos los archivos de `dist/` a `public_html/`

---

## 📋 Configuración DNS en GoDaddy

### Si usas Vercel con dominio en GoDaddy:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

### Si usas GoDaddy Hosting:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | (IP de tu servidor GoDaddy) | 600 |
| CNAME | www | @ | 600 |

---

## 🔐 SSL/HTTPS

### En Vercel:
- SSL automático incluido ✅

### En GoDaddy:
1. Ve a cPanel → **"SSL/TLS"**
2. **"Manage SSL Sites"**
3. Instala certificado gratuito Let's Encrypt (si disponible)
4. O compra certificado SSL en GoDaddy

---

## 📧 Configurar Email de Cotizaciones

El sitio actual simula el envío de emails. Para emails reales:

### Opción 1: EmailJS (Gratuito - Recomendado)

1. Crea cuenta en [emailjs.com](https://emailjs.com)
2. Configura servicio Gmail/Outlook
3. Crea plantilla de email
4. Instala en el proyecto:
   ```bash
   cd app
   npm install @emailjs/browser
   ```
5. Modifica `src/context/QuoteContext.tsx` para usar EmailJS

### Opción 2: Formspree (Gratuito)

1. Crea cuenta en [formspree.io](https://formspree.io)
2. Obtén tu endpoint: `https://formspree.io/f/TU_FORM_ID`
3. Configura el formulario para enviar a ese endpoint

---

## 🔄 Actualizar el sitio

### Vercel (Automático):
```bash
cd app
# Hacer cambios
git add .
git commit -m "Nuevos cambios"
git push origin main
# ¡Vercel se actualiza solo!
```

### GoDaddy (Manual):
```bash
cd app
npm run build
# Sube nuevamente los archivos de dist/ por FTP o ZIP
```

---

## 🆘 Solución de problemas

### Error 404 al recargar página
- ✅ Ya está configurado en `.htaccess` para GoDaddy
- ✅ Ya está configurado en `vercel.json` para Vercel

### CSS no carga
- Verifica que los archivos en `dist/assets/` se subieron

### Imágenes no aparecen
- Coloca imágenes en `app/public/images/` antes de hacer build

---

## 💰 Costos

| Servicio | Costo mensual | Incluye |
|----------|---------------|---------|
| **Vercel** | $0 | Hosting, SSL, CDN global |
| **GoDaddy Dominio** | ~$12/año | Solo el dominio |
| **GoDaddy Hosting** | ~$6-8/mes | Hosting + email |

**Recomendación:** Vercel (gratis) + GoDaddy (solo dominio) = ~$12/año
