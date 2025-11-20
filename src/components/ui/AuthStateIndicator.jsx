import React from 'react';
import Icon from '../AppIcon';

const AuthStateIndicator = ({ currentStep = 1, totalSteps = 2, role = null }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        {steps?.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-base ${
                  step < currentStep
                    ? 'bg-success text-success-foreground'
                    : step === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step < currentStep ? (
                  <Icon name="Check" size={20} strokeWidth={2.5} />
                ) : (
                  <span className="text-sm font-semibold">{step}</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                Step {step}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-6">
                <div
                  className={`h-full transition-base ${
                    step < currentStep ? 'bg-success' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {role && (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2">
            <Icon 
              name={role === 'brand' ? 'Building2' : 'User'} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="text-sm font-medium text-primary">
              Registering as {role === 'brand' ? 'Brand' : 'Creator'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthStateIndicator;