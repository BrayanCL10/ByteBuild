// src/components/MapView.tsx

'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/types/container';

type Props = {
  containers: Container[];
  onContainerClick?: (container: Container) => void;
};

export default function MapView({ containers, onContainerClick }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Simulación simple de mapa con contenedores
    // En un proyecto real, aquí iría Leaflet, Google Maps, etc.
    mapContainer.current.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 8px; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Mapa Interactivo</div>
          <div style="font-size: 14px; color: #666;">
            ${containers.length} contenedores activos
          </div>
          <div style="margin-top: 16px; font-size: 12px; color: #999;">
            Integración con Leaflet o Google Maps próximamente
          </div>
        </div>
      </div>
    `;
  }, [containers]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px' }}
      className="rounded-lg overflow-hidden shadow-md"
    />
  );
}
