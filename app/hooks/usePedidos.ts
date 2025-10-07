import { useEffect, useState } from "react";
import { Pedido } from "../lib/definitions";

const STORAGE_KEY = "pedidos";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPedidos(JSON.parse(stored));
    }
  }, []);

  // Guardar automáticamente cuando cambie la lista
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);

  const addPedido = (pedido: Pedido) => {
    setPedidos((prev) => [...prev, pedido]);
  };

  const updatePedido = (id: string, updated: Partial<Pedido>) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePedido = (id: string) => {
    const confirm = window.confirm("¿Desea eliminar el pedido?");

    if (!confirm) return;

    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  //limpiar todos los pedidos que esten entregados
  /*  const clearPedidos = () => {
    //preguntar si acepta o no eliminarlos
    const confirm = window.confirm(
      "¿Desea eliminar todos los pedidos entregados?"
    );

    if (!confirm) return;

    setPedidos((prev) => prev.filter((p) => !p.entregado));
  }; */

  return { pedidos, addPedido, updatePedido, deletePedido };
}
