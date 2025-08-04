import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Shield, Clock } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Shield,
      key: 'safety',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: Clock,
      key: 'flexibility',
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: Users,
      key: 'comfort',
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      icon: Award,
      key: 'efficiency',
      color: 'bg-orange-500/10 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('about.experience.title')}</h2>
              <p className="text-lg leading-relaxed mb-6">
                {t('about.experience.description')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Voos Realizados</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="AIR TWO Experience"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="text-lg max-w-3xl mx-auto">
              {t('about.mission.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-full ${advantage.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {t(`about.advantages.${advantage.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`about.advantages.${advantage.key}.description`)}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">
              Profissionais experientes e certificados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <Card key={member} className="p-6 text-center">
                <img 
                  src="/placeholder.svg"
                  alt={`Team Member ${member}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-2">Membro da Equipe {member}</h3>
                <p className="text-sm text-muted-foreground mb-3">Cargo/Função</p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary">Certificação 1</Badge>
                  <Badge variant="secondary">Certificação 2</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Certificações e Licenças</h2>
            <p className="text-lg text-muted-foreground">
              Cumprimos todos os requisitos de segurança e qualidade
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {['EASA', 'ANAC', 'ISO 9001', 'Safety First'].map((cert) => (
              <Card key={cert} className="p-6 text-center">
                <img 
                  src="/placeholder.svg"
                  alt={cert}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="font-semibold">{cert}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;