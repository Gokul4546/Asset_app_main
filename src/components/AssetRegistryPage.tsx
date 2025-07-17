import React from 'react';
import { ListControls } from './ListControls';
import { FilterBar } from './FilterBar';
import { AssetGrid } from './AssetGrid';
import { AssetTable } from './AssetTable';
import { Pagination } from './Pagination';
import { useAssets } from '../hooks/useAssets';

interface AssetRegistryPageProps {
  onAssetClick?: (assetId: string) => void;
}

export function AssetRegistryPage({ onAssetClick }: AssetRegistryPageProps) {
  const {
    assets,
    loading,
    filters,
    currentView,
    setCurrentView,
    sortColumn,
    sortDirection,
    sortCriteria,
    handleSort,
    handleMultiSort,
    activeFilters,
    handleFilterChange,
    removeFilter,
    clearAllFilters,
    selectedAssets,
    onSelectionChange,
    paginatedAssets,
    totalPages,
    currentPage,
    setCurrentPage
  } = useAssets();

  const handleImport = () => {
    // Import functionality
    console.log('Import assets');
  };

  const handleExport = () => {
    // Export functionality
    console.log('Export assets');
  };

  const handleAddAsset = () => {
    // Add asset functionality
    console.log('Add new asset');
  };

  const handleSelectAll = (checked: boolean) => {
    // Select all functionality
    console.log('Select all:', checked);
  };

  const handleSavedViews = () => {
    // Saved views functionality
    console.log('Saved views');
  };

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
      <ListControls 
        assets={assets}
        onImport={handleImport}
        onExport={handleExport}
        onAddAsset={handleAddAsset}
      />
      <FilterBar 
        assets={assets}
        filters={filters}
        currentView={currentView}
        onViewChange={setCurrentView}
        currentSort={sortColumn}
        currentDirection={sortDirection}
        sortCriteria={sortCriteria}
        onSort={handleSort}
        onMultiSort={handleMultiSort}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onRemoveFilter={removeFilter}
        onClearAll={clearAllFilters}
        onSavedViews={handleSavedViews}
      />
      
      {currentView === 'grid' ? (
        <AssetGrid 
          assets={paginatedAssets}
          selectedAssets={selectedAssets}
          onSelectionChange={onSelectionChange}
          onAssetClick={onAssetClick}
        />
      ) : (
        <AssetTable 
          assets={paginatedAssets}
          selectedAssets={selectedAssets}
          onSelectionChange={onSelectionChange}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onAssetClick={onAssetClick}
        />
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}