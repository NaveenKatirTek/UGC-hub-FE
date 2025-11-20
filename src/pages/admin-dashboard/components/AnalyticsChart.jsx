import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsChart = () => {
  const [chartType, setChartType] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7days');

  const revenueData = [
    { name: 'Mon', value: 45000, campaigns: 12 },
    { name: 'Tue', value: 52000, campaigns: 15 },
    { name: 'Wed', value: 38000, campaigns: 9 },
    { name: 'Thu', value: 67000, campaigns: 18 },
    { name: 'Fri', value: 71000, campaigns: 21 },
    { name: 'Sat', value: 58000, campaigns: 16 },
    { name: 'Sun', value: 49000, campaigns: 13 }
  ];

  const userGrowthData = [
    { name: 'Jan', brands: 45, creators: 120 },
    { name: 'Feb', brands: 52, creators: 145 },
    { name: 'Mar', brands: 61, creators: 178 },
    { name: 'Apr', brands: 58, creators: 165 },
    { name: 'May', brands: 67, creators: 198 },
    { name: 'Jun', brands: 74, creators: 225 },
    { name: 'Jul', brands: 82, creators: 267 },
    { name: 'Aug', brands: 89, creators: 298 },
    { name: 'Sep', brands: 95, creators: 324 }
  ];

  const campaignStatusData = [
    { name: 'Active', value: 45, color: '#10B981' },
    { name: 'Completed', value: 78, color: '#2563EB' },
    { name: 'Pending', value: 23, color: '#F59E0B' },
    { name: 'Cancelled', value: 8, color: '#EF4444' }
  ];

  const chartOptions = [
    { value: 'revenue', label: 'Revenue Analytics' },
    { value: 'users', label: 'User Growth' },
    { value: 'campaigns', label: 'Campaign Status' }
  ];

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const formatCurrency = (value) => {
    return `₹${(value / 1000)?.toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey === 'value' ? 'Revenue: ' : `${entry?.dataKey}: `}
              {entry?.dataKey === 'value' ? formatCurrency(entry?.value) : entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'users':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="brands" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="creators" 
                stroke="var(--color-secondary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'campaigns':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {campaignStatusData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartStats = () => {
    switch (chartType) {
      case 'revenue':
        const totalRevenue = revenueData?.reduce((sum, item) => sum + item?.value, 0);
        const avgRevenue = totalRevenue / revenueData?.length;
        return [
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: 'TrendingUp' },
          { label: 'Average Daily', value: formatCurrency(avgRevenue), icon: 'BarChart3' },
          { label: 'Peak Day', value: 'Friday', icon: 'Calendar' }
        ];

      case 'users':
        const latestData = userGrowthData?.[userGrowthData?.length - 1];
        return [
          { label: 'Total Brands', value: latestData?.brands?.toString(), icon: 'Building2' },
          { label: 'Total Creators', value: latestData?.creators?.toString(), icon: 'Users' },
          { label: 'Growth Rate', value: '+12.5%', icon: 'TrendingUp' }
        ];

      case 'campaigns':
        const totalCampaigns = campaignStatusData?.reduce((sum, item) => sum + item?.value, 0);
        return [
          { label: 'Total Campaigns', value: totalCampaigns?.toString(), icon: 'Target' },
          { label: 'Success Rate', value: '89.2%', icon: 'CheckCircle' },
          { label: 'Active Now', value: '45', icon: 'Play' }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-lg font-semibold text-foreground">Analytics Dashboard</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Select
              options={chartOptions}
              value={chartType}
              onChange={setChartType}
              className="sm:w-48"
            />
            
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="sm:w-40"
            />
            
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Chart Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {getChartStats()?.map((stat, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Icon name={stat?.icon} size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                  <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full">
          {renderChart()}
        </div>

        {/* Legend for Campaign Status */}
        {chartType === 'campaigns' && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {campaignStatusData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-foreground">
                  {item?.name} ({item?.value})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;