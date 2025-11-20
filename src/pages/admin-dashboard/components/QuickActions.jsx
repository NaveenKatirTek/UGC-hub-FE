import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 'verify-users',
      title: 'User Verification',
      description: 'Review pending user registrations',
      icon: 'UserCheck',
      color: 'primary',
      count: 12,
      path: '/user-verification'
    },
    {
      id: 'approve-campaigns',
      title: 'Campaign Approvals',
      description: 'Review submitted campaigns',
      icon: 'Target',
      color: 'success',
      count: 8,
      path: '/admin-dashboard'
    },
    {
      id: 'resolve-disputes',
      title: 'Dispute Resolution',
      description: 'Handle user disputes',
      icon: 'AlertTriangle',
      color: 'warning',
      count: 3,
      path: '/admin-dashboard'
    },
    {
      id: 'fraud-alerts',
      title: 'Fraud Detection',
      description: 'Review fraud alerts',
      icon: 'Shield',
      color: 'error',
      count: 5,
      path: '/admin-dashboard'
    },
    {
      id: 'system-health',
      title: 'System Health',
      description: 'Monitor platform status',
      icon: 'Activity',
      color: 'secondary',
      count: null,
      path: '/admin-dashboard'
    },
    {
      id: 'analytics',
      title: 'Generate Reports',
      description: 'Create analytics reports',
      icon: 'BarChart3',
      color: 'primary',
      count: null,
      path: '/admin-dashboard'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      error: 'bg-error/10 text-error hover:bg-error/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const handleActionClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Common administrative tasks and shortcuts
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleActionClick(action?.path)}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                {action?.count && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    action?.color === 'error' ? 'bg-error/10 text-error' :
                    action?.color === 'warning'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                  }`}>
                    {action?.count}
                  </span>
                )}
              </div>
              
              <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-smooth">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            Need help with administrative tasks?
          </p>
          <Button variant="outline" size="sm">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Admin Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;