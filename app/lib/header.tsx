export default function Header({ suc = "LGX 44" }: { suc?: string }) {
  return (
    <header className="bg-blue-600 text-white w-full">
      <h1 className="text-2xl font-bold p-4 text-center lg:text-left">
        Control de pesos y pedidos - {suc}
      </h1>
    </header>
  );
}
