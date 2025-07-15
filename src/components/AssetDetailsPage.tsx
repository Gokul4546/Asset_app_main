import React, { useState } from 'react';
import { ArrowLeft, QrCode, Edit, Calendar, MapPin, User, Package, DollarSign, Clock, CheckCircle, ArrowRightLeft, Wrench, Plus, Camera } from 'lucide-react';

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