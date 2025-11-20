import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import MultiSelect from '../../../components/ui/MultiSelect';
import PhoneInput from '../../../components/ui/PhoneInput';
import ProfileImageUpload from './ProfileImageUpload';
import Button from '../../../components/ui/Button';

const CreatorRegistrationForm = ({ formData, errors, onChange, onImageChange, onSubmit, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
    { value: 'west_bengal', label: 'West Bengal' }
  ];

  const cityOptions = {
    maharashtra: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' }
    ],
    karnataka: [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' },
      { value: 'mangalore', label: 'Mangalore' }
    ],
    delhi: [
      { value: 'new_delhi', label: 'New Delhi' },
      { value: 'south_delhi', label: 'South Delhi' },
      { value: 'north_delhi', label: 'North Delhi' }
    ]
  };

  const nicheOptions = [
    { value: 'fashion', label: 'Fashion' },
    { value: 'food', label: 'Food' },
    { value: 'finance', label: 'Finance' },
    { value: 'automobile', label: 'Automobile' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'technology', label: 'Technology' },
    { value: 'gaming', label: 'Gaming' }
  ];

  const contentTypeOptions = [
    { value: 'reels', label: 'Reels' },
    { value: 'photos', label: 'Photos' },
    { value: 'links', label: 'Links' },
    { value: 'stories', label: 'Stories' },
    { value: 'videos', label: 'Videos' },
    { value: 'blogs', label: 'Blogs' }
  ];

  const validatePage1 = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim() || !/^[a-zA-Z\s]+$/?.test(formData?.name)) {
      newErrors.name = 'Name must contain only alphabetic characters';
    }
    
    if (!formData?.profileImage) {
      newErrors.profileImage = 'Profile picture is required (JPEG only, max 2 MB)';
    }
    
    if (!formData?.mobile?.number || formData?.mobile?.number?.length !== 10) {
      newErrors.mobile = 'Valid 10-digit mobile number required';
    }
    
    if (!formData?.languagesKnown || formData?.languagesKnown?.length === 0) {
      newErrors.languagesKnown = 'Select at least one language';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim() || !emailRegex?.test(formData?.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!formData?.password || !passwordRegex?.test(formData?.password)) {
      newErrors.password = 'Password must include alphabet, number & symbol';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData?.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData?.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData?.categories || formData?.categories?.length === 0) {
      newErrors.categories = 'Select at least one category';
    }
    
    if (!formData?.contentTypes || formData?.contentTypes?.length === 0) {
      newErrors.contentTypes = 'Select at least one content type';
    }
    
    if (!formData?.collaborationPrice || isNaN(formData?.collaborationPrice)) {
      newErrors.collaborationPrice = 'Valid numeric price is required';
    }
    
    return newErrors;
  };

  const validatePage2 = () => {
    const newErrors = {};
    
    if (!formData?.instagramUsername?.trim()) {
      newErrors.instagramUsername = 'Instagram username is required';
    }
    
    if (!formData?.instagramProfile?.trim()) {
      newErrors.instagramProfile = 'Instagram profile link is required';
    }
    
    if (!formData?.instagramFollowers || isNaN(formData?.instagramFollowers)) {
      newErrors.instagramFollowers = 'Valid follower count required';
    }
    
    if (!formData?.engagementRatio || isNaN(formData?.engagementRatio)) {
      newErrors.engagementRatio = 'Valid engagement ratio required';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const pageErrors = validatePage1();
    if (Object.keys(pageErrors)?.length === 0) {
      setCurrentPage(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      Object.keys(pageErrors)?.forEach(key => {
        onChange(key, formData?.[key], pageErrors?.[key]);
      });
    }
  };

  const handleSubmitForm = () => {
    const pageErrors = validatePage2();
    if (Object.keys(pageErrors)?.length === 0) {
      onSubmit?.();
    } else {
      Object.keys(pageErrors)?.forEach(key => {
        onChange(key, formData?.[key], pageErrors?.[key]);
      });
    }
  };

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'}`}>
            1
          </div>
          <div className={`h-1 w-16 ${currentPage === 2 ? 'bg-primary' : 'bg-border'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 2 ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'}`}>
            2
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {currentPage === 1 ? 'Basic Information' : 'Social & Performance Info'}
        </p>
      </div>
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Input
              label="Name"
              type="text"
              placeholder="Enter your full name (alphabets only)"
              value={formData?.name || ''}
              onChange={(e) => onChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Username"
              type="text"
              placeholder="Auto-generated unique username"
              value={formData?.username || `creator_${Date.now()}`}
              disabled
              className="bg-muted"
            />

            <ProfileImageUpload
              value={formData?.profileImage}
              onChange={onImageChange}
              error={errors?.profileImage}
              acceptedFormats=".jpeg,.jpg"
              maxSize={2}
            />

            <PhoneInput
              label="Mobile Number"
              value={formData?.mobile || {}}
              onChange={(val) => onChange('mobile', val)}
              error={errors?.mobile}
              required
            />

            <MultiSelect
              label="Languages Known"
              options={languageOptions}
              value={formData?.languagesKnown || []}
              onChange={(val) => onChange('languagesKnown', val)}
              error={errors?.languagesKnown}
              required
              searchable
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email ID"
                type="email"
                placeholder="your.email@example.com"
                value={formData?.email || ''}
                onChange={(e) => onChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Must include alphabet, number & symbol"
                value={formData?.password || ''}
                onChange={(e) => onChange('password', e?.target?.value)}
                error={errors?.password}
                required
              />
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData?.confirmPassword || ''}
              onChange={(e) => onChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />

            <Input
              label="Address"
              type="text"
              placeholder="Enter your complete address"
              value={formData?.address || ''}
              onChange={(e) => onChange('address', e?.target?.value)}
              error={errors?.address}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="State"
                options={stateOptions}
                value={formData?.state || ''}
                onChange={(val) => onChange('state', val)}
                error={errors?.state}
                required
                searchable
              />

              <Select
                label="City"
                options={cityOptions?.[formData?.state] || []}
                value={formData?.city || ''}
                onChange={(val) => onChange('city', val)}
                error={errors?.city}
                required
                disabled={!formData?.state}
              />
            </div>

            <MultiSelect
              label="Category / Niche"
              options={nicheOptions}
              value={formData?.categories || []}
              onChange={(val) => onChange('categories', val)}
              error={errors?.categories}
              required
              searchable
            />

            <MultiSelect
              label="Content Type"
              options={contentTypeOptions}
              value={formData?.contentTypes || []}
              onChange={(val) => onChange('contentTypes', val)}
              error={errors?.contentTypes}
              required
            />

            <Input
              label="Average Collaboration Price"
              type="number"
              placeholder="Enter amount in USD"
              value={formData?.collaborationPrice || ''}
              onChange={(e) => onChange('collaborationPrice', e?.target?.value)}
              error={errors?.collaborationPrice}
              required
            />

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Instagram Username"
                type="text"
                placeholder="@yourusername"
                value={formData?.instagramUsername || ''}
                onChange={(e) => onChange('instagramUsername', e?.target?.value)}
                error={errors?.instagramUsername}
                required
              />

              <Input
                label="Instagram Profile Link"
                type="url"
                placeholder="https://instagram.com/yourusername"
                value={formData?.instagramProfile || ''}
                onChange={(e) => onChange('instagramProfile', e?.target?.value)}
                error={errors?.instagramProfile}
                required
              />
            </div>

            <Input
              label="Instagram Follower Count"
              type="number"
              placeholder="Enter follower count"
              value={formData?.instagramFollowers || ''}
              onChange={(e) => onChange('instagramFollowers', e?.target?.value)}
              error={errors?.instagramFollowers}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Facebook Username"
                type="text"
                placeholder="@yourusername (optional)"
                value={formData?.facebookUsername || ''}
                onChange={(e) => onChange('facebookUsername', e?.target?.value)}
              />

              <Input
                label="Facebook Profile Link"
                type="url"
                placeholder="https://facebook.com/yourusername (optional)"
                value={formData?.facebookProfile || ''}
                onChange={(e) => onChange('facebookProfile', e?.target?.value)}
              />
            </div>

            <Input
              label="Facebook Follower Count"
              type="number"
              placeholder="Enter follower count (optional)"
              value={formData?.facebookFollowers || ''}
              onChange={(e) => onChange('facebookFollowers', e?.target?.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="YouTube Username"
                type="text"
                placeholder="@yourchannel (optional)"
                value={formData?.youtubeUsername || ''}
                onChange={(e) => onChange('youtubeUsername', e?.target?.value)}
              />

              <Input
                label="YouTube Channel Link"
                type="url"
                placeholder="https://youtube.com/@yourchannel (optional)"
                value={formData?.youtubeChannel || ''}
                onChange={(e) => onChange('youtubeChannel', e?.target?.value)}
              />
            </div>

            <Input
              label="YouTube Follower Count"
              type="number"
              placeholder="Enter subscriber count (optional)"
              value={formData?.youtubeFollowers || ''}
              onChange={(e) => onChange('youtubeFollowers', e?.target?.value)}
            />

            <Input
              label="Engagement Ratio"
              type="number"
              step="0.01"
              placeholder="Enter engagement ratio (e.g., 3.5)"
              value={formData?.engagementRatio || ''}
              onChange={(e) => onChange('engagementRatio', e?.target?.value)}
              error={errors?.engagementRatio}
              required
            />

            <div className="flex justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentPage(1)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleSubmitForm}
                iconName="Check"
                iconPosition="right"
              >
                Complete Registration
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorRegistrationForm;