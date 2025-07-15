import React from 'react';
import { Laptop, Smartphone, Car, Cog } from 'lucide-react';
import { Asset } from '../types/Asset';
import { StatusBadge } from './StatusBadge';
import { UserAvatar } from './UserAvatar';
import { ActionMenu } from './ActionMenu';

interface AssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onSelectionChange: (assetId: string) => void;
  onAssetClick?: (assetId: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSelected,
  onSelectionChange,
  onAssetClick
}) => {
  const getTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'Hardware':
        return <Laptop className="h-5 w-5 text-blue-600" />;
      case 'Software':
        return <Smartphone className="h-5 w-5 text-green-600" />;
      case 'Vehicle':
        return <Car className="h-5 w-5 text-red-600" />;
      case 'Equipment':
        return <Cog className="h-5 w-5 text-purple-600" />;
      default:
        return <Laptop className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      onClick={() => onAssetClick?.(asset.id)}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectionChange(asset.id)}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <div className="flex items-center gap-2">
            {getTypeIcon(asset.type)}
            <h3 className="font-medium text-gray-900">{asset.name}</h3>
          </div>
        </div>
        
        <ActionMenu asset={asset} />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Asset ID:</span>
          <span className="text-sm font-medium text-gray-900">{asset.id}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Type:</span>
          <span className="text-sm text-gray-900">{asset.type}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <StatusBadge status={asset.status} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Location:</span>
          <span className="text-sm text-gray-900">{asset.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Verified:</span>
          <span className="text-sm text-gray-900">{formatDate(asset.lastVerified)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <UserAvatar name={asset.assignedUser.name} initials={asset.assignedUser.initials} />
      </div>
    </div>
  );
};