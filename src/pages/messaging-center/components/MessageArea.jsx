import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';

const MessageArea = ({ 
  conversation, 
  messages, 
  onSendMessage, 
  onFileUpload, 
  typingUsers = [],
  onMarkAsRead 
}) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (messagesContainerRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef?.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversation && messages?.length > 0) {
      onMarkAsRead?.(conversation?.id);
    }
  }, [conversation, messages, onMarkAsRead]);

  const groupMessages = (messages) => {
    const grouped = [];
    let currentGroup = [];
    let lastSender = null;
    let lastTime = null;

    messages?.forEach((message, index) => {
      const messageTime = new Date(message.timestamp);
      const timeDiff = lastTime ? (messageTime - lastTime) / (1000 * 60) : 0; // minutes

      if (
        message?.sender?.id === lastSender &&
        timeDiff < 5 && // Group messages within 5 minutes
        currentGroup?.length < 5 // Max 5 messages per group
      ) {
        currentGroup?.push({ ...message, isGrouped: true });
      } else {
        if (currentGroup?.length > 0) {
          grouped?.push([...currentGroup]);
        }
        currentGroup = [{ ...message, isGrouped: false }];
        lastSender = message?.sender?.id;
      }
      lastTime = messageTime;
    });

    if (currentGroup?.length > 0) {
      grouped?.push(currentGroup);
    }

    return grouped;
  };

  const formatDateSeparator = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    const diffTime = today - messageDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return messageDate?.toLocaleDateString('en-IN', { weekday: 'long' });
    return messageDate?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const addDateSeparators = (groupedMessages) => {
    const withSeparators = [];
    let lastDate = null;

    groupedMessages?.forEach(group => {
      const messageDate = new Date(group[0].timestamp)?.toDateString();
      
      if (messageDate !== lastDate) {
        withSeparators?.push({
          type: 'date-separator',
          date: messageDate,
          label: formatDateSeparator(group?.[0]?.timestamp)
        });
        lastDate = messageDate;
      }
      
      withSeparators?.push({ type: 'message-group', messages: group });
    });

    return withSeparators;
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">
            Choose a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  const groupedMessages = groupMessages(messages);
  const messagesWithSeparators = addDateSeparators(groupedMessages);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
      >
        {messagesWithSeparators?.map((item, index) => {
          if (item?.type === 'date-separator') {
            return (
              <div key={`date-${index}`} className="flex items-center justify-center my-6">
                <div className="bg-muted px-3 py-1 rounded-full">
                  <span className="text-xs text-muted-foreground font-medium">
                    {item?.label}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={`group-${index}`}>
              {item?.messages?.map((message, msgIndex) => (
                <MessageBubble
                  key={message?.id}
                  message={message}
                  isOwn={message?.sender?.id === 'current-user'}
                  showAvatar={msgIndex === 0}
                  isGrouped={message?.isGrouped}
                />
              ))}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {typingUsers?.length > 0 && (
          <TypingIndicator users={typingUsers} />
        )}

        <div ref={messagesEndRef} />
      </div>
      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-20 right-8">
          <Button
            variant="default"
            size="icon"
            onClick={scrollToBottom}
            className="rounded-full shadow-elevated"
          >
            <Icon name="ChevronDown" size={18} />
          </Button>
        </div>
      )}
      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        placeholder={`Message ${conversation?.participant?.name}...`}
      />
    </div>
  );
};

export default MessageArea;