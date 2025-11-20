import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStyle Co.',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fcc1787b-1763299824847.png",
    avatarAlt: 'Professional headshot of blonde woman with warm smile wearing navy blazer against neutral background',
    content: 'BrandCreator Connect transformed our influencer marketing strategy. We found perfect creators for our campaigns and saw a 300% increase in engagement within three months.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Content Creator',
    company: '@marcuslifestyle',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce519685-1763295042386.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair and friendly expression wearing casual blue shirt',
    content: 'As a creator, this platform made it so easy to find brand partnerships that align with my values. The bidding system is transparent and the payment process is seamless.',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Brand Manager',
    company: 'Wellness Brands Inc.',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1b32f79-1763293656871.png",
    avatarAlt: 'Professional headshot of Asian woman with long dark hair wearing white blouse with confident smile',
    content: 'The analytics dashboard gives us real-time insights into campaign performance. We can make data-driven decisions and optimize our influencer partnerships effectively.',
    rating: 5
  },
  {
    name: 'David Thompson',
    role: 'Influencer',
    company: '@davidfitness',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15f002d89-1763294705593.png",
    avatarAlt: 'Professional headshot of athletic man with short brown hair wearing black athletic wear with determined expression',
    content: 'I have doubled my brand partnerships since joining. The platform makes it easy to showcase my work and connect with brands that value authentic content creation.',
    rating: 5
  },
  {
    name: 'Lisa Anderson',
    role: 'CEO',
    company: 'Beauty Collective',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e64c7e4a-1763294930430.png",
    avatarAlt: 'Professional headshot of woman with red hair wearing elegant black dress with professional demeanor',
    content: 'The automated bidding system saves us countless hours. We can review multiple proposals quickly and select creators who truly understand our brand vision.',
    rating: 5
  },
  {
    name: 'James Wilson',
    role: 'Digital Creator',
    company: '@jamestravel',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1137cabc3-1763294027055.png",
    avatarAlt: 'Professional headshot of man with beard wearing casual denim jacket with adventurous smile outdoors',
    content: 'The messaging system keeps all communication organized. I can manage multiple brand collaborations without missing important details or deadlines.',
    rating: 5
  }];


  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what brands and creators are saying about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border transition-hover hover:shadow-elevation-3">

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial?.rating)]?.map((_, i) =>
              <Icon key={i} name="Star" size={20} color="#F59E0B" fill="#F59E0B" />
              )}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial?.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                  <div className="text-sm text-primary">{testimonial?.company}</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center">

          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-card border border-border shadow-elevation-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">2,500+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TestimonialsSection;