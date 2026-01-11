import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import PublicHeader from '../../components/ui/PublicHeader';
import BrandRegistrationForm from './components/BrandRegistrationForm';
import CreatorRegistrationForm from './components/CreatorRegistrationForm';
import { brandRegistrationSchema, creatorRegistrationSchema } from '../../utils/validation/registration.schema';
import authService from '../../services/auth.service';

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location.state?.role;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // Redirect if no role selected
  useEffect(() => {
    if (!selectedRole) {
      navigate('/register-step-1');
    }
  }, [selectedRole, navigate]);

  // Initialize Formik with appropriate schema and initial values
  const formik = useFormik({
    initialValues: {
      // Common fields
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      state: '',
      city: '',
      acceptedTerms: false,
      acceptedPrivacy: false,
      
      // Brand-specific fields
      ...(selectedRole === 'brand' && {
        businessName: '',
        companyType: '',
      }),
      
      // Creator-specific fields
      ...(selectedRole === 'creator' && {
        name: '',
      }),
    },
    validationSchema: selectedRole === 'brand' ? brandRegistrationSchema : creatorRegistrationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setApiError('');

      try {
        let response;
        
        if (selectedRole === 'brand') {
          response = await authService.signupBrand({
            businessName: values.businessName,
            username: values.username,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            companyType: values.companyType,
            state: values.state,
            city: values.city,
          });
        } else {
          response = await authService.signupCreator({
            name: values.name,
            username: values.username,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            state: values.state,
            city: values.city,
          });
        }

        // Navigate to verification page on success
        navigate('/usermail-verification', {
          state: {
            email: values.email,
            mobile: values.mobile,
            role: selectedRole,
            message: 'Registration successful! Please verify your email and mobile to continue.',
          },
        });
      } catch (error) {
        console.error('Registration error:', error);
        setApiError(error.message || 'Registration failed. Please try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFieldChange = (field, value) => {
    formik.setFieldValue(field, value);
    // Mark field as touched to trigger validation
    formik.setFieldTouched(field, true, false);
    // Manually validate the field
    setTimeout(() => {
      formik.validateField(field);
    }, 0);
  };

  const handleBack = () => {
    navigate('/register-step-1');
  };

  if (!selectedRole) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border relative">
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{apiError}</p>
            </div>
          )}

          {/* Loading Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-foreground font-medium">Creating your account...</p>
              </div>
            </div>
          )}

          {selectedRole === 'brand' ? (
            <BrandRegistrationForm
              formData={formik.values}
              errors={formik.errors}
              onChange={handleFieldChange}
              onSubmit={formik.handleSubmit}
              onBack={handleBack}
            />
          ) : (
            <CreatorRegistrationForm
              formData={formik.values}
              errors={formik.errors}
              onChange={handleFieldChange}
              onSubmit={formik.handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;