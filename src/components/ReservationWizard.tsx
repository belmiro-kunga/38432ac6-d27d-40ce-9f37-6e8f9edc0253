import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Plane, MapPin, Calendar, Users, Clock, Check, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReservationData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  tripType: 'oneWay' | 'roundTrip';
  name: string;
  email: string;
  phone: string;
}

const ReservationWizard: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'oneWay',
    name: '',
    email: '',
    phone: ''
  });

  // Debug: Log quando o modal abre/fecha
  console.log('ReservationWizard - isOpen:', isOpen);

  const steps = [
    { id: 1, title: 'Destino', icon: MapPin },
    { id: 2, title: 'Data & Passageiros', icon: Calendar },
    { id: 3, title: 'Contacto', icon: Users },
    { id: 4, title: 'Confirmação', icon: Check }
  ];

  const updateData = (field: keyof ReservationData, value: any) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica de envio
    console.log('Reserva enviada:', reservationData);
    alert('Reserva enviada com sucesso! Entraremos em contacto em breve.');
    onClose();
  };

  const calculatePrice = () => {
    // Simulação de cálculo de preço
    const basePrice = 2500; // Preço base por pessoa
    const totalPrice = basePrice * reservationData.passengers;
    return reservationData.tripType === 'roundTrip' ? totalPrice * 2 : totalPrice;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reserva de Voo"
      size="xl"
      className="h-[85vh] max-h-[600px] flex flex-col"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4 px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-air-red border-air-red text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className={`ml-1 text-xs font-medium hidden sm:block ${
                currentStep >= step.id ? 'text-air-red' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-air-red' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-1">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-air-red" />
                Destino da Viagem
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origem
                  </label>
                  <input
                    type="text"
                    value={reservationData.origin}
                    onChange={(e) => updateData('origin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    placeholder="Ex: Lisboa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destino
                  </label>
                  <input
                    type="text"
                    value={reservationData.destination}
                    onChange={(e) => updateData('destination', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    placeholder="Ex: Paris"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Viagem
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneWay"
                      checked={reservationData.tripType === 'oneWay'}
                      onChange={(e) => updateData('tripType', e.target.value)}
                      className="mr-2 text-air-red focus:ring-air-red"
                    />
                    <span className="text-sm">Só Ida</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tripType"
                      value="roundTrip"
                      checked={reservationData.tripType === 'roundTrip'}
                      onChange={(e) => updateData('tripType', e.target.value)}
                      className="mr-2 text-air-red focus:ring-air-red"
                    />
                    <span className="text-sm">Ida e Volta</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-air-red" />
                Data & Passageiros
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Partida
                  </label>
                  <input
                    type="date"
                    value={reservationData.departureDate}
                    onChange={(e) => updateData('departureDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                  />
                </div>
                
                {reservationData.tripType === 'roundTrip' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Retorno
                    </label>
                    <input
                      type="date"
                      value={reservationData.returnDate}
                      onChange={(e) => updateData('returnDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    />
                  </div>
                )}
              </div>
              
              <div className="max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Passageiros
                </label>
                <select
                  value={reservationData.passengers}
                  onChange={(e) => updateData('passengers', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} passageiro{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-air-red" />
                Informações de Contacto
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={reservationData.name}
                    onChange={(e) => updateData('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={reservationData.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={reservationData.phone}
                    onChange={(e) => updateData('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-air-red focus:border-transparent text-sm"
                    placeholder="+351 213 456 789"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Check className="w-5 h-5 mr-2 text-air-red" />
                Confirmação da Reserva
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Detalhes da Viagem</h4>
                    <div className="space-y-1 text-xs">
                      <p><span className="font-medium">Origem:</span> {reservationData.origin}</p>
                      <p><span className="font-medium">Destino:</span> {reservationData.destination}</p>
                      <p><span className="font-medium">Data:</span> {reservationData.departureDate}</p>
                      <p><span className="font-medium">Passageiros:</span> {reservationData.passengers}</p>
                      <p><span className="font-medium">Tipo:</span> {reservationData.tripType === 'oneWay' ? 'Só Ida' : 'Ida e Volta'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Contacto</h4>
                    <div className="space-y-1 text-xs">
                      <p><span className="font-medium">Nome:</span> {reservationData.name}</p>
                      <p><span className="font-medium">Email:</span> {reservationData.email}</p>
                      <p><span className="font-medium">Telefone:</span> {reservationData.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Preço Estimado:</span>
                    <span className="text-xl font-bold text-air-red">
                      €{calculatePrice().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    * Preço baseado em estimativa. Preço final será confirmado após análise.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors text-sm ${
              currentStep === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Anterior
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-air-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-5 py-2 bg-air-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <CreditCard className="w-4 h-4 mr-1" />
              Confirmar Reserva
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReservationWizard; 