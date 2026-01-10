import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import PhoneInput from '../../../components/ui/PhoneInput';

const ForgotPasswordModal = ({ isOpen, onClose, selectedRole, api }) => {
  const [step, setStep] = useState(1); // 1: Enter Mobile, 2: Enter OTP, 3: Reset Password
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setStep(1);
    setMobile('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setSuccessMessage('');
    onClose();
  };

  const handleSendOtp = async () => {
    const newErrors = {};
    
    if (!mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (mobile.length < 10) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = selectedRole === 'brand' ? '/brand/forgot-password' : '/creator/forgot-password';
      const response = await api.post(endpoint, { mobile });

      if (response.data.status === 'success') {
        setStep(2);
        setSuccessMessage('OTP sent successfully to your mobile number!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('OTP send error:', err);
      setErrors({
        general: err.response?.data?.message || 'Failed to send OTP. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const newErrors = {};
    
    if (!otp?.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = selectedRole === 'brand' ? '/brand/verify-reset-otp' : '/creator/verify-reset-otp';
      const response = await api.post(endpoint, { mobile, otp });

      if (response.data.status === 'success') {
        setStep(3);
        setSuccessMessage('OTP verified! Please set your new password.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setErrors({
        general: err.response?.data?.message || 'Invalid OTP. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const newErrors = {};
    
    if (!newPassword?.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword?.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = selectedRole === 'brand' ? '/brand/reset-password' : '/creator/reset-password';
      const response = await api.post(endpoint, { mobile, otp, newPassword });

      if (response.data.status === 'success') {
        setSuccessMessage('Password reset successfully! You can now sign in.');
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setErrors({
        general: err.response?.data?.message || 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card rounded-2xl shadow-elevation-3 p-6 border border-border"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Icon name="Key" size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Forgot Password</h2>
            <p className="text-sm text-muted-foreground">
              {step === 1 && 'Enter your mobile number to receive OTP'}
              {step === 2 && 'Enter the OTP sent to your mobile'}
              {step === 3 && 'Set your new password'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? 'w-8 bg-primary' : s < step ? 'w-6 bg-primary/50' : 'w-6 bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Step 1: Enter Mobile */}
            {step === 1 && (
              <>
                <PhoneInput
                  label="Mobile Number"
                  value={mobile}
                  onChange={setMobile}
                  error={errors?.mobile}
                  placeholder="Enter your mobile number"
                  required
                />
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleSendOtp}
                  loading={isLoading}
                  disabled={!mobile || mobile.length < 10}
                  className="gradient-primary"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Send OTP
                </Button>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <>
                <Input
                  type="text"
                  label="Enter OTP"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '').slice(0, 6))}
                  error={errors?.otp}
                  icon="Key"
                  iconPosition="left"
                  maxLength={6}
                  required
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Didn't receive OTP?</span>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="font-medium text-primary hover:text-primary/80 transition-hover"
                  >
                    Resend OTP
                  </button>
                </div>
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleVerifyOtp}
                  loading={isLoading}
                  disabled={!otp || otp.length !== 6}
                  className="gradient-primary"
                >
                  Verify OTP
                </Button>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <>
                <Input
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e?.target?.value)}
                  error={errors?.newPassword}
                  icon="Lock"
                  iconPosition="left"
                  showPasswordToggle={true}
                  required
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e?.target?.value)}
                  error={errors?.confirmPassword}
                  icon="Lock"
                  iconPosition="left"
                  showPasswordToggle={true}
                  required
                />
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleResetPassword}
                  loading={isLoading}
                  disabled={!newPassword || !confirmPassword}
                  className="gradient-primary"
                >
                  Reset Password
                </Button>
              </>
            )}

            {/* Error/Success Messages */}
            {errors?.general && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} className="text-destructive" />
                  <p className="text-sm text-destructive">{errors?.general}</p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Back Button */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
            >
              <Icon name="ChevronLeft" size={16} />
              Back
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
