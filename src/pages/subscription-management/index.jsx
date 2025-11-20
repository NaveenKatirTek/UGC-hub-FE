import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PricingCard from './components/PricingCard';
import CurrentSubscription from './components/CurrentSubscription';
import PaymentMethods from './components/PaymentMethods';
import BillingHistory from './components/BillingHistory';
import AddOnsSection from './components/AddOnsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SubscriptionManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userRole] = useState('brand');

  // Mock data for pricing plans
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      billing: 'month',
      description: 'Perfect for getting started with UGC campaigns',
      features: [
        { text: '5 campaigns per month', included: true },
        { text: '10 bids per campaign', included: true },
        { text: 'Basic messaging', included: true },
        { text: 'Standard support', included: true },
        { text: 'Campaign analytics', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced filters', included: false },
        { text: 'Verified badge', included: false }
      ],
      limits: {
        campaigns: 5,
        bidsPerCampaign: 10,
        messages: 100,
        storage: 1
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 2999,
      billing: 'month',
      description: 'Ideal for growing brands with regular campaigns',
      features: [
        { text: '25 campaigns per month', included: true },
        { text: '50 bids per campaign', included: true },
        { text: 'Advanced messaging', included: true },
        { text: 'Priority support', included: true },
        { text: 'Campaign analytics', included: true },
        { text: 'Advanced filters', included: true },
        { text: 'Bulk operations', included: true },
        { text: 'Verified badge', included: false }
      ],
      limits: {
        campaigns: 25,
        bidsPerCampaign: 50,
        messages: 1000,
        storage: 10
      }
    },
    {
      id: 'ultra',
      name: 'Ultra Pro',
      price: 7999,
      billing: 'month',
      description: 'For enterprises running large-scale UGC programs',
      features: [
        { text: 'Unlimited campaigns', included: true },
        { text: 'Unlimited bids', included: true },
        { text: 'Premium messaging', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'White-label options', included: true },
        { text: 'Verified badge', included: true }
      ],
      limits: {
        campaigns: -1,
        bidsPerCampaign: -1,
        messages: -1,
        storage: -1
      }
    }
  ];

  // Mock current subscription data
  const currentSubscription = {
    planName: 'Pro',
    status: 'active',
    monthlyAmount: 2999,
    nextBillingDate: '2025-11-01',
    startDate: '2024-08-01',
    paymentMethod: '**** 4532',
    autoRenewal: true,
    usage: {
      campaigns: { used: 18, total: 25 },
      bidsPerCampaign: { used: 32, total: 50 },
      messages: { used: 456, total: 1000 },
      storage: { used: 6.2, total: 10 }
    }
  };

  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      cardNumber: '4532123456784532',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2027',
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      upiId: 'john.doe@paytm',
      isDefault: false
    }
  ]);

  // Mock billing history data
  const billingHistory = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      date: '2024-10-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      date: '2024-09-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      date: '2024-08-15',
      description: 'Verified Badge Add-on',
      amount: 499,
      status: 'paid'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      date: '2024-08-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      date: '2024-07-01',
      description: 'Basic Plan - Monthly Subscription',
      amount: 0,
      status: 'paid'
    }
  ];

  // Mock add-ons data
  const addOns = [
    {
      id: 1,
      name: 'Verified Badge',
      type: 'verification',
      category: 'Trust & Credibility',
      description: 'Get a verified badge to increase trust and credibility with creators',
      price: 499,
      billing: 'month',
      features: [
        'Blue verified checkmark',
        'Higher visibility in search',
        'Increased bid acceptance rate',
        'Trust score boost'
      ]
    },
    {
      id: 2,
      name: 'Premium Bid Highlighting',
      type: 'highlight',
      category: 'Visibility',
      description: 'Make your bids stand out with premium highlighting and priority placement',
      price: 299,
      billing: 'month',
      features: [
        'Golden bid highlighting',
        'Priority placement in lists',
        'Enhanced bid visibility',
        'Faster response rates'
      ]
    },
    {
      id: 3,
      name: 'Advanced Analytics',
      type: 'analytics',
      category: 'Insights',
      description: 'Get detailed insights into campaign performance and creator engagement',
      price: 799,
      billing: 'month',
      features: [
        'Detailed campaign analytics',
        'Creator performance metrics',
        'ROI tracking',
        'Custom reports'
      ]
    },
    {
      id: 4,
      name: 'Priority Support',
      type: 'priority',
      category: 'Support',
      description: '24/7 priority support with dedicated account manager',
      price: 1499,
      billing: 'month',
      features: [
        '24/7 priority support',
        'Dedicated account manager',
        'Phone support',
        'Same-day response guarantee'
      ]
    }
  ];

  // Mock purchased add-ons
  const [purchasedAddOns, setPurchasedAddOns] = useState([
    {
      id: 1,
      name: 'Verified Badge',
      type: 'verification',
      expiryDate: '2025-01-01'
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'plans', label: 'Plans & Pricing', icon: 'CreditCard' },
    { id: 'payment', label: 'Payment Methods', icon: 'Wallet' },
    { id: 'billing', label: 'Billing History', icon: 'Receipt' },
    { id: 'addons', label: 'Add-ons', icon: 'Plus' }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const handleConfirmUpgrade = () => {
    console.log('Upgrading to plan:', selectedPlan);
    setShowUpgradeModal(false);
    setSelectedPlan(null);
  };

  const handleUpgrade = () => {
    setActiveTab('plans');
  };

  const handleDowngrade = () => {
    setActiveTab('plans');
  };

  const handleCancelSubscription = () => {
    console.log('Cancelling subscription');
  };

  const handleAddPayment = (paymentData) => {
    const newPayment = {
      id: paymentMethods?.length + 1,
      ...paymentData,
      isDefault: paymentMethods?.length === 0
    };
    setPaymentMethods([...paymentMethods, newPayment]);
  };

  const handleRemovePayment = (paymentId) => {
    setPaymentMethods(paymentMethods?.filter(method => method?.id !== paymentId));
  };

  const handleSetDefault = (paymentId) => {
    setPaymentMethods(paymentMethods?.map(method => ({
      ...method,
      isDefault: method?.id === paymentId
    })));
  };

  const handlePurchaseAddOn = (addOn) => {
    const newPurchase = {
      ...addOn,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()
    };
    setPurchasedAddOns([...purchasedAddOns, newPurchase]);
  };

  const getCurrentPlan = () => {
    return pricingPlans?.find(plan => plan?.name?.toLowerCase() === currentSubscription?.planName?.toLowerCase());
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <CurrentSubscription
              subscription={currentSubscription}
              onUpgrade={handleUpgrade}
              onDowngrade={handleDowngrade}
              onCancelSubscription={handleCancelSubscription}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold text-foreground">₹14,995</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Add-ons</span>
                    <span className="font-semibold text-foreground">{purchasedAddOns?.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Next Billing</span>
                    <span className="font-semibold text-foreground">
                      {new Date(currentSubscription.nextBillingDate)?.toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="TrendingUp" size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Consider Ultra Pro</p>
                      <p className="text-xs text-muted-foreground">You're using 72% of your campaign limit</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={16} className="text-success mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Add Verified Badge</p>
                      <p className="text-xs text-muted-foreground">Increase trust and bid acceptance rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'plans':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select the perfect plan for your UGC campaign needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans?.map((plan, index) => (
                <PricingCard
                  key={plan?.id}
                  plan={plan}
                  isCurrentPlan={plan?.name?.toLowerCase() === currentSubscription?.planName?.toLowerCase()}
                  isPopular={index === 1}
                  onSelectPlan={handleSelectPlan}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <PaymentMethods
            paymentMethods={paymentMethods}
            onAddPayment={handleAddPayment}
            onRemovePayment={handleRemovePayment}
            onSetDefault={handleSetDefault}
          />
        );

      case 'billing':
        return <BillingHistory billingHistory={billingHistory} />;

      case 'addons':
        return (
          <AddOnsSection
            addOns={addOns}
            purchasedAddOns={purchasedAddOns}
            onPurchaseAddOn={handlePurchaseAddOn}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} userRole={userRole} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        userRole={userRole} 
        onToggle={handleSidebarToggle} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-60'
      } pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">Manage your subscription, billing, and add-ons</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
      {/* Upgrade Confirmation Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Confirm Plan Change</h3>
              <p className="text-muted-foreground">
                You're about to {selectedPlan?.price > getCurrentPlan()?.price ? 'upgrade' : 'downgrade'} to the <strong>{selectedPlan?.name}</strong> plan
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-foreground">New Plan</span>
                <span className="font-semibold text-foreground">{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-foreground">Monthly Cost</span>
                <span className="font-semibold text-foreground">₹{selectedPlan?.price?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Effective Date</span>
                <span className="font-semibold text-foreground">Immediately</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowUpgradeModal(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleConfirmUpgrade}
                fullWidth
                iconName="Check"
                iconPosition="left"
              >
                Confirm Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;