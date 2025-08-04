import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Aircraft {
  id: string;
  name: string;
  type: string;
  capacity: number;
  range: number;
  image: string;
  pricePerHour: number;
}

const aircraftData: Aircraft[] = [
  {
    id: '1',
    name: 'Cessna Citation X',
    type: 'Jato Executivo',
    capacity: 8,
    range: 3000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    pricePerHour: 2500
  },
  {
    id: '2',
    name: 'Gulfstream G650',
    type: 'Jato Ultra Longo Alcance',
    capacity: 19,
    range: 7000,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=300&fit=crop',
    pricePerHour: 4500
  },
  {
    id: '3',
    name: 'Bombardier Global 7500',
    type: 'Jato Executivo',
    capacity: 19,
    range: 7700,
    image: 'https://images.unsplash.com/photo-1583425423320-2386622cd2e4?w=400&h=300&fit=crop',
    pricePerHour: 5000
  },
  {
    id: '4',
    name: 'Embraer Phenom 300',
    type: 'Jato Executivo',
    capacity: 9,
    range: 2000,
    image: 'https://images.unsplash.com/photo-1544824353-4d5a1e3dd1c3?w=400&h=300&fit=crop',
    pricePerHour: 1800
  }
];

interface QuoteFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  aircraftId: string;
  isRoundTrip: boolean;
}

const QuoteForm: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    aircraftId: '',
    isRoundTrip: false
  });

  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const updateFormData = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    if (!selectedAircraft) return 0;
    
    // Simulação simples de cálculo baseado em distância e tempo
    const basePrice = selectedAircraft.pricePerHour;
    const estimatedHours = 2; // Simulação
    const totalPrice = basePrice * estimatedHours;
    
    if (formData.isRoundTrip) {
      return totalPrice * 2;
    }
    
    return totalPrice;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAircraftSelect = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    updateFormData('aircraftId', aircraft.id);
    setEstimatedPrice(calculatePrice());
  };

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica de envio
    console.log('Formulário enviado:', formData);
    alert('Solicitação enviada com sucesso! Entraremos em contacto em breve.');
  };

  const steps = [
    { id: 1, title: 'Origem e Destino', icon: MapPin },
    { id: 2, title: 'Data e Passageiros', icon: Calendar },
    { id: 3, title: 'Aeronave', icon: Plane },
    { id: 4, title: 'Confirmação', icon: DollarSign }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id 
                ? 'bg-air-red border-air-red text-white' 
                : 'border-gray-300 text-gray-500'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? 'text-air-red' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-air-red' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Origem e Destino</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origem
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => updateFormData('origin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent"
                  placeholder="Ex: Lisboa, Portugal"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destino
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => updateFormData('destination', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent"
                  placeholder="Ex: Paris, França"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isRoundTrip}
                  onChange={(e) => updateFormData('isRoundTrip', e.target.checked)}
                  className="w-4 h-4 text-air-red border-gray-300 rounded focus:ring-air-red"
                />
                <span className="ml-2 text-sm text-gray-700">Voo de ida e volta</span>
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Data e Passageiros</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Partida
                </label>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => updateFormData('departureDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent"
                />
              </div>
              
              {formData.isRoundTrip && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Retorno
                  </label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => updateFormData('returnDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Passageiros
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateFormData('passengers', Math.max(1, formData.passengers - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-16 text-center">{formData.passengers}</span>
                <button
                  onClick={() => updateFormData('passengers', formData.passengers + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Selecionar Aeronave</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aircraftData.map((aircraft) => (
                <div
                  key={aircraft.id}
                  onClick={() => handleAircraftSelect(aircraft)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedAircraft?.id === aircraft.id
                      ? 'border-air-red bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={aircraft.image}
                    alt={aircraft.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{aircraft.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{aircraft.type}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>Capacidade: {aircraft.capacity} pax</span>
                    <span>Alcance: {aircraft.range} km</span>
                  </div>
                  <div className="text-lg font-bold text-air-red">
                    €{aircraft.pricePerHour.toLocaleString()}/hora
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Confirmação da Cotação</h3>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Detalhes do Voo</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Origem:</span> {formData.origin}</p>
                    <p><span className="font-medium">Destino:</span> {formData.destination}</p>
                    <p><span className="font-medium">Data:</span> {formData.departureDate}</p>
                    <p><span className="font-medium">Passageiros:</span> {formData.passengers}</p>
                    <p><span className="font-medium">Tipo:</span> {formData.isRoundTrip ? 'Ida e Volta' : 'Só Ida'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Aeronave Selecionada</h4>
                  {selectedAircraft && (
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Modelo:</span> {selectedAircraft.name}</p>
                      <p><span className="font-medium">Tipo:</span> {selectedAircraft.type}</p>
                      <p><span className="font-medium">Capacidade:</span> {selectedAircraft.capacity} passageiros</p>
                      <p><span className="font-medium">Alcance:</span> {selectedAircraft.range} km</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Preço Estimado:</span>
                  <span className="text-3xl font-bold text-air-red">
                    €{estimatedPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  * Preço baseado em estimativa de tempo de voo
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-6 py-3 rounded-lg border transition-colors ${
            currentStep === 1
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </button>

        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-air-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Próximo
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-8 py-3 bg-air-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Enviar Solicitação
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm; 