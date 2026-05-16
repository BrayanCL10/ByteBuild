// src/data/fakeContainers.ts
// Datos de prueba de contenedores

import { Container } from '@/types/container';

export const fakeContainers: Container[] = [
  {
    id: 'cont-001',
    nombre: 'Contenedor Plástico - Centro',
    tipo: 'plastico',
    ubicacion: {
      lat: -17.3895,
      lng: -66.1568,
      direccion: 'Avenida Ballivián, Cochabamba',
    },
    capacidad: 100,
    nivelActual: 45,
    estado: 'disponible',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-002',
    nombre: 'Contenedor Papel - Zona Sur',
    tipo: 'papel',
    ubicacion: {
      lat: -17.3950,
      lng: -66.1620,
      direccion: 'Calle España, Cochabamba',
    },
    capacidad: 100,
    nivelActual: 70,
    estado: 'disponible',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-003',
    nombre: 'Contenedor Vidrio - Plaza Principal',
    tipo: 'vidrio',
    ubicacion: {
      lat: -17.3880,
      lng: -66.1550,
      direccion: 'Plaza Avaroa, Cochabamba',
    },
    capacidad: 100,
    nivelActual: 85,
    estado: 'lleno',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-004',
    nombre: 'Contenedor Orgánico - Mercado',
    tipo: 'organico',
    ubicacion: {
      lat: -17.3920,
      lng: -66.1580,
      direccion: 'Mercado Central, Cochabamba',
    },
    capacidad: 100,
    nivelActual: 30,
    estado: 'disponible',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-005',
    nombre: 'Contenedor Metal - Zona Industrial',
    tipo: 'metal',
    ubicacion: {
      lat: -17.3945,
      lng: -66.1650,
      direccion: 'Zona Industrial, Cochabamba',
    },
    capacidad: 100,
    nivelActual: 0,
    estado: 'mantenimiento',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-05-16'),
  },
];

export function getContainerById(id: string): Container | undefined {
  return fakeContainers.find(container => container.id === id);
}

export function getContainersByType(type: string): Container[] {
  return fakeContainers.filter(container => container.tipo === type);
}

export function getAvailableContainers(): Container[] {
  return fakeContainers.filter(container => container.estado === 'disponible');
}

export function getContainersNearby(lat: number, lng: number, radius: number = 5): Container[] {
  return fakeContainers.filter(container => {
    const distance = Math.sqrt(
      Math.pow(container.ubicacion.lat - lat, 2) +
      Math.pow(container.ubicacion.lng - lng, 2)
    );
    return distance <= radius;
  });
}
