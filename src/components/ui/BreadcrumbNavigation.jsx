import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ 
  customBreadcrumbs = null,
  showHome = true,
  separator = 'ChevronRight',
  className = ''
}) => {
  const location = useLocation();
  
  const routeLabels = {
    'brand-dashboard': 'Brand Dashboard',
    'creator-dashboard': 'Creator Dashboard',
    'campaigns': 'Campaigns',
    'bids': 'Bids',
    'messages': 'Messages',
    'subscription': 'Subscription',
    'settings': 'Settings',
    'profile': 'Profile',
    'account': 'Account',
    'help': 'Help & Support',
    'create': 'Create',
    'edit': 'Edit',
    'view': 'View',
    'analytics': 'Analytics',
    'applications': 'Applications',
    'proposals': 'Proposals'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment !== '');
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs?.push({
        label: 'Home',
        path: '/',
        icon: 'Home'
      });
    }

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      const label = routeLabels?.[segment] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      const isLast = index === pathSegments?.length - 1;
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon 
                name={separator} 
                size={14} 
                className="text-muted-foreground" 
                aria-hidden="true"
              />
            )}
            
            {crumb?.isActive ? (
              <span 
                className="font-medium text-foreground flex items-center space-x-1"
                aria-current="page"
              >
                {crumb?.icon && <Icon name={crumb?.icon} size={14} />}
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-foreground animate-standard flex items-center space-x-1"
              >
                {crumb?.icon && <Icon name={crumb?.icon} size={14} />}
                <span>{crumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;