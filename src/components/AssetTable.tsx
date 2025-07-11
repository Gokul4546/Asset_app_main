import React from 'react';
import { ArrowUpDown, Laptop, Smartphone, Car, Cog, TrendingUp } from 'lucide-react';
import { Asset } from '../types/Asset';
import { StatusBadge } from './StatusBadge';
import { UserAvatar } from './UserAvatar';
import { ActionMenu } from './ActionMenu';

interface AssetTableProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onSelectionChange: (assetId: string) => void;
  onSelectAll: () => void;
  onSort: (column: string) => void;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

export const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  selectedAssets,
  onSelectionChange,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection
}) => {
  const getTypeIcon = (type: Asset['type']) => {
    const iconProps = "h-4 w-4";
    switch (type) {
      case 'Hardware':
        return <Laptop className={`${iconProps} text-blue-600`} />;
      case 'Software':
        return <Smartphone className={`${iconProps} text-green-600`} />;
      case 'Vehicle':
        return <Car className={`${iconProps} text-red-600`} />;
      case 'Equipment':
        return <Cog className={`${iconProps} text-purple-600`} />;
      default:
        return <Laptop className={`${iconProps} text-gray-600`} />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const SortButton: React.FC<{ column: string; children: React.ReactNode }> = ({ column, children }) => (
    <button
      onClick={() => onSort(column)}
      className="group flex items-center gap-2 hover:text-gray-900 transition-colors duration-200 font-medium"
    >
      {children}
      <ArrowUpDown className={`h-3 w-3 transition-all duration-200 ${
        sortColumn === column 
          ? 'text-indigo-600 scale-110' 
          : 'text-gray-400 group-hover:text-gray-600'
      }`} />
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200/60">
              <th className="px-6 py-4 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedAssets.size === assets.length && assets.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="id">Asset ID</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="name">Asset Name</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="type">Type</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="status">Status</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="assignedUser">Owner</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="location">Location</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <SortButton column="lastVerified">Last Verified</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/60">
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                className={`group hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/20 transition-all duration-200 ${
                  selectedAssets.has(asset.id) 
                    ? 'bg-gradient-to-r from-indigo-50/50 to-purple-50/30 ring-1 ring-indigo-200/50' 
                    : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAssets.has(asset.id)}
                    onChange={() => onSelectionChange(asset.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-medium text-gray-900">{asset.id}</span>
                    <TrendingUp className="h-3 w-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                      {getTypeIcon(asset.type)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{asset.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">#{asset.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 font-medium">{asset.type}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="px-6 py-4">
                  <UserAvatar name={asset.assignedUser.name} initials={asset.assignedUser.initials} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{asset.location}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{formatDate(asset.lastVerified)}</span>
                </td>
                <td className="px-6 py-4">
                  <ActionMenu asset={asset} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};