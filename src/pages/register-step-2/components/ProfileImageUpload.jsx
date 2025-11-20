import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileImageUpload = ({ 
  value, 
  onChange, 
  error,
  label = 'Profile Picture Upload',
  acceptedFormats = '.jpeg,.jpg,.png',
  maxSize = 2
}) => {
  const [preview, setPreview] = useState(value || null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    
    if (!file) return;

    // Validate file type
    const validFormats = acceptedFormats?.split(',')?.map(f => f?.trim());
    const fileExtension = `.${file?.name?.split('.')?.pop()?.toLowerCase()}`;
    
    if (!validFormats?.includes(fileExtension)) {
      setUploadError(`Only ${acceptedFormats} formats are allowed`);
      return;
    }

    // Validate file size (in MB)
    const fileSizeMB = file?.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setUploadError(`File size must be less than ${maxSize} MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader?.result);
      onChange?.(reader?.result);
      setUploadError('');
    };
    reader?.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        <span className="text-destructive ml-1">*</span>
      </label>
      
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Profile preview"
              className="w-24 h-24 rounded-lg object-cover border-2 border-border"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
            <Icon name="User" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats}
            onChange={handleFileChange}
            className="hidden"
            id="profile-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef?.current?.click()}
            iconName="Upload"
            iconPosition="left"
          >
            Choose Image
          </Button>
          <p className="text-xs text-muted-foreground">
            Accepted: {acceptedFormats} (Max {maxSize} MB)
          </p>
        </div>
      </div>

      {(error || uploadError) && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <Icon name="AlertCircle" size={14} />
          {error || uploadError}
        </p>
      )}
    </div>
  );
};

export default ProfileImageUpload;