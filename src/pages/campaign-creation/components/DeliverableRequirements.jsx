import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeliverableRequirements = ({ formData, updateFormData, errors }) => {
  const contentTypes = [
    { 
      id: 'posts', 
      label: 'Instagram Posts', 
      icon: 'Image',
      description: 'Static image posts with captions'
    },
    { 
      id: 'reels', 
      label: 'Instagram Reels', 
      icon: 'Video',
      description: 'Short-form video content'
    },
    { 
      id: 'stories', 
      label: 'Instagram Stories', 
      icon: 'Smartphone',
      description: '24-hour temporary content'
    },
    { 
      id: 'youtube', 
      label: 'YouTube Videos', 
      icon: 'Play',
      description: 'Long-form video content'
    },
    { 
      id: 'tiktok', 
      label: 'TikTok Videos', 
      icon: 'Music',
      description: 'Short vertical videos'
    }
  ];

  const qualityOptions = [
    { value: 'standard', label: 'Standard Quality' },
    { value: 'high', label: 'High Quality (HD)' },
    { value: 'professional', label: 'Professional Quality (4K)' }
  ];

  const styleOptions = [
    { value: 'casual', label: 'Casual & Authentic' },
    { value: 'professional', label: 'Professional & Polished' },
    { value: 'lifestyle', label: 'Lifestyle & Aspirational' },
    { value: 'educational', label: 'Educational & Informative' },
    { value: 'entertaining', label: 'Fun & Entertaining' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('deliverables', { ...formData?.deliverables, [field]: value });
  };

  const handleContentTypeChange = (contentId, field, value) => {
    const updatedContent = { ...formData?.deliverables?.contentTypes };
    if (!updatedContent?.[contentId]) {
      updatedContent[contentId] = { enabled: false, quantity: 1, specifications: '' };
    }
    updatedContent[contentId][field] = value;
    updateFormData('deliverables', { ...formData?.deliverables, contentTypes: updatedContent });
  };

  const toggleContentType = (contentId) => {
    const updatedContent = { ...formData?.deliverables?.contentTypes };
    if (!updatedContent?.[contentId]) {
      updatedContent[contentId] = { enabled: true, quantity: 1, specifications: '' };
    } else {
      updatedContent[contentId].enabled = !updatedContent?.[contentId]?.enabled;
    }
    updateFormData('deliverables', { ...formData?.deliverables, contentTypes: updatedContent });
  };

  const handleRequirementChange = (requirement, checked) => {
    const updatedRequirements = { ...formData?.deliverables?.requirements };
    updatedRequirements[requirement] = checked;
    updateFormData('deliverables', { ...formData?.deliverables, requirements: updatedRequirements });
  };

  const addHashtag = () => {
    const hashtags = formData?.deliverables?.hashtags || [];
    updateFormData('deliverables', { 
      ...formData?.deliverables, 
      hashtags: [...hashtags, ''] 
    });
  };

  const updateHashtag = (index, value) => {
    const hashtags = [...(formData?.deliverables?.hashtags || [])];
    hashtags[index] = value;
    updateFormData('deliverables', { 
      ...formData?.deliverables, 
      hashtags 
    });
  };

  const removeHashtag = (index) => {
    const hashtags = [...(formData?.deliverables?.hashtags || [])];
    hashtags?.splice(index, 1);
    updateFormData('deliverables', { 
      ...formData?.deliverables, 
      hashtags 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="Package" size={18} className="text-error" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Deliverable Requirements</h3>
          <p className="text-sm text-muted-foreground">Specify what content creators need to deliver</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Content Types Required</h4>
          
          {contentTypes?.map((content) => {
            const contentData = formData?.deliverables?.contentTypes?.[content?.id] || { 
              enabled: false, 
              quantity: 1, 
              specifications: '' 
            };
            
            return (
              <div key={content?.id} className={`border rounded-lg p-4 transition-all ${
                contentData?.enabled ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={contentData?.enabled}
                      onChange={() => toggleContentType(content?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <Icon name={content?.icon} size={16} className="text-muted-foreground" />
                    <div>
                      <h5 className="text-sm font-medium text-foreground">{content?.label}</h5>
                      <p className="text-xs text-muted-foreground">{content?.description}</p>
                    </div>
                  </div>
                </div>
                {contentData?.enabled && (
                  <div className="space-y-3 mt-3 pt-3 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="Quantity Required"
                        type="number"
                        placeholder="1"
                        min="1"
                        value={contentData?.quantity}
                        onChange={(e) => handleContentTypeChange(content?.id, 'quantity', e?.target?.value)}
                        description="Number of pieces needed"
                      />
                      <div className="md:pt-6">
                        <p className="text-xs text-muted-foreground">
                          Total: {contentData?.quantity || 1} {content?.label?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Specific Requirements
                      </label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Describe specific requirements for this content type..."
                        value={contentData?.specifications}
                        onChange={(e) => handleContentTypeChange(content?.id, 'specifications', e?.target?.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Content Quality"
            placeholder="Select quality standard"
            options={qualityOptions}
            value={formData?.deliverables?.quality}
            onChange={(value) => handleInputChange('quality', value)}
            error={errors?.quality}
            required
            description="Minimum quality requirements"
          />

          <Select
            label="Content Style"
            placeholder="Select content style"
            options={styleOptions}
            value={formData?.deliverables?.style}
            onChange={(value) => handleInputChange('style', value)}
            error={errors?.style}
            required
            description="Preferred content tone and style"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Brand Guidelines & Key Messages
          </label>
          <textarea
            className="w-full min-h-[100px] px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Describe your brand guidelines, key messages, dos and don'ts..."
            value={formData?.deliverables?.guidelines}
            onChange={(e) => handleInputChange('guidelines', e?.target?.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include brand voice, visual style, mandatory mentions, and any restrictions
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-foreground">
              Required Hashtags
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={addHashtag}
              iconName="Plus"
              iconPosition="left"
            >
              Add Hashtag
            </Button>
          </div>
          
          <div className="space-y-2">
            {(formData?.deliverables?.hashtags || [])?.map((hashtag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="#yourbrand"
                  value={hashtag}
                  onChange={(e) => updateHashtag(index, e?.target?.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHashtag(index)}
                  iconName="X"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Add hashtags that creators must include in their posts
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Additional Requirements</h4>
          
          <Checkbox
            label="Product Tagging Required"
            description="Creators must tag your brand's social media accounts"
            checked={formData?.deliverables?.requirements?.productTagging || false}
            onChange={(e) => handleRequirementChange('productTagging', e?.target?.checked)}
          />

          <Checkbox
            label="Usage Rights Included"
            description="Brand can reuse content for marketing purposes"
            checked={formData?.deliverables?.requirements?.usageRights || false}
            onChange={(e) => handleRequirementChange('usageRights', e?.target?.checked)}
          />

          <Checkbox
            label="Content Approval Required"
            description="All content must be approved before publishing"
            checked={formData?.deliverables?.requirements?.approvalRequired || false}
            onChange={(e) => handleRequirementChange('approvalRequired', e?.target?.checked)}
          />

          <Checkbox
            label="Performance Reporting"
            description="Creators must provide engagement metrics after posting"
            checked={formData?.deliverables?.requirements?.performanceReporting || false}
            onChange={(e) => handleRequirementChange('performanceReporting', e?.target?.checked)}
          />
        </div>

        <div className="bg-secondary/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Sparkles" size={16} className="text-secondary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Content Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Clear deliverable requirements lead to better content quality</li>
                <li>• Provide examples or mood boards for visual reference</li>
                <li>• Balance creative freedom with brand guidelines</li>
                <li>• Consider seasonal trends and platform best practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverableRequirements;