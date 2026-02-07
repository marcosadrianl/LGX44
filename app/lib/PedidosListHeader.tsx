interface PedidoListHeaderProps {
  onClear: () => void;
}

export const PedidoListHeader = ({ onClear }: PedidoListHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b gap-2">
      <h2 className="text-xl font-semibold mb-1">Listado de Pedidos</h2>
    </div>
  );
};
