import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Target',
      title: 'Smart Campaign System',
      description: 'Create detailed campaigns with specific requirements, budgets, and timelines. Our AI matches you with the perfect creators for your brand.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'TrendingUp',
      title: 'Automated Bidding',
      description: 'Creators bid on campaigns with custom proposals. Brands review, compare, and select the best fit with transparent pricing and deliverables.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'MessageSquare',
      title: 'Seamless Messaging',
      description: 'Built-in chat system for real-time communication. Share files, discuss ideas, and collaborate efficiently without leaving the platform.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: 'CreditCard',
      title: 'Flexible Subscriptions',
      description: 'Choose from Free, Pro, or Enterprise plans. Scale your influencer marketing efforts with features that grow with your business needs.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: 'BarChart3',
      title: 'Performance Analytics',
      description: 'Track campaign metrics, engagement rates, and ROI in real-time. Make data-driven decisions with comprehensive reporting dashboards.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'Shield',
      title: 'Secure Payments',
      description: 'Escrow-protected transactions ensure safe payments. Funds released upon campaign completion with dispute resolution support.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to run successful influencer campaigns from start to finish
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border transition-hover hover:shadow-elevation-3"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center mb-6 shadow-elevation-1`}>
                <Icon name={feature?.icon} size={28} color="#FFFFFF" strokeWidth={2} />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;