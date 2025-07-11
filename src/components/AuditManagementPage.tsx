import React, { useState } from 'react';
import { Plus, Calendar, Users, AlertTriangle, CheckCircle, Clock, Building, Filter, ChevronDown } from 'lucide-react';

export const AuditManagementPage: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const auditStats = [
    { title: 'Active Audits', value: '24', subtitle: '8 in progress', icon: Calendar, color: 'blue' },
    { title: 'Completion Rate', value: '87%', subtitle: '↑ 5% vs last month', icon: CheckCircle, color: 'green' },
    { title: 'Overdue Audits', value: '3', subtitle: 'Needs attention', icon: AlertTriangle, color: 'red' },
    { title: 'Active Auditors', value: '12', subtitle: '8 currently active', icon: Users, color: 'purple' }
  ];

  const scheduledAudits = [
    {
      id: 'North Zone Depot A',
      category: 'IT Equipment',
      assets: 245,
      dueDate: 'Jan 15, 2025',
      status: 'In Progress',
      completion: 65,
      statusColor: 'bg-blue-500'
    },
    {
      id: 'South Zone Depot B',
      category: 'Furniture',
      assets: 189,
      dueDate: 'Jan 18, 2025',
      status: 'Scheduled',
      completion: 0,
      statusColor: 'bg-gray-500'
    },
    {
      id: 'East Zone Depot C',
      category: 'Vehicles',
      assets: 76,
      dueDate: 'Jan 12, 2025',
      status: 'Overdue',
      completion: 0,
      statusColor: 'bg-red-500'
    },
    {
      id: 'West Zone Depot D',
      category: 'Machinery',
      assets: 134,
      dueDate: 'Jan 20, 2025',
      status: 'In Progress',
      completion: 32,
      statusColor: 'bg-blue-500'
    }
  ];

  const auditorProgress = [
    { name: 'John Smith', zone: 'North Zone', progress: '158/245', avatar: 'JS' },
    { name: 'Sarah Johnson', zone: 'West Zone', progress: '43/134', avatar: 'SJ' },
    { name: 'Mike Chen', zone: 'East Zone', progress: '0/76', avatar: 'MC' },
    { name: 'Lisa Brown', zone: 'Available', progress: 'Idle', avatar: 'LB' }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Audit Overdue',
      message: 'East Zone Depot C audit is 3 days overdue. Contact Mike Chen immediately.',
      time: '2 hours ago'
    },
    {
      type: 'info',
      title: 'Audit Due Soon',
      message: 'South Zone Depot B audit scheduled to start in 2 days. Auditor assigned.',
      time: '1 day ago'
    },
    {
      type: 'success',
      title: 'Progress Update',
      message: 'North Zone Depot A audit is 65% complete. Expected completion by Jan 15.',
      time: '3 hours ago'
    }
  ];

  const recentCompletedAudits = [
    {
      location: 'North Zone Depot E',
      category: 'IT Equipment',
      auditor: 'John Smith',
      completion: 'Jan 10, 2025',
      status: 'Completed'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'red': return 'bg-red-50 text-red-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Management</h1>
          <p className="text-gray-600">Schedule audits, assign auditors, and monitor progress</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg">
          <Plus className="h-4 w-4" />
          Schedule Audit
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {auditStats.map((stat, index) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Scheduled Audits */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Audits</h3>
            <div className="flex gap-2">
              <select 
                value={selectedZone} 
                onChange={(e) => setSelectedZone(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
              >
                <option>All Zones</option>
                <option>North Zone</option>
                <option>South Zone</option>
                <option>East Zone</option>
                <option>West Zone</option>
              </select>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
              >
                <option>All Status</option>
                <option>Scheduled</option>
                <option>In Progress</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {scheduledAudits.map((audit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{audit.id}</h4>
                  <p className="text-sm text-gray-500">{audit.category} • {audit.assets} assets</p>
                  <p className="text-xs text-gray-500">Due: {audit.dueDate}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    audit.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    audit.status === 'Scheduled' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {audit.status}
                  </span>
                  {audit.status === 'In Progress' && (
                    <p className="text-xs text-gray-500 mt-1">{audit.completion}% complete</p>
                  )}
                  {audit.status === 'Overdue' && (
                    <p className="text-xs text-red-500 mt-1">3 days late</p>
                  )}
                  {audit.status === 'Scheduled' && (
                    <p className="text-xs text-gray-500 mt-1">Pending start</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auditor Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Auditor Progress</h3>
          </div>
          
          <div className="space-y-4">
            {auditorProgress.map((auditor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {auditor.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{auditor.name}</p>
                    <p className="text-sm text-gray-500">{auditor.zone}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{auditor.progress}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Alerts & Notifications</h3>
          
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed Audits */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Completed Audits</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">LOCATION</th>
                  <th className="text-left py-2 text-gray-600 font-medium">CATEGORY</th>
                  <th className="text-left py-2 text-gray-600 font-medium">AUDITOR</th>
                  <th className="text-left py-2 text-gray-600 font-medium">COMPLETION</th>
                  <th className="text-left py-2 text-gray-600 font-medium">STATUS</th>
                  <th className="text-left py-2 text-gray-600 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentCompletedAudits.map((audit, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3">{audit.location}</td>
                    <td className="py-3">{audit.category}</td>
                    <td className="py-3">{audit.auditor}</td>
                    <td className="py-3">{audit.completion}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {audit.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm">View Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};