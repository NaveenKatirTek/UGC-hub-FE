import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConversationList from './components/ConversationList';
import MessageArea from './components/MessageArea';
import CampaignContext from './components/CampaignContext';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';



const MessagingCenter = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mock conversations data
  const conversations = [
    {
      id: 'conv-1',
      participant: {
        id: 'user-1',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isOnline: true,
        role: 'creator'
      },
      campaign: {
        id: 'camp-1',
        title: 'Summer Fashion Collection 2024',
        brand: { name: 'StyleCraft India' },
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
        budget: 25000,
        deadline: '2024-10-15',
        deliverables: ['Instagram Posts', 'Reels'],
        category: 'Fashion',
        status: 'active',
        progress: 65,
        completedDeliverables: 2,
        totalDeliverables: 3
      },
      lastMessage: {
        id: 'msg-1',
        content: 'I have uploaded the first set of photos for review. Please let me know your feedback!',
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      },
      status: 'active',
      unreadCount: 2
    },
    {
      id: 'conv-2',
      participant: {
        id: 'user-2',
        name: 'Rahul Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isOnline: false,
        role: 'creator'
      },
      campaign: {
        id: 'camp-2',
        title: 'Tech Gadget Review Campaign',
        brand: { name: 'TechVibe Solutions' },
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300',
        budget: 15000,
        deadline: '2024-10-20',
        deliverables: ['YouTube Video', 'Instagram Story'],
        category: 'Technology',
        status: 'active',
        progress: 30,
        completedDeliverables: 0,
        totalDeliverables: 2
      },
      lastMessage: {
        id: 'msg-2',
        content: 'When can we schedule the product handover?',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      status: 'active',
      unreadCount: 0
    },
    {
      id: 'conv-3',
      participant: {
        id: 'user-3',
        name: 'Anita Desai',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        isOnline: true,
        role: 'creator'
      },
      campaign: {
        id: 'camp-3',
        title: 'Organic Skincare Brand Launch',
        brand: { name: 'Pure Glow Cosmetics' },
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300',
        budget: 30000,
        deadline: '2024-09-30',
        deliverables: ['Instagram Posts', 'Stories', 'Reels'],
        category: 'Beauty',
        status: 'completed',
        progress: 100,
        completedDeliverables: 4,
        totalDeliverables: 4
      },
      lastMessage: {
        id: 'msg-3',
        content: 'Thank you for the amazing collaboration! Looking forward to working together again.',
        timestamp: new Date(Date.now() - 86400000),
        type: 'text'
      },
      status: 'completed',
      unreadCount: 0
    },
    {
      id: 'conv-4',
      participant: {
        id: 'user-4',
        name: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        isOnline: false,
        role: 'creator'
      },
      campaign: {
        id: 'camp-4',
        title: 'Fitness Equipment Promotion',
        brand: { name: 'FitLife India' },
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        budget: 20000,
        deadline: '2024-10-25',
        deliverables: ['YouTube Video', 'Instagram Posts'],
        category: 'Fitness',
        status: 'pending',
        progress: 0,
        completedDeliverables: 0,
        totalDeliverables: 3
      },
      lastMessage: {
        id: 'msg-4',
        fileName: 'contract_agreement.pdf',
        timestamp: new Date(Date.now() - 172800000),
        type: 'file'
      },
      status: 'pending',
      unreadCount: 1
    }
  ];

  // Mock messages for active conversation
  const mockMessages = {
    'conv-1': [
      {
        id: 'msg-1-1',
        sender: {
          id: 'user-1',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        content: 'Hi! I am excited to work on the Summer Fashion Collection campaign. When can we discuss the creative brief?',
        timestamp: new Date(Date.now() - 86400000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-1-2',
        sender: {
          id: 'current-user',
          name: 'Brand Manager',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        content: 'Hello Priya! Great to have you on board. I have shared the creative brief and brand guidelines. Please review them and let me know if you have any questions.',
        timestamp: new Date(Date.now() - 82800000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-1-3',
        sender: {
          id: 'current-user',
          name: 'Brand Manager',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        content: '',
        timestamp: new Date(Date.now() - 82700000),
        status: 'read',
        type: 'file',
        attachment: {
          type: 'file',
          url: '/assets/files/brand_guidelines.pdf',
          fileName: 'Brand_Guidelines_StyleCraft.pdf',
          fileSize: 2048576
        }
      },
      {
        id: 'msg-1-4',
        sender: {
          id: 'user-1',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        content: 'Perfect! I have reviewed the guidelines. The aesthetic is exactly what I love to create. I will start working on the mood board and share it by tomorrow.',
        timestamp: new Date(Date.now() - 79200000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-1-5',
        sender: {
          id: 'user-1',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        content: 'Here is the mood board for the summer collection. I have focused on vibrant colors and natural lighting as mentioned in the brief.',
        timestamp: new Date(Date.now() - 43200000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-1-6',
        sender: {
          id: 'user-1',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        content: '',
        timestamp: new Date(Date.now() - 43100000),
        status: 'read',
        type: 'file',
        attachment: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
          fileName: 'Summer_Collection_Moodboard.jpg',
          fileSize: 1024000
        }
      },
      {
        id: 'msg-1-7',
        sender: {
          id: 'current-user',
          name: 'Brand Manager',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        content: 'This looks fantastic! The mood board perfectly captures our brand vision. Please proceed with the photo shoot. Looking forward to seeing the content.',
        timestamp: new Date(Date.now() - 39600000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-1-8',
        sender: {
          id: 'user-1',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        content: 'I have uploaded the first set of photos for review. Please let me know your feedback!',
        timestamp: new Date(Date.now() - 300000),
        status: 'delivered',
        type: 'text'
      }
    ],
    'conv-2': [
      {
        id: 'msg-2-1',
        sender: {
          id: 'user-2',
          name: 'Rahul Mehta',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        },
        content: 'Hello! I am ready to start the tech gadget review campaign. Could you please share the product details and specifications?',
        timestamp: new Date(Date.now() - 172800000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-2-2',
        sender: {
          id: 'current-user',
          name: 'Brand Manager',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        content: 'Hi Rahul! Thanks for your interest. I will arrange for the product to be delivered to your address. The review should focus on performance, design, and value for money.',
        timestamp: new Date(Date.now() - 169200000),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-2-3',
        sender: {
          id: 'user-2',
          name: 'Rahul Mehta',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        },
        content: 'When can we schedule the product handover?',
        timestamp: new Date(Date.now() - 3600000),
        status: 'delivered',
        type: 'text'
      }
    ]
  };

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setShowConversationList(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    setMessages(mockMessages?.[conversation?.id] || []);
    
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleSendMessage = (content) => {
    if (!activeConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'current-user',
        name: 'Brand Manager',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      content,
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);
  };

  const handleFileUpload = async (file) => {
    if (!activeConversation) return;

    // Create file URL (in real app, this would be uploaded to server)
    const fileUrl = URL.createObjectURL(file);
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'current-user',
        name: 'Brand Manager',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      content: '',
      timestamp: new Date(),
      status: 'sent',
      type: 'file',
      attachment: {
        type: file?.type?.startsWith('image/') ? 'image' : 
              file?.type?.startsWith('video/') ? 'video' : 'file',
        url: fileUrl,
        fileName: file?.name,
        fileSize: file?.size,
        thumbnail: file?.type?.startsWith('image/') ? fileUrl : null
      }
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleMarkAsRead = (conversationId) => {
    // In real app, this would make API call to mark messages as read
    console.log('Marking conversation as read:', conversationId);
  };

  const handleViewCampaign = () => {
    navigate('/campaign-details');
  };

  const handleViewContract = () => {
    // In real app, this would open contract viewer
    console.log('Opening contract viewer');
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setActiveConversation(null);
  };

  // Add this block - handler for menu toggle
  const handleMenuToggle = () => {
    setShowConversationList(!showConversationList);
  };

  // Add this block - handler for new message
  const handleNewMessage = () => {
    console.log('Creating new message');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="brand" onMenuToggle={handleMenuToggle} />
      <div className="pt-16 h-screen flex">
        {/* Conversation List */}
        {(!isMobileView || showConversationList) && (
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={handleConversationSelect}
            onNewMessage={handleNewMessage}
          />
        )}

        {/* Main Message Area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          {isMobileView && activeConversation && (
            <div className="lg:hidden bg-card border-b border-border p-4 flex items-center space-x-3">
              <button
                onClick={handleBackToList}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <Image
                src={activeConversation?.participant?.avatar}
                alt={activeConversation?.participant?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-foreground">
                  {activeConversation?.participant?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {activeConversation?.campaign?.title}
                </p>
              </div>
            </div>
          )}

          {/* Campaign Context */}
          {activeConversation && (
            <CampaignContext
              campaign={activeConversation?.campaign}
              onViewCampaign={handleViewCampaign}
              onViewContract={handleViewContract}
            />
          )}

          {/* Message Area */}
          <MessageArea
            conversation={activeConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            typingUsers={typingUsers}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingCenter;
