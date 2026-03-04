// Sistema de cotizaciones automatizado

import type { Product } from './products';
import { formats, paperTypes } from './products';

// Estado de una cotización
export interface QuoteItem {
  productId: string;
  productName: string;
  formatId: string;
  formatName: string;
  paperId?: string;
  paperName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  turnaroundTime: string;
}

export interface Quote {
  id: string;
  date: Date;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  status: 'pending' | 'sent' | 'approved' | 'rejected';
}

// Opciones de cotización
export interface QuoteOptions {
  productId: string;
  formatId: string;
  paperId?: string;
  quantity: number;
}

// Calcular precio de un item
export function calculateItemPrice(
  product: Product,
  formatId: string,
  paperId: string | undefined,
  quantity: number
): { unitPrice: number; subtotal: number } {
  // Obtener formato
  const format = formats.find(f => f.id === formatId);
  if (!format) {
    throw new Error('Formato no válido');
  }

  // Calcular factor de formato (tamaño relativo)
  const formatArea = (format.width * format.height) / 100; // en cm²
  let formatMultiplier = 1;
  
  // Ajustar multiplicador según tamaño
  if (formatArea < 50) formatMultiplier = 0.5;
  else if (formatArea < 100) formatMultiplier = 0.8;
  else if (formatArea < 300) formatMultiplier = 1;
  else if (formatArea < 600) formatMultiplier = 1.5;
  else if (formatArea < 1000) formatMultiplier = 2;
  else formatMultiplier = 3;

  // Obtener tipo de papel y su multiplicador
  let paperMultiplier = 1;
  if (paperId) {
    const paper = paperTypes.find(p => p.id === paperId);
    if (paper) {
      paperMultiplier = paper.priceMultiplier;
    }
  }

  // Calcular precio base unitario
  let baseUnitPrice = product.basePrice;
  
  // Aplicar multiplicadores
  let unitPrice = baseUnitPrice * formatMultiplier * paperMultiplier;

  // Aplicar descuentos por volumen
  let volumeDiscount = 0;
  if (quantity >= 1000) volumeDiscount = 0.25;
  else if (quantity >= 500) volumeDiscount = 0.20;
  else if (quantity >= 250) volumeDiscount = 0.15;
  else if (quantity >= 100) volumeDiscount = 0.10;
  else if (quantity >= 50) volumeDiscount = 0.05;

  unitPrice = unitPrice * (1 - volumeDiscount);

  // Calcular subtotal
  let subtotal = unitPrice * quantity;

  // Redondear a 2 decimales
  unitPrice = Math.round(unitPrice * 100) / 100;
  subtotal = Math.round(subtotal * 100) / 100;

  return { unitPrice, subtotal };
}

// Calcular totales de cotización
export function calculateQuoteTotals(items: QuoteItem[]): { subtotal: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = Math.round(subtotal * 0.16 * 100) / 100; // 16% IVA
  const total = Math.round((subtotal + tax) * 100) / 100;

  return { subtotal, tax, total };
}

// Crear una cotización completa
export function createQuote(
  customerInfo: Quote['customerInfo'],
  items: QuoteItem[],
  notes?: string
): Quote {
  const { subtotal, tax, total } = calculateQuoteTotals(items);

  return {
    id: generateQuoteId(),
    date: new Date(),
    customerInfo,
    items,
    subtotal,
    tax,
    total,
    notes,
    status: 'pending'
  };
}

// Generar ID único para cotización
function generateQuoteId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `COT-${timestamp}-${random}`;
}

// Formatear precio en moneda
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(price);
}

