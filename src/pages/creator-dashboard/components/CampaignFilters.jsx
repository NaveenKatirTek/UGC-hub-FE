import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CampaignFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    category: activeFilters?.category || '',
    budgetRange: activeFilters?.budgetRange || '',
    sortBy: activeFilters?.sortBy || 'newest',
    minFollowers: activeFilters?.minFollowers || '',
    searchQuery: activeFilters?.searchQuery || ''
  });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'fashion', label: 'Fashion & Style' },
    { value: 'beauty', label: 'Beauty & Cosmetics' },
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel & Lifestyle' },
    { value: 'tech', label: 'Technology' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'finance', label: 'Finance & Business' }
  ];

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-500', label: '$0 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget-high', label: 'Highest Budget' },
    { value: 'budget-low', label: 'Lowest Budget' },
    { value: 'deadline', label: 'Deadline Soon' },
    { value: 'applicants', label: 'Least Competition' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: '',
      budgetRange: '',
      sortBy: 'newest',
      minFollowers: '',
      searchQuery: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'newest')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-card p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filter Campaigns</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search campaigns by title, brand, or keywords..."
          value={filters?.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="Select category"
        />
        
        <Select
          label="Budget Range"
          options={budgetOptions}
          value={filters?.budgetRange}
          onChange={(value) => handleFilterChange('budgetRange', value)}
          placeholder="Select budget"
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Minimum Followers Required"
              placeholder="e.g., 10000"
              value={filters?.minFollowers}
              onChange={(e) => handleFilterChange('minFollowers', e?.target?.value)}
              description="Filter by minimum follower requirement"
            />
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Campaign Type</label>
              <div className="flex flex-wrap gap-2">
                {['Sponsored Post', 'Product Review', 'Brand Ambassador', 'Event Coverage', 'Giveaway']?.map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1 text-xs rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex flex-wrap gap-2">
            {filters?.category && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <span>Category: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}</span>
                <button onClick={() => handleFilterChange('category', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.budgetRange && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <span>Budget: {budgetOptions?.find(opt => opt?.value === filters?.budgetRange)?.label}</span>
                <button onClick={() => handleFilterChange('budgetRange', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.minFollowers && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <span>Min Followers: {parseInt(filters?.minFollowers)?.toLocaleString()}</span>
                <button onClick={() => handleFilterChange('minFollowers', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignFilters;