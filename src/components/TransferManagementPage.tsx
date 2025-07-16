import React, { useState } from 'react';
import { Plus, Calendar, Truck, CheckCircle, ArrowRightLeft, Eye, Edit, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewTransferModal } from './NewTransferModal';

export const TransferManagementPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [dateRange, setDateRange] = useState('');
  const [transferId, setTransferId] = useState('');
  const [isNewTransferModalOpen, setIsNewTransferModalOpen] = useState(false);

  const transferStats = [
    {
      title: 'Pending Approvals',
      value: '24',
      subtitle: '8 in progress',
      icon: Calendar,
      color: 'amber'
    },
    {
      title: 'In Transit',
      value: '18',
      subtitle: 'Currently active',
      icon: Truck,
      color: 'blue'
    },
    {
      title: 'Completed Today',
      value: '12',
      subtitle: 'Needs attention',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Total This Month',
      value: '342',
      subtitle: 'This month',
      icon: ArrowRightLeft,
      color: 'purple'
    }
  ];

  const transferRequests = [
    {
      id: 'TRF-2025-001',
      assets: '3 Assets',
      source: 'North Zone - Depot A',
      destination: 'South Zone - Depot B',
      requestedBy: 'John Smith',
      status: 'Pending Approval',
      date: 'Jan 15, 2025',
      avatar: 'JS'
    },
    {
      id: 'TRF-2025-002',
      assets: '1 Asset',
      source: 'East Zone - Depot C',
      destination: 'West Zone - Depot D',
      requestedBy: 'Sarah Johnson',
      status: 'In Transit',
      date: 'Jan 14, 2025',
      avatar: 'SJ'
    },
    {
      id: 'TRF-2025-003',
      assets: '5 Assets',
      source: 'South Zone - Depot B',
      destination: 'North Zone - Depot A',
      requestedBy: 'Mike Chen',
      status: 'Approved',
      date: 'Jan 13, 2025',
      avatar: 'MC'
    },
    {
      id: 'TRF-2025-004',
      assets: '2 Assets',
      source: 'West Zone - Depot D',
      destination: 'East Zone - Depot C',
      requestedBy: 'Lisa Brown',
      status: 'Completed',
      date: 'Jan 12, 2025',
      avatar: 'LB'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval': return 'bg-amber-100 text-amber-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
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

  const handleNewTransfer = (transferData: any) => {
    console.log('New transfer created:', transferData);
    // Here you would typically send the data to your backend
    // and refresh the transfer list
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Management</h1>
          <p className="text-gray-600">Manage asset transfers with approval workflows</p>
        </div>
        <button 
          onClick={() => setIsNewTransferModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg"
        >
          <Plus className="h-4 w-4" />
          New Transfer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {transferStats.map((stat, index) => {
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
              <option>All Statuses</option>
              <option>Pending Approval</option>
              <option>In Transit</option>
              <option>Approved</option>
              <option>Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Location</label>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>All Locations</option>
              <option>North Zone</option>
              <option>South Zone</option>
              <option>East Zone</option>
              <option>West Zone</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="mm/dd/yyyy"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transfer ID</label>
            <input
              type="text"
              value={transferId}
              onChange={(e) => setTransferId(e.target.value)}
              placeholder="Search by ID..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Transfer Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Transfer Requests</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">TRANSFER ID</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ASSETS</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">SOURCE</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">DESTINATION</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">REQUESTED BY</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">DATE</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {transferRequests.map((transfer, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{transfer.id}</td>
                  <td className="py-4 text-sm text-gray-600">{transfer.assets}</td>
                  <td className="py-4 text-sm text-gray-600">{transfer.source}</td>
                  <td className="py-4 text-sm text-gray-600">{transfer.destination}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 bg-gradient-to-br ${getAvatarColor(transfer.requestedBy)} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                        {transfer.avatar}
                      </div>
                      <span className="text-sm text-gray-900">{transfer.requestedBy}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{transfer.date}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 1-4 of 24 transfers</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Previous</button>
            <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">2</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">3</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Next</button>
          </div>
        </div>
      </div>
      
      <NewTransferModal
        isOpen={isNewTransferModalOpen}
        onClose={() => setIsNewTransferModalOpen(false)}
        onSubmit={handleNewTransfer}
      />
    </div>
  );
};