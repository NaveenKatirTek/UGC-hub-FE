import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BidStatusCard = ({ bid }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-success bg-success/10 border-success/20';
      case 'rejected': return 'text-error bg-error/10 border-error/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'in-progress': return 'text-primary bg-primary/10 border-primary/20';
      case 'completed': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'pending': return 'Clock';
      case 'in-progress': return 'Play';
      case 'completed': return 'CheckCircle2';
      default: return 'Circle';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimelineProgress = () => {
    if (bid?.status === 'rejected') return 0;
    if (bid?.status === 'pending') return 25;
    if (bid?.status === 'accepted') return 50;
    if (bid?.status === 'in-progress') return 75;
    if (bid?.status === 'completed') return 100;
    return 0;
  };

  return (
    <div className="bg-card border border-border rounded-card p-6 hover:shadow-medium transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
            <Image
              src={bid?.brandLogo}
              alt={bid?.brandLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{bid?.campaignTitle}</h4>
            <p className="text-sm text-muted-foreground">{bid?.brandName}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bid?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(bid?.status)} size={12} />
            <span className="capitalize">{bid?.status?.replace('-', ' ')}</span>
          </div>
        </div>
      </div>
      {/* Bid Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Bid Amount</p>
          <p className="font-semibold text-foreground">${bid?.bidAmount?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Applied On</p>
          <p className="text-sm text-foreground">{formatDate(bid?.appliedDate)}</p>
        </div>
      </div>
      {/* Timeline Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">{getTimelineProgress()}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${
              bid?.status === 'rejected' ? 'bg-error' : 'bg-gradient-to-r from-primary to-secondary'
            }`}
            style={{ width: `${getTimelineProgress()}%` }}
          ></div>
        </div>
      </div>
      {/* Timeline Info */}
      {bid?.timeline && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Deadline</span>
            <span className="text-foreground">{formatDate(bid?.timeline?.deadline)}</span>
          </div>
          {bid?.timeline?.startDate && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Start Date</span>
              <span className="text-foreground">{formatDate(bid?.timeline?.startDate)}</span>
            </div>
          )}
        </div>
      )}
      {/* Action Message */}
      {bid?.status === 'accepted' && (
        <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-form">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">Congratulations! Your bid was accepted.</span>
          </div>
        </div>
      )}
      {bid?.status === 'rejected' && bid?.rejectionReason && (
        <div className="mt-4 p-3 bg-error/5 border border-error/20 rounded-form">
          <div className="flex items-start space-x-2">
            <Icon name="XCircle" size={14} className="text-error mt-0.5" />
            <div>
              <p className="text-sm text-error font-medium mb-1">Bid not selected</p>
              <p className="text-xs text-muted-foreground">{bid?.rejectionReason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidStatusCard;