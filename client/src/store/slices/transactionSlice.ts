import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../../pages/TransactionPage";
import api from "../../utils/api";

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
            const response = await api.get(`/transactions/all/${ownerId}`);
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
            const response = await api.post(
                "/transactions/add",
                { ownerId, name, categoryId, count }
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
            await api({
                method: "delete",
                url: `/transactions/delete/${id}`,
            });

            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка сервера");
        }
    }
);

export const updateTransaction = createAsyncThunk<
    Transaction,
    {
        id: number;
        name: string;
        count: number;
    }
>(
    "transactions/update",
    async ({ id, name, count }) => {
        const response = await api.put(
            `/transactions/${id}`,
            { name, count }
        );

        return response.data;
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
            })

            // UPDATE (PUT)
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
                state.loading = false;

                const updatedTx = action.payload;

                // проходим по всем месяцам
                for (const month in state.byMonth) {
                    const index = state.byMonth[month].findIndex(
                        (tx) => tx.id === updatedTx.id
                    );

                    if (index !== -1) {
                        state.byMonth[month][index] = {
                            ...state.byMonth[month][index],
                            ...updatedTx,
                        };
                        break; // нашли — дальше искать не нужно
                    }
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        }
});


export default transactionsSlice.reducer;