// Formatear fecha
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Generar HTML del email de cotización
export function generateQuoteEmailHTML(quote: Quote): string {
  const itemsHTML = quote.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 12px; text-align: left;">
        <strong>${item.productName}</strong><br>
        <small style="color: #666;">${item.formatName}${item.paperName ? ` - ${item.paperName}` : ''}</small>
      </td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">${formatPrice(item.unitPrice)}</td>
      <td style="padding: 12px; text-align: right;"><strong>${formatPrice(item.subtotal)}</strong></td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización ${quote.id}</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0097b2, #8e5db7); padding: 40px 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">ColorBox</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Impresión y Diseño Gráfico</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 24px;">Cotización #${quote.id}</h2>
        <p style="color: #7f8c8d; margin: 0 0 30px 0; font-size: 14px;">Fecha: ${formatDate(quote.date)}</p>
        
        <!-- Customer Info -->
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Información del Cliente</h3>
          <p style="margin: 5px 0; color: #555;"><strong>Nombre:</strong> ${quote.customerInfo.name}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${quote.customerInfo.email}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Teléfono:</strong> ${quote.customerInfo.phone}</p>
          ${quote.customerInfo.company ? `<p style="margin: 5px 0; color: #555;"><strong>Empresa:</strong> ${quote.customerInfo.company}</p>` : ''}
        </div>
        
        <!-- Items Table -->
        <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Detalle de Productos</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; font-size: 14px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px; text-align: left; color: #2c3e50; font-weight: 600;">Producto</th>
              <th style="padding: 12px; text-align: center; color: #2c3e50; font-weight: 600;">Cant.</th>
              <th style="padding: 12px; text-align: right; color: #2c3e50; font-weight: 600;">P. Unit.</th>
              <th style="padding: 12px; text-align: right; color: #2c3e50; font-weight: 600;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <!-- Totals -->
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #555;">Subtotal:</td>
              <td style="padding: 8px 0; text-align: right; color: #555;">${formatPrice(quote.subtotal)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;">IVA (16%):</td>
              <td style="padding: 8px 0; text-align: right; color: #555;">${formatPrice(quote.tax)}</td>
            </tr>
            <tr style="border-top: 2px solid #0097b2;">
              <td style="padding: 12px 0; color: #2c3e50; font-weight: 700; font-size: 18px;">TOTAL:</td>
              <td style="padding: 12px 0; text-align: right; color: #0097b2; font-weight: 700; font-size: 18px;">${formatPrice(quote.total)}</td>
            </tr>
          </table>
        </div>
        
        ${quote.notes ? `
        <div style="background-color: #fff3cd; border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #ffc107;">
          <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">Notas Adicionales</h3>
          <p style="margin: 0; color: #856404; font-size: 14px;">${quote.notes}</p>
        </div>
        ` : ''}
        
        <!-- CTA -->
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="mailto:hola@colorbox.com?subject=Confirmar Cotización ${quote.id}" style="display: inline-block; background: linear-gradient(135deg, #0097b2, #8e5db7); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: 600; font-size: 16px;">Confirmar Cotización</a>
        </div>
        
        <!-- Info -->
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
          <p style="color: #7f8c8d; font-size: 13px; margin: 0 0 10px 0;">Esta cotización tiene una validez de 30 días.</p>
          <p style="color: #7f8c8d; font-size: 13px; margin: 0;">¿Tienes preguntas? Contáctanos: <a href="mailto:hola@colorbox.com" style="color: #0097b2;">hola@colorbox.com</a></p>
        </div>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #2c3e50; padding: 30px; text-align: center;">
        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">© 2024 ColorBox. Todos los derechos reservados.</p>
        <p style="color: rgba(255,255,255,0.5); margin: 10px 0 0 0; font-size: 12px;">Av. Principal 123, Ciudad | +1 234 567 890</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Generar texto plano del email (para clientes que no soportan HTML)
export function generateQuoteEmailText(quote: Quote): string {
  const itemsText = quote.items.map(item => `
${item.productName}
- Formato: ${item.formatName}${item.paperName ? ` - Papel: ${item.paperName}` : ''}
- Cantidad: ${item.quantity}
- Precio unitario: ${formatPrice(item.unitPrice)}
- Subtotal: ${formatPrice(item.subtotal)}
`).join('\n');

  return `
COTIZACIÓN #${quote.id}
ColorBox - Impresión y Diseño Gráfico
=====================================

Fecha: ${formatDate(quote.date)}

INFORMACIÓN DEL CLIENTE
-----------------------
Nombre: ${quote.customerInfo.name}
Email: ${quote.customerInfo.email}
Teléfono: ${quote.customerInfo.phone}
${quote.customerInfo.company ? `Empresa: ${quote.customerInfo.company}` : ''}

DETALLE DE PRODUCTOS
--------------------
${itemsText}

RESUMEN
-------
Subtotal: ${formatPrice(quote.subtotal)}
IVA (16%): ${formatPrice(quote.tax)}
TOTAL: ${formatPrice(quote.total)}

${quote.notes ? `NOTAS ADICIONALES:\n${quote.notes}\n` : ''}
Esta cotización tiene una validez de 30 días.

Para confirmar tu cotización, responde a este email o contáctanos:
Email: hola@colorbox.com
Teléfono: +1 234 567 890

© 2024 ColorBox. Todos los derechos reservados.
`;
}

// Simular envío de cotización por email
export async function sendQuoteEmail(quote: Quote): Promise<{ success: boolean; message: string }> {
  // En un entorno real, aquí se conectaría con un servicio de email
  // Por ahora, simulamos el envío
  
  console.log('Enviando cotización:', quote.id);
  console.log('Para:', quote.customerInfo.email);
  console.log('HTML:', generateQuoteEmailHTML(quote));
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simular éxito (en producción, manejar errores reales)
  return {
    success: true,
    message: `Cotización ${quote.id} enviada exitosamente a ${quote.customerInfo.email}`
  };
}

// Guardar cotización en localStorage (para persistencia)
export function saveQuoteToStorage(quote: Quote): void {
  const quotes = getQuotesFromStorage();
  quotes.push(quote);
  localStorage.setItem('colorbox_quotes', JSON.stringify(quotes));
}

// Obtener cotizaciones guardadas
export function getQuotesFromStorage(): Quote[] {
  const stored = localStorage.getItem('colorbox_quotes');
  if (stored) {
    try {
      return JSON.parse(stored).map((q: Quote) => ({
        ...q,
        date: new Date(q.date)
      }));
    } catch {
      return [];
    }
  }
  return [];
}

// Obtener una cotización por ID
export function getQuoteById(id: string): Quote | undefined {
  const quotes = getQuotesFromStorage();
  return quotes.find(q => q.id === id);
}
