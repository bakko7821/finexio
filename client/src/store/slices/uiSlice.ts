import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TempTransactionForm {
    name: string;
    count: string;
}

interface UIState {
    isAddTransactionOpen: boolean;
    isCategoryMenuOpen: boolean;
    tempTransactionForm: TempTransactionForm;
}

const initialState: UIState = {
    isAddTransactionOpen: false,
    isCategoryMenuOpen: false,

    // временное хранилище полей формы
    tempTransactionForm: {
        name: "",
        count: ""
    }
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleAddTransaction(state) {
            state.isAddTransactionOpen = !state.isAddTransactionOpen;

            // если закрыли форму → очищаем временные поля
            if (!state.isAddTransactionOpen) {
                state.tempTransactionForm = { name: "", count: "" };
            }
        },
        openAddTransaction(state) {
            state.isAddTransactionOpen = true;
        },
        closeAddTransaction(state) {
            state.isAddTransactionOpen = false;
            state.tempTransactionForm = { name: "", count: "" };
        },

        openCategoryMenu(state) {
            state.isCategoryMenuOpen = true;
        },
        closeCategoryMenu(state) {
            state.isCategoryMenuOpen = false;
        },

        // 🔥 сохраняем одно поле
        setTempTransactionField(
            state,
            action: PayloadAction<{ field: "name" | "count"; value: string }>
        ) {
            state.tempTransactionForm[action.payload.field] = action.payload.value;
        },

        // 🔥 полностью очистить форму
        resetTempTransactionForm(state) {
            state.tempTransactionForm = { name: "", count: "" };
        }
    }
});

export const {
    toggleAddTransaction,
    openAddTransaction,
    closeAddTransaction,
    openCategoryMenu,
    closeCategoryMenu,
    setTempTransactionField,
    resetTempTransactionForm
} = uiSlice.actions;

export default uiSlice.reducer;
