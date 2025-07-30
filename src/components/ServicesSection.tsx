import { Plane, MapPin, Calendar, Headphones } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Plane,
      title: 'Voos Charter',
      description: 'Voos personalizados para destinos nacionais e internacionais com total flexibilidade de horários.',
      features: ['Horários flexíveis', 'Destinos personalizados', 'Conforto premium']
    },
    {
      icon: MapPin,
      title: 'Turismo Aéreo',
      description: 'Explore Angola e países vizinhos com nossos pacotes turísticos exclusivos.',
      features: ['Roteiros exclusivos', 'Guias especializados', 'Experiências únicas']
    },
    {
      icon: Calendar,
      title: 'Voos Executivos',
      description: 'Transporte empresarial para reuniões de negócios e eventos corporativos.',
      features: ['Sala VIP', 'Wi-Fi a bordo', 'Serviço personalizado']
    },
    {
      icon: Headphones,
      title: 'Suporte 24/7',
      description: 'Atendimento especializado disponível 24 horas por dia para suas necessidades.',
      features: ['Suporte técnico', 'Reservas urgentes', 'Assistência completa']
    }
  ];

  return (
    <section id="servicos" className="section bg-air-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos 
            <span className="text-gradient block">Serviços</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços de aviação empresarial, 
            adaptados às necessidades específicas de cada cliente.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-air-gray-dark/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-air-red/10 transition-all duration-500 border border-air-gray-dark/30 hover:border-air-red/30 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-air-red to-red-700 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-red">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-air-red transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <div className="w-2 h-2 bg-air-red rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-air-red/20 to-red-700/20 rounded-2xl p-8 border border-air-red/30 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para Voar?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Entre em contacto connosco para planear a sua próxima viagem ou 
              solicitar uma cotação personalizada.
            </p>
            <button className="btn-hero">
              <span>Solicitar Cotação</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;