import { Pedido } from "@/app/lib/definitions";

export function sumKilos(pedidos: Pedido[]): number {
  return pedidos.reduce((total, pedido) => total + Math.round(pedido.peso), 0);
}
