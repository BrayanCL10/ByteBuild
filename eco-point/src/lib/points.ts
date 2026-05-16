// src/lib/points.ts
// Lógica de cálculo y gestión de puntos

import { WASTE_POINTS, WasteType } from '@/types/container';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { WasteStats } from '@/types/container';

/**
 * Calcular puntos basado en el tipo de residuo
 */
export function calculatePoints(wasteType: WasteType, weight: number): number {
  const basePoints = WASTE_POINTS[wasteType] || 0;
  // Puntos = puntos base * peso en kg
  return Math.round(basePoints * weight);
}

/**
 * Registrar una deposición de residuos
 */
export async function recordWaste(
  userId: string,
  containerId: string,
  weight: number,
  wasteType: WasteType
): Promise<WasteStats> {
  try {
    const points = calculatePoints(wasteType, weight);

    const wasteData = {
      userId,
      containerId,
      peso: weight,
      tipo: wasteType,
      puntos: points,
      timestamp: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'waste_stats'), wasteData);

    return {
      id: docRef.id,
      ...wasteData,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error registrando residuos:', error);
    throw error;
  }
}

/**
 * Obtener estadísticas de residuos de un usuario
 */
export async function getUserWasteStats(userId: string): Promise<WasteStats[]> {
  try {
    const q = query(
      collection(db, 'waste_stats'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const stats: WasteStats[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      stats.push({
        id: doc.id,
        userId: data.userId,
        containerId: data.containerId,
        peso: data.peso,
        tipo: data.tipo,
        puntos: data.puntos,
        timestamp: data.timestamp.toDate(),
      });
    });

    return stats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
}

/**
 * Calcular puntos totales de un usuario
 */
export async function calculateUserTotalPoints(userId: string): Promise<number> {
  try {
    const stats = await getUserWasteStats(userId);
    return stats.reduce((total, stat) => total + stat.puntos, 0);
  } catch (error) {
    console.error('Error calculando puntos totales:', error);
    throw error;
  }
}

/**
 * Obtener estadísticas por tipo de residuo
 */
export async function getWasteStatsByType(userId: string): Promise<Record<WasteType, number>> {
  try {
    const stats = await getUserWasteStats(userId);
    const byType: Record<WasteType, number> = {
      [WasteType.PLASTIC]: 0,
      [WasteType.PAPER]: 0,
      [WasteType.GLASS]: 0,
      [WasteType.ORGANIC]: 0,
      [WasteType.METAL]: 0,
    };

    stats.forEach((stat) => {
      byType[stat.tipo as WasteType] += stat.peso;
    });

    return byType;
  } catch (error) {
    console.error('Error obteniendo estadísticas por tipo:', error);
    throw error;
  }
}
