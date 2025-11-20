import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import ProgressIndicator from './components/ProgressIndicator';
import CampaignBasics from './components/CampaignBasics';
import EligibilityCriteria from './components/EligibilityCriteria';
import BudgetAllocation from './components/BudgetAllocation';
import TimelineSelection from './components/TimelineSelection';
import DeliverableRequirements from './components/DeliverableRequirements';
import CampaignPreview from './components/CampaignPreview';

const CampaignCreation = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState('basics');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    basics: {
      title: '',
      description: '',
      niche: '',
      brandName: '',
      website: ''
    },
    eligibility: {
      followerRange: '',
      locations: [],
      platforms: [],
      ageRange: '',
      verifiedOnly: false,
      experienceRequired: false,
      qualityReview: false
    },
    budget: {
      totalBudget: '',
      budgetType: '',
      tierBudgets: {}
    },
    timeline: {
      campaignType: '',
      startDate: '',
      endDate: '',
      duration: '',
      applicationDeadline: '',
      reviewPeriod: '',
      phase1End: '',
      phase2Start: ''
    },
    deliverables: {
      contentTypes: {},
      quality: '',
      style: '',
      guidelines: '',
      hashtags: [],
      requirements: {}
    }
  });

  const steps = [
    { id: 'basics', component: CampaignBasics },
    { id: 'eligibility', component: EligibilityCriteria },
    { id: 'budget', component: BudgetAllocation },
    { id: 'timeline', component: TimelineSelection },
    { id: 'deliverables', component: DeliverableRequirements }
  ];

  // Update form data
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Mark section as completed if it has required data
    if (validateSection(section, data) && !completedSteps?.includes(section)) {
      setCompletedSteps(prev => [...prev, section]);
    }
  };

  // Validate section
  const validateSection = (section, data) => {
    switch (section) {
      case 'basics':
        return data?.title && data?.description && data?.niche && data?.brandName;
      case 'eligibility':
        return data?.followerRange && data?.platforms?.length > 0;
      case 'budget':
        return data?.totalBudget && data?.budgetType;
      case 'timeline':
        return data?.startDate && data?.endDate && data?.applicationDeadline;
      case 'deliverables':
        return data?.quality && data?.style && Object.values(data?.contentTypes || {})?.some(ct => ct?.enabled);
      default:
        return false;
    }
  };

  // Navigate between steps
  const goToStep = (stepId) => {
    setCurrentStep(stepId);
    setErrors({});
  };

  const goToNextStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    if (currentIndex < steps?.length - 1) {
      setCurrentStep(steps?.[currentIndex + 1]?.id);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps?.[currentIndex - 1]?.id);
    }
  };

  // Submit campaign
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success response
      console.log('Campaign submitted:', formData);
      
      // Navigate to campaign details or success page
      navigate('/campaign-details', { 
        state: { 
          campaignId: 'camp_' + Date.now(),
          status: 'pending_review',
          message: 'Campaign submitted successfully for admin review!'
        }
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit campaign. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      localStorage.setItem('campaign_draft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(autoSave);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('campaign_draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const CurrentStepComponent = steps?.find(step => step?.id === currentStep)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} userRole="brand" />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        userRole="brand" 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                iconName="ArrowLeft"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create New Campaign</h1>
                <p className="text-muted-foreground">
                  Build your campaign step by step to connect with the right creators
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Current Step Component */}
              {CurrentStepComponent && (
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 'basics'}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save Draft
                  </Button>

                  {currentStep !== 'deliverables' ? (
                    <Button
                      variant="default"
                      onClick={goToNextStep}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={() => goToStep('preview')}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      Preview & Submit
                    </Button>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {errors?.submit && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <p className="text-sm text-error">{errors?.submit}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Preview */}
            <div className="xl:col-span-1">
              <CampaignPreview
                formData={formData}
                onEdit={goToStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Mobile Submit Button */}
          <div className="xl:hidden mt-6 pt-6 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={handleSubmit}
              disabled={completedSteps?.length < 4 || isSubmitting}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Submitting Campaign...' : 'Submit for Review'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignCreation;