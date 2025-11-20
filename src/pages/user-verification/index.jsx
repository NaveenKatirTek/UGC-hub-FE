import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import UserCard from './components/UserCard';
import VerificationFilters from './components/VerificationFilters';
import UserDetailsModal from './components/UserDetailsModal';
import BulkActions from './components/BulkActions';
import VerificationStats from './components/VerificationStats';

const UserVerification = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    accountType: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'newest',
    showFraudOnly: false,
    showHighPriorityOnly: false,
    counts: {
      high: 8,
      fraudAlerts: 3,
      verified: 156
    }
  });

  const usersPerPage = 12;

  // Mock data for users pending verification
  const mockUsers = [
    {
      id: 'brand_001',
      name: 'Rajesh Kumar',
      email: 'rajesh@techstartup.in',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      accountType: 'brand',
      status: 'pending',
      priority: 'high',
      submissionDate: '2025-09-28T10:30:00Z',
      registrationDate: '2025-09-28T10:30:00Z',
      isVerified: false,
      companyName: 'TechStart Solutions',
      industry: 'Technology',
      companySize: '10-50 employees',
      website: 'https://techstart.in',
      documentsCount: 4,
      fraudAlerts: ['Suspicious email domain pattern'],
      documents: [
        { name: 'Business Registration.pdf', type: 'PDF', size: '2.3 MB' },
        { name: 'GST Certificate.pdf', type: 'PDF', size: '1.8 MB' },
        { name: 'PAN Card.jpg', type: 'Image', size: '856 KB' },
        { name: 'Address Proof.pdf', type: 'PDF', size: '1.2 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-28T10:30:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        }
      ]
    },
    {
      id: 'creator_001',
      name: 'Priya Sharma',
      email: 'priya.lifestyle@gmail.com',
      phone: '+91 87654 32109',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      accountType: 'creator',
      status: 'under_review',
      priority: 'medium',
      submissionDate: '2025-09-27T14:20:00Z',
      registrationDate: '2025-09-27T14:20:00Z',
      isVerified: false,
      niche: 'Lifestyle & Fashion',
      contentType: 'Instagram Reels, Posts',
      followersCount: 45000,
      engagementRate: 4.2,
      documentsCount: 3,
      fraudAlerts: [],
      socialMedia: [
        {
          platform: 'instagram',
          handle: '@priya_lifestyle',
          followers: 45000,
          engagement: 4.2,
          authenticity: 85,
          verified: true,
          fraudAlerts: []
        },
        {
          platform: 'youtube',
          handle: 'Priya Lifestyle',
          followers: 12000,
          engagement: 3.8,
          authenticity: 78,
          verified: false,
          fraudAlerts: ['Low engagement rate for follower count']
        }
      ],
      documents: [
        { name: 'Aadhar Card.pdf', type: 'PDF', size: '1.1 MB' },
        { name: 'PAN Card.jpg', type: 'Image', size: '654 KB' },
        { name: 'Bank Statement.pdf', type: 'PDF', size: '2.8 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-27T14:20:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        },
        {
          action: 'under_review',
          timestamp: '2025-09-28T09:15:00Z',
          adminName: 'Admin User',
          notes: 'Started verification process'
        }
      ]
    },
    {
      id: 'brand_002',
      name: 'Amit Patel',
      email: 'amit@fashionhub.co.in',
      phone: '+91 76543 21098',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      accountType: 'brand',
      status: 'pending',
      priority: 'low',
      submissionDate: '2025-09-26T16:45:00Z',
      registrationDate: '2025-09-26T16:45:00Z',
      isVerified: false,
      companyName: 'Fashion Hub India',
      industry: 'Fashion & Retail',
      companySize: '50-200 employees',
      website: 'https://fashionhub.co.in',
      documentsCount: 5,
      fraudAlerts: [],
      documents: [
        { name: 'Company Registration.pdf', type: 'PDF', size: '3.1 MB' },
        { name: 'Trade License.pdf', type: 'PDF', size: '1.9 MB' },
        { name: 'GST Certificate.pdf', type: 'PDF', size: '1.5 MB' },
        { name: 'Director ID Proof.pdf', type: 'PDF', size: '2.2 MB' },
        { name: 'Bank Details.pdf', type: 'PDF', size: '1.7 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-26T16:45:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        }
      ]
    },
    {
      id: 'creator_002',
      name: 'Arjun Singh',
      email: 'arjun.fitness@yahoo.com',
      phone: '+91 65432 10987',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      accountType: 'creator',
      status: 'pending',
      priority: 'high',
      submissionDate: '2025-09-25T11:30:00Z',
      registrationDate: '2025-09-25T11:30:00Z',
      isVerified: false,
      niche: 'Fitness & Health',
      contentType: 'YouTube Videos, Instagram Posts',
      followersCount: 125000,
      engagementRate: 6.8,
      documentsCount: 4,
      fraudAlerts: ['Sudden follower spike detected', 'Engagement pattern anomaly'],
      socialMedia: [
        {
          platform: 'instagram',
          handle: '@arjun_fitness',
          followers: 85000,
          engagement: 7.2,
          authenticity: 65,
          verified: false,
          fraudAlerts: ['Sudden follower increase', 'Bot-like engagement pattern']
        },
        {
          platform: 'youtube',
          handle: 'Arjun Fitness',
          followers: 40000,
          engagement: 5.9,
          authenticity: 72,
          verified: true,
          fraudAlerts: []
        }
      ],
      documents: [
        { name: 'Identity Proof.pdf', type: 'PDF', size: '1.3 MB' },
        { name: 'Address Proof.pdf', type: 'PDF', size: '1.1 MB' },
        { name: 'Fitness Certification.pdf', type: 'PDF', size: '2.4 MB' },
        { name: 'Bank Details.pdf', type: 'PDF', size: '1.6 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-25T11:30:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        }
      ]
    },
    {
      id: 'creator_003',
      name: 'Sneha Gupta',
      email: 'sneha.food@gmail.com',
      phone: '+91 54321 09876',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      accountType: 'creator',
      status: 'approved',
      priority: 'medium',
      submissionDate: '2025-09-24T09:15:00Z',
      registrationDate: '2025-09-24T09:15:00Z',
      isVerified: true,
      niche: 'Food & Cooking',
      contentType: 'Instagram Reels, YouTube Shorts',
      followersCount: 78000,
      engagementRate: 5.4,
      documentsCount: 3,
      fraudAlerts: [],
      socialMedia: [
        {
          platform: 'instagram',
          handle: '@sneha_foodie',
          followers: 78000,
          engagement: 5.4,
          authenticity: 92,
          verified: true,
          fraudAlerts: []
        }
      ],
      documents: [
        { name: 'ID Proof.pdf', type: 'PDF', size: '1.0 MB' },
        { name: 'Address Proof.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'Bank Statement.pdf', type: 'PDF', size: '2.1 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-24T09:15:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        },
        {
          action: 'approved',
          timestamp: '2025-09-24T15:30:00Z',
          adminName: 'Admin User',
          notes: 'All documents verified successfully'
        }
      ]
    },
    {
      id: 'brand_003',
      name: 'Kavya Reddy',
      email: 'kavya@beautybrands.in',
      phone: '+91 43210 98765',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      accountType: 'brand',
      status: 'rejected',
      priority: 'low',
      submissionDate: '2025-09-23T13:20:00Z',
      registrationDate: '2025-09-23T13:20:00Z',
      isVerified: false,
      companyName: 'Beauty Brands India',
      industry: 'Beauty & Cosmetics',
      companySize: '10-50 employees',
      website: 'https://beautybrands.in',
      documentsCount: 2,
      fraudAlerts: [],
      documents: [
        { name: 'Business License.pdf', type: 'PDF', size: '1.8 MB' },
        { name: 'Tax Registration.pdf', type: 'PDF', size: '1.4 MB' }
      ],
      verificationHistory: [
        {
          action: 'submitted',
          timestamp: '2025-09-23T13:20:00Z',
          adminName: 'System',
          notes: 'Initial submission received'
        },
        {
          action: 'rejected',
          timestamp: '2025-09-23T18:45:00Z',
          adminName: 'Admin User',
          notes: 'Incomplete documentation - missing GST certificate and director ID proof'
        }
      ]
    }
  ];

  const mockStats = {
    pending: 24,
    underReview: 8,
    approvedToday: 12,
    rejectedToday: 3,
    fraudAlerts: 5,
    highPriority: 8,
    yesterday: {
      'Approved Today': 8,
      'Rejected Today': 5,
      'High Priority': 6
    }
  };

  // Filter and sort users
  const filteredUsers = mockUsers?.filter(user => {
    if (filters?.search && !user?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !user?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !(user?.companyName && user?.companyName?.toLowerCase()?.includes(filters?.search?.toLowerCase()))) {
      return false;
    }
    if (filters?.accountType !== 'all' && user?.accountType !== filters?.accountType) {
      return false;
    }
    if (filters?.status !== 'all' && user?.status !== filters?.status) {
      return false;
    }
    if (filters?.priority !== 'all' && user?.priority !== filters?.priority) {
      return false;
    }
    if (filters?.showFraudOnly && (!user?.fraudAlerts || user?.fraudAlerts?.length === 0)) {
      return false;
    }
    if (filters?.showHighPriorityOnly && user?.priority !== 'high') {
      return false;
    }
    return true;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'newest':
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      case 'oldest':
        return new Date(a.submissionDate) - new Date(b.submissionDate);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'name':
        return a?.name?.localeCompare(b?.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleUserSelection = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = () => {
    setSelectedUsers(paginatedUsers?.map(user => user?.id));
  };

  const handleDeselectAll = () => {
    setSelectedUsers([]);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleQuickAction = (userId, action) => {
    console.log(`Quick action: ${action} for user ${userId}`);
    // Handle quick action logic here
  };

  const handleUserAction = (userId, action, notes) => {
    console.log(`User action: ${action} for user ${userId} with notes: ${notes}`);
    setShowUserModal(false);
    // Handle user action logic here
  };

  const handleBulkAction = (userIds, action) => {
    console.log(`Bulk action: ${action} for users:`, userIds);
    setSelectedUsers([]);
    // Handle bulk action logic here
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      accountType: 'all',
      status: 'all',
      priority: 'all',
      sortBy: 'newest',
      showFraudOnly: false,
      showHighPriorityOnly: false,
      counts: filters?.counts
    });
    setCurrentPage(1);
  };

  const isAllSelected = paginatedUsers?.length > 0 && 
    paginatedUsers?.every(user => selectedUsers?.includes(user?.id));

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="admin" 
        onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        userRole="admin" 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Verification</h1>
              <p className="text-muted-foreground">
                Review and approve brand and creator registrations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download">
                Export Data
              </Button>
              <Button variant="outline" iconName="RefreshCw">
                Refresh
              </Button>
            </div>
          </div>

          {/* Verification Stats */}
          <VerificationStats stats={mockStats} />

          {/* Filters */}
          <VerificationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalCount={mockUsers?.length}
            filteredCount={filteredUsers?.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedUsers={selectedUsers}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkAction={handleBulkAction}
            totalUsers={paginatedUsers?.length}
            isAllSelected={isAllSelected}
          />

          {/* Users Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {paginatedUsers?.map((user) => (
              <div key={user?.id} className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => handleUserSelection(user?.id, e?.target?.checked)}
                    className="bg-card/80 backdrop-blur-sm"
                  />
                </div>
                <UserCard
                  user={user}
                  onViewDetails={handleViewDetails}
                  onQuickAction={handleQuickAction}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers?.length)} of {filteredUsers?.length} users
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                >
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onAction={handleUserAction}
      />
    </div>
  );
};

export default UserVerification;