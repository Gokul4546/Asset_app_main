import React, { useState } from 'react';
import { ListControls } from './ListControls';
import { FilterBar } from './FilterBar';
import { AssetTable } from './AssetTable';
import { AssetCard } from './AssetCard';
import { AssetGrid } from './AssetGrid';
import { BulkActions } from './BulkActions';
import { Pagination } from './Pagination';
import { useAssets } from '../hooks/useAssets';

export const AssetRegistryPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const {
    assets,
    searchTerm,
    setSearchTerm,
    selectedAssets,
    sortColumn,
    sortDirection,
    sortCriteria,
    currentPage,
    setCurrentPage,
    filters,
    activeFilters,
    currentView,
    setCurrentView,
    paginatedAssets,
    totalPages,
    handleSort,
    handleMultiSort,
    handleFilterChange,
    handleSelectionChange,
    handleSelectAll,
    removeFilter,
    clearAllFilters,
    clearSelection,
    handleImport,
    handleExport
  } = useAssets();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBulkAction = (actionId: string) => {
    console.log(`Bulk action: ${actionId} on ${selectedAssets.size} assets`);
    // Implement bulk action logic here
  };

  const handleSavedViews = () => {
    console.log('Show saved views');
    // Implement saved views logic here
  };

  return (
    <div className="flex-1 overflow-hidden">
      <ListControls
        assets={assets}
        currentView={currentView}
        onViewChange={setCurrentView}
        currentSort={sortColumn}
        currentDirection={sortDirection}
        sortCriteria={sortCriteria}
        onSort={handleSort}
        onMultiSort={handleMultiSort}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onImport={handleImport}
        onExport={handleExport}
      />
      
      <FilterBar
        filters={filters}
        onRemoveFilter={removeFilter}
        onClearAll={clearAllFilters}
        onSavedViews={handleSavedViews}
      />
      
      <BulkActions
        selectedCount={selectedAssets.size}
        onAction={handleBulkAction}
        onClearSelection={clearSelection}
      />
      
      <div className="p-8">
        {isMobile || currentView === 'grid' ? (
          currentView === 'grid' ? (
            <AssetGrid
              assets={paginatedAssets}
              selectedAssets={selectedAssets}
              onSelectionChange={handleSelectionChange}
            />
          ) : (
          <div className="grid gap-4">
            {paginatedAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                isSelected={selectedAssets.has(asset.id)}
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          )
        ) : (
          <AssetTable
            assets={paginatedAssets}
            selectedAssets={selectedAssets}
            onSelectionChange={handleSelectionChange}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        )}
        
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};