import React from 'react';
import { Search, Plus, Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  showHamburger: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  showHamburger
}) => {
  return (
    <div className="bg-white border-b border-gray-200/80 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu - Mobile Only */}
            {showHamburger && (
              <button
                onClick={onToggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            )}
            
            {/* Logo for mobile when sidebar is closed */}
            {showHamburger && (
              <div className="flex items-center gap-3 lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NP</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Nippon Paint</h1>
                </div>
              </div>
            )}
          </div>

          {/* Search - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search assets, users, locations..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200 text-sm placeholder-gray-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search icon for mobile */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};