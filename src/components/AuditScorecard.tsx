import React, { useState } from 'react';
import { Trophy, AlertTriangle, Users, Filter, Download, ChevronRight } from 'lucide-react';

export const AuditScorecard: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedIssues, setSelectedIssues] = useState('All Issues');

  const overallStats = [
    {
      title: 'Overall Score',
      value: '92.4%',
      subtitle: 'Audit Completion Rate',
      change: '↑ 3.2% vs last quarter',
      icon: Trophy,
      color: 'blue'
    },
    {
      title: 'Exception Rate',
      value: '7.6%',
      subtitle: 'Assets with Issues',
      change: '↓ 1.8% improvement',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Active Auditors',
      value: '24',
      subtitle: 'Currently Active',
      change: '8 zones covered',
      icon: Users,
      color: 'green'
    }
  ];

  const regionalScores = [
    { zone: 'North Zone', score: 95, assets: 4256, rating: 'Excellent' },
    { zone: 'South Zone', score: 91, assets: 3891, rating: 'Good' },
    { zone: 'East Zone', score: 88, assets: 2743, rating: 'Good' },
    { zone: 'West Zone', score: 84, assets: 1957, rating: 'Fair' }
  ];

  const categoryScores = [
    { category: 'IT Equipment', score: 96, icon: '💻' },
    { category: 'Furniture', score: 89, icon: '🪑' },
    { category: 'Vehicles', score: 93, icon: '🚗' },
    { category: 'Machinery', score: 87, icon: '⚙️' },
    { category: 'Others', score: 91, icon: '📦' }
  ];

  const exceptionAssets = [
    {
      assetId: 'AST-2025-001',
      name: 'Dell Laptop',
      issue: 'Not Found',
      location: 'North Zone - Depot A',
      auditor: 'John Smith',
      date: 'Jan 15, 2025',
      status: 'Open'
    },
    {
      assetId: 'AST-2025-047',
      name: 'Office Chair',
      issue: 'Wrong Location',
      location: 'South Zone - Depot C',
      auditor: 'Sarah Johnson',
      date: 'Jan 14, 2025',
      status: 'Resolved'
    },
    {
      assetId: 'AST-2025-089',
      name: 'Printer',
      issue: 'Condition Issue',
      location: 'East Zone - Depot B',
      auditor: 'Mike Chen',
      date: 'Jan 13, 2025',
      status: 'Open'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'green': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const getIssueColor = (issue: string) => {
    switch (issue) {
      case 'Not Found': return 'bg-red-100 text-red-800';
      case 'Wrong Location': return 'bg-amber-100 text-amber-800';
      case 'Condition Issue': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Scorecard & Reports</h1>
          <p className="text-gray-600">Visual audit scores and downloadable audit trails</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                <p className="text-xs text-green-600 mt-2">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Regional Audit Scores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Audit Scores</h3>
          
          <div className="space-y-4">
            {regionalScores.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-900">{region.score}%</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{region.zone}</h4>
                    <p className="text-sm text-gray-500">{region.assets.toLocaleString()} assets audited</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getRatingColor(region.rating)}`}>
                    {region.rating}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Category Scores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Category Scores</h3>
          
          <div className="space-y-4">
            {categoryScores.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{category.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exception Assets */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Exception Assets</h3>
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
              value={selectedIssues}
              onChange={(e) => setSelectedIssues(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            >
              <option>All Issues</option>
              <option>Not Found</option>
              <option>Wrong Location</option>
              <option>Condition Issue</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Asset ID</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Asset Name</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Issue Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Location</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Auditor</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {exceptionAssets.map((asset, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{asset.assetId}</td>
                  <td className="py-4 text-sm text-gray-600">{asset.name}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIssueColor(asset.issue)}`}>
                      {asset.issue}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{asset.location}</td>
                  <td className="py-4 text-sm text-gray-600">{asset.auditor}</td>
                  <td className="py-4 text-sm text-gray-600">{asset.date}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Audit Trail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Complete Audit Report</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Full audit trail with timestamps and auditor details</p>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Exception Summary</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Detailed report of all audit exceptions and issues</p>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};