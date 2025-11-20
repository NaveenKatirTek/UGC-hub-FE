import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AddOnsSection = ({ addOns, purchasedAddOns, onPurchaseAddOn }) => {
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePurchaseClick = (addOn) => {
    setSelectedAddOn(addOn);
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedAddOn && onPurchaseAddOn) {
      onPurchaseAddOn(selectedAddOn);
      setShowConfirmation(false);
      setSelectedAddOn(null);
    }
  };

  const handleCancelPurchase = () => {
    setShowConfirmation(false);
    setSelectedAddOn(null);
  };

  const isAddOnPurchased = (addOnId) => {
    return purchasedAddOns?.some(purchased => purchased?.id === addOnId);
  };

  const getAddOnIcon = (type) => {
    switch (type) {
      case 'verification': return 'BadgeCheck';
      case 'highlight': return 'Star';
      case 'analytics': return 'BarChart3';
      case 'priority': return 'Zap';
      default: return 'Plus';
    }
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Add-Ons & Upgrades</h2>
        <p className="text-muted-foreground">Enhance your experience with premium features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {addOns?.map((addOn) => {
          const isPurchased = isAddOnPurchased(addOn?.id);
          
          return (
            <div key={addOn?.id} className={`border rounded-lg p-4 transition-all duration-300 ${
              isPurchased ? 'border-success bg-success/5' : 'border-border hover:border-primary/50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isPurchased ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    <Icon name={getAddOnIcon(addOn?.type)} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{addOn?.name}</h3>
                    <p className="text-sm text-muted-foreground">{addOn?.category}</p>
                  </div>
                </div>
                {isPurchased && (
                  <div className="flex items-center text-success">
                    <Icon name="Check" size={16} className="mr-1" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-foreground mb-4">{addOn?.description}</p>
              <div className="space-y-2 mb-4">
                {addOn?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-foreground">{formatPrice(addOn?.price)}</span>
                  <span className="text-sm text-muted-foreground ml-1">/{addOn?.billing}</span>
                </div>
                <Button
                  variant={isPurchased ? "outline" : "default"}
                  disabled={isPurchased}
                  onClick={() => handlePurchaseClick(addOn)}
                  iconName={isPurchased ? "Check" : "Plus"}
                  iconPosition="left"
                >
                  {isPurchased ? 'Purchased' : 'Purchase'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Purchased Add-ons Summary */}
      {purchasedAddOns?.length > 0 && (
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Active Add-Ons</h3>
          <div className="space-y-3">
            {purchasedAddOns?.map((addOn) => (
              <div key={addOn?.id} className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success text-success-foreground rounded-lg flex items-center justify-center">
                    <Icon name={getAddOnIcon(addOn?.type)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{addOn?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Expires: {new Date(addOn.expiryDate)?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Purchase Confirmation Modal */}
      {showConfirmation && selectedAddOn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={getAddOnIcon(selectedAddOn?.type)} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Confirm Purchase</h3>
              <p className="text-muted-foreground">
                You're about to purchase <strong>{selectedAddOn?.name}</strong> for {formatPrice(selectedAddOn?.price)}/{selectedAddOn?.billing}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">What you'll get:</h4>
              <ul className="space-y-1">
                {selectedAddOn?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancelPurchase}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleConfirmPurchase}
                fullWidth
                iconName="CreditCard"
                iconPosition="left"
              >
                Purchase Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOnsSection;