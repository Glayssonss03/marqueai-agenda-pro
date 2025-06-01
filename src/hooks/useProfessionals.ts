
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProfessionals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: professionals = [], isLoading } = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("profile_id", user.id)
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const addProfessional = useMutation({
    mutationFn: async (professional: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("professionals")
        .insert({ ...professional, profile_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({ title: "Profissional adicionado com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar profissional",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const updateProfessional = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase
        .from("professionals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({ title: "Profissional atualizado com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar profissional",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const deleteProfessional = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("professionals")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      toast({ title: "Profissional removido com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover profissional",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  return {
    professionals,
    isLoading,
    addProfessional,
    updateProfessional,
    deleteProfessional,
  };
};
