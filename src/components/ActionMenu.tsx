import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit, UserCheck, Trash2, ExternalLink } from 'lucide-react';
import { Asset } from '../types/Asset';

interface ActionMenuProps {
  asset: Asset;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ asset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
    console.log(`${action} action for asset:`, asset.id);
    setIsOpen(false);
    // Implement action logic here
  };

  const menuItems = [
    { 
      id: 'view', 
      label: 'View Details', 
      icon: Eye, 
      className: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
      description: 'View full asset information'
    },
    { 
      id: 'edit', 
      label: 'Edit Asset', 
      icon: Edit, 
      className: 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700',
      description: 'Modify asset details'
    },
    { 
      id: 'transfer', 
      label: 'Transfer Ownership', 
      icon: UserCheck, 
      className: 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
      description: 'Assign to different user'
    },
    { 
      id: 'external', 
      label: 'Open in System', 
      icon: ExternalLink, 
      className: 'text-gray-700 hover:bg-purple-50 hover:text-purple-700',
      description: 'View in external system'
    },
    { 
      id: 'delete', 
      label: 'Delete Asset', 
      icon: Trash2, 
      className: 'text-red-600 hover:bg-red-50 hover:text-red-700',
      description: 'Permanently remove asset',
      divider: true
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
      >
        <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200/60 py-2 z-50 backdrop-blur-sm">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-900">{asset.name}</p>
              <p className="text-xs text-gray-500">{asset.id}</p>
            </div>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.id}>
                  {item.divider && <div className="my-1 border-t border-gray-100" />}
                  <button
                    onClick={() => handleAction(item.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-sm transition-all duration-200 ${item.className}`}
                  >
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};