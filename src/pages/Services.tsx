import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Settings, Wrench, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Plane,
      key: 'charter',
      features: ['Voos sob demanda', 'Rotas personalizadas', 'Máxima flexibilidade', 'Serviço premium']
    },
    {
      icon: Settings,
      key: 'management',
      features: ['Gestão completa', 'Manutenção incluída', 'Tripulação dedicada', 'Máxima rentabilidade']
    },
    {
      icon: Wrench,
      key: 'maintenance',
      features: ['Manutenção certificada', 'Peças originais', 'Técnicos especializados', 'Máxima segurança']
    }
  ];

  const additionalServices = [
    { icon: Clock, title: 'Disponibilidade 24/7', description: 'Atendimento e voos a qualquer hora' },
    { icon: Shield, title: 'Segurança Máxima', description: 'Protocolos rigorosos de segurança' },
    { icon: Users, title: 'Serviço Personalizado', description: 'Atendimento exclusivo e personalizado' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Soluções completas em aviação executiva
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços Principais</h2>
            <p className="text-lg text-muted-foreground">
              Escolha a solução ideal para suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow group">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`services.${service.key}.description`)}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button asChild className="flex-1">
                      <Link to="/cotacao">Solicitar Cotação</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Serviços Adicionais</h2>
            <p className="text-lg text-muted-foreground">
              Experiência completa e personalizada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Packages Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Nossos Pacotes</h2>
            <p className="text-lg text-muted-foreground">
              Encontre a solução perfeita para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Básico', 'Premium', 'Executivo'].map((package_name, index) => (
              <Card key={index} className={`p-8 ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <Badge className="w-full justify-center mb-4">Mais Popular</Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{package_name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">€XXX</div>
                  <div className="text-sm text-muted-foreground">por hora de voo</div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Aeronave dedicada',
                    'Tripulação certificada',
                    'Seguro incluído',
                    'Catering básico',
                    index > 0 ? 'Wi-Fi a bordo' : null,
                    index > 1 ? 'Serviço de luxo' : null
                  ].filter(Boolean).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                  <Link to="/cotacao">Solicitar Cotação</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Voar com a AIR TWO?
          </h2>
          <p className="text-xl mb-8">
            Solicite uma cotação personalizada e descubra como podemos tornar sua viagem excepcional.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/cotacao">Solicitar Cotação</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contactos">Falar Connosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;