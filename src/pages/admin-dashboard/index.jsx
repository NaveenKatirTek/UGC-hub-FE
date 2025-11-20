import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import UserManagementTable from './components/UserManagementTable';
import CampaignOverview from './components/CampaignOverview';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const metricsData = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Pending Verifications',
      value: '23',
      change: '+5',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'warning'
    },
    {
      title: 'Live Campaigns',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Target',
      color: 'success'
    },
    {
      title: 'Monthly Revenue',
      value: '₹12.4L',
      change: '+18.7%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'secondary'
    },
    {
      title: 'Dispute Cases',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      title: 'Platform Health',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard - UGC Hub</title>
        <meta name="description" content="Comprehensive platform oversight with user management, campaign monitoring, and analytics for administrative control." />
      </Helmet>
      <Header onMenuToggle={handleSidebarToggle} userRole="admin" />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        userRole="admin" 
        onToggle={handleSidebarToggle} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive platform oversight and management
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="xl:col-span-1">
              <ActivityFeed />
            </div>

            {/* Right Column - Quick Actions */}
            <div className="xl:col-span-2">
              <QuickActions />
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="grid grid-cols-1 gap-6">
            <AnalyticsChart />
          </div>

          {/* Campaign Overview */}
          <div className="grid grid-cols-1 gap-6">
            <CampaignOverview />
          </div>

          {/* User Management Table */}
          <div className="grid grid-cols-1 gap-6">
            <UserManagementTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;