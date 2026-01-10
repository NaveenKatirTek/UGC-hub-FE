import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../../../store/slices/brandCampaignSlice';
import CampaignCard from './components/CampaignCard';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.brandCampaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading && items.length === 0) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
        </div>
    );
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your active and drafted campaigns</p>
        </div>
        <button
          onClick={() => navigate('/brand/campaigns/new')}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>Create New</span>
        </button>
      </div>

      {/* Grid List */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
        
        {items.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No campaigns yet</h3>
                <p className="text-gray-500 mt-1 max-w-sm mx-auto">Start your first campaign to connect with influencers in your area.</p>
                <button 
                    onClick={() => navigate('/brand/campaigns/new')}
                    className="mt-6 text-primary font-medium hover:underline"
                >
                    Create a Campaign Now
                </button>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default CampaignList;
