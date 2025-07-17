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
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40 overflow-hidden">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Assets</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">Manage your organization's assets</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap md:gap-3 w-full md:w-auto">
            <button
              onClick={onAddAsset}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-xs md:text-sm shadow-lg shadow-indigo-500/25"
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