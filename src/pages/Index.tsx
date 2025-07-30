import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import FleetSection from '@/components/FleetSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { BackToTop, SkipLink } from '@/components/ui/InteractiveElements';
import { LoadingOverlay } from '@/components/ui/LoadingStates';

import { useState, useEffect } from 'react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className="min-h-screen">
        <SkipLink />
        <Header />
        <main id="main-content" className="focus:outline-none" tabIndex={-1}>
          <HeroCarousel />
          <AboutSection />
          <ServicesSection />
          <FleetSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LoadingOverlay>
  );
};

export default Index;
