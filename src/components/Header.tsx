import { useState, useEffect } from 'react';
import { Plane, Menu, X } from 'lucide-react';
import { SmoothScrollLink } from '@/components/ui/InteractiveElements';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home').toUpperCase(), href: '#inicio', id: 'inicio' },
    { label: t('nav.about').toUpperCase(), href: '#sobre', id: 'sobre' },
    { label: t('nav.services').toUpperCase(), href: '#servicos', id: 'servicos' },
    { label: t('nav.fleet').toUpperCase(), href: '#frota', id: 'frota' },
    { label: t('nav.contact').toUpperCase(), href: '#contactos', id: 'contactos' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  // Detect active section on scroll
  useEffect(() => {
    const sections = navItems.map(item => item.id);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 ${
        scrolled 
          ? 'h-16 bg-gradient-to-r from-air-red to-red-700 shadow-lg' 
          : 'h-20 bg-gradient-to-br from-air-red to-red-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <SmoothScrollLink 
            href="#inicio" 
            onNavigate={handleNavClick}
            className="text-white font-bold text-xl hover:scale-105 transition-transform duration-300"
          >
            <span className="flex items-center space-x-2">
              <Plane className="w-8 h-8 transform rotate-45" />
              <span className="text-2xl font-extrabold tracking-tight">AIR TWO</span>
            </span>
          </SmoothScrollLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <SmoothScrollLink
                key={item.id}
                href={item.href}
                onNavigate={handleNavClick}
                className={`nav-link relative group ${
                  activeSection === item.id ? 'text-white' : 'text-white/80'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </SmoothScrollLink>
            ))}
          </nav>
          <LanguageSelector />
        </div>

        {/* Mobile Menu and Language Selector */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-air-red to-red-800 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <SmoothScrollLink
                key={item.id}
                href={item.href}
                onNavigate={handleNavClick}
                className={`block px-4 py-3 text-white font-medium uppercase tracking-wide rounded-lg transition-colors duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </SmoothScrollLink>
            ))}
          </nav>
        </div>
      )}

      {/* Progress Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-300"
        style={{
          width: `${Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`
        }}
      />
    </header>
  );
};

export default Header;