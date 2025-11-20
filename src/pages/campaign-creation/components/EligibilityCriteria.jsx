import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const EligibilityCriteria = ({ formData, updateFormData, errors }) => {
  const followerRanges = [
    { value: '10k-50k', label: '10K - 50K followers' },
    { value: '50k-100k', label: '50K - 100K followers' },
    { value: '100k-250k', label: '100K - 250K followers' },
    { value: '250k-500k', label: '250K - 500K followers' },
    { value: '500k+', label: '500K+ followers' }
  ];

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'surat', label: 'Surat' },
    { value: 'lucknow', label: 'Lucknow' },
    { value: 'kanpur', label: 'Kanpur' },
    { value: 'nagpur', label: 'Nagpur' },
    { value: 'indore', label: 'Indore' },
    { value: 'thane', label: 'Thane' },
    { value: 'bhopal', label: 'Bhopal' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
    { value: 'pimpri', label: 'Pimpri-Chinchwad' },
    { value: 'patna', label: 'Patna' },
    { value: 'vadodara', label: 'Vadodara' }
  ];

  const platformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' }
  ];

  const ageRanges = [
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55+', label: '55+ years' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('eligibility', { ...formData?.eligibility, [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    updateFormData('eligibility', { ...formData?.eligibility, [field]: checked });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={18} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Eligibility Criteria</h3>
          <p className="text-sm text-muted-foreground">Define who can participate in your campaign</p>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label="Follower Range"
          placeholder="Select follower count range"
          options={followerRanges}
          value={formData?.eligibility?.followerRange}
          onChange={(value) => handleInputChange('followerRange', value)}
          error={errors?.followerRange}
          required
          description="Choose the minimum follower count for creators"
        />

        <Select
          label="Target Locations"
          placeholder="Select target cities"
          options={locationOptions}
          value={formData?.eligibility?.locations}
          onChange={(value) => handleInputChange('locations', value)}
          multiple
          searchable
          clearable
          error={errors?.locations}
          description="Select cities where you want creators to be based"
        />

        <Select
          label="Preferred Platforms"
          placeholder="Select social media platforms"
          options={platformOptions}
          value={formData?.eligibility?.platforms}
          onChange={(value) => handleInputChange('platforms', value)}
          multiple
          error={errors?.platforms}
          required
          description="Choose platforms where content will be published"
        />

        <Select
          label="Creator Age Range"
          placeholder="Select age range"
          options={ageRanges}
          value={formData?.eligibility?.ageRange}
          onChange={(value) => handleInputChange('ageRange', value)}
          error={errors?.ageRange}
          description="Optional: Specify preferred creator age range"
        />

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Additional Requirements</h4>
          
          <Checkbox
            label="Verified Account Required"
            description="Only creators with verified social media accounts can apply"
            checked={formData?.eligibility?.verifiedOnly}
            onChange={(e) => handleCheckboxChange('verifiedOnly', e?.target?.checked)}
          />

          <Checkbox
            label="Previous Brand Collaboration Experience"
            description="Require creators to have prior brand partnership experience"
            checked={formData?.eligibility?.experienceRequired}
            onChange={(e) => handleCheckboxChange('experienceRequired', e?.target?.checked)}
          />

          <Checkbox
            label="Content Quality Review"
            description="Manually review creator's content quality before approval"
            checked={formData?.eligibility?.qualityReview}
            onChange={(e) => handleCheckboxChange('qualityReview', e?.target?.checked)}
          />
        </div>

        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Target" size={16} className="text-accent mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Targeting Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Broader criteria = more applications but varied quality</li>
                <li>• Specific requirements = fewer but more relevant creators</li>
                <li>• Consider your budget when setting follower ranges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCriteria;