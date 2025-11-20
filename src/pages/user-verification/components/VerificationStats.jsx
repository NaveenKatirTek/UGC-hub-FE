import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Pending Verification',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      title: 'Under Review',
      value: stats?.underReview,
      icon: 'Eye',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20'
    },
    {
      title: 'Approved Today',
      value: stats?.approvedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'Rejected Today',
      value: stats?.rejectedToday,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    {
      title: 'Fraud Alerts',
      value: stats?.fraudAlerts,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    {
      title: 'High Priority',
      value: stats?.highPriority,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border ${stat?.borderColor} rounded-lg p-4 hover:shadow-soft transition-smooth`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{stat?.title}</div>
          
          {/* Progress indicator for some stats */}
          {(stat?.title?.includes('Today') || stat?.title?.includes('Priority')) && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>vs yesterday</span>
                <span className={stat?.value > (stats?.yesterday?.[stat?.title] || 0) ? 'text-success' : 'text-error'}>
                  {stat?.value > (stats?.yesterday?.[stat?.title] || 0) ? '+' : ''}
                  {stat?.value - (stats?.yesterday?.[stat?.title] || 0)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${stat?.color?.replace('text-', 'bg-')}`}
                  style={{ 
                    width: `${Math.min(100, (stat?.value / Math.max(stat?.value, stats?.yesterday?.[stat?.title] || 1)) * 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerificationStats;