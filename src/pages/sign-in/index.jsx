import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginCard from './components/LoginCard';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('brand');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    brand: {
      email: 'brand@example.com',
      password: 'Brand@123'
    },
    creator: {
      email: 'creator@example.com',
      password: 'Creator@123'
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setSelectedRole(savedRole);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      const roleCredentials = mockCredentials?.[selectedRole];
      
      if (email === roleCredentials?.email && password === roleCredentials?.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userEmail', email);
        
        const dashboardRoutes = {
          brand: '/dashboard/brand',
          creator: '/dashboard/creator'
        };
        
        navigate(dashboardRoutes?.[selectedRole], { replace: true });
      } else {
        setErrors({
          general: `Invalid credentials. Use ${roleCredentials?.email} / ${roleCredentials?.password} for ${selectedRole} login.`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be available soon. Please contact support for assistance.');
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} login will be available in a future update.`);
  };

  return (
    <>
      <Helmet>
        <title>Sign In - BrandCreator Connect</title>
        <meta name="description" content="Sign in to your BrandCreator Connect account and access your personalized dashboard for brand campaigns or creator opportunities." />
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
            <LoginCard
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              errors={errors}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              handleForgotPassword={handleForgotPassword}
              handleSocialLogin={handleSocialLogin}
            />
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>&copy; {new Date()?.getFullYear()} BrandCreator Connect. All rights reserved.</span>
              <a href="/landing-page" className="hover:text-foreground transition-hover pointer-events-auto">
                Privacy Policy
              </a>
              <a href="/landing-page" className="hover:text-foreground transition-hover pointer-events-auto">
                Terms of Service
              </a>
              <a href="/landing-page" className="hover:text-foreground transition-hover pointer-events-auto">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;