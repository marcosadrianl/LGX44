import { formatDate } from "../lib/dateFormat";

interface PedidoItemProps {
  pedido: {
    id: string;
    fecha: string;
    numero: string;
    peso: number;
    autorizado: boolean;
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
          Nº {pedido.numero} | {pedido.peso} kg
        </p>
        <p className="text-gray-700  mr-4 whitespace-pre-line">
          {pedido.notes == "" ? "" : pedido.notes}
        </p>
        <p>
          Autorizado:{" "}
          <span
            className={pedido.autorizado ? "text-green-600" : "text-red-600"}
          >
            {pedido.autorizado ? "Sí" : "No"}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Fecha: {formatDate(pedido.fecha)}
        </p>
      </div>
      <div className="flex gap-2 h-fit">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
