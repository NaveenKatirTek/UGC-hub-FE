import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampaignContext = ({ campaign, onViewCampaign, onViewContract }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-muted text-muted-foreground border-border';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'draft': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-muted/30 border-b border-border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Campaign Image */}
          <div className="flex-shrink-0">
            <Image
              src={campaign?.image}
              alt={campaign?.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Campaign Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {campaign?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  by {campaign?.brand?.name}
                </p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign?.status)}`}>
                {campaign?.status?.charAt(0)?.toUpperCase() + campaign?.status?.slice(1)}
              </span>
            </div>

            {/* Campaign Meta */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <p className="font-medium text-foreground">
                  {formatCurrency(campaign?.budget)}
                </p>
              </div>
              
              <div>
                <span className="text-muted-foreground">Deadline:</span>
                <p className="font-medium text-foreground">
                  {formatDate(campaign?.deadline)}
                </p>
              </div>
              
              <div>
                <span className="text-muted-foreground">Deliverables:</span>
                <p className="font-medium text-foreground">
                  {campaign?.deliverables?.join(', ')}
                </p>
              </div>
              
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium text-foreground">
                  {campaign?.category}
                </p>
              </div>
            </div>

            {/* Progress Bar (for active campaigns) */}
            {campaign?.status === 'active' && campaign?.progress !== undefined && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{campaign?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${campaign?.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCampaign}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View Campaign
          </Button>
          
          {campaign?.status === 'active' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewContract}
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
            >
              Contract
            </Button>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      {campaign?.status === 'active' && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-muted-foreground">
                  {campaign?.completedDeliverables || 0} of {campaign?.totalDeliverables || campaign?.deliverables?.length} completed
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Upload" iconSize={14}>
                Upload Content
              </Button>
              <Button variant="ghost" size="sm" iconName="MessageSquare" iconSize={14}>
                Quick Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignContext;