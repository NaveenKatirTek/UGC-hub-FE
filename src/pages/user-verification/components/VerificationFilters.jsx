import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const VerificationFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  totalCount, 
  filteredCount 
}) => {
  const accountTypeOptions = [
    { value: 'all', label: 'All Account Types' },
    { value: 'brand', label: 'Brands' },
    { value: 'creator', label: 'Creators' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <span className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalCount} users
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by name, email, or company..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Account Type"
          options={accountTypeOptions}
          value={filters?.accountType}
          onChange={(value) => handleFilterChange('accountType', value)}
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          placeholder="Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />

        <Select
          placeholder="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>High Priority ({filters?.counts?.high || 0})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Fraud Alerts ({filters?.counts?.fraudAlerts || 0})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Verified ({filters?.counts?.verified || 0})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('showFraudOnly', !filters?.showFraudOnly)}
            className={filters?.showFraudOnly ? 'bg-warning/10 border-warning' : ''}
          >
            <Icon name="AlertTriangle" size={14} className="mr-2" />
            Fraud Alerts Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('showHighPriorityOnly', !filters?.showHighPriorityOnly)}
            className={filters?.showHighPriorityOnly ? 'bg-error/10 border-error' : ''}
          >
            <Icon name="AlertCircle" size={14} className="mr-2" />
            High Priority Only
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationFilters;