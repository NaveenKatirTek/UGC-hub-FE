import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PhoneInput from '../../../components/ui/PhoneInput';
import ProfileImageUpload from './ProfileImageUpload';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BrandRegistrationForm = ({ formData, errors, onChange, onImageChange, onSubmit, onBack }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPaymentPolicy, setAcceptedPaymentPolicy] = useState(false);
  const [acceptedNDA, setAcceptedNDA] = useState(false);

  const industryOptions = [
    { value: 'fashion', label: 'Fashion' },
    { value: 'automobile', label: 'Automobile' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'finance', label: 'Finance' },
    { value: 'technology', label: 'Technology' },
    { value: 'retail', label: 'Retail' },
    { value: 'education', label: 'Education' }
  ];

  const companyTypeOptions = [
    { value: 'sole_proprietor', label: 'Sole Proprietor' },
    { value: 'private_ltd', label: 'Private LTD' },
    { value: 'llp', label: 'LLP' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'public_ltd', label: 'Public LTD' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' }
  ];

  const districtOptions = {
    maharashtra: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' }
    ],
    karnataka: [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' }
    ],
    delhi: [
      { value: 'central_delhi', label: 'Central Delhi' },
      { value: 'south_delhi', label: 'South Delhi' }
    ]
  };

  const validateSection1 = () => {
    const newErrors = {};
    
    if (!formData?.businessName?.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData?.mobile?.number || formData?.mobile?.number?.length !== 10) {
      newErrors.mobile = 'Valid 10-digit mobile number required';
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
    
    if (!formData?.companyLogo) {
      newErrors.companyLogo = 'Company logo is required';
    }
    
    return newErrors;
  };

  const validateSection2 = () => {
    const newErrors = {};
    
    if (!formData?.industryType) {
      newErrors.industryType = 'Industry type is required';
    }
    
    if (!formData?.companyType) {
      newErrors.companyType = 'Company type is required';
    }
    
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData?.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData?.district) {
      newErrors.district = 'District is required';
    }
    
    return newErrors;
  };

  const validateSection3 = () => {
    const newErrors = {};
    
    if (!formData?.adminName?.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    
    if (!formData?.designation?.trim()) {
      newErrors.designation = 'Designation is required';
    }
    
    if (!formData?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    
    if (!formData?.adminMobile?.number || formData?.adminMobile?.number?.length !== 10) {
      newErrors.adminMobile = 'Valid 10-digit mobile number required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.adminEmail?.trim() || !emailRegex?.test(formData?.adminEmail)) {
      newErrors.adminEmail = 'Valid email is required';
    }
    
    if (!acceptedTerms || !acceptedPaymentPolicy || !acceptedNDA) {
      newErrors.agreements = 'All agreements must be accepted';
    }
    
    return newErrors;
  };

  const handleNextSection = () => {
    let sectionErrors = {};
    
    if (currentSection === 1) {
      sectionErrors = validateSection1();
    } else if (currentSection === 2) {
      sectionErrors = validateSection2();
    }
    
    if (Object.keys(sectionErrors)?.length === 0) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      Object.keys(sectionErrors)?.forEach(key => {
        onChange(key, formData?.[key], sectionErrors?.[key]);
      });
    }
  };

  const handleSubmitForm = () => {
    let sectionErrors = validateSection3();
    if (Object.keys(sectionErrors)?.length === 0) {
      onSubmit?.();
    } else {
      Object.keys(sectionErrors)?.forEach(key => {
        onChange(key, formData?.[key], sectionErrors?.[key]);
      });
    }
  };

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          {[1, 2, 3]?.map((section) => (
            <React.Fragment key={section}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentSection === section ? 'bg-primary text-primary-foreground' : currentSection > section ? 'bg-primary/20 text-primary' : 'bg-border text-muted-foreground'}`}>
                {section}
              </div>
              {section < 3 && (
                <div className={`h-1 w-16 ${currentSection > section ? 'bg-primary' : 'bg-border'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {currentSection === 1 && 'Company Basic Info'}
          {currentSection === 2 && 'Business Details'}
          {currentSection === 3 && 'Brand Contact Info'}
        </p>
      </div>
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <motion.div
            key="section1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Input
              label="Business Name"
              type="text"
              placeholder="Enter your business name"
              value={formData?.businessName || ''}
              onChange={(e) => onChange('businessName', e?.target?.value)}
              error={errors?.businessName}
              required
            />

            <Input
              label="Brand Username"
              type="text"
              placeholder="Auto-generated unique username"
              value={formData?.brandUsername || `brand_${Date.now()}`}
              disabled
              className="bg-muted"
            />

            <PhoneInput
              label="Mobile Number"
              value={formData?.mobile || {}}
              onChange={(val) => onChange('mobile', val)}
              error={errors?.mobile}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email ID"
                type="email"
                placeholder="business.email@company.com"
                value={formData?.email || ''}
                onChange={(e) => onChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create strong password"
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

            <ProfileImageUpload
              value={formData?.companyLogo}
              onChange={(val) => onChange('companyLogo', val)}
              error={errors?.companyLogo}
              label="Company Logo Upload"
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
                onClick={handleNextSection}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 2 && (
          <motion.div
            key="section2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Industry Type"
                options={industryOptions}
                value={formData?.industryType || ''}
                onChange={(val) => onChange('industryType', val)}
                error={errors?.industryType}
                required
                searchable
              />

              <Select
                label="Company Type"
                options={companyTypeOptions}
                value={formData?.companyType || ''}
                onChange={(val) => onChange('companyType', val)}
                error={errors?.companyType}
                required
              />
            </div>

            <Input
              label="Website"
              type="url"
              placeholder="https://www.yourcompany.com (optional)"
              value={formData?.website || ''}
              onChange={(e) => onChange('website', e?.target?.value)}
            />

            <Input
              label="Address"
              type="text"
              placeholder="Enter complete business address"
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
                label="District"
                options={districtOptions?.[formData?.state] || []}
                value={formData?.district || ''}
                onChange={(val) => onChange('district', val)}
                error={errors?.district}
                required
                disabled={!formData?.state}
              />
            </div>

            <Input
              label="GST Number"
              type="text"
              placeholder="Enter GST number (optional)"
              value={formData?.gstNumber || ''}
              onChange={(e) => onChange('gstNumber', e?.target?.value)}
            />

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Social Media Links (Optional)
              </label>
              <Input
                placeholder="Instagram - https://instagram.com/yourbrand"
                value={formData?.socialMedia?.instagram || ''}
                onChange={(e) => onChange('socialMedia', { ...formData?.socialMedia, instagram: e?.target?.value })}
              />
              <Input
                placeholder="Facebook - https://facebook.com/yourbrand"
                value={formData?.socialMedia?.facebook || ''}
                onChange={(e) => onChange('socialMedia', { ...formData?.socialMedia, facebook: e?.target?.value })}
              />
              <Input
                placeholder="LinkedIn - https://linkedin.com/company/yourbrand"
                value={formData?.socialMedia?.linkedin || ''}
                onChange={(e) => onChange('socialMedia', { ...formData?.socialMedia, linkedin: e?.target?.value })}
              />
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentSection(1)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNextSection}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {currentSection === 3 && (
          <motion.div
            key="section3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Input
              label="Admin Name"
              type="text"
              placeholder="Enter admin full name"
              value={formData?.adminName || ''}
              onChange={(e) => onChange('adminName', e?.target?.value)}
              error={errors?.adminName}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Designation"
                type="text"
                placeholder="e.g., Marketing Manager"
                value={formData?.designation || ''}
                onChange={(e) => onChange('designation', e?.target?.value)}
                error={errors?.designation}
                required
              />

              <Input
                label="Employee ID / Number"
                type="text"
                placeholder="Enter employee ID"
                value={formData?.employeeId || ''}
                onChange={(e) => onChange('employeeId', e?.target?.value)}
                error={errors?.employeeId}
                required
              />
            </div>

            <PhoneInput
              label="Mobile Number"
              value={formData?.adminMobile || {}}
              onChange={(val) => onChange('adminMobile', val)}
              error={errors?.adminMobile}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="admin.email@company.com"
              value={formData?.adminEmail || ''}
              onChange={(e) => onChange('adminEmail', e?.target?.value)}
              error={errors?.adminEmail}
              required
            />

            <div className="space-y-4 pt-6 border-t border-border">
              <Checkbox
                label="I accept the Terms & Conditions"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e?.target?.checked)}
                required
              />
              <Checkbox
                label="I accept the Payment Policy"
                checked={acceptedPaymentPolicy}
                onChange={(e) => setAcceptedPaymentPolicy(e?.target?.checked)}
                required
              />
              <Checkbox
                label="I accept the NDA / IP Rights Clause"
                checked={acceptedNDA}
                onChange={(e) => setAcceptedNDA(e?.target?.checked)}
                required
              />
              {errors?.agreements && (
                <p className="text-sm text-destructive">{errors?.agreements}</p>
              )}
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentSection(2)}
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

export default BrandRegistrationForm;