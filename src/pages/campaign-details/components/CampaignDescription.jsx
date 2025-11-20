import React from 'react';
import Icon from '../../../components/AppIcon';

const CampaignDescription = ({ campaign }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Campaign Description</h2>
      <div className="prose prose-sm max-w-none mb-6">
        <p className="text-muted-foreground leading-relaxed">
          {campaign?.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Target" size={16} className="mr-2 text-primary" />
            Campaign Goals
          </h3>
          <ul className="space-y-2">
            {campaign?.goals?.map((goal, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Package" size={16} className="mr-2 text-primary" />
            Deliverables Required
          </h3>
          <div className="space-y-2">
            {campaign?.deliverables?.map((deliverable, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={deliverable?.type === 'image' ? 'Image' : 
                          deliverable?.type === 'video' ? 'Video' : 
                          deliverable?.type === 'reel' ? 'Film' : 'FileText'} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                  <span className="text-sm font-medium text-foreground capitalize">
                    {deliverable?.type}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {deliverable?.quantity} {deliverable?.quantity > 1 ? 'pieces' : 'piece'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="MessageSquare" size={16} className="mr-2 text-primary" />
          Key Messages & Guidelines
        </h3>
        <div className="bg-muted rounded-lg p-4">
          <ul className="space-y-2">
            {campaign?.guidelines?.map((guideline, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CampaignDescription;