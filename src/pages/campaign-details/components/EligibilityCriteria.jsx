import React from 'react';
import Icon from '../../../components/AppIcon';

const EligibilityCriteria = ({ campaign, userEligible }) => {
  const checkEligibility = (criteria, userValue) => {
    if (criteria?.type === 'range') {
      return userValue >= criteria?.min && userValue <= criteria?.max;
    }
    if (criteria?.type === 'location') {
      return criteria?.allowed?.includes(userValue);
    }
    return true;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Eligibility Criteria</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          userEligible 
            ? 'bg-success/10 text-success' :'bg-error/10 text-error'
        }`}>
          {userEligible ? 'You Qualify' : 'Not Eligible'}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Follower Count</p>
              <p className="text-xs text-muted-foreground">Instagram followers required</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              {campaign?.eligibility?.followers?.min?.toLocaleString('en-IN')} - {campaign?.eligibility?.followers?.max?.toLocaleString('en-IN')}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Icon 
                name={checkEligibility(campaign?.eligibility?.followers, 45000) ? "Check" : "X"} 
                size={12} 
                className={checkEligibility(campaign?.eligibility?.followers, 45000) ? "text-success" : "text-error"} 
              />
              <span className="text-xs text-muted-foreground">Your: 45,000</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-xs text-muted-foreground">Geographic requirements</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-wrap gap-1 justify-end mb-1">
              {campaign?.eligibility?.location?.allowed?.map((location, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {location}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={campaign?.eligibility?.location?.allowed?.includes('Mumbai') ? "Check" : "X"} 
                size={12} 
                className={campaign?.eligibility?.location?.allowed?.includes('Mumbai') ? "text-success" : "text-error"} 
              />
              <span className="text-xs text-muted-foreground">Your: Mumbai</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Star" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Engagement Rate</p>
              <p className="text-xs text-muted-foreground">Minimum engagement required</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              ≥ {campaign?.eligibility?.engagement}%
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="Check" size={12} className="text-success" />
              <span className="text-xs text-muted-foreground">Your: 4.2%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Account Age</p>
              <p className="text-xs text-muted-foreground">Minimum account history</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              ≥ {campaign?.eligibility?.accountAge} months
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Icon name="Check" size={12} className="text-success" />
              <span className="text-xs text-muted-foreground">Your: 24 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCriteria;