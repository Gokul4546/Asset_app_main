import { Asset } from '../types/Asset';

export const parseCSV = (csvContent: string): Partial<Asset>[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const asset: Partial<Asset> = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      switch (header.toLowerCase()) {
        case 'asset id':
          asset.id = value;
          break;
        case 'name':
          asset.name = value;
          break;
        case 'type':
          asset.type = value as Asset['type'];
          break;
        case 'status':
          asset.status = value as Asset['status'];
          break;
        case 'assigned user':
          asset.assignedUser = {
            name: value,
            initials: value.split(' ').map(n => n[0]).join('').toUpperCase()
          };
          break;
        case 'location':
          asset.location = value;
          break;
        case 'last verified':
          asset.lastVerified = new Date(value);
          break;
        case 'category':
          asset.category = value;
          break;
        case 'audit status':
          asset.auditStatus = value as Asset['auditStatus'];
          break;
      }
    });
    
    return asset;
  });
};

export const parseJSON = (jsonContent: string): Partial<Asset>[] => {
  try {
    const data = JSON.parse(jsonContent);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const parseExcel = (file: File): Promise<Partial<Asset>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // For a real implementation, you'd use a library like xlsx
        // For now, we'll treat it as CSV
        const content = e.target?.result as string;
        const assets = parseCSV(content);
        resolve(assets);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

export const validateAssetData = (assets: Partial<Asset>[]): { valid: Asset[]; errors: string[] } => {
  const valid: Asset[] = [];
  const errors: string[] = [];
  
  assets.forEach((asset, index) => {
    const rowErrors: string[] = [];
    
    if (!asset.id) rowErrors.push('Asset ID is required');
    if (!asset.name) rowErrors.push('Name is required');
    if (!asset.type) rowErrors.push('Type is required');
    if (!asset.status) rowErrors.push('Status is required');
    if (!asset.assignedUser?.name) rowErrors.push('Assigned User is required');
    if (!asset.location) rowErrors.push('Location is required');
    
    if (rowErrors.length > 0) {
      errors.push(`Row ${index + 2}: ${rowErrors.join(', ')}`);
    } else {
      valid.push({
        ...asset,
        lastVerified: asset.lastVerified || new Date(),
        category: asset.category || asset.type || 'Unknown',
        auditStatus: asset.auditStatus || 'Pending'
      } as Asset);
    }
  });
  
  return { valid, errors };
};