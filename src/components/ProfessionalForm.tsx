
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfessionalFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const ProfessionalForm = ({ onSubmit, onCancel, initialData }: ProfessionalFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    specialties: initialData?.specialties?.[0] || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.specialties.trim()) {
      onSubmit({
        name: formData.name,
        specialties: [formData.specialties],
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Editar Profissional" : "Novo Profissional"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Profissional *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nome completo do profissional"
              required
            />
          </div>

          <div>
            <Label htmlFor="specialties">Especialidade *</Label>
            <Input
              id="specialties"
              value={formData.specialties}
              onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
              placeholder="Ex: Corte, Barba, Cabelo e Barba"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary-600">
              {initialData ? "Atualizar" : "Adicionar"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
