import { useState, useEffect } from 'react';
import { Plane, Menu, X } from 'lucide-react';

const Header = () => {
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
    { label: 'INÍCIO', href: '#inicio', id: 'inicio' },
    { label: 'SOBRE', href: '#sobre', id: 'sobre' },
    { label: 'SERVIÇOS', href: '#servicos', id: 'servicos' },
    { label: 'FROTA', href: '#frota', id: 'frota' },
    { label: 'CONTACTOS', href: '#contactos', id: 'contactos' }
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <a 
            href="#inicio" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio', 'inicio');
            }}
            className="text-white font-bold text-xl hover:scale-105 transition-transform duration-300"
          >
            <span className="flex items-center space-x-2">
              <Plane className="w-8 h-8 transform rotate-45" />
              <span className="text-2xl font-extrabold tracking-tight">AIR TWO</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href, item.id);
              }}
              className={`nav-link ${
                activeSection === item.id ? 'text-white' : 'text-white/80'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-air-red to-red-800 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={`block px-4 py-3 text-white font-medium uppercase tracking-wide rounded-lg transition-colors duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
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