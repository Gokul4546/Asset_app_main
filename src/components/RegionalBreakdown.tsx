import React from 'react';
import { MapPin } from 'lucide-react';

export const RegionalBreakdown: React.FC = () => {
  const regions = [
    {
      name: 'North Zone',
      depots: 5,
      departments: 12,
      assets: 4256,
      color: 'bg-blue-500'
    },
    {
      name: 'South Zone',
      depots: 8,
      departments: 18,
      assets: 3891,
      color: 'bg-green-500'
    },
    {
      name: 'East Zone',
      depots: 6,
      departments: 14,
      assets: 2743,
      color: 'bg-purple-500'
    },
    {
      name: 'West Zone',
      depots: 4,
      departments: 10,
      assets: 1957,
      color: 'bg-orange-500'
    }
  ];

  const totalAssets = regions.reduce((sum, region) => sum + region.assets, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Regional Breakdown</h3>
      </div>
      
      <div className="space-y-4">
        {regions.map((region, index) => {
          const percentage = ((region.assets / totalAssets) * 100).toFixed(1);
          
          return (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{region.name}</h4>
                  <p className="text-sm text-gray-500">
                    {region.depots} Depots • {region.departments} Departments
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{region.assets.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Assets</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};