import React, { useState } from 'react';
import Select from './Select';
import Input from './Input';
import Icon from '../AppIcon';

const PhoneInput = ({
  label,
  value = {},
  onChange,
  error,
  required = false,
  placeholder = 'Enter phone number',
  className = ''
}) => {
  const countryCodes = [
    { value: '+1', label: '🇺🇸 +1 (US)', flag: '🇺🇸' },
    { value: '+44', label: '🇬🇧 +44 (UK)', flag: '🇬🇧' },
    { value: '+91', label: '🇮🇳 +91 (IN)', flag: '🇮🇳' },
    { value: '+61', label: '🇦🇺 +61 (AU)', flag: '🇦🇺' },
    { value: '+81', label: '🇯🇵 +81 (JP)', flag: '🇯🇵' },
    { value: '+86', label: '🇨🇳 +86 (CN)', flag: '🇨🇳' },
    { value: '+49', label: '🇩🇪 +49 (DE)', flag: '🇩🇪' },
    { value: '+33', label: '🇫🇷 +33 (FR)', flag: '🇫🇷' },
    { value: '+971', label: '🇦🇪 +971 (AE)', flag: '🇦🇪' },
    { value: '+65', label: '🇸🇬 +65 (SG)', flag: '🇸🇬' }
  ];

  const handleCountryCodeChange = (code) => {
    onChange?.({ ...value, countryCode: code });
  };

  const handleNumberChange = (e) => {
    const number = e?.target?.value?.replace(/[^0-9]/g, '');
    onChange?.({ ...value, number });
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="flex gap-2">
        <div className="w-32">
          <Select
            options={countryCodes}
            value={value?.countryCode || '+91'}
            onChange={handleCountryCodeChange}
            placeholder="+1"
            searchable
          />
        </div>
        
        <div className="flex-1">
          <Input
            type="tel"
            value={value?.number || ''}
            onChange={handleNumberChange}
            placeholder={placeholder}
            maxLength={10}
          />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
          <Icon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;