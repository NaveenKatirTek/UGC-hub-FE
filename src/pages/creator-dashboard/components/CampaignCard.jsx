import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampaignCard = ({ campaign, onApply }) => {
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(campaign?.deadline);
  const isUrgent = daysRemaining <= 3;
  const isExpired = daysRemaining < 0;

  const getBudgetColor = (budget) => {
    if (budget >= 5000) return 'text-success';
    if (budget >= 2000) return 'text-primary';
    return 'text-warning';
  };

  return (
    <div className="bg-card border border-border rounded-card p-6 hover:shadow-medium transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <Image
              src={campaign?.brandLogo}
              alt={campaign?.brandLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {campaign?.title}
            </h3>
            <p className="text-sm text-muted-foreground">{campaign?.brandName}</p>
          </div>
        </div>
        
        {campaign?.featured && (
          <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      {/* Campaign Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Payout Range</span>
          <span className={`font-semibold ${getBudgetColor(campaign?.payoutMax)}`}>
            ${campaign?.payoutMin?.toLocaleString()} - ${campaign?.payoutMax?.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Category</span>
          <span className="text-sm font-medium text-foreground">{campaign?.category}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Followers Required</span>
          <span className="text-sm font-medium text-foreground">
            {campaign?.minFollowers?.toLocaleString()}+
          </span>
        </div>
      </div>
      {/* Requirements */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Requirements:</p>
        <p className="text-sm text-foreground line-clamp-2">{campaign?.requirements}</p>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {campaign?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className={`${isUrgent ? 'text-warning' : isExpired ? 'text-error' : 'text-muted-foreground'}`}>
              {isExpired ? 'Expired' : `${daysRemaining} days left`}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">{campaign?.applicants} applied</span>
          </div>
        </div>
        
        <Button
          variant={isExpired ? "outline" : "default"}
          size="sm"
          disabled={isExpired}
          onClick={() => onApply(campaign?.id)}
          iconName="Send"
          iconPosition="right"
        >
          {isExpired ? 'Expired' : 'Apply Now'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;