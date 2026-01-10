import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Megaphone, Wallet, MessageSquare, Settings, LogOut, Menu, X, User } from 'lucide-react';

const BrandLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Mock user for now
    const user = { name: "KatirTek Brand", avatar: null }; 

    const userNavigation = [
        { name: 'Dashboard', href: '/brand/dashboard', icon: PieChart },
        { name: 'Campaigns', href: '/brand/campaigns', icon: Megaphone },
        { name: 'Wallet', href: '/brand/wallet', icon: Wallet },
        { name: 'Messages', href: '/brand/messages', icon: MessageSquare },
        { name: 'Settings', href: '/brand/settings', icon: Settings },
    ];

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-50">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            InfluencerHub
                        </span>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {userNavigation.map((item) => {
                            const isActive = location.pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon size={20} className={`mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-gray-50">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <User size={20} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500">Brand Account</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-500">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-900">InfluencerHub</span>
                    <div className="w-8" />
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default BrandLayout;
