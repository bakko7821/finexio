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
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/transactions/add",
                { ownerId, name, categoryId, count },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data; // 🌟 возвращаем Transaction
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка сервера");
        }
    }
);


// Удаление транзакции
export const deleteTransaction = createAsyncThunk(
    "transactions/delete",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            await axios({
                method: "delete",
                url: `http://localhost:5000/api/transactions/delete/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return id;
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
            // FETCH
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

            // POST
            .addCase(postTransaction.fulfilled, (state, action) => {
                const tx = action.payload as Transaction;

                // если нет даты — ставим текущую
                const date = tx.date ?? tx.createdAt ?? new Date().toISOString();
                const monthKey = date.slice(0, 7);

                if (!state.byMonth[monthKey]) {
                    state.byMonth[monthKey] = [];
                }

               state.byMonth[monthKey].push({
                    ...tx,
                    createdAt: date,
                    category: tx.category ?? { id: tx.categoryId, name: "Неизвестно", icon: "" } // заглушка
                });
            })

            // DELETE
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                const id = action.payload as number;

                for (const month in state.byMonth) {
                    state.byMonth[month] = state.byMonth[month].filter(tx => tx.id !== id);
                }
            });
    },
});


export default transactionsSlice.reducer;
