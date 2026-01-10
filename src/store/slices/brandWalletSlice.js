import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchWallet = createAsyncThunk(
    'brandWallet/fetchWallet',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/brand/wallet');
            return response.data.data.wallet;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet');
        }
    }
);

export const fetchTransactions = createAsyncThunk(
    'brandWallet/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/brand/wallet/transactions');
            return response.data.data.transactions;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
        }
    }
);

const brandWalletSlice = createSlice({
    name: 'brandWallet',
    initialState: {
        balance: 0,
        currency: 'INR',
        transactions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWallet.fulfilled, (state, action) => {
                state.balance = action.payload.balance;
                state.currency = action.payload.currency;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
            });
    },
});

export default brandWalletSlice.reducer;
