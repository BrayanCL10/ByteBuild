// src/components/PointsCard.tsx

type Props = {
  puntos: number;
  titulo?: string;
  descripcion?: string;
};

export default function PointsCard({
  puntos,
  titulo = 'Tus Puntos Eco',
  descripcion = 'Puntos acumulados en el programa de reciclaje',
}: Props) {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
      <div className="text-5xl font-bold mb-2">{puntos}</div>
      <p className="text-sm opacity-90">{descripcion}</p>

      <div className="mt-4 pt-4 border-t border-white border-opacity-30">
        <div className="text-xs opacity-75">
          <div className="flex justify-between">
            <span>Próximo nivel:</span>
            <span className="font-bold">{Math.ceil((puntos + 1) / 100) * 100} puntos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
