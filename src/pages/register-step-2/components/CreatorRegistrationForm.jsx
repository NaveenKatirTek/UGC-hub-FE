import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PhoneInput from '../../../components/ui/PhoneInput';
import UsernameInput from '../../../components/ui/UsernameInput';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { generateUsername } from '../../../utils/username.utils';

const CreatorRegistrationForm = ({ formData, errors, onChange, onSubmit, onBack }) => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

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

  // Auto-generate username when name changes
  useEffect(() => {
    if (formData.name && !formData.username) {
      const generatedUsername = generateUsername(formData.name, 'creator');
      onChange('username', generatedUsername);
    }
  }, [formData.name]);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Creator Registration</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Complete your profile details in your dashboard after signup
        </p>
      </div>

      {/* Basic Information */}
      <Input
        label="Name"
        type="text"
        placeholder="Enter your full name"
        value={formData.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
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
        placeholder="your.email@example.com"
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
          placeholder="Must include alphabet, number & symbol"
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

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 pt-6">
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
          onClick={handleSubmit}
          iconName="Check"
          iconPosition="right"
          disabled={!isUsernameAvailable}
        >
          Complete Registration
        </Button>
      </div>
    </motion.div>
  );
};

export default CreatorRegistrationForm;