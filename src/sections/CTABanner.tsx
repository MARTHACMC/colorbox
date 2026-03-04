import { ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTABannerProps {
  onOpenQuote: () => void;
}

export default function CTABanner({ onOpenQuote }: CTABannerProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 gradient-animated" />
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-pink/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-brand-yellow/20 rounded-full blur-xl" />
        
        {/* Floating circles */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full float" />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/20 rounded-full float-delay-1" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/40 rounded-full float-delay-2" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            ¿Tienes un proyecto en mente?
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Listo para imprimir tus ideas?
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Solicita una cotización gratuita y descubre cómo podemos ayudarte 
            a hacer realidad tu próximo proyecto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onOpenQuote}
              size="lg"
              className="bg-white text-brand-primary-dark hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              Cotizar Ahora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              Contáctanos
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>Respuesta en menos de 24 horas</span>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
