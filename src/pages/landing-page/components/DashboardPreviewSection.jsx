import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const DashboardPreviewSection = () => {
  const previews = [
  {
    title: 'Brand Dashboard',
    description: 'Manage campaigns, review creator proposals, track performance metrics, and communicate with your influencer network all in one place.',
    image: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d",
    imageAlt: 'Modern analytics dashboard showing colorful charts, graphs, and campaign performance metrics on computer screen with clean interface design',
    features: ['Campaign Management', 'Creator Discovery', 'Analytics & Reports', 'Budget Tracking']
  },
  {
    title: 'Creator Dashboard',
    description: 'Browse opportunities, submit proposals, manage collaborations, showcase your portfolio, and grow your influencer business effortlessly.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ee054e0-1763548541208.png",
    imageAlt: 'Creative workspace dashboard displaying portfolio projects, social media metrics, and collaboration tools on laptop with vibrant color scheme',
    features: ['Opportunity Browser', 'Proposal System', 'Portfolio Showcase', 'Earnings Tracker']
  }];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dashboards Built for Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intuitive interfaces designed specifically for brands and creators
          </p>
        </motion.div>

        <div className="space-y-24">
          {previews?.map((preview, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>

              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {preview?.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {preview?.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {preview?.features?.map((feature, idx) =>
                <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                )}
                </div>
              </div>

              <div className="flex-1">
                <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-elevation-3 border border-border">

                  <Image
                  src={preview?.image}
                  alt={preview?.imageAlt}
                  className="w-full h-auto" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default DashboardPreviewSection;