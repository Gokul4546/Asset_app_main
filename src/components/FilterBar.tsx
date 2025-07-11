import React from 'react';
import { X, ChevronDown, BookmarkCheck, Filter, Sparkles } from 'lucide-react';
import { FilterChip } from '../types/Asset';

interface FilterBarProps {
  filters: FilterChip[];
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  onSavedViews: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  onSavedViews
}) => {
  if (filters.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200/60 sticky top-20 z-30">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span>No active filters</span>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                Browse all assets
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                <Sparkles className="h-3 w-3" />
                <span>Smart Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/30 border-b border-indigo-200/40 sticky top-20 z-30 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Filter className="h-4 w-4 text-indigo-600" />
            <span className="font-medium">Active Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className="group flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-200/60 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:border-indigo-300 transition-all duration-200 shadow-sm"
              >
                <span className="text-xs">{filter.icon}</span>
                <span className="text-gray-600">{filter.label}:</span>
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
          
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClearAll}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Clear All
            </button>
            
            <div className="w-px h-4 bg-gray-300"></div>
            
            <button
              onClick={onSavedViews}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>Saved Views</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};