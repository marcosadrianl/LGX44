import { formatDate } from "../lib/dateFormat";

interface PedidoItemProps {
  pedido: {
    id: string;
    fecha: string;
    numero: string;
    peso: number;
    autorizado: boolean;
    entregado: boolean;
    notes: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const PedidoItem = ({ pedido, onEdit, onDelete }: PedidoItemProps) => {
  return (
    <div className="flex justify-between">
      <div>
        <p className="font-semibold">
          {formatDate(pedido.fecha)} | Nº {pedido.numero} | {pedido.peso} kg
        </p>
        <p className="text-gray-700 bg-amber-200 mr-4 whitespace-pre-line">
          {pedido.notes == "" ? "Sin observaciones" : pedido.notes}
        </p>
        <p>
          Autorizado:{" "}
          <span
            className={pedido.autorizado ? "text-green-600" : "text-red-600"}
          >
            {pedido.autorizado ? "Sí" : "No"}
          </span>{" "}
          | Entregado:{" "}
          <span
            className={pedido.entregado ? "text-green-600" : "text-red-600"}
          >
            {pedido.entregado ? "Sí" : "No"}
          </span>
        </p>
      </div>
      <div className="flex gap-2 h-fit">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
