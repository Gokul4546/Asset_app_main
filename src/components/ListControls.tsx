import React from 'react';
import { Plus } from 'lucide-react'; // Add this!
import { ViewToggle } from './ViewToggle';
import { SortMenu } from './SortMenu';
import { FilterMenu } from './FilterMenu';
import { ImportExportMenu } from './ImportExportMenu';
import { Asset } from '../types/Asset';

interface SortCriteria {
  column: string;
  direction: 'asc' | 'desc';
}

interface ListControlsProps {
  assets: Asset[];
  currentView: 'table' | 'grid';
  onViewChange: (view: 'table' | 'grid') => void;
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  sortCriteria: SortCriteria[];
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  onMultiSort: (criteria: SortCriteria[]) => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, values: string[]) => void;
  onImport: (format: string) => void;
  onExport: (format: string) => void;
  onAddAsset: () => void;
}

export const ListControls: React.FC<ListControlsProps> = ({
  assets,
  currentView,
  onViewChange,
  currentSort,
  currentDirection,
  sortCriteria,
  onSort,
  onMultiSort,
  activeFilters,
  onFilterChange,
  onImport,
  onExport,
  onAddAsset,
}) => {
  const getNeedsAttentionCount = () => {
    return assets.filter(asset => 
      asset.status === 'Needs Audit' || 
      asset.status === 'Maintenance' ||
      asset.auditStatus === 'Overdue'
    ).length;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-400">•</span>
              <span className="text-amber-600">{getNeedsAttentionCount()} need attention</span>
            </div>
            <button
              onClick={onAddAsset}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <Plus className="h-4 w-4" />
              <span>Add Asset</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <ViewToggle currentView={currentView} onViewChange={onViewChange} />
            <div className="w-px h-6 bg-gray-200"></div>
            <SortMenu 
              currentSort={currentSort}
              currentDirection={currentDirection}
              sortCriteria={sortCriteria}
              onSort={onSort}
              onMultiSort={onMultiSort}
            />
            <FilterMenu 
              assets={assets}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
            />
            <div className="w-px h-6 bg-gray-200"></div>
            <ImportExportMenu onImport={onImport} onExport={onExport} />
          </div>
        </div>
      </div>
    </div>
  );
};
