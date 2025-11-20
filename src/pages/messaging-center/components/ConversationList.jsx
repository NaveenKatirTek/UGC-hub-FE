import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ConversationList = ({ conversations, activeConversation, onConversationSelect, onNewMessage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredConversations = conversations?.filter(conv => {
    const matchesSearch = conv?.participant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conv?.campaign?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'unread') return matchesSearch && conv?.unreadCount > 0;
    if (filterType === 'active') return matchesSearch && conv?.status === 'active';
    return matchesSearch;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime?.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'completed': return 'text-muted-foreground';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <Button variant="ghost" size="icon">
            <Icon name="Plus" size={18} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Filters */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All', count: conversations?.length },
            { key: 'unread', label: 'Unread', count: conversations?.filter(c => c?.unreadCount > 0)?.length },
            { key: 'active', label: 'Active', count: conversations?.filter(c => c?.status === 'active')?.length }
          ]?.map(filter => (
            <Button
              key={filter?.key}
              variant={filterType === filter?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilterType(filter?.key)}
              className="text-xs"
            >
              {filter?.label} ({filter?.count})
            </Button>
          ))}
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation)}
                className={`p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
                  activeConversation?.id === conversation?.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation?.participant?.avatar}
                      alt={conversation?.participant?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation?.participant?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {conversation?.participant?.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {conversation?.unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {conversation?.unreadCount > 9 ? '9+' : conversation?.unreadCount}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation?.lastMessage?.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground truncate">
                        {conversation?.campaign?.title}
                      </span>
                      <span className={`text-xs font-medium ${getStatusColor(conversation?.status)}`}>
                        {conversation?.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {conversation?.lastMessage?.type === 'file' && (
                        <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                      )}
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation?.lastMessage?.type === 'file' 
                          ? `Shared ${conversation?.lastMessage?.fileName}`
                          : conversation?.lastMessage?.content
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;