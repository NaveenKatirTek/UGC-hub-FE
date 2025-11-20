import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileSummaryCard = ({ profile }) => {
  const completionPercentage = Math.round((profile?.completedFields / profile?.totalFields) * 100);
  
  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-medium">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <Image
                src={profile?.avatar}
                alt={profile?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-card flex items-center justify-center ${getVerificationColor(profile?.verificationStatus)}`}>
              <Icon name={getVerificationIcon(profile?.verificationStatus)} size={14} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-xl font-semibold text-foreground">{profile?.name}</h2>
              <span className={`text-sm font-medium ${getVerificationColor(profile?.verificationStatus)}`}>
                {profile?.verificationStatus === 'verified' ? 'Verified' : 
                 profile?.verificationStatus === 'pending' ? 'Pending' : 'Unverified'}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{profile?.niche}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-foreground font-medium">{profile?.followerCount?.toLocaleString()}</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{profile?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground">${profile?.totalEarnings?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-primary">{profile?.activeCampaigns}</p>
            <p className="text-sm text-muted-foreground">Active Campaigns</p>
          </div>
          <div className="text-center lg:text-left col-span-2 lg:col-span-1">
            <p className="text-2xl font-bold text-secondary">{profile?.completedCampaigns}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>
      {/* Profile Completion */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className="text-sm font-medium text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        {completionPercentage < 100 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>Complete your profile to unlock more opportunities</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummaryCard;