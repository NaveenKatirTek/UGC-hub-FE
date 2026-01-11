import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedHeader = ({ user, onMenuToggle }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/sign-in');
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate(user?.role === 'brand' ? '/brand/dashboard' : '/creator-dashboard')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={18} color="white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">
              BrandCreator Connect
            </span>
          </div>
        </div>

        {/* Right Side - Profile Icon Only */}
        <div className="relative profile-dropdown">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfileToggle}
            className="relative hover:bg-gray-100"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-indigo-200">
              <Icon name="User" size={18} className="text-indigo-600" />
            </div>
          </Button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {user?.email}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 capitalize">
                    {user?.role || 'User'}
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button 
                  onClick={() => {
                    navigate(user?.role === 'brand' ? '/brand/dashboard' : '/creator-dashboard');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Icon name="LayoutDashboard" size={16} className="mr-3 text-gray-500" />
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Icon name="User" size={16} className="mr-3 text-gray-500" />
                  My Profile
                </button>
                <button 
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Icon name="Settings" size={16} className="mr-3 text-gray-500" />
                  Settings
                </button>
                <button 
                  onClick={() => {
                    navigate('/help');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Icon name="HelpCircle" size={16} className="mr-3 text-gray-500" />
                  Help & Support
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center font-medium"
                >
                  <Icon name="LogOut" size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
