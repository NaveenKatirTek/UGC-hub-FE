import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      type: 'brand',
      status: 'pending',
      joinDate: '2024-09-28',
      followers: null,
      campaigns: 0,
      revenue: '₹0'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      type: 'creator',
      status: 'verified',
      joinDate: '2024-09-25',
      followers: '45.2K',
      campaigns: 12,
      revenue: '₹24,500'
    },
    {
      id: 3,
      name: 'Fashion Forward',
      email: 'hello@fashionforward.in',
      type: 'brand',
      status: 'verified',
      joinDate: '2024-09-20',
      followers: null,
      campaigns: 8,
      revenue: '₹1,25,000'
    },
    {
      id: 4,
      name: 'Rahul Kumar',
      email: 'rahul.creator@gmail.com',
      type: 'creator',
      status: 'under_review',
      joinDate: '2024-09-30',
      followers: '28.7K',
      campaigns: 3,
      revenue: '₹8,750'
    },
    {
      id: 5,
      name: 'BeautyBrand Inc.',
      email: 'team@beautybrand.co.in',
      type: 'brand',
      status: 'verified',
      joinDate: '2024-08-15',
      followers: null,
      campaigns: 15,
      revenue: '₹2,45,000'
    },
    {
      id: 6,
      name: 'Anita Foodie',
      email: 'anita.foodie@outlook.com',
      type: 'creator',
      status: 'suspended',
      joinDate: '2024-07-10',
      followers: '67.3K',
      campaigns: 18,
      revenue: '₹45,200'
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'brand', label: 'Brands' },
    { value: 'creator', label: 'Creators' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'verified', label: 'Verified' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
      verified: { color: 'bg-success/10 text-success border-success/20', label: 'Verified' },
      under_review: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Under Review' },
      suspended: { color: 'bg-error/10 text-error border-error/20', label: 'Suspended' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    return type === 'brand' ? 'Building2' : 'User';
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = filterType === 'all' || user?.type === filterType;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-lg font-semibold text-foreground">User Management</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="sm:w-64"
            />
            
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              className="sm:w-40"
            />
            
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              className="sm:w-40"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Join Date</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Followers</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Campaigns</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Revenue</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name={getTypeIcon(user?.type)} size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground capitalize">{user?.type}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {new Date(user.joinDate)?.toLocaleDateString('en-IN')}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {user?.followers || '-'}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{user?.campaigns}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-foreground">{user?.revenue}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="xs">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="xs">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="xs">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No users found matching your criteria</p>
        </div>
      )}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers?.length} of {users?.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="text-sm text-foreground px-3 py-1">1</span>
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;