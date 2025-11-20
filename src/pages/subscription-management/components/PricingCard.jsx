import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ 
  plan, 
  isCurrentPlan = false, 
  isPopular = false, 
  onSelectPlan,
  userRole = 'brand'
}) => {
  const handleSelectPlan = () => {
    if (onSelectPlan && !isCurrentPlan) {
      onSelectPlan(plan);
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) return 'Current Plan';
    if (plan?.price === 0) return 'Get Started';
    return 'Upgrade Now';
  };

  const getButtonVariant = () => {
    if (isCurrentPlan) return 'outline';
    if (isPopular) return 'default';
    return 'outline';
  };

  return (
    <div className={`relative bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-elevated ${
      isPopular ? 'border-primary shadow-soft scale-105' : 'border-border'
    } ${isCurrentPlan ? 'ring-2 ring-primary ring-opacity-20' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Icon name="Check" size={14} className="mr-1" />
            Active
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{plan?.name}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-foreground">₹{plan?.price?.toLocaleString('en-IN')}</span>
          <span className="text-muted-foreground ml-1">/{plan?.billing}</span>
        </div>
        <p className="text-sm text-muted-foreground">{plan?.description}</p>
      </div>
      <div className="space-y-3 mb-6">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Icon 
              name={feature?.included ? "Check" : "X"} 
              size={16} 
              className={`mr-3 mt-0.5 flex-shrink-0 ${
                feature?.included ? 'text-success' : 'text-muted-foreground'
              }`} 
            />
            <span className={`text-sm ${
              feature?.included ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      <Button
        variant={getButtonVariant()}
        onClick={handleSelectPlan}
        disabled={isCurrentPlan}
        fullWidth
        className="mb-4"
      >
        {getButtonText()}
      </Button>
      {plan?.limits && (
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Usage Limits</h4>
          <div className="space-y-1">
            {Object.entries(plan?.limits)?.map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-foreground font-medium">
                  {value === -1 ? 'Unlimited' : value?.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;