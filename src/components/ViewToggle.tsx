import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'table' | 'grid';
  onViewChange: (view: 'table' | 'grid') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('table')}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          currentView === 'table'
            ? 'bg-white shadow-sm text-gray-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          currentView === 'grid'
            ? 'bg-white shadow-sm text-gray-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
};