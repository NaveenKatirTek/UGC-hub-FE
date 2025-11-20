import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationCard = ({
  status,
  email,
  role,
  errorMessage,
  resendCooldown,
  isResending,
  onResend,
  onOpenEmail,
  onBackToLogin
}) => {
  const statusConfig = {
    pending: {
      icon: 'Mail',
      iconColor: 'text-primary',
      title: 'Check Your Email',
      description: 'We\'ve sent a verification link to',
      bgColor: 'bg-primary/10'
    },
    verifying: {
      icon: 'Loader2',
      iconColor: 'text-primary animate-spin',
      title: 'Verifying...',
      description: 'Please wait while we verify your email address',
      bgColor: 'bg-primary/10'
    },
    success: {
      icon: 'CheckCircle',
      iconColor: 'text-green-600',
      title: 'Email Verified!',
      description: 'Your account has been successfully verified',
      bgColor: 'bg-green-50'
    },
    error: {
      icon: 'XCircle',
      iconColor: 'text-destructive',
      title: 'Verification Failed',
      description: errorMessage || 'Unable to verify your email',
      bgColor: 'bg-destructive/10'
    },
    expired: {
      icon: 'Clock',
      iconColor: 'text-orange-600',
      title: 'Link Expired',
      description: errorMessage || 'This verification link has expired',
      bgColor: 'bg-orange-50'
    },
    resent: {
      icon: 'Send',
      iconColor: 'text-green-600',
      title: 'Email Sent!',
      description: 'Check your inbox for a new verification link',
      bgColor: 'bg-green-50'
    }
  };

  const currentStatus = statusConfig?.[status] || statusConfig?.pending;

  return (
    <div className="bg-card rounded-2xl shadow-elevation-3 p-6 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${currentStatus?.bgColor} mb-6`}>
            <Icon 
              name={currentStatus?.icon} 
              size={40} 
              className={currentStatus?.iconColor}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {currentStatus?.title}
          </h2>
          
          <p className="text-muted-foreground mb-2">
            {currentStatus?.description}
          </p>
          
          {(status === 'pending' || status === 'resent') && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <Icon name="Mail" size={16} className="text-primary" />
              <p className="font-medium text-foreground">
                {email}
              </p>
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <p className="text-sm text-muted-foreground">
                Redirecting you to sign in...
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="space-y-3 mt-8">
        {(status === 'pending' || status === 'resent') && (
          <>
            <Button
              variant="default"
              size="lg"
              onClick={onOpenEmail}
              iconName="ExternalLink"
              iconPosition="right"
              className="w-full gradient-primary"
            >
              Open Email App
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onResend}
              disabled={resendCooldown > 0 || isResending}
              loading={isResending}
              iconName="RefreshCw"
              iconPosition="left"
              className="w-full"
            >
              {resendCooldown > 0 
                ? `Resend in ${resendCooldown}s` 
                : isResending 
                  ? 'Sending...' :'Resend Verification Email'
              }
            </Button>
          </>
        )}

        {(status === 'error' || status === 'expired') && (
          <>
            <Button
              variant="default"
              size="lg"
              onClick={onResend}
              disabled={resendCooldown > 0 || isResending}
              loading={isResending}
              iconName="Send"
              iconPosition="left"
              className="w-full gradient-primary"
            >
              {isResending ? 'Sending...' : 'Request New Link'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onBackToLogin}
              iconName="ArrowLeft"
              iconPosition="left"
              className="w-full"
            >
              Back to Login
            </Button>
          </>
        )}

        {status === 'verifying' && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span>Verifying your email address...</span>
          </div>
        )}
      </div>
      {(status === 'pending' || status === 'resent') && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                Click the verification link in your email to activate your account and start {role === 'brand' ? 'connecting with creators' : 'finding brand opportunities'}.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                Didn't receive the email? Check your spam folder or click "Resend" above.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onBackToLogin}
              className="text-sm text-primary hover:underline font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Your email is secure and will never be shared</span>
      </div>
    </div>
  );
};

export default VerificationCard;