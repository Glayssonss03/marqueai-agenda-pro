
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Demo() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableTimes] = useState([
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ]);

  const [formData, setFormData] = useState({
    service_id: "",
    professional_id: "any",
    client_name: "",
    client_email: "",
    client_phone: "",
    appointment_time: "",
    notes: "",
  });

  // Dados de demonstração
  const demoBarbershop = {
    barbershop_name: "Barbearia Demo",
    logo_url: null,
  };

  const demoServices = [
    { id: "1", name: "Corte Masculino", description: "Corte moderno e estiloso", price: "30", duration_minutes: 30 },
    { id: "2", name: "Barba", description: "Aparar e modelar barba", price: "20", duration_minutes: 20 },
    { id: "3", name: "Corte + Barba", description: "Pacote completo", price: "45", duration_minutes: 50 },
  ];

  const demoProfessionals = [
    { id: "1", name: "João Silva", specialties: ["Corte", "Barba"] },
    { id: "2", name: "Pedro Santos", specialties: ["Corte"] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service_id || !formData.client_name || !formData.client_email || !formData.client_phone || !formData.appointment_time) {
      toast({
        title: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Simulação de agendamento bem-sucedido
    toast({
      title: "Agendamento confirmado! (DEMO)",
      description: "Esta é uma demonstração. Em um ambiente real, você receberia uma confirmação.",
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="bg-primary text-white rounded-lg p-3 mb-4 inline-block">
            <h1 className="text-2xl font-bold">BB</h1>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {demoBarbershop.barbershop_name}
          </h1>
          <p className="text-gray-600">Faça seu agendamento online - DEMONSTRAÇÃO</p>
          <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg inline-block">
            🎯 Esta é uma página de demonstração do sistema Marqueai
          </div>
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
                {demoServices.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
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
                {demoProfessionals.map((professional) => (
                  <div key={professional.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                      {professional.name.charAt(0)}
                    </div>
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
                        {demoServices.map((service) => (
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
                        {demoProfessionals.map((professional) => (
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
                    Confirmar Agendamento (DEMO)
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
