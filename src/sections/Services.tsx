import { useEffect, useRef, useState } from 'react';
import { 
  Palette, 
  Printer, 
  Layers, 
  Maximize2, 
  Sparkles, 
  Truck,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    id: 'diseno',
    icon: Palette,
    title: 'Diseño Gráfico',
    description: 'Nuestro equipo de diseñadores crea materiales visuales impactantes que comunican tu mensaje de manera efectiva.',
    features: ['Diseño de marca', 'Material publicitario', 'Ilustración personalizada'],
    color: '#ff87cf',
    delay: 0
  },
  {
    id: 'digital',
    icon: Printer,
    title: 'Impresión Digital',
    description: 'Ideal para tiradas cortas y personalizadas con entrega rápida sin comprometer la calidad.',
    features: ['Tiradas cortas', 'Personalización', 'Entrega express'],
    color: '#0097b2',
    delay: 100
  },
  {
    id: 'offset',
    icon: Layers,
    title: 'Impresión Offset',
    description: 'La mejor opción para grandes volúmenes con costos reducidos y calidad consistente.',
    features: ['Grandes volúmenes', 'Costo por unidad bajo', 'Colores vibrantes'],
    color: '#ff8f4b',
    delay: 200
  },
  {
    id: 'gran-formato',
    icon: Maximize2,
    title: 'Gran Formato',
    description: 'Banners, lonas, viniles y más para publicidad de impacto en exteriores e interiores.',
    features: ['Hasta 5 metros de ancho', 'Resistente UV', 'Instalación disponible'],
    color: '#7ab93d',
    delay: 300
  },
  {
    id: 'acabados',
    icon: Sparkles,
    title: 'Acabados Especiales',
    description: 'Barniz UV, laminado, troquelado, foil y otros acabados que elevan tus productos.',
    features: ['Barniz UV', 'Laminado mate/brillo', 'Troquelado personalizado'],
    color: '#8e5db7',
    delay: 400
  },
  {
    id: 'envio',
    icon: Truck,
    title: 'Envío a Domicilio',
    description: 'Entregamos tus pedidos donde los necesites, con opciones de envío express disponibles.',
    features: ['Cobertura nacional', 'Rastreo en línea', 'Envío express'],
    color: '#ffd034',
    delay: 500
  }
];

export default function Services() {
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
      id="services" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-brand-purple-light/50 rounded-full text-sm font-medium text-brand-purple-dark mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Soluciones completas para{' '}
            <span className="text-gradient">tu marca</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desde el diseño hasta la entrega, te acompañamos en cada paso 
            para asegurar resultados excepcionales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${service.delay}ms`,
                  transform: isVisible ? (isEven ? 'translateY(40px)' : 'translateY(0)') : 'translateY(40px)'
                }}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <Icon 
                    className="w-8 h-8 transition-colors duration-300"
                    style={{ color: service.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <button 
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: service.color }}
                >
                  Saber más
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                  style={{ backgroundColor: `${service.color}10` }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            ¿Necesitas un servicio personalizado?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline"
          >
            Contáctanos para más información
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
