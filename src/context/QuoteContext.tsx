import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Quote, QuoteOptions, QuoteItem } from '@/data/quote';
import { createQuote, sendQuoteEmail, saveQuoteToStorage } from '@/data/quote';
import { getProductById, formats, paperTypes } from '@/data/products';

interface QuoteContextType {
  currentQuote: Quote | null;
  quoteItems: QuoteItem[];
  isLoading: boolean;
  addItem: (item: QuoteOptions) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  createAndSendQuote: (customerInfo: Quote['customerInfo'], notes?: string) => Promise<{ success: boolean; message: string }>;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = useCallback((options: QuoteOptions) => {
    const product = getProductById(options.productId);
    if (!product) return;

    const format = formats.find(f => f.id === options.formatId);
    const paper = options.paperId ? paperTypes.find(p => p.id === options.paperId) : undefined;

    // Calculate price
    const formatArea = (format?.width || 100) * (format?.height || 100) / 100;
    let formatMultiplier = 1;
    if (formatArea < 50) formatMultiplier = 0.5;
    else if (formatArea < 100) formatMultiplier = 0.8;
    else if (formatArea < 300) formatMultiplier = 1;
    else if (formatArea < 600) formatMultiplier = 1.5;
    else if (formatArea < 1000) formatMultiplier = 2;
    else formatMultiplier = 3;

    const paperMultiplier = paper?.priceMultiplier || 1;
    let unitPrice = product.basePrice * formatMultiplier * paperMultiplier;

    const quantity = options.quantity;
    let volumeDiscount = 0;
    if (quantity >= 1000) volumeDiscount = 0.25;
    else if (quantity >= 500) volumeDiscount = 0.20;
    else if (quantity >= 250) volumeDiscount = 0.15;
    else if (quantity >= 100) volumeDiscount = 0.10;
    else if (quantity >= 50) volumeDiscount = 0.05;

    unitPrice = unitPrice * (1 - volumeDiscount);
    const subtotal = Math.round(unitPrice * quantity * 100) / 100;
    unitPrice = Math.round(unitPrice * 100) / 100;

    const newItem: QuoteItem = {
      productId: product.id,
      productName: product.name,
      formatId: options.formatId,
      formatName: format?.name || options.formatId,
      paperId: paper?.id,
      paperName: paper?.name,
      quantity: options.quantity,
      unitPrice,
      subtotal,
      turnaroundTime: product.turnaroundTime
    };

    setQuoteItems(prev => [...prev, newItem]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setQuoteItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearItems = useCallback(() => {
    setQuoteItems([]);
    setCurrentQuote(null);
  }, []);

  const createAndSendQuote = useCallback(async (
    customerInfo: Quote['customerInfo'],
    notes?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (quoteItems.length === 0) {
      return { success: false, message: 'No hay productos en la cotización' };
    }

    setIsLoading(true);
    
    try {
      // Crear la cotización
      const quote = createQuote(customerInfo, quoteItems, notes);
      
      // Guardar en localStorage
      saveQuoteToStorage(quote);
      
      // Enviar email (simulado)
      const result = await sendQuoteEmail(quote);
      
      if (result.success) {
        setCurrentQuote(quote);
        setQuoteItems([]);
      }
      
      return result;
    } catch (error) {
      return { 
        success: false, 
        message: 'Error al procesar la cotización. Por favor intenta de nuevo.' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [quoteItems]);

  return (
    <QuoteContext.Provider value={{
      currentQuote,
      quoteItems,
      isLoading,
      addItem,
      removeItem,
      clearItems,
      createAndSendQuote
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote debe usarse dentro de un QuoteProvider');
  }
  return context;
}
