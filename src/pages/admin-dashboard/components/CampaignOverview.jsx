import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignOverview = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const campaigns = {
    pending: [
      {
        id: 'CF-2024-091',
        title: 'Summer Collection 2024',
        brand: 'Fashion Forward',
        budget: '₹75,000',
        submissions: 24,
        deadline: '2024-10-05',
        priority: 'high'
      },
      {
        id: 'CF-2024-092',
        title: 'Tech Product Launch',
        brand: 'TechCorp Solutions',
        budget: '₹1,20,000',
        submissions: 18,
        deadline: '2024-10-08',
        priority: 'medium'
      },
      {
        id: 'CF-2024-093',
        title: 'Beauty Routine Challenge',
        brand: 'BeautyBrand Inc.',
        budget: '₹45,000',
        submissions: 32,
        deadline: '2024-10-03',
        priority: 'high'
      }
    ],
    active: [
      {
        id: 'CF-2024-087',
        title: 'Fitness Transformation',
        brand: 'HealthyLife Co.',
        budget: '₹90,000',
        progress: 65,
        endDate: '2024-10-15',
        creators: 8
      },
      {
        id: 'CF-2024-088',
        title: 'Food Recipe Series',
        brand: 'Culinary Delights',
        budget: '₹60,000',
        progress: 40,
        endDate: '2024-10-20',
        creators: 12
      },
      {
        id: 'CF-2024-089',
        title: 'Travel Destination Guide',
        brand: 'WanderLust Travel',
        budget: '₹1,50,000',
        progress: 80,
        endDate: '2024-10-12',
        creators: 15
      }
    ],
    completed: [
      {
        id: 'CF-2024-084',
        title: 'Back to School Campaign',
        brand: 'EduTech Solutions',
        budget: '₹85,000',
        completedDate: '2024-09-28',
        rating: 4.8,
        creators: 10
      },
      {
        id: 'CF-2024-085',
        title: 'Monsoon Fashion',
        brand: 'StyleHub',
        budget: '₹70,000',
        completedDate: '2024-09-25',
        rating: 4.6,
        creators: 14
      }
    ]
  };

  const tabs = [
    { id: 'pending', label: 'Pending Approval', count: campaigns?.pending?.length, icon: 'Clock' },
    { id: 'active', label: 'Active Campaigns', count: campaigns?.active?.length, icon: 'Play' },
    { id: 'completed', label: 'Completed', count: campaigns?.completed?.length, icon: 'CheckCircle' }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20'
    };
    return colors?.[priority] || colors?.medium;
  };

  const renderPendingCampaigns = () => (
    <div className="space-y-4">
      {campaigns?.pending?.map((campaign) => (
        <div key={campaign?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-foreground">{campaign?.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(campaign?.priority)}`}>
                {campaign?.priority}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">#{campaign?.id}</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="text-sm font-medium text-foreground">{campaign?.brand}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium text-foreground">{campaign?.budget}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Submissions</p>
              <p className="text-sm font-medium text-foreground">{campaign?.submissions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(campaign.deadline)?.toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="default" size="sm">
              <Icon name="Check" size={14} className="mr-2" />
              Approve
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Eye" size={14} className="mr-2" />
              Review
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="X" size={14} className="mr-2" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActiveCampaigns = () => (
    <div className="space-y-4">
      {campaigns?.active?.map((campaign) => (
        <div key={campaign?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">{campaign?.title}</h3>
            <span className="text-sm text-muted-foreground">#{campaign?.id}</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="text-sm font-medium text-foreground">{campaign?.brand}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium text-foreground">{campaign?.budget}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Creators</p>
              <p className="text-sm font-medium text-foreground">{campaign?.creators}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(campaign.endDate)?.toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="text-xs text-foreground">{campaign?.progress}%</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${campaign?.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Eye" size={14} className="mr-2" />
              Monitor
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MessageSquare" size={14} className="mr-2" />
              Messages
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedCampaigns = () => (
    <div className="space-y-4">
      {campaigns?.completed?.map((campaign) => (
        <div key={campaign?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">{campaign?.title}</h3>
            <span className="text-sm text-muted-foreground">#{campaign?.id}</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="text-sm font-medium text-foreground">{campaign?.brand}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium text-foreground">{campaign?.budget}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Creators</p>
              <p className="text-sm font-medium text-foreground">{campaign?.creators}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(campaign.completedDate)?.toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{campaign?.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="BarChart3" size={14} className="mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Download" size={14} className="mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pending':
        return renderPendingCampaigns();
      case 'active':
        return renderActiveCampaigns();
      case 'completed':
        return renderCompletedCampaigns();
      default:
        return renderPendingCampaigns();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Campaign Overview</h2>
        
        <div className="flex flex-wrap gap-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-foreground/10 text-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default CampaignOverview;