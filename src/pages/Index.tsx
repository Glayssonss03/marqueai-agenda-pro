
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Agendamento Online",
      description: "Seus clientes podem agendar 24/7 através da página exclusiva da sua barbearia"
    },
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: "Gestão de Profissionais",
      description: "Cadastre seus profissionais, especialidades e horários de trabalho"
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Personalização Total",
      description: "Logo, cores, horários de funcionamento e política de cancelamento"
    }
  ];

  const plans = [
    {
      name: "Teste Gratuito",
      price: "R$ 0",
      period: "7 dias",
      features: [
        "Agendamentos ilimitados",
        "Gestão de profissionais",
        "Gestão de serviços",
        "Página pública",
        "Notificações automáticas"
      ],
      highlighted: false
    },
    {
      name: "Plano Mensal",
      price: "R$ 29,90",
      period: "por mês",
      features: [
        "Tudo do teste gratuito",
        "Sem limitações",
        "Suporte prioritário",
        "Relatórios avançados",
        "Backup automático"
      ],
      highlighted: true
    },
    {
      name: "Plano Anual",
      price: "R$ 299,00",
      period: "por ano",
      features: [
        "Tudo do plano mensal",
        "2 meses grátis",
        "Desconto de 17%",
        "Suporte VIP",
        "Funcionalidades exclusivas"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white rounded-lg p-2">
                <Clock className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Marqueai</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#recursos" className="text-gray-600 hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#planos" className="text-gray-600 hover:text-primary transition-colors">
                Planos
              </a>
              <a href="#contato" className="text-gray-600 hover:text-primary transition-colors">
                Contato
              </a>
            </nav>
            <div className="flex space-x-3">
              <Link to="/demo">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Página Demo
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sistema de Agendamento
            <span className="block text-primary">para Barbearias</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automatize seus agendamentos, gerencie profissionais e serviços, e ofereça uma experiência 
            moderna para seus clientes com página online exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-3 bg-primary hover:bg-primary-600">
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Ver Demonstração
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            7 dias grátis • Sem cartão de crédito • Configuração em 5 minutos
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tudo que sua barbearia precisa
            </h2>
            <p className="text-xl text-gray-600">
              Recursos profissionais para modernizar seu negócio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos transparentes
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para sua barbearia
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${plan.highlighted ? 'border-primary shadow-xl scale-105' : 'border-gray-200'}`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                  <Link to="/register" className="block mt-6">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary-600' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.name === "Teste Gratuito" ? "Começar Agora" : "Assinar Plano"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para modernizar sua barbearia?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece gratuitamente hoje e veja como o Marqueai pode transformar seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Começar Teste Grátis
              </Button>
            </Link>
            <a href="mailto:contato@marqueai.com" className="inline-block">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                Falar com Especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-white rounded-lg p-2">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Marqueai</h3>
              </div>
              <p className="text-gray-400">
                Sistema completo de agendamento para barbearias modernas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#recursos" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
                <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:contato@marqueai.com" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="mailto:suporte@marqueai.com" className="hover:text-white transition-colors">Suporte</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marqueai. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
