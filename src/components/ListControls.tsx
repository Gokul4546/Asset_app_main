import React from 'react';
import { ImportExportMenu } from './ImportExportMenu';
import { Plus } from 'lucide-react';
import { Asset } from '../types/Asset';

interface ListControlsProps {
  assets: Asset[];
  onImport: (format: string) => void;
  onExport: (format: string) => void;
  onAddAsset: () => void;
}

export const ListControls: React.FC<ListControlsProps> = ({
  assets,
  onImport,
  onExport,
  onAddAsset
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Assets</h2>
            <p className="text-sm text-gray-600 mt-0.5">Manage your organization's assets</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onAddAsset}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg shadow-indigo-500/25"
            >
              <Plus className="h-4 w-4" />
              <span>Add Asset</span>
            </button>
            
            <ImportExportMenu onImport={onImport} onExport={onExport} />
          </div>
        </div>
      </div>
    </div>
  );
};
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