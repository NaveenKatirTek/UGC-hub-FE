import React, { useEffect } from 'react';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import DashboardPreviewSection from './components/DashboardPreviewSection';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-16">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default LandingPage;