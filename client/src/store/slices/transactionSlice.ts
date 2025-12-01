import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Transaction } from "../../pages/TransactionPage";

interface TransactionState {
    byMonth: Record<string, Transaction[]>;
}

const initialState: TransactionState = {
    byMonth: {}
};

export const fetchTransactions = createAsyncThunk(
    "transactions/fetch",
    async (ownerId: number) => {
        const response = await axios.get(`http://localhost:5000/api/transactions/all/${ownerId}`);
        return response.data;
    }
);

export const postTransactions = createAsyncThunk(
    "transactions/post",
    async (
        { ownerId, name, categoryId, count }: {
            ownerId: number;
            name: string;
            categoryId: number;
            count: number;
        }
    ) => {
        const response = await axios.post(`http://localhost:5000/api/transactions/add`, {
            ownerId,
            name,
            categoryId,
            count
        });
        return response.data;
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.byMonth = action.payload;
        });
    }
});

export default transactionsSlice.reducer;
