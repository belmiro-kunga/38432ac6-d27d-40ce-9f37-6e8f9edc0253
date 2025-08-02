import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Gauge, MapPin, Fuel, Clock, Star, Plane, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Fleet = () => {
  const { t } = useLanguage();

  const aircraft = [
    {
      id: 'cessna-citation',
      name: 'Cessna Citation',
      category: 'light',
      image: '/placeholder.svg',
      passengers: 8,
      range: '2,800 km',
      speed: '850 km/h',
      features: ['Wi-Fi', 'Catering', 'Bagageira ampla'],
      description: 'Jato executivo leve ideal para viagens regionais e nacionais.',
      specifications: {
        comprimento: '15.9m',
        envergadura: '15.9m',
        altura: '4.6m',
        peso_max: '8,300 kg'
      }
    },
    {
      id: 'embraer-legacy',
      name: 'Embraer Legacy',
      category: 'medium',
      image: '/placeholder.svg',
      passengers: 12,
      range: '5,500 km',
      speed: '900 km/h',
      features: ['Suite executiva', 'Wi-Fi', 'Catering premium'],
      description: 'Jato executivo médio perfeito para viagens intercontinentais.',
      specifications: {
        comprimento: '21.2m',
        envergadura: '20.8m',
        altura: '6.8m',
        peso_max: '22,500 kg'
      }
    },
    {
      id: 'gulfstream-g650',
      name: 'Gulfstream G650',
      category: 'heavy',
      image: '/placeholder.svg',
      passengers: 16,
      range: '12,000 km',
      speed: '980 km/h',
      features: ['Cabine ultralarga', 'Quarto privado', 'Cozinha completa'],
      description: 'Jato executivo pesado de ultra longo alcance para máximo conforto.',
      specifications: {
        comprimento: '29.4m',
        envergadura: '28.5m',
        altura: '7.7m',
        peso_max: '45,200 kg'
      }
    }
  ];

  const categories = [
    { key: 'all', label: 'Toda a Frota' },
    { key: 'light', label: 'Jatos Leves' },
    { key: 'medium', label: 'Jatos Médios' },
    { key: 'heavy', label: 'Jatos Pesados' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('fleet.title')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t('fleet.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              {categories.map((category) => (
                <TabsTrigger key={category.key} value={category.key}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.key} value={category.key}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {aircraft
                    .filter(plane => category.key === 'all' || plane.category === category.key)
                    .map((plane) => (
                      <Card key={plane.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="relative">
                          <img 
                            src={plane.image}
                            alt={plane.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary">{plane.category === 'light' ? 'Leve' : plane.category === 'medium' ? 'Médio' : 'Pesado'}</Badge>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{plane.name}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{plane.description}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-primary" />
                              <span className="text-sm">{plane.passengers} passageiros</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="text-sm">{plane.range}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge className="w-4 h-4 text-primary" />
                              <span className="text-sm">{plane.speed}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-primary" />
                              <span className="text-sm">Premium</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {plane.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button asChild className="flex-1">
                              <Link to="/cotacao">Solicitar Cotação</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Fleet Statistics */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossa Frota em Números</h2>
            <p className="text-lg text-muted-foreground">
              Estatísticas que demonstram nossa excelência
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Aeronaves na Frota', icon: Plane },
              { number: '99.8%', label: 'Taxa de Disponibilidade', icon: Clock },
              { number: '0', label: 'Incidentes de Segurança', icon: Shield },
              { number: '24/7', label: 'Suporte Disponível', icon: Users }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aircraft Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comparação de Aeronaves</h2>
            <p className="text-lg text-muted-foreground">
              Compare especificações e escolha a aeronave ideal
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
              <thead className="bg-accent/10">
                <tr>
                  <th className="p-4 text-left">Especificação</th>
                  {aircraft.map((plane) => (
                    <th key={plane.id} className="p-4 text-center">{plane.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: 'passengers', label: 'Passageiros' },
                  { key: 'range', label: 'Alcance' },
                  { key: 'speed', label: 'Velocidade' }
                ].map((spec, index) => (
                  <tr key={spec.key} className={index % 2 === 0 ? 'bg-accent/5' : ''}>
                    <td className="p-4 font-medium">{spec.label}</td>
                    {aircraft.map((plane) => (
                      <td key={plane.id} className="p-4 text-center">
                        {spec.key === 'passengers' ? `${plane.passengers} pax` : 
                         spec.key === 'range' ? plane.range :
                         spec.key === 'speed' ? plane.speed : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Escolha Sua Aeronave Ideal
          </h2>
          <p className="text-xl mb-8">
            Nossa equipe ajuda você a selecionar a aeronave perfeita para sua viagem.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/cotacao">Solicitar Cotação</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contactos">Falar com Especialista</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;