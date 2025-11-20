import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountTypeCard = ({ 
  type, 
  title, 
  description, 
  features, 
  iconName, 
  isSelected, 
  onSelect 
}) => {
  const handleCardClick = (e) => {
    // Ensure selection happens regardless of where user clicks
    onSelect();
  };

  const handleButtonClick = (e) => {
    // Prevent event bubbling and explicitly trigger selection
    e?.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-elevation-3'
          : 'border-border bg-card hover:border-primary/50 shadow-elevation-1'
      }`}
      onClick={handleCardClick}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-success flex items-center justify-center"
        >
          <Icon name="Check" size={18} color="#FFFFFF" strokeWidth={3} />
        </motion.div>
      )}
      <div className="flex flex-col items-center text-center mb-6">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${
          isSelected ? 'bg-gradient-primary' : 'bg-muted'
        }`}>
          <Icon 
            name={iconName} 
            size={40} 
            color={isSelected ? '#FFFFFF' : 'var(--color-muted-foreground)'} 
            strokeWidth={2}
          />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="space-y-3 mb-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5">
              <Icon 
                name="CheckCircle2" 
                size={18} 
                color={isSelected ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                strokeWidth={2}
              />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        size="lg"
        fullWidth
        onClick={handleButtonClick}
        className={isSelected ? 'gradient-primary' : ''}
      >
        {isSelected ? 'Selected' : `Select ${title}`}
      </Button>
    </motion.div>
  );
};

export default AccountTypeCard;