// src/components/QRGenerator.tsx

'use client';

import { useEffect, useRef } from 'react';

type Props = {
  containerId: string;
  containerName?: string;
};

export default function QRGenerator({ containerId, containerName = 'Container' }: Props) {
  const qrContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrContainer.current) return;

    // Simulación simple de QR
    // En un proyecto real, aquí iría 'qrcode.react' o 'qrcode'
    qrContainer.current.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 200px; height: 200px; background: white; border: 2px solid #ddd; border-radius: 8px; margin: 0 auto;">
        <div style="font-size: 48px; margin-bottom: 8px;">📱</div>
        <div style="font-size: 12px; text-align: center; color: #666;">
          <div style="font-weight: bold;">QR: ${containerId}</div>
          <div style="margin-top: 4px;">${containerName}</div>
        </div>
      </div>
    `;
  }, [containerId, containerName]);

  return <div ref={qrContainer} />;
}
