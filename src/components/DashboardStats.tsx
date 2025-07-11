import React from 'react';
import { Package, Users, AlertTriangle, ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Assets',
      value: '12,847',
      change: '+2.5%',
      changeType: 'increase',
      subtitle: 'vs last month',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Assigned %',
      value: '87.2%',
      change: '+1.2%',
      changeType: 'increase',
      subtitle: 'vs last month',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Unverified %',
      value: '8.4%',
      change: '+0.8%',
      changeType: 'increase',
      subtitle: 'needs attention',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Transfer Volume',
      value: '342',
      change: '',
      changeType: 'neutral',
      subtitle: 'This month',
      icon: ArrowRightLeft,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'amber':
        return 'bg-amber-50 text-amber-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.changeType === 'increase' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              {stat.change && (
                <div className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};