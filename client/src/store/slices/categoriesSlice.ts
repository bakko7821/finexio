import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "../../pages/TransactionPage";

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
    Category,                                                    // то, что thunk возвращает
    { ownerId: number; name: string }             // то, что thunk принимает
>(
    "categories/create",
    async ({ ownerId, name }) => {
        await axios.post("http://localhost:5000/api/categories/add", {
            ownerId,
            name
        });

        return {
            id: Date.now(),
            ownerId,
            name
        };
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
