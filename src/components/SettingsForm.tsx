
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { useSettings } from "@/hooks/useSettings";

export const SettingsForm = () => {
  const { profile, updateProfile } = useProfile();
  const { settings, updateSettings } = useSettings();

  const [profileData, setProfileData] = useState({
    barbershop_name: "",
    primary_color: "#007BFF",
    secondary_color: "#FFFFFF",
    slug: "",
  });

  const [settingsData, setSettingsData] = useState({
    cancellation_policy: "",
    email_notifications: true,
    whatsapp_notifications: true,
    whatsapp_number: "",
    opening_hours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "09:00", close: "18:00", closed: true },
    },
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        barbershop_name: profile.barbershop_name || "",
        primary_color: profile.primary_color || "#007BFF",
        secondary_color: profile.secondary_color || "#FFFFFF",
        slug: profile.slug || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (settings) {
      setSettingsData({
        cancellation_policy: settings.cancellation_policy || "",
        email_notifications: settings.email_notifications ?? true,
        whatsapp_notifications: settings.whatsapp_notifications ?? true,
        whatsapp_number: settings.whatsapp_number || "",
        opening_hours: settings.opening_hours || settingsData.opening_hours,
      });
    }
  }, [settings]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(profileData);
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(settingsData);
  };

  const updateOpeningHours = (day: string, field: string, value: any) => {
    setSettingsData(prev => ({
      ...prev,
      opening_hours: {
        ...prev.opening_hours,
        [day]: {
          ...prev.opening_hours[day],
          [field]: value,
        },
      },
    }));
  };

  const days = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ];

  return (
    <div className="space-y-6">
      {/* Informações da Barbearia */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Barbearia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <Label htmlFor="barbershop_name">Nome da Barbearia</Label>
              <Input
                id="barbershop_name"
                value={profileData.barbershop_name}
                onChange={(e) => setProfileData(prev => ({ ...prev, barbershop_name: e.target.value }))}
                placeholder="Nome da sua barbearia"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_color">Cor Principal</Label>
                <Input
                  id="primary_color"
                  type="color"
                  value={profileData.primary_color}
                  onChange={(e) => setProfileData(prev => ({ ...prev, primary_color: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="secondary_color">Cor Secundária</Label>
                <Input
                  id="secondary_color"
                  type="color"
                  value={profileData.secondary_color}
                  onChange={(e) => setProfileData(prev => ({ ...prev, secondary_color: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="slug">Link Personalizado</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">marqueai.com/</span>
                <Input
                  id="slug"
                  value={profileData.slug}
                  onChange={(e) => setProfileData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="minha-barbearia"
                />
              </div>
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary-600">
              Salvar Informações
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Horários de Funcionamento */}
      <Card>
        <CardHeader>
          <CardTitle>Horários de Funcionamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            {days.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-32">
                  <span className="font-medium">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={!settingsData.opening_hours[key]?.closed}
                    onCheckedChange={(checked) => updateOpeningHours(key, "closed", !checked)}
                  />
                  <span className="text-sm">Aberto</span>
                </div>
                {!settingsData.opening_hours[key]?.closed && (
                  <>
                    <Input
                      type="time"
                      value={settingsData.opening_hours[key]?.open || "09:00"}
                      onChange={(e) => updateOpeningHours(key, "open", e.target.value)}
                      className="w-32"
                    />
                    <span>às</span>
                    <Input
                      type="time"
                      value={settingsData.opening_hours[key]?.close || "18:00"}
                      onChange={(e) => updateOpeningHours(key, "close", e.target.value)}
                      className="w-32"
                    />
                  </>
                )}
              </div>
            ))}
          </form>
        </CardContent>
      </Card>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cancellation_policy">Política de Cancelamento</Label>
              <Textarea
                id="cancellation_policy"
                value={settingsData.cancellation_policy}
                onChange={(e) => setSettingsData(prev => ({ ...prev, cancellation_policy: e.target.value }))}
                placeholder="Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={settingsData.whatsapp_number}
                onChange={(e) => setSettingsData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Notificações por E-mail</Label>
                <Switch
                  checked={settingsData.email_notifications}
                  onCheckedChange={(checked) => setSettingsData(prev => ({ ...prev, email_notifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notificações por WhatsApp</Label>
                <Switch
                  checked={settingsData.whatsapp_notifications}
                  onCheckedChange={(checked) => setSettingsData(prev => ({ ...prev, whatsapp_notifications: checked }))}
                />
              </div>
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary-600">
              Salvar Configurações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
