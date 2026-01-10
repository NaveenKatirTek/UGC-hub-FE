import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCampaign } from '../../../store/slices/brandCampaignSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Upload, MapPin, Plus, X } from 'lucide-react';
import api from '../../../utils/api'; // Direct API for master data

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const MAX_STEPS = 4;
  
  // Master Data State
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [niches, setNiches] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nicheId: '',
    budgetAmount: '',
    currency: 'INR',
    deadline: '',
    stateId: '',
    cityId: '',
    deliverables: [], 
    // Default deliverable for simplicity
  });

  // Fetch Master Data
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [statesRes, nichesRes] = await Promise.all([
           api.get('/common/master/states'),
           api.get('/common/master/niches')
        ]);
        setStates(statesRes.data.data.states);
        setNiches(nichesRes.data.data.niches);
      } catch (err) {
        console.error("Failed to load master data", err);
      }
    };
    fetchMasterData();
  }, []);

  // Fetch Cities when State changes
  useEffect(() => {
    if (formData.stateId) {
      const fetchCities = async () => {
        try {
          const res = await api.get(`/common/master/states/${formData.stateId}/cities`);
          setCities(res.data.data.cities);
        } catch (err) {
          console.error("Failed to load cities", err);
        }
      };
      fetchCities();
    } else {
        setCities([]);
    }
  }, [formData.stateId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
       // Format data for API
       const payload = {
           ...formData,
           stateId: parseInt(formData.stateId),
           cityId: parseInt(formData.cityId),
           nicheId: parseInt(formData.nicheId),
           budgetAmount: parseFloat(formData.budgetAmount),
           locationConfig: { 
               // Legacy/Frontend helper 
               state: states.find(s => s.id == formData.stateId)?.name,
               city: cities.find(c => c.id == formData.cityId)?.name
           }
       };
       await dispatch(createCampaign(payload)).unwrap();
       navigate('/brand/campaigns');
    } catch (error) {
       alert(`Error: ${error}`);
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
         <p className="text-gray-500 mt-2">Launch your campaign in 3 easy steps.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-8 space-x-4">
          {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex-1 h-2 rounded-full ${step >= s ? 'bg-primary' : 'bg-gray-100'}`} />
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        
        {/* Step 1: Basics */}
        {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Campaign Basics</h2>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary transition-colors" placeholder="e.g. Summer Collection Launch" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Niche</label>
                    <select name="nicheId" value={formData.nicheId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary">
                        <option value="">Choose a category...</option>
                        {niches.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" placeholder="Describe your campaign goals..." />
                </div>
            </motion.div>
        )}

        {/* Step 2: Location & Budget */}
        {step === 2 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Targeting & Budget</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select name="stateId" value={formData.stateId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary">
                            <option value="">Select State...</option>
                            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <select name="cityId" value={formData.cityId} onChange={handleChange} disabled={!formData.stateId} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary disabled:bg-gray-50">
                            <option value="">Select City...</option>
                            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget (INR)</label>
                        <input type="number" name="budgetAmount" value={formData.budgetAmount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="5000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                </div>
             </motion.div>
        )}

        {/* Step 3: Deliverables */}
        {step === 3 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Content Requirements</h2>
                    <button 
                        onClick={() => setFormData({
                            ...formData, 
                            deliverables: [...formData.deliverables, { type: 'reel', quantity: 1, description: '' }]
                        })}
                        className="text-sm text-primary font-medium hover:underline flex items-center"
                    >
                        <Plus size={16} className="mr-1" /> Add Deliverable
                    </button>
                </div>

                {formData.deliverables.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No deliverables added yet.</p>
                        <button 
                             onClick={() => setFormData({
                                ...formData, 
                                deliverables: [...formData.deliverables, { type: 'image', quantity: 1, description: '' }]
                            })}
                            className="mt-2 text-primary font-medium"
                        >
                            Add your first requirement (e.g. Instagram Post)
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {formData.deliverables.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl relative group">
                                <button 
                                    onClick={() => {
                                        const newDeliverables = [...formData.deliverables];
                                        newDeliverables.splice(index, 1);
                                        setFormData({ ...formData, deliverables: newDeliverables });
                                    }}
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                                        <select 
                                            value={item.type}
                                            onChange={(e) => {
                                                const newDeliverables = [...formData.deliverables];
                                                newDeliverables[index].type = e.target.value;
                                                setFormData({ ...formData, deliverables: newDeliverables });
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        >
                                            <option value="image">Image Post</option>
                                            <option value="video">Video Post</option>
                                            <option value="reel">Reel / Short</option>
                                            <option value="story">Story</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newDeliverables = [...formData.deliverables];
                                                newDeliverables[index].quantity = parseInt(e.target.value);
                                                setFormData({ ...formData, deliverables: newDeliverables });
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Instructions</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. High quality product shot with logo visible"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newDeliverables = [...formData.deliverables];
                                            newDeliverables[index].description = e.target.value;
                                            setFormData({ ...formData, deliverables: newDeliverables });
                                        }}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </motion.div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Review Application</h2>
                <div className="bg-gray-50 p-6 rounded-xl space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Title:</span> <span className="font-medium text-gray-900">{formData.title}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Niche:</span> <span className="font-medium text-gray-900">{niches.find(n => n.id == formData.nicheId)?.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Location:</span> <span className="font-medium text-gray-900">{cities.find(c => c.id == formData.cityId)?.name}, {states.find(s => s.id == formData.stateId)?.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Budget:</span> <span className="font-medium text-gray-900">₹{formData.budgetAmount}</span></div>
                    
                    <div className="pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500 block mb-2">Deliverables:</span>
                        <ul className="list-disc pl-4 space-y-1">
                            {formData.deliverables.map((d, i) => (
                                <li key={i} className="text-gray-900 capitalize">
                                    {d.quantity}x {d.type} <span className="text-gray-400 text-xs">- {d.description}</span>
                                </li>
                            ))}
                            {formData.deliverables.length === 0 && <li className="text-gray-400 italic">No specific deliverables listed.</li>}
                        </ul>
                    </div>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg text-blue-700">
                    <Check size={20} className="shrink-0 mt-0.5" />
                    <p>By publishing this campaign, you agree to escrow the budget amount once an influencer is approved.</p>
                </div>
             </motion.div>
        )}

        {/* Navigation Actions */}
        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
            {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center px-6 py-2 border rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                    <ChevronLeft size={18} className="mr-1" /> Back
                </button>
            ) : <div></div>}
            
            {step < MAX_STEPS ? (
                 <button onClick={() => setStep(step + 1)} className="flex items-center px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors">
                    Next <ChevronRight size={18} className="ml-1" />
                 </button>
            ) : (
                 <button onClick={handleSubmit} disabled={loading} className="flex items-center px-8 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors disabled:opacity-50">
                    {loading ? 'Publishing...' : 'Publish Campaign'}
                 </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default CreateCampaign;
