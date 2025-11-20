import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompetitionInsights = ({ insights }) => {
  const bidDistributionData = [
    { range: '₹5K-10K', count: 12 },
    { range: '₹10K-15K', count: 18 },
    { range: '₹15K-20K', count: 8 },
    { range: '₹20K+', count: 4 }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
        Competition Insights
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{insights?.totalBids}</p>
          <p className="text-xs text-muted-foreground">Total Bids</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="DollarSign" size={20} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹{insights?.averageBid?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">Average Bid</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="ArrowUp" size={20} className="text-error" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹{insights?.highestBid?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">Highest Bid</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="ArrowDown" size={20} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">₹{insights?.lowestBid?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">Lowest Bid</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Bid Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bidDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Competition Level</span>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              insights?.competitionLevel === 'High' ?'bg-error/10 text-error'
                : insights?.competitionLevel === 'Medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
            }`}>
              {insights?.competitionLevel}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on bid volume and creator interest
          </p>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Recommended Bid</span>
            <span className="text-sm font-semibold text-primary">
              ₹{insights?.recommendedBid?.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Competitive bid range for selection
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Bids between ₹{insights?.recommendedBid - 2000} - ₹{insights?.recommendedBid + 2000} have 
              the highest acceptance rate for similar campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionInsights;