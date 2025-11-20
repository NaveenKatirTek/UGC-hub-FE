import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
            <Icon name="Sparkles" size={16} color="#FFFFFF" />
            <span className="text-sm font-medium text-white">Trusted by 10,000+ Brands & Creators</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Where Brands & Creators
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Connect Smarter
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your influencer marketing with automated bidding, seamless collaboration, and data-driven campaign management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/register-step-1')}
              className="bg-white text-indigo-600 hover:bg-white/90 shadow-elevation-3 min-w-[200px]"
              iconName="Building2"
              iconPosition="left"
            >
              Sign Up as Brand
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/register-step-1')}
              className="border-2 border-white text-white hover:bg-white/10 min-w-[200px]"
              iconName="User"
              iconPosition="left"
            >
              Sign Up as Creator
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/sign-in')}
              className="text-white hover:bg-white/10 min-w-[200px]"
              iconName="LogIn"
              iconPosition="left"
            >
              Login
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50K+', label: 'Campaigns Launched' },
              { value: '95%', label: 'Success Rate' },
              { value: '$2M+', label: 'Creator Earnings' }
            ]?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat?.value}</div>
                <div className="text-sm text-white/80">{stat?.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} color="#FFFFFF" strokeWidth={2} />
      </div>
    </section>
  );
};

export default HeroSection;