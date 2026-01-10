import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const PhoneInput = ({
  label,
  value = '',
  onChange,
  error,
  required = false,
  placeholder = 'Enter phone number',
  className = '',
  disabled = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const countryCodes = [
    { value: '+1', label: 'US', flag: '🇺🇸' },
    { value: '+44', label: 'UK', flag: '🇬🇧' },
    { value: '+91', label: 'IN', flag: '🇮🇳' },
    { value: '+61', label: 'AU', flag: '🇦🇺' },
    { value: '+81', label: 'JP', flag: '🇯🇵' },
    { value: '+86', label: 'CN', flag: '🇨🇳' },
    { value: '+49', label: 'DE', flag: '🇩🇪' },
    { value: '+33', label: 'FR', flag: '🇫🇷' },
    { value: '+971', label: 'AE', flag: '🇦🇪' },
    { value: '+65', label: 'SG', flag: '🇸🇬' }
  ];

  const handleNumberChange = (e) => {
    const number = e?.target?.value?.replace(/[^0-9]/g, '');
    onChange?.(number);
  };

  const selectedCountry = countryCodes.find(c => c.value === countryCode) || countryCodes[2];

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <div className="relative">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            disabled={disabled}
            className={cn(
              'h-full px-3 py-2.5 rounded-lg border bg-background text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'transition-all duration-200 appearance-none pr-8',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              !error && 'border-border',
              disabled && 'opacity-50 cursor-not-allowed bg-muted'
            )}
          >
            {countryCodes.map((country) => (
              <option key={country.value} value={country.value}>
                {country.flag} {country.value}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Phone" size={18} className="text-muted-foreground" />
          </div>
          
          <input
            type="tel"
            value={value}
            onChange={handleNumberChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={10}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all duration-200',
              'bg-background text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              !error && !isFocused && 'border-border',
              disabled && 'opacity-50 cursor-not-allowed bg-muted',
              isFocused && !error && 'border-primary shadow-sm'
            )}
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5"
          >
            <div className="flex items-center gap-1.5">
              <Icon name="AlertCircle" size={14} className="text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhoneInput;