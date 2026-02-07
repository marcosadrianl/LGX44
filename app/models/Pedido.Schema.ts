export interface Sucursal {
  id: string;
  name: string; //LGX-SUC-##
  passkey: number;
}

export interface Pedido {
  id: string;
  fecha: string;
  numero: string;
  peso: number;
  autorizado: boolean;
  notes: string;
  sucursalId: string;
}
