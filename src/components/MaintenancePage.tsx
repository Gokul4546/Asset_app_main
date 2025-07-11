import React, { useState } from 'react';
import { Plus, Download, Filter, MoreVertical, Eye, Edit, Users, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedAssignee, setSelectedAssignee] = useState('All Assignees');
  const [selectedSLA, setSelectedSLA] = useState('All SLA');

  const maintenanceStats = [
    {
      title: 'Open Issues',
      value: '47',
      subtitle: '12 Critical',
      icon: AlertCircle,
      color: 'red'
    },
    {
      title: 'In Progress',
      value: '23',
      subtitle: '8 Overdue',
      icon: Clock,
      color: 'amber'
    },
    {
      title: 'Resolved',
      value: '156',
      subtitle: 'This month',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg Resolution',
      value: '4.2',
      subtitle: 'Days',
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  const maintenanceIssues = [
    {
      id: '#MT-2025-001',
      asset: 'Laptop Dell XPS 13',
      assetId: 'DL-2024-8901',
      issueDate: 'Jan 15, 2025',
      severity: 'Critical',
      status: 'In Progress',
      assignedTo: 'John Tech',
      sla: 'Overdue',
      avatar: 'JT'
    },
    {
      id: '#MT-2025-002',
      asset: 'Office Chair Ergonomic',
      assetId: 'CH-2024-4567',
      issueDate: 'Jan 16, 2025',
      severity: 'High',
      status: 'Open',
      assignedTo: 'Unassigned',
      sla: 'Within SLA',
      avatar: null
    },
    {
      id: '#MT-2025-003',
      asset: 'Printer HP LaserJet',
      assetId: 'PR-2024-1234',
      issueDate: 'Jan 14, 2025',
      severity: 'Medium',
      status: 'Resolved',
      assignedTo: 'Tech Solutions',
      sla: 'Within SLA',
      avatar: 'TS'
    },
    {
      id: '#MT-2025-004',
      asset: 'Air Conditioning Unit',
      assetId: 'AC-2024-7890',
      issueDate: 'Jan 17, 2025',
      severity: 'Low',
      status: 'In Progress',
      assignedTo: 'HVAC Services',
      sla: 'Near Breach',
      avatar: 'HS'
    },
    {
      id: '#MT-2025-005',
      asset: 'Vehicle Ford Transit',
      assetId: 'VH-2024-5678',
      issueDate: 'Jan 18, 2025',
      severity: 'High',
      status: 'Open',
      assignedTo: 'Auto Repair',
      sla: 'Within SLA',
      avatar: 'AR'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 text-red-600';
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'blue': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSLAColor = (sla: string) => {
    switch (sla) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Near Breach': return 'bg-amber-100 text-amber-800';
      case 'Within SLA': return 'bg-green-100 text-green-800';
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
    const index = name ? name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance Management</h1>
          <p className="text-gray-600">Track reported issues and assign resolutions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg">
            <Plus className="h-4 w-4" />
            New Issue
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {maintenanceStats.map((stat, index) => {
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

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>All Severity</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
            <select 
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>All Assignees</option>
              <option>John Tech</option>
              <option>Tech Solutions</option>
              <option>HVAC Services</option>
              <option>Auto Repair</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SLA Status</label>
            <select 
              value={selectedSLA}
              onChange={(e) => setSelectedSLA(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>All SLA</option>
              <option>Within SLA</option>
              <option>Near Breach</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance Issues Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Maintenance Issues</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <MoreVertical className="h-4 w-4" />
              Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">ISSUE ID</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ASSET</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ISSUE DATE</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">SEVERITY</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ASSIGNED TO</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">SLA</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceIssues.map((issue, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{issue.id}</td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{issue.asset}</p>
                      <p className="text-xs text-gray-500">{issue.assetId}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{issue.issueDate}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-4">
                    {issue.assignedTo === 'Unassigned' ? (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 bg-gradient-to-br ${getAvatarColor(issue.assignedTo)} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                          {issue.avatar}
                        </div>
                        <span className="text-sm text-gray-900">{issue.assignedTo}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSLAColor(issue.sla)}`}>
                      {issue.sla}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Users className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};