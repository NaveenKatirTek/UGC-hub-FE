import React from 'react';
import Icon from '../../../../components/AppIcon';

const OverviewCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  loading = false 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'from-success/10 to-success/5 border-success/20';
      case 'warning':
        return 'from-warning/10 to-warning/5 border-warning/20';
      case 'error':
        return 'from-error/10 to-error/5 border-error/20';
      case 'secondary':
        return 'from-secondary/10 to-secondary/5 border-secondary/20';
      default:
        return 'from-primary/10 to-primary/5 border-primary/20';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      case 'secondary':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-success';
    if (changeType === 'decrease') return 'text-error';
    return 'text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-card p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-muted rounded-lg"></div>
          <div className="w-12 h-4 bg-muted rounded"></div>
        </div>
        <div className="w-20 h-8 bg-muted rounded mb-2"></div>
        <div className="w-16 h-4 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${getColorClasses()} border rounded-card p-6 animate-standard hover:shadow-medium transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center shadow-subtle">
          <Icon name={icon} size={24} color={getIconColor()} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default OverviewCard;