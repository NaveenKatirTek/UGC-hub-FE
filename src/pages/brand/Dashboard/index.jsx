import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallet } from '../../../store/slices/brandWalletSlice';
import { fetchCampaigns } from '../../../store/slices/brandCampaignSlice';
import { Wallet, Megaphone, Users, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={22} className="text-white" />
        </div>
    </div>
);

const BrandDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Selectors
    const { balance, currency } = useSelector(state => state.brandWallet);
    const { items: campaigns, loading } = useSelector(state => state.brandCampaigns);

    useEffect(() => {
        dispatch(fetchWallet());
        dispatch(fetchCampaigns());
    }, [dispatch]);

    // Derived Stats
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalSpent = '0'; // Mock for now, or fetch from transactions
    const totalApps = 12; // Mock

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, KatirTek Brand</p>
                </div>
                <div className="flex space-x-3">
                     <button onClick={() => navigate('/brand/campaigns/new')} className="bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center hover:bg-gray-800 transition-colors">
                        <Plus size={16} className="mr-2" /> Create Campaign
                     </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Wallet Balance" 
                    value={`${currency} ${parseFloat(balance).toLocaleString()}`} 
                    icon={Wallet} 
                    color="bg-purple-500"
                    subtext="Available for campaigns"
                />
                <StatCard 
                    title="Active Campaigns" 
                    value={activeCampaigns} 
                    icon={Megaphone} 
                    color="bg-blue-500"
                    subtext={`${campaigns.length} total`}
                />
                <StatCard 
                    title="Total Applications" 
                    value={totalApps} 
                    icon={Users} 
                    color="bg-green-500"
                    subtext="+5 today"
                />
                <StatCard 
                    title="Total Spent" 
                    value={`${currency} ${totalSpent}`} 
                    icon={TrendingUp} 
                    color="bg-orange-500"
                    subtext="Lifetime spend"
                />
            </div>

            {/* Recent Campaigns Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Campaign Table (Simplified) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Campaigns</h3>
                        <button onClick={() => navigate('/brand/campaigns')} className="text-sm text-primary font-medium hover:underline">View All</button>
                    </div>
                    <div className="p-0">
                         {campaigns.length === 0 ? (
                             <div className="p-8 text-center text-gray-500 text-sm">No campaigns found. Create one to get started!</div>
                         ) : (
                             <div className="divide-y divide-gray-50">
                                 {campaigns.slice(0, 5).map(c => (
                                     <div key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/brand/campaigns/${c.id}`)}>
                                         <div className="flex items-center space-x-4">
                                             <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs uppercase">
                                                 {c.niche?.[0] || 'G'}
                                             </div>
                                             <div>
                                                 <h4 className="font-medium text-gray-900 text-sm">{c.title}</h4>
                                                 <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</p>
                                             </div>
                                         </div>
                                         <div className="flex items-center space-x-4">
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                 {c.status}
                                             </span>
                                             <span className="text-sm font-semibold text-gray-700">{c.currency} {c.budgetAmount}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary/10 to-purple-100 p-6 rounded-2xl border border-primary/10">
                        <h3 className="font-bold text-primary mb-2">Pro Tip</h3>
                        <p className="text-sm text-gray-600 mb-4">Complete your profile verification to unlock higher budget limits and access premium influencers.</p>
                        <button className="text-sm font-semibold text-primary bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">Verify Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandDashboard;
