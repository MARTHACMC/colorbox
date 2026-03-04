import { useState } from 'react';
import { Trash2, Send, Plus, ShoppingCart, CheckCircle, Mail, User, Phone, Building, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuote } from '@/context/QuoteContext';
import type { Quote } from '@/data/quote';
import { formatPrice, formatDate } from '@/data/quote';
import { toast } from 'sonner';

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMore: () => void;
}

export default function QuoteDialog({ open, onOpenChange, onAddMore }: QuoteDialogProps) {
  const { quoteItems, removeItem, createAndSendQuote, isLoading } = useQuote();
  const [step, setStep] = useState<'items' | 'form' | 'success'>('items');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [notes, setNotes] = useState('');
  const [sentQuote, setSentQuote] = useState<Quote | null>(null);

  const handleRemoveItem = (index: number) => {
    removeItem(index);
    if (quoteItems.length <= 1) {
      setStep('items');
    }
  };

  const calculateTotals = () => {
    const subtotal = quoteItems.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = Math.round(subtotal * 0.16 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    return { subtotal, tax, total };
  };

  const handleSubmit = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const result = await createAndSendQuote(customerInfo, notes);
    
    if (result.success) {
      // Get the last created quote from storage
      const quotes = JSON.parse(localStorage.getItem('colorbox_quotes') || '[]');
      const lastQuote = quotes[quotes.length - 1];
      if (lastQuote) {
        setSentQuote({
          ...lastQuote,
          date: new Date(lastQuote.date)
        });
      }
      setStep('success');
    } else {
      toast.error(result.message);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('items');
      setCustomerInfo({ name: '', email: '', phone: '', company: '' });
      setNotes('');
      setSentQuote(null);
    }, 300);
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {step === 'items' && (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                Tu Cotización
              </DialogTitle>
            </DialogHeader>

            <div className="p-6">
              {quoteItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tu cotización está vacía
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Agrega productos para comenzar tu cotización
                  </p>
                  <Button onClick={onAddMore} className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Productos
                  </Button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-4 mb-6">
                    {quoteItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-2xl font-bold text-brand-primary">
                            {item.productName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.formatName}
                            {item.paperName && ` · ${item.paperName}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(item.subtotal)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>IVA (16%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                        <span>Total</span>
                        <span className="text-brand-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onAddMore}
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Más
                    </Button>
                    <Button
                      onClick={() => setStep('form')}
                      className="flex-1 btn-primary"
                    >
                      Continuar
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {step === 'form' && (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-green" />
                </div>
                Tus Datos
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">
                  {quoteItems.length} producto(s) en tu cotización
                </p>
                <p className="text-xl font-bold text-brand-primary">
                  Total: {formatPrice(total)}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="w-4 h-4 inline mr-1" />
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    <Building className="w-4 h-4 inline mr-1" />
                    Empresa (opcional)
                  </Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa"
                    value={customerInfo.company}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Notas adicionales (opcional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Algún requerimiento especial..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('items')}
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar Cotización
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && sentQuote && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Cotización Enviada!
            </h3>
            <p className="text-gray-600 mb-6">
              Hemos enviado tu cotización a <strong>{sentQuote.customerInfo.email}</strong>
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-gray-600">Número de cotización:</span>
                <span className="font-mono font-semibold">{sentQuote.id}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-gray-600">Fecha:</span>
                <span>{formatDate(sentQuote.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-brand-primary">
                  {formatPrice(sentQuote.total)}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Te contactaremos en menos de 24 horas para confirmar los detalles.
            </p>

            <Button onClick={handleClose} className="btn-primary">
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
