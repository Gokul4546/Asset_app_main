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
        return <Laptop className="h-4 w-4 text-blue-600" />;
      case 'Software':
        return <Smartphone className="h-4 w-4 text-green-600" />;
      case 'Vehicle':
        return <Car className="h-4 w-4 text-red-600" />;
      case 'Equipment':
        return <Cog className="h-4 w-4 text-purple-600" />;
      default:
        return <Laptop className="h-4 w-4 text-gray-600" />;
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
      onClick={(e) => {
        // Prevent navigation if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) {
          return;
        }
        onAssetClick?.(asset.id);
      }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all duration-200 hover:shadow-md cursor-pointer relative ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
    >
      {/* Action Menu - Top Right */}
      <div className="absolute top-4 right-4">
        <ActionMenu asset={asset} />
      </div>

      {/* Header Section */}
      <div className="flex items-center gap-3 mb-4 pr-8">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectionChange(asset.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 flex-shrink-0"
        />
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {getTypeIcon(asset.type)}
          <h3 className="font-semibold text-gray-900 truncate text-base">{asset.name}</h3>
        </div>
      </div>
      
      {/* Main Content Grid - 3 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 mb-4">
        {/* Column 1 */}
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Asset ID</span>
            <span className="text-sm font-mono text-gray-900 mt-0.5">{asset.id}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Type</span>
            <span className="text-sm text-gray-900 mt-0.5">{asset.type}</span>
          </div>
        </div>
        
        {/* Column 2 */}
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Status</span>
            <div className="mt-0.5">
              <StatusBadge status={asset.status} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Location</span>
            <span className="text-sm text-gray-900 mt-0.5 truncate">{asset.location}</span>
          </div>
        </div>
        
        {/* Column 3 */}
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Last Verified</span>
            <span className="text-sm text-gray-900 mt-0.5">{formatDate(asset.lastVerified)}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Owner</span>
            <span className="text-sm text-gray-900 mt-0.5 truncate">{asset.assignedUser.name}</span>
          </div>
        </div>
      </div>
      
      {/* Footer Section - User Avatar */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {asset.assignedUser.initials}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-sm text-gray-700 font-medium truncate block">{asset.assignedUser.name}</span>
            <span className="text-xs text-gray-500">Asset Owner</span>
          </div>
        </div>
      </div>
    </div>
  );
};