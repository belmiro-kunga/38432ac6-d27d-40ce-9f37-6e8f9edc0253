import { useState } from 'react';
import { Users, Gauge, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Aircraft {
  id: number;
  name: string;
  model: string;
  image: string;
  capacity: number;
  range: string;
  speed: string;
  description: string;
}

const FleetSection = () => {
  const [selectedAircraft, setSelectedAircraft] = useState(0);

  const aircraft: Aircraft[] = [
    {
      id: 1,
      name: 'Executive One',
      model: 'Citation CJ3+',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      capacity: 8,
      range: '3,500 km',
      speed: '720 km/h',
      description: 'Jato executivo ideal para voos médios, oferecendo conforto e eficiência para viagens de negócios.'
    },
    {
      id: 2,
      name: 'Business Elite',
      model: 'King Air 350',
      image: 'https://images.unsplash.com/photo-1583425423320-2386622cd2e4?w=800&h=600&fit=crop',
      capacity: 12,
      range: '2,800 km',
      speed: '580 km/h',
      description: 'Aeronave versátil perfeita para grupos maiores e voos regionais com máximo conforto.'
    },
    {
      id: 3,
      name: 'Luxury Express',
      model: 'Gulfstream G280',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop',
      capacity: 10,
      range: '6,400 km',
      speed: '850 km/h',
      description: 'Jato de longo alcance com tecnologia avançada e luxo incomparável para viagens intercontinentais.'
    }
  ];

  const nextAircraft = () => {
    setSelectedAircraft((prev) => (prev + 1) % aircraft.length);
  };

  const previousAircraft = () => {
    setSelectedAircraft((prev) => prev === 0 ? aircraft.length - 1 : prev - 1);
  };

  const currentAircraft = aircraft[selectedAircraft];

  return (
    <section id="frota" className="section bg-air-gray/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-air-black mb-6">
            Nossa 
            <span className="text-gradient">Frota</span>
          </h2>
          <p className="text-xl text-air-gray-dark max-w-3xl mx-auto leading-relaxed">
            Aeronaves modernas e bem equipadas para garantir segurança, 
            conforto e eficiência em todos os voos.
          </p>
        </div>

        {/* Main Aircraft Display */}
        <div className="bg-white rounded-3xl shadow-elegant overflow-hidden mb-12 animate-scale-in">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Aircraft Image */}
            <div className="relative h-96 lg:h-auto">
              <img 
                src={currentAircraft.image}
                alt={currentAircraft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-air-black/50 to-transparent" />
              
              {/* Navigation Arrows */}
              <button 
                onClick={previousAircraft}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextAircraft}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Aircraft Model Badge */}
              <div className="absolute bottom-4 left-4 bg-air-red text-white px-4 py-2 rounded-lg font-bold">
                {currentAircraft.model}
              </div>
            </div>

            {/* Aircraft Details */}
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-air-black mb-4">
                {currentAircraft.name}
              </h3>
              <p className="text-air-gray-dark mb-8 leading-relaxed">
                {currentAircraft.description}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-air-red/10 text-air-red rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-air-black">
                    {currentAircraft.capacity}
                  </div>
                  <div className="text-sm text-air-gray-dark uppercase tracking-wide">
                    Passageiros
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-air-red/10 text-air-red rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-air-black">
                    {currentAircraft.range}
                  </div>
                  <div className="text-sm text-air-gray-dark uppercase tracking-wide">
                    Alcance
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-air-red/10 text-air-red rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-air-black">
                    {currentAircraft.speed}
                  </div>
                  <div className="text-sm text-air-gray-dark uppercase tracking-wide">
                    Velocidade
                  </div>
                </div>
              </div>

              <button className="btn-hero w-full">
                <span>Solicitar Esta Aeronave</span>
              </button>
            </div>
          </div>
        </div>

        {/* Aircraft Thumbnails */}
        <div className="flex justify-center space-x-4">
          {aircraft.map((plane, index) => (
            <button
              key={plane.id}
              onClick={() => setSelectedAircraft(index)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                selectedAircraft === index 
                  ? 'ring-4 ring-air-red scale-110' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                src={plane.image}
                alt={plane.name}
                className="w-24 h-16 object-cover"
              />
              <div className="absolute inset-0 bg-air-black/20" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;