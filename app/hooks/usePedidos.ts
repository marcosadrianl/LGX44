import { useEffect, useState } from "react";
import { Pedido } from "../lib/definitions";
import { supabase } from "../lib/supabaseClient";

export function usePedidos(sucursalId: string | null) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar pedidos desde Supabase
  useEffect(() => {
    if (!sucursalId) {
      setPedidos([]);
      setIsLoading(false);
      return;
    }

    const fetchPedidos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("pedidos")
          .select("*")
          .eq("sucursalId", sucursalId)
          .order("fecha", { ascending: false });

        if (fetchError) throw fetchError;

        setPedidos(data || []);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel("pedidos_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pedidos",
          filter: `sucursalId=eq.${sucursalId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPedidos((prev) => [payload.new as Pedido, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setPedidos((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? (payload.new as Pedido) : p,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setPedidos((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sucursalId]);

  const addPedido = async (newPedido: Pedido) => {
    try {
      // Verificar si ya existe un pedido con el mismo número
      const { data: existing } = await supabase
        .from("pedidos")
        .select("id")
        .eq("numero", newPedido.numero)
        .eq("sucursalId", newPedido.sucursalId)
        .single();

      if (existing) {
        alert("El número de pedido ya existe.");
        return;
      }

      const { error } = await supabase.from("pedidos").insert([newPedido]);

      if (error) throw error;
    } catch (err) {
      console.error("Error al agregar pedido:", err);
      alert(
        "Error al agregar pedido: " + (err instanceof Error ? err.message : ""),
      );
    }
  };

  const updatePedido = async (id: string, updated: Partial<Pedido>) => {
    try {
      const { error } = await supabase
        .from("pedidos")
        .update(updated)
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error("Error al actualizar pedido:", err);
      alert(
        "Error al actualizar pedido: " +
          (err instanceof Error ? err.message : ""),
      );
    }
  };

  const deletePedido = async (id: string) => {
    if (id === "all") {
      const confirmAll = window.confirm(
        "¿Desea eliminar todos los pedidos de esta sucursal?",
      );
      if (!confirmAll) return;
      if (!sucursalId) return;

      try {
        const { error } = await supabase
          .from("pedidos")
          .delete()
          .eq("sucursalId", sucursalId);

        if (error) throw error;
        setPedidos([]);
      } catch (err) {
        console.error("Error al eliminar pedidos:", err);
        alert(
          "Error al eliminar pedidos: " +
            (err instanceof Error ? err.message : ""),
        );
      }
      return;
    }

    const confirm = window.confirm("¿Desea eliminar el pedido?");
    if (!confirm) return;

    try {
      const { error } = await supabase.from("pedidos").delete().eq("id", id);

      if (error) throw error;

      setPedidos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar pedido:", err);
      alert(
        "Error al eliminar pedido: " +
          (err instanceof Error ? err.message : ""),
      );
    }
  };

  return { pedidos, addPedido, updatePedido, deletePedido, isLoading, error };
}
