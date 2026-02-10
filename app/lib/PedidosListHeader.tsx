import { useEffect, useRef, useState } from "react";

interface PedidoListHeaderProps {
  onClear: () => void;
  onClearAuthorized: () => void;
}

export const PedidoListHeader = ({
  onClear,
  onClearAuthorized,
}: PedidoListHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center px-4 pb-2">
      <h2 className="text-xl font-semibold mb-1">Listado de Pedidos</h2>

      {/* Menú */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          className="px-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ...
        </button>

        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-gray-200 bg-white shadow-md"
          >
            <button
              role="menuitem"
              onClick={() => {
                onClearAuthorized();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50"
            >
              Eliminar Autorizados
            </button>

            <button
              role="menuitem"
              onClick={() => {
                onClear();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Eliminar Todos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
