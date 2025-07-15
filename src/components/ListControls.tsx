import React from 'react';
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
  onExport
}) => {
  const getFilteredCount = () => {
    let count = assets.length;
    Object.entries(activeFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        count = assets.filter(asset => {
          switch (filterType) {
            case 'type':
              return values.includes(asset.type);
            case 'status':
              return values.includes(asset.status);
            case 'location':
              return values.includes(asset.location);
            case 'assignedUser':
              return values.includes(asset.assignedUser.name);
            default:
              return true;
          }
        }).length;
      }
    });
    return count;
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
  };

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
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Assets</h2>
              <p className="text-sm text-gray-600 mt-0.5">Manage your organization's assets</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{assets.length} total assets</span>
              {getActiveFilterCount() > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-indigo-600 font-medium">{getFilteredCount()} filtered</span>
                </>
              )}
              <span className="text-gray-400">•</span>
              <span className="text-amber-600">{getNeedsAttentionCount()} need attention</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ViewToggle currentView={currentView} onViewChange={onViewChange} />
            
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