import { useState, useMemo } from 'react';
import { Asset, FilterChip } from '../types/Asset';
import { mockAssets } from '../data/mockAssets';
import { exportToCSV, exportToJSON, exportToExcel, exportToPDF } from '../utils/exportUtils';
import { parseCSV, parseJSON, parseExcel, validateAssetData } from '../utils/importUtils';

interface SortCriteria {
  column: string;
  direction: 'asc' | 'desc';
}

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterChip[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentView, setCurrentView] = useState<'table' | 'grid'>('table');

  const itemsPerPage = 10;

  const filteredAssets = useMemo(() => {
    let filtered = assets;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assignedUser.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active filters (many-to-many combinations)
    Object.entries(activeFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(asset => {
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
        });
      }
    });

    // Apply multi-column sorting
    if (sortCriteria.length > 0) {
      filtered.sort((a, b) => {
        for (const criteria of sortCriteria) {
          let aValue: any = a[criteria.column as keyof Asset];
          let bValue: any = b[criteria.column as keyof Asset];

          if (criteria.column === 'assignedUser') {
            aValue = a.assignedUser.name;
            bValue = b.assignedUser.name;
          }

          if (criteria.column === 'lastVerified') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
          }

          if (aValue < bValue) return criteria.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return criteria.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Fallback to single column sorting
      filtered.sort((a, b) => {
        let aValue: any = a[sortColumn as keyof Asset];
        let bValue: any = b[sortColumn as keyof Asset];

        if (sortColumn === 'assignedUser') {
          aValue = a.assignedUser.name;
          bValue = b.assignedUser.name;
        }

        if (sortColumn === 'lastVerified') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, activeFilters, sortColumn, sortDirection, sortCriteria, assets]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string, direction?: 'asc' | 'desc') => {
    if (direction) {
      setSortColumn(column);
      setSortDirection(direction);
      setSortCriteria([]); // Clear multi-sort when using single sort
      return;
    }
    
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setSortCriteria([]); // Clear multi-sort when using single sort
  };

  const handleMultiSort = (criteria: SortCriteria[]) => {
    setSortCriteria(criteria);
    if (criteria.length > 0) {
      // Set primary sort to first criteria for UI consistency
      setSortColumn(criteria[0].column);
      setSortDirection(criteria[0].direction);
    }
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    if (filterType === 'clear') {
      setActiveFilters({});
      setFilters([]);
      return;
    }
    
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
    
    // Update filter chips for display
    const newFilters: FilterChip[] = [];
    Object.entries({ ...activeFilters, [filterType]: values }).forEach(([type, vals]) => {
      vals.forEach((value, index) => {
        newFilters.push({
          id: `${type}-${index}`,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          value,
          icon: getFilterIcon(type)
        });
      });
    });
    setFilters(newFilters);
  };

  const getFilterIcon = (filterType: string) => {
    switch (filterType) {
      case 'type': return '🔧';
      case 'status': return '🔍';
      case 'location': return '📍';
      case 'assignedUser': return '👤';
      default: return '🏷️';
    }
  };

  const handleSelectionChange = (assetId: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      newSelected.add(assetId);
    }
    setSelectedAssets(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAssets.size === paginatedAssets.length) {
      setSelectedAssets(new Set());
    } else {
      setSelectedAssets(new Set(paginatedAssets.map(asset => asset.id)));
    }
  };

  const removeFilter = (filterId: string) => {
    const filter = filters.find(f => f.id === filterId);
    if (filter) {
      const filterType = filter.label.toLowerCase();
      const currentValues = activeFilters[filterType] || [];
      const newValues = currentValues.filter(v => v !== filter.value);
      handleFilterChange(filterType, newValues);
    }
  };

  const clearAllFilters = () => {
    handleFilterChange('clear', []);
  };

  const clearSelection = () => {
    setSelectedAssets(new Set());
  };

  const handleImport = async (format: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = format === 'csv' ? '.csv' : format === 'json' ? '.json' : '.xlsx,.xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        let parsedAssets: Partial<Asset>[] = [];
        
        if (format === 'csv') {
          const content = await file.text();
          parsedAssets = parseCSV(content);
        } else if (format === 'json') {
          const content = await file.text();
          parsedAssets = parseJSON(content);
        } else if (format === 'excel') {
          parsedAssets = await parseExcel(file);
        }
        
        const { valid, errors } = validateAssetData(parsedAssets);
        
        if (errors.length > 0) {
          alert(`Import completed with errors:\n${errors.join('\n')}`);
        }
        
        if (valid.length > 0) {
          setAssets(prev => [...prev, ...valid]);
          alert(`Successfully imported ${valid.length} assets`);
        }
      } catch (error) {
        alert(`Import failed: ${error}`);
      }
    };
    
    input.click();
  };

  const handleExport = (format: string) => {
    const assetsToExport = selectedAssets.size > 0 
      ? filteredAssets.filter(asset => selectedAssets.has(asset.id))
      : filteredAssets;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `assets-${timestamp}`;
    
    switch (format) {
      case 'csv':
        exportToCSV(assetsToExport, `${filename}.csv`);
        break;
      case 'json':
        exportToJSON(assetsToExport, `${filename}.json`);
        break;
      case 'excel':
        exportToExcel(assetsToExport, `${filename}.xlsx`);
        break;
      case 'pdf':
        exportToPDF(assetsToExport, `${filename}.pdf`);
        break;
    }
  };

  return {
    assets,
    searchTerm,
    setSearchTerm,
    selectedAssets,
    setSelectedAssets,
    sortColumn,
    sortDirection,
    sortCriteria,
    currentPage,
    setCurrentPage,
    filters,
    activeFilters,
    currentView,
    setCurrentView,
    filteredAssets,
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
  };
};