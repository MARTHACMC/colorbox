import { useState } from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { categories, getVisibleCategories, defaultVisibilityConfig, type Product } from '@/data/products';
import { formats, paperTypes } from '@/data/products';
import { useQuote } from '@/context/QuoteContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { formatPrice } from '@/data/quote';

interface ProductsProps {
  onOpenQuote: () => void;
}

interface Format {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: string;
}

interface PaperType {
  id: string;
  name: string;
  priceMultiplier: number;
}

export default function Products({ onOpenQuote }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const { addItem, quoteItems } = useQuote();

  // Quote form state
  const [formatId, setFormatId] = useState('');
  const [paperId, setPaperId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [previewPrice, setPreviewPrice] = useState<number | null>(null);

  const visibleCategories = getVisibleCategories(defaultVisibilityConfig);

  const getFormatsForProduct = (product: Product): Format[] => {
    return formats.filter(f => product.availableFormats.includes(f.id));
  };

  const getPaperTypesForProduct = (product: Product): PaperType[] => {
    return paperTypes.filter(p => product.availablePapers.includes(p.id));
  };

  const calculateItemPrice = (product: Product, fmtId: string, pprId: string | undefined, qty: number): number => {
    const format = formats.find(f => f.id === fmtId);
    const formatArea = (format?.width || 100) * (format?.height || 100) / 100;
    
    let formatMultiplier = 1;
    if (formatArea < 50) formatMultiplier = 0.5;
    else if (formatArea < 100) formatMultiplier = 0.8;
    else if (formatArea < 300) formatMultiplier = 1;
    else if (formatArea < 600) formatMultiplier = 1.5;
    else if (formatArea < 1000) formatMultiplier = 2;
    else formatMultiplier = 3;

    const paper = pprId ? paperTypes.find(p => p.id === pprId) : undefined;
    const paperMultiplier = paper?.priceMultiplier || 1;

    let unitPrice = product.basePrice * formatMultiplier * paperMultiplier;

    let volumeDiscount = 0;
    if (qty >= 1000) volumeDiscount = 0.25;
    else if (qty >= 500) volumeDiscount = 0.20;
    else if (qty >= 250) volumeDiscount = 0.15;
    else if (qty >= 100) volumeDiscount = 0.10;
    else if (qty >= 50) volumeDiscount = 0.05;

    unitPrice = unitPrice * (1 - volumeDiscount);
    return Math.round(unitPrice * qty * 100) / 100;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowQuoteDialog(true);
    const availableFormats = getFormatsForProduct(product);
    const availablePapers = getPaperTypesForProduct(product);
    setFormatId(availableFormats[0]?.id || '');
    setPaperId(availablePapers[0]?.id || '');
    setQuantity(product.minQuantity);
    updatePreviewPrice(product, availableFormats[0]?.id || '', availablePapers[0]?.id || '', product.minQuantity);
  };

  const updatePreviewPrice = (product: Product, fmtId: string, pprId: string | undefined, qty: number) => {
    if (!fmtId) {
      setPreviewPrice(null);
      return;
    }
    const price = calculateItemPrice(product, fmtId, pprId, qty);
    setPreviewPrice(price);
  };

  const handleAddToQuote = () => {
    if (!selectedProduct || !formatId) return;

    addItem({
      productId: selectedProduct.id,
      formatId,
      paperId: paperId || undefined,
      quantity
    });

    toast.success(`${selectedProduct.name} agregado a la cotización`);
    setShowQuoteDialog(false);
    setSelectedProduct(null);
  };

  const filteredCategories = selectedCategory
    ? visibleCategories.filter(c => c.id === selectedCategory)
    : visibleCategories;

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-brand-primary-light/50 rounded-full text-sm font-medium text-brand-primary-dark mb-4">
            Nuestros Productos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Soluciones de impresión para{' '}
            <span className="text-gradient">cada necesidad</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desde papelería corporativa hasta productos promocionales, 
            tenemos todo lo que necesitas para hacer crecer tu marca.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'gradient-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : undefined
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-4 mb-8">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span 
                    className="text-xl font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-gray-500">{category.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer card-hover"
                  >
                    {/* Product Image Placeholder */}
                    <div 
                      className="aspect-[4/3] relative overflow-hidden"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundColor: `${category.color}30` }}
                        >
                          <span 
                            className="text-3xl font-bold"
                            style={{ color: category.color }}
                          >
                            {product.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium flex items-center gap-2">
                          Agregar a cotización
                          <Plus className="w-4 h-4" />
                        </span>
                      </div>

                      {/* In Quote Badge */}
                      {quoteItems.some(item => item.productId === product.id) && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          Desde {formatPrice(product.basePrice)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View Quote Button */}
        {quoteItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              onClick={onOpenQuote}
              size="lg"
              className="btn-primary shadow-xl rounded-full px-6"
            >
              Ver Cotización ({quoteItems.length})
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Agregar a Cotización
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6 py-4">
              {/* Product Info */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${categories.find(c => c.id === selectedProduct.categoryId)?.color}20` }}
                >
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: categories.find(c => c.id === selectedProduct.categoryId)?.color }}
                  >
                    {selectedProduct.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{selectedProduct.description}</p>
                </div>
              </div>

              {/* Format Selection */}
              <div className="space-y-2">
                <Label>Formato *</Label>
                <Select 
                  value={formatId} 
                  onValueChange={(value) => {
                    setFormatId(value);
                    updatePreviewPrice(selectedProduct, value, paperId, quantity);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un formato" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFormatsForProduct(selectedProduct).map((fmt: Format) => (
                      <SelectItem key={fmt.id} value={fmt.id}>
                        {fmt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Paper Selection */}
              {selectedProduct.availablePapers.length > 0 && (
                <div className="space-y-2">
                  <Label>Tipo de Papel</Label>
                  <Select 
                    value={paperId} 
                    onValueChange={(value) => {
                      setPaperId(value);
                      updatePreviewPrice(selectedProduct, formatId, value, quantity);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de papel" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPaperTypesForProduct(selectedProduct).map((paper: PaperType) => (
                        <SelectItem key={paper.id} value={paper.id}>
                          {paper.name} (+{Math.round((paper.priceMultiplier - 1) * 100)}%)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-2">
                <Label>Cantidad *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min={selectedProduct.minQuantity}
                    max={selectedProduct.maxQuantity}
                    value={quantity}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value) || selectedProduct.minQuantity;
                      const validQty = Math.max(selectedProduct.minQuantity, Math.min(selectedProduct.maxQuantity, qty));
                      setQuantity(validQty);
                      updatePreviewPrice(selectedProduct, formatId, paperId, validQty);
                    }}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Min: {selectedProduct.minQuantity}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">Características</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-brand-primary-light/50 text-brand-primary-dark text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Preview */}
              {previewPrice !== null && (
                <div className="p-4 bg-gradient-to-r from-brand-primary-light/30 to-brand-pink-light/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal estimado:</span>
                    <span className="text-2xl font-bold text-brand-primary">
                      {formatPrice(previewPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    * Precio sin IVA. El precio final puede variar según especificaciones.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowQuoteDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddToQuote}
                  className="flex-1 btn-primary"
                  disabled={!formatId}
                >
                  Agregar a Cotización
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
