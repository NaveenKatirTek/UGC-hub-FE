import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async Thunks
export const fetchCampaigns = createAsyncThunk(
    'brandCampaigns/fetchCampaigns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/brand/campaigns');
            return response.data.data.campaigns;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch campaigns');
        }
    }
);

export const createCampaign = createAsyncThunk(
    'brandCampaigns/createCampaign',
    async (campaignData, { rejectWithValue }) => {
        try {
            const response = await api.post('/brand/campaigns', campaignData);
            return response.data.data.campaign;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create campaign');
        }
    }
);

export const updateCampaign = createAsyncThunk(
    'brandCampaigns/updateCampaign',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/brand/campaigns/${id}`, data);
            return response.data.data.campaign;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update campaign');
        }
    }
);

const brandCampaignSlice = createSlice({
    name: 'brandCampaigns',
    initialState: {
        items: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchCampaigns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampaigns.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCampaigns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload); // Add to top
                state.successMessage = 'Campaign created successfully!';
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update
            .addCase(updateCampaign.fulfilled, (state, action) => {
                const index = state.items.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.successMessage = 'Campaign updated successfully!';
            });
    },
});

export const { clearMessages } = brandCampaignSlice.actions;
export default brandCampaignSlice.reducer;
