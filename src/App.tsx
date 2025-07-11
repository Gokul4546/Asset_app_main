import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AssetRegistryPage } from './components/AssetRegistryPage';
import { AuditManagementPage } from './components/AuditManagementPage';
import { ReportsPage } from './components/ReportsPage';
import { AssetDetailsPage } from './components/AssetDetailsPage';
import { AuditScorecard } from './components/AuditScorecard';
import { MaintenancePage } from './components/MaintenancePage';
import { UserRoleManagementPage } from './components/UserRoleManagementPage';
import { NotificationsPage } from './components/NotificationsPage';
import { TransferManagementPage } from './components/TransferManagementPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'asset-registry':
        return <AssetRegistryPage />;
      case 'transfers':
        return (
          <TransferManagementPage />
        );
      case 'audits':
        return (
          <AuditManagementPage />
        );
      case 'audit-scorecard':
        return <AuditScorecard />;
      case 'asset-details':
        return <AssetDetailsPage />;
      case 'dealer-ledger':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dealer Ledger</h1>
            <p className="text-gray-600">Track dealer transactions and inventory</p>
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Dealer ledger functionality coming soon...</p>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <MaintenancePage />
        );
      case 'reports':
        return (
          <ReportsPage />
        );
      case 'users-roles':
        return (
          <UserRoleManagementPage />
        );
      case 'settings':
        return (
          <NotificationsPage />
        );
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-hidden">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;