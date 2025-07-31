import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&h=1080&fit=crop',
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      cta: t('hero.learnMore')
    },
    {
      image: 'https://images.unsplash.com/photo-1583425423320-2386622cd2e4?w=1920&h=1080&fit=crop',
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      cta: t('hero.cta')
    },
    {
      image: 'https://images.unsplash.com/photo-1544824353-4d5a1e3dd1c3?w=1920&h=1080&fit=crop',
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      cta: t('hero.learnMore')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-air-black/80 via-air-black/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-3xl">
                <h1 
                  className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-300 ${
                    currentSlide === index 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-12'
                  }`}
                >
                  {slide.title}
                </h1>
                
                <p 
                  className={`text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${
                    currentSlide === index 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-12'
                  }`}
                >
                  {slide.subtitle}
                </p>
                
                <button 
                  className={`group btn-hero transition-all duration-1000 delay-700 ${
                    currentSlide === index 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={previousSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;