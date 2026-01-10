import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallet, fetchTransactions } from '../../../store/slices/brandWalletSlice';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock, Search, Filter } from 'lucide-react';
import api from '../../../utils/api';
import { motion } from 'framer-motion';

const BrandWallet = () => {
  const dispatch = useDispatch();
  const { balance, currency, transactions, loading } = useSelector(state => state.brandWallet);
  const [addingFunds, setAddingFunds] = useState(false);

  useEffect(() => {
    dispatch(fetchWallet());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleAddFunds = async () => {
    // Mock Payment Gateway Logic
    setAddingFunds(true);
    try {
        const amount = prompt("Enter amount to add (INR):", "5000");
        if (amount) {
            await api.post('/brand/wallet/add-funds', { amount: parseFloat(amount), referenceId: `PAY_${Date.now()}` });
            alert("Funds Added Successfully!");
            dispatch(fetchWallet());
            dispatch(fetchTransactions());
        }
    } catch (error) {
        alert("Payment Failed");
    } finally {
        setAddingFunds(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Wallet & Payments</h1>
           <p className="text-gray-500 text-sm mt-1">Manage your funds and view transaction history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl lg:col-span-1">
            <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/10 rounded-xl">
                    <WalletIcon size={24} className="text-white" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full border border-green-500/20">Active</span>
            </div>
            <div>
                <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold text-white mb-6">
                    {currency} {parseFloat(balance).toLocaleString()}
                </h2>
                <button 
                  onClick={handleAddFunds}
                  disabled={addingFunds}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg active:transform active:scale-95"
                >
                    {addingFunds ? 'Processing...' : '+ Add Funds'}
                </button>
            </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><Search size={18} /></button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><Filter size={18} /></button>
                </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No transactions found.</div>
                ) : (
                    <ul className="divide-y divide-gray-50">
                        {transactions.map((tx, index) => (
                            <motion.li 
                                key={tx.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-5 hover:bg-gray-50 transition-colors flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-full ${tx.type === 'deposit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {tx.type === 'deposit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 capitalize">{tx.description || tx.type}</p>
                                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                            <Clock size={12} className="mr-1" />
                                            {new Date(tx.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-gray-900'}`}>
                                        {tx.type === 'deposit' ? '+' : '-'} {currency} {parseFloat(tx.amount).toLocaleString()}
                                    </p>
                                    <span className={`text-xs capitalize ${tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BrandWallet;
