export interface Pedido {
  id: string; // UUID o timestamp para identificar
  fecha: string; // YYYY-MM-DD
  numero: number; // número de pedido
  peso: number; // en kg, por ejemplo
  notes: string;
  autorizado: boolean;
  entregado: boolean;
}
