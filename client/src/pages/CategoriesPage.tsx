import { useState, useRef, useEffect } from "react";
import { AllCategories } from "../components/Categories/AllCategories";
import { EditCategoryForm } from "../components/Categories/EditCategoryForm";
import { useAppSelector } from "../store/hooks";
import '../styles/CategoriesPage.scss'

export const CategoriesPage = () => {
    const selected = useAppSelector(s => s.categories.selectedCategory);
    const [isCreating, setIsCreating] = useState(false);

    const allCategoriesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (allCategoriesRef.current && !allCategoriesRef.current.contains(event.target as Node)) {
                setIsCreating(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="main_content categories flex g16">
            <div className="allCategoriesBox flex-column g16" ref={allCategoriesRef}>
                <div className="headingBox flex-between">
                    <span className="titleText rem1_5">Мои категории</span>
                    <button className="createNewCategoryButton" onClick={() => setIsCreating(true)}>
                        Создать новую
                    </button>
                </div>
                <AllCategories isCreating={isCreating} setIsCreating={setIsCreating} />
            </div>
            {selected !== null
            ? <div className="editCategoryForm flex-column g16">
                <span className="titleText rem1_5">Изменение категории</span>
                <EditCategoryForm />
            </div>
            : null}
        </div>
    )
}
