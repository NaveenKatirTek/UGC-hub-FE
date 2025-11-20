import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, disabled = false, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of files) {
        // Validate file size (10MB limit)
        if (file?.size > 10 * 1024 * 1024) {
          alert(`File ${file?.name} is too large. Maximum size is 10MB.`);
          continue;
        }

        // Validate file type
        const allowedTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/webp',
          'video/mp4', 'video/webm', 'video/quicktime',
          'application/pdf', 'text/plain',
          'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes?.includes(file?.type)) {
          alert(`File type ${file?.type} is not supported.`);
          continue;
        }

        await onFileUpload(file);
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-end space-x-3">
        {/* File Upload */}
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={triggerFileUpload}
            disabled={disabled || isUploading}
            title="Attach file"
          >
            {isUploading ? (
              <Icon name="Loader2" size={18} className="animate-spin" />
            ) : (
              <Icon name="Paperclip" size={18} />
            )}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Character Count */}
          {message?.length > 0 && (
            <div className="absolute bottom-1 right-12 text-xs text-muted-foreground">
              {message?.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message?.trim() || disabled || message?.length > 1000}
          size="icon"
          className="rounded-full h-11 w-11"
        >
          <Icon name="Send" size={18} />
        </Button>
      </div>
      {/* File Upload Progress */}
      {isUploading && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Upload" size={14} />
          <span>Uploading file...</span>
        </div>
      )}
      {/* Input Guidelines */}
      <div className="mt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line • Max 1000 characters • Files up to 10MB
      </div>
    </div>
  );
};

export default MessageInput;