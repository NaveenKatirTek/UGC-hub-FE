import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampaignHeader = ({ campaign, onSaveCampaign, isSaved }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={campaign?.brand?.logo}
            alt={campaign?.brand?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {campaign?.title}
            </h1>
            <p className="text-muted-foreground">
              by <span className="font-medium text-foreground">{campaign?.brand?.name}</span>
            </p>
          </div>
        </div>
        <Button
          variant={isSaved ? "default" : "outline"}
          onClick={onSaveCampaign}
          iconName={isSaved ? "Heart" : "Heart"}
          iconPosition="left"
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{campaign?.niche}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {campaign?.timeline?.startDate} - {campaign?.timeline?.endDate}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{campaign?.location}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-xl font-bold text-foreground">₹{campaign?.budget?.total?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Per Creator</p>
            <p className="text-lg font-semibold text-primary">₹{campaign?.budget?.perCreator?.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            campaign?.status === 'active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {campaign?.status === 'active' ? 'Active' : 'Pending'}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {campaign?.urgency} Priority
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;