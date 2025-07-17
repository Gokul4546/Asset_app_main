import React, { useState, useRef, useEffect } from 'react';
import { SortAsc, SortDesc, ChevronDown, ArrowUpDown, Plus, X } from 'lucide-react';

interface SortCriteria {
  column: string;
  direction: 'asc' | 'desc';
}

interface SortOption {
  key: string;
  label: string;
}

interface SortMenuProps {
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  sortCriteria: SortCriteria[];
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  onMultiSort: (criteria: SortCriteria[]) => void;
}

export const SortMenu: React.FC<SortMenuProps> = ({
  currentSort,
  currentDirection,
  sortCriteria,
  onSort,
  onMultiSort
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localCriteria, setLocalCriteria] = useState<SortCriteria[]>(sortCriteria);
  const menuRef = useRef<HTMLDivElement>(null);

  const sortOptions: SortOption[] = [
    { key: 'name', label: 'Asset Name' },
    { key: 'id', label: 'Asset ID' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'assignedUser', label: 'Assigned User' },
    { key: 'location', label: 'Location' },
    { key: 'lastVerified', label: 'Last Verified' },
  ];

  useEffect(() => {
    setLocalCriteria(sortCriteria);
  }, [sortCriteria]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSingleSort = (key: string, direction: 'asc' | 'desc') => {
    onSort(key, direction);
    setIsOpen(false);
  };

  const addSortCriteria = () => {
    const availableColumns = sortOptions.filter(
      option => !localCriteria.some(criteria => criteria.column === option.key)
    );
    
    if (availableColumns.length > 0) {
      const newCriteria = [...localCriteria, { column: availableColumns[0].key, direction: 'asc' as const }];
      setLocalCriteria(newCriteria);
    }
  };

  const updateSortCriteria = (index: number, field: 'column' | 'direction', value: string) => {
    const newCriteria = [...localCriteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setLocalCriteria(newCriteria);
  };

  const removeSortCriteria = (index: number) => {
    const newCriteria = localCriteria.filter((_, i) => i !== index);
    setLocalCriteria(newCriteria);
  };

  const applyMultiSort = () => {
    onMultiSort(localCriteria);
    setIsOpen(false);
  };

  const clearAllSort = () => {
    setLocalCriteria([]);
    onMultiSort([]);
  };

  const getCurrentSortLabel = () => {
    if (sortCriteria.length > 1) {
      return `${sortCriteria.length} criteria`;
    }
    const option = sortOptions.find(opt => opt.key === currentSort);
    return option ? option.label : 'Asset Name';
  };

  const getAvailableColumns = (currentIndex: number) => {
    return sortOptions.filter(option => 
      !localCriteria.some((criteria, index) => 
        criteria.column === option.key && index !== currentIndex
      )
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm relative"
      >
        <ArrowUpDown className="h-4 w-4" />
        <span><span className="hidden sm:inline">Sort by </span>{getCurrentSortLabel()}</span>
        {sortCriteria.length > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
            {sortCriteria.length}
          </span>
        )}
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-72 md:w-80 bg-white rounded-xl shadow-xl border border-gray-200/60 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Sort Options</p>
                <div className="flex gap-2">
                  <button
                    onClick={addSortCriteria}
                    disabled={localCriteria.length >= sortOptions.length}
                    className="text-xs text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                  {localCriteria.length > 0 && (
                    <button
                      onClick={clearAllSort}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Single Sort */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-600 mb-2">Quick Sort</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {sortOptions.slice(0, 4).map((option) => (
                  <div key={option.key} className="flex gap-1">
                    <button
                      onClick={() => handleSingleSort(option.key, 'asc')}
                      className={`flex-1 text-xs px-2 py-1 rounded transition-colors ${
                        currentSort === option.key && currentDirection === 'asc'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      {option.label} ↑
                    </button>
                    <button
                      onClick={() => handleSingleSort(option.key, 'desc')}
                      className={`flex-1 text-xs px-2 py-1 rounded transition-colors ${
                        currentSort === option.key && currentDirection === 'desc'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      {option.label} ↓
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Sort Configuration */}
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-600 mb-2">Multi-Column Sort</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {localCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-500 w-4">{index + 1}.</span>
                    <select
                      value={criteria.column}
                      onChange={(e) => updateSortCriteria(index, 'column', e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                      {getAvailableColumns(index).map(option => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={criteria.direction}
                      onChange={(e) => updateSortCriteria(index, 'direction', e.target.value)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                      <option value="asc">↑ Asc</option>
                      <option value="desc">↓ Desc</option>
                    </select>
                    <button
                      onClick={() => removeSortCriteria(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {localCriteria.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-xs">
                    No sort criteria configured
                  </div>
                )}
              </div>
              
              {localCriteria.length > 0 && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={applyMultiSort}
                    className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Apply Sort
                  </button>
                  <button
                    onClick={() => setLocalCriteria(sortCriteria)}
                    className="px-3 py-2 text-gray-600 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};