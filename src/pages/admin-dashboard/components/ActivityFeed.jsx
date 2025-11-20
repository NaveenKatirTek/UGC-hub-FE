import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'registration',
      title: 'New Brand Registration',
      description: 'TechCorp Solutions submitted registration for approval',
      timestamp: '2 minutes ago',
      priority: 'medium',
      icon: 'UserPlus',
      color: 'primary',
      actionRequired: true
    },
    {
      id: 2,
      type: 'campaign',
      title: 'Campaign Submitted',
      description: 'Fashion Forward submitted "Summer Collection 2024" campaign',
      timestamp: '15 minutes ago',
      priority: 'high',
      icon: 'Target',
      color: 'success',
      actionRequired: true
    },
    {
      id: 3,
      type: 'dispute',
      title: 'Dispute Alert',
      description: 'Creator dispute raised for campaign #CF-2024-089',
      timestamp: '1 hour ago',
      priority: 'high',
      icon: 'AlertTriangle',
      color: 'error',
      actionRequired: true
    },
    {
      id: 4,
      type: 'fraud',
      title: 'Fraud Detection',
      description: 'Suspicious follower activity detected for @lifestyle_guru',
      timestamp: '2 hours ago',
      priority: 'high',
      icon: 'Shield',
      color: 'warning',
      actionRequired: true
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Processed',
      description: 'Subscription renewal for BeautyBrand Inc. - ₹4,999',
      timestamp: '3 hours ago',
      priority: 'low',
      icon: 'CreditCard',
      color: 'success',
      actionRequired: false
    },
    {
      id: 6,
      type: 'verification',
      title: 'Creator Verified',
      description: '@foodie_explorer completed social media verification',
      timestamp: '4 hours ago',
      priority: 'low',
      icon: 'CheckCircle',
      color: 'success',
      actionRequired: false
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error/10 border-error/20',
      medium: 'bg-warning/10 border-warning/20',
      low: 'bg-muted border-border'
    };
    return colors?.[priority] || colors?.low;
  };

  const getIconColor = (color) => {
    const colors = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div 
            key={activity?.id} 
            className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth ${getPriorityColor(activity?.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getIconColor(activity?.color)}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {activity?.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>
                
                {activity?.actionRequired && (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="xs">
                      Review
                    </Button>
                    <Button variant="ghost" size="xs">
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full">
          View All Activities
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;