// src/components/WasteCounter.tsx

'use client';

import { useState } from 'react';
import { WasteType } from '@/types/container';

type Props = {
  onSubmit?: (wasteType: WasteType, weight: number) => void;
  loading?: boolean;
};

const WASTE_TYPES: Array<{ type: WasteType; label: string; emoji: string; color: string }> = [
  { type: WasteType.PLASTIC, label: 'Plástico', emoji: '♻️', color: 'bg-blue-100' },
  { type: WasteType.PAPER, label: 'Papel', emoji: '📄', color: 'bg-yellow-100' },
  { type: WasteType.GLASS, label: 'Vidrio', emoji: '🔷', color: 'bg-green-100' },
  { type: WasteType.ORGANIC, label: 'Orgánico', emoji: '🌱', color: 'bg-orange-100' },
  { type: WasteType.METAL, label: 'Metal', emoji: '⚙️', color: 'bg-gray-100' },
];

export default function WasteCounter({ onSubmit, loading = false }: Props) {
  const [selectedType, setSelectedType] = useState<WasteType>(WasteType.PLASTIC);
  const [weight, setWeight] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(selectedType, weight);
    setWeight(1);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Registrar Residuos</h3>

      {/* Tipo de residuo */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Tipo de residuo</label>
        <div className="grid grid-cols-5 gap-2">
          {WASTE_TYPES.map(({ type, label, emoji, color }) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`p-3 rounded text-center transition-all ${
                selectedType === type
                  ? `${color} ring-2 ring-offset-2 ring-green-500`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title={label}
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-xs font-semibold">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Peso */}
      <div className="mb-4">
        <label htmlFor="weight" className="block text-sm font-medium mb-2">
          Peso (kg)
        </label>
        <input
          id="weight"
          type="number"
          min="0.1"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Puntos estimados */}
      <div className="bg-green-50 p-3 rounded mb-4 text-sm">
        <div className="font-semibold text-green-700">
          Puntos estimados: {Math.round(weight * 10)}
        </div>
      </div>

      {/* Botón submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all"
      >
        {loading ? 'Registrando...' : 'Registrar Residuos'}
      </button>
    </form>
  );
}
