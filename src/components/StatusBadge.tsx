import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Wrench } from 'lucide-react';
import { Asset } from '../types/Asset';

interface StatusBadgeProps {
  status: Asset['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: Asset['status']) => {
    switch (status) {
      case 'Active':
        return {
          icon: CheckCircle,
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
          dotColor: 'bg-emerald-400'
        };
      case 'Needs Audit':
        return {
          icon: AlertTriangle,
          className: 'bg-red-50 text-red-700 border-red-200 ring-red-600/20',
          dotColor: 'bg-red-400'
        };
      case 'Inactive':
        return {
          icon: Clock,
          className: 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-600/20',
          dotColor: 'bg-gray-400'
        };
      case 'Maintenance':
        return {
          icon: Wrench,
          className: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
          dotColor: 'bg-amber-400'
        };
      default:
        return {
          icon: Clock,
          className: 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-600/20',
          dotColor: 'bg-gray-400'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ring-1 ${config.className} transition-all duration-200`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></div>
      <Icon className="h-3 w-3" />
      <span>{status}</span>
    </div>
  );
};