import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dirección',
    content: 'Calle 107 Ciudad Jardin',
    color: '#0097b2'
  },
  {
    icon: Phone,
    title: 'Teléfono',
    content: '+57 310 415 1521 ',
    color: '#ff87cf'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'graphikartcali@gmail.com',
    color: '#ff8f4b'
  },
  {
    icon: Clock,
    title: 'Horario',
    content: 'Lun-Vie: 9am-5 pm',
    color: '#7ab93d'
  }
];

const projectTypes = [
  'Tarjetas de Presentación',
  'Flyers y Volantes',
  'Fotografías',
  'Posters y Banners',
  'Calendarios',
  'Productos Promocionales',
  'Papelería Corporativa',
  'Decoración',
  'Otro'
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Mensaje enviado exitosamente. Te contactaremos pronto!');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-brand-orange-light/50 rounded-full text-sm font-medium text-brand-orange-dark mb-4">
            Contáctanos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Estamos aquí para{' '}
            <span className="text-gradient">ayudarte</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas o necesitas una cotización personalizada? 
            Escríbenos y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-brand-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Gracias por contactarnos. Te responderemos en menos de 24 horas.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: '',
                        message: ''
                      });
                    }}
                    variant="outline"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nombre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Tipo de Proyecto</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleChange('projectType', value)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Mensaje <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="rounded-xl min-h-[150px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar Mensaje
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: info.color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              );
            })}

            {/* Map Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-brand-primary-light to-brand-pink-light rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center p-6">
                <MapPin className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Av. Principal 123</p>
                <p className="text-gray-500 text-sm">Ciudad, País</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
