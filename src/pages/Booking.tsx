
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const { barbershopId } = useParams();
  const { toast } = useToast();
  
  const [barbershop, setBarbershop] = useState(null);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    service_id: "",
    professional_id: "any",
    client_name: "",
    client_email: "",
    client_phone: "",
    appointment_time: "",
    notes: "",
  });

  useEffect(() => {
    fetchBarbershopData();
  }, [barbershopId]);

  useEffect(() => {
    if (selectedDate) {
      generateAvailableTimes();
    }
  }, [selectedDate, formData.service_id, formData.professional_id]);

  const fetchBarbershopData = async () => {
    try {
      setLoading(true);
      
      // Buscar informações da barbearia
      const { data: barbershopData } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", barbershopId)
        .single();

      if (!barbershopData) {
        toast({
          title: "Barbearia não encontrada",
          variant: "destructive"
        });
        return;
      }

      setBarbershop(barbershopData);

      // Buscar serviços ativos
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("profile_id", barbershopData.id)
        .eq("is_active", true)
        .order("name");

      setServices(servicesData || []);

      // Buscar profissionais ativos
      const { data: professionalsData } = await supabase
        .from("professionals")
        .select("*")
        .eq("profile_id", barbershopData.id)
        .eq("is_active", true)
        .order("name");

      setProfessionals(professionalsData || []);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast({
        title: "Erro ao carregar dados da barbearia",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAvailableTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    setAvailableTimes(times);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service_id || !formData.client_name || !formData.client_email || !formData.client_phone || !formData.appointment_time) {
      toast({
        title: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      const selectedService = services.find(s => s.id === formData.service_id);
      let professional_id = formData.professional_id;
      
      // Se "any" foi selecionado, escolher o primeiro profissional disponível
      if (professional_id === "any" && professionals.length > 0) {
        professional_id = professionals[0].id;
      }

      const appointmentData = {
        profile_id: barbershop.id,
        service_id: formData.service_id,
        professional_id,
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_phone: formData.client_phone,
        appointment_date: selectedDate.toISOString().split('T')[0],
        appointment_time: formData.appointment_time,
        notes: formData.notes,
      };

      const { error } = await supabase
        .from("appointments")
        .insert(appointmentData);

      if (error) throw error;

      toast({
        title: "Agendamento confirmado!",
        description: "Você receberá uma confirmação em breve.",
      });

      // Limpar formulário
      setFormData({
        service_id: "",
        professional_id: "any",
        client_name: "",
        client_email: "",
        client_phone: "",
        appointment_time: "",
        notes: "",
      });

    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast({
        title: "Erro ao agendar",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!barbershop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Barbearia não encontrada</h1>
          <p className="text-gray-600">Verifique o link e tente novamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          {barbershop.logo_url && (
            <img 
              src={barbershop.logo_url} 
              alt={barbershop.barbershop_name}
              className="h-16 mx-auto mb-4"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {barbershop.barbershop_name}
          </h1>
          <p className="text-gray-600">Faça seu agendamento online</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Informações da Barbearia */}
          <div className="space-y-6">
            {/* Serviços */}
            <Card>
              <CardHeader>
                <CardTitle>Nossos Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-gray-600">{service.description}</p>
                      )}
                      <p className="text-sm text-gray-500">{service.duration_minutes} minutos</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">R$ {service.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle>Nossos Profissionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {professionals.map((professional) => (
                  <div key={professional.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {professional.photo_url && (
                      <img 
                        src={professional.photo_url} 
                        alt={professional.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{professional.name}</h3>
                      <div className="flex gap-1">
                        {professional.specialties?.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Agendamento */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Agendar Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="service_id">Serviço *</Label>
                    <Select
                      value={formData.service_id}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, service_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - R$ {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="professional_id">Profissional</Label>
                    <Select
                      value={formData.professional_id}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, professional_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Qualquer profissional disponível</SelectItem>
                        {professionals.map((professional) => (
                          <SelectItem key={professional.id} value={professional.id}>
                            {professional.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Data *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="appointment_time">Horário *</Label>
                    <Select
                      value={formData.appointment_time}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, appointment_time: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="client_name">Nome Completo *</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="client_email">E-mail *</Label>
                    <Input
                      id="client_email"
                      type="email"
                      value={formData.client_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="client_phone">Telefone *</Label>
                    <Input
                      id="client_phone"
                      value={formData.client_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Observações adicionais (opcional)"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
                    Confirmar Agendamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
