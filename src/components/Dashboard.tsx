import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RegionalBreakdown } from './RegionalBreakdown';
import { AuditStatus } from './AuditStatus';
import { AssetTypesDistribution } from './AssetTypesDistribution';
import { ActiveUsers } from './ActiveUsers';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your asset inventory and operations</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RegionalBreakdown />
        <AuditStatus />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AssetTypesDistribution />
        <ActiveUsers />
      </div>
    </div>
  );
};