import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PhoneInput from '../../../components/ui/PhoneInput';
import UsernameInput from '../../../components/ui/UsernameInput';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { generateUsername } from '../../../utils/username.utils';

const BrandRegistrationForm = ({ formData, errors, onChange, onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  const companyTypeOptions = [
    { value: 'sole_proprietor', label: 'Sole Proprietor' },
    { value: 'private_ltd', label: 'Private LTD' },
    { value: 'llp', label: 'LLP' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'public_ltd', label: 'Public LTD' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
    { value: 'west_bengal', label: 'West Bengal' }
  ];

  const cityOptions = {
    maharashtra: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' }
    ],
    karnataka: [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' },
      { value: 'mangalore', label: 'Mangalore' }
    ],
    delhi: [
      { value: 'new_delhi', label: 'New Delhi' },
      { value: 'south_delhi', label: 'South Delhi' },
      { value: 'north_delhi', label: 'North Delhi' }
    ],
    tamil_nadu: [
      { value: 'chennai', label: 'Chennai' },
      { value: 'coimbatore', label: 'Coimbatore' },
      { value: 'madurai', label: 'Madurai' }
    ],
    gujarat: [
      { value: 'ahmedabad', label: 'Ahmedabad' },
      { value: 'surat', label: 'Surat' },
      { value: 'vadodara', label: 'Vadodara' }
    ],
    rajasthan: [
      { value: 'jaipur', label: 'Jaipur' },
      { value: 'jodhpur', label: 'Jodhpur' },
      { value: 'udaipur', label: 'Udaipur' }
    ],
    uttar_pradesh: [
      { value: 'lucknow', label: 'Lucknow' },
      { value: 'noida', label: 'Noida' },
      { value: 'kanpur', label: 'Kanpur' }
    ],
    west_bengal: [
      { value: 'kolkata', label: 'Kolkata' },
      { value: 'howrah', label: 'Howrah' },
      { value: 'durgapur', label: 'Durgapur' }
    ]
  };

  // Auto-generate username when business name changes
  useEffect(() => {
    if (formData.businessName && !formData.username) {
      const generatedUsername = generateUsername(formData.businessName, 'brand');
      onChange('username', generatedUsername);
    }
  }, [formData.businessName]);

  const handleNextStep = () => {
    // Validate Step 1 before proceeding
    const step1Fields = ['businessName', 'username', 'email', 'mobile', 'password', 'confirmPassword'];
    
    // Check if all fields have values
    const hasEmptyFields = step1Fields.some(field => !formData[field] || formData[field] === '');
    
    // Check if any field has errors
    const hasErrors = step1Fields.some(field => errors[field]);
    
    console.log('Validation check:', {
      hasEmptyFields,
      hasErrors,
      isUsernameAvailable,
      formData: step1Fields.reduce((acc, field) => ({ ...acc, [field]: formData[field] }), {}),
      errors: step1Fields.reduce((acc, field) => ({ ...acc, [field]: errors[field] }), {})
    });

    if (!hasErrors && !hasEmptyFields && isUsernameAvailable) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show which validation is failing
      if (hasEmptyFields) console.log('Empty fields detected');
      if (hasErrors) console.log('Validation errors detected');
      if (!isUsernameAvailable) console.log('Username not available');
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          {[1, 2].map((step) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === step ? 'bg-primary text-primary-foreground' : currentStep > step ? 'bg-primary/20 text-primary' : 'bg-border text-muted-foreground'}`}>
                {step}
              </div>
              {step < 2 && (
                <div className={`h-1 w-16 ${currentStep > step ? 'bg-primary' : 'bg-border'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {currentStep === 1 && 'Basic Information'}
          {currentStep === 2 && 'Company Details & Terms'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Input
              label="Business Name"
              type="text"
              placeholder="Enter your business name"
              value={formData.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
              error={errors.businessName}
              required
            />

            <UsernameInput
              label="Username"
              value={formData.username || ''}
              onChange={(value) => onChange('username', value)}
              onAvailabilityChange={setIsUsernameAvailable}
              error={errors.username}
              required
              helperText="Username can be changed in your profile after signup"
            />

            <Input
              label="Email ID"
              type="email"
              placeholder="business.email@company.com"
              value={formData.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <PhoneInput
              label="Mobile Number"
              value={formData.mobile || ''}
              onChange={(val) => onChange('mobile', val)}
              error={errors.mobile}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Password"
                type="password"
                placeholder="Create strong password"
                value={formData.password || ''}
                onChange={(e) => onChange('password', e.target.value)}
                error={errors.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword || ''}
                onChange={(e) => onChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                iconName="ArrowRight"
                iconPosition="right"
                disabled={!isUsernameAvailable}
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Company Details & Terms */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Select
              label="Company Type"
              options={companyTypeOptions}
              value={formData.companyType || ''}
              onChange={(val) => onChange('companyType', val)}
              error={errors.companyType}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="State"
                options={stateOptions}
                value={formData.state || ''}
                onChange={(val) => {
                  onChange('state', val);
                  onChange('city', ''); // Reset city when state changes
                }}
                error={errors.state}
                required
                searchable
              />

              <Select
                label="City"
                options={cityOptions[formData.state] || []}
                value={formData.city || ''}
                onChange={(val) => onChange('city', val)}
                error={errors.city}
                required
                disabled={!formData.state}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground">Terms & Conditions</h3>
              
              <Checkbox
                label={
                  <span>
                    I accept the{' '}
                    <a href="/terms" target="_blank" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>
                  </span>
                }
                checked={formData.acceptedTerms || false}
                onChange={(e) => onChange('acceptedTerms', e.target.checked)}
                required
              />

              <Checkbox
                label={
                  <span>
                    I accept the{' '}
                    <a href="/privacy" target="_blank" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                }
                checked={formData.acceptedPrivacy || false}
                onChange={(e) => onChange('acceptedPrivacy', e.target.checked)}
                required
              />

              {(errors.acceptedTerms || errors.acceptedPrivacy) && (
                <p className="text-sm text-destructive">
                  {errors.acceptedTerms || errors.acceptedPrivacy}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                iconName="Check"
                iconPosition="right"
              >
                Complete Registration
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandRegistrationForm;