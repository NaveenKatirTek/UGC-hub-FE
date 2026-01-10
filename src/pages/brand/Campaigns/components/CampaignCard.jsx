import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Calendar, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();
  
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    draft: 'bg-gray-100 text-gray-700 border-gray-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    rejected: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/brand/campaigns/${campaign.id}`)}
    >
      {/* Header / Status */}
      <div className="p-5 border-b border-gray-50 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {campaign.niche || 'General'}
          </span>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {campaign.title}
          </h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[campaign.status] || statusColors.draft}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>

      {/* Body / Info */}
      <div className="p-5 space-y-4">
        
        {/* Budget & Deadline */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1.5">
            <DollarSign size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">
              {campaign.currency} {parseFloat(campaign.budgetAmount).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar size={16} className="text-gray-400" />
            <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Location (City/State) */}
        {campaign.locationConfig && (
           <div className="flex items-center space-x-1.5 text-sm text-gray-500">
             <MapPin size={16} className="text-gray-400" />
             <span className="truncate">
               {campaign.locationConfig.city || campaign.locationConfig.state || 'Remote / Pan-India'}
             </span>
           </div>
        )}

        {/* Applications Progress (Mock for now, real later) */}
        <div className="space-y-1.5">
           <div className="flex justify-between text-xs">
              <span className="text-gray-500">Applications</span>
              <span className="font-medium text-gray-900">12 / 50</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '24%' }}></div>
           </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-5 py-3 bg-gray-50 flex justify-end items-center group-hover:bg-primary/5 transition-colors">
        <span className="text-sm font-medium text-primary flex items-center">
          View Details <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
