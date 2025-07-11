import React from 'react';
import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddAsset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddAsset
}) => {
  return (
    <div className="bg-white border-b border-gray-200/80 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search assets, users, locations..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200 text-sm placeholder-gray-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center">
            <button
              onClick={onAddAsset}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <Plus className="h-4 w-4" />
              <span>Add Asset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};