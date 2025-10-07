import { Pedido } from "./definitions";

export const sumKilosAuth = (pedidos: Pedido[]): number => {
  return pedidos
    .filter((pedido) => pedido.autorizado)
    .reduce((total, pedido) => total + pedido.peso, 0);
};

export const sumKilos = (pedidos: Pedido[]): number => {
  return pedidos.reduce((total, pedido) => total + pedido.peso, 0);
};

export const diffKilos = (pedidos: Pedido[]): number => {
  const totalAuth = sumKilosAuth(pedidos);
  const totalAll = sumKilos(pedidos);
  return totalAll - totalAuth;
};
