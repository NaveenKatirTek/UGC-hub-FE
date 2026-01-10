import { configureStore } from '@reduxjs/toolkit';
import brandCampaignReducer from './slices/brandCampaignSlice';
import brandWalletReducer from './slices/brandWalletSlice';

export const store = configureStore({
    reducer: {
        brandCampaigns: brandCampaignReducer,
        brandWallet: brandWalletReducer,
    },
});

export default store;
