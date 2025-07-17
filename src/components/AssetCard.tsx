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
      onClick={(e) => {
        // Prevent navigation if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) {
          return;
        }
        onAssetClick?.(asset.id);
      }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md cursor-pointer relative ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
    >
      {/* Top Section: Checkbox, Icon, Name and Action Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectionChange(asset.id)}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 flex-shrink-0"
          />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getTypeIcon(asset.type)}
            <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
          </div>
        </div>
        
        {/* Action Menu in top right */}
        <div className="flex-shrink-0 ml-2">
          <ActionMenu asset={asset} />
        </div>
      </div>
      
      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Asset ID:</span>
            <span className="text-xs font-medium text-gray-900 font-mono">{asset.id}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Type:</span>
            <span className="text-xs text-gray-900">{asset.type}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Status:</span>
            <StatusBadge status={asset.status} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Location:</span>
            <span className="text-xs text-gray-900 text-right truncate ml-2">{asset.location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Verified:</span>
            <span className="text-xs text-gray-900 text-right">{formatDate(asset.lastVerified)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Owner:</span>
            <span className="text-xs text-gray-900 text-right truncate ml-2">{asset.assignedUser.name}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Section: User Avatar (Compact) */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {asset.assignedUser.initials}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs text-gray-700 font-medium truncate block">{asset.assignedUser.name}</span>
            <span className="text-xs text-gray-500">Asset Owner</span>
          </div>
        </div>
      </div>
    </div>
  );
};