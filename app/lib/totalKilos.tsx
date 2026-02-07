export const TotalKilos = ({
  totalKilos,
  type,
}: {
  totalKilos: number;
  type?: "auth" | "all" | "diff";
}) => {
  function getLabel() {
    if (type === "auth") return "Total Autorizado";
    if (type === "diff") return "Kilos Restantes";
    return "Total Kilos";
  }

  return (
    <h3 className="text-gray-700 mb-4">
      {getLabel()}: {totalKilos} kg
    </h3>
  );
};
