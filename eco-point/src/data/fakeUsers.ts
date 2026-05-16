// src/data/fakeUsers.ts
// Datos de prueba de usuarios

import { User } from '@/types/user';

export const fakeUsers: User[] = [
  {
    uid: '1',
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan@example.com',
    ci: '12345678',
    puntos: 250,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    uid: '2',
    nombre: 'María',
    apellido: 'García',
    correo: 'maria@example.com',
    ci: '87654321',
    puntos: 420,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    uid: '3',
    nombre: 'Carlos',
    apellido: 'López',
    correo: 'carlos@example.com',
    ci: '11223344',
    puntos: 180,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-05-16'),
  },
];

export function getUserById(uid: string): User | undefined {
  return fakeUsers.find(user => user.uid === uid);
}

export function getUserByEmail(email: string): User | undefined {
  return fakeUsers.find(user => user.correo === email);
}
