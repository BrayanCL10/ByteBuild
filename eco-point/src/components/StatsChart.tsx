// src/components/StatsChart.tsx

'use client';

type StatData = {
  label: string;
  value: number;
  color?: string;
};

type Props = {
  data: StatData[];
  title?: string;
  type?: 'bar' | 'pie';
};

export default function StatsChart({
  data,
  title = 'Estadísticas',
  type = 'bar',
}: Props) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  if (type === 'pie') {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="flex justify-center items-center">
          <div style={{ fontSize: '48px' }}>📊</div>
        </div>
        <div className="mt-6 space-y-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm">{item.label}</span>
              <span
                className="px-3 py-1 rounded text-white text-sm font-semibold"
                style={{ backgroundColor: item.color || '#3B82F6' }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Bar chart
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-bold">{item.value}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full transition-all rounded-full"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || '#3B82F6',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
