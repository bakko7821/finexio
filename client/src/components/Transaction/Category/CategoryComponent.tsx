import { useAppDispatch, useAppSelector } from "../../../store/hooks"; 
import type { Category } from "../../../pages/TransactionPage";
import { selectCategory } from "../../../store/slices/categoriesSlice";

interface CategoryComponentProps {
    category: Category;
}

export const CategoryComponent = ({ category }: CategoryComponentProps) => {
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(s => s.categories.selectedCategory);

    const isActive = selectedCategory?.id === category.id;

    return (
        <div
            className={`category flex-center g4 ${isActive ? "active" : ""}`}
            onClick={() => {
                dispatch(selectCategory(category));
            }}
        >
            {category?.icon ? (
                <span className="categoryIcon rem1_5">{category.icon}</span>
            ) : null}
            <span className="categoryName rem1">{category.name}</span>
        </div>
    );
};

