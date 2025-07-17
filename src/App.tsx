import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
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
import { PWAPrompt } from './components/PWAPrompt';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAssetClick = (assetId: string) => {
    setSelectedAssetId(assetId);
    setCurrentPage('asset-details');
  };

  const handleBackToRegistry = () => {
    setSelectedAssetId(null);
    setCurrentPage('asset-registry');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'asset-registry':
        return <AssetRegistryPage onAssetClick={handleAssetClick} />;
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
        return <AssetDetailsPage onBack={handleBackToRegistry} />;
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
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header 
          onToggleSidebar={toggleSidebar}
          showHamburger={isMobile}
        />
        {renderPage()}
        <PWAPrompt />
      </div>
    </div>
  );
}

export default App;