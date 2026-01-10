import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginCard = ({ 
  emailOrPhone, 
  setEmailOrPhone,
  password, 
  setPassword,
  selectedRole, 
  setSelectedRole,
  errors, 
  isLoading, 
  handleSubmit, 
  handleForgotPassword,
  handleSocialLogin
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md bg-card rounded-2xl shadow-elevation-3 p-8 border border-border"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elevation-2">
          <Icon name="Zap" size={32} color="#FFFFFF" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <div className="flex gap-3 p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => setSelectedRole('brand')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-base ${
              selectedRole === 'brand' ? 'bg-card text-primary shadow-elevation-1' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="Building2" size={18} />
              <span>Brand</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('creator')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-base ${
              selectedRole === 'creator' ? 'bg-card text-primary shadow-elevation-1' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="User" size={18} />
              <span>Creator</span>
            </div>
          </button>
        </div>

        {/* Email or Phone Input */}
        <Input
          type="text"
          label="Email or Phone Number"
          placeholder="Enter your email or phone number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e?.target?.value)}
          error={errors?.emailOrPhone}
          icon="Mail"
          iconPosition="left"
          required
        />

        {/* Password Input */}
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
          error={errors?.password}
          icon="Lock"
          iconPosition="left"
          showPasswordToggle={true}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-hover"
          >
            Forgot Password?
          </button>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
              <p className="text-sm text-destructive">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="gradient-primary"
        >
          Sign In
        </Button>

        {/* Social Login Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-card text-muted-foreground opacity-50 cursor-not-allowed"
          >
            <Icon name="Chrome" size={18} />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('instagram')}
            disabled
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-card text-muted-foreground opacity-50 cursor-not-allowed"
          >
            <Icon name="Instagram" size={18} />
            <span className="text-sm font-medium">Instagram</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="/register-step-1" className="font-medium text-primary hover:text-primary/80 transition-hover">
              Sign up now
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginCard;