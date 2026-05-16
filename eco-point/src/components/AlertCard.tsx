// src/components/AlertCard.tsx

type Props = {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  onClose?: () => void;
};

export default function AlertCard({ title, message, type = 'info', onClose }: Props) {
  const bgColor = {
    info: 'bg-blue-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
    success: 'bg-green-100',
  }[type];

  const borderColor = {
    info: 'border-blue-400',
    warning: 'border-yellow-400',
    error: 'border-red-400',
    success: 'border-green-400',
  }[type];

  const textColor = {
    info: 'text-blue-800',
    warning: 'text-yellow-800',
    error: 'text-red-800',
    success: 'text-green-800',
  }[type];

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded mb-4`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold ${textColor}`}>{title}</h3>
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
