export interface Pedido {
  id: string; // UUID o timestamp para identificar
  fecha: string; // YYYY-MM-DD
  numero: string; // número de pedido
  peso: number; // en kg, por ejemplo
  notes: string;
  autorizado: boolean;
}
