import { Shield, Clock, Award, Users } from 'lucide-react';

const AboutSection = () => {
  const advantages = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Padrões internacionais de segurança e manutenção'
    },
    {
      icon: Clock,
      title: 'Pontualidade',
      description: 'Horários flexíveis adaptados às suas necessidades'
    },
    {
      icon: Award,
      title: 'Excelência',
      description: 'Serviço premium com atenção aos detalhes'
    },
    {
      icon: Users,
      title: 'Experiência',
      description: 'Equipe experiente e profissional'
    }
  ];

  return (
    <section id="sobre" className="section bg-white">
      <div className="max-w-7xl mx-auto">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-air-black mb-6">
              Compromisso com a 
              <span className="text-gradient block">Excelência</span>
            </h2>
            <p className="text-lg text-air-gray-dark mb-6 leading-relaxed">
              A AIR TWO é uma companhia aérea privada angolana dedicada a oferecer 
              serviços de aviação empresarial de alta qualidade. Nossa missão é 
              conectar Angola ao mundo através de voos seguros, pontuais e confortáveis.
            </p>
            <p className="text-lg text-air-gray-dark mb-8 leading-relaxed">
              Com uma frota moderna e uma equipe altamente qualificada, garantimos 
              uma experiência de voo incomparável, adaptada às necessidades específicas 
              de cada cliente.
            </p>
            <button className="btn-outline group">
              <span>Saiba Mais</span>
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
                <div className="text-sm uppercase tracking-wide">Anos de Experiência</div>
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
    </section>
  );
};

export default AboutSection;