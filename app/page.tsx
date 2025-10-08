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

export default function Page() {
  const { pedidos, addPedido, updatePedido, deletePedido } = usePedidos();

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
    //limpiar el formulario
    e.preventDefault();

    if (!nuevoPedido.numero || !nuevoPedido.peso) return;

    //luego de agregar el pedido, limpiar el formulario
    addPedido({
      id: uuidv4(),
      fecha: nuevoPedido.fecha,
      numero: nuevoPedido.numero,
      peso: Number(nuevoPedido.peso),
      autorizado: nuevoPedido.autorizado,
      notes: String(nuevoPedido.notes),
    });

    //setNuevo pedido debe borrar todo y dejar la fecha de hoy
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
    console.log(pedidoEdit.fecha);

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

  //console.log(pedidos);

  return (
    <main className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-col lg:flex-row gap-8 p-1">
        <NuevoPedidoForm
          nuevoPedido={nuevoPedido}
          setNuevoPedido={setNuevoPedido}
          onSubmit={handleAdd}
        />
        <div className="p-6  w-full lg:w-1/2 bg-white">
          <PedidoListHeader onClear={() => deletePedido("all")} />
          <TotalKilos totalKilos={totalKilosAll} type="all" />
          <TotalKilos totalKilos={totalKilosAuth} type="auth" />
          <TotalKilos totalKilos={diffKilosKilos} type="diff" />

          <hr />
          <div className="mt-4 overflow-y-auto">
            {pedidos.length === 0 ? (
              <p className="text-gray-500">No hay pedidos registrados.</p>
            ) : (
              <ul className="space-y-3 mt-1">
                {pedidos.map((pedido) => (
                  <li
                    key={pedido.id}
                    className="border rounded p-4 hover:bg-gray-200 "
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
