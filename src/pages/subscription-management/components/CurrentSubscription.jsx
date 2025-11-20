import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CurrentSubscription = ({ subscription, onUpgrade, onDowngrade, onCancelSubscription }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'cancelled': return 'text-warning';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'cancelled': return 'AlertCircle';
      case 'expired': return 'XCircle';
      default: return 'Clock';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateUsagePercentage = (used, total) => {
    if (total === -1) return 0; // Unlimited
    return Math.min((used / total) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Current Subscription</h2>
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-primary">{subscription?.planName}</span>
            <div className={`flex items-center ${getStatusColor(subscription?.status)}`}>
              <Icon name={getStatusIcon(subscription?.status)} size={16} className="mr-1" />
              <span className="text-sm font-medium capitalize">{subscription?.status}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Monthly Cost</p>
          <p className="text-xl font-bold text-foreground">₹{subscription?.monthlyAmount?.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
            <p className="text-foreground font-medium">{formatDate(subscription?.nextBillingDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Subscription Started</p>
            <p className="text-foreground font-medium">{formatDate(subscription?.startDate)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
            <div className="flex items-center">
              <Icon name="CreditCard" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-foreground font-medium">{subscription?.paymentMethod}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Auto Renewal</p>
            <div className="flex items-center">
              <Icon 
                name={subscription?.autoRenewal ? "RotateCcw" : "Pause"} 
                size={16} 
                className={`mr-2 ${subscription?.autoRenewal ? 'text-success' : 'text-warning'}`} 
              />
              <span className="text-foreground font-medium">
                {subscription?.autoRenewal ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Usage Statistics</h3>
        <div className="space-y-4">
          {Object.entries(subscription?.usage)?.map(([key, data]) => {
            const percentage = calculateUsagePercentage(data?.used, data?.total);
            const isUnlimited = data?.total === -1;
            
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {key?.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {data?.used?.toLocaleString('en-IN')} / {isUnlimited ? 'Unlimited' : data?.total?.toLocaleString('en-IN')}
                  </span>
                </div>
                {!isUnlimited && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onUpgrade}
          iconName="ArrowUp"
          iconPosition="left"
          className="flex-1"
        >
          Upgrade Plan
        </Button>
        <Button
          variant="outline"
          onClick={onDowngrade}
          iconName="ArrowDown"
          iconPosition="left"
          className="flex-1"
        >
          Downgrade Plan
        </Button>
        <Button
          variant="destructive"
          onClick={onCancelSubscription}
          iconName="X"
          iconPosition="left"
          className="flex-1"
        >
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
};

export default CurrentSubscription;