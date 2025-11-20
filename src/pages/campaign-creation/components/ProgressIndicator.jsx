import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, completedSteps, onStepClick }) => {
  const steps = [
  { id: 'basics', label: 'Campaign Basics', icon: 'FileText' },
  { id: 'eligibility', label: 'Eligibility Criteria', icon: 'Users' },
  { id: 'budget', label: 'Budget Allocation', icon: 'DollarSign' },
  { id: 'timeline', label: 'Timeline Selection', icon: 'Calendar' },
  { id: 'deliverables', label: 'Deliverable Requirements', icon: 'Package' }];


  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (index) => {
    const nextStepStatus = index < steps?.length - 1 ? getStepStatus(steps?.[index + 1]?.id) : 'pending';
    return nextStepStatus === 'completed' || nextStepStatus === 'current' ? 'bg-primary' : 'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Campaign Creation Progress</h2>
        <div className="text-sm text-muted-foreground">
          Step {steps?.findIndex((step) => step?.id === currentStep) + 1} of {steps?.length}
        </div>
      </div>
      {/* Desktop Progress Indicator */}
      <div className="hidden md:flex items-center justify-between border-[rgba(235,229,235,1)]">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isClickable = completedSteps?.includes(step?.id) || step?.id === currentStep;

          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center border-[rgba(65,43,233,1)]">
                <button
                  onClick={() => isClickable && onStepClick(step?.id)}
                  disabled={!isClickable}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  getStepClasses(status)} ${
                  isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}>

                  {status === 'completed' ?
                  <Icon name="Check" size={16} /> :

                  <Icon name={step?.icon} size={16} />
                  }
                </button>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${
                  status === 'current' ? 'text-primary' :
                  status === 'completed' ? 'text-success' : 'text-muted-foreground'}`
                  }>
                    {step?.label}
                  </p>
                </div>
              </div>
              {index < steps?.length - 1 &&
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${getConnectorClasses(index)}`} />
              }
            </React.Fragment>);

        })}
      </div>
      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
          getStepClasses(getStepStatus(currentStep))}`
          }>
            {getStepStatus(currentStep) === 'completed' ?
            <Icon name="Check" size={14} /> :

            <Icon name={steps?.find((s) => s?.id === currentStep)?.icon || 'Circle'} size={14} />
            }
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {steps?.find((s) => s?.id === currentStep)?.label}
            </p>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(steps?.findIndex((s) => s?.id === currentStep) + 1) / steps?.length * 100}%` }} />

            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex space-x-1">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isClickable = completedSteps?.includes(step?.id) || step?.id === currentStep;

            return (
              <button
                key={step?.id}
                onClick={() => isClickable && onStepClick(step?.id)}
                disabled={!isClickable}
                className={`flex-1 py-2 px-1 text-xs font-medium rounded transition-all duration-200 ${
                status === 'current' ? 'bg-primary text-primary-foreground' :
                status === 'completed' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'} ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}>

                {index + 1}
              </button>);

          })}
        </div>
      </div>
      {/* Completion Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedSteps?.length} of {steps?.length} sections completed
          </span>
          <span className="text-primary font-medium">
            {Math.round(completedSteps?.length / steps?.length * 100)}% Complete
          </span>
        </div>
      </div>
    </div>);

};

export default ProgressIndicator;