import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationBadge from './NotificationBadge';

const RoleAdaptiveNavbar = ({ 
  user = { role: 'brand', name: 'John Doe', avatar: null },
  notifications = [],
  onNavigate = () => {},
  theme = 'default'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const brandNavItems = [
    { label: 'Dashboard', path: '/brand-dashboard', icon: 'LayoutDashboard', tooltip: 'Brand overview and analytics' },
    { label: 'Campaigns', path: '/campaigns', icon: 'Megaphone', tooltip: 'Create and manage campaigns' },
    { label: 'Bids', path: '/bids', icon: 'Users', tooltip: 'Review creator applications' },
    { label: 'Messages', path: '/messages', icon: 'MessageSquare', tooltip: 'Communicate with creators' },
  ];

  const creatorNavItems = [
    { label: 'Dashboard', path: '/creator-dashboard', icon: 'LayoutDashboard', tooltip: 'Creator overview and earnings' },
    { label: 'Campaigns', path: '/campaigns', icon: 'Search', tooltip: 'Discover opportunities' },
    { label: 'Bids', path: '/bids', icon: 'FileText', tooltip: 'Track your applications' },
    { label: 'Messages', path: '/messages', icon: 'MessageSquare', tooltip: 'Brand communications' },
  ];

  const navItems = user?.role === 'brand' ? brandNavItems : creatorNavItems;

  const getNotificationCount = (path) => {
    return notifications?.filter(n => n?.category === path?.replace('/', ''))?.length;
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleNavClick = (path) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-navigation bg-card border-b border-border">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-15">
          {/* Logo */}
          <Link 
            to={user?.role === 'brand' ? '/brand-dashboard' : '/creator-dashboard'}
            className="flex items-center space-x-2 animate-standard hover:opacity-80"
            onClick={() => handleNavClick(user?.role === 'brand' ? '/brand-dashboard' : '/creator-dashboard')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              InfluencerConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavClick(item?.path)}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-form text-sm font-medium animate-standard ${
                  isActiveRoute(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {(item?.path === '/messages' || item?.path === '/bids') && (
                  <NotificationBadge count={getNotificationCount(item?.path)} />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Subscription Link - Desktop Only */}
            <Link
              to="/subscription"
              onClick={() => handleNavClick('/subscription')}
              className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-form text-sm font-medium animate-standard ${
                isActiveRoute('/subscription')
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title="Manage subscription"
            >
              <Icon name="CreditCard" size={18} />
              <span>Subscription</span>
            </Link>

            {/* User Profile */}
            <UserProfileDropdown user={user} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-form text-muted-foreground hover:text-foreground hover:bg-muted animate-standard"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-overlay bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  InfluencerConnect
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-form text-muted-foreground hover:text-foreground hover:bg-muted animate-standard"
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {navItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => handleNavClick(item?.path)}
                    className={`flex items-center justify-between p-4 rounded-card animate-standard ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10 border border-primary/20' :'text-foreground hover:bg-muted border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={20} />
                      <span className="font-medium">{item?.label}</span>
                    </div>
                    {(item?.path === '/messages' || item?.path === '/bids') && (
                      <NotificationBadge count={getNotificationCount(item?.path)} />
                    )}
                  </Link>
                ))}

                {/* Mobile Subscription Link */}
                <Link
                  to="/subscription"
                  onClick={() => handleNavClick('/subscription')}
                  className={`flex items-center justify-between p-4 rounded-card animate-standard ${
                    isActiveRoute('/subscription')
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-foreground hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="CreditCard" size={20} />
                    <span className="font-medium">Subscription</span>
                  </div>
                </Link>

                {/* Mobile Settings Link */}
                <Link
                  to="/settings"
                  onClick={() => handleNavClick('/settings')}
                  className={`flex items-center justify-between p-4 rounded-card animate-standard ${
                    isActiveRoute('/settings')
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-foreground hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Settings" size={20} />
                    <span className="font-medium">Settings</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile User Section */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 p-4 rounded-card bg-muted">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Icon name="User" size={20} color="white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default RoleAdaptiveNavbar;