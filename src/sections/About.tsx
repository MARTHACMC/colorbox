import { useEffect, useRef, useState } from 'react';
import { Check, Award, Users, Clock, Zap } from 'lucide-react';

const features = [
  'Calidad garantizada en cada impresión',
  'Entrega rápida y puntual',
  'Atención personalizada',
  'Precios competitivos',
  'Tecnología de vanguardia',
  'Más de 20 años de experiencia'
];

const stats = [
  { icon: Award, value: '20+', label: 'Años de experiencia', color: '#0097b2' },
  { icon: Users, value: '50K+', label: 'Clientes satisfechos', color: '#ff87cf' },
  { icon: Clock, value: '24h', label: 'Entrega express', color: '#ff8f4b' },
  { icon: Zap, value: '100%', label: 'Satisfacción', color: '#7ab93d' }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-brand-green-light/50 rounded-full text-sm font-medium text-brand-green-dark mb-4">
              Sobre Nosotros
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Más de 20 años{' '}
              <span className="text-gradient">creando impresiones memorables</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              En ColorBox combinamos tecnología de vanguardia con un equipo apasionado 
              por el diseño. Cada proyecto es una oportunidad para superar expectativas 
              y crear algo extraordinario.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nuestra misión es simple: transformar tus ideas en productos impresos 
              de la más alta calidad. Ya sea que necesites tarjetas de presentación 
              elegantes, banners impactantes o fotolibros personalizados, estamos 
              aquí para hacerlo realidad.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Conoce Nuestra Historia
            </button>
          </div>

          {/* Right Content - Visual */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Main Image Card */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-primary-light to-brand-pink-light">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-xl">
                      <span className="text-white text-5xl font-bold">C</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">ColorBox</h3>
                    <p className="text-gray-600">Impresión & Diseño Gráfico</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-8 -left-8 right-8 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-2xl p-4 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                      }`}
                      style={{ transitionDelay: `${500 + index * 100}ms` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${stat.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Decorative Shapes */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange/20 shape-blob float" />
              <div className="absolute -bottom-4 right-1/4 w-16 h-16 bg-brand-green/20 shape-circle float-delay-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
