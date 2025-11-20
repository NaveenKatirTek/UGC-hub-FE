import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';



import Icon from '../../components/AppIcon';
import BrandRegistrationForm from './components/BrandRegistrationForm';
import CreatorRegistrationForm from './components/CreatorRegistrationForm';

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location?.state?.role || 'brand';

  const [formData, setFormData] = useState({
    // Creator fields
    name: '',
    username: '',
    profileImage: null,
    mobile: { countryCode: '+91', number: '' },
    languagesKnown: [],
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    state: '',
    city: '',
    categories: [],
    contentTypes: [],
    collaborationPrice: '',
    instagramUsername: '',
    instagramProfile: '',
    instagramFollowers: '',
    facebookUsername: '',
    facebookProfile: '',
    facebookFollowers: '',
    youtubeUsername: '',
    youtubeChannel: '',
    youtubeFollowers: '',
    engagementRatio: '',
    
    // Brand fields
    businessName: '',
    brandUsername: '',
    companyLogo: null,
    industryType: '',
    companyType: '',
    website: '',
    district: '',
    gstNumber: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    },
    adminName: '',
    designation: '',
    employeeId: '',
    adminMobile: { countryCode: '+91', number: '' },
    adminEmail: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!location?.state?.role) {
      navigate('/register-step-1', { replace: true });
    }
  }, [location?.state, navigate]);

  const handleChange = (field, value, error = '') => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    } else if (errors?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageData) => {
    setFormData(prev => ({ ...prev, profileImage: imageData }));
    if (errors?.profileImage) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.profileImage;
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Registration data:', { ...formData, role: selectedRole });
      setIsSubmitting(false);
      navigate('/user-verification', { 
        state: { 
          email: formData?.email,
          role: selectedRole,
          message: 'Registration successful! Please verify your email to continue.'
        } 
      });
    }, 2000);
  };

  const handleBack = () => {
    navigate('/register-step-1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card rounded-2xl shadow-elevation-3 p-6 md:p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {selectedRole === 'brand' ? 'Brand Registration' : 'Creator Registration'}
                </h1>
                <p className="text-muted-foreground">
                  {selectedRole === 'brand' ?'Complete your brand profile to connect with influencers' :'Share your creator profile to start collaborating with brands'}
                </p>
              </div>

              {selectedRole === 'brand' ? (
                <BrandRegistrationForm
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onImageChange={handleImageChange}
                  onSubmit={handleSubmit}
                  onBack={handleBack}
                />
              ) : (
                <CreatorRegistrationForm
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onImageChange={handleImageChange}
                  onSubmit={handleSubmit}
                  onBack={handleBack}
                />
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Your information is secure and encrypted</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;