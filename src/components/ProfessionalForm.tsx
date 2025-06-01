
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

interface ProfessionalFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const ProfessionalForm = ({ onSubmit, onCancel, initialData }: ProfessionalFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    specialties: initialData?.specialties || [],
    photo_url: initialData?.photo_url || "",
  });
  const [newSpecialty, setNewSpecialty] = useState("");

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((s: string) => s !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
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
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nome do profissional"
              required
            />
          </div>

          <div>
            <Label htmlFor="photo_url">Foto de Perfil (URL)</Label>
            <Input
              id="photo_url"
              value={formData.photo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div>
            <Label>Especialidades</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Digite uma especialidade"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
              />
              <Button type="button" onClick={addSpecialty} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                  {specialty}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeSpecialty(specialty)} 
                  />
                </Badge>
              ))}
            </div>
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
