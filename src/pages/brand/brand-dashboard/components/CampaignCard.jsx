import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const CampaignCard = ({ 
  campaign,
  onEdit = () => {},
  onPause = () => {},
  onViewAnalytics = () => {}
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'paused':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'draft':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const calculateProgress = (used, total) => {
    return Math.min((used / total) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const progress = calculateProgress(campaign?.budgetUsed, campaign?.totalBudget);
  const daysRemaining = getDaysRemaining(campaign?.endDate);

  return (
    <div className="bg-card border border-border rounded-card p-6 hover:shadow-medium animate-standard">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {campaign?.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign?.status)}`}>
              {campaign?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {campaign?.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(campaign?.id)}
            className="h-8 w-8"
          >
            <Icon name="Edit2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPause(campaign?.id)}
            className="h-8 w-8"
          >
            <Icon name={campaign?.status === 'active' ? 'Pause' : 'Play'} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewAnalytics(campaign?.id)}
            className="h-8 w-8"
          >
            <Icon name="BarChart3" size={16} />
          </Button>
        </div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Days Remaining</p>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {daysRemaining} days
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Applications</p>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {campaign?.applications} creators
            </span>
          </div>
        </div>
      </div>
      {/* Budget Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Budget Used</span>
          <span className="text-xs font-medium text-foreground">
            {formatCurrency(campaign?.budgetUsed)} / {formatCurrency(campaign?.totalBudget)}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {progress?.toFixed(1)}% used
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(campaign?.totalBudget - campaign?.budgetUsed)} remaining
          </span>
        </div>
      </div>
      {/* Performance Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{campaign?.reach}</p>
            <p className="text-xs text-muted-foreground">Reach</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{campaign?.engagement}</p>
            <p className="text-xs text-muted-foreground">Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{campaign?.conversions}</p>
            <p className="text-xs text-muted-foreground">Conversions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;