import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapesRef.current) return;
      
      const shapes = shapesRef.current.querySelectorAll('.floating-shape');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      shapes.forEach((shape, index) => {
        const depth = (index + 1) * 0.02;
        const moveX = (clientX - centerX) * depth;
        const moveY = (clientY - centerY) * depth;
        (shape as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-brand-primary-light/20 to-brand-pink-light/20"
    >
      {/* Animated Background Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blue Circle */}
        <div className="floating-shape absolute top-20 left-[10%] w-32 h-32 bg-brand-primary/20 shape-circle float" />
        
        {/* Pink Blob */}
        <div className="floating-shape absolute top-40 right-[15%] w-48 h-48 bg-brand-pink/20 shape-blob float-delay-1" />
        
        {/* Orange Rectangle */}
        <div className="floating-shape absolute bottom-32 left-[20%] w-24 h-24 bg-brand-orange/20 rounded-2xl float-delay-2" />
        
        {/* Green Shape */}
        <div className="floating-shape absolute bottom-20 right-[25%] w-40 h-40 bg-brand-green/20 shape-rounded float-delay-3" />
        
        {/* Purple Circle */}
        <div className="floating-shape absolute top-1/3 left-[5%] w-16 h-16 bg-brand-purple/20 shape-circle float" />
        
        {/* Yellow Shape */}
        <div className="floating-shape absolute top-1/4 right-[8%] w-20 h-20 bg-brand-yellow/30 rounded-xl float-delay-2" />
        
        {/* Small decorative dots */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-brand-primary/40 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-brand-pink/40 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-brand-orange/30 rounded-full animate-pulse delay-500" />
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary-light/50 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary-dark">
                Más de 20 años de experiencia
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Impresión que da{' '}
              <span className="text-gradient">vida a tus ideas</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Calidad profesional con un toque de creatividad. Desde tarjetas de 
              presentación hasta grandes formatos, hacemos que tu marca brille.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onOpenQuote}
                size="lg"
                className="btn-primary text-lg group"
              >
                Cotizar Ahora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={scrollToProducts}
                variant="outline"
                size="lg"
                className="btn-secondary text-lg"
              >
                Ver Productos
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: '20+', label: 'Años de experiencia' },
                { value: '50K+', label: 'Clientes satisfechos' },
                { value: '100%', label: 'Calidad garantizada' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Product Preview */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Product Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-white rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-brand-primary-light to-brand-pink-light flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">C</span>
                    </div>
                    <p className="text-gray-700 font-medium">Tarjetas de Presentación</p>
                    <p className="text-sm text-gray-500 mt-2">Calidad Premium</p>
                  </div>
                </div>
              </div>
              
              {/* Secondary Card - Flyers */}
              <div className="absolute top-1/4 right-0 w-48 h-56 bg-white rounded-2xl shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand-orange-light to-brand-yellow-light flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-brand-orange flex items-center justify-center">
                      <span className="text-white text-xl font-bold">F</span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">Flyers</p>
                  </div>
                </div>
              </div>
              
              {/* Third Card - Photos */}
              <div className="absolute bottom-1/4 left-0 w-44 h-52 bg-white rounded-2xl shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand-green-light to-brand-primary-light flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-brand-green flex items-center justify-center">
                      <span className="text-white text-xl font-bold">P</span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">Fotos</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-10 right-10 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Entrega Rápida</p>
                  <p className="text-xs text-gray-500">24-48 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
