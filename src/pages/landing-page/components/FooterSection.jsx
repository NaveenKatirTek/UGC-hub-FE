import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Dashboard', href: '/sign-in' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press Kit', href: '#press' }
    ],
    resources: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Guides', href: '#guides' },
      { label: 'API Docs', href: '#api' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: 'Twitter', href: '#twitter', label: 'Twitter' },
    { icon: 'Facebook', href: '#facebook', label: 'Facebook' },
    { icon: 'Instagram', href: '#instagram', label: 'Instagram' },
    { icon: 'Linkedin', href: '#linkedin', label: 'LinkedIn' },
    { icon: 'Youtube', href: '#youtube', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/landing-page" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elevation-1">
                <Icon name="Zap" size={24} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-foreground">BrandCreator Connect</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Connecting brands with creators through intelligent matching, automated bidding, and seamless collaboration tools.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.href}
                  aria-label={social?.label}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-hover"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-hover text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-hover text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-hover text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-hover text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} BrandCreator Connect. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-hover">
                Privacy
              </a>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-hover">
                Terms
              </a>
              <a href="#cookies" className="text-sm text-muted-foreground hover:text-primary transition-hover">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;