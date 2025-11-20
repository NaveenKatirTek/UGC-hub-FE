import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: 'UserPlus',
      title: 'Create Your Profile',
      description: 'Sign up as a brand or creator and build your professional profile with portfolio, metrics, and preferences.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: 'Search',
      title: 'Discover & Connect',
      description: 'Brands post campaigns, creators browse opportunities. Our smart matching algorithm connects the perfect partnerships.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: 'Rocket',
      title: 'Collaborate & Grow',
      description: 'Manage campaigns, communicate seamlessly, track performance, and build long-term successful partnerships.',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your influencer marketing strategy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps?.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border h-full transition-hover hover:shadow-elevation-3">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step?.color} flex items-center justify-center mb-6 shadow-elevation-2`}>
                  <Icon name={step?.icon} size={32} color="#FFFFFF" strokeWidth={2} />
                </div>
                
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {step?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>
              </div>

              {index < steps?.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <Icon name="ArrowRight" size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;