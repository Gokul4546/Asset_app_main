import React, { useState } from 'react';
import { X, ArrowRightLeft, Search, User, MapPin, Calendar, FileText, AlertTriangle, CheckCircle, Plus, Minus } from 'lucide-react';

interface NewTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transferData: any) => void;
}

interface SelectedAsset {
  id: string;
  name: string;
  type: string;
  currentLocation: string;
  currentOwner: string;
  serialNumber: string;
}

export const NewTransferModal: React.FC<NewTransferModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [assetSearchTerm, setAssetSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    // Transfer Details
    transferType: 'permanent',
    priority: 'normal',
    requestedDate: new Date().toISOString().split('T')[0],
    expectedCompletionDate: '',
    
    // Source Information
    sourceLocation: '',
    sourceBuilding: '',
    sourceDepartment: '',
    sourceContact: '',
    
    // Destination Information
    destinationLocation: '',
    destinationBuilding: '',
    destinationDepartment: '',
    destinationContact: '',
    newOwner: '',
    
    // Transfer Details
    reason: '',
    businessJustification: '',
    specialInstructions: '',
    transportMethod: 'internal',
    packingRequired: false,
    insuranceRequired: false,
    
    // Approval & Documentation
    approverRequired: true,
    approver: '',
    documentsRequired: [],
    
    // Additional Information
    costCenter: '',
    projectCode: '',
    notes: ''
  });

  // Mock data for dropdowns
  const availableAssets = [
    { id: 'AST-001', name: 'MacBook Pro M3', type: 'Hardware', currentLocation: 'Tokyo Office', currentOwner: 'Sarah Johnson', serialNumber: 'MBP2024001' },
    { id: 'AST-002', name: 'Dell Monitor 27"', type: 'Hardware', currentLocation: 'New York Office', currentOwner: 'Emma Wilson', serialNumber: 'DM27001' },
    { id: 'AST-003', name: 'Office Chair', type: 'Equipment', currentLocation: 'Berlin Office', currentOwner: 'Sophie Brown', serialNumber: 'OC2024001' },
    { id: 'AST-004', name: 'Honda Civic', type: 'Vehicle', currentLocation: 'San Francisco', currentOwner: 'Alex Rodriguez', serialNumber: 'HC2024001' },
    { id: 'AST-005', name: 'Adobe Creative Suite', type: 'Software', currentLocation: 'Remote', currentOwner: 'Michael Chen', serialNumber: 'ACS2024001' }
  ];

  const locations = [
    'Tokyo Office', 'New York Office', 'London Office', 'Berlin Office', 
    'San Francisco', 'Austin Office', 'Madrid Office', 'Mumbai Office', 'Singapore Office'
  ];

  const departments = [
    'IT Department', 'Finance', 'Human Resources', 'Operations', 'Marketing', 
    'Sales', 'Legal', 'Procurement', 'Facilities', 'Security'
  ];

  const users = [
    'Sarah Johnson', 'Michael Chen', 'Alex Rodriguez', 'Emma Wilson', 'James Taylor',
    'Lisa Garcia', 'David Kim', 'Sophie Brown', 'Robert Davis', 'Maria Lopez'
  ];

  const transferReasons = [
    'Employee Transfer', 'Department Restructuring', 'Equipment Upgrade', 'Maintenance Required',
    'Project Assignment', 'Office Relocation', 'Asset Optimization', 'User Request', 'Other'
  ];

  const transportMethods = [
    'Internal Staff', 'Courier Service', 'Professional Movers', 'IT Support Team', 'Facilities Team'
  ];

  const documentTypes = [
    'Transfer Authorization', 'Asset Condition Report', 'Insurance Certificate', 
    'Packing List', 'Delivery Receipt', 'User Acknowledgment'
  ];

  const steps = [
    { number: 1, title: 'Select Assets', description: 'Choose assets to transfer' },
    { number: 2, title: 'Transfer Details', description: 'Specify transfer information' },
    { number: 3, title: 'Source & Destination', description: 'Set locations and contacts' },
    { number: 4, title: 'Approval & Review', description: 'Review and submit' }
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAssetSelection = (asset: SelectedAsset) => {
    const isSelected = selectedAssets.some(a => a.id === asset.id);
    if (isSelected) {
      setSelectedAssets(prev => prev.filter(a => a.id !== asset.id));
    } else {
      setSelectedAssets(prev => [...prev, asset]);
    }
  };

  const filteredAssets = availableAssets.filter(asset =>
    asset.name.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(assetSearchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transferData = {
      ...formData,
      assets: selectedAssets,
      transferId: `TRF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(3, '0')}`,
      status: 'Pending Approval',
      createdDate: new Date().toISOString(),
      createdBy: 'Current User'
    };
    onSubmit(transferData);
    onClose();
    // Reset form
    setCurrentStep(1);
    setSelectedAssets([]);
    setAssetSearchTerm('');
    setFormData({
      transferType: 'permanent',
      priority: 'normal',
      requestedDate: new Date().toISOString().split('T')[0],
      expectedCompletionDate: '',
      sourceLocation: '',
      sourceBuilding: '',
      sourceDepartment: '',
      sourceContact: '',
      destinationLocation: '',
      destinationBuilding: '',
      destinationDepartment: '',
      destinationContact: '',
      newOwner: '',
      reason: '',
      businessJustification: '',
      specialInstructions: '',
      transportMethod: 'internal',
      packingRequired: false,
      insuranceRequired: false,
      approverRequired: true,
      approver: '',
      documentsRequired: [],
      costCenter: '',
      projectCode: '',
      notes: ''
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedAssets.length > 0;
      case 2:
        return formData.reason && formData.transferType && formData.requestedDate;
      case 3:
        return formData.sourceLocation && formData.destinationLocation && formData.newOwner;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ArrowRightLeft className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">New Asset Transfer</h2>
                <p className="text-sm text-gray-600">Create a new asset transfer request</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.number 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
                    </div>
                    <div className="hidden md:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-full h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Select Assets */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Search className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Select Assets to Transfer</h3>
                </div>

                {/* Asset Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search assets by name, ID, or type..."
                    value={assetSearchTerm}
                    onChange={(e) => setAssetSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Selected Assets Summary */}
                {selectedAssets.length > 0 && (
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-medium text-indigo-900 mb-2">Selected Assets ({selectedAssets.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssets.map(asset => (
                        <span key={asset.id} className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {asset.name}
                          <button
                            type="button"
                            onClick={() => handleAssetSelection(asset)}
                            className="hover:bg-indigo-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Assets */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAssets.map(asset => (
                    <div
                      key={asset.id}
                      onClick={() => handleAssetSelection(asset)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAssets.some(a => a.id === asset.id)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedAssets.some(a => a.id === asset.id)}
                            onChange={() => handleAssetSelection(asset)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{asset.name}</h4>
                            <p className="text-sm text-gray-500">{asset.id} • {asset.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{asset.currentLocation}</p>
                          <p className="text-xs text-gray-500">Owner: {asset.currentOwner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Transfer Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Transfer Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Type *</label>
                    <select
                      required
                      value={formData.transferType}
                      onChange={(e) => handleInputChange('transferType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="permanent">Permanent Transfer</option>
                      <option value="temporary">Temporary Assignment</option>
                      <option value="loan">Equipment Loan</option>
                      <option value="maintenance">Maintenance Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Transfer *</label>
                    <select
                      required
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select reason...</option>
                      {transferReasons.map(reason => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requested Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.requestedDate}
                      onChange={(e) => handleInputChange('requestedDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Completion</label>
                    <input
                      type="date"
                      value={formData.expectedCompletionDate}
                      onChange={(e) => handleInputChange('expectedCompletionDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transport Method</label>
                    <select
                      value={formData.transportMethod}
                      onChange={(e) => handleInputChange('transportMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      {transportMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Justification</label>
                    <textarea
                      value={formData.businessJustification}
                      onChange={(e) => handleInputChange('businessJustification', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Explain the business need for this transfer..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                    <textarea
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Any special handling or delivery instructions..."
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="packingRequired"
                      checked={formData.packingRequired}
                      onChange={(e) => handleInputChange('packingRequired', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="packingRequired" className="text-sm font-medium text-gray-700">
                      Professional Packing Required
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
                      Insurance Coverage Required
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Source & Destination */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Source & Destination Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Source Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Source Location
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <select
                          required
                          value={formData.sourceLocation}
                          onChange={(e) => handleInputChange('sourceLocation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select source location...</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Building</label>
                        <input
                          type="text"
                          value={formData.sourceBuilding}
                          onChange={(e) => handleInputChange('sourceBuilding', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="Building name or number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select
                          value={formData.sourceDepartment}
                          onChange={(e) => handleInputChange('sourceDepartment', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select department...</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                        <select
                          value={formData.sourceContact}
                          onChange={(e) => handleInputChange('sourceContact', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select contact...</option>
                          {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Destination Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Destination Location
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <select
                          required
                          value={formData.destinationLocation}
                          onChange={(e) => handleInputChange('destinationLocation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select destination location...</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Building</label>
                        <input
                          type="text"
                          value={formData.destinationBuilding}
                          onChange={(e) => handleInputChange('destinationBuilding', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="Building name or number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select
                          value={formData.destinationDepartment}
                          onChange={(e) => handleInputChange('destinationDepartment', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select department...</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                        <select
                          value={formData.destinationContact}
                          onChange={(e) => handleInputChange('destinationContact', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select contact...</option>
                          {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Asset Owner *</label>
                        <select
                          required
                          value={formData.newOwner}
                          onChange={(e) => handleInputChange('newOwner', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="">Select new owner...</option>
                          {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost Center</label>
                    <input
                      type="text"
                      value={formData.costCenter}
                      onChange={(e) => handleInputChange('costCenter', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Cost center code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Code</label>
                    <input
                      type="text"
                      value={formData.projectCode}
                      onChange={(e) => handleInputChange('projectCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Project reference code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Approval & Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Approval & Review</h3>
                </div>

                {/* Transfer Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Transfer Summary</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Assets ({selectedAssets.length})</h5>
                      <div className="space-y-1">
                        {selectedAssets.map(asset => (
                          <p key={asset.id} className="text-sm text-gray-600">• {asset.name} ({asset.id})</p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Transfer Type: </span>
                        <span className="text-sm text-gray-900">{formData.transferType}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Priority: </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(formData.priority)}`}>
                          {formData.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">From: </span>
                        <span className="text-sm text-gray-900">{formData.sourceLocation}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">To: </span>
                        <span className="text-sm text-gray-900">{formData.destinationLocation}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">New Owner: </span>
                        <span className="text-sm text-gray-900">{formData.newOwner}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Approval Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="approverRequired"
                      checked={formData.approverRequired}
                      onChange={(e) => handleInputChange('approverRequired', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="approverRequired" className="text-sm font-medium text-gray-700">
                      Approval Required
                    </label>
                  </div>

                  {formData.approverRequired && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Approver</label>
                      <select
                        value={formData.approver}
                        onChange={(e) => handleInputChange('approver', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select approver...</option>
                        {users.map(user => (
                          <option key={user} value={user}>{user}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Documents Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
                  <div className="grid grid-cols-2 gap-2">
                    {documentTypes.map(docType => (
                      <div key={docType} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={docType}
                          checked={formData.documentsRequired.includes(docType)}
                          onChange={(e) => {
                            const current = formData.documentsRequired;
                            if (e.target.checked) {
                              handleInputChange('documentsRequired', [...current, docType]);
                            } else {
                              handleInputChange('documentsRequired', current.filter(d => d !== docType));
                            }
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={docType} className="text-sm text-gray-700">{docType}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Any additional notes or comments..."
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg shadow-green-500/25"
                  >
                    Submit Transfer Request
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};