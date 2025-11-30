import { useAppDispatch } from "../../../store/hooks"; 

import type { Category } from "../../../pages/TransactionPage";
import { selectCategory } from "../../../store/slices/categoriesSlice";
import { closeCategoryMenu } from "../../../store/slices/uiSlice";

interface CategoryComponentProps {
    category: Category;
}

export const CategoryComponent = ({ category }: CategoryComponentProps) => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="category flex g4"
            key={category.id}
            onClick={() => {
                dispatch(selectCategory(category));
                dispatch(closeCategoryMenu());
            }}
        >
            <span className="categoryIcon rem1_5">{category.icon}</span>
            <span className="categoryName rem1">{category.name}</span>
        </div>
    );
};
