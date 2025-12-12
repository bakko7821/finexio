import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "../../pages/TransactionPage";
import { color } from "chart.js/helpers";

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
        const response = await axios.get(`http://localhost:5000/api/categories/all/${userId}`);
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
        const response = await axios.post("http://localhost:5000/api/categories/add", {
            ownerId,
            icon,
            name,
            color
        });

        return response.data.category
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
        });
    }
});

export const { selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
