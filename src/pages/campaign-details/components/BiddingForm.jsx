import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BiddingForm = ({ campaign, onSubmitBid, isSubmitting }) => {
  const [bidData, setBidData] = useState({
    price: '',
    proposal: '',
    deliveryTimeline: '',
    pitchFile: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const deliveryOptions = [
    { value: '3', label: '3 days' },
    { value: '5', label: '5 days' },
    { value: '7', label: '1 week' },
    { value: '10', label: '10 days' },
    { value: '14', label: '2 weeks' },
    { value: '21', label: '3 weeks' },
    { value: '30', label: '1 month' }
  ];

  const handleInputChange = (field, value) => {
    setBidData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setBidData(prev => ({ ...prev, pitchFile: file }));
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bidData?.price || parseFloat(bidData?.price) <= 0) {
      newErrors.price = 'Please enter a valid bid amount';
    } else if (parseFloat(bidData?.price) < 1000) {
      newErrors.price = 'Minimum bid amount is ₹1,000';
    } else if (parseFloat(bidData?.price) > campaign?.budget?.perCreator * 2) {
      newErrors.price = `Maximum bid cannot exceed ₹${(campaign?.budget?.perCreator * 2)?.toLocaleString('en-IN')}`;
    }

    if (!bidData?.proposal || bidData?.proposal?.trim()?.length < 50) {
      newErrors.proposal = 'Proposal must be at least 50 characters long';
    }

    if (!bidData?.deliveryTimeline) {
      newErrors.deliveryTimeline = 'Please select expected delivery timeline';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmitBid(bidData);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Send" size={20} className="mr-2 text-primary" />
        Submit Your Bid
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Your Bid Amount"
            type="number"
            placeholder="Enter amount in ₹"
            value={bidData?.price}
            onChange={(e) => handleInputChange('price', e?.target?.value)}
            error={errors?.price}
            required
            description={`Budget range: ₹${(campaign?.budget?.perCreator * 0.5)?.toLocaleString('en-IN')} - ₹${(campaign?.budget?.perCreator * 1.5)?.toLocaleString('en-IN')}`}
            className="mb-4"
          />
          {bidData?.price && (
            <div className="mt-2 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your bid:</span>
                <span className="font-semibold text-foreground">₹{parseFloat(bidData?.price || 0)?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform fee (5%):</span>
                <span className="text-muted-foreground">₹{(parseFloat(bidData?.price || 0) * 0.05)?.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-border mt-2 pt-2 flex items-center justify-between text-sm font-medium">
                <span className="text-foreground">You'll receive:</span>
                <span className="text-success">₹{(parseFloat(bidData?.price || 0) * 0.95)?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Proposal <span className="text-error">*</span>
          </label>
          <textarea
            value={bidData?.proposal}
            onChange={(e) => handleInputChange('proposal', e?.target?.value)}
            placeholder={`Tell ${campaign?.brand?.name} why you're the perfect fit for this campaign...`}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
          />
          <div className="flex items-center justify-between mt-1">
            {errors?.proposal && (
              <span className="text-xs text-error">{errors?.proposal}</span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {bidData?.proposal?.length}/500 characters
            </span>
          </div>
        </div>

        <div>
          <Select
            label="Expected Delivery Timeline"
            options={deliveryOptions}
            value={bidData?.deliveryTimeline}
            onChange={(value) => handleInputChange('deliveryTimeline', value)}
            error={errors?.deliveryTimeline}
            required
            placeholder="Select delivery timeline"
            description="When can you deliver the completed content?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Video/Voice Pitch (Optional)
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            {bidData?.pitchFile ? (
              <div className="space-y-2">
                <Icon name="CheckCircle" size={24} className="text-success mx-auto" />
                <p className="text-sm font-medium text-foreground">{bidData?.pitchFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(bidData?.pitchFile?.size / 1024 / 1024)?.toFixed(2)} MB
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBidData(prev => ({ ...prev, pitchFile: null }))}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Icon name="Upload" size={24} className="text-muted-foreground mx-auto" />
                <p className="text-sm font-medium text-foreground">Upload a video or voice pitch</p>
                <p className="text-xs text-muted-foreground">
                  Stand out with a personal introduction (Max 50MB, MP4/MP3)
                </p>
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pitch-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('pitch-upload')?.click()}
                  type="button"
                >
                  Choose File
                </Button>
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Before you submit:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Make sure you meet all eligibility criteria</li>
                <li>• Your proposal should be specific to this campaign</li>
                <li>• Include examples of similar work if relevant</li>
                <li>• Be realistic with your delivery timeline</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <Icon name="Clock" size={14} className="inline mr-1" />
            Bid deadline: {campaign?.bidDeadline}
          </div>
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
            className="px-8"
          >
            Submit Bid
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BiddingForm;