import React, { useState } from 'react';
import { Download, Filter, BarChart3, TrendingUp, TrendingDown, FileText, Calendar, Users } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('Asset Register');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedFormat, setSelectedFormat] = useState('Excel (.xlsx)');

  const performanceMetrics = [
    { label: 'Asset Utilization Rate', value: '87.3%', color: 'bg-blue-500' },
    { label: 'Audit Compliance', value: '92.1%', color: 'bg-green-500' },
    { label: 'Transfer Efficiency', value: '78.9%', color: 'bg-purple-500' }
  ];

  const trendData = [
    { label: 'Asset Growth', value: '12.5%', trend: 'up', color: 'text-green-600' },
    { label: 'Missing Assets', value: '3.2%', trend: 'down', color: 'text-red-600' },
    { label: 'Transfers', value: '8.7%', trend: 'up', color: 'text-blue-600' }
  ];

  const recentExports = [
    {
      name: 'Asset_Register_Q4_2025',
      type: 'Excel',
      date: 'Dec 15, 2025',
      records: '12,847',
      status: 'Ready'
    },
    {
      name: 'Transfer_Logs_Nov_2025',
      type: 'CSV',
      date: 'Dec 10, 2025',
      records: '1,234',
      status: 'Ready'
    },
    {
      name: 'Audit_Summary_2025',
      type: 'PDF',
      date: 'Dec 8, 2025',
      records: '8,921',
      status: 'Processing'
    }
  ];

  const reportTemplates = [
    {
      title: 'Asset Summary',
      description: 'Complete asset inventory with current status and locations',
      icon: BarChart3
    },
    {
      title: 'Audit Report',
      description: 'Comprehensive audit results with compliance metrics',
      icon: FileText
    },
    {
      title: 'Transfer Analysis',
      description: 'Transfer patterns and efficiency analysis',
      icon: TrendingUp
    },
    {
      title: 'Performance KPIs',
      description: 'Key performance indicators and benchmarks',
      icon: Users
    }
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Export</h1>
          <p className="text-gray-600">Generate reports and export datasets for analysis</p>
        </div>
      </div>

      {/* Dataset Export Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Dataset Export</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dataset Type</label>
            <select 
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>Asset Register</option>
              <option>Transfer Logs</option>
              <option>Audit Records</option>
              <option>User Activity</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select 
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option>Excel (.xlsx)</option>
              <option>CSV (.csv)</option>
              <option>JSON (.json)</option>
              <option>PDF (.pdf)</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="h-4 w-4" />
            Generate Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Dashboard */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Performance Dashboard</h3>
          </div>
          
          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${metric.color}`}
                    style={{ width: metric.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
            <span className="text-sm text-gray-500 ml-auto">Jan 2025 - Dec 2025</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {trendData.map((trend, index) => {
              const TrendIcon = trend.trend === 'up' ? TrendingUp : TrendingDown;
              return (
                <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                  <div className={`flex items-center justify-center gap-1 ${trend.color} mb-2`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="font-bold text-lg">{trend.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{trend.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Exports</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Export Name</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Date Generated</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Records</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentExports.map((export_, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{export_.name}</td>
                  <td className="py-4 text-sm text-gray-600">{export_.type}</td>
                  <td className="py-4 text-sm text-gray-600">{export_.date}</td>
                  <td className="py-4 text-sm text-gray-600">{export_.records}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      export_.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {export_.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTemplates.map((template, index) => {
          const Icon = template.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{template.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <button className="w-full py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                Generate Report
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};