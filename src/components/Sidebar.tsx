import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  ClipboardCheck, 
  Building2, 
  Wrench, 
  FileText, 
  Users, 
  Settings,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'asset-registry', label: 'Asset Registry', icon: Package },
    { id: 'transfers', label: 'Transfers', icon: ArrowRightLeft},
    { id: 'audits', label: 'Audits', icon: ClipboardCheck },
    { id: 'dealer-ledger', label: 'Dealer Ledger', icon: Building2 },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'users-roles', label: 'Users & Roles', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Only these should be enabled
  const enabledIds = ['dashboard', 'asset-registry'];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AssetTracker Admin</h1>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isEnabled = enabledIds.includes(item.id);

            return (
              <li key={item.id}>
                <button
                  onClick={() => isEnabled && onPageChange(item.id)}
                  disabled={!isEnabled}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive && isEnabled ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600' : ''}
                    ${isEnabled ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' : 'text-gray-400 cursor-not-allowed bg-gray-50'}
                  `}
                  tabIndex={isEnabled ? 0 : -1}
                  aria-disabled={!isEnabled}
                >
                  <Icon className={`h-5 w-5 ${isActive && isEnabled ? 'text-indigo-600' : isEnabled ? 'text-gray-500' : 'text-gray-300'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@company.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        
        {/* Notification Bell */}
        <div className="mt-3 flex justify-center">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
