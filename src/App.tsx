import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { QuoteProvider } from '@/context/QuoteContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Products from '@/sections/Products';
import Services from '@/sections/Services';
import About from '@/sections/About';
import CTABanner from '@/sections/CTABanner';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import QuoteDialog from '@/sections/QuoteDialog';
import './App.css';

function App() {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  const handleNavigate = (section: string) => {
    // Navigation is handled by scroll behavior in each section
    console.log('Navigate to:', section);
  };

  const handleOpenQuote = () => {
    setQuoteDialogOpen(true);
  };

  return (
    <QuoteProvider>
      <div className="min-h-screen bg-white">
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              fontFamily: "'PT Sans', sans-serif",
            },
          }}
        />
        
        <Navigation 
          onNavigate={handleNavigate} 
          onOpenQuote={handleOpenQuote} 
        />
        
        <main>
          <Hero onOpenQuote={handleOpenQuote} />
          <Products onOpenQuote={handleOpenQuote} />
          <Services />
          <About />
          <CTABanner onOpenQuote={handleOpenQuote} />
          <Testimonials />
          <Contact />
        </main>
        
        <Footer />
        
        <QuoteDialog
          open={quoteDialogOpen}
          onOpenChange={setQuoteDialogOpen}
          onAddMore={() => {
            setQuoteDialogOpen(false);
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>
    </QuoteProvider>
  );
}

export default App;
