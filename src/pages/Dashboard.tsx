
import { useState, useEffect } from "react";
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
  Star,
  AlertTriangle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { useProfessionals } from "@/hooks/useProfessionals";
import { useServices } from "@/hooks/useServices";
import { useAppointments } from "@/hooks/useAppointments";
import { ProfessionalForm } from "@/components/ProfessionalForm";
import { ServiceForm } from "@/components/ServiceForm";
import { AppointmentForm } from "@/components/AppointmentForm";
import { SettingsForm } from "@/components/SettingsForm";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const { profile, isLoading: profileLoading } = useProfile();
  const { 
    professionals, 
    isLoading: professionalsLoading, 
    addProfessional, 
    updateProfessional, 
    deleteProfessional 
  } = useProfessionals();
  const { 
    services, 
    isLoading: servicesLoading, 
    addService, 
    updateService, 
    deleteService 
  } = useServices();
  const {
    appointments,
    isLoading: appointmentsLoading,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleProfessionalSubmit = (data: any) => {
    if (editingProfessional) {
      updateProfessional.mutate({ id: editingProfessional.id, ...data });
      setEditingProfessional(null);
    } else {
      addProfessional.mutate(data);
    }
    setShowProfessionalForm(false);
  };

  const handleServiceSubmit = (data: any) => {
    if (editingService) {
      updateService.mutate({ id: editingService.id, ...data });
      setEditingService(null);
    } else {
      addService.mutate(data);
    }
    setShowServiceForm(false);
  };

  const handleAppointmentSubmit = (data: any) => {
    if (editingAppointment) {
      updateAppointment.mutate({ id: editingAppointment.id, ...data });
      setEditingAppointment(null);
    } else {
      addAppointment.mutate(data);
    }
    setShowAppointmentForm(false);
  };

  const handleEditProfessional = (professional: any) => {
    setEditingProfessional(professional);
    setShowProfessionalForm(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setShowServiceForm(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment(appointment);
    setShowAppointmentForm(true);
  };

  const getTrialDaysLeft = () => {
    if (!profile?.trial_ends_at) return 0;
    const trialEnd = new Date(profile.trial_ends_at);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const trialDaysLeft = getTrialDaysLeft();
  const isTrialExpired = profile?.subscription_status === 'expired';
  const isOnTrial = profile?.subscription_status === 'trial';

  useEffect(() => {
    if (isTrialExpired) {
      toast({
        title: "Período de teste expirado",
        description: "Escolha um plano para continuar usando o Marqueai.",
        variant: "destructive",
      });
    } else if (isOnTrial && trialDaysLeft <= 2) {
      toast({
        title: "Período gratuito termina em breve",
        description: `Seu período gratuito termina em ${trialDaysLeft} dia(s). Escolha um plano para continuar.`,
        variant: "destructive",
      });
    }
  }, [isTrialExpired, isOnTrial, trialDaysLeft, toast]);

  if (profileLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Carregando...</div>;
  }

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.appointment_date === today;
  });

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
            <Badge variant="outline" className={`${
              isTrialExpired ? 'bg-red-50 text-red-700 border-red-200' : 
              isOnTrial ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              'bg-green-50 text-green-700 border-green-200'
            }`}>
              {isTrialExpired ? 'Expirado' : 
               isOnTrial ? `Teste: ${trialDaysLeft} dias` : 
               'Plano Pro'}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            {(isTrialExpired || (isOnTrial && trialDaysLeft <= 2)) && (
              <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Escolher Plano
              </Button>
            )}
            {profile?.slug && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/booking/${profile.slug}`} target="_blank">
                  Ver Página Pública
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile?.barbershop_name || "Sua Barbearia"}
          </h1>
          <p className="text-gray-600">
            Gerencie sua barbearia de forma simples e eficiente
          </p>
          {profile?.slug && (
            <p className="text-sm text-blue-600 mt-2">
              Link público: marqueai.com/{profile.slug}
            </p>
          )}
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
                  <div className="text-2xl font-bold">{todayAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {todayAppointments.length === 0 ? "Nenhum agendamento hoje" : "agendamentos confirmados"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{professionals.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {professionals.filter(p => p.is_active).length} ativos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Serviços</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{services.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {services.filter(s => s.is_active).length} disponíveis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isTrialExpired ? "❌" : isOnTrial ? "🟡" : "✅"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isTrialExpired ? "Expirado" : 
                     isOnTrial ? `${trialDaysLeft} dias restantes` : 
                     "Ativo"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Setup */}
            {(professionals.length === 0 || services.length === 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuração Inicial</CardTitle>
                  <CardDescription>
                    Complete a configuração da sua barbearia para começar a receber agendamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {professionals.length === 0 && (
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Adicione pelo menos um profissional</span>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setActiveTab("professionals");
                            setShowProfessionalForm(true);
                          }}
                        >
                          Adicionar
                        </Button>
                      </div>
                    )}
                    {services.length === 0 && (
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Adicione pelo menos um serviço</span>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setActiveTab("services");
                            setShowServiceForm(true);
                          }}
                        >
                          Adicionar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Agendamentos</h2>
              <Button 
                className="bg-primary hover:bg-primary-600"
                onClick={() => setShowAppointmentForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>

            {showAppointmentForm && (
              <AppointmentForm
                onSubmit={handleAppointmentSubmit}
                onCancel={() => {
                  setShowAppointmentForm(false);
                  setEditingAppointment(null);
                }}
                initialData={editingAppointment}
              />
            )}

            <div className="grid gap-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum agendamento encontrado</p>
                    <p className="text-sm mt-2">
                      Crie agendamentos manualmente ou compartilhe o link da sua barbearia
                    </p>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.client_name}</h3>
                        <p className="text-gray-600">{appointment.service?.name}</p>
                        <p className="text-gray-500 text-sm">
                          {appointment.professional?.name} • {appointment.appointment_date} às {appointment.appointment_time}
                        </p>
                        <p className="text-gray-500 text-sm">{appointment.client_phone}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">R$ {appointment.service?.price?.toFixed(2) || '0.00'}</p>
                          <Badge variant={appointment.status === 'scheduled' ? "default" : "secondary"}>
                            {appointment.status === 'scheduled' ? 'Agendado' : 
                             appointment.status === 'confirmed' ? 'Confirmado' :
                             appointment.status === 'cancelled' ? 'Cancelado' : 'Concluído'}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteAppointment.mutate(appointment.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Serviços</h2>
              <Button 
                className="bg-primary hover:bg-primary-600"
                onClick={() => setShowServiceForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </div>

            {showServiceForm && (
              <ServiceForm
                onSubmit={handleServiceSubmit}
                onCancel={() => {
                  setShowServiceForm(false);
                  setEditingService(null);
                }}
                initialData={editingService}
              />
            )}

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      {service.description && (
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      )}
                      <p className="text-gray-500 text-sm">{service.duration_minutes} minutos</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">R$ {service.price.toFixed(2)}</p>
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteService.mutate(service.id)}
                        >
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
              <Button 
                className="bg-primary hover:bg-primary-600"
                onClick={() => setShowProfessionalForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </div>

            {showProfessionalForm && (
              <ProfessionalForm
                onSubmit={handleProfessionalSubmit}
                onCancel={() => {
                  setShowProfessionalForm(false);
                  setEditingProfessional(null);
                }}
                initialData={editingProfessional}
              />
            )}

            <div className="grid gap-4">
              {professionals.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum profissional cadastrado</p>
                    <p className="text-sm mt-2">
                      Adicione profissionais para começar a receber agendamentos
                    </p>
                  </CardContent>
                </Card>
              ) : (
                professionals.map((professional) => (
                  <Card key={professional.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-lg">{professional.name}</h3>
                          <div className="flex space-x-2 mt-2">
                            {professional.specialties?.map((specialty: string) => (
                              <Badge key={specialty} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={professional.is_active ? "default" : "secondary"}>
                          {professional.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProfessional(professional)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteProfessional.mutate(professional.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
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
                  <p>Relatórios disponíveis após os primeiros agendamentos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Configurações</h2>
            <SettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
