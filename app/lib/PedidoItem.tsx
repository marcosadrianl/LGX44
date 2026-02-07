import { useEffect, useRef, useState } from "react";
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
  onAuthorize: () => void;
}

export const PedidoItem = ({
  pedido,
  onEdit,
  onDelete,
  onAuthorize,
}: PedidoItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  return (
    <div className="flex justify-between items-start gap-4">
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
      <div className="flex items-center gap-2 h-fit">
        <button
          onClick={onAuthorize}
          disabled={pedido.autorizado}
          className={`px-3 py-1 rounded font-semibold text-white transition ${
            pedido.autorizado
              ? "bg-green-400 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-green-700"
          }`}
        >
          {pedido.autorizado ? "Autorizado" : "Autorizar"}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ...
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-10"
            >
              <button
                onClick={handleEdit}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                role="menuitem"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
