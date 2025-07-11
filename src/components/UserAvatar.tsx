import React from 'react';

interface UserAvatarProps {
  name: string;
  initials: string;
  size?: 'sm' | 'md';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, initials, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
  
  // Generate consistent colors based on name
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500'
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const gradientClass = colors[colorIndex];
  
  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses} bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white`}>
        {initials}
      </div>
      <div>
        <span className="text-sm text-gray-900 font-semibold">{name}</span>
        <p className="text-xs text-gray-500 -mt-0.5">Asset Owner</p>
      </div>
    </div>
  );
};