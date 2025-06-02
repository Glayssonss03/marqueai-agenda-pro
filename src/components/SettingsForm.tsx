
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/useSettings";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

type DaySchedule = {
  open: string;
  close: string;
  closed: boolean;
};

type OpeningHours = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

type FormDataType = {
  opening_hours: OpeningHours;
  whatsapp_number: string;
  whatsapp_notifications: boolean;
  email_notifications: boolean;
  cancellation_policy: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
};

export const SettingsForm = () => {
  const { settings, isLoading, updateSettings } = useSettings();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormDataType>({
    opening_hours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "09:00", close: "18:00", closed: true },
    },
    whatsapp_number: "",
    whatsapp_notifications: true,
    email_notifications: true,
    cancellation_policy: "Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência.",
    primary_color: "#007BFF",
    secondary_color: "#FFFFFF",
    logo_url: "",
  });

  const [publicLink, setPublicLink] = useState("");

  useEffect(() => {
    if (settings) {
      setFormData(prev => ({
        ...prev,
        opening_hours: (settings.opening_hours as OpeningHours) || prev.opening_hours,
        whatsapp_number: settings.whatsapp_number || "",
        whatsapp_notifications: settings.whatsapp_notifications ?? true,
        email_notifications: settings.email_notifications ?? true,
        cancellation_policy: settings.cancellation_policy || prev.cancellation_policy,
      }));
    }
  }, [settings]);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        primary_color: profile.primary_color || "#007BFF",
        secondary_color: profile.secondary_color || "#FFFFFF",
        logo_url: profile.logo_url || "",
      }));
      
      if (profile.slug) {
        setPublicLink(`${window.location.origin}/agendar/${profile.slug}`);
      }
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Atualizar configurações da barbearia
      await updateSettings.mutateAsync({
        opening_hours: formData.opening_hours,
        whatsapp_number: formData.whatsapp_number,
        whatsapp_notifications: formData.whatsapp_notifications,
        email_notifications: formData.email_notifications,
        cancellation_policy: formData.cancellation_policy,
      });

      // Atualizar perfil com cores e logo
      await updateProfile.mutateAsync({
        primary_color: formData.primary_color,
        secondary_color: formData.secondary_color,
        logo_url: formData.logo_url,
      });

    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  const copyPublicLink = () => {
    navigator.clipboard.writeText(publicLink);
    toast({
      title: "Link copiado!",
      description: "O link da sua página de agendamento foi copiado para a área de transferência.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Link Público */}
      <Card>
        <CardHeader>
          <CardTitle>Link Público da Barbearia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Seu link de agendamento</Label>
            <div className="flex gap-2">
              <Input
                value={publicLink}
                readOnly
                className="bg-gray-50"
              />
              <Button onClick={copyPublicLink} variant="outline">
                Copiar
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Compartilhe este link com seus clientes para eles agendarem online
            </p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personalização */}
        <Card>
          <CardHeader>
            <CardTitle>Personalização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo_url">URL do Logo</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_color">Cor Primária</Label>
                <Input
                  id="primary_color"
                  type="color"
                  value={formData.primary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="secondary_color">Cor Secundária</Label>
                <Input
                  id="secondary_color"
                  type="color"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horários de Funcionamento */}
        <Card>
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(formData.opening_hours).map(([day, hours]) => {
              const dayNames: Record<string, string> = {
                monday: "Segunda-feira",
                tuesday: "Terça-feira",
                wednesday: "Quarta-feira",
                thursday: "Quinta-feira",
                friday: "Sexta-feira",
                saturday: "Sábado",
                sunday: "Domingo",
              };

              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <span className="text-sm font-medium">{dayNames[day]}</span>
                  </div>
                  <Switch
                    checked={!hours.closed}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        opening_hours: {
                          ...prev.opening_hours,
                          [day]: { ...hours, closed: !checked }
                        }
                      }))
                    }
                  />
                  {!hours.closed && (
                    <>
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            opening_hours: {
                              ...prev.opening_hours,
                              [day]: { ...hours, open: e.target.value }
                            }
                          }))
                        }
                        className="w-24"
                      />
                      <span>às</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            opening_hours: {
                              ...prev.opening_hours,
                              [day]: { ...hours, close: e.target.value }
                            }
                          }))
                        }
                        className="w-24"
                      />
                    </>
                  )}
                  {hours.closed && (
                    <span className="text-gray-500">Fechado</span>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp_notifications">Notificações WhatsApp</Label>
              <Switch
                id="whatsapp_notifications"
                checked={formData.whatsapp_notifications}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, whatsapp_notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="email_notifications">Notificações E-mail</Label>
              <Switch
                id="email_notifications"
                checked={formData.email_notifications}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, email_notifications: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Política de Cancelamento */}
        <Card>
          <CardHeader>
            <CardTitle>Política de Cancelamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="cancellation_policy">Texto da Política</Label>
            <Input
              id="cancellation_policy"
              value={formData.cancellation_policy}
              onChange={(e) => setFormData(prev => ({ ...prev, cancellation_policy: e.target.value }))}
              placeholder="Ex: Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência"
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
          Salvar Configurações
        </Button>
      </form>
    </div>
  );
};
