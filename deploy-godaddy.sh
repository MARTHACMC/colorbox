#!/bin/bash
# Script de despliegue para GoDaddy
# Uso: ./deploy-godaddy.sh

echo "🚀 Desplegando ColorBox en GoDaddy..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que existe la carpeta dist
if [ ! -d "app/dist" ]; then
    echo -e "${RED}❌ Error: No se encontró la carpeta app/dist/${NC}"
    echo "Ejecuta primero: cd app && npm run build"
    exit 1
fi

echo -e "${BLUE}📦 Archivos listos para subir:${NC}"
echo ""
ls -la app/dist/
echo ""

# Crear ZIP para subida fácil
echo -e "${YELLOW}📦 Creando archivo ZIP para subida fácil...${NC}"
cd app/dist
zip -r ../../colorbox-deploy.zip . -x "*.DS_Store"
cd ../..

echo ""
echo -e "${GREEN}✅ Archivo creado: colorbox-deploy.zip${NC}"
echo ""

echo -e "${BLUE}📋 Instrucciones para subir a GoDaddy:${NC}"
echo ""
echo "1. Ve a tu cPanel de GoDaddy"
echo "2. Abre 'File Manager'"
echo "3. Navega a public_html/"
echo "4. Elimina todos los archivos existentes"
echo "5. Haz clic en 'Upload' y selecciona colorbox-deploy.zip"
echo "6. Extrae el ZIP en public_html/"
echo "7. ¡Listo!"
echo ""
echo -e "${YELLOW}🔗 O usa FTP con estos datos:${NC}"
echo "   Servidor: ftp.tudominio.com"
echo "   Usuario: (tu usuario FTP de GoDaddy)"
echo "   Contraseña: (tu contraseña FTP)"
echo "   Puerto: 21"
echo "   Carpeta remota: /public_html/"
echo ""
echo -e "${GREEN}✨ El sitio estará disponible en: https://colorbox.com${NC}"
