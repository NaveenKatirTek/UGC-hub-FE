import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onViewDetails, onQuickAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-error text-error-foreground';
      case 'under_review': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{user?.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                {user?.status?.replace('_', ' ')?.toUpperCase()}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {user?.accountType}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-1 ${getPriorityColor(user?.priority)}`}>
            <Icon name="AlertCircle" size={14} />
            <span className="text-sm font-medium capitalize">{user?.priority}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Submitted: {formatDate(user?.submissionDate)}
          </p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Email:</span>
          <span className="text-foreground">{user?.email}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Phone:</span>
          <span className="text-foreground">{user?.phone}</span>
        </div>
        {user?.accountType === 'creator' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Followers:</span>
            <span className="text-foreground">{user?.followersCount?.toLocaleString('en-IN')}</span>
          </div>
        )}
        {user?.accountType === 'brand' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Company:</span>
            <span className="text-foreground">{user?.companyName}</span>
          </div>
        )}
      </div>
      {user?.fraudAlerts && user?.fraudAlerts?.length > 0 && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Fraud Alerts</span>
          </div>
          <ul className="text-xs text-error space-y-1">
            {user?.fraudAlerts?.map((alert, index) => (
              <li key={index}>• {alert}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {user?.documentsCount} documents
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(user)}
          >
            View Details
          </Button>
          {user?.status === 'pending' && (
            <div className="flex items-center space-x-1">
              <Button
                variant="success"
                size="sm"
                onClick={() => onQuickAction(user?.id, 'approve')}
              >
                <Icon name="Check" size={14} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onQuickAction(user?.id, 'reject')}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;