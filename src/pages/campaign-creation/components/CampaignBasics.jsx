import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CampaignBasics = ({ formData, updateFormData, errors }) => {
  const nicheOptions = [
    { value: 'fashion', label: 'Fashion & Style' },
    { value: 'beauty', label: 'Beauty & Skincare' },
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel & Lifestyle' },
    { value: 'tech', label: 'Technology' },
    { value: 'home', label: 'Home & Decor' },
    { value: 'parenting', label: 'Parenting & Family' },
    { value: 'business', label: 'Business & Finance' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('basics', { ...formData?.basics, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Basics</h3>
          <p className="text-sm text-muted-foreground">Define your campaign's core information</p>
        </div>
      </div>
      <div className="space-y-6">
        <Input
          label="Campaign Title"
          type="text"
          placeholder="Enter a compelling campaign title"
          value={formData?.basics?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          description="Make it clear and engaging for creators"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Campaign Description <span className="text-error">*</span>
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Describe your campaign goals, brand values, and what you're looking for in creators..."
            value={formData?.basics?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          {errors?.description && (
            <p className="text-sm text-error mt-1">{errors?.description}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Minimum 100 characters. Be specific about your requirements and expectations.
          </p>
        </div>

        <Select
          label="Primary Niche"
          placeholder="Select campaign niche"
          options={nicheOptions}
          value={formData?.basics?.niche}
          onChange={(value) => handleInputChange('niche', value)}
          error={errors?.niche}
          required
          description="Choose the most relevant category for your campaign"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Brand Name"
            type="text"
            placeholder="Your brand name"
            value={formData?.basics?.brandName}
            onChange={(e) => handleInputChange('brandName', e?.target?.value)}
            error={errors?.brandName}
            required
          />

          <Input
            label="Brand Website"
            type="url"
            placeholder="https://yourbrand.com"
            value={formData?.basics?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
            error={errors?.website}
            description="Optional but recommended"
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Pro Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use action words in your title to grab attention</li>
                <li>• Mention specific deliverables in the description</li>
                <li>• Include your brand's unique selling points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBasics;