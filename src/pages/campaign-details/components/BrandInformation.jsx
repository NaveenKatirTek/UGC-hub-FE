import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BrandInformation = ({ brand }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Building" size={20} className="mr-2 text-primary" />
        About {brand?.name}
      </h2>
      <div className="flex items-start space-x-4 mb-6">
        <Image
          src={brand?.logo}
          alt={brand?.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{brand?.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{brand?.industry}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {brand?.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Calendar" size={20} className="text-primary mx-auto mb-1" />
          <p className="text-sm font-semibold text-foreground">{brand?.founded}</p>
          <p className="text-xs text-muted-foreground">Founded</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="MapPin" size={20} className="text-primary mx-auto mb-1" />
          <p className="text-sm font-semibold text-foreground">{brand?.location}</p>
          <p className="text-xs text-muted-foreground">Location</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Target" size={20} className="text-primary mx-auto mb-1" />
          <p className="text-sm font-semibold text-foreground">{brand?.campaignsCount}</p>
          <p className="text-xs text-muted-foreground">Campaigns</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Star" size={20} className="text-primary mx-auto mb-1" />
          <p className="text-sm font-semibold text-foreground">{brand?.rating}</p>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Previous Campaigns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brand?.previousCampaigns?.map((campaign, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{campaign?.title}</h4>
                <span className="text-xs text-success font-medium">Completed</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{campaign?.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{campaign?.creators} creators</span>
                <span className="text-muted-foreground">{campaign?.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Creator Testimonials</h3>
        <div className="space-y-4">
          {brand?.testimonials?.map((testimonial, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.creator}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">{testimonial?.creator}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < testimonial?.rating ? "text-warning fill-current" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">@{testimonial?.handle}</p>
                  <p className="text-sm text-muted-foreground">{testimonial?.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">Verified Brand</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Avg. response: 2 hours</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
            <a 
              href={brand?.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInformation;