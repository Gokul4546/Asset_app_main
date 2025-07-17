import React from 'react';
import { Asset } from '../types/Asset';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onSelectionChange: (assetId: string) => void;
  onAssetClick?: (assetId: string) => void;
}

export const AssetGrid: React.FC<AssetGridProps> = ({
  assets,
  selectedAssets,
  onSelectionChange,
  onAssetClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          isSelected={selectedAssets.has(asset.id)}
          onSelectionChange={onSelectionChange}
          onAssetClick={onAssetClick}
        />
      ))}
    </div>
  );
};