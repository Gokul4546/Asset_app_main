import React, { useState } from 'react';
import { ListControls } from './ListControls';
import { FilterBar } from './FilterBar';
import { AssetGrid } from './AssetGrid';
import { AssetTable } from './AssetTable';
import { Pagination } from './Pagination';
import { useAssets } from '../hooks/useAssets';

export function AssetRegistryPage() {
  const { assets, loading } = useAssets();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <ListControls />
      <FilterBar 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
      />
      
      {viewMode === 'grid' ? (
        <AssetGrid assets={paginatedAssets} />
      ) : (
        <AssetTable assets={paginatedAssets} />
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}