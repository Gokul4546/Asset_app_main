import React from 'react';
import { Users } from 'lucide-react';

export const ActiveUsers: React.FC = () => {
  const users = [
    {
      name: 'John Smith',
      role: 'Auditor',
      zone: 'North Zone',
      status: 'Online',
      avatar: 'JS'
    },
    {
      name: 'Sarah Johnson',
      role: 'Admin',
      zone: 'South Zone',
      status: 'Online',
      avatar: 'SJ'
    },
    {
      name: 'Mike Chen',
      role: 'IT Support',
      zone: 'East Zone',
      status: 'Away',
      avatar: 'MC'
    },
    {
      name: 'Lisa Brown',
      role: 'Finance',
      zone: 'West Zone',
      status: 'Online',
      avatar: 'LB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-400';
      case 'Away':
        return 'bg-amber-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
      </div>
      
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor(user.name)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
                  {user.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role} • {user.zone}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              user.status === 'Online' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};