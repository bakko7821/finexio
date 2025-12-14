import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../../pages/TransactionPage";
import { color } from "chart.js/helpers";
import api from "../../utils/api";

interface CategoriesState {
    list: Category[];
    selectedCategory: Category | null;
}

const initialState: CategoriesState = {
    list: [],
    selectedCategory: null,
};

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async (userId: number) => {
        const response = await api.get(`/categories/all/${userId}`);
        return response.data;
    }
);

export const createCategory = createAsyncThunk<
    Category,
    { ownerId: number; 
        icon: string; 
        name: string;
        color: string }
>(
    "categories/create",
    async ({ ownerId, icon, name, color }) => {
        const response = await api.post("/categories/add", {
            ownerId,
            icon,
            name,
            color
        });

        return response.data.category
    }
);

export const updateCategory = createAsyncThunk<
    Category,
    {
        id: number;
        icon: string;
        name: string;
        color: string;
    }
>(
    "categories/update",
    async ({ id, icon, name, color }) => {
        const response = await api.put(
            `/categories/${id}`,
            { icon, name, color }
        );

        return response.data;
    }
);

export const deleteCategory = createAsyncThunk<
    number,              // что вернём
    number               // что принимаем (id категории)
>(
    "categories/delete",
    async (id) => {
        await api.delete(`/categories/${id}`);
        return id; // 👈 возвращаем id удалённой категории
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        selectCategory(state, action) {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updated = action.payload;

                // обновляем список
                const index = state.list.findIndex(c => c.id === updated.id);
                if (index !== -1) {
                    state.list[index] = updated;
                }

                // обновляем выбранную категорию, если она выбрана
                if (state.selectedCategory?.id === updated.id) {
                    state.selectedCategory = updated;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const deletedId = action.payload;

                state.list = state.list.filter(c => c.id !== deletedId);

                if (state.selectedCategory?.id === deletedId) {
                    state.selectedCategory = null;
                }
            });
    }
});

export const { selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
