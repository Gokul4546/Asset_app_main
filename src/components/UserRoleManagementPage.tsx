import React, { useState } from 'react';
import { Plus, Search, Users, Clock, Shield, Eye, Edit, Trash2, Settings } from 'lucide-react';

export const UserRoleManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');

  const userStats = [
    {
      title: 'Total Users',
      value: '127',
      subtitle: 'Active across all zones',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Online Now',
      value: '24',
      subtitle: 'Currently active',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Roles',
      value: '8',
      subtitle: 'Permission groups',
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'Last Login',
      value: '2',
      subtitle: 'minutes ago',
      icon: Clock,
      color: 'gray'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Auditor',
      zone: 'North Zone',
      status: 'Online',
      lastActive: '2 min ago',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      zone: 'South Zone',
      status: 'Online',
      lastActive: '5 min ago',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'IT Support',
      zone: 'East Zone',
      status: 'Away',
      lastActive: '1 hour ago',
      avatar: 'MC'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa.brown@company.com',
      role: 'Finance',
      zone: 'West Zone',
      status: 'Online',
      lastActive: 'Just now',
      avatar: 'LB'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      role: 'Auditor',
      zone: 'Central Depot',
      status: 'Offline',
      lastActive: '2 days ago',
      avatar: 'DW'
    }
  ];

  const rolePermissions = [
    {
      role: 'Admin',
      level: 'Full Access',
      permissions: ['Asset Edit', 'Transfer Approval', 'User Management'],
      color: 'bg-red-100 text-red-800'
    },
    {
      role: 'Auditor',
      level: 'Limited',
      permissions: ['Asset Verify', 'Audit Reports'],
      restricted: ['Asset Edit'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      role: 'Finance',
      level: 'Moderate',
      permissions: ['View Reports', 'Export Data'],
      color: 'bg-green-100 text-green-800'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'gray': return 'bg-gray-50 text-gray-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Away': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User & Role Management</h1>
          <p className="text-gray-600">Create and manage users with permissions and activity tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg">
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Auditor</option>
                <option>Finance</option>
                <option>IT Support</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">USER</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ROLE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ZONE/DEPOT</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">LAST ACTIVE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor(user.name)} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}>
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{user.zone}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{user.lastActive}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Permissions</h3>
          
          <div className="space-y-6">
            {rolePermissions.map((role, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{role.role}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.color}`}>
                    {role.level}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {role.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-gray-700">{permission}</span>
                    </div>
                  ))}
                  
                  {role.restricted && role.restricted.map((restriction, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      <span className="text-gray-500 line-through">{restriction}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};