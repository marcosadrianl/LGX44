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
    <form className="px-4 h-fit w-full mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-4">Ingresar Pedido</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-28">Fecha</label>
          <input
            type="date"
            value={nuevoPedido.fecha} // Agregado value
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, fecha: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28">N° Pedido</label>
          <input
            type="number"
            placeholder="Ej: 1023"
            value={nuevoPedido.numero} // Agregado value
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, numero: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28">Peso</label>
          <input
            type="number"
            placeholder="kg"
            value={nuevoPedido.peso} // Agregado value
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, peso: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28">Observaciones</label>
          <textarea
            placeholder="Observaciones (Opcional)"
            value={nuevoPedido.notes} // Agregado value
            maxLength={200}
            onChange={(e) => {
              setNuevoPedido({ ...nuevoPedido, notes: e.target.value });
            }}
            className="border rounded p-2 flex-1"
          />
        </div>

        <button
          onClick={onSubmit}
          type="submit"
          disabled={
            !nuevoPedido.fecha || !nuevoPedido.numero || !nuevoPedido.peso
          }
          className={`w-full py-2 rounded transition ${
            !nuevoPedido.fecha || !nuevoPedido.numero || !nuevoPedido.peso
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700 cursor-pointer"
          }`}
        >
          Agregar Pedido
        </button>
      </div>
    </form>
  );
};
