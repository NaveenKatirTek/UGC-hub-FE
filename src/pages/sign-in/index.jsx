import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginCard from './components/LoginCard';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import api from '../../utils/api';

const SignIn = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('brand');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setSelectedRole(savedRole);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
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

    try {
      // Determine endpoint based on role
      const endpoint = selectedRole === 'brand' ? '/brand/login' : '/creator/login';
      
      // Detect if input is email or phone
      const isEmail = emailOrPhone.includes('@');
      const payload = isEmail 
        ? { email: emailOrPhone, password }
        : { mobile: emailOrPhone, password };
      
      // Call API
      const response = await api.post(endpoint, payload);

      if (response.data.status === 'success') {
        const { token, data } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('user', JSON.stringify(data.user || data.brand || data.creator));
        
        // Redirect based on role
        const dashboardRoutes = {
          brand: '/brand/dashboard',
          creator: '/creator-dashboard'
        };
        navigate(dashboardRoutes[selectedRole], { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: err.response?.data?.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon.`);
  };

  return (
    <>
      <Helmet>
        <title>Sign In - BrandCreator Connect</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <LoginCard
              emailOrPhone={emailOrPhone}
              setEmailOrPhone={setEmailOrPhone}
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
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        selectedRole={selectedRole}
        api={api}
      />
    </>
  );
};

export default SignIn;