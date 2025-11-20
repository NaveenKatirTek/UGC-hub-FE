import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, userRole = 'brand', onToggle }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    campaigns: true,
    admin: true
  });

  const navigationSections = [
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: 'Target',
      items: [
        {
          label: 'Create Campaign',
          path: '/campaign-creation',
          icon: 'Plus',
          roles: ['brand', 'admin']
        },
        {
          label: 'Campaign Details',
          path: '/campaign-details',
          icon: 'FileText',
          roles: ['brand', 'creator', 'admin']
        }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      items: [
        {
          label: 'Messages',
          path: '/messaging-center',
          icon: 'MessageSquare',
          roles: ['brand', 'creator', 'admin'],
          badge: 3
        }
      ]
    },
    {
      id: 'billing',
      label: 'Account',
      items: [
        {
          label: 'Subscription',
          path: '/subscription-management',
          icon: 'CreditCard',
          roles: ['brand', 'creator', 'admin']
        }
      ]
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'Shield',
      roles: ['admin'],
      items: [
        {
          label: 'Dashboard',
          path: '/admin-dashboard',
          icon: 'BarChart3',
          roles: ['admin'],
          badge: 5
        },
        {
          label: 'User Verification',
          path: '/user-verification',
          icon: 'UserCheck',
          roles: ['admin'],
          badge: 12
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const toggleSection = (sectionId) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const isActiveItem = (path) => {
    return location?.pathname === path;
  };

  const visibleSections = navigationSections?.filter(section => 
    !section?.roles || section?.roles?.includes(userRole)
  );

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={18} color="white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-foreground">
                UGC Hub
              </span>
            )}
          </div>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-auto"
            >
              <Icon name="PanelLeftClose" size={16} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {visibleSections?.map((section, sectionIndex) => (
            <div key={section?.id}>
              {/* Section Divider for Admin */}
              {section?.id === 'admin' && sectionIndex > 0 && (
                <div className="border-t border-border mb-6 pt-6"></div>
              )}
              
              {/* Section Header */}
              {section?.icon && !isCollapsed && (
                <button
                  onClick={() => toggleSection(section?.id)}
                  className="flex items-center w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth mb-2"
                >
                  <Icon name={section?.icon} size={16} className="mr-2" />
                  {section?.label}
                  {section?.items && (
                    <Icon 
                      name={expandedSections?.[section?.id] ? "ChevronDown" : "ChevronRight"} 
                      size={14} 
                      className="ml-auto" 
                    />
                  )}
                </button>
              )}

              {/* Section Items */}
              <div className={`space-y-1 ${
                section?.icon && !isCollapsed && !expandedSections?.[section?.id] ? 'hidden' : ''
              }`}>
                {section?.items?.filter(item => 
                  !item?.roles || item?.roles?.includes(userRole)
                )?.map((item) => {
                  const isActive = isActiveItem(item?.path);
                  
                  return (
                    <div key={item?.path} className="relative">
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        onClick={() => handleNavigation(item?.path)}
                        className={`w-full justify-start relative transition-smooth ${
                          isCollapsed ? 'px-2' : 'px-3'
                        } ${isActive ? 'border-l-3 border-l-primary' : ''}`}
                        title={isCollapsed ? item?.label : undefined}
                      >
                        <Icon name={item?.icon} size={16} className={isCollapsed ? '' : 'mr-3'} />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item?.label}</span>
                            {item?.badge && (
                              <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ml-2">
                                {item?.badge > 99 ? '99+' : item?.badge}
                              </span>
                            )}
                          </>
                        )}
                        {isCollapsed && item?.badge && (
                          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                            {item?.badge > 9 ? '9+' : item?.badge}
                          </span>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle */}
        {isCollapsed && (
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-full"
              title="Expand sidebar"
            >
              <Icon name="PanelLeftOpen" size={16} />
            </Button>
          </div>
        )}

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth cursor-pointer">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;