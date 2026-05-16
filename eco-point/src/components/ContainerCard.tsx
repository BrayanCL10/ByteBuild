// src/components/ContainerCard.tsx

import { Container } from '@/types/container';

type Props = {
  container: Container;
  onClick?: () => void;
};

const WASTE_ICONS: Record<string, string> = {
  plastico: '♻️',
  papel: '📄',
  vidrio: '🔷',
  organico: '🌱',
  metal: '⚙️',
};

const WASTE_COLORS: Record<string, string> = {
  plastico: 'bg-blue-100',
  papel: 'bg-yellow-100',
  vidrio: 'bg-green-100',
  organico: 'bg-orange-100',
  metal: 'bg-gray-100',
};

export default function ContainerCard({ container, onClick }: Props) {
  const fillPercentage = (container.nivelActual / container.capacidad) * 100;
  const isAvailable = container.estado === 'disponible';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
        isAvailable ? 'border-green-400 bg-white' : 'border-red-400 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`${WASTE_COLORS[container.tipo]} p-3 rounded-full text-2xl`}>
          {WASTE_ICONS[container.tipo] || '🗑️'}
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            container.estado === 'disponible'
              ? 'bg-green-100 text-green-700'
              : container.estado === 'lleno'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {container.estado}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-1">{container.nombre}</h3>
      <p className="text-sm text-gray-600 mb-3">{container.ubicacion.direccion}</p>

      {/* Barra de capacidad */}
      <div className="bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-full transition-all ${
            fillPercentage < 50
              ? 'bg-green-500'
              : fillPercentage < 80
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${fillPercentage}%` }}
        />
      </div>

      <div className="text-xs text-gray-500">
        {container.nivelActual} / {container.capacidad} kg
      </div>
    </div>
  );
}
