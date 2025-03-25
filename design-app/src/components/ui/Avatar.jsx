import React from 'react';
import { cn } from '@/lib/utils';

const Avatar = ({
  src,
  alt,
  size = 'md',
  status,
  className,
  notification
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const statusColors = {
    online: 'bg-brand-green',
    offline: 'bg-gray-400',
    away: 'bg-yellow-400',
    busy: 'bg-brand-red',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'rounded-full overflow-hidden border-2 border-white',
          sizeClasses[size],
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {status && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-3.5 h-3.5',
            statusColors[status]
          )}
        />
      )}
      
      {notification && notification > 0 && (
        <div className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center animate-pulse">
          {notification > 9 ? '9+' : notification}
        </div>
      )}
    </div>
  );
};

export default Avatar;