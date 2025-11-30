import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionSlice";
import categoriesReducer from "./slices/categoriesSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        categories: categoriesReducer,
        ui: uiReducer,
    },
});

// Типизация (чтобы не было красных подчёркиваний)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
