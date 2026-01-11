import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';
import authService from '../../services/auth.service';
import { validateUsernameFormat } from '../../utils/username.utils';

// Debounce utility
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const UsernameInput = ({
  label = 'Username',
  value = '',
  onChange,
  onAvailabilityChange,
  error,
  required = false,
  disabled = false,
  className = '',
  helperText = 'Username can be changed in your profile after signup'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [formatError, setFormatError] = useState('');

  const debouncedUsername = useDebounce(value, 500);

  // Check username availability
  const checkAvailability = useCallback(async (username) => {
    if (!username || username.length < 3) {
      setIsAvailable(null);
      setSuggestions([]);
      return;
    }

    // First check format
    const formatValidation = validateUsernameFormat(username);
    if (!formatValidation.isValid) {
      setFormatError(formatValidation.message);
      setIsAvailable(false);
      setSuggestions([]);
      onAvailabilityChange?.(false);
      return;
    }

    setFormatError('');
    setIsChecking(true);

    try {
      const response = await authService.checkUsernameAvailability(username);
      
      setIsAvailable(response.available);
      setSuggestions(response.suggestions || []);
      onAvailabilityChange?.(response.available);
    } catch (error) {
      console.error('Error checking username:', error);
      setIsAvailable(null);
      setSuggestions([]);
      onAvailabilityChange?.(false);
    } finally {
      setIsChecking(false);
    }
  }, [onAvailabilityChange]);

  // Check availability when debounced username changes
  useEffect(() => {
    if (debouncedUsername) {
      checkAvailability(debouncedUsername);
    }
  }, [debouncedUsername, checkAvailability]);

  const handleChange = (e) => {
    const newValue = e.target.value.toLowerCase();
    onChange?.(newValue);
    setIsAvailable(null); // Reset availability while typing
  };

  const handleSuggestionClick = (suggestion) => {
    onChange?.(suggestion);
  };

  const getStatusIcon = () => {
    if (isChecking) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Icon name="Loader2" size={18} className="text-muted-foreground" />
        </motion.div>
      );
    }

    if (formatError || error) {
      return <Icon name="AlertCircle" size={18} className="text-destructive" />;
    }

    if (isAvailable === true) {
      return <Icon name="CheckCircle2" size={18} className="text-green-500" />;
    }

    if (isAvailable === false) {
      return <Icon name="XCircle" size={18} className="text-destructive" />;
    }

    return null;
  };

  const getStatusMessage = () => {
    if (formatError) return formatError;
    if (error) return error;
    if (isChecking) return 'Checking availability...';
    if (isAvailable === true) return 'Username is available!';
    if (isAvailable === false) return 'Username is already taken';
    return '';
  };

  const statusMessageColor = () => {
    if (formatError || error || isAvailable === false) return 'text-destructive';
    if (isAvailable === true) return 'text-green-600';
    return 'text-muted-foreground';
  };

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="AtSign" size={18} className="text-muted-foreground" />
        </div>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          placeholder="your_username"
          className={cn(
            'w-full pl-10 pr-12 py-2.5 rounded-lg border transition-all duration-200',
            'bg-background text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            (formatError || error || isAvailable === false) && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            !formatError && !error && isAvailable === true && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
            !formatError && !error && !isFocused && isAvailable === null && 'border-border',
            disabled && 'opacity-50 cursor-not-allowed bg-muted',
            isFocused && !formatError && !error && isAvailable === null && 'border-primary shadow-sm'
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {getStatusIcon()}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {getStatusMessage() && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5"
          >
            <div className="flex items-center gap-1.5">
              <p className={cn('text-sm', statusMessageColor())}>
                {getStatusMessage()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper text */}
      {helperText && !formatError && !error && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {helperText}
        </p>
      )}

      {/* Suggestions */}
      <AnimatePresence>
        {isAvailable === false && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-3 rounded-lg bg-muted/50 border border-border"
          >
            <p className="text-sm font-medium text-foreground mb-2">
              Try these available usernames:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-sm rounded-md bg-background border border-border hover:border-primary hover:bg-primary/5 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsernameInput;
