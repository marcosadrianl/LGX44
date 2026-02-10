"use client";

import { usePedidos } from "./hooks/usePedidos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sumKilosAuth, sumKilos, diffKilos } from "./lib/sumKilos";
import Header from "./lib/header";
import { TotalKilos } from "./lib/totalKilos";
import { PedidoListHeader } from "./lib/PedidosListHeader";
import { NuevoPedidoForm } from "./lib/NuevoPedidoForm";
import { EditPedidoForm } from "./lib/EditPedidoForm";
import { PedidoItem } from "./lib/PedidoItem";
import { LoginModal } from "./lib/LoginModal";
import { useAuth } from "./context/AuthContext";

export default function Page() {
  const { sucursal, isAuthenticated, login, logout, isLoading, error } =
    useAuth();
  const {
    pedidos,
    addPedido,
    updatePedido,
    deletePedido,
    deleteAuthorizedPedidos,
  } = usePedidos(sucursal?.id || null);

  const [nuevoPedido, setNuevoPedido] = useState({
    fecha: new Date().toISOString().split("T")[0],
    numero: "",
    peso: "",
    autorizado: false,
    notes: "",
  });

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [pedidoEdit, setPedidoEdit] = useState<typeof nuevoPedido | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevoPedido.numero || !nuevoPedido.peso || !sucursal) return;

    addPedido({
      id: uuidv4(),
      fecha: nuevoPedido.fecha,
      numero: nuevoPedido.numero,
      peso: Number(nuevoPedido.peso),
      autorizado: nuevoPedido.autorizado,
      notes: String(nuevoPedido.notes),
      sucursalId: sucursal.id,
    });

    setNuevoPedido({
      fecha: new Date().toISOString().split("T")[0],
      numero: "",
      peso: "",
      autorizado: false,
      notes: "",
    });
  };

  const handleSaveEdit = (id: string) => {
    if (!pedidoEdit) return;

    updatePedido(id, {
      fecha: pedidoEdit.fecha,
      numero: pedidoEdit.numero,
      peso: Number(pedidoEdit.peso),
      autorizado: pedidoEdit.autorizado,
      notes: String(pedidoEdit.notes),
    });

    setEditandoId(null);
    setPedidoEdit(null);
  };

  const totalKilosAuth = sumKilosAuth(pedidos);
  const totalKilosAll = sumKilos(pedidos);
  const diffKilosKilos = diffKilos(pedidos);

  const handleLogin = async (code: string) => {
    const success = await login(code);
    return success;
  };

  // Mostrar modal de login si no está autenticado
  if (!isAuthenticated) {
    return (
      <LoginModal
        onLogin={handleLogin}
        isLoading={isLoading}
        error={error || undefined}
      />
    );
  }

  return (
    <main className="flex flex-col flex-1">
      <Header sucursal={sucursal} onLogout={logout} />
      <div className="flex flex-col lg:flex-row gap-8 p-1">
        <div className="flex flex-col w-1/2">
          <div className="px-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold mb-1">Resumen</h2>
            <TotalKilos totalKilos={totalKilosAll} type="all" />
            <TotalKilos totalKilos={totalKilosAuth} type="auth" />
            <TotalKilos totalKilos={diffKilosKilos} type="diff" />
          </div>
          <NuevoPedidoForm
            nuevoPedido={nuevoPedido}
            setNuevoPedido={setNuevoPedido}
            onSubmit={handleAdd}
          />
        </div>
        <div className="w-full lg:w-1/2 bg-white flex flex-col max-h-[500px]">
          <PedidoListHeader
            onClear={() => deletePedido("all")}
            onClearAuthorized={deleteAuthorizedPedidos}
          />
          <div className="overflow-y-auto flex-1 p-1">
            {pedidos.length === 0 ? (
              <p className="text-gray-500">No hay pedidos registrados.</p>
            ) : (
              <ul className="space-y-3 mt-1">
                {pedidos.map((pedido) => (
                  <li
                    key={pedido.id}
                    className={`border border-gray-300 rounded p-4 hover:bg-gray-50 text-sm transition-[max-height] duration-300 ease-in-out ${
                      editandoId === pedido.id
                        ? "overflow-hidden"
                        : "overflow-visible"
                    }`}
                    style={{
                      maxHeight: editandoId === pedido.id ? "520px" : "180px",
                    }}
                  >
                    {editandoId === pedido.id ? (
                      <EditPedidoForm
                        pedidoEdit={pedidoEdit!}
                        setPedidoEdit={setPedidoEdit}
                        onSave={() => handleSaveEdit(pedido.id)}
                        onCancel={() => {
                          setEditandoId(null);
                          setPedidoEdit(null);
                        }}
                      />
                    ) : (
                      // 📌 Vista normal
                      <PedidoItem
                        pedido={pedido}
                        onAuthorize={() =>
                          updatePedido(pedido.id, { autorizado: true })
                        }
                        onEdit={() => {
                          setEditandoId(pedido.id);
                          setPedidoEdit({
                            ...pedido,
                            peso: pedido.peso.toFixed(0),
                          });
                        }}
                        onDelete={() => deletePedido(pedido.id)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
