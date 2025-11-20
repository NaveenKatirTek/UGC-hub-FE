import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const EarningsChart = ({ earningsData, chartType = 'line' }) => {
  const totalEarnings = earningsData?.reduce((sum, item) => sum + item?.earnings, 0);
  const avgEarnings = totalEarnings / earningsData?.length;
  const currentMonth = earningsData?.[earningsData?.length - 1]?.earnings || 0;
  const previousMonth = earningsData?.[earningsData?.length - 2]?.earnings || 0;
  const growthRate = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-card p-3 shadow-medium">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-primary">
            Earnings: ${payload?.[0]?.value?.toLocaleString()}
          </p>
          {payload?.[0]?.payload?.campaigns && (
            <p className="text-xs text-muted-foreground">
              Campaigns: {payload?.[0]?.payload?.campaigns}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Monthly Earnings</h3>
          <p className="text-sm text-muted-foreground">Track your income over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            {growthRate > 0 ? '+' : ''}{growthRate?.toFixed(1)}%
          </span>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-form p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Total Earnings</span>
          </div>
          <p className="text-xl font-bold text-foreground">${totalEarnings?.toLocaleString()}</p>
        </div>
        
        <div className="bg-muted/50 rounded-form p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="BarChart3" size={16} className="text-secondary" />
            <span className="text-xs text-muted-foreground">Average Monthly</span>
          </div>
          <p className="text-xl font-bold text-foreground">${avgEarnings?.toLocaleString()}</p>
        </div>
        
        <div className="bg-muted/50 rounded-form p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">This Month</span>
          </div>
          <p className="text-xl font-bold text-foreground">${currentMonth?.toLocaleString()}</p>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64" aria-label="Monthly Earnings Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${value?.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${value?.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="earnings" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Chart Type Toggle */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() => {}}
          className={`p-2 rounded-form transition-colors ${
            chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          title="Line Chart"
        >
          <Icon name="TrendingUp" size={16} />
        </button>
        <button
          onClick={() => {}}
          className={`p-2 rounded-form transition-colors ${
            chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          title="Bar Chart"
        >
          <Icon name="BarChart3" size={16} />
        </button>
      </div>
    </div>
  );
};

export default EarningsChart;