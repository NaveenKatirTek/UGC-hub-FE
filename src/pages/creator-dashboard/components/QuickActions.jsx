import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ stats }) => {
  const actions = [
    {
      title: 'Browse Campaigns',
      description: 'Discover new opportunities',
      icon: 'Search',
      path: '/campaigns',
      color: 'bg-primary',
      count: stats?.availableCampaigns
    },
    {
      title: 'Check Messages',
      description: 'Brand communications',
      icon: 'MessageSquare',
      path: '/messages',
      color: 'bg-secondary',
      count: stats?.unreadMessages
    },
    {
      title: 'View Earnings',
      description: 'Track your income',
      icon: 'DollarSign',
      path: '/wallet',
      color: 'bg-success',
      count: `$${stats?.pendingEarnings}`
    },
    {
      title: 'Update Profile',
      description: 'Improve visibility',
      icon: 'User',
      path: '/settings/profile',
      color: 'bg-warning',
      count: stats?.profileCompletion < 100 ? 'Incomplete' : 'Complete'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Link
            key={index}
            to={action?.path}
            className="group block p-4 rounded-form border border-border hover:border-primary/20 hover:shadow-medium transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action?.title}
                  </h4>
                  {action?.count && (
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {action?.count}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
              
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" 
              />
            </div>
          </Link>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-primary">{stats?.activeBids}</p>
            <p className="text-xs text-muted-foreground">Active Bids</p>
          </div>
          <div>
            <p className="text-xl font-bold text-secondary">{stats?.completedCampaigns}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div>
            <p className="text-xl font-bold text-success">{stats?.successRate}%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;