import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CampaignPreview = ({ formData, onEdit, onSubmit, isSubmitting }) => {
  const getCompletionPercentage = () => {
    const sections = ['basics', 'eligibility', 'budget', 'timeline', 'deliverables'];
    let completed = 0;
    
    sections?.forEach(section => {
      const sectionData = formData?.[section];
      if (sectionData && Object.keys(sectionData)?.length > 0) {
        completed++;
      }
    });
    
    return Math.round((completed / sections?.length) * 100);
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getEnabledContentTypes = () => {
    const contentTypes = formData?.deliverables?.contentTypes || {};
    return Object.entries(contentTypes)?.filter(([_, data]) => data?.enabled)?.map(([type, data]) => ({ type, ...data }));
  };

  const getTotalCreatorSlots = () => {
    const tierBudgets = formData?.budget?.tierBudgets || {};
    return Object.values(tierBudgets)?.filter(tier => tier?.enabled)?.reduce((total, tier) => total + parseInt(tier?.slots || 0), 0);
  };

  const completionPercentage = getCompletionPercentage();
  const isReadyToSubmit = completionPercentage >= 80;

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Eye" size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Preview</h3>
          <p className="text-sm text-muted-foreground">How creators will see your campaign</p>
        </div>
      </div>
      {/* Completion Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Completion</span>
          <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        {!isReadyToSubmit && (
          <p className="text-xs text-warning mt-1">Complete at least 80% to submit</p>
        )}
      </div>
      {/* Campaign Summary */}
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="border-b border-border pb-4">
          <h4 className="font-medium text-foreground mb-2">
            {formData?.basics?.title || 'Campaign Title'}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {formData?.basics?.brandName || 'Brand Name'} • {formData?.basics?.niche || 'Niche'}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {formData?.basics?.description || 'Campaign description will appear here...'}
          </p>
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total Budget</p>
            <p className="text-sm font-medium text-foreground">
              {formData?.budget?.totalBudget 
                ? formatBudget(formData?.budget?.totalBudget)
                : 'Not set'
              }
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-medium text-foreground">
              {formData?.timeline?.startDate && formData?.timeline?.endDate
                ? `${formatDate(formData?.timeline?.startDate)} - ${formatDate(formData?.timeline?.endDate)}`
                : 'Not set'
              }
            </p>
          </div>
        </div>

        {/* Eligibility */}
        <div className="py-4 border-b border-border">
          <p className="text-xs text-muted-foreground mb-2">Eligibility</p>
          <div className="space-y-1">
            {formData?.eligibility?.followerRange && (
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={12} className="text-muted-foreground" />
                <span className="text-xs text-foreground">
                  {formData?.eligibility?.followerRange?.replace('-', ' - ')?.replace('k', 'K')} followers
                </span>
              </div>
            )}
            {formData?.eligibility?.platforms?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={12} className="text-muted-foreground" />
                <span className="text-xs text-foreground">
                  {formData?.eligibility?.platforms?.join(', ')}
                </span>
              </div>
            )}
            {formData?.eligibility?.locations?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={12} className="text-muted-foreground" />
                <span className="text-xs text-foreground">
                  {formData?.eligibility?.locations?.slice(0, 2)?.join(', ')}
                  {formData?.eligibility?.locations?.length > 2 && ` +${formData?.eligibility?.locations?.length - 2} more`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Deliverables */}
        <div className="py-4 border-b border-border">
          <p className="text-xs text-muted-foreground mb-2">Required Content</p>
          <div className="space-y-1">
            {getEnabledContentTypes()?.map(({ type, quantity }) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-xs text-foreground capitalize">
                  {type?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
                <span className="text-xs text-muted-foreground">{quantity}x</span>
              </div>
            ))}
            {getEnabledContentTypes()?.length === 0 && (
              <span className="text-xs text-muted-foreground">No content types selected</span>
            )}
          </div>
        </div>

        {/* Creator Slots */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Creator Slots</p>
            <p className="text-sm font-medium text-foreground">
              {getTotalCreatorSlots() || 0} positions
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="default"
          fullWidth
          onClick={onSubmit}
          disabled={!isReadyToSubmit || isSubmitting}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
        >
          {isSubmitting ? 'Submitting...' : 'Submit for Review'}
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => onEdit('basics')}
          iconName="Edit"
          iconPosition="left"
        >
          Edit Campaign
        </Button>

        <Button
          variant="ghost"
          fullWidth
          iconName="Save"
          iconPosition="left"
        >
          Save as Draft
        </Button>
      </div>
      {/* Status Indicator */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon 
            name={isReadyToSubmit ? "CheckCircle" : "Clock"} 
            size={14} 
            className={isReadyToSubmit ? "text-success" : "text-warning"} 
          />
          <span className="text-xs text-muted-foreground">
            {isReadyToSubmit 
              ? 'Ready to submit for admin review'
              : 'Complete all sections to submit'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;