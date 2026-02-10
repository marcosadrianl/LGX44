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

  onDelete: () => void;
}

export const PedidoItem = ({
  pedido,

  onDelete,
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

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex items-center gap-2 h-fit">
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
