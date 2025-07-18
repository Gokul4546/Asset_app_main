import React from 'react';
import { X, ChevronDown, BookmarkCheck, Filter, Sparkles, LayoutGrid, List } from 'lucide-react';
import { FilterChip } from '../types/Asset';
import { ViewToggle } from './ViewToggle';
import { SortMenu } from './SortMenu';
import { FilterMenu } from './FilterMenu';
import { Asset } from '../types/Asset';

interface SortCriteria {
  column: string;
  direction: 'asc' | 'desc';
}

interface FilterBarProps {
  assets: Asset[];
  filters: FilterChip[];
  currentView: 'table' | 'grid';
  onViewChange: (view: 'table' | 'grid') => void;
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  sortCriteria: SortCriteria[];
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  onMultiSort: (criteria: SortCriteria[]) => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, values: string[]) => void;
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  onSavedViews: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  assets,
  filters,
  currentView,
  onViewChange,
  currentSort,
  currentDirection,
  sortCriteria,
  onSort,
  onMultiSort,
  activeFilters,
  onFilterChange,
  onRemoveFilter,
  onClearAll,
  onSavedViews
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
    <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200/60 sticky top-16 sm:top-20 z-30">
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        {/* Top row with controls and counts */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{assets.length} total assets</span>
              {getActiveFilterCount() > 0 && (
                <>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <span className="text-indigo-600 font-medium">{getFilteredCount()} filtered</span>
                </>
              )}
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-amber-600">{getNeedsAttentionCount()} need attention</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="hidden sm:block">
              <ViewToggle currentView={currentView} onViewChange={onViewChange} />
            </div>
            
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
            
            <div className="hidden sm:block">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors whitespace-nowrap">
                <Sparkles className="h-3 w-3" />
                <span>Smart Filters</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Active filters section - only show when filters are active */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <Filter className="h-4 w-4 text-indigo-600" />
              <span className="font-medium">Active Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="group flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-200/60 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-white hover:border-indigo-300 transition-all duration-200 shadow-sm"
                >
                  <span className="text-xs">{filter.icon}</span>
                  <span className="hidden sm:inline text-gray-600">{filter.label}:</span>
                  <span className="text-gray-900 font-semibold">{filter.value}</span>
                  <button
                    onClick={() => onRemoveFilter(filter.id)}
                    className="p-0.5 rounded-full hover:bg-gray-200 transition-colors duration-200 opacity-60 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <button
                onClick={onClearAll}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Clear All
              </button>
              
              <div className="w-px h-4 bg-gray-300"></div>
              
              <button
                onClick={onSavedViews}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                <BookmarkCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Saved Views</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};