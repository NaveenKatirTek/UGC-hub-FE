import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserDetailsModal = ({ user, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'social', label: 'Social Media', icon: 'Share2' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const handleAction = (action) => {
    onAction(user?.id, action, notes);
    setNotes('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          {user?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">{user?.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="text-foreground font-medium">{user?.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <p className="text-foreground font-medium">{user?.phone}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Account Type:</span>
              <p className="text-foreground font-medium capitalize">{user?.accountType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Registration Date:</span>
              <p className="text-foreground font-medium">{formatDate(user?.registrationDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {user?.accountType === 'brand' && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Business Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Company Name:</span>
              <p className="text-foreground font-medium">{user?.companyName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Industry:</span>
              <p className="text-foreground font-medium">{user?.industry}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Company Size:</span>
              <p className="text-foreground font-medium">{user?.companySize}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Website:</span>
              <p className="text-foreground font-medium">{user?.website}</p>
            </div>
          </div>
        </div>
      )}

      {user?.accountType === 'creator' && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Creator Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Niche:</span>
              <p className="text-foreground font-medium">{user?.niche}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Content Type:</span>
              <p className="text-foreground font-medium">{user?.contentType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Followers:</span>
              <p className="text-foreground font-medium">{user?.followersCount?.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Engagement Rate:</span>
              <p className="text-foreground font-medium">{user?.engagementRate}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Uploaded Documents</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {user?.documents?.map((doc, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                <p className="text-xs text-muted-foreground">{doc?.type}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{doc?.size}</span>
              <Button variant="ghost" size="sm">
                <Icon name="Eye" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground">Social Media Verification</h4>
      {user?.socialMedia?.map((platform, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Share2" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground capitalize">{platform?.platform}</p>
                <p className="text-sm text-muted-foreground">{platform?.handle}</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              platform?.verified ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
            }`}>
              {platform?.verified ? 'Verified' : 'Pending'}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Followers:</span>
              <p className="text-foreground font-medium">{platform?.followers?.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Engagement:</span>
              <p className="text-foreground font-medium">{platform?.engagement}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Authenticity:</span>
              <p className={`font-medium ${platform?.authenticity > 80 ? 'text-success' : platform?.authenticity > 60 ? 'text-warning' : 'text-error'}`}>
                {platform?.authenticity}%
              </p>
            </div>
          </div>
          {platform?.fraudAlerts && platform?.fraudAlerts?.length > 0 && (
            <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="AlertTriangle" size={14} className="text-error" />
                <span className="text-sm font-medium text-error">Fraud Alerts</span>
              </div>
              <ul className="text-xs text-error space-y-1">
                {platform?.fraudAlerts?.map((alert, alertIndex) => (
                  <li key={alertIndex}>• {alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Verification History</h4>
      <div className="space-y-3">
        {user?.verificationHistory?.map((entry, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              entry?.action === 'approved' ? 'bg-success' : 
              entry?.action === 'rejected' ? 'bg-error' : 'bg-warning'
            }`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground capitalize">{entry?.action}</p>
                <span className="text-xs text-muted-foreground">{formatDate(entry?.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground">By: {entry?.adminName}</p>
              {entry?.notes && (
                <p className="text-sm text-foreground mt-2 p-2 bg-muted/50 rounded">{entry?.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">User Verification Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex">
          <div className="w-64 border-r border-border p-4">
            <nav className="space-y-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                    activeTab === tab?.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="text-sm font-medium">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'documents' && renderDocumentsTab()}
            {activeTab === 'social' && renderSocialTab()}
            {activeTab === 'history' && renderHistoryTab()}
          </div>
        </div>

        <div className="border-t border-border p-6">
          <div className="flex items-start space-x-4 mb-4">
            <Input
              type="text"
              placeholder="Add verification notes..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="success"
                onClick={() => handleAction('approve')}
                iconName="Check"
                iconPosition="left"
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleAction('reject')}
                iconName="X"
                iconPosition="left"
              >
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAction('request_info')}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Request Info
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;