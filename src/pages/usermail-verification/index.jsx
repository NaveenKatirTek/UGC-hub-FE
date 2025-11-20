import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';


import VerificationCard from './components/VerificationCard';

const UserVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const email = location?.state?.email || searchParams?.get('email') || 'user@example.com';
  const role = location?.state?.role || searchParams?.get('role') || 'brand';
  
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const maskedEmail = email?.replace(/(.{2})(.*)(@.*)/, (_, start, middle, end) => {
    return start + '*'?.repeat(Math.min(middle?.length, 5)) + end;
  });

  useEffect(() => {
    const token = searchParams?.get('token');
    if (token) {
      handleTokenVerification(token);
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleTokenVerification = async (token) => {
    setVerificationStatus('verifying');
    setErrorMessage('');

    setTimeout(() => {
      if (token === 'valid_token_123') {
        setVerificationStatus('success');
        
        localStorage.setItem('isVerified', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        
        setTimeout(() => {
          navigate('/sign-in', {
            state: {
              message: 'Email verified successfully! You can now sign in.',
              email: email
            }
          });
        }, 2000);
      } else if (token === 'expired_token') {
        setVerificationStatus('expired');
        setErrorMessage('This verification link has expired. Please request a new one.');
      } else {
        setVerificationStatus('error');
        setErrorMessage('Invalid verification link. Please check your email or request a new link.');
      }
    }, 2000);
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || isResending) {
      return;
    }

    setIsResending(true);
    setErrorMessage('');

    setTimeout(() => {
      console.log('Resending verification email to:', email);
      setVerificationStatus('resent');
      setResendCooldown(60);
      setIsResending(false);
      
      setTimeout(() => {
        setVerificationStatus('pending');
      }, 3000);
    }, 1500);
  };

  const handleOpenEmail = () => {
    const emailProviders = [
      { domain: 'gmail.com', url: 'https://mail.google.com' },
      { domain: 'outlook.com', url: 'https://outlook.live.com' },
      { domain: 'yahoo.com', url: 'https://mail.yahoo.com' },
      { domain: 'hotmail.com', url: 'https://outlook.live.com' }
    ];

    const emailDomain = email?.split('@')?.[1];
    const provider = emailProviders?.find(p => emailDomain?.includes(p?.domain));
    
    if (provider) {
      window.open(provider?.url, '_blank');
    } else {
      alert('Please check your email inbox to verify your account.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/sign-in', { 
      state: { 
        email: email 
      } 
    });
  };

  return (
    <>
      <Helmet>
        <title>Verify Your Email - BrandCreator Connect</title>
        <meta 
          name="description" 
          content="Verify your email address to activate your BrandCreator Connect account and start connecting with brands or creators." 
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <Header />
        
        <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <VerificationCard
              status={verificationStatus}
              email={maskedEmail}
              role={role}
              errorMessage={errorMessage}
              resendCooldown={resendCooldown}
              isResending={isResending}
              onResend={handleResendVerification}
              onOpenEmail={handleOpenEmail}
              onBackToLogin={handleBackToLogin}
            />
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>&copy; {new Date()?.getFullYear()} BrandCreator Connect. All rights reserved.</span>
              <a 
                href="/landing-page" 
                className="hover:text-foreground transition-hover pointer-events-auto"
              >
                Privacy Policy
              </a>
              <a 
                href="/landing-page" 
                className="hover:text-foreground transition-hover pointer-events-auto"
              >
                Terms of Service
              </a>
              <a 
                href="/landing-page" 
                className="hover:text-foreground transition-hover pointer-events-auto"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserVerification;