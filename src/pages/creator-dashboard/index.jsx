import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleAdaptiveNavbar from '../../components/ui/RoleAdaptiveNavbar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProfileSummaryCard from './components/ProfileSummaryCard';
import CampaignCard from './components/CampaignCard';
import BidStatusCard from './components/BidStatusCard';
import EarningsChart from './components/EarningsChart';
import CampaignFilters from './components/CampaignFilters';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  // Mock user data
  const currentUser = {
    role: 'creator',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12bef0673-1763294332014.png",
    avatarAlt: 'Professional headshot of young woman with brown hair and warm smile'
  };

  // Mock profile data
  const profileData = {
    name: 'Sarah Johnson',
    niche: 'Fashion & Lifestyle',
    followerCount: 125000,
    location: 'Los Angeles, CA',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12bef0673-1763294332014.png",
    avatarAlt: 'Professional headshot of young woman with brown hair and warm smile',
    verificationStatus: 'verified',
    totalEarnings: 45750,
    activeCampaigns: 3,
    completedCampaigns: 28,
    completedFields: 8,
    totalFields: 10
  };

  // Mock campaigns data
  const availableCampaigns = [
  {
    id: 1,
    title: 'Summer Fashion Collection Launch',
    brandName: 'StyleCo',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19f28f299-1763451115248.png",
    brandLogoAlt: 'Modern fashion brand logo with geometric design',
    category: 'Fashion',
    payoutMin: 2500,
    payoutMax: 4000,
    minFollowers: 50000,
    requirements: `Create 3 Instagram posts and 5 stories showcasing our new summer collection. Must include specific hashtags and brand mentions. High-quality photography required with natural lighting.`,
    tags: ['Fashion', 'Summer', 'Instagram', 'Stories'],
    deadline: '2025-12-15',
    applicants: 24,
    featured: true
  },
  {
    id: 2,
    title: 'Skincare Routine Review',
    brandName: 'GlowBeauty',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_13a01bd70-1763451118103.png",
    brandLogoAlt: 'Minimalist beauty brand logo with clean typography',
    category: 'Beauty',
    payoutMin: 1500,
    payoutMax: 2500,
    minFollowers: 25000,
    requirements: `30-day skincare routine documentation with before/after photos. Create detailed review video and Instagram carousel post. Must be authentic and honest review.`,
    tags: ['Beauty', 'Skincare', 'Review', 'Video'],
    deadline: '2025-12-20',
    applicants: 18,
    featured: false
  },
  {
    id: 3,
    title: 'Fitness Challenge Partnership',
    brandName: 'FitLife',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_176f9303d-1763451117362.png",
    brandLogoAlt: 'Dynamic fitness brand logo with bold athletic design',
    category: 'Fitness',
    payoutMin: 3000,
    payoutMax: 5000,
    minFollowers: 75000,
    requirements: `Lead a 7-day fitness challenge with daily workout videos. Create motivational content and engage with participants. Promote our fitness app and equipment.`,
    tags: ['Fitness', 'Challenge', 'Video', 'App'],
    deadline: '2025-12-10',
    applicants: 31,
    featured: true
  },
  {
    id: 4,
    title: 'Travel Destination Feature',
    brandName: 'WanderLux',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_16e07adaa-1763451115635.png",
    brandLogoAlt: 'Elegant travel brand logo with wanderlust theme',
    category: 'Travel',
    payoutMin: 4000,
    payoutMax: 7000,
    minFollowers: 100000,
    requirements: `3-day luxury resort experience documentation. Create travel guide content, Instagram reels, and blog post. Professional photography and videography expected.`,
    tags: ['Travel', 'Luxury', 'Resort', 'Blog'],
    deadline: '2025-12-25',
    applicants: 12,
    featured: false
  }];


  // Mock bids data
  const myBids = [
  {
    id: 1,
    campaignTitle: 'Holiday Gift Guide',
    brandName: 'GiftHub',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e2e6c772-1763451118012.png",
    brandLogoAlt: 'Festive gift brand logo with holiday theme',
    status: 'accepted',
    bidAmount: 3500,
    appliedDate: '2025-11-10',
    timeline: {
      startDate: '2025-11-20',
      deadline: '2025-12-05'
    }
  },
  {
    id: 2,
    campaignTitle: 'Tech Product Launch',
    brandName: 'TechNova',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_124546e84-1763451116897.png",
    brandLogoAlt: 'Modern tech company logo with futuristic design',
    status: 'pending',
    bidAmount: 2800,
    appliedDate: '2025-11-15',
    timeline: {
      deadline: '2025-12-30'
    }
  },
  {
    id: 3,
    campaignTitle: 'Wellness Brand Ambassador',
    brandName: 'ZenLife',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9fe6dbb-1763451119021.png",
    brandLogoAlt: 'Serene wellness brand logo with natural elements',
    status: 'rejected',
    bidAmount: 4200,
    appliedDate: '2025-11-08',
    rejectionReason: 'Brand decided to go with creators in different geographic location for this campaign.'
  },
  {
    id: 4,
    campaignTitle: 'Food Recipe Series',
    brandName: 'CookMaster',
    brandLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1198fc0a5-1763451115456.png",
    brandLogoAlt: 'Culinary brand logo with chef hat and utensils',
    status: 'in-progress',
    bidAmount: 1800,
    appliedDate: '2025-10-25',
    timeline: {
      startDate: '2025-11-01',
      deadline: '2025-11-30'
    }
  }];


  // Mock earnings data
  const earningsData = [
  { month: 'Jun', earnings: 3200, campaigns: 4 },
  { month: 'Jul', earnings: 4100, campaigns: 5 },
  { month: 'Aug', earnings: 3800, campaigns: 3 },
  { month: 'Sep', earnings: 5200, campaigns: 6 },
  { month: 'Oct', earnings: 4900, campaigns: 5 },
  { month: 'Nov', earnings: 6100, campaigns: 7 }];


  // Mock quick actions stats
  const quickActionStats = {
    availableCampaigns: 24,
    unreadMessages: 3,
    pendingEarnings: 2400,
    profileCompletion: 80,
    activeBids: 5,
    completedCampaigns: 28,
    successRate: 73
  };

  // Mock notifications
  const notifications = [
  { category: 'messages', count: 3 },
  { category: 'bids', count: 2 }];


  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleApplyCampaign = (campaignId) => {
    console.log('Applying to campaign:', campaignId);
    // Handle campaign application logic
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to campaigns
  };

  const filteredCampaigns = availableCampaigns?.filter((campaign) => {
    if (filters?.category && campaign?.category?.toLowerCase() !== filters?.category) {
      return false;
    }
    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      return campaign?.title?.toLowerCase()?.includes(query) ||
      campaign?.brandName?.toLowerCase()?.includes(query) ||
      campaign?.requirements?.toLowerCase()?.includes(query);
    }
    return true;
  });

  const tabs = [
  { id: 'campaigns', label: 'Available Campaigns', icon: 'Search', count: filteredCampaigns?.length },
  { id: 'bids', label: 'My Bids', icon: 'FileText', count: myBids?.length },
  { id: 'earnings', label: 'Earnings', icon: 'DollarSign' },
  { id: 'insights', label: 'Insights', icon: 'BarChart3' }];


  useEffect(() => {
    // Set page title
    document.title = 'Creator Dashboard - InfluencerConnect';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleAdaptiveNavbar
        user={currentUser}
        notifications={notifications}
        onNavigate={handleNavigation} />

      <div className="pt-15">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <BreadcrumbNavigation className="mb-6" />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Creator Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {profileData?.name}! Manage your campaigns and track your success.
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                onClick={() => navigate('/settings/profile')}>

                Profile Settings
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/campaigns')}>

                Browse Campaigns
              </Button>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="mb-8">
            <ProfileSummaryCard profile={profileData} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Navigation Tabs */}
              <div className="bg-card border border-border rounded-card p-1">
                <div className="flex flex-wrap gap-1">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-form text-sm font-medium transition-all ${
                    activeTab === tab?.id ?
                    'bg-primary text-primary-foreground shadow-sm' :
                    'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                    }>

                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                      {tab?.count !== undefined &&
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab?.id ?
                    'bg-primary-foreground/20 text-primary-foreground' :
                    'bg-muted text-muted-foreground'}`
                    }>
                          {tab?.count}
                        </span>
                    }
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'campaigns' &&
              <div className="space-y-6">
                  <CampaignFilters
                  onFilterChange={handleFilterChange}
                  activeFilters={filters} />

                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredCampaigns?.length} of {availableCampaigns?.length} campaigns
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-form transition-colors ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                      }>

                        <Icon name="Grid3X3" size={16} />
                      </button>
                      <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-form transition-colors ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                      }>

                        <Icon name="List" size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Campaigns Grid */}
                  <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`
                }>
                    {filteredCampaigns?.map((campaign) =>
                  <CampaignCard
                    key={campaign?.id}
                    campaign={campaign}
                    onApply={handleApplyCampaign} />

                  )}
                  </div>

                  {filteredCampaigns?.length === 0 &&
                <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No campaigns found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or check back later for new opportunities.
                      </p>
                      <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                    iconName="RefreshCw"
                    iconPosition="left">

                        Clear Filters
                      </Button>
                    </div>
                }
                </div>
              }

              {activeTab === 'bids' &&
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">My Bids</h2>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Info" size={14} />
                      <span>Track your campaign applications</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {myBids?.map((bid) =>
                  <BidStatusCard key={bid?.id} bid={bid} />
                  )}
                  </div>
                </div>
              }

              {activeTab === 'earnings' &&
              <div className="space-y-6">
                  <EarningsChart earningsData={earningsData} />
                </div>
              }

              {activeTab === 'insights' &&
              <div className="space-y-6">
                  <EarningsChart earningsData={earningsData} chartType="bar" />
                  
                  {/* Additional Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-card p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Application Success Rate</span>
                          <span className="font-semibold text-success">73%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Average Campaign Value</span>
                          <span className="font-semibold text-foreground">$3,200</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Repeat Collaborations</span>
                          <span className="font-semibold text-primary">45%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-card p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Growth Trends</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Follower Growth (30d)</span>
                          <span className="font-semibold text-success">+2.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Engagement Rate</span>
                          <span className="font-semibold text-foreground">4.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Brand Mentions</span>
                          <span className="font-semibold text-secondary">156</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <QuickActions stats={quickActionStats} />
              
              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">Bid accepted for Holiday Gift Guide</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">New message from StyleCo</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">Payment received: $3,500</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CreatorDashboard;