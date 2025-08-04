import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      value: '+351 21 123 4567',
      description: 'Disponível 24/7 para emergências'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@airtwo.pt',
      description: 'Resposta em até 2 horas'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Aeroporto Humberto Delgado',
      description: 'Lisboa, Portugal'
    },
    {
      icon: Clock,
      title: 'Horário',
      value: '24/7',
      description: 'Atendimento sempre disponível'
    }
  ];

  const offices = [
    {
      city: 'Lisboa',
      address: 'Aeroporto Humberto Delgado\nAvião Base, Hangar 7\n1700-008 Lisboa',
      phone: '+351 21 123 4567',
      email: 'lisboa@airtwo.pt'
    },
    {
      city: 'Porto',
      address: 'Aeroporto Francisco Sá Carneiro\nTerminal Aviação Geral\n4470-558 Maia',
      phone: '+351 22 987 6543',
      email: 'porto@airtwo.pt'
    },
    {
      city: 'Faro',
      address: 'Aeroporto de Faro\nTerminal Executivo\n8001-701 Faro',
      phone: '+351 289 123 456',
      email: 'faro@airtwo.pt'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Estamos aqui para tornar sua viagem excepcional
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Envie-nos uma Mensagem</h2>
                <p className="text-muted-foreground">
                  Preencha o formulário e entraremos em contacto em breve
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.name')}
                    </label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.email')}
                    </label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input placeholder="+351 912 345 678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Assunto
                    </label>
                    <select className="w-full p-3 border rounded-lg bg-background">
                      <option>Informações Gerais</option>
                      <option>Solicitar Cotação</option>
                      <option>Gestão de Aeronaves</option>
                      <option>Manutenção</option>
                      <option>Parceria</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder="Como podemos ajudá-lo?"
                    className="min-h-32"
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/cotacao">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Cotação Rápida
                    </Link>
                  </Button>
                </div>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contacto</h2>
                
                <div className="grid gap-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index} className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{info.title}</h3>
                          <div className="font-medium">{info.value}</div>
                          <div className="text-sm text-muted-foreground">{info.description}</div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <Card className="p-6 bg-red-50 border-red-200">
                <h3 className="font-bold text-red-800 mb-2">Contacto de Emergência</h3>
                <p className="text-red-700 mb-3">
                  Para situações urgentes fora do horário comercial
                </p>
                <div className="flex items-center gap-2 text-red-800 font-semibold">
                  <Phone className="w-4 h-4" />
                  +351 91 999 9999
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="font-bold mb-4">Acesso Rápido</h3>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/cotacao">Solicitar Cotação Online</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/frota">Ver Nossa Frota</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/destinos">Explorar Destinos</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Escritórios</h2>
            <p className="text-lg text-muted-foreground">
              Presente nos principais aeroportos de Portugal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{office.city}</h3>
                <div className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                  {office.address}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    {office.phone}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    {office.email}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver no Mapa
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Localização Principal</h2>
            <p className="text-lg text-muted-foreground">
              Sede em Lisboa - Aeroporto Humberto Delgado
            </p>
          </div>

          {/* Placeholder for map */}
          <Card className="h-96 flex items-center justify-center bg-accent/5">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
              <p className="text-muted-foreground">
                Localização da sede da AIR TWO no Aeroporto de Lisboa
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-muted-foreground">
              Respostas às perguntas mais comuns
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Qual o tempo mínimo para reservar um voo?',
                answer: 'Idealmente 24 horas, mas podemos organizar voos de emergência com apenas 2 horas de antecedência.'
              },
              {
                question: 'Que documentos preciso para viajar?',
                answer: 'Passaporte válido ou cartão de cidadão (para destinos EU). Verificamos sempre os requisitos específicos do destino.'
              },
              {
                question: 'Posso levar animais de estimação?',
                answer: 'Sim, aceitamos animais de estimação mediante aviso prévio e documentação veterinária adequada.'
              },
              {
                question: 'Como funciona o catering a bordo?',
                answer: 'Oferecemos opções de catering personalizadas, desde snacks ligeiros até refeições gourmet completas.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Voar Connosco?
          </h2>
          <p className="text-xl mb-8">
            Entre em contacto hoje e descubra como podemos tornar sua viagem excepcional.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/cotacao">Solicitar Cotação</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+351211234567">Ligar Agora</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;