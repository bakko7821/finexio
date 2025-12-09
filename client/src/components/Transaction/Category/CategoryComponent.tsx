import { useAppDispatch, useAppSelector } from "../../../store/hooks"; 
import type { Category } from "../../../pages/TransactionPage";
import { selectCategory } from "../../../store/slices/categoriesSlice";

import { getIconConfig, type IconConfig } from "../../../utils/iconMapLogic";
import { TwemojiIcon } from "../../../utils/TwemojiIcon";

interface CategoryComponentProps {
    category: Category;
}

export const CategoryComponent = ({ category }: CategoryComponentProps) => {
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(s => s.categories.selectedCategory);

    const isActive = selectedCategory?.id === category.id;

    const iconConfig: IconConfig = getIconConfig(category.name);

    return (
        <div
            className={`category flex-center g4 ${isActive ? "active" : ""}`}
            onClick={() => {
                dispatch(selectCategory(category));
            }}
        >
            <span 
                className="categoryIcon" 
                // Опционально: Используйте цвет для бэкграунда иконки, чтобы имитировать вид macOS
                style={{ backgroundColor: iconConfig.color + '40', borderRadius: '8px', padding: '4px' }}
            >
                {/* 4. Рендерим эмодзи через TwemojiIcon */}
                <TwemojiIcon emoji={iconConfig.icon} />
            </span>
            <span className="categoryName rem1">{category.name}</span>
        </div>
    );
};