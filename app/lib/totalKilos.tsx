interface TotalKilosProps {
  totalKilos: number;
}

export const TotalKilos = ({ totalKilos }: TotalKilosProps) => {
  return <h3 className="text-gray-500 mb-4">Total {totalKilos}kg</h3>;
};
