import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const QuickInsightsChart = ({ 
  data = [],
  type = 'spending',
  title,
  loading = false 
}) => {
  const spendingData = [
    { month: 'Jan', spending: 12000, results: 8500, engagement: 15.2 },
    { month: 'Feb', spending: 15000, results: 11200, engagement: 18.7 },
    { month: 'Mar', spending: 18000, results: 14800, engagement: 22.1 },
    { month: 'Apr', spending: 22000, results: 18900, engagement: 25.4 },
    { month: 'May', spending: 25000, results: 22100, engagement: 28.9 },
    { month: 'Jun', spending: 28000, results: 25600, engagement: 31.2 }
  ];

  const engagementData = [
    { platform: 'Instagram', rate: 4.2, reach: 125000 },
    { platform: 'TikTok', rate: 6.8, reach: 89000 },
    { platform: 'YouTube', rate: 3.1, reach: 156000 },
    { platform: 'Twitter', rate: 2.4, reach: 78000 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-card p-3 shadow-prominent">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-muted-foreground capitalize">
                {entry?.dataKey}:
              </span>
              <span className="text-sm font-medium text-popover-foreground">
                {entry?.dataKey === 'spending' || entry?.dataKey === 'results' 
                  ? formatCurrency(entry?.value)
                  : entry?.dataKey === 'engagement' || entry?.dataKey === 'rate'
                  ? formatPercentage(entry?.value)
                  : entry?.value?.toLocaleString()
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-card p-6">
        <div className="animate-pulse">
          <div className="w-32 h-6 bg-muted rounded mb-4"></div>
          <div className="w-full h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const renderSpendingChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={spendingData}>
        <defs>
          <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="resultsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="month" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickFormatter={formatCurrency}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="spending"
          stroke="var(--color-primary)"
          fillOpacity={1}
          fill="url(#spendingGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="results"
          stroke="var(--color-success)"
          fillOpacity={1}
          fill="url(#resultsGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderEngagementChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={engagementData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="platform" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickFormatter={formatPercentage}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="rate" 
          fill="var(--color-secondary)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon 
            name={type === 'spending' ? 'TrendingUp' : 'BarChart3'} 
            size={20} 
            className="text-primary" 
          />
          <h3 className="text-lg font-semibold text-foreground">
            {title || (type === 'spending' ? 'Spending vs Results' : 'Engagement by Platform')}
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {type === 'spending' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs text-muted-foreground">Spending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Results</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full">
        {type === 'spending' ? renderSpendingChart() : renderEngagementChart()}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        {type === 'spending' ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">$130K</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">$101K</p>
              <p className="text-xs text-muted-foreground">Total Results</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">77.7%</p>
              <p className="text-xs text-muted-foreground">ROI</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.1%</p>
              <p className="text-xs text-muted-foreground">Avg. Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">448K</p>
              <p className="text-xs text-muted-foreground">Total Reach</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickInsightsChart;