
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useServices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("profile_id", user.id)
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const addService = useMutation({
    mutationFn: async (service: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("services")
        .insert({ ...service, profile_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Serviço adicionado com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao adicionar serviço",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const updateService = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Serviço atualizado com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar serviço",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Serviço removido com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover serviço",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  return {
    services,
    isLoading,
    addService,
    updateService,
    deleteService,
  };
};
