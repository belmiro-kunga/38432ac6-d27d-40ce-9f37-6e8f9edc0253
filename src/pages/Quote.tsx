import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowRight, 
  ArrowLeft, 
  Plane, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  Euro,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Quote = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tripType: '',
    departure: '',
    destination: '',
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: 1,
    aircraft: '',
    services: [] as string[],
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const tripTypes = [
    { value: 'one-way', label: 'Só Ida', description: 'Viagem simples para um destino' },
    { value: 'round-trip', label: 'Ida e Volta', description: 'Viagem com regresso marcado' },
    { value: 'multi-stop', label: 'Múltiplas Paragens', description: 'Várias cidades numa viagem' }
  ];

  const airports = [
    'Lisboa (LPPT)', 'Porto (LPPR)', 'Faro (LPFR)', 'Paris (LFPB)', 
    'Londres (EGKB)', 'Madrid (LEMD)', 'Zurique (LSZR)', 'Roma (LIRA)',
    'Nice (LFMN)', 'Barcelona (LEBL)', 'Viena (LOWW)', 'Milão (LIML)'
  ];

  const aircraftOptions = [
    {
      category: 'Jatos Leves',
      aircraft: [
        { name: 'Cessna Citation', passengers: '6-8', price: '€2,500-3,500/h', range: '2,800 km' },
        { name: 'Phenom 300', passengers: '6-9', price: '€3,000-4,000/h', range: '3,200 km' }
      ]
    },
    {
      category: 'Jatos Médios',
      aircraft: [
        { name: 'Embraer Legacy', passengers: '8-12', price: '€4,500-6,500/h', range: '5,500 km' },
        { name: 'Hawker 900XP', passengers: '8-9', price: '€4,000-5,500/h', range: '4,600 km' }
      ]
    },
    {
      category: 'Jatos Pesados',
      aircraft: [
        { name: 'Gulfstream G650', passengers: '12-16', price: '€8,000-12,000/h', range: '12,000 km' },
        { name: 'Global 6000', passengers: '13-17', price: '€7,500-11,000/h', range: '11,100 km' }
      ]
    }
  ];

  const additionalServices = [
    'Catering Gourmet', 'Transporte Terrestre', 'Hospedagem de Luxo', 
    'Seguro Viagem Premium', 'Assistência 24/7', 'Wi-Fi de Alta Velocidade'
  ];

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold mb-1">Tipo de Viagem</h2>
              <p className="text-sm text-muted-foreground">Selecione o tipo de viagem que deseja realizar</p>
            </div>
            
            <div className="grid gap-3">
              {tripTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`p-4 cursor-pointer transition-all ${
                    formData.tripType === type.value ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => updateFormData('tripType', type.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold mb-1">{type.label}</h3>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.tripType === type.value ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {formData.tripType === type.value && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold mb-1">Destinos</h2>
              <p className="text-sm text-muted-foreground">Escolha os aeroportos de origem e destino</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Aeroporto de Origem
                </label>
                <select 
                  className="w-full p-2 border rounded-lg bg-background text-sm"
                  value={formData.departure}
                  onChange={(e) => updateFormData('departure', e.target.value)}
                >
                  <option value="">Selecione a origem</option>
                  {airports.map((airport) => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Aeroporto de Destino
                </label>
                <select 
                  className="w-full p-2 border rounded-lg bg-background text-sm"
                  value={formData.destination}
                  onChange={(e) => updateFormData('destination', e.target.value)}
                >
                  <option value="">Selecione o destino</option>
                  {airports.map((airport) => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.departure && formData.destination && (
              <Card className="p-3 bg-accent/5">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Tempo estimado de voo:</div>
                  <div className="text-lg font-bold text-primary">2h 30m</div>
                  <div className="text-xs text-muted-foreground">Distância: ~1,200 km</div>
                </div>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Datas e Horários</h2>
              <p className="text-muted-foreground">Selecione as datas da sua viagem</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Data de Partida
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {formData.departureDate ? format(formData.departureDate, 'dd/MM/yyyy') : 'Selecione a data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.departureDate}
                      onSelect={(date) => updateFormData('departureDate', date)}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {formData.tripType === 'round-trip' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-2" />
                    Data de Regresso
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {formData.returnDate ? format(formData.returnDate, 'dd/MM/yyyy') : 'Selecione a data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.returnDate}
                        onSelect={(date) => updateFormData('returnDate', date)}
                        disabled={(date) => date < (formData.departureDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Número de Passageiros
              </label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateFormData('passengers', Math.max(1, formData.passengers - 1))}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{formData.passengers}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateFormData('passengers', Math.min(20, formData.passengers + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Selecione a Aeronave</h2>
              <p className="text-muted-foreground">Escolha a aeronave ideal para sua viagem</p>
            </div>

            <div className="space-y-6">
              {aircraftOptions.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <div className="grid gap-4">
                    {category.aircraft.map((aircraft) => (
                      <Card 
                        key={aircraft.name}
                        className={`p-4 cursor-pointer transition-all ${
                          formData.aircraft === aircraft.name ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                        }`}
                        onClick={() => updateFormData('aircraft', aircraft.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.aircraft === aircraft.name ? 'bg-primary border-primary' : 'border-gray-300'
                            }`} />
                            <div>
                              <h4 className="font-semibold">{aircraft.name}</h4>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{aircraft.passengers} pax</span>
                                <span>{aircraft.range}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">{aircraft.price}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Serviços Adicionais</h2>
              <p className="text-muted-foreground">Personalize sua experiência com serviços extras</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {additionalServices.map((service) => (
                <Card 
                  key={service}
                  className={`p-4 cursor-pointer transition-all ${
                    formData.services.includes(service) ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => toggleService(service)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      formData.services.includes(service) ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {formData.services.includes(service) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{service}</span>
                  </div>
                </Card>
              ))}
            </div>

            {formData.services.length > 0 && (
              <Card className="p-4 bg-accent/5">
                <h4 className="font-semibold mb-2">Serviços Selecionados:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service) => (
                    <Badge key={service} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Dados de Contacto</h2>
              <p className="text-muted-foreground">Para finalizarmos sua cotação personalizada</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <Input 
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <Input 
                placeholder="+351 912 345 678"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mensagem (Opcional)</label>
              <Textarea 
                placeholder="Requisitos especiais, preferências ou observações..."
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Summary */}
            <Card className="p-6 bg-accent/5">
              <h4 className="font-semibold mb-4">Resumo da Cotação:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tipo de Viagem:</span>
                  <span className="font-medium">{tripTypes.find(t => t.value === formData.tripType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rota:</span>
                  <span className="font-medium">{formData.departure} → {formData.destination}</span>
                </div>
                {formData.departureDate && (
                  <div className="flex justify-between">
                    <span>Data de Partida:</span>
                    <span className="font-medium">{format(formData.departureDate, 'dd/MM/yyyy')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Passageiros:</span>
                  <span className="font-medium">{formData.passengers}</span>
                </div>
                {formData.aircraft && (
                  <div className="flex justify-between">
                    <span>Aeronave:</span>
                    <span className="font-medium">{formData.aircraft}</span>
                  </div>
                )}
                {formData.services.length > 0 && (
                  <div>
                    <span>Serviços Extras:</span>
                    <div className="mt-1">
                      {formData.services.map((service) => (
                        <Badge key={service} variant="outline" className="mr-1 mb-1 text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (step > totalSteps) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Cotação Enviada com Sucesso!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Recebemos sua solicitação de cotação. Nossa equipe entrará em contacto em até 2 horas.
          </p>

          <div className="bg-accent/10 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Número de Referência: #QT-2024-001</h3>
            <p className="text-sm text-muted-foreground">
              Guarde este número para acompanhar o status da sua cotação
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">Voltar ao Início</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contactos">Falar Connosco</Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold mb-3">Contacto Directo:</h4>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +351 21 123 4567
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                quotes@airtwo.pt
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 flex flex-col">
      {/* Header */}
      <section className="relative py-4 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-3">
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              Solicitar Cotação
            </h1>
            <p className="text-xs md:text-sm">
              Passo {step} de {totalSteps}: {
                step === 1 ? 'Tipo de Viagem' :
                step === 2 ? 'Destinos' :
                step === 3 ? 'Datas e Passageiros' :
                step === 4 ? 'Seleção de Aeronave' :
                step === 5 ? 'Serviços Adicionais' :
                'Finalização'
              }
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="flex-1 py-3">
        <div className="max-w-4xl mx-auto px-4 h-full">
          <Card className="p-3 md:p-4 h-full flex flex-col">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4 pt-4 border-t mt-auto">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
                size="sm"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Anterior
              </Button>

              <Button 
                onClick={step === totalSteps ? () => setStep(totalSteps + 1) : nextStep}
                disabled={
                  (step === 1 && !formData.tripType) ||
                  (step === 2 && (!formData.departure || !formData.destination)) ||
                  (step === 3 && !formData.departureDate) ||
                  (step === 4 && !formData.aircraft) ||
                  (step === 6 && (!formData.name || !formData.email || !formData.phone))
                }
                size="sm"
              >
                {step === totalSteps ? 'Enviar Cotação' : 'Próximo'}
                {step !== totalSteps && <ArrowRight className="w-3 h-3 ml-1" />}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-3 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-sm font-semibold mb-1">Precisa de Ajuda?</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Nossa equipe está disponível 24/7 para ajudá-lo
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-7">
              <Phone className="w-3 h-3 mr-1" />
              +351 21 123 4567
            </Button>
            <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-7">
              <Mail className="w-3 h-3 mr-1" />
              quotes@airtwo.pt
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;