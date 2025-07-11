import React from 'react';
import { Train as Transfer, Calendar, Trash2, Download, Undo2, CheckCircle } from 'lucide-react';
import { BulkAction } from '../types/Asset';

interface BulkActionsProps {
  selectedCount: number;
  onAction: (actionId: string) => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onAction,
  onClearSelection
}) => {
  const actions: BulkAction[] = [
    { id: 'transfer', label: 'Transfer', icon: 'transfer', variant: 'default' },
    { id: 'audit', label: 'Schedule Audit', icon: 'calendar', variant: 'default' },
    { id: 'export', label: 'Export', icon: 'download', variant: 'default' },
    { id: 'delete', label: 'Delete', icon: 'trash', variant: 'destructive' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'transfer':
        return <Transfer className="h-4 w-4" />;
      case 'calendar':
        return <Calendar className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'trash':
        return <Trash2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 sticky top-40 z-20 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-lg">
                  {selectedCount} asset{selectedCount > 1 ? 's' : ''} selected
                </span>
                <p className="text-indigo-100 text-sm -mt-0.5">Choose an action to apply</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onAction(action.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    action.variant === 'destructive'
                      ? 'bg-red-500/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm'
                  }`}
                >
                  {getIcon(action.icon)}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={onClearSelection}
            className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm"
          >
            <Undo2 className="h-4 w-4" />
            <span>Clear Selection</span>
          </button>
        </div>
      </div>
    </div>
  );
};