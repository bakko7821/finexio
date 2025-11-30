import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    isAddTransactionOpen: boolean;
    isCategoryMenuOpen: boolean;
}

const initialState: UIState = {
    isAddTransactionOpen: false,
    isCategoryMenuOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleAddTransaction(state) {
            state.isAddTransactionOpen = !state.isAddTransactionOpen;
        },
        openAddTransaction(state) {
            state.isAddTransactionOpen = true;
        },
        closeAddTransaction(state) {
            state.isAddTransactionOpen = false;
        },
        openCategoryMenu(state) {
            state.isCategoryMenuOpen = true;
        },
        closeCategoryMenu(state) {
            state.isCategoryMenuOpen = false;
        }
    }
});

export const { 
    toggleAddTransaction, 
    openAddTransaction,
    closeAddTransaction,
    openCategoryMenu, 
    closeCategoryMenu 
} = uiSlice.actions;

export default uiSlice.reducer;
