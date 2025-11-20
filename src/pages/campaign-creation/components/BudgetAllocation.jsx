import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const BudgetAllocation = ({ formData, updateFormData, errors }) => {
  const creatorTiers = [
    { 
      id: 'nano', 
      label: 'Nano (10K-50K)', 
      suggestedRate: '₹2,000-5,000',
      description: 'High engagement, niche audiences'
    },
    { 
      id: 'micro', 
      label: 'Micro (50K-100K)', 
      suggestedRate: '₹5,000-15,000',
      description: 'Balanced reach and engagement'
    },
    { 
      id: 'mid', 
      label: 'Mid-tier (100K-250K)', 
      suggestedRate: '₹15,000-35,000',
      description: 'Broader reach, established creators'
    },
    { 
      id: 'macro', 
      label: 'Macro (250K-500K)', 
      suggestedRate: '₹35,000-75,000',
      description: 'Wide reach, professional content'
    }
  ];

  const budgetTypes = [
    { value: 'fixed', label: 'Fixed Budget per Creator' },
    { value: 'range', label: 'Budget Range' },
    { value: 'negotiable', label: 'Negotiable' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('budget', { ...formData?.budget, [field]: value });
  };

  const handleTierBudgetChange = (tierId, field, value) => {
    const updatedTiers = { ...formData?.budget?.tierBudgets };
    if (!updatedTiers?.[tierId]) {
      updatedTiers[tierId] = { enabled: false, budget: '', slots: 1 };
    }
    updatedTiers[tierId][field] = value;
    updateFormData('budget', { ...formData?.budget, tierBudgets: updatedTiers });
  };

  const toggleTier = (tierId) => {
    const updatedTiers = { ...formData?.budget?.tierBudgets };
    if (!updatedTiers?.[tierId]) {
      updatedTiers[tierId] = { enabled: true, budget: '', slots: 1 };
    } else {
      updatedTiers[tierId].enabled = !updatedTiers?.[tierId]?.enabled;
    }
    updateFormData('budget', { ...formData?.budget, tierBudgets: updatedTiers });
  };

  const calculateTotalBudget = () => {
    let total = 0;
    Object.entries(formData?.budget?.tierBudgets || {})?.forEach(([tierId, tierData]) => {
      if (tierData?.enabled && tierData?.budget && tierData?.slots) {
        total += parseFloat(tierData?.budget) * parseInt(tierData?.slots);
      }
    });
    return total;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="DollarSign" size={18} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Budget Allocation</h3>
          <p className="text-sm text-muted-foreground">Set your campaign budget and creator compensation</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Total Campaign Budget"
            type="number"
            placeholder="100000"
            value={formData?.budget?.totalBudget}
            onChange={(e) => handleInputChange('totalBudget', e?.target?.value)}
            error={errors?.totalBudget}
            required
            description="Total amount you're willing to spend (₹)"
          />

          <Select
            label="Budget Type"
            placeholder="Select budget type"
            options={budgetTypes}
            value={formData?.budget?.budgetType}
            onChange={(value) => handleInputChange('budgetType', value)}
            error={errors?.budgetType}
            required
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Creator Tier Allocation</h4>
          <p className="text-xs text-muted-foreground">
            Select creator tiers and set budget per creator and number of slots
          </p>

          {creatorTiers?.map((tier) => {
            const tierData = formData?.budget?.tierBudgets?.[tier?.id] || { enabled: false, budget: '', slots: 1 };
            
            return (
              <div key={tier?.id} className={`border rounded-lg p-4 transition-all ${
                tierData?.enabled ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={tierData?.enabled}
                      onChange={() => toggleTier(tier?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <div>
                      <h5 className="text-sm font-medium text-foreground">{tier?.label}</h5>
                      <p className="text-xs text-muted-foreground">{tier?.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-success">{tier?.suggestedRate}</p>
                    <p className="text-xs text-muted-foreground">Suggested rate</p>
                  </div>
                </div>
                {tierData?.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-border">
                    <Input
                      label="Budget per Creator (₹)"
                      type="number"
                      placeholder="10000"
                      value={tierData?.budget}
                      onChange={(e) => handleTierBudgetChange(tier?.id, 'budget', e?.target?.value)}
                      description="Amount per creator"
                    />
                    <Input
                      label="Number of Slots"
                      type="number"
                      placeholder="5"
                      min="1"
                      value={tierData?.slots}
                      onChange={(e) => handleTierBudgetChange(tier?.id, 'slots', e?.target?.value)}
                      description="How many creators needed"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Calculated Total</h4>
              <p className="text-xs text-muted-foreground">Based on tier selections</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-primary">₹{calculateTotalBudget()?.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground">
                {formData?.budget?.totalBudget && calculateTotalBudget() > parseFloat(formData?.budget?.totalBudget) 
                  ? 'Exceeds total budget' :'Within budget'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Budget Guidelines</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Rates vary based on engagement rates and content quality</li>
                <li>• Consider additional costs for product samples and shipping</li>
                <li>• Higher budgets attract more experienced creators</li>
                <li>• Platform fees (5-10%) will be added to final amount</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocation;