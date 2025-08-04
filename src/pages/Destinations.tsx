import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Thermometer, Euro, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations = () => {
  const { t } = useLanguage();

  const popularDestinations = [
    {
      city: 'Paris',
      country: 'França',
      image: '/placeholder.svg',
      flightTime: '2h 30m',
      temperature: '15°C',
      price: 'A partir de €3,500',
      description: 'Cidade da luz, romance e alta gastronomia.',
      highlights: ['Torre Eiffel', 'Louvre', 'Champs-Élysées']
    },
    {
      city: 'Londres',
      country: 'Reino Unido',
      image: '/placeholder.svg',
      flightTime: '2h 45m',
      temperature: '12°C',
      price: 'A partir de €3,800',
      description: 'História, cultura e negócios numa só cidade.',
      highlights: ['Big Ben', 'Buckingham Palace', 'City de Londres']
    },
    {
      city: 'Zurique',
      country: 'Suíça',
      image: '/placeholder.svg',
      flightTime: '2h 15m',
      temperature: '8°C',
      price: 'A partir de €3,200',
      description: 'Centro financeiro mundial com paisagens alpinas.',
      highlights: ['Lago de Zurique', 'Bahnhofstrasse', 'Alpes Suíços']
    },
    {
      city: 'Madrid',
      country: 'Espanha',
      image: '/placeholder.svg',
      flightTime: '1h 20m',
      temperature: '18°C',
      price: 'A partir de €2,500',
      description: 'Capital vibrante com arte, cultura e gastronomia.',
      highlights: ['Museu Prado', 'Retiro', 'Gran Vía']
    },
    {
      city: 'Roma',
      country: 'Itália',
      image: '/placeholder.svg',
      flightTime: '2h 45m',
      temperature: '16°C',
      price: 'A partir de €3,600',
      description: 'Cidade eterna com história milenar.',
      highlights: ['Coliseu', 'Vaticano', 'Fontana di Trevi']
    },
    {
      city: 'Nice',
      country: 'França',
      image: '/placeholder.svg',
      flightTime: '2h 10m',
      temperature: '20°C',
      price: 'A partir de €3,400',
      description: 'Riviera francesa com praias deslumbrantes.',
      highlights: ['Promenade des Anglais', 'Cannes', 'Monte Carlo']
    }
  ];

  const regions = [
    { name: 'Europa Ocidental', count: 25, popular: 'Paris, Londres, Madrid' },
    { name: 'Europa Central', count: 18, popular: 'Zurique, Viena, Praga' },
    { name: 'Mediterrâneo', count: 15, popular: 'Nice, Roma, Barcelona' },
    { name: 'Ilhas', count: 12, popular: 'Ibiza, Maiorca, Corsega' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Destinos Exclusivos
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Descubra os melhores destinos para aviação executiva
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mapa de Destinos</h2>
            <p className="text-lg text-muted-foreground">
              Explore nossa rede de destinos em toda a Europa
            </p>
          </div>

          {/* Placeholder for interactive map */}
          <Card className="h-96 flex items-center justify-center bg-accent/5">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
              <p className="text-muted-foreground">
                Mapa interativo com todos os nossos destinos disponíveis
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Destinos Populares</h2>
            <p className="text-lg text-muted-foreground">
              Os destinos mais procurados pelos nossos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img 
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{destination.city}</h3>
                    <span className="text-sm text-muted-foreground">{destination.country}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">{destination.flightTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-primary" />
                      <span className="text-sm">{destination.temperature}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Euro className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{destination.price}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Destaques:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight, hlIndex) => (
                        <Badge key={hlIndex} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
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
        </div>
      </section>

      {/* Destinations by Region */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Destinos por Região</h2>
            <p className="text-lg text-muted-foreground">
              Explore nossos destinos organizados por regiões
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">{region.name}</h3>
                <div className="text-2xl font-bold text-primary mb-2">{region.count}</div>
                <div className="text-xs text-muted-foreground mb-4">destinos disponíveis</div>
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Populares:</div>
                  <div className="font-medium">{region.popular}</div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Ver Todos
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Time Calculator */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Calculadora de Tempo de Voo</h2>
            <p className="text-lg text-muted-foreground">
              Descubra o tempo estimado de voo para qualquer destino
            </p>
          </div>

          <Card className="p-8">
            <div className="grid md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Origem</label>
                <select className="w-full p-3 border rounded-lg bg-background">
                  <option>Lisboa (LPPT)</option>
                  <option>Porto (LPPR)</option>
                  <option>Faro (LPFR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Destino</label>
                <select className="w-full p-3 border rounded-lg bg-background">
                  <option>Selecione o destino</option>
                  <option>Paris (LFPB)</option>
                  <option>Londres (EGKB)</option>
                  <option>Madrid (LEMD)</option>
                  <option>Zurique (LSZR)</option>
                </select>
              </div>
              <div>
                <Button className="w-full h-12">
                  Calcular Tempo
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Tempo estimado de voo:</div>
              <div className="text-2xl font-bold text-primary">2h 30m</div>
              <div className="text-sm text-muted-foreground">com jato executivo médio</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Weather Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Condições Meteorológicas</h2>
            <p className="text-lg text-muted-foreground">
              Condições atuais nos principais destinos
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.slice(0, 6).map((destination, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="font-medium mb-1">{destination.city}</div>
                <div className="text-2xl font-bold text-primary mb-1">{destination.temperature}</div>
                <div className="text-xs text-muted-foreground">Ensolarado</div>
                <div className="text-xs text-green-600 mt-2">✓ Condições ideais</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para o Seu Próximo Destino?
          </h2>
          <p className="text-xl mb-8">
            Solicite uma cotação personalizada para qualquer destino europeu.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/cotacao">Solicitar Cotação</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contactos">Contactar Especialista</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;