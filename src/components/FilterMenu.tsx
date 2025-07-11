import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Check, X, Search, Plus } from 'lucide-react';
import { Asset } from '../types/Asset';

interface FilterMenuProps {
  assets: Asset[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, values: string[]) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  assets,
  activeFilters,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('type');
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUniqueValues = (key: keyof Asset) => {
    const values = assets.map(asset => {
      if (key === 'assignedUser') {
        return asset.assignedUser.name;
      }
      return asset[key] as string;
    });
    return [...new Set(values)].sort();
  };

  const filterTabs = [
    { key: 'type', label: 'Type', values: getUniqueValues('type'), icon: '🔧' },
    { key: 'status', label: 'Status', values: getUniqueValues('status'), icon: '🔍' },
    { key: 'location', label: 'Location', values: getUniqueValues('location'), icon: '📍' },
    { key: 'assignedUser', label: 'Users', values: getUniqueValues('assignedUser'), icon: '👤' },
  ];

  const handleFilterToggle = (filterType: string, value: string) => {
    const currentValues = activeFilters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const handleSelectAll = (filterType: string) => {
    const tab = filterTabs.find(t => t.key === filterType);
    if (tab) {
      const filteredValues = getFilteredValues(tab);
      onFilterChange(filterType, filteredValues);
    }
  };

  const handleDeselectAll = (filterType: string) => {
    onFilterChange(filterType, []);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
  };

  const getFilteredValues = (tab: typeof filterTabs[0]) => {
    const searchTerm = searchTerms[tab.key] || '';
    return tab.values.filter(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearchChange = (filterType: string, term: string) => {
    setSearchTerms(prev => ({ ...prev, [filterType]: term }));
  };

  const applyQuickFilter = (filterType: string, value: string) => {
    onFilterChange(filterType, [value]);
    setIsOpen(false);
  };

  const getFilterCombinationSummary = () => {
    const activeCount = getActiveFilterCount();
    if (activeCount === 0) return 'No filters applied';
    
    const summary = Object.entries(activeFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([type, values]) => `${type}: ${values.length}`)
      .join(', ');
    
    return `${activeCount} filters (${summary})`;
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm relative"
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border border-gray-200/60 z-50">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Advanced Filters</p>
                  <p className="text-xs text-gray-500 mt-0.5">{getFilterCombinationSummary()}</p>
                </div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Plus className={`h-3 w-3 transition-transform ${showAdvanced ? 'rotate-45' : ''}`} />
                  {showAdvanced ? 'Simple' : 'Advanced'}
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            {!showAdvanced && (
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-600 mb-2">Quick Filters</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => applyQuickFilter('status', 'Active')}
                    className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    🟢 Active Only
                  </button>
                  <button
                    onClick={() => applyQuickFilter('status', 'Needs Audit')}
                    className="text-xs px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    🔴 Needs Audit
                  </button>
                  <button
                    onClick={() => applyQuickFilter('type', 'Hardware')}
                    className="text-xs px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    🔧 Hardware
                  </button>
                  <button
                    onClick={() => applyQuickFilter('type', 'Software')}
                    className="text-xs px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    💻 Software
                  </button>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex border-b border-gray-200">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors relative ${
                    activeTab === tab.key
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                  {(activeFilters[tab.key]?.length || 0) > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilters[tab.key].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Filter Content */}
            <div className="p-4">
              {filterTabs.map((tab) => (
                <div key={tab.key} className={activeTab === tab.key ? 'block' : 'hidden'}>
                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                    <input
                      type="text"
                      placeholder={`Search ${tab.label.toLowerCase()}...`}
                      value={searchTerms[tab.key] || ''}
                      onChange={(e) => handleSearchChange(tab.key, e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Select All/None */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelectAll(tab.key)}
                        className="text-xs text-indigo-600 hover:text-indigo-700"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDeselectAll(tab.key)}
                        className="text-xs text-gray-600 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      {(activeFilters[tab.key] || []).length} of {getFilteredValues(tab).length} selected
                    </span>
                  </div>

                  {/* Filter Options */}
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {getFilteredValues(tab).map((value) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={(activeFilters[tab.key] || []).includes(value)}
                            onChange={() => handleFilterToggle(tab.key, value)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 border-2 rounded transition-all ${
                            (activeFilters[tab.key] || []).includes(value)
                              ? 'bg-indigo-600 border-indigo-600'
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {(activeFilters[tab.key] || []).includes(value) && (
                              <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 flex-1">{value}</span>
                        <span className="text-xs text-gray-400">
                          {assets.filter(asset => {
                            if (tab.key === 'assignedUser') return asset.assignedUser.name === value;
                            return asset[tab.key as keyof Asset] === value;
                          }).length}
                        </span>
                      </label>
                    ))}
                    
                    {getFilteredValues(tab).length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        No {tab.label.toLowerCase()} found
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            {getActiveFilterCount() > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
                  </div>
                  <button
                    onClick={() => onFilterChange('clear', [])}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};