import { handleKeyDown } from "./accesFunc";

export interface Pedido {
  fecha: string;
  numero: string;
  peso: string;
  autorizado: boolean;

  notes: string;
}

interface NuevoPedidoFormProps {
  nuevoPedido: Pedido;
  setNuevoPedido: (pedido: Pedido) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const NuevoPedidoForm = ({
  nuevoPedido,
  setNuevoPedido,
  onSubmit,
}: NuevoPedidoFormProps) => {
  return (
    <form className="p-4 lg:p-6 h-fit w-full lg:w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Nuevo Pedido</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-28 font-medium">Fecha</label>
          <input
            type="date"
            value={
              nuevoPedido.fecha
                ? nuevoPedido.fecha
                : new Date().toISOString().split("T")[0]
            }
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, fecha: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 font-medium">N° Pedido</label>
          <input
            type="number"
            placeholder="Ej: 1023"
            value={nuevoPedido.numero}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, numero: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 font-medium">Peso</label>
          <input
            type="number"
            placeholder="kg"
            value={nuevoPedido.peso}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, peso: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 font-medium">Observaciones</label>
          <textarea
            placeholder="Observaciones"
            maxLength={200}
            value={nuevoPedido.notes}
            onChange={(e) => {
              setNuevoPedido({ ...nuevoPedido, notes: e.target.value });
            }}
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex gap-6 mt-4 ">
          <label className="items-center gap-2 hidden">
            <input type="checkbox" />
            Autorizado
          </label>

          <label className="items-center gap-2 hidden">
            <input type="checkbox" />
            Entregado
          </label>
        </div>

        <button
          onClick={onSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Agregar Pedido
        </button>
      </div>
    </form>
  );
};
