
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  Clock, 
  Settings, 
  Plus, 
  BarChart3, 
  Bell,
  LogOut,
  Edit,
  Trash,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dados de exemplo
  const todayAppointments = [
    { id: 1, client: "João Silva", service: "Corte + Barba", time: "09:00", professional: "Carlos", price: "R$ 45" },
    { id: 2, client: "Pedro Santos", service: "Corte Simples", time: "10:30", professional: "Carlos", price: "R$ 25" },
    { id: 3, client: "Lucas Oliveira", service: "Barba", time: "14:00", professional: "André", price: "R$ 20" },
  ];

  const services = [
    { id: 1, name: "Corte Simples", price: "R$ 25", duration: "30 min" },
    { id: 2, name: "Corte + Barba", price: "R$ 45", duration: "45 min" },
    { id: 3, name: "Barba", price: "R$ 20", duration: "20 min" },
  ];

  const professionals = [
    { id: 1, name: "Carlos Silva", specialties: ["Corte", "Barba"], active: true },
    { id: 2, name: "André Costa", specialties: ["Corte", "Bigode"], active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Marqueai</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Plano Gratuito
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Barbearia Moderna
          </h1>
          <p className="text-gray-600">
            Gerencie sua barbearia de forma simples e eficiente
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+2 desde ontem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 90</div>
                  <p className="text-xs text-muted-foreground">+15% desde ontem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">+5 este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">⭐⭐⭐⭐⭐</p>
                </CardContent>
              </Card>
            </div>

            {/* Agendamentos de Hoje */}
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos de Hoje</CardTitle>
                <CardDescription>
                  Próximos horários agendados para hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-semibold text-primary">
                          {appointment.time}
                        </div>
                        <div>
                          <p className="font-medium">{appointment.client}</p>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{appointment.price}</p>
                        <p className="text-sm text-gray-600">{appointment.professional}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Serviços</h2>
              <Button className="bg-primary hover:bg-primary-600">
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-gray-600">{service.duration}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{service.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Profissionais</h2>
              <Button className="bg-primary hover:bg-primary-600">
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </div>

            <div className="grid gap-4">
              {professionals.map((professional) => (
                <Card key={professional.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-lg">{professional.name}</h3>
                      <div className="flex space-x-2 mt-2">
                        {professional.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={professional.active ? "default" : "secondary"}>
                        {professional.active ? "Ativo" : "Inativo"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Todos os Agendamentos</h2>
              <Button className="bg-primary hover:bg-primary-600">
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Agenda Completa</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Calendário de agendamentos será implementado aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">Relatórios</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Análises e Relatórios</CardTitle>
                <CardDescription>
                  Acompanhe o desempenho da sua barbearia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Gráficos e relatórios serão implementados aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Configurações</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Barbearia</CardTitle>
                <CardDescription>
                  Personalize sua barbearia e configurações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Configurações serão implementadas aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
