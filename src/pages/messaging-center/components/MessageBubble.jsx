import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isOwn, showAvatar = true, isGrouped = false }) => {
  const [imageError, setImageError] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleFileDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const renderFileAttachment = () => {
    if (!message?.attachment) return null;

    const { type, url, fileName, fileSize, thumbnail } = message?.attachment;

    if (type === 'image') {
      return (
        <div className="mt-2 max-w-xs">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={url}
                alt={fileName}
                className="w-full h-auto max-h-64 object-cover cursor-pointer"
                onClick={() => window.open(url, '_blank')}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-muted">
                <Icon name="ImageOff" size={24} className="text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
              <Icon name="Download" size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-1 px-1">
            <span className="text-xs text-muted-foreground truncate">{fileName}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleFileDownload(url, fileName)}
              className="h-6 w-6"
            >
              <Icon name="Download" size={12} />
            </Button>
          </div>
        </div>
      );
    }

    if (type === 'video') {
      return (
        <div className="mt-2 max-w-xs">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            {thumbnail && !imageError ? (
              <div className="relative">
                <Image
                  src={thumbnail}
                  alt={fileName}
                  className="w-full h-32 object-cover"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-gray-800 ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-muted">
                <Icon name="Video" size={24} className="text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-1 px-1">
            <div>
              <span className="text-xs text-muted-foreground truncate block">{fileName}</span>
              <span className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleFileDownload(url, fileName)}
              className="h-6 w-6"
            >
              <Icon name="Download" size={12} />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-2 max-w-xs">
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="flex-shrink-0">
            <Icon name="File" size={20} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFileDownload(url, fileName)}
            className="h-8 w-8"
          >
            <Icon name="Download" size={14} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${isGrouped ? 'mt-1' : 'mt-4'}`}>
      <div className={`flex max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="flex-shrink-0 mr-3">
            <Image
              src={message?.sender?.avatar}
              alt={message?.sender?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}

        {/* Message Content */}
        <div className={`${isOwn ? 'mr-3' : ''}`}>
          {/* Sender Name (for group chats) */}
          {!isOwn && !isGrouped && (
            <p className="text-xs text-muted-foreground mb-1 px-1">
              {message?.sender?.name}
            </p>
          )}

          {/* Message Bubble */}
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            }`}
          >
            {message?.content && (
              <p className="text-sm whitespace-pre-wrap break-words">
                {message?.content}
              </p>
            )}
            
            {renderFileAttachment()}
          </div>

          {/* Message Info */}
          <div className={`flex items-center mt-1 px-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-muted-foreground">
              {formatTime(message?.timestamp)}
            </span>
            
            {isOwn && (
              <div className="ml-2 flex items-center">
                {message?.status === 'sent' && (
                  <Icon name="Check" size={12} className="text-muted-foreground" />
                )}
                {message?.status === 'delivered' && (
                  <div className="flex">
                    <Icon name="Check" size={12} className="text-muted-foreground -mr-1" />
                    <Icon name="Check" size={12} className="text-muted-foreground" />
                  </div>
                )}
                {message?.status === 'read' && (
                  <div className="flex">
                    <Icon name="Check" size={12} className="text-primary -mr-1" />
                    <Icon name="Check" size={12} className="text-primary" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;