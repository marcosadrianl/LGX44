import { handleKeyDown } from "../lib/accesFunc";

interface Pedido {
  fecha: string;
  numero: string;
  peso: string;
  autorizado: boolean;
  entregado: boolean;
  notes: string;
}

interface EditPedidoFormProps {
  pedidoEdit: Pedido;
  setPedidoEdit: (pedido: Pedido) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditPedidoForm = ({
  pedidoEdit,
  setPedidoEdit,
  onSave,
  onCancel,
}: EditPedidoFormProps) => {
  return (
    <div className="space-y-3">
      <input
        type="date"
        value={pedidoEdit?.fecha}
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          setPedidoEdit({
            ...pedidoEdit!,
            fecha: e.target.value,
          })
        }
        className="border rounded p-2 w-full"
      />
      <input
        type="number"
        value={pedidoEdit?.numero || ""}
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          setPedidoEdit({
            ...pedidoEdit!,
            numero: e.target.value,
          })
        }
        className="border rounded p-2 w-full"
      />
      <input
        type="number"
        value={pedidoEdit?.peso || ""}
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          setPedidoEdit({
            ...pedidoEdit!,
            peso: e.target.value,
          })
        }
        className="border rounded p-2 w-full"
      />
      <textarea
        value={pedidoEdit?.notes || ""}
        placeholder="Observaciones"
        maxLength={200}
        onChange={(e) =>
          setPedidoEdit({
            ...pedidoEdit!,
            notes: e.target.value,
          })
        }
        className="border rounded p-2 w-full"
      />
      <div className="flex gap-4">
        <button
          onClick={onSave}
          className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-400 text-white py-1 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
