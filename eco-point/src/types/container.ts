export interface Container {
  id: string;
  nombre: string;
  tipo: 'plastico' | 'papel' | 'vidrio' | 'organico' | 'metal';
  ubicacion: {
    lat: number;
    lng: number;
    direccion: string;
  };
  capacidad: number;
  nivelActual: number;
  estado: 'disponible' | 'lleno' | 'mantenimiento';
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WasteStats {
  id: string;
  containerId: string;
  userId: string;
  peso: number;
  tipo: string;
  puntos: number;
  timestamp: Date;
}

export enum WasteType {
  PLASTIC = 'plastico',
  PAPER = 'papel',
  GLASS = 'vidrio',
  ORGANIC = 'organico',
  METAL = 'metal',
}

export const WASTE_POINTS: Record<WasteType, number> = {
  [WasteType.PLASTIC]: 10,
  [WasteType.PAPER]: 5,
  [WasteType.GLASS]: 8,
  [WasteType.ORGANIC]: 3,
  [WasteType.METAL]: 15,
};
