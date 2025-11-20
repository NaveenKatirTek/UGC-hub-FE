import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const MultiSelect = ({ 
  label, 
  options = [], 
  value = [], 
  onChange, 
  placeholder = 'Select options...', 
  error,
  required = false,
  searchable = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document?.addEventListener('mousedown', handleClickOutside);
    return () => document?.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable && searchTerm
    ? options?.filter(option => 
        option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : options;

  const handleToggleOption = (optionValue) => {
    const newValue = value?.includes(optionValue)
      ? value?.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemoveOption = (optionValue, e) => {
    e?.stopPropagation();
    const newValue = value?.filter(v => v !== optionValue);
    onChange?.(newValue);
  };

  const getSelectedLabels = () => {
    return value
      ?.map(v => options?.find(opt => opt?.value === v)?.label)
      ?.filter(Boolean);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            min-h-[42px] w-full px-3 py-2 rounded-lg border cursor-pointer
            bg-card text-foreground
            transition-all duration-200
            ${error 
              ? 'border-destructive focus:ring-destructive/20' :'border-border hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10'
            }
            ${isOpen ? 'border-primary ring-4 ring-primary/10' : ''}
          `}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 flex flex-wrap gap-1.5">
              {value?.length > 0 ? (
                getSelectedLabels()?.map((label, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveOption(value?.[index], e)}
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <Icon 
              name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground flex-shrink-0"
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onClick={(e) => e?.stopPropagation()}
                  />
                </div>
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions?.length > 0 ? (
                filteredOptions?.map((option) => {
                  const isSelected = value?.includes(option?.value);
                  return (
                    <div
                      key={option?.value}
                      onClick={() => handleToggleOption(option?.value)}
                      className={`
                        px-3 py-2 cursor-pointer transition-colors
                        hover:bg-accent/50
                        ${isSelected ? 'bg-primary/10 text-primary' : 'text-foreground'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option?.label}</span>
                        {isSelected && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
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

export default MultiSelect;