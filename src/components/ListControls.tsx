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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Assets</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Manage your organization's assets</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3">
            <button
              onClick={onAddAsset}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">Add Asset</span>
              <span className="xs:hidden sm:hidden">Add</span>
            </button>
            
            <ImportExportMenu onImport={onImport} onExport={onExport} />
          </div>
        </div>
      </div>
    </div>
  );
};