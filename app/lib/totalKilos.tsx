export const TotalKilos = ({
  totalKilos,
  type,
}: {
  totalKilos: number;
  type?: "auth" | "all" | "diff";
}) => {
  function getLabel() {
    if (type === "auth") return "Total Autorizado";
    if (type === "diff") return "Kilos restantes";
    return "Total Kilos";
  }

  return (
    <h3 className="text-gray-500 mb-4">
      {getLabel()}: {totalKilos}kg
    </h3>
  );
};
