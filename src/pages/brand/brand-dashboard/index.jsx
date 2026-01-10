import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import RoleAdaptiveNavbar from '../../../components/ui/RoleAdaptiveNavbar';
import BreadcrumbNavigation from '../../../components/ui/BreadcrumbNavigation';
import OverviewCard from './components/OverviewCard';
import CampaignCard from './components/CampaignCard';
import QuickInsightsChart from './components/QuickInsightsChart';
import NotificationPanel from './components/NotificationPanel';

const BrandDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user] = useState({
    role: 'brand',
    name: 'Sarah Mitchell',
    email: 'sarah@brandstudio.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
  });

  const [notifications] = useState([
    { id: 1, category: 'bids', type: 'new_application' },
    { id: 2, category: 'messages', type: 'new_message' },
    { id: 3, category: 'bids', type: 'application_update' }
  ]);

  // Mock data for overview cards
  const overviewData = [
    {
      title: 'Total Active Campaigns',
      value: '12',
      change: '+2.5%',
      changeType: 'increase',
      icon: 'Megaphone',
      color: 'primary'
    },
    {
      title: 'Total Creators Hired',
      value: '48',
      change: '+12.3%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Budget Spent',
      value: '$127K',
      change: '+8.7%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'Pending Approvals',
      value: '7',
      change: '-15.2%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'error'
    }
  ];

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: 'Summer Fashion Collection 2024',
      description: 'Promote our latest summer collection targeting young adults aged 18-35 with focus on sustainable fashion and lifestyle content.',
      status: 'Active',
      budgetUsed: 8500,
      totalBudget: 15000,
      endDate: '2024-12-15',
      applications: 23,
      reach: '125K',
      engagement: '4.2%',
      conversions: '312'
    },
    {
      id: 2,
      title: 'Tech Product Launch',
      description: 'Launch campaign for our new smart home device featuring unboxing videos, reviews, and lifestyle integration content.',
      status: 'Active',
      budgetUsed: 12000,
      totalBudget: 20000,
      endDate: '2024-11-30',
      applications: 18,
      reach: '89K',
      engagement: '6.8%',
      conversions: '156'
    },
    {
      id: 3,
      title: 'Holiday Gift Guide',
      description: 'Create engaging holiday content showcasing our product range as perfect gifts for different demographics and occasions.',
      status: 'Draft',
      budgetUsed: 0,
      totalBudget: 10000,
      endDate: '2024-12-24',
      applications: 0,
      reach: '0',
      engagement: '0%',
      conversions: '0'
    },
    {
      id: 4,
      title: 'Fitness Challenge Series',
      description: 'Monthly fitness challenge content featuring our athletic wear line with workout tutorials and progress tracking.',
      status: 'Paused',
      budgetUsed: 5500,
      totalBudget: 12000,
      endDate: '2025-01-31',
      applications: 31,
      reach: '67K',
      engagement: '5.1%',
      conversions: '89'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  const handleEditCampaign = (campaignId) => {
    navigate(`/campaigns/${campaignId}/edit`);
  };

  const handlePauseCampaign = (campaignId) => {
    console.log('Pause/Resume campaign:', campaignId);
    // Implementation for pause/resume functionality
  };

  const handleViewAnalytics = (campaignId) => {
    navigate(`/campaigns/${campaignId}/analytics`);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
    // Implementation for marking notification as read
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSwitchRole = () => {
    navigate('/creator-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleAdaptiveNavbar
        user={user}
        notifications={notifications}
        onNavigate={handleNavigation}
      />
      {/* Main Content */}
      <main className="pt-15">
        <div className="px-4 lg:px-6 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbNavigation />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Brand Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, {user?.name}! Here's your campaign overview.
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => navigate('/analytics')}
                >
                  View Analytics
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleCreateCampaign}
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewData?.map((data, index) => (
              <OverviewCard
                key={index}
                title={data?.title}
                value={data?.value}
                change={data?.change}
                changeType={data?.changeType}
                icon={data?.icon}
                color={data?.color}
                loading={loading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Campaigns */}
            <div className="xl:col-span-2 space-y-6">
              {/* Campaign Management Section */}
              <div className="bg-card border border-border rounded-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Megaphone" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Active Campaigns</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ArrowUpDown"
                      iconPosition="left"
                    >
                      Sort
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {[1, 2, 3, 4]?.map((i) => (
                      <div key={i} className="bg-muted rounded-card p-6 animate-pulse">
                        <div className="w-3/4 h-6 bg-muted-foreground/20 rounded mb-4"></div>
                        <div className="w-full h-4 bg-muted-foreground/20 rounded mb-2"></div>
                        <div className="w-2/3 h-4 bg-muted-foreground/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {campaigns?.map((campaign) => (
                      <CampaignCard
                        key={campaign?.id}
                        campaign={campaign}
                        onEdit={handleEditCampaign}
                        onPause={handlePauseCampaign}
                        onViewAnalytics={handleViewAnalytics}
                        onApply={() => {}}
                      />
                    ))}
                  </div>
                )}

                {!loading && campaigns?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Megaphone" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No campaigns yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first campaign to start collaborating with creators.
                    </p>
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={handleCreateCampaign}
                    >
                      Create Your First Campaign
                    </Button>
                  </div>
                )}
              </div>

              {/* Quick Insights Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickInsightsChart
                  type="spending"
                  title="Spending vs Results"
                  loading={loading}
                />
                <QuickInsightsChart
                  type="engagement"
                  title="Engagement by Platform"
                  loading={loading}
                />
              </div>
            </div>

            {/* Right Column - Notifications & Quick Actions */}
            <div className="space-y-6">
              {/* Notifications Panel */}
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onViewAll={handleViewAllNotifications}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Zap" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                </div>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Search"
                    iconPosition="left"
                    onClick={() => navigate('/creators/browse')}
                  >
                    Browse Creators
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => navigate('/bids')}
                  >
                    Review Applications
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => navigate('/messages')}
                  >
                    View Messages
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Settings"
                    iconPosition="left"
                    onClick={() => navigate('/settings')}
                  >
                    Account Settings
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Activity" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Campaign "Summer Fashion" went live</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">New creator application received</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Budget alert: 80% used</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandDashboard;