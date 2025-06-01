
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  ArrowLeft,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const { toast } = useToast();

  const barbershop = {
    name: "Barbearia Moderna",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 99999-9999",
    rating: 4.8,
    reviews: 47
  };

  const services = [
    { id: 1, name: "Corte Simples", price: 25, duration: 30, description: "Corte básico com acabamento" },
    { id: 2, name: "Corte + Barba", price: 45, duration: 45, description: "Corte completo com barba aparada" },
    { id: 3, name: "Barba", price: 20, duration: 20, description: "Aparar e desenhar a barba" },
    { id: 4, name: "Bigode", price: 15, duration: 15, description: "Aparar e modelar bigode" },
  ];

  const professionals = [
    { id: 1, name: "Carlos Silva", specialties: ["Corte", "Barba"], rating: 4.9 },
    { id: 2, name: "André Costa", specialties: ["Corte", "Bigode"], rating: 4.7 },
  ];

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleProfessionalSelect = (professional: any) => {
    setSelectedProfessional(professional);
    setStep(3);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(4);
  };

  const handleClientDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingConfirm = () => {
    if (!clientData.name || !clientData.phone) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha nome e telefone.",
        variant: "destructive",
      });
      return;
    }

    setStep(5);
    toast({
      title: "Agendamento confirmado! 🎉",
      description: "Você receberá uma confirmação por WhatsApp em breve.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Marqueai</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Informações da Barbearia */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{barbershop.name}</h1>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{barbershop.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{barbershop.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{barbershop.rating} • {barbershop.reviews} avaliações</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step > stepNum ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha o serviço</CardTitle>
              <CardDescription>Selecione o serviço que deseja agendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration} min
                          </Badge>
                          <span className="font-bold text-primary">R$ {service.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha o profissional</CardTitle>
              <CardDescription>Selecione o profissional de sua preferência</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {professionals.map((professional) => (
                  <div
                    key={professional.id}
                    onClick={() => handleProfessionalSelect(professional)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{professional.name}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{professional.rating}</span>
                          <div className="flex space-x-1">
                            {professional.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha data e horário</CardTitle>
              <CardDescription>Selecione quando deseja ser atendido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Data</Label>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                    {["Hoje", "Amanhã", "Quinta", "Sexta", "Sábado", "Domingo", "Segunda"].map((date, index) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        onClick={() => setSelectedDate(date)}
                        className="p-3"
                      >
                        {date}
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Horário disponível</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="p-3"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <Button 
                    onClick={() => handleDateTimeSelect(selectedDate, selectedTime)}
                    className="w-full bg-primary hover:bg-primary-600"
                  >
                    Continuar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Seus dados</CardTitle>
              <CardDescription>Precisamos de algumas informações para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={clientData.name}
                    onChange={handleClientDataChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={clientData.phone}
                    onChange={handleClientDataChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail (opcional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={clientData.email}
                    onChange={handleClientDataChange}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Resumo do agendamento */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-3">Resumo do agendamento</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Serviço:</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profissional:</span>
                    <span>{selectedProfessional?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horário:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total:</span>
                    <span>R$ {selectedService?.price}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleBookingConfirm}
                className="w-full bg-primary hover:bg-primary-600"
              >
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Agendamento confirmado!
              </h2>
              <p className="text-gray-600 mb-6">
                Seu agendamento foi realizado com sucesso. Você receberá uma confirmação 
                via WhatsApp em breve com todos os detalhes.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-3">Detalhes do agendamento</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cliente:</span>
                    <span>{clientData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serviço:</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profissional:</span>
                    <span>{selectedProfessional?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data e hora:</span>
                    <span>{selectedDate} às {selectedTime}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Valor:</span>
                    <span>R$ {selectedService?.price}</span>
                  </div>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline">
                  Voltar ao início
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Booking;
