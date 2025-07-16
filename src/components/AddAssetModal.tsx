import React, { useState } from 'react';
import { X, Package, Calendar, MapPin, User, Tag, Hash, DollarSign, Building, FileText, Wrench, Shield } from 'lucide-react';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assetData: any) => void;
}

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    assetId: `AST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    type: 'Hardware',
    category: '',
    subCategory: '',
    brand: '',
    model: '',
    serialNumber: '',
    
    // Financial Information
    purchasePrice: '',
    currentValue: '',
    purchaseDate: '',
    warrantyExpiry: '',
    depreciationRate: '20',
    
    // Assignment & Location
    status: 'Active',
    owner: '',
    department: '',
    location: '',
    building: '',
    floor: '',
    room: '',
    
    // Vendor & Purchase Details
    vendor: '',
    purchaseOrder: '',
    invoiceNumber: '',
    
    // Technical Specifications
    specifications: '',
    operatingSystem: '',
    processor: '',
    memory: '',
    storage: '',
    
    // Maintenance & Compliance
    maintenanceSchedule: 'Annual',
    lastMaintenance: '',
    nextMaintenance: '',
    complianceRequired: false,
    insuranceRequired: false,
    
    // Additional Information
    description: '',
    tags: '',
    criticality: 'Medium',
    lastVerified: new Date().toISOString().split('T')[0]
  });

  const assetTypes = [
    'Hardware',
    'Software', 
    'Equipment',
    'Vehicle',
    'Furniture',
    'Machinery',
    'Infrastructure',
    'Tools'
  ];

  const statusOptions = [
    'Active',
    'Inactive',
    'Needs Audit',
    'Maintenance',
    'Retired',
    'Lost',
    'Stolen'
  ];

  const users = [
    'Sarah Johnson',
    'Michael Chen',
    'Alex Rodriguez',
    'Emma Wilson',
    'James Taylor',
    'Lisa Garcia',
    'David Kim',
    'Sophie Brown',
    'Robert Davis',
    'Maria Lopez'
  ];

  const departments = [
    'IT Department',
    'Finance',
    'Human Resources',
    'Operations',
    'Marketing',
    'Sales',
    'Legal',
    'Procurement',
    'Facilities',
    'Security'
  ];

  const locations = [
    'Remote',
    'Tokyo Office',
    'New York Office',
    'London Office',
    'Berlin Office',
    'San Francisco',
    'Austin Office',
    'Madrid Office',
    'Mumbai Office',
    'Singapore Office'
  ];

  const vendors = [
    'Dell Technologies',
    'HP Inc.',
    'Lenovo',
    'Apple Inc.',
    'Microsoft',
    'Adobe Systems',
    'Oracle Corporation',
    'SAP',
    'Cisco Systems',
    'IBM'
  ];

  const maintenanceSchedules = [
    'Monthly',
    'Quarterly',
    'Semi-Annual',
    'Annual',
    'Bi-Annual',
    'As Needed'
  ];

  const criticalityLevels = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      assetId: `AST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      type: 'Hardware',
      category: '',
      subCategory: '',
      brand: '',
      model: '',
      serialNumber: '',
      purchasePrice: '',
      currentValue: '',
      purchaseDate: '',
      warrantyExpiry: '',
      depreciationRate: '20',
      status: 'Active',
      owner: '',
      department: '',
      location: '',
      building: '',
      floor: '',
      room: '',
      vendor: '',
      purchaseOrder: '',
      invoiceNumber: '',
      specifications: '',
      operatingSystem: '',
      processor: '',
      memory: '',
      storage: '',
      maintenanceSchedule: 'Annual',
      lastMaintenance: '',
      nextMaintenance: '',
      complianceRequired: false,
      insuranceRequired: false,
      description: '',
      tags: '',
      criticality: 'Medium',
      lastVerified: new Date().toISOString().split('T')[0]
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Asset</h2>
                <p className="text-sm text-gray-600">Create a comprehensive asset record</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Package className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset ID</label>
                  <input
                    type="text"
                    value={formData.assetId}
                    onChange={(e) => handleInputChange('assetId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
                    placeholder="Auto-generated ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Dell Laptop XPS 13"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    {assetTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Laptop, Desktop, Monitor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Dell, HP, Apple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. XPS 13, ThinkPad X1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Manufacturer serial number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Criticality Level</label>
                  <select
                    value={formData.criticality}
                    onChange={(e) => handleInputChange('criticality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    {criticalityLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                  <input
                    type="number"
                    value={formData.currentValue}
                    onChange={(e) => handleInputChange('currentValue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depreciation Rate (%)</label>
                  <input
                    type="number"
                    value={formData.depreciationRate}
                    onChange={(e) => handleInputChange('depreciationRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Expiry</label>
                  <input
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => handleInputChange('warrantyExpiry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Assignment & Location Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Assignment & Location</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asset Owner *</label>
                  <select
                    required
                    value={formData.owner}
                    onChange={(e) => handleInputChange('owner', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select an owner...</option>
                    {users.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select department...</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select a location...</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Building</label>
                  <input
                    type="text"
                    value={formData.building}
                    onChange={(e) => handleInputChange('building', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Building name or number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                  <input
                    type="text"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Floor number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room/Desk</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => handleInputChange('room', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Room or desk number"
                  />
                </div>
              </div>
            </div>

            {/* Vendor & Purchase Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Building className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Vendor & Purchase Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <select
                    value={formData.vendor}
                    onChange={(e) => handleInputChange('vendor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select vendor...</option>
                    {vendors.map(vendor => (
                      <option key={vendor} value={vendor}>{vendor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Order</label>
                  <input
                    type="text"
                    value={formData.purchaseOrder}
                    onChange={(e) => handleInputChange('purchaseOrder', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="PO number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Invoice number"
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Wrench className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Technical Specifications</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                  <input
                    type="text"
                    value={formData.operatingSystem}
                    onChange={(e) => handleInputChange('operatingSystem', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Windows 11, macOS, Ubuntu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Processor</label>
                  <input
                    type="text"
                    value={formData.processor}
                    onChange={(e) => handleInputChange('processor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Intel i7, AMD Ryzen 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Memory (RAM)</label>
                  <input
                    type="text"
                    value={formData.memory}
                    onChange={(e) => handleInputChange('memory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. 16GB, 32GB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                  <input
                    type="text"
                    value={formData.storage}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. 512GB SSD, 1TB HDD"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Specifications</label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => handleInputChange('specifications', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Additional technical details, configurations, or specifications..."
                  />
                </div>
              </div>
            </div>

            {/* Maintenance & Compliance Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Shield className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Maintenance & Compliance</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Schedule</label>
                  <select
                    value={formData.maintenanceSchedule}
                    onChange={(e) => handleInputChange('maintenanceSchedule', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    {maintenanceSchedules.map(schedule => (
                      <option key={schedule} value={schedule}>{schedule}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Maintenance</label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) => handleInputChange('lastMaintenance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Next Maintenance</label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => handleInputChange('nextMaintenance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="complianceRequired"
                    checked={formData.complianceRequired}
                    onChange={(e) => handleInputChange('complianceRequired', e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="complianceRequired" className="text-sm font-medium text-gray-700">
                    Compliance Required
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="insuranceRequired"
                    checked={formData.insuranceRequired}
                    onChange={(e) => handleInputChange('insuranceRequired', e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="insuranceRequired" className="text-sm font-medium text-gray-700">
                    Insurance Required
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Additional notes or description about the asset..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. urgent, high-priority, project-alpha"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Verified</label>
                    <input
                      type="date"
                      value={formData.lastVerified}
                      onChange={(e) => handleInputChange('lastVerified', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/25"
              >
                Create Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};