import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={18} color="white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BrandCreator Connect
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/#features')}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => navigate('/#how-it-works')}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => navigate('/#pricing')}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/sign-in')}
            className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
          >
            Sign In
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/register-step-1')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
