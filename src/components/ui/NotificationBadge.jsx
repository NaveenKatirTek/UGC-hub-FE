import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99,
  variant = 'default',
  size = 'default',
  showZero = false,
  className = ''
}) => {
  const shouldShow = count > 0 || showZero;
  const displayCount = count > maxCount ? `${maxCount}+` : count?.toString();

  if (!shouldShow) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 min-w-4 text-xs px-1';
      case 'lg':
        return 'h-7 min-w-7 text-sm px-2';
      default:
        return 'h-5 min-w-5 text-xs px-1.5';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        animate-standard
        z-badge
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;