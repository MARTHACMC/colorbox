import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Directora de Marketing',
    company: 'TechSolutions SA',
    avatar: 'M',
    avatarColor: '#0097b2',
    content: 'Excelente calidad y servicio. Las tarjetas de presentación quedaron perfectas y la entrega fue súper rápida. Definitivamente seguiremos trabajando con ColorBox.',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    role: 'Emprendedor',
    company: 'Café Aroma',
    avatar: 'C',
    avatarColor: '#ff87cf',
    content: 'Rápidos y profesionales. Los flyers para la inauguración de mi café quedaron espectaculares. Me ayudaron con el diseño y todo el proceso fue muy sencillo.',
    rating: 5
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Organizadora de Eventos',
    company: 'Momentos Especiales',
    avatar: 'A',
    avatarColor: '#ff8f4b',
    content: 'Superaron mis expectativas. Los fotolibros que hicieron para mis clientes son simplemente hermosos. La calidad del papel y la impresión son impecables.',
    rating: 5
  },
  {
    id: 4,
    name: 'Pedro López',
    role: 'Gerente Comercial',
    company: 'Constructora del Norte',
    avatar: 'P',
    avatarColor: '#7ab93d',
    content: 'Mi proveedor de confianza para todo el material corporativo. Banners, tarjetas, papelería... siempre entregan a tiempo y con calidad superior.',
    rating: 5
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    role: 'Diseñadora Gráfica',
    company: 'Freelance',
    avatar: 'L',
    avatarColor: '#8e5db7',
    content: 'Recomendado al 100%. Como diseñadora, soy muy exigente con la calidad de impresión y ColorBox nunca me ha decepcionado. Sus acabados son excelentes.',
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-brand-yellow-light/50 rounded-full text-sm font-medium text-brand-yellow-dark mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen{' '}
            <span className="text-gradient">nuestros clientes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de clientes confían en nosotros para sus proyectos de impresión.
            Esto es lo que opinan.
          </p>
        </div>

        {/* Carousel */}
        <div 
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-brand-primary" />
          </div>

          {/* Cards Container */}
          <div className="relative h-[400px] sm:h-[350px] perspective-1000">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (currentIndex + 1) % testimonials.length;

              let transform = 'translateX(-50%) scale(0.8) rotateY(0deg)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(-50%) scale(1) rotateY(0deg)';
                opacity = 1;
                zIndex = 3;
              } else if (isPrev) {
                transform = 'translateX(-120%) scale(0.85) rotateY(25deg)';
                opacity = 0.5;
                zIndex = 2;
              } else if (isNext) {
                transform = 'translateX(20%) scale(0.85) rotateY(-25deg)';
                opacity = 0.5;
                zIndex = 2;
              }

              return (
                <div
                  key={testimonial.id}
                  className="absolute top-0 left-1/2 w-full max-w-2xl transition-all duration-500 ease-out"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-brand-yellow text-brand-yellow" 
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: testimonial.avatarColor }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-primary hover:shadow-xl transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-brand-primary'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-primary hover:shadow-xl transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
