import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Transaction } from "../../pages/TransactionPage";

interface TransactionState {
    byMonth: Record<string, Transaction[]>;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    byMonth: {},
    loading: false,
    error: null,
};

// Получение всех транзакций
export const fetchTransactions = createAsyncThunk(
    "transactions/fetch",
    async (ownerId: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:5000/api/transactions/all/${ownerId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка сервера");
        }
    }
);

// Добавление транзакции
export const postTransaction = createAsyncThunk(
    "transactions/post",
    async (
        { ownerId, name, categoryId, count }: { ownerId: number; name: string; categoryId: number; count: number },
        { rejectWithValue }
    ) => {
        if (!name || !categoryId || !count) {
            console.log("Все поля должны быть заполнены");
            return rejectWithValue("Неверные данные");
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:5000/api/transactions/add`,
                { ownerId, name, categoryId, count },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка сервера");
        }
    }
);

// Удаление транзакции
export const deleteTransaction = createAsyncThunk(
    "transactions/delete",
    async ({ id, ownerId }: { id: number; ownerId: number }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/transactions/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return ownerId; // чтобы после удаления заново подгрузить транзакции
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка сервера");
        }
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Record<string, Transaction[]>>) => {
                state.loading = false;
                state.byMonth = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                // ничего не делаем, список будет обновлен через fetch
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                // ничего не делаем, список будет обновлен через fetch
            });
    },
});

export default transactionsSlice.reducer;
