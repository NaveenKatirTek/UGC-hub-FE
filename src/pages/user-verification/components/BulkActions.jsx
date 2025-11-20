import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ 
  selectedUsers, 
  onSelectAll, 
  onDeselectAll, 
  onBulkAction, 
  totalUsers,
  isAllSelected 
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleBulkAction = (action) => {
    setPendingAction(action);
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    onBulkAction(selectedUsers, pendingAction);
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const cancelAction = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'approve': return 'Approve';
      case 'reject': return 'Reject';
      case 'request_info': return 'Request Information';
      case 'assign_reviewer': return 'Assign Reviewer';
      default: return action;
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approve': return 'Check';
      case 'reject': return 'X';
      case 'request_info': return 'MessageSquare';
      case 'assign_reviewer': return 'UserPlus';
      default: return 'Settings';
    }
  };

  const getActionVariant = (action) => {
    switch (action) {
      case 'approve': return 'success';
      case 'reject': return 'danger';
      default: return 'outline';
    }
  };

  if (selectedUsers?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isAllSelected}
              onChange={isAllSelected ? onDeselectAll : onSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              Select users to perform bulk actions
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {totalUsers} total users
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={isAllSelected}
              onChange={isAllSelected ? onDeselectAll : onSelectAll}
            />
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => handleBulkAction('approve')}
              iconName="Check"
              iconPosition="left"
            >
              Approve All
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleBulkAction('reject')}
              iconName="X"
              iconPosition="left"
            >
              Reject All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('request_info')}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Request Info
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('assign_reviewer')}
              iconName="UserPlus"
              iconPosition="left"
            >
              Assign Reviewer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              iconName="X"
            >
              Clear Selection
            </Button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Selected: {selectedUsers?.length} of {totalUsers} users
            </span>
            <div className="flex items-center space-x-4">
              <span>Brands: {selectedUsers?.filter(id => id?.includes('brand'))?.length}</span>
              <span>Creators: {selectedUsers?.filter(id => id?.includes('creator'))?.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                pendingAction === 'approve' ? 'bg-success/10' :
                pendingAction === 'reject' ? 'bg-error/10' : 'bg-warning/10'
              }`}>
                <Icon 
                  name={getActionIcon(pendingAction)} 
                  size={20} 
                  className={
                    pendingAction === 'approve' ? 'text-success' :
                    pendingAction === 'reject' ? 'text-error' : 'text-warning'
                  }
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Confirm Bulk Action
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-foreground mb-2">
                Are you sure you want to <strong>{getActionLabel(pendingAction)?.toLowerCase()}</strong> the following {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''}?
              </p>
              <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                <div className="text-xs text-muted-foreground space-y-1">
                  {selectedUsers?.slice(0, 5)?.map((userId, index) => (
                    <div key={index}>• User ID: {userId}</div>
                  ))}
                  {selectedUsers?.length > 5 && (
                    <div>• ... and {selectedUsers?.length - 5} more users</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={cancelAction}>
                Cancel
              </Button>
              <Button 
                variant={getActionVariant(pendingAction)}
                onClick={confirmAction}
                iconName={getActionIcon(pendingAction)}
                iconPosition="left"
              >
                {getActionLabel(pendingAction)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;