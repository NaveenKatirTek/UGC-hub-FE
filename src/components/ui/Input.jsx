import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, userRole = 'brand' }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { 
      label: 'Campaigns', 
      path: '/campaign-creation',
      icon: 'Target',
      roles: ['brand', 'creator', 'admin']
    },
    { 
      label: 'Messages', 
      path: '/messaging-center',
      icon: 'MessageSquare',
      roles: ['brand', 'creator', 'admin'],
      badge: 3
    },
    { 
      label: 'Billing', 
      path: '/subscription-management',
      icon: 'CreditCard',
      roles: ['brand', 'creator', 'admin']
    },
    { 
      label: 'Admin', 
      path: '/admin-dashboard',
      icon: 'Shield',
      roles: ['admin']
    }
  ];

  const visibleItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  )?.slice(0, 4);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={18} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:block">
              UGC Hub
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visibleItems?.map((item) => {
            const isActive = location?.pathname === item?.path || 
              (item?.path === '/campaign-creation' && location?.pathname === '/campaign-details');
            
            return (
              <div key={item?.path} className="relative">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className="relative px-4 py-2 text-sm font-medium transition-smooth"
                >
                  <Icon name={item?.icon} size={16} className="mr-2" />
                  {item?.label}
                  {item?.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  )}
                </Button>
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfileToggle}
            className="relative"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} />
            </div>
          </Button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg shadow-elevated py-2 z-50">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center">
                  <Icon name="Settings" size={14} className="mr-2" />
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center">
                  <Icon name="HelpCircle" size={14} className="mr-2" />
                  Help
                </button>
                <div className="border-t border-border my-1"></div>
                <button className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-smooth flex items-center">
                  <Icon name="LogOut" size={14} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      <div className="lg:hidden">
        <nav className="border-t border-border bg-card">
          <div className="px-4 py-2 space-y-1">
            {visibleItems?.map((item) => {
              const isActive = location?.pathname === item?.path || 
                (item?.path === '/campaign-creation' && location?.pathname === '/campaign-details');
              
              return (
                <Button
                  key={item?.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className="w-full justify-start relative"
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                  {item?.badge && (
                    <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;