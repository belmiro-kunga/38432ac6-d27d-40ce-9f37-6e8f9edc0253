import { Plane, MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'AIR TWO',
      content: [
        'Companhia aérea privada angolana dedicada à excelência em aviação empresarial.',
        'Conectando Angola ao mundo com segurança e conforto.'
      ]
    },
    {
      title: 'Serviços',
      links: [
        { label: 'Voos Charter', href: '#servicos' },
        { label: 'Turismo Aéreo', href: '#servicos' },
        { label: 'Voos Executivos', href: '#servicos' },
        { label: 'Suporte 24/7', href: '#servicos' }
      ]
    },
    {
      title: 'Contacto',
      info: [
        {
          icon: MapPin,
          text: 'Aeroporto 4 de Fevereiro, Luanda'
        },
        {
          icon: Phone,
          text: '+244 923 456 789'
        },
        {
          icon: Mail,
          text: 'info@airtwo.ao'
        }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-air-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <Plane className="w-8 h-8 text-air-red transform rotate-45 mr-3" />
              <span className="text-2xl font-extrabold tracking-tight">AIR TWO</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-air-gray-dark/30 hover:bg-air-red text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-air-red">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {footerSections[1].links?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-air-red">{t('footer.contact')}</h3>
            <div className="space-y-4">
              {footerSections[2].info?.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <item.icon className="w-5 h-5 text-air-red mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-air-gray-dark/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} AIR TWO. {t('footer.rights')}
            </p>
            
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;