import React, { useState } from 'react';
import { ArrowLeft, QrCode, Edit, Calendar, MapPin, User, Package, DollarSign, Clock, CheckCircle, ArrowRightLeft, Wrench, Plus, Camera, FileText, Download, Truck, AlertTriangle } from 'lucide-react';

interface AssetDetailsPageProps {
  onBack: () => void;
}

export const AssetDetailsPage: React.FC<AssetDetailsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const assetData = {
    id: 'LAP-2025-001247',
    name: 'Dell Latitude 7420 Laptop',
    category: 'IT Equipment',
    serialNumber: 'DL74202400124',
    purchaseDate: 'March 15, 2025',
    currentUser: 'Sarah Johnson',
    department: 'Finance - South Zone',
    location: 'Mumbai Office - Floor 3',
    lastVerified: 'January 28, 2025',
    purchasePrice: '₹85,000',
    currentValue: '₹68,000',
    depreciation: '20%',
    status: 'Verified'
  };

  const locationHistory = [
    {
      location: 'Mumbai Office - Floor 3',
      department: 'Finance - South Zone',
      user: 'Sarah Johnson',
      dateFrom: 'Dec 15, 2024',
      dateTo: 'Present',
      reason: 'Department Transfer',
      status: 'Current'
    },
    {
      location: 'Mumbai Office - Floor 2',
      department: 'IT Department',
      user: 'Mike Chen',
      dateFrom: 'Mar 20, 2024',
      dateTo: 'Dec 14, 2024',
      reason: 'Initial Assignment',
      status: 'Previous'
    },
    {
      location: 'Warehouse - Storage',
      department: 'Procurement',
      user: 'Unassigned',
      dateFrom: 'Mar 15, 2024',
      dateTo: 'Mar 19, 2024',
      reason: 'New Asset Processing',
      status: 'Previous'
    }
  ];

  const maintenanceRecords = [
    {
      id: 'MNT-2024-001',
      type: 'Hardware Upgrade',
      description: 'RAM upgrade from 16GB to 32GB',
      technician: 'TechCorp Solutions',
      cost: '₹12,500',
      date: 'Nov 8, 2024',
      status: 'Completed',
      nextDue: 'May 8, 2025'
    },
    {
      id: 'MNT-2024-002',
      type: 'Software Update',
      description: 'Windows 11 upgrade and security patches',
      technician: 'IT Support Team',
      cost: '₹0',
      date: 'Sep 15, 2024',
      status: 'Completed',
      nextDue: 'Mar 15, 2025'
    },
    {
      id: 'MNT-2025-001',
      type: 'Preventive Maintenance',
      description: 'System cleanup and performance optimization',
      technician: 'Scheduled',
      cost: '₹2,000',
      date: 'Feb 15, 2025',
      status: 'Scheduled',
      nextDue: 'Aug 15, 2025'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Purchase Order',
      type: 'PDF',
      size: '245 KB',
      uploadedBy: 'Procurement Team',
      uploadDate: 'Mar 15, 2024',
      category: 'Purchase'
    },
    {
      id: 2,
      name: 'Warranty Certificate',
      type: 'PDF',
      size: '156 KB',
      uploadedBy: 'Dell India',
      uploadDate: 'Mar 16, 2024',
      category: 'Warranty'
    },
    {
      id: 3,
      name: 'Asset Photo - Front',
      type: 'JPG',
      size: '2.1 MB',
      uploadedBy: 'John Smith',
      uploadDate: 'Jan 28, 2025',
      category: 'Photos'
    },
    {
      id: 4,
      name: 'Maintenance Report',
      type: 'PDF',
      size: '89 KB',
      uploadedBy: 'TechCorp Solutions',
      uploadDate: 'Nov 8, 2024',
      category: 'Maintenance'
    },
    {
      id: 5,
      name: 'Transfer Authorization',
      type: 'PDF',
      size: '67 KB',
      uploadedBy: 'HR Department',
      uploadDate: 'Dec 15, 2024',
      category: 'Transfer'
    }
  ];

  const lifecycleHistory = [
    {
      type: 'verified',
      title: 'Asset Verified',
      description: 'Asset verified during quarterly audit by John Smith',
      user: 'John Smith (Auditor)',
      date: 'January 28, 2025',
      time: '2:45 PM',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'transfer',
      title: 'Asset Transferred',
      description: 'Transferred from IT Department to Finance Department',
      user: 'Mike Chen (IT) → Sarah Johnson (Finance)',
      date: 'December 15, 2024',
      time: '11:20 AM',
      icon: ArrowRightLeft,
      color: 'text-blue-600'
    },
    {
      type: 'maintenance',
      title: 'Maintenance Completed',
      description: 'RAM upgrade completed - 16GB to 32GB',
      user: 'Cost: ₹12,500 | Vendor: TechCorp',
      date: 'November 8, 2024',
      time: '4:15 PM',
      icon: Wrench,
      color: 'text-purple-600'
    },
    {
      type: 'assignment',
      title: 'Asset Assigned',
      description: 'Asset assigned to Mike Chen (IT Department)',
      user: 'Mike Chen (IT Support)',
      date: 'March 20, 2025',
      time: '9:30 AM',
      icon: User,
      color: 'text-indigo-600'
    },
    {
      type: 'creation',
      title: 'Asset Created',
      description: 'Asset registered in system after procurement',
      user: 'PO: PO-2025-0847 | Vendor: Dell India',
      date: 'March 15, 2025',
      time: '10:00 AM',
      icon: Plus,
      color: 'text-gray-600'
    }
  ];

  const quickActions = [
    { id: 'transfer', label: 'Transfer Asset', icon: ArrowRightLeft },
    { id: 'audit', label: 'Schedule Audit', icon: Calendar },
    { id: 'issue', label: 'Report Issue', icon: Wrench },
    { id: 'edit', label: 'Edit Details', icon: Edit }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'location-history', label: 'Location History' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'documents', label: 'Documents' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Previous': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Purchase': return 'bg-blue-100 text-blue-800';
      case 'Warranty': return 'bg-green-100 text-green-800';
      case 'Photos': return 'bg-purple-100 text-purple-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Transfer': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Asset Registry</span>
            <span>›</span>
            <span>Asset Details</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset ID: {assetData.id}</h1>
              <p className="text-gray-600">{assetData.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {assetData.status}
              </span>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <QrCode className="h-4 w-4" />
                View QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <>
              {/* Asset Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Asset Name</label>
                      <p className="text-gray-900 font-medium">{assetData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-gray-900">{assetData.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Serial Number</label>
                      <p className="text-gray-900 font-mono">{assetData.serialNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Purchase Date</label>
                      <p className="text-gray-900">{assetData.purchaseDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current User</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          SJ
                        </div>
                        <span className="text-gray-900">{assetData.currentUser}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Department</label>
                      <p className="text-gray-900">{assetData.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">{assetData.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Verified</label>
                      <p className="text-gray-900">{assetData.lastVerified}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Photos */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Photos</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Front View', 'Serial Label', 'Back View', 'Add Photo'].map((label, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                      {index < 3 ? (
                        <>
                          <Package className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">{label}</span>
                        </>
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">{label}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifecycle History */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Lifecycle History</h3>
                
                <div className="space-y-6">
                  {lifecycleHistory.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${event.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-500">{event.date} • {event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.user}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'location-history' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Location History</h3>
              
              <div className="space-y-4">
                {locationHistory.map((location, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{location.location}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          {location.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Department:</span>
                          <span className="ml-2 text-gray-900">{location.department}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">User:</span>
                          <span className="ml-2 text-gray-900">{location.user}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Period:</span>
                          <span className="ml-2 text-gray-900">{location.dateFrom} - {location.dateTo}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Reason:</span>
                          <span className="ml-2 text-gray-900">{location.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance Records</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  Schedule Maintenance
                </button>
              </div>
              
              <div className="space-y-4">
                {maintenanceRecords.map((record, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Wrench className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{record.type}</h4>
                          <p className="text-sm text-gray-600">{record.description}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">ID:</span>
                        <span className="ml-2 font-mono text-gray-900">{record.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Technician:</span>
                        <span className="ml-2 text-gray-900">{record.technician}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cost:</span>
                        <span className="ml-2 font-semibold text-gray-900">{record.cost}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="ml-2 text-gray-900">{record.date}</span>
                      </div>
                    </div>
                    
                    {record.nextDue && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Next Due:</span>
                        <span className="ml-2 text-gray-900">{record.nextDue}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  Upload Document
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">DOCUMENT</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">TYPE</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">SIZE</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">UPLOADED BY</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">DATE</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">CATEGORY</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{doc.type}</td>
                        <td className="py-4 text-sm text-gray-600">{doc.size}</td>
                        <td className="py-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                        <td className="py-4 text-sm text-gray-600">{doc.uploadDate}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="text-indigo-600 hover:text-indigo-700">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asset Value */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Value</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Purchase Price</span>
                <span className="font-semibold text-gray-900">{assetData.purchasePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Value</span>
                <span className="font-semibold text-gray-900">{assetData.currentValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Depreciation</span>
                <span className="font-semibold text-red-600">{assetData.depreciation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};