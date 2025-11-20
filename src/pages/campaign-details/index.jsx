import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CampaignHeader from './components/CampaignHeader';
import CampaignDescription from './components/CampaignDescription';
import EligibilityCriteria from './components/EligibilityCriteria';
import CompetitionInsights from './components/CompetitionInsights';
import BiddingForm from './components/BiddingForm';
import BrandInformation from './components/BrandInformation';

const CampaignDetails = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBidSuccess, setShowBidSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock campaign data
  const campaignData = {
    id: "CAMP-2024-001",
    title: "Summer Fashion Collection Launch",
    brand: {
      name: "StyleCraft India",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
      industry: "Fashion & Lifestyle",
      description: `StyleCraft India is a premium fashion brand specializing in contemporary Indian wear with a modern twist. We focus on sustainable fashion practices and empowering local artisans while creating trendy, comfortable clothing for the modern Indian woman.`,
      founded: "2018",
      location: "Mumbai, India",
      campaignsCount: 24,
      rating: 4.8,
      website: "https://stylecraft.in",
      previousCampaigns: [
        {
          title: "Festive Collection 2023",
          description: "Traditional wear campaign for Diwali season",
          creators: 15,
          date: "Oct 2023"
        },
        {
          title: "Monsoon Essentials",
          description: "Comfortable wear for rainy season",
          creators: 12,
          date: "Jul 2023"
        }
      ],
      testimonials: [
        {
          creator: "Priya Sharma",
          handle: "priya_fashion",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          rating: 5,
          review: "Amazing brand to work with! They provided clear guidelines and were very professional throughout the campaign. Payment was prompt and the products were of excellent quality."
        },
        {
          creator: "Anita Desai",
          handle: "anita_lifestyle",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg",
          rating: 5,
          review: "StyleCraft truly values their creator partnerships. The team was supportive and gave creative freedom while maintaining brand consistency. Highly recommend!"
        }
      ]
    },
    description: `We're launching our exciting Summer Fashion Collection and looking for passionate micro-influencers to showcase our latest designs. This collection features lightweight, breathable fabrics perfect for the Indian summer, with vibrant colors and contemporary cuts that blend traditional aesthetics with modern comfort.\n\nWe want creators who can authentically represent our brand values of sustainability, comfort, and style. You'll be featuring our new summer kurtas, palazzo sets, and fusion wear that's perfect for both casual and semi-formal occasions.`,
    niche: "Fashion & Lifestyle",
    location: "Pan India",
    status: "active",
    urgency: "High",
    timeline: {
      startDate: "15/10/2024",
      endDate: "30/11/2024"
    },
    budget: {
      total: 500000,
      perCreator: 15000
    },
    bidDeadline: "10/10/2024, 11:59 PM",
    goals: [
      "Increase brand awareness among 18-35 age group",
      "Drive traffic to our e-commerce website",
      "Generate authentic user-generated content",
      "Boost summer collection sales by 25%",
      "Build long-term creator partnerships"
    ],
    deliverables: [
      { type: "image", quantity: 3 },
      { type: "reel", quantity: 2 },
      { type: "story", quantity: 5 }
    ],
    guidelines: [
      "Showcase the comfort and breathability of the fabrics",
      "Highlight the versatility of the pieces for different occasions",
      "Use natural lighting for photography",
      "Include brand hashtags: #StyleCraftSummer #ComfortMeetsStyle",
      "Tag @stylecraft_india in all posts",
      "Maintain authentic and genuine tone in captions"
    ],
    eligibility: {
      followers: { min: 10000, max: 100000, type: "range" },
      location: { allowed: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad"], type: "location" },
      engagement: 3.0,
      accountAge: 6
    }
  };

  const competitionInsights = {
    totalBids: 42,
    averageBid: 12500,
    highestBid: 18000,
    lowestBid: 8000,
    competitionLevel: "High",
    recommendedBid: 13500
  };

  const userEligible = true;

  useEffect(() => {
    document.title = "Campaign Details - UGC Hub";
  }, []);

  const handleSaveCampaign = () => {
    setIsSaved(!isSaved);
  };

  const handleSubmitBid = async (bidData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowBidSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowBidSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleBackToCampaigns = () => {
    navigate('/campaign-creation');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'brand', label: 'Brand Info', icon: 'Building' },
    { id: 'competition', label: 'Competition', icon: 'TrendingUp' },
    { id: 'bid', label: 'Submit Bid', icon: 'Send' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} userRole="creator" />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        userRole="creator" 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'} pt-16`}>
        <div className="p-6">
          {/* Success Message */}
          {showBidSuccess && (
            <div className="fixed top-20 right-6 z-50 bg-success text-success-foreground p-4 rounded-lg shadow-elevated flex items-center space-x-3 animate-in slide-in-from-right">
              <Icon name="CheckCircle" size={20} />
              <div>
                <p className="font-medium">Bid Submitted Successfully!</p>
                <p className="text-sm opacity-90">You'll be notified about the selection status.</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBidSuccess(false)}
                className="text-success-foreground hover:bg-success-foreground/10"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          )}

          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToCampaigns}
              iconName="ArrowLeft"
              iconPosition="left"
              className="mb-4"
            >
              Back to Campaigns
            </Button>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Header - Always visible */}
              <CampaignHeader 
                campaign={campaignData}
                onSaveCampaign={handleSaveCampaign}
                isSaved={isSaved}
              />

              {/* Mobile Content Switching */}
              <div className="lg:hidden">
                {activeTab === 'overview' && (
                  <>
                    <CampaignDescription campaign={campaignData} />
                    <EligibilityCriteria campaign={campaignData} userEligible={userEligible} />
                  </>
                )}
                {activeTab === 'brand' && (
                  <BrandInformation brand={campaignData?.brand} />
                )}
                {activeTab === 'competition' && (
                  <CompetitionInsights insights={competitionInsights} />
                )}
                {activeTab === 'bid' && (
                  <BiddingForm 
                    campaign={campaignData}
                    onSubmitBid={handleSubmitBid}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              {/* Desktop Content - Always visible */}
              <div className="hidden lg:block space-y-6">
                <CampaignDescription campaign={campaignData} />
                <EligibilityCriteria campaign={campaignData} userEligible={userEligible} />
                <BrandInformation brand={campaignData?.brand} />
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Desktop Competition Insights */}
              <div className="hidden lg:block">
                <CompetitionInsights insights={competitionInsights} />
              </div>

              {/* Desktop Bidding Form */}
              <div className="hidden lg:block">
                <BiddingForm 
                  campaign={campaignData}
                  onSubmitBid={handleSubmitBid}
                  isSubmitting={isSubmitting}
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => navigate('/messaging-center')}
                  >
                    Contact Brand
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share Campaign
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Flag"
                    iconPosition="left"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Campaign Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <span className="text-sm font-medium text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Saves</span>
                    <span className="text-sm font-medium text-foreground">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <span className="text-sm font-medium text-foreground">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time Left</span>
                    <span className="text-sm font-medium text-error">3 days</span>
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

export default CampaignDetails;