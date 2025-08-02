import { Shield, Clock, Award, Users, Plane, MapPin, Calendar, Headphones, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

const AboutSection = () => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const advantages = [
    { icon: Shield, title: t('about.advantages.safety.title'), description: t('about.advantages.safety.description') },
    { icon: Clock, title: t('about.advantages.flexibility.title'), description: t('about.advantages.flexibility.description') },
    { icon: Award, title: t('about.advantages.comfort.title'), description: t('about.advantages.comfort.description') },
    { icon: Users, title: t('about.advantages.efficiency.title'), description: t('about.advantages.efficiency.description') }
  ];

  return (
    <section id="sobre" className="section bg-white">
      <div className="max-w-7xl mx-auto">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-air-black mb-6">
              {t('about.title')}
              <span className="text-gradient block">{t('about.subtitle')}</span>
            </h2>
            <p className="text-lg text-air-gray-dark mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            <button 
              className="btn-outline group"
              onClick={() => setModalOpen(true)}
            >
              <span>{t('hero.learnMore')}</span>
              <Shield className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
          <div className="animate-slide-up">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop"
                alt="Modern aircraft interior"
                className="rounded-2xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -right-6 bg-air-red text-white p-6 rounded-2xl shadow-red">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm uppercase tracking-wide">{t('about.experience')}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-air-red to-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-red transition-all duration-300">
                <advantage.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-air-black mb-3">
                {advantage.title}
              </h3>
              <p className="text-air-gray-dark leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de Informações */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nossos Serviços e Contacto"
        size="xl"
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center bg-gradient-to-r from-air-red to-red-700 text-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-2">AIR TWO - Voos Particulares</h2>
            <p className="opacity-90">Experiência premium em voos particulares</p>
          </div>
          {/* Serviços */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Plane className="w-5 h-5 mr-2 text-air-red" />
              Nossos Serviços
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Voo Charter Executivo</h4>
                <p className="text-sm text-gray-600">Voos privados personalizados com flexibilidade total.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Gestão de Viagens</h4>
                <p className="text-sm text-gray-600">Serviço completo de planeamento e gestão.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Manutenção e Serviços</h4>
                <p className="text-sm text-gray-600">Serviços de manutenção e preparação VIP.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Suporte 24/7</h4>
                <p className="text-sm text-gray-600">Atendimento especializado disponível 24 horas.</p>
              </div>
            </div>
          </div>
          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-air-red" />
              Informações de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 mx-auto mb-2 text-air-red" />
                <h4 className="font-semibold">Telefone</h4>
                <p className="text-air-red">+351 213 456 789</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 mx-auto mb-2 text-air-red" />
                <h4 className="font-semibold">Email</h4>
                <p className="text-air-red">info@airtwo.pt</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-air-red" />
                <h4 className="font-semibold">Horário</h4>
                <p className="text-air-red">24/7</p>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="text-center bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">Pronto para Voar Conosco?</h3>
            <p className="text-gray-600 mb-4">Entre em contacto para uma cotação personalizada.</p>
            <button 
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 bg-air-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Solicitar Cotação
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default AboutSection;