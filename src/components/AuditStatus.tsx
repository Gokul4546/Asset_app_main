import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const AuditStatus: React.FC = () => {
  const auditData = [
    { status: 'Verified', count: 11820, color: 'text-green-600', bgColor: 'bg-green-50' },
    { status: 'Pending', count: 847, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { status: 'Not Found', count: 180, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const totalAudits = auditData.reduce((sum, item) => sum + item.count, 0);
  const completedPercentage = ((auditData[0].count / totalAudits) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Audit Status</h3>
      </div>
      
      {/* Completion Percentage */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">{completedPercentage}%</div>
        <p className="text-sm text-gray-600">Completed</p>
      </div>
      
      {/* Status Breakdown */}
      <div className="space-y-3">
        {auditData.map((item, index) => {
          const Icon = index === 0 ? CheckCircle : index === 1 ? Clock : AlertTriangle;
          
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.status}</span>
              </div>
              <span className="font-semibold text-gray-900">{item.count.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};