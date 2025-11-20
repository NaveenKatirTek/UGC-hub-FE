import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AuthStateIndicator from '../../components/ui/AuthStateIndicator';
import AccountTypeCard from './components/AccountTypeCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [selectedAccountType, setSelectedAccountType] = useState(null);

  const accountTypes = [
    {
      type: 'brand',
      title: 'Brand',
      description: 'Connect with creators to amplify your brand message',
      iconName: 'Building2',
      features: [
        'Create and manage campaigns',
        'Browse creator portfolios',
        'Automated bidding system',
        'Real-time collaboration tools',
        'Performance analytics dashboard'
      ]
    },
    {
      type: 'creator',
      title: 'Creator',
      description: 'Monetize your influence and grow your brand partnerships',
      iconName: 'User',
      features: [
        'Discover brand opportunities',
        'Submit competitive bids',
        'Showcase your portfolio',
        'Direct brand messaging',
        'Track earnings and performance'
      ]
    }
  ];

  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
  };

  const handleContinue = () => {
    if (!selectedAccountType) {
      return;
    }
    navigate('/register-step-2', { state: { accountType: selectedAccountType } });
  };

  const handleBackToSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <Helmet>
        <title>Choose Account Type - BrandCreator Connect</title>
        <meta name="description" content="Select your account type to get started with BrandCreator Connect. Join as a Brand or Creator to unlock powerful collaboration tools." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950">
        <Header />

        <main className="pt-24 pb-16 px-5 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Choose Your Account Type
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the account type that best describes you to get started with BrandCreator Connect
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <AuthStateIndicator currentStep={1} totalSteps={2} />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {accountTypes?.map((account, index) => (
                <motion.div
                  key={account?.type}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <AccountTypeCard
                    type={account?.type}
                    title={account?.title}
                    description={account?.description}
                    features={account?.features}
                    iconName={account?.iconName}
                    isSelected={selectedAccountType === account?.type}
                    onSelect={() => handleAccountTypeSelect(account?.type)}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleBackToSignIn}
                iconName="ArrowLeft"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Back to Sign In
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleContinue}
                disabled={!selectedAccountType}
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full sm:w-auto gradient-primary"
              >
                Continue to Registration
              </Button>
            </motion.div>

            {!selectedAccountType && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20">
                  <Icon name="AlertCircle" size={18} color="var(--color-warning)" />
                  <span className="text-sm text-warning">Please select an account type to continue</span>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={handleBackToSignIn}
                  className="text-primary font-medium hover:underline transition-hover"
                >
                  Sign in here
                </button>
              </p>
            </motion.div>
          </div>
        </main>

        <footer className="py-8 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-5 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date()?.getFullYear()} BrandCreator Connect. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-hover">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-hover">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-hover">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegisterStep1;