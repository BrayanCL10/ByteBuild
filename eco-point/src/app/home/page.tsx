// src/app/home/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PointsCard from '@/components/PointsCard';
import ContainerCard from '@/components/ContainerCard';
import MapView from '@/components/MapView';
import WasteCounter from '@/components/WasteCounter';
import StatsChart from '@/components/StatsChart';
import AlertCard from '@/components/AlertCard';
import { fakeContainers } from '@/data/fakeContainers';
import { fakeStats } from '@/data/fakeStats';
import { Container, WasteType } from '@/types/container';

export default function HomePage() {
  const router = useRouter();
  const [containers, setContainers] = useState<Container[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Cargar datos
    setContainers(fakeContainers);

    // Calcular puntos del usuario actual (por ahora usamos usuario 1)
    const userStats = fakeStats.filter(stat => stat.userId === '1');
    const totalPoints = userStats.reduce((sum, stat) => sum + stat.puntos, 0);
    setUserPoints(totalPoints);
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleWasteSubmit = async (wasteType: WasteType, weight: number) => {
    setLoading(true);
    try {
      // Simular registro de residuos
      const points = Math.round(weight * 10);
      setUserPoints(prev => prev + points);
      
      setAlertMessage(`✅ ¡Registrado! Ganaste ${points} puntos por ${weight}kg de ${wasteType}`);
      setShowAlert(true);
      
      // Limpiar alerta después de 3 segundos
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertMessage('❌ Error al registrar residuos. Intenta de nuevo.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onLogin={handleLogin} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Alert */}
        {showAlert && (
          <AlertCard
            title="Notificación"
            message={alertMessage}
            type="success"
            onClose={() => setShowAlert(false)}
          />
        )}

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Puntos */}
          <div className="lg:col-span-1">
            <PointsCard
              puntos={userPoints}
              titulo="Tus Puntos Eco"
              descripcion="Puntos acumulados en el programa de reciclaje"
            />
          </div>

          {/* Stats */}
          <div className="lg:col-span-2">
            <StatsChart
              title="Reciclaje por Tipo"
              type="bar"
              data={[
                { label: 'Plástico', value: 45, color: '#3B82F6' },
                { label: 'Papel', value: 32, color: '#F59E0B' },
                { label: 'Vidrio', value: 28, color: '#10B981' },
                { label: 'Orgánico', value: 15, color: '#F97316' },
                { label: 'Metal', value: 22, color: '#6B7280' },
              ]}
            />
          </div>
        </div>

        {/* Waste Counter */}
        <div className="mb-8">
          <WasteCounter onSubmit={handleWasteSubmit} loading={loading} />
        </div>

        {/* Map */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contenedores Cercanos</h2>
          <MapView containers={containers} />
        </div>

        {/* Containers Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contenedores Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {containers.map(container => (
              <ContainerCard
                key={container.id}
                container={container}
                onClick={() => router.push(`/container/${container.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
