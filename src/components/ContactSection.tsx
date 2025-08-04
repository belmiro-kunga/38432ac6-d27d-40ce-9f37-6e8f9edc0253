import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedButton } from '@/components/ui/EnhancedButton';
import { AnimatedSection } from '@/components/ui/InteractiveElements';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: ['Aeroporto Internacional 4 de Fevereiro', 'Luanda, Angola']
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: ['+244 923 456 789', '+244 912 345 678']
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: ['info@airtwo.ao', 'reservas@airtwo.ao']
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail deve ter formato válido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    } else if (formData.mensagem.length > 1000) {
      newErrors.mensagem = 'Mensagem deve ter no máximo 1000 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contacto consigo brevemente.",
      });
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
      });
      setErrors({});
      
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Real-time validation
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'nome':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        break;
      case 'email':
        if (!value.trim()) return 'E-mail é obrigatório';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido';
        break;
      case 'telefone':
        if (!value.trim()) return 'Telefone é obrigatório';
        if (!/^[\+]?[0-9\s\-\(\)]{9,}$/.test(value)) return 'Telefone inválido';
        break;
      case 'mensagem':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.length < 10) return 'Mensagem muito curta (mínimo 10 caracteres)';
        if (value.length > 1000) return 'Mensagem muito longa (máximo 1000 caracteres)';
        break;
    }
    return undefined;
  };

  return (
    <AnimatedSection id="contactos" className="section bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-air-black mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-air-gray-dark max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-air-black mb-8">
              Informações de Contacto
            </h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-air-red/10 text-air-red rounded-xl flex items-center justify-center">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-air-black mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-air-gray-dark">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-air-gray rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.3857157344845!2d13.230865!3d-8.858395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f24410000001%3A0x4a4b7b3b8b8b8b8b!2sQuatro%20de%20Fevereiro%20Airport!5e0!3m2!1sen!2sao!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-air-gray/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-air-black mb-8">
                Envie-nos uma Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-air-black mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleInputChange('nome', value);
                      // Real-time validation
                      const error = validateField('nome', value);
                      if (error !== errors.nome) {
                        setErrors(prev => ({ ...prev, nome: error }));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-air-red focus:border-air-red transition-all duration-300 ${
                      errors.nome ? 'border-red-500 ring-1 ring-red-500' : 'border-air-gray hover:border-air-red/50'
                    }`}
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nome}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-air-black mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-air-red focus:border-air-red transition-colors duration-300 ${
                      errors.email ? 'border-red-500' : 'border-air-gray'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-air-black mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-air-red focus:border-air-red transition-colors duration-300 ${
                      errors.telefone ? 'border-red-500' : 'border-air-gray'
                    }`}
                    placeholder="+244 xxx xxx xxx"
                  />
                  {errors.telefone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.telefone}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-air-black mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange('mensagem', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-air-red focus:border-air-red transition-colors duration-300 resize-none ${
                      errors.mensagem ? 'border-red-500' : 'border-air-gray'
                    }`}
                    placeholder="Como podemos ajudá-lo?"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.mensagem ? (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.mensagem}
                      </p>
                    ) : (
                      <div />
                    )}
                    <span className={`text-sm ${
                      formData.mensagem.length > 1000 ? 'text-red-500' : 'text-air-gray-dark'
                    }`}>
                      {formData.mensagem.length}/1000
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <EnhancedButton
                  type="submit"
                  loading={loading}
                  disabled={loading || Object.keys(errors).some(key => errors[key as keyof FormData])}
                  variant="premium"
                  size="lg"
                  className="w-full"
                  leftIcon={!loading && <Send className="w-5 h-5" />}
                >
                  Enviar Mensagem
                </EnhancedButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;