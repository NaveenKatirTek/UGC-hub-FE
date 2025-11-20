import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TimelineSelection = ({ formData, updateFormData, errors }) => {
  const durationOptions = [
    { value: '1', label: '1 week' },
    { value: '2', label: '2 weeks' },
    { value: '3', label: '3 weeks' },
    { value: '4', label: '1 month' },
    { value: '6', label: '6 weeks' },
    { value: '8', label: '2 months' },
    { value: '12', label: '3 months' },
    { value: 'custom', label: 'Custom duration' }
  ];

  const phaseOptions = [
    { value: 'single', label: 'Single Phase Campaign' },
    { value: 'multi', label: 'Multi-Phase Campaign' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('timeline', { ...formData?.timeline, [field]: value });
  };

  const calculateEndDate = (startDate, weeks) => {
    if (!startDate || !weeks) return '';
    const start = new Date(startDate);
    const end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
    return end?.toISOString()?.split('T')?.[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDurationInDays = () => {
    if (!formData?.timeline?.startDate || !formData?.timeline?.endDate) return 0;
    const start = new Date(formData.timeline.startDate);
    const end = new Date(formData.timeline.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const today = new Date()?.toISOString()?.split('T')?.[0];
  const minEndDate = formData?.timeline?.startDate 
    ? new Date(new Date(formData.timeline.startDate).getTime() + 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    : today;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={18} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Timeline</h3>
          <p className="text-sm text-muted-foreground">Set your campaign duration and key dates</p>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label="Campaign Type"
          placeholder="Select campaign structure"
          options={phaseOptions}
          value={formData?.timeline?.campaignType}
          onChange={(value) => handleInputChange('campaignType', value)}
          error={errors?.campaignType}
          required
          description="Choose single or multi-phase campaign structure"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Campaign Start Date"
            type="date"
            value={formData?.timeline?.startDate}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
            min={today}
            description="When creators can start working"
          />

          <Input
            label="Campaign End Date"
            type="date"
            value={formData?.timeline?.endDate}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
            min={minEndDate}
            description="Final submission deadline"
          />
        </div>

        <Select
          label="Suggested Duration"
          placeholder="Select campaign duration"
          options={durationOptions}
          value={formData?.timeline?.duration}
          onChange={(value) => {
            handleInputChange('duration', value);
            if (value !== 'custom' && formData?.timeline?.startDate) {
              const endDate = calculateEndDate(formData?.timeline?.startDate, parseInt(value));
              handleInputChange('endDate', endDate);
            }
          }}
          description="Quick selection for common durations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Application Deadline"
            type="date"
            value={formData?.timeline?.applicationDeadline}
            onChange={(e) => handleInputChange('applicationDeadline', e?.target?.value)}
            error={errors?.applicationDeadline}
            required
            min={today}
            max={formData?.timeline?.startDate}
            description="Last date for creator applications"
          />

          <Input
            label="Content Review Period"
            type="number"
            placeholder="3"
            value={formData?.timeline?.reviewPeriod}
            onChange={(e) => handleInputChange('reviewPeriod', e?.target?.value)}
            error={errors?.reviewPeriod}
            min="1"
            max="14"
            description="Days for content review and feedback"
          />
        </div>

        {formData?.timeline?.campaignType === 'multi' && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Multi-Phase Timeline</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Phase 1 End Date"
                  type="date"
                  value={formData?.timeline?.phase1End}
                  onChange={(e) => handleInputChange('phase1End', e?.target?.value)}
                  min={formData?.timeline?.startDate}
                  max={formData?.timeline?.endDate}
                  description="First phase completion"
                />
                <Input
                  label="Phase 2 Start Date"
                  type="date"
                  value={formData?.timeline?.phase2Start}
                  onChange={(e) => handleInputChange('phase2Start', e?.target?.value)}
                  min={formData?.timeline?.phase1End}
                  max={formData?.timeline?.endDate}
                  description="Second phase begins"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Campaign Summary</h4>
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="text-sm font-medium text-foreground">
                {formatDate(formData?.timeline?.startDate) || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="text-sm font-medium text-foreground">
                {formatDate(formData?.timeline?.endDate) || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium text-foreground">
                {getDurationInDays() > 0 ? `${getDurationInDays()} days` : 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Review Period</p>
              <p className="text-sm font-medium text-foreground">
                {formData?.timeline?.reviewPeriod ? `${formData?.timeline?.reviewPeriod} days` : 'Not set'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Timeline Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Allow 3-5 days for creator applications and selection</li>
                <li>• Include buffer time for content revisions</li>
                <li>• Consider weekends and holidays in your timeline</li>
                <li>• Longer campaigns often yield better content quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelection;