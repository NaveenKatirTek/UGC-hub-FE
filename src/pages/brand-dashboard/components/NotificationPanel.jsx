import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({
  notifications = [],
  onMarkAsRead = () => {},
  onViewAll = () => {}
}) => {
  const [filter, setFilter] = useState('all');

  const mockNotifications = [
  {
    id: 1,
    type: 'bid',
    title: 'New Creator Application',
    message: 'Sarah Johnson applied for your "Summer Fashion" campaign',
    timestamp: new Date(Date.now() - 300000),
    isRead: false,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    avatarAlt: 'Professional headshot of young woman with long brown hair smiling at camera'
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'Mike Chen sent you a message about campaign requirements',
    timestamp: new Date(Date.now() - 900000),
    isRead: false,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17cf2aeb9-1763296571533.png",
    avatarAlt: 'Professional headshot of Asian man with short black hair in white shirt'
  },
  {
    id: 3,
    type: 'campaign',
    title: 'Campaign Update',
    message: 'Your "Tech Review" campaign reached 50% of budget',
    timestamp: new Date(Date.now() - 1800000),
    isRead: true,
    avatar: null,
    avatarAlt: ''
  },
  {
    id: 4,
    type: 'bid',
    title: 'Application Approved',
    message: 'Emma Davis accepted your collaboration offer',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff0512c2-1763295895044.png",
    avatarAlt: 'Professional headshot of blonde woman in business attire smiling confidently'
  },
  {
    id: 5,
    type: 'system',
    title: 'Payment Processed',
    message: 'Monthly subscription payment of $99 was successful',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true,
    avatar: null,
    avatarAlt: ''
  }];


  const getNotificationIcon = (type) => {
    switch (type) {
      case 'bid':
        return 'Users';
      case 'message':
        return 'MessageSquare';
      case 'campaign':
        return 'Megaphone';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'bid':
        return 'text-primary';
      case 'message':
        return 'text-secondary';
      case 'campaign':
        return 'text-success';
      case 'system':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = mockNotifications?.filter((notification) => {
    if (filter === 'unread') return !notification?.isRead;
    if (filter === 'read') return notification?.isRead;
    return true;
  });

  const unreadCount = mockNotifications?.filter((n) => !n?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 &&
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            }
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-xs">

            View All
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-form p-1">
          {['all', 'unread', 'read']?.map((filterType) =>
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-form transition-all duration-200 ${
            filter === filterType ?
            'bg-card text-foreground shadow-subtle' :
            'text-muted-foreground hover:text-foreground'}`
            }>

              {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
            </button>
          )}
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ?
        <div className="p-6 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications found'}
            </p>
          </div> :

        <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) =>
          <div
            key={notification?.id}
            className={`p-4 hover:bg-muted/50 animate-standard cursor-pointer ${
            !notification?.isRead ? 'bg-primary/5' : ''}`
            }
            onClick={() => onMarkAsRead(notification?.id)}>

                <div className="flex items-start space-x-3">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification?.avatar ?
                <img
                  src={notification?.avatar}
                  alt={notification?.avatarAlt}
                  className="w-10 h-10 rounded-full object-cover" /> :


                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Icon
                    name={getNotificationIcon(notification?.type)}
                    size={16}
                    className={getNotificationColor(notification?.type)} />

                      </div>
                }
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                    !notification?.isRead ? 'text-foreground' : 'text-muted-foreground'}`
                    }>
                          {notification?.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                        {!notification?.isRead &&
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
      {/* Footer */}
      {filteredNotifications?.length > 0 &&
      <div className="p-4 border-t border-border">
          <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => {
            const unreadIds = mockNotifications?.filter((n) => !n?.isRead)?.map((n) => n?.id);
            unreadIds?.forEach((id) => onMarkAsRead(id));
          }}
          disabled={unreadCount === 0}>

            Mark All as Read
          </Button>
        </div>
      }
    </div>);

};

export default NotificationPanel;