import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({
  children,
  variant = 'default',
  className,
  onClick,
  count,
  showCount = false,
}) => {
  const variantStyles = {
    default: 'bg-brand-blue text-white',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'bg-transparent border border-gray-300 text-gray-800',
    success: 'bg-brand-green text-white',
    danger: 'bg-brand-red text-white',
    warning: 'bg-yellow-400 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        onClick ? 'cursor-pointer hover:opacity-90' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
      {showCount && count !== undefined && (
        <span className="ml-1 font-bold">{count}</span>
      )}
    </span>
  );
};

export default Badge;
