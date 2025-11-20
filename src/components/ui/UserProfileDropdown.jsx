import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const UserProfileDropdown = ({ 
  user = { role: 'brand', name: 'John Doe', email: 'john@example.com', avatar: null },
  onLogout = () => {},
  onSwitchRole = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event?.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      path: '/settings/profile',
      description: 'Manage your account details'
    },
    {
      label: 'Account Settings',
      icon: 'Settings',
      path: '/settings/account',
      description: 'Privacy and security settings'
    },
    {
      label: 'Billing & Subscription',
      icon: 'CreditCard',
      path: '/subscription',
      description: 'Manage your subscription'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help',
      description: 'Get help and contact support'
    }
  ];

  const handleMenuClick = (path) => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleRoleSwitch = () => {
    setIsOpen(false);
    onSwitchRole();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 rounded-form text-sm font-medium text-foreground hover:bg-muted animate-standard focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <Icon name="User" size={16} color="white" className={user?.avatar ? 'hidden' : 'block'} />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground">{user?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground animate-standard ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-card shadow-prominent z-dropdown animate-state-change">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <Icon name="User" size={20} color="white" className={user?.avatar ? 'hidden' : 'block'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-popover-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${user?.role === 'brand' ? 'bg-primary' : 'bg-secondary'}`}></div>
                  <span className="text-xs font-medium text-muted-foreground capitalize">{user?.role} Account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleMenuClick(item?.path)}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted animate-standard"
              >
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{item?.label}</p>
                  <p className="text-xs text-muted-foreground">{item?.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Role Switch & Logout */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleRoleSwitch}
              className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted animate-standard"
            >
              <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium">Switch to {user?.role === 'brand' ? 'Creator' : 'Brand'}</p>
                <p className="text-xs text-muted-foreground">Change your account type</p>
              </div>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 animate-standard"
            >
              <Icon name="LogOut" size={16} />
              <div className="flex-1 text-left">
                <p className="font-medium">Sign Out</p>
                <p className="text-xs text-muted-foreground">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;