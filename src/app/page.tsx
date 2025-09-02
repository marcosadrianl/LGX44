"use client";

import { usePedidos } from "@/app/hooks/usePedidos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatDate, formatToISO, todayLocalISO } from "@/app/lib/dateFormat";
import { sumKilos } from "@/app/lib/sumKilos";
import Image from "next/image";

export default function Home() {
  const { pedidos, addPedido, updatePedido, deletePedido, clearPedidos } =
    usePedidos();

  const [nuevoPedido, setNuevoPedido] = useState({
    fecha: "",
    numero: "",
    peso: "",
    autorizado: false,
    entregado: false,
    notes: "",
  });

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [pedidoEdit, setPedidoEdit] = useState<typeof nuevoPedido | null>(null);

  const handleAdd = () => {
    if (!nuevoPedido.numero || !nuevoPedido.peso) return;

    addPedido({
      id: uuidv4(),
      fecha: nuevoPedido.fecha,
      numero: Number(nuevoPedido.numero),
      peso: Number(nuevoPedido.peso),
      autorizado: Boolean(nuevoPedido.autorizado),
      entregado: Boolean(nuevoPedido.entregado),
      notes: String(nuevoPedido.notes),
    });

    setNuevoPedido({
      fecha: "",
      numero: "",
      peso: "",
      autorizado: false,
      entregado: false,
      notes: "",
    });
  };

  const handleSaveEdit = (id: string) => {
    if (!pedidoEdit) return;
    console.log(pedidoEdit.fecha);

    updatePedido(id, {
      fecha: pedidoEdit.fecha,
      numero: Number(pedidoEdit.numero),
      peso: Number(pedidoEdit.peso),
      autorizado: pedidoEdit.autorizado,
      entregado: pedidoEdit.entregado,
      notes: String(pedidoEdit.notes),
    });

    setEditandoId(null);
    setPedidoEdit(null);
  };

  const totalKilos = sumKilos(pedidos);

  console.log(pedidos);

  return (
    <main className="relative p-8 text-black h-screen w-screen min-w-[1200px]">
      {/* <Image
        src="/R.jpg" // o una URL externa
        alt="Fondo"
        fill // ← esto hace que ocupe todo el contenedor
        className="object-cover -z-10"
        priority
      /> */}
      <h1 className="text-3xl text-white font-bold mb-8 text-left">
        Control de Pedidos - LGX 44
      </h1>

      <div className="grid grid-cols-2 gap-8 ">
        {/* 📌 Formulario */}
        <div className="border rounded-lg p-6 shadow-md bg-white h-fit">
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
                onChange={(e) =>
                  setNuevoPedido({ ...nuevoPedido, fecha: e.target.value })
                }
                className="border rounded p-2 flex-1"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">N° Pedido</label>
              <input
                type="text"
                placeholder="Ej: 1023"
                value={nuevoPedido.numero}
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
                onChange={(e) =>
                  setNuevoPedido({ ...nuevoPedido, peso: e.target.value })
                }
                className="border rounded p-2 flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">Observaciones</label>
              <input
                type="text"
                placeholder="Observaciones"
                value={nuevoPedido.notes}
                onChange={(e) =>
                  setNuevoPedido({ ...nuevoPedido, notes: e.target.value })
                }
                className="border rounded p-2 flex-1"
              />
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={nuevoPedido.autorizado}
                  onChange={(e) =>
                    setNuevoPedido({
                      ...nuevoPedido,
                      autorizado: e.target.checked,
                    })
                  }
                />
                Autorizado
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={nuevoPedido.entregado}
                  onChange={(e) =>
                    setNuevoPedido({
                      ...nuevoPedido,
                      entregado: e.target.checked,
                    })
                  }
                />
                Entregado
              </label>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Agregar Pedido
            </button>
          </div>
        </div>

        {/* 📌 Listado con overflow y auto*/}
        <div className="border rounded-lg p-6 shadow-md bg-white">
          <div className="flex justify-between items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold mb-1">Listado de Pedidos</h2>
            <button
              onClick={clearPedidos}
              className="text-red-600 hover:text-red-800 transition"
            >
              Limpiar todos los pedidos
            </button>
          </div>
          <h3 className="text-gray-500 mb-4">Total {totalKilos}kg</h3>
          <hr />
          {pedidos.length === 0 ? (
            <p className="text-gray-500">No hay pedidos registrados.</p>
          ) : (
            <ul className="space-y-3 mt-1">
              {pedidos.map((pedido) => (
                <li
                  key={pedido.id}
                  className="border rounded p-4 hover:shadow-sm transition"
                >
                  {editandoId === pedido.id ? (
                    // 📌 Formulario de edición
                    <div className="space-y-3">
                      <input
                        type="date"
                        value={pedidoEdit?.fecha}
                        onChange={(e) =>
                          setPedidoEdit({
                            ...pedidoEdit!,
                            fecha: e.target.value,
                          })
                        }
                        className="border rounded p-2 w-full"
                      />
                      <input
                        type="text"
                        value={pedidoEdit?.numero || ""}
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
                        onChange={(e) =>
                          setPedidoEdit({
                            ...pedidoEdit!,
                            peso: e.target.value,
                          })
                        }
                        className="border rounded p-2 w-full"
                      />
                      <input
                        type="text"
                        value={pedidoEdit?.notes || ""}
                        onChange={(e) =>
                          setPedidoEdit({
                            ...pedidoEdit!,
                            notes: e.target.value,
                          })
                        }
                        className="border rounded p-2 w-full"
                      />

                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={pedidoEdit?.autorizado || false}
                            onChange={(e) =>
                              setPedidoEdit({
                                ...pedidoEdit!,
                                autorizado: e.target.checked,
                              })
                            }
                          />
                          Autorizado
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={pedidoEdit?.entregado || false}
                            onChange={(e) =>
                              setPedidoEdit({
                                ...pedidoEdit!,
                                entregado: e.target.checked,
                              })
                            }
                          />
                          Entregado
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleSaveEdit(pedido.id)}
                          className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => {
                            setEditandoId(null);
                            setPedidoEdit(null);
                          }}
                          className="flex-1 bg-gray-400 text-white py-1 rounded hover:bg-gray-500"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 📌 Vista normal
                    <div className="flex justify-between ">
                      <div>
                        <p className="font-semibold">
                          {formatDate(pedido.fecha)} | Nº {pedido.numero} |{" "}
                          {pedido.peso} kg
                        </p>
                        <p className="text-gray-700 bg-amber-200 mr-4">
                          {pedido.notes}
                        </p>
                        <p>
                          Autorizado:{" "}
                          <span
                            className={
                              pedido.autorizado
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {pedido.autorizado ? "Sí" : "No"}
                          </span>{" "}
                          | Entregado:{" "}
                          <span
                            className={
                              pedido.entregado
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {pedido.entregado ? "Sí" : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 h-fit">
                        <button
                          onClick={() => {
                            setEditandoId(pedido.id);
                            setPedidoEdit({
                              ...pedido,
                              peso: String(pedido.peso),
                            });
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletePedido(pedido.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
