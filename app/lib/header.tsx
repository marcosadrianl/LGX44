import { Sucursal } from "../models/Pedido.Schema";

interface HeaderProps {
  sucursal: Sucursal | null;
  onLogout?: () => void;
}

export default function Header({ sucursal, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-300 text-gray-700 w-full">
      <div className="flex items-center justify-between px-4 py-1">
        <h1 className="text-2xl font-bold text-center lg:text-left">
          CONTROL DE PESOS Y PEDIDOS - {sucursal?.name || "LGX"}
        </h1>
        {onLogout && (
          <button
            onClick={onLogout}
            className="bg-slate-200 hover:bg-slate-50 cursor-pointer px-4 py-1 text-sm font-semibold transition"
          >
            Salir
          </button>
        )}
      </div>
    </header>
  );
}
