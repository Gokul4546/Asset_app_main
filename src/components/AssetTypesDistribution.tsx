import React from 'react';
import { BarChart3 } from 'lucide-react';

export const AssetTypesDistribution: React.FC = () => {
  const assetTypes = [
    { type: 'IT Equipment', count: 4523, color: 'bg-blue-500' },
    { type: 'Furniture', count: 3281, color: 'bg-green-500' },
    { type: 'Vehicles', count: 2847, color: 'bg-purple-500' },
    { type: 'Machinery', count: 1642, color: 'bg-orange-500' },
    { type: 'Others', count: 554, color: 'bg-gray-500' }
  ];

  const maxCount = Math.max(...assetTypes.map(item => item.count));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Asset Types Distribution</h3>
      </div>
      
      <div className="space-y-4">
        {assetTypes.map((item, index) => {
          const percentage = (item.count / maxCount) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.type}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};